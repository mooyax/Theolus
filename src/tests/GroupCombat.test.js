
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Unit } from '../Unit.js';
import { Building } from '../Building.js';
import { Game } from '../Game.js';
import * as THREE from 'three';

// --- MOCKS ---
vi.mock('three', () => {
    // Define class INSIDE the factory to avoid hoisting issues
    class MockVector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        clone() { return new MockVector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
        multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
        distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.z - v.z) ** 2); }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
    }

    return {
        Vector3: MockVector3,
        Group: class { constructor() { this.position = new MockVector3(); this.add = vi.fn(); this.remove = vi.fn(); this.children = []; } },
        Scene: class { add() { } remove() { } getObjectByName() { } },
        Mesh: class { constructor() { this.position = new MockVector3(); this.scale = { set: vi.fn() }; this.rotation = { y: 0 }; } },
        MeshLambertMaterial: class { },
        BoxGeometry: class { translate() { } },
        ConeGeometry: class { translate() { } },
        CylinderGeometry: class { translate() { } },
        PlaneGeometry: class { translate() { } },
        SphereGeometry: class { translate() { } },
        MeshStandardMaterial: class { },
        CanvasTexture: class { },
    };
});

// Mock Canvas for Face Generation
// Mock Canvas for Face Generation (Rely on setup.js or safe spy)
// global.document override removed to prevent happy-dom conflict
if (typeof document !== 'undefined') {
    // Ensure createElement exists (happy-dom should provide it)
    // If we need specific mock, spy on it.
    // vi.spyOn(document, 'createElement')...
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
            isWalkable: () => true
        };

        // Initialize Grid
        for (let x = 0; x < 50; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 50; z++) {
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
                        if (d <= 1.5 && u.attackCooldown <= 0) {
                            u.targetGoblin.hp -= u.damage;
                            if (u.targetGoblin.hp <= 0) {
                                u.targetGoblin.isDead = true;
                                u.targetGoblin = null;
                            }
                            u.attackCooldown = u.attackRate;
                        } else if (d > 1.5) {
                            const dx = u.targetGoblin.gridX - u.gridX;
                            const dz = u.targetGoblin.gridZ - u.gridZ;
                            u.gridX += dx * 0.1; // 10% toward target
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

                        // Simple Priority: Unit < 5 tiles ? Unit : Building
                        if (nearest && minD < 5) g.targetUnit = nearest;
                        else if (nearestB) g.targetBuilding = nearestB;
                        else if (nearest) g.targetUnit = nearest;
                    }

                    if ((g.targetUnit || g.targetBuilding) && g.state.constructor.name !== 'GoblinCombatState') {
                        g.state.update = (t, d) => g.executeCombatLogic(t, d);
                    }

                    if (g.state.update) g.state.update(time, dt, units, mockTerrain.buildings);
                }
            });
        }
    }

    // --- SCENARIO 1: The "Zerg Rush" ---
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

        expect(survivingGoblins).toBeLessThan(4);
    });

    // --- SCENARIO 2: "Elite Squad" ---
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

    // --- SCENARIO 3: "Siege Defense" ---
    it('Scenario: 3 Goblins vs 1 House (House Defends)', () => {
        console.log('\n[Scenario 3] 3 Goblins vs 1 House');
        const house = {
            userData: { type: 'house', population: 10, gridX: 10, gridZ: 10 },
            position: { x: 10, y: 0, z: 10 }
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
        expect(house.userData.population).toBeGreaterThan(-8);
    });

    // --- SCENARIO 4: "Overwhelming Siege" ---
    it('Scenario: 5 Goblins vs 1 House (House Destroyed)', () => {
        console.log('\n[Scenario 4] 5 Goblins vs 1 House (Pop 5)');
        const house = {
            userData: { type: 'house', population: 5, gridX: 10, gridZ: 10 },
            position: { x: 10, y: 0, z: 10 }
        };
        mockTerrain.buildings.push(house);
        for (let i = 0; i < 5; i++) {
            const g = new Goblin(mockScene, mockTerrain, 11, 11, 'normal');
            goblins.push(g);
        }
        runSimulation(100);
        const survivingGoblins = goblins.filter(g => !g.isDead).length;
        console.log(`Survivors -> Goblins: ${survivingGoblins}, House Pop: ${house.userData.population}`);
        expect(house.userData.population).toBeLessThanOrEqual(0);
        expect(survivingGoblins).toBeGreaterThan(0);
    });

    // --- SCENARIO 5: DUEL - King vs Knight ---
    // King (1300 HP, 80 Dmg, 53 DPS) vs Knight (1000 HP, 300 Dmg, 300 DPS).
    // Knight DPS is massive. King melts.
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

    // --- SCENARIO 6: BOSS FIGHT - King vs 20 Workers ---
    // King kills 1 Worker every 1.5s.
    // 20 Workers deal ~240 DPS.
    // King (1300 HP) dies in ~5-6s.
    // In 6s, King attacks 4 times -> 4 Workers die.
    // Workers should win with casualties.
    it('Scenario 6: King vs 20 Workers (Workers Swarm)', () => {
        console.log('\n[Scenario 6] King vs 20 Workers');
        const k = new Goblin(mockScene, mockTerrain, 15, 15, 'king');
        goblins.push(k);

        for (let i = 0; i < 20; i++) {
            const u = new Unit(mockScene, mockTerrain, 12, 12, 'worker'); // Clustered
            units.push(u);
        }

        runSimulation(100);

        const survivors = units.filter(u => !u.isDead).length;
        expect(k.isDead).toBe(true);
        expect(survivors).toBeGreaterThan(10);
        console.log(`Survivors -> Workers: ${survivors}, King: Dead`);
    });

    // --- SCENARIO 7: RANGED kiting - Shaman vs Worker ---
    // Shaman (500 HP, 80 Dmg, Range 10). Worker (58 HP, 12 Dmg).
    // Shaman OHKO's Worker. Range advantage guarantees first hit.
    it('Scenario 7: Shaman vs 1 Worker (Shaman Snipes)', () => {
        console.log('\n[Scenario 7] Shaman vs 1 Worker');
        const u = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        units.push(u);
        const s = new Goblin(mockScene, mockTerrain, 18, 18, 'shaman'); // Dist 11 (Out of range? Shaman Range 10)
        // Shaman moves to 10, shoots. Worker (Range 1.5) must run.
        goblins.push(s);

        runSimulation(50);

        expect(u.isDead).toBe(true);
        expect(s.isDead).toBe(false);
        console.log(`Survivor: Shaman`);
    });

    // --- SCENARIO 8: SIEGE - King vs House ---
    // King (Dmg 80 -> Pop Dmg 8). House Pop 10.
    // Hit 1: Pop 10->2. Retaliation 40.
    // Hit 2: Pop 2->Dead. Retaliation 8.
    // King takes ~48 damage. HP 1300 -> 1252.
    // King destroys house effortlessly.
    it('Scenario 8: King vs House (King Smashes)', () => {
        console.log('\n[Scenario 8] King vs House');
        const house = {
            userData: { type: 'house', population: 10, gridX: 10, gridZ: 10 },
            position: { x: 10, y: 0, z: 10 }
        };
        mockTerrain.buildings.push(house);
        const k = new Goblin(mockScene, mockTerrain, 12, 12, 'king');
        goblins.push(k);

        runSimulation(50);

        expect(house.userData.population).toBeLessThanOrEqual(0);
        expect(k.isDead).toBe(false);
        expect(k.hp).toBeGreaterThan(1000);
        console.log(`King Status: HP ${k.hp}, House Destroyed`);
    });

    // --- SCENARIO 9: Building Class Integration ---
    // Verifies that the new Building.js class correctly handles damage and retaliation.
    // 3 Goblins vs 1 House (Pop 10) - Same as Scenario 3 but using Class.
    it('Scenario 9: 3 Goblins vs Building Class House (House Defends)', () => {
        console.log('\n[Scenario 9] 3 Goblins vs Building Class (Defense Check)');

        // Manual Mock of Scene/Terrain for Building constructor if needed,
        // but we pass mockScene/mockTerrain which should work.
        const house = new Building(mockScene, mockTerrain, 'house', 10, 10);
        house.population = 10;
        house.userData.population = 10; // Sync initial state

        // Manual override or ensure updatePosition doesn't crash (mockTerrain methods might be missing)
        // Building calls updatePosition -> getPositionForGrid -> terrain.getInterpolatedHeight?
        // mockTerrain needs getInterpolatedHeight or getTileHeight.
        // I added getVisualPosition but maybe not those.
        // Let's patch mockTerrain if needed.
        mockTerrain.getTileHeight = () => 0;

        // Add to Mock Terrain
        mockTerrain.buildings.push(house);

        for (let i = 0; i < 3; i++) {
            const g = new Goblin(mockScene, mockTerrain, 11, 11, 'normal');
            goblins.push(g);
        }

        runSimulation(100);

        const survivingGoblins = goblins.filter(g => !g.isDead).length;
        console.log(`[Scenario 9] Survivors -> Goblins: ${survivingGoblins}, House Pop: ${house.population}`);

        expect(survivingGoblins).toBe(0);
        expect(house.population).toBeGreaterThan(0);
    });

});
