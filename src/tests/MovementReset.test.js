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
            findPathAsync: vi.fn().mockResolvedValue([{ x: 1, z: 0 }]),
            isReachable: vi.fn(() => true)
        };
        mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
    });

    it('should NOT reset movement timer when calling smartMove frequently for the same target', () => {
        const actor = new Actor(mockScene, mockTerrain, 0, 0, 'test');
        actor.getDistance = (x, z) => Math.abs(x - actor.gridX) + Math.abs(z - actor.gridZ);
        actor.canMoveTo = () => true;

        // First move attempt (Linear)
        const time1 = 1000;
        actor.smartMove(1, 0, time1);

        const firstMoveStart = actor.moveStartTime;
        expect(actor.isMoving).toBe(true);
        expect(actor.targetGridX).toBe(1);

        // Advance time slightly
        const time2 = 1000.1;
        // Frequent call (e.g. from Job)
        actor.smartMove(1, 0, time2);

        // If bug exists, moveStartTime will be update and progress will restart
        expect(actor.moveStartTime).toBe(firstMoveStart);
    });

    it('should progress visually even with frequent smartMove calls', () => {
        const actor = new Actor(mockScene, mockTerrain, 0, 0, 'test');
        // Simple linear distance
        actor.getDistance = (x, z) => Math.abs(x - actor.gridX) + Math.abs(z - actor.gridZ);
        actor.canMoveTo = () => true;

        actor.smartMove(1, 0, 1000);
        const duration = actor.moveDuration; // Default 1.0s in Entity

        // Progress 50%
        const timeMid = 1000 + (duration / 2);
        const posMid = actor.getVisualX(timeMid);
        expect(posMid).toBeGreaterThan(0.4); // Should be ~0.5
        expect(posMid).toBeLessThan(0.6);

        // Call smartMove again for DIFFERENT target (Linear)
        // Note: Actor.ts allows switching targets
        actor.smartMove(1.1, 0, timeMid);

        // Advance time near completion
        const timeEnd = 1000 + (duration * 0.9);
        const posEnd = actor.getVisualX(timeEnd);

        // It should keep moving towards target
        expect(posEnd).toBeGreaterThan(posMid);
    });
});
