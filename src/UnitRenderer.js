import * as THREE from 'three';
import { Unit } from './Unit.js';

export class UnitRenderer {
    constructor(scene, terrain, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];

        Unit.initAssets(); // Ensure shared assets are ready

        // Apply Clipping Planes to Shared Materials
        // This affects ALL units globally, which is what we want.
        const mats = Unit.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat) mat.clippingPlanes = this.clippingPlanes;
        });
        if (mats.heads) {
            mats.heads.forEach(h => h.clippingPlanes = this.clippingPlanes);
        }

        // Buffer size: 200 units * 9 clones = 1800. 
        // Let's safe-guard with 2500.
        this.maxInstances = 2500;
        this.dummy = new THREE.Object3D();

        // --- Materials ---
        // We use a white material for tinting Clothes (Normal vs Special)
        this.whiteMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            clippingPlanes: this.clippingPlanes
        });
        this.skinMaterial = Unit.assets.materials.limb;
        this.headMaterials = Unit.assets.materials.heads;

        // --- Instanced Meshes ---

        // 1. Torso
        this.torsoMesh = new THREE.InstancedMesh(Unit.assets.geometries.torso, this.whiteMaterial, this.maxInstances);
        this.torsoMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.torsoMesh.frustumCulled = false; // We handle culling manually
        this.scene.add(this.torsoMesh);

        // 2. Head
        this.headMesh = new THREE.InstancedMesh(Unit.assets.geometries.head, this.headMaterials, this.maxInstances);
        this.headMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.headMesh.frustumCulled = false;
        this.scene.add(this.headMesh);

        // 3. Left Arm
        this.leftArmMesh = new THREE.InstancedMesh(Unit.assets.geometries.arm, this.skinMaterial, this.maxInstances);
        this.leftArmMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.leftArmMesh.frustumCulled = false;
        this.scene.add(this.leftArmMesh);

        // 4. Right Arm
        this.rightArmMesh = new THREE.InstancedMesh(Unit.assets.geometries.arm, this.skinMaterial, this.maxInstances);
        this.rightArmMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.rightArmMesh.frustumCulled = false;
        this.scene.add(this.rightArmMesh);

        // 5. Left Leg
        this.leftLegMesh = new THREE.InstancedMesh(Unit.assets.geometries.leg, this.whiteMaterial, this.maxInstances);
        this.leftLegMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.leftLegMesh.frustumCulled = false;
        this.scene.add(this.leftLegMesh);

        // 6. Right Leg
        this.rightLegMesh = new THREE.InstancedMesh(Unit.assets.geometries.leg, this.whiteMaterial, this.maxInstances);
        this.rightLegMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.rightLegMesh.frustumCulled = false;
        this.scene.add(this.rightLegMesh);

        // Optimization: Scratch objects
        this._scratchVector = new THREE.Vector3();
        this._scratchSphere = new THREE.Sphere(new THREE.Vector3(), 1.0);
        this._up = new THREE.Vector3(0, 1, 0);
        this._neighborOffsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];
    }

    update(units, frustum) {
        if (!Unit.assets.initialized) return;

        let count = 0;
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        const margin = 5;

        // Debug: Check if we are rendering
        if (units.length > 0 && Math.random() < 0.01) {
            // console.log(`UnitRenderer: Total Units: ${units.length}`);
        }

        const colorNormal = new THREE.Color(0x8B4513);
        const colorSpecial = new THREE.Color(0x0000FF);

        for (const unit of units) {
            if (unit.isDead && unit.isFinished) continue;
            if (unit.isSleeping) continue;
            if (!unit.position) continue; // Safety if unit refactor incomplete

            // Determine offsets (Clone Logic)
            const nearEdgeX = (unit.gridX < margin) || (unit.gridX > logicalW - margin);
            const nearEdgeZ = (unit.gridZ < margin) || (unit.gridZ > logicalD - margin);

            const loopCount = (nearEdgeX || nearEdgeZ) ? 9 : 1;
            const clothesColor = unit.isSpecial ? colorSpecial : colorNormal;

            for (let i = 0; i < loopCount; i++) {
                if (count >= this.maxInstances) break;

                let osx = 0;
                let osz = 0;

                if (i > 0) {
                    const off = this._neighborOffsets[i - 1];
                    osx = off.x;
                    osz = off.z;
                }

                // Base Position with Offset
                const posX = unit.position.x + osx * logicalW;
                const posZ = unit.position.z + osz * logicalD;
                const posY = unit.position.y;
                const rotY = unit.rotationY;

                // FRUSTUM CULLING (Allocation Free)
                if (frustum) {
                    this._scratchVector.set(posX, posY + 0.5, posZ);
                    this._scratchSphere.center.copy(this._scratchVector);
                    if (!frustum.intersectsSphere(this._scratchSphere)) continue;
                }

                // 1. Torso
                this.dummy.position.set(posX, posY + 0.4, posZ);
                this.dummy.rotation.set(0, rotY, 0);
                this.dummy.scale.set(1, 1, 1);
                this.dummy.updateMatrix();
                this.torsoMesh.setMatrixAt(count, this.dummy.matrix);
                this.torsoMesh.setColorAt(count, clothesColor);

                // 2. Head
                this.dummy.position.set(posX, posY + 0.7, posZ);
                this.dummy.rotation.set(0, rotY, 0);
                this.dummy.updateMatrix();
                this.headMesh.setMatrixAt(count, this.dummy.matrix);

                // 3. Left Arm
                // Relative to body: (0.2, 0.4, 0)
                this.dummy.position.set(0.2, 0.4, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ)); // Recycle scratchVector for position add

                this.dummy.rotation.set(unit.limbs.leftArm.x, rotY, 0);
                this.dummy.updateMatrix();
                this.leftArmMesh.setMatrixAt(count, this.dummy.matrix);

                // 4. Right Arm
                this.dummy.position.set(-0.2, 0.4, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
                this.dummy.updateMatrix();
                this.rightArmMesh.setMatrixAt(count, this.dummy.matrix);

                // 5. Left Leg
                this.dummy.position.set(0.1, 0.15, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                this.dummy.rotation.set(unit.limbs.leftLeg.x, rotY, 0);
                this.dummy.updateMatrix();
                this.leftLegMesh.setMatrixAt(count, this.dummy.matrix);
                this.leftLegMesh.setColorAt(count, clothesColor);

                // 6. Right Leg
                this.dummy.position.set(-0.1, 0.15, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                this.dummy.rotation.set(unit.limbs.rightLeg.x, rotY, 0);
                this.dummy.updateMatrix();
                this.rightLegMesh.setMatrixAt(count, this.dummy.matrix);
                this.rightLegMesh.setColorAt(count, clothesColor);

                count++;
            }
        }

        // Update Counts
        this.torsoMesh.count = count;
        this.headMesh.count = count;
        this.leftArmMesh.count = count;
        this.rightArmMesh.count = count;
        this.leftLegMesh.count = count;
        this.rightLegMesh.count = count;
        this.leftLegMesh.instanceColor.needsUpdate = true;
        this.rightLegMesh.instanceColor.needsUpdate = true;

        // Commit Updates
        this.torsoMesh.instanceMatrix.needsUpdate = true;
        this.torsoMesh.instanceColor.needsUpdate = true;
        this.headMesh.instanceMatrix.needsUpdate = true;
        this.leftArmMesh.instanceMatrix.needsUpdate = true;
        this.rightArmMesh.instanceMatrix.needsUpdate = true;
        this.leftLegMesh.instanceMatrix.needsUpdate = true;
        this.rightLegMesh.instanceMatrix.needsUpdate = true;
    }
}
