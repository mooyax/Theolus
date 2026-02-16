
import { describe, it, expect } from 'vitest';
import * as THREE from 'three';

describe('Verify Setup', () => {
    it('should use global mock for Vector3', () => {
        const v = new THREE.Vector3(1, 2, 3);
        expect(v.x).toBe(1);
        expect(v.length()).toBeCloseTo(3.74, 2);
    });

    it('should use global mock or actual for PlaneGeometry', () => {
        // setup.js does not mock PlaneGeometry explicitly, so it uses actual or falls back
        const pg = new THREE.PlaneGeometry(100, 100);
        expect(pg).toBeDefined();
        expect(pg.attributes.position).toBeDefined();
    });
});
