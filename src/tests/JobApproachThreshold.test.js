
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
            getDistance: vi.fn((x, z) => {
                const dx = x - mockActor.gridX;
                const dz = z - mockActor.gridZ;
                return Math.sqrt(dx * dx + dz * dz);
            }),
            changeState: vi.fn((newState) => {
                if (newState && newState.name === 'Wander') {
                    mockActor.targetRequest = null;
                }
            }),
            smartMove: vi.fn(),
            triggerMove: vi.fn(),
            clearPath: vi.fn(),
            simTime: 100,
            targetRequest: { id: 'req1', x: 12, z: 10, status: 'assigned', type: 'test', assignedTo: 1 },
            game: mockGame,
            stagnationTimer: 0,
            stuckTimer: 0,
            isUnreachable: false,
            terrain: mockGame.terrain
        };

        jobState = new Job(mockActor);
        jobState.targetRequest = mockActor.targetRequest;
    });

    it('should complete job if distance is 2.0 (within 2.1 threshold)', () => {
        mockActor.targetRequest.x = 12.0;
        mockActor.targetRequest.z = 10;
        jobState.targetRequest = mockActor.targetRequest;

        jobState.update(100, 0.1, false, []);

        expect(mockActor.action).toBe('Working');
    });

    it('should NOT complete job if distance is 2.2 (outside 2.1 threshold for land)', () => {
        // We ensure terrain says height > 0 (Land)
        mockActor.terrain.getTileHeight = () => 5;
        mockActor.targetRequest.x = 12.2;
        mockActor.targetRequest.z = 10;
        jobState.targetRequest = mockActor.targetRequest;

        jobState.update(100, 0.1, false, []);

        expect(mockActor.action).toBe('Approaching Job');
        expect(mockGame.completeRequest).not.toHaveBeenCalled();
    });
});
