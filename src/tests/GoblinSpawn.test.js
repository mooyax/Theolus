
import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { GoblinManager } from '../GoblinManager.js';
import * as THREE from 'three';
import { MockGame, MockTerrain } from './TestHelper.js';
import { Goblin } from '../Goblin.js';

global.THREE = THREE;
if (!global.window) global.window = { game: null };

describe('Goblin Hut Spawning', () => {
    let goblinManager;
    let mockGame;
    let mockTerrain;

    beforeAll(() => {
        Goblin.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);
        if (!mockTerrain.registerCave) {
            mockTerrain.registerCave = (x, z, cave) => {
                mockTerrain.buildings.push(cave);
                return true;
            };
        }

        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;

        goblinManager = new GoblinManager(mockGame.scene, mockTerrain);
        mockGame.goblinManager = goblinManager;
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should spawn goblin when hut population reaches 10', () => {
        const hut = {
            userData: {
                type: 'goblin_hut',
                population: 10.5,
                gridX: 10,
                gridZ: 10,
                id: 'hut_1'
            }
        };
        mockTerrain.buildings = [hut];

        const spawnSpy = vi.spyOn(goblinManager, 'spawnGoblinAtCave');
        spawnSpy.mockImplementation((cave) => {
            // Simplified logic for tool validation
            if (cave && cave.userData) cave.userData.population -= 1.0;
            return true;
        });

        const deltaTime = 1.0;
        goblinManager.checkHutSpawns(deltaTime);

        expect(hut.userData.population).toBeLessThan(10.0); // Should be 9.5
        expect(spawnSpy).toHaveBeenCalled();
    });

    it('should NOT spawn if Global Cap is reached', () => {
        const hut = {
            userData: { type: 'goblin_hut', population: 10.5, gridX: 10, gridZ: 10 }
        };
        mockTerrain.buildings = [hut];
        goblinManager.goblins = Array(300).fill({});
        goblinManager.MAX_GOBLINS = 300;

        const spawnSpy = vi.spyOn(goblinManager, 'spawnGoblinAtCave');
        goblinManager.checkHutSpawns(1.0);

        expect(spawnSpy).not.toHaveBeenCalled();
        expect(hut.userData.population).toBe(10.5);
    });
});