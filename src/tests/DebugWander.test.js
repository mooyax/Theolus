import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import * as THREE from 'three';

// Global THREE Mocks to prevent shader errors
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        ShaderMaterial: vi.fn().mockImplementation(function () { return { uniforms: {} }; }),
        MeshLambertMaterial: vi.fn().mockImplementation(function () { return {}; }),
        MeshStandardMaterial: vi.fn().mockImplementation(function () { return {}; }),
        CanvasTexture: vi.fn().mockImplementation(function () { return {}; }),
        WebGLRenderer: vi.fn().mockImplementation(function () {
            return {
                render: vi.fn(), setSize: vi.fn(), dispose: vi.fn(), setPixelRatio: vi.fn(), setClearColor: vi.fn(), shadowMap: { enabled: false }, domElement: document.createElement('div'),
            };
        }),
    };
});

describe('Wander Debug', () => {
    let game;
    beforeEach(async () => {
        vi.spyOn(Terrain.prototype, 'initMeshes').mockImplementation(() => { });
        vi.spyOn(Terrain.prototype, 'createMesh').mockImplementation(() => { });
        vi.spyOn(Terrain.prototype, 'createWater').mockImplementation(() => { });
        const scene = new THREE.Scene();
        const terrain = new Terrain(scene, [], 80, 80);
        game = new Game(scene, terrain, true); // minimal=true
        await game.readyPromise;
        game.gameActive = true;
    });

    afterEach(() => {
        if (game) game.stopped = true;
        vi.restoreAllMocks();
    });

    it('should wander around without getting stuck', async () => {
        // Setup land
        for (let x = 10; x < 30; x++) {
            for (let z = 10; z < 30; z++) {
                game.terrain.grid[x][z].height = 10;
            }
        }
        game.terrain.updateMesh();
        await game.terrain.calculateRegions();

        const unit = game.spawnUnit(20, 20, 'worker');
        console.log(`Initial Status: role=${unit.role}, action=${unit.action}, isNaval=${unit.isNaval}, isMoving=${unit.isMoving}`);

        vi.spyOn(unit.terrain, 'getRandomPointInRegion').mockImplementation((r, x, z, rad) => {
            console.log(`[Spy] getRandomPointInRegion called with r:${r} x:${x} z:${z} rad:${rad}`);
            return null; // FORCE FAILURE
        });

        // Update loop
        for (let i = 1; i <= 60; i++) {
            game.update(0.5); // 0.5s per frame

            if (i % 10 === 0) {
                console.log(`T=${i * 0.5}s | action: ${unit.action} | Moving: ${unit.isMoving} | stagnation: ${unit.stagnationTimer.toFixed(1)}`);
            }
        }
    });
});
