import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Unit Targeting Priority', () => {
    let unit;
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        // Mock initAssets to prevent Canvas errors and overhead
        Unit.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockTerrain = {
            getTileHeight: () => 1, // Flat ground
            getInterpolatedHeight: () => 1, // Add missing method
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            buildings: [] // Populated in tests
        };
        mockGame = { raidPoints: [] };
        global.window.game = mockGame;

        // Mock Unit (Constructor calls registerEntity)
        unit = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'knight');
        // Force 0,0 because constructor "x || 20" converts 0 to 20
        unit.gridX = 0;
        unit.gridZ = 0;

        // Override getDistance for simple math (Unit at 0,0)
        unit.getDistance = (x, z) => Math.sqrt(x * x + z * z);
    });

    it('should prioritize Goblin if it is much closer than Building', () => {
        // Goblin at 10. Score = 10.
        const goblin = { gridX: 10, gridZ: 0, isDead: false };
        // Hut at 30. Score = 30 - 5 = 25.
        // 10 < 25. Goblin wins.
        const hut = { type: 'goblin_hut', gridX: 30, gridZ: 0 };
        mockTerrain.buildings = [hut];
        const goblins = [goblin];

        // Run Logic
        unit.updateLogic(1000, 0.1, false, goblins, [], []);

        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.targetBuilding).toBeNull();
    });

    it('should prioritize Building if distances are similar (Bonus check)', () => {
        // Goblin at 10. Score = 10.
        const goblin = { gridX: 10, gridZ: 0, isDead: false };

        // Hut at 12. Score = 12 - 5 = 7.
        // 7 < 10. Hut wins.
        const hut = { type: 'goblin_hut', gridX: 12, gridZ: 0 };
        mockTerrain.buildings = [hut];
        const goblins = [goblin];

        unit.updateLogic(1000, 0.1, false, goblins, [], []);

        expect(unit.targetBuilding).toBe(hut);
        expect(unit.targetGoblin).toBeNull();
    });

    it('should allow Workers to target Huts at range 25 (New Range: 30)', () => {
        unit.role = 'worker';
        // Hut at 25. Worker Range 30.
        // Valid.
        const hut = { type: 'goblin_hut', gridX: 25, gridZ: 0 };
        mockTerrain.buildings = [hut];

        unit.updateLogic(1000, 0.1, false, [], [], []);

        expect(unit.targetBuilding).toBe(hut);
    });
});
