
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';
import { MockGame, MockTerrain } from './TestHelper.js';

// Mock THREE
vi.mock('three', () => {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
        length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
        distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2); }
    }
    return {
        Vector3,
        Scene: class { add() { } remove() { } getObjectByName() { return { add: vi.fn(), remove: vi.fn(), children: [] }; } },
        Color: class { setHex() { return this; } },
        Mesh: class { constructor() { this.position = new Vector3(); this.rotation = { x: 0 }; this.add = () => { }; } },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: { count: 10, array: new Float32Array(30), itemSize: 3, setX: vi.fn(), setY: vi.fn(), setZ: vi.fn() },
                    color: { array: new Float32Array(30), itemSize: 3, setX: vi.fn(), setY: vi.fn(), setZ: vi.fn() }
                };
            }
            setAttribute(name, attr) { this.attributes[name] = attr; }
            getAttribute(name) { return this.attributes[name]; }
            computeVertexNormals() { }
            dispose() { }
        },
        BufferAttribute: class {
            constructor(array, itemSize) { this.array = array; this.itemSize = itemSize; this.count = array.length / itemSize; }
            setX(i, x) { if (this.array) this.array[i * this.itemSize] = x; return this; }
            setY(i, y) { if (this.array) this.array[i * this.itemSize + 1] = y; return this; }
            setZ(i, z) { if (this.array) this.array[i * this.itemSize + 2] = z; return this; }
        },
        Group: class { add() { } remove() { } },
        InstancedMesh: class { count() { } setMatrixAt() { } setColorAt() { } },
        MeshLambertMaterial: class { },
        LineSegments: class { constructor() { this.position = new Vector3(); } },
        LineBasicMaterial: class { },
        Points: class { constructor() { this.position = new Vector3(); } },
        PointsMaterial: class { },
        DoubleSide: 2
    };
});

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Unit Targeting Priority', () => {
    let unit;
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);

        // Ensure squads map exists
        if (!mockGame.squads) mockGame.squads = new Map();
        mockGame.frameCount = 0;

        global.window.game = mockGame;

        unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        unit.gridX = 0;
        unit.gridZ = 0;
        unit.getDistance = (x, z) => Math.sqrt(x * x + z * z);
    });

    // Helper to run logic through Time Slicing
    const runUpdateLoop = (testUnit, goblins) => {
        for (let i = 0; i < 25; i++) {
            mockGame.frameCount = i;
            testUnit.updateLogic(1000 + i, 0.1, false, goblins, [], []);
            if (testUnit.targetGoblin || testUnit.targetBuilding) break;
        }
    };

    it('should prioritize Goblin if it is much closer than Building', () => {
        const goblin = { id: 'g1', gridX: 10, gridZ: 0, isDead: false, takeDamage: vi.fn(), takeDamageFrom: vi.fn() };
        const hut = { userData: { type: 'goblin_hut', gridX: 30, gridZ: 0, hp: 100 }, gridX: 30, gridZ: 0 };

        mockTerrain.buildings = [hut];
        const goblins = [goblin];
        mockGame.goblinManager.goblins = goblins; // Register globally for findBestTarget

        runUpdateLoop(unit, goblins);

        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.targetBuilding).toBeNull();
    });

    it('should prioritize Building if distances are very close (Siege Mode)', () => {
        const goblins = [];
        const goblin = { id: 'g1', gridX: 7, gridZ: 0, isDead: false };
        goblins.push(goblin);

        const hut = {
            userData: { type: 'goblin_hut', gridX: 7, gridZ: 0, hp: 100 },
            gridX: 7,
            gridZ: 0,
            id: 'hut_1'
        };
        mockTerrain.buildings.push(hut);

        const mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
        const testUnit = new Unit(mockScene, mockTerrain, 0, 0, 'knight');
        testUnit.gridX = 0;
        testUnit.gridZ = 0;
        testUnit.getDistance = (x, z) => Math.sqrt(x * x + z * z);

        runUpdateLoop(testUnit, goblins);

        expect(testUnit.targetBuilding).toBe(hut);
        expect(testUnit.targetGoblin).toBeNull();
    });

    it('should NOT auto-target distant Huts (Workers are passive)', () => {
        const hut = {
            userData: { type: 'goblin_hut', gridX: 10, gridZ: 10, hp: 100 },
            gridX: 10,
            gridZ: 10,
            id: 'hut_remote'
        };
        mockTerrain.buildings.push(hut);

        const testUnit = new Unit({ add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) }, mockTerrain, 0, 0, 'worker');

        runUpdateLoop(testUnit, []);

        expect(testUnit.targetBuilding).toBeFalsy();
    });

    it('should auto-target CLOSE Huts for self-defense (Workers)', () => {
        const hut = {
            userData: { type: 'goblin_hut', gridX: 2, gridZ: 0, hp: 100 },
            gridX: 2,
            gridZ: 0,
            id: 'hut_near'
        };
        mockTerrain.buildings.push(hut);

        const testUnit = new Unit({ add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) }, mockTerrain, 0, 0, 'worker');

        // Note: Workers might skip scan if BUSY (targetRequest). Here they are idle.
        runUpdateLoop(testUnit, []);

        expect(testUnit.targetBuilding).toBeTruthy();
        expect(testUnit.targetBuilding.id).toBe('hut_near');
    });
});
