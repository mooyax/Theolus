
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Job } from '../ai/states/UnitStates.js';

describe('Stuck and Frozen Fix Verification', () => {
    let mockActor;

    beforeEach(() => {
        mockActor = {
            id: 1,
            gridX: 10,
            gridZ: 10,
            simTime: 123.45,
            action: 'Idle',
            targetRequest: { x: 20, z: 20, type: 'build', id: 'job_1', assignedTo: 1 },
            smartMove: vi.fn(),
            changeState: vi.fn(),
            isMoving: false
        };
    });

    it('Job.enter should call smartMove with actor.simTime, not 0', () => {
        const state = new Job(mockActor);
        state.enter(null);

        // Verify that smartMove was called with 123.45
        expect(mockActor.smartMove).toHaveBeenCalledWith(20, 20, 123.45);
        expect(mockActor.smartMove).not.toHaveBeenCalledWith(expect.anything(), expect.anything(), 0);
    });

    it('Job.enter should fallback to 0 only if simTime is missing', () => {
        mockActor.simTime = undefined;
        const state = new Job(mockActor);
        state.enter(null);

        expect(mockActor.smartMove).toHaveBeenCalledWith(20, 20, 0);
    });
});
