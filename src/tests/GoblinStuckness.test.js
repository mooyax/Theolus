
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Combat, Raid } from '../ai/states/GoblinStates.js';

describe('Goblin Combat and Stagnation', () => {
    let terrain, scene, goblin;

    beforeEach(() => {
        terrain = {
            gridToWorld: (v) => v,
            getTileHeight: vi.fn().mockReturnValue(10),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            grid: Array(160).fill(0).map(() => Array(160).fill({ hasBuilding: false })),
            findBestTarget: vi.fn(),
            logicalWidth: 160,
            logicalDepth: 160,
            findPath: vi.fn(),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 11, z: 11 }]),
            getRegion: vi.fn().mockReturnValue({ id: 'test' }),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 })
        };
        scene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };

        window.game = {
            simTotalTimeSec: 100,
            entityManager: {
                units: [],
                goblins: [],
                getAllUnits: function () { return this.units; },
                getAllGoblins: function () { return this.goblins; },
                register: function (u) {
                    if (u.type === 'goblin' || u.role === 'goblin') this.goblins.push(u);
                    else this.units.push(u);
                },
                clear: function () { this.units = []; this.goblins = []; }
            },
            get units() { return this.entityManager.units; },
            get goblins() { return this.entityManager.goblins; },
            buildings: [],
            goblinManager: {
                getClanRaidTarget: vi.fn().mockReturnValue(null),
                clans: { 0: { active: true } },
                notifyClanActivity: vi.fn()
            }
        };

        goblin = new Goblin(scene, terrain, 10, 10);
        goblin.ignoredTargets = new Map();
    });

    afterEach(() => {
        window.game = null;
        vi.clearAllMocks();
    });

    it('should blacklist unreachable targets and transition state', async () => {
        const targetUnit = { id: 'victim1', gridX: 20, gridZ: 20, type: 'unit', isDead: false };
        goblin.targetUnit = targetUnit;
        goblin.changeState(new Combat(goblin));

        goblin.smartMove = vi.fn().mockImplementation(() => {
            goblin.isUnreachable = true;
            return false;
        });

        window.game.simTotalTimeSec = 101;
        goblin.updateLogic(101, 1);

        expect(goblin.ignoredTargets.has('victim1')).toBe(true);
        expect(goblin.ignoredTargets.get('victim1')).toBeCloseTo(111, 1); // 101 + 10.0
        expect(goblin.targetUnit).toBeNull();
        expect(goblin.state instanceof Raid).toBe(true);
    });

    it('should respect blacklist in findTarget', () => {
        const targetUnit = { id: 'blocked1', gridX: 12, gridZ: 12, type: 'unit' };
        window.game.entityManager.register(targetUnit);

        goblin.ignoredTargets.set('blocked1', 105);
        window.game.simTotalTimeSec = 100;

        terrain.findBestTarget.mockImplementation((type, x, z, dist, costFn, list) => {
            if (type === 'unit') {
                const cost = costFn(targetUnit, 2);
                return (cost === Infinity) ? null : targetUnit;
            }
            return null;
        });

        goblin.findTarget(window.game.units, []);
        expect(goblin.targetUnit).toBeNull();

        window.game.simTotalTimeSec = 110;
        goblin.findTarget(window.game.units, []);
        expect(goblin.targetUnit).toBe(targetUnit);
    });

    it('should not stop movement if already fighting', () => {
        goblin.changeState(new Combat(goblin));
        goblin.action = "Fighting";
        goblin.isMoving = true;

        goblin.changeState(new Combat(goblin));
        expect(goblin.isMoving).toBe(true);
        expect(goblin.action).toBe("Fighting");
    });
});