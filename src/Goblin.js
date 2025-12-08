import * as THREE from 'three';

export class Goblin {
    // Static Cache
    static assets = {
        geometries: {},
        materials: {},
        initialized: false
    };

    static initAssets() {
        if (Goblin.assets.initialized) return;

        // Geometries
        // Normal Torso
        Goblin.assets.geometries.torsoNormal = new THREE.BoxGeometry(0.25, 0.3, 0.2);
        // Hobgoblin Torso
        Goblin.assets.geometries.torsoHob = new THREE.BoxGeometry(0.35, 0.3, 0.2); // 0.25 * 1.4 approx for X

        // Shared
        Goblin.assets.geometries.head = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        Goblin.assets.geometries.ear = new THREE.ConeGeometry(0.05, 0.15, 4);
        Goblin.assets.geometries.arm = new THREE.BoxGeometry(0.08, 0.25, 0.08);
        Goblin.assets.geometries.leg = new THREE.BoxGeometry(0.1, 0.25, 0.1);
        Goblin.assets.geometries.club = new THREE.CylinderGeometry(0.03, 0.05, 0.4, 6);

        // Cross
        Goblin.assets.geometries.crossV = new THREE.BoxGeometry(0.2, 0.8, 0.2);
        Goblin.assets.geometries.crossH = new THREE.BoxGeometry(0.6, 0.2, 0.2);

        // Materials
        Goblin.assets.materials.skinNormal = new THREE.MeshLambertMaterial({ color: 0x55AA55 });
        Goblin.assets.materials.clothesNormal = new THREE.MeshLambertMaterial({ color: 0x8B4513 });

        Goblin.assets.materials.skinHob = new THREE.MeshLambertMaterial({ color: 0x336633 });
        Goblin.assets.materials.clothesHob = new THREE.MeshLambertMaterial({ color: 0x222222 });

        Goblin.assets.materials.club = new THREE.MeshLambertMaterial({ color: 0x654321 });

        // Cross Material
        Goblin.assets.materials.cross = new THREE.MeshLambertMaterial({
            color: 0x55AA55,
            transparent: true,
            opacity: 1.0
        });

        // Rotate reusable geometries if needed?
        // Geometries like ear need rotation but we can do that on mesh.
        // Or bake rotation into geometry?
        // For shared geometries, better to rotate mesh.

        Goblin.assets.initialized = true;
    }

    constructor(scene, terrain, x, z, type = 'normal') {
        Goblin.initAssets();

        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x;
        this.gridZ = z;
        this.type = type;

        // Stats
        if (this.type === 'hobgoblin') {
            this.hp = 50 + Math.floor(Math.random() * 20); // ~2x HP
            this.maxHp = this.hp;
            this.lifespan = 80 + Math.random() * 40; // ~2x Lifespan
            this.damage = 20; // 4x Damage (5->20)
        } else {
            this.hp = 20 + Math.floor(Math.random() * 10); // 20-30 HP
            this.maxHp = this.hp;
            this.lifespan = 30 + Math.random() * 20; // 30-50 seconds
            this.damage = 10; // Buffed 5 -> 10
        }

        this.age = 0;
        this.isDead = false;
        this.isFinished = false;

        // AI State
        this.state = 'idle'; // idle, moving, attacking, destroying
        this.targetUnit = null;
        this.targetBuilding = null;
        this.attackCooldown = 0;
        this.attackRate = 1.0; // 1 attack per second


        // Mesh
        this.mesh = new THREE.Group();
        this.createMesh();
        this.updatePosition();
        this.scene.add(this.mesh);

        // Movement
        this.isMoving = false;
        this.moveTimer = 0;
        this.moveInterval = 800; // Faster than humans (1000)
        this.lastTime = performance.now();
        this.moveDuration = 400;

        // Register in Spatial Grid
        this.terrain.registerEntity(this, this.gridX, this.gridZ, 'goblin');
    }

