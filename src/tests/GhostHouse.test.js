
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';

// Mock Terrain (Partial)
import { Terrain } from '../Terrain';

describe('Terrain Ghost House Test', () => {
    let terrain;
    let scene;

    beforeEach(() => {
        vi.useFakeTimers();
        scene = new THREE.Scene();
        terrain = new Terrain(scene, []);
        // Manually init entityGrid if needed (Terrain constructor does it)
        terrain.logicalWidth = 10;
        terrain.logicalDepth = 10;
        terrain.width = 30;
        terrain.depth = 30;
        terrain.initEntityGrid();
        terrain.grid = [];
        for (let x = 0; x < 10; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 10; z++) {
                terrain.grid[x][z] = { height: 2, hasBuilding: false };
            }
        }
        terrain.updateMesh = vi.fn();
        terrain.updateColors = vi.fn();
        terrain.calculateRegions = vi.fn();

    });
    afterEach(() => {
        vi.useRealTimers();

    });
    it('should NOT accumulate ghost buildings (cleared during deserialize)', async () => {
        // 1. Add checks for initial state
        expect(terrain.buildings.length).toBe(0);

        // 2. Add a building manually
        const b1 = terrain.addBuilding('house', 5, 5);

        expect(terrain.buildings.length).toBe(1);

        expect(terrain.entityGrid[5][5].length).toBe(1);
        expect(terrain.entityGrid[5][5][0]).toBe(b1);

        // 3. Serialize (mock data)
        const saveData = {
            logicalWidth: 10,
            logicalDepth: 10,
            grid: []
        };
        // Populate save data with a house at 5,5
        for (let x = 0; x < 10; x++) {
            saveData.grid[x] = [];
            for (let z = 0; z < 10; z++) {
                saveData.grid[x][z] = { height: 2 };
                if (x === 5 && z === 5) {
                    saveData.grid[x][z].hasBuilding = true;
                    saveData.grid[x][z].b = { t: 'house', x: 5, z: 5, p: 0 };
                    // Mock helper flag to force restore
                    saveData.grid[x][z].hb = 1;
                }
            }
        }

        // 4. Deserialize (Simulate Load)
        // This should clear old building and add new one.
        try {
            const deserializePromise = terrain.deserialize(saveData);
            await vi.runAllTimersAsync();
            await deserializePromise;
        } catch (e) {
            // console.error("Deserialize FAILED:", e); // Removed
        }

        // Check Buildings List (Should be 1 - Correctly reset)
        expect(terrain.buildings.length).toBe(1);
        const b2 = terrain.buildings[0];
        expect(b2).not.toBe(b1); // Should be a new instance

        // Check Entity Grid
        const entities = terrain.entityGrid[5][5];
        console.log(`[Test] Entities at 5,5: ${entities ? entities.length : 'NULL'}`);
        if (entities) entities.forEach((e, i) => console.log(` - Ent[${i}] ID:${e.id}`));

        // ASSERT CORRECT BEHAVIOR (No Ghost)
        expect(entities.length).toBe(1);
        expect(entities[0]).toBe(b2);

        // Extra check: Old building should NOT be in grid
        expect(entities).not.toContain(b1);

});
});