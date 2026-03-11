
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GoblinManager } from '../GoblinManager';
import { Goblin } from '../Goblin';
import { Building } from '../Building';
import * as THREE from 'three';

// Mock Terrain that supports faction assignment in addBuilding
class MockTerrain {
    constructor() {
        this.logicalWidth = 160;
        this.logicalDepth = 160;
        this.grid = Array(160).fill(0).map(() => Array(160).fill(0).map(() => ({
            height: 5,
            regionId: 1,
            hasBuilding: false
        })));
        this.buildings = [];
        this.entities = [];
    }
    getTileHeight(x, z) {
        if (!this.grid[x] || !this.grid[x][z]) return 0;
        return this.grid[x][z].height;
    }
    registerEntity(e, x, z, type) { this.entities.push(e); }
    unregisterEntity(e) {
        const idx = this.entities.indexOf(e);
        if (idx !== -1) this.entities.splice(idx, 1);
    }
    addBuilding(type, x, z, force = false, skip = false, faction = 'player') {
        const b = {
            type, gridX: x, gridZ: z,
            y: this.getTileHeight(x, z),
            userData: { type, gridX: x, gridZ: z, faction: faction, hp: 100, isBuilding: true },
            id: Math.random()
        };
        this.buildings.push(b);
        this.grid[x][z].hasBuilding = true;
        this.grid[x][z].building = b;
        return b;
    }
    getBuildingSize(type) { return 1; }
    gridToWorld(v) { return v; }
    getVisualPosition(x, z) { return new THREE.Vector3(x, 0, z); }
}

describe('Goblin Disappearance Bug Fix', () => {
    let gm;
    let scene;
    let terrain;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain();
        gm = new GoblinManager(scene, terrain);
        gm.clans = {};

        // Mock window.game
        global.window = global.window || {};
        global.window.game = {
            goblinManager: gm,
            simTotalTimeSec: 100,
            reportGlobalBattle: vi.fn(),
            registerSquad: vi.fn(() => 1)
        };
    });

    it('should assign goblin faction to caves to prevent friendly fire', () => {
        // 1. Create Cave via GoblinManager
        gm.createCave(10, 10);
        const caveBuilding = terrain.buildings.find(b => b.type === 'cave');

        // FIX CHECK: Should be 'goblin', not 'enemy'
        expect(caveBuilding.userData.faction).toBe('goblin');

        // 2. Spawn Goblin and check targeting
        const goblin = new Goblin(scene, terrain, 11, 11, 'normal', caveBuilding.userData.clanId);

        // Since faction is 'goblin', it should NOT target the building
        goblin.updateCombatTarget(null, terrain.buildings, null);

        expect(goblin.targetBuilding).toBeNull();
    });

    it('should NOT drown on height 1 land (Min Land Height Fix)', () => {
        // Mock height 1 land (which used to be 0 and caused drowning)
        terrain.grid[10][10].height = 1;

        const goblin = new Goblin(scene, terrain, 10, 10, 'normal', 'clan_1');
        goblin.mesh = { visible: true }; // Mock mesh

        // Simulate lifecycle update
        goblin.updateLifecycle(1.0);

        expect(goblin.isDead).toBe(false);
        expect(goblin.mesh.visible).toBe(true);
    });

    it('should drown on height 0 or less (Sea Level)', () => {
        // Height 0 is water
        terrain.grid[10][10].height = 0;

        const goblin = new Goblin(scene, terrain, 10, 10, 'normal', 'clan_1');
        goblin.mesh = { visible: true }; // Mock mesh

        // Simulate lifecycle update
        goblin.updateLifecycle(1.0);

        expect(goblin.isDead).toBe(true);
        expect(goblin.mesh.visible).toBe(false);
    });
});
