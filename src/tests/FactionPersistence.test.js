import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';
import LZString from 'lz-string';

describe('Faction Persistence and Logic', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        const mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            children: [],
            traverse: vi.fn()
        };
        const realTerrain = new Terrain(mockScene);
        game = new Game(mockScene, realTerrain, true);
        globalThis.game = game;

        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.generate = vi.fn();
        window.game = game;
    });

    it('should persist unit and building faction across save/load', async () => {
        const playerUnit = game.spawnUnit(10, 10, 'worker', null, null, false, 'player');
        const enemyUnit = game.spawnUnit(20, 20, 'knight', null, null, false, 'enemy');
        const playerFarm = game.terrain.addBuilding('farm', 30, 30, true, false, 'player');
        const enemyFarm = game.terrain.addBuilding('farm', 40, 40, true, false, 'enemy');

        expect(playerUnit.faction).toBe('player');
        expect(enemyUnit.faction).toBe('enemy');
        expect(playerFarm.userData.faction).toBe('player');
        expect(enemyFarm.userData.faction).toBe('enemy');

        const saveResult = game.saveGame(1);
        expect(saveResult).toBe(true);

        const call = localStorage.setItem.mock.calls.find(c => c[0] === 'god_game_save_1');
        const val = call[1];

        game.entityManager.clear();
        game.terrain.buildings = [];
        localStorage.getItem.mockReturnValue(val);

        const success = await game.loadGame(1);
        expect(success).toBe(true);

        expect(game.entityManager.getAllUnits().length).toBe(2);
        const restoredPlayerUnit = game.entityManager.getAllUnits().find(u => u.role === 'worker');
        const restoredEnemyUnit = game.entityManager.getAllUnits().find(u => u.role === 'knight');

        expect(restoredPlayerUnit.faction).toBe('player');
        expect(restoredEnemyUnit.faction).toBe('enemy');

        expect(game.terrain.buildings.length).toBe(2);
        const restoredPlayerFarm = game.terrain.buildings.find(b => b.gridX === 30);
        const restoredEnemyFarm = game.terrain.buildings.find(b => b.gridZ === 40);

        expect(restoredPlayerFarm.userData.faction).toBe('player');
        expect(restoredEnemyFarm.userData.faction).toBe('enemy');
    });

    it('should only add food to player pool from player farms', () => {
        game.resources = { grain: 0, fish: 0, meat: 0 };

        const playerFarm = game.terrain.addBuilding('farm', 10, 10, true, false, 'player');
        const enemyFarm = game.terrain.addBuilding('farm', 20, 20, true, false, 'enemy');

        playerFarm.population = 120;
        enemyFarm.population = 120;

        game.terrain.updatePopulation(1.0, null, false, 0, game.resources);
        expect(game.resources.grain).toBeGreaterThan(0);

        game.resources.grain = 0;
        playerFarm.population = 0;
        enemyFarm.population = 120;

        game.terrain.updatePopulation(1.0, null, false, 0, game.resources);
        expect(game.resources.grain).toBe(0);
    });

    it('should allow workers and knights to target enemy human buildings', () => {
        const playerWorker = game.spawnUnit(10, 10, 'worker', null, null, false, 'player');
        const enemyTower = game.terrain.addBuilding('tower', 12, 10, true, false, 'enemy');

        playerWorker.checkSelfDefense(null, true);
        expect(playerWorker.targetBuilding).toBe(enemyTower);

        const playerKnight = game.spawnUnit(20, 20, 'knight', null, null, false, 'player');
        const enemyHouse = game.terrain.addBuilding('house', 22, 20, true, false, 'enemy');

        playerKnight.checkSelfDefense(null, true);
        expect(playerKnight.targetBuilding).toBe(enemyHouse);
    });
});
