
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import { Entity } from '../Entity.js';
import { GoblinManager } from '../GoblinManager.js';
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

describe('Goblin Fixes Verification', () => {

    let terrain;

    beforeEach(() => {
        // Mock window
        global.window = { game: { gameTotalTime: 0 } };
        // Mock Scene
        const scene = { add: () => { }, remove: () => { } };
        terrain = new Terrain(scene, []);
        terrain.logicalWidth = 80;
        terrain.logicalDepth = 80;
        // Mock EntityGrid
        terrain.entityGrid = Array(80).fill(0).map(() => Array(80).fill([]));
        terrain.grid = Array(80).fill(0).map(() => Array(80).fill({ height: 0, hasBuilding: false }));
    });

    it('Entity.getDistance should handle wrapping', () => {
        const e = new Entity({}, terrain, 2, 2, 'test');

        // Target far away in raw coords, but close via wrap
        const dist = e.getDistance(78, 2);

        // 2 -> 78 via wrap is 2->1->0->79->78. Distance 4.
        expect(dist).toBe(4);

        // Standard Euclidean
        expect(e.getDistance(6, 2)).toBe(4);
    });

    it('Terrain.findBestTarget should find wrapped targets', () => {
        // Mock Entity at 78, 2
        const target = new Entity({}, terrain, 78, 2, 'unit');
        terrain.registerEntity(target, 78, 2, 'unit');

        // Searcher at 2, 2
        // If radius is 5, it should find it.
        // Raw distance = 76. Wrapped distance = 4.

        const best = terrain.findBestTarget('unit', 2, 2, 5.0, (e, d) => d);

        expect(best).toBe(target);
    });

    it('Terrain.findBestTarget should handle non-wrapping case correctly (sanity)', () => {
        const target = new Entity({}, terrain, 5, 2, 'unit');
        terrain.registerEntity(target, 5, 2, 'unit');

        const best = terrain.findBestTarget('unit', 2, 2, 5.0, (e, d) => d);
        expect(best).toBe(target);
    });

    it('GoblinManager difficulty scaling increases stronger goblin probability', () => {
        const gm = new GoblinManager({ add: () => { } }, terrain, {});
        gm.goblins = [];

        // Mock spawnGoblin internal logic by spying or just checking distribution?
        // We can't easily spy on internal method call since it's same class instance.
        // We will run spawnGoblin many times and check distribution.

        const samples = 1000;
        let kings = 0;
        let shamans = 0;
        let hobs = 0;

        // Level 1
        for (let i = 0; i < samples; i++) {
            gm.spawnGoblin(10, 10, 'clan', null, 1);
        }
        kings = gm.goblins.filter(g => g.type === 'king').length;
        shamans = gm.goblins.filter(g => g.type === 'shaman').length;
        hobs = gm.goblins.filter(g => g.type === 'hobgoblin').length;

        console.log(`Lvl 1 - King: ${kings}, Shaman: ${shamans}, Hob: ${hobs}`);
        // Expect low numbers
        // King ~1% (10), Shaman ~4.5% (45), Hob ~9% (90)
        expect(kings).toBeLessThan(30);

        gm.goblins = [];

        // Level 20
        for (let i = 0; i < samples; i++) {
            gm.spawnGoblin(10, 10, 'clan', null, 20);
        }
        kings = gm.goblins.filter(g => g.type === 'king').length;
        shamans = gm.goblins.filter(g => g.type === 'shaman').length;
        hobs = gm.goblins.filter(g => g.type === 'hobgoblin').length;

        console.log(`Lvl 20 - King: ${kings}, Shaman: ${shamans}, Hob: ${hobs}`);
        // Expect higher numbers
        // King 1% + 19*0.25% = 1+4.75 = ~5.75% (~57)
        // Shaman 4.5% + 19*0.5% = 4.5+9.5 = ~14% (~140)
        // Hob 9% + 19*1% = 28% (~280)

        expect(kings).toBeGreaterThan(30);
        expect(shamans).toBeGreaterThan(80);
        expect(hobs).toBeGreaterThan(150);
    });

});
