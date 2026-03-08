/** @vitest-environment happy-dom */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { Unit } from '../Unit';
import * as THREE from 'three';

// Mocking THREE.Scene
const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    children: [],
    traverse: vi.fn()
};

describe('Port Construction Reachability', () => {
    let game;
    let terrain;
    const size = 80;

    beforeEach(() => {
        vi.clearAllMocks();

        // Terrain setup
        terrain = new Terrain(mockScene, [], size, size);
        terrain.initGrid();

        // Game instance
        game = new Game(mockScene, terrain);
        game.terrain = terrain;

        // Prevent random regeneration
        vi.spyOn(game, 'regenerateWorld').mockImplementation(() => { });

        // Setup clear land/water divide
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                terrain.grid[x][z].height = (x < 40) ? 5.0 : -5.0;
            }
        }
        terrain.calculateRegions();

        window.game = game;
    });

    it('should allow a worker on land to assign to a port in water (within radius 5.5)', () => {
        const worker = game.spawnUnit(38, 38, 'worker');
        const req = game.addRequest('port', 41, 38, true);

        game.assignRequestSync(req);

        expect(req.assignedTo).toBe(worker.id);
        expect(worker.targetRequest).toBe(req);
    });

    it('should NOT assign if no valid worker is near', () => {
        // No units spawned at all
        const req = game.addRequest('port', 41, 38, true);

        game.assignRequestSync(req);

        expect(req.assignedTo).toBeNull();
    });

    it('should adjust movement target to nearest land when approaching water marker', () => {
        const worker = game.spawnUnit(30, 38, 'worker');
        const req = game.addRequest('port', 41, 38, true);
        game.assignRequestSync(req);

        const smartMoveSpy = vi.spyOn(worker, 'smartMove').mockImplementation(() => true);

        if (worker.state && worker.state.update) {
            worker.state.update(1.0, 0.1, false, [], [], []);
        }

        expect(smartMoveSpy).toHaveBeenCalled();
        const callArgs = smartMoveSpy.mock.calls[0];
        const tx = callArgs[0];
        const tz = callArgs[1];

        expect(terrain.getTileHeight(tx, tz)).toBeGreaterThan(0);
        expect(tx).toBeLessThanOrEqual(39);
    });
});
