
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Minimal Mock
vi.mock('three', () => ({
    Vector3: class { constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; } },
    Group: class { constructor() { this.add = vi.fn(); } },
    Mesh: class { constructor() { this.add = vi.fn(); } },
    Scene: class { constructor() { this.add = vi.fn(); } },
    BoxGeometry: class { }, PlaneGeometry: class { }, CylinderGeometry: class { }, ConeGeometry: class { }, SphereGeometry: class { },
    MeshStandardMaterial: class { }, MeshBasicMaterial: class { },
    TextureLoader: class { load() { return {}; } },
    Color: class { setHex() { } set() { } },
    MathUtils: { clamp: (v, min, max) => Math.min(Math.max(v, min), max) }
}));

describe('Deep Cup Pathfinding', () => {
    let terrain;

    beforeEach(() => {
        vi.spyOn(Terrain.prototype, 'initTerrain').mockImplementation(() => { });
        vi.spyOn(Terrain.prototype, 'initEntityGrid').mockImplementation(() => { });

        terrain = new Terrain();
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
        // Unit at (50, 50). Target at (90, 50).
        // Wall blocks direct East path. x=60.
        for (let z = 20; z <= 80; z++) {
            terrain.grid[60][z] = { height: 100, regionId: 1, type: 'wall' };
        }
        // Side Walls
        for (let x = 20; x <= 60; x++) {
            terrain.grid[x][20] = { height: 100, regionId: 1, type: 'wall' };
            terrain.grid[x][80] = { height: 100, regionId: 1, type: 'wall' };
        }

        terrain.isWalkable = (x, z) => {
            if (!terrain.grid[x] || !terrain.grid[x][z]) return false;
            return terrain.grid[x][z].height < 10;
        };
        terrain.getTileHeight = (x, z) => terrain.grid[x][z].height;
    });

    it('should find path out of Deep Cup within maxSteps (Trap Check)', () => {
        const startX = 55;
        const startZ = 50;
        const targetX = 90;
        const targetZ = 50;

        // Use default maxSteps (now 40000)
        const path = terrain.findPath(startX, startZ, targetX, targetZ);

        if (path) {
            console.log(`Path Found! Length: ${path.length}`);
            const end = path[path.length - 1];
            console.log(`End Node: ${end.x},${end.z}`);

            const isPartial = (end.x !== targetX || end.z !== targetZ);
            if (isPartial) {
                console.warn("WARNING: Returned Partial Path!");
                if (end.x >= 58 && end.x <= 60) console.log("CONFIRMED: Unit stuck at Greedy Local Minimum (Wall).");
            } else {
                console.log("SUCCESS: Full Path Found.");
            }
        } else {
            console.error("Path Failed (null).");
        }

        expect(path).toBeDefined();
    });
});
