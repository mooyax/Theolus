
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Job, Wander, Sleep } from '../ai/states/UnitStates.js';

// Setup globals required by Unit constructor
global.Wander = Wander;
global.Job = Job;
global.Sleep = Sleep;

describe('Rubber-banding and Chaining Verification', () => {
    let unit, terrain, mockGame;

    beforeEach(() => {
        terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: () => 1,
            gridToWorld: (p) => ({ x: p.x, y: 0, z: p.z }),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            isReachable: () => true,
            grid: Array(100).fill(0).map(() => Array(100).fill(0).map(() => ({ hasBuilding: false, moisture: 0.5, regionId: 1 }))),
            checkFlatArea: vi.fn().mockReturnValue(true),
            addBuilding: vi.fn(),
            getBuildingSize: () => 1,
            getRandomPointInRegion: () => ({ x: 0, z: 0 }),
            getRegion: () => 1,
            findPath: vi.fn().mockReturnValue([{ x: 20, z: 10 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 10 }])
        };

        mockGame = {
            simTotalTimeSec: 0,
            requestQueue: [],
            units: [],
            claimRequest: vi.fn((u, req) => {
                u.targetRequest = req;
                u.changeState(new Job(u));
                return true;
            }),
            completeRequest: vi.fn(),
            releaseRequest: vi.fn(),
            terrain: terrain
        };
        window.game = mockGame;

        unit = new Unit({ add: vi.fn() }, terrain, 10, 10, 'worker');
        unit.game = mockGame;
        mockGame.units = [unit];
        unit.workOnRequest = vi.fn((req) => { req.status = 'completed'; });
    });

    it('should NOT snap back when arriving at a job during mid-move', () => {
        const targetJob = { id: 1, x: 20, z: 10, type: 'build', status: 'assigned', assignedTo: unit.id, faction: 'player' };
        unit.targetRequest = targetJob;
        unit.changeState(new Job(unit));

        // Start Moving from 10 to 20
        unit.startMove(20, 10, 0);
        unit.moveDuration = 10;

        // At time 9, visual position should be 19 (90% progress)
        // Check if getVisualX works correctly with fixed Entity constructor
        expect(unit.getVisualX(9)).toBeGreaterThan(18.9);
        expect(unit.getVisualX(9)).toBeLessThan(19.1);

        // Before arrival, gridX must remain 10 (No snap-back to 20 yet)
        expect(unit.gridX).toBe(10);
        expect(unit.isMoving).toBe(true);

        // Tick to arrival
        unit.updateMovement(10);
        expect(unit.gridX).toBe(20);
        expect(unit.isMoving).toBe(false);
    });

    it('should use visual position for chaining the next job', () => {
        const job1 = { id: 'req_1', x: 20, z: 10, type: 'build', status: 'assigned', assignedTo: unit.id, faction: 'player' };
        const job2 = { id: 'req_2', x: 30, z: 10, type: 'build', status: 'pending', assignedTo: null, faction: 'player' };

        unit.targetRequest = job1;
        unit.changeState(new Job(unit));
        unit.startMove(20, 10, 0);
        unit.moveDuration = 10;

        // 1. Progress to near-arrival (time 9)
        unit.state.update(9, 1);

        // 2. Trigger arrival at 10s
        unit.updateMovement(10);
        unit.isMoving = false;

        // 3. Update state to finish Job and transition to Wander
        unit.state.update(10, 1);
        expect(unit.state.name).toBe('Wander');

        // 4. Manual Assignment triggering (Simulating push-based system)
        // Verification: The unit should be at (20, 10) when assigned
        mockGame.claimRequest(unit, job2);

        expect(unit.targetRequest.id).toBe('req_2');
        expect(unit.state.name).toBe('Job');
        expect(unit.gridX).toBe(20);
    });
});