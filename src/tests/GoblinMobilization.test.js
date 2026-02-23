
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import { Entity } from '../Entity.js';
import { GoblinManager } from '../GoblinManager.js';
import { Goblin } from '../Goblin.js';
import { Wander, Raid } from '../ai/states/GoblinStates.js';
import * as THREE from 'three';

describe('Goblin Mobilization Verification', () => {

    let terrain;
    let gm;

    beforeEach(() => {
        // Mock window
        // Mock window game safely
        if (typeof window !== 'undefined') {
            window.game = { gameTotalTime: 0 };
        } else {
            
        }
        // Mock Scene
        const scene = { add: () => { }, remove: () => { }, getObjectByName: () => ({ add: () => { }, remove: () => { }, children: [] }) };
        terrain = new Terrain(scene, []);
        terrain.logicalWidth = 80;
        terrain.logicalDepth = 80;
        // Mock EntityGrid
        terrain.entityGrid = Array(80).fill(0).map(() => Array(80).fill([]));
        terrain.grid = Array(80).fill(0).map(() => Array(80).fill({ height: 1, hasBuilding: false }));

        gm = new GoblinManager(scene, terrain, {});
        // Mock getTileHeight
        terrain.getTileHeight = () => 1.0;
        terrain.gridToWorld = (v) => v;
        terrain.isValidGrid = () => true;

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
        gm.caves = [{ gridX: 10, gridZ: 10, clanId: clanId, hasBuilding: true }];
        // Need to ensure terrain.buildings has cave object for validity check
        terrain.buildings = [gm.caves[0]];

        // Add Idle Goblins of this clan
        const g1 = new Goblin(gm.scene, terrain, 10, 10, 'normal', clanId);
        g1.changeState(new Wander(g1)); // Use object
        gm.goblins.push(g1);

        const g2 = new Goblin(gm.scene, terrain, 12, 12, 'normal', clanId);
        g2.changeState(new Wander(g2));
        gm.goblins.push(g2);

        // Add Goblin of DIFFERENT clan
        const gOther = new Goblin(gm.scene, terrain, 15, 15, 'normal', 'other_clan');
        gOther.changeState(new Wander(gOther));
        gm.goblins.push(gOther);

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
        gm.goblins.push(g1);

        gm.mobilizeClan(gm.clans[clanId]);

        expect(g1.state.constructor.name).toBe('Raid');
        expect(g1.raidGoal.x).toBeCloseTo(60, -1); // Approx check with randomization


});
});