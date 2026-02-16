
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Terrain } from '../Terrain';
import * as THREE from 'three';

describe('Terrain Population Growth', () => {
    let terrain;
    let mockGame;

    beforeEach(() => {
        const scene = new THREE.Scene();
        // Terrain constructor will use global THREE mocks from setup.js
        terrain = new Terrain(scene, [], 100, 100);

        // Ensure test area is LAND (height > 0)
        for (let x = 0; x < 100; x++) {
            for (let z = 0; z < 100; z++) {
                terrain.grid[x][z].height = 5;
            }
        }

        // Mock Game for resource checks
        mockGame = {
            resources: { grain: 100, meat: 100, fish: 0 },
            totalPopulation: 0,
            consumeMana: vi.fn()
        };
        terrain.game = mockGame;
        global.window.game = mockGame;
    });

    it('should exist and be callable', () => {
        expect(terrain.updatePopulation).toBeDefined();
    });

    it('should increase population for Caves/Goblin Huts explicitly', () => {
        // Start building
        const cave = terrain.addBuilding('cave', 20, 20);
        expect(cave).not.toBeNull();
        cave.userData.population = 0;

        const hut = terrain.addBuilding('goblin_hut', 30, 30);
        expect(hut).not.toBeNull();
        hut.userData.population = 0;

        // Simulate multiple updates to overcome STAGGERED logic (20 frames)
        for (let i = 0; i < 40; i++) {
            // deltaTime=1.0, isNight=false, activeUnits=0
            terrain.updatePopulation(1.0, undefined, false, 0);
        }

        expect(cave.userData.population).toBeGreaterThan(0);
        expect(hut.userData.population).toBeGreaterThan(0);
    });
});
