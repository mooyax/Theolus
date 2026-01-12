import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';

// Minimal Mocks
global.window = {
    game: {
        releaseRequest: vi.fn(),
        resources: { meat: 0 }
    }
};

describe('Death Animation and Logic Fixes', () => {
    let unit;
    let scene;
    let terrain;

    beforeEach(() => {
        scene = {
            add: vi.fn(),
            remove: vi.fn()
        };
        terrain = {
            getTileHeight: () => 1,
            getRegion: () => 1,
            grid: []
        };

        // Mock Unit.getCrossAssets static method to avoid loading real geometry
        Unit.getCrossAssets = vi.fn(() => ({
            crossV: new THREE.BoxGeometry(1, 1, 1),
            crossH: new THREE.BoxGeometry(1, 1, 1)
        }));

        unit = new Unit(scene, terrain, 10, 10, 'worker');
        unit.id = 0;
        unit.game = window.game;
    });

    it('should update death animation and remove cross after duration', () => {
        // 1. Kill the unit
        unit.die();
        expect(unit.isDead).toBe(true);
        expect(unit.crossMesh).toBeDefined();
        expect(scene.add).toHaveBeenCalled(); // Cross added

        // 2. Update Logic (Simulate 1 second)
        // Before Fix: updateDeathAnimation check missing, so deathTimer stays 0
        unit.updateLogic(100, 1.0);

        expect(unit.crossMesh).toBeDefined(); // Still there

        // 3. Update Logic (Simulate > 3 seconds total)
        unit.updateLogic(101, 2.5); // Total 3.5s

        // Expectation: Cross removed
        expect(unit.crossMesh).toBeNull();
        expect(scene.remove).toHaveBeenCalled();
        expect(unit.isFinished).toBe(true);
    });

    it('should Stop moving/updating logic when Dead (Ghost Unit Fix)', () => {
        unit.isMoving = true;
        unit.targetGridX = 20;

        // Kill
        unit.die();

        // Spy on state update
        unit.state = { update: vi.fn() };

        // Update
        unit.updateLogic(100, 0.1);

        // Expectation:
        // 1. Should NOT call state.update (Ghost Unit fix)
        // 2. Should NOT behave as moving (conceptually) - though isMoving might stay true, logic shouldn't run.
        expect(unit.state.update).not.toHaveBeenCalled();
    });
});
