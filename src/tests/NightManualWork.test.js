
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Job, Wander, Sleep } from '../ai/states/UnitStates.js';
import * as THREE from 'three';

describe('Night Manual Work Priority', () => {
    let terrain, unit, game;

    beforeEach(() => {
        Unit.nextId = 0;
        terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            grid: Array(100).fill().map(() => Array(100).fill({ height: 1.0, regionId: 1 })),
            getTileHeight: vi.fn(() => 1.0),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            findPath: vi.fn((sx, sz, ex, ez) => [{ x: ex, z: ez }]),
            findPathAsync: vi.fn((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }])),
            findBestTarget: vi.fn(),
            pathfindingCalls: 0,
            isReachable: vi.fn(() => true),
            buildings: []
        };

        game = {
            isNight: true,
            simTotalTimeSec: 100,
            terrain: terrain,
            findBestRequest: vi.fn(),
            claimRequest: vi.fn(() => true),
            releaseRequest: vi.fn(),
            units: [],
            requestQueue: []
        };
        window.game = game;

        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        unit.role = 'worker';
        unit.simTime = 100;
        unit.game = game;
        game.units.push(unit);
    });

    it('should IGNORE AUTO jobs and SLEEP at night (starting new)', () => {
        // Add a shelter
        const shelter = { gridX: 50, gridZ: 50, type: 'house', id: 'h1', userData: { hp: 100, faction: 'player' } };
        terrain.buildings = [shelter];

        unit.changeState(new Wander(unit));
        unit.targetRequest = null;

        // findBestRequest returns AUTO job
        const autoReq = { id: 13, type: 'raise', x: 20, z: 20, isManual: false, status: 'pending' };
        game.findBestRequest.mockReturnValue(autoReq);

        // Update logic at night: Should NOT take the AUTO job, should go to Sleep
        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(Sleep);
        expect(unit.targetRequest).toBeNull();
    });

    it('should go toward shelter (Going Home) if NO jobs available at night', () => {
        const shelter = { gridX: 50, gridZ: 50, type: 'house', id: 'h1', userData: { hp: 100, faction: 'player' } };
        terrain.buildings = [shelter];

        unit.changeState(new Wander(unit));
        game.findBestRequest.mockReturnValue(null); // No jobs

        // Update logic at night (1st call: transitions to Sleep because no jobs)
        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(Sleep);

        // Update logic again (2nd call: Sleep.update runs and sets the correct action)
        unit.updateLogic(102, 1, true, []);
        expect(unit.action).toBe('Going Home');
    });

    it('should continue MANUAL job when night falls', () => {
        const manReq = { id: 10, type: 'raise', x: 20, z: 20, isManual: true, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = manReq;
        unit.changeState(new Job(unit));
        expect(unit.state).toBeInstanceOf(Job);

        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetRequest).toBe(manReq);
    });

    it('should NOT release AUTO job when night falls if ALREADY NEAR work', () => {
        const autoReq = { id: 11, type: 'raise', x: 10.5, z: 10.5, isManual: false, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = autoReq;
        unit.gridX = 10; unit.gridZ = 10; // Near (10,10) -> (10.5, 10.5)
        unit.getDistance = (tx, tz) => Math.sqrt((unit.gridX - tx) ** 2 + (unit.gridZ - tz) ** 2);

        unit.changeState(new Job(unit));
        expect(unit.state).toBeInstanceOf(Job);

        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(Job);
        expect(game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should release AUTO job and head home when night falls if FAR from work', () => {
        const autoReq = { id: 11, type: 'raise', x: 50, z: 50, isManual: false, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = autoReq;
        unit.gridX = 10; unit.gridZ = 10; // Far
        unit.getDistance = (tx, tz) => Math.sqrt((unit.gridX - tx) ** 2 + (unit.gridZ - tz) ** 2);

        unit.changeState(new Job(unit));
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(Sleep);
        expect(game.releaseRequest).toHaveBeenCalledWith(unit, autoReq);
    });

    it('should prefer MANUAL job over sleep in Wander at night', () => {
        unit.changeState(new Wander(unit));
        const manReq = { id: 12, type: 'raise', x: 20, z: 20, isManual: true, status: 'pending' };
        game.findBestRequest.mockReturnValue(manReq);

        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetRequest).toBe(manReq);
    });
});