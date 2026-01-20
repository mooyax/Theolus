
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { JobState } from '../ai/states/UnitStates.js';
import { Unit } from '../Unit.js';

describe('Job Approach Threshold', () => {
    let mockActor;
    let mockGame;
    let jobState;

    beforeEach(() => {
        mockGame = {
            completeRequest: vi.fn(),
            releaseRequest: vi.fn(),
            findBestRequest: vi.fn().mockReturnValue(null),
            claimRequest: vi.fn(),
            terrain: {
                logicalWidth: 100,
                logicalDepth: 100,
                getTileHeight: () => 1
            }
        };
        window.game = mockGame;

        mockActor = {
            id: 1,
            gridX: 10,
            gridZ: 10,
            role: 'worker',
            action: 'Approaching Job',
            isMoving: true,
            getDistance: vi.fn(),
            changeState: vi.fn(),
            smartMove: vi.fn(),
            triggerMove: vi.fn(),
            simTime: 100,
            targetRequest: { id: 'req1', x: 12, z: 10, status: 'pending', type: 'test', assignedTo: 1 },
            game: mockGame
        };

        jobState = new JobState(mockActor);
        jobState.targetRequest = mockActor.targetRequest;
    });

    it('should complete job if distance is 1.8 (within new 2.1 threshold)', () => {
        // Capture request object
        const req = mockActor.targetRequest;

        // Distance 1.8 (Old threshold was 1.5, so this would fail before fix)
        mockActor.getDistance.mockReturnValue(1.8);

        jobState.update(100, 0.1, false, []);

        expect(mockActor.action).toBe('Working');
        expect(mockGame.completeRequest).toHaveBeenCalledWith(mockActor, req);
        // Should transition to resume state (Wander) or next job
        // In this mock, findBestRequest returns null, so it goes to resume state
        expect(mockActor.changeState).toHaveBeenCalled();
    });

    it('should NOT complete job if distance is 2.2 (outside threshold)', () => {
        mockActor.getDistance.mockReturnValue(2.2);

        jobState.update(100, 0.1, false, []);

        expect(mockActor.action).toBe('Approaching Job');
        expect(mockGame.completeRequest).not.toHaveBeenCalled();
    });
});
