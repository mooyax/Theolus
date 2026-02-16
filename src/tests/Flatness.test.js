import { describe, it, expect, beforeEach } from 'vitest';
import { MockTerrain } from './TestHelper';

describe('Terrain Flatness Check', () => {
    let terrain;

    beforeEach(() => {
        terrain = new MockTerrain();
        terrain.logicalWidth = 10;
        terrain.logicalDepth = 10;
        // Initialize simple grid
        terrain.grid = [];
        for (let x = 0; x < 10; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 10; z++) {
                terrain.grid[x][z] = { height: 10, hasBuilding: false, type: 'grass' };
            }
        }

        // Restore REAL checkFlatArea logic (copy from Terrain.ts)
        terrain.checkFlatArea = function (x, z, size, tolerance = 0.1) {
            const h0 = this.grid[x][z].height;
            if (h0 <= 0) return false;
            if (this.grid[x][z].hasBuilding) return false;

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const nx = (x + i) % this.logicalWidth;
                    const nz = (z + j) % this.logicalDepth;
                    const cell = this.grid[nx][nz];

                    if (Math.abs(cell.height - h0) > tolerance) return false;
                    if (cell.height <= 0) return false;
                    if (cell.hasBuilding) return false;
                }
            }
            return true;
        };
    });

    it('should PASS perfectly flat terrain', () => {
        expect(terrain.checkFlatArea(0, 0, 2, 0.1)).toBe(true);
    });

    it('should PASS minor noise (within 0.1)', () => {
        terrain.grid[0][1].height = 10.05;
        terrain.grid[1][0].height = 9.95;
        expect(terrain.checkFlatArea(0, 0, 2, 0.1)).toBe(true);
    });

    it('should FAIL excessive noise (> 0.1)', () => {
        terrain.grid[0][1].height = 10.11;
        expect(terrain.checkFlatArea(0, 0, 2, 0.1)).toBe(false);
    });

    it('should FAIL slope', () => {
        terrain.grid[0][0].height = 10;
        terrain.grid[0][1].height = 10.2;
        terrain.grid[1][0].height = 10.5;
        terrain.grid[1][1].height = 10.8;
        expect(terrain.checkFlatArea(0, 0, 2, 0.1)).toBe(false);
    });

    it('should FAIL water (height 0)', () => {
        terrain.grid[0][0].height = 0;
        expect(terrain.checkFlatArea(0, 0, 2, 0.1)).toBe(false);
    });
});

