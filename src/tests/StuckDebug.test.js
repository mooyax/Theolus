
import { describe, it, expect, vi } from 'vitest';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
    }
    return {
        Vector3,
        Scene: class { add() { } remove() { } getObjectByName() { return { add: vi.fn(), remove: vi.fn(), children: [] }; } },
        Color: class { setHex() { return this; } lerp() { return this; } },
        Mesh: class { constructor() { this.position = new Vector3(); this.rotation = { x: 0 }; this.add = () => { }; } },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: { count: 10, array: new Float32Array(30), itemSize: 3, setX: vi.fn(), setY: vi.fn(), setZ: vi.fn(), getX: (i) => 0, getY: (i) => 0 },
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
            setXYZ(i, x, y, z) { this.setX(i, x); this.setY(i, y); this.setZ(i, z); return this; }
            getX(i) { return this.array ? this.array[i * this.itemSize] : 0; }
            getY(i) { return this.array ? this.array[i * this.itemSize + 1] : 0; }
        },
        BufferGeometry: class {
            constructor() { this.attributes = {}; }
            setAttribute(name, attr) { this.attributes[name] = attr; }
            setIndex(indices) { this.index = { array: indices, count: indices.length }; }
        },
        Group: class { add() { } remove() { } },
        InstancedMesh: class { count() { } setMatrixAt() { } setColorAt() { } },
        MeshLambertMaterial: class { },
        LineSegments: class { constructor() { this.position = new Vector3(); } },
        LineBasicMaterial: class { },
        Points: class { constructor() { this.position = new Vector3(); } },
        PointsMaterial: class { },
        DoubleSide: 2,
        Plane: class { clone() { return new this.constructor(); } }
    };
});

global.THREE = THREE;

describe('Unit Stuck Debugging', () => {
    it('should log reason for blockage', () => {
        Unit.initAssets = vi.fn();
        const mockScene = { add: vi.fn(), remove: vi.fn() };
        const terrain = new Terrain(mockScene);
        // Mock init behavior
        terrain.logicalWidth = 100;
        terrain.logicalDepth = 100;
        terrain.grid = Array(100).fill(null).map(() => Array(100).fill(null).map(() => ({ height: 2, hasBuilding: false })));

        // Mock getTileHeight
        terrain.getTileHeight = (x, z) => {
            if (x < 0 || x >= 100 || z < 0 || z >= 100) return 0;
            return terrain.grid[x][z].height;
        };

        // 1. Create a Slope Block
        terrain.grid[10][10].height = 2; // Start
        terrain.grid[11][10].height = 6; // Target (Diff 4 > 2) -> Blocked by Slope

        const unit = new Unit(1, terrain);
        unit.gridX = 10;
        unit.gridZ = 10;

        console.log("--- Testing Slope Block ---");
        const success = unit.canMoveTo(11, 10);
        expect(success).toBe(false);

        // 2. Create a Building Block (Should Pass)
        terrain.grid[20][20].height = 2;
        terrain.grid[21][20].height = 2;
        terrain.grid[21][20].hasBuilding = true;
        terrain.grid[21][20].building = { id: 999, type: 'house' };

        unit.gridX = 20;
        unit.gridZ = 20;

        console.log("--- Testing Building Pass ---");
        const success2 = unit.canMoveTo(21, 20);
        expect(success2).toBe(true);

        // 3. Create a Water Block
        terrain.grid[30][30].height = 0;
        unit.gridX = 29;
        unit.gridZ = 30;
        terrain.grid[29][30].height = 2;

        console.log("--- Testing Water Block ---");
        const success3 = unit.canMoveTo(30, 30);
        expect(success3).toBe(false);
    });
});
