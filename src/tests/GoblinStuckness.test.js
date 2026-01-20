import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { GoblinCombatState, GoblinWanderState, GoblinRaidState } from '../ai/states/GoblinStates.js';

describe('Goblin Combat and Stagnation', () => {
    let mockTerrain, mockScene, goblin;

    beforeEach(() => {
        mockTerrain = {
            gridToWorld: (v) => v,
            getTileHeight: vi.fn().mockReturnValue(10),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            grid: Array(160).fill(0).map(() => Array(160).fill({ hasBuilding: false })),
            findBestTarget: vi.fn(),
            logicalWidth: 160,
            logicalDepth: 160,
            findPath: vi.fn()
        };
        mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };

        // Mock window.game
        window.game = {
            simTotalTimeSec: 100,
            units: [],
            buildings: [],
            goblinManager: { reportRaidFailure: vi.fn() }
        };

        goblin = new Goblin(mockScene, mockTerrain, 10, 10);
    });

    afterEach(() => {
        window.game = null;
        vi.clearAllMocks();
    });

    it('should blacklist unreachable targets and transition state', () => {
        const targetUnit = { id: 'victim1', gridX: 20, gridZ: 20, type: 'unit', isDead: false };
        goblin.targetUnit = targetUnit;
        goblin.changeState(new GoblinCombatState(goblin));

        // Mock smartMove failure by making target unreachable
        goblin.isReachable = vi.fn().mockReturnValue(false);
        goblin.smartMove = vi.fn().mockReturnValue(false);
        goblin.isUnreachable = true; // Required by new oscillation fix

        // run updateLogic via state
        window.game.simTotalTimeSec = 101;
        goblin.updateLogic(101, 1);

        // Check if blacklisted
        expect(goblin.ignoredTargets.has('victim1')).toBe(true);
        // Expiry should be 101 (current) + 10 = 111
        expect(goblin.ignoredTargets.get('victim1')).toBeCloseTo(111, 1);

        // Target should be cleared
        expect(goblin.targetUnit).toBeNull();

        // Should have transitioned back to Raid state (as per GoblinCombatState.update)
        expect(goblin.state instanceof GoblinRaidState).toBe(true);
    });

    it('should respect blacklist in findTarget', () => {
        const targetUnit = { id: 'blocked1', gridX: 12, gridZ: 12, type: 'unit' };
        window.game.units = [targetUnit];

        // Manually blacklist
        goblin.ignoredTargets.set('blocked1', 105);
        window.game.simTotalTimeSec = 100;

        // Mock findBestTarget to simulate the internal loop
        mockTerrain.findBestTarget.mockImplementation((type, x, z, dist, costFn, list) => {
            if (type === 'unit') {
                const cost = costFn(targetUnit, 2);
                return (cost === Infinity) ? null : targetUnit;
            }
            return null;
        });

        goblin.findTarget(window.game.units, []);

        // Should NOT pick the blocked unit
        expect(goblin.targetUnit).toBeNull();

        // Advance time past expiry
        window.game.simTotalTimeSec = 110;
        goblin.findTarget(window.game.units, []);

        // Should pick it now
        expect(goblin.targetUnit).toBe(targetUnit);
    });

    it('should not stop movement if already fighting', () => {
        goblin.action = "Fighting";
        goblin.isMoving = true;

        // Re-entering CombatState
        goblin.changeState(new GoblinCombatState(goblin));

        // isMoving should REMAIN true (re-entry guard)
        expect(goblin.isMoving).toBe(true);
        expect(goblin.action).toBe("Fighting");
    });
});
