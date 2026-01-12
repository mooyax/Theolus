
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { JobState, CombatState, SleepState } from '../ai/states/UnitStates.js';
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

describe('Manual Request Priority and Preemption', () => {
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
            findPath: vi.fn(),
            pathfindingCalls: 0,
            isReachable: vi.fn(() => true),
            buildings: []
        };

        game = {
            isNight: false,
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

    it('should allow manual request to preempt CombatState', () => {
        const goblin = { gridX: 12, gridZ: 12, id: 'g1' };
        unit.targetGoblin = goblin;
        unit.changeState(new CombatState(unit));
        expect(unit.state).toBeInstanceOf(CombatState);
        // Action might be 'Fighting' or 'Chasing' depending on distance
        expect(['Fighting', 'Chasing']).toContain(unit.action);

        const manReq = { id: 2, type: 'raise', x: 20, z: 20, isManual: true, status: 'pending' };
        game.findBestRequest.mockReturnValue(manReq);

        // Update logic
        unit.updateLogic(101, 1, false, [goblin]);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBe(manReq);
        expect(unit.action).toBe('Approaching Job');
    });

    it('should allow manual request to preempt SleepState', () => {
        unit.changeState(new SleepState(unit));
        unit.isSleeping = true;
        expect(unit.state).toBeInstanceOf(SleepState);

        const manReq = { id: 3, type: 'lower', x: 30, z: 30, isManual: true, status: 'pending' };
        game.findBestRequest.mockReturnValue(manReq);

        // Update logic
        unit.updateLogic(101, 1, true, []);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).toBe(manReq);
        expect(unit.isSleeping).toBe(false);
    });

    it('should NOT allow auto request to preempt CombatState', () => {
        const goblin = { gridX: 12, gridZ: 12, id: 'g1' };
        unit.targetGoblin = goblin;
        unit.changeState(new CombatState(unit));

        const autoReq = { id: 4, type: 'raise', x: 20, z: 20, isManual: false, status: 'pending' };
        game.findBestRequest.mockReturnValue(autoReq);

        unit.updateLogic(101, 1, false, [goblin]);

        expect(unit.state).toBeInstanceOf(CombatState);
    });
});
