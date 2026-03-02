
import { describe, it, expect, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.ts';
import * as THREE from 'three';

describe('Terrain Smoothing', () => {
    let terrain;

    beforeEach(() => {
        terrain = new Terrain(new THREE.Scene());
        // Initialize simple flat grid
        terrain.logicalWidth = 10;
        terrain.logicalDepth = 10;
        terrain.initGrid();
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                terrain.grid[x][z].height = 5;
            }
        }
    });

    it('modifyHeight should propagate height changes', () => {
        // Raise center to 10
        terrain.modifyHeight(5, 5, 5); // 5 -> 10

        // Neighbors should be pulled up to at least 9
        expect(terrain.grid[5][5].height).toBe(10);
        expect(terrain.grid[4][5].height).toBeGreaterThanOrEqual(9);
        expect(terrain.grid[6][5].height).toBeGreaterThanOrEqual(9);
        expect(terrain.grid[5][4].height).toBeGreaterThanOrEqual(9);
        expect(terrain.grid[5][6].height).toBeGreaterThanOrEqual(9);

        // Verification of slope limit: diff <= 1
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                const h = terrain.grid[x][z].height;
                const neighbors = [
                    { x: (x + 1) % 10, z: z },
                    { x: (x - 1 + 10) % 10, z: z },
                    { x: x, z: (z + 1) % 10 },
                    { x: x, z: (z - 1 + 10) % 10 }
                ];
                for (const n of neighbors) {
                    const nh = terrain.grid[n.x][n.z].height;
                    expect(Math.abs(h - nh)).toBeLessThanOrEqual(1.0001);
                }
            }
        }
    });

    it('flattenArea should propagate height changes', () => {
        // Set an area to a high cliff
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                terrain.grid[x][z].height = (x > 5) ? 10 : 0;
            }
        }

        // Flatten a 2x2 area at (5,5) to height 0 (where (5,5) currently is 0)
        // Wait, if (5,5) is 0 and (6,5) is 10, flattening (5,5) won't do much.
        // Let's flatten (6,6) area (high) to height 0 (low)
        terrain.grid[5][5].height = 0; // Target height
        terrain.flattenArea(5, 5, 2); // This will pull down 6x, 7x...

        // Check if (7,7) which was 10 is now lowered to stay smooth with the 0 area
        // Max diff 1.0 means neighbors of 0 are max 1, neighbors of neighbors max 2...

        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                const h = terrain.grid[x][z].height;
                const neighbors = [
                    { x: (x + 1) % 10, z: z },
                    { x: (x - 1 + 10) % 10, z: z },
                    { x: x, z: (z + 1) % 10 },
                    { x: x, z: (z - 1 + 10) % 10 }
                ];
                for (const n of neighbors) {
                    const nh = terrain.grid[n.x][n.z].height;
                    expect(Math.abs(h - nh)).toBeLessThanOrEqual(1.0001);
                }
            }
        }
    });
});
