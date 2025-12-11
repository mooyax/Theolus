import * as THREE from 'three';

export class Unit {
    // Static Cache
    static assets = {
        geometries: {},
        materials: {},
        textures: {}
    };

    static initAssets() {
        if (Unit.assets.initialized) return;

        // --- Geometries ---
        Unit.assets.geometries.torso = new THREE.BoxGeometry(0.3, 0.4, 0.2);
        Unit.assets.geometries.head = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        Unit.assets.geometries.arm = new THREE.BoxGeometry(0.1, 0.3, 0.1);
        Unit.assets.geometries.leg = new THREE.BoxGeometry(0.12, 0.3, 0.12);

        // --- Textures ---
        Unit.assets.textures.face = Unit.createFaceTexture();
        Unit.assets.textures.hair = Unit.createHairTexture();

        // --- Materials ---
        Unit.assets.materials.limb = new THREE.MeshLambertMaterial({ color: 0xFFCCAA });
        Unit.assets.materials.clothesNormal = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        Unit.assets.materials.clothesSpecial = new THREE.MeshLambertMaterial({ color: 0x0000FF });

        Unit.assets.materials.heads = [
            new THREE.MeshLambertMaterial({ map: Unit.assets.textures.hair }), // Right
            new THREE.MeshLambertMaterial({ map: Unit.assets.textures.hair }), // Left
            new THREE.MeshLambertMaterial({ map: Unit.assets.textures.hair }), // Top
            new THREE.MeshLambertMaterial({ map: Unit.assets.textures.hair }), // Bottom
            new THREE.MeshLambertMaterial({ map: Unit.assets.textures.face }), // Front
            new THREE.MeshLambertMaterial({ map: Unit.assets.textures.hair })  // Back
        ];

        Unit.assets.initialized = true;
    }

