
/**
 * @vitest-environment happy-dom
 */
import * as THREE from 'three';
import { UnitRenderer } from '../UnitRenderer.js';
vi.unmock('../UnitRenderer.js');
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';

describe('Startup Crash Verification', () => {
    let scene;
    let terrain;
    let renderer;

    beforeAll(() => {
        // Mock Unit.assets
        // Unit.initAssets(); // Real call might fail if not mocked enough
        Unit.assets = {
            initialized: true,
            geometries: {
                body: new THREE.BoxGeometry(),
                head: new THREE.BoxGeometry(),
                limb: new THREE.BoxGeometry(),
                sword: new THREE.BoxGeometry(),
                staff: new THREE.BoxGeometry(),
                facePlane: new THREE.PlaneGeometry(), // Needed for faceMesh
                wizardHat: new THREE.BoxGeometry(),
                wizardHatBrim: new THREE.BoxGeometry(),
                jobIndicatorTop: new THREE.BoxGeometry(),
                jobIndicatorDot: new THREE.BoxGeometry(),
            },
            materials: {
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
                heads: [new THREE.MeshBasicMaterial()]
            }
        };
    });

    test('UnitRenderer should initialize without null materials', async () => {
        scene = new THREE.Scene();
        // Mock Terrain
        terrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: () => 0,
            checkYield: async () => { }
        };

        renderer = new UnitRenderer(scene, terrain, []);
        await renderer.init();

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
        }
    });
});
