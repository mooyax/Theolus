import * as THREE from 'three';
import { Unit } from './Unit.js';

export class UnitRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 2000) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.maxInstances = maxInstances;

        this.dummy = new THREE.Object3D();

        // Initialize Instanced Meshes
        // We defer this slightly to ensure Unit assets are ready? 
        // Or assume Unit.initAssets called by Game.js
        Unit.initAssets();

        // Helper to create meshes
        const createMesh = (geo, mat) => {
            const m = new THREE.InstancedMesh(geo, mat, this.maxInstances);
            m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            m.frustumCulled = false; // Manually culled
            m.castShadow = true;
            m.receiveShadow = true;
            this.scene.add(m);
            return m;
        };

        // Shared White Material for Tinting
        this.whiteMat = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1.0,
            clippingPlanes: this.clippingPlanes
        });

        // Apply clipping to Shared Assets Materials
        // Apply clipping to Shared Assets Materials EXPLICITLY
        // The loop below might fail if keys are missing or structure is weird.
        // We list known materials used by Renderer.
        const setClip = (mat) => {
            if (mat) {
                mat.clippingPlanes = this.clippingPlanes;
                mat.needsUpdate = true;
            }
        };

        setClip(Unit.assets.materials.face);
        setClip(Unit.assets.materials.metal);
        setClip(Unit.assets.materials.wood);
        setClip(Unit.assets.materials.wizardHat);
        setClip(Unit.assets.materials.redIndicator);
        setClip(Unit.assets.materials.armor); // Just in case
        setClip(Unit.assets.materials.helmet);
        setClip(Unit.assets.materials.robe);

        // Apply clipping to shared materials EXPLICITLY for Goblin assets
        // This assumes Goblin.assets.materials exists and is initialized
        // (e.g., by Goblin.initAssets() in Game.js)
        // setClip(Goblin.assets.materials.club);
        // setClip(Goblin.assets.materials.staff);
        // setClip(Goblin.assets.materials.face);
        // setClip(Goblin.assets.materials.cross); // If used

        // Also keep the generic loop as fallback/safety for future mats
        const mats = Unit.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat && (mat.isMaterial || Array.isArray(mat))) {
                const materialList = Array.isArray(mat) ? mat : [mat];
                materialList.forEach(m => {
                    m.clippingPlanes = this.clippingPlanes;
                    m.needsUpdate = true;
                });
            }
        });

        // 1. Torso
        this.torsoMesh = createMesh(Unit.assets.geometries.body, this.whiteMat);

        // 2. Head
        this.headMesh = createMesh(Unit.assets.geometries.head, this.whiteMat);

        // 3. Face (Keep existing logic, usually texture)
        this.faceMesh = createMesh(Unit.assets.geometries.facePlane, Unit.assets.materials.face);

        // 4. Arms
        this.leftArmMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);
        this.rightArmMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);

        // 5. Legs
        this.leftLegMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);
        this.rightLegMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);

        // 6. Knight Sword
        this.swordMesh = createMesh(Unit.assets.geometries.sword, Unit.assets.materials.metal);

        // 7. Knight Visor (NEW - Ingenuity!)
        this.visorMesh = createMesh(Unit.assets.geometries.head, this.whiteMat);

        // 8. Wizard Staff
        this.staffMesh = createMesh(Unit.assets.geometries.staff, Unit.assets.materials.wood);

        // 9. Wizard Hat Cone
        this.hatMesh = createMesh(Unit.assets.geometries.wizardHat, Unit.assets.materials.wizardHat);

        // 10. Wizard Hat Brim
        this.hatBrimMesh = createMesh(Unit.assets.geometries.wizardHatBrim, Unit.assets.materials.wizardHat);

        // 11. Job Indicator Top
        this.indicatorTopMesh = createMesh(Unit.assets.geometries.jobIndicatorTop, Unit.assets.materials.redIndicator);

        // 12. Job Indicator Dot
        this.indicatorDotMesh = createMesh(Unit.assets.geometries.jobIndicatorDot, Unit.assets.materials.redIndicator);

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

    update(units, frustum, viewCenter) {
        if (!viewCenter) return;

        if (!Unit.assets.initialized) {
            // throw new Error("UnitRenderer: Assets not initialized");
            // Just return for now, but log?
            console.error("UR: Assets Missing");
            return;
        }

        let count = 0;
        let swordCount = 0;
        let visorCount = 0;
        let staffCount = 0;
        let hatCount = 0;
        let indicatorCount = 0;
        const logicalW = this.terrain.logicalWidth || 240;
        const logicalD = this.terrain.logicalDepth || 240;
        const margin = 5;

        // Base Offset (Infinite Scroll)
        // Unit positions are absolute in world space? No, terrain wraps?
        // Terrain logic: unit.position is absolute?
        // In Game.js, "Wraparound logic" updates unit.position.
        // So unit.position is always within 0..LogicW?
        // If so, we render clones around it.

        // Debug: Check if we are rendering
        if (units.length > 0 && Math.random() < 0.01) {
            // console.log(`UnitRenderer: Total Units: ${units.length}`);
        }

        const colorNormal = new THREE.Color(0x654321); // Dark Brown (Restored)
        const colorHair = new THREE.Color(0xD4AF37);   // Golden/Blonde
        const colorSpecial = new THREE.Color(0x00008B); // Dark Blue (Darkened from 0x0000FF)
        const colorKnight = new THREE.Color(0x999999); // Mid Grey (User Request)
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

            // ROBUST SMART CLONING
            // Calculate which integer offsets (k) place the unit within the View Volume.
            const viewRadius = 120; // Expanded from 80 to match Game.js 120

            const minKx = Math.floor((viewCenter.x - viewRadius - unit.position.x) / logicalW);
            const maxKx = Math.ceil((viewCenter.x + viewRadius - unit.position.x) / logicalW);

            const minKz = Math.floor((viewCenter.z - viewRadius - unit.position.z) / logicalD);
            const maxKz = Math.ceil((viewCenter.z + viewRadius - unit.position.z) / logicalD);

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    if (count >= this.maxInstances) break;

                    const osx = kx;
                    const osz = kz;

                    // Base Position with Offset
                    const posX = unit.position.x + osx * logicalW;
                    const posZ = unit.position.z + osz * logicalD;
                    const posY = unit.position.y;
                    const rotY = unit.rotationY;

                    // 1. Torso (Body)
                    // Cute Geo: Translated 0.3. 
                    this.dummy.position.set(posX, posY, posZ);
                    this.dummy.rotation.set(0, rotY, 0);
                    this.dummy.scale.set(1, 1, 1);
                    this.dummy.updateMatrix();
                    this.torsoMesh.setMatrixAt(count, this.dummy.matrix);
                    this.torsoMesh.setColorAt(count, clothesColor);

                    // 2. Head
                    // Cute Geo: Translated 0.6.
                    this.dummy.position.set(posX, posY, posZ);
                    this.dummy.rotation.set(0, rotY, 0);
                    this.dummy.scale.set(1, 1, 1);

                    // Wizard Design Adjustment (User Request)
                    let headScaleY = 1.0;
                    if (unit.role === 'wizard') {
                        // Half Height Head
                        headScaleY = 0.5;
                        this.dummy.scale.set(1, headScaleY, 1);
                        // Correct Position:
                        // Original Geo Top 0.725, Bottom 0.475. Center 0.6.
                        // Scaled (0.5 y): Center 0.3. Top 0.3625. Bottom 0.2375.
                        // We want Base at 0.475 (Neck).
                        // Shift = 0.475 - 0.2375 = +0.2375.
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

                    // --- Knight Visor (New) ---
                    if (unit.role === 'knight') {
                        this.dummy.position.set(posX, posY, posZ);
                        this.dummy.rotation.set(0, rotY, 0);
                        // Visor Band: Slightly wider than head, thin height
                        // Head is 0.25 cubed (geo). Scale 1=0.25.
                        // We want 1.1x Width, 0.2x Height.
                        this.dummy.scale.set(1.1, 0.2, 1.1);
                        // Position: Eye level.
                        // Head Center 0.6 (Visually). Eyes ~0.65?
                        // Let's place it at 0.65 -> Translate dummy! (headGeo is at 0.6 implicitly)
                        // If we scale Y by 0.2, pivot (0.6) becomes 0.12.
                        // We want visual center at 0.65. Shift +0.53.
                        // Wait, easier: `headGeo` translated 0.6.
                        // If we render at 0,0,0, mesh is at 0.6.
                        // If scale 0.2 Y, mesh is at 0.12.
                        // We want mesh at 0.65. Delta = 0.53.
                        this.dummy.position.y += 0.53;

                        this.dummy.updateMatrix();
                        this.visorMesh.setMatrixAt(visorCount, this.dummy.matrix);
                        this.visorMesh.setColorAt(visorCount, new THREE.Color(0x999999)); // Silver/Grey Visor (User Request)
                        visorCount++;
                    }

                    // 3. Left Arm
                    this.dummy.position.set(0.18, 0.45, 0);
                    this.dummy.position.applyAxisAngle(this._up, rotY);
                    this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                    this.dummy.rotation.set(unit.limbs.leftArm.x, rotY, 0);

                    // Wizard Arm Adjustment (Lengthen)
                    if (unit.role === 'wizard') {
                        this.dummy.scale.set(1, 1.25, 1);
                        this.dummy.translateY(-0.035);
                    } else {
                        this.dummy.scale.set(1, 1, 1);
                    }

                    this.dummy.updateMatrix();
                    this.leftArmMesh.setMatrixAt(count, this.dummy.matrix);
                    this.leftArmMesh.setColorAt(count, colorSkin);

                    // 4. Right Arm
                    this.dummy.position.set(-0.18, 0.45, 0);
                    this.dummy.position.applyAxisAngle(this._up, rotY);
                    this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                    this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);

                    // Wizard Arm Adjustment (Lengthen)
                    if (unit.role === 'wizard') {
                        this.dummy.scale.set(1, 1.25, 1); // 25% Longer
                        this.dummy.translateY(-0.035);
                    } else {
                        this.dummy.scale.set(1, 1, 1);
                    }

                    this.dummy.updateMatrix();
                    this.rightArmMesh.setMatrixAt(count, this.dummy.matrix);
                    this.rightArmMesh.setColorAt(count, colorSkin);

                    // 5. Left Leg
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
                        this.dummy.position.set(-0.18, 0.45, 0); // Shoulder
                        this.dummy.position.applyAxisAngle(this._up, rotY);
                        this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));
                        this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
                        this.dummy.translateY(-0.25);
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
                        // FIXED: Adjusted Offset to prevent floating (User Request)
                        // Head Top estimated at 0.3625 (after 0.5 scale of 0.725 high head).
                        const hatYOffset = 0.60; // Slightly higher than 0.55
                        this.dummy.position.set(posX, posY + hatYOffset, posZ); // Sit on top of head
                        this.dummy.rotation.set(0, rotY, 0);
                        this.dummy.scale.set(1, 1, 1);
                        this.dummy.updateMatrix();

                        this.hatMesh.setMatrixAt(hatCount, this.dummy.matrix);
                        this.hatBrimMesh.setMatrixAt(hatCount, this.dummy.matrix);
                        hatCount++;
                    }

                    // 11. Job Indicator (!)
                    if (unit.targetRequest) {
                        const floatY = Math.sin(Date.now() * 0.005) * 0.1;
                        this.dummy.position.set(posX, posY + 1.2 + floatY, posZ);
                        this.dummy.rotation.set(0, rotY, 0); // Face with unit, or could be static
                        this.dummy.scale.set(1, 1, 1);
                        this.dummy.updateMatrix();
                        this.indicatorTopMesh.setMatrixAt(indicatorCount, this.dummy.matrix);
                        this.indicatorDotMesh.setMatrixAt(indicatorCount, this.dummy.matrix);
                        indicatorCount++;
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
        this.visorMesh.count = visorCount; // Update Visor Count
        this.indicatorTopMesh.count = indicatorCount;
        this.indicatorDotMesh.count = indicatorCount;

        // Commit Updates
        const updateMesh = (m) => {
            if (m.instanceMatrix) m.instanceMatrix.needsUpdate = true;
            if (m.instanceColor) m.instanceColor.needsUpdate = true;
        };

        updateMesh(this.torsoMesh);
        updateMesh(this.headMesh);
        updateMesh(this.faceMesh);
        updateMesh(this.leftArmMesh);
        updateMesh(this.rightArmMesh);
        updateMesh(this.leftLegMesh);
        updateMesh(this.rightLegMesh);
        updateMesh(this.swordMesh);
        updateMesh(this.visorMesh); // Commit Visor
        updateMesh(this.staffMesh);
        updateMesh(this.hatMesh);
        updateMesh(this.hatBrimMesh);
        updateMesh(this.indicatorTopMesh);
        updateMesh(this.indicatorDotMesh);
    }

    dispose() {
        const disposeMesh = (m) => {
            if (m) {
                this.scene.remove(m);
                if (m.geometry) m.geometry.dispose();
                // Material handled by Unit.assets? Or separate? 
                // Unit.assets are static. Don't dispose static assets here!
                // Except cloned/created ones? InstancedMesh materials are shared from Unit.assets.
                // WE SHOULD NOT DISPOSE SHARED ASSETS HERE.
            }
        };

        disposeMesh(this.torsoMesh);
        disposeMesh(this.headMesh);
        disposeMesh(this.faceMesh);
        disposeMesh(this.leftArmMesh);
        disposeMesh(this.rightArmMesh);
        disposeMesh(this.leftLegMesh);
        disposeMesh(this.rightLegMesh);
        disposeMesh(this.swordMesh);
        disposeMesh(this.visorMesh);
        disposeMesh(this.staffMesh);
        disposeMesh(this.hatMesh);
        disposeMesh(this.hatBrimMesh);
        disposeMesh(this.indicatorTopMesh);
        disposeMesh(this.indicatorDotMesh);

        if (this.whiteMat) this.whiteMat.dispose();
    }
}
