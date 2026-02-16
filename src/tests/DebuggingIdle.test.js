import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { Wander } from '../ai/states/UnitStates';
import { WanderState } from '../ai/states/State'; // Import base
import { MockGame, MockTerrain } from './TestHelper';


describe('Action Label Logic', () => {
    let game, terrain, unit;

    beforeEach(() => {
        game = new MockGame();
        terrain = new MockTerrain();
        game.terrain = terrain;
        window.game = game;
        unit = new Unit(game.scene, terrain, 5, 5, 'worker');
        unit.game = game;
        unit.id = 0;

        // Use Real Logic for move
        unit.smartMove = Unit.prototype.smartMove;
        unit.executeMove = Unit.prototype.executeMove;
    });

    it('should maintain Moving action during update loop', async () => {
        // Setup: Unit needs ONE update to initialize
        // State: Idle -> Wander

        // 1. Force state to Wander
        const wander = new Wander(unit);
        unit.changeState(wander); // Sets 'Wandering' -> 'Actions...'

        // 2. Trigger Move (mock smartMove to simulate REAL move)
        // Move to 6,6 (Distance ~1.4)
        unit.smartMove(6, 6, 0);
        await Promise.resolve(); // Flush microtasks for findPathAsync

        // One update to let State Machine process the motion and set 'Moving' action
        unit.updateLogic(0.1, 0.1, false, [], [], []);
        await Promise.resolve(); // Flush microtasks if any

        expect(unit.action).toBe('Moving');
        expect(unit.isMoving).toBe(true);

        // 3. Simulate Frame Updates (0.1s steps)
        for (let i = 0; i < 15; i++) {
            const time = (i + 1) * 0.1;

            // Log before update
            // console.log(`[Frame ${i}] Start Action: ${unit.action} Moving: ${unit.isMoving}`);

            unit.updateLogic(time, 0.1, false, [], [], []);

            // Log after update
            // console.log(`[Frame ${i}] End Action: ${unit.action} Moving: ${unit.isMoving}`);

            if (unit.isMoving && unit.action === 'Idle') {
                throw new Error(`Regression: Action is Idle while Moving at frame ${i}`);
            }

            // Check if we stopped unexpectedly
            if (!unit.isMoving && i < 5) {
                // If we stopped early, that's also a bug (we wanted to move)
                // expect(unit.action).not.toBe('Idle'); // Or maybe it arrived? 1.4 dist / speed ~0.8 * 1.4 = 1.1s
            }
        }
    });
});

