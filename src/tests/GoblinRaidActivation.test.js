
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GoblinManager } from '../GoblinManager';
import { Goblin } from '../Goblin';
import { Building } from '../Building';
import { Combat, Raid } from '../ai/states/GoblinStates';
import * as THREE from 'three';

// Mock Terrain
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
    getTileHeight(x, z) { return 5; }
    registerEntity(e, x, z, type) { this.entities.push(e); }
    unregisterEntity(e) {
        const idx = this.entities.indexOf(e);
        if (idx !== -1) this.entities.splice(idx, 1);
    }
    addBuilding(type, x, z) {
        const b = {
            type, gridX: x, gridZ: z,
            userData: { type, gridX: x, gridZ: z, faction: 'enemy', hp: 100 },
            id: Math.random()
        };
        this.buildings.push(b);
        this.grid[x][z].hasBuilding = true;
        return b;
    }
    gridToWorld(v) { return v; }
}

describe('Goblin Raid Activation', () => {
    let gm;
    let scene;
    let terrain;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain();
        gm = new GoblinManager(scene, terrain);

        // Mock window.game
        global.window = global.window || {};
        global.window.game = {
            goblinManager: gm,
            simTotalTimeSec: 100,
            reportGlobalBattle: vi.fn()
        };
    });

    it('should assign clanId to cave userData and increase aggression on attack', () => {
        // 1. Create Cave
        gm.createCave(10, 10);
        const caveBuilding = terrain.buildings.find(b => b.type === 'cave' && b.gridX === 10 && b.gridZ === 10);

        expect(caveBuilding.userData.clanId).toBeDefined();
        expect(caveBuilding.userData.clanId).toContain('clan_cave_10_10');

        const clanId = caveBuilding.userData.clanId;

        // 2. Simulate Attack on Cave
        // In Building.ts, takeDamage calls notifyClanActivity
        // For testing we will call it directly since MockTerrain doesn't have full Building logic
        const attacker = { gridX: 20, gridZ: 20, type: 'unit' };

        gm.notifyClanActivity(clanId, attacker);

        expect(gm.clans[clanId]).toBeDefined();
        expect(gm.clans[clanId].aggression).toBe(1.0);
    });

    it('should activate clan when aggression reaches threshold', () => {
        const cave = gm.createCave(10, 10);
        const clanId = terrain.buildings[0].userData.clanId;
        const attacker = { gridX: 20, gridZ: 20 };

        // Threshold is now 10.0
        for (let i = 0; i < 10; i++) {
            gm.notifyClanActivity(clanId, attacker);
        }

        expect(gm.clans[clanId].aggression).toBeGreaterThanOrEqual(10.0);
        expect(gm.clans[clanId].active).toBe(true);
    });

    it('should report attack to clan when goblin is hit', () => {
        const cave = gm.createCave(20, 20);
        const clanId = terrain.buildings[0].userData.clanId;

        const goblin = new Goblin(scene, terrain, 21, 21, 'normal', clanId);
        const attacker = { gridX: 50, gridZ: 50, id: 999, type: 'unit', faction: 'player' };

        // Simulate taking damage
        goblin.takeDamage(10, attacker);

        expect(gm.clans[clanId]).toBeDefined();
        expect(gm.clans[clanId].aggression).toBeGreaterThan(0);
        expect(window.game.reportGlobalBattle).toHaveBeenCalled();
    });

    it('should transition goblin to Raid state when target is lost and clan is active', () => {
        const cave = gm.createCave(30, 30);
        const clanId = terrain.buildings[0].userData.clanId;

        // 1. Provoke the clan to make it active
        for (let i = 0; i < 10; i++) {
            gm.notifyClanActivity(clanId, { gridX: 0, gridZ: 0 });
        }
        expect(gm.clans[clanId].active).toBe(true);

        const goblin = new Goblin(scene, terrain, 31, 31, 'normal', clanId);

        // 2. Set into combat state with a target
        const target = { id: 123, isDead: false, hp: 100, gridX: 32, gridZ: 32 };
        goblin.targetUnit = target;
        goblin.changeState(new Combat(goblin));

        // Use the actual Combat state's handleTargetLost
        goblin.state.handleTargetLost(goblin);

        // Since clan is active, it should go to Raid
        expect(goblin.state.constructor.name).toBe('Raid');
    });
});
