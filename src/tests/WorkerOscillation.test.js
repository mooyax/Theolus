
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { JobState } from '../ai/states/UnitStates.js';

// Mock Classes
class MockTerrain {
    constructor() {
        this.grid = [];
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.buildings = [];
        for (let x = 0; x < 100; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                this.grid[x][z] = { height: 1, regionId: 1 };
            }
        }
        this.pathfindingCalls = 0;
    }
    getTileHeight(x, z) { return 1; }
    findPathAsync(sx, sz, tx, tz) {
        return Promise.resolve([]); // Always fail (Unreachable)
    }
    findPath(sx, sz, tx, tz) { return null; }
    unregisterEntity() { }
}

class MockGame {
    constructor() {
        this.simTotalTimeSec = 100; // Start at 100s
        this.frameCount = 0;
        this.units = [];
        this.requestQueue = [];
    }
    findBestRequest(unit) {
        // Simple mock of Game.findBestRequest logic verification
        for (const req of this.requestQueue) {
            if (req.excludedUntil && this.simTotalTimeSec < req.excludedUntil) continue;
            if (unit.ignoredTargets.has(req.id)) {
                const expiry = unit.ignoredTargets.get(req.id);
                if (this.simTotalTimeSec < expiry) continue;
            }
            return req;
        }
        return null;
    }
    claimRequest(unit, req) {
        unit.targetRequest = req;
        return true;
    }
    releaseRequest(unit, req) {
        unit.targetRequest = null;
    }
    completeRequest(unit, req) { }
    deferRequest(req, duration) {
        req.excludedUntil = this.simTotalTimeSec + duration;
        req.status = 'pending';
        req.assignedTo = null;
    }
}

describe('Worker Oscillation Debug', () => {
    let unit, terrain, game;

    beforeEach(() => {
        terrain = new MockTerrain();
        game = new MockGame();

        // Mock THREE
        global.THREE = THREE;

        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        unit.game = game;
        unit.id = 1;
        game.units.push(unit);
    });

    it('should blacklist unreachable jobs and NOT pick them up immediately', async () => {
        // 1. Create Unreachable Request
        const req = { id: 101, type: 'build', x: 50, z: 50, status: 'assigned', assignedTo: unit.id }; // assignedTo matches unit
        game.requestQueue.push(req);

        // 2. Assign Job
        unit.targetRequest = req;
        unit.changeState(new JobState(unit));
        expect(unit.state.name).toBe('JobState');
        expect(unit.action).toBe('Approaching Job');

        // 3. Update Loop (Simulate Async Path Failure)
        const time = game.simTotalTimeSec;
        unit.updateLogic(time, 0.1);

        // SmartMove should return false (waiting for path)
        // Unit should still be in JobState waiting
        expect(unit.state.name).toBe('JobState');

        // 4. Resolve Async Pathfinding (Fail)
        // Must wait for promise microtask?
        await new Promise(resolve => setTimeout(resolve, 0));

        // Actor should now have isUnreachable = true
        // But JobState needs another update to see it
        // FIX: Ensure lastPathTime is set so smartMove throttles and respects the failure
        unit.lastPathTime = game.simTotalTimeSec;
        expect(unit.isUnreachable).toBe(true);

        // 5. Next Update - JobState should Handle Failure
        unit.updateLogic(time + 0.1, 0.1);

        // Should release job and set blacklist
        expect(unit.state.name).not.toBe('JobState'); // Should be Wander/Resume
        expect(unit.targetRequest).toBeNull();
        expect(req.excludedUntil).toBeGreaterThan(time); // Check global cooldown instead of local ignoredTargets

        // 6. Verify Game.findBestRequest rejects it
        const best = game.findBestRequest(unit);
        expect(best).toBeNull(); // Should act as if no job exists
    });

    it('should NOT oscillate (Ping Pong) between Job and Idle', async () => {
        // Simulate extended timeframe
        const req = { id: 102, type: 'build', x: 50, z: 50, status: 'assigned', assignedTo: unit.id };
        game.requestQueue.push(req);

        // Initial Assign
        unit.targetRequest = req;
        unit.changeState(new JobState(unit));

        // Fail Path
        await new Promise(resolve => setTimeout(resolve, 0)); // Trigger async start
        // Manually trigger failure flag for test simulation
        unit.isUnreachable = true;
        unit.lastPathTime = game.simTotalTimeSec; // Fix: Simulate recent attempt so smartMove throttles and sees flag

        // Handle Fail
        unit.updateLogic(game.simTotalTimeSec, 0.1);
        expect(unit.state.name).not.toBe('JobState');

        // Sim 1 second later (Still blacklisted)
        game.simTotalTimeSec += 1.0;
        let best = game.findBestRequest(unit);
        expect(best).toBeNull();

        // Sim 9 seconds later (Total 10s passed from start? Blacklist is 10s?)
        // JobState sets time + 10.0 (Unit line 1344 says 5s, JobState line 396 says 10s)
        game.simTotalTimeSec += 9.0;
        best = game.findBestRequest(unit);

        // At Time+10, it might expire?
        // JobState: time + 10.0.
        // Current: Start(100) + 10 = 110. Expiry = 110.
        // If simTime > expiry? 110 > 110? No.

        game.simTotalTimeSec += 6.0; // 116 > 115
        best = game.findBestRequest(unit);
        expect(best).toBe(req); // NOW it should pick it up
    });
});
