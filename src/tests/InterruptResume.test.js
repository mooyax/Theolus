
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Job, Wander } from '../ai/states/UnitStates.js';
import { setupTestEnv } from './TestUtils';

// Note: setup.js handles global mocks (THREE, etc.)

describe('Unit Interrupt and Resume', () => {
    let game, terrain, unit;

    beforeEach(() => {
        // Use TestUtils to setup environment with MockTerrain
        const env = setupTestEnv({ useMockTerrain: true });
        game = env.game;
        terrain = env.terrain;

        // Custom Game Overrides for this specific test
        game.simSpeed = 1.0;
        game.gameTotalTime = 100000;
        game.battleMemory = {
            reportRaid: () => { },
            getPriorities: () => [],
            getReports: () => []
        };
        // Mock specific game methods if needed (though MockGame provides defaults)
        game.completeRequest = vi.fn();
        game.releaseRequest = vi.fn();
        game.findBestRequest = vi.fn().mockReturnValue(null);
        game.claimRequest = vi.fn().mockReturnValue(true);
        game.isNight = false;

        // Ensure Terrain has specific mocks if needed
        terrain.findPath = vi.fn((x1, z1, x2, z2) => [{ x: x1, z: z1 }, { x: x2, z: z2 }]);
        terrain.findPathAsync = vi.fn((x1, z1, x2, z2) => Promise.resolve([{ x: x1, z: z1 }, { x: x2, z: z2 }]));

        // Create Unit
        unit = new Unit(game.scene, terrain, 10, 10, 'worker');
        unit.id = 1;
        unit.game = game;
        game.units = [unit];
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return to previous movement target after finishing a job', async () => {
        // 1. Initial Move (Long distance)
        const initialTargetX = 80;
        const initialTargetZ = 80;

        unit.gridX = 0;
        unit.gridZ = 0;
        unit.smartMove(initialTargetX, initialTargetZ, game.simTotalTimeSec);

        // Wait for async pathfinding (Microtasks need to flush)
        await new Promise(resolve => setTimeout(resolve, 10));

        expect(unit.targetGridX).toBe(initialTargetX);
        expect(unit.targetGridZ).toBe(initialTargetZ);

        // Enter Wander State
        unit.changeState(new Wander(unit));

        // 2. Interrupt with Job (Distant Job)
        const jobRequest = { type: 'build', gridX: 30, gridZ: 30, id: 'job_1', assignedTo: unit.id, x: 30, z: 30 };

        const jobState = new Job(unit);
        unit.targetRequest = jobRequest;

        // Critical: Set isMoving = true so Job captures the context!
        unit.isMoving = true;

        unit.changeState(jobState);

        // Verify Resume Saved (Job saves the previous state object as resumeState)
        expect(jobState.resumeState).toBeDefined();
        expect(jobState.resumeState.resumeContext).toBeDefined();
        expect(jobState.resumeState.resumeContext.target.x).toBe(80);

        // 3. Move Unit to Job Location manually
        unit.gridX = 30;
        unit.gridZ = 30;

        // 4. Update Job to Finish
        game.simTotalTimeSec = 200;
        jobRequest.status = 'completed'; // Trigger exitJob
        jobState.update(200, 1.0, false, []);

        // 5. Verify Resumption
        expect(unit.targetGridX).toBe(initialTargetX);
        expect(unit.targetGridZ).toBe(initialTargetZ);
        expect(unit.state).toBeInstanceOf(Wander);
    });

    it('should resume MIGRATION after Combat interruption', () => {
        // 1. Setup Migration State
        unit.action = 'Migrating';
        unit.migrationTarget = { x: 90, z: 90 };
        unit.targetGridX = 90;
        unit.targetGridZ = 90;
        unit.isMoving = true;

        // 2. Interrupt with Combat
        // Wander state saves context on enter
        unit.changeState(new Wander(unit));
        expect(unit.state.resumeContext).toBeDefined();
        expect(unit.state.resumeContext.action).toBe('Migrating');
        expect(unit.state.resumeContext.target).toEqual({ x: 90, z: 90 });

        // 3. Finish State (Resume)
        // Check Wander state context
        expect(unit.state).toBeInstanceOf(Wander);
        expect(unit.state.resumeContext.action).toBe('Migrating');

        // 4. Verify Resume
        expect(unit.action).toBe('Migrating');
        expect(unit.targetGridX).toBe(90);
        expect(unit.targetGridZ).toBe(90);
    });
});
