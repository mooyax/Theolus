import * as THREE from 'three';

export class Unit {
    constructor(scene, terrain, x, z) {
        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x || 20;
        this.gridZ = z || 20;

        // Character Group
        this.mesh = new THREE.Group();

        // Materials
        const clothesMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Brown fur/clothes
        const limbMaterial = new THREE.MeshLambertMaterial({ color: 0xFFCCAA }); // Plain skin for limbs

        // Head Materials (Array for 6 faces)
        // Right, Left, Top, Bottom, Front, Back
        const faceTexture = this.createFaceTexture();
        const hairTexture = this.createHairTexture();

        const headMaterials = [
            new THREE.MeshLambertMaterial({ map: hairTexture }), // Right
            new THREE.MeshLambertMaterial({ map: hairTexture }), // Left
            new THREE.MeshLambertMaterial({ map: hairTexture }), // Top
            new THREE.MeshLambertMaterial({ map: hairTexture }), // Bottom
            new THREE.MeshLambertMaterial({ map: faceTexture }), // Front
            new THREE.MeshLambertMaterial({ map: hairTexture })  // Back
        ];

        // Torso
        const torsoGeo = new THREE.BoxGeometry(0.3, 0.4, 0.2);
        this.torso = new THREE.Mesh(torsoGeo, clothesMaterial);
        this.torso.position.y = 0.4;
        this.mesh.add(this.torso);

        // Head
        const headGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        this.head = new THREE.Mesh(headGeo, headMaterials);
        this.head.position.y = 0.7;
        this.mesh.add(this.head);

        // Arms
        const armGeo = new THREE.BoxGeometry(0.1, 0.3, 0.1);

        this.leftArm = new THREE.Mesh(armGeo, limbMaterial);
        this.leftArm.position.set(0.2, 0.4, 0);
        this.mesh.add(this.leftArm);

        this.rightArm = new THREE.Mesh(armGeo, limbMaterial);
        this.rightArm.position.set(-0.2, 0.4, 0);
        this.mesh.add(this.rightArm);

        // Legs
        const legGeo = new THREE.BoxGeometry(0.12, 0.3, 0.12);

        this.leftLeg = new THREE.Mesh(legGeo, clothesMaterial);
        this.leftLeg.position.set(0.1, 0.15, 0);
        this.mesh.add(this.leftLeg);

        this.rightLeg = new THREE.Mesh(legGeo, clothesMaterial);
        this.rightLeg.position.set(-0.1, 0.15, 0);
        this.mesh.add(this.rightLeg);

        this.updatePosition();
        this.scene.add(this.mesh);

        // Create 8 visual clones for infinite wrapping
        this.clones = [];
        this.createClones();

        this.moveTimer = 0;
        this.moveInterval = 1000; // Move every 1 second
        this.lastTime = performance.now();

        // Animation state
        this.isMoving = false;
        this.targetX = 0;
        this.targetZ = 0;
        this.moveStartTime = 0;
        this.moveDuration = 500; // ms to move between tiles
    }

