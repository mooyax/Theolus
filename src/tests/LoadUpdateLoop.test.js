
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job, Wander } from '../ai/states/UnitStates.js';
import LZString from 'lz-string';

// Lightweight Mocks
global.window = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    getComputedStyle: () => ({ display: 'none' }),
    addEventListener: vi.fn(),
    requestAnimationFrame: vi.fn(),
    cancelAnimationFrame: vi.fn(),
    alert: vi.fn(),
};
global.document = {
    getElementById: vi.fn(() => ({ style: {}, innerText: '', addEventListener: vi.fn() })),
    createElement: vi.fn(() => ({
        getContext: () => ({ fillRect: () => { }, beginPath: () => { }, moveTo: () => { }, lineTo: () => { }, stroke: () => { } }),
        style: {}, width: 0, height: 0, toDataURL: () => ''
    })),
    createElementNS: vi.fn(() => ({
        style: {}, width: 0, height: 0, getContext: () => ({})
    })),
    body: { appendChild: vi.fn(), style: {} }
};
global.localStorage = { getItem: vi.fn(), setItem: vi.fn(), clear: vi.fn(), removeItem: vi.fn() };
global.alert = vi.fn();

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

// MOCK TERRAIN TO AVOID GEOMETRY CRASHES
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
            this.findPath = vi.fn((sx, sz, ex, ez) => [{ x: ex, z: ez }]); // Valid mock path
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

