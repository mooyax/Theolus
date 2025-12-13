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

        // Geometries
        // Geometries (Reverted to Cute/Chibi proportions)
        const bodyGeo = new THREE.BoxGeometry(0.3, 0.35, 0.2);
        bodyGeo.translate(0, 0.3, 0); // Center height ~0.3
        Unit.assets.geometries.body = bodyGeo;

        const headGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        headGeo.translate(0, 0.6, 0); // On top of body (0.3 + 0.175 + head_half? ~0.55-0.6)
        Unit.assets.geometries.head = headGeo;

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
        Unit.assets.materials.hair = new THREE.MeshStandardMaterial({ map: Unit.assets.textures.hair, transparent: true });

        // Restore Head Materials Array (Required by UnitRenderer)
        // Order: Right, Left, Top, Bottom, Front (Face), Back
        Unit.assets.materials.heads = [
            Unit.assets.materials.hair, // Right
            Unit.assets.materials.hair, // Left
            Unit.assets.materials.hair, // Top
            Unit.assets.materials.hair, // Bottom
            Unit.assets.materials.face, // Front
            Unit.assets.materials.hair  // Back
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

        // Combat Stats (Default)
        this.hp = 30 + Math.floor(Math.random() * 20);
        this.maxHp = this.hp;
        this.attackCooldown = 0;
        this.attackRate = 1.0;
        this.damage = 6;
        this.targetGoblin = null;

        // Stats Overrides
        if (this.role === 'knight') {
            this.hp *= 10;
            this.maxHp = this.hp;
            this.damage *= 10;
        } else if (this.role === 'wizard') {
            this.hp *= 0.5;
            this.maxHp = this.hp;
            this.damage *= 10; // Same as Knight
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
        this.createCross();
        console.log(`Unit died.`);
    }

    attackGoblin(goblin) {
        if (this.attackCooldown > 0) return;

        // VISUALS
        if (this.role === 'wizard') {
            // Ranged Attack Animation
            this.limbs.leftArm.x = -Math.PI; // Raise staff
            this.limbs.rightArm.x = -Math.PI;
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

        if (goblin.hp <= 0) {
            goblin.isDead = true;
            this.targetGoblin = null;
            // AI Memory: Record this kill location
            if (window.game && (this.role === 'knight' || this.role === 'wizard')) {
                // Record raid point or clear area
                if (window.game.recordRaidPoint) window.game.recordRaidPoint(goblin.gridX, goblin.gridZ);
                this.searchForHut(goblin.gridX, goblin.gridZ);
            }
        }

        this.attackCooldown = this.attackRate;
    }

    updateLogic(time, deltaTime, isNight, goblins, fishes, sheeps) {
        if (this.isDead) {
            this.updateDeathAnimation(deltaTime);
            this.action = "Dead";
            return;
        }

        // STUCK MONITOR
        if (this.isMoving && time - this.moveStartTime > 20000) {
            console.warn(`[Unit] Stuck moving for >20s (Sim). Forcing Reset. ID:${this.id} Rate:${deltaTime}`);
            this.isMoving = false;
            this.updatePosition();
        }

        // Default action
        if (!this.isMoving && time >= this.lastTime) this.action = "Idle";

        // Aging
        let agingRate = 1.0;
        // Soldiers age much slower to allow long expeditions (User Request)
        if (this.role === 'knight' || this.role === 'wizard') {
            agingRate = 0.2;
        }

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

        // Combat Choice
        if (this.huntingCooldown && time < this.huntingCooldown) {
            // Cooldown active
        } else {
            // Priority: Calculate Best Target (Goblin vs Building)
            let bestTarget = null;
            let bestScore = Infinity; // Lower is better

            // 1. Scan Goblins
            if (goblins) {
                const maxDist = (this.role === 'knight' || this.role === 'wizard') ? 50 : 15;
                for (const g of goblins) {
                    if (g.isDead) continue;
                    const d = this.getDistance(g.gridX, g.gridZ);
                    if (d > maxDist) continue;

                    // Score = Distance
                    // High ground penalty? (Existing logic had +20 for mountain)
                    const h = this.terrain.getTileHeight(g.gridX, g.gridZ);
                    let score = d;
                    if (h > 8) score += 20;

                    if (score < bestScore) {
                        bestScore = score;
                        bestTarget = { type: 'goblin', obj: g };
                    }
                }
            }

            // 2. Scan Buildings (Huts/Caves)
            if (this.terrain.buildings) {
                // Workers: Increased range 10 -> 30 (User Request)
                // Soldiers: Infinity
                const range = (this.role === 'knight' || this.role === 'wizard') ? Infinity : 30;

                for (const b of this.terrain.buildings) {
                    if (this.role === 'worker' && b.type !== 'goblin_hut') continue;
                    if (b.type === 'goblin_hut' || b.type === 'cave') {
                        const d = this.getDistance(b.gridX, b.gridZ);
                        if (d > range) continue;

                        // Priority Bonus: -5.0 (Treat as 5 units closer)
                        let score = d - 5.0;

                        if (score < bestScore) {
                            bestScore = score;
                            bestTarget = { type: 'building', obj: b };
                        }
                    }
                }
            }

            // Apply Target
            this.targetGoblin = null;
            this.targetBuilding = null;

            if (bestTarget) {
                if (bestTarget.type === 'goblin') {
                    this.targetGoblin = bestTarget.obj;
                } else {
                    this.targetBuilding = bestTarget.obj;
                }
            }

            // Priority 3: Raid Point (Go to last known enemy location)
            if (!this.targetGoblin && !this.targetBuilding && window.game && window.game.raidPoints && window.game.raidPoints.length > 0) {
                this.findRaidTarget();
            }

            if (this.targetGoblin) {
                const dist = this.getDistance(this.targetGoblin.gridX, this.targetGoblin.gridZ);

                // Attack Range
                let range = 1.5;
                if (this.role === 'wizard') range = 5.5; // Ranged

                if (dist <= range) {
                    this.attackGoblin(this.targetGoblin);
                } else {
                    // Chase
                    if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                        const tx = this.targetGoblin.gridX;
                        const tz = this.targetGoblin.gridZ;
                        this.triggerMove(tx, tz, time);
                    }
                }
            } else if (this.targetBuilding) {
                // Move to destroy building
                const dist = this.getDistance(this.targetBuilding.gridX, this.targetBuilding.gridZ);
                if (dist <= 2.0) {
                    this.attackBuilding(this.targetBuilding);
                } else {
                    if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                        this.triggerMove(this.targetBuilding.gridX, this.targetBuilding.gridZ, time);
                    }
                }
            } else if (this.targetRaidPoint) {
                // Move to Raid Point
                const dist = this.getDistance(this.targetRaidPoint.x, this.targetRaidPoint.z);
                if (dist <= 5.0) {
                    // Arrived at search area
                    this.searchForHut(this.gridX, this.gridZ);
                    this.targetRaidPoint = null; // Clear after checking
                } else {
                    if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                        this.triggerMove(this.targetRaidPoint.x, this.targetRaidPoint.z, time);
                    }
                }
            }
        }

        this.gatherResources(time);


        // Wander / Improve Land
        // If not doing anything else
        if (!this.isMoving && !this.targetGoblin && !this.targetBuilding && !this.targetRaidPoint) {

            // Unit Stagnation Logic
            if (this.lastGridX === this.gridX && this.lastGridZ === this.gridZ && !this.isSleeping) {
                this.stagnationTimer += deltaTime;
            } else {
                this.lastGridX = this.gridX;
                this.lastGridZ = this.gridZ;
                this.stagnationTimer = 0;
            }

            if (this.stagnationTimer > 10.0) {
                this.moveRandomly(time);
                if (this.stagnationTimer > 20.0) {
                    this.forceUnstuck();
                    this.stagnationTimer = 0;
                }
                return;
            }

            // Stuck in Moving Check (failsafe)
            if (this.isMoving && (time - this.moveStartTime) > (this.moveDuration + 500)) {
                this.isMoving = false;
                this.updatePosition();
            }

            // Day/Night Sleep Logic
            const canSleep = (this.role === 'worker' || this.role === 'fisher' || this.role === 'hunter');
            if (isNight && canSleep) {
                const cell = this.terrain.grid[this.gridX][this.gridZ];
                const isShelter = cell.hasBuilding && cell.building && (cell.building.type === 'house' || cell.building.type === 'castle');

                if (isShelter) {
                    if (!this.isSleeping) this.isSleeping = true;
                    return;
                }
            } else {
                if (this.isSleeping) this.isSleeping = false;
            }

            if (time - this.lastTime > this.moveInterval) {
                // Workers improve land
                if (this.role === 'worker') {
                    // Check improve...
                    const cell = this.terrain.grid[this.gridX][this.gridZ];
                    if (cell && cell.moisture !== 0.5) {
                        if (Math.random() < 0.1) this.improveLand(time);
                    }
                    this.moveRandomly(time);
                } else if (this.role === 'knight' || this.role === 'wizard') {
                    // Knights/Wizards Patrol
                    this.patrol(time);
                } else {
                    // Others (Hunter/Fisher)
                    this.moveRandomly(time);
                }
                this.lastTime = time;
                // Reset interval to keep them active
                this.moveInterval = 2000 + Math.random() * 3000;
            }
        }
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

        if (nearest) {
            // console.log(`Unit ${this.id} targets enemy base: ${nearest.type} at ${nearest.gridX},${nearest.gridZ}`);
            this.targetBuilding = nearest;
        }
    }

    findRaidTarget() {
        if (!window.game || !window.game.raidPoints || window.game.raidPoints.length === 0) return;
        let nearest = null;
        let minDist = Infinity;

        window.game.raidPoints.forEach(p => {
            const dist = this.getDistance(p.x, p.z);
            if (dist < minDist) {
                minDist = dist;
                nearest = p;
            }
        });
        this.targetRaidPoint = nearest;
    }

    searchForHut(x, z) {
        // Active scan around kill location x,z
        if (!this.terrain.buildings) return;
        const buildings = this.terrain.buildings;

        let nearest = null;
        let minDist = 100; // Search range around kill

        for (const b of buildings) {
            if (b.type === 'goblin_hut' || b.type === 'cave') {
                const dx = b.gridX - x;
                const dz = b.gridZ - z;
                const dist = Math.sqrt(dx * dx + dz * dz);

                if (dist < minDist) {
                    minDist = dist;
                    nearest = b;
                }
            }
        }

        if (nearest) {
            console.log(`Unit ${this.id} found base near kill: ${nearest.type}`);
            this.targetBuilding = nearest;
        }
    }

    attackBuilding(b) {
        console.log(`[Unit] Knight destroyed ${b.type} at ${b.gridX},${b.gridZ}`);
        this.terrain.removeBuilding(b);
        this.targetBuilding = null;

        // Remove from Raid Points if exists
        if (window.game && window.game.raidPoints) {
            // Filter out points near this building
            window.game.raidPoints = window.game.raidPoints.filter(p => {
                const dx = p.x - b.gridX;
                const dz = p.z - b.gridZ;
                return (Math.sqrt(dx * dx + dz * dz) > 5);
            });
        }
    }

    updateMovement(time) {
        if (!this.isMoving) return;

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const progress = (time - this.moveStartTime) / this.moveDuration;

        if (progress >= 1) {
            this.isMoving = false;

            // Update Spatial Partitioning
            if (this.terrain && this.terrain.moveEntity) {
                this.terrain.moveEntity(this, this.gridX, this.gridZ, this.targetGridX, this.targetGridZ, 'unit');
            }

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

            if (isNaN(lerpX) || isNaN(lerpZ)) {
                this.isMoving = false;
                this.updatePosition();
                return;
            }

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

        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetHeight = this.terrain.getTileHeight(nextX, nextZ);

        // Simple walk check
        if (Math.abs(targetHeight - currentHeight) <= 2.0 && targetHeight > 0) {
            this.isMoving = true;
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
            this.stuckCount = 0;
        } else {
            // Cannot reach
            this.lastTime = time;
            this.stuckCount = (this.stuckCount || 0) + 1;

            // If stuck too long, abandon target
            if (this.stuckCount > 5) {
                console.log("Unit stuck chasing target. Abandoning and cooling down.");
                this.targetGoblin = null;
                this.stuckCount = 0;
                this.huntingCooldown = time + 5000;
                this.moveRandomly(time);
            }
        }
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
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const directions = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ];

        this.wanderCount = (this.wanderCount || 0) + 1;
        if (this.wanderCount > 15) {
            for (let i = 0; i < 15; i++) {
                const rx = Math.floor(Math.random() * logicalW);
                const rz = Math.floor(Math.random() * logicalD);
                const h = this.terrain.getTileHeight(rx, rz);

                if (h > 8 || (h > 0 && h < 2)) {
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

            if (Math.abs(targetHeight - currentHeight) <= 2.0 && targetHeight > 0) {
                validMoves.push({ x: targetX, z: targetZ, h: targetHeight, dir: dir });
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

    updatePosition() {
        if (isNaN(this.gridX) || isNaN(this.gridZ)) {
            console.warn(`Unit ${this.id} NaN Grid Coords! Resetting.`);
            this.gridX = Math.round(this.gridX) || 0;
            this.gridZ = Math.round(this.gridZ) || 0;
        }
        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        this.position.copy(pos);
    }

    getPositionForGrid(x, z) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const height = this.terrain.getInterpolatedHeight(x, z);
        return new THREE.Vector3(
            x - logicalW / 2 + 0.5,
            height + 0.25,
            z - logicalD / 2 + 0.5
        );
    }

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
            if (h > 0) {
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
                return;
            }
        }

        // 3. Mansion Logic (3x3)
        const mansionTarget = Math.floor(totalPop / 1000);
        if (mansionCount < mansionTarget) {
            if (this.terrain.checkFlatArea(x, z, 3)) {
                this.terrain.addBuilding('mansion', x, z);
                this.moveRandomly(time);
                return;
            }
        }

        // 3. Farm Logic (2x2)
        const food = window.game ? window.game.resources.grain : 100;
        const lowFood = food < totalPop * 2;
        const lowFarms = farmCount < (houseCount / 2) + 1;

        if (lowFood || lowFarms) {
            if (Math.random() < 0.3) {
                if (this.terrain.checkFlatArea(x, z, 2)) {
                    if (this.buildFarm(time)) return;
                }
            }
        }

        // 4. House Logic (Now 2x2)
        if (this.terrain.checkFlatArea(x, z, 2)) {
            if (cell.moisture > 0.8) {
                return;
            }
            this.terrain.addBuilding('house', x, z);
            this.moveRandomly(time);
            return;
        } else {
            return;
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
            name: this.name
        };
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
        if (data.name !== undefined) unit.name = data.name;

        if (data.isMoving) {
            unit.isMoving = true;
            unit.targetX = data.targetX;
            unit.targetZ = data.targetZ;
            unit.isMoving = false;
            unit.gridX = data.targetGridX;
            unit.gridZ = data.targetGridZ;
            unit.updatePosition();
        }

        if (unit.isDead) {
            if (!unit.isFinished) {
                unit.createCross();
            }
        }

        return unit;
    }
}
