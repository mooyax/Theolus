import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Request Responsiveness & Combat Handoff', () => {
    let mockGame;
    let mockUnit1;
    let mockUnit2;
    let mockTerrain;

    beforeEach(() => {
        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: vi.fn(() => 5),
            isReachable: vi.fn(() => true)
        };

        mockUnit1 = {
            id: 1,
            gridX: 10,
            gridZ: 10,
            role: 'worker',
            targetRequest: null,
            targetGoblin: null,
            action: 'Idle',
            getDistance: vi.fn((x, z) => Math.sqrt((x - 10) ** 2 + (z - 10) ** 2)),
            isReachable: vi.fn(() => true)
        };

        mockUnit2 = {
            id: 2,
            gridX: 50,
            gridZ: 50,
            role: 'worker',
            targetRequest: null,
            targetGoblin: null,
            action: 'Idle',
            getDistance: vi.fn((x, z) => Math.sqrt((x - 50) ** 2 + (z - 50) ** 2)),
            isReachable: vi.fn(() => true)
        };

        const entityManager = {
            units: [mockUnit1, mockUnit2],
            goblins: [],
            register: vi.fn((e) => {
                if (e.type === 'unit') entityManager.units.push(e);
                if (e.type === 'goblin') entityManager.goblins.push(e);
            }),
            remove: vi.fn((e) => {
                entityManager.units = entityManager.units.filter(u => u !== e);
                entityManager.goblins = entityManager.goblins.filter(g => g !== e);
            }),
            clear: vi.fn(() => {
                entityManager.units = [];
                entityManager.goblins = [];
            }),
            getAllUnits: vi.fn(() => entityManager.units),
            getAllGoblins: vi.fn(() => entityManager.goblins)
        };

        mockGame = {
            entityManager,
            get units() { return entityManager.units; },
            get goblins() { return entityManager.goblins; },
            requestQueue: [],
            terrain: mockTerrain,
            releaseRequest: vi.fn(),
            claimRequest: vi.fn((u, r) => {
                r.status = 'assigned';
                r.assignedTo = u.id;
                u.targetRequest = r;
                return true;
            }),
            assignRequestSync: vi.fn((r, u) => {
                if (u && r) {
                    mockGame.claimRequest(u, r);
                }
            })
        };

        window.game = mockGame;
    });

    afterEach(() => {
        delete window.game;
        vi.restoreAllMocks();
    });

    it('Worker releases job when died', async () => {
        const { Unit } = await import('../Unit.js');
        const { MockGame, MockTerrain } = await import('./TestHelper.js');

        const game = new MockGame();
        game.releaseRequest = vi.fn();
        global.window.game = game;

        const terrain = new MockTerrain(100, 100);
        terrain.getTileHeight = () => 5;

        const mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
        const unit = new Unit(mockScene, terrain, 10, 10, 'worker');
        unit.game = game;
        unit.hp = 10;

        const req = { id: 'req_1', x: 15, z: 15, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = req;
        if (unit.state) unit.state.targetRequest = req;
        game.requestQueue = [req];

        const enemy = { id: 'gob_1', gridX: 11, gridZ: 10, isDead: false, takeDamage: vi.fn() };

        unit.updateLogic(100, 0.1, false, [enemy], [], []);
        unit.takeDamage(100, enemy);

        expect(game.releaseRequest).toHaveBeenCalled();
        expect(unit.targetRequest).toBeNull();
    });

    it('forceAssignRequest prioritizes idle unit over busy unit', async () => {
        const { Game } = await import('../Game.js');
        const assignRequestSync = Game.prototype.assignRequestSync.bind(mockGame);

        const req = { id: 'req_hot', x: 12, z: 12, status: 'pending' };

        mockUnit1.targetRequest = { id: 'req_other' };
        mockUnit1.action = 'Working';

        mockUnit2.targetRequest = null;
        mockUnit2.action = 'Idle';

        vi.useFakeTimers();
        assignRequestSync(req);
        vi.runAllTimers();

        expect(mockGame.claimRequest).toHaveBeenCalled();
        const calls = mockGame.claimRequest.mock.calls;
        const assignedUnit = calls[0][0];
        expect(assignedUnit.id).toBe(2);
    });
});