vi.mock('three', () => {
    class MockVector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        clone() { return new MockVector3(this.x, this.y, this.z); }
        add() { return this; }
        sub() { return this; }
        multiplyScalar() { return this; }
    }
    class MockColor {
        constructor(r = 1, g = 1, b = 1) { this.r = r; this.g = g; this.b = b; }
        setHex() { return this; }
        set() { return this; }
        copy(c) { if (c) { this.r = c.r; this.g = c.g; this.b = c.b; } return this; }
        clone() { return new MockColor(this.r, this.g, this.b); }
        lerp(c, t) { return this; }
        getHex() { return (Math.round(this.r * 255) << 16) | (Math.round(this.g * 255) << 8) | Math.round(this.b * 255); }
        toArray(array = [], offset = 0) {
            array[offset] = this.r;
            array[offset + 1] = this.g;
            array[offset + 2] = this.b;
            return array;
        }
    }
    class MockObject3D {
        constructor() {
            this.position = new MockVector3();
            this.rotation = { x: 0, y: 0, z: 0 };
            this.scale = new MockVector3(1, 1, 1);
            this.color = new MockColor();
            this.add = vi.fn();
            this.remove = vi.fn();
        }
        lookAt() { }
    }
    return {
        Vector3: MockVector3,
        Object3D: MockObject3D,
        Group: class extends MockObject3D { },
        Mesh: class extends MockObject3D { },
        Scene: class extends MockObject3D { },
        OrthographicCamera: class extends MockObject3D { constructor() { super(); this.left = 0; this.right = 0; this.top = 0; this.bottom = 0; this.updateProjectionMatrix = vi.fn(); } },
        AmbientLight: class extends MockObject3D { },
        DirectionalLight: class extends MockObject3D { },
        BoxGeometry: class { translate() { } },
        BufferGeometry: class { translate() { } },
        PlaneGeometry: class { translate() { } },
        Plane: class { constant = 0; normal = new MockVector3(); setComponents() { } clone() { return new this.constructor(); } },
        Fog: class { },
        CylinderGeometry: class { translate() { } },
        ConeGeometry: class { translate() { } },
        SphereGeometry: class { translate() { } },
        MeshStandardMaterial: class { },
        MeshLambertMaterial: class { },
        MeshBasicMaterial: class { },
        CanvasTexture: class { },
        Color: class {
            constructor(r = 1, g = 1, b = 1) { this.r = r; this.g = g; this.b = b; }
            setHex() { return this; }
            set() { return this; }
            copy(c) { if (c) { this.r = c.r; this.g = c.g; this.b = c.b; } return this; }
            clone() { return new this.constructor(this.r, this.g, this.b); }
            lerp(c, t) { return this; }
        },
        MOUSE: { LEFT: 0, MIDDLE: 1, RIGHT: 2 },
        Raycaster: class { setFromCamera() { } intersectObjects() { return []; } },
        Clock: class { constructor() { } getDelta() { return 0.016; } getElapsedTime() { return 0; } },
        Frustum: class { setFromProjectionMatrix() { } containsPoint() { return true; } intersectsObject() { return true; } },
        Matrix4: class { constructor() { this.elements = new Float32Array(16); } set() { return this; } copy() { return this; } clone() { return new this.constructor(); } identity() { return this; } multiply() { return this; } makeTranslation() { return this; } makeScale() { return this; } makePerspective() { return this; } fromArray() { return this; } },
        ShaderMaterial: class { },
        AdditiveBlending: 2,
        DoubleSide: 2,
        PCFSoftShadowMap: 1,

        WebGLRenderer: class {
            constructor() {
                this.domElement = { style: {}, getContext: () => ({}) };
                this.shadowMap = {};
                this.capabilities = { getMaxAnisotropy: () => 1 };
            }
            setPixelRatio() { }
            setSize() { }
            render() { }
            dispose() { }
            setClearColor() { }
        },
    };
});

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
        // Ensure Job is available globally if needed by Unit logic relying on window.game
        window.game = game;
    });

    it('should maintain Job after first update loop post-load', async () => {
        // 1. SETUP: Unit with Manual Job
        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        console.log("Setup Unit updateLogic type:", typeof unit.updateLogic);
        expect(unit.updateLogic).toBeDefined();

        unit.id = 100;
        game.units.push(unit);

        const req = game.addRequest('raise', 15, 15, true); // Manual
        req.id = 'req_manual_persistent';
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;

        // 2. SAVE
        console.log("Game SaveManager present:", !!game.saveManager);
        console.log("Game SaveManager save method:", typeof game.saveManager.save);

        try {
            const result = game.saveGame(1);
            console.log("saveGame result:", result);
        } catch (e) { console.error("saveGame threw:", e); }

        console.log("localStorage setItem calls:", localStorage.setItem.mock.calls.length);
        if (localStorage.setItem.mock.calls.length === 0) {
            throw new Error("localStorage.setItem was NOT called!");
        }

        const val = localStorage.setItem.mock.calls[0][1];

        // 3. LOAD
        game.units = [];
        game.requestQueue = [];
        localStorage.getItem.mockReturnValue(val);
        await game.loadGame(1);

        const restoredUnit = game.units[0];
        console.log("Restored Unit Keys:", Object.keys(restoredUnit));

        // CHECK 1: Immediate Post-Load State
        expect(restoredUnit.state).toBeInstanceOf(Job);
        expect(restoredUnit.action).toBe('Approaching Job');

        // 4. SIMULATE UPDATE LOOP
        // FIX: Synchronize simTimeSec and frameCount post-load to satisfy AI time-slicing
        game.simTotalTimeSec = game.gameTotalTime / 1000;
        game.frameCount = 20; // id 100 % 20 == 0

        // Explicitly call updateLogic on unit
        restoredUnit.updateLogic(game.simTotalTimeSec, 0.1, false, game.units, game.terrain.buildings, game.goblinManager.goblins);


        // CHECK 2: State after first update
        // If this fails (reverts to Idle), we found the bug!
        if (restoredUnit.state instanceof Wander) {
            console.log("BUG REPRODUCED: Unit reverted to WanderState/Idle!");
        } else {
            console.log("Unit maintained Job.");
        }

        expect(restoredUnit.state).toBeInstanceOf(Job);
        expect(restoredUnit.action).not.toBe('Idle');
    });
});
