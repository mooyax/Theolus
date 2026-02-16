
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain';
import { GoblinManager } from '../GoblinManager';
import * as THREE from 'three';

// Mock minimal dependencies
const mockScene = new THREE.Scene();
const mockClippingPlanes = [];

describe('Cave Determinism', () => {
    let terrain;
    let goblinManager;

    // Mock computeVertexNormals to avoid TypeError in tests
    THREE.BufferGeometry.prototype.computeVertexNormals = vi.fn().mockReturnThis();
    THREE.PlaneGeometry.prototype.computeVertexNormals = vi.fn().mockReturnThis();

    beforeEach(() => {
        // Reset
        terrain = new Terrain(mockScene, mockClippingPlanes, 80, 80);
        goblinManager = new GoblinManager(mockScene, terrain);
        terrain.goblinManager = goblinManager; // Link back if needed
    });

    it('should generate identical caves with same terrain seed', async () => {
        const SEED = 0.54321;

        // Run 1
        await terrain.generateRandomTerrain(false, { heightScale: 35 }, SEED);
        goblinManager.caves = []; // Reset caves
        goblinManager.generateCaves(5);

        const caves1 = goblinManager.caves.map(c => ({ x: c.gridX, z: c.gridZ }));

        console.log("Run 1 Caves:", caves1);

        // Run 2 (Simulate Reset)
        const terrain2 = new Terrain(mockScene, mockClippingPlanes, 80, 80);
        const goblinManager2 = new GoblinManager(mockScene, terrain2);

        await terrain2.generateRandomTerrain(false, { heightScale: 35 }, SEED);
        goblinManager2.caves = [];
        goblinManager2.generateCaves(5);

        const caves2 = goblinManager2.caves.map(c => ({ x: c.gridX, z: c.gridZ }));

        console.log("Run 2 Caves:", caves2);

        expect(caves1.length).toBe(5);
        expect(caves2.length).toBe(5);

        // Compare
        for (let i = 0; i < 5; i++) {
            expect(caves1[i].x).toBe(caves2[i].x);
            expect(caves1[i].z).toBe(caves2[i].z);
        }
    });
});

