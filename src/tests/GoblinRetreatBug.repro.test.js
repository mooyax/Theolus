
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { GoblinManager } from '../GoblinManager';
import { Raid, Retreat, Wander, Combat } from '../ai/states/GoblinStates';
import * as THREE from 'three';

describe('Goblin Retreat Bug Reproduction V2', () => {
    let game;
    let terrain;
    let goblinManager;
    let scene;

    beforeEach(async () => {
        scene = new THREE.Scene();
        game = new Game(undefined, undefined, true);
        window.game = game;

        terrain = new Terrain(scene, [], 100, 100);
        for (let x = 0; x < 100; x++) {
            for (let z = 0; z < 100; z++) {
                terrain.grid[x][z].height = 5;
            }
        }
        game.terrain = terrain;

        goblinManager = new GoblinManager(scene, terrain, game, []);
        game.goblinManager = goblinManager;
    });

    it('should NOT retreat if losing target when clan is inactive', () => {
        // 1. Setup cave
        const caveBuilding = terrain.addBuilding('cave', 20, 20);
        goblinManager.scanForCaves();
        const cave = goblinManager.caves.find(c => c.gridX === 20);

        // 2. Spawn goblin
        goblinManager.spawnGoblinAtCave(cave, 1, true);
        const goblin = goblinManager.goblins[0];

        // Starts in Wander
        expect(goblin.state instanceof Wander).toBe(true);

        // 3. Fake detection (Enter Combat)
        goblin.targetUnit = { id: 999, gridX: 25, gridZ: 25, hp: 10, isDead: false, faction: 'player' };
        goblin.changeState(new Combat(goblin));
        expect(goblin.state instanceof Combat).toBe(true);

        // 4. Lose target (Losing target in Combat state should go to Raid)
        goblin.targetUnit.isDead = true;

        // Update to trigger handleTargetLost (which happens in updateCombatTarget or update)
        // Actually Combat.update calls executeAttack which checks target
        // Let's manually trigger the state transition as handleTargetLost does:
        // Combat.update -> handleTargetLost if !target

        goblinManager.update(1000, 1.0, false, [], []);

        // After target lost, it should go to Raid
        // In Raid.update, it checks clan activity.
        // Since clan is inactive, it will go to Retreat.

        // FIX: It should enter Wander instead of Retreat
        expect(goblin.state instanceof Wander).toBe(true);
    });
});
