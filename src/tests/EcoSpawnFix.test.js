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

describe('Economy and Spawning Fix Verification', () => {
    let game;

    beforeEach(async () => {
        // Create game instance in minimal mode with real Terrain logic
        const scene = new THREE.Scene();
        // Use real Terrain but it will use the mocked THREE
        const terrain = new Terrain(scene, [], 80, 80);

        // Use minimal=false to ensure Managers are initialized (mocked locally)
        game = new Game(scene, terrain, false);
        await game.readyPromise;

        // 1. Ensure a safe building zone (Land, flat)
        for (let x = 5; x < 30; x++) {
            for (let z = 5; z < 30; z++) {
                game.terrain.setHeight(x, z, 5);
                game.terrain.grid[x][z].type = 'grass';
            }
        }
        game.terrain.updateMesh();

        game.gameActive = true;
        game.resources.grain = 1000;
        window.isTest = true;

        // 2. Ensure at least one cave exists for goblin/spawning tests
        if (game.goblinManager.caves.length === 0) {
            game.goblinManager.generateCaves(1);
        }

        // Mock camera for safety
        game.camera = { position: new THREE.Vector3() };
    });

    afterEach(() => {
        if (game) game.stopped = true;
        vi.restoreAllMocks();
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
            if (i % 10 === 0) {
                console.log(`[TEST DEBUG] Update ${i}, Grain: ${game.resources.grain}, Farm Pop: ${farm.userData.population}`);
            }
        }

        console.log(`[TEST DEBUG] Final Grain: ${game.resources.grain}`);
        expect(game.resources.grain).toBeGreaterThan(initialGrain);
    });

    it('should allow goblin huts to reach spawn threshold', async () => {
        // Prevent Game Over from 0 player units
        game.terrain.addBuilding('house', 10, 10, true, false, 'player');

        // 1. Setup a goblin hut
        // ゲッター経由のため、EntityManager側をクリアする
        game.entityManager.goblins.length = 0;
        game.terrain.addBuilding('goblin_hut', 20, 20, false, false, 'enemy');
        const hut = game.terrain.buildings.find(b => b.userData.type === 'goblin_hut');
        expect(hut).toBeDefined();

        // 2. Simulate growth
        hut.userData.population = 10;
        if (hut.population !== undefined) hut.population = 10;

        // Update enough times to pass threshold (10.0)
        // GoblinManager handles real spawning, and when it happens, population is reset.
        // So we check if a goblin was spawned instead of checking for pop >= 10.
        for (let i = 0; i < 100; i++) {
            game.update(0.5);
            if (i % 20 === 0) {
                console.log(`[TEST DEBUG] Update ${i}, Hut Pop: ${hut.userData.population}, Goblins: ${game.goblinManager.goblins.length}`);
            }
        }

        // We expect at least one goblin to be born.
        expect(game.goblinManager.goblins.length).toBeGreaterThan(0);
        console.log(`[TEST] Goblins count: ${game.goblinManager.goblins.length} `);
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
        console.log(`[TEST] Dead unit finalized: isFinished = ${ unit.isFinished } `);
    });
    */
});