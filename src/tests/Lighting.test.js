import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import { BuildingRenderer } from '../BuildingRenderer.js';

describe('BuildingRenderer Lighting', () => {
    it('should turn on barracks lights at night', () => {
        // Mock DOM
        global.document = {
            getElementById: () => ({ style: {} }),
            createElement: (tag) => {
                if (tag === 'canvas') {
                    return {
                        width: 0, height: 0,
                        getContext: () => ({
                            fillStyle: '', fillRect: () => { },
                            drawImage: () => { }
                        })
                    };
                }
                return {};
            }
        };
        // Mock Scene
        const scene = new THREE.Scene();
        const terrain = { logicalWidth: 80, logicalDepth: 80 };

        const renderer = new BuildingRenderer(scene, terrain);
        renderer.initAssets();

        // 1. Verify Initial State (Lights OFF)
        expect(renderer.assets.barracksMat).toBeDefined();
        expect(renderer.assets.barracksMat.emissive.getHex()).toBe(0x000000);
        expect(renderer.assets.barracksMat.emissiveIntensity).toBe(0.0);

        // 2. Set Night
        renderer.updateLighting(true);

        // 3. Verify Lights ON
        // Expecting some warm color (0xFF8C00 based on code)
        expect(renderer.assets.barracksMat.emissive.getHex()).toBe(0xFF8C00);
        expect(renderer.assets.barracksMat.emissiveIntensity).toBe(1.0);

        // 4. Set Day
        renderer.updateLighting(false);

        // 5. Verify Lights OFF
        expect(renderer.assets.barracksMat.emissive.getHex()).toBe(0x000000);
        expect(renderer.assets.barracksMat.emissiveIntensity).toBe(0.0);
    });
});
