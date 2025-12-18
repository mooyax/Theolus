import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';

// Mocks
class MockTerrain {
    constructor() {
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.grid = [];
        for (let x = 0; x < 100; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                this.grid[x][z] = { height: 10, hasBuilding: false };
            }
        }
        this.buildings = [];
    }
    getTileHeight(x, z) { return 1; }
    getInterpolatedHeight(x, z) { return 1; }
    registerEntity() { }
    unregisterEntity() { }
    addBuilding() { return true; }
    checkBuildingSpace() { return true; }
    findBestTarget() { return null; }
    modifyMoisture() { } // Default
}

const mockScene = { add: () => { }, remove: () => { } };

// Mock Global Document for Unit.initAssets
if (typeof document === 'undefined') {
    global.document = {
        createElement: (tag) => {
            if (tag === 'canvas') {
                return {
                    width: 0, height: 0,
                    getContext: () => ({
                        fillStyle: '', fillRect: () => { }
                    })
                };
            }
            return {};
        }
    };
}
// Mock Window
if (typeof window === 'undefined') {
    global.window = {
        game: {
            resources: { grain: 100 },
            totalPopulation: 10
        }
    };
}
// Mock THREE
vi.mock('three', () => {
    const Vector3 = class { constructor(x, y, z) { this.x = x; this.y = y; this.z = z; } copy() { } set() { } };
    return {
        Vector3: Vector3,
        Mesh: class { constructor() { this.position = new Vector3(0, 0, 0); this.rotation = { x: 0 }; this.add = () => { }; } },
        MeshStandardMaterial: class { },
        BoxGeometry: class { translate() { } },
        CylinderGeometry: class { translate() { } },
        ConeGeometry: class { translate() { } },
        CanvasTexture: class { },
        Group: class { constructor() { this.position = new Vector3(0, 0, 0); this.add = () => { }; } }
    };
});

describe('Migration Improvements', () => {
    let unit, terrain;

    beforeEach(() => {
        terrain = new MockTerrain();
        unit = new Unit(mockScene, terrain, 50, 50, 'worker');
        unit.id = 'test-migrant';
        unit.moveInterval = 0;
        unit.game = { battleMemory: { reportRaid: () => { } } }; // Mock game memory
    });

    it('should retry migration after 30 seconds timeout', () => {
        // Force Random to avoid interrupt
        const originalRandom = Math.random;
        Math.random = () => 0.99;

        // Setup Migration
        unit.migrate(0);
        expect(unit.action).toBe('Migrating');
        const firstTarget = unit.migrationTarget;
        expect(firstTarget).toBeTruthy();

        // Simulate time passing < 30s
        unit.updateLogic(10000, 10.0, false, [], [], []); // +10s
        expect(unit.action).toBe('Migrating');
        expect(unit.migrationTarget).toBe(firstTarget);

        // Simulate Timeout (>30s total)
        // Note: unit.migrate uses 'time' to pass to triggerMove.
        // updateLogic increments delta via arg2.
        unit.updateLogic(40000, 25.0, false, [], [], []); // +25s (Total 35s)

        // Should have called migrate again
        // We can check if migrationTimer reset
        expect(unit.migrationTimer).toBe(0);
        // And target should likely be different (random chance, but high prob)
        // or effectively 'Migrating' continues.
        expect(unit.action).toBe('Migrating');

        Math.random = originalRandom;
    });

    it('should interrupt migration if enemy is found (Priority)', () => {
        unit.migrate(0);

        // Mock searchSurroundings to find a goblin
        // We can mock the method on the instance
        unit.searchSurroundings = (x, z) => {
            unit.targetGoblin = { id: 'g1', gridX: 60, gridZ: 60, hp: 10 };
        };

        // Update logic - should trigger random check (0.05 chance)
        // Force random to hit
        const originalRandom = Math.random;
        Math.random = () => 0.01; // Force hit

        unit.updateLogic(1000, 0.1, false, [], [], []);

        Math.random = originalRandom; // Restore

        expect(unit.action).toBe('Idle'); // Should reset to Idle to let standard logic take over
        expect(unit.migrationTarget).toBeNull();
        expect(unit.targetGoblin).toBeTruthy();
    });

    it('should stop migrating if construction succeeds', () => {
        unit.migrate(0);
        expect(unit.action).toBe('Migrating');

        // Mock tryBuildStructure to return true
        unit.tryBuildStructure = () => true;

        // updateMovement calls tryBuildStructure
        unit.isMoving = true;
        unit.moveDuration = 100;
        unit.moveStartTime = 0;

        // Finish move
        unit.updateMovement(200);

        expect(unit.action).toBe('Idle'); // Should stop migration
        expect(unit.migrationTarget).toBeNull();
    });

    it('DEBUG: should log blockage reasons correctly', () => {
        // Mock getTileHeight in terrain to be controllable
        terrain.grid[20][20] = { height: 2, hasBuilding: false };
        terrain.grid[21][20] = { height: 6, hasBuilding: false }; // Slope > 2

        terrain.getTileHeight = (x, z) => {
            if (x < 0 || x >= 100 || z < 0 || z >= 100) return 0;
            return terrain.grid[x][z].height;
        }

        unit.gridX = 20;
        unit.gridZ = 20;

        console.log("--- DEBUG: Testing Slope Block ---");
        const slopeResult = unit.canMoveTo(21, 20);
        expect(slopeResult).toBe(false);

        // Water
        terrain.grid[22][20] = { height: 0, hasBuilding: false };
        console.log("--- DEBUG: Testing Water Block ---");
        const waterResult = unit.canMoveTo(22, 20);
        expect(waterResult).toBe(false);

        // Building
        terrain.grid[23][20] = { height: 2, hasBuilding: true, building: { id: 999 } };
        console.log("--- DEBUG: Testing Building Pass ---");
        const buildingResult = unit.canMoveTo(23, 20);
        expect(buildingResult).toBe(true);
    });
});
