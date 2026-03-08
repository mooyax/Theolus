import { describe, it, expect, vi } from 'vitest';
import { Terrain } from '../Terrain';
import { Unit } from '../Unit';
import * as THREE from 'three';

describe('Terrain findBestTarget Debug', () => {
    it('should find a unit in the entityGrid', () => {
        const scene = new THREE.Scene();
        const terrain = new Terrain(scene);
        terrain.logicalWidth = 100;
        terrain.logicalDepth = 100;
        terrain.initEntityGrid();

        // Mock grid for region checks
        terrain.grid = Array.from({ length: 100 }, () =>
            Array.from({ length: 100 }, () => ({ height: 1, regionId: 0, type: 'grass' }))
        );

        const worker = new Unit(scene, terrain, 25, 20, 'worker');

        console.log('Worker _spatial:', worker._spatial);
        console.log('EntityGrid[25][20] length:', terrain.entityGrid[25][20].length);

        const found = terrain.findBestTarget('unit', 20, 20, 20, (e, d) => d);

        expect(found).toBeDefined();
        expect(found).toBe(worker);
    });
});
