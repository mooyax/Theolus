import * as THREE from 'three';

export class Fish {
    // Static Cache
    static assets = {
        geometries: {},
        materials: {},
        initialized: false
    };

    static initAssets() {
        if (Fish.assets.initialized) return;

        // Body: Sphere scaled to ellipsoid
        const bodyGeo = new THREE.SphereGeometry(0.12, 8, 8);
        bodyGeo.scale(0.4, 0.6, 1.5);
        Fish.assets.geometries.body = bodyGeo;

        // Tail: Cone rotated
        const tailGeo = new THREE.ConeGeometry(0.1, 0.3, 4);
        tailGeo.rotateX(-Math.PI / 2); // Point back
        Fish.assets.geometries.tail = tailGeo;

        // Material
        Fish.assets.materials.fish = new THREE.MeshLambertMaterial({ color: 0x44AAFF });

        Fish.assets.initialized = true;
    }

    constructor(scene, terrain, x, z) {
        Fish.initAssets();

        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x;
        this.gridZ = z;

        this.isDead = false;

        // Visuals
        this.mesh = new THREE.Group();

        const bodyMesh = new THREE.Mesh(Fish.assets.geometries.body, Fish.assets.materials.fish);
        this.mesh.add(bodyMesh);

        const tailMesh = new THREE.Mesh(Fish.assets.geometries.tail, Fish.assets.materials.fish);
        tailMesh.position.z = -0.3; // Behind body
        this.mesh.add(tailMesh);

        this.scene.add(this.mesh);

        this.updatePosition();

        // Movement
        this.moveTimer = 0;
        this.moveInterval = 500 + Math.random() * 1500;
        this.lastTime = performance.now();
        this.isMoving = false;

        // Animation
        this.targetGridX = x;
        this.targetGridZ = z;
        this.startGridX = x;
        this.startGridZ = z;
        this.moveStartTime = 0;
        this.moveDuration = 800;
        this.wiggleOffset = Math.random() * 100;

        // Register in Spatial Grid
        this.terrain.registerEntity(this, this.gridX, this.gridZ, 'fish');
    }

    update(time, deltaTime, isVisible = true) {
        if (this.isDead) return;

        // Check environment (did water become land?)
        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (currentHeight > 0.5) {
            this.die();
            return;
        }

        if (this.isMoving) {
            const progress = (time - this.moveStartTime) / this.moveDuration;

            if (progress >= 1) {
                this.isMoving = false;
                this.gridX = this.targetGridX;
                this.gridZ = this.targetGridZ;
                this.updatePosition();
            } else {
                const logicalW = this.terrain.logicalWidth || 80;
                const logicalD = this.terrain.logicalDepth || 80;

                let sx = this.startGridX;
                let sz = this.startGridZ;
                let tx = this.targetGridX;
                let tz = this.targetGridZ;

                // Wrap interpolation
                if (tx - sx > logicalW / 2) sx += logicalW;
                if (sx - tx > logicalW / 2) tx += logicalW;
                if (tz - sz > logicalD / 2) sz += logicalD;
                if (sz - tz > logicalD / 2) tz += logicalD;

                const lerpX = sx + (tx - sx) * progress;
                const lerpZ = sz + (tz - sz) * progress;

                const pos = this.getPositionForGrid(lerpX, lerpZ);
                this.mesh.position.copy(pos);

                // Wiggle animation (Sine wave)
                if (isVisible) {
                    const wiggle = Math.sin((time * 0.01) + this.wiggleOffset) * 0.3;
                    this.mesh.rotation.z = wiggle;
                }
            }
        } else {
            // Idle logic
            if (time - this.lastTime > this.moveInterval) {
                this.moveRandomly(time);
                this.lastTime = time;
            }

            // Idle animation (slow wiggle)
            if (isVisible) {
                const wiggle = Math.sin((time * 0.003) + this.wiggleOffset) * 0.15;
                this.mesh.rotation.z = wiggle;
            }
        }
    }

    updatePosition() {
        // Spatial Grid update
        const oldX = this._spatial ? this._spatial.x : this.gridX;
        const oldZ = this._spatial ? this._spatial.z : this.gridZ;

        this.terrain.moveEntity(this, oldX, oldZ, this.gridX, this.gridZ, 'fish');

        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        this.mesh.position.copy(pos);
    }

    getPositionForGrid(x, z) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Fish are at sea level (0) or slightly below? 
        // Let's say -0.2 to be submerged.
        // But we want them visible.
        const height = -0.2;

        return new THREE.Vector3(
            x - logicalW / 2 + 0.5,
            height,
            z - logicalD / 2 + 0.5
        );
    }

    moveRandomly(time) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const directions = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ];

        // Shuffle
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        for (const dir of directions) {
            let nextX = this.gridX + dir.x;
            let nextZ = this.gridZ + dir.z;

            // Wrap
            if (nextX < 0) nextX = logicalW - 1;
            if (nextX >= logicalW) nextX = 0;
            if (nextZ < 0) nextZ = logicalD - 1;
            if (nextZ >= logicalD) nextZ = 0;

            const height = this.terrain.getTileHeight(nextX, nextZ);

            if (height <= 0.5) { // Water
                this.isMoving = true;
                this.moveStartTime = time;
                this.startGridX = this.gridX;
                this.startGridZ = this.gridZ;
                this.targetGridX = nextX;
                this.targetGridZ = nextZ;

                // Rotate
                const angle = Math.atan2(dir.x, dir.z);
                this.mesh.rotation.y = angle;

                return;
            }
        }

        // If blocked, just rotate randomly slightly to show life
        if (Math.random() < 0.3) {
            this.mesh.rotation.y += (Math.random() - 0.5) * 1.0;
        }
    }

    die() {
        this.isDead = true;
        this.terrain.unregisterEntity(this);
        this.scene.remove(this.mesh);
        // Effects?
    }
}
