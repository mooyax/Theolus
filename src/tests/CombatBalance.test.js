
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Terrain } from '../Terrain.js';

// Mocks
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class { render() { } setSize() { } },
        Vector3: actual.Vector3,
        Sphere: actual.Sphere,
        Quaternion: actual.Quaternion,
        // Mock Group with position and add/remove
        Group: class {
            constructor() { this.position = { set: vi.fn(), copy: vi.fn() }; this.rotation = { set: vi.fn() }; }
            add() { }
            remove() { }
        },
        // Mock Geometries with translate
        BoxGeometry: class { translate() { } },
        ConeGeometry: class { translate() { } },
        CylinderGeometry: class { translate() { } },
        MeshLambertMaterial: class { },
        MeshStandardMaterial: class { },
        Mesh: class { constructor() { this.position = { set: vi.fn(), copy: vi.fn() }; this.rotation = { set: vi.fn() }; } },
        CanvasTexture: class { constructor() { } }
    };
});

// Mock Managers
vi.mock('../Terrain.js', () => ({
    Terrain: class {
        constructor() {
            this.buildings = [];
            this.clippingPlanes = [];
            this.width = 100;
            this.depth = 100;
            this.grid = [];
            for (let i = 0; i < 50; i++) {
                this.grid[i] = [];
                for (let j = 0; j < 50; j++) {
                    this.grid[i][j] = { hasBuilding: false };
                }
            }
        }
        registerEntity() { }
        unregisterEntity() { }
        getInterpolatedHeight() { return 10; }
        getTileHeight() { return 10; }
        gridToWorld(v) { return v; }
        getVisualPosition() { return { x: 0, y: 0, z: 0 }; }
    }
}));

vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { } }));
vi.mock('../InputManager.js', () => ({ InputManager: class { } }));
vi.mock('../SoundManager.js', () => ({ SoundManager: class { } }));
vi.mock('../BattleMemory.js', () => ({ BattleMemory: class { } }));


