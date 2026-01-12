import { describe, it, expect, vi, beforeEach } from 'vitest';

// 1. Mock THREE (High Quality)
vi.mock('three', () => {
    const Vector3 = class {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
    };
    const Object3D = class {
        constructor() {
            this.position = new Vector3();
            this.rotation = { x: 0, y: 0, z: 0 };
            this.scale = new Vector3(1, 1, 1);
            this.children = [];
        }
        add(obj) { this.children.push(obj); }
        remove() { }
        updateMatrix() { }
    };
    return {
        Vector3,
        Object3D,
        Group: class extends Object3D { },
        Mesh: class extends Object3D {
            constructor() {
                super();
                this.geometry = { dispose: vi.fn() };
                this.material = { dispose: vi.fn() };
            }
        },
        Color: class { constructor() { } setHex() { return this; } },
        Matrix4: class { constructor() { } makeRotationX() { return this; } makeRotationY() { return this; } makeRotationZ() { return this; } multiply() { return this; } setPosition() { return this; } },
        Quaternion: class { constructor() { } setFromEuler() { return this; } },
        Euler: class { constructor() { } },
        BoxGeometry: class { dispose() { } },
        ConeGeometry: class { dispose() { } },
        CylinderGeometry: class { dispose() { } },
        SphereGeometry: class { dispose() { } },
        MeshLambertMaterial: class { dispose() { } },
        DoubleSide: 2,
        TextureLoader: class { load() { return {}; } },
        CanvasTexture: class { },
        InstancedMesh: class extends Object3D { constructor() { super(); this.instanceMatrix = { setUsage: () => { } }; } },
        DynamicDrawUsage: 1,
        Points: class extends Object3D { },
        PointsMaterial: class { },
        Sphere: class { constructor() { } containsPoint() { return false; } }
    };
});

// 2. Mock Goblin
vi.mock('../Goblin.js', () => {
    return {
        Goblin: class {
            constructor() {
                // Simulate the complex mesh structure expected by managers if any
                this.mesh = {
                    position: { y: 0 },
                    torsoNormal: { rotation: { set: vi.fn() } },
                    headGroup: { rotation: { set: vi.fn() } }
                };
            }
            static initAssets() { }
            static assets = {
                materials: { head: {}, body: {}, limb: {} },
                geometries: { torsoNormal: {}, head: {}, limb: {} }
            };
        }
    };
});

import * as THREE from 'three';
global.THREE = THREE;
import { GoblinManager } from '../GoblinManager.js';

describe('GoblinManager Cave Persistence', () => {
    let mockScene, mockTerrain, manager;

    beforeEach(() => {
        // Mock DOM
        global.document = {
            createElement: () => ({
                getContext: () => ({
                    fillStyle: '', fillRect: () => { },
                    drawImage: () => { }
                }),
                width: 0, height: 0
            })
        };

        mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] })
        };

        mockTerrain = {
            logicalWidth: 20,
            logicalDepth: 20,
            grid: [],
            getTileHeight: vi.fn((x, z) => 5.0)
        };

        for (let x = 0; x < 20; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                mockTerrain.grid[x][z] = { height: 5.0 };
            }
        }

        vi.spyOn(GoblinManager.prototype, 'generateCaves').mockImplementation(() => { });
        manager = new GoblinManager(mockScene, mockTerrain, {}, []);
        manager.caves = [];
        manager.caveGroup = new THREE.Group();
    });

    it('should update cave Y position when terrain height changes', () => {
        const cave = {
            mesh: { position: { x: 0, y: 5.0, z: 0 }, updateMatrix: vi.fn() },
            gridX: 10,
            gridZ: 10,
            originalHeight: 5.0
        };
        manager.caves.push(cave);

        mockTerrain.getTileHeight.mockReturnValue(8.0);
        manager.update(0, 0.1, false, []);

        expect(cave.mesh.position.y).toBe(8.0);
        expect(cave.originalHeight).toBe(8.0);
    });

    it('should destroy cave if submerged (height <= 0)', () => {
        const caveMesh = new THREE.Mesh();
        const cave = { mesh: caveMesh, gridX: 10, gridZ: 10, originalHeight: 5.0 };
        manager.caves.push(cave);

        mockTerrain.getTileHeight.mockReturnValue(-1.0);
        manager.update(0, 0.1, false, []);

        expect(mockScene.remove).toHaveBeenCalled();
        expect(manager.caves.length).toBe(0);
    });
});
