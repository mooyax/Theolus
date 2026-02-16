
import { describe, it, expect, beforeEach } from 'vitest';
import { setupTestEnv, createTestBuilding } from './TestUtils';

// Note: 'three' is globally mocked by setup.js
// Note: setupTestEnv handles window.game, mocked Scene, and Terrain initialization

describe('Unit Spawn Cost', () => {
    let terrain;
    let mockGame;
    let spawnedEvents = [];

    beforeEach(() => {
        const env = setupTestEnv({ useMockTerrain: false });
        mockGame = env.game;
        terrain = env.terrain;
        spawnedEvents = [];
    });

    it('should consume food when spawning from House', () => {
        // Setup House
        const house = createTestBuilding('house', 5, 5, 10);
        terrain.buildings.push(house);

        // Give Resources
        mockGame.resources.grain = 100;

        // Call updatePopulation
        const spawnCallback = (x, z, type, building) => {
            spawnedEvents.push({ x, z, type });
            return true; // Success
        };

        // Force frame count to trigger update for index 0 (stagger logic)
        terrain.frameCount = 19; // becomes 20 in updatePopulation -> index 0 % 20 === 0

        terrain.updatePopulation(1.0, spawnCallback, false, 0);

        // EXPECTATION:
        expect(spawnedEvents.length).toBe(1);

        // 2. Resources consumed
        // Base consumption: 10 pop * 0.005 = 0.05 food per sec
        // Spawn cost: grain 50
        // Total: 100 - 20 - 0.05 = 79.95
        expect(mockGame.resources.grain).toBeCloseTo(79.95, 2);
    });

    it('should BLOCK spawn if insufficient food', () => {
        // Setup House
        const house = createTestBuilding('house', 5, 5, 10);
        terrain.buildings.push(house);
        mockGame.resources.grain = 10; // Not enough (need 50)

        const spawnCallback = (x, z, type, building) => {
            spawnedEvents.push({ x, z, type });
            return true;
        };

        terrain.frameCount = 19;
        terrain.updatePopulation(1.0, spawnCallback, false, 0);

        // EXPECTATION:
        expect(spawnedEvents.length).toBe(0);
        expect(mockGame.resources.grain).toBeCloseTo(9.95, 2); // 10 - 0.05
        expect(house.userData.population).toBe(10);
    });
});