describe('Combat Balance Simulation', () => {
    let terrain;
    let scene = { add: vi.fn(), remove: vi.fn() };

    beforeEach(() => {
        // Mock global window
        global.window = {
            game: {
                soundManager: { playSound: vi.fn() },
                inputManager: {},
                goblinManager: {}
            }
        };
        global.game = global.window.game;
        global.document = {
            createElement: () => ({
                width: 64, height: 64,
                getContext: () => ({
                    fillStyle: '',
                    fillRect: vi.fn(),
                    translate: vi.fn(),
                    rotate: vi.fn(),
                    beginPath: vi.fn(),
                    moveTo: vi.fn(),
                    lineTo: vi.fn(),
                    stroke: vi.fn(),
                    fill: vi.fn(),
                    arc: vi.fn(),
                    closePath: vi.fn(),
                    save: vi.fn(),
                    restore: vi.fn(),
                    clearRect: vi.fn()
                })
            })
        };

        terrain = new Terrain(); // Use Mocked Class
    });

    it('Knight vs Single Goblin (1v1) - AI Logic Check', () => {
        const knight = new Unit(scene, terrain, 0, 0, 'knight');
        knight.game = global.window.game;

        const goblin = new Goblin(scene, terrain, 0, 0, 'normal');
        goblin.game = global.window.game;
        goblin.gridX = 1; goblin.gridZ = 1; // Close by

        let time = 0;
        const dt = 0.1;

        try {
            while (time < 10 && !knight.isDead && !goblin.isDead) { // 10s limit

                // Knight AI Update
                // signature: updateLogic(time, deltaTime, isNight, goblins, fishes, sheeps, birds)
                knight.updateLogic(time, dt, false, [goblin], [], [], []);

                // Goblin Logic (Manual for now, or just assume it attacks)
                if (!goblin.isDead) {
                    if (goblin.attackCooldown > 0) goblin.attackCooldown -= dt;
                    if (goblin.attackCooldown <= 0) {
                        knight.takeDamage(goblin.damage);
                        goblin.attackCooldown = goblin.attackRate;
                    }
                }
                time += dt;
            }
        } catch (e) {
            expect.fail(`AI CRASH: ${e.message} \n ${e.stack}`);
        }

        // If Knight is Idle, he didn't attack.
        // Goblin HP should be < max.
        console.log(`[AI CHECK] KnightAction: ${knight.action} GoblinHP: ${goblin.hp}`);
        expect(goblin.hp).toBeLessThan(goblin.maxHp);
        expect(goblin.isDead).toBe(true);
    });

    it('Wizard vs Single Goblin (1v1) - Wizard should win', () => {
        const wizard = new Unit(scene, terrain, 0, 0, 'wizard');
        wizard.game = global.window.game;

        const goblin = new Goblin(scene, terrain, 0, 0, 'normal');
        goblin.game = global.window.game;

        let time = 0;
        const dt = 0.1;
        try {
            while (time < 15 && !wizard.isDead && !goblin.isDead) {
                if (wizard.attackCooldown > 0) wizard.attackCooldown -= dt;
                if (wizard.attackCooldown <= 0) {
                    wizard.attackGoblin(goblin);
                }

                if (!goblin.isDead) {
                    if (goblin.attackCooldown > 0) goblin.attackCooldown -= dt;
                    if (goblin.attackCooldown <= 0) {
                        wizard.takeDamage(goblin.damage);
                        goblin.attackCooldown = goblin.attackRate;
                    }
                }
                time += dt;
            }
        } catch (e) { expect.fail(`Wiz CRASH: ${e.message}`); }

        expect(goblin.isDead).toBe(true);
    });

    it('Knight vs Swarm (1v5) - Knight should surviving', () => {
        const knight = new Unit(scene, terrain, 0, 0, 'knight');
        knight.game = global.window.game;

        // 5 Goblins
        const goblins = [];
        for (let i = 0; i < 5; i++) {
            const g = new Goblin(scene, terrain, 0, 0, 'normal');
            g.game = global.window.game;
            g.id = `g${i}`;
            goblins.push(g);
        }

        let time = 0;
        const dt = 0.1;

        try {
            while (time < 20 && !knight.isDead && goblins.some(g => !g.isDead)) {

                // Knight Logic: Auto-target nearest living goblin
                if (knight.attackCooldown > 0) knight.attackCooldown -= dt;

                if (knight.attackCooldown <= 0) {
                    const target = goblins.find(g => !g.isDead);
                    if (target) {
                        knight.attackGoblin(target);
                    }
                }

                // Goblins Logic (All attack Knight)
                goblins.forEach(g => {
                    if (!g.isDead) {
                        if (g.attackCooldown > 0) g.attackCooldown -= dt;
                        if (g.attackCooldown <= 0) {
                            knight.takeDamage(g.damage);
                            g.attackCooldown = g.attackRate;
                        }
                    }
                });

                time += dt;
            }
        } catch (e) {
            expect.fail(`Swarm CRASH: ${e.message} \n ${e.stack}`);
        }

        const deadCount = goblins.filter(g => g.isDead).length;
        // Verify death count to see where it failed
        if (deadCount !== 5) {
            console.log(`[SWARM] Failed. Dead: ${deadCount}/5. Result: ${deadCount === 5 ? 'Success' : 'Fail'}`);
        }

        expect(deadCount).toBe(5);
        expect(knight.isDead).toBe(false);
    });


    it('Load Game Persistence - Should resume movement', () => {
        // 1. Create moving unit
        const u1 = new Unit(scene, terrain, 0, 0, 'knight');
        u1.game = global.window.game;
        u1.triggerMove(10, 10, 1000); // Start moving to 10,10 at t=1000
        u1.updateLogic(1500, 100, false, [], [], [], []); // Move 0.5s

        expect(u1.isMoving).toBe(true);
        expect(u1.gridX).toBe(0); // Animation only triggers later logic

        // 2. Serialize
        const data = u1.serialize();

        // 3. Deserialize
        const u2 = Unit.deserialize(data, scene, terrain);
        u2.game = global.window.game;

        // Verify Restoration
        // Verify Restoration
        expect(u2.isMoving).toBe(true);
        // Note: triggerMove calculates NEXT TILE, not final destination.
        // From 0,0 to 10,10. dx=10, dz=10. 10 > 10 is false. Z increments.
        expect(u2.targetGridX).toBe(0);
        expect(u2.targetGridZ).toBe(1);
        expect(u2.moveStartTime).toBe(1000); // CRITICAL: Must be preserved

        // 4. Update Logic (Simulate next frame after load)
        // Time = 1600 (loaded time)
        u2.updateLogic(1600, 100, false, [], [], [], []);

        // Should STILL be moving
        expect(u2.isMoving).toBe(true);
        // And position should update
        // 1600 - 1000 = 600ms.
        // Duration ~ 10000ms.
        // So progress ~ 6%.
        // It should NOT be at target.
        expect(u2.gridX).toBeLessThan(10);
    });
});
