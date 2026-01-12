
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnitRenderer } from '../UnitRenderer';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

// Mock THREE
global.THREE = THREE;

describe('UnitRenderer Visibility', () => {
    let renderer;
    let mockScene;
    let mockTerrain;
    let mockCamera;
    let mockFrustum;

    beforeEach(() => {
        // Init Assets Fake
        Unit.assets = {
            initialized: true,
            geometries: {
                body: new THREE.BoxGeometry(),
                head: new THREE.BoxGeometry(),
                limb: new THREE.BoxGeometry(),
                sword: new THREE.BoxGeometry(),
                staff: new THREE.BoxGeometry(),
                wizardHat: new THREE.BoxGeometry(),
                wizardHatBrim: new THREE.BoxGeometry(),
            },
            materials: {
                skin: new THREE.MeshBasicMaterial(),
                heads: [new THREE.MeshBasicMaterial()],
                metal: new THREE.MeshBasicMaterial(),
                wood: new THREE.MeshBasicMaterial(),
                wizardHat: new THREE.MeshBasicMaterial(),
            }
        };

        mockScene = { add: vi.fn(), remove: vi.fn() };
        mockTerrain = { logicalWidth: 100, logicalDepth: 100 };
        mockCamera = new THREE.PerspectiveCamera();
        mockCamera.position.set(0, 50, 0);

        // Frustum that accepts everything
        mockFrustum = { intersectsSphere: () => true };

        renderer = new UnitRenderer(mockScene, mockTerrain);

        // Spy on setMatrixAt
        vi.spyOn(renderer.torsoMesh, 'setMatrixAt');
        vi.spyOn(renderer.torsoMesh, 'setColorAt');
    });

    it('should set matrix with valid scale when unit is visible', () => {
        const unit = {
            id: 1,
            position: new THREE.Vector3(0, 0, 0),
            rotationY: 0,
            isDead: false,
            role: 'worker',
            limbs: {
                leftArm: { x: 0 }, rightArm: { x: 0 },
                leftLeg: { x: 0 }, rightLeg: { x: 0 }
            }
        };

        renderer.update([unit], mockFrustum, mockCamera.position);

        // Check calls
        const callCount = renderer.torsoMesh.setMatrixAt.mock.calls.length;
        expect(callCount).toBeGreaterThan(0);

        const matrix = renderer.torsoMesh.setMatrixAt.mock.lastCall[1];
        const scaleX = new THREE.Vector3().setFromMatrixScale(matrix).x;

        // Assert Visual Validity
        expect(scaleX).toBeGreaterThan(0.1);
        expect(renderer.torsoMesh.count).toBeGreaterThan(0);
    });

    it('should render correct count of instances', () => {
        const units = [];
        for (let i = 0; i < 5; i++) {
            units.push({
                id: i,
                position: new THREE.Vector3(i * 2, 0, 0),
                rotationY: 0, isDead: false, role: 'worker',
                limbs: { leftArm: { x: 0 }, rightArm: { x: 0 }, leftLeg: { x: 0 }, rightLeg: { x: 0 } }
            });
        }

        renderer.update(units, mockFrustum, mockCamera.position);

        expect(renderer.torsoMesh.count).toBeGreaterThanOrEqual(5);
    });
});
