
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { JobState } from '../ai/states/UnitStates.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        Group: class { constructor() { this.position = new actual.Vector3(); this.add = vi.fn(); } },
        Mesh: class { constructor() { this.position = new actual.Vector3(); this.add = vi.fn(); } },
        Scene: class { constructor() { this.add = vi.fn(); } },
    };
});

describe('Marker Distraction and Pathfinding Persistence', () => {
    let terrain, unit;

    beforeEach(() => {
        terrain = {
            logicalWidth: 80,
            logicalDepth: 80,
            grid: Array(80).fill().map(() => Array(80).fill({ hasBuilding: false, height: 1.0 })),
            getTileHeight: vi.fn(() => 1.0),
            getInterpolatedHeight: vi.fn(() => 1.0),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            findPath: vi.fn(() => []),
            pathfindingCalls: 0
        };

        const mockScene = new THREE.Scene();
        unit = new Unit(mockScene, terrain, 10, 10, 'worker');
        unit.role = 'worker';
        unit.id = 123; // Set specific ID
        unit.ignoredTargets = new Map();
        unit.simTime = 100;
        unit.isReachable = vi.fn(() => true);
        unit.terrain = terrain;

        window.game = { terrain, simTotalTimeSec: 100, releaseRequest: vi.fn(), units: [] };
    });

    it('should NOT abandon manual job during pathfinding throttle', () => {
        const req = { id: 'req_1', type: 'raise', x: 25, z: 25, status: 'assigned', assignedTo: 123, isManual: true };
        unit.targetRequest = req;
        const state = new JobState(unit);
        unit.state = state;

        vi.spyOn(unit, 'smartMove').mockImplementation(() => {
            unit.isPathfindingThrottled = true;
            return true;
        });

        state.enter();

        for (let i = 0; i < 20; i++) {
            state.update(100 + i, 0.1);
        }

        expect(unit.targetRequest, 'Unit should keep the job during throttle wait').not.toBeNull();
    });

    it('should be more persistent for manual jobs on hard failure', () => {
        const req = { id: 'req_2', type: 'lower', x: 25, z: 25, status: 'assigned', assignedTo: 123, isManual: true };
        unit.targetRequest = req;
        const state = new JobState(unit);
        unit.state = state;

        vi.spyOn(unit, 'smartMove').mockReturnValue(false);
        unit.isPathfindingThrottled = false;

        state.enter();
        unit.isPathfindingThrottled = false;

        // Threshold is 50 for manual jobs. 10 failures should be fine.
        for (let i = 0; i < 10; i++) {
            state.update(100 + i, 0.1);
        }

        expect(unit.targetRequest, 'Unit should be persistent for manual jobs beyond 5 failures').not.toBeNull();
        expect(unit.targetRequest.id).toBe('req_2');
    });
});
