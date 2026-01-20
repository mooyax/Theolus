import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Terrain } from '../Terrain.js';
import { GoblinCombatState, GoblinWanderState, GoblinRaidState } from '../ai/states/GoblinStates.js';
import { CombatState, UnitWanderState } from '../ai/states/UnitStates.js';
import GameConfig from '../config/GameConfig.json';

// --- Mocks ---
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        TextureLoader: vi.fn(),
        AudioLoader: vi.fn(),
        AudioListener: vi.fn(),
        PositionalAudio: vi.fn(),
    };
});

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

        terrain.getRegion = vi.fn().mockReturnValue(0);
        terrain.getTileHeight = vi.fn().mockReturnValue(1);

        // Mock Grid Data manually because findBestTarget uses direct grid access for optimization
        terrain.grid = Array.from({ length: 100 }, () =>
            Array.from({ length: 100 }, () => ({
                height: 1, // Default land
                regionId: 0, // Default region
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
            }
        };
        window.game = game;
    });

    it('Goblin should detect Worker within range and enter CombatState', () => {
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

        // Run Update
        const steps = 50;
        const dt = 0.1;

        console.log(`[Test Debug] Worker keys: ${Object.keys(worker)}`);

        for (let i = 0; i < steps; i++) {
            game.simTotalTimeSec += dt;
            game.frameCount = (game.frameCount || 0) + 1;

            if (goblin.updateLogic) {
                goblin.updateLogic(game.simTotalTimeSec, dt, game.units, game.buildings);
            } else if (goblin.update) {
                goblin.update(game.simTotalTimeSec, dt, game.units, game.buildings);
            }

            if (worker.update) {
                worker.update(game.simTotalTimeSec, dt);
            }
        }

        const debugInfo = {
            targetId: goblin.targetUnit ? goblin.targetUnit.id : 'null',
            state: goblin.state ? goblin.state.constructor.name : 'NoState',
            grid30_20: terrain.entityGrid[30][20] ? terrain.entityGrid[30][20].map(e => ({ id: e.id, type: e.type })) : 'empty',
            gridCount: terrain.entityGrid.flat().reduce((a, c) => a + (c ? c.length : 0), 0)
        };

        expect(goblin.targetUnit, `Failed Detection: ${JSON.stringify(debugInfo, null, 2)}`).not.toBeNull();
        expect(goblin.targetUnit).toBe(worker);
        expect(goblin.state).toBeInstanceOf(GoblinCombatState);
    });

    it('Goblin should prioritize Worker if Building is far, or attack Building if close', () => {
        // Setup Goblin
        const goblin = new Goblin(scene, terrain, 20, 20, 'normal', 'clan1');
        goblin.id = 101;
        game.goblinManager.goblins.push(goblin);

        // Setup Worker (Close: Dist 10)
        const worker = new Unit(scene, terrain, 30, 20, 'worker');
        worker.id = 201;
        worker.hp = 1000;
        worker.maxHp = 1000;
        game.units.push(worker);

        // Setup Building (Far: Dist 30)
        const building = {
            userData: { type: 'house', hp: 100, population: 5, gridX: 50, gridZ: 20 },
            gridX: 50, gridZ: 20,
            id: 301
        };
        // Mock Grid placement for building
        if (!terrain.entityGrid[50][20]) terrain.entityGrid[50][20] = [];
        terrain.entityGrid[50][20].push({ ...building, type: 'building' }); // Mock entity wrapper
        game.buildings.push(building);
        goblin.game = game;
        worker.game = game;

        // Run Update
        const steps = 50;
        const dt = 0.1;

        for (let i = 0; i < steps; i++) {
            game.simTotalTimeSec += dt;
            if (goblin.updateLogic) goblin.updateLogic(game.simTotalTimeSec, dt, game.units, game.buildings);
            if (worker.update) worker.update(game.simTotalTimeSec, dt);
        }

        // Expectation: Should chose Worker because Building is far (> 15)
        // Arsonist Logic: bDist < 15.0 -> Building. Else -> Closer one.
        // uDist = 10, bDist = 30. uDist < bDist -> Worker.
        expect(goblin.targetUnit).toBe(worker);
        expect(goblin.targetBuilding).toBeNull();
        expect(goblin.state).toBeInstanceOf(GoblinCombatState);
    });
    it('Goblin should switch target to Worker if it encounters one while moving to a far Building', () => {
        // Setup Goblin
        const goblin = new Goblin(scene, terrain, 20, 20, 'normal', 'clan1');
        goblin.id = 102;
        game.goblinManager.goblins.push(goblin);

        // Setup Building (Far: Dist 50)
        const building = { userData: { type: 'house', hp: 100, population: 5, gridX: 70, gridZ: 20 }, gridX: 70, gridZ: 20, id: 302, type: 'building' };
        // Manual register
        terrain.registerEntity(building, 70, 20, 'building');
        game.buildings.push(building);

        // Assign Target Manually (Pretend Raid)
        goblin.targetBuilding = building;
        // Important: Set state to Raid so it scans
        goblin.state = new GoblinRaidState(goblin);
        goblin.state.raidGoal = { x: 70, z: 20 };

        // Setup Worker (Close: Dist 5)
        const worker = new Unit(scene, terrain, 25, 20, 'worker');
        worker.id = 202;
        worker.hp = 1000;
        worker.maxHp = 1000;
        game.units.push(worker);

        // Advance time to trigger scan (RaidState scans every 1.0s)
        const dt = 0.1;
        for (let i = 0; i < 20; i++) {
            game.simTotalTimeSec += dt;
            // Ensure scanTimer > 1.0
            if (goblin.updateLogic) goblin.updateLogic(game.simTotalTimeSec, dt, game.units, game.buildings);
            else goblin.update(game.simTotalTimeSec, dt, game.units, game.buildings);
        }

        expect(goblin.targetUnit).toBe(worker);
        expect(goblin.targetBuilding).toBeNull();
        expect(goblin.state).toBeInstanceOf(GoblinCombatState);
    });
});
