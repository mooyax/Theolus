
/**
 * @vitest-environment happy-dom
 */
import { describe, test, expect, vi, beforeAll } from 'vitest';
import * as THREE from 'three';

// setup.js でのグローバルモックを解除
vi.unmock('../UnitRenderer.js');

import { UnitRenderer } from '../UnitRenderer.js';
import { Unit } from '../Unit.js';

describe('Startup Crash Verification', () => {
    let scene;
    let terrain;
    let renderer;

    beforeAll(() => {
        Unit.assets = {
            initialized: true,
            geometries: {
                body: new THREE.BoxGeometry(),
                head: new THREE.BoxGeometry(),
                limb: new THREE.BoxGeometry(),
                sword: new THREE.BoxGeometry(),
                staff: new THREE.BoxGeometry(),
                facePlane: new THREE.PlaneGeometry(),
                wizardHat: new THREE.BoxGeometry(),
                wizardHatBrim: new THREE.BoxGeometry(),
                jobIndicatorTop: new THREE.BoxGeometry(),
                jobIndicatorDot: new THREE.BoxGeometry(),
            },
            materials: {
                skin: new THREE.MeshBasicMaterial(),
                heads: [new THREE.MeshBasicMaterial()],
                face: new THREE.MeshBasicMaterial(),
                metal: new THREE.MeshBasicMaterial(),
                wood: new THREE.MeshBasicMaterial(),
                wildmanSkin: new THREE.MeshBasicMaterial(),
                civilianSkin: new THREE.MeshBasicMaterial(),
                robe: new THREE.MeshBasicMaterial(),
                armor: new THREE.MeshBasicMaterial(),
                helmet: new THREE.MeshBasicMaterial(),
                redIndicator: new THREE.MeshBasicMaterial(),
                wizardHat: new THREE.MeshBasicMaterial(),
            }
        };

        scene = new THREE.Scene();
        terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: () => 0,
            getVisualPosition: (x, z) => new THREE.Vector3(x, 0, z),
            checkYield: async () => { }
        };
    });

    test('UnitRenderer should initialize without null materials', async () => {
        renderer = new UnitRenderer(scene, terrain, []);
        await renderer.init();

        expect(renderer.headMesh).toBeDefined();
        expect(renderer.headMesh.material).toBeDefined();
        expect(renderer.headMesh.material).not.toBeNull();
    });

    test('UnitRenderer update should not crash with active units', () => {
        const mockUnit = new Unit(scene, terrain, 10, 10, 'knight');
        mockUnit.id = 1;
        mockUnit.position = new THREE.Vector3(10, 0, 10);
        mockUnit.limbs = {
            leftArm: { x: 0 }, rightArm: { x: 0 },
            leftLeg: { x: 0 }, rightLeg: { x: 0 }
        };

        const units = [mockUnit];
        const cameraPos = new THREE.Vector3(20, 20, 20);

        expect(() => {
            renderer.update(units, 0.1, cameraPos);
        }).not.toThrow();
    });

    test('FaceMesh should be present if split logic is active', () => {
        if (renderer.faceMesh) {
            expect(renderer.faceMesh).toBeDefined();
            expect(renderer.faceMesh.material).toBeDefined();
        }
    });
});