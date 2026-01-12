
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState, CombatState } from '../ai/states/UnitStates.js';
import { SleepState } from '../ai/states/UnitStates.js'; // Ensure imported if used

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = { width: 0, height: 0, getContext: () => ({ fillStyle: '', fillRect: () => { } }) }; }
            setSize() { } render() { } dispose() { } setPixelRatio() { }
            shadowMap = { enabled: false, type: 0 };
        },
    };
});

// Mock Terrain
class MockTerrain {
    constructor() {
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.grid = Array(100).fill(0).map(() => Array(100).fill(0).map(() => ({ regionId: 1 })));
    }
    getTileHeight(x, z) { return 10; } // Above 8 = Rock
    isReachable() { return true; }
    checkFlatArea() { return true; }
    addBuilding() { return { id: 'b1' }; }
    getRandomPointInRegion(regionId) { return { x: 32, z: 32 }; }
    findPath(x1, z1, x2, z2) {
        console.log(`[MockTerrain] findPath: (${x1},${z1}) -> (${x2},${z2})`);
        return [{ x: x1, z: z1 }, { x: x2, z: z2 }]; // Simple direct path
    }
    findClosestReachablePoint() { return null; }
    getRegion() { return 1; }
    getRandomPassablePointInRegion() { return { x: 5, z: 5 }; }
    registerEntity() { }
    moveEntity() { }
}

describe('Unit Interrupt and Resume', () => {
    let game, terrain, unit;

    beforeEach(() => {
        // Mock Game Object
        game = {
            scene: { add: () => { }, remove: () => { } },
            units: [],
            requests: [],
            simTotalTimeSec: 100,
            simSpeed: 1.0,
            gameTotalTime: 100000,
            terrain: null,
            battleMemory: {
                reportRaid: () => { },
                getPriorities: () => [],
                getReports: () => []
            },
            completeRequest: vi.fn(),
            releaseRequest: vi.fn(),
            findBestRequest: vi.fn().mockReturnValue(null),
            claimRequest: vi.fn().mockReturnValue(true),
            isNight: false
        };
        window.game = game;

        terrain = new MockTerrain();
        game.terrain = terrain;

        unit = new Unit(game.scene, terrain, 10, 10, 'worker');
        unit.id = 1;
        unit.game = game;
        game.units = [unit];
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return to previous movement target after finishing a job', () => {
        // 1. Initial Move (Long distance)
        const initialTargetX = 80;
        const initialTargetZ = 80;

        unit.gridX = 0;
        unit.gridZ = 0;
        unit.smartMove(initialTargetX, initialTargetZ, game.simTotalTimeSec);

        expect(unit.targetGridX).toBe(initialTargetX);
        expect(unit.targetGridZ).toBe(initialTargetZ);

        // Enter Wander State
        unit.changeState(new UnitWanderState(unit));

        // 2. Interrupt with Job (Distant Job)
        const jobRequest = { type: 'build', gridX: 30, gridZ: 30, id: 'job_1', assignedTo: unit.id, x: 30, z: 30 };

        const jobState = new JobState(unit);
        unit.targetRequest = jobRequest;

        // Critical: Set isMoving = true so JobState captures the context!
        unit.isMoving = true;

        unit.changeState(jobState);

        // Verify Resume Saved
        expect(jobState.savedResumeContext).toBeDefined();
        expect(jobState.savedResumeContext.target).toBeDefined();
        expect(jobState.savedResumeContext.target.x).toBe(80);

        // 3. Move Unit to Job Location manually
        unit.gridX = 30;
        unit.gridZ = 30;
        unit.targetGridX = 30;
        unit.targetGridZ = 30;

        // 4. Update JobState to Finish
        game.simTotalTimeSec = 200;

        jobState.update(200, 1.0, false, []);

        // 5. Verify Resumption
        console.log(`[Test] Final Target: ${unit.targetGridX},${unit.targetGridZ} State: ${unit.state.constructor.name}`);
        expect(unit.targetGridX).toBe(initialTargetX);
        expect(unit.targetGridZ).toBe(initialTargetZ);
        expect(unit.state).toBeInstanceOf(UnitWanderState);
    });

    it('should resume MIGRATION after Combat interruption', () => {
        // 1. Setup Migration State
        unit.action = 'Migrating';
        unit.migrationTarget = { x: 90, z: 90 };
        unit.targetGridX = 90;
        unit.targetGridZ = 90;
        unit.isMoving = true;

        // 2. Interrupt with Combat
        const combatState = new CombatState(unit);
        unit.changeState(combatState); // Should capture 'Migrating' and target 90,90

        // Verify Capture
        expect(combatState.savedResumeContext).toBeDefined();
        expect(combatState.savedResumeContext.action).toBe('Migrating');
        expect(combatState.savedResumeContext.target).toEqual({ x: 90, z: 90 });

        // 3. Finish State (Resume)
        // CombatState stagnation simulates end of combat
        combatState.update(300, 21.0); // Stagnation > 20s ends combat

        // 4. Verify Resume (UnitWanderState should restore Migrating)
        // Note: unit.state will be updated by changeState called inside update
        expect(unit.state).toBeInstanceOf(UnitWanderState);
        expect(unit.action).toBe('Migrating');
        expect(unit.targetGridX).toBe(90);
        expect(unit.targetGridZ).toBe(90);
    });
});
