import * as THREE from 'three';

export class Unit {
    constructor(scene, terrain, x, z) {
        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x || 20;
        this.gridZ = z || 20;

        // Lifespan
        this.age = 0;
        this.lifespan = 50 + Math.random() * 30; // 50-80 seconds
        this.isDead = false;
        this.isFinished = false; // True when death animation is done
        this.crossMesh = null;

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

    update(time, deltaTime) {
        if (this.isDead) {
            this.updateDeathAnimation(deltaTime);
            return;
        }

        // Aging
        this.age += deltaTime;
        if (this.age >= this.lifespan) {
            this.die();
            return;
        }

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

                this.tryBuildStructure();
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

    tryBuildStructure() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const x = this.gridX;
        const z = this.gridZ;
        const cell = this.terrain.grid[x][z];

        if (cell.hasBuilding) return;

        // Check for Castle (Large House)
        // Condition: Total Population > 2000
        if (window.game && window.game.totalPopulation > 2000) {
            // Check 2x2 area: (x,z), (x+1,z), (x,z+1), (x+1,z+1)
            const x1 = (x + 1) % logicalW;
            const z1 = (z + 1) % logicalD;

            const cells = [
                this.terrain.grid[x][z],
                this.terrain.grid[x1][z],
                this.terrain.grid[x][z1],
                this.terrain.grid[x1][z1]
            ];

            const h = cell.height;
            const allFlat = cells.every(c => c.height === h && !c.hasBuilding);

            if (allFlat) {
                this.buildCastle(x, z, x1, z1);
                return;
            }
        }

        // Check for House (Flat land)
        // Check 3x3 area for flatness
        let isFlat = true;
        const height = cell.height;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {
                const tx = (x + dx + logicalW) % logicalW;
                const tz = (z + dz + logicalD) % logicalD;
                if (this.terrain.grid[tx][tz].height !== height) {
                    isFlat = false;
                    break;
                }
            }
            if (!isFlat) break;
        }

        if (isFlat) {
            // Simple rule: 10% chance to build if no building
            if (Math.random() < 0.1) {
                this.buildHouse();
            }
        } else {
            // Check for Farm (Not flat)
            if (Math.random() < 0.1) {
                this.buildFarm();
            }
        }
    }

    buildCastle(x0, z0, x1, z1) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Create Castle Mesh (2x2 size)
        const castleGroup = new THREE.Group();

        // Main Keep
        const keepGeo = new THREE.BoxGeometry(1.6, 1.5, 1.6);
        const keepMat = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // SaddleBrown
        const keep = new THREE.Mesh(keepGeo, keepMat);
        keep.position.y = 0.75;
        castleGroup.add(keep);

        // Windows for Castle
        const windowMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const windowGeo = new THREE.PlaneGeometry(0.3, 0.4);
        const windows = [];

        // 4 Windows on sides
        for (let i = 0; i < 4; i++) {
            const win = new THREE.Mesh(windowGeo, windowMat.clone());
            win.position.y = 1.0;
            // Position based on rotation
            if (i === 0) { win.position.z = 0.81; win.position.x = 0; } // Front
            if (i === 1) { win.position.z = -0.81; win.position.x = 0; win.rotation.y = Math.PI; } // Back
            if (i === 2) { win.position.x = 0.81; win.position.z = 0; win.rotation.y = Math.PI / 2; } // Right
            if (i === 3) { win.position.x = -0.81; win.position.z = 0; win.rotation.y = -Math.PI / 2; } // Left

            castleGroup.add(win);
            windows.push(win);
        }

        // Roof
        const roofGeo = new THREE.ConeGeometry(1.2, 1, 4);
        const roofMat = new THREE.MeshLambertMaterial({ color: 0x800000 }); // Maroon
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 1.5 + 0.5;
        roof.rotation.y = Math.PI / 4;
        castleGroup.add(roof);

        const height = this.terrain.getTileHeight(x0, z0);

        // Position at center of 2x2 area (approx)
        castleGroup.position.set(
            x0 - logicalW / 2 + 1.0,
            height,
            z0 - logicalD / 2 + 1.0
        );

        this.scene.add(castleGroup);

        // Mark all 4 cells
        const cells = [
            this.terrain.grid[x0][z0],
            this.terrain.grid[x1][z0],
            this.terrain.grid[x0][z1],
            this.terrain.grid[x1][z1]
        ];

        cells.forEach(c => {
            c.hasBuilding = true;
            c.building = castleGroup;
        });

        // UserData
        castleGroup.userData.type = 'castle';
        castleGroup.userData.population = 0;
        castleGroup.userData.gridX = x0;
        castleGroup.userData.gridZ = z0;
        castleGroup.userData.windows = windows; // Store windows

        this.terrain.buildings.push(castleGroup);

        // Unit enters castle
        this.isFinished = true;
        this.isDead = true;
        this.mesh.visible = false;
        console.log("Castle built at", x0, z0);
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

        // Windows for House
        const windowMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const windowGeo = new THREE.PlaneGeometry(0.15, 0.15);
        const windows = [];

        // 2 Windows (Front and Back?)
        for (let i = 0; i < 2; i++) {
            const win = new THREE.Mesh(windowGeo, windowMat.clone());
            win.position.y = 0.2;
            if (i === 0) { win.position.z = 0.31; win.position.x = 0; } // Front
            if (i === 1) { win.position.z = -0.31; win.position.x = 0; win.rotation.y = Math.PI; } // Back
            houseGroup.add(win);
            windows.push(win);
        }

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

