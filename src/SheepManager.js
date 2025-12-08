import * as THREE from 'three';

export class SheepManager {
    static assets = {
        geometries: {},
        materials: {},
        initialized: false
    };

    static initAssets() {
        if (SheepManager.assets.initialized) return;

        // Geometries
        SheepManager.assets.geometries.body = new THREE.BoxGeometry(0.4, 0.3, 0.6);
        SheepManager.assets.geometries.head = new THREE.BoxGeometry(0.25, 0.25, 0.3);
        SheepManager.assets.geometries.leg = new THREE.BoxGeometry(0.1, 0.3, 0.1);

        // Materials
        SheepManager.assets.materials.body = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
        SheepManager.assets.materials.head = new THREE.MeshLambertMaterial({ color: 0x111111 });
        SheepManager.assets.materials.leg = new THREE.MeshLambertMaterial({ color: 0x111111 });

        SheepManager.assets.initialized = true;
    }

    constructor(scene, terrain, clippingPlanes) {
        SheepManager.initAssets();

        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.sheeps = [];
        this.sheepCount = 10;

        // Apply Clipping
        const mats = SheepManager.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat) mat.clippingPlanes = this.clippingPlanes;
        });

        this.initSheeps();
    }

    removeSheep(sheep) {
        this.terrain.unregisterEntity(sheep);
        this.scene.remove(sheep);
        // Filter from this.sheeps array... (Caller needs to handle this or we add logic)
    }

    initSheeps() {
        for (let i = 0; i < this.sheepCount; i++) {
            const sheep = this.createSheep();
            this.spawnSheep(sheep);
            this.scene.add(sheep);
            this.sheeps.push({
                mesh: sheep,
                state: 'idle', // idle, moving, eating
                timer: Math.random() * 5,
                targetX: 0,
                targetZ: 0
            });
        }
    }

    createSheep() {
        const group = new THREE.Group();

        // Body (White Box)
        const body = new THREE.Mesh(SheepManager.assets.geometries.body, SheepManager.assets.materials.body);
        body.position.y = 0.3;
        group.add(body);

        // Head (Black Box)
        const head = new THREE.Mesh(SheepManager.assets.geometries.head, SheepManager.assets.materials.head);
        head.position.set(0, 0.5, 0.35);
        group.add(head);

        // Legs (4)
        const positions = [
            { x: 0.1, z: 0.2 }, { x: -0.1, z: 0.2 },
            { x: 0.1, z: -0.2 }, { x: -0.1, z: -0.2 }
        ];

        const legs = [];
        positions.forEach(pos => {
            const leg = new THREE.Mesh(SheepManager.assets.geometries.leg, SheepManager.assets.materials.leg);
            leg.position.set(pos.x, 0.15, pos.z);
            group.add(leg);
            legs.push(leg);
        });

        group.userData.legs = legs; // Store legs for animation

        return group;
    }

    spawnSheep(sheep) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Find random land position
        let found = false;
        let attempts = 0;
        while (!found && attempts < 100) {
            const x = Math.floor(Math.random() * logicalW);
            const z = Math.floor(Math.random() * logicalD);
            const height = this.terrain.getTileHeight(x, z);

            if (height > 0.5) { // Land
                const pos = this.getPositionForGrid(x, z);
                sheep.position.copy(pos);
                sheep.userData.gridX = x;
                sheep.userData.gridZ = z;

                // Register
                this.terrain.registerEntity(sheep, x, z, 'sheep');

                found = true;
            }
            attempts++;
        }
    }

    getPositionForGrid(x, z) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const height = this.terrain.getInterpolatedHeight(x, z);
        return new THREE.Vector3(
            x - logicalW / 2 + 0.5,
            height,
            z - logicalD / 2 + 0.5
        );
    }

    update(time, deltaTime) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        this.sheeps.forEach(sheepData => {
            const sheep = sheepData.mesh;

            // AI State Machine
            sheepData.timer -= deltaTime;

            // Anti-Stagnation Logic
            if (!sheepData.lastGridX) {
                sheepData.lastGridX = sheep.userData.gridX;
                sheepData.lastGridZ = sheep.userData.gridZ;
                sheepData.stagnationTimer = 0;
            }

            // Check if moved
            if (sheepData.lastGridX === sheep.userData.gridX && sheepData.lastGridZ === sheep.userData.gridZ) {
                sheepData.stagnationTimer += deltaTime;
            } else {
                sheepData.lastGridX = sheep.userData.gridX;
                sheepData.lastGridZ = sheep.userData.gridZ;
                sheepData.stagnationTimer = 0;
            }

            // Force move if stuck
            if (sheepData.stagnationTimer > 15) {
                sheepData.state = 'moving';
                sheepData.timer = 5;
                // Randomize stuck timer to prevent sync
                sheepData.stagnationTimer = -Math.random() * 5;
            }

            if (sheepData.timer <= 0) {
                if (Math.random() < 0.3 || sheepData.stagnationTimer < 0) {
                    sheepData.state = 'moving';
                    sheepData.timer = 2 + Math.random() * 3;

                    // Pick Neighbor (Grid Movement)
                    const dirs = [{ x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }];
                    // Shuffle
                    for (let i = dirs.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
                    }

                    let found = false;
                    for (const dir of dirs) {
                        let tx = sheep.userData.gridX + dir.x;
                        let tz = sheep.userData.gridZ + dir.z;

                        // Wrap
                        if (tx < 0) tx = logicalW - 1;
                        if (tx >= logicalW) tx = 0;
                        if (tz < 0) tz = logicalD - 1;
                        if (tz >= logicalD) tz = 0;

                        const h = this.terrain.getTileHeight(tx, tz);
                        const currentH = this.terrain.getTileHeight(sheep.userData.gridX, sheep.userData.gridZ);

                        // Ensure walkable land (h>0) and not too steep
                        if (h > 0 && Math.abs(h - currentH) <= 1.0) {
                            sheepData.targetX = tx;
                            sheepData.targetZ = tz;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        sheepData.state = 'idle'; // Trapped
                    }

                } else {
                    sheepData.state = 'idle';
                    sheepData.timer = 1 + Math.random() * 2;
                }
            }

            if (sheepData.state === 'moving' && sheepData.targetX !== undefined) {
                const targetPos = this.getPositionForGrid(sheepData.targetX, sheepData.targetZ);
                const currentPos = sheep.position.clone();
                const dir = targetPos.clone().sub(currentPos).normalize();

                // If close, verify arrival
                const dist = currentPos.distanceTo(targetPos);
                if (dist < 0.1) {
                    sheep.position.copy(targetPos);
                    const oldX = sheep.userData.gridX;
                    const oldZ = sheep.userData.gridZ;
                    sheep.userData.gridX = sheepData.targetX;
                    sheep.userData.gridZ = sheepData.targetZ;

                    this.terrain.moveEntity(sheep, oldX, oldZ, sheep.userData.gridX, sheep.userData.gridZ, 'sheep');
                    sheepData.state = 'idle';
                    sheepData.targetX = undefined;
                } else {
                    const speed = 2.0;
                    // Move
                    sheep.position.addScaledVector(dir, speed * deltaTime);

                    // Update Y continuously for smooth slope walking
                    const logicalW = this.terrain.logicalWidth || 80;
                    const logicalD = this.terrain.logicalDepth || 80;

                    // Simple Y update based on interpolated height of current position
                    // We need to un-map world coordinate to logic coordinate (0..160)
                    // World is centered at 0,0. 
                    // x = logicX - W/2 + 0.5
                    // logicX = x + W/2 - 0.5
                    const lx = sheep.position.x + logicalW / 2 - 0.5;
                    const lz = sheep.position.z + logicalD / 2 - 0.5;
                    sheep.position.y = this.terrain.getInterpolatedHeight(lx, lz);

                    // Rotate
                    const angle = Math.atan2(dir.x, dir.z);
                    sheep.rotation.y = angle;
                }

                // Walk anim
                const limbAngle = Math.sin(time * 10) * 0.2;
                if (sheep.userData.legs) {
                    sheep.userData.legs[0].rotation.x = limbAngle;
                    sheep.userData.legs[1].rotation.x = -limbAngle;
                    sheep.userData.legs[2].rotation.x = -limbAngle;
                    sheep.userData.legs[3].rotation.x = limbAngle;
                }
            } else {
                if (sheep.userData.legs) {
                    sheep.userData.legs.forEach(l => l.rotation.x = 0);
                }
            }
        });
    }
}
