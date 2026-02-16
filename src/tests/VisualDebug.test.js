
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';

// setup.js でのグローバルモックを解除
vi.unmock('../UnitRenderer.js');

import { UnitRenderer } from '../UnitRenderer';
import { Unit } from '../Unit';

// Mock dependencies
const mockScene = {
    add: vi.fn(),
    remove: vi.fn()
};

const mockTerrain = {
    logicalWidth: 100,
    logicalDepth: 100,
    checkYield: vi.fn().mockResolvedValue(),
    getVisualPosition: vi.fn((x, z) => new THREE.Vector3(x, 0, z))
};

describe('VisualDebug UnitRenderer', () => {
    let renderer;

    beforeEach(async () => {
        // Mock Unit.assets
        Unit.assets = {
            initialized: true,
            geometries: {
                body: new THREE.BoxGeometry(),
                head: new THREE.BoxGeometry(),
                facePlane: new THREE.PlaneGeometry(),
                limb: new THREE.BoxGeometry(),
                sword: new THREE.BoxGeometry(),
                staff: new THREE.BoxGeometry(),
                wizardHat: new THREE.ConeGeometry(),
                wizardHatBrim: new THREE.CylinderGeometry(),
                jobIndicatorTop: new THREE.CylinderGeometry(),
                jobIndicatorDot: new THREE.SphereGeometry()
            },
            materials: {
                face: new THREE.MeshBasicMaterial(),
                metal: new THREE.MeshBasicMaterial(),
                wood: new THREE.MeshBasicMaterial(),
                wizardHat: new THREE.MeshBasicMaterial(),
                redIndicator: new THREE.MeshBasicMaterial(),
                armor: new THREE.MeshBasicMaterial(),
                helmet: new THREE.MeshBasicMaterial(),
                robe: new THREE.MeshBasicMaterial()
            }
        };

        renderer = new UnitRenderer(mockScene, mockTerrain);
        await renderer.init();
    });

    it('should set SCALE > 0 for active units', () => {
        const units = [
            {
                id: 1,
                role: 'worker',
                position: new THREE.Vector3(10, 0, 10),
                rotationY: 0,
                limbs: { leftArm: { x: 0 }, rightArm: { x: 0 }, leftLeg: { x: 0 }, rightLeg: { x: 0 } }
            }
        ];

        const viewCenter = new THREE.Vector3(10, 0, 10);
        renderer.update(units, null, viewCenter);

        // Check Torso Mesh matrix
        const mesh = renderer.torsoMesh;
        expect(mesh.count).toBe(1);

        const matrix = new THREE.Matrix4();
        mesh.getMatrixAt(0, matrix);
        const scale = new THREE.Vector3();
        scale.setFromMatrixScale(matrix);

        console.log("Unit Scale:", scale);
        expect(scale.x).toBeGreaterThan(0.1);
        expect(scale.y).toBeGreaterThan(0.1);
        expect(scale.z).toBeGreaterThan(0.1);
    });
});

