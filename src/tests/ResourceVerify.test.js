
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain';
import { GameConfig } from '../config/GameConfig';

describe('Resource Growth Verification', () => {
    let terrain;
    let mockScene;
    let mockGame;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        terrain = new Terrain(mockScene);
        // Create 10x10 grid with moisture
        terrain.grid = Array(10).fill(0).map(() =>
            Array(10).fill(0).map(() => ({ height: 1, type: 'grass', moisture: 1.0 }))
        );
        terrain.buildings = [];

        mockGame = {
            resources: { grain: 100, fish: 100, meat: 100 },
            minimal: true
        };
        window.game = mockGame;
    });

    it('should harvest grain from farm and increase resources', () => {
        // Setup Farm
        const farm = new THREE.Group();
        farm.userData = {
            type: 'farm',
            gridX: 4,
            gridZ: 4,
            population: 95, // Near harvest (100)
            id: 'farm_harvest_test'
        };
        // Ensure farm config
        if (!GameConfig.buildings.farm) {
            GameConfig.buildings.farm = { growthRate: 10, capacity: 100 };
        }

        terrain.buildings.push(farm);

        // Force update for index 0 (Farm is the only building)
        terrain.frameCount = 19;

        // Run update
        terrain.updatePopulation(1.0, vi.fn(), false, 0);

        // Grain should increase from 100 (at least +1)
        expect(mockGame.resources.grain).toBeGreaterThan(100);
    });
});