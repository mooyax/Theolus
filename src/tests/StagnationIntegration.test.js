import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Terrain } from '../Terrain';
import { GameConfig } from '../config/GameConfig';

describe('Stagnation Integration Test', () => {
    let terrain;
    let mockResources;
    let spawnCount = 0;

    const mockSpawnCallback = (x, z, type, source) => {
        spawnCount++;
        return true;
    };

    beforeEach(() => {
        // Correct order: scene, clippingPlanes, width, depth
        terrain = new Terrain(null, [], 64, 64);
        // Set height to 5 to allow building (height <= 0 is water)
        for (let x = 0; x < 64; x++) {
            for (let z = 0; z < 64; z++) {
                terrain.grid[x][z].height = 5;
            }
        }
        mockResources = {
            grain: 0,
            fish: 0,
            meat: 0
        };
        spawnCount = 0;

        // Ensure some initial variety for growth
        mockResources.grain = 10;
        mockResources.fish = 10;
    });

    it('should show population and grain growth in a farm over time', () => {
        const bx = 10;
        const bz = 10;

        // Add a farm
        terrain.addBuilding('farm', bx, bz);
        const farm = terrain.buildings[0];
        expect(farm.userData.type).toBe('farm');

        // Initial state
        expect(farm.population || farm.userData.population || 0).toBe(0);
        expect(mockResources.grain).toBe(10);

        // Simulate 60 seconds (60 frames * 1.0s delta)
        // Note: updatePopulation is staggered, so we need enough cycles.
        for (let i = 0; i < 60; i++) {
            terrain.update(1.0, mockSpawnCallback, false, 0, true, mockResources);
        }

        const finalPop = farm.population || farm.userData.population || 0;
        console.log(`Final Farm Buffer: ${finalPop}`);
        console.log(`Final Grain: ${mockResources.grain}`);

        // With farmGrowth = 10 and 60 seconds, we expect 600 buffer total.
        // Each 100 resets buffer and adds grain.
        // So Grain should be at least 10 + 6 = 16.
        expect(mockResources.grain).toBeGreaterThan(10);
    });

    it('should spawn workers from a house when population reaches cap and food is available', () => {
        const bx = 15;
        const bz = 15;

        // Add a house
        terrain.addBuilding('house', bx, bz);
        const house = terrain.buildings[0];

        // Give enough food
        mockResources.grain = 100;

        // Simulate enough time for population to hit cap (default 10)
        // Base growth rate is around 0.1-0.5 per second
        for (let i = 0; i < 200; i++) {
            terrain.update(1.0, mockSpawnCallback, false, 0, true, mockResources);
        }

        console.log(`Final House Pop: ${house.population || house.userData.population || 0}`);
        console.log(`Final Spawn Count: ${spawnCount}`);
        console.log(`Final Grain after House: ${mockResources.grain}`);

        // Spawn count should be > 0 and Grain should be consumed
        expect(spawnCount).toBeGreaterThan(0);
        expect(mockResources.grain).toBeLessThan(100);
    });
});
