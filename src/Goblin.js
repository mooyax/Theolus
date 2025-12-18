import * as THREE from 'three';

import { Entity } from './Entity.js';

export class Goblin extends Entity {
    static nextId = 0;
    // Static Cache (Kept for Renderer to use)
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
        Goblin.assets.geometries.torsoHob = new THREE.BoxGeometry(0.35, 0.3, 0.2);

        // Shared
        Goblin.assets.geometries.head = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        Goblin.assets.geometries.ear = new THREE.ConeGeometry(0.05, 0.15, 4);
        Goblin.assets.geometries.arm = new THREE.BoxGeometry(0.08, 0.25, 0.08);
        Goblin.assets.geometries.leg = new THREE.BoxGeometry(0.1, 0.25, 0.1);
        Goblin.assets.geometries.club = new THREE.CylinderGeometry(0.03, 0.05, 0.4, 6);
        // New: Staff for Shaman
        Goblin.assets.geometries.staff = new THREE.BoxGeometry(0.04, 0.8, 0.04);

        // Cross (If needed by ParticleManager? ParticleManager uses its own) 
        // We can keep these just in case.
        Goblin.assets.geometries.crossV = new THREE.BoxGeometry(0.2, 0.8, 0.2);
        Goblin.assets.geometries.crossH = new THREE.BoxGeometry(0.6, 0.2, 0.2);

        // Materials
        Goblin.assets.materials.skinNormal = new THREE.MeshLambertMaterial({ color: 0x55AA55 });
        Goblin.assets.materials.clothesNormal = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        Goblin.assets.materials.skinHob = new THREE.MeshLambertMaterial({ color: 0x336633 });
        Goblin.assets.materials.clothesHob = new THREE.MeshLambertMaterial({ color: 0x222222 });
        Goblin.assets.materials.club = new THREE.MeshLambertMaterial({ color: 0x654321 }); // Wood
        Goblin.assets.materials.staff = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Wood

        // New Types
        Goblin.assets.materials.skinShaman = new THREE.MeshLambertMaterial({ color: 0x008888 }); // Blue-Green
        Goblin.assets.materials.clothesShaman = new THREE.MeshLambertMaterial({ color: 0x330066 }); // Dark Purple/Blue Robe
        Goblin.assets.materials.skinKing = new THREE.MeshLambertMaterial({ color: 0x880000 }); // Red Skin
        Goblin.assets.materials.clothesKing = new THREE.MeshLambertMaterial({ color: 0xFFD700 }); // Gold Armor

        // Cross Material
        Goblin.assets.materials.cross = new THREE.MeshLambertMaterial({
            color: 0x55AA55,
            transparent: true,
            opacity: 1.0
        });

