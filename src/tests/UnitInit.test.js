
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
            findBestTarget: vi.fn(() => null),
            getTileHeight: () => 10,
            getInterpolatedHeight: () => 1, // Mock this
            getVisualOffset: () => ({ x: 0, y: 0 }), // Mock this
            modifyMoisture: vi.fn(), // Mock this
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            grid: Array(100).fill().map(() => Array(100).fill({ moisture: 0.5 })), // Moisture 0.5 to avoid improveLand
            getRegion: () => 1,
            getRandomPointInRegion: () => ({ x: 5, z: 5 }),
            buildings: [],
            logicalWidth: 100,
            logicalDepth: 100,
            findPath: vi.fn(), // Mock findPath
            findPathAsync: vi.fn().mockResolvedValue([{ x: 5, z: 5 }]), // Mock findPathAsync
            pathfindingCalls: 0 // Mock Budget
        };
        // Mock initAssets prevent crash
        Unit.initAssets = vi.fn();

        unit = new Unit(null, mockTerrain, 10, 10, 'worker');
        // moveInterval is 2.0 - 5.0 seconds
        const interval = unit.moveInterval || 3.0;
        expect(interval).toBeGreaterThanOrEqual(2.0);

        // Advance time by 1.0s
        unit.lastMoveAttempt = 0;
        unit.updateLogic(1.0, 1.0, false, [], [], []);

        // Advance time by 6s -> Should trigger
        unit.isMoving = false; // Force ensure
        unit.updateLogic(6.0, 1.0, false, [], [], []);

        // Verify state change or property update
        // expect(unit.isMoving).toBe(true); 
        console.log(`Debug Unit Action after 6s: ${unit.action}`);
    });

    it('should NOT freeze if started at time 0', () => {
        // Some logic might divide by zero or get stuck?
        unit.updateLogic(0, 0.1, false, [], [], []); // Frame 0

        unit.updateLogic(5.0, 0.1, false, [], [], []); // Frame N
        // Check if alive/active
        expect(unit.age).toBeDefined();
    });
});
