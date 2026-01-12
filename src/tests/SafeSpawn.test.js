
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        Vector3: class {
            constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
            copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
            set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
            add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
            clone() { return new this.constructor(this.x, this.y, this.z); }
        },
        Object3D: class {
            constructor() {
                this.position = { x: 0, y: 0, z: 0, set: (x, y, z) => { this.position.x = x; this.position.y = y; this.position.z = z; } };
                this.rotation = { x: 0, y: 0, z: 0 };
                this.scale = { x: 1, y: 1, z: 1, set: (x, y, z) => { this.scale.x = x; this.scale.y = y; this.scale.z = z; } };
                this.add = vi.fn();
                this.remove = vi.fn();
                this.updateMatrix = vi.fn();
            }
        },
        InstancedMesh: class {
            constructor() {
                this.isObject3D = true;
                this.instanceMatrix = { setUsage: vi.fn() };
                this.updateMatrix = vi.fn();
                this.setMatrixAt = vi.fn();
                this.setColorAt = vi.fn();
                this.count = 0;
                this.castShadow = false;
                this.receiveShadow = false;
                this.frustumCulled = false;
                this.dispose = vi.fn();
                this.removeFromParent = vi.fn();
                this.position = { x: 0, y: 0, z: 0, set: () => { } };
            }
        },
        Scene: class {
            constructor() {
                this.add = vi.fn();
                this.remove = vi.fn();
                this.getObjectByName = vi.fn();
                this.clear = vi.fn();
            }
        },
        Group: class {
            constructor() { this.add = vi.fn(); this.remove = vi.fn(); }
        },
        Mesh: class {
            constructor() {
                this.position = { x: 0, y: 0, z: 0, set: () => { } };
                this.rotation = { x: 0, y: 0, z: 0 };
                this.scale = { x: 1, y: 1, z: 1, set: () => { } };
                this.add = vi.fn();
                this.remove = vi.fn();
            }
        },
        BufferGeometry: class {
            constructor() {
                this.setAttribute = vi.fn();
                this.dispose = vi.fn();
                this.setIndex = vi.fn();
                this.attributes = {};
            }
        },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: {
                        count: 100,
                        getX: vi.fn().mockReturnValue(0),
                        getY: vi.fn().mockReturnValue(0),
                        setX: vi.fn(),
                        setY: vi.fn(),
                        array: new Float32Array(300),
                        needsUpdate: false
                    }
                };
                this.setAttribute = vi.fn((name, attr) => {
                    this.attributes[name] = attr;
                });
                this.dispose = vi.fn();
                this.parameters = { width: 1, height: 1 };
                this.computeVertexNormals = vi.fn();
                this.setIndex = vi.fn();
            }
        },
        BufferAttribute: class {
            constructor(array, itemSize) {
                this.array = array;
                this.itemSize = itemSize;
                this.setXYZ = vi.fn();
                this.needsUpdate = false;
            }
        },
        MeshLambertMaterial: class {
            constructor() { this.dispose = vi.fn(); }
        },
        LineBasicMaterial: class { constructor() { } },
        PointsMaterial: class { constructor() { } },
        LineSegments: class {
            constructor() { this.position = { x: 0, y: 0, z: 0, set: () => { } }; }
        },
        Points: class {
            constructor() { this.position = { x: 0, y: 0, z: 0, set: () => { } }; }
        },
        DoubleSide: 2,
    };
});
global.THREE = THREE;
if (!global.window) global.window = {};

describe('Safe Population Zero', () => {
    let terrain;
    let house;
    let mockScene;

    beforeEach(() => {
        global.window.game = { gameTotalTime: 0, units: [] };
        mockScene = new THREE.Scene();
        terrain = new Terrain(mockScene, []);

        // Mock internal grid for simple test
        terrain.logicalWidth = 200;
        terrain.logicalDepth = 200;
        terrain.grid = Array(200).fill(0).map(() => Array(200).fill({}).map(() => ({ height: 0, hasBuilding: false, building: null, type: 'grass', moisture: 0.5 })));
        terrain.updateColors = vi.fn();

        house = {
            userData: {
                type: 'house',
                population: 10,
                gridX: 10,
                gridZ: 10
            }
        };
        // Add to Mock Grid
        terrain.grid[10][10].hasBuilding = true;
        terrain.grid[10][10].building = house;
        terrain.buildings = [house];
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should NOT destroy house when spawning unit resets population to 0', () => {
        const spawnCb = vi.fn().mockReturnValue(true);
        vi.spyOn(Math, 'random').mockReturnValue(0.1); // Always < 0.2

        terrain.frameCount = 19; // Will increment to 20 -> 0.

        terrain.updatePopulation(1.0, false, 0, spawnCb);

        expect(spawnCb).toHaveBeenCalled();
        expect(house.userData.population).toBe(0);
        expect(terrain.buildings).toContain(house);
    });
});
