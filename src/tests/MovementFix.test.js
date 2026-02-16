import { describe, it, expect, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Actor } from '../Actor.js';
import * as THREE from 'three';

// Mock Dependencies
class MockScene { add() { } remove() { } }
class MockTerrain {
    constructor() {
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.grid = Array(100).fill(0).map(() => Array(100).fill({ height: 1 }));
    }
    getTileHeight(x, z) { return 1; }
    registerEntity() { }
    findPath(sx, sz, ex, ez) {
        // Return simple path
        return [{ x: sx + 1, z: sz }, { x: sx + 2, z: sz }, { x: ex, z: ez }];
    }
    async findPathAsync(sx, sz, ex, ez) {
        return this.findPath(sx, sz, ex, ez);
    }
    moveEntity() { }
    getVisualOffset() { return { x: 0, y: 0 }; }
}

describe('Unit Movement & Throttling Fix', () => {
    let unit;
    let terrain;
    let scene;
    let game;

    beforeEach(() => {
        scene = new MockScene();
        terrain = new MockTerrain();
        game = { simTotalTimeSec: 0, gameActive: true };

        unit = new Unit(scene, terrain, 10, 10, 'worker');
        unit.game = game;
    });

    it('should move immediately on first call (Linear Fallback)', () => {
        const moved = unit.smartMove(11, 10, 0);

        expect(moved).toBe(true);
        expect(unit.isMoving).toBe(true);
        expect(unit.lastPathTime).toBe(0);
    });

    it('should trigger pathfinding for longer distances', () => {
        // Distance 3.0 (> 1.5 threshold) -> Asynchronous pathfinding
        const moved = unit.smartMove(13, 10, 0);

        expect(moved).toBe(true);
        // Initially NOT moving until path resolves
        expect(unit.isMoving).toBe(false);
        expect(unit.isPathfinding).toBe(true);
    });

    it('should handle throttling correctly', () => {
        // First call triggers pathfinding
        unit.smartMove(15, 10, 1.0);

        // Throttling: diff < 1.0. Call at 1.1s (Diff 0.1)
        const moved2 = unit.smartMove(15, 10, 1.1);

        // Should return true (BUSY) to prevent state exit
        expect(moved2).toBe(true);
        expect(unit.isPathfindingThrottled).toBe(true);
        expect(unit.isMoving).toBe(false);
    });

    it('should continue moving along path even if throttled', () => {
        // Simulate already moving along a path
        unit.path = [{ x: 11, z: 10 }, { x: 12, z: 10 }];
        unit.isMoving = true;
        unit.lastPathTime = 1.0;

        // Target CHANGED -> Would normally re-path, but throttled
        const res = unit.smartMove(15, 10, 1.1);

        // Should return true because isMoving is already true (keep moving along old path)
        expect(res).toBe(true);
        expect(unit.isPathfindingThrottled).toBe(true);
        expect(unit.isMoving).toBe(true);
    });
});
