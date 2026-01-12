
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

describe('Movement Execution under Pressure', () => {
    let terrain, unit;

    beforeEach(() => {
        terrain = {
            logicalWidth: 160,
            logicalDepth: 160,
            grid: Array(160).fill().map(() => Array(160).fill({ height: 1.0, regionId: 1 })),
            getTileHeight: vi.fn(() => 1.0),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            findPath: vi.fn().mockReturnValue([{ x: 6, z: 6 }]), // Valid path for JobState check
            pathfindingCalls: 0,
            isReachable: vi.fn(() => true),
            getRegion: vi.fn(() => 1),
            getRandomPointInRegion: vi.fn(() => ({ x: 5, z: 5 }))
        };

        unit = new Unit(null, terrain, 5, 5, 'worker');
        unit.id = 1;
        unit.role = 'worker';
        unit.simTime = 100;
        vi.spyOn(unit, 'executeMove');
        vi.spyOn(Math, 'random').mockReturnValue(0.99); // Disable urgent bypass
    });

    it('should WAIT (return false) when pathfinding is throttled', () => {
        // Target is far away (>4 tiles)
        const targetX = 50;
        const targetZ = 50;

        // Mock throttling
        unit.lastPathTime = 100;
        const time = 100.1; // Within 1s throttle window

        const moved = unit.smartMove(targetX, targetZ, time);

        // Should return FALSE because we don't fallback to dangerous linear move
        expect(moved).toBe(false);
        expect(unit.executeMove).not.toHaveBeenCalled();
    });

    it('should WAIT (return false) when pathfinding budget is exhausted', () => {
        const targetX = 50;
        const targetZ = 50;

        // Mock budget exhaustion
        terrain.pathfindingCalls = 101;
        unit.lastPathTime = 0;
        const time = 100;

        const moved = unit.smartMove(targetX, targetZ, time);

        expect(moved).toBe(false);
        expect(unit.executeMove).not.toHaveBeenCalled();
    });

    it('should immediately trigger movement in JobState if currently idle', () => {
        const req = { id: 'req1', x: 20, z: 20, type: 'raise', status: 'pending', assignedTo: 1, isManual: true };
        unit.targetRequest = req;

        const state = new JobState(unit);
        unit.state = state;

        // Enter state should trigger move
        state.enter();

        // A* Path (mocked) returns 6,6
        expect(unit.executeMove).toHaveBeenCalledWith(6, 6, expect.any(Number));
        expect(unit.isMoving).toBe(true);
    });
});
