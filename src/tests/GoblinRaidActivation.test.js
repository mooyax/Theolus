
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { GoblinManager } from '../GoblinManager.js';
import { Goblin } from '../Goblin.js';
import { Combat, Raid } from '../ai/states/GoblinStates.js';
import { MockGame, MockTerrain } from './TestHelper.js';

describe('Goblin Raid Activation', () => {
    let gm;
    let scene;
    let terrain;

    beforeEach(() => {
        const mockGame = new MockGame();
        scene = mockGame.scene;
        terrain = new MockTerrain(160, 160);
        mockGame.terrain = terrain;
        gm = new GoblinManager(scene, terrain, mockGame);
        mockGame.goblinManager = gm;

        // Mock window.game
        window.game = mockGame;
        mockGame.reportGlobalBattle = vi.fn();
        
        // Mock initAssets
        Goblin.initAssets = vi.fn().mockResolvedValue(undefined);
    });

    it('should assign clanId to cave userData and increase aggression on attack', () => {
        // 1. Create Cave
        gm.createCave(10, 10);
        const caveBuilding = terrain.buildings.find(b => b.userData.type === 'cave' && b.userData.gridX === 10 && b.userData.gridZ === 10);

        expect(caveBuilding.userData.clanId).toBeDefined();
        expect(caveBuilding.userData.clanId).toContain('clan_cave_10_10');

        const clanId = caveBuilding.userData.clanId;

        // 2. Simulate Attack on Cave
        const attacker = { gridX: 20, gridZ: 20, type: 'unit' };
        gm.notifyClanActivity(clanId, attacker);

        expect(gm.clans[clanId]).toBeDefined();
        expect(gm.clans[clanId].aggression).toBe(1.0);
    });

    it('should activate clan when aggression reaches threshold (15.0)', () => {
        gm.createCave(10, 10);
        const clanId = terrain.buildings[0].userData.clanId;
        const attacker = { gridX: 20, gridZ: 20 };

        // Threshold is now 15.0
        for (let i = 0; i < 15; i++) {
            gm.notifyClanActivity(clanId, attacker);
        }

        expect(gm.clans[clanId].active).toBe(true);
        expect(gm.clans[clanId].aggression).toBeGreaterThanOrEqual(15.0);
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
        const caveBuilding = terrain.buildings[0];
        const clanId = caveBuilding.userData.clanId;

        // 1. Provoke the clan to make it active (Threshold 15.0)
        for (let i = 0; i < 15; i++) {
            gm.notifyClanActivity(clanId, { gridX: 0, gridZ: 0 });
        }
        expect(gm.clans[clanId].active).toBe(true);

        const goblin = new Goblin(scene, terrain, 31, 31, 'normal', clanId);

        // 2. Set into combat state with a target
        const target = { id: 123, isDead: false, hp: 100, gridX: 32, gridZ: 32 };
        goblin.targetUnit = target;
        goblin.changeState(new Combat(goblin));

        // Use the actual Combat state's handleTargetLost
        goblin.state.handleTargetLost();

        // Since clan is active, it should go to Raid
        expect(goblin.state.name).toBe('Raid');
    });
});
