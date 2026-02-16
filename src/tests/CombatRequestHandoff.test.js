import { describe, it, expect, vi, beforeEach } from 'vitest';

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
            gridX: 50, // Far away
            gridZ: 50,
            role: 'worker',
            targetRequest: null,
            targetGoblin: null,
            action: 'Idle',
            getDistance: vi.fn((x, z) => Math.sqrt((x - 50) ** 2 + (z - 50) ** 2)),
            isReachable: vi.fn(() => true)
        };

        mockGame = {
            units: [mockUnit1, mockUnit2],
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
                // Mimic Game.js behavior or redirect to claimRequest
                if (u && r) {
                    mockGame.claimRequest(u, r);
                }
            })
        };

        // Assign to window.game without destroying window
        window.game = mockGame;
    });

    afterEach(() => {
        delete window.game;
    });

    it('Worker releases job when died', async () => {
        const { Unit } = await import('../Unit.js');
        const { MockGame, MockTerrain } = await import('./TestHelper.js');

        // Use Mock Dependencies
        const game = new MockGame();
        game.releaseRequest = vi.fn(); // Spy
        global.window.game = game;

        const terrain = new MockTerrain(100, 100);
        // Force height for visibility
        terrain.getTileHeight = () => 5;

        // Create Unit properly
        const mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
        const unit = new Unit(mockScene, terrain, 10, 10, 'worker');
        unit.game = game;
        unit.hp = 10; // Ensure HP
        console.error(`[Test] Unit HP before: ${unit.hp}`);
        console.error(`[Test] Is Mock? ${vi.isMockFunction(unit.takeDamage)}`);
        // REMOVED premature death
        // unit.takeDamage(100);
        // console.error(`[Test] Unit HP after: ${unit.hp}. isDead: ${unit.isDead}`); 

        // Setup unit with a job
        const req = { id: 'req_1', x: 15, z: 15, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = req;
        if (unit.state) unit.state.targetRequest = req; // Sync state if exists
        game.requestQueue = [req]; // FIX: UnitJob verifies request existence!
        // Manually set role/state if needed, but 'worker' defaults effectively.

        // Simulate combat by putting enemy in range
        const enemy = { id: 'gob_1', gridX: 11, gridZ: 10, isDead: false, takeDamage: vi.fn() };

        // Call updateLogic (which delegates to state)
        // Unit sees enemy -> sets targetGoblin -> State Machine Switch -> Combat -> Worker releases job?
        // Actually, Unit.js logic: if (this.targetGoblin) { ... }
        // We need to ensure scan runs.
        console.log("Run Logic...");
        unit.updateLogic(100, 0.1, false, [enemy], [], []);

        // Simulate taking LETHAL damage to force release
        console.log("Simulate Death. Role:", unit.role, "Req:", unit.targetRequest, "Game:", !!window.game);
        unit.takeDamage(100, enemy); // Lethal damage

        console.log(`[Test] Unit Dead? ${unit.isDead} Health: ${unit.health}`);
        console.log(`[Test] ReleaseRequest Calls:`, game.releaseRequest.mock.calls.length);

        if (game.releaseRequest.mock.calls.length === 0) {
            throw new Error(`[Test Fail] ReleaseRequest NOT called. HP:${unit.hp} Dead:${unit.isDead} Req:${unit.targetRequest ? unit.targetRequest.id : 'null'}`);
        }
        process.stdout.write(`[Test] ReleaseRequest Calls: ${game.releaseRequest.mock.calls.length}\n`);
        process.stdout.write(`[Test] Unit HP: ${unit.hp}. isDead: ${unit.isDead}. TargetReq: ${unit.targetRequest ? unit.targetRequest.id : 'null'}\n`);
        expect(game.releaseRequest).toHaveBeenCalled();
        expect(unit.targetRequest).toBeNull();
    });

    it('forceAssignRequest prioritizes idle unit over busy unit', async () => {
        const { Game } = await import('../Game.js');
        const assignRequestSync = Game.prototype.assignRequestSync.bind(mockGame);

        // Req near Unit 1 (10, 10)
        const req = { id: 'req_hot', x: 12, z: 12, status: 'pending' };

        // Unit 1 is "Busy" working elsewhere
        mockUnit1.targetRequest = { id: 'req_other' };
        mockUnit1.action = 'Working';

        // Unit 2 is "Idle" but FAR (50, 50)
        mockUnit2.targetRequest = null;
        mockUnit2.action = 'Idle';

        // Note: forceAssignRequest is async (setTimeout)
        vi.useFakeTimers();
        assignRequestSync(req);
        vi.runAllTimers();

        expect(mockGame.claimRequest).toHaveBeenCalled();
        // Check if Unit 2 was the one claimed (Idle unit preferred)
        const calls = mockGame.claimRequest.mock.calls;
        const assignedUnit = calls[0][0];
        expect(assignedUnit.id).toBe(2); // Unit 2 picked!
    });
});
