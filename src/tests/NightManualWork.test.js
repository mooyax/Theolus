
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState, SleepState } from '../ai/states/UnitStates.js';
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
        unit.id = 1;
        unit.role = 'worker';
        unit.simTime = 100;
        unit.game = game;
        game.units.push(unit);
    });

    it('should continue MANUAL job when night falls', () => {
        const manReq = { id: 10, type: 'raise', x: 20, z: 20, isManual: true, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = manReq;
        unit.changeState(new JobState(unit));
        expect(unit.state).toBeInstanceOf(JobState);

        // Update logic at night
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBe(manReq);
        expect(game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should release AUTO job when night falls', () => {
        const autoReq = { id: 11, type: 'raise', x: 20, z: 20, isManual: false, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = autoReq;
        unit.changeState(new JobState(unit));
        expect(unit.state).toBeInstanceOf(JobState);

        // Update logic at night
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(SleepState);
        expect(game.releaseRequest).toHaveBeenCalledWith(unit, autoReq);
    });

    it('should prefer MANUAL job over sleep in UnitWanderState at night', () => {
        unit.changeState(new UnitWanderState(unit));
        expect(unit.state).toBeInstanceOf(UnitWanderState);

        const manReq = { id: 12, type: 'raise', x: 20, z: 20, isManual: true, status: 'pending' };
        game.findBestRequest.mockReturnValue(manReq);

        // Update logic at night
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBe(manReq);
    });

    it('should go to sleep if only AUTO jobs available at night', () => {
        unit.changeState(new UnitWanderState(unit));

        const autoReq = { id: 13, type: 'raise', x: 20, z: 20, isManual: false, status: 'pending' };
        game.findBestRequest.mockReturnValue(autoReq);

        // Update logic at night
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(SleepState);
    });
});
