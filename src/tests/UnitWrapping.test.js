import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Unit Movement Wrapping', () => {
    let mockTerrain;
    let unit;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
    });

    beforeEach(() => {
        const grid = Array(80).fill().map(() => Array(80).fill({ hasBuilding: false }));

        mockTerrain = {
            getTileHeight: (x, z) => 1,
            getInterpolatedHeight: (x, z) => 1,
            grid: grid,
            logicalWidth: 80, // Use 80 as in game
            logicalDepth: 80,
            getVisualPosition: () => ({ x: 0, y: 0, z: 0 }),
            moveEntity: vi.fn(),
            registerEntity: vi.fn(),
            getBuildingSize: () => 1
        };

        unit = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'worker');
    });

    it('should move normally for short distances', () => {
        // Unit at 10, Target at 15. dx = 5.
        // Should move +1 X.
        unit.gridX = 10;
        unit.gridZ = 10;
        unit.triggerMove(15, 10, 1000);

        expect(unit.targetGridX).toBe(11);
        expect(unit.targetGridZ).toBe(10);
    });

    it('should wrap LEFT if target is across right boundary', () => {
        // Unit at 10. Target at 70. 
        // Forward: 60 steps. Backward: 20 steps.
        // dx = 60. > 40.
        // Should go Left (-1) -> 9.
        unit.gridX = 10;
        unit.gridZ = 10;
        unit.triggerMove(70, 10, 1000);

        expect(unit.targetGridX).toBe(9);
        expect(unit.targetGridZ).toBe(10);
    });

    it('should wrap RIGHT if target is across left boundary', () => {
        // Unit at 70. Target at 10.
        // dx = -60. Abs(60) > 40.
        // Should go Right (+1) -> 71.
        unit.gridX = 70;
        unit.gridZ = 10;
        unit.triggerMove(10, 10, 1000);

        expect(unit.targetGridX).toBe(71);
        expect(unit.targetGridZ).toBe(10);
    });

    it('should handle Z axis wrapping', () => {
        // Unit at 10,10. Target 10,70.
        // dz = 60. > 40.
        // Should go Up/Left (Z-1) -> 10,9.
        unit.gridX = 10;
        unit.gridZ = 10;
        unit.triggerMove(10, 70, 1000);

        expect(unit.targetGridX).toBe(10);
        expect(unit.targetGridZ).toBe(9);
    });
});
