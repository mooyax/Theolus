import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Actor } from '../Actor.js';

describe('Actor Movement Reset', () => {
    let mockTerrain;
    let mockScene;

    beforeEach(() => {
        mockTerrain = {
            logicalWidth: 160,
            logicalDepth: 160,
            getTileHeight: vi.fn().mockReturnValue(10),
            pathfindingCalls: 0,
            findPath: vi.fn(),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 10 }]),
            isReachable: vi.fn(() => true)
        };
        mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
    });

    it('should NOT reset movement timer when calling smartMove frequently for the same target', () => {
        const actor = new Actor(mockScene, mockTerrain, 0, 0, 'test');
        actor.getDistance = (x, z) => Math.abs(x - actor.gridX) + Math.abs(z - actor.gridZ);

        // First move attempt
        const time1 = 1000;
        actor.smartMove(2, 0, time1);

        const firstMoveStart = actor.moveStartTime;
        expect(actor.isMoving).toBe(true);
        expect(actor.targetGridX).toBe(1); // Linear move moves 1 tile at a time

        // Advance time slightly
        const time2 = 1000.1;
        // Frequent call (e.g. from JobState)
        actor.smartMove(2, 0, time2);

        // If bug exists, moveStartTime will be update and progress will restart
        expect(actor.moveStartTime).toBe(firstMoveStart);
    });

    it('should progress visually even with frequent smartMove calls', () => {
        const actor = new Actor(mockScene, mockTerrain, 0, 0, 'test');
        // Simple linear distance
        actor.getDistance = (x, z) => Math.abs(x - actor.gridX) + Math.abs(z - actor.gridZ);

        actor.smartMove(2, 0, 1000);
        const duration = actor.moveDuration; // e.g. 0.6s

        // Progress 50%
        const timeMid = 1000 + (duration / 2);
        const posMid = actor.getVisualX(timeMid);
        expect(posMid).toBeGreaterThan(0);
        expect(posMid).toBeLessThan(1);

        // Call smartMove again at mid-point
        actor.smartMove(10, 0, timeMid);

        // Advance time near completion
        const timeEnd = 1000 + (duration * 0.9);
        const posEnd = actor.getVisualX(timeEnd);

        // If bug exists, posEnd will be recalculated from 0 at timeMid, 
        // so it will be much smaller than expected.
        // It should keep moving towards 1.0.
        expect(posEnd).toBeGreaterThan(posMid);
    });
});
