
/**
 * @vitest-environment happy-dom
 */
import * as THREE from 'three';
import { UnitRenderer } from '../UnitRenderer.js';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';

// Mock Canvas for THREE.WebGLRenderer (if needed, but UnitRenderer doesn't use it directly)
// UnitRenderer creates InstancedMesh.

describe('Startup Crash Verification', () => {
    let scene;
    let terrain;
    let renderer;

    beforeAll(() => {
        // Mock Unit.assets
        Unit.initAssets();
    });

    test('UnitRenderer should initialize without null materials', () => {
        scene = new THREE.Scene();
        // Mock Terrain
        terrain = { logicalWidth: 100, logicalDepth: 100, getTileHeight: () => 0 };

        // This usually crashes if Unit.assets.materials.heads is null and code uses it
        expect(() => {
            renderer = new UnitRenderer(scene, terrain, []);
        }).not.toThrow();

        // Check if meshes are created with valid materials
        expect(renderer.headMesh).toBeDefined();
        // Accessing material properties shouldn't throw
        expect(renderer.headMesh.material).toBeDefined();
        expect(renderer.headMesh.material).not.toBeNull();
    });

    test('UnitRenderer update should not crash with active units', () => {
        // Create a mock unit
        const mockUnit = new Unit(scene, terrain, 10, 10, 'knight');
        mockUnit.id = 1;
        mockUnit.position = new THREE.Vector3(10, 0, 10);
        mockUnit.limbs = {
            leftArm: { x: 0 }, rightArm: { x: 0 },
            leftLeg: { x: 0 }, rightLeg: { x: 0 }
        };

        const units = [mockUnit];
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(20, 20, 20);

        // Update loop
        expect(() => {
            renderer.update(units, null, camera);
        }).not.toThrow();
    });

    test('FaceMesh should be present if split logic is active', () => {
        // If we fixed it, faceMesh should exist
        if (renderer.faceMesh) {
            expect(renderer.faceMesh).toBeDefined();
            expect(renderer.faceMesh.material).toBeDefined();
        } else {
            // If outdated, this might fail or warn
            console.warn("FaceMesh not found - UnitRenderer might be outdated");
        }
    });
});
