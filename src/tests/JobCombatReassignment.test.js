
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Job, Wander, Combat } from '../ai/states/UnitStates.js';
import { Game } from '../Game.js';

class MockTerrain {
    constructor() {
        this.logicalWidth = 160;
        this.logicalDepth = 160;
        this.width = 160;
        this.depth = 160;
        this.grid = Array(160).fill(null).map(() => Array(160).fill({ height: 1, type: 'grass', regionId: 1 }));
    }
    getTileHeight() { return 1; }
    isReachable() { return true; }
    checkFlatArea() { return true; }
    getRegion() { return 1; }
    moveEntity() { }
    registerEntity() { }
    unregisterEntity() { }
    initEntityGrid() { }
    findPath(x1, z1, x2, z2) { return [{ x: x1, z: z1 }, { x: x2, z: z2 }]; }
    findPathAsync(x1, z1, x2, z2) {
        return Promise.resolve(this.findPath(x1, z1, x2, z2));
    }
}

describe('Job Combat Reassignment', () => {
    let game;
    let workerA;
    let workerB;
    let terrain;

    beforeEach(() => {
        terrain = new MockTerrain();
        // Use real Game but in minimal mode
        game = new Game(null, terrain, true);
        game.simTotalTimeSec = 100;

        workerA = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        workerA.id = 1;
        workerA.game = game;

        workerB = new Unit(new THREE.Scene(), terrain, 25, 10, 'worker');
        workerB.id = 2;
        workerB.game = game;

        game.units = [workerA, workerB];
        game.unitMap.set(1, workerA);
        game.unitMap.set(2, workerB);
    });

    it('should allow workerB to snatch a job from workerA if workerA is in Combat', () => {
        // Step 1: Assign job to Worker A
        const req = {
            id: 'req_1',
            type: 'lower',
            x: 5,
            z: 10,
            status: 'assigned',
            assignedTo: workerA.id,
            isManual: true,
            faction: 'player',
            assignedAt: 100
        };
        game.requestQueue = [req];
        workerA.targetRequest = req;
        workerA.changeState(new Job(workerA));

        // Step 2: Make Worker A fighting
        workerA.changeState(new Combat(workerA));
        expect(workerA.state.name).toBe('Combat');

        // Step 3: Worker B searches for work
        workerB.changeState(new Wander(workerB));

        // findBestRequest should now allow snatching from A because A is fighting
        // Normally workerB (at 25,10) is much further than A (at 10,10) to the target (5,10)
        // DistSq B: (25-5)^2 = 400
        // DistSq A: (10-5)^2 = 25
        // 400 > 25 * 0.5 (normal snatch limit)
        // 400 < 25 * 16 (new combat snatch limit? wait, I set it to 4.0. 25 * 4 = 100. Still might be too far?)

        // Let's adjust B closer to be sure. At x=15.
        // DistSq B: (15-5)^2 = 100.
        // 100 < 25 * 4.0 = 100. (Boundary case)

        workerB.gridX = 14;
        // DistSq B: (14-5)^2 = 81.
        // 81 < 25 * 4.0 = 100. YES.

        const found = game.findBestRequest(workerB, true, false);
        expect(found).toBe(req);

        // Step 4: Worker B claims it
        const claimed = game.claimRequest(workerB, req);
        expect(claimed).toBe(true);
        expect(req.assignedTo).toBe(workerB.id);
        expect(workerA.targetRequest).toBeNull();
    });

    it('should reset assignment via watchdog if worker is fighting for > 10s', () => {
        const req = {
            id: 'req_2',
            type: 'raise',
            x: 5,
            z: 10,
            status: 'assigned',
            assignedTo: workerA.id,
            isManual: true,
            faction: 'player',
            assignedAt: 100
        };
        game.requestQueue = [req];
        workerA.targetRequest = req;
        workerA.changeState(new Job(workerA));
        workerA.changeState(new Combat(workerA));

        // Progress time by 5s -> should NOT reset
        game.simTotalTimeSec = 105;
        game.detectZombieRequests();
        expect(req.status).toBe('assigned');

        // Progress time by 61s -> should reset (maxFighting = 60s)
        game.simTotalTimeSec = 161;
        game.detectZombieRequests();
        expect(req.status).toBe('pending');
        expect(req.assignedTo).toBeNull();
    });
});
