
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Unit } from '../Unit.js';
import { Building } from '../Building.js';
import { Game } from '../Game.js';
import * as THREE from 'three';

// --- MOCKS ---
// global.document override removed to prevent happy-dom conflict
if (typeof document !== 'undefined') {
}

// Mock Window Game Safely
if (typeof window !== 'undefined') {
    window.game = null;
}

// Test Suite
describe('Group Combat Simulations', () => {
    let mockScene, mockTerrain;
    let game;
    let units = [];
    let goblins = [];

    beforeEach(() => {
        vi.clearAllMocks();
        mockScene = new THREE.Scene();

        // 1. Setup Terrain Mock
        mockTerrain = {
            grid: [],
            buildings: [],
            units: [], // Entity registry
            goblins: [],
            getTileHeight: () => 10,
            gridToWorld: (x) => x,
            getVisualPosition: () => new THREE.Vector3(),
            getRegion: () => 1,
            getBuildingSize: () => 1,
            registerEntity: (e, x, z, type) => {
                if (type === 'unit') mockTerrain.units.push(e);
                if (type === 'goblin') mockTerrain.goblins.push(e);
            },
            unregisterEntity: (e) => {
                // Remove from lists
            },
            removeBuilding: vi.fn((b) => {
                const idx = mockTerrain.buildings.indexOf(b);
                if (idx > -1) mockTerrain.buildings.splice(idx, 1);
            }),
            updateLights: vi.fn(),
            findBestTarget: (type, x, z, rad, cost, list) => {
                // Simple Proximity Search
                let best = null;
                let bestScore = Infinity;
                if (!list) return null;
                for (const e of list) {
                    if (e.isDead) continue;
                    const d = Math.sqrt((e.gridX - x) ** 2 + (e.gridZ - z) ** 2);
                    if (d <= rad) {
                        const score = cost ? cost(e, d) : d;
                        if (score < bestScore) { bestScore = score; best = e; }
                    }
                }
                return best;
            },
            findPath: (sx, sz, ex, ez) => [{ x: ex, z: ez }], // Instant linear path
            findPathAsync: (sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }]),
            isWalkable: () => true,
            isReachable: () => true,
            checkYield: () => Promise.resolve()
        };

        // Initialize Grid
        for (let x = 0; x < 50; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 50; z++) {
                if (!mockTerrain.grid[x]) mockTerrain.grid[x] = [];
                mockTerrain.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false };
            }
        }

        // 2. Setup Game Mock for Managers
        game = {
            scene: mockScene,
            terrain: mockTerrain,
            units: [],
            goblins: [],
            spawnProjectile: vi.fn(),
            goblinManager: {
                notifyClanActivity: vi.fn(),
                increasePlunder: vi.fn()
            }
        };
        window.game = game;

        units = [];
        goblins = [];
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    // --- HELPER: Simulation Loop ---
    function runSimulation(frames = 100) {
        for (let i = 0; i < frames; i++) {
            const time = i * 0.1;
            const dt = 0.1; // 100ms steps

            // Update Units
            units.forEach(u => {
                if (!u.isDead) {
                    if (!u.targetGoblin || u.targetGoblin.isDead) {
                        let nearest = null;
                        let minD = 999;
                        goblins.forEach(g => {
                            if (g.isDead) return;
                            const d = Math.sqrt((g.gridX - u.gridX) ** 2 + (g.gridZ - u.gridZ) ** 2);
                            if (d < minD) { minD = d; nearest = g; }
                        });
                        u.targetGoblin = nearest;
                    }

                    if (u.targetGoblin) {
                        const d = Math.sqrt((u.targetGoblin.gridX - u.gridX) ** 2 + (u.targetGoblin.gridZ - u.gridZ) ** 2);
                        if (d <= 2.0 && u.attackCooldown <= 0) {
                            u.targetGoblin.takeDamage(u.damage, u);
                            u.attackCooldown = u.attackRate;
                        } else if (d > 2.0) {
                            const dx = u.targetGoblin.gridX - u.gridX;
                            const dz = u.targetGoblin.gridZ - u.gridZ;
                            u.gridX += dx * 0.1;
                            u.gridZ += dz * 0.1;
                        }
                    }
                    if (u.attackCooldown > 0) u.attackCooldown -= dt;
                }
            });

            // Update Goblins
            goblins.forEach(g => {
                if (!g.isDead) {
                    g.updateLogic(time, dt, units, mockTerrain.buildings);

                    if (!g.targetUnit && !g.targetBuilding) {
                        let nearest = null;
                        let minD = 999;
                        units.forEach(u => {
                            if (u.isDead) return;
                            const d = Math.sqrt((u.gridX - g.gridX) ** 2 + (u.gridZ - g.gridZ) ** 2);
                            if (d < minD) { minD = d; nearest = u; }
                        });

                        let nearestB = null;
                        let minDB = 999;
                        mockTerrain.buildings.forEach(b => {
                            const d = Math.sqrt((b.userData.gridX - g.gridX) ** 2 + (b.userData.gridZ - g.gridZ) ** 2);
                            if (d < minDB) { minDB = d; nearestB = b; }
                        });

                        if (nearest && minD < 5) g.targetUnit = nearest;
                        else if (nearestB) g.targetBuilding = nearestB;
                        else if (nearest) g.targetUnit = nearest;
                    }

                    if (g.state && g.state.update) g.state.update(time, dt, units, mockTerrain.buildings);
                }
            });
        }
    }

    it('Scenario: 5 Goblins vs 3 Workers (Close Match / Goblin Edge)', () => {
        console.log('\n[Scenario 1] 5 Goblins vs 3 Workers');
        for (let i = 0; i < 3; i++) {
            const u = new Unit(mockScene, mockTerrain, 10 + i, 10, 'worker');
            units.push(u);
            game.units.push(u);
        }
        for (let i = 0; i < 5; i++) {
            const g = new Goblin(mockScene, mockTerrain, 15 + i, 15, 'normal');
            goblins.push(g);
            game.goblins.push(g);
        }
        runSimulation(200);
        const survivingUnits = units.filter(u => !u.isDead).length;
        const survivingGoblins = goblins.filter(g => !g.isDead).length;
        console.log(`Survivors -> Units: ${survivingUnits}, Goblins: ${survivingGoblins}`);

        expect(survivingGoblins).toBeLessThan(5);
    });

    it('Scenario: 3 Knights vs 10 Goblins (Knights Stomp)', () => {
        console.log('\n[Scenario 2] 3 Knights vs 10 Goblins');
        for (let i = 0; i < 3; i++) {
            const u = new Unit(mockScene, mockTerrain, 10 + i, 10, 'knight');
            units.push(u);
        }
        for (let i = 0; i < 10; i++) {
            const g = new Goblin(mockScene, mockTerrain, 12, 12, 'normal');
            goblins.push(g);
        }
        runSimulation(150);
        const survivingUnits = units.filter(u => !u.isDead).length;
        const survivingGoblins = goblins.filter(g => !g.isDead).length;
        console.log(`Survivors -> Knights: ${survivingUnits}, Goblins: ${survivingGoblins}`);
        expect(survivingUnits).toBe(3);
        expect(survivingGoblins).toBe(0);
    });

    it('Scenario: 3 Goblins vs 1 House (House Defends)', () => {
        console.log('\n[Scenario 3] 3 Goblins vs 1 House');
        const house = {
            userData: { type: 'house', population: 10, gridX: 10, gridZ: 10, faction: 'player' },
            position: { x: 10, y: 0, z: 10 },
            gridX: 10, gridZ: 10
        };
        mockTerrain.buildings.push(house);
        for (let i = 0; i < 3; i++) {
            const g = new Goblin(mockScene, mockTerrain, 11, 11, 'normal');
            g.attackCooldown = 0;
            goblins.push(g);
        }
        runSimulation(100);
        const survivingGoblins = goblins.filter(g => !g.isDead).length;
        console.log(`Survivors -> Goblins: ${survivingGoblins}, House Pop: ${house.userData.population}`);
        expect(survivingGoblins).toBe(0);
        expect(house.userData.population).toBeGreaterThan(0);
    });

    it('Scenario: 5 Goblins vs 1 House (House Destroyed)', () => {
        console.log('\n[Scenario 4] 5 Goblins vs 1 House (Pop 5)');
        const house = {
            userData: { type: 'house', population: 5, gridX: 10, gridZ: 10, faction: 'player' },
            position: { x: 10, y: 0, z: 10 },
            gridX: 10, gridZ: 10
        };
        mockTerrain.buildings.push(house);
        for (let i = 0; i < 5; i++) {
            const g = new Goblin(mockScene, mockTerrain, 11, 11, 'normal');
            goblins.push(g);
        }
        runSimulation(150);
        const survivingGoblins = goblins.filter(g => !g.isDead).length;
        console.log(`Survivors -> Goblins: ${survivingGoblins}, House Pop: ${house.userData.population}`);
        expect(house.userData.population).toBeLessThanOrEqual(0);
    });

    it('Scenario 5: King vs 1 Knight (Knight Wins)', () => {
        console.log('\n[Scenario 5] King vs 1 Knight');
        const u = new Unit(mockScene, mockTerrain, 10, 10, 'knight');
        units.push(u);
        const k = new Goblin(mockScene, mockTerrain, 15, 15, 'king');
        goblins.push(k);

        runSimulation(100);

        expect(u.isDead).toBe(false);
        expect(k.isDead).toBe(true);
        console.log(`Survivor: Knight (HP ${u.hp}) vs King (Dead)`);
    });

    it('Scenario 6: King vs 20 Workers (Workers Swarm)', () => {
        console.log('\n[Scenario 6] King vs 20 Workers');
        const k = new Goblin(mockScene, mockTerrain, 15, 15, 'king');
        goblins.push(k);

        for (let i = 0; i < 20; i++) {
            const u = new Unit(mockScene, mockTerrain, 12, 12, 'worker');
            units.push(u);
        }

        runSimulation(100);

        const survivors = units.filter(u => !u.isDead).length;
        expect(k.isDead).toBe(true);
        expect(survivors).toBeGreaterThan(10);
        console.log(`Survivors -> Workers: ${survivors}, King: Dead`);
    });

    it('Scenario 7: Shaman vs 1 Worker (Shaman Snipes)', () => {
        console.log('\n[Scenario 7] Shaman vs 1 Worker');
        const u = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        units.push(u);
        const s = new Goblin(mockScene, mockTerrain, 18, 18, 'shaman');
        goblins.push(s);

        runSimulation(200);

        expect(u.isDead).toBe(true);
        console.log(`Survivor: Shaman`);
    });

    it('Scenario 9: Building Class House Defense', () => {
        console.log('\n[Scenario 9] Building Class Defense Check');
        const house = new Building(mockScene, mockTerrain, 'house', 10, 10);
        house.population = 10;
        house.userData.population = 10;
        house.userData.faction = 'player';
        mockTerrain.buildings.push(house);

        for (let i = 0; i < 3; i++) {
            const g = new Goblin(mockScene, mockTerrain, 11, 11, 'normal');
            goblins.push(g);
        }

        runSimulation(150);

        const survivingGoblins = goblins.filter(g => !g.isDead).length;
        console.log(`Survivors -> Goblins: ${survivingGoblins}, House Pop: ${house.population}`);

        expect(survivingGoblins).toBe(0);
        expect(house.population).toBeGreaterThan(0);
    });
});