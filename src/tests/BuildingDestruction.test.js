import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain.js';

// Mock minimal dependencies
const mockScene = {
    add: vi.fn(),
    remove: vi.fn()
};

describe('Terrain Building Destruction', () => {
    let terrain;

    beforeEach(() => {
        // Reset mocks
        mockScene.add.mockClear();
        mockScene.remove.mockClear();

        // Initialize simple terrain (20x20)
        terrain = new Terrain(mockScene);
        terrain.logicalWidth = 20;
        terrain.logicalDepth = 20;
        terrain.grid = [];
        for (let x = 0; x < 20; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                terrain.grid[x][z] = {
                    height: 5.0, // Flat ground
                    hasBuilding: false,
                    building: null
                };
            }
        }
        terrain.buildings = [];
        terrain.updateMesh = vi.fn();
        terrain.updateColors = vi.fn();
    });

    it('should destroy a Goblin Hut when terrain height changes under it', () => {
        const x = 10;
        const z = 10;

        // 1. Add Goblin Hut
        const hut = terrain.addBuilding('goblin_hut', x, z);
        expect(hut).toBeDefined();
        expect(terrain.grid[x][z].hasBuilding).toBe(true);
        expect(terrain.buildings.length).toBe(1);

        // Ensure hut has Y coordinate (New Logic)
        expect(hut.y).toBe(5.0);

        // 2. Modify Height (Dig)
        console.log("Modifying height at", x, z);
        terrain.modifyHeight(x, z, -1.0);

        // 3. Verify Destruction
        // The hut should be removed because:
        // a) Height changed (5.0 -> 4.0)
        // b) Math.abs(current - original) > 0.1

        expect(terrain.grid[x][z].hasBuilding).toBe(false);
        expect(terrain.grid[x][z].building).toBeNull();
        expect(terrain.buildings.length).toBe(0);
        // expect(mockScene.remove).toHaveBeenCalled(); // Removed: Terrain does not manage scene removal for buildings
    });

    it('should destroy a Goblin Hut if a corner of its tile is raised (Warping)', () => {
        const x = 10;
        const z = 10;
        const hut = terrain.addBuilding('goblin_hut', x, z);
        expect(terrain.buildings.length).toBe(1);

        // Modify (11, 11) -> Wraps to warping tile (10, 10)
        terrain.modifyHeight(x + 1, z + 1, 1.0);

        expect(terrain.buildings.length).toBe(0);
    });

    it('should destroy a Goblin Hut if terrain raises up', () => {
        const x = 5;
        const z = 5;
        const hut = terrain.addBuilding('goblin_hut', x, z);
        expect(terrain.buildings.length).toBe(1);

        // Raise terrain
        terrain.modifyHeight(x, z, 1.0);

        expect(terrain.buildings.length).toBe(0);
    });

    it('should destroy legacy hut (undefined y) on height change', () => {
        const x = 8;
        const z = 8;
        const hut = terrain.addBuilding('goblin_hut', x, z);

        // Simulate Legacy state
        delete hut.y;
        expect(hut.y).toBeUndefined();

        terrain.modifyHeight(x, z, 0.5); // Minor change

        expect(terrain.buildings.length).toBe(0);
    });
});
