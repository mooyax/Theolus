import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Goblin } from '../Goblin';
import { Unit } from '../Unit';

// モックの設定
vi.mock('../Game', () => {
    return {
        Game: vi.fn().mockImplementation(() => ({
            frameCount: 0,
            units: [],
            buildings: [],
            goblinManager: { goblins: [] },
            sheepManager: { sheeps: [] },
            battleMemory: {
                reportRaid: vi.fn(),
                getPriorities: vi.fn().mockReturnValue([])
            }
        }))
    };
});

// 静的メソッドのモック
Goblin.initAssets = vi.fn().mockResolvedValue(undefined);
Goblin.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
Unit.initAssets = vi.fn().mockResolvedValue(undefined);
Unit.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());

describe('Faction Combat Simulation', () => {
    let scene, terrain, game;

    beforeEach(() => {
        scene = new THREE.Scene();

        // Fully Mock Terrain
        terrain = {
            scene: scene,
            logicalWidth: 160,
            logicalDepth: 160,
            getTileHeight: vi.fn().mockReturnValue(1.0),
            getInterpolatedHeight: vi.fn().mockReturnValue(1.0),
            gridToWorld: vi.fn(v => v),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            findBestTarget: vi.fn()
        };

        // Mock Game
        game = {
            frameCount: 0,
            simTotalTimeSec: 100,
            units: [],
            buildings: [],
            goblinManager: { goblins: [] },
            sheepManager: { sheeps: [] },
            battleMemory: {
                reportRaid: vi.fn(),
                getPriorities: vi.fn().mockReturnValue([])
            },
            terrain: terrain
        };

        global.window = global.window || {};
        global.window.game = game;
    });

    describe('Faction Identification', () => {
        it('Goblin should have "goblin" faction', () => {
            const goblin = new Goblin(scene, terrain, 50, 50, 'normal');
            expect(goblin.faction).toBe('goblin');
        });

        it('Unit should have "player" faction by default', () => {
            const unit = new Unit(scene, terrain, 50, 50, 'worker');
            expect(unit.faction).toBe('player');
        });

        it('Unit should have "enemy" faction when specified', () => {
            const unit = new Unit(scene, terrain, 50, 50, 'knight', false, null, 'enemy');
            expect(unit.faction).toBe('enemy');
        });
    });

    describe('Goblin Faction Targeting', () => {
        it('should NOT target other Goblins (Friendly Fire fix check)', () => {
            const goblin1 = new Goblin(scene, terrain, 50, 50, 'normal');
            const goblin2 = { id: 2, gridX: 51, gridZ: 51, faction: 'goblin', isDead: false };

            // findBestTarget called with 'unit'
            terrain.findBestTarget.mockImplementation((type, x, z, dist, callback) => {
                if (type === 'unit') {
                    const score = callback(goblin2, 1.0);
                    if (score === Infinity) return null;
                    return goblin2;
                }
                return null;
            });

            goblin1.scanForTargets([goblin2], []);
            expect(goblin1.targetUnit).toBeNull();
        });

        it('should target Player units', () => {
            const goblin = new Goblin(scene, terrain, 50, 50, 'normal');
            const playerUnit = { id: 101, gridX: 51, gridZ: 51, faction: 'player', isDead: false };

            terrain.findBestTarget.mockImplementation((type, x, z, dist, callback) => {
                if (type === 'unit') {
                    const score = callback(playerUnit, 1.0);
                    if (score === Infinity) return null;
                    return playerUnit;
                }
                return null;
            });

            goblin.scanForTargets([playerUnit], []);
            expect(goblin.targetUnit?.id).toBe(playerUnit.id);
        });

        it('should target Enemy units', () => {
            const goblin = new Goblin(scene, terrain, 50, 50, 'normal');
            const enemyUnit = { id: 102, gridX: 51, gridZ: 51, faction: 'enemy', isDead: false };

            terrain.findBestTarget.mockImplementation((type, x, z, dist, callback) => {
                if (type === 'unit') {
                    const score = callback(enemyUnit, 1.0);
                    if (score === Infinity) return null;
                    return enemyUnit;
                }
                return null;
            });

            goblin.scanForTargets([enemyUnit], []);
            expect(goblin.targetUnit?.id).toBe(enemyUnit.id);
        });
    });

    describe('Player/Enemy Faction Targeting (Actor logic)', () => {
        it('Player Unit should NOT target other Player units', () => {
            const unit1 = new Unit(scene, terrain, 50, 50, 'knight', false, null, 'player');
            const unit2 = { id: 555, gridX: 51, gridZ: 51, faction: 'player', isDead: false, type: 'unit' };

            terrain.findBestTarget.mockImplementation((type, x, z, dist, callback) => {
                if (type === 'unit') {
                    const score = callback(unit2, 1.0);
                    if (score === Infinity) return null;
                    return unit2;
                }
                return null;
            });

            unit1.updateCombatTarget([unit2], [], []);
            expect(unit1.targetUnit).toBeNull();
        });

        it('Enemy Unit should target Player units', () => {
            const enemyUnit = new Unit(scene, terrain, 50, 50, 'knight', false, null, 'enemy');
            const playerUnit = { id: 666, gridX: 51, gridZ: 51, faction: 'player', isDead: false, type: 'unit' };

            terrain.findBestTarget.mockImplementation((type, x, z, dist, callback) => {
                if (type === 'unit') {
                    const score = callback(playerUnit, 1.0);
                    if (score === Infinity) return null;
                    return playerUnit;
                }
                return null;
            });

            enemyUnit.updateCombatTarget([playerUnit], [], []);
            expect(enemyUnit.targetUnit?.id).toBe(playerUnit.id);
        });

        it('Enemy Unit should target Goblin units', () => {
            const enemyUnit = new Unit(scene, terrain, 50, 50, 'knight', false, null, 'enemy');
            const goblin = { id: 999, gridX: 51, gridZ: 51, faction: 'goblin', isDead: false, type: 'goblin' };

            terrain.findBestTarget.mockImplementation((type, x, z, dist, callback) => {
                if (type === 'goblin') {
                    const score = callback(goblin, 1.0);
                    if (score === Infinity) return null;
                    return goblin;
                }
                return null;
            });

            enemyUnit.updateCombatTarget([], [], [goblin]);
            expect(enemyUnit.targetGoblin?.id).toBe(goblin.id);
        });

        it('Enemy Unit should target Goblin buildings (Caves/Huts)', () => {
            const enemyUnit = new Unit(scene, terrain, 50, 50, 'knight', false, null, 'enemy');
            const cave = {
                id: 301, gridX: 52, gridZ: 52, faction: 'goblin', isDead: false,
                userData: { type: 'cave', hp: 100, population: 5 }
            };

            terrain.findBestTarget.mockImplementation((type, x, z, dist, callback) => {
                if (type === 'building') {
                    const score = callback(cave, 1.0);
                    if (score === Infinity) return null;
                    return cave;
                }
                return null;
            });

            enemyUnit.updateCombatTarget([], [cave], []);
            expect(enemyUnit.targetBuilding?.id).toBe(cave.id);
        });
    });
});
