import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';

// Unmock the target renderer because it is mocked globally in setup.js
vi.unmock('../BuildingRenderer.js');
import { BuildingRenderer } from '../BuildingRenderer';

describe('Farm Waves', () => {
    let scene;
    let terrain;
    let renderer;

    beforeEach(async () => {
        scene = new THREE.Scene();
        terrain = {
            logicalWidth: 40,
            logicalDepth: 40,
            checkYield: vi.fn().mockResolvedValue(true),
            getVisualPosition: vi.fn().mockReturnValue({ x: 0, y: 0, z: 0 })
        };
        renderer = new BuildingRenderer(scene, terrain, []);
        await renderer.init();
    });

    it('should use BoxGeometry for farms to provide 3D volume', () => {
        const farmGeo = renderer.assets.farmGeo;
        expect(farmGeo.type).toBe('BoxGeometry');
        // Check dimensions (1.8, 0.2, 1.8)
        expect(farmGeo.parameters.width).toBe(1.8);
        expect(farmGeo.parameters.height).toBe(0.2);
        expect(farmGeo.parameters.depth).toBe(1.8);
    });

    it('should have uTime uniform in the farm material', () => {
        const mat = renderer.assets.farmMat;
        expect(mat.uniforms).toBeDefined();
        expect(mat.uniforms.uTime).toBeDefined();
    });

    it('should define onBeforeCompile for farm material to inject waving logic', () => {
        const mat = renderer.assets.farmMat;
        expect(typeof mat.onBeforeCompile).toBe('function');
    });

    it('should update uTime value in update()', () => {
        const mat = renderer.assets.farmMat;
        renderer.update([], null, null, 123.45);
        expect(mat.uniforms.uTime.value).toBe(123.45);
    });
});
