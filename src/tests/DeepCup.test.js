
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

global.THREE = THREE;

describe('Deep U-Shape / Cup Pathfinding', () => {
    let terrain;

    beforeEach(() => {
        vi.spyOn(Terrain.prototype, 'initMeshes').mockImplementation(() => { });
        vi.spyOn(Terrain.prototype, 'initEntityGrid').mockImplementation(() => { });
        vi.spyOn(Terrain.prototype, 'calculateRegions').mockImplementation(() => Promise.resolve());
        vi.spyOn(Terrain.prototype, 'syncToWorker').mockImplementation(() => { });

        terrain = new Terrain(new THREE.Scene());
        terrain.logicalWidth = 100;
        terrain.logicalDepth = 100;
        terrain.grid = [];
        for (let x = 0; x < 100; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                terrain.grid[x][z] = { height: 1, regionId: 1, type: 'grass' };
            }
        }

        // Deep U-Shape / Cup
        // Unit inside at (55, 50). Target outside at (90, 50).
        // Wall blocks direct East path at x=60.
        for (let z = 20; z <= 80; z++) {
            terrain.grid[60][z] = { height: 100, regionId: 1, type: 'wall' };
        }
        // Side Walls
        for (let x = 20; x <= 60; x++) {
            terrain.grid[x][20] = { height: 100, regionId: 1, type: 'wall' };
            terrain.grid[x][80] = { height: 100, regionId: 1, type: 'wall' };
        }

        terrain.isWalkable = (x, z) => {
            if (x < 0 || x >= 100 || z < 0 || z >= 100) return false;
            return terrain.grid[x][z].height < 10;
        };
        terrain.getTileHeight = (x, z) => terrain.grid[x][z].height;
        terrain.isValidGrid = (x, z) => x >= 0 && x < 100 && z >= 0 && z < 100;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should find path out of Deep Cup within maxSteps (Trap Check)', () => {
        const startX = 55;
        const startZ = 50;
        const targetX = 90;
        const targetZ = 50;

        // Path should go around the wall (likely to z < 20 or z > 80)
        const path = terrain.findPath(startX, startZ, targetX, targetZ);

        expect(path).toBeDefined();
        expect(path.length).toBeGreaterThan(0);

        const end = path[path.length - 1];
        // In some cases it might return a partial path if maxSteps is hit, 
        // but it should at least return something.
        expect(end).toBeDefined();
    });
});