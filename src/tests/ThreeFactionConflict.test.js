
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Actor } from '../Actor.js';
import { Terrain } from '../Terrain.ts';
import * as THREE from 'three';

describe('Three-Faction Conflict (Player vs Goblin vs Enemy)', () => {
    let terrain, scene, mockGame;

    beforeEach(async () => {
        scene = new THREE.Scene();
        terrain = new Terrain(scene);

        // Grid initialization
        terrain.grid = Array.from({ length: 100 }, () =>
            Array.from({ length: 100 }, () => ({ regionId: 1, height: 10, hasBuilding: false }))
        );

        mockGame = {
            scene: scene,
            terrain: terrain,
            units: [],
            goblins: [],
            goblinManager: { goblins: [], notifyClanActivity: vi.fn(), reportRaidFailure: vi.fn() },
            simTotalTimeSec: 100,
            frameCount: 0
        };
        window.game = mockGame;
        window.isTest = true;

        Unit.assets = { initialized: true };
        Goblin.assets = { initialized: true };
        Actor.ignoreDetectionProbability = true;
    });

    it('should allow a Player unit to target both Goblin and Enemy units', () => {
        const playerUnit = new Unit(scene, terrain, 10, 10, 'knight');
        playerUnit.faction = 'player';

        const goblinUnit = new Goblin(scene, terrain, 12, 10, 'normal');
        goblinUnit.faction = 'goblin';

        const enemyUnit = new Unit(scene, terrain, 10, 12, 'knight');
        enemyUnit.faction = 'enemy';

        // 1. Manually set terrain targets for scan
        // First, check if player detects goblin
        terrain.findBestTarget = vi.fn().mockReturnValue(goblinUnit);
        playerUnit.updateLogic(101, 1, false, [playerUnit, enemyUnit], [goblinUnit]);
        expect(playerUnit.targetGoblin).toBe(goblinUnit);

        // Reset and check if player detects enemy (unit)
        playerUnit.targetGoblin = null;
        terrain.findBestTarget = vi.fn().mockImplementation((type) => {
            if (type === 'unit') return enemyUnit;
            return null;
        });
        playerUnit.updateLogic(102, 1, false, [playerUnit, enemyUnit], [goblinUnit]);
        expect(playerUnit.targetUnit).toBe(enemyUnit);
    });

    it('should allow an Enemy unit to target both Player and Goblin units', () => {
        const enemyUnit = new Unit(scene, terrain, 10, 12, 'knight');
        enemyUnit.faction = 'enemy';

        const playerUnit = new Unit(scene, terrain, 10, 10, 'knight');
        playerUnit.faction = 'player';

        const goblinUnit = new Goblin(scene, terrain, 12, 10, 'normal');
        goblinUnit.faction = 'goblin';

        // 1. Enemy detects Player
        terrain.findBestTarget = vi.fn().mockImplementation((type) => {
            if (type === 'unit') return playerUnit;
            return null;
        });
        enemyUnit.updateLogic(101, 1, false, [playerUnit, enemyUnit], [goblinUnit]);
        expect(enemyUnit.targetUnit).toBe(playerUnit);

        // 2. Enemy detects Goblin
        enemyUnit.targetUnit = null;
        terrain.findBestTarget = vi.fn().mockImplementation((type) => {
            if (type === 'goblin') return goblinUnit;
            return null;
        });
        enemyUnit.updateLogic(102, 1, false, [playerUnit, enemyUnit], [goblinUnit]);
        expect(enemyUnit.targetGoblin).toBe(goblinUnit);
    });

    it('should allow a Goblin unit to target both Player and Enemy units', () => {
        const goblinUnit = new Goblin(scene, terrain, 12, 10, 'normal');
        goblinUnit.faction = 'goblin';

        const playerUnit = new Unit(scene, terrain, 10, 10, 'knight');
        playerUnit.faction = 'player';

        const enemyUnit = new Unit(scene, terrain, 10, 12, 'knight');
        enemyUnit.faction = 'enemy';

        // 1. Goblin detects Player
        terrain.findBestTarget = vi.fn().mockImplementation((type) => {
            if (type === 'unit') return playerUnit;
            return null;
        });
        goblinUnit.updateLogic(101, 1, false, [playerUnit, enemyUnit], [goblinUnit]);
        expect(goblinUnit.targetUnit).toBe(playerUnit);

        // 2. Goblin detects Enemy
        goblinUnit.targetUnit = null;
        terrain.findBestTarget = vi.fn().mockImplementation((type) => {
            if (type === 'unit') return enemyUnit;
            return null;
        });
        goblinUnit.updateLogic(102, 1, false, [playerUnit, enemyUnit], [goblinUnit]);
        expect(goblinUnit.targetUnit).toBe(enemyUnit);
    });

    it('should correctly handle retaliation in Actor.takeDamage for all three factions', () => {
        const player = new Actor(scene, terrain, 10, 10, 'knight');
        player.faction = 'player';

        const goblin = new Actor(scene, terrain, 11, 11, 'goblin');
        goblin.faction = 'goblin';

        const enemy = new Actor(scene, terrain, 12, 12, 'knight');
        enemy.faction = 'enemy';

        // Player attacks Goblin
        goblin.takeDamage(10, player);
        expect(goblin.targetUnit).toBe(player);

        // Enemy attacks Goblin
        goblin.targetUnit = null;
        goblin.takeDamage(10, enemy);
        expect(goblin.targetUnit).toBe(enemy);

        // Goblin attacks Enemy
        enemy.takeDamage(10, goblin);
        expect(enemy.targetGoblin).toBe(goblin);

        // Player attacks Enemy
        enemy.targetGoblin = null;
        enemy.takeDamage(10, player);
        expect(enemy.targetUnit).toBe(player);
    });
});
