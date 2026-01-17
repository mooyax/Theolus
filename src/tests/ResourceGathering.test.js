
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Terrain } from '../Terrain.js';
import { Unit } from '../Unit.js';
import { MockTerrain, MockGame } from './TestHelper.js';

const createMockScene = () => ({
    add: vi.fn(),
    remove: vi.fn(),
    getObjectByName: vi.fn(),
    children: []
});

describe('ResourceGathering Regression Test', () => {
    let game;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = createMockScene();
        const w = 20;
        const d = 20;

        terrain = new MockTerrain(w, d);
        terrain.scene = scene;
        terrain.getTileHeight = vi.fn((x, z) => {
            if (x === 5 && z === 5) return 0;
            if (x === 10 && z === 10) return 6;
            return 2;
        });

        game = new MockGame(scene, terrain);
        game.resources = { grain: 10, fish: 0, meat: 0 };

        global.window = { game: game };
    });

    afterEach(() => {
        delete global.window;
    });

    it('Fisher should gather fish when near water', () => {
        const fisher = new Unit(scene, terrain, 6, 5, 'fisher');
        fisher.game = game;
        game.units.push(fisher);

        const gatherSpy = vi.spyOn(fisher, 'gatherResources');

        expect(game.resources.fish).toBe(0);

        // Update loop a few times
        fisher.updateLogic(0, 0.1, false, [], [], []);
        fisher.updateLogic(6.0, 0.1, false, [], [], []);

        expect(gatherSpy).toHaveBeenCalled();
        expect(game.resources.fish).toBeGreaterThan(0);
    });

    it('Hunter should gather meat when near forest', () => {
        const hunter = new Unit(scene, terrain, 11, 10, 'hunter');
        hunter.game = game;
        game.units.push(hunter);

        expect(game.resources.meat).toBe(0);

        hunter.updateLogic(0, 0.1, false, [], [], []);
        hunter.updateLogic(6.0, 0.1, false, [], [], []);

        expect(game.resources.meat).toBeGreaterThan(0);
    });

    it('Worker should NOT gather resources automatically', () => {
        const worker = new Unit(scene, terrain, 6, 5, 'worker');
        worker.game = game;
        game.units.push(worker);

        expect(game.resources.fish).toBe(0);

        worker.updateLogic(0, 0.1, false, [], [], []);
        worker.updateLogic(6.0, 0.1, false, [], [], []);

        expect(game.resources.fish).toBe(0);
    });

    it('Fisher should seek water during patrol', () => {
        const fisher = new Unit(scene, terrain, 15, 15, 'fisher');
        fisher.game = game;

        // Force checkerboard: water and land mixed
        const originalMock = terrain.getTileHeight;
        terrain.getTileHeight = vi.fn((x, z) => {
            return (x + z) % 2 === 0 ? 0 : 2;
        });

        expect(fisher.patrolTarget).toBeNull();

        fisher.patrol(0);

        expect(fisher.patrolTarget).not.toBeNull();
        terrain.getTileHeight = originalMock;
    });

    it('Hunter should seek forest during patrol', () => {
        const hunter = new Unit(scene, terrain, 0, 0, 'hunter');
        hunter.game = game;

        const originalMock = terrain.getTileHeight;
        // Force all tiles within range to be forest
        terrain.getTileHeight = vi.fn(() => 6);

        expect(hunter.patrolTarget).toBeNull();

        hunter.patrol(0);

        expect(hunter.patrolTarget).not.toBeNull();
        terrain.getTileHeight = originalMock;
    });
});
