import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Actor } from '../Actor.js';
import { Unit } from '../Unit.js';
import { JobState, CombatState, SleepState } from '../ai/states/UnitStates.js';

// Mock THREE as usual
vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('canvas'); }
            setPixelRatio() { }
            setSize() { }
            render() { }
            setClearColor() { }
        },
        Scene: class extends actual.Scene {
            constructor() { super(); this.background = { setHex: () => { } }; }
        },
    };
});
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } drawRaidPing() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { init() { return Promise.resolve(); } update() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { init() { return Promise.resolve(); } update() { } updateLighting() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { init() { return Promise.resolve(); } update() { } } }));

describe('Complex AI Scenarios', () => {
    let game;
    let scene;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        Actor.nextId = 0;
        Unit.nextId = 0;
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'startNewGame').mockImplementation(() => { });
        document.body.innerHTML = '<div id="ui"></div><canvas id="minimap"></canvas><div id="mana-bar"></div><div id="loading-screen"></div>';

        scene = new THREE.Scene();
        game = new Game(scene, null, true); // Use minimal init
        window.game = game;
        game.gameActive = true;
        window.game = game; // IMPORTANT for JobState.releaseRequest
        game.terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            grid: new Proxy({}, {
                get: () => new Proxy({}, { get: () => ({ height: 5, type: 'grass', regionId: 1 }) })
            }),
            isReachable: () => true,
            isValidGrid: () => true,
            findPath: vi.fn().mockImplementation((sx, sz, ex, ez) => [{ x: ex, z: ez }]),
            findPathAsync: vi.fn().mockImplementation((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }])),
            findBestTarget: vi.fn(() => null),
            getTileHeight: () => 5,
            buildings: [],
            update: vi.fn(),
            updateMeshPosition: vi.fn(),
            updateLights: vi.fn(),
            initEntityGrid: vi.fn(),
            getRegion: () => 1,
            getRandomPointInRegion: () => ({ x: 50, z: 50 })
        };

        game.units = [];
        game.requestQueue = [];
        // Ensure requestCounter is reset or managed
        game.requestCounter = 0;

        // Mock Actor methods to avoid random terrain/slope failures in AI tests
        vi.spyOn(Actor.prototype, 'isReachable').mockReturnValue(true);
        vi.spyOn(Actor.prototype, 'canMoveTo').mockReturnValue(true);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should drop job gracefully if target building is destroyed', async () => {
        const unit = game.spawnUnit(10, 10, 'worker');

        // Create a mock building
        const building = { id: 'b_1', x: 20, z: 20, isDead: false };
        game.terrain.buildings = [building];

        // Create request for this building
        const req = game.addRequest('cultivate', 20, 20, true, null, null, building);
        game.claimRequest(unit, req);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBe(req);

        // Sim: Building destroyed
        game.terrain.buildings = [];
        building.isDead = true;

        // Check building status during update
        unit.updateLogic(0.1, 0.1);

        // CHECK if it released the request immediately
        expect(unit.targetRequest).toBeNull();
        expect(unit.state).not.toBeInstanceOf(JobState);

        // Optional: wait for async and check background state
        await new Promise(r => setTimeout(r, 0));
    });

    it('should prioritize manual jobs even when closer auto jobs appear', async () => {
        const unit = game.spawnUnit(10, 10, 'worker');

        // 1. Assign a distant manual job
        const manualReq = game.addRequest('raise', 50, 50, true);
        game.claimRequest(unit, manualReq);
        expect(unit.targetRequest).toBe(manualReq);
        expect(unit.state).toBeInstanceOf(JobState);

        // 2. Add a close auto job
        const autoReq = game.addRequest('raise', 11, 11, false);

        // Trigger assignment check
        unit.updateLogic(0.1, 0.1);
        await new Promise(r => setTimeout(r, 0));
        unit.updateLogic(1.2, 0.1);


        // Should STILL have the manual job
        expect(unit.targetRequest).toBe(manualReq);
    });

    it('should NOT drop manual job when switching to SleepState at night', () => {
        const unit = game.spawnUnit(10, 10, 'worker');
        const manualReq = game.addRequest('raise', 50, 50, true);
        game.claimRequest(unit, manualReq);

        // Transition to night
        game.isNight = true;
        unit.updateLogic(0.1, 0.1);

        // Should preserve targetRequest
        expect(unit.targetRequest).toBe(manualReq);
    });

    it('should abandon unreachable job (Abandonment Test)', async () => {
        const unit = game.spawnUnit(10, 10, 'worker');
        const req = game.addRequest('raise', 90, 90, true);
        game.claimRequest(unit, req);

        expect(unit.state).toBeInstanceOf(JobState);

        // Force unreachable condition
        unit.isUnreachable = true;
        vi.spyOn(unit, 'smartMove').mockImplementation(() => false);

        // TIME SYNC
        unit.simTime = 0.1;
        game.simTotalTimeSec = 0.1;

        // Direct update to hit abandonment logic
        if (unit.state) {
            unit.state.update(0.1, 0.1);
        }

        // Expectation: Job RELEASED
        expect(unit.targetRequest).toBeNull();
        expect(unit.state).not.toBeInstanceOf(JobState); // Should resume wander

        // Should be ignored globally
        expect(req.excludedUntil).toBeDefined();
        expect(req.excludedUntil).toBeGreaterThan(0.1); // Future timestamp
    });
});