    createClones() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const offsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        offsets.forEach(offset => {
            const clone = this.mesh.clone();
            this.scene.add(clone);
            this.clones.push({ mesh: clone, offset: offset });
        });
    }

    createFaceTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Skin
        ctx.fillStyle = '#FFCCAA';
        ctx.fillRect(0, 0, 64, 64);

        // Hair (Top fringe)
        ctx.fillStyle = '#4A3000';
        ctx.fillRect(0, 0, 64, 15);

        // Eyes
        ctx.fillStyle = '#000000';
        ctx.fillRect(15, 25, 8, 8);
        ctx.fillRect(41, 25, 8, 8);

        // Mouth
        ctx.fillStyle = '#A0522D';
        ctx.fillRect(20, 45, 24, 4);

        return new THREE.CanvasTexture(canvas);
    }

    createHairTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Hair color
        ctx.fillStyle = '#4A3000';
        ctx.fillRect(0, 0, 64, 64);

        // Noise/Texture
        ctx.fillStyle = '#3A2000';
        for (let i = 0; i < 20; i++) {
            ctx.fillRect(Math.random() * 60, Math.random() * 60, 4, 4);
        }

        return new THREE.CanvasTexture(canvas);
    }

    update(time) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Animation
        if (this.isMoving) {
            const progress = (time - this.moveStartTime) / this.moveDuration;

            if (progress >= 1) {
                this.isMoving = false;
                this.gridX = this.targetGridX;
                this.gridZ = this.targetGridZ;
                this.updatePosition(); // Snap to final position

                // Reset limbs
                this.leftArm.rotation.x = 0;
                this.rightArm.rotation.x = 0;
                this.leftLeg.rotation.x = 0;
                this.rightLeg.rotation.x = 0;

                this.tryBuildHouse();
            } else {
                // Interpolate position
                // Handle wrapping interpolation
                let sx = this.startGridX;
                let sz = this.startGridZ;
                let tx = this.targetGridX;
                let tz = this.targetGridZ;

                if (tx - sx > logicalW / 2) sx += logicalW;
                if (sx - tx > logicalW / 2) tx += logicalW;
                if (tz - sz > logicalD / 2) sz += logicalD;
                if (sz - tz > logicalD / 2) tz += logicalD;

                const lerpX = sx + (tx - sx) * progress;
                const lerpZ = sz + (tz - sz) * progress;

                const pos = this.getPositionForGrid(lerpX, lerpZ);

                // Add hop
                // pos.y += Math.sin(progress * Math.PI) * 0.2; // Removed hop

                this.mesh.position.copy(pos);

                // Animate limbs
                const limbAngle = Math.sin(progress * Math.PI * 4) * 0.5;
                this.leftArm.rotation.x = limbAngle;
                this.rightArm.rotation.x = -limbAngle;
                this.leftLeg.rotation.x = -limbAngle;
                this.rightLeg.rotation.x = limbAngle;
            }
        } else {
            if (time - this.lastTime > this.moveInterval) {
                this.moveRandomly();
                this.lastTime = time;
            }
        }

        // Sync Clones
        this.updateClones();
    }

    updateClones() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Sync position, rotation, and limb rotations
        this.clones.forEach(cloneObj => {
            const clone = cloneObj.mesh;
            const offset = cloneObj.offset;

            clone.position.copy(this.mesh.position);
            clone.position.x += offset.x * logicalW;
            clone.position.z += offset.z * logicalD;

            clone.rotation.copy(this.mesh.rotation);

            for (let i = 0; i < this.mesh.children.length; i++) {
                clone.children[i].rotation.copy(this.mesh.children[i].rotation);
                clone.children[i].position.copy(this.mesh.children[i].position);
            }
        });
    }

    moveRandomly() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const directions = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ];

        const dir = directions[Math.floor(Math.random() * directions.length)];

        let targetX = this.gridX + dir.x;
        let targetZ = this.gridZ + dir.z;

        // Wrap logic
        if (targetX < 0) targetX = logicalW - 1;
        if (targetX >= logicalW) targetX = 0;
        if (targetZ < 0) targetZ = logicalD - 1;
        if (targetZ >= logicalD) targetZ = 0;

        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetHeight = this.terrain.getTileHeight(targetX, targetZ);

        if (Math.abs(targetHeight - currentHeight) <= 1) {
            if (targetHeight > 0.5) {
                this.isMoving = true;
                this.moveStartTime = performance.now();
                this.startGridX = this.gridX;
                this.startGridZ = this.gridZ;
                this.targetGridX = targetX;
                this.targetGridZ = targetZ;

                const angle = Math.atan2(dir.x, dir.z);
                this.mesh.rotation.y = angle;
            }
        }
    }

    updatePosition() {
        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        this.mesh.position.copy(pos);
    }

    getPositionForGrid(x, z) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const height = this.terrain.getInterpolatedHeight(x, z);
        return new THREE.Vector3(
            x - logicalW / 2 + 0.5,
            height + 0.25, // height is surface height, + half unit height (approx)
            z - logicalD / 2 + 0.5
        );
    }

    tryBuildHouse() {
        const cell = this.terrain.grid[this.gridX][this.gridZ];
        if (!cell.hasBuilding) {
            // Simple rule: 10% chance to build if no building
            if (Math.random() < 0.1) {
                this.buildHouse();
            }
        }
    }

    buildHouse() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const cell = this.terrain.grid[this.gridX][this.gridZ];
        cell.hasBuilding = true;

        // House Group
        const houseGroup = new THREE.Group();

        // Materials
        const woodTexture = this.createWoodTexture();
        const roofTexture = this.createRoofTexture();

        const wallMaterial = new THREE.MeshLambertMaterial({ map: woodTexture });
        const roofMaterial = new THREE.MeshLambertMaterial({ map: roofTexture });

        // Walls
        const wallGeo = new THREE.BoxGeometry(0.6, 0.4, 0.6);
        const walls = new THREE.Mesh(wallGeo, wallMaterial);
        walls.position.y = 0.2;
        houseGroup.add(walls);

        // Roof
        const roofGeo = new THREE.ConeGeometry(0.5, 0.4, 4);
        const roof = new THREE.Mesh(roofGeo, roofMaterial);
        roof.position.y = 0.6;
        roof.rotation.y = Math.PI / 4; // Align with walls
        houseGroup.add(roof);

        const height = this.terrain.getTileHeight(this.gridX, this.gridZ);
        houseGroup.position.set(
            this.gridX - logicalW / 2 + 0.5,
            height,
            this.gridZ - logicalD / 2 + 0.5
        );

        this.scene.add(houseGroup);

        // Create clones for the house
        const offsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        offsets.forEach(offset => {
            const clone = houseGroup.clone();
            clone.position.x += offset.x * logicalW;
            clone.position.z += offset.z * logicalD;
            this.scene.add(clone);
        });

        console.log("House built at", this.gridX, this.gridZ);
    }

    createWoodTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Base brown
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, 64, 64);

        // Wood grain lines
        ctx.strokeStyle = '#5D2906';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 8 + Math.random() * 4);
            ctx.lineTo(64, i * 8 + Math.random() * 4);
            ctx.stroke();
        }

        return new THREE.CanvasTexture(canvas);
    }

    createRoofTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Base red/brown
        ctx.fillStyle = '#A52A2A';
        ctx.fillRect(0, 0, 64, 64);

        // Shingles
        ctx.fillStyle = '#800000';
        for (let y = 0; y < 64; y += 8) {
            for (let x = 0; x < 64; x += 8) {
                if ((x + y) % 16 === 0) ctx.fillRect(x, y, 7, 7);
            }
        }

        return new THREE.CanvasTexture(canvas);
    }
}
