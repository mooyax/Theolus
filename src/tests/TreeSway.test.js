import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';

// Unmock the target renderer because it is mocked globally in setup.js
vi.unmock('../TreeRenderer.js');
import { TreeRenderer } from '../TreeRenderer';

describe('Tree Swaying', () => {
    let scene;
    let terrain;
    let renderer;

    beforeEach(async () => {
        scene = new THREE.Scene();
        terrain = {
            logicalWidth: 40,
            logicalDepth: 40,
            trees: [{ gridX: 10, gridZ: 10, rotationY: 0, scale: 1 }],
            getVisualPosition: vi.fn().mockReturnValue({ x: 10, y: 0, z: 10 })
        };
        renderer = new TreeRenderer(scene, terrain, []);
        await renderer.init();
    });

    it('should have uTime uniform in the leaf material', () => {
        const mat = renderer.assets.leafMat;
        expect(mat.uniforms).toBeDefined();
        expect(mat.uniforms.uTime).toBeDefined();
    });

    it('should define onBeforeCompile for leaf material to inject swaying logic', () => {
        const mat = renderer.assets.leafMat;
        expect(typeof mat.onBeforeCompile).toBe('function');
    });

    it('should update uTime value in update()', () => {
        const mat = renderer.assets.leafMat;
        renderer.update({ x: 0, z: 0 }, 55.5);
        expect(mat.uniforms.uTime.value).toBe(55.5);
    });
});
