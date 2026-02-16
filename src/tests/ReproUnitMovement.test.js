
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit';
import { MockGame, MockTerrain } from './TestHelper';

describe('Unit Movement Reproduction', () => {
    let game;
    let terrain;
    let scene;
    let unit;

    beforeEach(() => {
        game = new MockGame();
        terrain = new MockTerrain(100, 100);
        game.terrain = terrain;

        // Setup Terrain grid for valid movement - Height 1 for Grass speed
        for (let x = 0; x < 100; x++) {
            for (let z = 0; z < 100; z++) {
                terrain.grid[x][z] = { regionId: 1, height: 1, type: 'grass', moisture: 0.5 };
            }
        }

        scene = new THREE.Scene();
        // Mock global window/game
        global.window = { game: game };

        unit = new Unit(scene, terrain, 10, 10, 'worker');
        game.units.push(unit);
        unit.game = game;
    });

    it('should move to target using smartMove', async () => {
        const targetX = 20;
        const targetZ = 10;
        const time = 0;

        console.log(`[Repro] Unit start: ${unit.gridX}, ${unit.gridZ}`);

        // Trigger Move
        const result = unit.smartMove(targetX, targetZ, time);

        expect(result).toBe(true);
        expect(unit.isPathfinding).toBe(true);

        // Resolve Async Pathfinding
        await new Promise(resolve => setTimeout(resolve, 10));

        expect(unit.path).not.toBeNull();

        // Simulate movement
        for (let i = 0; i < 10; i++) {
            const t = time + i * 0.1;
            unit.updateMovement(t);
            if (!unit.isMoving && unit.path) {
                unit.onMoveFinished(t);
            }
        }

        // With duration 0.8, at T=0.9 it should have arrived (Progress 1.1)
        expect(unit.gridX).toBeGreaterThan(10);
        expect(unit.isMoving).toBe(false); // Arrived
    });

    it('should stay stuck if pathfinding is never resolved', async () => {
        // Mock findPathAsync to NEVER resolve (simulate dropped message)
        const neverResolvingPromise = new Promise(() => { }); // Eternally pending
        terrain.findPathAsync = vi.fn().mockReturnValue(neverResolvingPromise);

        // 1. Trigger Move
        const result = unit.smartMove(20, 10, 0);
        expect(result).toBe(true);
        expect(unit.isPathfinding).toBe(true);
        expect(unit.isWaitingForPath).toBe(true);

        // 2. Try to move AGAIN (should be blocked)
        const result2 = unit.smartMove(20, 10, 1.0);
        console.log(`[Repro] Second smartMove result: ${result2} (Should be true but blocked internal)`);

        expect(terrain.findPathAsync).toHaveBeenCalledTimes(1);

        // 3. Advancing time doesn't help
        unit.updateMovement(10.0);
        expect(unit.isPathfinding).toBe(true); // Still stuck
    });
});
