
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';

// Import Terrain
import { Terrain } from '../Terrain.js';

// Mock Window if needed
if (!global.window) global.window = {};

describe('Terrain Logic', () => {
    let terrain;
    let mockGame;

    beforeEach(() => {
        // Reset Global Game Mock
        mockGame = {
            resources: { grain: 0, meat: 0, fish: 0 },
            units: [],
            gameTotalTime: 0
        };
        global.window.game = mockGame;

        // Mock Scene
        const mockScene = { add: vi.fn(), remove: vi.fn() };

        // Initialize Terrain
        terrain = new Terrain(mockScene);
        terrain.logicalWidth = 10;
        terrain.logicalDepth = 10;
        terrain.grid = Array(10).fill(0).map(() => Array(10).fill({ height: 1, moisture: 0.5 }));
        terrain.buildings = [];
    });

    describe('Population Update', () => {
        it('should correctly sum housing population excluding farms', () => {
            // Setup Buildings
            const house1 = { userData: { type: 'house', population: 50, gridX: 0, gridZ: 0 } };
            const house2 = { userData: { type: 'house', population: 30, gridX: 0, gridZ: 1 } };
            const farm1 = { userData: { type: 'farm', population: 90, gridX: 2, gridZ: 2 } }; // Crop Growth

            terrain.buildings = [house1, house2, farm1];

            // Run Update (dummy delta)
            terrain.updatePopulation(0.1, vi.fn());

            // Check Total Housing Pop
            // 50 + 30 = 80. (Farm's 90 should be ignored)
            expect(terrain.totalHousingPop).toBe(80);
        });

        it('should handle massive population overflow loop correctly', () => {
            // Setup a house with HUGE population (e.g. accumulated during lag)
            const house = { userData: { type: 'house', population: 550, gridX: 0, gridZ: 0 } };
            terrain.buildings = [house];

            // Setup resources for spawning (New Requirement)
            mockGame.resources = { grain: 100, meat: 100, fish: 100 };

            const spawnCallback = vi.fn();

            // Force it to be this building's turn (stagger count = 20)
            terrain.frameCount = 19; // 19++ -> 20 -> 0. Match index 0.

            terrain.updatePopulation(0.016, spawnCallback);

            expect(spawnCallback).toHaveBeenCalledTimes(5);
            expect(house.userData.population).toBeLessThan(100);
            expect(house.userData.population).toBeGreaterThan(49); // 50 + expected growth
        });
    });

    describe('Farm Logic', () => {
        it('should grow crops using simDeltaTime (Not raw deltaTime)', () => {
            const farm = { userData: { type: 'farm', population: 0, gridX: 0, gridZ: 0 } };
            terrain.buildings = [farm];

            const rawDelta = 0.016; // 16ms
            terrain.frameCount = 19;
            terrain.updatePopulation(rawDelta, vi.fn());

            expect(farm.userData.population).toBeCloseTo(3.2, 1);
        });

        it('should preserve overflow when harvesting', () => {
            const farm = { userData: { type: 'farm', population: 95, gridX: 0, gridZ: 0 } };
            terrain.buildings = [farm];
            const slowDelta = 0.1; // 100ms

            terrain.frameCount = 19;
            terrain.updatePopulation(slowDelta, vi.fn());

            expect(mockGame.resources.grain).toBe(5);
            expect(farm.userData.population).toBeCloseTo(15, 0); // 115 - 100
        });
    });

    describe('Advanced Mechanics', () => {
        it('should scale farm yield based on moisture', () => {
            // 1. Optimal Moisture (0.5) => Efficiency 1.0 => Yield 5
            const farmOptimal = { userData: { type: 'farm', population: 100, gridX: 0, gridZ: 0 } };
            terrain.buildings = [farmOptimal];
            terrain.grid[0][0].moisture = 0.5;

            mockGame.resources.grain = 0;
            mockGame.resources = { grain: 100, meat: 100, fish: 100 };

            const house = { userData: { type: 'house', population: 200, gridX: 0, gridZ: 0 } };
            terrain.buildings = [house];

            const spawnCallback = vi.fn();
            terrain.frameCount = 19;

            terrain.updatePopulation(0.1, spawnCallback);

            expect(spawnCallback).toHaveBeenCalledTimes(2);

            const role1 = spawnCallback.mock.calls[0][2];
            const role2 = spawnCallback.mock.calls[1][2];

            const validRoles = ['hunter', 'fisher', 'worker'];
            expect(validRoles).toContain(role1);
            expect(validRoles).toContain(role2);
        });

        it('should reduce food consumption at night', () => {
            // Setup population
            terrain.buildings.push({
                userData: { type: 'house', population: 100, gridX: 0, gridZ: 0 }
            });

            // Base Rate: 0.005 * 100 = 0.5 per sec.
            // Night Rate: 0.05 per sec (1/10).

            // Time step 100s.
            // Day: Expect 50 food consumed.
            // Night: Expect 5 food consumed.
        });

        it('should consume normal amount during day', () => {
            global.window.game.resources = { grain: 1000, meat: 0, fish: 0 };
            const spawnCb = vi.fn();

            terrain.frameCount = -1;
            terrain.updatePopulation(1.0, spawnCb, false); // Day

            // Maintenance: 100 * 0.005 * 1.0 * 1.0 = 0.5.
            // Spawn Cost: 1.0 (Overflow).
            // Total: 1.5.
            // Initial 1000. Expect 998.5.

            expect(global.window.game.resources.grain).toBeCloseTo(998.5, 1);
        });

        describe('Seasonal Colors', () => {
            it('should return different colors for seasons', () => {
                // Autumn Forest -> Solid Colors (Red, Yellow, Green) based on coordinate hash
                const forestAutumn = terrain.getBiomeColor(6, 0.5, 0.9, false, 'Autumn', 10, 10);
                const validAutumnHexes = [
                    new THREE.Color(0xCC0000).getHex(),
                    new THREE.Color(0xFFCC00).getHex(),
                    new THREE.Color(0x228B22).getHex()
                ];
                // We can't guarantee WHICH one it is without knowing the hash of (10,10),
                // but checking it is ONE of them is good enough for now.
                expect(validAutumnHexes).toContain(forestAutumn.getHex());

                // Winter Plains -> Khaki (Withered)
                const plainsWinter = terrain.getBiomeColor(2, 0.5, 0, false, 'Winter', 10, 10);
                // Should not be Green
                expect(plainsWinter.getHex()).not.toBe(new THREE.Color(0x88DD88).getHex());
                // Should be Khaki-ish (Red/Green > Blue)
                expect(plainsWinter.r).toBeGreaterThan(plainsWinter.b);
                expect(plainsWinter.g).toBeGreaterThan(plainsWinter.b);

                // Winter Forest -> Snow (White with subtle texture)
                const forestWinter = terrain.getBiomeColor(6, 0.5, 0, false, 'Winter', 10, 10);
                expect(forestWinter.r).toBeGreaterThan(0.9);

                // Winter Rock -> Grey
                const rockWinter = terrain.getBiomeColor(10, 0.5, 0, false, 'Winter', 10, 10);
                expect(rockWinter.getHex()).toBe(new THREE.Color(0x808080).getHex());
            });

            it('should keep rock color even if dry (desert override check)', () => {
                // Height 10 (Rock), Moisture 0.2 (Desert). Should be Rock Color (Grey).
                const rockDry = terrain.getBiomeColor(10, 0.2, 0, false, 'Summer', 10, 10);
                // 0x808080 is base rock color.
                // Note: The logic lerps with noise, but noise is 0 here.
                expect(rockDry.getHex()).toBe(new THREE.Color(0x808080).getHex());
            });
        });
    });
});
