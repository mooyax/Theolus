
import { describe, it, expect, vi } from 'vitest';
import { Game } from '../Game.js';
import { Terrain } from '../Terrain.js';
import { JobState } from '../ai/states/UnitStates.js';

describe('Manual Job Retry and Water Reachability Logic Test', () => {

    describe('Terrain.isReachable Logic', () => {
        it('should return true for water adjacent to same region land', () => {
            const mockTerrain = {
                logicalWidth: 10,
                logicalDepth: 10,
                grid: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ height: -1, regionId: 0 })))
            };

            // Set (0,0) as Land [Region 1]
            mockTerrain.grid[0][0].height = 2;
            mockTerrain.grid[0][0].regionId = 1;

            // (1,1) is water but adjacent (diagonally) to (0,0) [Region 1]
            const result = Terrain.prototype.isReachable.call(mockTerrain, 0, 0, 1, 1);
            expect(result).toBe(true);
        });

        it('should return false for water NOT adjacent to same region land', () => {
            const mockTerrain = {
                logicalWidth: 10,
                logicalDepth: 10,
                grid: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ({ height: -1, regionId: 0 })))
            };

            // Region 1 land far away
            mockTerrain.grid[0][0].height = 2;
            mockTerrain.grid[0][0].regionId = 1;

            // Region 2 land
            mockTerrain.grid[5][5].height = 2;
            mockTerrain.grid[5][5].regionId = 2;

            // Regional water at (6,6) - only adjacent to Region 2
            mockTerrain.grid[6][6].height = -1;
            mockTerrain.grid[6][6].regionId = 0;

            // Result for Region 1 reaching (6,6) should be false
            const result = Terrain.prototype.isReachable.call(mockTerrain, 0, 0, 6, 6);
            expect(result).toBe(false);
        });
    });

    describe('Game.findBestRequest Logic', () => {
        it('should pick a manual job even if on water (due to improved isReachable)', () => {
            const mockGame = {
                simTotalTimeSec: 100,
                requestQueue: [],
                terrain: {
                    logicalWidth: 10,
                    logicalDepth: 10,
                    isReachable: vi.fn(() => true)
                },
                units: []
            };

            const mockUnit = {
                id: 'unit_1',
                role: 'worker',
                gridX: 0,
                gridZ: 0,
                ignoredTargets: new Map(),
                isReachable: vi.fn((tx, tz) => mockGame.terrain.isReachable(0, 0, tx, tz))
            };

            const req = {
                id: 'req_water',
                type: 'raise',
                x: 1,
                z: 1,
                status: 'pending',
                isManual: true
            };
            mockGame.requestQueue = [req];

            const result = Game.prototype.findBestRequest.call(mockGame, mockUnit);
            expect(result).toBe(req);
            expect(mockUnit.isReachable).toHaveBeenCalledWith(1, 1);
        });
    });

    describe('JobState Deferral Logic', () => {
        it('should use 3s deferTime for manual requests', () => {
            const mockActor = {
                id: 1,
                game: {
                    simTotalTimeSec: 100,
                    deferRequest: vi.fn(),
                },
                ignoredTargets: new Map(),
                changeState: vi.fn(),
                triggerMove: vi.fn(() => false),
                getDistance: vi.fn(() => 5.0),
                isUnreachable: true,
                isMoving: true,
                gridX: 0,
                gridZ: 0
            };

            const mockRequest = {
                id: 'req_manual',
                isManual: true,
                status: 'assigned',
                assignedTo: 1,
                x: 10,
                z: 10
            };

            const state = new JobState(mockActor);
            state.targetRequest = mockRequest;
            state.getResumeState = vi.fn();

            // Correct order: update(time, deltaTime)
            state.update(100, 0.1);

            expect(mockActor.game.deferRequest).toHaveBeenCalledWith(mockRequest, 3.0);
            expect(mockActor.ignoredTargets.get('req_manual')).toBe(103.0);
        });

        it('should use 15s deferTime for automatic requests', () => {
            const mockActor = {
                id: 1,
                game: {
                    simTotalTimeSec: 100,
                    deferRequest: vi.fn(),
                },
                ignoredTargets: new Map(),
                changeState: vi.fn(),
                triggerMove: vi.fn(() => false),
                getDistance: vi.fn(() => 5.0),
                isUnreachable: true,
                isMoving: true,
                gridX: 0,
                gridZ: 0
            };

            const mockRequest = {
                id: 'req_auto',
                isManual: false,
                status: 'assigned',
                assignedTo: 1,
                x: 10,
                z: 10
            };

            const state = new JobState(mockActor);
            state.targetRequest = mockRequest;
            state.getResumeState = vi.fn();

            // Correct order: update(time, deltaTime)
            state.update(100, 0.1);

            expect(mockActor.game.deferRequest).toHaveBeenCalledWith(mockRequest, 15.0);
            expect(mockActor.ignoredTargets.get('req_auto')).toBe(115.0);
        });
    });
});
