
import { describe, it, expect } from 'vitest';
import { findPath, initGrid } from '../workers/pathfindingWorker.js';

describe('Pathfinding Worker Performance', () => {

    const setupGrid = (w, h) => {
        const data = new Int16Array(w * h).fill(10); // All flat
        const moisture = new Float32Array(w * h).fill(0.5);
        initGrid({ w, h, data: data.buffer, moistureData: moisture.buffer });
    };

    it('should find path on large 100x100 grid within reasonable time', () => {
        const size = 100;
        setupGrid(size, size);

        // Force a long path (diagonal 0,0 to 99,99)
        // With simple flat terrain, A* should go straight.
        // openList shouldn't get too huge if Heuristic is good.

        const start = performance.now();
        const path = findPath(0, 0, 99, 99, 50000, 1);
        const end = performance.now();

        console.log(`[Perf] 100x100 Flat: ${(end - start).toFixed(2)}ms Steps: ???`);
        expect(path).not.toBeNull();
        expect(end - start).toBeLessThan(500); // Should be very fast
    });

    it('should handle worst-case zig-zag maze without freezing', () => {
        const size = 60; // 60x60 = 3600 nodes
        const data = new Int16Array(size * size).fill(10);

        // Create a Zig-Zag Maze that forces A* to explore MANY nodes?
        // Actually, large open space with a wall near the end is worst for simple A*.
        // It floods the whole map looking for a way around.

        // Wall at x=50, blocking almost everything
        for (let z = 0; z < size - 1; z++) { // Leave 1 gap at top
            data[z * size + 50] = -10; // Water
            // Also add high cost "swamp" everywhere to force node updates?
        }

        const moisture = new Float32Array(size * size).fill(0.5);
        initGrid({ w: size, h: size, data: data.buffer, moistureData: moisture.buffer });

        const start = performance.now();
        // Start 0,0 -> End 55, 30 (Behind wall)
        // It has to go all the way to z=59 to cross x=50
        const path = findPath(0, 0, 55, 30, 50000, 2);
        const end = performance.now();

        console.log(`[Perf] 60x60 Wall: ${(end - start).toFixed(2)}ms`);
        expect(path).not.toBeNull();
        // If this takes > 2000ms, it's a freeze risk
        expect(end - start).toBeLessThan(2000);
    });
});
