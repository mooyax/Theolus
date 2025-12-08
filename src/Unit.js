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

    constructor(scene, terrain, x, z, isSpecial = false) {
        Unit.initAssets();

        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x || 20;
        this.gridZ = z || 20;

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
        const baseLifespan = 50 + Math.random() * 30; // 50-80 seconds
        this.lifespan = this.isSpecial ? baseLifespan * 3 : baseLifespan;

        this.age = 0;
        this.isDead = false;
        this.isFinished = false; // True when death animation is done
        this.crossMesh = null;

        // Combat Stats
        this.hp = 30 + Math.floor(Math.random() * 20); // 30-50 HP
        this.maxHp = this.hp;
        this.attackCooldown = 0;
        this.attackRate = 1.0;
        this.damage = 6;
        this.targetGoblin = null;

        this.updatePosition();
        // this.scene.add(this.mesh); // Removed

        // Clones Logic Removed (Handled by Renderer)
        // this.clones = [];
        // this.createClones();

        this.moveTimer = 0;
        this.moveInterval = 100;
        this.lastTime = performance.now();

        // Animation state
        this.isMoving = false;
        this.targetX = 0;
        this.targetZ = 0;
        this.moveStartTime = 0;
        this.moveDuration = 500;

        // Register in Spatial Grid
        this.terrain.registerEntity(this, this.gridX, this.gridZ, 'unit');
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

    update(time, deltaTime, isNight, goblins, fishes, sheeps) {
        // Debug Entry
        // if (Math.random() < 0.001) console.log(`Unit ${this.id || '?'} update. Dead:${this.isDead} Sleep:${this.isSleeping} Moving:${this.isMoving}`);
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
            this.moveRandomly();

            // Critical Stuck Check: If stuck for > 20s, TELEPORT.
            if (this.stagnationTimer > 20.0) {
                console.warn("Unit critically stuck. Teleporting to safety.");
                this.forceUnstuck();
                this.stagnationTimer = 0;
            }
        }

        // Safety: Stuck in "isMoving" state?
        if (this.isMoving && (time - this.moveStartTime) > 2000) {
            // If moving for > 2 seconds (duration is 500ms), something is wrong.
            // Force finish.
            console.warn("Unit stuck in moving state. Forcing finish.");
            this.isMoving = false;
            this.gridX = this.targetGridX;
            this.gridZ = this.targetGridZ;
            this.updatePosition();
            this.tryBuildStructure();
        }

        // 1. EXECUTION PHASE: Movement & Animation
        if (this.isMoving) {
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

                this.tryBuildStructure();
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

        // Day/Night Behavior
        if (isNight) {
            const cell = this.terrain.grid[this.gridX][this.gridZ];
            if (cell.hasBuilding) {
                // Hide inside house
                if (!this.isSleeping) {
                    this.isSleeping = true;
                    // Visibility handled by renderer
                }
                return; // Stop moving
            } else {
                // Not in house.
                if (this.isSleeping) this.isSleeping = false; // Safety reset if left house logic fails

                // Seek Shelter?
                if (!this.isMoving && !this.targetGoblin && !this.targetFood) {
                    // Find nearest building
                    let nearest = null;
                    let minD = 30.0; // Scan range

                    if (this.terrain.buildings) {
                        this.terrain.buildings.forEach(b => {
                            const dx = b.userData.gridX - this.gridX;
                            const dz = b.userData.gridZ - this.gridZ;
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
        } else {
            // Morning - Wake up
            if (this.isSleeping) {
                this.isSleeping = false;
                // mesh visibility handled by renderer
                // Eject to neighbor cell to avoid immediate re-entry? 
                // Currently just wakes up and can move out via moveRandomly
            }
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

        // 2. DECISION PHASE: Wandering
        // Only if not moving, not fighting (hunting removed)
        if (!this.isMoving && !this.targetGoblin) {
            if (time - this.lastTime > this.moveInterval) {
                this.moveRandomly();
                this.lastTime = time;
            }
        }

        // Sync Clones: Handled by renderer
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
            this.moveStartTime = performance.now();
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
                this.huntingCooldown = performance.now() + 5000; // 5 seconds ignore targets
                this.moveRandomly();
            }

            // If hunting fish, we might be blocked by water. If dist is close, collect.
            // (Handled elsewhere)
        }
    }

    gatherResources(time) {
        // Gather every 30 seconds (Slowed down from 10s)
        if (time - this.lastGatherTime < 30) return;
        this.lastGatherTime = time;

        const range = 2; // Check 5x5 area
        let foundWater = false;
        let foundForest = false;

        const minX = Math.max(0, this.gridX - range);
        const maxX = Math.min(this.terrain.logicalWidth - 1, this.gridX + range);
        const minZ = Math.max(0, this.gridZ - range);
        const maxZ = Math.min(this.terrain.logicalDepth - 1, this.gridZ + range);

        for (let x = minX; x <= maxX; x++) {
            for (let z = minZ; z <= maxZ; z++) {
                const height = this.terrain.getTileHeight(x, z);

                // Water (<= 0)
                if (height <= 0) {
                    foundWater = true;
                }
                // Forest (> 4 and <= 8)
                else if (height > 4 && height <= 8) {
                    foundForest = true;
                }

                if (foundWater && foundForest) break;
            }
            if (foundWater && foundForest) break;
        }

        if (foundWater) {
            if (window.game && window.game.resources) {
                window.game.resources.fish++;
                // Optional: Show effect?
            }
        }
        if (foundForest) {
            if (window.game && window.game.resources) {
                window.game.resources.meat++;
            }
        }
    }

    findTargetGoblin(goblins) {
        if (!goblins || goblins.length === 0) return;

        let nearest = null;
        let minDistSq = 10.0 * 10.0; // Range 10, squared

        // Linear scan - optimized with squared distance
        for (const goblin of goblins) {
            const dx = this.gridX - goblin.gridX;
            const dz = this.gridZ - goblin.gridZ;
            const distSq = dx * dx + dz * dz;

            if (distSq < minDistSq) {
                minDistSq = distSq;
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



    moveRandomly() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const directions = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ];

        // Shuffle directions to avoid bias
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);

        for (const dir of directions) {
            let targetX = this.gridX + dir.x;
            let targetZ = this.gridZ + dir.z;

            // Wrap logic
            if (targetX < 0) targetX = logicalW - 1;
            if (targetX >= logicalW) targetX = 0;
            if (targetZ < 0) targetZ = logicalD - 1;
            if (targetZ >= logicalD) targetZ = 0;

            const targetHeight = this.terrain.getTileHeight(targetX, targetZ);

            // Allow climbing up to 2.0 units
            if (Math.abs(targetHeight - currentHeight) <= 2.0) {
                // Check Sea Level (Must be land > 0)
                if (targetHeight > 0) {
                    this.isMoving = true;
                    console.log(`Unit moving from ${this.gridX},${this.gridZ} (${currentHeight.toFixed(2)}) to ${targetX},${targetZ} (${targetHeight.toFixed(2)})`);
                    this.moveStartTime = performance.now();
                    this.startGridX = this.gridX;
                    this.startGridZ = this.gridZ;
                    this.targetGridX = targetX;
                    this.targetGridZ = targetZ;

                    const angle = Math.atan2(dir.x, dir.z); // Wait, atan2(x, y). z is y.
                    // Actually dx=dir.x, dz=dir.z. atan2(dx, dz).
                    this.rotationY = Math.atan2(dir.x, dir.z);

                    return; // Found a valid move!
                } else {
                    console.log(`Unit failed move: Target is water (${targetHeight})`);
                }
            } else {
                console.log(`Unit failed move: Too steep (${currentHeight} -> ${targetHeight})`);
            }
        }
        // If no valid move found, stay idle.
        console.log(`Unit idle: No valid neighbors`);
        this.lastTime = performance.now(); // Reset timer so we don't spam checks
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
                console.log(`Unit warped from ${oldX},${oldX} to ${tx},${tz}`);
                found = true;
            }
            attempts++;
        }
    }

    tryBuildStructure() {
        // Performance Optimization: Moved logical width/depth fetch
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const x = this.gridX;
        const z = this.gridZ;
        // Optimization: Direct access to grid
        const cell = this.terrain.grid[x][z];

        // 1. Fast Exit: If already occupied, abort immediately
        if (cell.hasBuilding) return;

        // 2. Castle Check Setup
        const totalPop = window.game ? window.game.totalPopulation : 0;
        // Debug Log for Pop
        // if (Math.random() < 0.005) console.log("Total Pop:", totalPop);

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
                console.log(`Castle Construction Attempt: Pop ${totalPop} >= ${castleThreshold}. Flatness verified (3x3).`);
                if (Math.random() < 0.2) { // 20% chance
                    this.buildCastle(x, z, x1, z1);
                    return;
                }
            }
        }

        // House/Farm Logic (Requires 1x1 Flatness)
        if (is1x1Flat) {
            let houseCount = 0;
            let farmCount = 0;

            this.terrain.buildings.forEach(b => {
                if (b.type === 'house' || (b.userData && b.userData.type === 'house')) houseCount++;
                else if (b.type === 'farm' || (b.userData && b.userData.type === 'farm')) farmCount++;
            });

            // Strict Balancer Logic
            let shouldBuildFarm = false;

            // If we have fewer farms than half of houses, we MUST build a farm.
            if (farmCount < Math.ceil(houseCount / 2)) {
                shouldBuildFarm = true;
            }

            // Random factor: small chance to build farm anyway if low
            if (Math.random() < 0.2) shouldBuildFarm = true;

            if (shouldBuildFarm) {
                this.buildFarm();
            } else {
                this.buildHouse();
            }

            this.lastTime = performance.now();
            this.stagnationTimer = 0;
            setTimeout(() => {
                if (!this.isDead) this.moveRandomly();
            }, 500);
        } else {
            // Not flat enough to build anything
            this.moveRandomly();
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

    buildHouse() {
        // Use Terrain logic for consistent data structure
        this.terrain.addBuilding('house', this.gridX, this.gridZ);
        console.log("House built at", this.gridX, this.gridZ);

        // Eject unit to avoid being stuck inside
        this.moveRandomly();
    }

    buildFarm() {
        // Use Terrain logic
        this.terrain.addBuilding('farm', this.gridX, this.gridZ);

        // Eject unit
        this.moveRandomly();
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

        this.deathTimer += deltaTime;
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
            isSpecial: this.isSpecial
        };
    }

    static deserialize(data, scene, terrain) {
        const unit = new Unit(scene, terrain, data.gridX, data.gridZ, data.isSpecial);
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
