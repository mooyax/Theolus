import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain';

if (!global.window) global.window = {};

describe('Terrain Parameters', () => {
    let terrain;

    beforeEach(() => {
        const mockScene = { add: vi.fn(), remove: vi.fn() };
        terrain = new Terrain(mockScene);
        terrain.logicalWidth = 40;
        terrain.logicalDepth = 40;
        // Mock initMeshes to avoid Three.js rendering in test
        vi.spyOn(terrain, 'initMeshes').mockImplementation(() => { });
        vi.spyOn(terrain, 'updateMesh').mockImplementation(() => { });
        vi.spyOn(terrain, 'calculateRegions').mockImplementation(() => Promise.resolve());
        vi.spyOn(terrain, 'syncToWorker').mockImplementation(() => { });
    });

    it('should respect landRatio when generating terrain', async () => {
        // Test High Land Ratio (Mostly land)
        const highLandParams = { landRatio: 0.9, heightScale: 10, heightOffset: 0 };
        await terrain.generateRandomTerrain(false, highLandParams, 12345);

        let landCountHigh = 0;
        for (let x = 0; x < 40; x++) {
            for (let z = 0; z < 40; z++) {
                if (terrain.grid[x][z].height > 0) landCountHigh++;
            }
        }
        const highRatio = landCountHigh / (40 * 40);
        console.log(`High Land Ratio (Target 0.9): ${highRatio}`);

        // Test Low Land Ratio (Islands)
        const lowLandParams = { landRatio: 0.2, heightScale: 10, heightOffset: 0 };
        await terrain.generateRandomTerrain(false, lowLandParams, 12345);

        let landCountLow = 0;
        for (let x = 0; x < 40; x++) {
            for (let z = 0; z < 40; z++) {
                if (terrain.grid[x][z].height > 0) landCountLow++;
            }
        }
        const lowRatio = landCountLow / (40 * 40);
        console.log(`Low Land Ratio (Target 0.2): ${lowRatio}`);

        expect(highRatio).toBeGreaterThan(lowRatio);
        expect(highRatio).toBeGreaterThan(0.7);
        expect(lowRatio).toBeLessThan(0.4);
    });

    it('should respect moistureBase when generating terrain', async () => {
        // Test Wet Base (Swamps/Forests)
        const wetParams = { moistureBase: 0.8, landRatio: 1.0 };
        await terrain.generateRandomTerrain(false, wetParams, 54321);

        let totalMoistureWet = 0;
        for (let x = 0; x < 40; x++) {
            for (let z = 0; z < 40; z++) {
                totalMoistureWet += terrain.grid[x][z].moisture;
            }
        }
        const avgMoistureWet = totalMoistureWet / (40 * 40);
        console.log(`Wet Moisture (Target 0.8 base): ${avgMoistureWet}`);

        // Test Dry Base (Desert)
        const dryParams = { moistureBase: 0.2, landRatio: 1.0 };
        await terrain.generateRandomTerrain(false, dryParams, 54321);

        let totalMoistureDry = 0;
        for (let x = 0; x < 40; x++) {
            for (let z = 0; z < 40; z++) {
                totalMoistureDry += terrain.grid[x][z].moisture;
            }
        }
        const avgMoistureDry = totalMoistureDry / (40 * 40);
        console.log(`Dry Moisture (Target 0.2 base): ${avgMoistureDry}`);

        expect(avgMoistureWet).toBeGreaterThan(avgMoistureDry);
        expect(avgMoistureWet).toBeGreaterThan(0.6);
        expect(avgMoistureDry).toBeLessThan(0.4);
    });
});