    static createFaceTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFCCAA'; ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = '#4A3000'; ctx.fillRect(0, 0, 64, 15);
        ctx.fillStyle = '#000000'; ctx.fillRect(15, 25, 8, 8); ctx.fillRect(41, 25, 8, 8);
        ctx.fillStyle = '#A0522D'; ctx.fillRect(20, 45, 24, 4);
        return new THREE.CanvasTexture(canvas);
    }

    static createHairTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#4A3000'; ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = '#3A2000';
        for (let i = 0; i < 20; i++) {
            ctx.fillRect(Math.random() * 60, Math.random() * 60, 4, 4);
        }
        return new THREE.CanvasTexture(canvas);
    }

    constructor(scene, terrain, x, z, role = 'worker', isSpecial = false) {
        Unit.initAssets();

        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x || 20;
        this.gridZ = z || 20;

        // Legacy compatibility check (if role arg is boolean)
        if (typeof role === 'boolean') {
            isSpecial = role;
            role = 'worker';
        }

        this.role = role || 'worker';
        this.isSpecial = isSpecial;

        this.lastGridX = this.gridX;
        this.lastGridZ = this.gridZ;
        this.stagnationTimer = 0;
        this.lastGatherTime = -Math.random() * 30; // Stagger gathering

        // Position & Rotation Data (No Mesh)
        this.position = new THREE.Vector3();
        this.rotationY = 0;
        this.limbs = {
            leftArm: { x: 0 },
            rightArm: { x: 0 },
            leftLeg: { x: 0 },
            rightLeg: { x: 0 }
        };

        // Lifespan
        this.isSpecial = isSpecial || false;
        // Reverted to original lifespan (50-80 sim seconds)
        // With staggered update (half speed), this is ~2-3 mins real time.
        // Special Unit = 6-9 mins.
        const baseLifespan = 50 + Math.random() * 30;
        // User Request: Special units live +20 years longer than normal (instead of 3x)
        this.lifespan = this.isSpecial ? baseLifespan + 20 : baseLifespan;

        this.age = 20; // Starts at 20 years old
        this.isDead = false;
        this.isFinished = false;
        this.crossMesh = null;

        // Combat Stats
        this.hp = 30 + Math.floor(Math.random() * 20);
        this.maxHp = this.hp;
        this.attackCooldown = 0;
        this.attackRate = 1.0;
        this.damage = 6;
        this.targetGoblin = null;

        this.updatePosition();

        this.moveTimer = 0;
        this.moveInterval = 200;
        this.lastTime = (window.game && window.game.gameTotalTime !== undefined) ? window.game.gameTotalTime : 0;
        this.lastGatherTime = 0; // Initialize gathering timer

        // Animation state
        this.isMoving = false;
        this.targetX = 0;
        this.targetZ = 0;
        this.moveStartTime = 0;
        this.moveDuration = 1000;

        // Register in Spatial Grid
        this.terrain.registerEntity(this, this.gridX, this.gridZ, 'unit');

        this.wanderCount = 0;
        this.migrationTarget = null;
    }

    // createClones removed

    takeDamage(amount) {
        this.hp -= amount;
        // console.log(`Unit ${this.id || ''} took ${amount} damage. HP: ${this.hp}`);
        if (this.hp <= 0) {
            this.die();
        } else {
            // Flash red removed to protect shared static materials
            // TODO: Implement emissive flash or sprite flash if visual feedback needed
        }
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.terrain.unregisterEntity(this);
        // Remove mesh handled by renderer? No, we remove it here to stop rendering or let renderer handle it?
        // UnitRenderer iterates units. If we remove from scene, UnitRenderer might re-add it if it controls visibility.
        // But previously we removed it.
        // Let's check UnitRenderer usage in Game.js later. For now standard remove.
        // Actually, UnitRenderer uses InstancedMesh maybe?
        // If UnitRenderer is used, we shouldn't modify scene directly for unit mesh if it's instanced.
        // But comments said "Clones Logic Removed". And `this.scene.add(this.mesh)` was commented out in constructor.
        // So UnitRenderer handles it.
        // If UnitRenderer handles it, we don't need to scene.remove(this.mesh).
        // But we DO need to set isDead = true, which UnitRenderer likely checks.

        this.createCross();
        console.log(`Unit died.`);
    }



    attackGoblin(goblin) {
        if (this.attackCooldown > 0) return;

        // Attack anim (Visual only)
        this.limbs.rightArm.x = -Math.PI / 2;
        setTimeout(() => {
            if (!this.isDead) this.limbs.rightArm.x = 0;
        }, 200);

        goblin.takeDamage(this.damage);
        this.attackCooldown = this.attackRate;
    }

    updateLogic(time, deltaTime, isNight, goblins, fishes, sheeps) {
        // Debug Entry
        // if (Math.random() < 0.001) console.log(`Unit ${this.id || '?'} update. Dead:${this.isDead} Sleep:${this.isSleeping} Moving:${this.isMoving}`);
        if (this.isDead) {
            this.updateDeathAnimation(deltaTime);
            this.action = "Dead";
            return;
        }

        // Default action if ready
        if (!this.isMoving && time >= this.lastTime) this.action = "Idle";

        // Aging
        this.age += deltaTime;
        if (this.age >= this.lifespan) {
            this.die();
            return;
        }

        // WATER DEATH CHECK (Level <= 0)
        // Note: Fish logic is separate, so this Unit class (Humans/Goblins) should always die in water.
        {
            const h = this.terrain.getTileHeight(this.gridX, this.gridZ);
            if (h <= 0) {
                console.log(`Unit drowned at ${this.gridX},${this.gridZ} (Height: ${h})`);
                this.die();
                return;
            }
        }

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;


        if (this.lastGridX === this.gridX && this.lastGridZ === this.gridZ && !this.isSleeping) {
            this.stagnationTimer += deltaTime;
        } else {
            this.lastGridX = this.gridX;
            this.lastGridZ = this.gridZ;
            this.stagnationTimer = 0;
        }

        if (this.stagnationTimer > 10.0) {
            // Force Move if stuck for 10s
            // Try normal random move first
            this.moveRandomly(time);

            // Critical Stuck Check: If stuck for > 20s, TELEPORT.
            if (this.stagnationTimer > 20.0) {
                console.warn("Unit critically stuck. Teleporting to safety.");
                this.forceUnstuck();
                this.stagnationTimer = 0;
            }
        }

        // Safety: Stuck in "isMoving" state?
        // Allow some buffer over moveDuration (e.g. + 500ms)
        if (this.isMoving && (time - this.moveStartTime) > (this.moveDuration + 500)) {
            console.warn("Unit stuck in moving state. Forcing finish. Duration:", this.moveDuration);
            this.isMoving = false;
            this.gridX = this.targetGridX;
            this.gridZ = this.targetGridZ;
            this.updatePosition();
            this.tryBuildStructure(time);
        }

        // Day/Night Behavior Logic
        if (isNight) {
            const cell = this.terrain.grid[this.gridX][this.gridZ];
            const isShelter = cell.hasBuilding && cell.building && (cell.building.type === 'house' || cell.building.type === 'castle');

            if (isShelter) {
                if (!this.isSleeping) {
                    this.isSleeping = true;
                }
                return;
            } else {
                if (this.isSleeping) this.isSleeping = false;

                // Seek Shelter Logic (Simplified from original update)
                // If not Moving, try to find shelter
                if (!this.isMoving) {
                    // ... (Logic continues below in next chunk if needed, but for now we just moved logic top)
                    // Actually, the original code had movement block *before* Day/Night logic.
                    // But Day/Night logic also needs to run.
                    // We remove the MOVEMENT block from here.
                }
            }
        } else {
            if (this.isSleeping) this.isSleeping = false;
        }

        // 2. DECISION PHASE (If not moving)
        if (!this.isMoving) {
            // ... (Rest of logic)

            if (isNight && !this.isMoving && !this.targetGoblin && !this.targetFood) {
                // Find nearest building
                let nearest = null;
                let minD = 30.0; // Scan range

                if (this.terrain.buildings) {
                    this.terrain.buildings.forEach(b => {
                        // Only seek Houses or Castles
                        if (b.type !== 'house' && b.type !== 'castle') return;

                        const dx = b.gridX - this.gridX;
                        const dz = b.gridZ - this.gridZ;
                        const d = Math.sqrt(dx * dx + dz * dz);
                        if (d < minD) {
                            minD = d;
                            nearest = b;
                        }
                    });
                }

                if (nearest) {
                    // Go to house
                    this.triggerMove(nearest.userData.gridX, nearest.userData.gridZ, time);
                    return;
                }
            }
            // If no house found, fall through to Normal Behavior (Wander/Fight)
        }


        this.attackCooldown -= deltaTime;

        // Check Cooldown for Hunting/Combat
        if (this.huntingCooldown && time < this.huntingCooldown) {
            // Cooldown active, ignore targets, just wander.
        } else {
            // Combat Logic
            if (goblins) {
                this.findTargetGoblin(goblins);
                if (this.targetGoblin) {
                    const dist = this.getDistance(this.targetGoblin.gridX, this.targetGoblin.gridZ);
                    if (dist <= 1.5) {
                        this.attackGoblin(this.targetGoblin);
                    } else {
                        // Chase Goblin logic reuse
                        if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                            const tx = this.targetGoblin.gridX;
                            const tz = this.targetGoblin.gridZ;
                            this.triggerMove(tx, tz, time);
                        }
                    }
                }
                // return; // Don't return, just don't wander
            }
        }

        // Passive Resource Gathering
        // Only if not built or fighting? Or always?
        // Let's do it if idle or moving (basically always while alive and outside)
        this.gatherResources(time);

        // Hunting Logic - REMOVED for Simplification
        // No longer seek fishes or sheeps.
        /*
        if (!this.targetFood && (fishes || sheeps)) { ... }
        if (this.targetFood) { ... }
        */

        // 2. DECISION PHASE: Wandering / Land Improvement
        // Only if not moving, not fighting (hunting removed)
        if (!this.isMoving && !this.targetGoblin) {

            // Migration Logic: If we have a long-term target (Mountain/Sea)
            if (this.migrationTarget) {
                const dx = this.migrationTarget.x - this.gridX;
                const dz = this.migrationTarget.z - this.gridZ;
                const dist = Math.sqrt(dx * dx + dz * dz);
                // Arrived or Close enough
                if (dist < 3.0) {
                    console.log("Unit arrived at migration target.");
                    this.migrationTarget = null;
                    this.wanderCount = 0;
                } else {
                    if (time - this.lastTime > this.moveInterval) {
                        this.triggerMove(this.migrationTarget.x, this.migrationTarget.z, time);
                    }
                    return; // Skip random move
                }
            }

            if (time - this.lastTime > this.moveInterval) {

                // Land Improvement Logic (Irrigation/Drainage)
                // Check current tile moisture
                let cell = null;
                if (this.terrain.grid[this.gridX] && this.terrain.grid[this.gridX][this.gridZ]) {
                    cell = this.terrain.grid[this.gridX][this.gridZ];
                }

                if (cell && !cell.hasBuilding) { // Only improve empty land
                    const m = cell.moisture || 0.5;
                    let improved = false;

                    // 1. Irrigation (Desert -> Grass)
                    // Only irrigate if heavily desert (< 0.35)
                    if (m < 0.35) {
                        // Action: Irrigate
                        // Just do it instantly for now, or add small delay?
                        // Let's do it instantly but reset timer to simulate effort
                        this.terrain.modifyMoisture(this.gridX, this.gridZ, 0.05);
                        console.log(`Unit irrigated land at ${this.gridX},${this.gridZ} (M: ${m.toFixed(2)} -> ${(m + 0.05).toFixed(2)})`);
                        this.action = "Irrigating";
                        improved = true;
                    }
                    // 2. Drainage (Swamp -> Grass)
                    // Only drain if deep swamp (> 0.75)
                    else if (m > 0.75) {
                        // Action: Drain
                        this.terrain.modifyMoisture(this.gridX, this.gridZ, -0.05);
                        console.log(`Unit drained land at ${this.gridX},${this.gridZ} (M: ${m.toFixed(2)} -> ${(m - 0.05).toFixed(2)})`);
                        this.action = "Draining";
                        improved = true;
                    }

                    if (improved) {
                        this.lastTime = time + 1000; // Wait 1s before next action (Work takes time)
                        return; // Done work, don't move yet
                    }
                }

                this.moveRandomly(time);
                this.lastTime = time;
            }
        }

        // Sync Clones: Handled by renderer
    }

    updateMovement(time) {
        if (!this.isMoving) return;

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const progress = (time - this.moveStartTime) / this.moveDuration;

        if (progress >= 1) {
            this.isMoving = false;
            this.gridX = this.targetGridX;
            this.gridZ = this.targetGridZ;
            this.updatePosition(); // Snap to final position

            // Reset limbs
            this.limbs.leftArm.x = 0;
            this.limbs.rightArm.x = 0;
            this.limbs.leftLeg.x = 0;
            this.limbs.rightLeg.x = 0;

            this.tryBuildStructure(time);
        } else {
            // Interpolate position
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
            this.position.copy(pos);

            // Animate limbs
            const limbAngle = Math.sin(progress * Math.PI * 4) * 0.5;
            this.limbs.leftArm.x = limbAngle;
            this.limbs.rightArm.x = -limbAngle;
            this.limbs.leftLeg.x = -limbAngle;
            this.limbs.rightLeg.x = limbAngle;
        }
    }

    triggerMove(tx, tz, time) {
        const dx = tx - this.gridX;
        const dz = tz - this.gridZ;

        let nextX = this.gridX;
        let nextZ = this.gridZ;

        if (Math.abs(dx) > Math.abs(dz)) {
            nextX += Math.sign(dx);
        } else {
            nextZ += Math.sign(dz);
        }

        // Wrap check
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        if (nextX < 0) nextX = logicalW - 1;
        if (nextX >= logicalW) nextX = 0;
        if (nextZ < 0) nextZ = logicalD - 1;
        if (nextZ >= logicalD) nextZ = 0;

        // Check Sea Level (Unless target is fish, then we might walk to shore)
        // If target is fish, next step might be water. We stop at shore.
        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetHeight = this.terrain.getTileHeight(nextX, nextZ);

        // Simple walk check: Match moveRandomly limit (2.0)
        if (Math.abs(targetHeight - currentHeight) <= 2.0 && targetHeight > 0) {
            this.isMoving = true;
            // Slope Penalty: Quarter speed on inclined terrain (User requested stronger effect)
            // Rock Penalty: Very slow on Rock (Height > 8)
            const heightDiff = Math.abs(targetHeight - currentHeight);

            if (targetHeight > 8) {
                this.moveDuration = 8000; // Rock: Very Slow
            } else if (heightDiff > 0.1) {
                this.moveDuration = 4000; // Slope: Slow
            } else {
                this.moveDuration = 1000; // Normal
            }

            this.moveStartTime = time; // Use simTime
            this.startGridX = this.gridX;
            this.startGridZ = this.gridZ;
            this.targetGridX = nextX;
            this.targetGridZ = nextZ;

            // Rotate towards target
            const angle = Math.atan2(Math.sign(dx), Math.sign(dz));
            this.rotationY = angle;

            this.lastTime = time;
            this.stuckCount = 0; // Reset stuck counter
        } else {
            // Cannot reach?
            this.lastTime = time; // Set cooldown even if fail!
            this.stuckCount = (this.stuckCount || 0) + 1;

            // If stuck too long, abandon target
            if (this.stuckCount > 5) {
                console.log("Unit stuck chasing target. Abandoning and cooling down.");
                this.targetGoblin = null;
                this.targetFood = null;
                this.stuckCount = 0;
                this.huntingCooldown = time + 5000; // 5 seconds ignore targets
                this.moveRandomly(time);
            }

            // If hunting fish, we might be blocked by water. If dist is close, collect.
            // (Handled elsewhere)
        }
    }

    gatherResources(time) {
        // Gather every 5000ms (5 seconds)
        if (time - this.lastGatherTime < 5000) return;
        this.lastGatherTime = time;

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let foundWater = false;
        let foundForest = false;

        // Sparse Sampling Pattern (Optimized for performance)
        // Check Current(1) + Neighbors(4) + Far(4) = 9 checks
        // Range extended to ~5 tiles to allow gathering from city edge
        const sampleOffsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }, // Dist 1
            { x: 4, z: 0 }, { x: -4, z: 0 }, { x: 0, z: 4 }, { x: 0, z: -4 }  // Dist 4
        ];

        for (const off of sampleOffsets) {
            let nx = this.gridX + off.x;
            let nz = this.gridZ + off.z;

            // Wrap
            if (nx < 0) nx = logicalW + nx; // handled by modulo usually but logicW-1 is safe
            if (nx >= logicalW) nx = nx - logicalW;
            if (nz < 0) nz = logicalD + nz;
            if (nz >= logicalD) nz = nz - logicalD;

            // Safety wrap again if weird negativity (Double strict)
            nx = (nx % logicalW + logicalW) % logicalW;
            nz = (nz % logicalD + logicalD) % logicalD;

            const h = this.terrain.getTileHeight(nx, nz);

            if (h <= 0) foundWater = true;
            else if (h > 4 && h <= 8) foundForest = true; // Forest height

            if (foundWater && foundForest) break; // Found both, stop
        }

        if (window.game && window.game.resources) {
            if (foundWater) {
                // Buffed Amounts: 1.0 Base, 3.0 Specialist
                const amount = (this.role === 'fisher') ? 3.0 : 1.0;
                window.game.resources.fish += amount;
            }
            if (foundForest) {
                const amount = (this.role === 'hunter') ? 3.0 : 1.0;
                window.game.resources.meat += amount;
            }
        }
    }

    findTargetGoblin(goblins) {
        if (!goblins || goblins.length === 0) return;

        let nearest = null;
        let minScore = Infinity; // Use Score instead of direct distance
        // Linear scan
        for (const goblin of goblins) {
            const dx = this.gridX - goblin.gridX;
            const dz = this.gridZ - goblin.gridZ;
            const dist = Math.sqrt(dx * dx + dz * dz);

            // Limit range (10.0)
            if (dist > 10.0) continue;

            const targetH = this.terrain.getTileHeight(goblin.gridX, goblin.gridZ);
            let score = dist;

            // Penalty for Rock
            if (targetH > 8) {
                score += 20.0; // Virtual Distance Penalty
            }

            if (score < minScore) {
                minScore = score;
                nearest = goblin;
            }
        }
        this.targetGoblin = nearest;
    }

    getDistance(tx, tz) {
        const dx = Math.abs(this.gridX - tx);
        const dz = Math.abs(this.gridZ - tz);
        return Math.sqrt(dx * dx + dz * dz);
    }

    moveRandomly(time) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const directions = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ];

        // --- MIGRATION CHECK ---
        this.wanderCount = (this.wanderCount || 0) + 1;
        // If wandered > 15 times (approx 3-5 seconds of continuous movement without purpose)
        if (this.wanderCount > 15) {
            // Try to find a Mountain or Sea target
            for (let i = 0; i < 15; i++) {
                const rx = Math.floor(Math.random() * logicalW);
                const rz = Math.floor(Math.random() * logicalD);
                const h = this.terrain.getTileHeight(rx, rz);

                // Mountain (>8) or Coast (<2 but >0)
                if (h > 8 || (h > 0 && h < 2)) {
                    this.migrationTarget = { x: rx, z: rz };
                    this.wanderCount = 0;
                    console.log(`Unit bored. Migrating to ${h > 8 ? 'Mountain' : 'Sea'} at ${rx},${rz}`);
                    this.triggerMove(rx, rz, time);
                    return;
                }
            }
            // If failed to find target, continue normal random move
        }

        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const validMoves = [];

        // 1. Identify Valid Moves
        for (const dir of directions) {
            let targetX = this.gridX + dir.x;
            let targetZ = this.gridZ + dir.z;

            // Wrap logic
            if (targetX < 0) targetX = logicalW - 1;
            if (targetX >= logicalW) targetX = 0;
            if (targetZ < 0) targetZ = logicalD - 1;
            if (targetZ >= logicalD) targetZ = 0;

            const targetHeight = this.terrain.getTileHeight(targetX, targetZ);

            // Validity Check: Climb <= 2.0 and Land > 0
            if (Math.abs(targetHeight - currentHeight) <= 2.0 && targetHeight > 0) {
                validMoves.push({ x: targetX, z: targetZ, h: targetHeight, dir: dir });
            }
        }

        if (validMoves.length === 0) {
            this.lastTime = time;
            return;
        }

        // 2. Weighted Selection based on Role
        let selectedMove = null;

        if (this.role === 'hunter' || this.role === 'fisher') {
            let totalWeight = 0;
            // Calculate weights
            validMoves.forEach(m => {
                let weight = 1.0;
                if (this.role === 'hunter') {
                    // Prefer Forests (High Ground 4-8)
                    if (m.h > 4 && m.h <= 8) weight = 5.0; // Strong preference
                    else if (m.h > 8) weight = 2.0; // Higher is okay too
                } else if (this.role === 'fisher') {
                    // Prefer Lowlands (Near Water 0-3)
                    if (m.h <= 2.5) weight = 5.0;
                }
                m.weight = weight;
                totalWeight += weight;
            });

            // Random Pick
            let r = Math.random() * totalWeight;
            for (const m of validMoves) {
                r -= m.weight;
                if (r <= 0) {
                    selectedMove = m;
                    break;
                }
            }
        }

        // Fallback or Worker (Uniform Random)
        if (!selectedMove) {
            const idx = Math.floor(Math.random() * validMoves.length);
            selectedMove = validMoves[idx];
        }

        // 3. Execute Move
        this.isMoving = true;
        this.action = "Moving";

        // Slope Penalty
        const heightDiff = Math.abs(selectedMove.h - currentHeight);

        if (selectedMove.h > 8) {
            this.moveDuration = 6000; // Rock Wander (slightly faster than forced move?) Keep it slow.
        } else if (heightDiff > 0.1) {
            this.moveDuration = 2500;
        } else {
            this.moveDuration = 1000;
        }

        this.moveStartTime = time;
        this.startGridX = this.gridX;
        this.startGridZ = this.gridZ;
        this.targetGridX = selectedMove.x;
        this.targetGridZ = selectedMove.z;

        const angle = Math.atan2(selectedMove.dir.x, selectedMove.dir.z);
        this.rotationY = angle;
    }

    updatePosition() {
        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        this.position.copy(pos);
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

    forceUnstuck() {
        // Teleport to a random safe spot nearby
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let found = false;
        let attempts = 0;
        while (!found && attempts < 10) {
            // Try range +/- 3
            const rx = Math.floor(Math.random() * 7) - 3;
            const rz = Math.floor(Math.random() * 7) - 3;
            if (rx === 0 && rz === 0) continue;

            let tx = this.gridX + rx;
            let tz = this.gridZ + rz;

            if (tx < 0) tx = logicalW - 1;
            if (tx >= logicalW) tx = 0;
            if (tz < 0) tz = logicalD - 1;
            if (tz >= logicalD) tz = 0;

            const h = this.terrain.getTileHeight(tx, tz);
            if (h > 0) { // Land only
                // Teleport!
                const oldX = this.gridX;
                const oldZ = this.gridZ;
                this.gridX = tx;
                this.gridZ = tz;
                this.updatePosition();
                this.terrain.moveEntity(this, oldX, oldZ, tx, tz, 'unit');
                console.log(`Unit warped from ${oldX},${oldZ} to ${tx},${tz}`);
                found = true;
            }
            attempts++;
        }
    }

    tryBuildStructure(time) {
        // Performance Optimization: Moved logical width/depth fetch
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const x = this.gridX;
        const z = this.gridZ;
        // Optimization: Direct access to grid
        const cell = this.terrain.grid[x][z];

        // 1. Fast Exit: If already occupied, abort immediately
        if (cell.hasBuilding) return;

        // Rock Restriction: Cannot build on Rock (Height > 8)
        if (cell.height > 8) return;

        // 2. Castle Check Setup
        const totalPop = window.game ? window.game.totalPopulation : 0;

        // Ensure we are visible when building!
        this.isSleeping = false;

        // 3. Check 2x2 Area (Quad)
        const x1 = (x + 1) % logicalW;
        const z1 = (z + 1) % logicalD;

        const c00 = cell;
        const c10 = this.terrain.grid[x1][z];
        const c01 = this.terrain.grid[x][z1];
        const c11 = this.terrain.grid[x1][z1];

        // Obstruction Check
        if (c00.hasBuilding || c10.hasBuilding || c01.hasBuilding || c11.hasBuilding) {
            return; // Obstructed
        }

        const h00 = c00.height;
        const h10 = c10.height;
        const h01 = c01.height;
        const h11 = c11.height;

        // 1x1 Flatness (For House/Farm)
        const is1x1Flat = (h00 === h10 && h00 === h01 && h00 === h11 && h00 > 0);

        // 2x2 Flatness (For Castle)
        let is2x2Flat = false;


        if (is1x1Flat) {
            // Only verify 3x3 if 1x1 is already flat (optimization)
            const x2 = (x + 2) % logicalW;
            const z2 = (z + 2) % logicalD;

            // Check remaining 5 vertices for 2x2 area
            // (x+2, z), (x+2, z+1), (x+2, z+2)
            // (x, z+2), (x+1, z+2)

            const h20 = this.terrain.grid[x2][z].height;
            const h21 = this.terrain.grid[x2][z1].height;
            const h22 = this.terrain.grid[x2][z2].height;
            const h02 = this.terrain.grid[x][z2].height;
            const h12 = this.terrain.grid[x1][z2].height;

            if (h00 === h20 && h00 === h21 && h00 === h22 && h00 === h02 && h00 === h12) {
                is2x2Flat = true;
            }
        }

        // 4. Build Decision

        // Strategy: 
        // If 2x2 Flat -> Attempt Castle.
        // If Castle fails or not 2x2 -> Attempt House/Farm (needs 1x1 flat).

        if (is2x2Flat) {
            // Castle Opportunity Check
            let castleCount = 0;
            if (this.terrain.buildings.length > 0) {
                this.terrain.buildings.forEach(b => {
                    if (b.userData.type === 'castle') castleCount++;
                });
            }

            const castleThreshold = 1000 * (castleCount + 1);

            if (totalPop >= castleThreshold) {
                // Determine food status
                const res = window.game ? window.game.resources : { grain: 0, meat: 0, fish: 0 };
                const totalFood = res.grain + res.meat + res.fish;

                // Don't build expensive castles during famine!
                if (totalFood > 200) {
                    console.log(`Castle Construction Attempt: Pop ${totalPop} >= ${castleThreshold}. Flatness verified (3x3).`);
                    if (Math.random() < 0.2) { // 20% chance
                        this.buildCastle();
                        return;
                    }
                }
            }
        }

        // House/Farm Logic (Requires 1x1 Flatness)
        // Swamp Check (User Rule: No building on Swamp)
        // Swamp Def: Moisture > 0.6 && Height <= 3
        const isSwamp = (cell.moisture > 0.6 && cell.height <= 3);

        if (isSwamp) {
            // Cannot build on swamp. Try to drain it?
            // Re-use improveLand logic to lower moisture
            console.log("Unit refused to build on Swamp. Draining land...");
            this.improveLand(time);
            return;
        }

        if (is1x1Flat) {
            let houseCount = 0;
            let farmCount = 0;

            this.terrain.buildings.forEach(b => {
                if (b.type === 'house' || (b.userData && b.userData.type === 'house')) houseCount++;
                else if (b.type === 'farm' || (b.userData && b.userData.type === 'farm')) farmCount++;
            });

            // Strict Balancer Logic
            let shouldBuildFarm = false;

            // Priority Check: Low Food?
            // If total food is low, prioritized farms!
            const res = window.game ? window.game.resources : { grain: 0, meat: 0, fish: 0 };
            const totalFood = res.grain + res.meat + res.fish;

            // Revised Threshold: < 100 or if Grain is 0 (immediate need)
            if (totalFood < 100 || res.grain < 5) {
                shouldBuildFarm = true;
            }

            // If we have fewer farms than half of houses, we MUST build a farm.
            // (Unless priority above already set it)
            // BUT: If we have massive food surplus, ignore this rule to prevent infinite farm spam (290k farms!)

            const isFoodSurplus = totalFood > 5000;

            if (!shouldBuildFarm && !isFoodSurplus && farmCount < Math.ceil(houseCount / 2)) {
                shouldBuildFarm = true;
            }

            // Random factor: small chance to build farm anyway if low
            if (!shouldBuildFarm && Math.random() < 0.2) shouldBuildFarm = true;

            if (shouldBuildFarm) {
                // Return success/fail. If fail (bad soil), fallback to House.
                const farmSuccess = this.buildFarm(time);

                // CRITICAL FIX: If we NEED food (starving), and cannot build farm,
                // DO NOT build a house instead! That just adds mouths to feed.
                // Only fallback if we are NOT in a crisis.
                if (!farmSuccess) {
                    if (totalFood > 50) {
                        this.buildHouse(time);
                    } else {
                        console.log("Starvation Mode: Aborted House construction due to Farm failure.");
                    }
                }
            } else {
                this.buildHouse(time);
            }

            this.lastTime = time;
            this.stagnationTimer = 0;
            setTimeout(() => {
                if (!this.isDead) {
                    const now = window.game ? window.game.gameTotalTime : performance.now();
                    this.moveRandomly(now);
                }
            }, 500);
        } else {
            // Not flat enough to build anything
            this.moveRandomly(time);
        }
    }

    buildCastle() {
        // Center of 2x2
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const x0 = this.gridX;
        const z0 = this.gridZ;

        // Add via Terrain logic
        this.terrain.addBuilding('castle', x0, z0);

        // Unit enters castle
        this.isFinished = true;
        this.isDead = true;
        console.log(`Unit entered castle at ${x0}, ${z0} and became a citizen.`);
    }

    static getBuildingAssets() {
        if (!Unit.assets.buildings) {
            Unit.assets.buildings = {};

            // HOUSE
            Unit.assets.buildings.woodTexture = Unit.createWoodTexture();
            Unit.assets.buildings.roofTexture = Unit.createRoofTexture();
            Unit.assets.buildings.wallMat = new THREE.MeshLambertMaterial({ map: Unit.assets.buildings.woodTexture });
            Unit.assets.buildings.roofMat = new THREE.MeshLambertMaterial({ map: Unit.assets.buildings.roofTexture });
            Unit.assets.buildings.wallGeo = new THREE.BoxGeometry(0.6, 0.4, 0.6);
            Unit.assets.buildings.roofGeo = new THREE.ConeGeometry(0.5, 0.4, 4);
            Unit.assets.buildings.windowGeo = new THREE.PlaneGeometry(0.15, 0.15);
            Unit.assets.buildings.windowMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

            // FARM
            const canvas = document.createElement('canvas');
            canvas.width = 64; canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#DAA520'; ctx.fillRect(0, 0, 64, 64);
            ctx.fillStyle = '#B8860B';
            for (let i = 0; i < 10; i++) ctx.fillRect(i * 6, 0, 2, 64);
            Unit.assets.buildings.wheatTexture = new THREE.CanvasTexture(canvas);
            Unit.assets.buildings.farmMat = new THREE.MeshLambertMaterial({ map: Unit.assets.buildings.wheatTexture });
            const farmGeo = new THREE.PlaneGeometry(0.8, 0.8);
            farmGeo.rotateX(-Math.PI / 2);
            Unit.assets.buildings.farmGeo = farmGeo;
        }
        return Unit.assets.buildings;
    }

    buildHouse(time) {
        // Use Terrain logic for consistent data structure
        this.terrain.addBuilding('house', this.gridX, this.gridZ);
        console.log("House built at", this.gridX, this.gridZ);

        // Eject unit to avoid being stuck inside
        this.moveRandomly(time);
    }

    improveLand(time) {
        if (!this.terrain.grid[this.gridX] || !this.terrain.grid[this.gridX][this.gridZ]) return;

        const cell = this.terrain.grid[this.gridX][this.gridZ];
        const currentM = cell.moisture || 0.5;
        const targetM = 0.5;

        // Strong Improvement (User Request)
        // Close 40% of the gap to 0.5, or at least 0.1
        let diff = targetM - currentM;
        let change = diff * 0.4;

        // Ensure minimum effectiveness
        if (Math.abs(change) < 0.1 && Math.abs(diff) > 0.01) {
            change = (diff > 0) ? 0.1 : -0.1;
        }

        // Clamp to not overshooting if diff is small
        if (Math.abs(change) > Math.abs(diff)) change = diff;

        this.terrain.modifyMoisture(this.gridX, this.gridZ, change);
        console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${currentM.toFixed(2)} -> ${(currentM + change).toFixed(2)}`);

        // Consume time
        this.moveRandomly(time);
    }

    buildFarm(time) {
        const height = this.terrain.getTileHeight(this.gridX, this.gridZ);

        // Moisture Check
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        let cell = null;
        if (this.terrain.grid[this.gridX] && this.terrain.grid[this.gridX][this.gridZ]) {
            cell = this.terrain.grid[this.gridX][this.gridZ];
        }

        if (cell) {
            const m = cell.moisture || 0.5;
            // Probabilistic Failure based on Moisture
            // Optimal: 0.5. 
            // Diff 0.0 -> 100% Success
            // Diff 0.3 -> 25% Success
            // Diff >= 0.4 -> 0% Success

            const diff = Math.abs(m - 0.5);
            let successChance = 1.0 - (diff * 2.5);
            if (successChance < 0) successChance = 0;

            if (Math.random() > successChance) {
                console.log(`Farm construction failed due to soil conditions (Moisture: ${m.toFixed(2)}, Chance: ${(successChance * 100).toFixed(0)}%). Improving Land.`);

                // FAILURE RECOVERY: Improve the land so next time it might work!
                this.improveLand(time);
                return false;
            }
        }

        // Use Terrain logic
        this.terrain.addBuilding('farm', this.gridX, this.gridZ);

        // Eject unit
        this.moveRandomly(time);
        return true;
    }

    static getCrossAssets() {
        if (!Unit.assets.geometries.crossV) {
            Unit.assets.geometries.crossV = new THREE.BoxGeometry(0.2, 1.0, 0.2);
            Unit.assets.geometries.crossH = new THREE.BoxGeometry(0.8, 0.2, 0.2);
        }
        return Unit.assets.geometries;
    }

    createCross() {
        const group = new THREE.Group();
        const GEO = Unit.getCrossAssets();

        // Material must be unique per cross to allow individual fading
        const material = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1.0
        });

        // Vertical part
        const vMesh = new THREE.Mesh(GEO.crossV, material);
        vMesh.position.y = 0.5;
        group.add(vMesh);

        // Horizontal part
        const hMesh = new THREE.Mesh(GEO.crossH, material);
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

        // Safety: Prevent NaN
        if (isNaN(this.deathTimer)) this.deathTimer = 0;

        // Ensure progress even if deltaTime is weird
        const safeDt = (deltaTime > 0) ? deltaTime : 0.016;
        this.deathTimer += safeDt;

        const duration = 3.0; // 3 seconds animation

        if (this.deathTimer >= duration) {
            // Clean up
            this.scene.remove(this.crossMesh);

            // CRITICAL: Dispose of materials to prevent memory leak
            this.crossMesh.children.forEach(child => {
                if (child.material) child.material.dispose();
            });
            this.crossMesh = null;

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

    static createWoodTexture() {
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

    static createRoofTexture() {
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
            targetGridZ: this.targetGridZ,
            targetGridZ: this.targetGridZ,
            isSpecial: this.isSpecial,
            role: this.role
        };
    }

    static deserialize(data, scene, terrain) {
        // Pass role if exists, otherwise defaults to worker via constructor logic or legacy boolean handling
        const unit = new Unit(scene, terrain, data.gridX, data.gridZ, data.role || data.isSpecial, data.isSpecial);
        unit.age = data.age || 20;

        // 2025-12-09: Fallback for old saves without lifespan
        if (typeof data.lifespan === 'number' && data.lifespan > 0) {
            unit.lifespan = data.lifespan;
        }

        if (data.lifespan) unit.lifespan = data.lifespan;

        unit.isDead = data.isDead || false;
        unit.isFinished = data.isFinished || false;

        // Restore animation state if moving
        if (data.isMoving) {
            unit.isMoving = true;
            unit.targetX = data.targetX;
            unit.targetZ = data.targetZ;
            unit.isMoving = false; // Snap immediately
            unit.gridX = data.targetGridX;
            unit.gridZ = data.targetGridZ;
            unit.updatePosition();
        }

        if (unit.isDead) {
            // If dead, ensure cross is created if not finished
            if (!unit.isFinished) {
                unit.createCross();
            }
        }

        return unit;
    }
}
