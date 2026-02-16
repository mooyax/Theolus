
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Job, Combat } from '../ai/states/UnitStates.js';

// Mock Game class to avoid complex THREE initialization
vi.mock('../Game.js', () => {
    return {
        Game: class {
            constructor() {
                this.isNight = false;
                this.resources = {};
                this.simTotalTimeSec = 0;
            }
            releaseRequest() { }
            completeRequest() { }
            findBestRequest() { }
            claimRequest() { }
            checkHappyHour() { }
        }
    };
});

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => {
    return {
        OrbitControls: class {
            constructor() { this.target = new THREE.Vector3(); this.object = { position: new THREE.Vector3(), lookAt: () => { } }; }
            update() { }
            dispose() { }
        }
    };
});

// Mock THREE
vi.mock('three', () => {
    const Vector3 = class {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
        distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2); }
        dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
        normalize() { return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        subVectors(a, b) { this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; return this; }
    };
    return {
        Vector3: Vector3,
        Group: class {
            constructor() { this.children = []; this.position = new Vector3(); }
            add(o) { this.children.push(o); }
            remove(o) { this.children = this.children.filter(c => c !== o); }
            getObjectByName() { return null; }
        },
        Scene: class {
            constructor() { this.children = []; }
            add(o) { this.children.push(o); }
            remove(o) { this.children = this.children.filter(c => c !== o); }
            getObjectByName() { return null; }
        },
        Mesh: class { constructor() { this.position = new Vector3(); } },
        BoxGeometry: class { translate() { } },
        PlaneGeometry: class { translate() { } },
        SphereGeometry: class { },
        CylinderGeometry: class { },
        ConeGeometry: class { },
        MeshStandardMaterial: class { },
        MeshLambertMaterial: class { },
        CanvasTexture: class { },
        Raycaster: class { },
        Color: class { },
        Frustum: class { setFromProjectionMatrix() { } containsPoint() { return true; } },
        Matrix4: class { multiplyMatrices() { } makePerspective() { } lookAt() { } },
        Quaternion: class { setFromEuler() { } },
        Euler: class { setFromQuaternion() { } },
        PerspectiveCamera: class { constructor() { this.position = new Vector3(); } updateMatrixWorld() { } lookAt() { } },
        OrthographicCamera: class { constructor() { this.position = new Vector3(); } updateMatrixWorld() { } lookAt() { } },
        WebGLRenderer: class { constructor() { this.domElement = document.createElement('canvas'); } setSize() { } render() { } setPixelRatio() { } },
        TextureLoader: class { load() { return new CanvasTexture(); } },
        Clock: class { getDelta() { return 0.1; } getElapsedTime() { return 1; } }
    };
});

describe('Combat Retaliation System', () => {
    let game;
    let unit;
    let goblin;
    let terrainMock;

    beforeEach(() => {
        // Mock Window Game
        window.game = {
            isNight: false,
            resources: {},
            releaseRequest: vi.fn(),
            completeRequest: vi.fn(),
            findBestRequest: vi.fn(),
            claimRequest: vi.fn(),
            simTotalTimeSec: 0,
            frameCounter: 0 // Initialize frameCounter
        };

        // Mock Terrain
        terrainMock = {
            grid: [],
            logicalWidth: 40,
            logicalDepth: 40,
            getTileHeight: vi.fn().mockReturnValue(1),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            findBestTarget: vi.fn(), // Will mock return specific goblin
            moveEntity: vi.fn(),
            checkFlatArea: vi.fn().mockReturnValue(true),
            scene: new THREE.Scene(),
            gridToWorld: (g) => g,
            findPath: vi.fn().mockReturnValue([]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 11, z: 10 }]),
            isWalkable: vi.fn().mockReturnValue(true),
            isReachable: vi.fn().mockReturnValue(true),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 })
        };
        // Init Grid
        for (let x = 0; x < 40; x++) {
            terrainMock.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                terrainMock.grid[x][z] = { regionId: 1, height: 1 };
            }
        }

        // Initialize Game Mock
        game = new Game();
        window.game.terrain = terrainMock;

        // Spawn Entities
        unit = new Unit(new THREE.Scene(), terrainMock, 10, 10, 'worker');
        console.log("Spawning Goblin...");
        goblin = new Goblin(new THREE.Scene(), terrainMock, 11, 10, 'normal');
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const runUpdateLoop = (testUnit, goblins) => {
        for (let i = 0; i < 25; i++) {
            if (window.game) window.game.frameCounter = i;
            testUnit.updateLogic(100 + i, 0.1, false, goblins);
            if (testUnit.state.constructor.name === 'Combat') break;
        }
    };

    it('should retaliate when hit while working (Job)', () => {
        // Assign Dummy Job to Unit
        const dummyReq = { id: 'req1', type: 'move', x: 30, z: 30, assignedTo: unit.id, isManual: true };
        unit.targetRequest = dummyReq;
        unit.changeState(new Job(unit));

        // Verify Initial State
        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetGoblin).toBeNull();
        expect(unit.targetRequest).toBe(dummyReq);

        // Pre-condition: Unit HP full
        const initialHp = unit.hp;

        // SIMULATE ATTACK: Goblin hits Unit
        unit.takeDamage(5, goblin);

        expect(unit.hp).toBeLessThan(initialHp);
        expect(unit.targetGoblin).toBe(goblin); // Retaliation target set

        // UPDATE LOOP: Unit should switch to Combat
        runUpdateLoop(unit, [goblin]);

        // CRITICAL ASSERTION: Did it switch?
        if (unit.state.constructor.name === 'Job') {
            console.log("BUG CONFIRMED: Unit stayed in Job after being attacked.");
        } else if (unit.state.constructor.name === 'Combat') {
            console.log("SUCCESS: Unit switched to Combat.");
        }

        expect(unit.state.constructor.name).toBe('Combat');
        expect(unit.action).toBe('Fighting');

        // Verify effective combat
        const goblinHp = goblin.hp;
        unit.attackCooldown = -1; // Force attack readiness

        // Simulate a few frames of combat
        unit.updateLogic(102, 1.5, false, [goblin]); // Should attack now

        expect(goblin.hp).toBeLessThan(goblinHp);
    });

    it('should switch strictly for self-defense scan failure in Job (Non-worker)', () => {
        // Enable search result
        terrainMock.findBestTarget.mockReturnValue(goblin);

        unit.role = 'knight';
        unit.id = 0; // Force ID 0 to enable Job logging
        unit.targetRequest = { id: 'req2', type: 'patrol', x: 30, z: 30, assignedTo: unit.id };
        unit.changeState(new Job(unit));

        // Update
        // unit.targetGoblin is likely null here unless we set it or provoke it?
        // Wait, the original test logic was relying on 'checkSelfDefense' finding the goblin because it's close.
        runUpdateLoop(unit, [goblin]);

        // Assert
        expect(unit.state.constructor.name).toBe('Combat');
    });

});
