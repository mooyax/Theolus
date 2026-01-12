
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game';
import { Unit } from '../Unit';

// Mock Three.js to avoid canvas/visual issues
vi.mock('three', async () => {
    class MockVec3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
    }
    class MockGeometry {
        constructor() { this.translate = vi.fn().mockReturnThis(); this.rotateX = vi.fn().mockReturnThis(); }
        dispose() { }
    }
    return {
        Vector3: MockVec3,
        Frustum: class { setFromProjectionMatrix() { } containsPoint() { return true; } },
        Matrix4: class { set() { } copy() { } },
        Plane: class { constructor() { this.set = vi.fn(); } },
        Fog: class { },
        Mesh: class {
            constructor() {
                this.position = new MockVec3();
                this.material = { clone: () => ({ uniforms: { uColor: { value: { setHex: vi.fn() } } } }), dispose: vi.fn() };
                this.geometry = new MockGeometry();
                this.rotation = { y: 0 };
            }
        },
        Scene: class { add() { } remove() { } },
        OrthographicCamera: class {
            constructor() { this.position = { set: vi.fn() }; }
            lookAt() { }
            updateProjectionMatrix() { }
        },
        WebGLRenderer: class {
            constructor() { this.domElement = {}; }
            setSize() { }
            setPixelRatio() { }
        },
        AmbientLight: class { },
        DirectionalLight: class { position = { set: vi.fn() }; },
        BoxGeometry: class extends MockGeometry { },
        SphereGeometry: class extends MockGeometry { },
        CylinderGeometry: class extends MockGeometry { },
        PlaneGeometry: class extends MockGeometry { },
        ConeGeometry: class extends MockGeometry { },
        CapsuleGeometry: class extends MockGeometry { },
        MeshStandardMaterial: class { constructor() { this.setValues = vi.fn(); } },
        MeshLambertMaterial: class { },
        MeshBasicMaterial: class { },
        CanvasTexture: class { },
        ShaderMaterial: class { clone() { return this; } },
        Color: class { setHex() { } set() { } },
    };
});

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls', () => {
    return {
        OrbitControls: class {
            constructor() {
                this.target = { set: vi.fn(), copy: vi.fn() };
                this.enableDamping = false;
            }
            update() { }
        }
    };
});

vi.mock('../Terrain', () => {
    return {
        Terrain: class {
            constructor() {
                this.grid = [];
                this.logicalWidth = 40;
                this.logicalDepth = 40;
                this.buildings = [];
                this.entityGrid = []; // Minimal
            }
            update() { }
            getTileHeight() { return 5; }
            getSlope() { return 0; }
            setSeason() { }
            isWalkable() { return true; }
            registerEntity() { }
            unregisterEntity() { }
            gridToWorld(v) { return v; }
            findPath(sx, sz, ex, ez) { return [{ x: ex, z: ez }]; }
            pathfindingCalls = 0;
        }
    };
});

// Mock Managers to prevent instantiation crash
vi.mock('../CloudManager', () => ({ CloudManager: class { } }));
vi.mock('../BirdManager', () => ({ BirdManager: class { } }));
vi.mock('../SheepManager', () => ({ SheepManager: class { } }));
vi.mock('../GoblinManager', () => ({ GoblinManager: class { } }));
vi.mock('../FishManager', () => ({ FishManager: class { } }));
vi.mock('../Minimap', () => ({ Minimap: class { } }));
vi.mock('../Compass', () => ({ Compass: class { } }));
vi.mock('../UnitRenderer', () => ({ UnitRenderer: class { } }));
vi.mock('../BuildingRenderer', () => ({ BuildingRenderer: class { } }));
vi.mock('../InputManager', () => ({ InputManager: class { update() { } } }));

describe('Force Assignment Integration', () => {
    let game;
    let worker;

    beforeEach(() => {
        // Mock Browser Globals
        if (typeof window !== 'undefined') {
            window.innerWidth = 800;
            window.innerHeight = 600;
            window.devicePixelRatio = 1;
        }
        if (typeof document !== 'undefined') {
            vi.spyOn(document, 'getElementById').mockReturnValue({ addEventListener: vi.fn() });
            if (!document.body) document.body = { appendChild: vi.fn() };
            else vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });
        }
        global.requestAnimationFrame = vi.fn();

        // Spy on Game prototype
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'initMarkerMaterial').mockImplementation(() => { }); // Skip shader init

        game = new Game();
        // Terrain is already mocked by module mock, but we can refine it if needed
        // game.terrain is instance of Mocked Terrain
        game.terrain.grid = Array(40).fill(null).map(() => Array(40).fill({ height: 5, hasBuilding: false }));

        game.units = [];

        // Create REAL Unit (mocking scene)
        const sceneMock = { add: vi.fn(), remove: vi.fn() };
        worker = new Unit(sceneMock, game.terrain, 10, 10, 'worker', false);
        worker.game = game;
        worker.id = 1;
        // Mock Entity methods if needed, but we want to test execution

        game.units.push(worker);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should successfully triggerMove without infinite loop', () => {
        // Test triggerMove specifically
        worker.triggerMove(15, 15, 100);

        expect(worker.isMoving).toBe(true);
        // Path is not defined for greedy moves
        // expect(worker.path).toBeDefined();
        // If this finishes, no infinite loop.
    });

    it('should handle Force Assignment logic block', () => {
        const req = { type: 'raise', x: 12, z: 12, status: 'pending' };

        // Use the logic block we plan to enable
        let bestUnit = null;
        let minDistSq = 40 * 40;

        // Simulate Game.units iteration
        for (const unit of game.units) {
            const dx = unit.gridX - 12;
            const dz = unit.gridZ - 12;
            const dSq = dx * dx + dz * dz;
            if (dSq < minDistSq) {
                minDistSq = dSq;
                bestUnit = unit;
            }
        }

        if (bestUnit) {
            bestUnit.targetRequest = req;
            req.status = 'assigned';
            bestUnit.action = 'Approaching Job';

            // Critical Move
            bestUnit.triggerMove(req.x, req.z, 200);
        }

        expect(bestUnit).toBe(worker);
        expect(worker.targetRequest).toBe(req);
        // Verify movement started
        expect(worker.isMoving).toBe(true);
        // Greedy move logic doesn't use 'path' array property
        // It sets targetGridX/Z immediately
    });
});
