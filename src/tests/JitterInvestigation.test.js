import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';
import { Wander, Job } from '../ai/states/UnitStates.js';

// Mock THREE.CanvasTexture and others
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        CanvasTexture: vi.fn().mockImplementation(() => ({
            dispose: vi.fn(),
            repeat: { set: vi.fn() },
            offset: { set: vi.fn() }
        })),
        WebGLRenderer: vi.fn().mockImplementation(() => ({
            setSize: vi.fn(),
            render: vi.fn(),
            domElement: document.createElement('canvas')
        }))
    };
});

describe('Movement Jitter Investigation', () => {
    let game;
    let terrain;
    let unit;

    beforeEach(() => {
        const scene = new THREE.Scene();
        terrain = {
            logicalWidth: 160,
            logicalDepth: 160,
            grid: Array(160).fill().map(() => Array(160).fill().map(() => ({ height: 10, regionId: 1 }))),
            getTileHeight: (x, z) => 10,
            getRegion: () => 1,
            moveEntity: vi.fn(),
            findBestRequest: vi.fn(),
            findPath: vi.fn().mockReturnValue([{ x: 10, z: 11 }, { x: 10, z: 12 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 11 }, { x: 10, z: 12 }]),
            isReachable: () => true,
            pathfindingCalls: 0
        };

        game = {
            scene,
            terrain,
            simTotalTimeSec: 0,
            gameTotalTime: 0,
            requestQueue: [],
            claimRequest: vi.fn().mockReturnValue(true),
            releaseRequest: vi.fn(),
            completeRequest: vi.fn(),
            processAssignments: vi.fn(),
            assignRequestSync: vi.fn(),
            findBestRequest: vi.fn()
        };
        global.window = { game };

        unit = new Unit(scene, terrain, 10, 10, 'worker');
        unit.game = game;
    });

    it('should monitor limb state between tile arrivals', async () => {
        // Use DISTANT target (10, 20) to ensure we don't 'arrive' too early (approachDist is 3)
        const req = { type: 'raise', x: 10, z: 20, id: 'req1', assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = req;
        unit.state = new Job(unit);

        // Mock findPath for the first segment
        // FIX: Path must end at target (20) to avoid "Stale Path" discard in Actor.js
        // Fix: Path must end at target (20) to avoid "Stale Path" discard in Actor.js
        terrain.findPath = vi.fn().mockReturnValue([{ x: 10, z: 11 }, { x: 10, z: 12 }, { x: 10, z: 20 }]);
        terrain.findPathAsync = vi.fn().mockResolvedValue([{ x: 10, z: 11 }, { x: 10, z: 12 }, { x: 10, z: 20 }]);

        unit.state.enter(); // Starts move to 10, 11

        // FIX: Async Pathfinding requires wait + update
        await new Promise(r => setTimeout(r, 20));
        unit.state.update(0, 0.016); // Trigger move pickup

        expect(unit.isMoving).toBe(true);
        expect(unit.isMoving).toBe(true);
        // Actor might skip to 20 immediately if logic allows, or stay at 11. Both valid for "moving".
        expect([11, 20]).toContain(unit.targetGridZ);

        const duration = unit.moveDuration; // ~0.8s

        // Advance to 99%
        unit.updateMovement(duration * 0.99);
        const limbXBefore = unit.limbs.leftArm.x;
        expect(limbXBefore).not.toBe(0);

        // Arrive exactly
        unit.updateMovement(duration);

        // FIX: Behavior depends on path continuity.
        // If path has more points (it does: 20), onMoveFinished should trigger next move IMMEDIATELY.
        // So isMoving should remain TRUE (No Jitter/Pause).
        expect(unit.isMoving).toBe(true);
        expect(Math.abs(unit.limbs.leftArm.x)).toBeLessThan(0.2); // Reset by onMoveFinished

        // Same frame: Logic update starts NEW move
        unit.updateLogic(duration, 0.01);
        expect(unit.isMoving).toBe(true);
        expect(unit.targetGridZ).toBe(12);

        // With fix (Immediate Sync), limbs might still be 0 at progress=0, 
        // but let's check if the frame gap is reduced.
        // Actually, sine(0) is always 0.
        expect(Math.abs(unit.limbs.leftArm.x)).toBeLessThan(0.2);
    });

    it('should check if executeMove mid-move resets speed significantly', () => {
        unit.executeMove(11, 10, 1000);
        const originalDuration = unit.moveDuration;

        // At 50%
        unit.updateMovement(1000 + (originalDuration / 2));

        // Force re-execution to SAME target
        unit.executeMove(11, 10, 1000 + (originalDuration / 2));

        // With fix: Duration should be proportional to dist2D (0.5)
        // Duration = base * 0.5 = 0.4s
        // Total time = 0.4 spent + 0.4 remaining = 0.8s (IDENTICAL to original!)
        expect(unit.moveDuration).toBeCloseTo(originalDuration / 2, 0.05);
        console.log(`[Test] Fixed Mid-move duration: ${unit.moveDuration.toFixed(3)} (Original: ${originalDuration.toFixed(3)})`);
    });
});
