
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Game } from '../Game.ts';
import { Job, Combat, Wander } from '../ai/states/UnitStates.js';
import * as THREE from 'three';

describe('Manual Job Snatch Persistence', () => {
    let terrain, game, workerA, workerB, scene;

    beforeEach(() => {
        Unit.nextId = 0;
        scene = new THREE.Scene();
        terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            grid: Array(100).fill().map(() => Array(100).fill({ height: 1.0, regionId: 1 })),
            getTileHeight: vi.fn(() => 1.0),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            isReachable: vi.fn(() => true),
            findBestTarget: vi.fn(),
            buildings: []
        };

        game = new Game(scene, terrain);
        game.simTotalTimeSec = 100;

        // Worker A (Original owner)
        workerA = new Unit(scene, terrain, 50, 50, 'worker');
        workerA.faction = 'player';
        workerA.game = game;

        // Worker B (Potential snatchers)
        workerB = new Unit(scene, terrain, 10, 10, 'worker');
        workerB.faction = 'player';
        workerB.game = game;

        game.units = [workerA, workerB];
    });

    it('should allow worker B to snatch a manual job when worker A is fighting ON TOP of the marker', () => {
        // Marker at (50, 50)
        const marker = {
            id: 999,
            type: 'raise',
            x: 50,
            z: 50,
            isManual: true,
            status: 'assigned',
            assignedTo: workerA.id,
            faction: 'player'
        };
        game.requestQueue = [marker];
        workerA.targetRequest = marker;

        // Worker A starts fighting at (50, 50) - dist to marker is 0
        workerA.changeState(new Combat(workerA));
        workerA.targetGoblin = { id: 'gob1', hp: 100 }; // Ensure it stays in combat

        // Worker B is at (10, 10) - dist to marker is 56.5 (sqrt(40^2 + 40^2))
        // Current logic: distSq < dOwnerSq * 4.0
        // dOwner = 0 -> dOwnerSq = 0. 3200 < 0 is FALSE.

        const bestReq = game.findBestRequest(workerB, true, false, true);

        expect(bestReq).not.toBeNull();
        expect(bestReq.id).toBe(marker.id);
        // If this fails, it proves the bug where dOwner=0 blocks snatching
    });

    it('should allow worker B (far) to snatch job when worker A is fighting nearby', () => {
        // Marker at (50, 50)
        const marker = {
            id: 999,
            type: 'raise',
            x: 50,
            z: 50,
            isManual: true,
            status: 'assigned',
            assignedTo: workerA.id,
            faction: 'player'
        };
        game.requestQueue = [marker];
        workerA.targetRequest = marker;

        // Worker A is at (55, 50) - dist to marker is 5.
        workerA.gridX = 55;
        workerA.gridZ = 50;
        workerA.changeState(new Combat(workerA));
        workerA.targetGoblin = { id: 'gob1', hp: 100 };

        // Worker B is at (70, 70) - dist to marker is 28.2 (sqrt(20^2 + 20^2))
        // distSq = 800.
        // dOwnerSq = 25.
        // 800 < 25 * 4 (100) is FALSE.
        // Worker B is free but cannot take the job even though A is fighting!

        workerB.gridX = 70;
        workerB.gridZ = 70;

        const bestReq = game.findBestRequest(workerB, true, false, true);

        expect(bestReq).not.toBeNull();
        expect(bestReq.id).toBe(marker.id);
    });
});
