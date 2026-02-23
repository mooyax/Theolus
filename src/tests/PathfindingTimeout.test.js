
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

describe('Terrain Pathfinding Timeout', () => {
    let terrain;
    let mockWorkerInstance;

    beforeEach(() => {
        mockWorkerInstance = {
            postMessage: vi.fn(),
            onmessage: null,
            terminate: vi.fn(),
            onerror: null
        };

        // Use a regular function instead of an arrow function to act as a constructor
        global.Worker = vi.fn().mockImplementation(function () {
            return mockWorkerInstance;
        });

        terrain = new Terrain(new THREE.Scene());
        terrain.getTileHeight = () => 5;
    });

    afterEach(() => {
        vi.useRealTimers();
        delete global.Worker;
    });

    it('should timeout if worker does not respond within 5000ms', async () => {
        vi.useFakeTimers();
        const promise = terrain.findPathAsync(0, 0, 10, 10);
        vi.advanceTimersByTime(5001);
        await expect(promise).rejects.toThrow("Pathfinding Timeout");
        expect(terrain.workerRequests.size).toBe(0);
    });

    it('should resolve if worker responds in time', async () => {
        vi.useFakeTimers();
        const promise = terrain.findPathAsync(0, 0, 10, 10);

        expect(mockWorkerInstance.onmessage).toBeTypeOf('function');

        mockWorkerInstance.onmessage({
            data: {
                type: 'PATH_RESULT',
                id: 1,
                payload: [{ x: 0, z: 0 }, { x: 10, z: 10 }]
            }
        });

        vi.advanceTimersByTime(100);
        const path = await promise;
        expect(path).toHaveLength(2);
        expect(terrain.workerRequests.size).toBe(0);
    });
});