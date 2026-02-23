
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';

vi.mock('../BuildingRenderer.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        BuildingRenderer: class extends actual.BuildingRenderer {
            constructor(scene, terrain, buildings) {
                super(scene, terrain, buildings);
            }
        }
    };
});

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

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should use BoxGeometry for farms to provide 3D volume', () => {
        const farmGeo = renderer.assets.farmGeo;
        expect(farmGeo.type).toBe('BoxGeometry');
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