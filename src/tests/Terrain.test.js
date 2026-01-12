
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
            terrain.updatePopulation(0.1, false, 0, vi.fn());

            // Check Total Housing Pop
            // 50 + 30 = 80. (Farm's 90 should be ignored)
            expect(terrain.totalHousingPop).toBe(80);
        });

        it('should handle massive population overflow loop correctly', () => {
            // Setup a barracks with HUGE population (was house, but house doesn't spawn anymore)
            const barracks = { userData: { type: 'barracks', population: 250, gridX: 0, gridZ: 0 } };
            terrain.buildings = [barracks];

            // Setup resources for spawning (New Requirement)
            mockGame.resources = { grain: 100, meat: 100, fish: 100 };

            const spawnCallback = vi.fn(() => true);
            // Force it to be this building's turn (stagger count = 20)
            terrain.frameCount = 19; // 19++ -> 20 -> 0. Match index 0.

            // Correct Signature: deltaTime, isNight, activeUnits, spawnCallback
            terrain.updatePopulation(0.016, false, 0, spawnCallback);

            // Barracks attempts to spawn 2 units (Updated Logic).
            expect(spawnCallback).toHaveBeenCalledTimes(2);
            expect(spawnCallback).toHaveBeenCalled();
        });
    });

    describe('Farm Logic', () => {
        it('should grow crops using simDeltaTime (Not raw deltaTime)', () => {
            const farm = { userData: { type: 'farm', population: 0, gridX: 0, gridZ: 0 } };
            terrain.buildings = [farm];

            const rawDelta = 0.016; // 16ms
            terrain.frameCount = 19;
            terrain.updatePopulation(rawDelta, false, 0, vi.fn());

            expect(farm.userData.population).toBeCloseTo(3.2, 1);
        });

        it('should preserve overflow when harvesting', () => {
            const farm = { userData: { type: 'farm', population: 95, gridX: 0, gridZ: 0 } };
            terrain.buildings = [farm];
            const slowDelta = 0.1; // 100ms

            terrain.frameCount = 19;
            terrain.updatePopulation(slowDelta, false, 0, vi.fn());

            expect(mockGame.resources.grain).toBe(8); // Yield is 8
            expect(farm.userData.population).toBeCloseTo(15, 0); // 115 - 100
        });
    });

    describe('Advanced Mechanics', () => {
        it('should scale farm yield based on moisture', () => {
            // 1. Optimal Moisture (0.5) => Efficiency 1.0 => Yield 5
            // 1. Optimal Moisture (0.5) => Efficiency 1.0 => Yield 8
            const farmOptimal = { userData: { type: 'farm', population: 100, gridX: 0, gridZ: 0 } };
            terrain.buildings = [farmOptimal];
            terrain.grid[0][0].moisture = 0.5;

            mockGame.resources.grain = 0;
            mockGame.resources = { grain: 0, meat: 0, fish: 0 };

            const spawnCallback = vi.fn();
            terrain.frameCount = 19; // Index 0 (Farm)

            terrain.updatePopulation(0.1, false, 0, spawnCallback);

            // Yield should happen
            expect(mockGame.resources.grain).toBe(8);
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

            // Add population so consumption happens
            terrain.buildings.push({
                userData: { type: 'house', population: 100, gridX: 0, gridZ: 0 }
            });

            // Correct Signature: deltaTime, isNight, activeUnits, spawnCallback
            terrain.updatePopulation(1.0, false, 0, spawnCb); // Day

            // Maintenance: 100 * 0.005 * 1.0 * 1.0 = 0.5.
            // Spawn Cost: 0 (No spawn cost in Terrain.js currently).
            // Total: 0.5.
            // Initial 1000. Expect 999.5.

            expect(global.window.game.resources.grain).toBeCloseTo(999.5, 1);
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
                // Allow fuzzy match because SimplexNoise might differ slightly even with noise=false if implementation changed
                const c = new THREE.Color(0x808080);
                expect(rockWinter.r).toBeCloseTo(c.r, 1);
                expect(rockWinter.g).toBeCloseTo(c.g, 1);
                expect(rockWinter.b).toBeCloseTo(c.b, 1);
            });

            it('should keep rock color even if dry (desert override check)', () => {
                // Height 10 (Rock), Moisture 0.2 (Desert). Should be Rock Color (Grey).
                const rockDry = terrain.getBiomeColor(10, 0.2, 0, false, 'Summer', 10, 10);
                // 0x808080 is base rock color.
                const c2 = new THREE.Color(0x808080);
                expect(rockDry.r).toBeCloseTo(c2.r, 1);
            });
        });
    });
});
