
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
    const Vector3 = vi.fn((x, y, z) => ({ x: x || 0, y: y || 0, z: z || 0, set: vi.fn(), clone: vi.fn(() => ({ x: x || 0, y: y || 0, z: z || 0 })) }));
    return {
        Scene: vi.fn(() => ({ add: vi.fn(), remove: vi.fn() })),
        Vector3: Vector3,
        Color: vi.fn(() => ({ setHex: vi.fn(), lerp: vi.fn(), setHSL: vi.fn() })),
        Plane: vi.fn(),
        BufferGeometry: vi.fn(() => ({ attributes: { position: { array: [], count: 0 }, color: { array: [], count: 0 } }, setAttribute: vi.fn() })),
        MeshLambertMaterial: vi.fn(),
        PointsMaterial: vi.fn(),
        Mesh: vi.fn(() => ({ position: new Vector3(), rotation: { x: 0 }, add: vi.fn() })),
        Points: vi.fn(() => ({ position: new Vector3() })),
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
                terrain.grid[x][z] = { height: 0, hasBuilding: false };
            }
        }
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should accumulate ghost buildings in entityGrid if not cleared during deserialize', async () => {
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
                saveData.grid[x][z] = {};
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
        // IF BUG EXISTS: entityGrid will have 2 items (Old + New).

        // 4. Deserialize (Simulate Load)
        const deserializePromise = terrain.deserialize(saveData);

        // Advance timers to trigger the setTimeout(0) inside deserialize
        vi.advanceTimersByTime(1000);

        await deserializePromise;

        // Check Buildings List (Should be 1 - Correctly reset)
        expect(terrain.buildings.length).toBe(1);
        const b2 = terrain.buildings[0];
        expect(b2).not.toBe(b1); // Should be a new instance

        // Check Entity Grid
        const entities = terrain.entityGrid[5][5];
        console.log("Entities length in test:", entities.length);
        if (entities.length > 0) {
            console.log("Entity 0 ID:", entities[0].id);
            if (entities.length > 1) console.log("Entity 1 ID:", entities[1].id);
        }

        // BUG EXPECTATION: If not fixed, length might be 2
        // We want to FAIL current behavior if it's broken, or Pass if we assert "ToBe(2)" to prove bug.
        // Let's assert correct behavior: ToBe(1).
        // If the code is buggy, this test will FAIL.

        // To reproduce the bug, I expect it to contain BOTH b1 and b2 if I don't fix it.
        // So validation:
        // expect(entities).toContain(b1); // Ghost
        // expect(entities).toContain(b2); // Real

        // I will write the test to EXPECT CORRECT LOGIC (1 entity). 
        // Failing this test confirms the bug.

        expect(entities.length).toBe(1);
        expect(entities[0]).toBe(b2);

        // Extra check: Old building should NOT be in grid
        expect(entities).not.toContain(b1);
    });
});
