import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';

vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } drawRaidPing() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });

describe('Multi-Job Juggling Verification', () => {
    let mockGame;
    let u1, u2;
    let job1, job2, job3;

    beforeEach(() => {
        const mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
        const mockTerrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: vi.fn().mockReturnValue(10),
            logicalWidth: 100, logicalDepth: 100,
            grid: Array(100).fill(null).map(() => Array(100).fill(null).map(() => ({ regionId: 1, height: 10 }))),
            isReachable: vi.fn(() => true),
            isWalkable: vi.fn(() => true),
            findPath: vi.fn().mockImplementation((x1, y1, x2, y2) => [{ x: x2, z: y2 }]),
            findPathAsync: vi.fn().mockImplementation((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }])),
            checkFlatArea: vi.fn().mockReturnValue(true),
            moveEntity: vi.fn(),
            addBuilding: vi.fn(),
            removeBuilding: vi.fn(),
            initTerrain: vi.fn(),
            initPathfindingWorker: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            isAdjacentToRegion: vi.fn().mockReturnValue(true),
            getBuildingSize: vi.fn().mockReturnValue(1)
        };

        u1 = new Unit(mockScene, mockTerrain, 0, 0, 'worker'); u1.id = 1;
        u2 = new Unit(mockScene, mockTerrain, 0, 0, 'worker'); u2.id = 2;

        job1 = { id: 101, x: 20, z: 0, type: 'build', status: 'pending' };
        job2 = { id: 102, x: 0, z: 20, type: 'build', status: 'pending' };
        job3 = { id: 103, x: 10, z: 10, type: 'build', status: 'pending' };

        mockGame = new Game(mockScene, mockTerrain);
        mockGame.entityManager.register(u1);
        mockGame.entityManager.register(u2);
        mockGame.requestQueue = [job1, job2];
        mockGame.simTotalTimeSec = 0;
        window.game = mockGame;
    });

    afterEach(() => {
        window.game = null;
        vi.clearAllMocks();
    });

    it('should NOT interrupt busy units when a new job is added', async () => {
        mockGame.processAssignments(10);

        expect(job1.status).toBe('assigned');
        expect(job2.status).toBe('assigned');
        expect(u1.targetRequest).not.toBeNull();
        expect(u2.targetRequest).not.toBeNull();

        u1.updateLogic(0.1, 0.1);
        u2.updateLogic(0.1, 0.1);

        await new Promise(r => setTimeout(r, 0));

        u1.updateLogic(5.0, 0.1);
        u2.updateLogic(5.0, 0.1);

        expect(u1.isMoving).toBe(true);
        expect(u2.isMoving).toBe(true);
        const u1_moveStart = u1.moveStartTime;
        const u2_moveStart = u2.moveStartTime;

        const newReq = mockGame.addRequest('build', 10, 10, false);

        mockGame.processAssignments(10);

        expect(newReq.status).toBe('pending');
        expect(u1.targetRequest.id).toBe(job1.id);
        expect(u2.targetRequest.id).toBe(job2.id);

        expect(u1.moveStartTime).toBe(u1_moveStart);
        expect(u2.moveStartTime).toBe(u2_moveStart);
    });
});
