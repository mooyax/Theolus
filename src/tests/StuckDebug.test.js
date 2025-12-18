
import { describe, it, expect } from 'vitest';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';

describe('Unit Stuck Debugging', () => {
    it('should log reason for blockage', () => {
        const terrain = new Terrain();
        // Mock init behavior
        terrain.logicalWidth = 100;
        terrain.logicalDepth = 100;
        terrain.grid = Array(100).fill(null).map(() => Array(100).fill(null).map(() => ({ height: 2, hasBuilding: false })));

        // Mock getTileHeight
        terrain.getTileHeight = (x, z) => {
            if (x < 0 || x >= 100 || z < 0 || z >= 100) return 0;
            return terrain.grid[x][z].height;
        };

        // 1. Create a Slope Block
        terrain.grid[10][10].height = 2; // Start
        terrain.grid[11][10].height = 6; // Target (Diff 4 > 2) -> Blocked by Slope

        const unit = new Unit(1, terrain);
        unit.gridX = 10;
        unit.gridZ = 10;

        console.log("--- Testing Slope Block ---");
        const success = unit.canMoveTo(11, 10);
        expect(success).toBe(false);

        // 2. Create a Building Block (Should Pass)
        terrain.grid[20][20].height = 2;
        terrain.grid[21][20].height = 2;
        terrain.grid[21][20].hasBuilding = true;
        terrain.grid[21][20].building = { id: 999, type: 'house' };

        unit.gridX = 20;
        unit.gridZ = 20;

        console.log("--- Testing Building Pass ---");
        const success2 = unit.canMoveTo(21, 20);
        expect(success2).toBe(true);

        // 3. Create a Water Block
        terrain.grid[30][30].height = 0;
        unit.gridX = 29;
        unit.gridZ = 30;
        terrain.grid[29][30].height = 2;

        console.log("--- Testing Water Block ---");
        const success3 = unit.canMoveTo(30, 30);
        expect(success3).toBe(false);
    });
});
