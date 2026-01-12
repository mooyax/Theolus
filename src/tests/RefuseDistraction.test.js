
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Game } from '../Game.js';
import { JobState, UnitWanderState } from '../ai/states/UnitStates.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
    class MockBufferAttribute {
        constructor(array, itemSize) {
            this.array = array || new Float32Array(300);
            this.itemSize = itemSize || 3;
            this.count = this.array.length / this.itemSize;
            this.needsUpdate = false;
        }
        getX(i) { return this.array[i * this.itemSize]; }
        getY(i) { return this.array[i * this.itemSize + 1]; }
        getZ(i) { return this.array[i * this.itemSize + 2]; }
        setX(i, v) { this.array[i * this.itemSize] = v; }
        setY(i, v) { this.array[i * this.itemSize + 1] = v; }
        setZ(i, v) { this.array[i * this.itemSize + 2] = v; }
        setXYZ(i, x, y, z) {
            this.setX(i, x);
            this.setY(i, y);
            this.setZ(i, z);
        }
    }

    return {
        Vector3: class {
            constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
            clone() { return new this.constructor(this.x, this.y, this.z); }
            add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
            sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
            multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
            distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.z - v.z) ** 2); }
            copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
            set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
            normalize() { const l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); if (l > 0) { this.x /= l; this.y /= l; this.z /= l; } return this; }
            applyAxisAngle() { return this; }
        },
        Color: class {
            constructor(r, g, b) { this.r = r || 0; this.g = g || 0; this.b = b || 0; }
            setHex(hex) { return this; }
            set(v) { return this; }
            lerp(c, t) { return this; }
            clone() {
                const c = new this.constructor();
                c.copy(this);
                return c;
            }
            copy(c) {
                this.r = c.r; this.g = c.g; this.b = c.b;
                return this;
            }
            setRGB(r, g, b) { this.r = r; this.g = g; this.b = b; return this; }
        },
        CanvasTexture: class { constructor() { } },
        SRGBColorSpace: 'srgb',
        LinearMipmapLinearFilter: 1,
        NormalBlending: 1,
        AdditiveBlending: 2,
        DoubleSide: 0,
        FrontSide: 1,
        BackSide: 2,
        DynamicDrawUsage: 1,
        InstancedMesh: class { constructor() { this.instanceMatrix = { setUsage: vi.fn(), set: vi.fn() }; this.position = { x: 0, y: 0, z: 0 }; } setMatrixAt() { } setColorAt() { } dispose() { } },
        SpriteMaterial: class { constructor() { } clone() { return new this.constructor(); } },
        Sprite: class { constructor() { this.position = { set: vi.fn() }; this.scale = { set: vi.fn() }; this.add = vi.fn(); } },
        FogExp2: class { constructor() { } },
        Fog: class { constructor() { } },
        Group: class { constructor() { this.position = { x: 0, y: 0, z: 0, set: vi.fn() }; this.add = vi.fn(); this.remove = vi.fn(); this.userData = {}; } },
        Mesh: class { constructor() { this.position = { x: 0, y: 0, z: 0, set: vi.fn() }; this.scale = { set: vi.fn() }; this.rotation = { y: 0 }; this.userData = {}; this.renderOrder = 0; } },
        MeshStandardMaterial: class { constructor() { this.setValues = vi.fn(); this.dispose = vi.fn(); this.emissive = { setHex: vi.fn() }; } clone() { return new this.constructor(); } },
        ShaderMaterial: class { constructor() { this.setValues = vi.fn(); this.dispose = vi.fn(); } clone() { return new this.constructor(); } },
        MeshLambertMaterial: class { constructor() { this.setValues = vi.fn(); this.dispose = vi.fn(); this.emissive = { setHex: vi.fn() }; } clone() { return new this.constructor(); } },
        MeshBasicMaterial: class { constructor() { this.setValues = vi.fn(); this.dispose = vi.fn(); } clone() { return new this.constructor(); } },
        CylinderGeometry: class { constructor() { } translate() { } dispose() { } },
        SphereGeometry: class { constructor() { } scale() { } translate() { } dispose() { } },
        BoxGeometry: class { constructor() { } translate() { } dispose() { } },
        ConeGeometry: class { constructor() { } rotateX() { } rotateY() { } rotateZ() { } translate() { } dispose() { } },
        BufferGeometry: class { constructor() { this.attributes = {}; } setAttribute() { } translate() { } rotateX() { } rotateY() { } rotateZ() { } nonIndexedNormalHelper() { } dispose() { } setIndex() { } computeVertexNormals() { } },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: new MockBufferAttribute(new Float32Array(300), 3),
                    color: new MockBufferAttribute(new Float32Array(300), 3)
                };
                this.index = { count: 100, array: [] };
                this.translate = vi.fn();
                this.rotateX = vi.fn();
                this.setAttribute = vi.fn();
                this.computeVertexNormals = vi.fn();
            }
            dispose() { }
        },
        Object3D: class { constructor() { this.position = { set: vi.fn(), copy: vi.fn() }; this.scale = { set: vi.fn() }; this.rotation = { x: 0, y: 0, z: 0, set: vi.fn() }; this.updateMatrix = vi.fn(); this.matrix = { clone: vi.fn() }; } },
        Sphere: class { constructor() { } },
        Plane: class { constructor(normal, constant) { this.normal = normal; this.constant = constant || 0; } },
        BufferAttribute: MockBufferAttribute,
        Frustum: class { setFromProjectionMatrix() { } intersectsObject() { return true; } },
        Matrix4: class { multiplyMatrices() { } },
        Scene: class { constructor() { this.add = vi.fn(); this.remove = vi.fn(); this.background = null; } },
        Color: class { constructor() { this.setHex = vi.fn(); } },
        OrthographicCamera: class {
            constructor() {
                this.left = 0; this.right = 0; this.top = 0; this.bottom = 0;
                this.position = { x: 0, y: 0, z: 0, set: vi.fn(), copy: vi.fn(), add: vi.fn() };
                this.lookAt = vi.fn();
                this.updateProjectionMatrix = vi.fn();
                this.zoom = 1;
                this.updateMatrixWorld = vi.fn();
                this.matrixWorld = { invert: vi.fn() };
                this.matrixWorldInverse = { copy: vi.fn(() => ({ invert: vi.fn() })) };
            }
        },
        WebGLRenderer: class { constructor() { this.setSize = vi.fn(); this.setPixelRatio = vi.fn(); this.render = vi.fn(); this.domElement = document.createElement('canvas'); this.shadowMap = { enabled: true }; } },
        PCFSoftShadowMap: 1,
        AmbientLight: class { },
        DirectionalLight: class { constructor() { this.position = { set: vi.fn() }; this.castShadow = false; this.shadow = { mapSize: { width: 512, height: 512 }, camera: { near: 0, far: 0 } }; } },
        Raycaster: class { setFromCamera() { } intersectObjects() { return []; } },
        Vector2: class { },
        AudioListener: class { },
        AudioLoader: class { load() { } },
        Audio: class { setBuffer() { } setLoop() { } setVolume() { } play() { } stop() { } }
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => {
    return {
        OrbitControls: class { constructor() { this.update = vi.fn(); this.enableDamping = true; this.dampingFactor = 0.05; this.target = { set: vi.fn() }; this.getAzimuthalAngle = vi.fn(() => 0); } }
    };
});

