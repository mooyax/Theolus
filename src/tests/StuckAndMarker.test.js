
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game';
import { Unit } from '../Unit';
import * as THREE from 'three';
import { WanderState } from '../ai/states/State';
import { UnitWanderState, JobState } from '../ai/states/UnitStates';

// DOM Mock
if (!global.document) {
    global.document = {
        createElement: (tag) => {
            return {
                style: {},
                appendChild: () => { },
                addEventListener: () => { },
                getAttribute: () => { },
                setAttribute: () => { },
                classList: { add: () => { }, remove: () => { } }
            };
        },
        body: {
            appendChild: () => { },
            removeChild: () => { },
            innerHTML: ''
        },
        getElementById: (id) => {
            if (id === 'stats-container' || id === 'stats') {
                return {
                    style: {},
                    innerText: '',
                    appendChild: () => { }
                };
            }
            return null;
        }
    };
    global.window = {
        innerWidth: 800,
        innerHeight: 600,
        addEventListener: () => { },
        requestAnimationFrame: () => { },
        getComputedStyle: () => ({ display: 'none' })
    };
    global.navigator = { userAgent: 'node' };
    global.Worker = class {
        constructor() { }
        postMessage() { }
        terminate() { }
        addEventListener() { }
    };
}

// MOCKS
vi.mock('three', async () => {
    const actual = await vi.importActual('three');

    return {
        ...actual,
        WebGLRenderer: class {
            constructor() {
                this.domElement = document.createElement('canvas');
                this.shadowMap = {};
            }
            setSize() { }
            setPixelRatio() { }
            render() { }
        },
        Scene: class {
            constructor() {
                this.position = { x: 0, y: 0, z: 0 };
                this.children = [];
                this.fog = null;
                this.environment = null;
            }
            add() { }
            remove() { }
        },
        PerspectiveCamera: class {
            constructor() {
                this.position = { set: () => { }, copy: () => { } };
                this.lookAt = () => { };
                this.matrixWorld = new actual.Matrix4();
                this.matrixWorldInverse = new actual.Matrix4();
                this.projectionMatrix = new actual.Matrix4();
            }
            updateMatrixWorld() { }
            updateProjectionMatrix() { }
        },
        OrthographicCamera: class {
            constructor() {
                this.position = { set: () => { }, copy: () => { } };
                this.lookAt = () => { };
                this.left = 0; this.right = 0; this.top = 0; this.bottom = 0;
                this.matrixWorld = new actual.Matrix4();
                this.matrixWorldInverse = new actual.Matrix4();
                this.projectionMatrix = new actual.Matrix4();
            }
            updateMatrixWorld() { }
            updateProjectionMatrix() { }
        },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: { count: 100, array: new Float32Array(300), getX: () => 0, getY: () => 0 },
                    color: { count: 100, array: new Float32Array(300), setXYZ: () => { } },
                    normal: { count: 100, array: new Float32Array(300) },
                    uv: { count: 100, array: new Float32Array(200) }
                };
            }
            setAttribute() { }
            setIndex() { }
            computeVertexNormals() { }
            translate() { }
        },
        MeshLambertMaterial: class {
            constructor() {
                this.color = { setHex: vi.fn() };
            }
        },
        Mesh: class {
            constructor() {
                this.position = { set: vi.fn(), x: 0, y: 0, z: 0, copy: vi.fn() };
                this.rotation = { x: 0, y: 0, z: 0 };
                this.scale = { set: vi.fn() };
            }
            add() { }
            remove() { }
        },
        Group: class {
            constructor() {
                this.position = { set: vi.fn() };
                this.children = [];
            }
            add() { }
            remove() { }
        },
        InstancedMesh: class {
            constructor() {
                this.instanceMatrix = { needsUpdate: false };
                this.instanceColor = { needsUpdate: false };
                this.count = 0;
            }
            setMatrixAt() { }
            setColorAt() { }
            dispose() { }
        },
        TextureLoader: class { load() { } },
        AudioListener: class {
            constructor() {
                this.position = { set: vi.fn() };
                this.rotation = { set: vi.fn() };
                this.up = { set: vi.fn() };
            }
        },
        Audio: class {
            constructor() { this.isPlaying = false; }
            setBuffer() { }
            setLoop() { }
            setVolume() { }
            play() { }
            stop() { }
        },
        AudioLoader: class { load() { } },
        // Geometries
        BoxGeometry: class { rotateX() { } translate() { } computeVertexNormals() { } setAttribute() { } setIndex() { } },
        SphereGeometry: class { rotateX() { } translate() { } computeVertexNormals() { } setAttribute() { } setIndex() { } },
        CylinderGeometry: class { rotateX() { } translate() { } computeVertexNormals() { } setAttribute() { } setIndex() { } },
        ConeGeometry: class { rotateX() { } translate() { } computeVertexNormals() { } setAttribute() { } setIndex() { } },
        Raycaster: class {
            constructor() { }
            setFromCamera() { }
            intersectObjects() { return []; }
        },
        Plane: class {
            constructor(n, c) { }
            clone() { return new this.constructor(); }
        },
        AmbientLight: class { constructor() { } },
        DirectionalLight: class { constructor() { this.position = { set: vi.fn() }; } },
        Color: class { constructor() { } setHex() { } },
        BufferGeometry: class {
            setAttribute() { }
            setIndex() { }
            rotateX() { }
            translate() { }
            computeVertexNormals() { }
        },
        LineBasicMaterial: class { },
        LineSegments: class {
            constructor() { this.position = { set: vi.fn() }; }
        },
        PointsMaterial: class { },
        Points: class {
            constructor() { this.position = { set: vi.fn() }; }
        },
        Vector3: actual.Vector3
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn() }; }
        update() { }
    }
}));

