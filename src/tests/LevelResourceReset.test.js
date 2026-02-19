
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game.ts';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        Group: class { constructor() { this.position = new actual.Vector3(); this.add = vi.fn(); this.remove = vi.fn(); } },
        Mesh: class { constructor() { this.position = new actual.Vector3(); this.add = vi.fn(); } },
        Scene: class { constructor() { this.add = vi.fn(); this.remove = vi.fn(); } },
        TextureLoader: class { load() { return {}; } }
    };
});

// Mock Terrain
vi.mock('../Terrain', () => {
    return {
        Terrain: class {
            constructor() { this.seed = 12345; }
            generate() { return Promise.resolve(); }
            generateRandomTerrain() { return Promise.resolve(); }
            updateMesh() { }
            updateColors() { }
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
        GameConfig: {}
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
        game.inputManager = {};
        game.unitRenderer = {};
        game.buildingRenderer = {};
        game.goblinRenderer = {};
        game.treeRenderer = {};
        game.goblinManager = { reset: vi.fn(), generateCaves: vi.fn() };
        game.fishManager = { reset: vi.fn(), init: vi.fn() };
        game.sheepManager = { reset: vi.fn(), initSheeps: vi.fn() };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should reset resources and mana when starting a new level', async () => {
        // 1. Simulate gameplay state in Level 1
        game.resources = { grain: 999, fish: 888, meat: 777 };
        game.mana = 500;
        game.totalPopulation = 100;

        // 2. Transition to Level 2
        await game.startLevel(1);

        // 3. Verify Reset
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
