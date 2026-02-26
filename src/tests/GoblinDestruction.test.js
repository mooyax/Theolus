
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
    removeBuilding: vi.fn((b) => { if (b) { if (b.isDead) return; b.isDead = true; } }),
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


describe('Goblin Real Building Destruction', () => {
    let goblin;
    let building;

    beforeEach(() => {
        mockTerrain.removeBuilding.mockClear();
        mockGame.goblinManager.recordRaidLocation.mockClear();
        window.game = mockGame;

        goblin = new Goblin(mockScene, mockTerrain, 10, 10, 'normal');
        goblin.hp = 100;
        goblin.damage = 10;
        goblin.attackCooldown = 0;

        building = new Building(mockScene, mockTerrain, 'house', 11, 11);
        building.population = 10;
        building.hp = 100;
        building.userData.population = 10;
        building.userData.hp = 100;
        building.userData.defense = 0;
    });

    it('should damage building population', () => {
        goblin.attack(building);
        // Population Priority: pop 10 -> 0. HP remains 100.
        expect(building.population).toBe(0);
        expect(building.userData.population).toBe(0);
        expect(building.hp).toBe(100);
    });

    it('should destroy building when HP reaches zero (Universal Rule)', () => {
        building.population = 0;
        building.hp = 5.0;
        building.userData.population = 0;
        building.userData.hp = 5.0;

        goblin.attack(building);

        expect(mockTerrain.removeBuilding).toHaveBeenCalled();
        expect(building.hp).toBeLessThanOrEqual(0);
    });

    it('should decrease HP of a Farm (No population survival)', () => {
        const farm = new Building(mockScene, mockTerrain, 'farm', 12, 12);
        farm.hp = 80;
        farm.population = 0; // Farms usually don't have human population inside for defense

        goblin.attack(farm);

        expect(farm.hp).toBe(70);
        expect(farm.userData.hp).toBe(70);
    });
});