import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Goblin } from '../Goblin';
import { Building } from '../Building';
import { Unit } from '../Unit';

// モックの設定
vi.mock('../Game', () => {
    return {
        Game: vi.fn().mockImplementation(() => ({
            frameCount: 0,
            simTotalTimeSec: 100,
            units: [],
            buildings: [],
            goblinManager: {
                goblins: [],
                notifyClanActivity: vi.fn()
            },
            sheepManager: { sheeps: [] },
            battleMemory: {
                reportRaid: vi.fn(),
                getPriorities: vi.fn().mockReturnValue([])
            },
            spawnProjectile: vi.fn()
        }))
    };
});

Goblin.initAssets = vi.fn().mockResolvedValue(undefined);
Goblin.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
Unit.initAssets = vi.fn().mockResolvedValue(undefined);
Unit.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());

describe('Building Damage Robustness Investigation', () => {
    let scene, terrain, game;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = {
            scene: scene,
            logicalWidth: 160,
            logicalDepth: 160,
            getTileHeight: vi.fn().mockReturnValue(1.0),
            getInterpolatedHeight: vi.fn().mockReturnValue(1.0),
            getVisualPosition: vi.fn().mockReturnValue({ x: 0, y: 0, z: 0 }),
            gridToWorld: vi.fn(v => v),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            findBestTarget: vi.fn(),
            getBuildingSize: vi.fn().mockReturnValue(1),
            removeBuilding: vi.fn(),
            // DO NOT define updatePopulation correctly here to ensure internal handleGrowth runs
        };
        // Ensure the property is completely absent for the check in Building.ts
        terrain.updatePopulation = undefined;

        game = {
            frameCount: 0,
            simTotalTimeSec: 100,
            units: [],
            buildings: [],
            goblinManager: {
                goblins: [],
                notifyClanActivity: vi.fn()
            },
            sheepManager: { sheeps: [] },
            battleMemory: {
                reportRaid: vi.fn(),
                getPriorities: vi.fn().mockReturnValue([])
            },
            terrain: terrain,
            spawnProjectile: vi.fn()
        };

        global.window = { game: game, document: { createElement: vi.fn() } };
    });

    it('Farm should take damage from Goblin', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        const initialHp = farm.hp; // Should be 80 based on GameConfig
        expect(initialHp).toBe(80);
        expect(farm.population).toBe(0);

        const goblin = new Goblin(scene, terrain, 10, 10.5, 'normal');
        goblin.damage = 10;
        goblin.attackCooldown = 0;

        // Force attack
        const success = goblin.attack(farm);
        expect(success).toBe(true);
        expect(farm.hp).toBe(70); // 80 - 10
    });

    it('Building with population should lose population first', () => {
        const house = new Building(scene, terrain, 'house', 10, 10);
        house.population = 5;
        const initialHp = house.hp; // 100

        const goblin = new Goblin(scene, terrain, 10, 10.5, 'normal');
        goblin.damage = 10;
        goblin.attackCooldown = 0;

        // Attack 1: Lose 5 pop, then 5 HP
        goblin.attack(house);
        expect(house.population).toBe(0);
        expect(house.hp).toBe(initialHp - 5);

        // Attack 2: Lose 10 HP
        goblin.attackCooldown = 0;
        goblin.attack(house);
        expect(house.hp).toBe(initialHp - 15);
    });

    it('Building should be removed when HP reaches 0', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        farm.hp = 5;

        const goblin = new Goblin(scene, terrain, 10, 10.5, 'normal');
        goblin.damage = 10;
        goblin.attackCooldown = 0;

        goblin.attack(farm);
        expect(farm.hp).toBe(0);
        expect(terrain.removeBuilding).toHaveBeenCalledWith(farm);
    });

    it('Farm should lose HP prioritized (New Logic)', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        farm.hp = 80;
        farm.population = 50; // High grain yield

        const goblin = new Goblin(scene, terrain, 10, 10, 'normal');
        goblin.damage = 10;

        // Attack
        goblin.attack(farm);
        // New Logic: HP directly takes 10 damage, population also reduced by 10.
        expect(farm.hp).toBe(70);
        expect(farm.population).toBe(40);
    });

    it('Building with high population can significantly reduce incoming damage to HP (For non-farms)', () => {
        const barracks = new Building(scene, terrain, 'barracks', 10, 10);
        barracks.hp = 800; // From config
        barracks.population = 200; // At config capacity

        const goblin = new Goblin(scene, terrain, 10, 10, 'normal');
        goblin.damage = 10;

        // Attack 1: Lose 10 pop, 0 HP damage
        goblin.attack(barracks);
        expect(barracks.population).toBe(190);
        expect(barracks.hp).toBe(800);
    });
});
