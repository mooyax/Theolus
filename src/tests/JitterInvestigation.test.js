import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';
import { Wander, Job } from '../ai/states/UnitStates.js';

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
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
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
        

        unit = new Unit(scene, terrain, 10, 10, 'worker');
        unit.game = game;
    });

    it('should monitor limb state between tile arrivals', async () => {
        const req = { type: 'raise', x: 10, z: 20, id: 'req1', assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = req;
        unit.state = new Job(unit);

        terrain.findPath = vi.fn().mockReturnValue([{ x: 10, z: 11 }, { x: 10, z: 12 }, { x: 10, z: 20 }]);
        terrain.findPathAsync = vi.fn().mockResolvedValue([{ x: 10, z: 11 }, { x: 10, z: 12 }, { x: 10, z: 20 }]);

        unit.state.enter();

        await new Promise(r => setTimeout(r, 20));
        unit.state.update(0, 0.016);

        expect(unit.isMoving).toBe(true);
        expect([11, 20]).toContain(unit.targetGridZ);

        const duration = unit.moveDuration;

        unit.updateMovement(duration * 0.99);
        const limbXBefore = unit.limbs.leftArm.x;
        expect(limbXBefore).not.toBe(0);

        unit.updateMovement(duration);
        expect(unit.isMoving).toBe(true);
        expect(Math.abs(unit.limbs.leftArm.x)).toBeLessThan(0.2);

        unit.updateLogic(duration, 0.01);
        expect(unit.isMoving).toBe(true);
        expect(unit.targetGridZ).toBe(12);

        expect(Math.abs(unit.limbs.leftArm.x)).toBeLessThan(0.2);
    });

    it('should check if executeMove mid-move resets speed significantly', () => {
        unit.executeMove(11, 10, 1000);
        const originalDuration = unit.moveDuration;

        unit.updateMovement(1000 + (originalDuration / 2));
        unit.executeMove(11, 10, 1000 + (originalDuration / 2));

        expect(unit.moveDuration).toBeCloseTo(originalDuration / 2, 0.05);
        console.log(`[Test] Fixed Mid-move duration: ${unit.moveDuration.toFixed(3)} (Original: ${originalDuration.toFixed(3)})`);
    });
});
