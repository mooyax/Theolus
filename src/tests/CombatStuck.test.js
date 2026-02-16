
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Actor } from '../Actor.js';
import { Goblin } from '../Goblin.js';
import { Job, Combat, Wander } from '../ai/states/UnitStates.js';

// Mock Dependencies
vi.mock('three', () => {
    const Vector3 = class {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
        distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2); }
    };
    return {
        Vector3: Vector3,
        Group: class {
            constructor() { this.children = []; this.position = new Vector3(); }
            add(o) { this.children.push(o); }
            remove(o) { this.children = this.children.filter(c => c !== o); }
        },
        Scene: class {
            constructor() { this.children = []; }
            add(o) { this.children.push(o); }
            remove(o) { this.children = this.children.filter(c => c !== o); }
        },
        Mesh: class { constructor() { this.position = new Vector3(); } },
        BoxGeometry: class { constructor() { this.translate = vi.fn(); } },
        ConeGeometry: class { constructor() { this.translate = vi.fn(); } },
        CylinderGeometry: class { constructor() { this.translate = vi.fn(); } },
        PlaneGeometry: class { constructor() { this.translate = vi.fn(); } },
        MeshLambertMaterial: class { constructor() { } },
        MeshStandardMaterial: class { constructor() { } },
        Texture: class { constructor() { } },
        CanvasTexture: class { constructor() { } }
    };
});

describe('Combat Stuck Investigation', () => {
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
            claimRequest: vi.fn().mockReturnValue(true),
            simTotalTimeSec: 0,
            frameCount: 0
        };

        // Mock Terrain
        terrainMock = {
            grid: [],
            getTileHeight: vi.fn().mockReturnValue(1),
            findBestTarget: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            registerEntity: vi.fn(),
            scene: new THREE.Scene(),
            gridToWorld: (g) => g
        };
        for (let x = 0; x < 40; x++) {
            terrainMock.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                terrainMock.grid[x][z] = { regionId: 1, height: 1 };
            }
        }

        unit = new Unit(new THREE.Scene(), terrainMock, 10, 10, 'worker');
        unit.id = 1;

        // Mock smartMove to simulate failure/unreachable
        unit.smartMove = vi.fn().mockReturnValue(true); // Default success
        unit.isUnreachable = false;

        // Mock checkSelfDefense to trigger combat initially
        unit.checkSelfDefense = vi.fn().mockReturnValue(false);

        goblin = new Goblin(new THREE.Scene(), terrainMock, 20, 10); // Far away
        goblin.id = 100;
        goblin.isDead = false;

        // Setup initial combat state
        unit.targetGoblin = goblin;
        const combatState = new Combat(unit);
        unit.changeState(combatState);
    });

    it('should NOT get stuck in Combat state if target is unreachable', () => {
        // 1. Simulate Unreachable Target
        unit.smartMove.mockImplementation(() => {
            unit.isUnreachable = true;
            return false;
        });

        // 2. Update Loop
        unit.updateLogic(100, 0.1, false, [], [], [goblin]);

        expect(unit.smartMove).toHaveBeenCalled();
        expect(unit.isUnreachable).toBe(true);

        unit.updateLogic(101, 0.1, false, [], [], [goblin]);

        expect(unit.state).not.toBeInstanceOf(Combat);
        expect(unit.targetGoblin).toBeNull();
    });

    it('should NOT get stuck in Combat state if smartMove fails (No Path) even if isUnreachable is false', () => {
        // RESET State
        unit.isUnreachable = false;
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));

        // 1. Simulate smartMove failing (returning false) BUT NOT setting isUnreachable
        unit.smartMove.mockReturnValue(false);

        // 2. Update Loop
        unit.updateLogic(102, 0.1, false, [], [], [goblin]);

        expect(unit.state).not.toBeInstanceOf(Combat);
    });

    it('should add unreachable target to ignoredTargets to prevent loop (Infinite Loop Prevention)', () => {
        // RESET State
        unit.isUnreachable = false;
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));

        // 1. Simulate Move Failure
        unit.smartMove.mockReturnValue(false);

        // 2. First Update (Abandons Combat)
        unit.updateLogic(103, 0.1, false, [], [], [goblin]);

        expect(unit.state).not.toBeInstanceOf(Combat);
        expect(unit.targetGoblin).toBeNull();

        // 3. Verify that the goblin was added to ignoredTargets
        // This is crucial to prevent checkSelfDefense from immediately picking it up again
        expect(unit.ignoredTargets.has(goblin.id)).toBe(true);
    });

    it('should Handle Async Pathfinding Errors gracefully (prevent stuck state)', async () => {
        // RESET State
        unit.isUnreachable = false;
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));

        // 1. Simulate findPathAsync throwing an error (or mock rejection)
        terrainMock.findPathAsync = vi.fn().mockRejectedValue(new Error("Async Error Simulation"));

        // UNMOCK smartMove to test the actual logic in Actor.ts
        unit.smartMove = Actor.prototype.smartMove.bind(unit);

        // 2. Call updateLogic (triggers smartMove -> findPathAsync)
        unit.updateLogic(200, 0.1, false, [], [], [goblin]);

        // CHECK: Was findPathAsync called?
        expect(terrainMock.findPathAsync).toHaveBeenCalled();


        // Wait for promise rejection handling (microtask queue)
        await new Promise(resolve => setTimeout(resolve, 50));

        // The error should be caught, and IS_UNREACHABLE should be set to true
        expect(unit.isUnreachable).toBe(true);
        expect(unit.isPathfinding).toBe(false);

        // 3. Next update logic should abandon combat
        unit.updateLogic(201, 0.1, false, [], [], [goblin]);
        expect(unit.state).not.toBeInstanceOf(Combat);
    });
});
