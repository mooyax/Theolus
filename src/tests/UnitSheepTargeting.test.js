
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Sheep } from '../Sheep.js';
import { Goblin } from '../Goblin.js';
import * as THREE from 'three';

describe('Unit Sheep Automated Targeting Verification', () => {
    let mockScene, mockTerrain, game;

    beforeEach(() => {
        mockScene = new THREE.Scene();
        mockTerrain = {
            grid: Array(80).fill(0).map(() => Array(80).fill(0).map(() => ({ hasBuilding: false }))),
            getTileHeight: vi.fn().mockReturnValue(5),
            gridToWorld: (v) => v - 40,
            getVisualPosition: vi.fn().mockReturnValue({ x: 0, y: 5, z: 0 }),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            isReachable: vi.fn().mockReturnValue(true),
            findBestTarget: (type, x, z, rad, cost, list) => {
                let best = null;
                let bestScore = Infinity;
                if (list) {
                    for (const e of list) {
                        const d = Math.sqrt((e.gridX - x) ** 2 + (e.gridZ - z) ** 2);
                        if (d <= rad) {
                            const score = cost ? cost(e, d) : d;
                            if (score < bestScore) { bestScore = score; best = e; }
                        }
                    }
                }
                return best;
            },
            getRegion: vi.fn().mockReturnValue({ id: 'test_region' }),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 }),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 6, z: 6 }])
        };

        game = {
            units: [],
            goblins: [],
            sheepManager: { sheeps: [], removeSheep: vi.fn() },
            goblinManager: { notifyClanActivity: vi.fn(), goblins: [] },
            addMeat: vi.fn(),
            totalPopulation: 0,
            frameCount: 10
        };
        window.game = game;
    });

    it('should automatically target a nearby sheep during self-defense scan', () => {
        const unit = new Unit(mockScene, mockTerrain, 5, 5, 'knight');
        const sheep = new Sheep(mockScene, mockTerrain, 5.5, 5.5);
        sheep.faction = 'neutral';
        sheep.type = 'sheep';

        // Force scan: scanTimer(31) + id(0) % 10 = 31 (matches allowedInterval 31)
        unit.scanTimer = 31;
        unit.id = 0;
        window.game.frameCount = 0;

        window.game.sheepManager.sheeps = [sheep];
        unit.updateLogic(100, 1, false, [], [], []);
        expect(unit.targetUnit).toBe(sheep);
    });

    it('should prioritize Goblins over Sheep', () => {
        const unit = new Unit(mockScene, mockTerrain, 5, 5, 'knight');
        const sheep = new Sheep(mockScene, mockTerrain, 6, 6);
        sheep.faction = 'neutral';
        sheep.type = 'sheep';
        const goblin = new Goblin(mockScene, mockTerrain, 5, 5, 'normal');
        goblin.faction = 'enemy';
        goblin.type = 'goblin';

        unit.scanTimer = 31;
        unit.id = 0;
        window.game.frameCount = 0;
        window.game.sheepManager.sheeps = [sheep];
        unit.updateLogic(100, 1, false, [], [], [goblin]);

        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.targetUnit).toBeNull();
    });

    it('should engage in combat and grant meat reward automatically', () => {
        const unit = new Unit(mockScene, mockTerrain, 5, 5, 'knight');
        const sheep = new Sheep(mockScene, mockTerrain, 5.1, 5.1);
        sheep.hp = 10;
        sheep.faction = 'neutral';
        sheep.type = 'sheep';
        unit.damage = 60;
        unit.attackCooldown = 0;
        unit.scanTimer = 31;

        // Step 1: Detect and transition to Combat
        window.game.sheepManager.sheeps = [sheep];
        unit.updateLogic(100, 1, false, [], [], []);

        expect(unit.targetUnit).toBe(sheep);
        expect(unit.state.name).toBe('Combat');

        // Step 2: Simulate damage
        sheep.takeDamage(60, unit);
        expect(sheep.hp).toBeLessThanOrEqual(0);
    });
});