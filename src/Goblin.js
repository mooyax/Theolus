import * as THREE from 'three';

export class Goblin {
    static nextId = 0;
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

    constructor(scene, terrain, x, z, type = 'normal', clanId = null) {
        Goblin.initAssets();

        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x;
        this.gridZ = z;
        this.type = type;
        this.clanId = clanId;
        this.id = Goblin.nextId++; // Track instances

        if (this.gridX === undefined || isNaN(this.gridX) || this.gridZ === undefined || isNaN(this.gridZ)) {
            console.error(`Goblin Created with INVALID COORDS: ${this.gridX},${this.gridZ}`);
        }

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

        // Ghost Meshes for Infinite Scroll
        this.ghosts = [];
        this.neighborOffsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        this.neighborOffsets.forEach(offset => {
            const ghost = this.mesh.clone(); // Clone structure
            this.scene.add(ghost);
            this.ghosts.push({ mesh: ghost, offset: offset });
        });

        this.updatePosition();
        this.scene.add(this.mesh);

        // Movement
        this.isMoving = false;
        this.moveTimer = 0;
        this.moveInterval = 1600; // Half Speed (800 -> 1600)
        this.lastTime = (window.game && window.game.gameTotalTime !== undefined) ? window.game.gameTotalTime : 0;
        this.lastTime = (window.game && window.game.gameTotalTime !== undefined) ? window.game.gameTotalTime : 0;
        this.baseMoveDuration = 800; // Default
        this.moveDuration = this.baseMoveDuration;

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

    updateLogic(time, deltaTime, units, buildings) {
        if (this.isDead) {
            this.updateDeathAnimation(deltaTime);
            return;
        }

        this.age += deltaTime;
        if (this.age >= this.lifespan) {
            this.die();
            return;
        }

        // Water Death Check
        const currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (currentH <= 0) {
            this.die();
            return;
        }

        this.attackCooldown -= deltaTime;
        // Logic continue...

    } // End of update()

    updateLogic(time, deltaTime, units, buildings) {
        // Debug Log only for one goblin occasionally
        if (Math.random() < 0.005) {
            console.log(`[GoblinAI] ID:${this.id} State:${this.state} Moving:${this.isMoving} TargetU:${!!this.targetUnit} TargetB:${!!this.targetBuilding} Pos:${this.gridX.toFixed(1)},${this.gridZ.toFixed(1)}`);
        }

        // AI Logic
        if (!this.isMoving) {
            // 1. Look for targets
            this.findTarget(units, buildings);

            // Safety: Check if target died meanwhile
            if (this.targetUnit && this.targetUnit.isDead) {
                this.targetUnit = null;
                this.chaseTimer = 0;
            }

            // Memory Failure Check
            // If we arrived at a memory target but found no valid target to attack
            if (this.currentMemoryTarget && !this.targetUnit && !this.targetBuilding) {
                // We are idle, finished moving, and found nothing.
                // Check if we are close to the memory target
                const dist = this.getDistance(this.currentMemoryTarget.x, this.currentMemoryTarget.z);
                if (dist < 5.0) {
                    // We arrived and found nothing. Report Failure.
                    if (window.game && window.game.goblinManager) {
                        window.game.goblinManager.reportRaidFailure(this.clanId, this.currentMemoryTarget.x, this.currentMemoryTarget.z);
                    }
                }
                // Clear memory target
                this.currentMemoryTarget = null;
            }
            // Check if target changed? If so, reset path.
            // Simplified: recalculate path periodically if moving?


            // 2. Act based on target
            if (this.targetUnit) {
                this.chaseTimer = (this.chaseTimer || 0) + deltaTime;
                if (this.chaseTimer > 10.0) {
                    // Give up chasing if takes too long
                    this.targetUnit = null;
                    this.chaseTimer = 0;
                    this.moveRandomly(time);
                } else {
                    this.moveToTarget(this.targetUnit.gridX, this.targetUnit.gridZ, time);
                    // Attack if close
                    // Castle range 2.5, Normal 1.5. Unit is small.
                    if (this.getDistance(this.targetUnit.gridX, this.targetUnit.gridZ) <= 1.8) {
                        this.attackUnit(this.targetUnit);
                        this.chaseTimer = 0; // Reset on successful attack
                    }
                }
            } else if (this.targetBuilding) {
                // console.log(`[GoblinAI] ${this.id} Moving to Building ${this.targetBuilding.userData.type}`);
                this.moveToTarget(this.targetBuilding.userData.gridX, this.targetBuilding.userData.gridZ, time);
                // Destroy if close
                if (this.getDistance(this.targetBuilding.userData.gridX, this.targetBuilding.userData.gridZ) <= 2.5) {
                    this.attackBuilding(this.targetBuilding);
                }
            } else {
                // Wander
                if (time - this.lastTime > this.moveInterval) {
                    // Try to build Hut (Rarely)
                    // Balance: Reduced to 1.0% (was 2.0%, originally 0.5%)
                    if (Math.random() < 0.01) {
                        this.tryBuildHut();
                    }
                    this.moveRandomly(time);
                    this.lastTime = time;
                } else {
                    // console.log(`[GoblinAI] ${this.id} Waiting...`);
                }
            }
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

        // Use Weighted Search
        const closestUnit = this.terrain.findBestTarget('unit', this.gridX, this.gridZ, 10.0, (entity, dist) => {
            if (entity.isSleeping) return Infinity; // Ignore sleeping

            const h = this.terrain.getTileHeight(entity.gridX, entity.gridZ);
            let score = dist;
            if (h > 8) score += 20.0; // Rock Penalty
            return score;
        });

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
                // Ignore Goblin Huts AND Caves
                if (b.userData.type === 'goblin_hut' || b.userData.type === 'cave') continue;

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

    moveToTarget(tx, tz, time) {
        if (this.isMoving) return;

        // Pathfinding Logic
        // Recalculate if no path, or path target is different
        // For dynamic targets (units), might need frequent updates.
        // For static (buildings/points), just one calc.
        const isDynamic = !!this.targetUnit;

        // Simple optimization: Only recalculate every 1s or if no path
        // We'll calculate next step.

        // Use Terrain Pathfinding
        // Only calculate if we are far away (Euclidean > 2)
        const dist = this.getDistance(tx, tz);

        // Destination node
        let nextX = this.gridX;
        let nextZ = this.gridZ;

        let pathFound = false;

        if (dist > 2.0 && this.terrain.findPath) {
            // Limit pathfinding calls? (Performance)
            // Just find path to target.
            // Note: findPath is somewhat expensive. Don't call every frame for 300 goblins.
            // Only call if we don't have a valid next step?
            // Or Use flow field?
            // Let's rely on the fact that Goblins are staggered in Manager or not?
            // They update every frame. 
            // We'll use a cooldown/timer for pathfinding recalculation.

            if (!this.path || this.path.length === 0 || (time - this.lastPathTime > 2000)) {
                const newPath = this.terrain.findPath(this.gridX, this.gridZ, tx, tz);
                if (newPath && newPath.length > 1) {
                    this.path = newPath;
                    this.pathIndex = 1; // 0 is current
                    this.lastPathTime = time;
                }
            }

            if (this.path && this.pathIndex < this.path.length) {
                const node = this.path[this.pathIndex];
                nextX = node.x;
                nextZ = node.z;
                this.pathIndex++;
                pathFound = true;
            }
        }

        if (!pathFound) {
            // Fallback to Linear (Old Logic)
            const dx = tx - this.gridX;
            const dz = tz - this.gridZ;

            if (Math.abs(dx) > Math.abs(dz)) {
                nextX += Math.sign(dx);
            } else {
                nextZ += Math.sign(dz);
            }

            // Wrap checks for fallback
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;
            if (nextX < 0) nextX = logicalW - 1;
            if (nextX >= logicalW) nextX = 0;
            if (nextZ < 0) nextZ = logicalD - 1;
            if (nextZ >= logicalD) nextZ = 0;
        }

        // Common Move Logic
        const targetH = this.terrain.getTileHeight(nextX, nextZ);
        if (targetH <= 0) {
            // Blocked by water
            this.path = null; // Invalidate path
            return;
        }

        this.startMove(nextX, nextZ, time);
    }

    moveRandomly(time) {
        // Clan Memory Logic: 30% chance to move towards a known raid spot
        if (this.clanId && Math.random() < 0.3) {
            // Distraction: 20% chance to drop out of raid path (was 5%)
            if (Math.random() < 0.2) {
                console.log(`Goblin ${this.id} distracted from raid!`);
                this.tryBuildHut();
            } else if (window.game && window.game.goblinManager) {
                const target = window.game.goblinManager.getClanRaidTarget(this.clanId);
                if (target) {
                    // STORE MEMORY TARGET
                    this.currentMemoryTarget = target;

                    // Move towards target
                    const dx = target.x - this.gridX;
                    const dz = target.z - this.gridZ;
                    // Normalize direction
                    if (Math.abs(dx) > 0 || Math.abs(dz) > 0) {
                        const nextX = this.gridX + Math.sign(dx);
                        const nextZ = this.gridZ + Math.sign(dz);

                        // Check validity (Height/Water)
                        const h = this.terrain.getTileHeight(nextX, nextZ);
                        const ch = this.terrain.getTileHeight(this.gridX, this.gridZ);
                        if (h > 0 && Math.abs(h - ch) <= 2.0) {
                            this.startMove(nextX, nextZ, time);
                            return;
                        }
                    }
                }
            }
        }

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
                    this.startMove(nextX, nextZ, time);
                    return;
                }
            }
        }
        this.lastTime = time;
    }

