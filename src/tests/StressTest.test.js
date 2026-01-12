import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { GoblinManager } from '../GoblinManager.js';
import * as THREE from 'three';

// --- MOCKS ---
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: vi.fn(function () {
            return {
                setSize: vi.fn(),
                render: vi.fn(),
                domElement: document.createElement('canvas'),
                shadowMap: { enabled: true, type: 0 },
                setPixelRatio: vi.fn(),
                dispose: vi.fn(), // Fix dispose error
            };
        }),
        TextureLoader: vi.fn(function () {
            return {
                load: vi.fn().mockReturnValue({ encoding: 3001 }) // sRGBEncoding
            };
        }),
        AudioListener: vi.fn(function () {
            return { position: { set: vi.fn() }, rotation: { set: vi.fn() } };
        }),
        Audio: vi.fn(function () {
            return { setBuffer: vi.fn(), setLoop: vi.fn(), setVolume: vi.fn(), play: vi.fn() };
        }),
        AudioLoader: vi.fn(function () {
            return { load: vi.fn() };
        })
    };
});

// Mock Canvas Context globally
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    clearRect: vi.fn(),
    strokeRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    arc: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    rotate: vi.fn(),
    closePath: vi.fn(),
    arcTo: vi.fn(),
    fillText: vi.fn(),
    strokeText: vi.fn(),
    measureText: vi.fn(() => ({ width: 10 })),
    setTransform: vi.fn(),
    createImageData: vi.fn((w, h) => ({
        width: w,
        height: h,
        data: new Uint8ClampedArray(w * h * 4)
    })),
    putImageData: vi.fn(),
});

describe('Large Scale Stress Testing (Phase 26)', () => {
    let game;

    beforeEach(async () => {
        vi.setConfig({ testTimeout: 30000 }); // Increase timeouts
        vi.useFakeTimers();

        // Mock requestAnimationFrame to prevent infinite loop in constructor
        vi.stubGlobal('requestAnimationFrame', (cb) => {
            // Do nothing, we will call animate manually
            return 1;
        });

        document.body.innerHTML = '<div id="game-container"></div><div id="ui-layer"></div><canvas id="minimap"></canvas>';

        // Reset Mocks
        vi.clearAllMocks();

        // Mock Terrain FIRST
        const mockTerrain = {
            width: 160,
            depth: 160,
            getHeight: () => 0,
            isWalkable: () => true,
            findPath: (start, end) => {
                // Simulate pathfinding load: Return a direct line path of ~20 nodes
                const path = [];
                const steps = 20;
                for (let i = 0; i <= steps; i++) {
                    path.push({ x: start.x + (end.x - start.x) * (i / steps), z: start.z + (end.z - start.z) * (i / steps) });
                }
                return path;
            },
            getRandomPointInRegion: () => ({ x: Math.random() * 150 + 5, z: Math.random() * 150 + 5 }),
            checkFlatArea: () => true,
            getRegion: () => 1,
            update: () => { },// Mock update
            updateMeshPosition: () => { },
            updateLights: () => { },
            getBuildingAt: () => null,
            addBuilding: () => console.log('[Terrain] Building Added (Mock)'),
            removeBuilding: () => { },
            getBiomeColor: () => '#00ff00', // For Minimap if called
            getTileHeight: () => 0, // For SheepManager
            gridToWorld: (v) => v,
            worldToGrid: (v) => v,
            registerEntity: () => { },
            unregisterEntity: () => { },
            clippingPlanes: []
        };

        // Initialize Game (Minimal to skip heavy init) with Mock Terrain
        game = new Game(null, mockTerrain, true);
        window.game = game;

        // Inject Real GoblinManager (but using mocked terrain)
        game.goblinManager = new GoblinManager(game.scene, game.terrain, game.particleManager);

        // Wait for async initialization (Removed blocking wait with fake timers)
        // await new Promise(resolve => setTimeout(resolve, 100));

    }, 30000);

    afterEach(() => {
        if (game) game.dispose();
        vi.useRealTimers();
        window.game = null;
    });

    it('should handle 200 units and 50 goblins without crashing (Spawn Storm)', async () => {
        const UNIT_COUNT = 200;
        const GOBLIN_COUNT = 50;
        const SIM_FRAMES = 100; // Define SIM_FRAMES

        console.log(`[Stress] Spawning ${UNIT_COUNT} Units...`);
        for (let i = 0; i < UNIT_COUNT; i++) {
            const u = new Unit(game.scene, game.terrain, 10, 10, 'worker');
            game.units.push(u);
        }

        console.log(`[Stress] Spawning ${GOBLIN_COUNT} Goblins...`);
        for (let i = 0; i < GOBLIN_COUNT; i++) {
            // Manually spawn goblins via manager to bypass wave timer
            game.goblinManager.spawnGoblin(Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 'goblin');
        }

        // Assert counts
        expect(game.units.length).toBe(UNIT_COUNT);
        // Note: GoblinManager logic might throttle spawns, but let's check length after force spawn
        // Actually spawnGoblinForRaid pushes directly.
        expect(game.goblinManager.goblins.length).toBeGreaterThanOrEqual(GOBLIN_COUNT);

        console.log(`[Stress] Running Simulation Loop for ${SIM_FRAMES} Frames...`);
        const startTime = performance.now();

        for (let frame = 0; frame < SIM_FRAMES; frame++) {
            vi.advanceTimersByTime(16); // 16ms/frame
            game.animate();

            // Periodically force random movement to stress pathfinding
            if (frame % 20 === 0) {
                game.units.forEach(u => {
                    if (!u.isMoving) {
                        const target = game.terrain.getRandomPointInRegion();
                        u.smartMove(target.x, target.z, 0);
                    }
                });
            }
        }

        const endTime = performance.now();
        console.log(`[Stress] 100 Frames completed in ${(endTime - startTime).toFixed(2)}ms (Simulated)`);

        // Pass if we reached here without error
        expect(true).toBe(true);
    });

    it('should complete a 60-second simulation with 100 colliding entities (Chaos Test)', () => {
        // Setup
        for (let i = 0; i < 50; i++) game.units.push(new Unit(game.scene, game.terrain, 50, 50, 'knight'));
        for (let i = 0; i < 50; i++) game.goblinManager.spawnGoblin(10 + i * 2, 10 + i * 2, 'clan_chaos');

        console.log('[Stress] Starting 60s Chaos Simulation...');

        // Run for 60 seconds (approx 3600 frames)
        // We'll advance in larger chunks for speed in test environment
        const CHUNK_MS = 1000;
        for (let s = 0; s < 60; s++) {
            vi.advanceTimersByTime(CHUNK_MS);
            // Call animate adequately to process logic
            // In unit tests, we call it fewer times to save CPU instructions, but enough to trigger logic
            for (let f = 0; f < 10; f++) game.animate();
        }

        // Check survival or at least existence of array
        const livingUnits = game.units.filter(u => !u.isDead).length;
        const livingGoblins = game.goblinManager.goblins.filter(g => !g.isDead).length;

        console.log(`[Stress] Chaos Result: ${livingUnits} Units vs ${livingGoblins} Goblins alive.`);
        expect(game.units).toBeDefined();
    });
});
