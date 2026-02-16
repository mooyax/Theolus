
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Building } from '../Building.js';

// Mock Dependencies
const mockTerrain = {
    findBestTarget: vi.fn(),
    getTileHeight: () => 1,
    gridToWorld: (v) => v,
    getVisualOffset: () => ({ x: 0, y: 0 }),
    moveEntity: vi.fn(),
    registerEntity: vi.fn(),
    unregisterEntity: vi.fn(),
    getVisualPosition: () => ({ x: 0, y: 1, z: 0 }),
    removeBuilding: vi.fn((b) => { if (b) { if (b.isDestroyed()) return; b.userData.isDead = true; } }),
    grid: [],
    getBuildingSize: () => 2
};

const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] })
};

// Mock Global Window/Game
const mockGame = {
    goblinManager: {
        recordRaidLocation: vi.fn(),
        increasePlunder: vi.fn(),
        notifyClanActivity: vi.fn()
    },
    reportGlobalBattle: vi.fn(),
    totalPopulation: 10
};
global.window = { game: mockGame };

describe('Goblin Real Building Destruction', () => {
    let goblin;
    let building;

    beforeEach(() => {
        // Reset mocks
        mockTerrain.removeBuilding.mockClear();
        mockGame.goblinManager.recordRaidLocation.mockClear();

        // Create Goblin
        goblin = new Goblin(mockScene, mockTerrain, 10, 10, 'normal');
        goblin.hp = 100;
        goblin.damage = 10;
        goblin.attackCooldown = 0;

        // Create Real Building
        building = new Building(mockScene, mockTerrain, 'house', 11, 11);
        building.population = 10;
        building.hp = 100;
        building.userData.population = 10;
        building.userData.hp = 100;
        building.userData.defense = 0; // No retaliation for simple test
    });

    it('should damage building population', () => {
        goblin.attackBuilding(building);
        // damage 10 -> popDamage 1
        expect(building.population).toBe(9);
        expect(building.userData.population).toBe(9);
        // HP should also decrease: 100 -> 90
        expect(building.hp).toBe(90);
    });

    it('should destroy building when HP reaches zero (Universal Rule)', () => {
        building.population = 5.0;
        building.hp = 5.0; // Low HP
        building.userData.population = 5.0;
        building.userData.hp = 5.0;

        goblin.attackBuilding(building);

        expect(mockTerrain.removeBuilding).toHaveBeenCalled();
        expect(building.hp).toBeLessThanOrEqual(0);
    });

    it('should decrease HP of a Farm (No population survival)', () => {
        const farm = new Building(mockScene, mockTerrain, 'farm', 12, 12);
        farm.hp = 80;
        farm.population = 50; // 50% growth

        goblin.attackBuilding(farm);

        expect(farm.hp).toBe(70); // 80 - 10
        expect(farm.userData.hp).toBe(70);
    });
});
