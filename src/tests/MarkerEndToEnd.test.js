
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

describe('Marker End-to-End: Persistence and Wrap Support', () => {
    let terrain, unit, game;

    beforeEach(() => {
        const W = 160;
        const D = 160;
        terrain = {
            logicalWidth: W,
            logicalDepth: D,
            grid: Array(W).fill().map(() => Array(D).fill({ height: 1.0, regionId: 1 })),
            getTileHeight: vi.fn(() => 1.0),
            getInterpolatedHeight: vi.fn(() => 1.0),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            findPath: vi.fn((sx, sz, ex, ez) => {
                return [{ x: sx, z: sz }, { x: ex, z: ez }];
            }),
            pathfindingCalls: 0,
            isReachable: vi.fn((sx, sz, tx, tz) => true),
            getRegion: vi.fn(() => 1),
            getRandomPointInRegion: vi.fn(() => ({ x: 5, z: 5 }))
        };

        unit = new Unit(1, 'worker', 5, 5, terrain);
        unit.id = 1;
        unit.role = 'worker';
        unit.simTime = 100;
        unit.terrain = terrain;

        game = {
            terrain,
            units: [unit],
            scene: { add: vi.fn(), remove: vi.fn() },
            simTotalTimeSec: 100,
            requestQueue: [],
            requestIdCounter: 0,
            releaseRequest: vi.fn((u, r) => {
                if (u.targetRequest === r) u.targetRequest = null;
                if (r.assignedTo === u.id) r.assignedTo = null;
                r.status = 'pending';
            }),
            claimRequest: vi.fn((u, r) => {
                // Detach old
                if (r.assignedTo !== null) {
                    const old = game.units.find(un => un.id === r.assignedTo);
                    if (old) old.targetRequest = null;
                }
                if (u.targetRequest) {
                    u.targetRequest.assignedTo = null;
                    u.targetRequest.status = 'pending';
                }

                r.status = 'assigned';
                r.assignedTo = u.id;
                u.targetRequest = r;
                u.changeState(new JobState(u));
                return true;
            }),
            addRequest: function (type, x, z, manual = true) {
                const id = `req_${this.requestIdCounter++}`;
                const req = { id, type, x, z, status: 'pending', assignedTo: null, isManual: manual, createdAt: this.simTotalTimeSec };
                this.requestQueue.push(req);
                this.processAssignments();
                return req;
            },
            processAssignments: function () {
                for (const req of this.requestQueue) {
                    if (req.status === 'pending') {
                        this.assignRequestSync(req);
                    }
                }
            },
            assignRequestSync: function (req) {
                const logicalW = this.terrain.logicalWidth;
                const logicalD = this.terrain.logicalDepth;

                let bestUnit = null;
                let minDistSq = Infinity;

                for (const u of this.units) {
                    if (u.role !== 'worker') continue;

                    // Efficiency-based preemption
                    if (u.targetRequest && u.targetRequest.isManual) {
                        let dx = Math.abs(u.gridX - req.x);
                        let dz = Math.abs(u.gridZ - req.z);
                        if (dx > logicalW / 2) dx = logicalW - dx;
                        if (dz > logicalD / 2) dz = logicalD - dz;
                        const newDistSq = dx * dx + dz * dz;

                        let odx = Math.abs(u.gridX - u.targetRequest.x);
                        let odz = Math.abs(u.gridZ - u.targetRequest.z);
                        if (odx > logicalW / 2) odx = logicalW - odx;
                        if (odz > logicalD / 2) odz = logicalD - odz;
                        const oldDistSq = odx * odx + odz * odz;

                        if (newDistSq > oldDistSq * 0.25) continue; // Not 2x closer
                    }

                    let dx = Math.abs(u.gridX - req.x);
                    let dz = Math.abs(u.gridZ - req.z);
                    if (dx > logicalW / 2) dx = logicalW - dx;
                    if (dz > logicalD / 2) dz = logicalD - dz;
                    const dSq = dx * dx + dz * dz;

                    if (dSq < minDistSq) {
                        minDistSq = dSq;
                        bestUnit = u;
                    }
                }

                if (bestUnit) {
                    this.claimRequest(bestUnit, req);
                }
            },
            tryCancelRequest: function (x, z) {
                const idx = this.requestQueue.findIndex(r => Math.abs(r.x - x) < 3 && Math.abs(r.z - z) < 3);
                if (idx !== -1) {
                    const req = this.requestQueue[idx];
                    if (req.assignedTo) {
                        const u = this.units.find(un => un.id === req.assignedTo);
                        if (u) {
                            u.targetRequest = null;
                        }
                    }
                    this.requestQueue.splice(idx, 1);
                    return true;
                }
                return false;
            },
            spawnUnit: function (x, z) {
                const u = new Unit(1, 'worker', x, z, terrain);
                u.id = this.units.length + 100;
                u.role = 'worker';
                u.terrain = terrain;
                this.units.push(u);
                this.processAssignments();
                return u;
            }
        };
        window.game = game;
    });

    it('should calculate shortest distance across map boundaries (Wrap Support)', () => {
        const dist = unit.getDistance(155, 155);
        expect(dist).toBeLessThan(15);
    });

    it('should persist through pathfinding delays for manual jobs', () => {
        const req = { id: 'req_manual', type: 'raise', x: 50, z: 50, isManual: true, status: 'assigned', assignedTo: 1 };
        unit.targetRequest = req;
        const state = new JobState(unit);
        unit.state = state;
        state.enter();

        unit.isPathfindingThrottled = true;
        vi.spyOn(unit, 'smartMove').mockReturnValue(true);

        for (let i = 0; i < 30; i++) {
            state.update(100 + i * 0.1, 0.1);
        }

        expect(unit.targetRequest).not.toBeNull();
        expect(unit.targetRequest.id).toBe('req_manual');
    });

    it('should handle sequential manual instructions with efficient preemption', () => {
        // Initial job (far)
        const req1 = game.addRequest('raise', 80, 80, true);
        expect(unit.targetRequest.id).toBe(req1.id);

        // New job (also far) -> should NOT switch
        const req2 = game.addRequest('lower', 90, 90, true);
        expect(unit.targetRequest.id).toBe(req1.id);
        expect(req2.status).toBe('pending');

        // New job (VERY close) -> should SWITCH
        const req3 = game.addRequest('raise', 6, 6, true);
        expect(unit.targetRequest.id).toBe(req3.id);
        expect(req1.status).toBe('pending'); // Returned to queue!
    });

    it('should assign pending jobs to newly spawned workers', () => {
        // Occupation: unit 1 is busy with far job
        const req1 = game.addRequest('raise', 80, 80, true);
        expect(unit.targetRequest.id).toBe(req1.id);

        // Add another job -> remains pending
        const req2 = game.addRequest('lower', 100, 100, true);
        expect(req2.status).toBe('pending');

        // Spawn new unit -> should pick up req2
        const unit2 = game.spawnUnit(50, 50);
        expect(unit2.targetRequest.id).toBe(req2.id);
    });

    it('should handle job cancellation and release worker', () => {
        const req = game.addRequest('raise', 40, 40, true);
        expect(unit.targetRequest.id).toBe(req.id);

        game.tryCancelRequest(40, 40);
        expect(unit.targetRequest).toBeNull();
    });
});
