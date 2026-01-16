
// @vitest-environment happy-dom
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState } from '../ai/states/UnitStates.js';
import * as THREE from 'three';
import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock dependencies for Unit.js
vi.mock('three', async () => {
    const originalModule = await vi.importActual('three');
    return {
        ...originalModule,
    };
});

describe('Worker Job Logic (Unit.js + States)', () => {
    let mockGame;
    let unit;
    let mockTerrain;

    beforeEach(() => {
        // Mock Terrain
        mockTerrain = {
            logicalWidth: 40,
            logicalDepth: 40,
            getTileHeight: vi.fn().mockReturnValue(5),
            raise: vi.fn().mockReturnValue(1),
            lower: vi.fn().mockReturnValue(1),
            addBuilding: vi.fn().mockReturnValue(true),
            removeBuilding: vi.fn(),
            grid: [],
            updateMesh: vi.fn(),
            updateColors: vi.fn(),
            registerEntity: vi.fn(),
            checkFlatArea: vi.fn().mockReturnValue(true), // Added for WorkerRequest test
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 }), // Added for WorkerRequest test
            unregisterEntity: vi.fn(),
            findBestTarget: vi.fn(),
            getBuildingSize: vi.fn().mockReturnValue(1),
            isWalkable: vi.fn().mockReturnValue(true),
            getRegion: vi.fn().mockReturnValue(1),
            findPath: vi.fn(), // Mock findPath
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 10 }]), // Mock findPathAsync
            pathfindingCalls: 0 // Mock Budget
        };
        // Setup grid
        for (let x = 0; x < 40; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                mockTerrain.grid[x][z] = { height: 0, hasBuilding: false, regionId: 1 };
            }
        }

        // Mock Game Object
        mockGame = {
            requestQueue: [],
            requestIdCounter: 0,
            isNight: false,
            addRequest: function (type, x, z) {
                const req = { id: `req_${this.requestIdCounter++}`, type, x, z, status: 'pending' };
                this.requestQueue.push(req);
                return req;
            },
            findBestRequest: function (unit) {
                return this.requestQueue.find(r => r.status === 'pending') || null;
            },
            claimRequest: function (unit, req) {
                if (req.status !== 'pending') return false;
                req.status = 'assigned';
                req.assignedTo = unit.id;
                return true;
            },
            releaseRequest: vi.fn((unit, req) => {
                req.status = 'pending';
                req.assignedTo = null;
            }),
            completeRequest: vi.fn(function (unit, req) {
                if (req.type === 'raise') mockTerrain.raise(req.x, req.z);
                const idx = this.requestQueue.indexOf(req);
                if (idx !== -1) this.requestQueue.splice(idx, 1);
            }),
            units: [],
            scene: { add: vi.fn(), remove: vi.fn() },
            terrain: mockTerrain,
            raidPoints: []
        };

        // Create Unit
        unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'worker');
        unit.id = 'worker_1';
        unit.game = mockGame;
        unit.isReachable = vi.fn().mockReturnValue(true);

        // Initial state
        unit.changeState(new UnitWanderState(unit));

        // GLOBAL MOUNT
        window.game = mockGame;
    });

    test('Unit finds and claims request when idle', () => {
        const req = mockGame.addRequest('raise', 5, 5);

        // Tick Logic (Actor.update calls currentState.update)
        unit.updateLogic(2000, 0.016);

        expect(unit.targetRequest).toBe(req);
        expect(req.status).toBe('assigned');
        expect(req.assignedTo).toBe(unit.id);
        expect(unit.state).toBeInstanceOf(JobState);
    });

    test('Unit moves to target request', () => {
        const req = mockGame.addRequest('raise', 10, 10);

        // Spy on smartMove (which JobState uses) - MOVED BEFORE State Change to catch 'enter' call
        vi.spyOn(unit, 'smartMove').mockReturnValue(true);

        // Setup Unit State initially
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;
        unit.changeState(new JobState(unit));
        unit.gridX = 0; unit.gridZ = 0;

        // Update
        unit.updateLogic(2000, 0.016);

        // In JobState, action is set to 'Approaching Job' when moving
        expect(unit.action).toBe('Approaching Job');
        expect(unit.smartMove).toHaveBeenCalled();
    });

    test('Unit completes request upon arrival', () => {
        const req = mockGame.addRequest('raise', 10, 10);
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;
        unit.changeState(new JobState(unit));

        // Place Unit AT location (within approach distance 3.0 for raise)
        unit.gridX = 10;
        unit.gridZ = 10;

        // Spy on Game.completeRequest
        const spyComplete = vi.spyOn(mockGame, 'completeRequest');

        // Update
        unit.updateLogic(2000, 0.016);

        expect(spyComplete).toHaveBeenCalled();
        expect(unit.targetRequest).toBeNull();
        // UnitWanderState starts as Idle
        expect(unit.action).toBe('Idle');
        expect(mockTerrain.raise).toHaveBeenCalledWith(10, 10);
    });
});
