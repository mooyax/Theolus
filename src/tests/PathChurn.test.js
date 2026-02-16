
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { setupTestEnv } from './TestUtils';

describe('Path Churn / Refetching', () => {
    let mockGame;
    let unit;
    let terrain;

    beforeEach(() => {
        const env = setupTestEnv({ useMockTerrain: true });
        mockGame = env.game;
        terrain = env.terrain;

        unit = new Unit(mockGame.scene, terrain, 0, 0, 'knight');
        mockGame.units = [unit];
        window.game = mockGame;

        vi.spyOn(unit, 'smartMove');
    });

    it('should use stored pathTarget in onMoveFinished to preserve path', () => {
        // SETUP: Manually create a valid path state
        const targetX = 10.6;
        const targetZ = 10.6;

        // Mock path existence
        unit.path = [{ x: 1, z: 1 }, { x: 10, z: 10 }];
        unit.isMoving = true;

        // KEY: Set the stored target
        unit.pathTargetX = targetX;
        unit.pathTargetZ = targetZ;

        // EXECUTE: Call onMoveFinished
        unit.onMoveFinished(200);

        // ASSERT: 
        // 1. smartMove called with PRESERVED FLOAT TARGET (10.6)
        expect(unit.smartMove).toHaveBeenCalledWith(targetX, targetZ, expect.anything());

        // 2. Path should NOT be null (It would be null if smartMove(10,10) was called)
        // Note: strictly speaking, smartMove logic might still fail if 10.6 vs 1 is too far?
        // But here we mock smartMove? No, spied.
        // If smartMove implementation runs, it will check distance logic.
        // At 0,0 vs 1,1 -> OK.

        expect(unit.path).not.toBeNull();
    });

    it('should fallback to lastNode if pathTarget is undefined', () => {
        // SETUP
        unit.path = [{ x: 5, z: 5 }];
        unit.isMoving = true;
        unit.pathTargetX = undefined;
        unit.pathTargetZ = undefined;

        // EXECUTE
        unit.onMoveFinished(200);

        // ASSERT: Fallback to integer node
        expect(unit.smartMove).toHaveBeenCalledWith(5, 5, expect.anything());
    });
});
