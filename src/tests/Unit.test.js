
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';

// Mock Globals
global.window = {
    game: {
        resources: { fish: 0, meat: 0, grain: 0 },
        gameTotalTime: 0
    }
};

// Mock THREE basic classes used in Unit
global.THREE = THREE;

import { Unit } from '../Unit.js';

describe('Unit Logic', () => {
    let unit;
    let mockTerrain;
    let mockScene;

    beforeEach(() => {
        // Reset Game Resources
        global.window.game.resources = { fish: 0, meat: 0, grain: 0 };

        // Mock Terrain
        mockTerrain = {
            logicalWidth: 10,
            logicalDepth: 10,
            getTileHeight: vi.fn().mockReturnValue(1), // Default Land
            getVisualPosition: vi.fn().mockReturnValue(new THREE.Vector3(0, 0, 0)), // Needed by updatePosition
            grid: Array(10).fill(0).map(() => Array(10).fill({ height: 1, moisture: 0.5 })),
            buildings: [],
            addBuilding: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            checkCollision: vi.fn().mockReturnValue(false),
            modifyMoisture: vi.fn() // Added for ImproveLand
        };

        // Mock Scene
        mockScene = { add: vi.fn(), remove: vi.fn() };

        // Mock Static Asset Init
        Unit.initAssets = vi.fn();

        vi.spyOn(Unit.prototype, 'updatePosition').mockImplementation(() => { });

        // Mock Random to be deterministic (0.5)
        vi.spyOn(Math, 'random').mockReturnValue(0.5);

        // Create Unit
        unit = new Unit(mockScene, mockTerrain, 5, 5);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Resource Gathering', () => {
        it('should gather fish if checking neighbors finds water', () => {
            mockTerrain.getTileHeight = vi.fn((x, z) => {
                if (x === 5 && z === 5) return 1; // Self: Land
                if (x === 5 && z === 6) return 0; // Neighbor: Water
                return 1;
            });

            unit.lastGatherTime = 0;
            unit.gatherResources(100);

            expect(global.window.game.resources.fish).toBe(0.5);
        });

        it('should NOT gather fish if completely inland', () => {
            mockTerrain.getTileHeight = vi.fn().mockReturnValue(1); // All Land

            unit.lastGatherTime = 0;
            unit.gatherResources(100);

            expect(global.window.game.resources.fish).toBe(0);
        });
    });

    describe('Build Priority (Famine)', () => {
        it('should prioritize Farm and ABORT house if farm fails during famine', () => {
            global.window.game.resources = { grain: 0, meat: 0, fish: 0 };

            unit.buildFarm = vi.fn().mockReturnValue(false);
            unit.buildHouse = vi.fn();

            mockTerrain.grid[5][5] = { height: 1, hasBuilding: false };
            mockTerrain.grid[6][5] = { height: 1, hasBuilding: false };
            mockTerrain.grid[5][6] = { height: 1, hasBuilding: false };
            mockTerrain.grid[6][6] = { height: 1, hasBuilding: false };

            unit.tryBuildStructure(100);

            expect(unit.buildFarm).toHaveBeenCalled();
            expect(unit.buildHouse).not.toHaveBeenCalled();
        });

        it('should fallback to House if NOT in famine', () => {
            global.window.game.resources = { grain: 1000, meat: 1000, fish: 1000 };

            unit.buildFarm = vi.fn().mockReturnValue(false);
            unit.buildHouse = vi.fn();

            mockTerrain.grid[5][5] = { height: 1, hasBuilding: false };
            mockTerrain.grid[6][5] = { height: 1, hasBuilding: false };
            mockTerrain.grid[5][6] = { height: 1, hasBuilding: false };
            mockTerrain.grid[6][6] = { height: 1, hasBuilding: false };

            unit.tryBuildStructure(100);

            expect(unit.buildHouse).toHaveBeenCalled();
        });
    });

    describe('Advanced Mechanics - Unit', () => {
        it('should accept role in constructor', () => {
            const hunter = new Unit(mockScene, mockTerrain, 5, 5, 'hunter');
            expect(hunter.role).toBe('hunter');

            const worker = new Unit(mockScene, mockTerrain, 5, 5, 'worker');
            expect(worker.role).toBe('worker');

            const legacy = new Unit(mockScene, mockTerrain, 5, 5, true);
            expect(legacy.isSpecial).toBe(true);
            expect(legacy.role).toBe('worker');
        });

        it('should FAIL buildFarm and IMPROVE LAND if moisture is poor (simulated)', () => {
            // Setup Poor Moisture
            mockTerrain.grid[5][5].moisture = 0.0; // Very dry (Diff 0.5)
            // Success Chance = 1.0 - (0.5 * 2.5) = -0.25 -> 0.
            // Random is 0.5. 0.5 > 0 -> FAIL.

            const result = unit.buildFarm(100);

            // Should Fail
            expect(result).toBe(false);
            // Should NOT build farm
            expect(mockTerrain.addBuilding).not.toHaveBeenCalled();
            // Should IMPROVE LAND
            expect(mockTerrain.modifyMoisture).toHaveBeenCalled();
            // Should consume time (isMoving)
            expect(unit.isMoving).toBe(true);
        });

        it('should succeed buildFarm if moisture is optimal', () => {
            mockTerrain.grid[5][5].moisture = 0.5; // Perfect

            const result = unit.buildFarm(100);
            expect(result).toBe(true);
            expect(mockTerrain.addBuilding).toHaveBeenCalledWith('farm', 5, 5);
        });

        it('should check heights during moveRandomly', () => {
            mockTerrain.getTileHeight = vi.fn().mockReturnValue(1);
            unit.moveRandomly(100);
            expect(mockTerrain.getTileHeight).toHaveBeenCalled();
        });
    });
});
