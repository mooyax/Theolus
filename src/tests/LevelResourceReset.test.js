
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game.js';
import * as THREE from 'three';

// Mock Terrain
vi.mock('../Terrain', () => {
    return {
        Terrain: class {
            constructor() {
                this.seed = 12345;
                this.grid = Array(10).fill(null).map(() => Array(10).fill(null).map(() => ({
                    height: 10, regionId: 1, hasBuilding: false, building: null
                })));
            }
            generate() { return Promise.resolve(); }
            generateRandomTerrain() { return Promise.resolve(); }
            updateMesh() { }
            updateColors() { }
            calculateRegions() { return Promise.resolve(); }
            syncToWorker() { }
            getWidth() { return 10; }
            getDepth() { return 10; }
            initMeshes() { }
            dispose() { }
        }
    };
});

// Mock GameConfig/Levels
vi.mock('../config/GameConfig', () => {
    return {
        Levels: [
            { levelId: 1, title: 'L1', mapWidth: 10, mapDepth: 10, initialState: { goblinCaves: 5 } },
            { levelId: 2, title: 'L2', mapWidth: 20, mapDepth: 20, initialState: { goblinCaves: 10 } }
        ],
        GameConfig: {
            economy: {
                startingResources: { grain: 50, fish: 50, meat: 0 },
                startingMana: 100
            }
        }
    };
});

describe('Level Resource Reset', () => {
    let game;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        // Minimal Game setup
        game = new Game(scene, null, true); // true = minimal mode

        // Stub methods to avoid full terrain generation
        game.clearEntities = vi.fn();
        game.inputManager = { reset: vi.fn(), update: vi.fn() };
        game.unitRenderer = { reset: vi.fn(), update: vi.fn() };
        game.buildingRenderer = { reset: vi.fn(), update: vi.fn() };
        game.goblinRenderer = { reset: vi.fn(), update: vi.fn() };
        game.treeRenderer = { reset: vi.fn(), update: vi.fn() };
        game.goblinManager = { reset: vi.fn(), generateCaves: vi.fn(), update: vi.fn() };
        game.fishManager = { reset: vi.fn(), init: vi.fn(), update: vi.fn() };
        game.sheepManager = { reset: vi.fn(), initSheeps: vi.fn(), update: vi.fn() };

        // Mock animate to prevent loops
        vi.spyOn(game, 'animate').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should reset resources and mana when starting a new level', async () => {
        // 1. Simulate gameplay state in Level 1
        game.resources = { grain: 999, fish: 888, meat: 777 };
        game.mana = 500;
        game.totalPopulation = 100;

        // 2. Transition to Level 2 (index 1)
        await game.startLevel(1);

        // 3. Verify Reset (Based on mock data)
        expect(game.resources).toEqual({ grain: 50, fish: 50, meat: 0 });
        expect(game.mana).toBe(100);
        expect(game.totalPopulation).toBe(0);
        expect(game.currentLevelIndex).toBe(1);
    });

    it('should reset resources even if restarting same level', async () => {
        // 1. Simulate gameplay state
        game.resources = { grain: 10, fish: 0, meat: 20 };
        game.mana = 0;

        // 2. Restart Level 0
        await game.startLevel(0);

        // 3. Verify Reset
        expect(game.resources).toEqual({ grain: 50, fish: 50, meat: 0 });
        expect(game.mana).toBe(100);
    });
});