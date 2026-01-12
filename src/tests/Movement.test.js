
import { describe, it, expect, beforeEach, vi, afterEach, beforeAll } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import { MockGame, MockTerrain } from './TestHelper.js';

// Mock THREE module
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        InstancedMesh: class {
            constructor() {
                this.isObject3D = true; // Required
                this.instanceMatrix = { setUsage: vi.fn() };
                this.updateMatrix = vi.fn();
                this.setMatrixAt = vi.fn();
                this.setColorAt = vi.fn();
                this.count = 0;
                this.castShadow = false;
                this.receiveShadow = false;
                this.frustumCulled = false;
                this.dispose = vi.fn();
                this.removeFromParent = vi.fn(); // Required for Object3D.add
                this.dispatchEvent = vi.fn(); // Required for EventDispatcher
                this.addEventListener = vi.fn();
                this.removeEventListener = vi.fn();
            }
        },
    };
});

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Terrain Movement and Logic Tests', () => {
    let mockTerrain;
    let mockGame;
    let unit;

    beforeAll(() => {
        Goblin.initAssets = vi.fn(() => {
            const box = new THREE.BoxGeometry();
            const mat = new THREE.MeshBasicMaterial();
            Goblin.assets = {
                geometries: {
                    torsoNormal: box, height: box, head: box, ear: box, arm: box, leg: box, club: box, staff: box
                },
                materials: { club: mat, staff: mat }
            };
        });
        Unit.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);
        // Ensure TestHelper mock has gridToWorld
        if (!mockTerrain.gridToWorld) mockTerrain.gridToWorld = (v) => v * 10;

        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
        vi.spyOn(Unit.prototype, 'updatePosition').mockImplementation(() => { });
        unit = new Unit(mockGame.scene, mockTerrain, 10, 10, 'worker');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should set very long moveDuration for Unit on Rock', () => {
        mockTerrain.grid[10][11].height = 12;
        mockTerrain.grid[10][10].height = 10;

        unit.gridX = 10; unit.gridZ = 10;

        unit.executeMove(10, 11, 100);

        console.error(`DEBUG: MoveDur=${unit.moveDuration}`);
        console.error(`DEBUG: Heights Cur=${mockTerrain.getTileHeight(10, 10)} Next=${mockTerrain.getTileHeight(10, 11)}`);

        expect(unit.isMoving).toBe(true);
        expect(unit.moveDuration).toBeGreaterThan(4.5); // 4.5s
    });

    it('should set normal moveDuration on Flat', () => {
        mockTerrain.grid[10][11].height = 1;
        mockTerrain.grid[10][10].height = 1;
        unit.gridX = 10; unit.gridZ = 10;

        unit.executeMove(10, 11, 100);

        console.error(`DEBUG: Normal MoveDur=${unit.moveDuration}`);

        expect(unit.moveDuration).toBeCloseTo(0.8, 1); // 0.8s
    });

    it('should prevent Unit from moving/building on Rock checks?', () => {
        mockTerrain.grid[15][15].height = 10; // Rock
        vi.spyOn(mockTerrain, 'addBuilding');

        unit.tryBuildStructure(100);

        expect(mockTerrain.addBuilding).not.toHaveBeenCalled();
    });

    it('should increase Goblin Hut population and spawn goblin', () => {
        const gm = new GoblinManager(mockGame.scene, mockTerrain);
        mockGame.goblinManager = gm;
        vi.spyOn(gm, 'spawnGoblinAtCave');

        const hut = { userData: { type: 'goblin_hut', population: 9.7, capacity: 10, clanId: 'test', gridX: 10, gridZ: 10 } };
        mockTerrain.buildings.push(hut);
        // Correctly register on grid to prevent "Self-healing" destruction
        mockTerrain.grid[10][10].hasBuilding = true;
        mockTerrain.grid[10][10].building = hut;

        hut.userData.population = 10.0;

        gm.checkHutSpawns(1.0);

        expect(gm.spawnGoblinAtCave).toHaveBeenCalled();
        // Population decreases by 1 (cost of goblin)
        expect(hut.userData.population).toBe(9.0);
    });
});
