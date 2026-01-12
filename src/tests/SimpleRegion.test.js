
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Terrain } from '../Terrain';

// Minimal Mock
vi.mock('three', () => {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
    }
    return {
        Vector3,
        Scene: class { add() { } remove() { } },
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
        DoubleSide: 2
    };
});

describe('Simple Region Connectivity', () => {
    let terrain;
    const size = 10; // Small grid for debugging

    beforeEach(() => {
        // Mock Scene
        const mockScene = { add: () => { }, remove: () => { } };
        terrain = new Terrain(mockScene);
        terrain.logicalWidth = size;
        terrain.logicalDepth = size;

        // Mock deps
        terrain.updateMesh = () => { };
        terrain.updateColors = () => { };
        terrain.checkBuildingIntegrity = () => { };

        // Init Grid
        terrain.grid = [];
        for (let x = 0; x < size; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < size; z++) {
                terrain.grid[x][z] = {
                    height: 0,
                    regionId: 0,
                    moisture: 0,
                    hasBuilding: false
                };
            }
        }
    });

    it('should identify a single island', () => {
        // (5,5) is Land
        terrain.grid[5][5].height = 5;

        console.log("Running calculateRegions...");
        terrain.calculateRegions();
        console.log("Done.");

        const r = terrain.grid[5][5].regionId;
        console.log(`Region ID at 5,5: ${r}`);

        expect(r).toBeGreaterThan(0);
    });

    it('should split two islands', () => {
        terrain.grid[2][2].height = 5;
        terrain.grid[8][8].height = 5;

        terrain.calculateRegions();

        const r1 = terrain.grid[2][2].regionId;
        const r2 = terrain.grid[8][8].regionId;

        expect(r1).toBeGreaterThan(0);
        expect(r2).toBeGreaterThan(0);
        expect(r1).not.toBe(r2);
    });
});
