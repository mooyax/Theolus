
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { Building } from '../Building';
import * as THREE from 'three';

describe('Win/Loss Condition Logic', () => {
    let game;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        // Create a real terrain to avoid the mock terrain in minimal mode
        const terrain = new Terrain(scene, [], 160, 160);
        game = new Game(scene, terrain, true); // true means minimal
        game.gameActive = true;
    });

    it('should return "loss" when player units and buildings are all gone', () => {
        // Setup: No player units
        game.units = [];

        // Setup: Only enemy buildings (caves) exist
        const cave = new Building(scene, game.terrain, 'cave', 10, 10);
        cave.userData.faction = 'enemy';
        game.terrain.buildings = [cave];

        // Action
        const result = game.evaluateWinLoss();

        // Assertion: Should be loss because player has nothing
        expect(result).toBe('loss');
    });

    it('should NOT return "loss" if player still has a building', () => {
        game.units = [];

        const house = new Building(scene, game.terrain, 'house', 5, 5);
        house.userData.faction = 'player';
        game.terrain.buildings = [house];

        // Add an enemy to prevent a "win" result
        const cave = new Building(scene, game.terrain, 'cave', 10, 10);
        cave.userData.faction = 'enemy';
        game.terrain.buildings.push(cave);

        const result = game.evaluateWinLoss();
        expect(result).toBe(null); // Not over yet
    });


    it('should return "win" when all enemies (goblins, caves, huts, units) are gone', () => {
        // Player exists
        const worker = { faction: 'player', isDead: false };
        game.units = [worker];

        // No enemies in managers
        if (game.goblinManager) {
            game.goblinManager.goblins = [];
            game.goblinManager.caves = [];
        }

        // No enemy buildings/units
        game.terrain.buildings = [];

        const result = game.evaluateWinLoss();
        expect(result).toBe('win');
    });

    it('should correctly restore enemy faction for caves and huts during deserialization', async () => {
        const terrain = game.terrain;
        const saveData = {
            buildings: [
                { type: 'cave', gridX: 10, gridZ: 10, hp: 100 },
                { type: 'goblin_hut', gridX: 20, gridZ: 20, hp: 50 },
                { type: 'house', gridX: 5, gridZ: 5, hp: 100 } // This should be player
            ]
        };

        // Mock addBuilding to track calls or check results
        // Actually we can just check terrain.buildings after calling restore methods
        await terrain.restoreCave(saveData.buildings[0]);
        await terrain.restoreGoblinHut(saveData.buildings[1]);
        await terrain.restoreHouse(saveData.buildings[2]);

        const cave = terrain.buildings.find(b => b.type === 'cave');
        const hut = terrain.buildings.find(b => b.type === 'goblin_hut');
        const house = terrain.buildings.find(b => b.type === 'house');

        expect(cave.userData.faction).toBe('enemy');
        expect(hut.userData.faction).toBe('enemy');
        expect(house.userData.faction).toBe('player');
    });
});
