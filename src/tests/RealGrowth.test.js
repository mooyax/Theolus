
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { WeatherManager } from '../WeatherManager';
import * as THREE from 'three';

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

describe('Real Growth Stagnation Diagnostic', () => {
    let game;
    let scene;
    let terrain;

    beforeEach(async () => {
        scene = new THREE.Scene();
        terrain = new Terrain(scene, [], 80, 80);

        for (let x = 0; x < 80; x++) {
            for (let z = 0; z < 80; z++) {
                if (terrain.grid[x] && terrain.grid[x][z]) {
                    terrain.grid[x][z].height = 5;
                }
            }
        }

        game = new Game(scene, terrain, false);
        game.gameActive = true;
        game.resources.grain = 1000;
        game.camera = { position: new THREE.Vector3() };
    });

    afterEach(() => {
        if (game) game.stopped = true;
        vi.restoreAllMocks();
    });

    it('should show population growth for houses with 20x stagger', async () => {
        const b = game.terrain.addBuilding('house', 10, 10, true, false, 'player');
        expect(b.userData.type).toBe('house');
        expect(b.population).toBe(0);

        for (let i = 0; i < 40; i++) {
            game.update(0.1);
        }

        expect(b.population).toBeGreaterThan(0);
    });

    it('should show house population growth with small deltaTime (1/60s)', async () => {
        const b = game.terrain.addBuilding('house', 20, 20, true, false, 'player');

        for (let i = 0; i < 600; i++) {
            game.update(1 / 60);
        }

        expect(b.population).toBeGreaterThan(0);
    });

    it('should produce grain from farms with 20x stagger', async () => {
        const farm = game.terrain.addBuilding('farm', 15, 15, true, false, 'player');
        farm.population = 90;
        const initialGrain = game.resources.grain;

        for (let i = 0; i < 40; i++) {
            game.update(0.5);
        }

        expect(game.resources.grain).toBeGreaterThan(initialGrain);
    });

    it('should show population growth for goblin caves', async () => {
        const cave = game.terrain.addBuilding('cave', 50, 50, true, false, 'enemy');
        cave.population = 0;

        for (let i = 0; i < 100; i++) {
            game.update(0.5);
        }

        expect(cave.population).toBeGreaterThan(0);
    });
});