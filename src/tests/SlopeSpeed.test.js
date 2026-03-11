
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit';
import { Goblin } from '../Goblin';
import * as THREE from 'three';

const mockTerrain = {
    logicalWidth: 100,
    logicalDepth: 100,
    grid: [],
    buildings: [],
    getTileHeight: vi.fn(),
    getInterpolatedHeight: vi.fn(),
    registerEntity: vi.fn(),
    moveEntity: vi.fn(),
    gridToWorld: vi.fn(val => val),
    getVisualOffset: vi.fn().mockReturnValue({ x: 0, y: 0 })
};

for (let x = 0; x < 100; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 100; z++) {
        mockTerrain.grid[x][z] = { height: 0, moisture: 0.5 };
    }
}

describe('Slope Speed Sensitivity', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockTerrain.getTileHeight.mockImplementation((x, z) => {
            if (x >= 10) return 1;
            return 0;
        });

        mockTerrain.getInterpolatedHeight.mockImplementation((x, z) => {
            if (x < 9) return 0;
            if (x > 10) return 1;
            return (x - 9);
        });
    });

    it('Unit detects sub-tile slope', () => {
        const unit = new Unit(new THREE.Scene(), mockTerrain, 9.8, 50, 'worker');
        unit.id = 1;

        unit.startMove(10.2, 50, 1000);

        expect(mockTerrain.getInterpolatedHeight).toHaveBeenCalled();
        // Dynamic duration: Math.min(6.0, 1.2 + heightDiff * 2.5)
        // heightDiff between 9.8 and 10.2:
        // H(9.8) = 0.8, H(10.2) = 1.0 -> Diff = 0.2
        // Duration = 1.2 + 0.2 * 2.5 = 1.2 + 0.5 = 1.7
        expect(unit.moveDuration).toBeCloseTo(1.7, 1);
    });

    it('Goblin detects sub-tile slope', () => {
        const goblin = new Goblin(new THREE.Scene(), mockTerrain, 9.8, 50, 'normal');
        goblin.id = 2;

        goblin.startMove(10.2, 50, 1000);

        expect(mockTerrain.getInterpolatedHeight).toHaveBeenCalled();
        expect(goblin.moveDuration).toBeCloseTo(1.7, 1);
    });

    it('Unit on Flat ground stays Fast', () => {
        const unit = new Unit(new THREE.Scene(), mockTerrain, 5.0, 50, 'worker');
        unit.id = 3;
        unit.startMove(6.0, 50, 1000);

        expect(unit.moveDuration).toBe(0.8);
    });
});