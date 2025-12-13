
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UnitRenderer } from '../UnitRenderer.js';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

// Mock Three.js
global.THREE = THREE;
if (!global.window) global.window = {};

describe('UnitRenderer Error Reproduction', () => {
    let mockScene;
    let unitRenderer;
    let mockTerrain;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        mockTerrain = {
            logicalWidth: 100, logicalDepth: 100
        };

        // Mock Assets
        Unit.assets = {
            initialized: true,
            geometries: {
                sword: new THREE.BoxGeometry(),
                staff: new THREE.BoxGeometry(),
                wizardHat: new THREE.ConeGeometry(),
                wizardHatBrim: new THREE.CylinderGeometry()
            },
            materials: {
                metal: new THREE.MeshBasicMaterial(),
                wood: new THREE.MeshBasicMaterial(),
                wizardHat: new THREE.MeshBasicMaterial()
            },
            bodyGeo: new THREE.BoxGeometry(),
            headGeo: new THREE.BoxGeometry(),
            limbGeo: new THREE.BoxGeometry(),
            materials: {
                skin: new THREE.MeshBasicMaterial(),
                clothes: new THREE.MeshBasicMaterial()
            }
        };

        unitRenderer = new UnitRenderer(mockScene, mockTerrain);
    });

    it('should not throw when updating with no units (empty loop)', () => {
        const units = [];
        // This should pass if checked
        expect(() => unitRenderer.update(units, null, null)).not.toThrow();
    });

    it('should not throw when updating with non-wizards (staffColor undefined)', () => {
        const knight = {
            role: 'knight',
            position: new THREE.Vector3(0, 0, 0),
            limbs: { rightLeg: { x: 0 }, leftLeg: { x: 0 }, rightArm: { x: 0 }, leftArm: { x: 0 }, head: { y: 0 } }
        };
        const units = [knight];

        // This triggers "staffMesh.instanceColor.needsUpdate = true" at end of update
        // If staffMesh has no instanceColor (because setColorAt never called?), it throws.
        expect(() => unitRenderer.update(units, null, null)).not.toThrow();
    });
});