        const clones = [];
        offsets.forEach(offset => {
            const clone = houseGroup.clone();
            clone.position.x += offset.x * logicalW;
            clone.position.z += offset.z * logicalD;
            this.scene.add(clone);
            clones.push(clone);
        });

        houseGroup.userData.clones = clones;
        houseGroup.userData.type = 'house';
        houseGroup.userData.population = 0;
        houseGroup.userData.gridX = this.gridX;
        houseGroup.userData.gridZ = this.gridZ;
        houseGroup.userData.windows = windows; // Store windows

        cell.building = houseGroup;
        this.terrain.buildings.push(houseGroup);

        console.log("House built at", this.gridX, this.gridZ);
    }

    buildFarm() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const cell = this.terrain.grid[this.gridX][this.gridZ];
        cell.hasBuilding = true;

        // Farm Group
        const farmGroup = new THREE.Group();

        // Wheat Texture
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#DAA520'; // GoldenRod
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = '#B8860B'; // Darker GoldenRod
        for (let i = 0; i < 10; i++) {
            ctx.fillRect(i * 6, 0, 2, 64); // Vertical lines
        }
        const wheatTexture = new THREE.CanvasTexture(canvas);

        const material = new THREE.MeshLambertMaterial({ map: wheatTexture });
        const geometry = new THREE.PlaneGeometry(0.8, 0.8);
        geometry.rotateX(-Math.PI / 2);

        const farm = new THREE.Mesh(geometry, material);
        farm.position.y = 0.05; // Slightly above ground
        farmGroup.add(farm);

        const height = this.terrain.getTileHeight(this.gridX, this.gridZ);
        farmGroup.position.set(
            this.gridX - logicalW / 2 + 0.5,
            height,
            this.gridZ - logicalD / 2 + 0.5
        );

        this.scene.add(farmGroup);

        // Create clones
        const offsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        const clones = [];
        offsets.forEach(offset => {
            const clone = farmGroup.clone();
            clone.position.x += offset.x * logicalW;
            clone.position.z += offset.z * logicalD;
            this.scene.add(clone);
            clones.push(clone);
        });

        farmGroup.userData.clones = clones;
        farmGroup.userData.type = 'farm';
        farmGroup.userData.gridX = this.gridX;
        farmGroup.userData.gridZ = this.gridZ;

        cell.building = farmGroup;
        this.terrain.buildings.push(farmGroup);

        console.log("Farm built at", this.gridX, this.gridZ);
    }

    die() {
        this.isDead = true;

        // Remove unit mesh
        if (this.mesh) {
            this.scene.remove(this.mesh);
        }
        if (this.clones) {
            this.clones.forEach(cloneObj => this.scene.remove(cloneObj.mesh));
        }

        // Create Cross
        this.createCross();
        console.log("Unit died at", this.gridX, this.gridZ);
    }

    createCross() {
        const group = new THREE.Group();

        const material = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1.0
        });

        // Vertical part
        const vGeo = new THREE.BoxGeometry(0.2, 1.0, 0.2);
        const vMesh = new THREE.Mesh(vGeo, material);
        vMesh.position.y = 0.5;
        group.add(vMesh);

        // Horizontal part
        const hGeo = new THREE.BoxGeometry(0.8, 0.2, 0.2);
        const hMesh = new THREE.Mesh(hGeo, material);
        hMesh.position.y = 0.7;
        group.add(hMesh);

        // Position
        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        group.position.copy(pos);

        this.scene.add(group);
        this.crossMesh = group;
        this.deathTimer = 0;
    }

    updateDeathAnimation(deltaTime) {
        if (!this.crossMesh) return;

        this.deathTimer += deltaTime;
        const duration = 3.0; // 3 seconds animation

        if (this.deathTimer >= duration) {
            this.scene.remove(this.crossMesh);
            this.isFinished = true;
        } else {
            // Rise up
            this.crossMesh.position.y += deltaTime * 1.0;

            // Fade out
            const progress = this.deathTimer / duration;
            this.crossMesh.children.forEach(child => {
                child.material.opacity = 1.0 - progress;
            });
        }
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
    serialize() {
        return {
            gridX: this.gridX,
            gridZ: this.gridZ,
            age: this.age,
            lifespan: this.lifespan,
            isDead: this.isDead,
            isFinished: this.isFinished,
            // Animation state
            isMoving: this.isMoving,
            targetX: this.targetX,
            targetZ: this.targetZ,
            moveStartTime: this.moveStartTime,
            startGridX: this.startGridX,
            startGridZ: this.startGridZ,
            targetGridX: this.targetGridX,
            targetGridZ: this.targetGridZ
        };
    }

    static deserialize(data, scene, terrain) {
        const unit = new Unit(scene, terrain, data.gridX, data.gridZ);
        unit.age = data.age;
        unit.lifespan = data.lifespan;
        unit.isDead = data.isDead;
        unit.isFinished = data.isFinished;

        // Restore animation state if moving
        if (data.isMoving) {
            unit.isMoving = true;
            unit.targetX = data.targetX;
            unit.targetZ = data.targetZ;
            // We can't easily restore exact animation time relative to performance.now()
            // So we might just snap to target or reset movement?
            // Let's just snap to target to avoid complexity with time sync.
            unit.isMoving = false;
            unit.gridX = data.targetGridX;
            unit.gridZ = data.targetGridZ;
            unit.updatePosition();
        }

        if (unit.isDead) {
            // If dead, ensure cross is created if not finished
            if (!unit.isFinished) {
                unit.createCross();
            } else {
                // If finished, maybe don't even spawn? 
                // But Game loop filters finished units.
                // If we spawn it as finished, it will be removed immediately.
            }
        }

        return unit;
    }
}
