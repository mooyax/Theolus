import { describe, it, expect, vi } from 'vitest';
import { findPath, initGrid, updateCell } from '../workers/pathfindingWorker.js';

describe('Pathfinding Worker Logic', () => {

    const setupGrid = (w, h, obstacles = []) => {
        const data = new Float32Array(w * h).fill(10);
        obstacles.forEach(({ x, z }) => {
            if (x >= 0 && x < w && z >= 0 && z < h) {
                data[z * w + x] = -10;
            }
        });

        const moisture = new Float32Array(w * h).fill(0.5);
        initGrid({ w, h, data: data.buffer, moistureData: moisture.buffer });
    };

    it('should find a simple path', () => {
        setupGrid(10, 10, []);
        const path = findPath(0, 0, 9, 9, 1000, 1);
        expect(path).not.toBeNull();
        expect(path.length).toBeGreaterThan(0);
        expect(path[0]).toEqual({ x: 0, z: 0 });
        expect(path[path.length - 1]).toEqual({ x: 9, z: 9 });
    });

    it('should return null for unreachable path', () => {
        const obstacles = [];
        for (let z = 0; z < 10; z++) {
            obstacles.push({ x: 5, z });
            obstacles.push({ x: 0, z });
        }
        setupGrid(10, 10, obstacles);

        const path = findPath(1, 1, 9, 9, 1000, 1);
        expect(path).toBeNull();
    });

    it('should handle start point in water (should find nearest land)', () => {
        setupGrid(10, 10, [{ x: 0, z: 0 }, { x: 0, z: 1 }, { x: 1, z: 0 }]);
        const path = findPath(0, 0, 9, 9, 1000, 1);
        expect(path).not.toBeNull();
        if (path) {
            expect(path[0]).not.toEqual({ x: 0, z: 0 });
        }
    });

    it('should NOT crash or loop infinitely on complex mazes', () => {
        const w = 20, h = 20;
        const data = new Float32Array(w * h);
        for (let i = 0; i < w * h; i++) {
            data[i] = (Math.random() > 0.7) ? -5 : 10;
        }
        data[0] = 10; data[w * h - 1] = 10;

        const moisture = new Float32Array(w * h).fill(0.5);
        initGrid({ w, h, data: data.buffer, moistureData: moisture.buffer });

        const startT = performance.now();
        const path = findPath(0, 0, w - 1, h - 1, 50000, 1);
        const endT = performance.now();

        expect(endT - startT).toBeLessThan(1000);
    });

});