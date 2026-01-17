
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Terrain } from '../Terrain.js';
import { Unit } from '../Unit.js';
import { JobState } from '../ai/states/UnitStates.js';
import { MockTerrain, MockGame } from './TestHelper.js';

const createMockScene = () => ({
    add: vi.fn(),
    remove: vi.fn(),
    getObjectByName: vi.fn(),
    children: []
});

describe('Terrain Job Reachability Test', () => {
    let game;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = createMockScene();
        const w = 20;
        const d = 20;

        terrain = new MockTerrain(w, d);
        terrain.scene = scene;
        // Water at (10, 10), Land everywhere else
        terrain.getTileHeight = vi.fn((x, z) => {
            if (x === 10 && z === 10) return -2; // Water
            return 2; // Land
        });

        game = new MockGame(scene, terrain);
        game.resources = { grain: 100, fish: 0, meat: 0 };
        game.completeRequest = vi.fn();

        global.window = { game: game };
    });

    afterEach(() => {
        delete global.window;
    });

    it('Worker should complete raise request on water from adjacent tile (Distance 1.0)', () => {
        const worker = new Unit(scene, terrain, 9, 10, 'worker'); // Adjacent to (10,10)
        worker.game = game;

        const request = {
            id: 'req_1',
            type: 'raise',
            x: 10,
            z: 10,
            isManual: true,
            status: 'assigned',
            assignedTo: worker.id
        };

        worker.targetRequest = request;
        worker.changeState(new JobState(worker));

        const dist = worker.getDistance(request.x, request.z);
        expect(dist).toBe(1.0);

        worker.updateLogic(100, 0.1, false, [], [], []);

        expect(game.completeRequest).toHaveBeenCalledWith(worker, request);
        expect(worker.targetRequest).toBeNull();
    });

    it('Worker should complete raise request on water from diagonal tile (Distance ~1.414)', () => {
        const worker = new Unit(scene, terrain, 9, 9, 'worker'); // Diagonal to (10,10)
        worker.game = game;

        const request = {
            id: 'req_diag',
            type: 'raise',
            x: 10,
            z: 10,
            isManual: true,
            status: 'assigned',
            assignedTo: worker.id
        };

        worker.targetRequest = request;
        worker.changeState(new JobState(worker));

        const dist = worker.getDistance(request.x, request.z);
        // Distance is sqrt(1^2 + 1^2) = 1.414...
        expect(dist).toBeGreaterThan(1.4);
        expect(dist).toBeLessThan(1.5);

        worker.updateLogic(100, 0.1, false, [], [], []);

        expect(game.completeRequest).toHaveBeenCalledWith(worker, request);
        expect(worker.targetRequest).toBeNull();
    });

    it('Worker should NOT complete job if distance is 1.5 or more', () => {
        const worker = new Unit(scene, terrain, 8, 10, 'worker'); // Distance 2.0 to (10,10)
        worker.game = game;

        const request = {
            id: 'req_far',
            type: 'raise',
            x: 10,
            z: 10,
            isManual: true,
            status: 'assigned',
            assignedTo: worker.id
        };

        worker.targetRequest = request;
        worker.changeState(new JobState(worker));

        const dist = worker.getDistance(request.x, request.z);
        expect(dist).toBe(2.0);

        worker.updateLogic(100, 0.1, false, [], [], []);

        expect(game.completeRequest).not.toHaveBeenCalled();
        expect(worker.targetRequest).toBe(request);
    });
});
