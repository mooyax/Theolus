import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit';
import { Goblin } from '../Goblin';
import { Terrain } from '../Terrain';
import { GoblinManager } from '../GoblinManager';
import * as THREE from 'three';

// Mocks
const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    traverse: vi.fn()
};

// Mock BuildingRenderer to avoid THREE.js texture issues in test env
class MockBuildingRenderer {
    initAssets() { }
    initInstancedMeshes() { }
    update() { }
}

describe('Terrain Movement and Logic Tests', () => {
    let terrain;
    let unit;
    let goblin;

    beforeEach(() => {
        // Mock window
        global.window = {
            game: {
                gameTotalTime: 0,
                totalPopulation: 0,
                resources: { grain: 100, meat: 100, fish: 100 },
                goblinManager: { increasePlunder: vi.fn() },
                units: []
            }
        };

        // Setup simple terrain
        terrain = new Terrain(mockScene, []);
        terrain.logicalWidth = 40;
        terrain.logicalDepth = 40;
        // Mock grid
        terrain.grid = [];
        for (let x = 0; x < 40; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                terrain.grid[x][z] = { height: 0, type: 'grass', hasBuilding: false };
            }
        }
        // Mock getTileHeight to look at grid
        terrain.getTileHeight = (x, z) => {
            if (terrain.grid[x] && terrain.grid[x][z]) return terrain.grid[x][z].height;
            return 0;
        };
        // Mock addBuilding
        terrain.addBuilding = vi.fn((type, x, z) => {
            terrain.grid[x][z].hasBuilding = true;
            const b = { type, userData: { type, gridX: x, gridZ: z, population: 0 } };
            terrain.buildings.push(b);
            return b;
        });
        // Mock Entity Grid
        terrain.entityGrid = [];
        for (let x = 0; x < 40; x++) {
            terrain.entityGrid[x] = [];
            for (let z = 0; z < 40; z++) {
                terrain.entityGrid[x][z] = [];
            }
        }

        // Mock Unit Asset Creation which uses Canvas/DOM
        Unit.createFaceTexture = () => ({ isTexture: true });
        Unit.createHairTexture = () => ({ isTexture: true });
        // Ensure assets are not initialized or reset them if possible, but they are static.
        // If initialized in previous test run in same process (watch mode), they persist.
        // We override them anyway, but initAssets might have run.
        // Unit.assets.initialized = false; // Optional, might reset.

        // Actually, initAssets calls them. If specific assets are already set, we are fine.
        // But if initAssets crashes, we need to mock these BEFORE initAssets is called.
        // Unit.initAssets checks initialized flag.
        // If we want to prevent crash, we must mock BEFORE first Unit constructor call.
        // Since we are inside beforeEach, and tests run sequentially, it should work for first run.
        // Note: import might not run initAssets, constructor does.

        unit = new Unit(mockScene, terrain, 10, 10);
        goblin = new Goblin(mockScene, terrain, 20, 20, 'normal');
    });

    it('should set very slow moveDuration for Unit on Rock (Height > 8)', () => {
        // Setup Rock at 10,11
        terrain.grid[10][10].height = 0;
        terrain.grid[10][11].height = 10;

        unit.gridX = 10; unit.gridZ = 10;

        // Try move
        unit.triggerMove(10, 11, 100);

        // Should MOVE but be SLOW
        expect(unit.isMoving).toBe(true);
        expect(unit.targetGridX).toBe(10);
        expect(unit.moveDuration).toBeGreaterThan(5000);
    });

    it('should set slow moveDuration for Unit on Slope', () => {
        // From 0 to 2 is valid (<= 2.0)
        terrain.grid[10][11].height = 2; // Diff 2 (Slope)
        terrain.grid[10][10].height = 0;
        unit.gridX = 10; unit.gridZ = 10;

        unit.triggerMove(10, 11, 100);

        expect(unit.moveDuration).toBe(4000); // Expect Slope Speed
    });

    it('should set normal moveDuration for Unit on Flat', () => {
        terrain.grid[10][11].height = 0; // Flat
        terrain.grid[10][10].height = 0;
        unit.gridX = 10; unit.gridZ = 10;

        unit.triggerMove(10, 11, 100);

        expect(unit.moveDuration).toBe(1000); // Expect Normal
    });

    it('should prevent Unit from building on Rock', () => {
        // Try to build at 15,15 relative? No, tryBuildStructure picks a spot next to unit.
        // Let's place unit at 14,14. Target 15,15.
        // Make 15,15 area flat Rock.
        // 1x1 area involves (15,15), (16,15), (15,16), (16,16).

        const h = 9;
        terrain.grid[15][15].height = h;
        terrain.grid[16][15].height = h;
        terrain.grid[15][16].height = h;
        terrain.grid[16][16].height = h;

        // And make unit pos compatible (e.g. same height)
        terrain.grid[14][14].height = h;
        unit.gridX = 14; unit.gridZ = 14;

        // Mock Math.random to always pick a specific adjacent tile?
        // Or just make ALL surrounding tiles Rock.
        // Unit tries multiple times (10 tries).
        // If we make a large area Rock, it should fail.

        for (let rx = 12; rx < 18; rx++) {
            for (let rz = 12; rz < 18; rz++) {
                terrain.grid[rx][rz].height = 9;
                terrain.grid[rx][rz].hasBuilding = false;
            }
        }
        unit.gridX = 15; unit.gridZ = 15; // Middle of rock field

        terrain.addBuilding.mockClear();

        // Force money/resources? Unit check resources?
        // Unit.tryBuildStructure check resources?
        // Requires wood/stone?
        // We mocked window.game.resources.
        // 'house' needs 0 resources? 'farm' needs? 
        // Unit.js: if (checkResources...)
        // Assume resources are sufficient (100 mocked).

        unit.tryBuildStructure(100);

        expect(terrain.addBuilding).not.toHaveBeenCalled();
    });

    it('should prefer non-rock targets using findBestTarget or findTargetGoblin logic', () => {
        // Test Unit.findTargetGoblin
        // Goblin A on Rock (dist 5)
        // Goblin B on Flat (dist 8)

        const rockGoblin = { gridX: 10, gridZ: 15, isDead: false }; // dist 5
        const flatGoblin = { gridX: 10, gridZ: 18, isDead: false }; // dist 8

        terrain.grid[10][15].height = 10; // Rock
        terrain.grid[10][18].height = 0; // Flat

        unit.gridX = 10; unit.gridZ = 10;

        unit.findTargetGoblin([rockGoblin, flatGoblin]);

        // Cost A: 5 + 20 = 25
        // Cost B: 8
        // Expect B
        expect(unit.targetGoblin).toBe(flatGoblin);
    });

    it('should allow Goblin to build Hut on Flat', () => {
        goblin.gridX = 20; goblin.gridZ = 20;
        terrain.grid[20][20].height = 0;
        terrain.grid[20][20].hasBuilding = false;

        goblin.tryBuildHut();

        expect(terrain.addBuilding).toHaveBeenCalledWith('goblin_hut', 20, 20);
    });

    it('should prevent Goblin Hut on Rock', () => {
        goblin.gridX = 20; goblin.gridZ = 20;
        terrain.grid[20][20].height = 10; // Rock
        terrain.addBuilding.mockClear();

        goblin.tryBuildHut();

        expect(terrain.addBuilding).not.toHaveBeenCalled();
    });

    it('should increase Goblin Hut population and spawn goblin', () => {
        const gm = new GoblinManager(mockScene, terrain);
        gm.addBuilding = terrain.addBuilding; // Bind? No, gm uses terrain

        // Mock spawnGoblinAtCave
        gm.spawnGoblinAtCave = vi.fn();

        // Add a hut
        const hut = {
            userData: { type: 'goblin_hut', population: 9.8, gridX: 5, gridZ: 5 }
        };
        terrain.buildings.push(hut);

        console.log("Before Update: Pop", hut.userData.population, "Plunder", gm.plunderCount);

        // Update to trigger spawn
        // Rate is 0.15 per sec. Delta = 2.0 -> +0.3 -> 10.0
        gm.updateHuts(2.0);

        console.log("After Update: Pop", hut.userData.population);

        // 9.7 + 0.3 = 10.0 -> Reset (-10) -> 0.0
        expect(hut.userData.population).toBeCloseTo(0.0);
        expect(gm.spawnGoblinAtCave).toHaveBeenCalled();
    });

    it('should accelerate growth with plunder', () => {
        const gm = new GoblinManager(mockScene, terrain);
        gm.plunderCount = 10; // +0.3 rate (10 * 0.03) -> Total 0.45 (0.15 base)
        console.log("Plunder Test: Count set to", gm.plunderCount);

        const hut = {
            userData: { type: 'goblin_hut', population: 0, gridX: 5, gridZ: 5 }
        };
        terrain.buildings.push(hut);

        gm.updateHuts(1.0);
        console.log("Plunder Test: Pop", hut.userData.population);

        expect(hut.userData.population).toBeCloseTo(0.45); // 0 + 0.45 * 1.0
    });
});