    startMove(tx, tz, time) {
        // Safety: Ensure we have valid coords
        if (this.gridX === undefined || isNaN(this.gridX)) {
            console.error(`Goblin ${this.id} startMove failed: Invalid gridX (${this.gridX})`);
            this.isMoving = false;
            return;
        }

        const targetH = this.terrain.getTileHeight(tx, tz);

        // Speed Logic
        if (targetH > 8) {
            this.moveDuration = 6000; // Rock: Very Slow
        } else {
            this.moveDuration = this.baseMoveDuration || 800;
        }

        // Check height diff
        const currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        // targetH is already declared above

        // Consistent limit with moveRandomly (2.0)
        if (Math.abs(targetH - currentH) > 2.0) {
            // Can't climb steep
            // Add stuck logic here
            this.stuckCount = (this.stuckCount || 0) + 1;
            if (this.stuckCount > 5) {
                this.targetBuilding = null;
                this.stuckCount = 0;
                this.moveRandomly(time);
            }
            return;
        }

        this.stuckCount = 0;
        this.isMoving = true;
        this.moveStartTime = time;
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
        if (!this.isMoving) return;

        const progress = (time - this.moveStartTime) / this.moveDuration;

        if (progress >= 1) {
            this.isMoving = false;

            // Update Spatial Partitioning
            if (this.terrain && this.terrain.moveEntity) {
                this.terrain.moveEntity(this, this.gridX, this.gridZ, this.targetGridX, this.targetGridZ, 'goblin');
            }

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

            if (isNaN(lerpX) || isNaN(lerpZ)) {
                console.warn(`Goblin NaN detected. ID:${this.id} Time:${time} StartT:${this.moveStartTime} SX:${sx} TX:${tx} Prog:${progress}`);
                this.isMoving = false;
                return;
            }

            // Use Visual Position
            const vPos = this.terrain.getVisualPosition(lerpX, lerpZ, true);
            this.visualPosRaw = new THREE.Vector3(vPos.x, vPos.y, vPos.z);
            this.mesh.position.set(vPos.x, vPos.y + 0.2, vPos.z);

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

        // Use Terrain Visual Position (Handles distortion/infinite logic)
        const vPos = this.terrain.getVisualPosition(this.gridX, this.gridZ, true);
        this.visualPosRaw = new THREE.Vector3(vPos.x, vPos.y, vPos.z);
        this.mesh.position.set(vPos.x, vPos.y + 0.2, vPos.z);

        this.updateVisuals();
    }

    updateVisuals() {
        // Update Mesh & Ghosts based on Camera Position (Infinite Scroll)
        // If we don't have a raw position yet, skip or use current as fallback
        if (!this.visualPosRaw) {
            this.visualPosRaw = this.mesh.position.clone();
            this.visualPosRaw.y -= 0.2; // Undo render offset
        }

        const vPos = this.visualPosRaw;
        const logicalW = this.terrain.logicalWidth || 80; // W=80 is hardcoded default
        const logicalD = this.terrain.logicalDepth || 80;

        // Camera Base Offset
        let baseGridX = 0;
        let baseGridZ = 0;
        if (window.game && window.game.camera) {
            baseGridX = Math.round(window.game.camera.position.x / logicalW);
            baseGridZ = Math.round(window.game.camera.position.z / logicalD);
        }

        // 1. Shift Main Mesh (Fixes Center Tile Disappearance)
        this.mesh.position.set(
            vPos.x + baseGridX * logicalW,
            vPos.y + 0.2,
            vPos.z + baseGridZ * logicalD
        );

        // 2. Update Ghosts
        if (this.ghosts) {
            this.ghosts.forEach(g => {
                const offX = g.offset.x + baseGridX;
                const offZ = g.offset.z + baseGridZ;

                g.mesh.position.set(
                    vPos.x + offX * logicalW,
                    vPos.y + 0.2,
                    vPos.z + offZ * logicalD
                );
                // Sync Initial State
                g.mesh.rotation.copy(this.mesh.rotation);
                const srcLimbs = this.mesh.children;
                const dstLimbs = g.mesh.children;
                for (let i = 0; i < srcLimbs.length && i < dstLimbs.length; i++) {
                    dstLimbs[i].rotation.copy(srcLimbs[i].rotation);
                    dstLimbs[i].position.copy(srcLimbs[i].position);
                }
                g.mesh.visible = this.mesh.visible;
            });
        }
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

                if (unit.isDead) {
                    // Plunder Bonus!
                    if (window.game && window.game.goblinManager) {
                        window.game.goblinManager.increasePlunder();
                        // Record Memory
                        window.game.goblinManager.recordRaidLocation(this.clanId, unit.gridX, unit.gridZ);
                    }
                }
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

        // Damage Logic
        // Farm now uses HP (5). Others use Population.
        if (isFarm && building.userData.hp !== undefined) {
            // Damage HP
            building.userData.hp -= 1; // 1 damage per hit? User said HP is 5.
            // Goblin attack rate is 1/sec. So destroys in 5 sec.
            // Previous damage was 25 vs growth. Now 1 vs 5 static.
            // Let's use 1 damage. The user said "HP 5".
            console.log(`Goblin hit Farm! HP: ${building.userData.hp}`);

            if (building.userData.hp <= 0) {
                this.destroyBuilding(building);
            }
        } else {
            // House/Castle uses Population as Health
            const damage = isCastle ? 2 : 5;
            building.userData.population -= damage;

            // Retaliation Damage (House/Castle only)
            if (!isFarm) {
                const factor = isCastle ? 0.5 : 0.2;
                const retaliation = Math.floor(building.userData.population * factor);

                if (retaliation > 0) {
                    this.takeDamage(retaliation);
                    console.log(`Goblin took ${retaliation} retaliation damage from ${building.userData.type}!`);
                }
            }

            if (building.userData.population <= 0) {
                this.destroyBuilding(building);
            }

            // Record Memory on hit
            if (window.game && window.game.goblinManager) {
                window.game.goblinManager.recordRaidLocation(this.clanId, building.userData.gridX, building.userData.gridZ);
            }
        }

        this.attackCooldown = this.attackRate;
    }

    destroyBuilding(building) {
        // Instanced Rendering Update:
        // Building is just a data object. Renderer handles visual removal.
        // We just need to remove data.

        this.terrain.removeBuilding(building);
        console.log("Building destroyed!");

        // Plunder Bonus
        if (window.game && window.game.goblinManager) {
            window.game.goblinManager.increasePlunder();
        }
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
        this.mesh.visible = false;
        this.scene.remove(this.mesh);
        this.ghosts.forEach(g => {
            g.mesh.visible = false;
            this.scene.remove(g.mesh);
        });
        this.ghosts = [];
        this.createCross();
        // console.log("Goblin died");
    }

    // Explicit Cleanup
    dispose() {
        if (this.crossMesh) {
            this.scene.remove(this.crossMesh);
            this.crossMesh.traverse(c => {
                if (c.material && c.userData.clonedMat) c.material.dispose();
            });
            this.crossMesh = null;
        }
        this.scene.remove(this.mesh);
        this.terrain.unregisterEntity(this);
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
        const vPos = this.terrain.getVisualPosition(this.gridX, this.gridZ, true);
        group.position.set(vPos.x, vPos.y + 0.2, vPos.z);

        this.scene.add(group);
        this.crossMesh = group;
        this.deathTimer = 0;

        // FAILSAFE: Force remove after 1.5s regardless of update loop
        // This handles cases where manager culls the goblin or updates stop
        setTimeout(() => {
            if (this.crossMesh) {
                console.log(`[Goblin] Failsafe removing cross ID:${this.id}`);
                this.scene.remove(this.crossMesh);
                // Clean materials
                this.crossMesh.traverse(c => {
                    if (c.material && c.userData.clonedMat) c.material.dispose();
                });
                this.crossMesh = null;
            }
        }, 1500);
    }

    updateDeathAnimation(deltaTime) {
        if (!this.crossMesh) {
            // Already cleaned up (by failsafe?), so mark finished
            this.isFinished = true;
            return;
        }

        // Console Log to debug "Never Disappearing"
        // if (Math.random() < 0.05) console.log(`[Goblin] Death Update ID:${this.id} Timer:${this.deathTimer.toFixed(2)}/${1.0}`);

        // Safety
        if (isNaN(this.deathTimer)) this.deathTimer = 0;
        const safeDt = (deltaTime > 0) ? deltaTime : 0.016;
        this.deathTimer += safeDt;

        const duration = 1.0; // 1 second animation (Faster removal)

        if (this.deathTimer >= duration) {
            console.log(`[Goblin] Death Animation Finished ID:${this.id}. Removing Cross.`);
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

    tryBuildHut() {
        // 1. Check constraints
        const x = this.gridX;
        const z = this.gridZ;

        // Check if building already exists
        if (this.terrain.grid[x][z].hasBuilding) return;

        // Rock check (Height > 8)
        const h = this.terrain.getTileHeight(x, z);
        if (h > 8) return; // Cannot build on Rock
        if (h <= 0) return; // Cannot build on Water

        // Space Check (Don't build too close to other huts? Optional, but good for distribution)
        // User Request: Check for surrounding space.
        const allBuildings = this.terrain.buildings || [];
        const minSpacing = 6.0; // Balance: Increased to 6.0 (was 4.0, originally 8.0)

        for (const b of allBuildings) {
            if (b.userData.type === 'goblin_hut') {
                const dx = b.userData.gridX - x;
                const dz = b.userData.gridZ - z;
                const distSq = dx * dx + dz * dz;

                // If within spacing radius, abort
                if (distSq < minSpacing * minSpacing) {
                    return;
                }
            }
        }

        // Build!
        const hut = this.terrain.addBuilding('goblin_hut', x, z);
        if (hut) {
            hut.userData.clanId = this.clanId;
            console.log(`Goblin (Clan: ${this.clanId}) built a Hut!`);
        }
    }
}
