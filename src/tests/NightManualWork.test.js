
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Job, Wander, Sleep } from '../ai/states/UnitStates.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        Group: class { constructor() { this.position = new actual.Vector3(); this.add = vi.fn(); } },
        Mesh: class { constructor() { this.position = new actual.Vector3(); this.add = vi.fn(); } },
        Scene: class { constructor() { this.add = vi.fn(); this.remove = vi.fn(); } },
    };
});

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
            findBestTarget: vi.fn(), // Fix crash in checksSelfDefense
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
        // unit.id = 1; // DO NOT OVERRIDE so we get ID 0 and see state change logs
        unit.role = 'worker';
        unit.simTime = 100;
        unit.game = game;
        game.units.push(unit);
    });

    it('should go toward shelter (Going Home) if only AUTO jobs available at night', () => {
        // Add a shelter so transition to Sleep/Going Home is possible
        const shelter = { gridX: 50, gridZ: 50, type: 'house', id: 'h1', userData: { hp: 100, faction: 'player' } };
        terrain.buildings = [shelter];

        unit.changeState(new Wander(unit));

        const autoReq = { id: 13, type: 'raise', x: 20, z: 20, isManual: false, status: 'pending' };
        game.findBestRequest.mockReturnValue(autoReq);

        // Update logic at night (1st call: transitions to Sleep)
        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(Sleep);

        // Update logic again (2nd call: Sleep.update runs and sets the correct action)
        unit.updateLogic(102, 1, true, []);
        expect(unit.state).toBeInstanceOf(Sleep);
        // And because we are far from shelter (10,10 vs 50,50), action should stay/become Going Home
        expect(unit.action).toBe('Going Home');
    });

    it('should continue MANUAL job when night falls', () => {
        const manReq = { id: 10, type: 'raise', x: 20, z: 20, isManual: true, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = manReq;
        unit.changeState(new Job(unit));
        expect(unit.state).toBeInstanceOf(Job);

        // Update logic at night
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetRequest).toBe(manReq);
        expect(game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should NOT release AUTO job when night falls if already active', () => {
        const autoReq = { id: 11, type: 'raise', x: 20, z: 20, isManual: false, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = autoReq;
        unit.changeState(new Job(unit));
        expect(unit.state).toBeInstanceOf(Job);

        // Update logic at night
        unit.updateLogic(101, 1, true, []);

        // Should STILL be in Job (don't interrupt started work)
        expect(unit.state).toBeInstanceOf(Job);
        expect(game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should prefer MANUAL job over sleep in Wander at night', () => {
        unit.changeState(new Wander(unit));
        expect(unit.state).toBeInstanceOf(Wander);

        const manReq = { id: 12, type: 'raise', x: 20, z: 20, isManual: true, status: 'pending' };
        game.findBestRequest.mockReturnValue(manReq);

        // Update logic at night
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetRequest).toBe(manReq);
    });
});
