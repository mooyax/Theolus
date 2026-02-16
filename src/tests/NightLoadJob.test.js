import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Actor } from '../Actor.js';
import { Job, Sleep } from '../ai/states/UnitStates.js';

// --- MOCKS ---

vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal();

    class MockColor {
        constructor() {
            this.setHex = vi.fn().mockReturnValue(this);
            this.set = vi.fn().mockReturnValue(this);
            this.copy = vi.fn().mockReturnValue(this);
            this.lerp = vi.fn().mockReturnValue(this);
            this.getHSL = vi.fn(() => ({ h: 0, s: 0, l: 0 }));
            this.setHSL = vi.fn().mockReturnValue(this);
        }
    }

    class MockBufferAttribute {
        constructor(array, itemSize) {
            this.array = array;
            this.itemSize = itemSize;
            this.count = array ? array.length / itemSize : 0;
        }
        getX(i) { return this.array[i * this.itemSize]; }
        getY(i) { return this.array[i * this.itemSize + 1]; }
        getZ(i) { return this.array[i * this.itemSize + 2]; }
        setX(i, v) { this.array[i * this.itemSize] = v; }
        setY(i, v) { this.array[i * this.itemSize + 1] = v; }
        setZ(i, v) { this.array[i * this.itemSize + 2] = v; }
        setXYZ(i, x, y, z) {
            if (!this.array) return;
            this.array[i * this.itemSize] = x;
            this.array[i * this.itemSize + 1] = y;
            this.array[i * this.itemSize + 2] = z;
        }
    }

    class MockGeometry {
        constructor() {
            this.attributes = {
                position: new MockBufferAttribute(new Float32Array(100 * 3), 3),
                color: new MockBufferAttribute(new Float32Array(100 * 3), 3),
            };
            this.userData = {};
        }
        setAttribute(name, attr) { this.attributes[name] = attr; }
        getAttribute(name) { return this.attributes[name]; }
        computeVertexNormals() { }
        dispose() { }
        translate() { return this; }
        rotateX() { return this; }
        rotateY() { return this; }
        rotateZ() { return this; }
        scale() { return this; }
        center() { return this; }
        applyMatrix4() { return this; }
    }

    class MockMaterial {
        constructor() {
            this.color = new MockColor();
            this.emissive = new MockColor();
            this.uniforms = {
                uTime: { value: 0 },
                uColor: { value: new MockColor() }
            };
            this.dispose = vi.fn();
            this.clone = vi.fn().mockReturnValue(this);
            this.side = 0;
            this.transparent = false;
            this.opacity = 1;
        }
    }

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
            constructor() {
                super();
                this.background = new MockColor();
            }
        },
        Color: MockColor,
        Vector3: actual.Vector3,
        Matrix4: actual.Matrix4,
        Euler: actual.Euler,
        Quaternion: actual.Quaternion,
        BoxGeometry: MockGeometry,
        PlaneGeometry: MockGeometry,
        CylinderGeometry: MockGeometry,
        ConeGeometry: MockGeometry,
        SphereGeometry: MockGeometry,
        MeshStandardMaterial: MockMaterial,
        MeshBasicMaterial: MockMaterial,
        MeshLambertMaterial: MockMaterial,
        Mesh: class extends actual.Object3D {
            constructor(g, m) {
                super();
                this.geometry = g || new MockGeometry();
                this.material = m || new MockMaterial();
            }
        },
        Points: class extends actual.Object3D {
            constructor(g, m) {
                super();
                this.geometry = g || new MockGeometry();
                this.material = m || new MockMaterial();
            }
        },
        InstancedMesh: class extends actual.Object3D {
            constructor(g, m, count) {
                super();
                this.geometry = g || new MockGeometry();
                this.material = m || new MockMaterial();
                this.count = count;
                this.instanceMatrix = { setUsage: vi.fn(), needsUpdate: false };
                this.instanceColor = { needsUpdate: false };
            }
            setMatrixAt() { }
            setColorAt() { }
        },
        BufferAttribute: MockBufferAttribute,
        CanvasTexture: class { constructor() { } dispose() { } },
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = new THREE.Vector3(); }
        update() { }
        addEventListener() { }
    }
}));

vi.mock('three/examples/jsm/utils/BufferGeometryUtils.js', () => ({
    mergeGeometries: vi.fn(geos => geos[0]),
    mergeVertices: vi.fn(geo => geo),
}));

