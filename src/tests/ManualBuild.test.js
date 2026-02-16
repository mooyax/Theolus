import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { Game } from '../Game';
import { Job } from '../ai/states/UnitStates';
import { MockGame, MockTerrain } from './TestHelper';

describe('Manual Build Job Logic', () => {
    let game, terrain, unit;

    beforeEach(() => {
        game = new MockGame();
        terrain = new MockTerrain();
        game.terrain = terrain;
        window.game = game;
        unit = new Unit(game.scene, terrain, 5, 5, 'worker');
        unit.game = game;
        unit.id = 0;

        // Mock proper movement logic 
        unit.executeMove = Unit.prototype.executeMove;
        unit.smartMove = Unit.prototype.smartMove;
        unit.getDistance = Unit.prototype.getDistance;
    });

    it('should complete manual build job when arrived', () => {
        // Setup Request
        const req = {
            id: 'req_1',
            type: 'build_house',
            x: 10,
            z: 10,
            status: 'assigned',
            assignedTo: unit.id,
            isManual: true
        };
        unit.targetRequest = req;

        const state = new Job(unit);
        state.targetRequest = req;
        unit.changeState(state);

        // Mock game.completeRequest to actually complete it
        game.completeRequest = vi.fn((actor, req) => { req.status = 'completed'; });
        game.releaseRequest = vi.fn();

        // 1. Move Unit Close (Distance 0)
        unit.gridX = 10;
        unit.gridZ = 10;

        // Update State
        state.update(100, 0.1, false, []);

        // Expect completion
        expect(game.completeRequest).toHaveBeenCalled();
        expect(unit.targetRequest).toBeNull();
    });

    it('should NOT freeze if arrived but building fails', () => {
        // Setup Request
        const req = {
            id: 'req_2',
            type: 'build_house',
            x: 15,
            z: 15,
            status: 'assigned',
            assignedTo: unit.id,
            isManual: true
        };
        unit.targetRequest = req;
        const state = new Job(unit);
        state.targetRequest = req;
        unit.changeState(state);

        // Mock game.completeRequest to set status to 'completed'
        game.completeRequest = vi.fn((actor, req) => { req.status = 'completed'; });

        // Move Unit Close
        unit.gridX = 15;
        unit.gridZ = 15;

        state.update(100, 0.1, false, []);

        expect(game.completeRequest).toHaveBeenCalled();
        expect(unit.targetRequest).toBeNull(); // Should be cleared
    });

    it('should handle "Arrived" logic transition', () => {
        // Test exact boundary of 2.1 distance
        const req = { id: 'req_3', x: 20, z: 20, status: 'assigned', assignedTo: unit.id, isManual: true };
        unit.targetRequest = req;
        const state = new Job(unit);
        state.targetRequest = req;
        unit.changeState(state);
        game.completeRequest = vi.fn((actor, req) => { req.status = 'completed'; });

        // Distance 1.0. Should complete.
        unit.gridX = 19;
        unit.gridZ = 20;

        state.update(100, 0.1, false, []);
        expect(game.completeRequest).toHaveBeenCalled();

        // Reset
        unit.targetRequest = req;
        state.targetRequest = req;

        // Distance 2.2. Should NOT complete.
        unit.gridX = 17.8;
        unit.gridZ = 20;

        game.completeRequest.mockClear();
        state.update(100, 0.1, false, []);
        expect(game.completeRequest).not.toHaveBeenCalled();
    });
});

