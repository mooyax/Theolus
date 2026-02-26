
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Unit } from '../Unit.js';
import { Building } from '../Building.js';
import * as THREE from 'three';

describe('Building Defense Logic', () => {
    let mockScene, mockTerrain;

    beforeEach(() => {
        mockScene = new THREE.Scene();
        mockTerrain = {
            grid: Array(80).fill(0).map(() => Array(80).fill(0).map(() => ({ hasBuilding: false }))),
            getTileHeight: vi.fn().mockReturnValue(5),
            gridToWorld: (v) => v - 40,
            getVisualPosition: vi.fn().mockReturnValue({ x: 0, y: 5, z: 0 }),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            removeBuilding: vi.fn(),
            getBuildingSize: vi.fn().mockReturnValue(1),
            isReachable: vi.fn().mockReturnValue(true),
            findBestTarget: vi.fn().mockReturnValue(null),
            getRegion: vi.fn().mockReturnValue({ id: 'test_region' }),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 }),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 10 }])
        };
        window.game = {
            totalPopulation: 0,
            goblinManager: { notifyClanActivity: vi.fn() }
        };
    });

    it('Goblins deal population damage to player buildings', () => {
        const building = new Building(mockScene, mockTerrain, 'house', 10, 10);
        building.population = 10;
        building.hp = 100;
        const goblin = new Goblin(mockScene, mockTerrain, 10.5, 10.5, 'normal');
        goblin.damage = 10;
        building.takeDamage(10, goblin);
        expect(building.population).toBe(0);
        expect(building.hp).toBe(100);
    });

    it('Goblins deal structural damage to empty player buildings', () => {
        const building = new Building(mockScene, mockTerrain, 'house', 10, 10);
        building.population = 0;
        building.hp = 100;
        const goblin = new Goblin(mockScene, mockTerrain, 12, 12, 'normal');
        goblin.damage = 10;
        building.takeDamage(10, goblin);
        expect(building.hp).toBe(90);
    });

    it('Goblins destroy player buildings when HP reaches 0', () => {
        const building = new Building(mockScene, mockTerrain, 'house', 10, 10);
        building.population = 0;
        building.hp = 10;

        const goblin = new Goblin(mockScene, mockTerrain, 10.5, 10.5, 'normal');
        goblin.damage = 10;

        building.takeDamage(10, goblin);
        expect(mockTerrain.removeBuilding).toHaveBeenCalled();
    });

    it('Buildings retaliate against melee goblins', () => {
        const building = new Building(mockScene, mockTerrain, 'house', 10, 10);
        building.population = 10;
        building.userData.defense = 4.0;
        const goblin = new Goblin(mockScene, mockTerrain, 10.5, 10.5, 'normal');
        goblin.hp = 100;
        goblin.damage = 10;
        building.takeDamage(10, goblin);
        expect(goblin.hp).toBe(60);
    });

    it('Towers retaliate against distant attackers (Shamans)', () => {
        const building = new Building(mockScene, mockTerrain, 'tower', 10, 10);
        building.population = 5;
        building.userData.defense = 10.0;
        const shaman = new Goblin(mockScene, mockTerrain, 15, 15, 'shaman');
        shaman.hp = 100;
        building.takeDamage(10, shaman);
        expect(shaman.hp).toBeLessThan(100);
    });

    it('Standard HP logic for Goblin buildings (real instances)', () => {
        const unit = new Unit(mockScene, mockTerrain, 20, 20, 'knight');
        unit.damage = 50;
        const cave = new Building(mockScene, mockTerrain, 'cave', 21, 21);
        cave.hp = 200;
        cave.population = 0;
        unit.attackBuilding(cave);
        expect(cave.hp).toBe(150);
    });
});