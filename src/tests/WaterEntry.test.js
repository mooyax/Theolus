
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Actor } from '../Actor';
import * as THREE from 'three';

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
    isAdjacentToRegion: vi.fn().mockReturnValue(true),
    findPathAsync: vi.fn().mockResolvedValue([]),
    getRegion: vi.fn().mockReturnValue(1)
};

for (let x = 0; x < 100; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 100; z++) {
        mockTerrain.grid[x][z] = { height: 1, regionId: 1 };
    }
}
mockTerrain.grid[10][10] = { height: 0, regionId: 0 };

describe('Water Entry Prevention', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockTerrain.getTileHeight.mockImplementation((x, z) => {
            if (Math.round(x) === 10 && Math.round(z) === 10) return 0;
            return 1;
        });
    });

    it('Actor prevents linear movement into water', () => {
        const actor = new Actor(new THREE.Scene(), mockTerrain, 10, 8, 'worker');
        actor.id = 1;

        const result = actor.smartMove(10, 10, 1000);

        expect(result).toBe(true);
        expect(mockTerrain.findPathAsync).toHaveBeenCalled();
    });

    it('Actor allows movement on land', () => {
        const actor = new Actor(new THREE.Scene(), mockTerrain, 10, 8, 'worker');
        actor.id = 2;

        const result = actor.smartMove(10, 6, 1000);

        expect(result).toBe(true);
        expect(mockTerrain.findPathAsync).toHaveBeenCalled();
    });
});