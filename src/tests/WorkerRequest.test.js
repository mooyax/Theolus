
// @vitest-environment happy-dom
import { Unit } from '../Unit.js';
import * as THREE from 'three';
import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock dependencies for Unit.js
vi.mock('three', async () => {
    const originalModule = await vi.importActual('three');
    return {
        ...originalModule,
        // Keep Vector3 and basic math for logic
    };
});

describe('Worker Job Logic (Unit.js)', () => {
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
            unregisterEntity: vi.fn(),
            findBestTarget: vi.fn(),
            getBuildingSize: vi.fn().mockReturnValue(1)
        };
        // Setup grid
        for (let x = 0; x < 40; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                mockTerrain.grid[x][z] = { height: 0, hasBuilding: false };
            }
        }

        // Mock Game Object (Simulating Game.js Request System)
        mockGame = {
            requestQueue: [],
            requestIdCounter: 0,
            addRequest: function (type, x, z) {
                const req = { id: `req_${this.requestIdCounter++}`, type, x, z, status: 'pending' };
                this.requestQueue.push(req);
                return req;
            },
            findBestRequest: function (unit) {
                // Simple First-Come-First-Serve for test
                return this.requestQueue.find(r => r.status === 'pending');
            },
            claimRequest: function (unit, req) {
                if (req.status !== 'pending') return false;
                req.status = 'assigned';
                req.assignedTo = unit.id;
                return true;
            },
            completeRequest: vi.fn(function (unit, req) {
                // Execute mock terrain
                if (req.type === 'raise') mockTerrain.raise(req.x, req.z);
                // Remove
                const idx = this.requestQueue.indexOf(req);
                if (idx !== -1) this.requestQueue.splice(idx, 1);
            }),
            units: [],
            scene: { add: vi.fn(), remove: vi.fn() },
            terrain: mockTerrain,
            raidPoints: [] // Needed for Unit logic
        };

        // Create Unit
        // Unit constructor needs real Scene/Terrain? We gave mockTerrain. Scene mock is basic.
        unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'worker');
        unit.id = 'worker_1';
        unit.game = mockGame;

        // GLOBAL MOUNT
        window.game = mockGame;
    });

    test('Unit finds and claims request when idle', () => {
        const req = mockGame.addRequest('raise', 5, 5);

        // Mock random
        vi.spyOn(Math, 'random').mockReturnValue(0.05);

        // Tick Logic
        unit.updateLogic(100, 0.016, false, [], [], []);

        expect(unit.targetRequest).toBe(req);
        expect(req.status).toBe('assigned');
        expect(req.assignedTo).toBe(unit.id);
    });

    test('Unit moves to target request', () => {
        const req = mockGame.addRequest('raise', 10, 10);

        // Setup Unit State
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;
        unit.gridX = 0; unit.gridZ = 0; // Far away

        // Spy on Move
        unit.triggerMove = vi.fn();

        // Tick (Time must be > 1000 to bypass throttle)
        unit.updateLogic(2000, 0.016, false, [], [], []);

        // Logic sets action='Working' initially, then tries triggerMove. 
        // If triggerMove succeeds (sets isMoving), action becomes 'Approaching Job'.
        // Since triggerMove is MOCKED and doesn't set isMoving, action stays 'Working'.
        expect(unit.action).toBe('Working');
        expect(unit.triggerMove).toHaveBeenCalledWith(10, 10, 2000);
    });

    test('Unit completes request upon arrival', () => {
        const req = mockGame.addRequest('raise', 10, 10);
        unit.targetRequest = req;
        req.status = 'assigned';

        // Place Unit AT location
        unit.gridX = 10;
        unit.gridZ = 10;

        // Spy on Game.completeRequest
        const spyComplete = vi.spyOn(mockGame, 'completeRequest');

        // Tick (Time irrelevant for completion check, but consistent)
        unit.updateLogic(2000, 0.016, false, [], [], []);

        expect(spyComplete).toHaveBeenCalledWith(unit, req);
        expect(unit.targetRequest).toBeNull();
        expect(unit.action).toBe('Idle');
        expect(mockTerrain.raise).toHaveBeenCalledWith(10, 10);
    });
});
