
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain.js';

describe('Terrain Detection Logic', () => {
    let terrain;

    beforeEach(() => {
        // Limited Mock of Terrain
        const mockScene = { add: vi.fn(), remove: vi.fn() };
        terrain = new Terrain(mockScene, { logicalWidth: 20, logicalDepth: 20 });

        // Mock Grid with Regions
        terrain.grid = [];
        for (let x = 0; x < 20; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                terrain.grid[x][z] = {
                    height: 1,
                    regionId: 1 // Default Region 1
                };
            }
        }

        // Setup Region 2 (Separated by wall)
        // 0-9: Region 1
        // 10-19: Region 2
        for (let x = 10; x < 20; x++) {
            for (let z = 0; z < 20; z++) {
                terrain.grid[x][z].regionId = 2;
            }
        }

        terrain.entityGrid = []; // Not testing grid optimization here, strictly list fallback first or grid if populated
        terrain.getRegion = (x, z) => {
            if (x < 0 || x >= 20 || z < 0 || z >= 20) return -1;
            return terrain.grid[x][z].regionId;
        };
    });

    it('should detect target in same region', () => {
        const cx = 5, cz = 5; // Region 1
        const target = { gridX: 6, gridZ: 6, type: 'goblin', id: 1 }; // Region 1

        const list = [target];
        const best = terrain.findBestTarget('goblin', cx, cz, 10, (e, dist) => dist, list);

        expect(best).toBe(target);
    });

    it('should NOT detect target in different region (Cross Mountain)', () => {
        const cx = 5, cz = 5; // Region 1
        const target = { gridX: 15, gridZ: 5, type: 'goblin', id: 2 }; // Region 2

        const list = [target];
        // Distance is 10, within range 20
        const best = terrain.findBestTarget('goblin', cx, cz, 20, (e, dist) => dist, list);

        expect(best).toBeNull();
    });

    it('should rely on Grid search and respect regions', () => {
        // Populate Entity Grid
        terrain.entityGrid = [];
        for (let x = 0; x < 20; x++) {
            terrain.entityGrid[x] = [];
            for (let z = 0; z < 20; z++) {
                terrain.entityGrid[x][z] = [];
            }
        }

        const cx = 5, cz = 5; // Region 1
        const targetSame = { gridX: 6, gridZ: 6, type: 'goblin', id: 1, _spatial: { x: 6, z: 6, type: 'goblin' } }; // Region 1
        const targetDiff = { gridX: 15, gridZ: 5, type: 'goblin', id: 2, _spatial: { x: 15, z: 5, type: 'goblin' } }; // Region 2

        terrain.entityGrid[6][6].push(targetSame);
        terrain.entityGrid[15][5].push(targetDiff);

        // Force useGrid by passing null list and ensure conditions met
        // findBestTarget internal logic: useGrid = (this.entityGrid && (!list || list.length > 500) && maxRange < 40);
        // We pass null list.

        const best = terrain.findBestTarget('goblin', cx, cz, 20, (e, dist) => dist, null);

        expect(best).toBe(targetSame); // Should pick the one in same region, ignoring the other
    });

    it('should detect target in different region IF CLOSE (Melee Exemption)', () => {
        const cx = 5, cz = 5; // Region 1
        const targetDiffClose = { gridX: 6, gridZ: 6, type: 'goblin', id: 3 }; // Region 2 (d2 = 2 < 9)
        const targetDiffFar = { gridX: 15, gridZ: 5, type: 'goblin', id: 2 }; // Region 2

        // Mock Regions specifically for this test if needed, but beforeEach sets 10+ to Reg 2
        // We need Reg 2 at (6,6) for this test? Use map override.
        terrain.getRegion = (x, z) => {
            if (x === 6 && z === 6) return 2; // Close target in Reg 2
            if (x === 15 && z === 5) return 2; // Far target in Reg 2
            return 1;
        };

        const list = [targetDiffClose, targetDiffFar];
        const best = terrain.findBestTarget('goblin', cx, cz, 20, (e, dist) => dist, list);

        expect(best).toBe(targetDiffClose); // Should pick the close one despite region mismatch
    });
});
