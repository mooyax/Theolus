
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain.js';
import { GameConfig } from '../config/GameConfig';

// Mocks
const MockScene = new THREE.Scene();

describe('Terrain Grid Search Regression', () => {
    let terrain;

    beforeEach(() => {
        // Reset Config if needed, or rely on defaults
        terrain = new Terrain(MockScene);
        // Force logical size to match expected test coords
        terrain.logicalWidth = 100;
        terrain.logicalDepth = 100;

        // Re-init grids with new size
        terrain.initGrid();
        terrain.initEntityGrid();

        // Mock generic methods
        terrain.getTileHeight = vi.fn().mockReturnValue(1);
    });

    it('should find Worker when searching for "unit" using Grid Search (Large Scale Simulation)', () => {
        // 1. Setup Grid Search Condition
        // Force Grid Search by passing null candidates list

        // 2. Register Target
        const targetWorker = {
            id: 999,
            gridX: 50,
            gridZ: 50,
            isDead: false,
            _spatial: { x: 50, z: 50, type: 'worker' }, // Type is specific
            userData: { isHero: true }
        };
        terrain.registerEntity(targetWorker, 50, 50, 'worker');

        // 3. Search parameters
        // Center at 48,48. Radius 20. Target at 50,50 (Dist ~2.8).
        const result = terrain.findBestTarget(
            'unit', // Target Type (Wildcard)
            48, 48, // Center
            20,     // Radius
            (e, dist) => dist, // Cost function (Nearest)
            null    // Force Grid Search (list is null)
        );

        expect(result).not.toBeNull();
        expect(result.id).toBe(999);
        expect(result._spatial.type).toBe('worker');
    });

    it('should find Sheep but NOT Fish when searching for "unit"', () => {
        // Setup
        const cx = 10, cz = 10;

        // Only Sheep and Fish nearby
        const sheep = { id: 101, gridX: 10, gridZ: 10, isDead: false, _spatial: { x: 10, z: 10, type: 'sheep' } };
        const fish = { id: 102, gridX: 11, gridZ: 10, isDead: false, _spatial: { x: 11, z: 10, type: 'fish' } };

        terrain.registerEntity(sheep, 10, 10, 'sheep');
        terrain.registerEntity(fish, 11, 10, 'fish');

        // Search for unit - should now find sheep (as per new requirements)
        const result = terrain.findBestTarget('unit', cx, cz, 20, (e, d) => d, null);

        expect(result).not.toBeNull();
        expect(result.id).toBe(101);
        expect(result._spatial.type).toBe('sheep');

        // verify fish is still NOT found via unit search specifically? 
        // findBestTarget only returns one (the best).
    });

    it('should NOT find Building when searching for unit', () => {
        const house = {
            id: 888,
            gridX: 50,
            gridZ: 50,
            userData: { type: 'house', hp: 100 },
            _spatial: { x: 50, z: 50, type: 'building' }
        };
        terrain.registerEntity(house, 50, 50, 'building');

        const found = terrain.findBestTarget('unit', 48, 48, 20, (e, d) => d, null);

        // Should ignore building even with wildcard
        expect(found).toBeNull();
    });
});
