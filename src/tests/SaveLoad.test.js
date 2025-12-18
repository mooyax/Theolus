
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Mock Scene
const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    children: []
};

// Mock Game Global if needed
vi.stubGlobal('window', {
    game: {
        goblinManager: { recordRaidLocation: vi.fn() }
    }
});

describe('Save/Load System', () => {
    let terrain;

    beforeEach(() => {
        mockScene.add.mockClear();
        mockScene.remove.mockClear();

        // Initialize Terrain
        terrain = new Terrain(mockScene);
        terrain.init(20, 20); // 20x20 grid
    });

    it('should save and load a Barracks correctly', () => {
        const x = 5;
        const z = 5;

        // 1. Build Barracks
        const barracks = terrain.addBuilding('barracks', x, z);
        expect(barracks).toBeDefined();
        expect(barracks.userData.type).toBe('barracks');
        expect(terrain.buildings.length).toBe(1);

        // 2. Serialize
        const data = terrain.serialize();

        // Check if data contains the barracks
        // Grid search for the building data
        const cellData = data.grid[x][z];

        expect(cellData.b).toBeDefined();
        expect(cellData.b.t).toBe('barracks');

        // 3. Clear Terrain (Simulate Reload)
        terrain.deserialize(null); // Or manually clear? deserialize handles clearing.
        // But passing null just logs error.
        // Let's create a NEW terrain to simulate fresh load.
        const newTerrain = new Terrain(mockScene);
        newTerrain.init(20, 20);

        // 4. Deserialize
        newTerrain.deserialize(data);

        // 5. Verify Restoration
        expect(newTerrain.buildings.length).toBe(1);
        const restored = newTerrain.buildings[0];
        expect(restored.userData.type).toBe('barracks');
        expect(restored.userData.gridX).toBe(x);
        expect(restored.userData.gridZ).toBe(z);
    });

    it('should save and load a Tower correctly', () => {
        const x = 10;
        const z = 10;

        const tower = terrain.addBuilding('tower', x, z);
        expect(tower).toBeDefined();

        const data = terrain.serialize();

        const newTerrain = new Terrain(mockScene);
        newTerrain.init(20, 20);
        newTerrain.deserialize(data);

        expect(newTerrain.buildings.length).toBe(1);
        expect(newTerrain.buildings[0].userData.type).toBe('tower');
    });

    it('should restore building even if terrain height implies it is invalid (Force Place)', () => {
        const x = 2;
        const z = 2;

        // 1. Build
        terrain.addBuilding('barracks', x, z);

        // 2. Serialize
        const data = terrain.serialize();

        // 3. Modifiy data to screw up height? 
        // Or simulate rounding error.
        // data.grid[x][z].h += 0.001; 

        // 4. Load into fresh terrain
        const newTerrain = new Terrain(mockScene);
        newTerrain.init(20, 20);

        // Mess up the terrain height where we expect the building
        newTerrain.grid[x][z].height += 0.5;
        // Normal addBuilding would fail here due to flatness check.

        newTerrain.deserialize(data); // Should use force=true

        expect(newTerrain.buildings.length).toBe(1);
        expect(newTerrain.buildings[0].userData.type).toBe('barracks');
    });
});
