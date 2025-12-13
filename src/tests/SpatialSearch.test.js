import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Mock Three.js
global.THREE = THREE;

describe('Spatial Partitioning', () => {
    let terrain;
    let mockScene;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        terrain = new Terrain(mockScene, []);

        // Force logical size
        terrain.logicalWidth = 20;
        terrain.logicalDepth = 20;

        // Re-init grid with forced size
        terrain.initEntityGrid();
    });

    it('should register and retrieve an entity', () => {
        const entity = { id: 1, type: 'unit' }; // mocking entity

        terrain.registerEntity(entity, 5, 5, 'unit');

        const cell = terrain.entityGrid[5][5];
        // Implementation uses Array
        expect(Array.isArray(cell)).toBe(true);
        expect(cell.includes(entity)).toBe(true);
        expect(entity._spatial.x).toBe(5);
        expect(entity._spatial.z).toBe(5);
        expect(entity._spatial.type).toBe('unit');
    });

    it('should move entity correctly between cells', () => {
        const entity = { id: 1 };

        terrain.registerEntity(entity, 5, 5, 'unit');
        expect(terrain.entityGrid[5][5].includes(entity)).toBe(true);

        // Move to 6,5
        // Sig: moveEntity(entity, oldX, oldZ, newX, newZ, type)
        terrain.moveEntity(entity, 5, 5, 6, 5, 'unit');

        expect(terrain.entityGrid[5][5].includes(entity)).toBe(false);
        expect(terrain.entityGrid[6][5].includes(entity)).toBe(true);
        expect(entity._spatial.x).toBe(6);
    });

    it('should unregister entity', () => {
        const entity = { id: 1 };
        terrain.registerEntity(entity, 5, 5, 'unit');

        terrain.unregisterEntity(entity);

        expect(terrain.entityGrid[5][5].includes(entity)).toBe(false);
        expect(entity._spatial).toBeNull();
    });

    it('should find nearest entity using spatial search', () => {
        // Setup Grid
        const target = { id: 'target', gridX: 5, gridZ: 5, type: 'food' };
        // We need 'position' or gridX for dist calculation in findNearest
        // Terrain.js findNearestEntity checks: e._spatial.type === type
        // And uses x/z for distance.
        // If entity has no .position, it relies on x/z from loops? No.
        // Code: const dx = x - centerX? No.
        // Code: const dx = x - centerX; (Wait, x is loop var)
        // Yes, it uses the CELL coordinate for distance? Or Entity coordinate?
        // Step 2165: const dx = x - centerX; const dz = z - centerZ;
        // It uses the CELL coordinate! efficient but approximate.
        // Wait, lines 91-92: x - centerX.
        // Yes, it assumes entity is at center of cell or uses cell dist.
        // This is O(local_cells).

        terrain.registerEntity(target, 5, 5, 'food');

        const distant = { id: 'distant', gridX: 15, gridZ: 15, type: 'food' };
        terrain.registerEntity(distant, 15, 15, 'food');

        // Search
        // Radius 5 from 4,4
        const result = terrain.findNearestEntity('food', 4, 4, 5);

        expect(result).toBe(target);
    });
});
