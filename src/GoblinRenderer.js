import * as THREE from 'three';
import { Goblin } from './Goblin.js';

export class GoblinRenderer {
    constructor(scene, terrain, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = 50000; // Shared limit for parts

        // Ensure assets are ready
        Goblin.initAssets();

        // Apply clipping to shared materials
        const mats = Goblin.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat) mat.clippingPlanes = this.clippingPlanes;
        });

        this._dummy = new THREE.Object3D();
        this._scratchVector = new THREE.Vector3();
        this._scratchSphere = new THREE.Sphere(new THREE.Vector3(), 2.0);

        this.initInstancedMeshes();
    }

    initInstancedMeshes() {
        const createMesh = (geo, mat, count) => {
            const m = new THREE.InstancedMesh(geo, mat, count);
            m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            m.frustumCulled = false; // Manual culling
            m.castShadow = true;
            m.receiveShadow = true;
            this.scene.add(m);
            return m;
        };

        const assets = Goblin.assets; // Shortcut

        // 1. Torso (Body) - Shared Geometry? No, Goblin.js has separate Torso geometries for Normal/Hob.
        // We can use ONE BoxGeometry and scale it via Matrix?
        // Normal: 0.25, 0.3, 0.2
        // Hob: 0.35, 0.3, 0.2
        // We can use a base 1x1x1 box and scale it? Or just use Normal geo and scale axis X for Hob?
        // Let's use Normal Geometry as base.
        // Wait, Goblin.js initAssets creates TWO geometries. InstancedMesh needs ONE geometry.
        // We should use a standardized Box and scale it per instance.
        // Let's create a generic Box for torso in renderer or reuse one.
        // But UVs might matter? LambertMaterial doesn't use texture map yet (just color).
        // So generic box is fine.
        // Let's use assets.geometries.torsoNormal as base.
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

    update(goblins, camera) {
        if (!goblins) return;

        let count = 0;
        let earCount = 0;
        let armCount = 0;
        let legCount = 0;
        let clubCount = 0;
        let staffCount = 0;

        // Debug Log (Once per second roughly)
        const now = performance.now();
        if (!this.lastLog || now - this.lastLog > 2000) {
            console.log(`[GoblinRenderer] Updating ${goblins.length} goblins.`);
            this.lastLog = now;
        }

        const dummy = this._dummy;
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Base Offset (Infinite Scroll)
        let baseGridX = 0;
        let baseGridZ = 0;
        if (camera) {
            baseGridX = Math.round(camera.position.x / logicalW);
            baseGridZ = Math.round(camera.position.z / logicalD);
        }

        // Pre-defined Colors
        const colSkinNormal = new THREE.Color(0x55AA55);
        const colSkinHob = new THREE.Color(0x336633);
        const colSkinShaman = new THREE.Color(0x008888);
        const colSkinKing = new THREE.Color(0x880000);

        const colClothesNormal = new THREE.Color(0x8B4513);
        const colClothesHob = new THREE.Color(0x222222);
        const colClothesShaman = new THREE.Color(0x330066);
        const colClothesKing = new THREE.Color(0xFFD700);

        const offsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        for (const g of goblins) {
            if (g.isDead || g.isFinished) continue;

            // Determine Props
            const isHob = (g.type === 'hobgoblin');
            const isKing = (g.type === 'king');
            const isShaman = (g.type === 'shaman');

            let skinColor = colSkinNormal;
            let clothesColor = colClothesNormal;

            if (isHob) { skinColor = colSkinHob; clothesColor = colClothesHob; }
            else if (isShaman) { skinColor = colSkinShaman; clothesColor = colClothesShaman; }
            else if (isKing) { skinColor = colSkinKing; clothesColor = colClothesKing; }

            // Scale (From logic, defaulting if missing)
            let baseScale = g.scale || 1.0;
            if (isHob && baseScale === 1.0) baseScale = 1.2; // Legacy fix

            // Base Position
            // Use smooth position if available, else snap to grid
            let vPos;
            if (g.position && g.isMoving) {
                vPos = { x: g.position.x, y: g.position.y, z: g.position.z };
            } else {
                vPos = this.terrain.getVisualPosition(g.gridX, g.gridZ, true);
            }

            // ROBUST SMART CLONING (Same as UnitRenderer)
            const viewRadius = 90; // Safe margin
            const minKx = Math.floor((camera.position.x - viewRadius - vPos.x) / logicalW);
            const maxKx = Math.ceil((camera.position.x + viewRadius - vPos.x) / logicalW);
            const minKz = Math.floor((camera.position.z - viewRadius - vPos.z) / logicalD);
            const maxKz = Math.ceil((camera.position.z + viewRadius - vPos.z) / logicalD);

            // Rotation (Y)
            const rotY = g.rotationY || 0;

            // Animation State (Limbs)
            const lArmRx = (g.limbs && g.limbs.leftArm) ? g.limbs.leftArm.x : 0;
            const rArmRx = (g.limbs && g.limbs.rightArm) ? g.limbs.rightArm.x : 0;
            const lLegRx = (g.limbs && g.limbs.leftLeg) ? g.limbs.leftLeg.x : 0;
            const rLegRx = (g.limbs && g.limbs.rightLeg) ? g.limbs.rightLeg.x : 0;

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    if (count >= this.MAX_INSTANCES) break;

                    const shiftX = kx * logicalW;
                    const shiftZ = kz * logicalD;

                    const posX = vPos.x + shiftX;
                    const posZ = vPos.z + shiftZ;
                    const posY = vPos.y; // Ground level

                    // Root Dummy (for positioning parts)
                    // 1. Torso
                    dummy.position.set(posX, posY + 0.3, posZ);
                    dummy.rotation.set(0, rotY, 0);

                    // Scale Logic
                    const torsoScaleX = isHob ? 1.4 : 1.0; // Hob is wider
                    dummy.scale.set(baseScale * torsoScaleX, baseScale, baseScale);
                    dummy.updateMatrix();

                    this.torsoMesh.setMatrixAt(count, dummy.matrix);
                    this.torsoMesh.setColorAt(count, skinColor);

                    // 2. Head
                    dummy.position.set(posX, posY + 0.55, posZ); // Approx
                    dummy.rotation.set(0, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();

                    this.headMesh.setMatrixAt(count, dummy.matrix);
                    this.headMesh.setColorAt(count, skinColor);

                    // 3. Ears
                    // Left Ear
                    dummy.position.set(0.12 * baseScale, 0.55, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));
                    dummy.rotation.set(0, rotY, -Math.PI / 2);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.earMesh.setMatrixAt(earCount++, dummy.matrix);
                    this.earMesh.setColorAt(earCount - 1, skinColor);

                    // Right Ear
                    dummy.position.set(-0.12 * baseScale, 0.55, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));
                    dummy.rotation.set(0, rotY, Math.PI / 2);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.earMesh.setMatrixAt(earCount++, dummy.matrix);
                    this.earMesh.setColorAt(earCount - 1, skinColor);

                    // 4. Arms
                    // Left Arm
                    dummy.position.set(0.18 * baseScale, 0.3, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));
                    dummy.rotation.set(lArmRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.armMesh.setMatrixAt(armCount++, dummy.matrix);
                    this.armMesh.setColorAt(armCount - 1, skinColor);

                    // Right Arm
                    dummy.position.set(-0.18 * baseScale, 0.3, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));
                    dummy.rotation.set(rArmRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.armMesh.setMatrixAt(armCount++, dummy.matrix);
                    this.armMesh.setColorAt(armCount - 1, skinColor);

                    // WEAPON (Linked to Right Arm Dummy)
                    // The dummy currently holds Right Arm Position & Rotation.
                    // We can reuse it.

                    if (isShaman) {
                        // STAFF
                        // Adjusted: 0.0 (Center of arm holds center of staff) was -0.3 (Too low)
                        const staffOffset = new THREE.Vector3(0, 0.0, 0.1);
                        staffOffset.applyEuler(dummy.rotation);
                        const staffPos = dummy.position.clone().add(staffOffset);

                        dummy.position.copy(staffPos);
                        // Vertical Staff?
                        // Arm is swinging X. Staff should ideally stay vertical-ish or follow arm?
                        // If holding vertical staff, default rot is fine.
                        // Let's match arm rot but with offset?
                        // Or Just vertical relative to arm?
                        // Simple: Match arm rot + 90 deg?
                        dummy.rotation.set(rArmRx + Math.PI / 2, rotY, 0);
                        dummy.scale.set(baseScale, baseScale, baseScale);
                        dummy.updateMatrix();

                        this.staffMesh.setMatrixAt(staffCount++, dummy.matrix);
                        // Hide Club for this instance?
                        // InstancedMesh index handling: We must skip index or set scale 0.
                        // Better: Use `staffCount` and `clubCount` separately.
                        // Each weapon has its own InstancedMesh.
                        // We act as if we are adding to a list.
                        // But wait, `clubMesh` and `staffMesh` are different Meshes.
                        // So we just add to staffMesh here.
                    } else {
                        // CLUB (Normal / King / Hob)
                        const clubOffset = new THREE.Vector3(0, -0.15, 0.1);
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
                    dummy.position.set(0.08 * baseScale, 0.12, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));
                    dummy.rotation.set(lLegRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.legMesh.setMatrixAt(legCount++, dummy.matrix);
                    this.legMesh.setColorAt(legCount - 1, clothesColor);

                    // Right Leg
                    dummy.position.set(-0.08 * baseScale, 0.12, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));
                    dummy.rotation.set(rLegRx, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.legMesh.setMatrixAt(legCount++, dummy.matrix);
                    this.legMesh.setColorAt(legCount - 1, clothesColor);

                    count++;
                }
            }
        }

        this.torsoMesh.count = count;
        this.headMesh.count = count;
        this.earMesh.count = earCount;
        this.armMesh.count = armCount;
        this.legMesh.count = legCount;
        this.clubMesh.count = clubCount;
        this.staffMesh.count = staffCount;

        // Commit
        this.torsoMesh.instanceMatrix.needsUpdate = true;
        this.torsoMesh.instanceColor.needsUpdate = true;
        this.headMesh.instanceMatrix.needsUpdate = true;
        this.headMesh.instanceColor.needsUpdate = true;
        this.earMesh.instanceMatrix.needsUpdate = true;
        this.earMesh.instanceColor.needsUpdate = true;
        this.armMesh.instanceMatrix.needsUpdate = true;
        this.armMesh.instanceColor.needsUpdate = true;
        this.legMesh.instanceMatrix.needsUpdate = true;
        this.legMesh.instanceColor.needsUpdate = true;
        this.clubMesh.instanceMatrix.needsUpdate = true;
        this.staffMesh.instanceMatrix.needsUpdate = true;
    }
}
