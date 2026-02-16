import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import LZString from 'lz-string';

vi.mock('../Fish.js', () => ({ Fish: { initAssets: vi.fn(), assets: { geometries: {}, materials: {} } } }));
vi.mock('../WeatherManager.js', () => ({ WeatherManager: class { constructor() { } setWeather() { } update() { } dispose() { } } }));
vi.mock('../WeatherManager.ts', () => ({ WeatherManager: class { constructor() { } setWeather() { } update() { } dispose() { } } }));

vi.mock('../Terrain', () => {
    class MockTerrainClass {
        constructor() {
            this.grid = Array(160).fill(null).map(() => Array(160).fill({ type: 'ground', height: 10, regionId: 1 }));
            this.pathfindingCalls = 0;
            this.logicalWidth = 160;
            this.logicalDepth = 160;
        }
        getTileHeight() { return 10; }
        getWidth() { return 160; }
        getDepth() { return 160; }
        isWalkable() { return true; }
        isReachable() { return true; }
        findPathAsync(sx, sz, tx, tz) {
            console.log(`[MockTerrain] findPathAsync called: ${sx},${sz} -> ${tx},${tz}`);
            return Promise.resolve([{ x: tx, z: tz }]);
        }
        update() { }
        getBuildingAt() { return null; }
        moveEntity() { }
        initEntityGrid() { }
        serialize() { return { h: [], n: [], b: [], logicalWidth: 160, logicalDepth: 160, version: 1 }; }
        deserialize() { }
        registerEntity() { }
        unregisterEntity() { }
        getBuildingSize() { return 1; }
        isAdjacentToRegion() { return true; }
    }
    return { Terrain: MockTerrainClass };
});

vi.mock('../Terrain.js', () => {
    class MockTerrainClass {
        constructor() {
            this.grid = Array(160).fill(null).map(() => Array(160).fill({ type: 'ground', height: 10, regionId: 1 }));
            this.pathfindingCalls = 0;
            this.logicalWidth = 160;
            this.logicalDepth = 160;
        }
        getTileHeight() { return 10; }
        getWidth() { return 160; }
        getDepth() { return 160; }
        isWalkable() { return true; }
        isReachable() { return true; }
        findPathAsync(sx, sz, tx, tz) {
            console.log(`[MockTerrain] findPathAsync called: ${sx},${sz} -> ${tx},${tz}`);
            return Promise.resolve([{ x: tx, z: tz }]);
        }
        update() { }
        getBuildingAt() { return null; }
        moveEntity() { }
        initEntityGrid() { }
        serialize() { return { h: [], n: [], b: [], logicalWidth: 160, logicalDepth: 160, version: 1 }; }
        deserialize() { }
        registerEntity() { }
        unregisterEntity() { }
        getBuildingSize() { return 1; }
        isAdjacentToRegion() { return true; }
    }
    return { Terrain: MockTerrainClass };
});

vi.mock('../Terrain.ts', () => {
    class MockTerrainClass {
        constructor() {
            this.grid = Array(160).fill(null).map(() => Array(160).fill({ type: 'ground', height: 10, regionId: 1 }));
            this.pathfindingCalls = 0;
            this.logicalWidth = 160;
            this.logicalDepth = 160;
        }
        getTileHeight() { return 10; }
        getWidth() { return 160; }
        getDepth() { return 160; }
        isWalkable() { return true; }
        isReachable() { return true; }
        findPathAsync(sx, sz, tx, tz) {
            console.log(`[MockTerrain] findPathAsync called: ${sx},${sz} -> ${tx},${tz}`);
            return Promise.resolve([{ x: tx, z: tz }]);
        }
        update() { }
        getBuildingAt() { return null; }
        moveEntity() { }
        initEntityGrid() { }
        serialize() { return { h: [], n: [], b: [], logicalWidth: 160, logicalDepth: 160, version: 1 }; }
        deserialize() { }
        registerEntity() { }
        unregisterEntity() { }
        getBuildingSize() { return 1; }
        isAdjacentToRegion() { return true; }
    }
    return { Terrain: MockTerrainClass };
});

import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job, Wander } from '../ai/states/UnitStates.js';
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
    });

    afterEach(() => {
        if (game) game.dispose();
        vi.restoreAllMocks();
    });

    it('should NOT flap between Job and Wander after load', async () => {
        const unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;

        // 1. Add manual job and claim it
        const req = game.addRequest('raise', 20, 20, true);
        game.claimRequest(unit, req);

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetRequest.id).toBe(req.id);

        // 2. Save
        game.saveGame(1);

        // 3. Load into a fresh game instance
        const newGame = new Game(new THREE.Scene(), null, true);
        newGame.controls = { target: new THREE.Vector3(), update: vi.fn() };
        newGame.terrain = {
            grid: Array(160).fill(null).map(() => Array(160).fill({ type: 'ground', height: 10, regionId: 1 })),
            getTileHeight: () => 10,
            getWidth: () => 160,
            getDepth: () => 160,
            logicalWidth: 160,
            logicalDepth: 160,
            isWalkable: () => true,
            isReachable: () => true,
            findPath: vi.fn().mockReturnValue([{ x: 20, z: 20 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 20 }]),
            update: () => { },
            getBuildingAt: () => null,
            moveEntity: () => { },
            initEntityGrid: () => { },
            serialize: () => ({ h: [], n: [], b: [], logicalWidth: 160, logicalDepth: 160, version: 1 }),
            deserialize: () => { },
            registerEntity: () => { },
            unregisterEntity: () => { },
            getBuildingSize: () => 1,
            isAdjacentToRegion: () => true,
            setSeason: vi.fn(),
            buildings: []
        };

        // Mock Other dependencies
        newGame.unitRenderer = { init: vi.fn(), initInstancedMeshes: vi.fn(), update: vi.fn(), updatePosition: vi.fn(), dispose: vi.fn() };
        newGame.buildingRenderer = { init: vi.fn(), initInstancedMeshes: vi.fn(), update: vi.fn(), updatePosition: vi.fn(), dispose: vi.fn() };
        newGame.goblinRenderer = { init: vi.fn(), initInstancedMeshes: vi.fn(), update: vi.fn(), updatePosition: vi.fn(), dispose: vi.fn() };
        newGame.treeRenderer = { init: vi.fn(), initInstancedMeshes: vi.fn(), update: vi.fn(), updatePosition: vi.fn(), dispose: vi.fn() };
        newGame.minimap = { update: vi.fn(), serialize: () => ({}), deserialize: () => { }, dispose: vi.fn(), setSeason: vi.fn() };
        if (typeof alert === 'undefined') {
            vi.stubGlobal('alert', vi.fn());
        }

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
        expect(loadedUnit.state).toBeInstanceOf(Job);

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
            await Promise.resolve(); // Flush microtasks from findPathAsync

            if (loadedUnit.state.constructor.name === 'Wander' && i < 15) {
                console.log(`[DIAG] Frame ${i}: Flapped to Wander. req.status=${loadedReq.status}, assignedTo=${loadedReq.assignedTo}, unit.targetReq=${loadedUnit.targetRequest ? loadedUnit.targetRequest.id : 'null'}`);
            }

            stateLog.push(loadedUnit.state.constructor.name);
        }

        // Check if WanderState ever appeared
        const hasWandered = stateLog.some(s => s === 'Wander');
        expect(hasWandered, `Unit should NOT wander. History: ${stateLog.join(' -> ')}`).toBe(false);
        expect(loadedUnit.state).toBeInstanceOf(Job);
    });
});
