import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Combat, Wander } from '../ai/states/GoblinStates.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
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
        },
        Group: class { constructor() { this.position = { x: 0, y: 0, z: 0 }; this.add = vi.fn(); this.remove = vi.fn(); this.children = []; } },
        Mesh: class { constructor() { this.position = { x: 0, y: 0, z: 0 }; this.scale = { set: vi.fn() }; this.rotation = { y: 0 }; } },
        MeshLambertMaterial: class { },
        BoxGeometry: class { translate() { } },
        ConeGeometry: class { translate() { } },
        CylinderGeometry: class { translate() { } },
        PlaneGeometry: class { translate() { } },
        MeshStandardMaterial: class { },
        CanvasTexture: class { }
    };
});

// Mock Window Game Safely
if (typeof window !== 'undefined') {
    window.game = null;
}

// Minimal Mocks
const mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
const mockTerrain = {
    findBestTarget: vi.fn(() => null),
    findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 10 }, { x: 20, z: 20 }]),
    getTileHeight: () => 10,
    gridToWorld: (x) => x, // Simplification
    getVisualOffset: () => ({ x: 0, y: 0 }),
    getBuildingSize: () => 1,
    getRegion: () => 1,
    grid: [],
    buildings: [],
    removeBuilding: vi.fn(),
    registerEntity: vi.fn(),
    unregisterEntity: vi.fn(),
    findBestTarget: (type, x, z, rad, cost, list) => {
        // Simple search mock
        let best = null;
        let bestScore = Infinity;
        if (list) {
            for (const e of list) {
                const d = Math.sqrt((e.gridX - x) ** 2 + (e.gridZ - z) ** 2);
                if (d <= rad) {
                    const score = cost(e, d);
                    if (score < bestScore) { bestScore = score; best = e; }
                }
            }
        }
        return best;
    },
    findPath: (sx, sz, ex, ez) => [{ x: ex, z: ez }], // Mock linear path
    findPathAsync: (sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }]),
    isReachable: () => true,
    pathfindingCalls: 0
};

// Setup Mock Grid
for (let x = 0; x < 40; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 40; z++) {
        mockTerrain.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false };
    }
}

describe('Goblin Aggression Bug', () => {
    let goblin;
    let unitTarget;

    beforeEach(() => {
        // Reset
        mockTerrain.buildings = [];
        vi.clearAllMocks();

        // Create Goblin
        console.log('[Test] Creating Goblin');
        goblin = new Goblin(mockScene, mockTerrain, 10, 10, 'normal', null, null);

        // Create Unit Target
        unitTarget = {
            id: 'unit_victim',
            gridX: 15, // 5 tiles away
            gridZ: 10,
            hp: 100,
            maxHp: 100,
            isDead: false,
            isFinished: false,
            userData: { type: 'knight' }, // Mocking Unit structure
            position: { x: 15, y: 10, z: 10, clone: () => ({ add: () => ({}) }) },
            takeDamage: vi.fn((amt) => { unitTarget.hp -= amt; })
        };
    });

    it('should find target, chase, and attack', async () => {
        console.log('[Test] START Goblin Aggression');

        // Mock findBestTarget to return unitTarget regardless of list
        mockTerrain.findBestTarget = vi.fn((type, x, z, rad) => {
            const d = Math.sqrt((unitTarget.gridX - x) ** 2 + (unitTarget.gridZ - z) ** 2);
            if (d <= rad) return unitTarget;
            return null;
        });

        // 1. Initial State: Wander
        expect(goblin.state.constructor.name).toBe('Wander');

        // 2. Run Update to Find Target
        // pass unitTarget in list
        console.log('[Test] Scanning for targets...');
        // Force scan timer in state
        goblin.state.scanTimer = 2.0;
        goblin.updateLogic(0, 0.1, [unitTarget], []);

        // Expect Target Found
        expect(goblin.targetUnit).toBe(unitTarget);
        expect(goblin.state.constructor.name).toBe('Combat');
        console.log('[Test] Goblin Found Target & Switched to Combat');

        // 3. Chase (Distance is 5, Range is 2.5)
        // Should move
        console.log('[Test] Chasing...');
        goblin.updateLogic(0, 0.1, [unitTarget], []); // Calling Logic which calls State.update which calls updateCombatLogic

        // Allow async pathfinding to resolve
        await new Promise(resolve => setTimeout(resolve, 0));

        // Force update to process path
        goblin.updateLogic(0.1, 0.1);

        // Check if moving
        expect(goblin.isMoving).toBe(true);
        // Teleport closer to simulate movement success
        goblin.gridX = 14;
        goblin.updateLogic(0, 0.1, [unitTarget], []);
        goblin.gridX = 13;
        goblin.updateLogic(0, 0.1, [unitTarget], []);
        goblin.gridX = 12; // Dist 2.0 -> In Range

        console.log('[Test] Arrived in Range (Dist 2)');

        // 4. Attack
        // Ensure cooldown is 0
        goblin.attackCooldown = 0;
        goblin.updateLogic(0, 0.1, [unitTarget], []);

        expect(unitTarget.takeDamage).toHaveBeenCalled();
        console.log(`[Test] Attack Successful. UnitHP: ${unitTarget.hp}`);
    });
});
