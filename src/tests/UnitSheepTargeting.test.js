
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Unit } from '../Unit.ts';
import { Sheep } from '../Sheep.js';
import { MockTerrain, MockGame } from './TestHelper.ts';
import * as THREE from 'three';

describe('Unit Sheep Automated Targeting Verification', () => {
    let game;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain(20, 20);
        terrain.getTileHeight = vi.fn().mockReturnValue(1.0);

        game = new MockGame();
        game.terrain = terrain;
        game.scene = scene;
        game.resources = { meat: 0 };
        game.frameCount = 123;
        game.sheepManager = { sheeps: [] };
        game.goblinManager = { goblins: [] };

        window.game = game;
    });

    afterEach(() => {
        // window.game = undefined; // Don't delete global.window
    });

    it('should automatically target a nearby sheep during self-defense scan', () => {
        const unit = new Unit(scene, terrain, 5, 5, 'knight');
        unit.game = game;
        game.units.push(unit);

        const sheep = new Sheep(scene, terrain, 6, 6);
        sheep.hp = 50;
        sheep.type = 'sheep';

        game.sheepManager.sheeps.push(sheep);

        unit.id = 7;
        unit.checkSelfDefense([], true);

        expect(unit.targetUnit).toBe(sheep);
        expect(unit.action).toBe('Fighting');
    });

    it('should prioritize Goblins over Sheep', () => {
        const unit = new Unit(scene, terrain, 5, 5, 'knight');
        unit.game = game;
        game.units.push(unit);

        const sheep = new Sheep(scene, terrain, 6, 6);
        game.sheepManager.sheeps.push(sheep);

        const goblin = { id: 999, gridX: 6, gridZ: 6, isDead: false, faction: 'enemy', type: 'goblin' };
        game.goblinManager.goblins.push(goblin);

        unit.checkSelfDefense(game.goblinManager.goblins, true);

        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.targetUnit).toBeNull();
    });

    it('should engage in combat and grant meat reward automatically', () => {
        const unit = new Unit(scene, terrain, 5, 5, 'knight');
        unit.game = game;
        unit.damage = 50;
        game.units.push(unit);

        const sheep = new Sheep(scene, terrain, 5.5, 5.5);
        sheep.hp = 100;
        sheep.type = 'sheep';
        game.sheepManager.sheeps.push(sheep);

        expect(game.resources.meat).toBe(0);

        unit.checkSelfDefense([], true);
        expect(unit.targetUnit).toBe(sheep);

        unit.updateLogic(101, 1, false, game.units, [], []);
        expect(sheep.hp).toBe(50);

        unit.attackCooldown = 0;
        unit.updateLogic(102, 1, false, game.units, [], []);

        expect(sheep.hp).toBe(0);
        expect(sheep.isDead).toBe(true);
        expect(game.resources.meat).toBe(1000);

        unit.updateLogic(103, 1, false, game.units, [], []);
        expect(unit.state.name).toBe('Wander');
    });
});