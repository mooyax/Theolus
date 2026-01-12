
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

describe('Goblin Hut Fix', () => {
    let terrain;
    let mockScene;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        // Valid Game State for Food
        window.game = {
            resources: { grain: 100, meat: 100, fish: 100 }
        };

        // Partial mock of Terrain with minimal dependencies
        terrain = new Terrain(mockScene, []);
        terrain.logicalWidth = 10;
        terrain.logicalDepth = 10;
        terrain.grid = Array(10).fill(null).map(() => Array(10).fill({ height: 1, noise: 0 }));
        terrain.buildings = [];
    });

    it('should NOT trigger spawnCallback for goblin_hut even if overpopulated', () => {
        const hut = {
            userData: {
                type: 'goblin_hut',
                gridX: 5,
                gridZ: 5,
                population: 10,
                capacity: 5, // Over capacity
                popTimer: 0
            }
        };
        terrain.buildings.push(hut);

        const spawnCallback = vi.fn();

        // Simulate update
        // Need to simulate time passing to trigger "popTimer" check? 
        // Logic: if (b.userData.popTimer > growthRate) ...
        // We set popTimer to 999 to force check if needed, but the loop is:
        // popTimer += deltaTime; if (popTimer > growthRate) { pop++; if (pop > cap) spawn }
        // So we need to advance time enough to trigger the check.

        hut.userData.popTimer = 100; // Force immediate trigger

        terrain.update(1.0, spawnCallback, false); // 1s delta

        expect(spawnCallback).not.toHaveBeenCalled();
    });

    it('should trigger spawnCallback for house when overpopulated (Control)', () => {
        const house = {
            userData: {
                type: 'house',
                gridX: 2,
                gridZ: 2,
                population: 15, // Over capacity (10)
                capacity: 10,
                popTimer: 100
            }
        };
        terrain.buildings.push(house);

        const spawnCallback = vi.fn().mockReturnValue(true); // Return true = spawn success

        // Align Stagger (Index 0 needs frame 0)
        // updatePopulation increments frameCount at start.
        // So we want frameCount to be 0 AFTER increment.
        // wait, if undefined -> 0 -> ++ -> 1.
        // If we set to -1 -> ++ -> 0.
        terrain.frameCount = -1;

        console.log("Before Update: Pop=", house.userData.population);
        terrain.update(1.0, spawnCallback, false);
        console.log("After Update: Pop=", house.userData.population);

        expect(spawnCallback).toHaveBeenCalledWith(2, 2, 'house', house);
        // And population resets
        expect(house.userData.population).toBe(0);
    });
});
