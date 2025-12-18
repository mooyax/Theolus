
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Unit Initialization and Movement Start', () => {
    let unit;
    let mockTerrain;

    beforeEach(() => {
        mockTerrain = {
            getTileHeight: () => 1,
            getInterpolatedHeight: () => 1, // Mock this
            getVisualOffset: () => ({ x: 0, y: 0 }), // Mock this
            modifyMoisture: vi.fn(), // Mock this
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            grid: Array(100).fill().map(() => Array(100).fill({ moisture: 0.5 })), // Moisture 0.5 to avoid improveLand
            buildings: [],
            logicalWidth: 100,
            logicalDepth: 100
        };
        // Mock initAssets prevent crash
        Unit.initAssets = vi.fn();

        unit = new Unit(null, mockTerrain, 10, 10, 'worker');

        // Mock methods to detect calls
        unit.moveRandomly = vi.fn();
        unit.triggerMove = vi.fn();
    });

    it('should wait for moveInterval before first move', () => {
        // Initial state
        expect(unit.lastTime).toBe(0);
        // moveInterval is 2000-5000
        const interval = unit.moveInterval;
        expect(interval).toBeGreaterThanOrEqual(2000);

        // Advance time by 1s (1000ms)
        unit.updateLogic(1000, 1.0, false, [], [], []);
        expect(unit.moveRandomly).not.toHaveBeenCalled();

        // Advance time by 6s (6000ms) -> Should trigger
        console.log(`Debug Unit: Interval = ${unit.moveInterval}, LastTime = ${unit.lastTime}, Role = ${unit.role} `);
        unit.isMoving = false; // Force ensure
        unit.updateLogic(6000, 1.0, false, [], [], []);
        console.log(`Debug Unit: MoveRandomly Called ? ${unit.moveRandomly.mock.calls.length} `);

        // Should have called moveRandomly
        expect(unit.moveRandomly).toHaveBeenCalled();
        // lastTime should be updated
        expect(unit.lastTime).toBe(6000);
    });

    it('should NOT freeze if started at time 0', () => {
        // Some logic might divide by zero or get stuck?
        unit.updateLogic(0, 0.1, false, [], [], []); // Frame 0
        expect(unit.moveRandomly).not.toHaveBeenCalled();

        unit.updateLogic(5000, 0.1, false, [], [], []); // Frame N
        expect(unit.moveRandomly).toHaveBeenCalled();
    });
});
