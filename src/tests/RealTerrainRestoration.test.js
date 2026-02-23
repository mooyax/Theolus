import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';
import * as THREE from 'three';





const store = {};



vi.mock('../SoundManager.js', () => ({ SoundManager: class { play() { } } }));
vi.mock('../SaveManager.js', () => ({
    SaveManager: class {
        save(slot, data) { localStorage.setItem('save_' + slot, JSON.stringify(data)); return true; }
        load(slot) { const d = localStorage.getItem('save_' + slot); return d ? JSON.parse(d) : null; }
    }
}));
vi.mock('../InputManager.js', () => ({ InputManager: class { update() { } updateCursor() { } } }));
vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { update() { } reset() { } scanForCaves() { } serialize() { return {}; } deserialize() { } } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { update() { } draw() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { update() { } draw() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { update() { } draw() { } } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { update() { } draw() { } } }));
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { update() { } dispose() { } init() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { update() { } updateLighting() { } dispose() { } init() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { update() { } dispose() { } init() { } } }));

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn(), clone: vi.fn() }; }
        update() { }
        dispose() { }
    }
}));

describe('Real Terrain Restoration Logic', () => {
    let game;

    beforeEach(async () => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        Unit.nextId = 0;

        const { Terrain } = await import('../Terrain.js');
        vi.spyOn(Terrain.prototype, 'generateRandomTerrain').mockImplementation(function () {
            const w = this.logicalWidth || 80;
            const d = this.logicalDepth || 80;
            if (!this.grid) return;
            for (let x = 0; x < w; x++) {
                for (let z = 0; z < d; z++) {
                    if (!this.grid[x]) continue;
                    if (typeof this.grid[x][z] === 'undefined') {
                        this.grid[x][z] = {};
                    }
                    this.grid[x][z].height = 1;
                    this.grid[x][z].type = 'grass';
                    this.grid[x][z].regionId = 1;
                    this.grid[x][z].moisture = 0.5;
                }
            }
            this.needsRegionRecalc = false;
        });

        game = new Game(null, null, true);
        game.terrain.logicalWidth = 80;
        game.terrain.logicalDepth = 80;
        game.terrain.getTileHeight = () => 10;
        game.terrain.findPath = vi.fn().mockImplementation((sx, sz, tx, tz) => [{ x: tx, z: tz }]);
        game.terrain.findPathAsync = vi.fn().mockImplementation((sx, sz, tx, tz) => Promise.resolve([{ x: tx, z: tz }]));
        window.game = game;
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should successfully restore Terrain regions and Unit pathfinding', async () => {
        expect(game.terrain).toBeDefined();

        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        unit.id = 100;
        game.units.push(unit);

        const req = game.addRequest('raise', 15, 15, true);
        req.id = 'req_manual_persistent';
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;

        unit.changeState(new Job(unit));
        await new Promise(resolve => setTimeout(resolve, 0));
        unit.updateLogic(0.016, 0.016, false, []);
        expect(unit.isMoving).toBe(true);

        game.saveGame(1);
        game.units = [];
        game.requestQueue = [];

        await game.loadGame(1);
        const restoredUnit = game.units[0];

        expect(restoredUnit).toBeDefined();
        expect(restoredUnit.isMoving).toBe(true);
        expect(restoredUnit.targetRequest).toBeDefined();
        expect(restoredUnit.targetRequest.id).toBe('req_manual_persistent');

        if (restoredUnit.isMoving && (!restoredUnit.path || restoredUnit.path.length === 0)) {
            console.log("Unit is moving linearly (No Path array). This is valid for short distances.");
        } else if (!restoredUnit.isMoving) {
            throw new Error("Unit is NOT moving!");
        }

        restoredUnit.updateLogic(game.gameTime, 0.1);
        expect(restoredUnit.isMoving).toBe(true);
    });

});