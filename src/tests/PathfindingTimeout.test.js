import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
    return {
        Scene: class {
            add() { }
            remove() { }
        },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: { count: 100, getX: () => 0, getY: () => 0, setX: () => { }, setY: () => { } },
                    color: { count: 100, setXYZ: () => { } }
                };
            }
            setAttribute() { }
            getAttribute(name) { return this.attributes[name] || this.attributes.position; }
            dispose() { }
        },
        BufferAttribute: class { },
        Mesh: class {
            constructor() {
                this.material = { dispose: () => { } };
                this.geometry = { dispose: () => { } };
                this.rotation = { x: 0, y: 0, z: 0 };
                this.position = { set: () => { }, x: 0, y: 0, z: 0 };
            }
            add() { }
            remove() { }
        },
        Plane: class { },
        Float32Array: Float32Array,
        MeshLambertMaterial: class { dispose() { } },
        MeshStandardMaterial: class { dispose() { } },
        LineBasicMaterial: class { dispose() { } },
        PointsMaterial: class { dispose() { } },
        Color: class {
            set() { }
            lerp() { return this; }
            getHSL(hsl) { hsl.h = 0; hsl.s = 0; hsl.l = 0.5; return hsl; }
            setHSL() { return this; }
        },
        BufferGeometry: class {
            setAttribute() { }
            getAttribute() { return { count: 100 }; }
            setIndex() { }
            dispose() { }
        },
        LineSegments: class {
            constructor() {
                this.material = { dispose: () => { } };
                this.geometry = { dispose: () => { } };
                this.position = { set: () => { }, x: 0, y: 0, z: 0 };
                this.rotation = { x: 0, y: 0, z: 0 };
            }
            add() { }
            remove() { }
        },
        Points: class {
            constructor() {
                this.position = { set: () => { }, x: 0, y: 0, z: 0 };
            }
            add() { }
            remove() { }
        },
        DoubleSide: 2,
        Vector3: class {
            constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
            set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
            copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
            add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        },
        TextureLoader: class { load() { return {}; } }
    };
});

describe('Terrain Pathfinding Timeout', () => {
    let terrain;
    let mockWorkerInstance;

    beforeEach(() => {
        // Mock Worker globally as a class
        global.Worker = class {
            constructor() {
                this.postMessage = vi.fn();
                this.terminate = vi.fn();
                this.onerror = null;
                this.onmessage = null;
                mockWorkerInstance = this;
            }
        };

        terrain = new Terrain(new THREE.Scene());

        // Use the instance created by Terrain
        terrain.worker = mockWorkerInstance;

        terrain.workerRequests = new Map();
        terrain.requestIdCounter = 0;

        // Mock getTileHeight to return valid land
        terrain.getTileHeight = () => 5;
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should timeout if worker does not respond within 5000ms', async () => {
        vi.useFakeTimers();

        const promise = terrain.findPathAsync(0, 0, 10, 10);

        // Fast-forward time
        vi.advanceTimersByTime(5001);

        // Expect promise to reject
        await expect(promise).rejects.toThrow("Pathfinding Timeout");

        // Expect request to be cleaned up
        expect(terrain.workerRequests.size).toBe(0);
    });

    it('should resolve if worker responds in time', async () => {
        vi.useFakeTimers();

        const promise = terrain.findPathAsync(0, 0, 10, 10);

        const reqId = 1; // First request

        // Simulate Worker Response
        terrain.worker.onmessage({
            data: {
                type: 'PATH_RESULT',
                id: reqId,
                payload: [{ x: 0, z: 0 }, { x: 10, z: 10 }]
            }
        });

        // Fast-forward a bit (less than timeout)
        vi.advanceTimersByTime(100);

        const path = await promise;
        expect(path).toHaveLength(2);
        expect(terrain.workerRequests.size).toBe(0);
    });
});
