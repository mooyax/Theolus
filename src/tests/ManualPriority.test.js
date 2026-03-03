import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Job, Combat, Sleep } from '../ai/states/UnitStates.js';
import * as THREE from 'three';

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
            findPath: vi.fn((sx, sz, ex, ez) => [{ x: ex, z: ez }]),
            findPathAsync: vi.fn((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }])),
            pathfindingCalls: 0,
            isReachable: vi.fn(() => true),
            buildings: []
        };

        game = {
            isNight: false,
            simTotalTimeSec: 100,
            terrain: terrain,
            units: [],
            requestQueue: [],
            claimRequest: function (u, req) {
                req.status = 'assigned';
                u.targetRequest = req;
                u.isSleeping = false;
                u.changeState(new Job(u));
                return true;
            },
            assignRequestSync: function (req) {
                let bestUnit = null;
                for (const u of this.units) {
                    if (u.state && u.state.constructor.name === 'Combat') continue;
                    if (!req.isManual && u.state && u.state.constructor.name === 'Sleep') continue;
                    bestUnit = u;
                    break;
                }
                if (bestUnit) this.claimRequest(bestUnit, req);
            },
            releaseRequest: vi.fn(),
        };
        window.game = game;

        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        unit.id = 1;
        unit.role = 'worker';
        unit.simTime = 100;
        unit.game = game;
        game.units.push(unit);
    });

    it('should NOT allow manual request to preempt Combat', () => {
        const goblin = { gridX: 12, gridZ: 12, id: 'g1' };
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));
        expect(unit.state).toBeInstanceOf(Combat);
        expect(['Fighting', 'Chasing']).toContain(unit.action);

        const manReq = { id: 2, type: 'raise', x: 20, z: 20, isManual: true, status: 'pending' };
        game.assignRequestSync(manReq);

        expect(unit.state).toBeInstanceOf(Combat);
    });

    it('should allow manual request to preempt Sleep', () => {
        unit.changeState(new Sleep(unit));
        unit.isSleeping = true;
        expect(unit.state).toBeInstanceOf(Sleep);

        const manReq = { id: 3, type: 'lower', x: 30, z: 30, isManual: true, status: 'pending' };
        game.assignRequestSync(manReq);

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetRequest).toBe(manReq);
        expect(unit.isSleeping).toBe(false);
    });

    it('should NOT allow auto request to preempt Combat', () => {
        const goblin = { gridX: 12, gridZ: 12, id: 'g1' };
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));

        const autoReq = { id: 4, type: 'raise', x: 20, z: 20, isManual: false, status: 'pending' };
        game.assignRequestSync(autoReq);

        expect(unit.state).toBeInstanceOf(Combat);
    });
});