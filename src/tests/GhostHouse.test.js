
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
    }
    return {
        Scene: class { add() { } remove() { } },
        Vector3: Vector3,
        Color: class { setHex() { return this; } lerp() { return this; } setHSL() { return this; } },
        DoubleSide: 2,
        Plane: class { clone() { return new this.constructor(); } },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: { count: 10, array: new Float32Array(30), itemSize: 3, setX: vi.fn(), setY: vi.fn(), setZ: vi.fn(), getX: (i) => 0, getY: (i) => 0 },
                    color: { array: new Float32Array(30), itemSize: 3, setX: vi.fn(), setY: vi.fn(), setZ: vi.fn() },
                    normal: { array: new Float32Array(30), itemSize: 3, setXYZ: vi.fn() },
                    uv: { array: new Float32Array(20), itemSize: 2 }
                };
            }
            setAttribute(name, attr) { this.attributes[name] = attr; }
            getAttribute(name) { return this.attributes[name]; }
            computeVertexNormals() { }
            dispose() { }
            translate() { }
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
            constructor() { this.attributes = { position: { array: [], count: 0 }, color: { array: [], count: 0 } }; }
            setIndex(indices) { this.index = indices; }
            setAttribute() { }
            dispose() { }
        },
        LineSegments: class { constructor() { this.position = new Vector3(); } dispose() { } },
        MeshLambertMaterial: class { dispose() { } },
        MeshStandardMaterial: class { dispose() { } }, // ADDED
        LineBasicMaterial: class { dispose() { } },
        PointsMaterial: class { dispose() { } },
        Group: class { constructor() { this.children = []; this.position = new Vector3(); } add() { } remove() { } }, // ADDED
        BoxGeometry: class { constructor() { } translate() { } }, // ADDED
        ConeGeometry: class { constructor() { } translate() { } }, // ADDED
        CylinderGeometry: class { constructor() { } translate() { } }, // ADDED
        Mesh: class {
            constructor() { this.position = new Vector3(); this.rotation = { x: 0 }; this.scale = new Vector3(1, 1, 1); this.children = []; }
            add() { }
            remove() { }
        },
        Points: class { constructor() { this.position = new Vector3(); } },
        MathUtils: { lerp: (a, b, t) => a + (b - a) * t }
    };
});

// Mock Terrain (Partial)
import { Terrain } from '../Terrain';

describe('Terrain Ghost House Test', () => {
    let terrain;
    let scene;

    beforeEach(() => {
        vi.useFakeTimers();
        scene = new THREE.Scene();
        terrain = new Terrain(scene, []);
        // Manually init entityGrid if needed (Terrain constructor does it)
        terrain.logicalWidth = 10;
        terrain.logicalDepth = 10;
        terrain.width = 30;
        terrain.depth = 30;
        terrain.initEntityGrid();
        terrain.grid = [];
        for (let x = 0; x < 10; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 10; z++) {
                terrain.grid[x][z] = { height: 2, hasBuilding: false };
            }
        }
        terrain.updateMesh = vi.fn();
        terrain.updateColors = vi.fn();
        terrain.calculateRegions = vi.fn();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should NOT accumulate ghost buildings (cleared during deserialize)', async () => {
        // 1. Add checks for initial state
        expect(terrain.buildings.length).toBe(0);

        // 2. Add a building manually
        const b1 = terrain.addBuilding('house', 5, 5);

        expect(terrain.buildings.length).toBe(1);

        expect(terrain.entityGrid[5][5].length).toBe(1);
        expect(terrain.entityGrid[5][5][0]).toBe(b1);

        // 3. Serialize (mock data)
        const saveData = {
            logicalWidth: 10,
            logicalDepth: 10,
            grid: []
        };
        // Populate save data with a house at 5,5
        for (let x = 0; x < 10; x++) {
            saveData.grid[x] = [];
            for (let z = 0; z < 10; z++) {
                saveData.grid[x][z] = { height: 2 };
                if (x === 5 && z === 5) {
                    saveData.grid[x][z].hasBuilding = true;
                    saveData.grid[x][z].b = { t: 'house', x: 5, z: 5, p: 0 };
                    // Mock helper flag to force restore
                    saveData.grid[x][z].hb = 1;
                }
            }
        }

        // 4. Deserialize (Simulate Load)
        // This should clear old building and add new one.
        try {
            const deserializePromise = terrain.deserialize(saveData);
            await vi.runAllTimersAsync();
            await deserializePromise;
        } catch (e) {
            // console.error("Deserialize FAILED:", e); // Removed
        }

        // Check Buildings List (Should be 1 - Correctly reset)
        expect(terrain.buildings.length).toBe(1);
        const b2 = terrain.buildings[0];
        expect(b2).not.toBe(b1); // Should be a new instance

        // Check Entity Grid
        const entities = terrain.entityGrid[5][5];
        console.log(`[Test] Entities at 5,5: ${entities ? entities.length : 'NULL'}`);
        if (entities) entities.forEach((e, i) => console.log(` - Ent[${i}] ID:${e.id}`));

        // ASSERT CORRECT BEHAVIOR (No Ghost)
        expect(entities.length).toBe(1);
        expect(entities[0]).toBe(b2);

        // Extra check: Old building should NOT be in grid
        expect(entities).not.toContain(b1);
    });
});
