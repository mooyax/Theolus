import * as THREE from 'three';
import { Goblin } from './Goblin';
import { BaseEntityRenderer } from './BaseEntityRenderer.js';

export class GoblinRenderer extends BaseEntityRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 50000) {
        super(scene, terrain, clippingPlanes, maxInstances);

        // Custom counts
        this.count = 0;
        this.earCount = 0;
        this.armCount = 0;
        this.legCount = 0;
        this.clubCount = 0;
        this.staffCount = 0;

        // Pre-defined Colors
        this.colSkinNormal = new THREE.Color(0x55AA55);
        this.colSkinHob = new THREE.Color(0x336633);
        this.colSkinShaman = new THREE.Color(0x008888);
        this.colSkinKing = new THREE.Color(0x880000);

        this.colClothesNormal = new THREE.Color(0x8B4513);
        this.colClothesHob = new THREE.Color(0x222222);
        this.colClothesShaman = new THREE.Color(0x330066);
        this.colClothesKing = new THREE.Color(0xFFD700);
    }

    async init() {
        await Goblin.initAssets(this.terrain.checkYield.bind(this.terrain));

        const mats = Goblin.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat && (mat.isMaterial || Array.isArray(mat))) {
                const materialList = Array.isArray(mat) ? mat : [mat];
                materialList.forEach(m => this.setClipping(m));
            }
        });

        await this.terrain.checkYield();
        this.initInstancedMeshes();
        this.initialized = true;
    }

    initInstancedMeshes() {
        const assets = Goblin.assets;
        const whiteMat = this.getWhiteMaterial();

        this.torsoMesh = this.createMesh(assets.geometries.torsoNormal, whiteMat);
        this.headMesh = this.createMesh(assets.geometries.head, whiteMat);
        this.earMesh = this.createMesh(assets.geometries.ear, whiteMat, this.MAX_INSTANCES * 2);
        this.armMesh = this.createMesh(assets.geometries.arm, whiteMat, this.MAX_INSTANCES * 2);
        this.legMesh = this.createMesh(assets.geometries.leg, whiteMat, this.MAX_INSTANCES * 2);
        this.clubMesh = this.createMesh(assets.geometries.club, assets.materials.club);
        this.staffMesh = this.createMesh(assets.geometries.staff, assets.materials.staff);
        this.faceMesh = this.createMesh(assets.geometries.facePlane, assets.materials.face);
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

    update(goblins, deltaTime, viewCenter) {
        // deltaTime は現在は内部で使用していませんが、シグネチャ維持のため追加
        if (!viewCenter && deltaTime instanceof THREE.Vector3) {
            viewCenter = deltaTime;
        }
        if (!this.initialized || !goblins) return;

        // Safety: Ensure assets are ready
        if (!Goblin.assets.initialized) {
            Goblin.initAssets();
            if (!Goblin.assets.initialized) return;
        }

        this.baseUpdate(goblins, viewCenter);
    }

    resetCounts() {
        this.count = 0;
        this.earCount = 0;
        this.armCount = 0;
        this.legCount = 0;
        this.clubCount = 0;
        this.staffCount = 0;
    }

    isExhausted() {
        return this.count >= this.MAX_INSTANCES;
    }

    updateInstances(g, instanceX, instanceY, instanceZ, rotY) {
        const isHob = (g.type === 'hobgoblin' || g.type === 'orc');
        const isKing = (g.type === 'king');
        const isShaman = (g.type === 'shaman');

        const baseScale = g.scale || 1.0;
        const dummy = this.dummy;

        let skinColor = this.colSkinNormal;
        if (isHob) skinColor = this.colSkinHob;
        else if (isKing) skinColor = this.colSkinKing;
        else if (isShaman) skinColor = this.colSkinShaman;

        // Limbs
        const lArmRx = (g.limbs && g.limbs.leftArm) ? g.limbs.leftArm.x : 0;
        const rArmRx = (g.limbs && g.limbs.rightArm) ? g.limbs.rightArm.x : 0;
        const lLegRx = (g.limbs && g.limbs.leftLeg) ? g.limbs.leftLeg.x : 0;
        const rLegRx = (g.limbs && g.limbs.rightLeg) ? g.limbs.rightLeg.x : 0;

        // 1. Torso
        dummy.position.set(instanceX, instanceY + 0.3 * baseScale, instanceZ);
        dummy.rotation.set(0, rotY, 0);
        const torsoScaleX = (isHob || isKing) ? 1.4 : 1.0;
        dummy.scale.set(baseScale * torsoScaleX, baseScale, baseScale);
        dummy.updateMatrix();
        this.torsoMesh.setMatrixAt(this.count, dummy.matrix);
        this.torsoMesh.setColorAt(this.count, skinColor);

        // 2. Head
        dummy.position.set(instanceX, instanceY + 0.55 * baseScale, instanceZ);
        dummy.rotation.set(0, rotY, 0);
        dummy.scale.set(baseScale, baseScale, baseScale);
        dummy.updateMatrix();
        this.headMesh.setMatrixAt(this.count, dummy.matrix);
        this.headMesh.setColorAt(this.count, skinColor);

        // 3. Face
        dummy.position.set(0, 0, 0);
        dummy.position.applyAxisAngle(this._up, rotY);
        dummy.position.add(this._scratchVector.set(instanceX, instanceY + 0.55 * baseScale, instanceZ));
        dummy.rotation.set(0, rotY, 0);
        dummy.scale.set(baseScale, baseScale, baseScale);
        dummy.updateMatrix();
        this.faceMesh.setMatrixAt(this.count, dummy.matrix);

        // 4. Ears
        dummy.rotation.set(0, rotY, 0);
        dummy.scale.set(baseScale, baseScale, baseScale);
        // Left Ear
        dummy.position.set(0.12 * baseScale, 0.55 * baseScale, 0);
        dummy.position.applyAxisAngle(this._up, rotY);
        dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
        dummy.updateMatrix();
        this.earMesh.setMatrixAt(this.earCount++, dummy.matrix);
        this.earMesh.setColorAt(this.earCount - 1, skinColor);
        // Right Ear
        dummy.position.set(-0.12 * baseScale, 0.55 * baseScale, 0);
        dummy.position.applyAxisAngle(this._up, rotY);
        dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
        dummy.updateMatrix();
        this.earMesh.setMatrixAt(this.earCount++, dummy.matrix);
        this.earMesh.setColorAt(this.earCount - 1, skinColor);

        // 5. Arms
        // Left Arm
        dummy.position.set(0.18 * baseScale, 0.45 * baseScale, 0);
        dummy.position.applyAxisAngle(this._up, rotY);
        dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
        dummy.rotation.set(lArmRx, rotY, 0);
        dummy.updateMatrix();
        this.armMesh.setMatrixAt(this.armCount++, dummy.matrix);
        this.armMesh.setColorAt(this.armCount - 1, skinColor);
        // Right Arm
        dummy.position.set(-0.18 * baseScale, 0.45 * baseScale, 0);
        dummy.position.applyAxisAngle(this._up, rotY);
        dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
        dummy.rotation.set(rArmRx, rotY, 0);
        dummy.updateMatrix();
        this.armMesh.setMatrixAt(this.armCount++, dummy.matrix);
        this.armMesh.setColorAt(this.armCount - 1, skinColor);

        // Accessories
        if (isShaman) {
            const staffOffset = new THREE.Vector3(0, -0.08 * baseScale, 0.1 * baseScale);
            staffOffset.applyEuler(dummy.rotation);
            const staffPos = dummy.position.clone().add(staffOffset);
            dummy.position.copy(staffPos);
            dummy.rotation.set(rArmRx + Math.PI / 2, rotY, 0);
            dummy.scale.set(baseScale, baseScale, baseScale);
            dummy.updateMatrix();
            this.staffMesh.setMatrixAt(this.staffCount++, dummy.matrix);
        } else {
            const clubOffset = new THREE.Vector3(0, -0.15 * baseScale, 0.1 * baseScale);
            clubOffset.applyEuler(dummy.rotation);
            const clubPos = dummy.position.clone().add(clubOffset);
            dummy.position.copy(clubPos);
            dummy.rotation.set(rArmRx + Math.PI / 2, rotY, 0);
            dummy.scale.set(baseScale, baseScale, baseScale);
            dummy.updateMatrix();
            this.clubMesh.setMatrixAt(this.clubCount++, dummy.matrix);
        }

        // 6. Legs
        dummy.scale.set(baseScale, baseScale, baseScale);
        // Left Leg
        dummy.position.set(0.08 * baseScale, 0.15 * baseScale, 0);
        dummy.position.applyAxisAngle(this._up, rotY);
        dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
        dummy.rotation.set(lLegRx, rotY, 0);
        dummy.updateMatrix();
        this.legMesh.setMatrixAt(this.legCount++, dummy.matrix);
        this.legMesh.setColorAt(this.legCount - 1, skinColor);
        // Right Leg
        dummy.position.set(-0.08 * baseScale, 0.15 * baseScale, 0);
        dummy.position.applyAxisAngle(this._up, rotY);
        dummy.position.add(this._scratchVector.set(instanceX, instanceY, instanceZ));
        dummy.rotation.set(rLegRx, rotY, 0);
        dummy.updateMatrix();
        this.legMesh.setMatrixAt(this.legCount++, dummy.matrix);
        this.legMesh.setColorAt(this.legCount - 1, skinColor);

        this.count++;
    }

    commitUpdates() {
        this.torsoMesh.count = this.count;
        this.headMesh.count = this.count;
        this.faceMesh.count = this.count;
        this.earMesh.count = this.earCount;
        this.armMesh.count = this.armCount;
        this.legMesh.count = this.legCount;
        this.clubMesh.count = this.clubCount;
        this.staffMesh.count = this.staffCount;

        this.updateMesh(this.torsoMesh);
        this.updateMesh(this.headMesh);
        this.updateMesh(this.faceMesh);
        this.updateMesh(this.earMesh);
        this.updateMesh(this.armMesh);
        this.updateMesh(this.legMesh);
        this.updateMesh(this.clubMesh);
        this.updateMesh(this.staffMesh);
    }

    dispose() {
        const disposeM = (m) => {
            if (m) {
                this.scene.remove(m);
                if (m.geometry) m.geometry.dispose();
                // FIX: Do NOT dispose materials here because they are shared in Goblin.assets.materials!
                // Disposing them here breaks subsequent load/spawn sessions.
            }
        };

        disposeM(this.torsoMesh);
        disposeM(this.headMesh);
        disposeM(this.faceMesh);
        disposeM(this.earMesh);
        disposeM(this.armMesh);
        disposeM(this.legMesh);
        disposeM(this.clubMesh);
        disposeM(this.staffMesh);

        if (this.whiteMat) this.whiteMat.dispose();
    }
}
