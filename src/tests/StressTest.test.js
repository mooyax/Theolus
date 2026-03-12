
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { GoblinManager } from '../GoblinManager.js';
import * as THREE from 'three';

// --- MOCKS ---
if (typeof HTMLCanvasElement !== 'undefined') {
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
        createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
        createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() }))
    });
}

describe('Large Scale Stress Testing (Phase 26)', () => {
    let game;

    beforeEach(async () => {
        vi.setConfig({ testTimeout: 30000 });
        vi.useFakeTimers();

        vi.stubGlobal('requestAnimationFrame', (cb) => 1);
        document.body.innerHTML = '<div id="game-container"></div><div id="ui-layer"></div><canvas id="minimap"></canvas>';

        vi.clearAllMocks();

        const mockTerrain = {
            findBestTarget: vi.fn(() => null),
            width: 160,
            depth: 160,
            getHeight: () => 0,
            isWalkable: () => true,
            findPath: (start, end) => {
                const path = [];
                const steps = 20;
                for (let i = 0; i <= steps; i++) {
                    path.push({ x: start.x + (end.x - start.x) * (i / steps), z: start.z + (end.z - start.z) * (i / steps) });
                }
                return path;
            },
            findPathAsync: (start, end) => {
                const path = [];
                const steps = 20;
                for (let i = 0; i <= steps; i++) {
                    path.push({ x: start.x + (end.x - start.x) * (i / steps), z: start.z + (end.z - start.z) * (i / steps) });
                }
                return Promise.resolve(path);
            },
            getRandomPointInRegion: () => ({ x: Math.random() * 150 + 5, z: Math.random() * 150 + 5 }),
            checkFlatArea: () => true,
            isReachable: () => true,
            getRegion: () => 1,
            update: () => { },
            updateMeshPosition: () => { },
            updateLights: () => { },
            getBuildingAt: () => null,
            addBuilding: () => { },
            removeBuilding: () => { },
            getBiomeColor: () => '#00ff00',
            getTileHeight: () => 0,
            gridToWorld: (v) => v,
            worldToGrid: (v) => v,
            registerEntity: () => { },
            unregisterEntity: () => { },
            clippingPlanes: []
        };

        game = new Game(null, mockTerrain, true);
        window.game = game;
        game.goblinManager = new GoblinManager(game.scene, game.terrain, game, []);
    });

    afterEach(() => {
        if (game) game.dispose();
        vi.useRealTimers();
        window.game = null;
    });

    it('should handle 200 units and 50 goblins without crashing (Spawn Storm)', async () => {
        const UNIT_COUNT = 200;
        const GOBLIN_COUNT = 50;
        const SIM_FRAMES = 100;

        for (let i = 0; i < UNIT_COUNT; i++) {
            const u = new Unit(game.scene, game.terrain, 10, 10, 'worker');
            game.entityManager.register(u);
        }

        for (let i = 0; i < GOBLIN_COUNT; i++) {
            game.goblinManager.spawnGoblin(Math.floor(Math.random() * 50), Math.floor(Math.random() * 50), 'goblin');
        }

        expect(game.units.length).toBe(UNIT_COUNT);
        expect(game.goblinManager.goblins.length).toBeGreaterThanOrEqual(GOBLIN_COUNT);

        for (let frame = 0; frame < SIM_FRAMES; frame++) {
            vi.advanceTimersByTime(16);
            game.animate();

            if (frame % 20 === 0) {
                game.units.forEach(u => {
                    if (!u.isMoving) {
                        const target = game.terrain.getRandomPointInRegion();
                        u.smartMove(target.x, target.z, 0);
                    }
                });
            }
        }
        expect(true).toBe(true);
    });

    it('should complete a 60-second simulation with 100 colliding entities (Chaos Test)', async () => {
        for (let i = 0; i < 50; i++) game.entityManager.register(new Unit(game.scene, game.terrain, 50, 50, 'knight'));
        for (let i = 0; i < 50; i++) game.goblinManager.spawnGoblin(10 + i * 2, 10 + i * 2, 'clan_chaos');

        const CHUNK_MS = 1000;
        for (let s = 0; s < 60; s++) {
            vi.advanceTimersByTime(CHUNK_MS);
            for (let f = 0; f < 10; f++) game.animate();
        }

        expect(game.units).toBeDefined();
    });
});