        Goblin.assets.initialized = true;
    }

    constructor(scene, terrain, x, z, type = 'normal', clanId = null) {
        Goblin.initAssets(); // Ensure assets exist (for Renderer)

        super(scene, terrain, x, z, 'goblin');

        this.type = type; // Entity sets type, but we override or enhance? 
        // Entity ctor(..., type) sets this.type. 
        // We passed 'goblin'. But we want 'normal'/'hobgoblin' as sub-type?
        // Entity.type is used for Spatial Grid. 'goblin' is correct for Grid.
        // We should store sub-type in another var if needed, or overwrite this.type.
        // But Goblin.js uses this.type for stats.
        // Let's store 'goblin' in super, and keep this.type as subType?
        // Or just overwrite this.type = type.
        this.type = type;

        this.clanId = clanId;
        // this.id = Goblin.nextId++; // Use Entity's ID or Goblin's?
        // Let's stick to Goblin's ID sequence for now to avoid ID conflict fears.
        this.id = Goblin.nextId++;

        // Stats
        this.scale = 1.0;
        this.isRanged = false;

        if (this.type === 'king') {
            // King: 2x Knight (Knight HP ~600 -> King 1200)
            this.hp = 1200 + Math.floor(Math.random() * 200);
            this.maxHp = this.hp;
            this.lifespan = 200; // Long lived
            this.damage = 200; // Knight * 2 (Knight 100)
            this.scale = 1.8; // 1.5x Hobgoblin (1.2) = 1.8
            this.attackRate = 1.5; // Slightly slower heavy hits
        } else if (this.type === 'shaman') {
            // Shaman: Knight HP (~600)
            this.hp = 500 + Math.floor(Math.random() * 100);
            this.maxHp = this.hp;
            this.lifespan = 100;
            this.damage = 80; // Wizard Dmg
            this.scale = 1.2; // Same as Hob
            this.isRanged = true; // Magic
            this.attackRate = 2.0; // Slower cast
        } else if (this.type === 'hobgoblin') {
            this.hp = 60 + Math.floor(Math.random() * 30);
            this.maxHp = this.hp;
            this.lifespan = 80 + Math.random() * 40;
            this.damage = 15;
            this.scale = 1.2;
        } else {
            this.hp = 30 + Math.floor(Math.random() * 10);
            this.maxHp = this.hp;
            this.lifespan = 30 + Math.random() * 20;
            this.damage = 8;
        }

        this.age = 0;
        this.isDead = false;
        this.isFinished = false;

        // AI State
        this.state = 'idle';
        this.targetUnit = null;
        this.targetBuilding = null;
        this.attackCooldown = 0;
        // this.attackRate set above or default
        if (!this.attackRate) this.attackRate = 1.0;

        // RENDER STATE (Data Only)
        this.position = new THREE.Vector3(); // For smooth visual movement
        this.rotationY = 0;
        this.limbs = {
            leftArm: { x: 0 },
            rightArm: { x: 0 },
            leftLeg: { x: 0 },
            rightLeg: { x: 0 }
        };
        // Animation State
        this.walkAnimTimer = 0;

        // Init Position
        // Replaced updatePosition() visuals with just data logic if needed? 
        // Actually gridX/Z is enough for renderer.
        this.position.set(this.terrain.gridToWorld(this.gridX), this.terrain.getTileHeight(this.gridX, this.gridZ), this.terrain.gridToWorld(this.gridZ));


        // Movement
        this.isMoving = false;
        this.moveTimer = 0;
        this.moveInterval = 1600;
        this.lastTime = (window.game && window.game.gameTotalTime !== undefined) ? window.game.gameTotalTime : 0;
        this.baseMoveDuration = 800;
        this.moveDuration = this.baseMoveDuration;

        // Register in Spatial Grid
        this.terrain.registerEntity(this, this.gridX, this.gridZ, 'goblin');
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

        // Report death to Clan Memory?
        if (this.clanId && window.goblinManager) {
            // window.goblinManager.reportCasualty(this.clanId, this.gridX, this.gridZ); 
            // (Not impl yet, optional)
        }

        this.createCross();
        console.log(`Goblin (${this.type}) died. ID:${this.id}`);

        // Drop Loot?
        // King drops huge Mana?
        if (this.type === 'king' && window.game) {
            window.game.mana += 500;
            console.log("King Defeated! +500 Mana");
        }
    }

    // Attack Methods are defined below (lines ~760) to keep file structure clean.

    // REMOVED: createMesh, updateVisuals, updatePosition (visual part)

    updateLogic(time, deltaTime, units, buildings) {
        if (this.isDead || this.isFinished) return;

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

        // Update Animation State
        if (this.isMoving) {
            this.updateMovement(time);
        }

        // If attacking, maybe swing arm?
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
            // Simple strike anim: Lift and swing.
        }

        // ... Existing AI Logic ...
        // Debug Log only for one goblin occasionally
        if (Math.random() < 0.005) {
            console.log(`[GoblinAI] ID:${this.id} State:${this.state} Moving:${this.isMoving} TargetU:${!!this.targetUnit} TargetB:${!!this.targetBuilding} Pos:${this.gridX.toFixed(1)},${this.gridZ.toFixed(1)}`);
        }

        // AI Logic
        if (!this.isMoving) {
            // Migration Step
            if (this.state === 'migrating' && this.migrationTarget) {
                this.moveToTarget(this.migrationTarget.x, this.migrationTarget.z, time);

                // Check if arrived
                if (this.getDistance(this.migrationTarget.x, this.migrationTarget.z) < 2.0) {
                    console.log(`Goblin ${this.id} finished migrating.`);
                    this.state = 'idle';
                    this.migrationTarget = null;
                }
                return;
            }

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

                    if (!this.targetUnit) return; // Safety check if target voided during move

                    // Attack if close
                    // Castle range 2.5, Normal 1.5. Unit is small.
                    if (this.getDistance(this.targetUnit.gridX, this.targetUnit.gridZ) <= 1.8) {
                        this.attackTarget(time, deltaTime); // Call attackTarget
                        this.chaseTimer = 0; // Reset on successful attack
                    }
                }
            } else if (this.targetBuilding) {
                // console.log(`[GoblinAI] ${this.id} Moving to Building ${this.targetBuilding.userData.type}`);
                this.moveToTarget(this.targetBuilding.gridX, this.targetBuilding.gridZ, time);
                // Destroy if close (Perimeter check)
                if (this.getDistanceToBuilding(this.targetBuilding) <= 1.5) { // Range 1.5 from PERIMETER
                    this.attackTarget(time, deltaTime); // Call attackTarget
                }
            } else {
                // Wander
                if (!this.isMoving && time - this.lastTime > this.moveInterval) {
                    // Stagnation Check
                    this.wanderCount = (this.wanderCount || 0) + 1;

                    // Try to build Hut (Rarely)
                    // Balance: Reduced to 1.0% (was 2.0%, originally 0.5%)
                    let built = false;
                    if (Math.random() < 0.02) { // Increased chance slightly to reset wanderCount?
                        built = this.tryBuildHut();
                    }

                    if (built) {
                        this.wanderCount = 0;
                    } else if (this.wanderCount > 10) { // Approx 20-30s of idleness
                        console.log(`Goblin ${this.id} bored. Migrating...`);
                        this.migrate(time);
                        this.wanderCount = 0;
                        this.lastTime = time; // Reset timer so we don't spam migrate
                        return; // Skip standard wander
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
        // If we have a target, check if valid
        if (this.targetUnit && (this.targetUnit.isDead || this.targetUnit.isFinished)) {
            this.targetUnit = null;
        }
        if (this.targetBuilding && this.targetBuilding.userData.hp <= 0) {
            this.targetBuilding = null;
        }

        if (this.targetUnit || this.targetBuilding) return; // Keep target

        // Find Unit
        // 1. Closest Unit (exclude Sleeping, Rock Penalty)
        // Use Terrain Spatial Hash for perf!
        const closestUnit = this.terrain.findBestTarget('unit', this.gridX, this.gridZ, 10.0, (entity, dist) => {
            if (entity.isSleeping) return Infinity; // Ignore sleeping

            const h = this.terrain.getTileHeight(entity.gridX, entity.gridZ);
            let score = dist;
            if (h > 8) score += 20.0; // Rock Penalty
            return score;
        });
        this.targetUnit = closestUnit;

        if (this.targetUnit) return;

        // Find Building (Random scan or closest?)
        // Scan specific types
        // const targetTypes = ['house', 'farm', 'barracks', 'tower']; // Not used directly
        // Filter out destroyed or own huts
        // Simple search: Closest?
        // OPTIMIZATION: Use Spatial Partitioning for Buildings too (O(k) vs O(N))
        const bestB = this.terrain.findBestTarget('building', this.gridX, this.gridZ, 20.0, (entity, dist) => {
            // Filter out own huts and caves
            if (entity.userData.type === 'goblin_hut' || entity.userData.type === 'cave') return Infinity;
            if (entity.userData.hp <= 0) return Infinity; // Ignore destroyed

            return dist; // Simple distance scoring
        });
        this.targetBuilding = bestB;

        // Clan Memory Logic (Keep existing)
        // This part was in updateLogic, moving it here for target finding context
        if (!this.targetUnit && !this.targetBuilding) {
            // If we arrived at a memory target but found no valid target to attack
            if (this.currentMemoryTarget) {
                const dist = this.getDistance(this.currentMemoryTarget.x, this.currentMemoryTarget.z);
                if (dist < 5.0) {
                    if (window.game && window.game.goblinManager) {
                        window.game.goblinManager.reportRaidFailure(this.clanId, this.currentMemoryTarget.x, this.currentMemoryTarget.z);
                    }
                }
                this.currentMemoryTarget = null;
            }
        }
    }

    // getDistance inherited from Entity

    getDistanceToBuilding(b) {
        if (!b) return Infinity;
        let size = 1;
        // Hardcode sizes or check terrain? Terrain reference is better.
        // House/Farm=2, Barracks/Tower/Mansion=3?
        // Let's safe-guess or ask Terrain.
        if (this.terrain && this.terrain.getBuildingSize) {
            size = this.terrain.getBuildingSize(b.type);
        } else {
            // Fallback
            if (b.type === 'house' || b.type === 'farm') size = 2;
            if (b.type === 'mansion' || b.type === 'barracks' || b.type === 'tower') size = 3;
            if (b.type === 'castle') size = 4;
        }

        const minX = b.gridX;
        const maxX = b.gridX + size - 1;
        const minZ = b.gridZ;
        const maxZ = b.gridZ + size - 1;

        const dx = Math.max(minX - this.gridX, 0, this.gridX - maxX);
        const dz = Math.max(minZ - this.gridZ, 0, this.gridZ - maxZ);

        return Math.sqrt(dx * dx + dz * dz);
    }

    moveToTarget(tx, tz, time) {
        if (this.isMoving) return;

        // Pathfinding Logic
        // Recalculate if no path, or path target is different
        // For dynamic targets (units), might need frequent updates.
        // For static (buildings/points), just one calc.
        // const isDynamic = !!this.targetUnit; // Not used

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
            // Fix: If Target is a building, find nearest adjacent point
            // This prevents pathfinding failure and clipping
            if (this.terrain.grid[tx] && this.terrain.grid[tx][tz] && this.terrain.grid[tx][tz].hasBuilding) {
                // Find closest neighbor to self
                let bestX = tx, bestZ = tz;
                let minD = Infinity;
                const neighbors = [
                    { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }
                ];
                for (const n of neighbors) {
                    const nx = tx + n.x;
                    const nz = tz + n.z;
                    // Check validity
                    if (this.terrain.isValidGrid(nx, nz) && !this.terrain.grid[nx][nz].hasBuilding && this.terrain.grid[nx][nz].height > 0) {
                        // Dist from goblin
                        const d = Math.pow(this.gridX - nx, 2) + Math.pow(this.gridZ - nz, 2);
                        if (d < minD) {
                            minD = d;
                            bestX = nx;
                            bestZ = nz;
                        }
                    }
                }
                // Update Target
                if (minD !== Infinity) {
                    tx = bestX;
                    tz = bestZ;
                } else {
                    // Surrounded? Attack from range?
                    // Just stay put or fail?
                    // Let pathfinding try, it will fail.
                }
            }

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
        // Common Move Logic
        const targetH = this.terrain.getTileHeight(nextX, nextZ);
        // Check Validity: Water, Height change, OR Building
        // Note: Climbing limit is 2.0 in Terrain passability.
        // We should enforce building collision here too.
        let blocked = false;
        if (targetH <= 0) blocked = true;
        else if (Math.abs(targetH - this.terrain.getTileHeight(this.gridX, this.gridZ)) > 2.0) blocked = true;
        // Fix: Block entering buildings
        // Exception: If we are attacking the building and this step is NOT inside?
        // But preventing entering is safer. AI should attack from outside.
        // If we are already IN a building (glitched), let us out?
        // Logic: specific block if target has building.
        else if (this.terrain.grid[nextX][nextZ].hasBuilding) blocked = true;

        if (blocked) {
            // Blocked
            this.path = null; // Invalidate path
            this.handleMoveFailure(time);
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

    handleMoveFailure(time) {
        this.pathFailCount = (this.pathFailCount || 0) + 1;
        if (this.pathFailCount > 3) {
            console.log(`Goblin ${this.id} gave up target! Stuck/Coast.`);
            this.targetUnit = null;
            this.targetBuilding = null;
            this.currentMemoryTarget = null;
            this.path = null;
            this.pathFailCount = 0;
            this.moveRandomly(time);
        }
    }

    startMove(tx, tz, time) {
        // Safety: Ensure we have valid coords
        if (this.gridX === undefined || isNaN(this.gridX)) {
            console.error(`Goblin ${this.id} startMove failed: Invalid gridX (${this.gridX})`);
            this.isMoving = false;
            return;
        }

        const targetH = this.terrain.getTileHeight(tx, tz);
        const currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);

        // Height Diff Limit (Climbing)
        if (Math.abs(targetH - currentH) > 2.0) {
            // Can't climb steep
            this.stuckCount = (this.stuckCount || 0) + 1;
            if (this.stuckCount > 5) {
                this.targetBuilding = null;
                this.stuckCount = 0;
                this.moveRandomly(time);
            }
            return;
        }

        // Use Entity base
        super.startMove(tx, tz, time);

        // Speed Logic
        const heightDiff = Math.abs(targetH - currentH);
        if (targetH > 8) {
            this.moveDuration = 6000; // Rock: Very Slow
        } else if (heightDiff > 0.1) {
            this.moveDuration = 3000; // Slope: Slow
        } else {
            this.moveDuration = this.baseMoveDuration || 800;
        }

        this.stuckCount = 0;
        this.pathFailCount = 0;
    }

    // updateMovement inherited

    onMoveFinished(time) {
        // Final Snap handled by Entity
        // Logic for Goblin on arrival?
        // Just reset animation?
        this.walkAnimTimer = 0;
        this.limbs.leftArm.x = 0;
        this.limbs.rightArm.x = 0;
        this.limbs.leftLeg.x = 0;
        this.limbs.rightLeg.x = 0;
    }

    onMoveStep(progress) {
        // Walk anim
        this.walkAnimTimer += 0.1; // Simple increment
        const armSwing = Math.sin(this.walkAnimTimer) * 0.5;
        const legSwing = Math.sin(this.walkAnimTimer) * 0.5;
        this.limbs.leftArm.x = armSwing;
        this.limbs.rightArm.x = -armSwing;
        this.limbs.leftLeg.x = -legSwing;
        this.limbs.rightLeg.x = legSwing;
    }



    // updatePosition inherited from Entity

    attackTarget(time, deltaTime) {
        if (this.targetUnit) {
            this.attackUnit(this.targetUnit);
        } else if (this.targetBuilding) {
            this.attackBuilding(this.targetBuilding);
        }
    }

    attackTarget(time, deltaTime) {
        if (this.targetUnit) {
            this.attackUnit(this.targetUnit);
        } else if (this.targetBuilding) {
            this.attackBuilding(this.targetBuilding);
        }
    }

    attackUnit(unit) {
        if (this.attackCooldown > 0) return;
        if (unit.isDead) {
            this.targetUnit = null;
            return;
        }

        // Visuals
        if (this.isRanged) {
            // Shaman Staff Cast
            this.limbs.rightArm.x = -Math.PI; // Raise
            setTimeout(() => {
                if (!this.isDead) this.limbs.rightArm.x = 0;
            }, 500);

            // Projectile (Blue Fireball)
            if (window.game && window.game.spawnProjectile) {
                const startPos = this.position.clone().add(new THREE.Vector3(0, 0.8 * this.scale, 0));
                const targetPos = unit.position.clone().add(new THREE.Vector3(0, 0.5, 0)); // Chest
                window.game.spawnProjectile(startPos, targetPos, 0x00FFFF);
            }
        } else {
            // Melee
            this.limbs.rightArm.x = -Math.PI / 2; // Raise club
        }

        // Synced Damage
        setTimeout(() => {
            if (!this.isRanged) this.limbs.rightArm.x = 0; // Swing

            // Range Check safety
            const dist = this.getDistance(unit.gridX, unit.gridZ);
            if (!unit.isDead && (this.isRanged || dist <= 2.5)) {
                unit.takeDamage(this.damage);
                console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${unit.hp}`);

                if (unit.isDead) {
                    // Plunder Bonus!
                    if (window.game && window.game.goblinManager) {
                        window.goblinManager.increasePlunder();
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

        // Visuals
        if (this.isRanged) {
            this.limbs.rightArm.x = -Math.PI;
            setTimeout(() => { if (!this.isDead) this.limbs.rightArm.x = 0; }, 500);

            if (window.game && window.game.spawnProjectile) {
                const startPos = this.position.clone().add(new THREE.Vector3(0, 0.8 * this.scale, 0));
                // Fix: Convert Grid to World
                const tx = this.terrain.gridToWorld(building.userData.gridX);
                const tz = this.terrain.gridToWorld(building.userData.gridZ);
                const targetPos = new THREE.Vector3(tx, building.y + 1, tz);

                window.game.spawnProjectile(startPos, targetPos, 0x00FFFF);
            }
        } else {
            this.limbs.rightArm.x = -Math.PI / 2;
            setTimeout(() => {
                this.limbs.rightArm.x = 0;
            }, 200);
        }

        // Damage building population
        if (building.userData.population === undefined) building.userData.population = 10;

        const isCastle = (building.userData.type === 'castle');
        const isFarm = (building.userData.type === 'farm');

        // Damage Logic
        if (isFarm && building.userData.hp !== undefined) {
            // Damage HP
            building.userData.hp -= 1;
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
        }

        // Fix: Check < 1.0 because Terrain update might adds fractional population (0.001)
        if (building.userData.population < 1.0) {
            this.destroyBuilding(building);
        }

        // Fix: Check < 1.0 because Terrain update might adds fractional population (0.001)
        if (building.userData.population < 1.0) {
            this.destroyBuilding(building);
        }
    }

    destroyBuilding(building) {
        if (!building) return;
        this.terrain.removeBuilding(building);
        console.log(`Goblin ${this.id} destroyed ${building.userData.type}!`);

        // Plunder Bonus
        if (window.game && window.game.goblinManager) {
            window.game.goblinManager.increasePlunder();
        }

        // Reset Target
        this.targetBuilding = null;
    }

    takeDamage(amount) {
        if (this.isDead) return; // Ignore damage if already dead
        this.hp -= amount;
        // Animation update removed from here. Handled in updateLogic.
        if (this.isMoving) {
            // No-op for limb updates here, rely on updateLogic
        } else {
            // Reset limbs if needed, or leave for updateLogic
        }

        // Attack Animation Override
        if (this.attackCooldown > 0) {
            const progress = this.attackCooldown / this.attackRate; // 1.0 -> 0.0
            // Swing around 0.8
            if (progress < 0.9 && progress > 0.5) {
                this.limbs.rightArm.x = -Math.PI / 2 + (Math.sin(progress * Math.PI * 4) * 0.5); // Chop
            }
        } else {
            // Flash red logic removed
        }
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        if (this.isDead) return; // Prevent double death
        this.isDead = true;
        this.terrain.unregisterEntity(this);
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

            // Remove from Spatial Grid
            if (this.terrain && this.terrain.unregisterEntity) {
                this.terrain.unregisterEntity(this);
            }

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

    migrate(time) {
        // Move far away (20-30 tiles) - Step by step!
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

        console.log(`Goblin ${this.id} migrating to ${tx},${tz} (Walking)`);
        this.state = 'migrating';
        this.migrationTarget = { x: tx, z: tz };

        // Start first step
        this.moveToTarget(tx, tz, time);
    }

    tryBuildHut() {
        // 1. Check constraints
        const x = Math.round(this.gridX);
        const z = Math.round(this.gridZ);

        // Safety Check: Grid bounds
        if (!this.terrain.grid[x] || !this.terrain.grid[x][z]) {
            // console.warn(`Goblin ${this.id} attempted build at invalid coords ${x},${z}`);
            return false;
        }

        // Check if building already exists
        if (this.terrain.grid[x][z].hasBuilding) return false;

        // Rock check (Height > 8)
        const h = this.terrain.getTileHeight(x, z);
        if (h > 8) return false; // Cannot build on Rock
        if (h <= 0) return false; // Cannot build on Water

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
                    return false;
                }
            }
        }

        // Build!
        const hut = this.terrain.addBuilding('goblin_hut', x, z);
        if (hut) {
            hut.userData.clanId = this.clanId;
            console.log(`Goblin (Clan: ${this.clanId}) built a Hut!`);
            return true;
        }
        return false;
    }

    serialize() {
        return {
            id: this.id,
            type: this.type,
            gridX: this.gridX,
            gridZ: this.gridZ,
            hp: this.hp,
            maxHp: this.maxHp,
            clanId: this.clanId,
            age: this.age,
            lifespan: this.lifespan,
            state: this.state,
            migrationTarget: this.migrationTarget,
            scale: this.scale // Save scale just in case
        };
    }
}

