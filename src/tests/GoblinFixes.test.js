
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Building } from '../Building.js';
import { Game } from '../Game.js';
import { GameConfig } from '../config/GameConfig';
import { setupTestEnv } from './TestUtils';

// Mock Unit & Goblin Statics
vi.mock('../Unit.js', async (importActual) => {
    const actual = await importActual();
    actual.Unit.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
    actual.Unit.initAssets = vi.fn();
    return actual;
});

vi.mock('../Goblin.js', async (importActual) => {
    const actual = await importActual();
    actual.Goblin.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
    actual.Goblin.initAssets = vi.fn();
    return actual;
});

describe('Goblin Spawning Logic', () => {
    let terrain;

    beforeEach(() => {
        vi.clearAllMocks();
        const env = setupTestEnv({ useMockTerrain: true });
        terrain = env.terrain;
        terrain.buildings = [];
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should update building population', () => {
        const cave = new Building(new THREE.Scene(), terrain, 'cave', 10, 10);
        terrain.buildings.push(cave);

        expect(cave.userData.population).toBe(0);

        const deltaTime = 1.0;
        cave.update(0, deltaTime);

        const expectedGrowth = GameConfig.buildings.cave.growthRate;
        expect(cave.userData.population).toBeCloseTo(expectedGrowth, 2);
    });

    it('should synchronize clipping planes with controls.target when available', () => {
        const game = new Game(new THREE.Scene(), terrain, true);

        game.clippingPlanes = [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
            new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
        ];

        game.controls = {
            target: new THREE.Vector3(500, 0, 500),
            update: vi.fn(),
            domElement: document.createElement('canvas'),
            addEventListener: vi.fn()
        };

        game.camera.position.set(100, 100, 100);
        game.updateCameraControls();

        const viewRadius = GameConfig.render.viewRadius;
        // The constant for the negative plane should be target.x + viewRadius
        expect(game.clippingPlanes[1].constant).toBe(500 + viewRadius);
    });
});