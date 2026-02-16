import * as THREE from 'three';
import { GameConfig } from './config/GameConfig';

export class BaseEntityRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = maxInstances;

        this.dummy = new THREE.Object3D();
        this._scratchVector = new THREE.Vector3();
        this._scratchSphere = new THREE.Sphere(new THREE.Vector3(), 2.0);
        this._up = new THREE.Vector3(0, 1, 0);

        this.initialized = false;
    }

    createMesh(geo, mat, count) {
        if (!geo) {
            console.error("[BaseEntityRenderer] Geometry missing for mesh creation!");
            return null;
        }
        const m = new THREE.InstancedMesh(geo, mat, count || this.MAX_INSTANCES);
        m.count = 0; // Start hidden
        m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        m.frustumCulled = false; // Manually culled in update
        m.castShadow = true;
        m.receiveShadow = true;

        // Ensure bounding sphere is huge to prevent early culling by Three.js internal logic
        if (m.geometry && m.geometry.boundingSphere) {
            m.geometry.boundingSphere.radius = 100000;
        }

        this.scene.add(m);
        return m;
    }

    setClipping(mat) {
        if (mat) {
            mat.clippingPlanes = this.clippingPlanes;
            mat.clipShadows = true;
            mat.needsUpdate = true;
        }
    }

    updateMesh(m) {
        if (!m) return;
        if (m.instanceMatrix) m.instanceMatrix.needsUpdate = true;
        if (m.instanceColor) m.instanceColor.needsUpdate = true;
        m.visible = (m.count > 0);
    }

    /**
     * Common update logic for world-wrapping and frustum culling.
     * Subclasses must implement updateInstances(entity, instanceX, instanceY, instanceZ, rotY)
     */
    baseUpdate(entities, viewCenter) {
        if (!this.initialized || !entities || !viewCenter) return;

        const viewRadius = GameConfig.render?.viewRadius || 120;
        const logicalW = this.terrain.logicalWidth || 240;
        const logicalD = this.terrain.logicalDepth || 240;

        this.resetCounts();

        for (const entity of entities) {
            if (entity.isDead || entity.isFinished) continue;

            const rotY = (entity.rotationY !== undefined) ? entity.rotationY : 0;
            const posX = entity.position.x;
            const posY = entity.position.y;
            const posZ = entity.position.z;

            // Wrapping Loops
            const minKx = Math.floor((viewCenter.x - viewRadius - posX) / logicalW);
            const maxKx = Math.ceil((viewCenter.x + viewRadius - posX) / logicalW);
            const minKz = Math.floor((viewCenter.z - viewRadius - posZ) / logicalD);
            const maxKz = Math.ceil((viewCenter.z + viewRadius - posZ) / logicalD);

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    const instanceX = posX + kx * logicalW;
                    const instanceZ = posZ + kz * logicalD;

                    const dx = Math.abs(instanceX - viewCenter.x);
                    const dz = Math.abs(instanceZ - viewCenter.z);

                    // Square Frustum Buffer Culling
                    if (dx > viewRadius + 2.0 || dz > viewRadius + 2.0) continue;

                    this.updateInstances(entity, instanceX, posY, instanceZ, rotY);

                    if (this.isExhausted()) break;
                }
                if (this.isExhausted()) break;
            }
        }

        this.commitUpdates();
    }

    // Abstract-like methods to be overridden by subclasses
    resetCounts() { }
    updateInstances(entity, x, y, z, rot) { }
    isExhausted() { return false; }
    commitUpdates() { }
}
