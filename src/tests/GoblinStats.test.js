
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import { Goblin } from '../Goblin.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
    const Vector3 = class {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
    };

    const Object3D = class {
        position = new Vector3();
        rotation = { x: 0, y: 0, z: 0 };
        scale = new Vector3(1, 1, 1);
        add() { }
        remove() { }
        updateMatrix() { }
    };

    return {
        Vector3,
        Group: class extends Object3D { },
        Mesh: class extends Object3D { },
        MeshLambertMaterial: class { },
        BoxGeometry: class { },
        ConeGeometry: class { },
        CylinderGeometry: class { },
        SphereGeometry: class { },
        CanvasTexture: class { },
        Color: class {
            constructor(hex) { }
            lerp() { return this; }
            setHex() { return this; }
            getHSL() { return {}; }
            setHSL() { return this; }
            copy(c) { return this; }
            multiplyScalar() { return this; }
        },
        BufferAttribute: class { constructor(arr, size) { this.array = arr; this.count = arr.length / size; } },
        PlaneGeometry: class {
            attributes = { position: { count: 100, array: new Float32Array(300), getX: () => 0, getY: () => 0, setX: () => { }, setY: () => { } }, color: { array: [], count: 100, needsUpdate: false } };
            setAttribute(name, attr) { this.attributes[name] = attr; }
            getAttribute(name) { return this.attributes[name]; }
            computeVertexNormals() { }
        },
        LineBasicMaterial: class { },
        LineSegments: class extends Object3D { },
        PointsMaterial: class { },
        Points: class extends Object3D { },
        BufferGeometry: class { setAttribute() { } setIndex() { } },
        DoubleSide: 2,
        Object3D,
        Sphere: class { constructor(c, r) { } },
        InstancedMesh: class extends Object3D {
            constructor() { super(); this.instanceMatrix = { setUsage: () => { } }; }
        },
        DynamicDrawUsage: 1
    };
});

describe('Goblin Stats Verification', () => {
    let terrain;

    beforeEach(() => {
        global.window = { game: { gameTotalTime: 0 } };
        const scene = { add: () => { }, remove: () => { } };
        terrain = new Terrain(scene, []);
        terrain.logicalWidth = 80;
        terrain.logicalDepth = 80;
        terrain.grid = Array(80).fill(0).map(() => Array(80).fill({ height: 1 }));
        terrain.getTileHeight = () => 1.0;
        terrain.gridToWorld = (v) => v;
        terrain.registerEntity = () => { };
    });

    it('Normal Goblin should have sufficient lifespan and speed', () => {
        const g = new Goblin({}, terrain, 10, 10, 'normal');

        // Lifespan check (should be > 100s now)
        expect(g.lifespan).toBeGreaterThan(100);
        console.log(`Normal Goblin Lifespan: ${g.lifespan}s`);

        // Speed check (should be 800ms)
        expect(g.moveInterval).toBe(800);
        expect(g.baseMoveDuration).toBe(400);
    });

    it('King Goblin should be long lived', () => {
        const g = new Goblin({}, terrain, 10, 10, 'king');
        expect(g.lifespan).toBeGreaterThan(250); // > 250s
    });
});
