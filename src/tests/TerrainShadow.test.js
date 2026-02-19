import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain';

describe('Terrain Shadows', () => {
    let scene;
    let terrain;

    beforeEach(() => {
        scene = new THREE.Scene();
        // createMesh() はコンストラクタ内で initTerrain -> initMeshes -> createMesh と呼ばれる
        terrain = new Terrain(scene, [], 40, 40);
    });

    it('should have receiveShadow and castShadow enabled for the terrain mesh', () => {
        expect(terrain.mesh).toBeDefined();
        if (terrain.mesh) {
            expect(terrain.mesh.receiveShadow).toBe(true);
            expect(terrain.mesh.castShadow).toBe(true);
        }
    });

    it('should have flatShading disabled for smooth normals', () => {
        if (terrain.mesh && terrain.mesh.material) {
            const material = terrain.mesh.material;
            // MeshLambertMaterial has flatShading
            expect(material.flatShading).toBe(false);
        }
    });
});
