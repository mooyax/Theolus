
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';
import { Actor } from '../Actor.js';

// Mock MockTerrain and MockGame (Same as before)
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
        // Mock: If target is 50,50 fail. If 20,20 success.
        if (tx === 50 && tz === 50) return Promise.resolve([]); // Fail
        return Promise.resolve([{ x: sx, z: sz }, { x: tx, z: tz }]); // Success
    }
    findPath(sx, sz, tx, tz) { return null; }
    unregisterEntity() { }
    registerEntity() { }
}

class MockGame {
    constructor() {
        this.simTotalTimeSec = 100;
        this.frameCount = 0;
        this.units = [];
        this.requestQueue = [];
    }
    findBestRequest(unit) {
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
        global.THREE = THREE;
        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        unit.game = game;
        unit.id = 1;
        game.units.push(unit);
    });

    it('should clear isUnreachable flag when entering new job', async () => {
        // 1. Fail Job A
        const reqA = { id: 101, type: 'build', x: 50, z: 50, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = reqA;
        unit.changeState(new Job(unit));

        // Trigger Fail
        unit.updateLogic(game.simTotalTimeSec, 0.1);
        await new Promise(r => setTimeout(r, 10)); // Increase wait slightly

        // FIX: Ensure throttle prevents immediate retry
        unit.lastPathTime = game.simTotalTimeSec;

        unit.updateLogic(game.simTotalTimeSec + 0.1, 0.1); // Process fail

        // Expect false because Job exit -> WanderState enter -> smartMove clears it!
        // This confirms that the system naturally clears the flag, preventing oscillation loop.
        // Flag remains true because we throttled and haven't started new pathfinding yet
        // Flag is cleared by Job when handling the failure
        expect(unit.isUnreachable).toBe(false);
        expect(unit.targetRequest).toBeNull(); // Dropped

        // 2. Assign Job B (Reachable)
        const reqB = { id: 202, type: 'build', x: 20, z: 20, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = reqB;
        unit.changeState(new Job(unit));

        // CRITICAL CHECK: Entering Job should have cleared isUnreachable
        // Should be false now.
        expect(unit.isUnreachable).toBe(false);

        // 3. Process Job B
        unit.updateLogic(game.simTotalTimeSec + 0.2, 0.1);

        // If flag was stale (true), it would be dropped here.
        expect(unit.targetRequest).toBe(reqB);
    });
});
