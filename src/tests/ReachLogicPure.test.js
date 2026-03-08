import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Terrain } from '../Terrain';
import { Unit } from '../Unit';
import * as THREE from 'three';
import { Job } from '../ai/states/UnitStates';

// Mock Scene
const mockScene = {
    add: () => { },
    remove: () => { },
    children: [],
    traverse: () => { }
};

describe('Pure Reach Logic Verification', () => {
    let terrain;
    const size = 80;

    beforeEach(() => {
        terrain = new Terrain(mockScene, [], size, size);
        terrain.initGrid();

        // Land at x < 40 (Region 1)
        // Water at x >= 40 (Region 2)
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                terrain.grid[x][z].height = (x < 40) ? 5.0 : -5.0;
            }
        }
        terrain.calculateRegions();
    });

    it('Terrain.isAdjacentToRegion with radius 5 supports extreme distances', () => {
        const regionId = terrain.grid[38][20].regionId; // Land Region

        // Water tile at (44, 20) -> Distance from boundary (39, 20) is 5 tiles.
        // Should be reachable with radius 5.
        expect(terrain.isAdjacentToRegion(44, 20, regionId, 4)).toBe(false);
        expect(terrain.isAdjacentToRegion(44, 20, regionId, 5)).toBe(true);
    });

    it('Actor.isReachable relax for manual/building attempts (Radius 5)', () => {
        const worker = new Unit(mockScene, terrain, 35, 20, 'worker');
        worker.gridX = 35;
        worker.gridZ = 20;

        // Target x=44 is water. 
        // Boundary is x=39. Distance is 5 (44-39).
        expect(worker.isReachable(44, 20, true)).toBe(true);
    });

    it('Job.update should trigger Working state from shore (Distance <= 5.5)', () => {
        const worker = new Unit(mockScene, terrain, 38, 20, 'worker');
        worker.gridX = 38.0;
        worker.gridZ = 20.0;
        worker.role = 'worker';

        // Request at x=43.0 (water). 
        // Distance = 5.0 tiles.
        // Thresh 5.5 -> should work.
        const req = {
            id: 'req1',
            x: 43.0,
            z: 20.0,
            isManual: true,
            status: 'assigned',
            type: 'build_port'
        };
        worker.targetRequest = req;

        const jobState = new Job(worker);
        worker.changeState(jobState);

        // Mock game
        worker.game = {
            completeRequest: vi.fn(),
            simTotalTimeSec: 10,
            terrain: terrain
        };

        jobState.update(10.0, 0.1);

        // Should trigger completion at distance 5.0
        expect(worker.game.completeRequest).toHaveBeenCalledWith(worker, req);
    });
});
