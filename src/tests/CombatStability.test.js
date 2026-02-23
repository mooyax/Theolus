import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit';
import { Goblin } from '../Goblin';
import { setupTestEnv } from './TestUtils';
import { Combat as HumanCombat, Wander as HumanWander } from '../ai/states/UnitStates';
import { Combat as GoblinCombat, Raid as GoblinRaid } from '../ai/states/GoblinStates';

describe('Combat Stability and Scan Budget', () => {
    let game;
    let terrain;

    beforeEach(() => {
        const env = setupTestEnv({ useMockTerrain: true });
        game = env.game;
        terrain = env.terrain;
        // Set a low budget to trigger prioritization logic
        game.unitScanBudget = 10;
        if (game.goblinManager) game.goblinManager.scanBudget = 10;
    });

    it('Human combat state should persist during temporary pathfinding failure (Stickiness)', () => {
        const unit = new Unit(null, terrain, 10, 10, 'knight');
        unit.id = 1;
        game.units.push(unit);

        const goblin = new Goblin(null, terrain, 15, 15, 'normal');
        goblin.id = 999;

        // Force unit into combat
        unit.targetGoblin = goblin;
        unit.changeState(new HumanCombat(unit));

        expect(unit.state.constructor.name).toBe('Combat');

        // Mock smartMove to fail (truly unreachable)
        unit.smartMove = vi.fn().mockReturnValue(false);
        unit.isPathfinding = false;
        unit.isPathfindingThrottled = false;
        unit.isWaitingForPath = false;

        // Update multiple times within grace period (3s)
        for (let i = 0; i < 5; i++) {
            unit.state.update(0, 0.5, false, [], [], [goblin]);
            expect(unit.state.constructor.name).toBe('Combat');
        }

        // Update past grace period
        unit.state.update(0, 4.0, false, [], [], [goblin]);
        expect(unit.state.constructor.name).toBe('Wander');
    });

    it('Goblin combat should not stop moving when switching from Raid', () => {
        const goblin = new Goblin(null, terrain, 20, 20, 'normal');
        goblin.id = 2;
        goblin.isMoving = true;

        // Enter Raid first
        goblin.changeState(new GoblinRaid(goblin));
        goblin.isMoving = true;

        // Transition to Combat
        goblin.changeState(new GoblinCombat(goblin));

        // Should NOT have set isMoving to false
        expect(goblin.isMoving).toBe(true);
    });

    it('Combat units should bypass/prioritize scan budget', () => {
        const unit = new Unit(null, terrain, 30, 30, 'knight');
        unit.id = 0; // ID 0 + Frame 0 passes the interval check (0 % 10 === 0)
        game.units.push(unit);

        // Exhaust budget
        game.unitScanBudget = 0;

        // Unit is in Combat
        const goblin = new Goblin(null, terrain, 32, 32, 'normal');
        unit.targetGoblin = goblin;
        unit.changeState(new HumanCombat(unit));

        // Attempt scan
        const canScan = unit.checkSelfDefense(0, false);

        // Should allow scan despite 0 budget because of Combat priority
        expect(canScan).toBe(true);
        expect(game.unitScanBudget).toBe(0); // Should not have consumed budget further or blocked
    });
});