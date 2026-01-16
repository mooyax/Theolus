import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState } from '../ai/states/UnitStates.js';

// Mocks
global.window = {
    game: null
};

class MockTerrain {
    constructor() {
        this.logicalWidth = 160;
        this.logicalDepth = 160;
        this.grid = Array(160).fill(null).map(() => Array(160).fill({ height: 1, type: 'grass', regionId: 1 }));
    }
    getTileHeight(x, z) { return 1; }
    isReachable() { return true; }
    checkFlatArea() { return true; }
    getRegion() { return 1; }
    moveEntity() { }
    findPath(x1, z1, x2, z2) {
        return [{ x: x1, z: z1 }, { x: x2, z: z2 }];
    }
    findPathAsync(x1, z1, x2, z2) {
        // Return Synchronous "Promise" to ensure callback runs immediately in test
        const result = this.findPath(x1, z1, x2, z2);
        return {
            then: (cb) => {
                cb(result);
                return { catch: () => { } };
            }
        };
    }
    checkYield() { return Promise.resolve(); }
    getRandomPointInRegion() { return { x: 10, z: 10 }; }
    findBestTarget() { return null; }
}

describe('Worker Distraction Investigation', () => {
    let game;
    let unit;
    let terrain;

    beforeEach(() => {
        terrain = new MockTerrain();

        game = {
            simTotalTimeSec: 100,
            isNight: false,
            completeRequest: vi.fn(),
            releaseRequest: vi.fn(),
            deferRequest: vi.fn((req, duration) => {
                req.status = 'pending';
                req.assignedTo = null;
                req.excludedUntil = (game.simTotalTimeSec || 0) + duration;
            }),
            findBestRequest: vi.fn(),
            claimRequest: vi.fn(), // We will use real logic if possible, or mock behavior
            units: [],
            requestQueue: []
        };
        window.game = game;

        // Mock Scene for Unit
        const scene = { add: vi.fn(), remove: vi.fn() };

        unit = new Unit(scene, terrain, 10, 10, 'worker');
        unit.id = 0;
        unit.game = game; // Link back
        game.units.push(unit);
    });

    it('should immediately switch to JobState and target the job upon assignment', async () => {
        // 1. Setup: Unit is wandering
        unit.changeState(new UnitWanderState(unit));

        // 2. Create a manual request FAR AWAY (Trigger Pathfinding)
        const req = {
            id: 'req_1',
            type: 'lower',
            x: 50, // 40 units away (Dist > 15)
            z: 10,
            status: 'pending',
            assignedTo: null,
            isManual: true
        };

        // 3. Simulate Assignment
        console.log(`[Test] Assigning request...`);
        req.status = 'assigned';
        req.assignedTo = unit.id;
        unit.targetRequest = req;

        // Critical State Change logic
        unit.targetGoblin = null;
        unit.targetBuilding = null;
        unit.isSleeping = false;
        unit.action = 'Approaching Job';
        unit.isMoving = false;
        unit.lastPathTime = 0; // Force pathfind
        unit.changeState(new JobState(unit));

        // 4. Update Frame 1
        console.log(`[Test] Update Frame 1...`);
        unit.updateLogic(100.1, 0.1);

        // No wait needed with sync mock
        unit.updateLogic(100.2, 0.1);

        // CHECK: Did it start moving?
        console.log(`[Test] Unit Moving? ${unit.isMoving} Target: ${unit.targetGridX},${unit.targetGridZ}`);

        expect(unit.isMoving).toBe(true);
        // Expect target to be > 10 (Moving towards 50)
        expect(unit.targetGridX).toBeGreaterThan(10);
        expect(unit.state).toBeInstanceOf(JobState);
    });

    it('should NOT be distracted by WanderState updates during Job', async () => {
        // Setup Job State with Far Target (Dist 30)
        const req = { id: 'req_1', type: 'lower', x: 40, z: 10, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = req;
        unit.isMoving = false;
        unit.lastPathTime = 0;
        unit.changeState(new JobState(unit));

        // Force movement start
        unit.smartMove(40, 10, 100);
        // Sync mock, no wait

        unit.updateLogic(100.1, 0.1);
        expect(unit.isMoving).toBe(true);
        expect(unit.targetGridX).toBeGreaterThan(10); // Pathfinding happened

        // Simulate "Ghost" updates
        for (let i = 0; i < 5; i++) {
            unit.updateLogic(100.2 + i * 0.1, 0.1);
            // No wait
            if (unit.state.constructor.name !== 'JobState') {
                console.error(`[Test] State reverted to ${unit.state.constructor.name} at frame ${i}`);
            }
            expect(unit.state).toBeInstanceOf(JobState);
            expect(unit.targetGridX).toBeGreaterThan(10);
        }
    });

    it('should not freeze due to throttle at low game time', async () => {
        unit.changeState(new UnitWanderState(unit));
        const req = { id: 'req_2', type: 'raise', x: 50, z: 50, status: 'assigned', assignedTo: unit.id, isManual: true };

        // Assignment at time 0.5s
        unit.targetRequest = req;
        unit.changeState(new JobState(unit));

        // Frame 1: Time = 0.5
        unit.updateLogic(0.5, 0.1);
        // No wait

        unit.updateLogic(0.6, 0.1);

        // Check that state is still JobState
        expect(unit.state).toBeInstanceOf(JobState);

        // Advance more
        unit.updateLogic(0.7, 0.1);

        expect(unit.state).toBeInstanceOf(JobState);
    });

    it('should NOT build a house immediately if pathfinding fails temporarily', async () => {
        // Setup: Unit on Buildable Land
        terrain.getTileHeight = () => 1;
        unit.canBuildAt = () => true;
        unit.tryBuildStructure = vi.fn(() => true); // Mock successful build

        // Setup Job State
        // Use AUTO request so it CAN be abandoned
        const req = { id: 'req_3', type: 'lower', x: 50, z: 50, status: 'assigned', assignedTo: unit.id, isManual: false };
        unit.targetRequest = req;

        // Mock smartMove to FAIL (Simulate Stuck/Unreachable)
        // We need to trigger the failure counter > 5
        // MUST mock before changeState because enter() calls update() which calls smartMove()
        unit.smartMove = vi.fn(() => false);
        unit.isReachable = () => false; // Force unreachable logic

        unit.changeState(new JobState(unit));

        // Run update loop 120 times (Trigger Give Up at 100, then wait 2s < 5s cooldown)
        for (let i = 0; i < 120; i++) {
            unit.updateLogic(100 + i * 0.1, 0.1);
            await new Promise(r => setTimeout(r, 0));
        }

        // Expectation:
        // 1. JobState should HAVE ABORTED (Abandonment restored)
        // 2. State should be UnitWanderState (or ResumeState)
        // 3. Request should be globally deferred

        expect(unit.state).not.toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBeNull();
        expect(req.excludedUntil).toBeGreaterThan(0);

        expect(unit.tryBuildStructure).not.toHaveBeenCalled();
    });
});
