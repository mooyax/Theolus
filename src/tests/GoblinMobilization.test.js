
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import { GoblinManager } from '../GoblinManager.js';
import { Goblin } from '../Goblin.js';
import { Wander, Raid } from '../ai/states/GoblinStates.js';
import { MockGame, MockTerrain } from './TestHelper';
import * as THREE from 'three';

describe('Goblin Mobilization Verification', () => {

    let game;
    let terrain;
    let gm;

    beforeEach(() => {
        game = new MockGame();
        terrain = new MockTerrain(80, 80);
        game.terrain = terrain;

        if (typeof window !== 'undefined') {
            window.game = game;
        }

        const scene = game.scene;
        gm = new GoblinManager(scene, terrain, game);
        game.goblinManager = gm;

    });

    it('triggerWave should mobilize idle goblins', () => {
        // Setup Clan
        const clanId = 'test_clan';
        gm.clans = {
            [clanId]: {
                id: clanId,
                active: true,
                waveLevel: 1,
                waveTimer: 0,
                raidTarget: { x: 50, z: 50 }
            }
        };
        // Mock Cave
        gm.caves = [{ gridX: 10, gridZ: 10, clanId: clanId, hasBuilding: true, userData: { type: 'cave', faction: 'goblin' } }];
        // Need to ensure terrain.buildings has cave object for validity check
        terrain.buildings = [gm.caves[0]];

        // Add Idle Goblins of this clan
        const g1 = new Goblin(gm.scene, terrain, 10, 10, 'normal', clanId);
        g1.changeState(new Wander(g1)); 
        game.entityManager.register(g1);

        const g2 = new Goblin(gm.scene, terrain, 12, 12, 'normal', clanId);
        g2.changeState(new Wander(g2));
        game.entityManager.register(g2);

        // Add Goblin of DIFFERENT clan
        const gOther = new Goblin(gm.scene, terrain, 15, 15, 'normal', 'other_clan');
        gOther.changeState(new Wander(gOther));
        game.entityManager.register(gOther);

        // Trigger Wave
        gm.triggerWave(gm.clans[clanId]);

        // Check if Goblins were mobilized
        expect(g1.state.constructor.name).toBe('Raid');
        expect(g1.raidGoal.x).toBeCloseTo(50, -1);
        expect(g1.raidGoal.z).toBeCloseTo(50, -1);

        expect(g2.state.constructor.name).toBe('Raid');

        // Other clan should NOT be mobilized
        expect(gOther.state.constructor.name).toBe('Wander');

    });

    it('mobilizeClan should rely on getClanRaidTarget fallback', () => {
        const clanId = 'test_clan_fallback';
        gm.clans = {
            [clanId]: {
                id: clanId,
                active: true,
                waveLevel: 1,
                waveTimer: 0,
                raidTarget: { x: 60, z: 60 }
            }
        };

        const g1 = new Goblin(gm.scene, terrain, 5, 5, 'normal', clanId);
        g1.changeState(new Wander(g1));
        game.entityManager.register(g1);

        gm.mobilizeClan(gm.clans[clanId]);

        expect(g1.state.constructor.name).toBe('Raid');
        expect(g1.raidGoal.x).toBeCloseTo(60, -1); 
    });
});