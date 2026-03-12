
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain';
import { GoblinManager } from '../GoblinManager';
import { MockGame } from './TestHelper';
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
        const game = new MockGame();
        game.terrain = terrain;
        
        goblinManager = new GoblinManager(mockScene, terrain, game);
        terrain.goblinManager = goblinManager; 
    });

    it('should generate identical caves with same terrain seed', async () => {
        const SEED = 0.54321;

        // Run 1
        await terrain.generateRandomTerrain(false, { heightScale: 35 }, SEED);
        goblinManager.caves = []; // Reset caves
        goblinManager.generateCaves(5);

        const caves1 = goblinManager.caves.map(c => ({ x: c.gridX, z: c.gridZ }));

        // Run 2 (Simulate Reset)
        const terrain2 = new Terrain(mockScene, mockClippingPlanes, 80, 80);
        const game2 = new MockGame();
        game2.terrain = terrain2;
        const goblinManager2 = new GoblinManager(mockScene, terrain2, game2);

        await terrain2.generateRandomTerrain(false, { heightScale: 35 }, SEED);
        goblinManager2.caves = [];
        goblinManager2.generateCaves(5);

        const caves2 = goblinManager2.caves.map(c => ({ x: c.gridX, z: c.gridZ }));

        expect(caves1.length).toBe(5);
        expect(caves2.length).toBe(5);

        // Compare
        for (let i = 0; i < 5; i++) {
            expect(caves1[i].x).toBe(caves2[i].x);
            expect(caves1[i].z).toBe(caves2[i].z);
        }
    });

    it('should generate different caves with different terrain seeds', async () => {
        const SEED1 = 0.11111;
        const SEED2 = 0.99999;

        // Run 1
        await terrain.generateRandomTerrain(false, { heightScale: 35 }, SEED1);
        goblinManager.caves = [];
        goblinManager.generateCaves(5);
        const caves1 = goblinManager.caves.map(c => ({ x: c.gridX, z: c.gridZ }));

        // Run 2
        const terrain2 = new Terrain(mockScene, mockClippingPlanes, 80, 80);
        const game2 = new MockGame();
        game2.terrain = terrain2;
        const goblinManager2 = new GoblinManager(mockScene, terrain2, game2);

        await terrain2.generateRandomTerrain(false, { heightScale: 35 }, SEED2);
        goblinManager2.caves = [];
        goblinManager2.generateCaves(5);
        const caves2 = goblinManager2.caves.map(c => ({ x: c.gridX, z: c.gridZ }));

        // Compare (At least some should be different)
        let matches = 0;
        for (let i = 0; i < 5; i++) {
            if (caves1[i].x === caves2[i].x && caves1[i].z === caves2[i].z) matches++;
        }
        expect(matches).toBeLessThan(5);
    });
});