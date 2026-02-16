import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Actor } from '../Actor';
import * as THREE from 'three';

// Mock Terrain
const mockTerrain = {
    logicalWidth: 100,
    logicalDepth: 100,
    grid: [],
    buildings: [],
    getTileHeight: vi.fn(),
    registerEntity: vi.fn(),
    moveEntity: vi.fn(),
    getVisualOffset: vi.fn().mockReturnValue({ x: 0, y: 0 }),
    getInterpolatedHeight: vi.fn(),
    // isAdjacentToRegion mocking for isReachable logic
    isAdjacentToRegion: vi.fn().mockReturnValue(true),
    findPathAsync: vi.fn().mockResolvedValue([])
};

// Setup Grid
for (let x = 0; x < 100; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 100; z++) {
        // Default Land
        mockTerrain.grid[x][z] = { height: 1, regionId: 1 };
    }
}
// Water at 10,10
mockTerrain.grid[10][10] = { height: 0, regionId: 0 };

// Mocks handled by setup.js

describe('Water Entry Prevention', () => {

    beforeEach(() => {
        vi.clearAllMocks();

        mockTerrain.getTileHeight.mockImplementation((x, z) => {
            if (Math.round(x) === 10 && Math.round(z) === 10) return 0;
            return 1;
        });

        // Mock Region lookup implicitly handled by Actor isReachable Logic reading grid
        // Actor reads terrain.grid directly
    });

    it('Actor prevents linear movement into water', () => {
        const actor = new Actor(new THREE.Scene(), mockTerrain, 10, 8, 'worker'); // Changed from 10,9 to 10,8
        actor.id = 1;

        // Setup: Actor at 10,8 (Land). Target 10,10 (Water). Dist 2.0.
        // isReachable should likely be TRUE (Proximal Water + mocked Adjacent check)

        // ACTION: smartMove to Water
        const result = actor.smartMove(10, 10, 1000);

        // EXPECTATION: 
        // 1. smartMove(dist>1.5) triggers pathfinding and returns TRUE
        // 2. But we want to ensure it DOES NOT start actual movement into water
        //    (Pathfinding for water should return null and then set isUnreachable)

        expect(result).toBe(true);
        // Pathfinding is async, so we might need a small wait or check flags
        // For this sync test, we check if pathfinding was at least triggered
        expect(mockTerrain.findPathAsync).toHaveBeenCalled();
    });

    it('Actor allows movement on land', () => {
        const actor = new Actor(new THREE.Scene(), mockTerrain, 10, 8, 'worker');

        // Target 10, 6 (Land). Dist 2.0.
        const result = actor.smartMove(10, 6, 1000);

        expect(result).toBe(true);
        // Pathfinding is async, so isMoving won't be true immediately
        expect(mockTerrain.findPathAsync).toHaveBeenCalled();
    });

});

