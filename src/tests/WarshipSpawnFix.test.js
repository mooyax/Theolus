import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { Warship } from '../Warship';
import { Building } from '../Building';
import * as THREE from 'three';

// Mock Scene
const mockScene = {
    add: () => { },
    remove: () => { },
    traverse: () => { }
};

describe('Warship Spawn Position Fix', () => {
    let game, terrain;

    beforeEach(() => {
        terrain = new Terrain(mockScene, [], 40, 40);
        terrain.initGrid();
        game = new Game(mockScene, terrain);
        game.terrain = terrain;
        window.game = game;
    });

    it('should spawn warship in water even if port origin is on land', () => {
        // Setup a 3x3 port at (10,10)
        // (10,10) is land, but (12,12) is water
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                terrain.grid[10 + i][10 + j].height = (i < 2) ? 1.0 : -1.0;
                // Row 10,11 = Land (h=1)
                // Row 12 = Water (h=-1)
            }
        }

        const port = new Building(mockScene, terrain, 'port', 10, 10);
        port.userData.faction = 'player';

        // Spy on spawnUnit to see final coordinates
        const spawnSpy = vi.spyOn(game, 'spawnUnit');

        // Trigger spawn via handleBuildingSpawn
        game.handleBuildingSpawn(10, 10, 'port', port);

        expect(spawnSpy).toHaveBeenCalled();
        const callArgs = spawnSpy.mock.calls[0];
        const finalX = callArgs[0];
        const finalZ = callArgs[1];

        // Should have found water at Z=12 (nearest water to center 11,11)
        expect(terrain.grid[finalX][finalZ].height).toBeLessThanOrEqual(0);
        console.log(`[Test] Port(10,10) spawned Warship at (${finalX}, ${finalZ}) h=${terrain.grid[finalX][finalZ].height}`);
    });
});
