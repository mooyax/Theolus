import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';

describe('Fix Verification: Time Reset and Pathfinding Budget', () => {
    let mockScene, mockTerrain, game;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn(), traverse: vi.fn() };
        mockTerrain = {
            logicalWidth: 160,
            logicalDepth: 160,
            grid: [],
            buildings: [],
            pathfindingCalls: 0,
            resetPathfindingBudget: vi.fn(function () { this.pathfindingCalls = 0; }),
            dispose: vi.fn(),
            clearEntities: vi.fn(),
            getTileHeight: vi.fn(() => 5),
            registerEntity: vi.fn(),
            getClanRaidTarget: vi.fn(),
            addBuilding: vi.fn(() => ({ userData: {} })),
            entityGrid: Array.from({ length: 160 }, () => Array.from({ length: 160 }, () => []))
        };
        // Setup Grid
        for (let x = 0; x < 160; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 160; z++) mockTerrain.grid[x][z] = { height: 5, regionId: 1 };
        }

        game = new Game(mockScene, mockTerrain, true);
        game.simTotalTimeSec = 1000;
        game.gameTime = 22.0; // Night
        game.daysPassed = 5;
    });

    it('should reset time to 8:00 on level start', async () => {
        // levelIndex 0, config and startLevel are part of Game
        // We need to mock Levels effectively or just call startLevel
        await game.startLevel(0);

        expect(game.gameTime).toBe(8.0);
        expect(game.simTotalTimeSec).toBe(0);
        expect(game.daysPassed).toBe(0);
        expect(game.isNight).toBe(false);
    });

    it('should call resetPathfindingBudget on every update', () => {
        game.update(0.1);
        expect(mockTerrain.resetPathfindingBudget).toHaveBeenCalled();
    });
});
