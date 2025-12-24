
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';

// Mock Globals
global.window = {
    game: {
        gameTotalTime: 0
    }
};

global.THREE = THREE;

import { Unit } from '../Unit.js';

describe('Unit Distance Wrap Logic', () => {
    let unit;
    let mockTerrain;
    let mockScene;

    beforeEach(() => {
        // Mock Terrain (Width 80, Depth 80)
        mockTerrain = {
            logicalWidth: 80,
            logicalDepth: 80,
            getTileHeight: vi.fn().mockReturnValue(1),
            grid: Array(80).fill(0).map(() => Array(80).fill({ height: 1 })),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn()
        };

        mockScene = { add: vi.fn(), remove: vi.fn() };
        Unit.initAssets = vi.fn();

        unit = new Unit(mockScene, mockTerrain, 0, 0); // At 0,0
    });

    it('should calculate short distance across wrap (0,0 -> 79,0)', () => {
        // Distance should be 1, not 79
        unit.gridX = 0;
        unit.gridZ = 0;

        // This relies on getDistance logic
        // We need to inspect getDistance implementation. 
        // Based on previous reads, getDistance DOES NOT wrap? 
        // Wait, line 2470 in previous view showed simple dx*dx + dz*dz.
        // Let's verify behavior.

        const dist = unit.getDistance(79, 0);

        // If logic is naive: 79.
        // If logic is wrapped: 1.
        // User concern is valid if logic is naive.

        // We expect it to be 1 for correct logic.
        expect(dist).toBe(1);
    });

    it('should calculate diagonal wrap correctly (0,0 -> 79,79)', () => {
        unit.gridX = 0;
        unit.gridZ = 0;
        const dist = unit.getDistance(79, 79);
        // sqrt(1*1 + 1*1) = 1.414
        expect(dist).toBeCloseTo(1.414, 2);
    });
});
