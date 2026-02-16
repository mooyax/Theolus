import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';

describe('Manual Job Pathfinding Throttle', () => {
    let unit;
    let terrain;

    beforeEach(() => {
        terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: () => 1,
            isWalkable: () => true,
            isReachable: () => true,
            findPathAsync: vi.fn().mockResolvedValue([{ x: 11, z: 11 }]),
            pathfindingCalls: 0
        };
        unit = new Unit(null, terrain, 10, 10, 'worker');
        unit.id = 1;
        // Mock getDistance to avoid world-wrapping complexity in this test
        unit.getDistance = (tx, tz, ox, oz) => {
            const sx = ox !== undefined ? ox : unit.gridX;
            const sz = oz !== undefined ? oz : unit.gridZ;
            const dx = tx - sx;
            const dz = tz - sz;
            return Math.sqrt(dx * dx + dz * dz);
        };
    });

    it('should bypass throttle for manual jobs even after first attempt', () => {
        unit.action = 'Approaching Job';
        unit.lastPathTime = 100; // Simulating a previous pathfinding call at time 100

        // Try to re-path at time 100.5 (only 0.5s later, throttle is usually 1.0s+)
        const result = unit.smartMove(20, 20, 100.5);

        expect(unit.isPathfindingThrottled).toBe(false);
        expect(terrain.findPathAsync).toHaveBeenCalled();
        expect(unit.lastPathTime).toBe(100.5);
    });

    it('should still throttle normal actions (e.g. Wander)', () => {
        unit.action = 'Wander';
        unit.lastPathTime = 100;

        // Throttle is 1.0 + (id%20)*0.1 = 1.0 + (1%20)*0.1 = 1.1s
        // Try at 100.5s -> Should be throttled
        const result = unit.smartMove(20, 20, 100.5);

        expect(unit.isPathfindingThrottled).toBe(true);
        expect(terrain.findPathAsync).not.toHaveBeenCalled();
        expect(unit.lastPathTime).toBe(100); // Should NOT have updated
    });

    it('should NOT update lastPathTime if global budget is exceeded', () => {
        unit.action = 'Approaching Job';
        unit.lastPathTime = 100;
        terrain.pathfindingCalls = 500; // Budget exceeded (Matches Actor.ts threshold)

        const result = unit.smartMove(20, 20, 101.0);

        expect(unit.isWaitingForPath).toBe(true);
        expect(terrain.findPathAsync).not.toHaveBeenCalled();
        expect(unit.lastPathTime).toBe(100); // Should NOT have updated to 101
    });
});
