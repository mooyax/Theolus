import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';

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
    registerEntity() { }
}

class MockGame {
    constructor() {
        this.simTotalTimeSec = 100; // Start at 100s
        this.frameCount = 0;
        this.entityManager = {
            units: [],
            getAllUnits: function () { return this.units; },
            register: function (u) { this.units.push(u); },
            getAllGoblins: () => []
        };
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
        game.entityManager.register(unit);

    });
    it('should blacklist unreachable jobs and NOT pick them up immediately', async () => {
        // 1. Create Unreachable Request
        const req = { id: 101, type: 'build', x: 50, z: 50, status: 'assigned', assignedTo: unit.id }; // assignedTo matches unit
        game.requestQueue.push(req);

        // 2. Assign Job
        unit.targetRequest = req;
        unit.changeState(new Job(unit));
        expect(unit.state.name).toBe('Job');
        expect(unit.action).toBe('Approaching Job');

        // 3. Update Loop (Simulate Async Path Failure)
        const time = game.simTotalTimeSec;
        unit.updateLogic(time, 0.1);

        // SmartMove should return false (waiting for path)
        expect(unit.state.name).toBe('Job');

        // 4. Resolve Async Pathfinding (Fail)
        await new Promise(resolve => setTimeout(resolve, 0));

        unit.lastPathTime = game.simTotalTimeSec;
        expect(unit.isUnreachable).toBe(true);

        // 5. Next Update - Job should Handle Failure
        unit.updateLogic(time + 0.1, 0.1);

        // Should release job and set blacklist
        expect(unit.state.name).not.toBe('Job'); // Should be Wander/Resume
        expect(unit.targetRequest).toBeNull();
        expect(req.excludedUntil).toBeGreaterThan(time); // Check global cooldown

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
        unit.changeState(new Job(unit));

        // Fail Path
        await new Promise(resolve => setTimeout(resolve, 0)); // Trigger async start
        unit.isUnreachable = true;
        unit.lastPathTime = game.simTotalTimeSec;

        // Handle Fail
        unit.updateLogic(game.simTotalTimeSec, 0.1);
        expect(unit.state.name).not.toBe('Job');

        // Sim 1 second later (Still blacklisted)
        game.simTotalTimeSec += 1.0;
        let best = game.findBestRequest(unit);
        expect(best).toBeNull();

        // Sim 15 seconds later (Blacklist 10s passed)
        game.simTotalTimeSec += 15.0; 
        best = game.findBestRequest(unit);
        expect(best).toBe(req); // NOW it should pick it up
    });
});