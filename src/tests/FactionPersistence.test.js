
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';
import LZString from 'lz-string';

describe('Faction Persistence and Logic', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        // Use real Terrain even in minimal mode to ensure logic (like faction support) works
        const mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            children: [],
            traverse: vi.fn() // Essential for Terrain.dispose()
        };
        const realTerrain = new Terrain(mockScene);
        game = new Game(mockScene, realTerrain, true);
        globalThis.game = game; // Ensure global access

        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.generate = vi.fn();
        window.game = game;
    });

    it('should persist unit and building faction across save/load', async () => {
        console.log("Starting persistence test...");
        // 1. Setup entities with different factions
        const playerUnit = game.spawnUnit(10, 10, 'worker', null, null, false, 'player');
        const enemyUnit = game.spawnUnit(20, 20, 'knight', null, null, false, 'enemy');
        const playerFarm = game.terrain.addBuilding('farm', 30, 30, true, false, 'player');
        const enemyFarm = game.terrain.addBuilding('farm', 40, 40, true, false, 'enemy');

        console.log(`Units: PlayerID=${playerUnit.id} EnemyID=${enemyUnit.id}`);
        console.log(`Farms: PlayerFaction=${playerFarm.userData.faction} EnemyFaction=${enemyFarm.userData.faction}`);

        expect(playerUnit.faction).toBe('player');
        expect(enemyUnit.faction).toBe('enemy');
        expect(playerFarm.userData.faction).toBe('player');
        expect(enemyFarm.userData.faction).toBe('enemy');

        // 2. Save Game
        console.log("Saving game...");
        const saveResult = game.saveGame(1);
        expect(saveResult).toBe(true);

        const setItemCalls = localStorage.setItem.mock.calls;
        console.log("LocalStorage setItem calls:", setItemCalls.length);
        const call = setItemCalls.find(c => c[0] === 'god_game_save_1');
        if (!call) {
            console.error("Save call not found in localStorage!");
            throw new Error("Save call not found");
        }
        const val = call[1];
        const decompressed = JSON.parse(LZString.decompressFromUTF16(val));
        console.log("Decompressed faction data check:");
        console.log("Unit 0 faction:", decompressed.data.units[0].faction);
        console.log("Unit 1 faction:", decompressed.data.units[1].faction);
        console.log("Building 0 faction:", decompressed.data.terrain.b[0].f);
        console.log("Building 1 faction:", decompressed.data.terrain.b[1].f);

        // 3. Prepare for Load (Clear current state)
        game.units = [];
        game.terrain.buildings = [];

        // 4. Load Game
        console.log("Loading game...");
        localStorage.getItem.mockReturnValue(val);

        const success = await game.loadGame(1);
        console.log("Load result:", success);
        expect(success).toBe(true);

        // 5. Verify restoration
        console.log("Verifying restored entities...");
        expect(game.units.length).toBe(2);
        const restoredPlayerUnit = game.units.find(u => u.role === 'worker');
        const restoredEnemyUnit = game.units.find(u => u.role === 'knight');

        expect(restoredPlayerUnit.faction).toBe('player');
        expect(restoredEnemyUnit.faction).toBe('enemy');

        expect(game.terrain.buildings.length).toBe(2);
        const restoredPlayerFarm = game.terrain.buildings.find(b => b.gridX === 30);
        const restoredEnemyFarm = game.terrain.buildings.find(b => b.gridX === 40);

        expect(restoredPlayerFarm.userData.faction).toBe('player');
        expect(restoredEnemyFarm.userData.faction).toBe('enemy');
        console.log("Persistence test PASSED");
    });

    it('should only add food to player pool from player farms', () => {
        console.log("Starting resource test...");
        game.resources = { grain: 0, fish: 0, meat: 0 };

        const playerFarm = game.terrain.addBuilding('farm', 10, 10, true, false, 'player');
        const enemyFarm = game.terrain.addBuilding('farm', 20, 20, true, false, 'enemy');

        // Force farm growth to ready-to-harvest state (Cap is 120)
        playerFarm.population = 120;
        enemyFarm.population = 120;

        console.log(`Initial resources: grain=${game.resources.grain}`);
        // Trigger updatePopulation in terrain (NOT updateBuildings)
        game.terrain.updatePopulation(1.0, null, false, 0, game.resources);

        console.log(`Resources after update: grain=${game.resources.grain}`);
        // Player farm should have contributed
        expect(game.resources.grain).toBeGreaterThan(0);

        // Reset and check with ONLY enemy farm
        game.resources.grain = 0;
        playerFarm.population = 0; // Disable player farm
        enemyFarm.population = 120;

        game.terrain.updatePopulation(1.0, null, false, 0, game.resources);

        console.log(`Resources after 2nd update (enemy only): grain=${game.resources.grain}`);
        // Enemy farm should NOT have contributed to player pool
        expect(game.resources.grain).toBe(0);
        console.log("Resource test PASSED");
    });

    it('should allow workers and knights to target enemy human buildings', () => {
        console.log("Starting enemy building targeting test...");

        // Setup: Player worker and Enemy tower
        const playerWorker = game.spawnUnit(10, 10, 'worker', null, null, false, 'player');
        const enemyTower = game.terrain.addBuilding('tower', 12, 10, true, false, 'enemy');

        console.log(`Worker Faction: ${playerWorker.faction}, Tower Faction: ${enemyTower.userData.faction}`);

        // Trigger scan with forceScan=true to bypass frame interval/budget
        playerWorker.checkSelfDefense(null, true);

        console.log(`Worker current target: ${playerWorker.targetBuilding ? playerWorker.targetBuilding.userData.type : 'NONE'}`);
        expect(playerWorker.targetBuilding).toBe(enemyTower);

        // Setup: Player knight and Enemy house
        const playerKnight = game.spawnUnit(20, 20, 'knight', null, null, false, 'player');
        const enemyHouse = game.terrain.addBuilding('house', 22, 20, true, false, 'enemy');

        playerKnight.checkSelfDefense(null, true);

        console.log(`Knight current target: ${playerKnight.targetBuilding ? playerKnight.targetBuilding.userData.type : 'NONE'}`);
        expect(playerKnight.targetBuilding).toBe(enemyHouse);

        console.log("Targeting test PASSED");
    });
});
