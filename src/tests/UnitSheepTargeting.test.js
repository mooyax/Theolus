
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
        game.frameCount = 123; // Fixed frame for predictable modulo checks
        game.sheepManager = { sheeps: [] };

        global.window = { game: game };
    });

    afterEach(() => {
        delete global.window;
    });

    it('should automatically target a nearby sheep during self-defense scan', () => {
        // Create a Knight (Soldier)
        const unit = new Unit(scene, terrain, 5, 5, 'knight');
        unit.game = game;
        game.units.push(unit);

        // Create a Sheep nearby
        const sheep = new Sheep(scene, terrain, 6, 6);
        sheep.hp = 50;
        sheep.type = 'sheep';
        // Mock spatial type for findBestTarget simulation if necessary
        // MockTerrain.findBestTarget in TestHelper uses candidates list directly.

        // Force scan via checkSelfDefense
        // In Unit.ts, checkSelfDefense uses (frame + this.id) % 10 === 0 for knights
        // Our frame is 123. If unit.id is 7, 130 % 10 === 0.
        unit.id = 7;

        expect(unit.targetUnit).toBeNull();

        // Run self-defense check
        // We pass empty goblins list, and our sheep is in game.units? 
        // No, sheep is not in game.units by default.
        // real Unit.ts checkSelfDefense scans 'unit' wildcard.
        // MockTerrain.findBestTarget('unit') scans game.units.

        game.sheepManager.sheeps.push(sheep); // Add sheep to managed sheeps list

        unit.checkSelfDefense([], true); // force=true bypasses interval/budget

        expect(unit.targetUnit).toBe(sheep);
        expect(unit.action).toBe('Fighting'); // Combat state should have been entered
    });

    it('should prioritize Goblins over Sheep', () => {
        const unit = new Unit(scene, terrain, 5, 5, 'knight');
        unit.game = game;
        game.units.push(unit);

        const sheep = new Sheep(scene, terrain, 6, 6);
        game.sheepManager.sheeps.push(sheep);

        // Create a Goblin at the same distance
        const goblin = { id: 999, gridX: 6, gridZ: 6, isDead: false, faction: 'enemy', type: 'goblin' };
        game.goblinManager.goblins.push(goblin);

        unit.checkSelfDefense(game.goblinManager.goblins, true);

        // Goblin should be preferred due to lower score (dist - 1000)
        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.targetUnit).toBeNull();
    });

    it('should engage in combat and grant meat reward automatically', () => {
        // 1. Setup
        const unit = new Unit(scene, terrain, 5, 5, 'knight');
        unit.game = game;
        unit.damage = 50; // Two hits to kill
        game.units.push(unit);

        const sheep = new Sheep(scene, terrain, 5.5, 5.5); // Very close
        sheep.hp = 100;
        sheep.type = 'sheep';
        game.sheepManager.sheeps.push(sheep);

        expect(game.resources.meat).toBe(0);

        // 2. Automated Targeting
        unit.checkSelfDefense([], true);
        expect(unit.targetUnit).toBe(sheep);
        expect(unit.state.name).toBe('Combat');

        // 3. Execution of Attack Loop
        // First Attack
        unit.updateLogic(101, 1, false, game.units, [], []);
        expect(sheep.hp).toBe(50);
        expect(unit.action).toBe('Fighting');

        // Second Attack (Needs to wait for cooldown if any, but unit.updateLogic handles state)
        // Combat state update calls attack which sets cooldown. 
        // In our mock/Unit.ts default, attackRate is 1.0.
        unit.attackCooldown = 0; // Force clear cooldown for test speed
        unit.updateLogic(102, 1, false, game.units, [], []);

        // 4. Verification
        expect(sheep.hp).toBe(0);
        expect(sheep.isDead).toBe(true);
        expect(game.resources.meat).toBe(1000);

        // State should transition back to Wander after target is dead
        unit.updateLogic(103, 1, false, game.units, [], []);
        expect(unit.state.name).toBe('Wander');
    });
});
