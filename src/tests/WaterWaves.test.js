import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain';

describe('Water Waves', () => {
    let scene;
    let terrain;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new Terrain(scene, [], 40, 40);
    });

    it('should have a detailed geometry for the water mesh', () => {
        expect(terrain.waterMesh).toBeDefined();
        const geo = terrain.waterMesh.geometry;
        // PlaneGeometry(width, depth, widthSegments, heightSegments)
        // 64x64 segments expected
        expect(geo.parameters.widthSegments).toBe(64);
        expect(geo.parameters.heightSegments).toBe(64);
    });

    it('should have uTime uniform in the water material', () => {
        const mat = terrain.waterMesh.material;
        expect(mat.uniforms).toBeDefined();
        expect(mat.uniforms.uTime).toBeDefined();
        expect(mat.uniforms.uTime.value).toBe(0);
    });

    it('should have onBeforeCompile defined for custom shader injection', () => {
        const mat = terrain.waterMesh.material;
        expect(typeof mat.onBeforeCompile).toBe('function');
    });
});
