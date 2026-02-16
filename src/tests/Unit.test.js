import { describe, it, expect, beforeEach, vi, afterEach, beforeAll } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { MockGame, MockTerrain } from './TestHelper.js';

vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        InstancedMesh: vi.fn().mockImplementation(() => ({
            instanceMatrix: { setUsage: vi.fn() },
            updateMatrix: vi.fn(),
            setMatrixAt: vi.fn(),
            setColorAt: vi.fn(),
            count: 0,
            castShadow: false,
            receiveShadow: false,
            frustumCulled: false,
            dispose: vi.fn()
        })),
    };
});

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Unit Logic', () => {
    let unit;
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);
        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;

        vi.spyOn(Unit.prototype, 'updatePosition').mockImplementation(() => { });
        vi.spyOn(Math, 'random').mockReturnValue(0.5);

        unit = new Unit(mockGame.scene, mockTerrain, 5, 5, 'worker');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Resource Gathering', () => {
        it('should gather fish if checking neighbors finds water', () => {
            unit.role = 'fisher';
            // Mock window.game for resource access
            window.game = mockGame;
            mockTerrain.grid[10][10].height = 0.5; // Water
            vi.spyOn(mockTerrain, 'getTileHeight').mockImplementation((x, z) => {
                if (x === 5 && z === 5) return 1;
                // Return FALSE to simulate WATER/Unreachable
                if (x === 5 && z === 6) return false;
                return true;
            });

            unit.lastGatherTime = 0;
            global.window.game = mockGame; // Unit.js uses window.game
            unit.gatherResources(6000);

            expect(mockGame.resources.fish).toBe(1.0);
        });

        it('should NOT gather fish if completely inland', () => {
            vi.spyOn(mockTerrain, 'getTileHeight').mockReturnValue(1);
            unit.lastGatherTime = 0;
            unit.gatherResources(6000);
            expect(mockGame.resources.fish).toBe(0);
        });
    });

    describe('Build Priority (Famine)', () => {
        it('should prioritize Farm and ABORT house if farm fails during famine', () => {
            mockGame.resources = { grain: 0, meat: 0, fish: 0 };
            mockGame.totalPopulation = 11; // Ensure farmTarget > 0
            // FIX: Force Random < 0.3 to enter Farm Logic
            vi.spyOn(Math, 'random').mockReturnValue(0.1);

            unit.buildFarm = vi.fn().mockReturnValue(false);
            unit.buildHouse = vi.fn();

            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    mockTerrain.grid[5 + i][5 + j] = { height: 1, hasBuilding: false, type: 'grass', regionId: 1 };
                }
            }

            unit.tryBuildStructure(100);

            expect(unit.buildFarm).toHaveBeenCalled();
            expect(unit.buildHouse).not.toHaveBeenCalled();
        });

        it('should fallback to House if NOT in famine', () => {
            mockGame.resources = { grain: 1000, meat: 1000, fish: 1000 };
            mockGame.totalPopulation = 11; // farmTarget will be 3, housingBuffer will be 14

            // Add 3 farms to satisfy farmTarget (3 > 11/5 = 2.2)
            mockTerrain.buildings.push({ userData: { type: 'farm', faction: 'player' } });
            mockTerrain.buildings.push({ userData: { type: 'farm', faction: 'player' } });
            mockTerrain.buildings.push({ userData: { type: 'farm', faction: 'player' } });

            unit.buildFarm = vi.fn().mockReturnValue(false);
            unit.buildHouse = vi.fn();

            // Set heights for 2x2 area to satisfy checkFlatArea
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    mockTerrain.grid[5 + i][5 + j].height = 1;
                    mockTerrain.grid[5 + i][5 + j].hasBuilding = false;
                }
            }

            vi.spyOn(mockTerrain, 'addBuilding');
            unit.tryBuildStructure(100);

            // Fix: Check addBuilding, NOT unit.buildHouse
            // baseHousingCapacity(10) < housingBuffer(14) -> should build
            expect(mockTerrain.addBuilding).toHaveBeenCalledWith('house', 5, 5, false, false, 'player');
        });
    });

    describe('Advanced Mechanics - Unit', () => {
        it('should accept role in constructor', () => {
            const hunter = new Unit(mockGame.scene, mockTerrain, 5, 5, 'hunter');
            expect(hunter.role).toBe('hunter');

            const worker = new Unit(mockGame.scene, mockTerrain, 5, 5, 'worker');
            expect(worker.role).toBe('worker');

            const legacy = new Unit(mockGame.scene, mockTerrain, 5, 5, true);
            expect(legacy.isSpecial).toBe(true);
            expect(legacy.role).toBe('worker');
        });

        it('should FAIL buildFarm and IMPROVE LAND if moisture is poor', () => {
            mockTerrain.grid[5][5].moisture = 0.0;
            // Ensure no building exists
            mockTerrain.grid[5][5].hasBuilding = false;
            mockTerrain.grid[5][5].height = 1;

            vi.spyOn(mockTerrain, 'addBuilding');
            vi.spyOn(unit, 'improveLand'); // Spy on Unit method

            const result = unit.buildFarm(100);

            // Should return true (action consumed)
            expect(result).toBe(true);
            // Should call improveLand
            expect(unit.improveLand).toHaveBeenCalled();
            // Should NOT add building
            expect(mockTerrain.addBuilding).not.toHaveBeenCalled();
        });

        it('should succeed buildFarm if moisture is optimal', () => {
            mockTerrain.grid[5][5].moisture = 0.5;
            vi.spyOn(mockTerrain, 'addBuilding');

            const result = unit.buildFarm(100);
            expect(result).toBe(true);
            expect(mockTerrain.addBuilding).toHaveBeenCalledWith('farm', 5, 5, false, false, 'player');
        });

        it('should check regions during moveRandomly', () => {
            vi.spyOn(mockTerrain, 'getRegion');
            vi.spyOn(mockTerrain, 'getRandomPointInRegion');

            unit.moveRandomly(100);

            expect(mockTerrain.getRegion).toHaveBeenCalled();
            expect(mockTerrain.getRandomPointInRegion).toHaveBeenCalled();
        });
    });
});
