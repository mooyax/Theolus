console.log("[Unit.js] Module Loaded! V=FINAL");
import * as THREE from 'three';

import { Entity } from './Entity.js';

export class Unit extends Entity {
    static assets = {
        geometries: {},
        materials: {},
        textures: {}
    };
    static nextId = 0;

    static initAssets() {
        if (Unit.assets.initialized) return;

        // Geometries
        // Geometries (Reverted to Cute/Chibi proportions)
        const bodyGeo = new THREE.BoxGeometry(0.3, 0.35, 0.2);
        bodyGeo.translate(0, 0.3, 0); // Center height ~0.3
        Unit.assets.geometries.body = bodyGeo;

        const headGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        headGeo.translate(0, 0.6, 0);
        Unit.assets.geometries.head = headGeo;

        // Face Plane (Separate mesh to allow independent tinting of Hair/Helmet vs Face)
        const faceGeo = new THREE.PlaneGeometry(0.2, 0.2);
        faceGeo.translate(0, 0.6, 0.126); // Slightly in front of Head Box (Z=0.125)
        Unit.assets.geometries.facePlane = faceGeo;

        const limbGeo = new THREE.BoxGeometry(0.1, 0.25, 0.1);
        limbGeo.translate(0, -0.1, 0); // Pivot at top
        Unit.assets.geometries.limb = limbGeo;

        // Sword (Blade + Hilt joined? No, simple box for chibi)
        // Blade: 0.05 x 0.4 x 0.05
        const swordGeo = new THREE.BoxGeometry(0.05, 0.5, 0.05);
        swordGeo.translate(0, 0.25, 0); // Handle at bottom
        Unit.assets.geometries.sword = swordGeo;

        // Staff (Long pole)
        const staffGeo = new THREE.BoxGeometry(0.05, 0.8, 0.05);
        staffGeo.translate(0, 0, 0); // Center held
        Unit.assets.geometries.staff = staffGeo;

        // Wizard Hat (Cone + Brim)
        // Brim: Cylinder thin
        const brimGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 16);
        brimGeo.translate(0, 0, 0);
        // Cone
        const coneGeo = new THREE.ConeGeometry(0.15, 0.4, 16);
        coneGeo.translate(0, 0.2, 0);

        // Merge for simple instancing? Or kept separate?
        // Let's merge for single draw call per hat
        // Requires BufferGeometryUtils which might not be imported here?
        // Unit.js imports THREE.
        // Let's just use Cone for now for simplicity or complex if imported.
        // Actually Unit.js doesn't import Utils.
        // Let's use two meshes in Renderer or just the Cone for now?
        // User asked for "Gandalf like". Needs brim.
        // We will define them separate and render separate or use a Group logic?
        // InstancedMesh supports one Geometry.
        // We will just define `wizardHat` as the Cone part and `wizardHatBrim`?
        // Or we can construct a merged geometry manually if simple?
        // Let's stick to simple: Just a tall Cone for now, maybe add brim later if needed or modify `UnitRenderer` to handle multi-part hat.
        // Wait, I can't merge easily without util.
        // Let's define `hat` as just the Cone for now, but wide base.
        const hatGeo = new THREE.ConeGeometry(0.2, 0.5, 16);
        hatGeo.translate(0, 0.25, 0);
        Unit.assets.geometries.wizardHat = hatGeo;

