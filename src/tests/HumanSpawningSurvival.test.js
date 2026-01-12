
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

describe('Human Spawning Survival', () => {
    let terrain;
    let mockScene;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        // Valid Game State for Food - STARVATION MODE
        window.game = {
            resources: { grain: 0, meat: 0, fish: 0 }
        };

        terrain = new Terrain(mockScene, []);
        terrain.logicalWidth = 10;
        terrain.logicalDepth = 10;
        terrain.grid = Array(10).fill(null).map(() => Array(10).fill({ height: 1, noise: 0 }));
        terrain.buildings = [];
    });

    it('should allow population growth (slowly) even with 0 food', () => {
        const house = {
            userData: {
                type: 'house',
                gridX: 2,
                gridZ: 2,
                population: 0,
                capacity: 10,
                popTimer: 0
            }
        };
        terrain.buildings.push(house);

        const spawnCallback = vi.fn();

        // 1. Update with large delta to ensure growth
        // Base rate ~0.005 * 0.5 (starvation mult) * 0.25 (no food penalty) = 0.000625 per tick
        // Sim Delta = 1.0 * 20 (stagger) = 20.
        // Growth = 0.000625 * 20 = 0.0125 per call.
        // Need many calls or large delta.

        terrain.frameCount = -1; // Align stagger
        terrain.update(100.0, spawnCallback, false);

        expect(house.userData.population).toBeGreaterThan(0);
        console.log("Population after update:", house.userData.population);
    });
});
