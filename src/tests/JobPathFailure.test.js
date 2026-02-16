
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
        // mockGame provides necessary methods like releaseRequest, findBestRequest

        // Custom Terrain overwrites if needed for this test
        const terrain = env.terrain;
        terrain.findPath = vi.fn().mockImplementation(() => [{ x: 20, z: 0 }]);
        terrain.findPathAsync = vi.fn().mockImplementation(() => Promise.resolve([{ x: 20, z: 0 }]));
        terrain.isReachable = vi.fn().mockReturnValue(true);

        // Create Unit attached to MockGame
        unit = new Unit(mockGame.scene, terrain, 0, 0, 'worker');
        unit.id = 1;

        job = { id: 101, x: 20, z: 0, type: 'build', status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = job;

        mockGame.units = [unit];
        window.game = mockGame;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should abandon job if smartMove fails repeatedly', async () => {
        // Mock Unit prototype canMoveTo to FORCE FAIL (simulate blockage)
        // Mock smartMove to FAIL
        unit.smartMove = vi.fn().mockReturnValue(false);
        unit.canMoveTo = vi.fn().mockReturnValue(false);

        unit.changeState(new Job(unit));

        // 1. Update - First Attempt
        try {
            unit.updateLogic(1000, 0.1);
        } catch (e) {
            console.error("UpdateLogic Error:", e);
        }

        expect(unit.action).toBe("Approaching Job");

        // 2. Simulate 5 seconds passing (Retrying...)
        unit.updateLogic(4000, 0.1); // Time skip

        // Still stuck?
        expect(unit.targetRequest).toBe(job); // Should trigger retry

        // 3. Simulate MANY failures (Loop to exceed threshold)
        for (let i = 0; i < 60; i++) {
            unit.updateLogic(4000 + i * 3000, 0.1);
        }

        // EXPECTATION: Should detect failure and release job
        expect(unit.targetRequest).toBeNull();
    });
});
