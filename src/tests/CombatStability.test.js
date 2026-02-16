
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mocks MUST be hoisted
// Mocks MUST be hoisted
vi.mock('three', () => {
    class MockGeometry {
        translate() { }
        rotateX() { }
        rotateY() { }
        rotateZ() { }
        dispose() { }
    }
    return {
        Vector3: class {
            constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
            clone() { return new this.constructor(this.x, this.y, this.z); }
            copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
            set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
            add() { return this; }
            sub() { return this; }
            length() { return 0; }
            normalize() { return this; }
            multiplyScalar() { return this; }
            distanceTo() { return 0; } // Fallback
        },
        Group: class {
            constructor() { this.children = []; this.position = { set: () => { }, copy: () => { } }; }
            add() { }
            remove() { }
        },
        Mesh: class { constructor() { this.position = { set: () => { }, copy: () => { } }; this.rotation = {}; } },
        BoxGeometry: class extends MockGeometry { },
        SphereGeometry: class extends MockGeometry { },
        MeshLambertMaterial: class { },
        MeshStandardMaterial: class { },
        CanvasTexture: class { },
        ConeGeometry: class extends MockGeometry { },
        CylinderGeometry: class extends MockGeometry { },
        PlaneGeometry: class extends MockGeometry { }
    };
});

// vi.mock('../config/GameConfig.json'); // Removed to use real file

import { Unit } from '../Unit.js'; // Adjust path if needed
import { Goblin } from '../Goblin.js';
import { Job, Combat, Wander } from '../ai/states/UnitStates.js';

// Mocks
class MockTerrain {
    constructor() {
        this.grid = [];
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        for (let x = 0; x < 100; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                this.grid[x][z] = { regionId: 1, height: 1 };
            }
        }
        this.buildings = [];
    }
    getTileHeight(x, z) { return 1; }
    gridToWorld(v) { return v; } // Mock gridToWorld
    getInterpolatedHeight() { return 1; }
    getVisualOffset() { return { x: 0, y: 0 }; }
    modifyMoisture() { }
    registerEntity() { }
    unregisterEntity() { }
    getRegion(x, z) {
        if (this.grid[x] && this.grid[x][z]) return this.grid[x][z].regionId;
        return 0; // Default to 0 (Water) if out of bounds
    }
    // Mock findBestTarget for spatial search
    findBestTarget(type, x, z, range, scoreFn, candidates) {
        // console.error(`[TEST MOCK] findBestTarget called for ${type} at ${x},${z}`);
        let best = null;
        let bestScore = Infinity;
        if (!candidates) candidates = [];

        for (const c of candidates) {
            const dist = Math.sqrt((c.gridX - x) ** 2 + (c.gridZ - z) ** 2);
            // Ensure grid access in lambda is safe
            const score = scoreFn(c, dist);
            // console.error(`[TEST MOCK] Candidate ${c.id} Score: ${score}`);
            if (score < bestScore) {
                bestScore = score;
                best = c;
            }
        }
        return best;
    }
}

describe('Combat Stability Tests', () => {
    let unit, terrain, goblin;

    beforeEach(() => {
        try {
            console.error("DEBUG: beforeEach start");
            terrain = new MockTerrain();
            unit = new Unit(null, terrain, 10, 10, 'soldier'); // Generic
            unit.id = 1;
            console.error("DEBUG: Unit created");
            goblin = new Goblin(null, terrain, 12, 10); // Close
            console.error("DEBUG: Goblin created");
            goblin.id = 100;
            unit.ignoredTargets = new Map();
        } catch (e) {
            console.error("CRASH in beforeEach:", e);
            throw e;
        }
    });

    it('Should attack goblin in SAME region within 8 tiles', () => {
        // Setup Same Region
        terrain.grid[10][10].regionId = 1;
        terrain.grid[12][10].regionId = 1;

        console.error("--- TEST CASE 1 START ---");
        // Run detection
        unit.checkSelfDefense([goblin], true);
        console.error("--- TEST CASE 1 END ---");

        // Verify result
        expect(unit.targetGoblin).toBe(goblin);
    });

    it('Should IGNORE goblin in DIFFERENT region (Unreachable)', () => {
        // Setup Different Region
        terrain.grid[10][10].regionId = 1;
        terrain.grid[12][10].regionId = 2; // Separate Region

        // Run detection
        unit.checkSelfDefense([goblin], true);

        // Verify result
        expect(unit.targetGoblin).toBeNull();
    });

    it('Should IGNORE goblin OUTSIDE general range (>8) for self defense check', () => {
        // Setup Far Goblin (Dist 30)
        goblin.gridX = 40; // 30 tiles away
        terrain.grid[10][10].regionId = 1;
        terrain.grid[30][10].regionId = 1;

        // Run detection
        unit.checkSelfDefense([goblin], true);

        // Verify result
        expect(unit.targetGoblin).toBeNull();
    });

    it('Should PRIORITIZE goblin closer than 8 tiles', () => {
        const farGoblin = new Goblin(null, terrain, 10, 15); // Dist 5
        farGoblin.id = 200;

        const closeGoblin = new Goblin(null, terrain, 11, 10); // Dist 1
        closeGoblin.id = 201;

        // Run detection
        unit.checkSelfDefense([farGoblin, closeGoblin], true);

        expect(unit.targetGoblin).toBe(closeGoblin);
    });

    it('Should NOT attack across Water (Region 0)', () => {
        // Unit on Land (1), Goblin on Water (0) -> Ignored?
        // Or Unit on Land (1), Goblin on Island (2) across Water?

        // Case 1: Land vs Land (Diff ID) -> Ignored (Tested above)

        // Case 2: Land vs Water
        terrain.grid[10][10].regionId = 1;
        terrain.grid[12][10].regionId = 0; // Water

        unit.checkSelfDefense([goblin], true);
        expect(unit.targetGoblin).toBeNull();
    });
});
