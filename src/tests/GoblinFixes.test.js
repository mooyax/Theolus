
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Building } from '../Building.js';
import { Game } from '../Game.js';
import { GameConfig } from '../config/GameConfig';
import { setupTestEnv } from './TestUtils';

// Note: setup.js handles global mocks for THREE, Canvas, and Managers.

// Mock Unit & Goblin Statics (Specific to Game init requiring them)
vi.mock('../Unit.js', async () => {
    const { Unit } = await vi.importActual('../Unit.js');
    Unit.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
    Unit.initAssets = vi.fn();
    return { Unit };
});

vi.mock('../Goblin.js', async () => {
    const { Goblin } = await vi.importActual('../Goblin.js');
    Goblin.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
    Goblin.initAssets = vi.fn();
    return { Goblin };
});

describe('Goblin Spawning Logic', () => {
    let terrain;

    beforeEach(() => {
        vi.clearAllMocks();
        // Use TestUtils to setup environment
        const env = setupTestEnv({ useMockTerrain: true });
        terrain = env.terrain;

        // Ensure terrain.buildings is clean
        terrain.buildings = [];
    });

    it('should update building population', () => {
        // Use real Building logic with mock terrain
        const cave = new Building(null, terrain, 'cave', 10, 10);
        terrain.buildings.push(cave);

        expect(cave.userData.population).toBe(0);

        const deltaTime = 1.0;
        cave.update(0, deltaTime);

        // Use growth rate from config
        const expectedGrowth = GameConfig.buildings.cave.growthRate;
        expect(cave.userData.population).toBeCloseTo(expectedGrowth, 2);
    });

    it('should synchronize clipping planes with controls.target when available', () => {
        // We need a Game instance. 
        // setupTestGame creates a MockGame, but here we want to test REAL Game logic for updateCameraControls.
        // So we instantiate real Game with minimal dependencies.

        const game = new Game(null, terrain, true);

        // Mock clippingPlanes manually for logic test
        game.clippingPlanes = [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
            new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
        ];

        // Mock controls.target
        game.controls = {
            target: new THREE.Vector3(500, 0, 500),
            update: vi.fn(),
            domElement: document.createElement('canvas')
        };

        game.camera.position.set(100, 100, 100);
        game.updateCameraControls();

        const viewRadius = GameConfig.render.viewRadius;
        expect(game.clippingPlanes[1].constant).toBe(500 + viewRadius);
        expect(game.clippingPlanes[1].constant).not.toBe(100 + viewRadius);
    });
});
