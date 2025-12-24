
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import { Entity } from '../Entity.js';
import { GoblinManager } from '../GoblinManager.js';
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

describe('Goblin Mobilization Verification', () => {

    let terrain;
    let gm;

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
        terrain.grid = Array(80).fill(0).map(() => Array(80).fill({ height: 1, hasBuilding: false }));

        gm = new GoblinManager(scene, terrain, {});
        // Mock getTileHeight
        terrain.getTileHeight = () => 1.0;
        terrain.gridToWorld = (v) => v;
        terrain.isValidGrid = () => true;
    });

    it('triggerWave should mobilize idle goblins', () => {
        // Setup Clan
        const clanId = 'test_clan';
        gm.clans = {
            [clanId]: {
                id: clanId,
                active: true,
                waveLevel: 1,
                waveTimer: 0,
                raidTarget: { x: 50, z: 50 }
            }
        };
        // Mock Cave
        gm.caves = [{ gridX: 10, gridZ: 10, clanId: clanId, hasBuilding: true }];
        // Need to ensure terrain.buildings has cave object for validity check
        terrain.buildings = [gm.caves[0]];

        // Add Idle Goblins of this clan
        const g1 = new Goblin(gm.scene, terrain, 10, 10, 'normal', clanId);
        g1.state = 'idle';
        gm.goblins.push(g1);

        const g2 = new Goblin(gm.scene, terrain, 12, 12, 'normal', clanId);
        g2.state = 'idle';
        gm.goblins.push(g2);

        // Add Goblin of DIFFERENT clan
        const gOther = new Goblin(gm.scene, terrain, 15, 15, 'normal', 'other_clan');
        gOther.state = 'idle';
        gm.goblins.push(gOther);

        // Trigger Wave
        gm.triggerWave(gm.clans[clanId]);

        // Check if Goblins were mobilized
        expect(g1.state).toBe('raiding');
        expect(g1.raidGoal.x).toBeCloseTo(50, -1);
        expect(g1.raidGoal.z).toBeCloseTo(50, -1);

        expect(g2.state).toBe('raiding');

        // Other clan should NOT be mobilized
        expect(gOther.state).toBe('idle');
    });

    it('mobilizeClan should rely on getClanRaidTarget fallback', () => {
        const clanId = 'test_clan_fallback';
        gm.clans = {
            [clanId]: {
                id: clanId,
                active: true,
                waveLevel: 1,
                waveTimer: 0,
                raidTarget: { x: 60, z: 60 }
            }
        };

        const g1 = new Goblin(gm.scene, terrain, 5, 5, 'normal', clanId);
        g1.state = 'idle';
        gm.goblins.push(g1);

        gm.mobilizeClan(gm.clans[clanId]);

        expect(g1.state).toBe('raiding');
        expect(g1.raidGoal.x).toBeCloseTo(60, -1); // Approx check with randomization
    });

});