describe('Refuse Distraction', () => {
    let game;
    let unit;
    let request;

    beforeEach(() => {
        // 1. Mock DOM elements FIRST
        const minimapCanvas = {
            id: 'minimap',
            getContext: vi.fn(() => ({
                clearRect: vi.fn(),
                fillRect: vi.fn(),
                drawImage: vi.fn(),
                fillStyle: '',
                beginPath: vi.fn(),
                arc: vi.fn(),
                fill: vi.fn(),
                createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
                putImageData: vi.fn(),
            })),
            width: 100,
            height: 100,
            style: {},
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            getBoundingClientRect: vi.fn(() => ({ left: 0, top: 0, width: 100, height: 100 })),
        };

        const getSpy = vi.spyOn(document, 'getElementById');
        getSpy.mockImplementation((id) => {
            if (id === 'minimap') return minimapCanvas;
            return null;
        });

        // Mock createElement for Compass and BuildingRenderer canvases
        const originalCreateElement = document.createElement.bind(document);
        const createSpy = vi.spyOn(document, 'createElement');
        createSpy.mockImplementation((tag) => {
            if (tag === 'canvas' || tag === 'CANVAS') {
                const canvas = originalCreateElement('canvas');
                canvas.width = 100;
                canvas.height = 100;
                // Override getContext
                canvas.getContext = vi.fn(() => ({
                    clearRect: vi.fn(),
                    fillRect: vi.fn(),
                    drawImage: vi.fn(),
                    fillStyle: '',
                    strokeStyle: '',
                    beginPath: vi.fn(),
                    arc: vi.fn(),
                    fill: vi.fn(),
                    stroke: vi.fn(),
                    moveTo: vi.fn(),
                    lineTo: vi.fn(),
                    closePath: vi.fn(),
                    save: vi.fn(),
                    restore: vi.fn(),
                    translate: vi.fn(),
                    rotate: vi.fn(),
                    font: '',
                    textAlign: '',
                    textBaseline: '',
                    fillText: vi.fn(),
                    createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
                    putImageData: vi.fn(),
                    strokeRect: vi.fn(),
                }));
                return canvas;
            }
            return originalCreateElement(tag);
        });

        vi.clearAllMocks();
        window.game = undefined;

        // 2. Mock Scene
        const mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };

        // Mock Terrain
        const mockTerrain = {
            grid: [],
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: () => 10,
            gridToWorld: (x, z) => ({ x, y: 10, z }),
            getVisualOffset: () => ({ x: 0, y: 0 }),
            getRegion: () => 1,
            isWalkable: () => true,
            checkCondition: () => true, // Valid for building
            moveEntity: vi.fn(),
            buildings: [],
            addBuilding: vi.fn(),
            removeBuilding: vi.fn(),
            addBuilding: vi.fn(),
            removeBuilding: vi.fn(),
            getBuildingSize: () => 1,
            getBuildingSize: () => 1,
            update: vi.fn(),
            updateMeshPosition: vi.fn(),
            getBiomeColor: vi.fn(() => '#00FF00'),
            updateLights: vi.fn()
        };

        // Init Grid
        for (let x = 0; x < 100; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                // Flat land, region 1
                mockTerrain.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false, type: 'ground' };
            }
        }

        // Setup Game
        game = new Game(null, mockTerrain);
        window.game = game;

        // Setup Unit
        unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker', false, null);
        unit.id = 1;

        // Add to Game
        game.units.push(unit);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should prioritize MANUAL move marker over autonomous HOUSE BUILDING', () => {
        // 1. Setup Scenario
        // Unit at 10,10.
        // Good building spot at 10,10 (Immediate temptation)
        // Manual Move Marker at 30,30 (Far away)

        // Add Manual Request
        game.addRequest(30, 30, 'move', true); // isManual = true
        const manualReq = game.requestQueue[0];

        // Assign to unit (as if picked up)
        unit.targetRequest = manualReq;
        manualReq.assignedTo = unit.id;
        manualReq.status = 'assigned';

        unit.changeState(new JobState(unit));
        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBe(manualReq);

        console.log('[Test] Unit assigned Manual Move to 30,30.');

        // 2. Trigger potential distraction
        // In populus, workers auto-build if flat land is found.
        // We simulate the UnitWanderState or JobState distraction check.
        // Current Logic: JobState -> update -> smartMove.

        // But let's verify if `game.findBestRequest` would steal it properly?
        // Or if Unit autonomously builds.

        // Let's Force the Distraction Logic:
        // Try to trigger `tryBuildStructure` which typically happens in Wander/Idle.
        // But report says they do it "instead of taking optimal path".
        // This implies they might be dropping the job OR `findBestRequest` gave them a build job instead.

        // Let's test if `findBestRequest` prefers a close build job over a manual job?

        // Add a "Build" Request implicitly? 
        // Or does findBestRequest generate it? (No, usually requests are queue based)
        // BUT `unit.tryBuildStructure` is autonomous!

        // Let's pretend unit is checking for distractions
        const canBuild = unit.tryBuildStructure(100);
        console.log(`[Test] tryBuildStructure returned: ${canBuild}`);

        // If logic is flawed, tryBuildStructure might return TRUE and start building, 
        // even if we have a manual target.

        // EXPECTATION: It should return FALSE because we have a manual target.
        if (canBuild) {
            console.log('[FAILURE] Unit decided to build despite having manual job!');
        } else {
            console.log('[SUCCESS] Unit refused to build.');
        }

        expect(canBuild).toBe(false);
        expect(unit.targetRequest).toBe(manualReq);
    });

    it('should NOT Switch to a better Auto-Job if Manual Job is active', () => {
        // Setup: Unit has manual job
        game.addRequest(30, 30, 'move', true);
        const manualReq = game.requestQueue[0];
        unit.targetRequest = manualReq;
        manualReq.assignedTo = unit.id;

        // Setup: A much better Auto Job (very close)
        game.addRequest(11, 11, 'flatten', false); // Normalized, close

        // Check finding best request
        const best = game.findBestRequest(unit);

        // It SHOULD return the manual one (or null if already assigned, but if re-evaluating?)
        // Game.findBestRequest usually finds NEW jobs.
        // If unit already has job, it calls claimRequest?

        // Let's test the scoring logic inside findBestRequest strictly.
        // We'll simulate the unit asking "What should I do?".
        // Ideally, if it HAS a manual job, it shouldn't even ask. 
        // But if it did (re-evaluation), manual should win.

        // Reset assignment to test selection logic from scratch
        manualReq.assignedTo = null; // Free for grabbing
        manualReq.status = 'pending';
        unit.targetRequest = null;

        const picked = game.findBestRequest(unit);

        console.log(`[Test] Picked request type: ${picked ? picked.type : 'null'}, isManual: ${picked ? picked.isManual : 'N/A'}`);

        expect(picked).toBeDefined();
        expect(picked).toBe(manualReq); // Must pick the manual one even if far away
    });
});
