
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Job } from '../ai/states/UnitStates.js';
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
            targetRequest: { id: 'req1', x: 12, z: 10, status: 'assigned', type: 'test', assignedTo: 1 },
            game: mockGame
        };

        jobState = new Job(mockActor);
        jobState.targetRequest = mockActor.targetRequest;
    });

    it('should complete job if distance is 1.4 (within 1.5 threshold)', () => {
        // Distance 1.4: set target coordinates to be exactly 1.4 units away (within 1.5 threshold)
        // Actor is at (10, 10), set target at (11.4, 10) for distance 1.4
        mockActor.targetRequest.x = 11.4;
        mockActor.targetRequest.z = 10;
        jobState.targetRequest = mockActor.targetRequest;

        const req = mockActor.targetRequest;

        jobState.update(100, 0.1, false, []);

        // jobState.actor and mockActor are the same reference
        expect(jobState.actor.action).toBe('Working');
        // Note: production code calls workOnRequest, not completeRequest directly
        // completeRequest would only be called when req.status === 'completed'
    });

    it('should NOT complete job if distance is 1.6 (outside 1.5 threshold)', () => {
        // Distance 1.6: set target coordinates to be exactly 1.6 units away (outside 1.5 threshold)
        // Actor is at (10, 10), set target at (11.6, 10) for distance 1.6
        mockActor.targetRequest.x = 11.6;
        mockActor.targetRequest.z = 10;
        jobState.targetRequest = mockActor.targetRequest;

        jobState.update(100, 0.1, false, []);

        // When distance is too far, action should remain 'Approaching Job'
        expect(jobState.actor.action).toBe('Approaching Job');
        expect(mockGame.completeRequest).not.toHaveBeenCalled();
    });
});
