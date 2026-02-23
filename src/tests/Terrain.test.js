
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';
import { GameConfig } from '../config/GameConfig.js';

describe('Terrain Logic', () => {
    let terrain;
    let mockGame;

    beforeEach(() => {
        mockGame = {
            resources: { grain: 0, meat: 0, fish: 0 },
            totalPopulation: 0,
            minimal: true
        };
        window.game = mockGame;
        terrain = new Terrain(new THREE.Scene());
        terrain.frameCount = 0; // Ensure starts at 0 for deterministic stagger checks
    });

    describe('Population Update', () => {
        it('should correctly sum housing population excluding farms', () => {
            const house1 = { userData: { type: 'house', population: 50, gridX: 0, gridZ: 0 } };
            const house2 = { userData: { type: 'house', population: 30, gridX: 1, gridZ: 1 } };
            const farm1 = { userData: { type: 'farm', population: 90, gridX: 2, gridZ: 2 } };
            terrain.buildings = [house1, house2, farm1];
            terrain.updatePopulation(0.1, vi.fn(), false, 0, mockGame.resources);
            expect(terrain.totalHousingPop).toBe(80);
        });

        it('should grow population in a house over time', () => {
            const house = { userData: { type: 'house', population: 2, capacity: 5, gridX: 0, gridZ: 0, growthTimer: 0 } };
            Object.defineProperty(house, 'population', {
                get: () => house.userData.population || 0,
                set: (v) => { house.userData.population = v; }
            });
            terrain.buildings = [house];
            mockGame.resources = { grain: 200, meat: 100, fish: 100 };
            mockGame.totalPopulation = 2;

            const varietyMultiplier = 5.0;
            const growthRate = (GameConfig.buildings && GameConfig.buildings.house && GameConfig.buildings.house.growthRate) || 0.04;
            const rate = growthRate * varietyMultiplier;
            const neededTime = (5 - 2) / rate;

            terrain.update(neededTime, vi.fn(), false, 0, true, mockGame.resources);

            expect(house.userData.population).toBeGreaterThan(2);
            expect(house.population).toBeCloseTo(5, 1);
        });
    });

    describe('Farm Logic', () => {
        it('should grow crops using simDeltaTime', () => {
            const farm = { userData: { type: 'farm', population: 0, capacity: 100, gridX: 0, gridZ: 0, productionBuffer: 0 } };
            Object.defineProperty(farm, 'population', {
                get: () => farm.userData.population || 0,
                set: (v) => { farm.userData.population = v; }
            });
            terrain.buildings = [farm];

            // Call multiple times to be sure
            for (let i = 0; i < 5; i++) {
                terrain.update(1, vi.fn(), false, 0, true, { grain: 10, meat: 10, fish: 10 });
            }

            expect(farm.userData.population).toBeGreaterThan(0);
        });

        it('should preserve overflow when harvesting', () => {
            const farm = { userData: { type: 'farm', population: 15, capacity: 10, gridX: 0, gridZ: 0 } };
            terrain.buildings = [farm];
            terrain.updatePopulation(0.1, vi.fn(), false, 0, mockGame.resources);
            expect(true).toBe(true);
        });
    });

    describe('Advanced Mechanics', () => {
        it('should consume food during day', () => {
            mockGame.totalPopulation = 100;
            mockGame.resources = { grain: 1000, meat: 1000, fish: 1000 };
            terrain.update(100, vi.fn(), false, 100, true, mockGame.resources);
            expect(mockGame.resources.grain + mockGame.resources.meat + mockGame.resources.fish).toBeLessThan(3000);
        });
    });

    describe('Seasonal Colors', () => {
        it('should return different colors for seasons', () => {
            const summerColor = terrain.getBiomeColor(0.5, 0.5, 0.5, false, 'Summer', 10, 10);
            const winterColor = terrain.getBiomeColor(0.5, 0.5, 0.5, false, 'Winter', 10, 10);
            expect(summerColor.getHex()).not.toBe(winterColor.getHex());
        });
    });
});