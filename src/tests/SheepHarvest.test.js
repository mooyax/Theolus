
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Unit } from '../Unit.ts';
import { Sheep } from '../Sheep.js';
import { MockTerrain, MockGame } from './TestHelper.ts';
import * as THREE from 'three';

describe('Sheep Harvest Reward Verification', () => {
    let game;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain(20, 20);
        terrain.getTileHeight = vi.fn().mockReturnValue(1.0);

        game = new MockGame(scene, terrain);
        game.resources = { meat: 0 };

        global.window = { game: game };
    });

    afterEach(() => {
        delete global.window;
    });

    it('should grant 1000 meat when a unit kills a sheep', () => {
        const unit = new Unit(scene, terrain, 5, 5, 'worker');
        unit.game = game;
        unit.damage = 100; // Insta-kill for test

        const sheep = new Sheep(scene, terrain, 5, 5);
        sheep.hp = 50;
        sheep.type = 'sheep';

        expect(game.resources.meat).toBe(0);

        unit.attackUnit(sheep);

        expect(sheep.isDead).toBe(true);
        expect(game.resources.meat).toBe(1000);
    });
});

