
import { describe, it, expect, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain.js';

describe('Terrain Force Build Logic', () => {
    let terrain;
    let scene;

    beforeEach(() => {
        // Mock Browser Globals
        global.window = {};
        global.window.game = {
            units: []
        };
        // Also set on global for direct access if code uses `game` (though usually it's window.game)
        global.game = global.window.game;

        scene = new THREE.Scene();
        terrain = new Terrain(scene);
        // Ensure test area (0-20) is flat land (height 5) to prevent Water rejection
        for (let x = 0; x < 20; x++) {
            for (let z = 0; z < 20; z++) {
                if (terrain.grid[x] && terrain.grid[x][z]) {
                    terrain.grid[x][z].height = 5;
                    terrain.grid[x][z].moisture = 0.5;
                }
            }
        }
    });

    it('should clear existing buildings when placing a new one', () => {
        // 1. Place a House at (10, 10)
        terrain.addBuilding('house', 10, 10);

        let cell = terrain.grid[10][10];
        expect(cell.hasBuilding).toBe(true);
        expect(cell.building.type).toBe('house');
        expect(terrain.buildings.length).toBe(1);

        // 2. Place a Barracks at (10, 10) - Should overwrite
        // Barracks might be larger (size 3) vs House (size 2), but anchor is same.
        // It should detect the house in the footprint and remove it.
        const newBuilding = terrain.addBuilding('barracks', 10, 10);

        // 3. Verify House is gone
        // We can check if the specific house object is still in the array
        const hasHouse = terrain.buildings.some(b => b.type === 'house');
        expect(hasHouse).toBe(false);

        // 4. Verify Barracks exists
        expect(terrain.buildings.length).toBe(1); // Only barracks remains
        expect(terrain.buildings[0].type).toBe('barracks');

        // Check Grid
        cell = terrain.grid[10][10];
        expect(cell.hasBuilding).toBe(true);
        expect(cell.building.type).toBe('barracks');
    });

    it('should clear buildings partially in the way', () => {
        // 1. Place House at (10, 10)
        terrain.addBuilding('house', 10, 10);

        // 2. Place Barracks at (9, 9) - Should overlap (Size 3 vs 2)
        // Barracks at 9,9 covers 9,10,11 x 9,10,11.
        // House at 10,10 covers 10,11 x 10,11.
        // So they overlap at (10,10).
        console.log('Pre-Barracks Buildings:', terrain.buildings.map(b => b.type));
        terrain.addBuilding('barracks', 9, 9);
        console.log('Post-Barracks Buildings:', terrain.buildings.map(b => b.type));

        // 3. Verify House is removed
        const hasHouse = terrain.buildings.some(b => b.type === 'house');
        expect(hasHouse).toBe(false);
        expect(terrain.buildings.length).toBe(1);
        expect(terrain.buildings[0].type).toBe('barracks');
    });
});
