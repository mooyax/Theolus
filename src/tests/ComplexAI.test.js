import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Actor } from '../Actor.js';
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

describe('Complex AI Scenarios', () => {
    let game;
    let scene;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
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
            findPath: vi.fn(),
            getTileHeight: () => 5,
            buildings: [],
            update: vi.fn(),
            updateMeshPosition: vi.fn(),
            updateLights: vi.fn(),
            initEntityGrid: vi.fn(),
            getRegion: () => 1,
            getRandomPointInRegion: () => ({ x: 50, z: 50 })
        };
        // Mock findPath to return a simple path
        game.terrain.findPath.mockImplementation(() => [{ x: 50, z: 50 }]);

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

    it('should drop job gracefully if target building is destroyed', () => {
        const unit = game.spawnUnit(10, 10, 'worker');

        // Create a mock building
        const building = { id: 'b_1', x: 20, z: 20, isDead: false };
        game.terrain.buildings = [building];

        // Create request for this building
        const req = game.addRequest('cultivate', 20, 20, building);
        game.claimRequest(unit, req);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBe(req);

        // Sim: Building destroyed
        game.terrain.buildings = [];
        building.isDead = true;

        // Check building status during update
        unit.updateLogic(0.1, 0.1);

        // CHECK if it released the request
        expect(unit.targetRequest).toBeNull();
        expect(unit.state).not.toBeInstanceOf(JobState);
    });

    it('should prioritize manual jobs even when closer auto jobs appear', () => {
        const unit = game.spawnUnit(10, 10, 'worker');

        // 1. Assign a distant manual job
        const manualReq = game.addRequest('raise', 50, 50, null, null, null, true);
        game.claimRequest(unit, manualReq);
        expect(unit.targetRequest).toBe(manualReq);
        expect(unit.state).toBeInstanceOf(JobState);

        // 2. Add a close auto job
        const autoReq = game.addRequest('raise', 11, 11, null, null, null, false);

        // Trigger assignment check
        unit.updateLogic(0.1, 0.1);

        // Should STILL have the manual job
        expect(unit.targetRequest).toBe(manualReq);
    });

    it('should NOT drop manual job when switching to SleepState at night', () => {
        const unit = game.spawnUnit(10, 10, 'worker');
        const manualReq = game.addRequest('raise', 50, 50, null, null, null, true);
        game.claimRequest(unit, manualReq);

        // Transition to night
        game.isNight = true;
        unit.updateLogic(0.1, 0.1);

        // Should preserve targetRequest
        expect(unit.targetRequest).toBe(manualReq);
    });

    it('should ignore unreachable job to prevent flicker (Regression Test)', () => {
        const unit = game.spawnUnit(10, 10, 'worker');
        const req = game.addRequest('raise', 90, 90, null);
        game.claimRequest(unit, req);

        expect(unit.state).toBeInstanceOf(JobState);

        // Force unreachable condition
        unit.isUnreachable = true;

        // Mock smartMove to ensure it doesn't clear isUnreachable or succeed
        // We want to simulate Actor.smartMove failing and setting isUnreachable (or keeping it set)
        vi.spyOn(unit, 'smartMove').mockImplementation(() => {
            return false;
        });

        // TIME SYNC: critical for ignoredTargets check in Game.findBestRequest
        unit.simTime = 0.1;
        game.simTotalTimeSec = 0.1;

        // Direct update to ensure we hit the JobState logic cleanly
        unit.state.update(0.1, 0.1);

        // Expectation: Job released AND added to ignore list
        expect(unit.targetRequest).toBeNull();
        expect(unit.state).not.toBeInstanceOf(JobState);
        expect(unit.ignoredTargets.has(req.id)).toBe(true);
        expect(unit.ignoredTargets.get(req.id)).toBeGreaterThan(0.1); // Expiry time > current time

        // VERIFY STABILITY: calling update again should NOT pick the job back up
        // Because it is in the ignore list, findBestRequest should skip it.
        unit.simTime = 0.2; // Increase time slightly
        game.simTotalTimeSec = 0.2;
        unit.state.update(0.2, 0.1);

        expect(unit.state).not.toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBeNull();
    });
});