        // Brim (Separate for Renderer to handle? Or renderer renders 2 parts?)
        const hatBrimGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 16);
        Unit.assets.geometries.wizardHatBrim = hatBrimGeo;

        // Materials
        // Standard
        Unit.assets.materials.skin = new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.8 });
        Unit.assets.materials.clothes = new THREE.MeshStandardMaterial({ color: 0x885533, roughness: 1.0 });
        Unit.assets.materials.tool = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.5 });
        Unit.assets.materials.hat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 1.0 });

        // Knight Materials
        Unit.assets.materials.armor = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.2 });
        Unit.assets.materials.helmet = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.1 });

        // Wizard Materials
        Unit.assets.materials.robe = new THREE.MeshStandardMaterial({ color: 0x444499, roughness: 1.0 });
        Unit.assets.materials.robe = new THREE.MeshStandardMaterial({ color: 0x444499, roughness: 1.0 });
        Unit.assets.materials.wizardHat = new THREE.MeshStandardMaterial({ color: 0x333388, roughness: 1.0 });

        // New Item Materials
        Unit.assets.materials.metal = new THREE.MeshStandardMaterial({ color: 0xDDDDDD, metalness: 0.9, roughness: 0.2 });
        Unit.assets.materials.wood = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 });
        Unit.assets.materials.darkMagic = new THREE.MeshStandardMaterial({ color: 0x330033, roughness: 1.0 });

        // Faces & Textures
        Unit.assets.textures.face = Unit.createFaceTexture();
        Unit.assets.materials.face = new THREE.MeshStandardMaterial({ map: Unit.assets.textures.face, transparent: true });

        Unit.assets.textures.hair = Unit.createHairTexture();
        // Use Lambert to match body lighting and prevent 'Standard' material darkening
        Unit.assets.materials.hair = new THREE.MeshLambertMaterial({ map: Unit.assets.textures.hair, transparent: true });

        Unit.assets.materials.heads = null; // Deprecated (Split meshes)

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
        // Grayscale Noise for Tinting - Use WHITE base to preserve true tint color
        ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, 64, 64); // White Base
        ctx.fillStyle = '#DDDDDD'; // Very Light Grey Noise
        for (let i = 0; i < 40; i++) {
            ctx.fillRect(Math.random() * 60, Math.random() * 60, 4, 4);
        }
        return new THREE.CanvasTexture(canvas);
    }

    constructor(scene, terrain, x, z, role, isSpecial = false) {
        super(scene, terrain, x, z, 'unit');

        // Remove manual ID (Use Entity's if standardized, or keep manual overlap?)
        // UnitMain initialized ID manually. Entity does too.
        // Let's use Base ID. BUT Unit has static nextId=0. 
        // If we switch to Base ID, IDs might change.
        // Let's Keep Unit's ID logic for now to avoid tests breaking?
        // Actually best to override ID with Unit's counter if we want strict compatibility,
        // OR just delete Unit's counter and use Entity's.
        // Entity.nextId starts at 0. Unit.nextId starts at 0.
        // If we use Entity.nextId, Goblins and Units share the pool.
        // Tests expect Unit ID 0. If Goblin Created first, Unit might be ID 1.
        // Let's force override ID in Unit to use Unit.nextId for compatibility.
        this.id = Unit.nextId++;

        console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${role} Pos:${x},${z} Special:${isSpecial}`);
        this.gridX = (x !== undefined) ? x : 20;
        this.gridZ = (z !== undefined) ? z : 20;

        // Legacy compatibility check (if role arg is boolean)
        // Check if role is boolean (old style: new Unit(..., isSpecial))
        let specialFlag = isSpecial;
        if (typeof role === 'boolean') {
            specialFlag = role;
            role = 'worker';
        }

        this.role = role || 'worker';
        this.isSpecial = specialFlag;

        this.lastGridX = this.gridX;
        this.lastGridZ = this.gridZ;
        this.lastGridX = this.gridX;
        this.lastGridZ = this.gridZ;
        this.stagnationTimer = 0;
        this.buildStagnationCount = 0;
        this.lastTime = 0; // Fix: Undefined caused logic failure
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
        // Reverted to original lifespan (50-80 sim seconds)
        // With staggered update (half speed), this is ~2-3 mins real time.
        // Special Unit = 6-9 mins.
        // User Request: Lifespan 80-100 years.
        // Aging Rate remains same (Worker=1yr/s, Soldier=1yr/10s).
        const baseLifespan = 80 + Math.random() * 20;
        this.lifespan = baseLifespan;

        this.age = 20; // Starts at 20 years old
        this.isDead = false;
        this.isFinished = false;
        this.crossMesh = null;

        // Combat Stats (Default - Worker)
        this.hp = 35 + Math.floor(Math.random() * 15); // Nerfed (Avg 42)
        this.maxHp = this.hp;
        this.attackCooldown = 0;
        this.attackRate = 1.0;
        this.damage = 4; // Nerfed (Goblin has 30HP -> 8 hits)
        this.targetGoblin = null;

        // Stats Overrides
        if (this.role === 'knight') {
            this.hp *= 15; // Massive HP (40x15 = 600) - Overwhelming
            this.maxHp = this.hp;
            this.damage *= 25; // 100 Dmg (Definitely 1-shot Normal Goblin)
        } else if (this.role === 'wizard') {
            this.hp *= 3; // Buffed (40x3 = 120) - Strong enough to survive
            this.maxHp = this.hp;
            this.damage *= 20; // 80 Dmg (1-shot Normal, 2-shot Hob)
            this.attackRate = 2.0; // Slower attack? Or faster? "Multi-target"
            // Range handled in logic
        }

        this.updatePosition();

        this.moveTimer = 0;
        this.moveDuration = 1000;
        this.moveStartTime = 0;
        this.startGridX = 0;
        this.startGridZ = 0;
        this.targetGridX = 0;
        this.targetGridZ = 0;

        // Action Timers
        this.lastTime = 0;
        // Reduced interval for more active units (2s - 5s)
        this.moveInterval = 2000 + Math.random() * 3000;
        if (this.role === 'knight' || this.role === 'wizard') {
            this.moveInterval = 0; // Soldiers act immediately on spawn
        }

        this.stagnationTimer = 0;
        this.huntingCooldown = 0;
        this.target = null; // Assuming 'Target' was a typo for 'this.target'

        // Animation state
        this.isMoving = false;
        this.targetX = 0;
        this.targetZ = 0;
        // this.moveStartTime = 0; // Already defined above
        // this.moveDuration = 1000; // Already defined above

        // Register in Spatial Grid
        this.terrain.registerEntity(this, this.gridX, this.gridZ, 'unit');

        this.wanderCount = 0;
        this.migrationTarget = null;

        // Target Ignoring Logic (Replaces global cooldown)
        this.ignoredTargets = new Map(); // id -> timestamp until ignored
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.terrain.unregisterEntity(this);

        // Release any held job
        if (this.role === 'worker' && this.targetRequest && window.game) {
            console.log(`Unit ${this.id} died. Releasing job ${this.targetRequest.id}`);
            window.game.releaseRequest(this, this.targetRequest);
            this.targetRequest = null;
        }

        this.createCross();
        console.log(`Unit died.`);
    }

    attackGoblin(goblin) {
        // console.log(`[Unit Debug] Attack request. CD: ${this.attackCooldown}`);
        if (this.attackCooldown > 0) return;

        console.log(`[Unit Debug] ATTACKING Goblin ${goblin.id}`);
        if (this.role === 'wizard') {
            // Ranged Attack Animation
            this.limbs.leftArm.x = -Math.PI; // Raise staff
            this.limbs.rightArm.x = -Math.PI;

            // Spawn Fireball Visual
            if (window.game && window.game.spawnProjectile) {
                const startPos = this.position.clone().add(new THREE.Vector3(0, 0.9, 0)); // Head/Staff level
                // We don't have goblin precise position stored in logic? 
                // We have gridX/Z. Need visualization position or estimated.
                const h = this.terrain.getTileHeight(goblin.gridX, goblin.gridZ);
                // Convert grid to world for target
                // Assuming standard centering:
                const logicalW = this.terrain.logicalWidth || 80;
                const logicalD = this.terrain.logicalDepth || 80;

                // Note: Goblin position might not be perfectly synced if it's moving, 
                // but grid center is close enough for a fireball target.
                const targetPos = new THREE.Vector3(
                    (goblin.gridX - logicalW / 2),
                    h + 1.0, // Chest height
                    (goblin.gridZ - logicalD / 2)
                );

                window.game.spawnProjectile(startPos, targetPos);
            }

            setTimeout(() => {
                if (!this.isDead) {
                    this.limbs.leftArm.x = 0;
                    this.limbs.rightArm.x = 0;
                }
            }, 500);
        } else {
            // Melee (Soldier/Worker)
            this.limbs.rightArm.x = -Math.PI / 2;
            setTimeout(() => {
                if (!this.isDead) this.limbs.rightArm.x = 0;
            }, 200);
        }

        // DAMAGE LOGIC
        goblin.takeDamage(this.damage);

        // Report Combat to Squad/Global Memory (Every hit matches "In Combat" status)
        if (this.role === 'knight' || this.role === 'wizard') {
            this.reportEnemy(goblin);
        }

        if (goblin.hp <= 0) {
            goblin.isDead = true;
            this.targetGoblin = null;
            // AI Memory: Record this kill location
            if (window.game && (this.role === 'knight' || this.role === 'wizard')) {
                this.searchForHut(goblin.gridX, goblin.gridZ);
            }
        }

        this.attackCooldown = this.attackRate;
    }

    attackBuilding(building) {
        if (this.attackCooldown > 0) return;

        // VISUALS
        if (this.role === 'wizard') {
            this.limbs.leftArm.x = -Math.PI;
            this.limbs.rightArm.x = -Math.PI;
            setTimeout(() => {
                if (!this.isDead) {
                    this.limbs.leftArm.x = 0;
                    this.limbs.rightArm.x = 0;
                }
            }, 500);
        } else {
            this.limbs.rightArm.x = -Math.PI / 2;
            setTimeout(() => {
                if (!this.isDead) this.limbs.rightArm.x = 0;
            }, 200);
        }

        // DAMAGE LOGIC
        if (building.userData.hp === undefined) building.userData.hp = 100; // Legacy Safety
        building.userData.hp -= this.damage;

        // Feedback
        console.log(`Unit ${this.id} attacking ${building.type}. HP: ${building.userData.hp}`);

        if (building.userData.hp <= 0) {
            console.log(`Building ${building.type} Destroyed!`);
            this.terrain.removeBuilding(building);
            this.targetBuilding = null;

            // Search surroundings for next target
            this.searchSurroundings(this.gridX, this.gridZ);
        }

        this.attackCooldown = this.attackRate;
    }

    debugGetAge() {
        return "DEBUG_AGE_" + this.age;
    }

    updateLogic(time, deltaTime, isNight, goblins, fishes, sheeps) {
        if (this.id === 0) console.log(`[Unit.js] ENTERED updateLogic. Dead=${this.isDead}`);
        if (this.isDead) {
            this.updateDeathAnimation(deltaTime);
            this.action = "Dead";
            return;
        }

        if (this.id === 0) {
            const h = this.terrain.getTileHeight(this.gridX, this.gridZ);
            console.log(`[Unit Debug V2] Start Logic. Night=${isNight}, Stag=${this.stagnationTimer.toFixed(1)}, Age=${this.age.toFixed(1)}, H=${h}, Action=${this.action}`);
        }

        // DEBUG HEARTBEAT
        if (this.id === 0) {
            if (this.debugFrame % 60 === 0) {
                console.log(`[Unit Heartbeat] ID:${this.id} Action:${this.action} Moving:${this.isMoving} T:${time.toFixed(1)} dt:${deltaTime.toFixed(4)} Int:${this.moveInterval.toFixed(0)}`);
            }
        }

        // Combat Cooldown
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }

        if (this.isMoving) {
            this.updateMovement(time);
        }

        // Cleanup Ignored Targets
        if (this.ignoredTargets.size > 0) {
            for (const [id, expiry] of this.ignoredTargets) {
                if (time > expiry) this.ignoredTargets.delete(id);
            }
        }

        // STUCK MONITOR (Long Term Physics Fail)
        if (this.isMoving && time - this.moveStartTime > 20000) {
            console.warn(`[Unit] Stuck moving for >20s. Forcing Reset. ID:${this.id}`);
            this.isMoving = false;
            this.updatePosition();

            // Release failed job
            if (this.role === 'worker' && this.targetRequest && window.game) {
                console.warn(`Unit ${this.id} stuck. Releasing job ${this.targetRequest.id}`);
                window.game.releaseRequest(this, this.targetRequest);
                this.targetRequest = null;
                this.action = 'Idle';
            }
        }

        // STUCK WORKING CLEANUP
        if (this.action === 'Working' && !this.targetRequest) {
            // console.warn(`[Unit ${this.id}] Stuck in 'Working' without job. Resetting to Idle.`);
            this.action = 'Idle';
            this.isMoving = false;
        }

        // GHOST JOB MONITOR
        // Verify our job still exists and is ours
        if (this.role === 'worker' && this.targetRequest && window.game) {
            if (this.debugFrame % 60 === 0) {
                const req = this.targetRequest;
                // Check if req is in queue (or efficient lookup if possible, but queue is small < 100)
                const isValid = window.game.requestQueue.includes(req);
                const isOurs = (req.assignedTo === this.id); // If status reverted to pending, this is false

                if (!isValid || !isOurs) {
                    console.warn(`[Unit ${this.id}] Detected GHOST Job (Valid:${isValid}, Ours:${isOurs}). Dropping.`);
                    this.targetRequest = null;
                    this.action = 'Idle';
                    this.isMoving = false; // Stop approaching ghost
                }
            }
        }

        // Default action
        // Default action
        if (!this.isMoving && time >= this.lastTime && this.action !== 'Migrating') this.action = "Idle";

        // Aging
        let agingRate = 1.0;
        if (this.role === 'knight' || this.role === 'wizard') {
            agingRate = 0.1;
        }
        // console.log(`[DEBUG Unit ${this.id}] incrementing age by ${deltaTime * agingRate}. Current: ${this.age}`);
        this.age += deltaTime * agingRate;
        if (this.age >= this.lifespan) {
            this.die();
            return;
        }

        // WATER DEATH CHECK
        const h = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (h <= 0) {
            this.die();
            return;
        }

        // --- MIGRATION LOGIC (Continuous Walking) ---
        if (this.action === 'Migrating' && this.migrationTarget) {
            // 1. Timeout Logic
            this.migrationTimer = (this.migrationTimer || 0) + deltaTime;
            if (this.migrationTimer > 30.0) {
                console.log(`Unit ${this.id} migration timed out. Retrying.`);
                this.migrate(time);
                return;
            }

            // 2. Priority Interrupt (Combat & Buildings) - Throttle to 10% chance per frame or simple timer
            // To avoid heavy `searchSurroundings` every frame.
            if (Math.random() < 0.05) {
                // WORKER JOB CHECK (Fix for Ignoring Jobs while Migrating)
                if (this.role === 'worker' && window.game) {
                    const req = window.game.findBestRequest(this);
                    if (req) {
                        if (window.game.claimRequest(this, req)) {
                            console.log(`Unit ${this.id} interrupted migration for Job ${req.type}`);
                            this.targetRequest = req;
                            this.action = 'Idle';
                            this.migrationTarget = null;
                            this.migrationTimer = 0;
                            return;
                        }
                    }
                }

                this.searchSurroundings(this.gridX, this.gridZ);
                // If search found something, searchSurroundings sets targetGoblin/targetBuilding
                // IF we are a Worker, we shouldn't interrupt for Buildings unless it's a Hut (which we handle)
                // But searchSurroundings already handles "finding" logic (logging mostly).
                // We need to check if we HAVE a target now.

                // Note: searchSurroundings doesn't inherently set `action` to Chasing automatically? 
                // updateLogic (next frame) would pick it up if we weren't in this `if` block.
                // So we must break out of Migrating if we found something.
                if (this.targetGoblin || (this.targetBuilding && this.role !== 'worker')) {
                    console.log(`Unit ${this.id} interrupted migration for combat.`);
                    this.action = 'Idle';
                    this.migrationTarget = null;
                    this.migrationTimer = 0;
                    return; // Let standard logic handle chasin next frame
                }
            }

            // Continue Moving
            const dist = this.getDistance(this.migrationTarget.x, this.migrationTarget.z);
            if (dist <= 2.0) {
                console.log(`Unit ${this.id} finished migration.`);
                this.action = 'Idle';
                this.migrationTarget = null;
                this.migrationTimer = 0;
            } else {
                if (!this.isMoving && (time - (this.lastMoveAttempt || 0) > 1000)) {
                    this.lastMoveAttempt = time;
                    this.triggerMove(this.migrationTarget.x, this.migrationTarget.z, time);
                }
            }
            return; // Early return for migrating state
        }

        // --- TARGET SCANNING ---
        {
            // Priority: Calculate Best Target (Goblin vs Building)
            let bestTarget = null;
            let bestScore = Infinity; // Lower is better

            // COMMITMENT LOGIC:
            const hasValidGoblin = this.targetGoblin && !this.targetGoblin.isDead;
            const hasValidBuilding = this.targetBuilding && this.targetBuilding.userData.hp > 0;
            let isBusy = (this.action === 'Chasing' || this.action === 'Fighting' || this.action === 'Sieging' || this.action === 'Unstuck');

            // WORKER PACIFISM
            if (this.role === 'worker' && this.targetRequest) isBusy = true;

            this.scanTimer = (this.scanTimer || 0) + 1;

            // Adaptive Scan Rate
            // If we have a target, scan LESS frequently (every ~5s) to avoid jitter/indecision.
            // If we have NO target, scan frequently (every ~0.5s) to find one fast.
            let scanInterval = 30;
            if (hasValidGoblin || hasValidBuilding) {
                scanInterval = 300; // 5 seconds commitment
            }

            const forceScan = (this.scanTimer > scanInterval);

            // Logic: Scan if Idle OR Invalid Target OR Force Scan... UNLESS Worker is Working
            let shouldScan = (!isBusy || (!hasValidGoblin && !hasValidBuilding) || forceScan);
            if (this.role === 'worker' && this.targetRequest) shouldScan = false;

            if (shouldScan) {
                if (forceScan) this.scanTimer = 0;

                // Current Target Data for Hysteresis
                const currentTargetId = this.targetGoblin ? this.targetGoblin.id :
                    (this.targetBuilding ? this.targetBuilding.id : null);

                // 1. Scan Goblins
                if (goblins) {
                    const maxDist = (this.role === 'knight' || this.role === 'wizard') ? 50 : 15;

                    for (const g of goblins) {
                        if (g.isDead) continue;
                        if (this.ignoredTargets.has(g.id)) continue;

                        const d = this.getDistance(g.gridX, g.gridZ);

                        // Relaxed Range for Current Target (Stickiness)
                        let limit = maxDist;
                        if (g.id === currentTargetId) limit = maxDist * 2.0;

                        if (d > limit) continue;

                        const h = this.terrain.getTileHeight(g.gridX, g.gridZ);
                        let score = d - 1000.0; // Base priority for Goblins (High)
                        if (h > 8) score += 20;

                        // Sticky Bonus (Huge hysteresis to prevent switching)
                        // If this is our current target, artificially lower its score (make it better)
                        if (g.id === currentTargetId) score -= 500.0;

                        if (score < bestScore) {
                            bestScore = score;
                            bestTarget = { type: 'goblin', obj: g };
                        }
                    }
                }

                // 2. Scan Buildings
                if (this.terrain.buildings) {
                    const range = (this.role === 'knight' || this.role === 'wizard') ? Infinity : 30;
                    for (const b of this.terrain.buildings) {
                        if (this.role === 'worker' && b.type !== 'goblin_hut') continue;
                        if (b.type === 'goblin_hut' || b.type === 'cave') {
                            if (b.userData && b.userData.hp <= 0) continue;
                            if (this.ignoredTargets.has(b.id)) continue;
                            const d = this.getDistance(b.gridX, b.gridZ);
                            if (d > range) continue;

                            let score = d - 5.0; // Lower priority than goblins (-1000)
                            if (b.id === currentTargetId) score -= 500.0; // Sticky Bonus

                            // Special logic: Don't hug caves if active goblins are nearby?
                            if (d < 8.0 && (this.role === 'knight' || this.role === 'wizard')) score -= 2000.0; // Sieging Logic Override

                            if (score < bestScore) {
                                bestScore = score;
                                bestTarget = { type: 'building', obj: b };
                            }
                        }
                    }
                }

                // Apply Target
                // Only switch if we found a significantly better one OR current is invalid
                // But Hysteresis is already baked into score (-500 for current).
                // So simple comparison is safe.

                this.targetGoblin = null;
                this.targetBuilding = null;

                if (bestTarget) {
                    if (bestTarget.type === 'goblin') this.targetGoblin = bestTarget.obj;
                    else this.targetBuilding = bestTarget.obj;
                }

                // Priority 3: Raid Point
                if (!this.targetGoblin && !this.targetBuilding && window.game && window.game.raidPoints && window.game.raidPoints.length > 0) {
                    this.findRaidTarget();
                }
            }
        }

        // --- ACTION LOGIC ---
        if (this.targetGoblin) {
            const dist = this.getDistance(this.targetGoblin.gridX, this.targetGoblin.gridZ);
            let range = 1.8;
            if (this.role === 'wizard') range = 5.5;

            if (dist <= range) {
                this.action = "Fighting";
                this.isMoving = false;
                this.attackGoblin(this.targetGoblin);
            } else {
                // Chase
                if (this.isMoving) {
                    // Logic to update path if target moves significantly?
                    // Since we move step-by-step, we will reach the tile then re-evaluate.
                    // No need to interrupt mid-step (1 tile) unless dire.
                    // Interrupting causes jitter.
                }
                if (!this.isMoving) {
                    this.action = "Chasing";
                    this.triggerMove(this.targetGoblin.gridX, this.targetGoblin.gridZ, time);
                    this.moveInterval = 0;
                }
            }
        } else if (this.targetBuilding) {
            const dist = this.getDistance(this.targetBuilding.gridX, this.targetBuilding.gridZ);
            if (dist <= 2.0) {
                this.action = "Sieging";
                this.attackBuilding(this.targetBuilding);
            } else {
                if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                    this.action = (dist > 20.0) ? "Travelling" : "Approaching Target";
                    this.triggerMove(this.targetBuilding.gridX, this.targetBuilding.gridZ, time);
                }
            }
        } else if (this.targetRaidPoint) {
            const dist = this.getDistance(this.targetRaidPoint.x, this.targetRaidPoint.z);
            if (dist <= 5.0) {
                this.searchSurroundings(this.gridX, this.gridZ);
                this.targetRaidPoint = null;
            } else {
                if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                    this.triggerMove(this.targetRaidPoint.x, this.targetRaidPoint.z, time);
                }
            }

            // --- WORKER JOB LOGIC ---
        } else if (this.role === 'worker' && this.targetRequest) {
            if (this.isSleeping) this.isSleeping = false; // Force Wake Up

            // INTERRUPT WANDER / MIGRATION
            // If we are moving but NOT for work/fight, stop immediately to attend job.
            // CAUTION: Do NOT interrupt if we are ALREADY 'Approaching Job' or 'Working', otherwise we oscillate!
            if (this.isMoving && (this.action === 'Idle' || this.action === 'Moving' || this.action === 'Migrating')) {
                console.log(`[Unit ${this.id}] Interrupting movement for Job ${this.targetRequest.type}`);
                this.isMoving = false;
                this.moveTimer = 0; // Reset interpolation
                this.lastMoveAttempt = 0; // Allow immediate retry
            }

            const dist = this.getDistance(this.targetRequest.x, this.targetRequest.z);
            if (dist <= 2.0) {
                this.action = "Working";
                this.isMoving = false; // Stop moving to work
                // Execute
                // Execute
                if (window.game) window.game.completeRequest(this, this.targetRequest);
                this.targetRequest = null;

                // JOB CHAINING: Immediately look for another job nearby
                // prevents walking away when there is more work 2 tiles away.
                // We use findBestRequest which searches globally/nearby.
                if (window.game) {
                    const nextReq = window.game.findBestRequest(this);
                    if (nextReq && window.game.claimRequest(this, nextReq)) {
                        this.targetRequest = nextReq;
                        this.action = 'Approaching Job';
                        console.log(`[Unit ${this.id}] Chained Job ${nextReq.type}`);
                    } else {
                        this.action = "Idle";
                    }
                } else {
                    this.action = "Idle";
                }
            } else {
                this.action = "Working";
                if (!this.isMoving && time - (this.lastMoveAttempt || 0) > 1000) {
                    this.lastMoveAttempt = time;
                    this.triggerMove(this.targetRequest.x, this.targetRequest.z, time);

                    // CRITICAL FIX: executeMove sets action='Moving'.
                    // We must force it to 'Approaching Job' so our interrupt logic ignores it next frame.
                    if (this.isMoving) {
                        this.action = 'Approaching Job';
                    }

                    // Track failures to start moving (e.g. across water/cliffs)
                    if (!this.isMoving) {
                        this.jobMoveFailures = (this.jobMoveFailures || 0) + 1;
                        if (this.jobMoveFailures > 5) {
                            console.warn(`Unit ${this.id} failed to reach job ${this.targetRequest.id} after 5 attempts. Releasing.`);
                            if (window.game) window.game.releaseRequest(this, this.targetRequest);
                            this.targetRequest = null;
                            this.action = 'Idle';
                            this.jobMoveFailures = 0;
                        }
                    } else {
                        this.jobMoveFailures = 0;
                    }
                }
            }

            // --- IDLE / JOB SEARCH ---
        } else {
            // If idle, look for a job (Workers Only)
            if (this.role === 'worker' && !this.targetRequest && window.game) {
                // Throttle job search
                // Increased from 0.1 to 0.5 for faster reaction (User Request: "Too slow")
                if (Math.random() < 0.5) {
                    const req = window.game.findBestRequest(this);
                    if (req) {
                        if (window.game.claimRequest(this, req)) {
                            this.targetRequest = req;
                            console.log(`Unit ${this.id} claimed job ${req.type}`);
                        }
                    }
                }
            }
        }

        // Safety Reset
        if ((this.action === 'Chasing' || this.action === 'Fighting') && !this.targetGoblin && !this.targetBuilding) {
            this.isMoving = false;
            this.action = 'Idle';
        }

        this.gatherResources(time);

        // --- IDLE / WANDER / STAGNATION ---

        // Stuck Watchdog (Ghost Move)
        // Stuck Watchdog (Ghost Move) - REMOVED (Caused Jitter on slow terrain)
        // Lerp movement doesn't update gridX until end, so this always triggered for >3s moves.
        this.moveStuckTimer = 0;

        // Stagnation Logic
        if (this.lastGridX === this.gridX && this.lastGridZ === this.gridZ && !this.isSleeping && !this.isMoving) {
            this.stagnationTimer += deltaTime;
        } else {
            this.lastGridX = this.gridX;
            this.lastGridZ = this.gridZ;
            this.stagnationTimer = 0;
        }

        if (this.stagnationTimer > 10.0) {
            this.moveRandomly(time);
            if (this.stagnationTimer > 20.0) {
                this.migrate(time); // Use walking migrate
                this.stagnationTimer = 0;
            }
            return;
        }

        // Wander / Night Logic
        if (!this.isMoving && !this.targetGoblin && !this.targetBuilding && !this.targetRaidPoint && !this.targetRequest) {
            const canSleep = (this.role === 'worker' || this.role === 'fisher' || this.role === 'hunter');
            if (isNight && canSleep) {
                const cell = this.terrain.grid[this.gridX][this.gridZ];
                const isShelter = cell.hasBuilding && cell.building && (cell.building.type === 'house' || cell.building.type === 'castle');
                if (isShelter) {
                    if (!this.isSleeping) {
                        console.log(`[Unit ${this.id}] Sleeping`);
                        this.isSleeping = true;
                    }
                    return;
                } else {

                    // Go Home Logic
                    if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                        let targetShelter = this.homeBase;

                        // Commitment Logic: Use cached target if valid
                        if (!targetShelter) {
                            if (this.nightShelterTarget && this.nightShelterTarget.userData.hp > 0) {
                                // Check if still exists in world (simple check via hp usually enough, or use uniqueId lookup)
                                targetShelter = this.nightShelterTarget;
                            } else {
                                targetShelter = this.findNearestShelter();
                                this.nightShelterTarget = targetShelter;
                            }
                        }

                        if (targetShelter) {
                            this.action = "Going Home";
                            this.triggerMove(targetShelter.userData.gridX, targetShelter.userData.gridZ, time);
                            return; // Priority
                        } else {
                            // No shelter found? Wander.
                            this.nightShelterTarget = null;
                        }
                    }
                }

            } else {
                if (this.isSleeping) this.isSleeping = false;
            }
        }

        // Active Wander/Work
        if (!this.isMoving && time - this.lastTime > this.moveInterval) {
            if (this.id === 0 && this.debugFrame % 60 === 0) console.log(`[Unit Debug] Executing Logic. Role: ${this.role}`);
            if (this.role === 'worker') {
                const cell = this.terrain.grid[this.gridX][this.gridZ];
                if (cell && cell.moisture !== 0.5 && Math.random() < 0.1) {
                    this.improveLand(time);
                } else {
                    this.moveRandomly(time);
                }
            } else if (this.role === 'knight' || this.role === 'wizard') {
                const found = this.findRaidTarget();
                if (!found) this.exploreSurroundings(time);
                if (this.targetRaidPoint) {
                    this.triggerMove(this.targetRaidPoint.x, this.targetRaidPoint.z, time);
                } else {
                    this.patrol(time);
                }
            } else {
                this.moveRandomly(time);
            }
            this.lastTime = time;
            this.moveInterval = 2000 + Math.random() * 3000;
        }
    }


    searchForHut(x, z) {
        // Wrapper for finding nearby buildings. 
        // Logic already exists in findTargetBuilding, which searches near 'this' unit.
        // Since Unit is at (x,z) (melee range), this works.
        this.findTargetBuilding(40); // Scan within 40 tiles
    }

    findTargetBuilding(range) {
        // Search for 'goblin_hut' or 'cave' nearby
        if (!this.terrain.buildings) return;
        const buildings = this.terrain.buildings;
        let nearest = null;
        let minDist = Infinity; // Global Search (Soldiers travel far)
        let foundType = null;

        const limitRange = (range !== undefined) ? range : Infinity;

        for (const b of buildings) {
            // Workers ONLY target huts, not Caves (Caves require explosives/Knights?)
            // Actually user just said "Goblin Huts". Let's restrict workers to huts.
            if (this.role === 'worker' && b.type !== 'goblin_hut') continue;

            if (b.type === 'goblin_hut' || b.type === 'cave') {
                const dist = this.getDistance(b.gridX, b.gridZ);

                if (dist > limitRange) continue;

                // Prefer closer, but take any
                if (dist < minDist) {
                    minDist = dist;
                    nearest = b;
                    foundType = b.type;
                }
            }
        }

        // Debug log (Throttle)
        if (this.role === 'knight' && Math.random() < 0.001) {
            console.log(`[Unit Debug] Targeted: ${this.targetGoblin ? 'Goblin' : (this.targetBuilding ? this.targetBuilding.type : 'None')}`);
        }

        if (nearest && foundType) {
            // console.log(`Unit ${this.id} targets enemy base: ${nearest.type} at ${nearest.gridX},${nearest.gridZ}`);
            this.targetBuilding = nearest;
            this.reportEnemy(nearest); // Report Sighting!
        }
    }

    reportEnemy(target) {
        const x = target.gridX;
        const z = target.gridZ;
        const time = (this.game) ? this.game.gameTotalTime : Date.now();

        // 1. Report to Squad (Home Base)
        if (this.homeBase && this.homeBase.userData && this.homeBase.userData.memory) {
            this.homeBase.userData.memory.reportRaid(x, z, time);
        }
        // 2. Fallback to Global Memory? (User requested isolation, implying NO global reporting for squad units)
        // Freelancers (no homeBase) -> Global Memory (game.battleMemory)
        else if (this.game && this.game.battleMemory) {
            this.game.battleMemory.reportRaid(x, z, time);
        }
    }

    findRaidTarget() {
        // use Shared Memory
        let memories = [];
        const currentTime = (this.game) ? this.game.gameTotalTime : Date.now();

        // Source 1: Squad Memory
        if (this.homeBase && this.homeBase.userData && this.homeBase.userData.memory) {
            memories = this.homeBase.userData.memory.getPriorities(currentTime);
        }
        // Source 2: Global Memory (Freelancers only)
        else if (this.game && this.game.battleMemory) {
            memories = this.game.battleMemory.getPriorities(currentTime);
        }

        if (!memories || memories.length === 0) {
            return;
        }

        let nearest = null;
        let minDist = Infinity;

        memories.forEach(p => {
            const dist = this.getDistance(p.x, p.z);
            // HUGE CHANGE: Do not target points we are already at!
            if (dist < 8.0) return;

            // Check ignore list by coord
            if (this.ignoredTargets && this.ignoredTargets.has(`${p.x},${p.z}`)) return;

            if (dist < minDist) {
                minDist = dist;
                nearest = p;
            }
        });

        if (nearest) {
            this.targetRaidPoint = nearest;
            return true;
        }
        return false;
    }

    findNearestShelter() {
        if (!this.terrain || !this.terrain.buildings) return null;

        let nearest = null;
        let minDist = Infinity;

        for (const b of this.terrain.buildings) {
            // Check ignore
            if (this.ignoredTargets && this.ignoredTargets.has(b.id)) continue;
            if (this.ignoredTargets && this.ignoredTargets.has(`${b.gridX},${b.gridZ}`)) continue;

            if (b.type === 'house' || b.type === 'castle') {
                if (b.userData && b.userData.hp > 0) {
                    const d = this.getDistance(b.gridX, b.gridZ);
                    if (d < minDist) {
                        minDist = d;
                        nearest = b;
                    }
                }
            }
        }
        return nearest;
    }

    exploreSurroundings(time) {
        // No memory target. Pick a random patrol point on the map.
        // This simulates "Exploration" and triggers searchSurroundings upon arrival.
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Try to pick a spot somewhat far away to encourage movement?
        // Or just random.
        const rx = Math.floor(Math.random() * logicalW);
        const rz = Math.floor(Math.random() * logicalD);

        // Don't pick water?
        const h = this.terrain.getTileHeight(rx, rz);
        if (h <= 0) return; // Try again next frame

        // Don't pick too close (avoid immediate loop)
        const dist = this.getDistance(rx, rz);
        if (dist < 15.0) return; // Too close

        this.targetRaidPoint = { x: rx, z: rz, priority: 1 };
        console.log(`Unit ${this.id} exploring to ${rx},${rz}`);
    }

    searchSurroundings(x, z) {
        // Active scan for Goblins OR Buildings
        if (!this.game) return;

        if (this.terrain && this.terrain.findBestTarget) {
            // 1. Goblins (Optimized)
            // Range 12
            const goblin = this.terrain.findBestTarget('goblin', x, z, 12, (g, dist) => {
                return dist; // Simple closest check
            });

            if (goblin) {
                this.targetGoblin = goblin;
                this.reportEnemy(goblin);
                console.log(`Unit ${this.id} found Goblin via Spatial Search!`);
                return;
            }

            // 2. Buildings (Optimized)
            // Range 12. Types: goblin_hut or cave.
            const building = this.terrain.findBestTarget('building', x, z, 12, (b, dist) => {
                if (b.userData.type === 'goblin_hut' || b.userData.type === 'cave') {
                    return dist;
                }
                return Infinity; // Ignore other buildings
            });

            if (building) {
                console.log(`Unit ${this.id} found Base via Spatial Search!`);
                // Note: Logic below didn't set targetBuilding explicitly in original code?
                // Original: Just logged "found Base".
                // Ah, Unit.js logic updates "targetRaidPoint" via report?
                // Actually, original code (Step 1352) JUST RETURNED?
                // Wait: line 876: `return;`.
                // It seems `searchSurroundings` is just a Trigger?
                // But `targetGoblin` IS set.
                // For buildings, it only logs. Maybe `reportRaid` is handled elsewhere?
                // Actually, line 860 calls `reportEnemy`.
                // For buildings, original code did NOTHING but log.
                // I will replicate that behavior for safety, or improve it.
                // If I return building, I should probably do something.
                // But strictly replacing:
                return;
            }
        } else {
            // Fallback (or Error if terrain incomplete mock)
        }
    }

    patrol(time) {
        // Go to a random building to "guard" it, or just wander if none
        if (this.terrain.buildings && this.terrain.buildings.length > 0) {
            // Pick random building
            const r = Math.floor(Math.random() * this.terrain.buildings.length);
            const b = this.terrain.buildings[r];

            // Go near it
            // Don't go INSIDE, go next to it.
            // Simple: Target its location.
            // Dist check?
            const dx = Math.abs(this.gridX - b.gridX);
            const dz = Math.abs(this.gridZ - b.gridZ);

            // If already near, wander locally
            if (dx < 5 && dz < 5) {
                this.moveRandomly(time);
            } else {
                this.triggerMove(b.gridX, b.gridZ, time);
            }
        } else {
            this.moveRandomly(time);
        }
    }

    // updateMovement is inherited from Entity.
    // We implement hooks for Unit-specific logic.

    onMoveFinished(time) {
        // Reset limbs
        this.limbs.leftArm.x = 0;
        this.limbs.rightArm.x = 0;
        this.limbs.leftLeg.x = 0;
        this.limbs.rightLeg.x = 0;

        const built = this.tryBuildStructure(time);
        if (built) {
            // If we successfully built something, STOP MIGRATING. We found a home/job.
            if (this.action === 'Migrating') {
                console.log(`Unit ${this.id} built structure during migration. Stopping.`);
                this.action = 'Idle';
                this.migrationTarget = null;
                this.migrationTimer = 0;
            }
            this.buildStagnationCount = 0;
        } else {
            if (this.action === 'Migrating') {
                this.buildStagnationCount = 0; // Not stagnant, just traveling
            } else {
                this.buildStagnationCount = (this.buildStagnationCount || 0) + 1;
                if (this.buildStagnationCount > 5) {
                    console.log(`Unit ${this.id} stuck/stagnant (No Build). Migrating...`);
                    this.migrate(time);
                    this.buildStagnationCount = 0;
                }
            }
        }
    }

    onMoveStep(progress) {
        // Animate limbs
        const limbAngle = Math.sin(progress * Math.PI * 4) * 0.5;
        this.limbs.leftArm.x = limbAngle;
        this.limbs.rightArm.x = -limbAngle;
        this.limbs.leftLeg.x = -limbAngle;
        this.limbs.rightLeg.x = limbAngle;

        // Mesh sync handled by Entity.updateMovement -> updatePosition
        if (this.mesh) {
            this.mesh.position.copy(this.position);
            if (this.rotationY !== undefined) this.mesh.rotation.y = this.rotationY;
        }
    }

    triggerMove(tx, tz, time) {
        let dx = tx - this.gridX;
        let dz = tz - this.gridZ;

        // Wrap Logic: Take shortest path
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        if (Math.abs(dx) > logicalW / 2) {
            dx = -Math.sign(dx) * (logicalW - Math.abs(dx));
        }
        if (Math.abs(dz) > logicalD / 2) {
            dz = -Math.sign(dz) * (logicalD - Math.abs(dz));
        }

        // Primary Direction
        let pNextX = this.gridX;
        let pNextZ = this.gridZ;
        let useX = Math.abs(dx) > Math.abs(dz);

        if (useX) {
            pNextX += Math.sign(dx);
        } else {
            pNextZ += Math.sign(dz);
        }

        // Apply Wrap to Primary
        if (pNextX < 0) pNextX = logicalW - 1;
        if (pNextX >= logicalW) pNextX = 0;
        if (pNextZ < 0) pNextZ = logicalD - 1;
        if (pNextZ >= logicalD) pNextZ = 0;

        if (this.canMoveTo(pNextX, pNextZ)) {
            this.executeMove(pNextX, pNextZ, time);
            return;
        }

        // Secondary Direction (Slide along wall)
        // If we tried X, try Z (if Z diff exists). Inverse if we tried Z.
        // Only try if there IS a diff in that axis.
        let sNextX = this.gridX;
        let sNextZ = this.gridZ;
        let trySecondary = false;

        if (useX && Math.abs(dz) > 0) {
            sNextZ += Math.sign(dz);
            trySecondary = true;
        } else if (!useX && Math.abs(dx) > 0) {
            sNextX += Math.sign(dx);
            trySecondary = true;
        }

        if (trySecondary) {
            // Apply Wrap
            if (sNextX < 0) sNextX = logicalW - 1;
            if (sNextX >= logicalW) sNextX = 0;
            if (sNextZ < 0) sNextZ = logicalD - 1;
            if (sNextZ >= logicalD) sNextZ = 0;

            if (this.canMoveTo(sNextX, sNextZ)) {
                // Determine if "worth it" or just getting farther? 
                // Sliding is generally good.
                this.executeMove(sNextX, sNextZ, time);
                return;
            }
        }

        // Blocked
        if (this.action === 'Chasing') {
            // console.log(`[Unit ${this.id}] Chase Blocked...`);
        }

        this.lastTime = time;
        this.stuckCount = (this.stuckCount || 0) + 1;

        if (this.stuckCount > 10) { // approx 10 frames
            // Give up logic
            console.log(`Unit ${this.id} stuck chasing. Skipping target temporarily.`);

            // Ignore current targets
            // Ignore current targets
            const ignoreDuration = time + 5000;
            if (this.targetGoblin) {
                this.ignoredTargets.set(this.targetGoblin.id, ignoreDuration);
                // Also ignore location just in case
                this.ignoredTargets.set(`${this.targetGoblin.gridX},${this.targetGoblin.gridZ}`, ignoreDuration);
                this.targetGoblin = null;
            }
            if (this.targetBuilding) {
                this.ignoredTargets.set(this.targetBuilding.id, ignoreDuration);
                this.ignoredTargets.set(`${this.targetBuilding.gridX},${this.targetBuilding.gridZ}`, ignoreDuration);
                this.targetBuilding = null;
            }
            if (this.targetRaidPoint) {
                this.ignoredTargets.set(`${this.targetRaidPoint.x},${this.targetRaidPoint.z}`, ignoreDuration);
                this.targetRaidPoint = null;
            }

            this.stuckCount = 0;
            // this.action = "CheckStuck"; // Removed


            // Revert to Random Move? Or just return?
            // If we don't move, we oscillate.
            // But User wants to know WHY.
            // Let's do nothing here to let the loop show us the logs I'm about to add.
        }
    }

    canMoveTo(x, z) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Wrap logic for checking? (Ideally we shouldn't move off-bounds without wrap handling in caller)
        // But let's assume raw coords for check, wrap handled in execute
        let checkX = x;
        let checkZ = z;
        if (checkX < 0) checkX = logicalW - 1;
        if (checkX >= logicalW) checkX = 0;
        if (checkZ < 0) checkZ = logicalD - 1;
        if (checkZ >= logicalD) checkZ = 0;


        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetHeight = this.terrain.getTileHeight(checkX, checkZ);

        if (targetHeight <= 0) {
            console.log(`[Unit ${this.id}] Blocked by Water at ${checkX},${checkZ} H:${targetHeight}`);
            return false; // Water
        }
        if (targetHeight > 8) {
            console.log(`[Unit ${this.id}] Moving onto Rock at ${checkX},${checkZ} H:${targetHeight} (Speed Penalty)`);
            // return false; // Rock - REVERTED per User Request (Slow movement)
        }

        // Slope check
        if (Math.abs(targetHeight - currentHeight) > 2.0) {
            console.log(`[Unit ${this.id}] Blocked by Slope at ${checkX},${checkZ} H:${currentHeight}->${targetHeight}`);
            return false;
        }

        // Building check
        const cell = this.terrain.grid[checkX][checkZ];
        if (cell.hasBuilding && cell.building) {
            // User Request: Allow passing through buildings
            return true;
        }
        // Implicit allow if no building
        return true;
    }

    /* 
    // DUPLICATE CODE REMOVED
    updateLogic(time, deltaTime, units, buildings) {
       // ...
    }
    */

    // ...

    executeMove(nextX, nextZ, time) {
        // ... Wrap logic (lines 1069-1076 kept) ...
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        if (nextX < 0) nextX = logicalW - 1;
        if (nextX >= logicalW) nextX = 0;
        if (nextZ < 0) nextZ = logicalD - 1;
        if (nextZ >= logicalD) nextZ = 0;

        // Use Entity base startMove for state setup
        super.startMove(nextX, nextZ, time);
        // this.isMoving = true; // Fallback removed
        this.action = "Moving";

        // Speed Logic (Can override Entity defaults)
        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetHeight = this.terrain.getTileHeight(nextX, nextZ);
        const heightDiff = Math.abs(targetHeight - currentHeight);

        if (targetHeight > 8) {
            this.moveDuration = 8000;
        } else if (heightDiff > 0.1) {
            this.moveDuration = 4000;
        } else {
            this.moveDuration = 1000;
        }

        // Reset stuck count
        this.stuckCount = 0;
    }

    gatherResources(time) {
        if (time - this.lastGatherTime < 5000) return;
        this.lastGatherTime = time;

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let foundWater = false;
        let foundForest = false;

        const sampleOffsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 4, z: 0 }, { x: -4, z: 0 }, { x: 0, z: 4 }, { x: 0, z: -4 }
        ];

        for (const off of sampleOffsets) {
            let nx = this.gridX + off.x;
            let nz = this.gridZ + off.z;

            // Wrap
            if (nx < 0) nx = logicalW + nx;
            if (nx >= logicalW) nx = nx - logicalW;
            if (nz < 0) nz = logicalD + nz;
            if (nz >= logicalD) nz = nz - logicalD;

            nx = (nx % logicalW + logicalW) % logicalW;
            nz = (nz % logicalD + logicalD) % logicalD;

            const h = this.terrain.getTileHeight(nx, nz);

            if (h <= 0) foundWater = true;
            else if (h > 4 && h <= 8) foundForest = true;

            if (foundWater && foundForest) break;
        }

        if (window.game && window.game.resources) {
            if (foundWater) {
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
        let minScore = Infinity;

        const maxDist = (this.role === 'knight' || this.role === 'wizard') ? 50 : 15;

        for (const goblin of goblins) {
            if (goblin.isDead) continue;
            if (this.ignoredTargets && this.ignoredTargets.has(goblin.id)) continue;

            const dx = this.gridX - goblin.gridX;
            const dz = this.gridZ - goblin.gridZ;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist > maxDist) continue;

            const targetH = this.terrain.getTileHeight(goblin.gridX, goblin.gridZ);
            let score = dist;

            if (targetH > 8) {
                score += 20.0;
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
        if (this.id === 0) console.log(`[Unit Debug] moveRandomly called for ID:0 at ${time}`);
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const directions = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        this.wanderCount = (this.wanderCount || 0) + 1;

        if (this.wanderCount > 15) {
            // Migration Chance
            for (let i = 0; i < 15; i++) {
                const rx = Math.floor(Math.random() * logicalW);
                const rz = Math.floor(Math.random() * logicalD);
                const h = this.terrain.getTileHeight(rx, rz);
                const cell = this.terrain.grid[rx][rz];

                if ((h > 8 || (h > 0 && h < 2)) && (!cell || !cell.hasBuilding)) {
                    this.migrationTarget = { x: rx, z: rz };
                    this.wanderCount = 0;
                    console.log(`Unit bored. Migrating to ${h > 8 ? 'Mountain' : 'Sea'} at ${rx},${rz}`);
                    this.triggerMove(rx, rz, time);
                    return;
                }
            }
        }

        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const validMoves = [];

        for (const dir of directions) {
            let targetX = this.gridX + dir.x;
            let targetZ = this.gridZ + dir.z;

            // Wrap logic
            if (targetX < 0) targetX = logicalW - 1;
            if (targetX >= logicalW) targetX = 0;
            if (targetZ < 0) targetZ = logicalD - 1;
            if (targetZ >= logicalD) targetZ = 0;

            const targetHeight = this.terrain.getTileHeight(targetX, targetZ);
            const targetCell = this.terrain.grid[targetX][targetZ];

            if (Math.abs(targetHeight - currentHeight) <= 2.0 && targetHeight > 0) {
                // User Request: Buildings are passable
                // if (!targetCell.hasBuilding) {
                validMoves.push({ x: targetX, z: targetZ, h: targetHeight, dir: dir });
                // }
            }
        }

        if (validMoves.length === 0) {
            this.lastTime = time;
            return;
        }

        let selectedMove = null;

        if (this.role === 'hunter' || this.role === 'fisher') {
            let totalWeight = 0;
            validMoves.forEach(m => {
                let weight = 1.0;
                if (this.role === 'hunter') {
                    if (m.h > 4 && m.h <= 8) weight = 5.0;
                    else if (m.h > 8) weight = 2.0;
                } else if (this.role === 'fisher') {
                    if (m.h <= 2.5) weight = 5.0;
                }
                m.weight = weight;
                totalWeight += weight;
            });

            let r = Math.random() * totalWeight;
            for (const m of validMoves) {
                r -= m.weight;
                if (r <= 0) {
                    selectedMove = m;
                    break;
                }
            }
        }

        if (!selectedMove) {
            const idx = Math.floor(Math.random() * validMoves.length);
            selectedMove = validMoves[idx];
        }

        this.isMoving = true;
        this.action = "Moving";

        const heightDiff = Math.abs(selectedMove.h - currentHeight);

        if (selectedMove.h > 8) {
            this.moveDuration = 6000;
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

    cleanIgnoredTargets(time) {
        if (!this.ignoredTargets) return;
        for (const [id, expiry] of this.ignoredTargets) {
            if (time > expiry) {
                this.ignoredTargets.delete(id);
            }
        }
    }


    // updatePosition inherited from Entity
    // getPositionForGrid inherited from Entity

    forceUnstuck() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let found = false;
        let attempts = 0;
        while (!found && attempts < 10) {
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
            const cell = this.terrain.grid[tx][tz];

            // Fix: Check Building
            if (h > 0 && cell && !cell.hasBuilding) {
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

    migrate(time) {
        // Move far away (20-30 tiles) - BUT WALK THERE, DON'T WARP.
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const dist = 20 + Math.random() * 20;

        let tx = Math.floor(this.gridX + Math.cos(angle) * dist);
        let tz = Math.floor(this.gridZ + Math.sin(angle) * dist);

        // Wrap
        if (tx < 0) tx += logicalW;
        if (tx >= logicalW) tx -= logicalW;
        if (tz < 0) tz += logicalD;
        if (tz >= logicalD) tz -= logicalD;

        // Validate target (Water check)
        const h = this.terrain.getTileHeight(tx, tz);
        if (h <= 0) {
            tx = (tx + 5) % logicalW;
        }

        console.log(`Unit ${this.id} migrating to ${tx},${tz} (Walking)`);

        // Setup Migration State
        this.action = "Migrating";
        this.migrationTarget = { x: tx, z: tz };
        this.migrationTimer = 0;

        // Start moving
        this.triggerMove(tx, tz, time);
    }

    tryBuildStructure(time) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const x = this.gridX;
        const z = this.gridZ;
        const cell = this.terrain.grid[x][z];

        if (cell.hasBuilding) return;

        if (cell.height > 8) return;

        const houses = this.terrain.buildings.filter(b => b.type === 'house');
        const farms = this.terrain.buildings.filter(b => b.type === 'farm');
        const mansions = this.terrain.buildings.filter(b => b.type === 'mansion');

        const houseCount = houses.length;
        const farmCount = farms.length;
        const mansionCount = mansions.length;
        const totalPop = window.game ? window.game.totalPopulation : 0;

        // 2. Tower Logic (3x3) - Unlock at 3000
        const towers = this.terrain.buildings.filter(b => b.type === 'tower');
        const towerTarget = Math.floor(totalPop / 3000);

        if (towers.length < towerTarget) {
            if (this.terrain.checkFlatArea(x, z, 3)) {
                this.terrain.addBuilding('tower', x, z);
                this.moveRandomly(time);
                return true;
            }
        }

        // 3. Barracks Logic (3x3) - Replaces Mansion
        const barracks = this.terrain.buildings.filter(b => b.type === 'barracks');
        const barracksCount = barracks.length;
        // Logic: 1 Barracks per 1000 pop or just keep same ratio as old mansion?
        const barracksTarget = Math.floor(totalPop / 1000); // Same rarity as Mansion

        if (barracksCount < barracksTarget) {
            // Barracks is size 3 now
            if (this.terrain.checkFlatArea(x, z, 3)) {
                this.terrain.addBuilding('barracks', x, z);
                this.moveRandomly(time);
                return true;
            }
        }

        // 3. Farm Logic (2x2)
        const food = window.game ? window.game.resources.grain : 100;
        const lowFood = food < totalPop * 2;
        const lowFarms = farmCount < (houseCount / 2) + 1;

        if (lowFood || lowFarms) {
            if (Math.random() < 0.3) {
                if (this.terrain.checkFlatArea(x, z, 2)) {
                    if (this.buildFarm(time)) return true;
                }
            }
        }

        // 4. House Logic (Now 2x2)
        if (this.terrain.checkFlatArea(x, z, 2)) {
            if (cell.moisture > 0.8) {
                return false;
            }
            this.terrain.addBuilding('house', x, z);
            this.moveRandomly(time);
            return true;
        } else {
            return false;
        }
    }

    improveLand(time) {
        if (!this.terrain.grid[this.gridX] || !this.terrain.grid[this.gridX][this.gridZ]) return;

        const cell = this.terrain.grid[this.gridX][this.gridZ];
        const currentM = cell.moisture || 0.5;
        const targetM = 0.5;

        let diff = targetM - currentM;
        let change = diff * 0.4;

        if (Math.abs(change) < 0.1 && Math.abs(diff) > 0.01) {
            change = (diff > 0) ? 0.1 : -0.1;
        }

        if (Math.abs(change) > Math.abs(diff)) change = diff;

        this.terrain.modifyMoisture(this.gridX, this.gridZ, change);
        console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${currentM.toFixed(2)} -> ${(currentM + change).toFixed(2)}`);

        this.moveRandomly(time);
    }

    buildFarm(time) {
        let cell = null;
        if (this.terrain.grid[this.gridX] && this.terrain.grid[this.gridX][this.gridZ]) {
            cell = this.terrain.grid[this.gridX][this.gridZ];
        }

        if (cell) {
            const m = cell.moisture || 0.5;

            const diff = Math.abs(m - 0.5);
            let successChance = 1.0 - (diff * 2.5);
            if (successChance < 0) successChance = 0;

            if (Math.random() > successChance) {
                console.log(`Farm construction failed due to soil conditions (Moisture: ${m.toFixed(2)}, Chance: ${(successChance * 100).toFixed(0)}%). Improving Land.`);
                this.improveLand(time);
                return false;
            }
        }

        this.terrain.addBuilding('farm', this.gridX, this.gridZ);

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

        const material = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 1.0
        });

        const vMesh = new THREE.Mesh(GEO.crossV, material);
        vMesh.position.y = 0.5;
        group.add(vMesh);

        const hMesh = new THREE.Mesh(GEO.crossH, material);
        hMesh.position.y = 0.7;
        group.add(hMesh);

        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        group.position.copy(pos);

        this.scene.add(group);
        this.crossMesh = group;
        this.deathTimer = 0;
    }

    updateDeathAnimation(deltaTime) {
        if (!this.crossMesh) return;

        if (isNaN(this.deathTimer)) this.deathTimer = 0;

        const safeDt = (deltaTime > 0) ? deltaTime : 0.016;
        this.deathTimer += safeDt;

        const duration = 3.0;

        if (this.deathTimer >= duration) {
            this.scene.remove(this.crossMesh);
            this.crossMesh.children.forEach(child => {
                if (child.material) child.material.dispose();
            });
            this.crossMesh = null;

            this.isFinished = true;
        } else {
            this.crossMesh.position.y += deltaTime * 1.0;
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

        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, 64, 64);

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

        ctx.fillStyle = '#A52A2A';
        ctx.fillRect(0, 0, 64, 64);

        ctx.fillStyle = '#800000';
        for (let y = 0; y < 64; y += 8) {
            for (let x = 0; x < 64; x += 8) {
                if ((x + y) % 16 === 0) ctx.fillRect(x, y, 7, 7);
            }
        }

        return new THREE.CanvasTexture(canvas);
    }

    serialize() {
        // Capture HomeBase coords if linked
        let hbx = undefined, hbz = undefined;
        if (this.homeBase && this.homeBase.userData) {
            hbx = this.homeBase.userData.gridX;
            hbz = this.homeBase.userData.gridZ;
        }

        return {
            gridX: this.gridX,
            gridZ: this.gridZ,
            age: this.age,
            lifespan: this.lifespan,
            isDead: this.isDead,
            isFinished: this.isFinished,
            isMoving: this.isMoving,
            targetX: this.targetX,
            targetZ: this.targetZ,
            moveStartTime: this.moveStartTime,
            startGridX: this.startGridX,
            startGridZ: this.startGridZ,
            targetGridX: this.targetGridX,
            targetGridZ: this.targetGridZ,
            isSpecial: this.isSpecial,
            role: this.role,
            // Stats
            hp: this.hp,
            maxHp: this.maxHp,
            damage: this.damage,
            xp: this.xp || 0,
            level: this.level || 1,
            name: this.name,
            // Squad Persistence
            homeBaseGridX: hbx,
            homeBaseGridZ: hbz
        };
    }

    dispose() {
        if (this.mesh) {
            this.scene.remove(this.mesh);
            if (this.mesh.geometry) this.mesh.geometry.dispose();
            this.mesh = null;
        }

        if (this.crossMesh) {
            this.scene.remove(this.crossMesh);
            this.crossMesh.traverse(c => {
                if (c.geometry) c.geometry.dispose();
            });
            this.crossMesh = null;
        }

        this.terrain.unregisterEntity(this);
    }

    static deserialize(data, scene, terrain) {
        const unit = new Unit(scene, terrain, data.gridX, data.gridZ, data.role || data.isSpecial, data.isSpecial);
        unit.age = data.age || 20;

        if (typeof data.lifespan === 'number' && data.lifespan > 0) {
            unit.lifespan = data.lifespan;
        }

        if (data.lifespan) unit.lifespan = data.lifespan;

        unit.isDead = data.isDead || false;
        unit.isDead = data.isDead || false;
        unit.isFinished = data.isFinished || false;

        // Restore Stats
        if (data.hp !== undefined) unit.hp = data.hp;
        if (data.maxHp !== undefined) unit.maxHp = data.maxHp;
        if (data.damage !== undefined) unit.damage = data.damage;
        if (data.xp !== undefined) unit.xp = data.xp;
        if (data.level !== undefined) unit.level = data.level;
        if (data.level !== undefined) unit.level = data.level;
        if (data.name !== undefined) unit.name = data.name;

        // Restore Squad Persistence (Temp storage for Game.js to use)
        if (data.homeBaseGridX !== undefined && data.homeBaseGridZ !== undefined) {
            unit.savedHomeBaseX = data.homeBaseGridX;
            unit.savedHomeBaseZ = data.homeBaseGridZ;
        }

        if (data.isMoving) {
            unit.isMoving = true;
            unit.targetX = data.targetX;
            unit.targetZ = data.targetZ;
            unit.moveStartTime = data.moveStartTime;
            unit.startGridX = data.startGridX;
            unit.startGridZ = data.startGridZ;
            unit.targetGridX = data.targetGridX;
            unit.targetGridZ = data.targetGridZ;

            // Recalculate moveDuration (it wasn't saved, but can be derived or re-calculated)
            // Or just rely on updateMovement to handle it?
            // updateMovement uses this.moveDuration.
            // moveDuration is usually distance * speed.
            // Let's re-calculate it to be safe.
            const dist = unit.getDistance(unit.targetGridX, unit.targetGridZ); // Wait, getDistance uses this.gridX/Z vs arg?
            // getDistance(tx,tz) uses current grid.
            // unit.gridX was restored.
            // Note: getDistance calculates from current grid.
            // But strict duration depends on START grid.
            const dx = Math.abs(unit.startGridX - unit.targetGridX);
            const dz = Math.abs(unit.startGridZ - unit.targetGridZ);
            const totalDist = Math.sqrt(dx * dx + dz * dz);
            unit.moveDuration = totalDist * 1000; // Assuming 1000ms per tile speed (standard)
            // If they are fast units, we might need to know speed.
            // Unit.js doesn't seem to have variable speed property (just moveDuration).
        }

        if (unit.isDead) {
            if (!unit.isFinished) {
                unit.createCross();
            }
        }

        return unit;
    }
}
