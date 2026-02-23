
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game';
import * as THREE from 'three';

// Mock Managers
vi.mock('../Terrain', () => ({
    Terrain: class {
        constructor() {
            this.update = vi.fn();
            this.updatePopulation = vi.fn();
            this.getTileHeight = vi.fn(() => 5);
            this.getNormalAt = vi.fn(() => ({ x: 0, y: 1, z: 0 }));
            this.isPositionBlocked = vi.fn(() => false);
            this.buildings = [];
            this.grid = Array.from({ length: 100 }, () => Array.from({ length: 100 }, () => ({})));
            this.logicalWidth = 100;
            this.logicalDepth = 100;
            this.serialize = vi.fn(() => ({}));
            this.deserialize = vi.fn();
            this.clippingPlanes = [];
            this.rngState = 0;
            this.seededRandom = vi.fn(() => Math.random());
            this.initRNG = vi.fn();
            this.updateMesh = vi.fn();
            this.initMeshes = vi.fn();
            this.initGrid = vi.fn();
            this.totalHousingPop = 0;
            this.frameCount = 0;
            this.isGameActive = true;
            this.resetPathfindingBudget = vi.fn(); // Game.ts から呼ばれる
        }
    }
}));

vi.mock('../input/InputManager', () => ({
    InputManager: class {
        constructor() {
            this.update = vi.fn();
            this.dispose = vi.fn();
        }
    }
}));

vi.mock('../PerformanceMonitor', () => ({
    PerformanceMonitor: class {
        constructor() {
            this.update = vi.fn();
            this.updateEntityCount = vi.fn();
            this.startUpdate = vi.fn();
            this.endUpdate = vi.fn();
            this.startRender = vi.fn();
            this.endRender = vi.fn();
        }
    }
}));

vi.mock('../GoblinManager', () => ({
    GoblinManager: class {
        constructor() {
            this.goblins = [];
            this.caves = [];
            this.update = vi.fn();
            this.spawnGoblinAtCave = vi.fn();
            this.generateCaves = vi.fn();
            this.caveGroup = { add: vi.fn() };
        }
    }
}));

vi.mock('../ai/EnemyAI', () => ({
    EnemyAI: class {
        constructor() {
            this.update = vi.fn();
        }
    }
}));

describe('Game Loop Verification', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '<div id="ui-layer"></div><div id="loading-screen"></div>';
        game = new Game(null, null, true); // Minimal mode

    });
    afterEach(() => {
        if (game) {
            game.dispose();
        }

    });
    it('should initialize with correct instance ID', () => {
        expect(game.instanceId).toBeDefined();
        console.log(`Test Instance ID: ${game.instanceId}`);
        expect(game.instanceId).toBeGreaterThan(0);

    });
    it('should increment frameCount when active', () => {
        // Force active
        game.gameActive = true;
        game.frameCount = 100;

        // Simulate update
        game.update(0.016);

        expect(game.frameCount).toBe(101);

    });
    it('should NOT increment frameCount when inactive', () => {
        game.gameActive = false;
        game.frameCount = 100;

        game.update(0.016);

        expect(game.frameCount).toBe(100);

    });
    it('should call update on managers', () => {
        game.gameActive = true;

        // Mock GoblinManager
        game.goblinManager = { update: vi.fn() };
        game.enemyAI = { update: vi.fn() };

        game.update(0.016);

        expect(game.enemyAI.update).toHaveBeenCalled();

    });
    it('should activate game loop when startNewGame is called', async () => {
        // Mock startLevel
        game.startLevel = vi.fn().mockImplementation(async () => {
            game.gameActive = true;
            game.isLoading = false;

        await game.startNewGame();

        expect(game.startLevel).toHaveBeenCalledWith(0);
        expect(game.gameActive).toBe(true);
        expect(game.isLoading).toBe(false);

});
});
});