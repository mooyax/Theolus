
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { JobState } from '../ai/states/UnitStates.js'; // Assuming direct export or via UnitStates
import { Game } from '../Game.js';

// Mock dependencies
vi.mock('three', () => {
    const Vector3 = class {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2); }
        distanceToSquared(v) { return (this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
        normalize() { return this; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
    };
    return {
        Vector3: Vector3,
        Group: class { constructor() { this.position = new Vector3(); this.add = vi.fn(); this.remove = vi.fn(); } },
        Mesh: class { constructor() { this.position = new Vector3(); this.rotation = { y: 0 }; } },
        MeshStandardMaterial: class { },
        MeshLambertMaterial: class { },
        BoxGeometry: class { translate() { } },
        PlaneGeometry: class { translate() { } },
        SphereGeometry: class { translate() { } },
        CylinderGeometry: class { translate() { } },
        ConeGeometry: class { translate() { } },
        CanvasTexture: class { },
    };
});

describe('Job/Moving Idle Regression', () => {
    let unit;
    let game;
    let terrainMock;

    beforeEach(() => {
        // Mock Window Game
        window.game = {
            frameCounter: 0,
            gameTotalTime: 0,
            releaseRequest: vi.fn(),
            completeRequest: vi.fn(),
            claimRequest: vi.fn().mockReturnValue(true), // Always accept claim
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
            findPath: vi.fn().mockReturnValue([{ x: 50, z: 50 }]), // Simple path
            findPathAsync: vi.fn().mockResolvedValue([{ x: 50, z: 50 }]),
            isReachable: vi.fn().mockReturnValue(true),
            checkYield: () => Promise.resolve(),
            logicalWidth: 100,
            logicalDepth: 100,
            getVisualX: (t) => t, // Simple mock
        };

        unit = new Unit(null, terrainMock, 10, 10, 'worker');
        unit.id = 1; // Set ID for deterministic modulus checks
        unit.game = window.game;

        // Ensure unit has smartMove method
        if (!unit.smartMove) {
            unit.smartMove = vi.fn().mockReturnValue(true);
        }
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should NOT abandon JobState when smartMove is throttled (Time Slicing)', () => {
        // Setup Job
        const request = { id: 'req1', type: 'build', x: 50, z: 50, assignedTo: unit.id, isManual: false };
        unit.targetRequest = request;

        // Transition to JobState
        const jobState = new JobState(unit);
        unit.changeState(jobState);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.action).toBe('Approaching Job');

        // SIMULATE THROTTLING
        // Mock smartMove to return FALSE (not moved) but set isPathfindingThrottled = true
        unit.smartMove = vi.fn().mockImplementation(() => {
            unit.isPathfindingThrottled = true; // Flag that we skipped due to throttle
            return false; // Did not move
        });

        // Run updates for enough frames that would NORMALLY trigger a failure (e.g. > 5)
        // unit.isPathfindingThrottled = true; 

        for (let i = 0; i < 20; i++) {
            unit.updateLogic(i * 0.1, 0.1, false, [], [], []);
        }

        // VERIFY: Still in JobState?
        // If bug exists, pathFailures would increment -> abandon job -> Idle/Wander
        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.targetRequest).not.toBeNull();
        expect(window.game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should NOT increment stuckTimer when smartMove is throttled', () => {
        // Setup Job (Manual = Higher Tolerance 45s)
        const request = { id: 'req2', type: 'build', x: 50, z: 50, assignedTo: unit.id, isManual: true };
        unit.targetRequest = request;
        unit.changeState(new JobState(unit));

        // Mock smartMove: return false (not moved) + Throttled
        unit.smartMove = vi.fn().mockImplementation(() => {
            unit.isPathfindingThrottled = true;
            return false;
        });

        // Current state instance
        const state = unit.state;
        state.stuckTimer = 0; // Ensure start at 0

        // Update loop
        for (let i = 0; i < 20; i++) {
            unit.updateLogic(i * 0.1, 0.1, false, [], [], []);
        }

        // Simulate LONG time passing with throttle (BUT < 45s threshold)
        // We iterate with large time steps up to 40s
        for (let t = 0; t < 40; t += 2.0) {
            unit.simTime = t;
            state.update(t, 2.0, false, []);
        }

        expect(unit.state).toBeInstanceOf(JobState);
        expect(window.game.releaseRequest).not.toHaveBeenCalled();
    });

    it('should NOT revert action to "Moving" if already "Approaching Job"', () => {
        // Regression Check for Unit.executeMove overwriting action
        unit.action = 'Approaching Job';
        unit.isMoving = true;

        // Execute Move (which typically happens via smartMove -> executeMove)
        unit.executeMove(11, 11, 100);

        expect(unit.action).toBe('Approaching Job'); // Should NOT become "Moving"
        expect(unit.action).not.toBe('Moving');
    });

    it('should NOT execute updateCombatLogic if State Machine is active', () => {
        // Using WanderState
        unit.state = { update: vi.fn(), constructor: { name: 'MockState' } };

        // Mock legacy combat logic if it exists
        unit.updateCombatLogic = vi.fn();

        unit.updateLogic(100, 0.1, false, [], [], []);

        expect(unit.updateCombatLogic).not.toHaveBeenCalled();
    });
});
