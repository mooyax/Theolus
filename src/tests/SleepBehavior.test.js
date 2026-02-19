
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Sleep, Wander } from '../ai/states/UnitStates';

describe('Sleep State Behavior', () => {
    let mockUnit;

    beforeEach(() => {
        // Create a plain mock object instead of real Unit
        mockUnit = {
            id: 1,
            role: 'worker',
            gridX: 10,
            gridZ: 10,
            action: 'Idle',
            isMoving: false,
            isSleeping: false,
            // Mock methods
            findNearestShelter: vi.fn(),
            smartMove: vi.fn(),
            changeState: vi.fn().mockImplementation(function (newState) {
                if (this.state && this.state.exit) this.state.exit(newState);
                this.state = newState;
                if (this.state && this.state.enter) this.state.enter(this.state);
            }),
            // Properties needed by Wander or others if transitions happen
            migrationTarget: null,
            targetRequest: null,
            targetGoblin: null,
            targetBuilding: null,
            checkSelfDefense: vi.fn(),
        };

        // Initial state setup
        mockUnit.state = new Sleep(mockUnit);
        mockUnit.state.enter();
    });

    it('should stay in Sleep state and move if shelter is found', () => {
        const shelter = { gridX: 20, gridZ: 20 };
        mockUnit.findNearestShelter.mockReturnValue(shelter);

        // Update with isNight = true
        mockUnit.state.update(0, 1.0, true, [], [], []);

        expect(mockUnit.action).toBe('Going Home');
        expect(mockUnit.smartMove).toHaveBeenCalledWith(20, 20, 0);
        expect(mockUnit.state).toBeInstanceOf(Sleep); // Still in Sleep state
    });

    it('should EXIT Sleep state (revert to Wander) if no shelter is found', () => {
        // Condition: No shelter found
        mockUnit.findNearestShelter.mockReturnValue(null);

        // Update with isNight = true
        mockUnit.state.update(0, 1.0, true, [], [], []);

        // Expectation: Should match the fix behavior (switch to Wander)
        expect(mockUnit.state).toBeInstanceOf(Wander);
        expect(mockUnit.isSleeping).toBe(false);
    });
});
