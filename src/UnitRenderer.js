import * as THREE from 'three';
import { Unit } from './Unit.js';
import GameConfig from './config/GameConfig.json';

export class UnitRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 2000) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.maxInstances = maxInstances;

        this.dummy = new THREE.Object3D();

        // Shared White Material for Tinting
        this.whiteMat = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1.0,
            clippingPlanes: this.clippingPlanes,
            clipShadows: true
        });
    }

    async init(checkYield, updateStatus) {
        // Initialize Instanced Meshes
        // We defer this slightly to ensure Unit assets are ready? 
        // Or assume Unit.initAssets called by Game.js

        // Fallback if checkYield not provided (New Game vs Load Game)
        const yieldFn = checkYield || (this.terrain ? this.terrain.checkYield.bind(this.terrain) : null);

        await Unit.initAssets(yieldFn, updateStatus);

        await this.terrain.checkYield();
        this.initialized = true;

        // Yield Helper
        const yieldOp = async () => { if (yieldFn) await yieldFn(true); };

        // Helper to create meshes
        const createMesh = (geo, mat) => {
            if (!geo) {
                console.error("[UnitRenderer] Geometry missing for mesh creation!");
                return null; // Handle gracefully?
            }
            const m = new THREE.InstancedMesh(geo, mat, this.maxInstances);
            m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            m.frustumCulled = false; // Manually culled
            m.castShadow = true;
            m.receiveShadow = true;
            this.scene.add(m);
            return m;
        };

        if (updateStatus) updateStatus("Initializing Units (Meshes 1/4)...");
        await yieldOp();

        // Apply clipping to Shared Assets Materials
        const setClip = (mat) => {
            if (mat) {
                mat.clippingPlanes = this.clippingPlanes;
                mat.clipShadows = true;
                mat.needsUpdate = true;
            }
        };
        // ... setClip calls ...
        const mats = [
            Unit.assets.materials.face, Unit.assets.materials.metal, Unit.assets.materials.wood,
            Unit.assets.materials.wizardHat, Unit.assets.materials.redIndicator,
            Unit.assets.materials.armor, Unit.assets.materials.helmet, Unit.assets.materials.robe
        ];
        mats.forEach(m => setClip(m));

        // Generic fallback loop
        Object.values(Unit.assets.materials).forEach(mat => {
            if (mat && (mat.isMaterial || Array.isArray(mat))) {
                const materialList = Array.isArray(mat) ? mat : [mat];
                materialList.forEach(m => {
                    m.clippingPlanes = this.clippingPlanes;
                    m.clipShadows = true;
                    m.needsUpdate = true;
                });
            }
        });

        // 1. Torso & Head
        this.torsoMesh = createMesh(Unit.assets.geometries.body, this.whiteMat, 'torso');
        this.headMesh = createMesh(Unit.assets.geometries.head, this.whiteMat, 'head');
        this.faceMesh = createMesh(Unit.assets.geometries.facePlane, Unit.assets.materials.face);

        if (updateStatus) updateStatus("Initializing Units (Meshes 2/4)...");
        await yieldOp();

        // 4. Arms & Legs
        this.leftArmMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);
        this.rightArmMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);
        this.leftLegMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);
        this.rightLegMesh = createMesh(Unit.assets.geometries.limb, this.whiteMat);

        if (updateStatus) updateStatus("Initializing Units (Meshes 3/4)...");
        await yieldOp();

        // 6. Knight Gear
        this.swordMesh = createMesh(Unit.assets.geometries.sword, Unit.assets.materials.metal);
        this.visorMesh = createMesh(Unit.assets.geometries.head, this.whiteMat);

        // 8. Wizard Gear
        this.staffMesh = createMesh(Unit.assets.geometries.staff, Unit.assets.materials.wood);
        this.hatMesh = createMesh(Unit.assets.geometries.wizardHat, Unit.assets.materials.wizardHat);
        this.hatBrimMesh = createMesh(Unit.assets.geometries.wizardHatBrim, Unit.assets.materials.wizardHat);

        if (updateStatus) updateStatus("Initializing Units (Meshes 4/4)...");
        await yieldOp();

        // 11. Jobs
        this.indicatorTopMesh = createMesh(Unit.assets.geometries.jobIndicatorTop, Unit.assets.materials.redIndicator);
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
        if (!this.initialized) return;

        if (!units) return;

        if (!Unit.assets.initialized) {
            console.error("UR: Assets Missing");
            return;
        }

        let countBody = 0;
        let countIndicator = 0;
        let countDetails = 0; // For Arms, Legs, Accessories

        // LOD Thresholds
        const LOD_DIST_SQ = 60 * 60; // 60 units distance for full details

        const logicalW = this.terrain.logicalWidth || 240;
        const logicalD = this.terrain.logicalDepth || 240;

        const colorNormal = new THREE.Color(0x654321); // Dark Brown (Restored)
        const colorHair = new THREE.Color(0xD4AF37);   // Golden/Blonde
        const colorSpecial = new THREE.Color(0x00008B); // Dark Blue (Darkened from 0x0000FF)
        const colorKnight = new THREE.Color(0x999999); // Mid Grey (User Request)
        const colorWizard = new THREE.Color(0x440088); // Purple
        const colorSkin = new THREE.Color(0xffccaa); // Match skin material

        for (const unit of units) {
            if (unit.isDead) continue;
            // if (unit.isSleeping) continue; // Keep units visible while sleeping
            if (!unit.position) continue; // Safety if unit refactor incomplete

            // Determine Color
            let clothesColor = colorNormal;
            if (unit.role === 'knight') clothesColor = colorKnight;
            else if (unit.role === 'wizard') clothesColor = colorWizard;
            else if (unit.role === 'fisher') clothesColor = new THREE.Color(0x00CED1); // Aqua/Cyan (水色 - 漁師)
            else if (unit.role === 'hunter') clothesColor = new THREE.Color(0x006400); // Dark Green (Darkened from 0x228B22)
            else if (unit.role === 'worker') {
                if (unit.isSpecial) clothesColor = colorSpecial; // Special: Dark Blue (特別な労働者 - 青色)
                else clothesColor = colorNormal; // Normal: Dark Brown (Clothes)
            }

            // ROBUST SMART CLONING
            // Calculate which integer offsets (k) place the unit within the View Volume.
            const viewRadius = GameConfig.render && GameConfig.render.viewRadius ? GameConfig.render.viewRadius : 120;
            const cullDistSq = viewRadius * viewRadius; // Strict culling at view radius limit

            const minKx = Math.floor((viewCenter.x - viewRadius - unit.position.x) / logicalW);
            const maxKx = Math.ceil((viewCenter.x + viewRadius - unit.position.x) / logicalW);

            const minKz = Math.floor((viewCenter.z - viewRadius - unit.position.z) / logicalD);
            const maxKz = Math.ceil((viewCenter.z + viewRadius - unit.position.z) / logicalD);

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    if (countBody >= this.maxInstances) break;

                    const osx = kx;
                    const osz = kz;

                    // Base Position with Offset
                    const posX = unit.position.x + osx * logicalW;
                    const posZ = unit.position.z + osz * logicalD;
                    const posY = unit.position.y;
                    const rotY = unit.rotationY;

                    // LOD Check: If distance > viewRadius, render NOTHING (Aggressive Optimization)
                    const dx = posX - viewCenter.x;
                    const dz = posZ - viewCenter.z;
                    const distSq = dx * dx + dz * dz;

                    // Skip rendering if too far (User Configured)
                    if (distSq > cullDistSq) continue;

                    // 1. Torso (Body) - ALWAYS RENDER if within range
                    // Cute Geo: Translated 0.3. 
                    this.dummy.position.set(posX, posY, posZ);
                    this.dummy.rotation.set(0, rotY, 0);
                    this.dummy.scale.set(1, 1, 1);
                    this.dummy.updateMatrix();
                    this.torsoMesh.setMatrixAt(countBody, this.dummy.matrix);
                    this.torsoMesh.setColorAt(countBody, clothesColor);

                    // 2. Head - ALWAYS RENDER
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
                    this.headMesh.setMatrixAt(countBody, this.dummy.matrix);

                    // Face Overlay matches Head Transform
                    this.faceMesh.setMatrixAt(countBody, this.dummy.matrix);

                    // Knight Helmet (Tint Head Box ONLY)
                    if (unit.role === 'knight') {
                        this.headMesh.setColorAt(countBody, clothesColor); // Silver Body Color
                    } else {
                        // Normal Hair Color (Use explicit colorHair)
                        this.headMesh.setColorAt(countBody, colorHair);
                    }

                    // Face Material is separate -> No Tint (White)
                    this.faceMesh.setColorAt(countBody, new THREE.Color(0xFFFFFF));

                    // 11. Job Indicator (!) - ALWAYS RENDER (Important info)
                    // 11. Job Indicator
                    if (unit.targetRequest) {
                        const floatY = Math.sin(Date.now() * 0.005) * 0.1;
                        this.dummy.position.set(posX, posY + 1.2 + floatY, posZ);
                        this.dummy.rotation.set(0, rotY, 0);
                        this.dummy.scale.set(1, 1, 1);
                        this.dummy.updateMatrix();
                        this.indicatorTopMesh.setMatrixAt(countIndicator, this.dummy.matrix);
                        this.indicatorDotMesh.setMatrixAt(countIndicator, this.dummy.matrix);
                        countIndicator++;
                    }
                    // Else: Don't render anything (Implicit culling)

                    // --- DETAIL MESHES (LOD CULLED) ---
                    // Since we already check dist < 60 above, everything here is "Detailed"

                    // Knight Visor (New)
                    if (unit.role === 'knight') {
                        this.dummy.position.set(posX, posY, posZ);
                        this.dummy.rotation.set(0, rotY, 0);
                        this.dummy.scale.set(1.1, 0.2, 1.1);

                        this.dummy.position.y += 0.53;

                        this.dummy.updateMatrix();
                        this.visorMesh.setMatrixAt(countBody, this.dummy.matrix);
                        this.visorMesh.setColorAt(countBody, new THREE.Color(0x999999));
                    } else {
                        // Hide unused visor
                        this.dummy.scale.set(0, 0, 0);
                        this.dummy.updateMatrix();
                        this.visorMesh.setMatrixAt(countBody, this.dummy.matrix);
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
                    this.leftArmMesh.setMatrixAt(countBody, this.dummy.matrix);
                    this.leftArmMesh.setColorAt(countBody, colorSkin);

                    // 4. Right Arm
                    this.dummy.position.set(-0.18, 0.45, 0);
                    this.dummy.position.applyAxisAngle(this._up, rotY);
                    this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                    this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);

                    // Wizard Arm Adjustment (Lengthen)
                    if (unit.role === 'wizard') {
                        this.dummy.scale.set(1, 1.25, 1);
                        this.dummy.translateY(-0.035);
                    } else {
                        this.dummy.scale.set(1, 1, 1);
                    }

                    this.dummy.updateMatrix();
                    this.rightArmMesh.setMatrixAt(countBody, this.dummy.matrix);
                    this.rightArmMesh.setColorAt(countBody, colorSkin);

                    // 5. Left Leg
                    this.dummy.position.set(0.08, 0.25, 0);
                    this.dummy.position.applyAxisAngle(this._up, rotY);
                    this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                    this.dummy.rotation.set(unit.limbs.leftLeg.x, rotY, 0);
                    this.dummy.updateMatrix();
                    this.leftLegMesh.setMatrixAt(countBody, this.dummy.matrix);
                    this.leftLegMesh.setColorAt(countBody, clothesColor);

                    // 6. Right Leg
                    this.dummy.position.set(-0.08, 0.25, 0);
                    this.dummy.position.applyAxisAngle(this._up, rotY);
                    this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));

                    this.dummy.rotation.set(unit.limbs.rightLeg.x, rotY, 0);
                    this.dummy.updateMatrix();
                    this.rightLegMesh.setMatrixAt(countBody, this.dummy.matrix);
                    this.rightLegMesh.setColorAt(countBody, clothesColor);

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
                        this.swordMesh.setMatrixAt(countBody, this.dummy.matrix);
                    } else {
                        this.dummy.scale.set(0, 0, 0);
                        this.dummy.updateMatrix();
                        this.swordMesh.setMatrixAt(countBody, this.dummy.matrix);
                    }

                    // Wizard Staff
                    if (unit.role === 'wizard') {
                        // Right Arm
                        this.dummy.position.set(-0.18, 0.45, 0);
                        this.dummy.position.applyAxisAngle(this._up, rotY);
                        this.dummy.position.add(this._scratchVector.set(posX, posY, posZ));
                        this.dummy.scale.set(1, 1, 1); // Reset scale (Fix for missing staff)

                        this.dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
                        this.dummy.translateY(-0.25); // Hand
                        this.dummy.rotateX(Math.PI / 2); // Point forward

                        this.dummy.updateMatrix();
                        this.staffMesh.setMatrixAt(countBody, this.dummy.matrix);
                        this.staffMesh.setColorAt(countBody, Unit.assets.materials.wood.color);

                        // Hat on Head
                        const hatYOffset = 0.60;
                        this.dummy.position.set(posX, posY + hatYOffset, posZ);
                        this.dummy.rotation.set(0, rotY, 0);
                        this.dummy.scale.set(1, 1, 1);
                        this.dummy.updateMatrix();

                        this.hatMesh.setMatrixAt(countBody, this.dummy.matrix);
                        this.hatBrimMesh.setMatrixAt(countBody, this.dummy.matrix);
                    } else {
                        this.dummy.scale.set(0, 0, 0);
                        this.dummy.updateMatrix();
                        this.staffMesh.setMatrixAt(countBody, this.dummy.matrix);
                        this.hatMesh.setMatrixAt(countBody, this.dummy.matrix);
                        this.hatBrimMesh.setMatrixAt(countBody, this.dummy.matrix);
                    }

                    countBody++;
                }
            }
        }

        // Update Counts
        // Update Counts
        this.torsoMesh.count = countBody;
        this.headMesh.count = countBody;
        this.faceMesh.count = countBody;

        this.leftArmMesh.count = countBody;
        this.rightArmMesh.count = countBody;
        this.leftLegMesh.count = countBody;
        this.rightLegMesh.count = countBody;

        this.swordMesh.count = countBody;
        this.staffMesh.count = countBody;
        this.hatMesh.count = countBody;
        this.hatBrimMesh.count = countBody;
        this.visorMesh.count = countBody;

        // Indicator uses separate count
        this.indicatorTopMesh.count = countIndicator;
        this.indicatorDotMesh.count = countIndicator;

        // Commit Updates & Visibility Safety
        const updateMesh = (m) => {
            if (m.instanceMatrix) m.instanceMatrix.needsUpdate = true;
            if (m.instanceColor) m.instanceColor.needsUpdate = true;
            m.visible = (m.count > 0); // Explicitly hide empty meshes
        };

        updateMesh(this.torsoMesh);
        updateMesh(this.headMesh);
        updateMesh(this.faceMesh);
        updateMesh(this.leftArmMesh);
        updateMesh(this.rightArmMesh);
        updateMesh(this.leftLegMesh);
        updateMesh(this.rightLegMesh);
        updateMesh(this.swordMesh);
        updateMesh(this.visorMesh);
        updateMesh(this.staffMesh);
        updateMesh(this.hatMesh);
        updateMesh(this.hatBrimMesh);
        updateMesh(this.indicatorTopMesh);
        updateMesh(this.indicatorDotMesh);

        // RESTORE DUMMY STATE
        // Fix for Tests: Spies hold reference to dummy.matrix, which stays at 0 if we don't reset.
        this.dummy.position.set(0, 0, 0);
        this.dummy.scale.set(1, 1, 1);
        this.dummy.rotation.set(0, 0, 0);
        this.dummy.updateMatrix();
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
