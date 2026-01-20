import * as THREE from 'three';
import { Actor } from './Actor.js';
import { WanderState } from './ai/states/State.js';

export class Fish extends Actor {
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
        super(scene, terrain, x, z, 'fish');

        this.moveInterval = 0.5 + Math.random() * 1.5;
        this.lastTime = 0;
        this.wiggleOffset = Math.random() * 100;

        // Visuals
        this.mesh = this.createMesh();
        this.scene.add(this.mesh);

        this.updatePosition();

        // Init State
        this.changeState(new WanderState(this));
    }

    createMesh() {
        const group = new THREE.Group();

        const bodyMesh = new THREE.Mesh(Fish.assets.geometries.body, Fish.assets.materials.fish);
        group.add(bodyMesh);

        const tailMesh = new THREE.Mesh(Fish.assets.geometries.tail, Fish.assets.materials.fish);
        tailMesh.position.z = -0.3; // Behind body
        group.add(tailMesh);

        group.userData.tail = tailMesh;

        return group;
    }

    // Override Default Logic
    updateLogic(time, deltaTime) {
        this.simTime = time;
        // 1. Land Death Check (Beached)
        const h = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (h > 0.5) {
            this.die();
            this.isDead = true;
            return;
        }

        // 2. State Machine Override
        if (this.state) {
            this.state.update(time, deltaTime);
        }

        // 3. Visuals (Wiggle if Idle)
        if (!this.isMoving) {
            // Idle Wiggle
            if (this.mesh) {
                const wiggle = Math.sin((time * 3.0) + this.wiggleOffset) * 0.15;
                this.mesh.rotation.z = wiggle;
            }
        }
    }

    moveRandomly(time) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const dirs = [{ x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }];
        // Shuffle
        for (let i = dirs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
        }

        for (const dir of dirs) {
            let tx = this.gridX + dir.x;
            let tz = this.gridZ + dir.z;

            // Wrap
            if (tx < 0) tx = logicalW - 1;
            if (tx >= logicalW) tx = 0;
            if (tz < 0) tz = logicalD - 1;
            if (tz >= logicalD) tz = 0;

            if (this.canMoveTo(tx, tz)) {
                this.executeMove(tx, tz, time);
                return;
            }
        }
    }

    canMoveTo(x, z) {
        const h = this.terrain.getTileHeight(x, z);
        // Water only (height <= 0.5)
        if (h > 0.5) return false;
        return true;
    }

    // Physics tweak: Fish swim at water level (approx height -0.2?)
    // Entity.getPositionForGrid uses Terrain height. 
    // If water height is 0, Terrain might return 0 (Sea Level) or -Depth.
    // If terrain.getTileHeight returns Bedrock height (negative), we need to override `getPositionForGrid`?
    // Let's check `Terrain.js`. Usually getTileHeight is Y.
    // If Water is a plane at Y=0, and Terrain is below...
    // Previous Fish.js said `const height = -0.2;`.
    // Entity.js calls `this.terrain.getInterpolatedHeight(x, z)`.
    // If that returns seabed, fish will walk on seabed.
    // If we want them swimming near surface, we must override `getPositionForGrid`.

    getPositionForGrid(x, z, target = null) {
        // Use Entity logic for X/Z, but force Y to fixed Water level
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const rawX = x - logicalW / 2 + 0.5;
        const rawZ = z - logicalD / 2 + 0.5;

        let offsets = { x: 0, y: 0 };
        // If we want visual jitter, use terrain offsets.
        if (this.terrain && this.terrain.getVisualOffset) {
            const planeX = rawX;
            const planeY = -rawZ;
            offsets = this.terrain.getVisualOffset(planeX, planeY);
        }

        const finalX = rawX + offsets.x;
        const finalY = -0.2; // Fixed Water Level
        const finalZ = rawZ - offsets.y;

        if (target) {
            target.set(finalX, finalY, finalZ);
            return target;
        }
        return new THREE.Vector3(finalX, finalY, finalZ);
    }

    onMoveStep(progress) {
        // Wiggle
        const wiggle = Math.sin((progress * Math.PI * 8) + this.wiggleOffset) * 0.3;
        if (this.mesh) {
            this.mesh.rotation.z = wiggle;
            // Entity handles Y rotation and Position
            this.mesh.position.copy(this.position);
            this.mesh.rotation.y = this.rotationY;
        }
    }

    dispose() {
        if (this.mesh) this.scene.remove(this.mesh);
        this.terrain.unregisterEntity(this);
    }
}
