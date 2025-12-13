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
        // With higher population (spawn threshold 10), we need much more.
        // Buffer size: 10000 units * 9 clones = 90000? No, maxInstances is total instances.
        // We need to support dense populations.
        // Let's go to 50000 instances (Supports ~5500 active units)
        this.maxInstances = 50000;
        this.dummy = new THREE.Object3D();

        // --- Materials ---
        // We use a white material for tinting Clothes (Normal vs Special)
        this.whiteMaterial = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            clippingPlanes: this.clippingPlanes
        });
        this.skinMaterial = Unit.assets.materials.skin;
        this.headMaterials = Unit.assets.materials.heads;

        // --- Instanced Meshes ---

        // 1. Torso
        this.torsoMesh = new THREE.InstancedMesh(Unit.assets.geometries.body, this.whiteMaterial, this.maxInstances);
        this.torsoMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.torsoMesh.frustumCulled = false; // We handle culling manually
        this.scene.add(this.torsoMesh);

        // 2. Head
        this.headMesh = new THREE.InstancedMesh(Unit.assets.geometries.head, this.headMaterials, this.maxInstances);
        this.headMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.headMesh.frustumCulled = false;
        this.scene.add(this.headMesh);

        // 3. Left Arm
        this.leftArmMesh = new THREE.InstancedMesh(Unit.assets.geometries.limb, this.skinMaterial, this.maxInstances);
        this.leftArmMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.leftArmMesh.frustumCulled = false;
        this.scene.add(this.leftArmMesh);

        // 4. Right Arm
        this.rightArmMesh = new THREE.InstancedMesh(Unit.assets.geometries.limb, this.skinMaterial, this.maxInstances);
        this.rightArmMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.rightArmMesh.frustumCulled = false;
        this.scene.add(this.rightArmMesh);

        // 5. Left Leg
        this.leftLegMesh = new THREE.InstancedMesh(Unit.assets.geometries.limb, this.whiteMaterial, this.maxInstances);
        this.leftLegMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.leftLegMesh.frustumCulled = false;
        this.scene.add(this.leftLegMesh);

        // 6. Right Leg
        this.rightLegMesh = new THREE.InstancedMesh(Unit.assets.geometries.limb, this.whiteMaterial, this.maxInstances);
        this.rightLegMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.rightLegMesh.frustumCulled = false;
        this.scene.add(this.rightLegMesh);

        // --- Accessories ---

        // 7. Sword (Knight)
        this.swordMesh = new THREE.InstancedMesh(Unit.assets.geometries.sword, Unit.assets.materials.metal, this.maxInstances);
        this.swordMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.swordMesh.frustumCulled = false;
        this.scene.add(this.swordMesh);

        // 8. Staff (Wizard)
        this.staffMesh = new THREE.InstancedMesh(Unit.assets.geometries.staff, Unit.assets.materials.wood, this.maxInstances);
        this.staffMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.staffMesh.frustumCulled = false;
        this.scene.add(this.staffMesh);

        // 9. Wizard Hat Cone
        this.hatMesh = new THREE.InstancedMesh(Unit.assets.geometries.wizardHat, Unit.assets.materials.wizardHat, this.maxInstances);
        this.hatMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.hatMesh.frustumCulled = false;
        this.scene.add(this.hatMesh);

        // 10. Wizard Hat Brim
        this.hatBrimMesh = new THREE.InstancedMesh(Unit.assets.geometries.wizardHatBrim, Unit.assets.materials.wizardHat, this.maxInstances);
        this.hatBrimMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.hatBrimMesh.frustumCulled = false;
        this.scene.add(this.hatBrimMesh);

        // Optimization: Scratch objects
        this._scratchVector = new THREE.Vector3();
        this._scratchSphere = new THREE.Sphere(new THREE.Vector3(), 2.0); // Increased radius for 1.5x scale units
        this._up = new THREE.Vector3(0, 1, 0);
        this._neighborOffsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];
    }

    update(units, frustum, camera) {
        if (!Unit.assets.initialized) return;

        let count = 0;
        let swordCount = 0;
        let staffCount = 0;
        let hatCount = 0;
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        const margin = 5;

        // Base Offset (Infinite Scroll)
        let baseGridX = 0;
        let baseGridZ = 0;
        if (camera) {
            baseGridX = Math.round(camera.position.x / logicalW);
            baseGridZ = Math.round(camera.position.z / logicalD);
        }

        // Debug: Check if we are rendering
        if (units.length > 0 && Math.random() < 0.01) {
            // console.log(`UnitRenderer: Total Units: ${units.length}`);
        }

        const colorNormal = new THREE.Color(0x8B4513);
        const colorSpecial = new THREE.Color(0x0000FF);
        const colorKnight = new THREE.Color(0xAAAAAA); // Silver
        const colorWizard = new THREE.Color(0x440088); // Purple
        const colorSkin = new THREE.Color(0xffccaa); // Match skin material

        for (const unit of units) {
            if (unit.isDead) continue;
            if (unit.isSleeping) continue;
            if (!unit.position) continue; // Safety if unit refactor incomplete

            // Determine offsets (Clone Logic)
            // Was: const nearEdgeX = ...
            // Fix: Always loop 9 times to ensure clones are visible in infinite scroll.
            // Frustum culling (L137) will prevents performance drop for off-screen clones.
            const loopCount = 9;
            let clothesColor = colorNormal;
            if (unit.isSpecial) clothesColor = colorSpecial;
            if (unit.role === 'knight') clothesColor = colorKnight;
            if (unit.role === 'wizard') clothesColor = colorWizard;

            for (let i = 0; i < loopCount; i++) {
                if (count >= this.maxInstances) break;

                let osx = 0;
                let osz = 0;

                if (i > 0) {
                    const off = this._neighborOffsets[i - 1];
                    osx = off.x;
                    osz = off.z;
                }

                // Apply Base Shift
                osx += baseGridX;
                osz += baseGridZ;

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

                // 1. Torso (Body)
                // Cute Geo: Translated 0.3. 
                // Place Dummy at Base (0) -> Visual: 0.125 to 0.475
                this.dummy.position.set(posX, posY, posZ);
                this.dummy.rotation.set(0, rotY, 0);
                this.dummy.scale.set(1, 1, 1);
                this.dummy.updateMatrix();
                this.torsoMesh.setMatrixAt(count, this.dummy.matrix);
                this.torsoMesh.setColorAt(count, clothesColor);

                // 2. Head
                // Cute Geo: Translated 0.6.
                // Place Dummy at Base (0) -> Visual: 0.475 to 0.725
                this.dummy.position.set(posX, posY, posZ);
                this.dummy.rotation.set(0, rotY, 0);
                this.dummy.updateMatrix();
                this.headMesh.setMatrixAt(count, this.dummy.matrix);

                // 3. Left Arm
                // Shoulder Height: ~0.45 (Near top of body)
                // Offset X: 0.18 (Body width 0.3 -> half 0.15. Arm just outside)
                this.dummy.position.set(0.18, 0.45, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                this.dummy.rotation.set(unit.limbs.leftArm.x, rotY, 0);
                this.dummy.updateMatrix();
                this.leftArmMesh.setMatrixAt(count, this.dummy.matrix);
                this.leftArmMesh.setColorAt(count, colorSkin);

                // 4. Right Arm
                this.dummy.position.set(-0.18, 0.45, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
                this.dummy.updateMatrix();
                this.rightArmMesh.setMatrixAt(count, this.dummy.matrix);
                this.rightArmMesh.setColorAt(count, colorSkin);

                // 5. Left Leg
                // Hip Height: ~0.25 (Legs hang down from here)
                // Offset X: 0.08
                this.dummy.position.set(0.08, 0.25, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                this.dummy.rotation.set(unit.limbs.leftLeg.x, rotY, 0);
                this.dummy.updateMatrix();
                this.leftLegMesh.setMatrixAt(count, this.dummy.matrix);
                this.leftLegMesh.setColorAt(count, clothesColor);

                // 6. Right Leg
                this.dummy.position.set(-0.08, 0.25, 0);
                this.dummy.position.applyAxisAngle(this._up, rotY);
                this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                this.dummy.rotation.set(unit.limbs.rightLeg.x, rotY, 0);
                this.dummy.updateMatrix();
                this.rightLegMesh.setMatrixAt(count, this.dummy.matrix);
                this.rightLegMesh.setColorAt(count, clothesColor);

                // --- Accessories Rendering ---

                // Knight Sword
                if (unit.role === 'knight') {
                    // Attach to Right Arm
                    // Re-calculate Right Arm pos
                    this.dummy.position.set(-0.18, 0.45, 0); // Shoulder
                    this.dummy.position.applyAxisAngle(this._up, rotY);
                    this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                    // Rotation should follow arm but maybe angled out?
                    // Arm rot is (unit.limbs.rightArm.x, rotY, 0)
                    // We want sword to stick out or be held.
                    // Simple: Match arm rotation + offset to be in "hand"
                    this.dummy.rotation.set(unit.limbs.rightArm.x + Math.PI / 2, rotY, 0); // Point forward?
                    // Actually swordGeo handles at bottom (0.25 up). 
                    // If arm is down (0), sword points forward? No, if arm down, sword down.
                    // If arm x=0, sword points down?
                    // BoxGeo defaults Y aligned.
                    // Let's try matching arm X.
                    this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);

                    // Offset to Hand (Arm length 0.25, origin at top. Hand is at -0.25 local Y?)
                    // Arm Geo origin is top (-0.1 y translate). Length 0.25. 
                    // Hand is roughly -0.2 y local.
                    this.dummy.translateY(-0.25);
                    // Rotate sword to point forward/up?
                    this.dummy.rotateX(-Math.PI / 2); // Point forward relative to arm?

                    this.dummy.updateMatrix();
                    this.swordMesh.setMatrixAt(swordCount, this.dummy.matrix);
                    swordCount++;
                }

                // Wizard Staff
                if (unit.role === 'wizard') {
                    // Right Arm
                    this.dummy.position.set(-0.18, 0.45, 0);
                    this.dummy.position.applyAxisAngle(this._up, rotY);
                    this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                    this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
                    this.dummy.translateY(-0.25); // Hand
                    // Staff is held upright?
                    // Staff Geo center held.
                    this.dummy.rotateX(-Math.PI / 2); // Vertical relative to ground? 
                    // If Arm is swinging, Staff swings.
                    // Let's just match arm rotation but offset angle.

                    this.dummy.updateMatrix();
                    this.staffMesh.setMatrixAt(staffCount, this.dummy.matrix);
                    this.staffMesh.setColorAt(staffCount, Unit.assets.materials.wood.color); // Force wood color?
                    staffCount++;

                    // Hat on Head
                    // Head pos: 0, 0.6, 0 (Base) -> Visual 0.6.
                    this.dummy.position.set(posX, posY + 0.6 + 0.15, posZ); // Sit on top of head (0.25 size)
                    this.dummy.rotation.set(0, rotY, 0);
                    this.dummy.scale.set(1, 1, 1);
                    this.dummy.updateMatrix();

                    this.hatMesh.setMatrixAt(hatCount, this.dummy.matrix);
                    this.hatBrimMesh.setMatrixAt(hatCount, this.dummy.matrix);
                    hatCount++;
                }

                count++;
            }
        }

        // Update Counts
        // Update Counts
        this.torsoMesh.count = count;
        this.headMesh.count = count;
        this.leftArmMesh.count = count;
        this.rightArmMesh.count = count;
        this.leftLegMesh.count = count;
        this.leftLegMesh.count = count;
        this.rightLegMesh.count = count;

        this.swordMesh.count = swordCount;
        this.staffMesh.count = staffCount;
        this.hatMesh.count = hatCount;
        this.hatBrimMesh.count = hatCount;

        // Disable auto frustum culling to prevent bounding sphere issues
        // We handle culling manually above
        this.torsoMesh.frustumCulled = false;
        this.headMesh.frustumCulled = false;
        this.leftArmMesh.frustumCulled = false;
        this.rightArmMesh.frustumCulled = false;
        this.leftLegMesh.frustumCulled = false;
        this.rightLegMesh.frustumCulled = false;
        this.rightArmMesh.count = count;
        this.leftLegMesh.count = count;
        this.rightLegMesh.count = count;
        if (this.leftLegMesh.instanceColor) this.leftLegMesh.instanceColor.needsUpdate = true;
        if (this.rightLegMesh.instanceColor) this.rightLegMesh.instanceColor.needsUpdate = true;
        if (this.leftArmMesh.instanceColor) this.leftArmMesh.instanceColor.needsUpdate = true;
        if (this.rightArmMesh.instanceColor) this.rightArmMesh.instanceColor.needsUpdate = true;

        // Commit Updates
        this.torsoMesh.instanceMatrix.needsUpdate = true;
        if (this.torsoMesh.instanceColor) this.torsoMesh.instanceColor.needsUpdate = true;
        this.headMesh.instanceMatrix.needsUpdate = true;
        this.leftArmMesh.instanceMatrix.needsUpdate = true;
        this.rightArmMesh.instanceMatrix.needsUpdate = true;
        this.leftLegMesh.instanceMatrix.needsUpdate = true;
        this.rightLegMesh.instanceMatrix.needsUpdate = true;

        this.swordMesh.instanceMatrix.needsUpdate = true;
        this.staffMesh.instanceMatrix.needsUpdate = true;
        if (this.staffMesh.instanceColor) this.staffMesh.instanceColor.needsUpdate = true; // Added color
        this.hatMesh.instanceMatrix.needsUpdate = true;
        this.hatBrimMesh.instanceMatrix.needsUpdate = true;
    }
}
