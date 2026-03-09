import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Unit } from './Unit';
import { BaseEntityRenderer } from './BaseEntityRenderer.js';

export class UnitRenderer extends BaseEntityRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 12000) {
        super(scene, terrain, clippingPlanes, maxInstances);

        this.countBody = 0;
        this.countIndicator = 0;

        this.torsoMesh = null;
        this.headMesh = null;
        this.faceMesh = null;
        this.leftArmMesh = null;
        this.rightArmMesh = null;
        this.leftLegMesh = null;
        this.rightLegMesh = null;
        this.swordMesh = null;
        this.staffMesh = null;
        this.hatMesh = null;
        this.hatBrimMesh = null;
        this.visorMesh = null;
        this.indicatorTopMesh = null;
        this.indicatorDotMesh = null;
        this.hullMesh = null;
        this.mastMesh = null;
        this.sailMesh = null;
        this.oarMesh = null;
        this.bannerMesh = null;

        // Shared White Material for Tinting
        this.whiteMat = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            roughness: 1.0,
            clippingPlanes: this.clippingPlanes,
            clipShadows: true
        });
    }

    async init(checkYield, updateStatus) {
        const yieldFn = checkYield || (this.terrain ? this.terrain.checkYield.bind(this.terrain) : null);
        await Unit.initAssets(yieldFn, updateStatus);

        const yieldOp = async () => { if (yieldFn) await yieldFn(true); };

        const mats = [
            Unit.assets.materials.wizardHat, Unit.assets.materials.redIndicator,
            Unit.assets.materials.armor, Unit.assets.materials.helmet, Unit.assets.materials.robe,
            Unit.assets.materials.wood
        ];
        mats.forEach(m => this.setClipping(m));

        Object.values(Unit.assets.materials).forEach(mat => {
            if (mat && (mat.isMaterial || Array.isArray(mat))) {
                const materialList = Array.isArray(mat) ? mat : [mat];
                materialList.forEach(m => this.setClipping(m));
            }
        });

        if (updateStatus) updateStatus("Initializing Unit Meshes...");
        await yieldOp();

        this.initInstancedMeshes();
        this.initialized = true;
    }

    initInstancedMeshes() {
        const assets = Unit.assets;
        const whiteMat = this.whiteMat;

        // --- Humanoid Body Parts (Correct names from Unit.ts) ---
        this.torsoMesh = this.createMesh(assets.geometries.body, whiteMat, this.MAX_INSTANCES, true);
        this.headMesh = this.createMesh(assets.geometries.head, whiteMat, this.MAX_INSTANCES, false);
        this.faceMesh = this.createMesh(assets.geometries.facePlane, assets.materials.face, this.MAX_INSTANCES, false);
        this.leftArmMesh = this.createMesh(assets.geometries.limb, whiteMat, this.MAX_INSTANCES, false);
        this.rightArmMesh = this.createMesh(assets.geometries.limb, whiteMat, this.MAX_INSTANCES, false);
        this.leftLegMesh = this.createMesh(assets.geometries.limb, whiteMat, this.MAX_INSTANCES, false);
        this.rightLegMesh = this.createMesh(assets.geometries.limb, whiteMat, this.MAX_INSTANCES, false);
        this.swordMesh = this.createMesh(assets.geometries.sword, assets.materials.iron || assets.materials.armor || whiteMat, this.MAX_INSTANCES, false);
        this.staffMesh = this.createMesh(assets.geometries.staff, assets.materials.wood || whiteMat, this.MAX_INSTANCES, true);
        this.hatMesh = this.createMesh(assets.geometries.wizardHat, assets.materials.wizardHat || whiteMat, this.MAX_INSTANCES, true);
        this.hatBrimMesh = this.createMesh(assets.geometries.wizardHatBrim, assets.materials.wizardHat || whiteMat, this.MAX_INSTANCES, true);

        // Visor for Knight (Small box fallback if missing)
        const visorGeo = assets.geometries.visor || new THREE.BoxGeometry(0.25, 0.25, 0.25);
        this.visorMesh = this.createMesh(visorGeo, assets.materials.helmet || whiteMat, this.MAX_INSTANCES, true);

        // --- Naval / Warship Parts ---
        // Create custom boat hull geometry (Same logic as originally intended)
        const hullBase = new THREE.BoxGeometry(0.7, 0.4, 0.8);
        const bowGeo = new THREE.BoxGeometry(0.8, 0.4, 0.6);

        // Taper the hull base bottom
        const hullPos = hullBase.getAttribute('position');
        for (let i = 0; i < hullPos.count; i++) {
            if (hullPos.getY(i) < 0) { // Bottom vertices
                hullPos.setX(i, hullPos.getX(i) * 0.7);
                hullPos.setZ(i, hullPos.getZ(i) * 0.9);
            }
        }

        // Taper the bow
        const posAttr = bowGeo.getAttribute('position');
        for (let i = 0; i < posAttr.count; i++) {
            if (posAttr.getZ(i) > 0.2) { // Front vertices
                posAttr.setX(i, posAttr.getX(i) * 0.1);
            }
            if (posAttr.getY(i) < 0) { // Bottom vertices
                posAttr.setX(i, posAttr.getX(i) * 0.7);
            }
        }
        bowGeo.translate(0, 0.2, 0.5); // Front part
        hullBase.translate(0, 0.2, -0.2); // Mid-back part

        const combinedHull = BufferGeometryUtils.mergeGeometries([hullBase, bowGeo]);
        // Shift hull down slightly to submerge it
        combinedHull.translate(0, -0.1, 0);
        this.hullMesh = this.createMesh(combinedHull, whiteMat, this.MAX_INSTANCES, true);

        const mastGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
        mastGeo.translate(0, 0.6, 0);
        this.mastMesh = this.createMesh(mastGeo, assets.materials.wood || whiteMat);

        const sailGeo = new THREE.BoxGeometry(0.05, 0.6, 0.8);
        sailGeo.translate(0, 0.8, -0.1);
        this.sailMesh = this.createMesh(sailGeo, whiteMat);

        // Oars - Restore 4 oars at original positions
        const oarBaseGeo = new THREE.BoxGeometry(0.03, 0.03, 0.5);
        oarBaseGeo.rotateY(Math.PI / 2);
        oarBaseGeo.rotateX(-Math.PI / 4.5); // Steep angle to reach water

        const oarsGeos = [];
        const oarOffsetsZ = [-0.15, 0.15];
        const oarOffsetsX = [-0.35, 0.35];

        for (const oz of oarOffsetsZ) {
            for (const ox of oarOffsetsX) {
                const oar = oarBaseGeo.clone();
                if (ox < 0) oar.rotateY(Math.PI);
                oar.translate(ox, 0.1, oz);
                oarsGeos.push(oar);
            }
        }
        const combinedOars = BufferGeometryUtils.mergeGeometries(oarsGeos);
        this.oarMesh = this.createMesh(combinedOars, assets.materials.wood || whiteMat);

        // Banner
        const bannerGeo = new THREE.BoxGeometry(0.02, 0.15, 0.6);
        bannerGeo.translate(0, 1.15, -0.35);
        this.bannerMesh = this.createMesh(bannerGeo, whiteMat);

        // Job Indicator (!)
        this.indicatorTopMesh = this.createMesh(assets.geometries.jobIndicatorTop, assets.materials.redIndicator);
        this.indicatorDotMesh = this.createMesh(assets.geometries.jobIndicatorDot, assets.materials.redIndicator);
    }

    update(units, deltaTime, viewCenter) {
        // deltaTime は現在は内部で使用していませんが、シグネチャ維持のため追加
        if (!viewCenter && deltaTime instanceof THREE.Vector3) {
            viewCenter = deltaTime;
        }
        this.baseUpdate(units, viewCenter);

        // Reset dummy state for tests/stability
        this.dummy.position.set(0, 0, 0);
        this.dummy.scale.set(1, 1, 1);
        this.dummy.rotation.set(0, 0, 0);
        this.dummy.updateMatrix();
    }

    resetCounts() {
        this.countBody = 0;
        this.countIndicator = 0;
    }

    isExhausted() {
        return this.countBody >= this.MAX_INSTANCES;
    }

    updateInstances(unit, posX, posY, posZ, rotY) {
        const colorNormal = new THREE.Color(0x654321);
        const colorHair = new THREE.Color(0xD4AF37);
        const colorSpecial = new THREE.Color(0x00008B);
        const colorKnight = new THREE.Color(0x999999);
        const colorWizard = new THREE.Color(0x440088);
        const colorSkin = new THREE.Color(0xffccaa);
        const colorFisher = new THREE.Color(0x00CED1);
        const colorHunter = new THREE.Color(0x006400);

        // Determine Color
        let clothesColor = colorNormal;

        if (unit.faction === 'enemy') {
            const colorEnemyArmor = new THREE.Color(0x222222);
            const colorEnemyClothes = new THREE.Color(0x333333);
            const colorEnemyWizard = new THREE.Color(0x220022);

            if (unit.role === 'knight') clothesColor = colorEnemyArmor;
            else if (unit.role === 'wizard') clothesColor = colorEnemyWizard;
            else clothesColor = colorEnemyClothes;
        } else {
            if (unit.role === 'knight') clothesColor = colorKnight;
            else if (unit.role === 'wizard') clothesColor = colorWizard;
            else if (unit.role === 'fisher') clothesColor = colorFisher;
            else if (unit.role === 'hunter') clothesColor = colorHunter;
            else if (unit.role === 'worker') {
                if (unit.isSpecial) clothesColor = colorSpecial;
                else clothesColor = colorNormal;
            }
        }

        const dummy = this.dummy;
        const isNaval = !!unit.isNaval;

        // Reset all accessory scales if naval (to prevent leaks)
        if (isNaval) {
            dummy.scale.set(0, 0, 0);
            dummy.updateMatrix();
            this.torsoMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.headMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.faceMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.leftArmMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.rightArmMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.leftLegMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.rightLegMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.swordMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.visorMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.staffMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.hatMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.hatBrimMesh.setMatrixAt(this.countBody, dummy.matrix);

            // Ship Visual
            dummy.position.set(posX, posY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.hullMesh.setMatrixAt(this.countBody, dummy.matrix);
            const hullColor = (unit.faction === 'enemy') ? new THREE.Color(0x333333) : new THREE.Color(0x8B4513);
            this.hullMesh.setColorAt(this.countBody, hullColor);

            // DRAW NAVAL ACCESSORIES (Mast, Sail, Banner, Oars)
            // Use posY instead of hardcoded 0 to align with the hull
            const accessoryY = posY;

            // Mast
            dummy.position.set(posX, accessoryY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.mastMesh.setMatrixAt(this.countBody, dummy.matrix);

            // Sail
            dummy.position.set(posX, accessoryY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.sailMesh.setMatrixAt(this.countBody, dummy.matrix);
            const sailColor = (unit.faction === 'enemy') ? new THREE.Color(0xCC0000) : new THREE.Color(0xEEEEEE);
            this.sailMesh.setColorAt(this.countBody, sailColor);

            // Banner
            dummy.position.set(posX, accessoryY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.bannerMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.bannerMesh.setColorAt(this.countBody, sailColor);

            // Oars
            dummy.position.set(posX, accessoryY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.oarMesh.setMatrixAt(this.countBody, dummy.matrix);

            // Ship Weapon (Staff as a simple mast/cannon look if wizard role)
            if (unit.role === 'warship') {
                // Warship specific accessories could go here
            }

        } else {
            // Hide Hull, Mast, Sail
            dummy.scale.set(0, 0, 0);
            dummy.updateMatrix();
            this.hullMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.mastMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.sailMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.oarMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.bannerMesh.setMatrixAt(this.countBody, dummy.matrix);
        }

        // 1. Torso
        if (!isNaval) {
            dummy.position.set(posX, posY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.torsoMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.torsoMesh.setColorAt(this.countBody, clothesColor);
        }

        // 2. Head & 3. Face
        if (!isNaval) {
            dummy.position.set(posX, posY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            let headScaleY = 1.0;
            if (unit.role === 'wizard') {
                headScaleY = 0.5;
                dummy.scale.set(1, headScaleY, 1);
                dummy.position.y += 0.2375;
            }
            dummy.updateMatrix();
            this.headMesh.setMatrixAt(this.countBody, dummy.matrix);
            // Knight Helmet vs Hair
            if (unit.role === 'knight') {
                if (unit.faction === 'enemy') {
                    this.headMesh.setColorAt(this.countBody, new THREE.Color(0x111111)); // Enemy Helmet (Obsidian)
                } else {
                    this.headMesh.setColorAt(this.countBody, clothesColor);
                }
            } else {
                // Enemy Hair: Black
                if (unit.faction === 'enemy') {
                    this.headMesh.setColorAt(this.countBody, new THREE.Color(0x111111));
                } else {
                    this.headMesh.setColorAt(this.countBody, colorHair);
                }
            }

            if (this.hullMesh) {
                this.hullMesh.instanceMatrix.needsUpdate = true;
                if (this.hullMesh.instanceColor) this.hullMesh.instanceColor.needsUpdate = true;
            }
            if (this.mastMesh) {
                this.mastMesh.instanceMatrix.needsUpdate = true;
            }
            if (this.sailMesh) {
                this.sailMesh.instanceMatrix.needsUpdate = true;
                if (this.sailMesh.instanceColor) this.sailMesh.instanceColor.needsUpdate = true;
            }
            // 3. Face
            this.faceMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.faceMesh.setColorAt(this.countBody, new THREE.Color(0xFFFFFF));
        }      // 4. Arms & Legs
        if (!isNaval) {
            // Left Arm
            dummy.position.set(0.18, 0.45, 0);
            dummy.position.applyAxisAngle(this._up, rotY);
            dummy.position.add(this._scratchVector.set(posX, posY, posZ));
            dummy.rotation.set(unit.limbs.leftArm.x, rotY, 0);
            if (unit.role === 'wizard') {
                dummy.scale.set(1, 1.25, 1);
                dummy.translateY(-0.035);
            } else {
                dummy.scale.set(1, 1, 1);
            }
            dummy.updateMatrix();
            this.leftArmMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.leftArmMesh.setColorAt(this.countBody, colorSkin);

            // Right Arm
            dummy.position.set(-0.18, 0.45, 0);
            dummy.position.applyAxisAngle(this._up, rotY);
            dummy.position.add(this._scratchVector.set(posX, posY, posZ));
            dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
            if (unit.role === 'wizard') {
                dummy.scale.set(1, 1.25, 1);
                dummy.translateY(-0.035);
            } else {
                dummy.scale.set(1, 1, 1);
            }
            dummy.updateMatrix();
            this.rightArmMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.rightArmMesh.setColorAt(this.countBody, colorSkin);

            // Left Leg
            dummy.position.set(0.08, 0.25, 0);
            dummy.position.applyAxisAngle(this._up, rotY);
            dummy.position.add(this._scratchVector.set(posX, posY, posZ));
            dummy.rotation.set(unit.limbs.leftLeg.x, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.leftLegMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.leftLegMesh.setColorAt(this.countBody, clothesColor);

            // Right Leg
            dummy.position.set(-0.08, 0.25, 0);
            dummy.position.applyAxisAngle(this._up, rotY);
            dummy.position.add(this._scratchVector.set(posX, posY, posZ));
            dummy.rotation.set(unit.limbs.rightLeg.x, rotY, 0);
            dummy.updateMatrix();
            this.rightLegMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.rightLegMesh.setColorAt(this.countBody, clothesColor);
        }

        // Accessories
        if (!isNaval && unit.role === 'knight') {
            // Sword
            dummy.position.set(-0.18, 0.45, 0);
            dummy.position.applyAxisAngle(this._up, rotY);
            dummy.position.add(this._scratchVector.set(posX, posY, posZ));
            dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
            dummy.translateY(-0.25);
            dummy.rotateX(Math.PI / 2);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.swordMesh.setMatrixAt(this.countBody, dummy.matrix);

            // Visor
            dummy.position.set(posX, posY + 0.53, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1.1, 0.2, 1.1);
            dummy.updateMatrix();
            this.visorMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.visorMesh.setColorAt(this.countBody, new THREE.Color(0x999999));
        } else {
            dummy.scale.set(0, 0, 0);
            dummy.updateMatrix();
            this.swordMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.visorMesh.setMatrixAt(this.countBody, dummy.matrix);
        }

        if (!isNaval && unit.role === 'wizard') {
            // Staff
            dummy.position.set(-0.18, 0.45, 0);
            dummy.position.applyAxisAngle(this._up, rotY);
            dummy.position.add(this._scratchVector.set(posX, posY, posZ));
            dummy.scale.set(1, 1, 1);
            dummy.rotation.set(unit.limbs.rightArm.x, rotY, 0);
            dummy.translateY(-0.25);
            dummy.rotateX(Math.PI / 2);
            dummy.updateMatrix();
            this.staffMesh.setMatrixAt(this.countBody, dummy.matrix);
            const woodColor = (Unit.assets.materials.wood && Unit.assets.materials.wood.color) ? Unit.assets.materials.wood.color : new THREE.Color(0x5D4037);
            this.staffMesh.setColorAt(this.countBody, woodColor);

            // Hat
            dummy.position.set(posX, posY + 0.60, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.hatMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.hatBrimMesh.setMatrixAt(this.countBody, dummy.matrix);

            // Set Hat Color based on faction
            const hatColor = (unit.faction === 'enemy') ? new THREE.Color(0x8B4513) : new THREE.Color(0x333388);
            this.hatMesh.setColorAt(this.countBody, hatColor);
            this.hatBrimMesh.setColorAt(this.countBody, hatColor);
        } else {
            dummy.scale.set(0, 0, 0);
            dummy.updateMatrix();
            this.staffMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.hatMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.hatBrimMesh.setMatrixAt(this.countBody, dummy.matrix);
        }

        // Job Indicator
        const isActuallyAssigned = unit.targetRequest &&
            (unit.targetRequest.status === 'assigned' || unit.targetRequest.isManual) &&
            String(unit.targetRequest.assignedTo) === String(unit.id) &&
            unit.faction !== 'enemy';

        if (isActuallyAssigned && this.indicatorTopMesh && this.countIndicator < 1000) {
            const floatY = Math.sin(Date.now() * 0.005) * 0.1;
            dummy.position.set(posX, posY + 1.2 + floatY, posZ);
            dummy.rotation.set(0, rotY, 0);
            dummy.scale.set(1, 1, 1);
            dummy.updateMatrix();
            this.indicatorTopMesh.setMatrixAt(this.countIndicator, dummy.matrix);
            this.indicatorDotMesh.setMatrixAt(this.countIndicator, dummy.matrix);
            this.countIndicator++;
        }

        this.countBody++;

        // Safety: Reset dummy scale to avoid leaking "0" state to tests spying on the matrix
        this.dummy.scale.set(1, 1, 1);
        this.dummy.updateMatrix();
    }

    commitUpdates() {
        this.torsoMesh.count = this.countBody;
        this.headMesh.count = this.countBody;
        this.faceMesh.count = this.countBody;
        this.leftArmMesh.count = this.countBody;
        this.rightArmMesh.count = this.countBody;
        this.leftLegMesh.count = this.countBody;
        this.rightLegMesh.count = this.countBody;
        this.swordMesh.count = this.countBody;
        this.staffMesh.count = this.countBody;
        this.hatMesh.count = this.countBody;
        this.hatBrimMesh.count = this.countBody;
        this.visorMesh.count = this.countBody;
        this.hullMesh.count = this.countBody;

        if (this.indicatorTopMesh) this.indicatorTopMesh.count = this.countIndicator;
        if (this.indicatorDotMesh) this.indicatorDotMesh.count = this.countIndicator;
        if (this.hullMesh) this.hullMesh.count = this.countBody;
        if (this.mastMesh) this.mastMesh.count = this.countBody;
        if (this.sailMesh) this.sailMesh.count = this.countBody;
        if (this.oarMesh) this.oarMesh.count = this.countBody;
        if (this.bannerMesh) this.bannerMesh.count = this.countBody;

        if (this.torsoMesh) this.torsoMesh.instanceMatrix.needsUpdate = true;
        const meshes = [
            this.torsoMesh, this.headMesh, this.faceMesh, this.leftArmMesh, this.rightArmMesh,
            this.leftLegMesh, this.rightLegMesh, this.swordMesh, this.staffMesh, this.hatMesh,
            this.hatBrimMesh, this.visorMesh, this.hullMesh, this.mastMesh, this.sailMesh,
            this.oarMesh, this.bannerMesh, this.indicatorTopMesh, this.indicatorDotMesh
        ];
        meshes.filter(m => !!m).forEach(m => this.updateMesh(m));
    }

    dispose() {
        const meshes = [
            this.torsoMesh, this.headMesh, this.faceMesh, this.leftArmMesh, this.rightArmMesh,
            this.leftLegMesh, this.rightLegMesh, this.swordMesh, this.visorMesh, this.staffMesh,
            this.hatMesh, this.hatBrimMesh, this.hullMesh, this.indicatorTopMesh, this.indicatorDotMesh
        ];
        meshes.forEach(m => {
            if (m) {
                this.scene.remove(m);
                if (m.geometry) m.geometry.dispose();
            }
        });

        if (this.whiteMat) this.whiteMat.dispose();
    }
}
