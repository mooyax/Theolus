
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initGrid, findPath, getHeight, updateCell } from '../workers/pathfindingWorker.js';

describe('PathfindingWorker', () => {
    const WIDTH = 10;
    const HEIGHT = 10;

    beforeEach(() => {
        // Initialize a flat 10x10 grid with height 5 (Safe Land)
        const data = new Int16Array(WIDTH * HEIGHT).fill(5);
        initGrid({ w: WIDTH, h: HEIGHT, data: data });

    });
    it('should find a simple path on flat terrain', () => {
        // (0,0) -> (0,5)
        const path = findPath(0, 0, 0, 5, 100, 1);
        console.log('Returned Path:', JSON.stringify(path)); // DEBUG
        expect(path).not.toBeNull();
        expect(path.length).toBeGreaterThan(0);
        const last = path[path.length - 1];
        expect(last.x).toBe(0);
        expect(last.z).toBe(5);

    });
    it('should avoid water (Height <= 0)', () => {
        // Surround (0,0) with water
        // Neighbors of (0,0) are (1,0), (9,0), (0,1), (0,9), (1,1), (9,1), (1,9), (9,9)
        const neighbors = [
            { x: 1, z: 0 }, { x: 9, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: 9 },
            { x: 1, z: 1 }, { x: 9, z: 1 }, { x: 1, z: 9 }, { x: 9, z: 9 }
        ];

        for (const n of neighbors) {
            updateCell({ x: n.x, z: n.z, h: 0 });
        }

        // Try to move anywhere
        const path = findPath(0, 0, 0, 5, 100, 2);

        // Should fail
        expect(path).toBeNull();

    });
    it('should avoid steep slopes (Height Diff > 6)', () => {
        // Surround (0,0) with walls
        const neighbors = [
            { x: 1, z: 0 }, { x: 9, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: 9 },
            { x: 1, z: 1 }, { x: 9, z: 1 }, { x: 1, z: 9 }, { x: 9, z: 9 }
        ];

        for (const n of neighbors) {
            updateCell({ x: n.x, z: n.z, h: 20 }); // 5 -> 20 (Diff 15 > 6)
        }

        // Try to move
        const path = findPath(0, 0, 0, 5, 100, 3);

        // Should fail
        expect(path).toBeNull();

    });
    it('should climb allowed slopes (Height Diff <= 6)', () => {
        // Create a single step at z=1 for the path
        updateCell({ x: 0, z: 1, h: 10 }); // 5 -> 10 (Diff 5 <= 6)
        // Ensure path continues

        // Try to climb
        const path = findPath(0, 0, 0, 2, 100, 4);

        // Should succeed
        expect(path).not.toBeNull();
        expect(path.length).toBeGreaterThan(0);

    });
    it('should handle diagonal movement correctly', () => {
        // (0,0) -> (2,2)
        const path = findPath(0, 0, 2, 2, 100, 5);
        expect(path).not.toBeNull();

        const first = path[0];
        expect(first.x).toBe(0);
        expect(first.z).toBe(0);

    });
});