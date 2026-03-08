import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Warship } from '../Warship';
import { Wander } from '../ai/states/UnitStates';

// Mock Terrain (Pure JS)
class MockTerrain {
    constructor() {
        this.grid = Array(100).fill(null).map(() => Array(100).fill(null).map(() => ({ height: 0, regionId: -1 })));
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.buildings = [];
    }
    getTileHeight(x, z) {
        x = Math.floor(x); z = Math.floor(z);
        return this.grid[x] && this.grid[x][z] ? this.grid[x][z].height : 0;
    }
    getRegion(x, z) {
        x = Math.floor(x); z = Math.floor(z);
        return this.grid[x] && this.grid[x][z] ? this.grid[x][z].regionId : 0;
    }
    getRandomPointInRegion(regionId, centerX, centerZ, radius) {
        // Return a tile (In real Terrain.ts, regionId 0 now returns any matching height tile)
        // For water units, they want h <= 0.
        return { x: (centerX + 5) % 100, z: centerZ };
    }
    findBestTarget(type, x, z, range, filter, list) { return null; }
    unregisterEntity() { }
    gridToWorld(v) { return v; }
}

describe('Warship Wander Fix Verification', () => {
    let warship;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain();
        warship = new Warship(scene, terrain, 50, 50, 'player');
        warship.game = { frameCount: 0 };
    });

    it('should NOW move if current region is 0 (unprocessed)', () => {
        // Setup: tile region is 0
        terrain.grid[50][50].regionId = 0;
        warship.smartMove = vi.fn();

        warship.moveRandomly(10);

        // Success: smartMove is called because of the region 0 fallback
        expect(warship.smartMove).toHaveBeenCalled();
    });

    it('should NOW move if beached on land (fallback to water)', () => {
        // Setup: warship beached on land (region > 0)
        terrain.grid[50][50].height = 5;
        terrain.grid[50][50].regionId = 1; // Land Region

        // Target found in water (-1)
        terrain.grid[55][50].height = -1; // Water
        terrain.grid[55][50].regionId = -1; // Water Region

        warship.smartMove = vi.fn();

        warship.moveRandomly(10);

        // Success: smartMove is called because Warship.ts now defaults to water search if beached
        expect(warship.smartMove).toHaveBeenCalled();
    });
});
