import * as THREE from 'three';
import { Actor } from './Actor.js';

export class Sheep extends Actor {
    static assets = {
        geometries: {},
        materials: {},
        initialized: false
    };

    static initAssets() {
        if (Sheep.assets.initialized) return;

        // Geometries
        Sheep.assets.geometries.body = new THREE.BoxGeometry(0.4, 0.3, 0.6);
        Sheep.assets.geometries.head = new THREE.BoxGeometry(0.25, 0.25, 0.3);
        Sheep.assets.geometries.leg = new THREE.BoxGeometry(0.1, 0.3, 0.1);

        // Materials
        Sheep.assets.materials.body = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
        Sheep.assets.materials.head = new THREE.MeshLambertMaterial({ color: 0x111111 });
        Sheep.assets.materials.leg = new THREE.MeshLambertMaterial({ color: 0x111111 });

        Sheep.assets.initialized = true;
    }

    constructor(scene, terrain, x, z) {
        Sheep.initAssets();
        super(scene, terrain, x, z, 'sheep');

        this.moveInterval = 2000 + Math.random() * 3000;
        this.lastTime = 0;
        this.stagnationTimer = 0;

        // Init Visuals
        this.mesh = this.createMesh();
        this.scene.add(this.mesh);

        // Initial Position Sync
        this.updatePosition();
    }

    createMesh() {
        const group = new THREE.Group();

        // Body (White Box)
        const body = new THREE.Mesh(Sheep.assets.geometries.body, Sheep.assets.materials.body);
        body.position.y = 0.3;
        group.add(body);

        // Head (Black Box)
        const head = new THREE.Mesh(Sheep.assets.geometries.head, Sheep.assets.materials.head);
        head.position.set(0, 0.5, 0.35);
        group.add(head);

        // Legs (4)
        const positions = [
            { x: 0.1, z: 0.2 }, { x: -0.1, z: 0.2 },
            { x: 0.1, z: -0.2 }, { x: -0.1, z: -0.2 }
        ];

        const legs = [];
        positions.forEach(pos => {
            const leg = new THREE.Mesh(Sheep.assets.geometries.leg, Sheep.assets.materials.leg);
            leg.position.set(pos.x, 0.15, pos.z);
            group.add(leg);
            legs.push(leg);
        });

        group.userData.legs = legs; // Store legs for animation

        return group;
    }

    // Override Default Logic
    updateLogic(time, deltaTime) {
        // 1. Water Death Check
        const h = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (h <= 0) {
            this.die(); // Actor/Unit doesn't have die()? Entity doesn't. We must implement or handle removal.
            // Entity usually doesn't self-destruct from Scene list. Manager handles it.
            // But here we set a flag.
            this.isDead = true;
            return;
        }

        // 2. Movement State Machine
        if (!this.isMoving) {
            if (time - this.lastTime > this.moveInterval) {
                this.moveRandomly(time);
                this.lastTime = time;
                this.moveInterval = 2000 + Math.random() * 3000;
            } else {
                // Idle Animation
                if (this.mesh && this.mesh.userData.legs) {
                    this.mesh.userData.legs.forEach(l => l.rotation.x = 0);
                }
            }
        }
    }

    // Override moveRandomly to use Logic instead of direct
    moveRandomly(time) {
        // Use Actor.smartMove approach? Or simple neighbor check?
        // Let's use simple neighbor check but call startMove (inherited).

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
                // Determine duration based on Actor logic?
                // Actor.executeMove handles duration calc.
                this.executeMove(tx, tz, time);
                return;
            }
        }
    }

    canMoveTo(x, z) {
        const h = this.terrain.getTileHeight(x, z);
        const curH = this.terrain.getTileHeight(this.gridX, this.gridZ);

        // Land Only, Max Climb 1.0 (Sheep are agile-ish)
        if (h <= 0) return false;
        if (Math.abs(h - curH) > 1.0) return false;

        // Building Check?
        const cell = this.terrain.grid[x] && this.terrain.grid[x][z];
        if (cell && cell.hasBuilding) return false;

        return true;
    }

    // Hook for Animation
    onMoveStep(progress) {
        // Walk anim
        const limbAngle = Math.sin(progress * Math.PI * 4) * 0.5; // Fast waddle
        if (this.mesh && this.mesh.userData.legs) {
            this.mesh.userData.legs[0].rotation.x = limbAngle;
            this.mesh.userData.legs[1].rotation.x = -limbAngle;
            this.mesh.userData.legs[2].rotation.x = -limbAngle;
            this.mesh.userData.legs[3].rotation.x = limbAngle;
        }

        // Rotation (Entity handles Y rotation stored in this.rotationY)
        if (this.mesh) {
            this.mesh.rotation.y = this.rotationY;
            this.mesh.position.copy(this.position);
        }
    }

    // Cleanup
    dispose() {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            // Geometry disposal if unique? No, shared.
        }
        this.terrain.unregisterEntity(this);
    }
}