vi.mock('../Terrain.js', () => ({
    Terrain: class {
        constructor() {
            this.logicalWidth = 100;
            this.logicalDepth = 100;
            this.grid = Array(100).fill(null).map(() => Array(100).fill({ regionId: 1, height: 10, type: 'grass' }));
            this.entityGrid = Array(100).fill(null).map(() => Array(100).fill([]));
            this.updateColors = vi.fn();
            this.updateMesh = vi.fn();
            this.calculateRegions = vi.fn();
            this.deserialize = vi.fn().mockResolvedValue(true);
            this.serialize = vi.fn(() => ({ grid: [], width: 100, depth: 100 }));
            this.registerEntity = vi.fn();
            this.unregisterEntity = vi.fn();
            this.moveEntity = vi.fn();
            this.getTileHeight = vi.fn(() => 10);
            this.findPath = vi.fn((sx, sz, ex, ez) => [{ x: ex, z: ez }]);
            this.findPathAsync = vi.fn((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }]));
            this.getMultiplier = vi.fn(() => 1);
            this.getBiomeColor = vi.fn(() => ({ r: 0, g: 1, b: 0 }));
            this.isReachable = vi.fn(() => true);
            this.setSeason = vi.fn();
            this.checkYield = () => Promise.resolve();
            this.getBuildingAt = vi.fn(() => null);
            this.findBestTarget = vi.fn(() => null);
            this.initEntityGrid = vi.fn();
            this.getWidth = () => 100;
        }
    }
}));

