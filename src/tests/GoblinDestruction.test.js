
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Building } from '../Building.js';

// Mock Dependencies
const mockTerrain = {
    findBestTarget: vi.fn(),
    getTileHeight: () => 10,
    gridToWorld: (v) => v,
    getVisualOffset: () => ({ x: 0, y: 0 }),
    moveEntity: vi.fn(),
    registerEntity: vi.fn(),
    unregisterEntity: vi.fn(),
    getVisualPosition: () => ({ x: 0, y: 5, z: 0 }),
    removeBuilding: vi.fn((b) => { if (b && b.userData) b.userData.isDead = true; }),
    grid: [],
    getBuildingSize: () => 2
};

const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] })
};

// Mock Window Game
const mockGame = {
    goblinManager: {
        recordRaidLocation: vi.fn(),
        increasePlunder: vi.fn()
    },
    reportGlobalBattle: vi.fn()
};

if (typeof window !== 'undefined') { window.game = mockGame; }

describe('Goblin Real Building Destruction', () => {
    let goblin;
    let building;

    beforeEach(() => {
        // Reset mocks
        mockTerrain.removeBuilding.mockClear();
        window.game.goblinManager.recordRaidLocation.mockClear();

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
    });

    it('should damage building population', () => {
        goblin.attackBuilding(building);
        // damage 10 -> popDamage 1
        expect(building.population).toBe(9);
        expect(building.userData.population).toBe(9);
    });

    it('should destroy building when Pop and HP reach zero', () => {
        building.population = 0.5;
        building.hp = 5;
        building.userData.population = 0.5;
        building.userData.hp = 5;

        goblin.attackBuilding(building);

        expect(mockTerrain.removeBuilding).toHaveBeenCalledWith(building);
        expect(building.userData.isDead).toBe(true);
    });

    it('should NOT destroy if population remains high', () => {
        building.population = 5.0;
        building.hp = 0; // Integrity gone but populated
        building.userData.population = 5.0;
        building.userData.hp = 0;

        goblin.attackBuilding(building);

        expect(mockTerrain.removeBuilding).not.toHaveBeenCalled();
        // Population should decrease instead
        expect(building.population).toBe(4.0);
    });
});
