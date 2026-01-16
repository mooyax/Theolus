import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { JobState } from '../ai/states/UnitStates.js';
import { Minimap } from '../Minimap.js';
import { Compass } from '../Compass.js';

// Mock THREE, Minimap, Compass
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('canvas'); }
            setSize() { } render() { } dispose() { } setPixelRatio() { }
            shadowMap = { enabled: false, type: 0 };
        },
    };
});
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } drawRaidPing() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

// Mock Game.prototype.animate to prevent infinite loop in tests
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
            isWalkable: vi.fn(() => true), // Added
            findPath: vi.fn().mockImplementation((x1, y1, x2, y2) => [{ x: x2, z: y2 }]),
            findPathAsync: vi.fn().mockImplementation((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }])), // Dynamic target
            checkFlatArea: vi.fn().mockReturnValue(true),
            moveEntity: vi.fn(),
            addBuilding: vi.fn(),
            removeBuilding: vi.fn(),
            initTerrain: vi.fn(),
            initPathfindingWorker: vi.fn(), // If needed
            getRegion: vi.fn().mockReturnValue(1),
            isAdjacentToRegion: vi.fn().mockReturnValue(true),
            getBuildingSize: vi.fn().mockReturnValue(1)
        };

        u1 = new Unit(mockScene, mockTerrain, 0, 0, 'worker'); u1.id = 1;
        u2 = new Unit(mockScene, mockTerrain, 0, 0, 'worker'); u2.id = 2;

        // Setup initial jobs (far apart)
        job1 = { id: 101, x: 20, z: 0, type: 'build', status: 'pending' };
        job2 = { id: 102, x: 0, z: 20, type: 'build', status: 'pending' };
        job3 = { id: 103, x: 10, z: 10, type: 'build', status: 'pending' }; // Close to both

        mockGame = new Game(mockScene, mockTerrain);
        mockGame.units = [u1, u2];
        mockGame.requestQueue = [job1, job2];
        mockGame.simTotalTimeSec = 0; // Ensure sim time is initialized
        window.game = mockGame;
    });

    afterEach(() => {
        window.game = null;
        vi.clearAllMocks();
    });

    it('should NOT interrupt busy units when a new job is added', async () => {
        // 1. Initial Assignment
        mockGame.processAssignments(10);

        expect(job1.status).toBe('assigned');
        expect(job2.status).toBe('assigned');
        expect(u1.targetRequest).not.toBeNull();
        expect(u2.targetRequest).not.toBeNull();

        // Start Moving
        u1.updateLogic(0.1, 0.1);
        u2.updateLogic(0.1, 0.1);

        await new Promise(r => setTimeout(r, 0));

        // Retry logic to consume path
        // Must advance time > throttle (1.0s)
        u1.updateLogic(5.0, 0.1);
        u2.updateLogic(5.0, 0.1);

        expect(u1.isMoving).toBe(true);
        expect(u2.isMoving).toBe(true);
        const u1_moveStart = u1.moveStartTime;
        const u2_moveStart = u2.moveStartTime;

        // 2. Add New Job (Job 3) using addRequest (checks for crash)
        // job3 setup in addRequest will differ from manual object, but logic holds.
        // We need to match the logic. 
        // Note: addRequest creates a new object with ID 'req_X'. 
        // We'll capture it.
        const newReq = mockGame.addRequest('build', 10, 10, false);

        // 3. Run Assignment Loop again
        console.log(`[TEST DEBUG] Before processAssignments: U1 Target: ${u1.targetRequest ? u1.targetRequest.id : 'null'}`);
        mockGame.processAssignments(10);

        console.error(`[DEBUG] Job3 Status: ${newReq.status}`);
        console.error(`[DEBUG] U1 Target: ${u1.targetRequest ? u1.targetRequest.id : 'null'} (Expected: ${job1.id})`);
        console.error(`[DEBUG] U2 Target: ${u2.targetRequest ? u2.targetRequest.id : 'null'} (Expected: ${job2.id})`);

        // EXPECTATION: 
        // Job 3 remains pending because everyone is BUSY.
        expect(newReq.status).toBe('pending');
        expect(u1.targetRequest.id).toBe(job1.id);
        expect(u2.targetRequest.id).toBe(job2.id);

        // CRITICAL: Movement should NOT reset
        expect(u1.moveStartTime).toBe(u1_moveStart);
        expect(u2.moveStartTime).toBe(u2_moveStart);
    });
});
