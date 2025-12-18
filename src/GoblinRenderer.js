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

        // Debug Log (Once per second roughly)
        const now = performance.now();
        if (!this.lastLog || now - this.lastLog > 2000) {
            console.log(`[GoblinRenderer] Updating ${goblins.length} goblins. First pos: ${goblins[0] ? goblins[0].gridX : 'N/A'}`);
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
        const colClothesNormal = new THREE.Color(0x8B4513);
        const colClothesHob = new THREE.Color(0x222222);

        const offsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        for (const g of goblins) {
            if (g.isDead || g.isFinished) continue;

            const isHob = (g.type === 'hobgoblin');
            const skinColor = isHob ? colSkinHob : colSkinNormal;
            const clothesColor = isHob ? colClothesHob : colClothesNormal;

            // Base Position
            // Use smooth position if available, else snap to grid
            let vPos;
            if (g.position && g.isMoving) { // Trust smooth pos
                // Note: g.position is raw World Coord. 
                // getVisualPosition adds centering logic? 
                // Terrain.gridToWorld does simple offset.
                // We need to ensure consistency.
                // If getVisualPosition adds height offset? No, usually center of tile height.
                vPos = { x: g.position.x, y: g.position.y, z: g.position.z };
            } else {
                vPos = this.terrain.getVisualPosition(g.gridX, g.gridZ, true);
            }
            // vPos is the center of the tile.

            // ROBUST SMART CLONING (Same as UnitRenderer)
            // Calculate which integer offsets (k) place the unit within the View Volume.
            const viewRadius = 90; // Safe margin
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

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
                    // Note: parts have local offsets.

                    // 1. Torso
                    // Offset: y=0.3
                    dummy.position.set(posX, posY + 0.3, posZ);
                    dummy.rotation.set(0, rotY, 0);
                    // Scale for Hobgoblin?
                    // Normal Torso: 0.25 width. Hob: 0.35 width. Ratio 1.4.
                    // Also Hob mesh scale is 1.2 overall.
                    // Combined: Hob Torso Width = 0.35 * 1.2? 
                    // Wait, Goblin.js: "isHob? scale.set(1.2,1.2,1.2)".
                    // And Torso Geo is separate.
                    // Let's simplify: Scale the Instance Matrix.
                    const baseScale = isHob ? 1.2 : 1.0;
                    // Torso Geo difference: Normal (0.25), Hob (0.35). Ratio 1.4.
                    const torsoScaleX = isHob ? 1.4 : 1.0;

                    dummy.scale.set(baseScale * torsoScaleX, baseScale, baseScale);
                    dummy.updateMatrix();

                    this.torsoMesh.setMatrixAt(count, dummy.matrix);
                    this.torsoMesh.setColorAt(count, skinColor);

                    // 2. Head
                    // Offset: y=0.55
                    dummy.position.set(0, 0.25, 0); // Relative to Torso (0.3 -> 0.55)
                    // Actually easier to set absolute from root
                    dummy.position.set(posX, posY + 0.55, posZ); // Correct?
                    // Rotation matches body
                    dummy.rotation.set(0, rotY, 0);
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();

                    this.headMesh.setMatrixAt(count, dummy.matrix);
                    this.headMesh.setColorAt(count, skinColor);

                    // 3. Ears
                    // Left Ear: 0.12, 0.55, 0. Rot Z -PI/2
                    // We need to apply RotY first, then offset.
                    // Parent logic simulation:
                    // Head Center: (posX, posY+0.55, posZ) rotated rotY.
                    // Ear Local: (+0.12, 0, 0) relative to head center? 
                    // Wait, in Goblin.js: head is at 0.55. Ears at 0.55.
                    // Relative X is +/- 0.12.

                    // Left Ear
                    dummy.position.set(0.12 * baseScale, 0.55, 0); // Local Offset scaled
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY); // Rotate around origin
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ)); // Add Root

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
                    // Left Arm: 0.18, 0.3, 0.
                    dummy.position.set(0.18 * baseScale, 0.3, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));

                    // Arm Rotation: X=anim, Y=body
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

                    // Club (Right Arm Child)
                    // Offset: 0, -0.15, 0.1 relative to Right Arm
                    // Rotation: X=PI/2 relative to Right Arm
                    {
                        // Parent Matrix is current dummy.matrix (Right Arm)
                        // We can multiply matrices or simpler: compute position manually
                        // Right Arm Pos/Rot is set in dummy.
                        // Club local: (0, -0.15, 0.1). 
                        // Apply Arm Rotation (lArmRx, 0, 0) [Note: Y rotation handled by parent offset logic?]
                        // Wait, dummy.rotation was (rArmRx, rotY, 0).

                        // Complex parenting for InstancedMesh can be tricky.
                        // Let's do: Start at Arm Pos. Apply Local Offset rotated by Arm Rot.
                        const armPos = dummy.position.clone();
                        const armRot = dummy.rotation.clone(); // Euler

                        const clubOffset = new THREE.Vector3(0, -0.15, 0.1);
                        clubOffset.applyEuler(armRot); // Rotate offset by arm rotation

                        const clubPos = armPos.clone().add(clubOffset);

                        dummy.position.copy(clubPos);
                        // Rotation: Arm Rot * Local Rot (X +90)
                        // Simple approxim: ArmRX + PI/2 ?
                        // Club is Cylinder along Y (default).
                        // In Goblin.js: club.rotation.x = Math.PI / 2.
                        // So relative to Arm, it is pitched 90.
                        dummy.rotation.set(rArmRx + Math.PI / 2, rotY, 0);
                        dummy.scale.set(baseScale, baseScale, baseScale);
                        dummy.updateMatrix();
                        this.clubMesh.setMatrixAt(clubCount++, dummy.matrix);
                        // Club Color is fixed texture/mat? No, standard Lambert.
                        // We use clubMesh material which is predefined. No setColorAt needed?
                        // InstancedMesh supports color if material uses VertexColors.
                        // Goblin.assets.materials.club is just brown.
                        // We can reuse setColorAt if we want different club colors, otherwise logic is fine.
                        // If we initialized clubMesh with clubMat, color is baked in material.
                        // BUT InstancedMesh ignores material color if instanceColor is present?
                        // Safe to not set color if we don't need variation.
                    }

                    // 5. Legs
                    // Left Leg: 0.08, 0.12, 0. clothesColor
                    dummy.position.set(0.08 * baseScale, 0.12, 0);
                    dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotY);
                    dummy.position.add(new THREE.Vector3(posX, posY, posZ));

                    dummy.rotation.set(lLegRx, rotY, 0); // Anim
                    dummy.scale.set(baseScale, baseScale, baseScale);
                    dummy.updateMatrix();
                    this.legMesh.setMatrixAt(legCount++, dummy.matrix);
                    this.legMesh.setColorAt(legCount - 1, clothesColor);

                    // Right Leg: -0.08, 0.12, 0
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
    }
}
