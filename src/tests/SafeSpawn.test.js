
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = { game: null };

describe('Safe Population Zero', () => {
    let terrain;
    let house;
    let mockScene;

    beforeEach(() => {
        global.window.game = {
            gameTotalTime: 0,
            units: [],
            resources: { grain: 100, meat: 0, fish: 0 },
            minimal: true,
            isNight: false,
            unitMap: new Map()
        };
        mockScene = new THREE.Scene();
        terrain = new Terrain(mockScene, []);

        // Mock internal grid for simple test
        terrain.logicalWidth = 200;
        terrain.logicalDepth = 200;
        terrain.grid = Array(200).fill(0).map(() => Array(200).fill(null).map(() => ({
            height: 0, hasBuilding: false, building: null, type: 'grass', moisture: 0.5, regionId: 1
        })));
        terrain.updateColors = vi.fn();
        terrain.calculateRegions = vi.fn().mockResolvedValue(true);

        house = {
            type: 'house',
            userData: {
                type: 'house',
                population: 10,
                gridX: 10,
                gridZ: 10
            }
        };
        // Add to Mock Grid
        terrain.grid[10][10].hasBuilding = true;
        terrain.grid[10][10].building = house;
        terrain.buildings = [house];
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should NOT destroy house when spawning unit resets population to 0', () => {
        const spawnCb = vi.fn().mockReturnValue(true);
        vi.spyOn(Math, 'random').mockReturnValue(0.1); // Always < 0.2

        terrain.frameCount = 19; // Will increment to 20 inside logic if using 20x stagger.

        terrain.updatePopulation(1.0, spawnCb, false, 0);

        expect(spawnCb).toHaveBeenCalled();
        expect(house.userData.population).toBe(0);
        expect(terrain.buildings).toContain(house);
    });
});