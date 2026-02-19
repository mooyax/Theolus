import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';

// Unmock renderers
vi.unmock('../Terrain.ts');
vi.unmock('../BuildingRenderer.js');
vi.unmock('../TreeRenderer.js');

import { Terrain } from '../Terrain';
import { BuildingRenderer } from '../BuildingRenderer';
import { TreeRenderer } from '../TreeRenderer';

describe('Weather Sway Intensity', () => {
    let scene, terrain, buildingRenderer, treeRenderer;

    beforeEach(async () => {
        scene = new THREE.Scene();
        // Setup Terrain
        terrain = new Terrain(scene, 40, 40);
        terrain.createWater();

        // Setup BuildingRenderer
        buildingRenderer = new BuildingRenderer(scene, terrain, []);
        await buildingRenderer.init();

        // Setup TreeRenderer
        terrain.trees = [{ gridX: 10, gridZ: 10, rotationY: 0, scale: 1 }];
        treeRenderer = new TreeRenderer(scene, terrain, []);
        await treeRenderer.init();
    });

    it('should update uSwayIntensity in water material', () => {
        const mat = terrain.waterMesh.material;
        terrain.update(0.1, null, false, 0, true, {}, 3.5);
        expect(mat.uniforms.uSwayIntensity.value).toBe(3.5);
    });

    it('should update uSwayIntensity in farm material', () => {
        const mat = buildingRenderer.assets.farmMat;
        buildingRenderer.update([], null, null, 0, 4.0);
        expect(mat.uniforms.uSwayIntensity.value).toBe(4.0);
    });

    it('should update uSwayIntensity in tree leaf material', () => {
        const mat = treeRenderer.assets.leafMat;
        treeRenderer.update({ x: 0, z: 0 }, 0, 2.8);
        expect(mat.uniforms.uSwayIntensity.value).toBe(2.8);
    });
});
