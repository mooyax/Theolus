import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../Game';
import { Unit } from '../Unit'; // Ensure Unit logic runs

// Mock THREE to avoid mesh creation issues if necessary
// But simpler to rely on previous test patterns where mockScene handles 'add'
// If Unit creates Geometries, it might be fine in JSDOM/HappyDOM if lucky, 
// or might need THREE mocks. Given previous tests pass, we'll try without deep THREE mocks first.

describe('Worker Diversity Spawning', () => {
    let mockGame;
    let mockScene;
    let mockTerrain;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };

        // Minimal Mock Terrain
        mockTerrain = {
            logicalWidth: 20,
            logicalDepth: 20,
            grid: [],
            getTileHeight: vi.fn().mockReturnValue(1),
            getInterpolatedHeight: vi.fn().mockReturnValue(1),
            getEntityAt: vi.fn().mockReturnValue(null),
            registerEntity: vi.fn(),
            buildings: []
        };

        // Fill grid to prevent read errors
        for (let x = 0; x < 20; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                mockTerrain.grid[x][z] = { hasBuilding: false, building: null };
            }
        }

        mockGame = {
            scene: mockScene,
            terrain: mockTerrain,
            units: [],
            totalPopulation: 50, // Enough to allow special logic if any
            // We'll mimic the Game context
        };

        // CRITICAL FIX: Suppress Unit.initAssets() which uses document.createElement('canvas')
        // JSDOM or THREE.CanvasTexture in this env causes crash. By setting initialized=true, we skip it.
        Unit.assets.initialized = true;
    });

    it('should spawn diverse roles (Worker/Hunter/Fisher) from a House', () => {
        const sourceHouse = {
            type: 'house',
            userData: { gridX: 10, gridZ: 10, memory: null }
        };

        const roles = { worker: 0, hunter: 0, fisher: 0 };
        const iterations = 100;

        for (let i = 0; i < iterations; i++) {
            // Invoke Game.prototype.spawnUnit directly with our mock context
            // spawnUnit(x, z, roleOrSpecial, sourceBuilding)
            // roleOrSpecial=null prompts the building logic to decide
            const unit = Game.prototype.spawnUnit.call(mockGame, 10, 10, null, sourceHouse);

            if (roles[unit.role] !== undefined) {
                roles[unit.role]++;
            } else {
                console.warn(`Unexpected role: ${unit.role}`);
            }
        }

        console.log('Spawn Distribution (100 runs):', roles);

        // Expect Roughly 60/20/20. Allow variance.
        expect(roles.hunter).toBeGreaterThan(10); // At least 10%
        expect(roles.fisher).toBeGreaterThan(10); // At least 10%
        expect(roles.worker).toBeGreaterThan(40); // At least 40%
        expect(roles.worker).toBeLessThan(80);    // Should not be 100%
    });

    it('should spawn Knights from Barracks', () => {
        const barracks = { type: 'barracks', userData: { gridX: 10, gridZ: 10 } };
        const unit = Game.prototype.spawnUnit.call(mockGame, 10, 10, null, barracks);
        expect(unit.role).toBe('knight');
    });

    it('should spawn Wizards from Towers', () => {
        const tower = { type: 'tower', userData: { gridX: 10, gridZ: 10 } };
        const unit = Game.prototype.spawnUnit.call(mockGame, 10, 10, null, tower);
        expect(unit.role).toBe('wizard');
    });
});
