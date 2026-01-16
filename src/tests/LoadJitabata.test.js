import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState } from '../ai/states/UnitStates.js';
import LZString from 'lz-string';

describe('Post-Load Jitabata Reproduction', () => {
    let game;
    let scene;

    beforeEach(() => {
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        document.body.innerHTML = '<div id="ui"></div><canvas id="minimap"></canvas>';

        scene = new THREE.Scene();
        game = new Game(scene, null, true);
        game.gameActive = true;

        // Mock Storage
        const storage = {};
        global.localStorage = {
            getItem: (key) => storage[key] || null,
            setItem: (key, value) => storage[key] = value,
            removeItem: (key) => delete storage[key],
            clear: () => { }
        };

        // Mock Terrain (updated to match Game expectation)
        game.terrain = {
            grid: Array(160).fill(null).map(() => Array(160).fill({ type: 'ground', height: 10, regionId: 1 })),
            getTileHeight: () => 10,
            getWidth: () => 160,
            getDepth: () => 160,
            logicalWidth: 160,
            logicalDepth: 160,
            isWalkable: () => true,
            isReachable: () => true,
            findPath: vi.fn(), // Return null by default to test pathfinding failure? Or simple path?
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 20 }]),
            update: () => { },
            getBuildingAt: () => null,
            moveEntity: () => { },
            initEntityGrid: () => { },
            serialize: () => ({ h: [], n: [], b: [], logicalWidth: 160, logicalDepth: 160, version: 1 }),
            deserialize: () => { },
            registerEntity: () => { },
            unregisterEntity: () => { },
            getBuildingSize: () => 1
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should NOT flap between Job and Wander after load', async () => {
        const unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;

        // 1. Add manual job and claim it
        const req = game.addRequest('raise', 20, 20, true);
        game.claimRequest(unit, req);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest.id).toBe(req.id);

        // 2. Save
        game.saveGame(1);

        // 3. Load into a fresh game instance
        const newGame = new Game(new THREE.Scene(), null, true);
        newGame.controls = { target: new THREE.Vector3(), update: vi.fn() };

        // Manipulate Storage to remove assignedAt (Legacy Data Simulation)
        const key = 'god_game_save_1';
        const compressed = localStorage.getItem(key);
        if (compressed) {
            const json = LZString.decompressFromUTF16(compressed);
            const rawData = JSON.parse(json);
            if (rawData.data && rawData.data.requests && rawData.data.requests[0]) {
                delete rawData.data.requests[0].assignedAt;
            }
            const newCompressed = LZString.compressToUTF16(JSON.stringify(rawData));
            localStorage.setItem(key, newCompressed);
        }

        await newGame.loadGame(1);

        const loadedUnit = newGame.units[0];
        const loadedReq = newGame.requestQueue[0];

        // FORCE A TYPE MISMATCH (Number 0 vs String "0")
        loadedReq.assignedTo = String(loadedUnit.id);

        expect(loadedUnit.targetRequest).toBeDefined();
        expect(loadedUnit.targetRequest.id).toBe(req.id);
        expect(loadedUnit.state).toBeInstanceOf(JobState);

        // 4. Update loop - Check for flapping
        let stateLog = [];
        // Advance time significantly to trigger timeout checks if assignedAt is missing/0
        newGame.simTotalTimeSec += 300.0;

        for (let i = 0; i < 20; i++) {
            newGame.simTotalTimeSec += 0.1;
            newGame.frameCount = (newGame.frameCount || 0) + 1;

            // Occasionally run zombie check
            if (newGame.frameCount % 5 === 0) {
                newGame.detectZombieRequests();
            }

            // Update unit logic
            loadedUnit.updateLogic(newGame.simTotalTimeSec, 0.1, false, []);
            stateLog.push(loadedUnit.state.constructor.name);
        }

        // Check if WanderState ever appeared
        const hasWandered = stateLog.some(s => s === 'UnitWanderState');
        expect(hasWandered, `Unit should NOT wander. History: ${stateLog.join(' -> ')}`).toBe(false);
        expect(loadedUnit.state).toBeInstanceOf(JobState);
    });
});
