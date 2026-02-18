import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import * as THREE from 'three';
import { WeatherManager } from '../WeatherManager';

// Explicitly mock WeatherManager in the test file
vi.mock('../WeatherManager', () => {
    return {
        WeatherManager: class {
            constructor() { }
            update() { }
            setWeather() { }
            updateSkyColor() { }
        }
    };
});

// Mock THREE and other dependencies if needed
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    class MockScene {
        add = vi.fn();
        remove = vi.fn();
        traverse = vi.fn();
        children = [];
    }
    return {
        ...actual,
        WebGLRenderer: vi.fn().mockImplementation(() => ({
            setSize: vi.fn(),
            render: vi.fn(),
            dispose: vi.fn(),
            domElement: document.createElement('canvas'),
            capabilities: { isWebGL2: false },
            getContext: vi.fn(() => ({})),
        })),
        Scene: MockScene,
    };
});

describe('Economy and Spawning Fix Verification', () => {
    let game;

    beforeEach(async () => {
        // Create game instance in minimal mode with real Terrain logic
        const scene = new THREE.Scene();
        // Use real Terrain but it will use the mocked THREE
        const terrain = new Terrain(scene, [], 80, 80);

        // IMPORTANT: Terrain defaults to height 0 (water). 
        // We must set height > 0 to allow building construction.
        for (let x = 0; x < 80; x++) {
            for (let z = 0; z < 80; z++) {
                if (terrain.grid[x] && terrain.grid[x][z]) {
                    terrain.grid[x][z].height = 5;
                }
            }
        }

        // Use minimal=false to ensure Managers are initialized (mocked locally)
        game = new Game(scene, terrain, false);
        game.gameActive = true;
        game.resources.grain = 1000; // Provide food to avoid starvation in tests

        // Mock camera for safety
        game.camera = { position: new THREE.Vector3() };
    });

    it('should produce grain from farms', async () => {
        // 1. Setup a farm
        game.terrain.addBuilding('farm', 10, 10, false, false, 'player');
        const farm = game.terrain.buildings.find(b => b.userData.type === 'farm');
        expect(farm).toBeDefined();

        // 2. Set high growth and simulate time
        farm.population = 95;
        const initialGrain = game.resources.grain;

        // Farm updates are staggered (1/20), so we need enough updates.
        for (let i = 0; i < 40; i++) {
            game.update(0.5); // 0.5s per update
        }

        expect(game.resources.grain).toBeGreaterThan(initialGrain);
    });

    it('should allow goblin huts to reach spawn threshold', async () => {
        // 1. Setup a goblin hut
        game.goblinManager.goblins = []; // Clear debug goblins
        game.terrain.addBuilding('goblin_hut', 20, 20, false, false, 'enemy');
        const hut = game.terrain.buildings.find(b => b.userData.type === 'goblin_hut');
        expect(hut).toBeDefined();

        // 2. Simulate growth
        hut.userData.population = 8;
        if (hut.population !== undefined) hut.population = 8;

        // Update enough times to pass threshold (10.0)
        // GoblinManager handles real spawning, and when it happens, population is reset.
        // So we check if a goblin was spawned instead of checking for pop >= 10.
        for (let i = 0; i < 100; i++) {
            game.update(0.5);
        }

        // We expect at least one goblin to be born.
        expect(game.goblinManager.goblins.length).toBeGreaterThan(0);
        console.log(`[TEST] Goblins count: ${game.goblinManager.goblins.length}`);
    });

    /*
    it('should finalize dead units via updateLogic', async () => {
        // 1. Create a unit and kill it
        const unit = game.spawnUnit(15, 15, 'worker');
        unit.die();
        expect(unit.isDead).toBe(true);
        expect(unit.isFinished).toBe(false);

        // 2. Create the cross
        unit.createCross();
        expect(unit.crossMesh).toBeDefined();

        // 3. Update logic multiple times
        // Death animation takes 3 seconds
        for (let i = 0; i < 10; i++) {
            game.update(0.5); // unit.updateLogic(time, 0.5, ...)
        }

        expect(unit.isFinished).toBe(true);
        expect(unit.crossMesh).toBeNull();
        console.log(`[TEST] Dead unit finalized: isFinished=${unit.isFinished}`);
    });
    */
});
