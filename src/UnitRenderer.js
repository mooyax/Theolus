import * as THREE from 'three';
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
            Unit.assets.materials.face, Unit.assets.materials.metal, Unit.assets.materials.wood,
            Unit.assets.materials.wizardHat, Unit.assets.materials.redIndicator,
            Unit.assets.materials.armor, Unit.assets.materials.helmet, Unit.assets.materials.robe
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

        this.torsoMesh = this.createMesh(assets.geometries.body, whiteMat);
        this.headMesh = this.createMesh(assets.geometries.head, whiteMat);
        this.faceMesh = this.createMesh(assets.geometries.facePlane, assets.materials.face);

        this.leftArmMesh = this.createMesh(assets.geometries.limb, whiteMat);
        this.rightArmMesh = this.createMesh(assets.geometries.limb, whiteMat);
        this.leftLegMesh = this.createMesh(assets.geometries.limb, whiteMat);
        this.rightLegMesh = this.createMesh(assets.geometries.limb, whiteMat);

        this.swordMesh = this.createMesh(assets.geometries.sword, assets.materials.metal);
        this.staffMesh = this.createMesh(assets.geometries.staff, assets.materials.wood);
        this.hatMesh = this.createMesh(assets.geometries.wizardHat, assets.materials.wizardHat);
        this.hatBrimMesh = this.createMesh(assets.geometries.wizardHatBrim, assets.materials.wizardHat);
        this.visorMesh = this.createMesh(assets.geometries.head, whiteMat); // Visor uses head geo but scaled

        this.indicatorTopMesh = this.createMesh(assets.geometries.jobIndicatorTop, assets.materials.redIndicator, 1000);
        this.indicatorDotMesh = this.createMesh(assets.geometries.jobIndicatorDot, assets.materials.redIndicator, 1000);
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

        // 1. Torso
        dummy.position.set(posX, posY, posZ);
        dummy.rotation.set(0, rotY, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        this.torsoMesh.setMatrixAt(this.countBody, dummy.matrix);
        this.torsoMesh.setColorAt(this.countBody, clothesColor);

        // 2. Head
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

        // 3. Face
        this.faceMesh.setMatrixAt(this.countBody, dummy.matrix);
        this.faceMesh.setColorAt(this.countBody, new THREE.Color(0xFFFFFF));

        // 4. Arms & Legs
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

        // Accessories
        if (unit.role === 'knight') {
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

        if (unit.role === 'wizard') {
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
        } else {
            dummy.scale.set(0, 0, 0);
            dummy.updateMatrix();
            this.staffMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.hatMesh.setMatrixAt(this.countBody, dummy.matrix);
            this.hatBrimMesh.setMatrixAt(this.countBody, dummy.matrix);
        }

        // Job Indicator
        if (unit.targetRequest && this.indicatorTopMesh && this.countIndicator < 1000) {
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

        this.indicatorTopMesh.count = this.countIndicator;
        this.indicatorDotMesh.count = this.countIndicator;

        const meshes = [
            this.torsoMesh, this.headMesh, this.faceMesh, this.leftArmMesh, this.rightArmMesh,
            this.leftLegMesh, this.rightLegMesh, this.swordMesh, this.staffMesh, this.hatMesh,
            this.hatBrimMesh, this.visorMesh, this.indicatorTopMesh, this.indicatorDotMesh
        ];
        meshes.forEach(m => this.updateMesh(m));
    }

    dispose() {
        const meshes = [
            this.torsoMesh, this.headMesh, this.faceMesh, this.leftArmMesh, this.rightArmMesh,
            this.leftLegMesh, this.rightLegMesh, this.swordMesh, this.visorMesh, this.staffMesh,
            this.hatMesh, this.hatBrimMesh, this.indicatorTopMesh, this.indicatorDotMesh
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
