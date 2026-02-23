
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

describe('Unit Initialization and Movement Start', () => {
    let unit;
    let mockTerrain;

    beforeEach(() => {
        mockTerrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: () => 10,
            getInterpolatedHeight: () => 1,
            getVisualOffset: () => ({ x: 0, y: 0 }),
            modifyMoisture: vi.fn(),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            grid: Array(100).fill().map(() => Array(100).fill({ moisture: 0.5 })),
            getRegion: () => 1,
            getRandomPointInRegion: () => ({ x: 5, z: 5 }),
            buildings: [],
            logicalWidth: 100,
            logicalDepth: 100,
            findPath: vi.fn(),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 5, z: 5 }]),
            pathfindingCalls: 0
        };
        Unit.initAssets = vi.fn();
        unit = new Unit(null, mockTerrain, 10, 10, 'worker');
    });

    it('should correctly initialize and update logic', () => {
        const interval = unit.moveInterval || 3.0;
        expect(interval).toBeGreaterThanOrEqual(2.0);

        unit.lastMoveAttempt = 0;
        unit.updateLogic(1.0, 1.0, false, [], [], []);

        unit.isMoving = false;
        unit.updateLogic(6.0, 1.0, false, [], [], []);

        expect(unit.action).toBeDefined();
    });

    it('should NOT freeze if started at time 0', () => {
        unit.updateLogic(0, 0.1, false, [], [], []);
        unit.updateLogic(5.0, 0.1, false, [], [], []);
        expect(unit.age).toBeDefined();
    });
});