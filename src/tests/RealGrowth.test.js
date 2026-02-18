import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { Building } from '../Building';
import { WeatherManager } from '../WeatherManager';
import { GameConfig } from '../config/GameConfig';
import * as THREE from 'three';

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

describe('Real Growth Stagnation Diagnostic', () => {
    let game;
    let scene;
    let terrain;

    beforeEach(async () => {
        scene = new THREE.Scene();
        // 実際の Terrain クラスを使用
        terrain = new Terrain(scene, [], 80, 80);

        // 地面を平らにして建設可能にする
        for (let x = 0; x < 80; x++) {
            for (let z = 0; z < 80; z++) {
                if (terrain.grid[x] && terrain.grid[x][z]) {
                    terrain.grid[x][z].height = 5;
                }
            }
        }

        // minimal = false にして実機に近い状態にする (staggerCount=20)
        game = new Game(scene, terrain, false);
        game.gameActive = true;
        game.resources.grain = 1000;

        // 描画関連のプロパティが undefined でエラーにならないようモック
        game.camera = { position: new THREE.Vector3() };
    });

    it('should show population growth for houses with 20x stagger', async () => {
        // 1. 家を追加
        const b = game.terrain.addBuilding('house', 10, 10, true, false, 'player');
        expect(b.userData.type).toBe('house');
        expect(b.population).toBe(0);

        // 20フレーム分回す
        try {
            console.log('[TEST DIAG] Before loop');
            for (let i = 0; i < 40; i++) {
                game.update(0.1);
            }
            console.log('[TEST DIAG] After loop');
        } catch (e) {
            console.error('[TEST ERROR] Update failed', e);
        }

        // 20フレーム経過後、少なくとも1回は人口が増えているはず
        console.log(`[DIAG] House population after 40 frames (dt=0.1): ${b.population}`);
        expect(b.population).toBeGreaterThan(0);
    });

    it('should show house population growth with small deltaTime (1/60s)', async () => {
        const b = game.terrain.addBuilding('house', 20, 20, true, false, 'player');

        // 600フレーム (10秒分) 回す
        try {
            for (let i = 0; i < 600; i++) {
                game.update(1 / 60);
            }
        } catch (e) {
            console.error('[TEST ERROR] Small dt loop failed', e);
        }

        console.log(`[DIAG] House population after 10s (dt=1/60s): ${b.population}`);
        expect(b.population).toBeGreaterThan(0);
    });

    // ... (other tests follow same pattern but I will replace the whole file content to be safe and cleaner)
    it('should produce grain from farms with 20x stagger', async () => {
        // 1. 農場を追加
        const farm = game.terrain.addBuilding('farm', 15, 15, true, false, 'player');
        farm.population = 90; // あと少しで収穫
        const initialGrain = game.resources.grain;

        try {
            for (let i = 0; i < 40; i++) {
                game.update(0.5);
            }
        } catch (e) {
            console.error('[TEST ERROR] Farm loop failed', e);
        }

        console.log(`[DIAG] Farm population: ${farm.population}, Grain: ${game.resources.grain}`);
        expect(game.resources.grain).toBeGreaterThan(initialGrain);
    });

    it('should show population growth for goblin caves', async () => {
        const cave = game.terrain.addBuilding('cave', 50, 50, true, false, 'enemy');
        cave.population = 0;
        console.log('[TEST MAG] Cave created.', cave);

        try {
            for (let i = 0; i < 100; i++) {
                game.update(0.5);
                if (i % 20 === 0) console.log(`[TEST LOOP] i=${i}, Pop=${cave.population}`);
            }
        } catch (e) {
            console.error('[TEST ERROR] Cave loop failed', e);
        }

        console.log(`[DIAG] Cave population after 100 frames: ${cave.population}`);
        expect(cave.population).toBeGreaterThan(0);
    });
});
