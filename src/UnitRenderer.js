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

        // 2. Head (Hair/Helmet Volume)
        this.headMesh = new THREE.InstancedMesh(Unit.assets.geometries.head, Unit.assets.materials.hair, this.maxInstances);
        this.headMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.headMesh.frustumCulled = false;
        this.scene.add(this.headMesh);

        // 2.5 Face (Plane Overlay)
        this.faceMesh = new THREE.InstancedMesh(Unit.assets.geometries.facePlane, Unit.assets.materials.face, this.maxInstances);
        this.faceMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.faceMesh.frustumCulled = false;
        this.scene.add(this.faceMesh);

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
        if (!camera) return;

        if (!Unit.assets.initialized) {
            // throw new Error("UnitRenderer: Assets not initialized");
            // Just return for now, but log?
            console.error("UR: Assets Missing");
            return;
        }

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

        const colorNormal = new THREE.Color(0x654321); // Dark Brown (Restored)
        const colorHair = new THREE.Color(0xD4AF37);   // Golden/Blonde
        const colorSpecial = new THREE.Color(0x00008B); // Dark Blue (Darkened from 0x0000FF)
        const colorKnight = new THREE.Color(0xAAAAAA); // Silver
        const colorWizard = new THREE.Color(0x440088); // Purple
        const colorSkin = new THREE.Color(0xffccaa); // Match skin material

        for (const unit of units) {
            if (unit.isDead) continue;
            if (unit.isSleeping) continue;
            if (!unit.position) continue; // Safety if unit refactor incomplete

            // Determine Color
            let clothesColor = colorNormal;
            if (unit.role === 'knight') clothesColor = colorKnight;
            else if (unit.role === 'wizard') clothesColor = colorWizard;
            else if (unit.role === 'fisher') clothesColor = colorSpecial; // Blue
            else if (unit.role === 'hunter') clothesColor = new THREE.Color(0x006400); // Dark Green (Darkened from 0x228B22)
            else if (unit.role === 'worker') {
                if (unit.isSpecial) clothesColor = new THREE.Color(0x8B0000); // Special: Dark Red (Darkened from 0xFF3333)
                else clothesColor = colorNormal; // Normal: Dark Brown (Clothes)
            }

            // ... (Skipping cloning logic for replacement block context) ...

            // ... (Skipping loop context) ...



            // ROBUST SMART CLONING
            // Calculate which integer offsets (k) place the unit within the View Volume.
            // Formula: Camera - Radius <= Unit + k*W <= Camera + Radius
            // k*W >= Camera - Radius - Unit
            // k >= (Camera - Radius - Unit) / W
            // And k <= (Camera + Radius - Unit) / W

            const viewRadius = 60; // Reduced from 90 to Optimize (Map is often ~80, so 90 causing 5x5 overlap). 60 covers diagonal of screen.

            const minKx = Math.floor((camera.position.x - viewRadius - unit.position.x) / logicalW);
            const maxKx = Math.ceil((camera.position.x + viewRadius - unit.position.x) / logicalW);

            const minKz = Math.floor((camera.position.z - viewRadius - unit.position.z) / logicalD);
            const maxKz = Math.ceil((camera.position.z + viewRadius - unit.position.z) / logicalD);

            // Safety Clamp (prevent huge loops if math goes wild nearby very far coordinates)
            // Usually max - min is 0 or 1.

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    if (count >= this.maxInstances) break;

                    const osx = kx;
                    const osz = kz;
                    // Proceed to render...

                    // Base Position with Offset
                    const posX = unit.position.x + osx * logicalW;
                    const posZ = unit.position.z + osz * logicalD;
                    const posY = unit.position.y;
                    const rotY = unit.rotationY;

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
                    this.dummy.scale.set(1, 1, 1);

                    // Wizard Design Adjustment (User Request)
                    if (unit.role === 'wizard') {
                        // Half Height Head
                        this.dummy.scale.set(1, 0.5, 1);
                        // Correct Position:
                        // Original Geo Center y=0.6. Scaled becomes 0.3.
                        // We want bottom to match neck (~0.475). 
                        // New Height is 0.125 (was 0.25). 
                        // Base of head at 0.3 - 0.0625 = 0.2375.
                        // We need base at 0.475. Difference = +0.2375.
                        this.dummy.position.y += 0.2375;
                    }

                    this.dummy.updateMatrix();

                    // Head Mesh (Hair/Helmet)
                    this.headMesh.setMatrixAt(count, this.dummy.matrix);

                    // Face Overlay matches Head Transform
                    this.faceMesh.setMatrixAt(count, this.dummy.matrix);

                    // Knight Helmet (Tint Head Box ONLY)
                    if (unit.role === 'knight') {
                        this.headMesh.setColorAt(count, clothesColor); // Silver Body Color
                    } else {
                        // Normal Hair Color (Use explicit colorHair)
                        this.headMesh.setColorAt(count, colorHair);
                    }

                    // Face Material is separate -> No Tint (White)
                    this.faceMesh.setColorAt(count, new THREE.Color(0xFFFFFF));

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
                        this.dummy.rotateX(Math.PI / 2); // Point forward relative to arm?

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
                        this.dummy.rotateX(Math.PI / 2); // Point forward

                        this.dummy.updateMatrix();
                        this.staffMesh.setMatrixAt(staffCount, this.dummy.matrix);
                        this.staffMesh.setColorAt(staffCount, Unit.assets.materials.wood.color); // Force wood color?
                        staffCount++;

                        // Hat on Head
                        // Head pos: 0, 0.6, 0 (Base) -> Visual 0.6.
                        // Wizard Head Scaled 0.5 -> Top is at 0.6 relative to ground (was 0.725)
                        const hatYOffset = (unit.role === 'wizard') ? (0.625) : (0.75);
                        this.dummy.position.set(posX, posY + hatYOffset, posZ); // Sit on top of head
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
        }

        // Update Counts
        this.torsoMesh.count = count;
        this.headMesh.count = count;
        this.faceMesh.count = count;
        this.leftArmMesh.count = count;
        this.rightArmMesh.count = count;
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
        this.faceMesh.frustumCulled = false;
        this.leftArmMesh.frustumCulled = false;
        this.rightArmMesh.frustumCulled = false;
        this.leftLegMesh.frustumCulled = false;
        this.rightLegMesh.frustumCulled = false;

        // Mark all instance matrices as needing update
        if (this.torsoMesh.instanceColor) this.torsoMesh.instanceColor.needsUpdate = true;
        if (this.headMesh.instanceColor) this.headMesh.instanceColor.needsUpdate = true;
        if (this.faceMesh.instanceColor) this.faceMesh.instanceColor.needsUpdate = true;

        if (this.leftLegMesh.instanceColor) this.leftLegMesh.instanceColor.needsUpdate = true;
        if (this.rightLegMesh.instanceColor) this.rightLegMesh.instanceColor.needsUpdate = true;
        if (this.leftArmMesh.instanceColor) this.leftArmMesh.instanceColor.needsUpdate = true;
        if (this.rightArmMesh.instanceColor) this.rightArmMesh.instanceColor.needsUpdate = true;

        if (this.staffMesh.instanceColor) this.staffMesh.instanceColor.needsUpdate = true;

        // Commit Updates
        this.torsoMesh.instanceMatrix.needsUpdate = true;
        this.headMesh.instanceMatrix.needsUpdate = true;
        this.faceMesh.instanceMatrix.needsUpdate = true;
        this.leftArmMesh.instanceMatrix.needsUpdate = true;
        this.rightArmMesh.instanceMatrix.needsUpdate = true;
        this.leftLegMesh.instanceMatrix.needsUpdate = true;
        this.rightLegMesh.instanceMatrix.needsUpdate = true;

        this.swordMesh.instanceMatrix.needsUpdate = true;
        this.staffMesh.instanceMatrix.needsUpdate = true;
        this.hatMesh.instanceMatrix.needsUpdate = true;
        this.hatBrimMesh.instanceMatrix.needsUpdate = true;
    }
    dispose() {
        console.log("[UnitRenderer] Disposing...");
        const remove = (m) => {
            if (m) {
                this.scene.remove(m);
                if (m.geometry) m.geometry.dispose();
                // Material might be shared (Unit.assets) so don't dispose shared ones!
                // Only dispose local ones if any. whiteMaterial is local.
                // InstancedMesh clones material array? No.
            }
        };

        remove(this.torsoMesh);
        remove(this.headMesh);
        remove(this.faceMesh);
        remove(this.leftArmMesh);
        remove(this.rightArmMesh);
        remove(this.leftLegMesh);
        remove(this.rightLegMesh);
        remove(this.swordMesh);
        remove(this.staffMesh);
        remove(this.hatMesh);
        remove(this.hatBrimMesh);

        if (this.whiteMaterial) this.whiteMaterial.dispose();
    }
}
