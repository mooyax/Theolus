import { describe, it, expect } from 'vitest';
import * as THREE from 'three';

describe('THREE Mock Diagnostic', () => {
    it('should have CanvasTexture', () => {
        expect(THREE.CanvasTexture).toBeDefined();
        const tex = new THREE.CanvasTexture();
        expect(tex).toBeDefined();

    });
    it('should have PlaneGeometry with parameters', () => {
        const geo = new THREE.PlaneGeometry(10, 10, 128, 128);
        expect(geo.parameters.widthSegments).toBe(128);

});
});