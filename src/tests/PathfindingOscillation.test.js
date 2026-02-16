
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { Job } from '../ai/states/UnitStates';
import * as THREE from 'three';

describe('Pathfinding Oscillation Debug', () => {
    let mockScene, mockTerrain, mockGame, unit;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: vi.fn(() => 1),
            grid: Array(100).fill(null).map(() => Array(100).fill({ regionId: 1 })),
            registerEntity: vi.fn(),
            pathfindingCalls: 0,
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 10 }]), // Returns integer path
            isReachable: () => true
        };
        mockGame = {
            requestQueue: [],
            consumeMana: vi.fn(),
            reportGlobalBattle: vi.fn(),
            completeRequest: vi.fn(), // Added mock
            gameActive: true
        };
        global.window = { game: mockGame };

        unit = new Unit(mockScene, mockTerrain, 0, 0);
        unit.id = 1;
        unit.game = mockGame;
        unit.role = 'worker';
        unit.smartMove = vi.spyOn(unit, 'smartMove'); // Spy on real method
    });

    it('should NOT re-call pathfinding if target differs slightly from path end', async () => {
        // Setup Request at float likely from Mouse Click
        const request = {
            id: 999,
            x: 10.5,
            z: 10.5,
            status: 'assigned',
            assignedTo: 1
        };
        unit.targetRequest = request;

        // Setup existing path ending at integer
        unit.path = [{ x: 10, z: 10 }];
        unit.gridX = 5;
        unit.gridZ = 5;
        unit.isMoving = true;

        const state = new Job(unit);
        unit.state = state;

        // Run Update
        state.update(100, 0.1, false, []);

        // CHECK: Did we trigger smartMove?
        // Logic: Job.update calls smartMove every 1.0s. This is correct.
        // The important check is that it does NOT trigger pathfinding.
        expect(unit.smartMove).toHaveBeenCalled();

        // -------------------------------------------------------------
        // SCENARIO 2: Approaching but Path Invalidated or Check Triggered?
        // Unit at 8, 8. Path exists to 10, 10.
        // Req at 10.5, 10.5.
        // Dist to Req: 3.5 (> 2.1). Not Arrived.
        // targetMoved: |10.5 - 10| = 0.5 > 0.1. TRUE.

        unit.gridX = 8;
        unit.gridZ = 8;
        unit.path = [{ x: 10, z: 10 }];
        unit.isMoving = true;

        // Reset spies
        unit.smartMove.mockClear();
        mockTerrain.findPathAsync.mockClear();

        // Update
        state.update(101, 0.1, false, []);

        // targetMoved: |10.5 - 10| = 0.5 < 2.1 -> FALSE
        // smartMove should NOT be called
        expect(unit.smartMove).not.toHaveBeenCalled();

        // Inside smartMove:
        // Path distance logic:
        // Dist(Target=10.5,10.5, LastNode=10,10) = 0.707
        // Trigger: if dist > 2.0 -> path = null.
        // 0.707 < 2.0 -> Path KEPT.

        // So pathfinding should NOT be called if logic is working as I hoped...
        // BUT my HYPOTHESIS is that it IS being called or smartMove is called repeatedly 
        // leading to performance issues.

        // If smartMove is called every frame, even if it doesn't re-path, it might be heavy?
        // User says "search path multiple times".

        // Verify findPathAsync
        expect(mockTerrain.findPathAsync).not.toHaveBeenCalled();

        // Wait, if I want to REPRODUCE bug, I need to know why user sees pathfinding.
        // Maybe smartMove logic DOES invalidate the path?

        // If I change expectation to EXPECT CALL, and it fails, then logic is robust?
        // I will stick to "expect(mockTerrain.findPathAsync).not.toHaveBeenCalled()" 
        // effectively asserting that "It should be fine".
        // If this PASSES, then I failed to reproduce the bug.
    });
});

