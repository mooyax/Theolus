import * as THREE from 'three';
import { Goblin } from './Goblin.js';
import GameConfig from './config/GameConfig.json';

export class GoblinRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 50000) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = maxInstances; // Shared limit for parts

        this._dummy = new THREE.Object3D();
        this._scratchVector = new THREE.Vector3();
        this._scratchSphere = new THREE.Sphere(new THREE.Vector3(), 2.0);

        // Remove meshGroup to match UnitRenderer and avoid group-level culling issues
        // this.meshGroup = new THREE.Group();
        // this.scene.add(this.meshGroup);
    }

    async init() {
        // Ensure assets are ready
        await Goblin.initAssets(this.terrain.checkYield.bind(this.terrain));

        // Apply clipping to shared materials
        // Apply clipping to shared materials EXPLICITLY
        const setClip = (mat) => {
            if (mat) {
                mat.clippingPlanes = this.clippingPlanes;
                mat.needsUpdate = true;
            }
        };

        setClip(Goblin.assets.materials.club);
        setClip(Goblin.assets.materials.staff);
        setClip(Goblin.assets.materials.face);
        setClip(Goblin.assets.materials.cross); // If used

        const mats = Goblin.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat && (mat.isMaterial || Array.isArray(mat))) {
                const materialList = Array.isArray(mat) ? mat : [mat];
                materialList.forEach(m => {
                    m.clippingPlanes = this.clippingPlanes;
                    m.needsUpdate = true;
                });
            }
        });

        await this.terrain.checkYield();
        this.initInstancedMeshes();
        this.initialized = true;
    }

    initInstancedMeshes() {
        const createMesh = (geo, mat, count) => {
            const m = new THREE.InstancedMesh(geo, mat, count);
            m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            m.frustumCulled = false; // CRITICAL: Disable frustum culling to prevent disappearance when origin is off-screen
            m.castShadow = true;
            m.receiveShadow = true;
            // Ensure bounding sphere is huge just in case some internal logic relies on it?
            if (m.geometry && m.geometry.boundingSphere) {
                m.geometry.boundingSphere.radius = 100000;
            }
            // Add directly to scene like UnitRenderer
            this.scene.add(m);
            return m;
        };

        const assets = Goblin.assets; // Shortcut

        // ---------------------------------

        // 1. Torso (Body)
        this.torsoMesh = createMesh(assets.geometries.torsoNormal, this.getWhiteMaterial(), this.MAX_INSTANCES);

        // 2. Head
        this.headMesh = createMesh(assets.geometries.head, this.getWhiteMaterial(), this.MAX_INSTANCES);

        // 3. Ears (Cone)
        this.earMesh = createMesh(assets.geometries.ear, this.getWhiteMaterial(), this.MAX_INSTANCES * 2); // 2 ears per goblin

        // 4. Arms (Box)
        this.armMesh = createMesh(assets.geometries.arm, this.getWhiteMaterial(), this.MAX_INSTANCES * 2);

        // 5. Legs (Box)
        this.legMesh = createMesh(assets.geometries.leg, this.getWhiteMaterial(), this.MAX_INSTANCES * 2);

        // 6. Club (Cylinder)
        this.clubMesh = createMesh(assets.geometries.club, assets.materials.club, this.MAX_INSTANCES);

        // 7. Staff (Box - Shaman)
        this.staffMesh = createMesh(assets.geometries.staff, assets.materials.staff, this.MAX_INSTANCES);

        // 8. Face (Plane)
        this.faceMesh = createMesh(assets.geometries.facePlane, assets.materials.face, this.MAX_INSTANCES);

        // Colors Helper
        // We need to tint Skin and Clothes.
        // Materials in Goblin.js are pre-colored Lambert.
        // InstancedMesh supports setColorAt. We can use a White Lambert and tint it.
        // I created `getWhiteMaterial()` helper below.
    }

    getWhiteMaterial() {
        if (!this.whiteMat) {
            this.whiteMat = new THREE.MeshLambertMaterial({
                color: 0xFFFFFF,
                clippingPlanes: this.clippingPlanes
            });
        }
        return this.whiteMat;
    }
    update(goblins, viewCenter) {
        if (!this.initialized) return; // Guard: Not initialized
        if (!goblins) return;

        let idx = 0;// Safety Check: Assets
        if (!Goblin.assets.initialized) {
            console.warn("[GoblinRenderer] Assets not initialized! Re-initializing...");
            Goblin.initAssets(); // Last ditch effort
            if (!Goblin.assets.initialized) return;
        }



        let count = 0;
        let earCount = 0;
        let armCount = 0;
        let legCount = 0;
        let clubCount = 0;
        let staffCount = 0;

        // Debug Log (Once per second roughly)
        const now = performance.now();
        if (!this.lastLog || now - this.lastLog > 5000) { // Reduced freq
            // console.log(`[GoblinRenderer] Updating ${goblins.length} goblins.`);
            this.lastLog = now;
        }

        const dummy = this._dummy;
        const logicalW = this.terrain.logicalWidth || 240;
        const logicalD = this.terrain.logicalDepth || 240;
        const up = new THREE.Vector3(0, 1, 0); // Re-use logic

        // Pre-defined Colors
        const colSkinNormal = new THREE.Color(0x55AA55);
        const colSkinHob = new THREE.Color(0x336633);
        const colSkinShaman = new THREE.Color(0x008888);
        const colSkinKing = new THREE.Color(0x880000);

        const colClothesNormal = new THREE.Color(0x8B4513);
        const colClothesHob = new THREE.Color(0x222222);
        const colClothesShaman = new THREE.Color(0x330066);
        const colClothesKing = new THREE.Color(0xFFD700);

        // Iterate LIST of goblins (UnitRenderer style) instead of Grid Scan
        for (const g of goblins) {
            if (g.isDead || g.isFinished) continue;

            const viewRadius = GameConfig.render && GameConfig.render.viewRadius ? GameConfig.render.viewRadius : 120;
            const cullDistSq = viewRadius * viewRadius;

            // Define missing variables for rendering logic
            const isHob = (g.type === 'hobgoblin' || g.type === 'orc'); // Orc fallback
            const isKing = (g.type === 'king');
            const isShaman = (g.type === 'shaman');

            const baseScale = g.scale || 1.0;
            // FIX: Use rotationY (number) directly, not rotation (Euler) object which might not exist on Entity
            const rotY = (g.rotationY !== undefined) ? g.rotationY : 0;

            // Safety: Ensure position is valid
            if (!g.position) continue;

            let skinColor = colSkinNormal;
            if (isHob) skinColor = colSkinHob;
            else if (isKing) skinColor = colSkinKing;
            else if (isShaman) skinColor = colSkinShaman;

            let clothesColor = colClothesNormal;
            if (isHob) clothesColor = colClothesHob;
            else if (isKing) clothesColor = colClothesKing;
            else if (isShaman) clothesColor = colClothesShaman;

            // Arm/Leg Rotations
            const lArmRx = (g.limbs && g.limbs.leftArm) ? g.limbs.leftArm.x : 0;
            const rArmRx = (g.limbs && g.limbs.rightArm) ? g.limbs.rightArm.x : 0;
            const lLegRx = (g.limbs && g.limbs.leftLeg) ? g.limbs.leftLeg.x : 0;
            const rLegRx = (g.limbs && g.limbs.rightLeg) ? g.limbs.rightLeg.x : 0;

            // Calculate Wrapping Loops
            const minKx = Math.floor((viewCenter.x - viewRadius - g.position.x) / logicalW);
            const maxKx = Math.ceil((viewCenter.x + viewRadius - g.position.x) / logicalW);

            const minKz = Math.floor((viewCenter.z - viewRadius - g.position.z) / logicalD);
            const maxKz = Math.ceil((viewCenter.z + viewRadius - g.position.z) / logicalD);

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    if (count >= this.MAX_INSTANCES) break;

                    const shiftX = kx * logicalW;
                    const shiftZ = kz * logicalD;

                    const instanceX = g.position.x + shiftX;
                    const instanceY = g.position.y;
                    const instanceZ = g.position.z + shiftZ;

                    // DISTANCE CULLING
                    const dx = instanceX - viewCenter.x;
                    const dz = instanceZ - viewCenter.z;
                    const distSq = dx * dx + dz * dz;

                    // Use GameConfig radius
                    if (distSq > cullDistSq) {
                        continue;
                    }
                    // 1. Torso
                    // Pivot Adjustment: Torso center is usually ~0.3 up.
                    // If geometry center is 0, we move dummy up.
                    // Scale Offset by baseScale to keep proportions!
                    dummy.position.set(instanceX, instanceY + 0.3 * baseScale, instanceZ);
                    dummy.rotation.set(0, rotY, 0);

                    const torsoScaleX = (isHob || isKing) ? 1.4 : 1.0;
                    dummy.scale.set(baseScale * torsoScaleX, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.torsoMesh.setMatrixAt(count, dummy.matrix);

                    // User Request: Head and Body should be same color (ALL TYPES)
                    // Previously: Clothes color for Torso/Legs vs Skin Color for Head/Arms/Ears
                    // Now: All Skin Color (Or at least Torso/Head match)
                    // If user says "Body color different from head, MAKE SAME", we assume full skin color body?
                    // Or Torso is shirt? 
                    // "Goblin: Body color diff from head. Color is added?" -> Wants pure color.
                    // "Make same" -> Set Torso to SkinColor.
                    this.torsoMesh.setColorAt(count, skinColor);


                    // 2. Head
                    dummy.position.set(instanceX, instanceY + 0.55 * baseScale, instanceZ);
                    dummy.rotation.set(0, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.headMesh.setMatrixAt(count, dummy.matrix);
                    this.headMesh.setColorAt(count, skinColor);

                    // 3. Face
                    this.faceMesh.setMatrixAt(count, dummy.matrix);
                    this.faceMesh.setColorAt(count, new THREE.Color(0xFFFFFF));

                    // 3. Ears
                    // Left Ear
                    dummy.position.set(0.12 * baseScale, 0.55 * baseScale, 0);
                    dummy.position.applyAxisAngle(up, rotY);
                    dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
                    dummy.rotation.set(0, rotY, -Math.PI / 2); // Tilt out
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.earMesh.setMatrixAt(earCount++, dummy.matrix);
                    this.earMesh.setColorAt(earCount - 1, skinColor);

                    // Right Ear
                    dummy.position.set(-0.12 * baseScale, 0.55 * baseScale, 0);
                    dummy.position.applyAxisAngle(up, rotY);
                    dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
                    dummy.rotation.set(0, rotY, Math.PI / 2);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.earMesh.setMatrixAt(earCount++, dummy.matrix);
                    this.earMesh.setColorAt(earCount - 1, skinColor);

                    // 4. Arms
                    // Left Arm
                    // Pivot is now Top of Arm. Place at Shoulder (Top of Torso ~0.45).
                    dummy.position.set(0.18 * baseScale, 0.42 * baseScale, 0);
                    dummy.position.applyAxisAngle(up, rotY);
                    dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
                    dummy.rotation.set(lArmRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.armMesh.setMatrixAt(armCount++, dummy.matrix);
                    this.armMesh.setColorAt(armCount - 1, skinColor);

                    // Right Arm
                    dummy.position.set(-0.18 * baseScale, 0.42 * baseScale, 0);
                    dummy.position.applyAxisAngle(up, rotY);
                    dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
                    dummy.rotation.set(rArmRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.armMesh.setMatrixAt(armCount++, dummy.matrix);
                    this.armMesh.setColorAt(armCount - 1, skinColor);

                    // WEAPON
                    if (isShaman) {
                        // Staff
                        const staffOffset = new THREE.Vector3(0, -0.08 * baseScale, 0.1 * baseScale);
                        staffOffset.applyEuler(dummy.rotation); // Rotate offset by arm rotation
                        const staffPos = dummy.position.clone().add(staffOffset);
                        dummy.position.copy(staffPos);
                        // Staff rotation logic? Match arm then tilt?
                        dummy.rotation.set(rArmRx + Math.PI / 2, rotY, 0);
                        dummy.scale.set(baseScale, baseScale, baseScale);
                        dummy.updateMatrix();
                        this.staffMesh.setMatrixAt(staffCount++, dummy.matrix);
                    } else {
                        // Club
                        const clubOffset = new THREE.Vector3(0, -0.15 * baseScale, 0.1 * baseScale);
                        clubOffset.applyEuler(dummy.rotation);
                        const clubPos = dummy.position.clone().add(clubOffset);
                        dummy.position.copy(clubPos);
                        dummy.rotation.set(rArmRx + Math.PI / 2, rotY, 0);
                        dummy.scale.set(baseScale, baseScale, baseScale);
                        dummy.updateMatrix();
                        this.clubMesh.setMatrixAt(clubCount++, dummy.matrix);
                    }

                    // 5. Legs
                    // Left Leg
                    // Pivot is Top (Hip). Place at Bottom of Torso (0.15).
                    dummy.position.set(0.08 * baseScale, 0.15 * baseScale, 0);
                    dummy.position.applyAxisAngle(up, rotY);
                    dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
                    dummy.rotation.set(lLegRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.legMesh.setMatrixAt(legCount++, dummy.matrix);
                    this.legMesh.setColorAt(legCount - 1, skinColor); // FIX: Match body/skin color

                    // Right Leg
                    dummy.position.set(-0.08 * baseScale, 0.15 * baseScale, 0);
                    dummy.position.applyAxisAngle(up, rotY);
                    dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
                    dummy.rotation.set(rLegRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.legMesh.setMatrixAt(legCount++, dummy.matrix);
                    this.legMesh.setColorAt(legCount - 1, skinColor); // FIX: Match body/skin color

                    count++;
                }
            }
        }

        this.torsoMesh.count = count;
        this.headMesh.count = count;
        this.faceMesh.count = count;
        this.earMesh.count = earCount;
        this.armMesh.count = armCount;
        this.legMesh.count = legCount;
        this.clubMesh.count = clubCount;
        this.staffMesh.count = staffCount;

        // Re-disable Frustum Culling (Paranoid Check similar to UnitRenderer)
        this.torsoMesh.frustumCulled = false;
        this.headMesh.frustumCulled = false;
        this.faceMesh.frustumCulled = false;
        this.earMesh.frustumCulled = false;
        this.armMesh.frustumCulled = false;
        this.legMesh.frustumCulled = false;
        this.clubMesh.frustumCulled = false;
        this.staffMesh.frustumCulled = false;

        // Commit Updates
        const updateMesh = (m) => {
            if (m.instanceMatrix) m.instanceMatrix.needsUpdate = true;
            if (m.instanceColor) m.instanceColor.needsUpdate = true;
            m.visible = (m.count > 0); // Explicitly hide empty meshes
        };

        updateMesh(this.torsoMesh);
        updateMesh(this.headMesh);
        updateMesh(this.faceMesh);
        updateMesh(this.earMesh);
        updateMesh(this.armMesh);
        updateMesh(this.legMesh);
        updateMesh(this.clubMesh);
        updateMesh(this.staffMesh);
    }

    dispose() {
        console.log("[GoblinRenderer] Disposing...");

        const disposeMesh = (m) => {
            if (m) {
                this.scene.remove(m); // Remove from scene directly
                if (m.geometry) m.geometry.dispose();
                if (m.material) {
                    if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
                    else m.material.dispose();
                }
            }
        };

        disposeMesh(this.torsoMesh);
        disposeMesh(this.headMesh);
        disposeMesh(this.faceMesh);
        disposeMesh(this.earMesh);
        disposeMesh(this.armMesh);
        disposeMesh(this.legMesh);
        disposeMesh(this.clubMesh);
        disposeMesh(this.staffMesh);

        if (this.whiteMat) this.whiteMat.dispose();
    }
}
