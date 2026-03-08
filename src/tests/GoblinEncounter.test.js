
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Terrain } from '../Terrain.js';

vi.mock('../PerformanceMonitor.js', async () => {
    return await vi.importActual('../PerformanceMonitor.js');
});

import { Combat, Wander, Raid } from '../ai/states/GoblinStates.js';
import { GameConfig } from '../config/GameConfig';

// --- Mocks ---
vi.mock('../Game.js', () => ({
    Game: class {
        constructor() {
            this.simTotalTimeSec = 0;
            this.units = [];
            this.buildings = [];
            this.goblinManager = { goblins: [] };
            this.unitScanBudget = 1000;
        }
    }
}));

const MockRenderer = class {
    init() { return Promise.resolve(); }
    update() { }
    dispose() { }
    initAssets() { }
    updateLighting() { }
};
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: MockRenderer }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: MockRenderer }));

describe('Goblin Encounter Logic', () => {
    let terrain;
    let scene;
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        scene = new THREE.Scene();

        terrain = new Terrain(scene);
        terrain.logicalWidth = 100;
        terrain.logicalDepth = 100;
        terrain.initEntityGrid();

        terrain.getRegion = vi.fn().mockReturnValue(1);
        terrain.getTileHeight = vi.fn().mockReturnValue(1);

        terrain.grid = Array.from({ length: 100 }, () =>
            Array.from({ length: 100 }, () => ({
                height: 1,
                regionId: 1,
                hasBuilding: false,
                type: 'land'
            }))
        );

        game = {
            simTotalTimeSec: 0,
            units: [],
            buildings: [],
            goblinManager: {
                goblins: [],
                notifyClanActivity: vi.fn()
            },
            unitScanBudget: 1000,
            frameCount: 0
        };
        window.game = game;
    });

    it('Goblin should detect Worker within range and enter Combat', () => {
        const goblin = new Goblin(scene, terrain, 20, 20, 'normal', 'clan1');
        goblin.id = 100;

        const worker = new Unit(scene, terrain, 30, 20, 'worker');
        worker.id = 200;
        worker.hp = 1000;
        worker.maxHp = 1000;

        game.goblinManager.goblins.push(goblin);
        game.units.push(worker);
        goblin.game = game;
        worker.game = game;

        const steps = 50;
        const dt = 0.1;

        for (let i = 0; i < steps; i++) {
            game.simTotalTimeSec += dt;
            game.frameCount++;

            if (goblin.updateLogic) {
                goblin.updateLogic(game.simTotalTimeSec, dt, false, game.units, game.buildings);
            } else if (goblin.update) {
                goblin.update(game.simTotalTimeSec, dt);
            }

            if (worker.updateLogic) {
                worker.updateLogic(game.simTotalTimeSec, dt, false, game.units, game.buildings);
            } else if (worker.update) {
                worker.update(game.simTotalTimeSec, dt);
            }
        }

        expect(goblin.targetUnit).not.toBeNull();
        expect(goblin.targetUnit).toBe(worker);
        expect(goblin.state.constructor.name).toBe('Combat');
    });

    it('Goblin should prioritize Worker if Building is far, or attack Building if close', () => {
        const goblin = new Goblin(scene, terrain, 20, 20, 'normal', 'clan1');
        goblin.id = 101;
        game.goblinManager.goblins.push(goblin);

        const worker = new Unit(scene, terrain, 30, 20, 'worker');
        worker.id = 201;
        worker.hp = 1000;
        worker.maxHp = 1000;
        game.units.push(worker);

        const building = {
            userData: { type: 'house', hp: 100, population: 5, gridX: 50, gridZ: 20 },
            gridX: 50, gridZ: 20,
            id: 301
        };
        terrain.registerEntity(building, 50, 20, 'building');
        game.buildings.push(building);
        goblin.game = game;
        worker.game = game;

        const steps = 50;
        const dt = 0.1;

        for (let i = 0; i < steps; i++) {
            game.simTotalTimeSec += dt;
            if (goblin.updateLogic) goblin.updateLogic(game.simTotalTimeSec, dt, false, game.units, game.buildings);
            if (worker.updateLogic) worker.updateLogic(game.simTotalTimeSec, dt, false, game.units, game.buildings);
        }

        expect(goblin.targetUnit).toBe(worker);
        expect(goblin.targetBuilding).toBeNull();
        expect(goblin.state.constructor.name).toBe('Combat');
    });

    it('Goblin should switch target to Worker if it encounters one while moving to a far Building', () => {
        const goblin = new Goblin(scene, terrain, 20, 20, 'normal', 'clan1');
        goblin.id = 102;
        game.goblinManager.goblins.push(goblin);

        const building = { userData: { type: 'house', hp: 100, population: 5, gridX: 70, gridZ: 20 }, gridX: 70, gridZ: 20, id: 302, type: 'building' };
        terrain.registerEntity(building, 70, 20, 'building');
        game.buildings.push(building);

        goblin.targetBuilding = building;
        goblin.state = new Raid(goblin);
        goblin.state.raidGoal = { x: 70, z: 20 };

        const worker = new Unit(scene, terrain, 25, 20, 'worker');
        worker.id = 202;
        worker.hp = 1000;
        worker.maxHp = 1000;
        game.units.push(worker);

        const dt = 0.1;
        for (let i = 0; i < 20; i++) {
            game.simTotalTimeSec += dt;
            if (goblin.updateLogic) goblin.updateLogic(game.simTotalTimeSec, dt, false, game.units, game.buildings);
            else if (goblin.update) goblin.update(game.simTotalTimeSec, dt);
        }

        expect(goblin.targetUnit).toBe(worker);
        expect(goblin.targetBuilding).toBeNull();
        expect(goblin.state.constructor.name).toBe('Combat');
    });
});