    createMesh() {
        const isHob = (this.type === 'hobgoblin');
        const skinMat = isHob ? Goblin.assets.materials.skinHob : Goblin.assets.materials.skinNormal;
        const clothesMat = isHob ? Goblin.assets.materials.clothesHob : Goblin.assets.materials.clothesNormal;

        const torsoGeo = isHob ? Goblin.assets.geometries.torsoHob : Goblin.assets.geometries.torsoNormal;

        // Torso
        this.torso = new THREE.Mesh(torsoGeo, skinMat);
        this.torso.position.y = 0.3;
        this.mesh.add(this.torso);

        // Head (Big ears?)
        this.head = new THREE.Mesh(Goblin.assets.geometries.head, skinMat);
        this.head.position.y = 0.55;
        this.mesh.add(this.head);

        // Ears
        const leftEar = new THREE.Mesh(Goblin.assets.geometries.ear, skinMat);
        leftEar.position.set(0.12, 0.55, 0);
        leftEar.rotation.z = -Math.PI / 2;
        this.mesh.add(leftEar);

        const rightEar = new THREE.Mesh(Goblin.assets.geometries.ear, skinMat);
        rightEar.position.set(-0.12, 0.55, 0);
        rightEar.rotation.z = Math.PI / 2;
        this.mesh.add(rightEar);

        // Arms
        this.leftArm = new THREE.Mesh(Goblin.assets.geometries.arm, skinMat);
        this.leftArm.position.set(0.18, 0.3, 0);
        this.mesh.add(this.leftArm);

        this.rightArm = new THREE.Mesh(Goblin.assets.geometries.arm, skinMat);
        this.rightArm.position.set(-0.18, 0.3, 0);
        this.mesh.add(this.rightArm);

        // Legs (Clothes color)
        this.leftLeg = new THREE.Mesh(Goblin.assets.geometries.leg, clothesMat);
        this.leftLeg.position.set(0.08, 0.12, 0);
        this.mesh.add(this.leftLeg);

        this.rightLeg = new THREE.Mesh(Goblin.assets.geometries.leg, clothesMat);
        this.rightLeg.position.set(-0.08, 0.12, 0);
        this.mesh.add(this.rightLeg);

        // Club (Weapon)
        this.club = new THREE.Mesh(Goblin.assets.geometries.club, Goblin.assets.materials.club);
        this.club.position.set(0, -0.15, 0.1);
        this.club.rotation.x = Math.PI / 2;
        this.rightArm.add(this.club);

        if (isHob) {
            this.mesh.scale.set(1.2, 1.2, 1.2);
        }
    }

    update(time, deltaTime, units, buildings) {
        if (this.isDead) {
            this.updateDeathAnimation(deltaTime);
            return;
        }

        this.age += deltaTime;
        if (this.age >= this.lifespan) {
            this.die();
            return;
        }

        this.attackCooldown -= deltaTime;

        // AI Logic
        if (!this.isMoving) {
            // 1. Look for targets
            this.findTarget(units, buildings);

            // Safety: Check if target died meanwhile
            if (this.targetUnit && this.targetUnit.isDead) {
                this.targetUnit = null;
                this.chaseTimer = 0;
            }

            // 2. Act based on target
            if (this.targetUnit) {
                this.chaseTimer = (this.chaseTimer || 0) + deltaTime;
                if (this.chaseTimer > 10.0) {
                    // Give up chasing if takes too long
                    this.targetUnit = null;
                    this.chaseTimer = 0;
                    this.moveRandomly();
                } else {
                    this.moveToTarget(this.targetUnit.gridX, this.targetUnit.gridZ);
                    // Attack if close
                    // Castle range 2.5, Normal 1.5. Unit is small.
                    if (this.getDistance(this.targetUnit.gridX, this.targetUnit.gridZ) <= 1.8) {
                        this.attackUnit(this.targetUnit);
                        this.chaseTimer = 0; // Reset on successful attack
                    }
                }
            } else if (this.targetBuilding) {
                this.moveToTarget(this.targetBuilding.userData.gridX, this.targetBuilding.userData.gridZ);
                // Destroy if close
                if (this.getDistance(this.targetBuilding.userData.gridX, this.targetBuilding.userData.gridZ) <= 2.5) {
                    this.attackBuilding(this.targetBuilding);
                }
            } else {
                // Wander
                if (time - this.lastTime > this.moveInterval) {
                    this.moveRandomly();
                    this.lastTime = time;
                }
            }
        } else {
            this.updateMovement(time);
        }
    }

