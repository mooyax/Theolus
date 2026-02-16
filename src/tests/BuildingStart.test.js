import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { MockGame, MockTerrain } from './TestHelper';

// Using global THREE mocks from setup.js

describe('Building Logic', () => {
    let game, terrain, unit;

    beforeEach(() => {
        game = new MockGame();
        terrain = new MockTerrain();
        game.terrain = terrain;
        window.game = game; // Global needed for Unit.ts logic
        unit = new Unit(game.scene, terrain, 5, 5, 'worker');
        unit.game = game;
        unit.id = 0;

        // Mock proper checkFlatArea behavior
        // Default mock returns true (TestHelper), so we can focus on Logic
    });

    it('should build house if population is sufficient (Initial State)', () => {
        // Initial: 5 Units, 0 Houses
        // Logic: if (currentPop >= housingCapacity - 2)
        // Capacity: 0 Houses = 0 capacity + Base(10) = 10?
        // Wait, Base Capacity (Castle/TownHall) is 10.
        // currentPop: 5. Capacity: 10.
        // 5 >= 10 - 2 (8) => False.

        // Setup 5 Units
        game.units = [];
        for (let i = 0; i < 5; i++) {
            game.spawnUnit(0, 0, 'worker');
        }

        // No buildings
        terrain.buildings = [];

        const built = unit.tryBuildStructure(100);

        // EXPECTATION: Should be true because it builds a FARM first (Food Priority)
        expect(built).toBe(true);

        // This confirms why "Houses are not being built" initially.
        // The user probably has 5-10 units and 0 houses, but the Castle provides 10 cap.
        // So until they reach 8 units, no house is built.
    });

    it('should build house if population > 8 (with Base Cap 10)', () => {
        game.units = [];
        for (let i = 0; i < 9; i++) game.spawnUnit(0, 0, 'worker'); // 9 Units
        terrain.buildings = []; // Base Cap 10

        const built = unit.tryBuildStructure(100);
        expect(built).toBe(true);
    });
});

