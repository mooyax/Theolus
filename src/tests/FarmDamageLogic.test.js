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

describe('Farm Damage Buffer Investigation (Direct Calculation)', () => {
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
            removeBuilding: vi.fn()
        };

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

    it('Farm should lose HP when population is 0', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        farm.hp = 80;
        farm.population = 0;

        farm.takeDamage(10);
        expect(farm.hp).toBe(70);
    });

    it('Farm should lose HP prioritized (HP takes full damage even if pop > 0)', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        farm.hp = 80;
        farm.population = 5;

        // Damage 10. 
        // New Logic: hp -= 10 (80->70), pop -= 10 (5->0)
        farm.takeDamage(10);
        expect(farm.population).toBe(0);
        expect(farm.hp).toBe(70);
    });

    it('Rapid regeneration should NOT buffer HP damage for farms', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        farm.hp = 80;
        farm.population = 0;

        // One goblin does 10 damage every 1 second.

        // Second 1: Attack
        farm.takeDamage(10); // HP 80 -> 70
        expect(farm.hp).toBe(70);

        // Second 2: Growth (0.5 pop)
        farm.population += 0.5; // Manual sim of handleGrowth

        // Second 2: Attack
        // New Logic: 10 damage goes straight to HP regardless of POP.
        farm.takeDamage(10);
        expect(farm.hp).toBe(60); // 70 - 10 (Previously 60.5 in the buffered logic)
        expect(farm.population).toBe(0);
    });

    it('Retaliation might kill weak goblins before they finish the farm', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        farm.population = 20; // High pop farm
        // Defense is 0 for farm in config, so retaliation should be 0.
        // wait, let's check Building.ts:105 
        // const factor = (this.userData.defense !== undefined) ? this.userData.defense : 2.0;

        const goblin = new Goblin(scene, terrain, 10, 10, 'normal');
        goblin.hp = 10; // Low health

        // Farm in config has defense: 0.
        // But if defense is 0, Building.ts uses its userData.defense
        // constructor sets userData.defense = config.defense || 2.0 (if undefined)
        // farm.userData.defense = 0.

        const retaliation = farm.takeDamage(5, goblin);
        expect(retaliation).toBe(0);
        expect(goblin.hp).toBe(10); // Safe
    });

    it('Wait, if farm.userData.defense is undefined, it defaults to 2.0', () => {
        const farm = new Building(scene, terrain, 'farm', 10, 10);
        // If config.defense is 0, it IS defined, so it should be 0.
        expect(farm.userData.defense).toBe(0);
    });
});
