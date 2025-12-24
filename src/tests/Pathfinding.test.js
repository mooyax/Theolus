
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain';

// Mock THREE
vi.mock('three', () => {
    return {
        Scene: class { },
        Color: class { },
        MeshStandardMaterial: class { },
        Mesh: class { },
        Group: class { add() { } remove() { } },
        PlaneGeometry: class { },
        Vector3: class { set() { } copy() { } },
        InstancedMesh: class { setMatrixAt() { } setColorAt() { } count() { } },
        Matrix4: class { makeTranslation() { } makeScale() { } },
        CanvasTexture: class { },
        Float32BufferAttribute: class { }
    };
});

describe('Terrain Pathfinding & Connectivity', () => {
    let terrain;
    const W = 40;
    const H = 40;

    beforeEach(() => {
        terrain = new Terrain(new THREE.Scene());
        terrain.logicalWidth = W;
        terrain.logicalDepth = H;

        // Stub visualization methods to prevent THREE.js crashes
        terrain.updateMesh = vi.fn();
        terrain.updateColors = vi.fn();
        terrain.checkBuildingIntegrity = vi.fn();

        // Manual Grid Init
        terrain.grid = [];
        for (let x = 0; x < W; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < H; z++) {
                terrain.grid[x][z] = {
                    height: 0, // Water
                    moisture: 0,
                    regionId: 0,
                    hasBuilding: false
                };
            }
        }
        // Initialize other structures if needed
        terrain.pathCache = [];
    });

    it('should calculate regions correctly for two separate islands', () => {
        // Island 1: (5,5)
        terrain.grid[5][5].height = 5;

        // Island 2: (15,15)
        terrain.grid[15][15].height = 5;

        terrain.calculateRegions();

        const r1 = terrain.grid[5][5].regionId;
        const r2 = terrain.grid[15][15].regionId;

        console.log(`[Test] r1=${r1}, r2=${r2}, W=${terrain.logicalWidth}`);

        expect(r1).toBeGreaterThan(0);
        expect(r2).toBeGreaterThan(0);
        expect(r1).not.toBe(r2); // Should be different IDs
    });

    it('should assign same region ID for connected land (U-shape)', () => {
        // Construct U-Shape
        // (10,10) -> (10, 20) -> (20, 20) -> (20, 10)

        // Vertical Left
        for (let z = 10; z <= 20; z++) terrain.grid[10][z].height = 5;
        // Horizontal Bottom
        for (let x = 10; x <= 20; x++) terrain.grid[x][20].height = 5;
        // Vertical Right
        for (let z = 10; z <= 20; z++) terrain.grid[20][z].height = 5;

        terrain.calculateRegions();

        const startRegion = terrain.grid[10][10].regionId;
        const endRegion = terrain.grid[20][10].regionId;

        expect(startRegion).toBeGreaterThan(0);
        expect(startRegion).toBe(endRegion); // Connected
    });

    it('should find path on U-shaped land (Local Minimum Trap)', () => {
        // Construct U-Shape barrier with Water in middle
        // Start: 10,10. End: 20,10.
        // Direct path (row 10) is blocked by Water (height 0).
        // Must go Down to Z=20, Across, and Up.

        for (let z = 10; z <= 20; z++) terrain.grid[10][z].height = 5;
        for (let x = 10; x <= 20; x++) terrain.grid[x][20].height = 5;
        for (let z = 10; z <= 20; z++) terrain.grid[20][z].height = 5;

        // Verify direct path is water
        expect(terrain.grid[15][10].height).toBe(0);

        const path = terrain.findPath(10, 10, 20, 10);

        expect(path).not.toBeNull();
        expect(path.length).toBeGreaterThan(20); // Must be long

        // Verify path validity
        for (const node of path) {
            expect(terrain.grid[node.x][node.z].height).toBeGreaterThan(0);
        }

        console.log(`Path Length: ${path.length}`);
    });

    it('should FAIL to find path between disconnected islands', () => {
        terrain.grid[5][5].height = 5;
        terrain.grid[15][15].height = 5;

        const path = terrain.findPath(5, 5, 15, 15);
        expect(path).toBeNull();
    });

    it('should FAIL if start or end is water', () => {
        terrain.grid[10][10].height = 5;

        const path1 = terrain.findPath(10, 10, 0, 0); // End is water
        expect(path1).toBeNull();

        const path2 = terrain.findPath(0, 0, 10, 10); // Start is water
        expect(path2).toBeNull();
    });

    it('should handle wrapped paths correctly', () => {
        // Land crossing the boundary X=0 / X=39
        terrain.grid[0][10].height = 5;
        terrain.grid[39][10].height = 5;

        terrain.calculateRegions();
        const r1 = terrain.grid[0][10].regionId;
        const r2 = terrain.grid[39][10].regionId;
        expect(r1).toBe(r2); // Region logic wraps

        const path = terrain.findPath(0, 10, 39, 10);
        expect(path).not.toBeNull();
        expect(path.length).toBeLessThan(5); // Should just step across boundary
    });
});
