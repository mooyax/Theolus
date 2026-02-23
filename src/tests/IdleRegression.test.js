
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';

describe('Job/Moving Idle Regression', () => {
    let unit;
    let terrainMock;

    beforeEach(() => {
        window.game = {
            frameCounter: 0,
            gameTotalTime: 0,
            releaseRequest: vi.fn(),
            completeRequest: vi.fn(),
            claimRequest: vi.fn().mockReturnValue(true),
            findBestRequest: vi.fn(),
            resources: { grain: 100, fish: 100, meat: 100 },
            isNight: false
        };

        terrainMock = {
            grid: Array(100).fill(null).map(() => Array(100).fill({ regionId: 1, height: 1 })),
            getTileHeight: vi.fn().mockReturnValue(1),
            getRegion: vi.fn().mockReturnValue(1),
            findBestTarget: vi.fn(() => null),
            moveEntity: vi.fn(),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            findPath: vi.fn().mockReturnValue([{ x: 50, z: 50 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 50, z: 50 }]),
            isReachable: vi.fn().mockReturnValue(true),
            checkYield: () => Promise.resolve(),
            logicalWidth: 100,
            logicalDepth: 100,
            getVisualX: (t) => t,
        };

        unit = new Unit(null, terrainMock, 10, 10, 'worker');
        unit.id = 1;
        unit.game = window.game;

        if (!unit.smartMove) {
            unit.smartMove = vi.fn().mockReturnValue(true);
        }
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should NOT abandon Job when smartMove is throttled (Time Slicing)', () => {
        const request = { id: 'req1', type: 'build', x: 50, z: 50, assignedTo: unit.id, isManual: false, status: 'assigned' };
        unit.targetRequest = request;
        unit.changeState(new Job(unit));

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.action).toBe('Approaching Job');

        unit.smartMove = vi.fn().mockImplementation(() => {
            unit.isPathfindingThrottled = true;
            return false;
        });

        for (let i = 0; i < 20; i++) {
            unit.updateLogic(i * 0.1, 0.1, false, [], [], []);
        }

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetRequest).not.toBeNull();
        expect(window.game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should NOT increment stuckTimer when smartMove is throttled', () => {
        const request = { id: 'req2', type: 'build', x: 50, z: 50, assignedTo: unit.id, isManual: true, status: 'assigned' };
        unit.targetRequest = request;
        unit.changeState(new Job(unit));

        unit.smartMove = vi.fn().mockImplementation(() => {
            unit.isPathfindingThrottled = true;
            return false;
        });

        const state = unit.state;
        state.stuckTimer = 0;

        for (let i = 0; i < 20; i++) {
            unit.updateLogic(i * 0.1, 0.1, false, [], [], []);
        }

        for (let t = 0; t < 40; t += 2.0) {
            unit.simTime = t;
            state.update(t, 2.0, false, []);
        }

        expect(unit.state).toBeInstanceOf(Job);
        expect(window.game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should NOT revert action to "Moving" if already "Approaching Job"', () => {
        unit.action = 'Approaching Job';
        unit.isMoving = true;
        unit.executeMove(11, 11, 100);

        expect(unit.action).toBe('Approaching Job');
        expect(unit.action).not.toBe('Moving');
    });

    it('should NOT execute updateCombatLogic if State Machine is active', () => {
        unit.state = { update: vi.fn(), constructor: { name: 'MockState' } };
        unit.updateCombatLogic = vi.fn();
        unit.updateLogic(100, 0.1, false, [], [], []);
        expect(unit.updateCombatLogic).not.toHaveBeenCalled();
    });
});