    findTarget(units, buildings) {
        // Use Spatial Search for Units
        // Range 10.0
        // We need a way to filter sleeping units in findNearestEntity or check after.
        // spatial search returns nearest. if nearest is sleeping, we might miss a non-sleeping one further away.
        // For simple spatial search optimization, we assume findNearestEntity returns nearest VALID target?
        // Current implementation of findNearestEntity doesn't take custom filter.
        // Let's modify it or just check closest. If closest is sleeping, ignore?
        // Better: iterate nearby entities manually using Terrain helper if needed, or just accept if closest is sleeping we ignore (goblin confusingly ignores everyone if closest is hidden).
        // To be strict: We need 'findNearestValidEntity'.
        // For now: Get nearest 'unit'. If sleeping, too bad, goblin finds nothing (or wanders).
        // Wait, if closest is sleeping, goblin should find NEXT closest.
        // Terrain.findNearestEntity is simple O(1) mostly.
        // Let's rely on standard search but check sleeping.

        let closestUnit = this.terrain.findNearestEntity('unit', this.gridX, this.gridZ, 10.0);

        if (closestUnit && closestUnit.isSleeping) {
            closestUnit = null; // Can't see sleeping units
        }

        this.targetUnit = closestUnit;

        if (!this.targetUnit) {
            // Look for buildings
            // Buildings are in a simple list `this.terrain.buildings`. O(N) is okay if N ~ 100.
            // But for performance with many buildings, we should also spatially partition buildings?
            // buildings are already in grid! grid[x][z].building.
            // But we need to SEARCH.
            // Let's stick to linear search for buildings for now as they are static and usually fewer than units/goblins?
            // Or use spatial grid if we registered buildings as entities? (We didn't).
            // Let's keep linear for buildings but optimize skip.

            let closestBuilding = null;
            let minDist = 20; // Larger range

            for (const b of buildings) {
                // Skip if far quickly
                const dx = Math.abs(b.userData.gridX - this.gridX);
                const dz = Math.abs(b.userData.gridZ - this.gridZ);
                if (dx > minDist || dz > minDist) continue; // Manhattan pre-check

                const dist = this.getDistance(b.userData.gridX, b.userData.gridZ);
                if (dist < minDist) {
                    minDist = dist;
                    closestBuilding = b;
                }
            }
            this.targetBuilding = closestBuilding;
        }
    }

    getDistance(tx, tz) {
        const dx = Math.abs(this.gridX - tx);
        const dz = Math.abs(this.gridZ - tz);
        // Handle wrapping distance? For now simple Manhattan or Euclidean
        // Simple Euclidean without wrap for AI simplicity
        return Math.sqrt(dx * dx + dz * dz);
    }

    moveToTarget(tx, tz) {
        if (this.isMoving) return;

        // Simple pathfinding: Move towards target
        const dx = tx - this.gridX;
        const dz = tz - this.gridZ;

        let nextX = this.gridX;
        let nextZ = this.gridZ;

        if (Math.abs(dx) > Math.abs(dz)) {
            nextX += Math.sign(dx);
        } else {
            nextZ += Math.sign(dz);
        }

        // Check bounds/wrap
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        if (nextX < 0) nextX = logicalW - 1;
        if (nextX >= logicalW) nextX = 0;
        if (nextZ < 0) nextZ = logicalD - 1;
        if (nextZ >= logicalD) nextZ = 0;

        // Check Sea Level
        const targetH = this.terrain.getTileHeight(nextX, nextZ);
        if (targetH <= 0) return;

        this.startMove(nextX, nextZ);
    }

