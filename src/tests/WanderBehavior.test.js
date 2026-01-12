import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnitWanderState } from '../ai/states/UnitStates.js';
import { GoblinWanderState } from '../ai/states/GoblinStates.js';

describe('Wander Behavior Verification', () => {
    let mockActor;

    beforeEach(() => {
        mockActor = {
            id: 1,
            type: 'unit',
            isMoving: false,
            action: 'Idle',
            moveRandomly: vi.fn(),
            changeState: vi.fn(),
            checkSelfDefense: vi.fn().mockReturnValue(false)
        };
        global.window = {
            game: {
                units: [],
                buildings: [],
                findBestRequest: vi.fn().mockReturnValue(null),
                claimRequest: vi.fn().mockReturnValue(false)
            }
        };
    });

    it('UnitWanderState should trigger moveRandomly after interval', () => {
        const state = new UnitWanderState(mockActor);
        state.enter(null);

        // First update initializes lastTime
        state.update(100, 0.1);
        expect(mockActor.moveRandomly).not.toHaveBeenCalled();

        // Advance time past default interval (2-5s)
        // moveInterval is e.g. 3s. 100 + 10 = 110.
        state.update(110, 10);

        expect(mockActor.moveRandomly).toHaveBeenCalledWith(110);
        // UnitWanderState resets to 'Idle' in update if not actually moving yet, or 'Wandering' if move starts.
        // For this test, we just check moveRandomly was called. Action might fluctuate.
        // Let's accept Idle as valid start state
        expect(['Idle', 'Wandering']).toContain(mockActor.action);
    });

    it('GoblinWanderState should also wander and scan for targets', () => {
        const mockGoblin = {
            ...mockActor,
            type: 'goblin',
            findTarget: vi.fn()
        };
        const state = new GoblinWanderState(mockGoblin);
        state.enter(null);

        state.update(100, 0.5); // Init
        state.update(101, 1.0); // Trigger scan (scanTimer > 1.0)

        expect(mockGoblin.findTarget).toHaveBeenCalled();

        // Trigger wander
        state.update(110, 9);
        expect(mockGoblin.moveRandomly).toHaveBeenCalled();
    });
});