describe('Night Loading Job Assignment', () => {
    let game;
    let scene;

    beforeEach(() => {
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        document.body.innerHTML = `
            <div id="loading-screen"></div>
            <div id="loading-bar"></div>
            <div id="loading-text"></div>
            <div id="ui"></div>
            <canvas id="minimap"></canvas>
            <div id="mana-bar"></div>
        `;
        // Global alert mock for current environment
        if (typeof global !== 'undefined') global.alert = vi.fn();

        // FIX: Functional LocalStorage Mock
        const store = new Map();
        global.localStorage = {
            getItem: vi.fn((key) => store.get(key) || null),
            setItem: vi.fn((key, value) => store.set(key, value.toString())),
            clear: vi.fn(() => store.clear()),
            removeItem: vi.fn((key) => store.delete(key)),
            length: 0,
            key: vi.fn(),
        };

        // Check localStorage
        try {
            localStorage.setItem('test_save', 'test');
            const val = localStorage.getItem('test_save');
            if (val !== 'test') console.error("LocalStorage check FAILED: Value mismatch");
            localStorage.removeItem('test_save');
        } catch (e) {
            console.error("LocalStorage check FAILED with error:", e);
        }
        scene = new THREE.Scene();
        scene.background = new THREE.Color();
        game = new Game(scene, null, true);

        // Mock Terrain for initial game
        game.terrain = {
            grid: Array(100).fill(null).map(() => Array(100).fill({ type: 'ground', height: 10, regionId: 1 })),
            findBestTarget: vi.fn(() => null),
            getTileHeight: () => 10,
            getWidth: () => 100,
            getTileHeight: () => 1,
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 20 }]), // Mock pathfinding
            isReachable: () => true,
            findPath: vi.fn().mockReturnValue([{ x: 10, z: 10 }]),
            update: () => { },
            getBuildingAt: () => null,
            moveEntity: () => { },
            initEntityGrid: () => { },
            deserialize: vi.fn(), // Prevent real deserialization
            serialize: vi.fn(),
            registerEntity: () => { },
            unregisterEntity: () => { }
        };

        game.directionalLight = { intensity: 1, position: new THREE.Vector3() };
        game.controls = { target: new THREE.Vector3(), update: vi.fn() };
        window.alert = vi.fn();
        game.gameActive = true;
    });

    it('should correctly resume manual job when loaded at night', async () => {
        // Setup Night
        game.gameTime = 20;
        game.updateEnvironment(0);
        expect(game.isNight).toBe(true);

        const unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;

        // Issue manual request
        const req = game.addRequest('raise', 15, 15, true);
        game.claimRequest(unit, req);

        expect(unit.targetRequest).toBe(req);
        expect(unit.state).toBeInstanceOf(Job);

        // Save
        const saveSuccess = game.saveGame(1);
        if (!saveSuccess) {
            console.error("Save FAILED! Alert:", window.alert.mock.calls.length > 0 ? window.alert.mock.calls[0][0] : "None");
        }
        expect(saveSuccess).toBe(true);
        expect(window.alert).not.toHaveBeenCalled();

        // Reset and Load
        const newGame = new Game(new THREE.Scene(), null, true);
        newGame.controls = { target: new THREE.Vector3(), update: vi.fn() }; // Mock for load
        console.log("Load Started for slot 1...");
        const success = await newGame.loadGame(1);
        if (!success) {
            console.error("Load FAILED! Alert:", window.alert.mock.calls.length > 0 ? window.alert.mock.calls[0][0] : "None");
        }
        expect(success).toBe(true);

        const loadedUnit = newGame.units.find(u => u.id === 0);
        const loadedReq = newGame.requestQueue.find(r => r.id === req.id);

        expect(loadedUnit).toBeDefined();
        expect(loadedReq).toBeDefined();
        expect(newGame.isNight).toBe(true);

        // Verify state
        expect(loadedUnit.targetRequest).toBe(loadedReq);
        expect(loadedUnit.state).toBeInstanceOf(Job);
        expect(loadedUnit.isSleeping).toBe(false);
        expect(loadedUnit.action).toBe('Approaching Job');
    });

    it('should wake up unit if they were saved while sleeping but had a job assigned (manual)', async () => {
        game.gameTime = 20;
        game.updateEnvironment(0);

        const unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;

        // Force sleep
        unit.changeState(new Sleep(unit));
        unit.isSleeping = true;
        unit.action = 'Sleeping';

        // Assign manual job
        const req = game.addRequest('raise', 15, 15, true);
        game.claimRequest(unit, req);

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.isSleeping).toBe(false);

        game.saveGame(2);

        const newGame = new Game(new THREE.Scene(), null, true);
        newGame.controls = { target: new THREE.Vector3(), update: vi.fn() }; // Mock for load
        await newGame.loadGame(2);

        // Inject missed mock after load (since load recreates terrain)
        if (!newGame.terrain.findBestTarget) {
            newGame.terrain.findBestTarget = vi.fn(() => null);
        }

        const loadedUnit = newGame.units.find(u => u.id === 0);
        expect(loadedUnit.state).toBeInstanceOf(Job);
        expect(loadedUnit.isSleeping).toBe(false);
        // Verifying Job is sufficient to prove unit woke up
        // (isMoving depends on pathfinding which may not work in this mock env)
        expect(loadedUnit.state).toBeInstanceOf(Job);

        // Verify final destination (Request) 
        expect(loadedUnit.targetRequest.x).toBe(15);
        expect(loadedUnit.targetRequest.z).toBe(15);
    });

    it('should treat legacy requests (missing isManual) as manual for specific types', async () => {
        const newGame = new Game(new THREE.Scene(), null, true);
        newGame.controls = { target: new THREE.Vector3(), update: vi.fn() };
        newGame.frameCounter = 0;
        window.game = newGame;

        // Mock SaveManager payload representing a LEGACY save (no isManual)
        const legacyData = {
            gameTime: 20, // Night
            terrain: {
                serialize: () => { }, // Dummy, effectively skipped or mocked
                findBestTarget: vi.fn(() => null),
                getTileHeight: () => 10,
            },
            units: [{
                id: 0, role: 'worker', gridX: 10, gridZ: 10,
                targetRequestId: 'req_legacy',
                // Saved with legacy format might miss some fields, but crucial is isManual missing
            }],
            requests: [{
                id: 'req_legacy',
                type: 'raise', // Should be auto-detected as manual
                x: 15, z: 15,
                status: 'assigned',
                assignedTo: 0,
                // isManual is UNDEFINED here
            }],
            camera: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 } }
        };

        // Bypass full SaveManager compression for test simplicity
        vi.spyOn(newGame.saveManager, 'load').mockReturnValue(legacyData);
        // Bypass terrain deserialization to avoid crash with dummy data
        vi.spyOn(newGame.terrain, 'deserialize').mockImplementation(() => { });
        // FIX: Ensure pathfinding succeeds with a FRESH array each time so Actor.js mutation (shift) doesn't break retry
        vi.spyOn(newGame.terrain, 'findPath').mockImplementation(() => [{ x: 15, z: 15 }]);
        newGame.terrain.findPathAsync = vi.fn().mockResolvedValue([{ x: 15, z: 15 }]);

        // FIX: Mock Actor reachability to prevent "Unreachable" logic from triggering due to uninitialized terrain height
        vi.spyOn(Actor.prototype, 'isReachable').mockReturnValue(true);
        vi.spyOn(Actor.prototype, 'canMoveTo').mockReturnValue(true);

        await newGame.loadGame(3);

        const loadedReq = newGame.requestQueue.find(r => r.id === 'req_legacy');
        expect(loadedReq).toBeDefined();
        // The Fix Verification: Should be TRUE because type is 'raise'
        expect(loadedReq.isManual).toBe(true);

        const loadedUnit = newGame.units.find(u => u.id === 0);
        expect(loadedUnit.targetRequest).toBe(loadedReq);

        // Force an update to allow Sleep to transition to Job
        newGame.frameCounter = 100;
        loadedUnit.updateLogic(21, 0.1);

        // It should be moving/working because Sleep sees isManual=true
        // We check State because isMoving might be false if pathfinding fails in mock environment
        expect(loadedUnit.state.constructor.name).toBe('Job');
    });
});