    moveRandomly() {
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

        const currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);

        for (const dir of directions) {
            let nextX = this.gridX + dir.x;
            let nextZ = this.gridZ + dir.z;

            // Wrap
            if (nextX < 0) nextX = logicalW - 1;
            if (nextX >= logicalW) nextX = 0;
            if (nextZ < 0) nextZ = logicalD - 1;
            if (nextZ >= logicalD) nextZ = 0;

            const targetH = this.terrain.getTileHeight(nextX, nextZ);

            // Allow climbing up to 2.0 units
            if (Math.abs(targetH - currentH) <= 2.0) {
                // Check Sea Level
                if (targetH > 0) {
                    this.startMove(nextX, nextZ);
                    return;
                }
            }
        }
        this.lastTime = performance.now();
    }

    startMove(tx, tz) {
        // Check height diff
        const currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetH = this.terrain.getTileHeight(tx, tz);

        // Consistent limit with moveRandomly (2.0)
        if (Math.abs(targetH - currentH) > 2.0) {
            // Can't climb steep
            // Add stuck logic here
            this.stuckCount = (this.stuckCount || 0) + 1;
            if (this.stuckCount > 5) {
                this.targetUnit = null;
                this.targetBuilding = null;
                this.stuckCount = 0;
                this.moveRandomly();
            }
            return;
        }

        this.stuckCount = 0;
        this.isMoving = true;
        this.moveStartTime = performance.now();
        this.startGridX = this.gridX;
        this.startGridZ = this.gridZ;
        this.targetGridX = tx;
        this.targetGridZ = tz;

        // Rotate mesh
        let dx = tx - this.gridX;
        let dz = tz - this.gridZ;
        const angle = Math.atan2(dx, dz);
        this.mesh.rotation.y = angle;
    }

    updateMovement(time) {
        const progress = (time - this.moveStartTime) / this.moveDuration;

        if (progress >= 1) {
            this.isMoving = false;
            this.gridX = this.targetGridX;
            this.gridZ = this.targetGridZ;
            this.updatePosition();
        } else {
            // Lerp
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            let sx = this.startGridX;
            let sz = this.startGridZ;
            let tx = this.targetGridX;
            let tz = this.targetGridZ;

            // Wrap interpolation logic (simplified)
            if (tx - sx > logicalW / 2) sx += logicalW;
            if (sx - tx > logicalW / 2) tx += logicalW;
            if (tz - sz > logicalD / 2) sz += logicalD;
            if (sz - tz > logicalD / 2) tz += logicalD;

            const lerpX = sx + (tx - sx) * progress;
            const lerpZ = sz + (tz - sz) * progress;

            const pos = this.getPositionForGrid(lerpX, lerpZ);
            this.mesh.position.copy(pos);

            // Walk anim
            const limbAngle = Math.sin(progress * Math.PI * 4) * 0.5;
            this.leftArm.rotation.x = limbAngle;
            this.rightArm.rotation.x = -limbAngle;
            this.leftLeg.rotation.x = -limbAngle;
            this.rightLeg.rotation.x = limbAngle;
        }
    }

    updatePosition() {
        // Spatial Grid update
        const oldX = this._spatial ? this._spatial.x : this.gridX;
        const oldZ = this._spatial ? this._spatial.z : this.gridZ;

        this.terrain.moveEntity(this, oldX, oldZ, this.gridX, this.gridZ, 'goblin');

        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        this.mesh.position.copy(pos);
    }

    getPositionForGrid(x, z) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        const height = this.terrain.getInterpolatedHeight(x, z);
        return new THREE.Vector3(
            x - logicalW / 2 + 0.5,
            height + 0.2,
            z - logicalD / 2 + 0.5
        );
    }

    attackUnit(unit) {
        if (this.attackCooldown > 0) return;
        if (unit.isDead) {
            this.targetUnit = null;
            return;
        }

        // Attack anim
        this.rightArm.rotation.x = -Math.PI / 2; // Raise club

        // Synced Damage
        setTimeout(() => {
            this.rightArm.rotation.x = 0; // Swing
            if (!unit.isDead && this.getDistance(unit.gridX, unit.gridZ) <= 2.0) { // Check range again
                unit.takeDamage(this.damage);
                console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${unit.hp}`);
            }
        }, 200);

        this.attackCooldown = this.attackRate;
    }

    attackBuilding(building) {
        if (this.attackCooldown > 0) return;

        // Attack anim
        this.rightArm.rotation.x = -Math.PI / 2;
        setTimeout(() => {
            this.rightArm.rotation.x = 0;
        }, 200);

        // Damage building population
        if (building.userData.population === undefined) building.userData.population = 10;

        const isCastle = (building.userData.type === 'castle');
        const isFarm = (building.userData.type === 'farm');

        // Castle is tougher
        const damage = isCastle ? 2 : 5; // Castle takes less damage
        building.userData.population -= damage;

        // Retaliation Damage
        if (!isFarm) {
            // Castle hits harder
            const factor = isCastle ? 0.5 : 0.2;
            const retaliation = Math.floor(building.userData.population * factor);

            if (retaliation > 0) {
                this.takeDamage(retaliation);
                console.log(`Goblin took ${retaliation} retaliation damage from ${building.userData.type}!`);
            }
        } else {
            console.log("Goblin attacked Farm (No retaliation)");
        }

        if (building.userData.population <= 0) {
            this.destroyBuilding(building);
        }
        this.attackCooldown = this.attackRate;
        // console.log(`Goblin attacked ${building.userData.type}! Pop left:`, building.userData.population);
    }

    destroyBuilding(building) {
        // Instanced Rendering Update:
        // Building is just a data object. Renderer handles visual removal.
        // We just need to remove data.

        this.terrain.removeBuilding(building);
        console.log("Building destroyed!");
    }

    takeDamage(amount) {
        if (this.isDead) return; // Ignore damage if already dead
        this.hp -= amount;
        if (this.hp <= 0) {
            this.die();
        } else {
            // Flash red logic removed
        }
    }

    die() {
        if (this.isDead) return; // Prevent double death
        this.isDead = true;
        this.terrain.unregisterEntity(this);
        this.scene.remove(this.mesh);
        this.createCross();
        // console.log("Goblin died");
    }

    createCross() {
        const group = new THREE.Group();
        // Use shared cross material/geo
        if (!Goblin.assets.geometries.crossV) {
            // Fallback if not init for some reason, or just use what we have
            // Should be init.
        }

        const vMesh = new THREE.Mesh(Goblin.assets.geometries.crossV, Goblin.assets.materials.cross);
        vMesh.position.y = 0.4;
        group.add(vMesh);

        const hMesh = new THREE.Mesh(Goblin.assets.geometries.crossH, Goblin.assets.materials.cross);
        hMesh.position.y = 0.6;
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

            // CRITICAL: Dispose of materials to prevent memory leak
            this.crossMesh.children.forEach(child => {
                if (child.material && child.userData.clonedMat) {
                    child.material.dispose();
                }
            });
            this.crossMesh = null; // Help GC

            this.isFinished = true;
        } else {
            // Rise up
            this.crossMesh.position.y += deltaTime * 1.0;

            // Fade out
            const progress = this.deathTimer / duration;
            this.crossMesh.children.forEach(child => {
                if (child.material) {
                    // Shared material opacity! Caution: Modifying shared material affects ALL dying goblins.
                    // If we want individual fade, we MUST clone the material.
                    // For performance, maybe we just don't fade? Or we clone only on death.
                    // Cloning 1 material on death is cheap compared to 300 live ones.
                    if (!child.userData.clonedMat) {
                        child.material = child.material.clone();
                        child.userData.clonedMat = true;
                    }
                    child.material.opacity = 1.0 - progress;
                }
            });
        }
    }
}
