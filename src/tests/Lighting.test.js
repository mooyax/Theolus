
import { describe, it, expect, vi } from 'vitest';
import * as THREE from 'three';

// IMPORTANT: Unmock BuildingRenderer to test the actual class
vi.unmock('../BuildingRenderer.js');
import { BuildingRenderer } from '../BuildingRenderer.js';

describe('BuildingRenderer Lighting', () => {
    it('should turn on barracks lights at night', async () => {
        const scene = new THREE.Scene();
        const terrain = {
            logicalWidth: 80,
            logicalDepth: 80,
            checkYield: async () => { },
            getVisualPosition: (x, z) => ({ x, y: 0, z })
        };

        const renderer = new BuildingRenderer(scene, terrain);
        await renderer.init();

        expect(renderer.assets.barracksMat).toBeDefined();
        expect(renderer.assets.barracksMat.emissive.getHex()).toBe(0x000000);
        expect(renderer.assets.barracksMat.emissiveIntensity).toBe(0.0);

        renderer.updateLighting(true);

        expect(renderer.assets.barracksMat.emissive.getHex()).toBe(0xFF8C00);
        expect(renderer.assets.barracksMat.emissiveIntensity).toBe(1.0);

        renderer.updateLighting(false);

        expect(renderer.assets.barracksMat.emissive.getHex()).toBe(0x000000);
        expect(renderer.assets.barracksMat.emissiveIntensity).toBe(0.0);
    });
});