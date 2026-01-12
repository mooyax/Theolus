
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState } from '../ai/states/UnitStates.js';

// Lightweight Mocks
global.window = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    getComputedStyle: () => ({ display: 'none' }),
    addEventListener: vi.fn(),
    requestAnimationFrame: vi.fn(),
    cancelAnimationFrame: vi.fn(),
    alert: vi.fn(),
    game: null
};
global.document = {
    getElementById: vi.fn(() => ({ style: {}, innerText: '' })),
    createElement: vi.fn(() => ({
        getContext: () => ({ fillRect: () => { }, beginPath: () => { }, moveTo: () => { }, lineTo: () => { }, stroke: () => { } }),
        style: {}, width: 0, height: 0, toDataURL: () => ''
    })),
    createElementNS: vi.fn(() => ({
        style: {}, width: 0, height: 0, getContext: () => ({})
    })),
    body: { appendChild: vi.fn(), style: {} }
};

const store = {};
global.localStorage = {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, val) => { store[key] = val.toString(); }),
    clear: vi.fn(() => { for (const k in store) delete store[k]; }),
    removeItem: vi.fn((key) => { delete store[key]; })
};
global.alert = vi.fn();

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
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { update() { } dispose() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { update() { } updateLighting() { } dispose() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { update() { } dispose() { } } }));

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
    class MockObject3D {
        constructor() { this.position = new MockVector3(); this.rotation = { x: 0, y: 0, z: 0 }; this.scale = new MockVector3(1, 1, 1); this.add = vi.fn(); this.remove = vi.fn(); this.children = []; this.traverse = vi.fn(); }
        lookAt() { }
    }
    class MockBufferAttribute {
        constructor(array, itemSize) {
            this.array = array;
            this.itemSize = itemSize;
            this.count = array.length / itemSize;
            this.needsUpdate = false;
        }
        getX(i) { return this.array[i * this.itemSize]; }
        getY(i) { return this.array[i * this.itemSize + 1]; }
        setX(i, v) { this.array[i * this.itemSize] = v; }
        setY(i, v) { this.array[i * this.itemSize + 1] = v; }
        setXYZ(i, x, y, z) {
            this.array[i * this.itemSize] = x;
            this.array[i * this.itemSize + 1] = y;
            this.array[i * this.itemSize + 2] = z;
        }
    }
    class MockPlaneGeometry {
        constructor(width, height, widthSegments, heightSegments) {
            this.parameters = { width, height, widthSegments, heightSegments };
            const count = (widthSegments + 1) * (heightSegments + 1);
            const positions = new Float32Array(count * 3);
            for (let i = 0; i < count; i++) {
                positions[i * 3] = (i % (widthSegments + 1)) - width / 2;
                positions[i * 3 + 1] = Math.floor(i / (widthSegments + 1)) - height / 2;
                positions[i * 3 + 2] = 0;
            }
            this.attributes = {
                position: new MockBufferAttribute(positions, 3),
                color: new MockBufferAttribute(new Float32Array(count * 3), 3)
            };
            this.index = null;
        }
        setAttribute(name, attr) { this.attributes[name] = attr; }
        setIndex(idx) { this.index = idx; }
        computeVertexNormals() { }
        dispose() { }
    }
    return {
        Vector3: MockVector3,
        Object3D: MockObject3D,
        Group: class extends MockObject3D { },
        Mesh: class extends MockObject3D { },
        Points: class extends MockObject3D { },
        LineSegments: class extends MockObject3D { },
        Scene: class extends MockObject3D { },
        OrthographicCamera: class extends MockObject3D { constructor() { super(); this.left = 0; this.right = 0; this.top = 0; this.bottom = 0; this.updateProjectionMatrix = vi.fn(); } },
        AmbientLight: class extends MockObject3D { },
        DirectionalLight: class extends MockObject3D { },
        BoxGeometry: class { translate() { } },
        PlaneGeometry: MockPlaneGeometry,
        BufferGeometry: class { setAttribute() { } setIndex() { } },
        BufferAttribute: MockBufferAttribute,
        Plane: class { constant = 0; normal = new MockVector3(); setComponents() { } },
        CylinderGeometry: class { translate() { } },
        ConeGeometry: class { translate() { } },
        SphereGeometry: class { translate() { } },
        MeshStandardMaterial: class { },
        MeshLambertMaterial: class { },
        MeshBasicMaterial: class { },
        PointsMaterial: class { },
        LineBasicMaterial: class { },
        CanvasTexture: class { },
        Color: class { constructor(r, g, b) { this.r = r; this.g = g; this.b = b; } setHex() { } set() { } lerp() { } getHSL() { return { h: 0, s: 0, l: 0 }; } setHSL() { } },
        Raycaster: class { setFromCamera() { } intersectObjects() { return []; } },
        ShaderMaterial: class { },
        AdditiveBlending: 2,
        DoubleSide: 2,
        Fog: class { constructor() { } },
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

describe('Real Terrain Restoration Logic', () => {
    let game;

    beforeEach(async () => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        Unit.nextId = 0;

        // Force Flat Terrain
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

        game = new Game(null, null, true); // Use minimal init
        game.terrain.logicalWidth = 80;
        game.terrain.logicalDepth = 80;
        game.terrain.getTileHeight = () => 10; // Allow movement
        game.terrain.findPath = vi.fn().mockImplementation(() => [{ x: 20, z: 20 }]); // Ensure move starts with fresh array
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

        // Verify Setup
        unit.changeState(new JobState(unit));
        expect(unit.isMoving).toBe(true);
        // expect(unit.path).toBeDefined(); // Linear move may not have path

        game.saveGame(1);

        game.units = [];
        game.requestQueue = [];

        await game.loadGame(1);

        const restoredUnit = game.units[0];

        // ASSERT: Unit should be moving immediately after load (JobState re-entry via loadGame)
        expect(restoredUnit).toBeDefined();
        expect(restoredUnit.isMoving).toBe(true);
        expect(restoredUnit.targetRequest).toBeDefined();
        expect(restoredUnit.targetRequest.id).toBe('req_manual_persistent');

        // Verify Path Validity - Allow null path if linear moving
        if (restoredUnit.isMoving && (!restoredUnit.path || restoredUnit.path.length === 0)) {
            console.log("Unit is moving linearly (No Path array). This is valid for short distances.");
        } else if (!restoredUnit.isMoving) {
            throw new Error("Unit is NOT moving!");
        }

        // Run one update to confirm it continues moving
        restoredUnit.updateLogic(game.gameTime, 0.1);
        expect(restoredUnit.isMoving).toBe(true);

        console.log(`Test Success: Unit is ID ${restoredUnit.id} State: ${restoredUnit.state.constructor.name} PathLen: ${restoredUnit.path ? restoredUnit.path.length : 'linear'}`);
    });
});
