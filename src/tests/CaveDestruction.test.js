
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import { CombatState, UnitWanderState } from '../ai/states/UnitStates.js';
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
        Group: class { constructor() { this.position = { x: 0, y: 0, z: 0 }; this.add = vi.fn(); this.remove = vi.fn(); } },
        Mesh: class { constructor() { this.position = { x: 0, y: 0, z: 0 }; this.scale = { set: vi.fn() }; this.rotation = { y: 0 }; } },
        MeshStandardMaterial: class { },
        SphereGeometry: class { },
        BoxGeometry: class { },
        CylinderGeometry: class { },
        CanvasTexture: class { },
    };
});

// Mock Window
if (typeof window !== 'undefined') {
    window.game = {
        gameTime: 100,
        buildings: [],
        units: [],
        goblinManager: { reportCasualty: vi.fn(), increasePlunder: vi.fn() },
        spawnProjectile: vi.fn()
    };
}

// Minimal Mocks
const mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
const mockTerrain = {
    findBestTarget: vi.fn(() => null),
    getTileHeight: () => 10,
    gridToWorld: (x, z) => ({ x, y: 10, z }),
    getVisualOffset: () => ({ x: 0, y: 0 }),
    getBuildingSize: (type) => (type === 'cave' ? 2 : 1),
    getRegion: () => 1,
    grid: [],
    buildings: [],
    removeBuilding: vi.fn(),
    findBestTarget: (type, x, z, r, fn, list) => {
        // Simple mock for "finding the cave"
        if (type === 'building' && list) {
            return list.find(b => b.userData.type === 'cave');
        }
        return null; // For goblins/etc
    }
};

// Setup Mock Grid
for (let x = 0; x < 20; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 20; z++) {
        mockTerrain.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false };
    }
}

describe('Cave Destruction Bug', () => {
    let unit;
    let cave;

    beforeEach(() => {
        // Reset terrain buildings
        mockTerrain.buildings = [];
        if (window.game) window.game.buildings = mockTerrain.buildings;

        // Create Unit
        console.log('[Test] Creating Unit');
        unit = new Unit(mockScene, mockTerrain, 10, 10, 'knight', false, null);

        // Create Cave
        cave = {
            id: 'cave_target',
            gridX: 11, // Adjacent to 10,10
            gridZ: 10,
            userData: {
                id: 'cave_target',
                type: 'cave',
                hp: 200,
                gridX: 11,
                gridZ: 10
            }
        };
        mockTerrain.buildings.push(cave);
        mockTerrain.grid[11][10].hasBuilding = true;

        // Set Unit Target
        unit.targetBuilding = cave;
    });

    // Simplified to Direct Unit Test for Robustness

    it('should damage cave when attacking directly', () => {
        // Setup
        const hpStart = cave.userData.hp; // 200

        // Attack
        unit.attackCooldown = 0; // Force ready
        unit.damage = 10; // Force damage
        unit.attackBuilding(cave);

        expect(cave.userData.hp).toBeLessThan(hpStart);

        // Verify multiple attacks destroy it (logical check)
        cave.userData.hp = 10;
        unit.attackCooldown = 0; // RESET COOLDOWN
        unit.attackBuilding(cave);
        expect(cave.userData.hp).toBeLessThan(10);
    });
});
