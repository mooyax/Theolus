import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit';
import { Goblin } from '../Goblin';
import * as THREE from 'three';

// Mock Terrain with Sub-Tile Precision
const mockTerrain = {
    logicalWidth: 100,
    logicalDepth: 100,
    grid: [],
    buildings: [],
    getTileHeight: vi.fn(),
    getInterpolatedHeight: vi.fn(), // Key method
    registerEntity: vi.fn(),
    moveEntity: vi.fn(),
    gridToWorld: vi.fn(val => val), // Added mock
    getVisualOffset: vi.fn().mockReturnValue({ x: 0, y: 0 })
};

// Setup Grid
for (let x = 0; x < 100; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 100; z++) {
        mockTerrain.grid[x][z] = { height: 0, moisture: 0.5 };
    }
}

// Global Mocks
// Mocks handled by setup.js

describe('Slope Speed Sensitivity', () => {

    beforeEach(() => {
        vi.clearAllMocks();

        // Default Tile Height (Integer) logic
        mockTerrain.getTileHeight.mockImplementation((x, z) => {
            // Simple: Round to nearest integer height?
            // Let's say X < 10 is Flat (0), X >= 10 is High (1)
            if (x >= 10) return 1;
            return 0;
        });

        // Precision Height (Interpolated)
        mockTerrain.getInterpolatedHeight.mockImplementation((x, z) => {
            // Linear slope between 9 and 10?
            // X=9 -> 0. X=10 -> 1.
            if (x < 9) return 0;
            if (x > 10) return 1;
            return (x - 9); // Slope 1.0
        });
    });

    it('Unit detects sub-tile slope', () => {
        // Position: 9.8 (Height 0.8)
        // Target: 10.2 (Height 1.0)
        // Diff: 0.2 -> Should trigger Slope Penalty (Duration 3.0)

        // OLD LOGIC (TileHeight):
        // Round(9.8) = 10 -> H=1
        // Round(10.2) = 10 -> H=1
        // Diff = 0 -> Duration 0.8 (Fast) -> BUG!

        // NEW LOGIC (Interpolated):
        // H(9.8) = 0.8
        // H(10.2) = 1.0
        // Diff = 0.2 -> Duration 3.0 (Correct)

        const unit = new Unit(new THREE.Scene(), mockTerrain, 9.8, 50, 'worker');

        // Force properties managed by DOM/Window usually
        unit.id = 1;

        // Perform Calculation
        unit.startMove(10.2, 50, 1000);

        expect(mockTerrain.getInterpolatedHeight).toHaveBeenCalled();
        expect(unit.moveDuration).toBe(3.0); // Expect Slow Speed
    });

    it('Goblin detects sub-tile slope', () => {
        // Same Scenario for Goblin
        const goblin = new Goblin(new THREE.Scene(), mockTerrain, 9.8, 50, 'normal');
        goblin.id = 2;

        goblin.startMove(10.2, 50, 1000);

        expect(mockTerrain.getInterpolatedHeight).toHaveBeenCalled();
        expect(goblin.moveDuration).toBe(3.0);
    });

    it('Unit on Flat ground stays Fast', () => {
        // 5.0 -> 6.0 (Both H=0)
        const unit = new Unit(new THREE.Scene(), mockTerrain, 5.0, 50, 'worker');
        unit.startMove(6.0, 50, 1000);

        expect(unit.moveDuration).toBe(0.8);
    });

});