// Manager Mocks (Class Syntax)
vi.mock('../Terrain', () => ({
    Terrain: class {
        constructor() {
            this.logicalWidth = 160;
            this.logicalDepth = 160;
            this.grid = Array(160).fill(null).map(() => Array(160).fill(null).map(() => ({ regionId: 1, height: 1 })));
            this.pathfindingCalls = 0; // Initialize for Actor.js
            this.pathCache = [];
        }
        initTerrain() { }
        getTileHeight() { return 1; }
        update() { }
        updateLights() { }
        updateMeshPosition() { }
        findBestTarget = vi.fn(() => null);

        // Mocking Smart Paths
        findPath(sx, sz, ex, ez) {
            // Return 3 steps to ensure path persists after shift
            return [
                { x: Math.round(sx) + 1, z: Math.round(sz) + 1 },
                { x: Math.round(ex), z: Math.round(ez) }
            ];
        }
        findPathAsync(sx, sz, ex, ez) {
            return Promise.resolve(this.findPath(sx, sz, ex, ez));
        }
        isAdjacentToRegion() { return true; }
        getBuildingSize() { return 1; }
        getRegion() { return 1; }
        getRandomPointInRegion() { return { x: 5, z: 5 }; }
    }
}));

vi.mock('../Minimap', () => ({ Minimap: class { update() { } } }));
vi.mock('../Compass', () => ({ Compass: class { update() { } } }));
vi.mock('../CloudManager', () => ({ CloudManager: class { update() { } } }));
vi.mock('../BirdManager', () => ({ BirdManager: class { update() { } } }));
vi.mock('../SheepManager', () => ({ SheepManager: class { update() { } } }));
vi.mock('../GoblinManager', () => ({ GoblinManager: class { update() { } } }));
vi.mock('../FishManager', () => ({ FishManager: class { update() { } } }));
vi.mock('../SoundManager', () => ({
    SoundManager: class {
        constructor() { this.init = vi.fn(); }
        playSound() { }
        update() { }
    }
}));
vi.mock('../UnitRenderer', () => ({
    UnitRenderer: class {
        init() { }
        update() { }
    }
}));
vi.mock('../BuildingRenderer', () => ({
    BuildingRenderer: class {
        update() { }
        updateLighting() { }
        init() { }
    }
}));
vi.mock('../GoblinRenderer', () => ({ GoblinRenderer: class { update() { } init() { } } }));
vi.mock('../InputManager', () => ({ InputManager: class { update() { } } }));
vi.mock('../SaveManager', () => ({ SaveManager: class { update() { } } }));

describe('Stuck and Marker Debugging', () => {
    let game;

    beforeEach(() => {
        document.body.innerHTML = '<div id="stats"></div>';
        vi.clearAllMocks();

        // Spy on appendChild to prevent happy-dom crash
        vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });

        game = new Game();
        game.units = [];
        game.requestQueue = [];
        game.projectiles = [];
        // Ensure Terrain
        if (!game.terrain) {
            game.terrain = new (require('../Terrain').Terrain)();
        }
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });


    it('should move IMMEDIATELY when assigned a job (no 3s delay)', async () => {
        // 1. Create Unit at (10,10)
        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        game.units.push(unit);
        unit.updateLogic(0, 0, false, []); // Init state
        expect(unit.state).toBeInstanceOf(UnitWanderState);

        // 2. Create Request (Far away to force pathfinding)
        const req = game.addRequest('move', 50, 50); // Correct signature: type, x, z

        // 3. Assign Job MANUALLY (Simulate forcing)
        // This triggers: unit.onJobAssigned -> JobState.enter -> unit.smartMove(path)
        // Bug Fix Target: smartMove should Execute Path[0] IMMEDIATELY.
        try {
            console.log('[Test Debug] Calling assignRequestSync...');
            game.assignRequestSync(req, unit);
        } catch (e) {
            console.error('[Test Debug] Caught Error:', e);
        }

        // Wait for Async Pathfinding and State Transition
        await vi.waitFor(async () => {
            // Trigger Update to pick up the path
            unit.updateLogic(0.016, 0.016, false, []);

            // Verify Immediate Movement
            console.log(`[Test Debug] isMoving: ${unit.isMoving}, PathLen: ${unit.path ? unit.path.length : 'null'}, State: ${unit.state.constructor.name}`);
            expect(unit.isMoving).toBe(true);
            expect(unit.path).toBeTruthy();
            expect(unit.path.length).toBeGreaterThan(0);
            expect(unit.state).toBeInstanceOf(JobState);
        }, { timeout: 1000, interval: 10 });

        // 5. Verify targetRequest Persistence
        expect(unit.targetRequest).toBeDefined();
        expect(unit.targetRequest.id).toBe(req.id);

        // 6. Run a few frames to ensure stability
        // Loop 60 frames (approx 1 sec) to verify persistence
        let totalTime = 0.1;
        for (let i = 0; i < 60; i++) {
            totalTime += 0.016;
            unit.updateMovement(totalTime);
            unit.updateLogic(totalTime, 0.016, false, []);

            // Checks
            expect(unit.isMoving).toBe(true);
            expect(unit.targetRequest).toBeDefined();
            expect(unit.targetRequest.id).toBe(req.id);
        }
    });
});
