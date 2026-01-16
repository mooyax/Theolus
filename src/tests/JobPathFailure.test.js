import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { JobState } from '../ai/states/UnitStates.js';
import { Minimap } from '../Minimap.js';
import { Compass } from '../Compass.js';

vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('canvas'); }
            setSize() { } render() { } dispose() { } setPixelRatio() { }
            shadowMap = { enabled: false, type: 0 };
        },
    };
});
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } drawRaidPing() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

// Mock Game.prototype.animate to prevent infinite loop
vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });

describe('Job Pathfinding Failure Handling', () => {
    let mockGame;
    let unit;
    let job;

    beforeEach(() => {
        const mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
        const mockTerrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: vi.fn().mockReturnValue(10),
            logicalWidth: 100, logicalDepth: 100,
            grid: Array(100).fill(0).map(() => Array(100).fill(0).map(() => ({ regionId: 1, hasBuilding: false }))),
            buildings: [],
            addBuilding: vi.fn().mockImplementation((type, x, z) => {
                const b = { userData: { type, gridX: x, gridZ: z, population: 0 } };
                mockTerrain.buildings.push(b);
                return b;
            }),
            removeBuilding: vi.fn(),
            isReachable: vi.fn().mockReturnValue(true),
            findPath: vi.fn().mockImplementation(() => [{ x: 20, z: 0 }]), // Fix: Return fresh array each call to avoid mutation issues
            findPathAsync: vi.fn().mockImplementation(() => Promise.resolve([{ x: 20, z: 0 }])),
            findClosestReachablePoint: vi.fn().mockReturnValue(null),
            getRegion: vi.fn().mockReturnValue(1),
            getRandomPassablePointInRegion: vi.fn().mockReturnValue({ x: 5, z: 5 }),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 5, z: 5 }),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 5, z: 5 }),
            clippingPlanes: [],
            pathfindingCalls: 0, // Reset budget so failures are counted (not throttled)
        };

        unit = new Unit(mockScene, mockTerrain, 0, 0, 'worker');
        unit.id = 1;

        unit.id = 1;
        job = { id: 101, x: 20, z: 0, type: 'build', status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = job;
        mockGame = new Game(mockScene, mockTerrain);
        mockGame.units = [unit];
        window.game = mockGame; // Global access for releaseRequest
    });

    afterEach(() => {
        window.game = null;
        vi.restoreAllMocks();
        vi.clearAllMocks();
    });

    it('should abandon job if smartMove fails repeatedly', async () => {
        // Mock Unit prototype canMoveTo to FORCE FAIL (simulate blockage)
        // Must be before changeState because enter() calls update -> smartMove!
        vi.spyOn(Unit.prototype, 'canMoveTo').mockReturnValue(false);
        console.log('[Test Debug] unit.canMoveTo is:', unit.canMoveTo);

        unit.changeState(new JobState(unit));

        // 1. Update - First Attempt
        try {
            unit.updateLogic(1000, 0.1);
        } catch (e) {
            console.error("UpdateLogic Error:", e);
        }

        expect(unit.action).toBe("Approaching Job");
        expect(unit.isMoving).toBe(false);
        expect(unit.isMoving).toBe(false);

        // Expectation: JobState detected failure?
        // Current Code: Checks isReachable. Mock says True. So it does nothing.
        // It waits 3s (next retry).

        // 2. Simulate 5 seconds passing (Retrying...)
        unit.updateLogic(4000, 0.1); // Time skip

        // Still stuck?
        expect(unit.targetRequest).toBe(job); // Should trigger retry

        // 3. Simulate MANY failures (e.g. 180s of simulation time, but focus on frame count)
        // Loop to exceed failure threshold (50)
        for (let i = 0; i < 60; i++) {
            unit.updateLogic(4000 + i * 3000, 0.1);
        }

        // EXPECTATION: Should detect failure and release job
        expect(unit.targetRequest).toBeNull();
        console.log("Success: Job released after repeated failures.");
    });
});
