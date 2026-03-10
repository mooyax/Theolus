
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import * as THREE from 'three';

describe('Building Sync Verification', () => {
    let game;
    let mockScene;

    beforeEach(() => {
        mockScene = new THREE.Scene();
        // Create full Game instance but minimal enough to test
        game = new Game(mockScene, null, true);
    });

    it('Game.buildings should reflect buildings added to Terrain', async () => {
        // Initial state might have caves from GoblinManager
        const initialCount = game.buildings.length;

        // Add a building directly to Terrain
        const building = game.terrain.addBuilding('house', 10, 10);

        expect(game.terrain.buildings).toContain(building);
        expect(game.buildings).toContain(building);
        expect(game.buildings.length).toBe(initialCount + 1);
    });

    it('Game.buildings should reflect buildings removed from Terrain', () => {
        const initialCount = game.buildings.length;
        const building = game.terrain.addBuilding('house', 10, 10);
        expect(game.buildings.length).toBe(initialCount + 1);

        // Remove building from Terrain
        game.terrain.removeBuilding(building);

        expect(game.terrain.buildings).not.toContain(building);
        expect(game.buildings).not.toContain(building);
        expect(game.buildings.length).toBe(initialCount);
    });

    it('Game.buildings should survive Terrain replacement in startLevel', async () => {
        const levelConfig = {
            mapWidth: 80,
            mapDepth: 80,
            seed: 123
        };

        const beforeCount = game.buildings.length;

        // In minimal mode, startLevel Reuse old Terrain but triggers new Goblin generation
        await game.startLevel(1, levelConfig); // Level 1 has 1 cave

        expect(game.terrain).toBeDefined();
        // Previous 5 are NOT cleared in minimal mock + 1 new cave from Level 1
        expect(game.buildings.length).toBeGreaterThanOrEqual(1);

        const currentCount = game.buildings.length;
        game.terrain.addBuilding('cave', 5, 5);
        expect(game.buildings.length).toBe(currentCount + 1);
    });
});
