
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Terrain } from '../Terrain';

// Minimal Mock
vi.mock('three', () => ({
    Scene: class { },
    Color: class { },
    Mesh: class { },
    PlaneGeometry: class { },
    Group: class { add() { } remove() { } },
    Vector3: class { set() { } copy() { } },
    InstancedMesh: class { count() { } setMatrixAt() { } setColorAt() { } }
}));

describe('Simple Region Connectivity', () => {
    let terrain;
    const size = 10; // Small grid for debugging

    beforeEach(() => {
        // Mock Scene
        const mockScene = { add: () => { }, remove: () => { } };
        terrain = new Terrain(mockScene);
        terrain.logicalWidth = size;
        terrain.logicalDepth = size;

        // Mock deps
        terrain.updateMesh = () => { };
        terrain.updateColors = () => { };
        terrain.checkBuildingIntegrity = () => { };

        // Init Grid
        terrain.grid = [];
        for (let x = 0; x < size; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < size; z++) {
                terrain.grid[x][z] = {
                    height: 0,
                    regionId: 0,
                    moisture: 0,
                    hasBuilding: false
                };
            }
        }
    });

    it('should identify a single island', () => {
        // (5,5) is Land
        terrain.grid[5][5].height = 5;

        console.log("Running calculateRegions...");
        terrain.calculateRegions();
        console.log("Done.");

        const r = terrain.grid[5][5].regionId;
        console.log(`Region ID at 5,5: ${r}`);

        expect(r).toBeGreaterThan(0);
    });

    it('should split two islands', () => {
        terrain.grid[2][2].height = 5;
        terrain.grid[8][8].height = 5;

        terrain.calculateRegions();

        const r1 = terrain.grid[2][2].regionId;
        const r2 = terrain.grid[8][8].regionId;

        expect(r1).toBeGreaterThan(0);
        expect(r2).toBeGreaterThan(0);
        expect(r1).not.toBe(r2);
    });
});
