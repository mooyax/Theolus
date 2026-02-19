
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Wander, Sleep } from '../ai/states/UnitStates.js';
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

    it('should transition from WanderState to Sleep at night', () => {
        // Add a shelter so transition condition is met
        const shelter = { gridX: 20, gridZ: 20, type: 'house', id: 'h1', userData: { hp: 100 } };
        terrain.buildings = [shelter];

        unit.changeState(new Wander(unit));
        expect(unit.state).toBeInstanceOf(Wander);

        // Update with isNight = true
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(Sleep);
        // Fix: Sleep.enter()後は'Going Home'状態（移動中）。到着後に'Sleeping'になる
        expect(unit.action).toBe('Going Home');
    });

    it('should remain in Sleep if isNight persists', () => {
        // shelterを追加してSleep状態を維持できるようにする
        const shelter = { gridX: 10, gridZ: 10, type: 'house', id: 'h1', userData: { hp: 100 } };
        terrain.buildings = [shelter];

        unit.changeState(new Sleep(unit));
        game.isNight = true; // Global state also true

        unit.updateLogic(101, 1, true, []);
        expect(unit.state).toBeInstanceOf(Sleep);

        // Should NOT transition back to Wander if isNight calculation is correct
        // (Even if window.game is used as fallback)
    });

    it('should transition back to WanderState when it becomes day', () => {
        unit.changeState(new Sleep(unit));
        game.isNight = false;

        unit.updateLogic(101, 1, false, []);

        expect(unit.state).toBeInstanceOf(Wander);
    });

    it('should move towards shelter when in Sleep', () => {
        const shelter = { gridX: 20, gridZ: 20, type: 'house', id: 'h1', userData: { hp: 100 } };
        terrain.buildings = [shelter];

        unit.changeState(new Sleep(unit));
        vi.spyOn(unit, 'smartMove');

        unit.updateLogic(101, 1, true, []);

        expect(unit.action).toBe('Going Home');
        expect(unit.smartMove).toHaveBeenCalledWith(20, 20, 101);
    });
});
