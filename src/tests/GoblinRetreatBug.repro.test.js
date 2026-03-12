
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MockGame, MockTerrain } from './TestHelper';
import { Wander, Combat } from '../ai/states/GoblinStates';

describe('Goblin Retreat Bug Reproduction V2', () => {
    let game;
    let terrain;
    let goblinManager;
    let scene;

    beforeEach(async () => {
        game = new MockGame();
        scene = game.scene;
        terrain = new MockTerrain(100, 100);
        game.terrain = terrain;
        window.game = game;

        const { GoblinManager } = await import('../GoblinManager');
        goblinManager = new GoblinManager(scene, terrain, game, []);
        game.goblinManager = goblinManager;
    });

    it('should NOT retreat if losing target when clan is inactive', () => {
        // 1. Setup cave
        const caveBuilding = terrain.addBuilding('cave', 20, 20, true, false, 'goblin');
        goblinManager.scanForCaves();
        const cave = goblinManager.caves.find(c => c.gridX === 20);

        // 2. Spawn goblin
        goblinManager.spawnGoblinAtCave(cave, 1, true);
        const goblin = game.entityManager.getAllGoblins()[0];
        const clanId = goblin.clanId;
        goblinManager.clans[clanId] = { id: clanId, active: false }; // Ensure clan is inactive

        // Starts in Wander
        expect(goblin.state instanceof Wander).toBe(true);

        // 3. Fake detection (Enter Combat)
        goblin.targetUnit = { id: 999, gridX: 25, gridZ: 25, hp: 10, isDead: false, faction: 'player' };
        goblin.targetBuilding = null; // Ensure no building is targeted
        goblin.changeState(new Combat(goblin));
        expect(goblin.state instanceof Combat).toBe(true);

        // 4. Lose target (Losing target in Combat state should go to Wander if clan inactive)
        goblin.targetUnit.isDead = true;

        console.log(`[DEBUG] Before Update - State: ${goblin.state.constructor.name}, TargetDead: ${goblin.targetUnit.isDead}, ClanID: ${goblin.clanId}, ClanActive: ${goblinManager.clans[goblin.clanId]?.active}`);
        
        // Use goblin.updateLogic directly to see transition in one go
        goblin.updateLogic(1000, 1.0, false, [], []);

        console.log(`[DEBUG] After Update - State: ${goblin.state.constructor.name}`);

        // FIX: It should enter Wander instead of Raid or Retreat
        expect(goblin.state.constructor.name).toBe('Wander');
    });
});
