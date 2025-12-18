
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';

// Mock Dependencies
const mockTerrain = {
    getTileHeight: () => 5.0,
    gridToWorld: (v) => v,
    getVisualOffset: () => ({ x: 0, y: 0 }),
    moveEntity: vi.fn(),
    registerEntity: vi.fn(),
    getVisualPosition: () => ({ x: 0, y: 5, z: 0 }),
    removeBuilding: vi.fn(),
    grid: [],
    getBuildingSize: () => 2
};

const mockScene = {
    add: vi.fn(),
    remove: vi.fn()
};

// Mock Window Game
const mockGame = {
    goblinManager: {
        recordRaidLocation: vi.fn(),
        increasePlunder: vi.fn()
    }
};

vi.stubGlobal('window', { game: mockGame });

describe('Goblin Building Destruction', () => {
    let goblin;
    let building;

    beforeEach(() => {
        // Reset mocks
        mockTerrain.removeBuilding.mockClear();
        window.game.goblinManager.recordRaidLocation.mockClear();

        // Create Goblin
        goblin = new Goblin(mockScene, mockTerrain, 10, 10, 1);
        goblin.hp = 100;

        // Create Building
        building = {
            userData: {
                type: 'house',
                gridX: 11,
                gridZ: 11,
                population: 10
            }
        };
    });

    it('should damage building population', () => {
        goblin.attackBuilding(building);
        // Damage is 5 for House
        expect(building.userData.population).toBe(5);
    });

    it('should destroy building when population drops below 1.0', () => {
        building.userData.population = 5;
        goblin.attackBuilding(building);

        // 5 - 5 = 0. Should destroy.
        expect(building.userData.population).toBe(0);
        expect(mockTerrain.removeBuilding).toHaveBeenCalledWith(building);
    });

    it('should destroy building even if fractional population remains (e.g. 0.5)', () => {
        // Evaluate the specific bug fix
        building.userData.population = 5.5; // Hypothetical fractional regen
        goblin.attackBuilding(building); // Damage 5 -> 0.5

        expect(building.userData.population).toBe(0.5);
        // Is 0.5 < 1.0? Yes.
        expect(mockTerrain.removeBuilding).toHaveBeenCalledWith(building);
    });

    it('should NOT destroy building if population remains >= 1.0', () => {
        building.userData.population = 7;
        goblin.attackBuilding(building); // Damage 5 -> 2

        expect(building.userData.population).toBe(2);
        expect(mockTerrain.removeBuilding).not.toHaveBeenCalled();
    });

    it('should take retaliation damage', () => {
        building.userData.population = 20; // High pop
        const initialHP = goblin.hp;

        goblin.attackBuilding(building); // Drops to 15. Retaliation = floor(15 * 0.2) = 3

        expect(goblin.hp).toBe(initialHP - 3);
    });
});
