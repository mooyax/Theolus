
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Job } from '../ai/states/UnitStates.js';
import { Unit } from '../Unit.js';
import { setupTestEnv } from './TestUtils';

// Note: setup.js handles global mocks (THREE, etc.)

describe('Job Pathfinding Failure Handling', () => {
    let mockGame;
    let unit;
    let job;

    beforeEach(() => {
        const env = setupTestEnv({ useMockTerrain: true });
        mockGame = env.game;

        const terrain = env.terrain;
        terrain.findPath = vi.fn().mockImplementation(() => [{ x: 20, z: 0 }]);
        terrain.findPathAsync = vi.fn().mockImplementation(() => Promise.resolve([{ x: 20, z: 0 }]));
        terrain.isReachable = vi.fn().mockReturnValue(true);

        unit = new Unit(mockGame.scene, terrain, 0, 0, 'worker');
        unit.id = 1;

        job = { id: 101, x: 20, z: 0, type: 'build', status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = job;

        mockGame.entityManager.register(unit);
        window.game = mockGame;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should abandon job if smartMove fails repeatedly', async () => {
        // Mock smartMove to FAIL every time
        unit.smartMove = vi.fn().mockReturnValue(false);
        unit.canMoveTo = vi.fn().mockReturnValue(false);

        unit.changeState(new Job(unit));

        // 1. Initial State
        unit.updateLogic(1000, 0.1);
        expect(unit.action).toBe("Approaching Job");

        // 2. Loop until abandonment (threshold is 3)
        // Each call should increment pathFailCount because smartMove returns false
        for (let i = 0; i < 5; i++) {
            // Use 1.1s to exceed the 1.0s throttle in Job.update
            unit.updateLogic(1000 + (i + 1) * 2000, 1.0);
        }

        // EXPECTATION: Should detect failure and release job
        expect(unit.targetRequest).toBeNull();
    });
});