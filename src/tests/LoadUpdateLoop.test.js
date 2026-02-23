import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job, Wander } from '../ai/states/UnitStates.js';
import LZString from 'lz-string';
import * as THREE from 'three';






vi.mock('../SoundManager.js', () => ({ SoundManager: class { play() { } } }));
vi.mock('../SaveManager.js', () => ({
    SaveManager: class {
        save(slot, data) { localStorage.setItem('save_' + slot, JSON.stringify(data)); return true; }
        load(slot) { const d = localStorage.getItem('save_' + slot); return d ? JSON.parse(d) : null; }
    }
}));
vi.mock('../InputManager.js', () => ({ InputManager: class { update() { } updateCursor() { } } }));
vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { constructor() { this.goblins = []; } update() { } reset() { } scanForCaves() { } serialize() { return {}; } deserialize() { } } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { update() { } draw() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { update() { } draw() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { update() { } draw() { } } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { update() { } draw() { } } }));
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../WeatherManager.js', () => ({ WeatherManager: class { constructor() { } update() { } setWeather() { } updateSkyColor() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { init() { return Promise.resolve(); } update() { } dispose() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { init() { return Promise.resolve(); } update() { } updateLighting() { } dispose() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { init() { return Promise.resolve(); } update() { } dispose() { } } }));

vi.mock('../Terrain.js', () => ({
    Terrain: class {
        constructor() {
            this.logicalWidth = 20;
            this.logicalDepth = 20;
            this.grid = Array(20).fill(null).map(() => Array(20).fill({ regionId: 1, height: 1, type: 'grass' }));
            this.entityGrid = Array(20).fill(null).map(() => Array(20).fill([]));
            this.pathfindingCalls = 0;
            this.clippingPlanes = [];
            this.updateColors = vi.fn();
            this.updateMesh = vi.fn();
            this.calculateRegions = vi.fn();
            this.deserialize = vi.fn().mockResolvedValue(true);
            this.serialize = vi.fn(() => ({ grid: [], width: 20, depth: 20 }));
            this.registerEntity = vi.fn();
            this.unregisterEntity = vi.fn();
            this.moveEntity = vi.fn();
            this.getTileHeight = vi.fn(() => 1);
            this.findPath = vi.fn((sx, sz, ex, ez) => [{ x: ex, z: ez }]);
            this.getMultiplier = vi.fn(() => 1);
            this.getBiomeColor = vi.fn(() => ({ r: 0, g: 1, b: 0 }));
            this.isReachable = vi.fn(() => true);
            this.setSeason = vi.fn();
            this.findPathAsync = vi.fn((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }]));
            this.checkYield = () => Promise.resolve();
            this.getBuildingAt = vi.fn(() => null);
        }
    }
}));

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn(), clone: vi.fn() }; }
        update() { }
        dispose() { }
    }
}));

describe('Load Update Loop Integration', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        Unit.nextId = 0;
        game = new Game();
        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.calculateRegions = vi.fn();
        game.terrain.deserialize = vi.fn().mockResolvedValue(true);
        window.game = game;
    });

    afterEach(() => {
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should maintain Job after first update loop post-load', async () => {
        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        expect(unit.updateLogic).toBeDefined();

        unit.id = 100;
        game.units.push(unit);

        const req = game.addRequest('raise', 15, 15, true);
        req.id = 'req_manual_persistent';
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;

        const result = game.saveGame(1);
        expect(localStorage.setItem).toHaveBeenCalled();

        const val = localStorage.setItem.mock.calls[0][1];

        game.units = [];
        game.requestQueue = [];
        localStorage.getItem.mockReturnValue(val);
        await game.loadGame(1);

        const restoredUnit = game.units[0];

        expect(restoredUnit.state).toBeInstanceOf(Job);
        expect(restoredUnit.action).toBe('Approaching Job');

        game.simTotalTimeSec = game.gameTotalTime / 1000;
        game.frameCount = 20;

        restoredUnit.updateLogic(game.simTotalTimeSec, 0.1, false, game.units, game.terrain.buildings, game.goblinManager.goblins);

        if (restoredUnit.state instanceof Wander) {
            console.log("BUG REPRODUCED: Unit reverted to WanderState/Idle!");
        }

        expect(restoredUnit.state).toBeInstanceOf(Job);
        expect(restoredUnit.action).not.toBe('Idle');
    });
});
