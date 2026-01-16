
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { UnitWanderState, SleepState } from '../ai/states/UnitStates.js';
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

describe('Night Movement and Sleep State', () => {
    let terrain, unit, game;

    beforeEach(() => {
        terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            grid: Array(100).fill().map(() => Array(100).fill({ height: 1.0, regionId: 1 })),
            getTileHeight: vi.fn(() => 1.0),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            findPath: vi.fn(),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 20 }]),
            pathfindingCalls: 0,
            isReachable: vi.fn(() => true),
            buildings: []
        };

        game = {
            isNight: false,
            simTotalTimeSec: 100,
            terrain: terrain,
            findBestRequest: vi.fn(() => null),
            claimRequest: vi.fn(() => true)
        };
        window.game = game;

        unit = new Unit(null, terrain, 10, 10, 'worker');
        unit.id = 1;
        unit.role = 'worker';
        unit.simTime = 100;
        unit.game = game;
    });

    it('should transition from WanderState to SleepState at night', () => {
        unit.changeState(new UnitWanderState(unit));
        expect(unit.state).toBeInstanceOf(UnitWanderState);

        // Update with isNight = true
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(SleepState);
        expect(unit.action).toBe('Sleeping');
    });

    it('should remain in SleepState if isNight persists', () => {
        unit.changeState(new SleepState(unit));
        game.isNight = true; // Global state also true

        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(SleepState);

        // Should NOT transition back to Wander if isNight calculation is correct
        // (Even if window.game is used as fallback)
    });

    it('should transition back to WanderState when it becomes day', () => {
        unit.changeState(new SleepState(unit));
        game.isNight = false;

        unit.updateLogic(101, 1, false, []);

        expect(unit.state).toBeInstanceOf(UnitWanderState);
    });

    it('should move towards shelter when in SleepState', () => {
        const shelter = { gridX: 20, gridZ: 20, type: 'house', id: 'h1', userData: { hp: 100 } };
        terrain.buildings = [shelter];

        unit.changeState(new SleepState(unit));
        vi.spyOn(unit, 'smartMove');

        unit.updateLogic(101, 1, true, []);

        expect(unit.action).toBe('Going Home');
        expect(unit.smartMove).toHaveBeenCalledWith(20, 20, 101);
    });
});
