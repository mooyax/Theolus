import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { Wander } from '../ai/states/UnitStates';
import { MockGame, MockTerrain } from './TestHelper';

// Mocks
describe('Stabilization Verified', () => {
    let game;
    let terrain;
    let unit;

    beforeEach(() => {
        game = new MockGame();
        terrain = new MockTerrain();
        game.terrain = terrain;
        window.game = game;

        // Setup Grid for Test
        for (let x = 0; x < 10; x++) {
            for (let z = 0; z < 10; z++) {
                terrain.grid[x][z] = { height: 10, hasBuilding: false, type: 'grass', moisture: 0.5 };
            }
        }

        unit = new Unit(game.scene, terrain, 5, 5, 'worker');
        unit.game = game; // Link game
        unit.id = 0;

    });

    it('should NOT overwrite Action: Moving with Idle during Wander state self-transition', () => {
        // Setup: Unit is wandering and starts moving
        const state = new Wander(unit);
        unit.changeState(state); // First entry
        unit.action = 'Moving';
        unit.isMoving = true;

        // Re-enter same state (simulate Update -> checkConditions -> self-transition)
        const sameState = new Wander(unit);
        // We simulate the logic where state might be re-applied
        unit.changeState(sameState);

        // Assertion: Action should remain 'Moving' because we added the guard
        expect(unit.action).toBe('Moving');
        expect(unit.isMoving).toBe(true);
    });

    it('should NOT build on slope (Strict Check)', () => {
        // Setup: Make 5,5 flat (10), but 5,6 slope (12)
        terrain.grid[5][5].height = 10;
        terrain.grid[5][6].height = 12; // 2.0 diff, used to be allowed by tolerance=2.0

        // Mock Population Need
        for (let i = 0; i < 10; i++) game.spawnUnit(0, 0, 'worker');
        game.totalPopulation = 10;

        // Execute Build
        const built = unit.tryBuildStructure(100);

        expect(built).toBe(false); // Should fail due to slope
    });

    it('should build on flat ground', () => {
        // Setup: All flat ground (already set in beforeEach)

        // Mock Population Need (10 Units, 0 Houses)
        for (let i = 0; i < 10; i++) game.spawnUnit(0, 0, 'worker');
        game.totalPopulation = 10;

        // Execute Build
        const built = unit.tryBuildStructure(100);

        expect(built).toBe(true);
        // Verify House added
        expect(terrain.buildings.length).toBeGreaterThan(0);
    });

    it('should NOT build infinite houses (Population Cap Logic)', () => {
        // Setup: 5 Units
        for (let i = 0; i < 5; i++) game.spawnUnit(0, 0, 'worker');
        game.totalPopulation = 5;

        // Satisfy Farm Requirement (Need 1 per 5 units = 1 farm)
        terrain.addBuilding('farm', 4, 4);

        // Add 2 houses (Base 10 + 2*5 = 20 capacity)
        terrain.addBuilding('house', 0, 0);
        terrain.addBuilding('house', 2, 2);

        // Update capacity values in mock data
        terrain.buildings.filter(b => b.userData.type === 'house').forEach(h => h.userData.capacity = 5);

        const builtAgain = unit.tryBuildStructure(100);

        // Result: currentPop(5) + 3 buffer = 8. Capacity(20) is > 8. No build.
        expect(builtAgain).toBe(false); 
    });
});