import * as THREE from 'three';

import { Actor } from './Actor.js';
import { WanderBase } from './ai/states/State.js';
import { Combat, Raid, Wander, Build, Retreat } from './ai/states/GoblinStates.js';
import { GameConfig } from './config/GameConfig';

console.log("[DEBUG] Goblin.ts loaded");

export class Goblin extends Actor {
    // Static Cache (Kept for Renderer to use)
    static assets: any = {
        geometries: {},
        materials: {},
        textures: {},
        initialized: false
    };

    public type: string;
    public clanId: number;
    public scale: number;
    public attackRange: number = 2.0;
    public attackCooldown: number = 1.0;
    public attackTimer: number = 0;
    public lastAttackTime: number = 0;
    public isDead: boolean = false;
    public isRemoved: boolean = false; // Flag to remove from game loop safely
    public state: any = null; // UnitState (Wander, Chase, Attack)
    public damage: number = 10;
    public attackRate: number = 1.0;
    public isRanged: boolean = false;
    public targetUnit: any | null = null;
    public targetBuilding: any | null = null;
    public ignoredTargets: Map<number | string, number>; // ID -> Expiry Time
    public raidGoal: any = null;

    public hasStaff: boolean;
    public hasClub: boolean;
    public walkAnimTimer: number;
    public moveTimer: number;
    public moveInterval: number;
    public lastTime: number;

    public currentMemoryTarget: any;
    public frustratedUntil: number = 0;
    public onMoveFinishedSuper?: (time: number) => void;

    // Added properties
    public crossMesh: any;
    public deathTimer: number = 0;
    public wanderCount: number = 0;
    public chaseTimer: number = 0;
    public migrationTarget: { x: number, z: number } | null = null;
    public lifespan: number = 400; // Default
    public lastHitTime: number = 0;

    static async initAssets(checkYield?: any) {
        if (Goblin.assets.initialized) return;

        const yieldOp = async () => { if (checkYield) await checkYield(); };

        // Geometries
        // Normal Torso
        Goblin.assets.geometries.torsoNormal = new THREE.BoxGeometry(0.25, 0.3, 0.2);
        // Hobgoblin Torso
        Goblin.assets.geometries.torsoHob = new THREE.BoxGeometry(0.35, 0.3, 0.2);

        // Shared
        Goblin.assets.geometries.head = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        Goblin.assets.geometries.ear = new THREE.ConeGeometry(0.05, 0.15, 4);

        const armGeo = new THREE.BoxGeometry(0.08, 0.25, 0.08);
        armGeo.translate(0, -0.1, 0); // Pivot at Top (Shoulder)
        Goblin.assets.geometries.arm = armGeo;

        const legGeo = new THREE.BoxGeometry(0.1, 0.25, 0.1);
        legGeo.translate(0, -0.1, 0); // Pivot at Top (Hip)
        Goblin.assets.geometries.leg = legGeo;

        await yieldOp();

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

        await yieldOp();

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

        // Faces
        Goblin.assets.geometries.facePlane = new THREE.PlaneGeometry(0.15, 0.15);
        Goblin.assets.geometries.facePlane.translate(0, 0, 0.105); // Just in front of head (0.2 depth / 2 + bias)

        Goblin.assets.textures.face = Goblin.createFaceTexture();
        Goblin.assets.materials.face = new THREE.MeshStandardMaterial({
            map: Goblin.assets.textures.face,
            transparent: true
        });

        Goblin.assets.initialized = true;
    }

    static createFaceTexture() {
        // Goblin Face: Greenish skin, angry eyes
        if (typeof document === 'undefined') {
            return new THREE.Texture(); // Return empty texture in Node
        }
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.CanvasTexture(canvas);

        // Base Skin (Matches Normal Skin 0x55AA55 generally, but let's make it compatible with all)
        // Actually Face Plane sits ON TOP of Head.
        // If we want it to blend, we need transparent background?
        // Unit uses specific skin color background.
        // Goblins have different skin colors (Green, Dark Green, Blue, Red).
        // Transparent background is best so head color shows through!
        // Unit uses filled background. Let's try transparent first.

        // Eyes (Yellow/Red)
        ctx.fillStyle = '#FFFF00'; // Yellow Sclera
        ctx.fillRect(10, 20, 15, 12); // Left Eye
        ctx.fillRect(39, 20, 15, 12); // Right Eye

        // Pupils (Black Slits)
        ctx.fillStyle = '#000000';
        ctx.fillRect(16, 22, 3, 8);
        ctx.fillRect(45, 22, 3, 8);

        // Mouth (Jagged/Teeth)
        ctx.fillStyle = '#330000'; // Dark mouth
        ctx.beginPath();
        ctx.moveTo(15, 45);
        ctx.lineTo(49, 45);
        ctx.lineTo(32, 55);
        ctx.fill();

        // Teeth (White)
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(18, 45, 4, 4);
        ctx.fillRect(42, 45, 4, 4);

        return new THREE.CanvasTexture(canvas);
    }

    constructor(scene: THREE.Scene, terrain: any, x: number, z: number, type: string = 'normal', clanId: number | null = null, raidTarget: any | null = null) {
        Goblin.initAssets(); // Ensure assets exist (for Renderer)
        super(scene, terrain, x, z, 'goblin');

        this.type = type || 'goblin';
        this.clanId = clanId || 0;
        this.scale = 1.0;

        // Ensure mesh group exists
        if (this.scene && this.scene.getObjectByName && !this.scene.getObjectByName('GoblinGroup')) {
            // managed by GoblinRenderer usually
        }

        // Stats
        // Stats from Config
        const statConfig = GameConfig.goblins[this.type] || GameConfig.goblins.normal;

        this.hp = statConfig.hp;
        this.lifespan = statConfig.lifespan || 100;

        // Add some variance to King HP
        if (this.type === 'king') {
            this.hp += Math.floor(Math.random() * 200);
            this.scale = 2.0;
        } else {
            this.scale = 1.0;
        }

        this.maxHp = this.hp;
        this.damage = statConfig.damage;
        this.attackRate = statConfig.attackRate || 2.0;

        if (statConfig.attackRange) {
            this.attackRange = statConfig.attackRange;
        }

        // Fix: Decouple 'isRanged' (visuals/projectile) from 'attackRange' (reach).
        // King has reach (4.0) but is Melee. Shaman has reach (8.0) and is Ranged.
        this.isRanged = !!statConfig.isRanged;
        // Fallback or explicit check for Shaman
        if (this.type === 'shaman') {
            this.isRanged = true;
            if (!this.attackRange) this.attackRange = 8.0;
        }

        this.age = 20; // Starts at 20 (Adult) to match Units
        this.isDead = false;
        this.isFinished = false;

        // AI State
        // AI State
        this.attackCooldown = 0;
        this.targetUnit = null; // Current target unit
        this.targetBuilding = null; // Current target building
        this.ignoredTargets = new Map(); // id -> timestamp until ignored (Blacklist)

        // Initialize State properly
        if (raidTarget) {
            this.raidGoal = { ...raidTarget };
            // Add randomness to spread out raids
            this.raidGoal.x += (Math.random() - 0.5) * 8;
            this.raidGoal.z += (Math.random() - 0.5) * 8;
            console.log(`Goblin ${this.id} SPAWNED FOR RAIDING! Target: ${this.raidGoal.x.toFixed(0)},${this.raidGoal.z.toFixed(0)} `);
            this.changeState(new Raid(this));
        } else {
            // Default to WanderState
            this.changeState(new Wander(this));
        }
        if (!this.attackRate) this.attackRate = 1.0;

        // Visual Props
        this.hasStaff = (this.type === 'shaman');
        this.hasClub = (this.type === 'goblin' || this.type === 'hobgoblin');

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
        this.position.set(this.terrain.gridToWorld(this.gridX), this.terrain.getTileHeight(this.gridX, this.gridZ), this.terrain.gridToWorld(this.gridZ));


        // Movement
        this.isMoving = false;
        this.moveTimer = 0;
        // NERF: Speed reduced. 800ms -> 1000ms. (Was originally 1600ms).
        // Middle ground to make them catchable by workers but not snails.
        this.moveInterval = 1.0;
        this.lastTime = -99.0; // Force immediate logic update on first frame
        this.baseMoveDuration = 1.0; // Matched to Interval for continuous walking
        this.moveDuration = this.baseMoveDuration;

        // Register in Spatial Grid
        this.terrain.registerEntity(this, this.gridX, this.gridZ, 'goblin');
    }

    // --- LOGIC UPDATE ---
    updateLogic(time: number, deltaTime: number, isNight: boolean = false, units: any[] = [], buildings: any[] = []) {
        if (this.isDead || this.isFinished) return;

        // Regen: 1 HP per minute (1/60 per second) - User Request
        if (this.hp < this.maxHp) {
            this.hp += (1.0 / 60.0) * deltaTime;
            if (this.hp > this.maxHp) this.hp = this.maxHp;
        }

        // Aging: Slower for 100-Day Progression (0.2 years per sec)
        this.age += deltaTime * 0.2;

        if (this.age >= this.lifespan) {
            this.die("Old Age");
            return;
        }
        // FAILSAFE: If age is corrupted or die() failed, force logic.
        if (this.age > 400 && this.type !== 'king') {
            console.warn(`Goblin ${this.id} exceeded max lifespan(${this.age}).Forcing death.`);
            this.die("Exceeded Lifespan");
            return;
        }

        // --- PHYSICAL UPDATES (Run before AI State) ---
        // 1. Water Death Check
        const currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        // console.log(`[Goblin.js] updateLogic H:${ currentH } `);
        if (currentH <= 0) {
            console.error(`[Goblin.js] Dying due to low height: ${currentH} at ${this.gridX},${this.gridZ} `);
            this.die("Low Height");
            return;
        }

        // 2. Update Animation State & Position
        // CRITICAL: updateMovement must be called EVERY frame for visuals and arrival logic.
        // It is now also called in GoblinManager, but we keep it here as a safety fallback
        // or ensure it's not blocked by early returns.
        if (this.updateMovement) {
            this.updateMovement(time);
        }

        // 3. Cooldowns
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }

        // --- AI STATE MACHINE ---
        if (this.state && typeof this.state.update === 'function') {
            this.state.update(time, deltaTime, isNight, units, buildings);
        } else {
            console.log(`[Goblin.js] Invalid State! State: `, this.state);
        }


    }

    executeCombatLogic(time: number, deltaTime: number) {
        const target = this.targetUnit || this.targetBuilding;
        if (!target) return;

        // if (this.id % 5 === 0) console.log(`[Goblin ${ this.id }] ExecCombat...`);

        // 1. Distance Check
        const dist = this.targetUnit ?
            this.getDistance(this.targetUnit.gridX, this.targetUnit.gridZ) :
            (this.targetBuilding ? this.getDistance(this.targetBuilding.gridX, this.targetBuilding.gridZ) : 0);


        // 2. Range Logic
        let range = this.attackRange || 1.5; // Default Melee (Standardized)
        if (this.isRanged) range = this.attackRange || 8.0;

        // Adjust range for buildings (hitbox)
        // getDistanceToBuilding usually calculates to EDGE.
        // So generic range 2.5 is fine for edge-to-edge logic if implemented correctly.
        // But checking Line 566: attackUnit uses center distance check.

        if (dist > range) {
            // Chase
            let tx = target.gridX;
            let tz = target.gridZ;

            // Optimization: Only recalc approach point occasionally?
            // Or use smartMove's linear interpolation if target hasn't changed much.
            // But simple:
            const approach = this.getApproachPoint(target);
            if (approach) {
                tx = approach.x;
                tz = approach.z;
            }

            const moved = this.smartMove(tx, tz, time);
            if (!moved && !this.isPathfinding && !this.isPathfindingThrottled && this.isUnreachable) {
                // FAILED TO MOVE (Stuck/Unreachable)
                // Note: smartMove returns false if waiting for async pathfinding (isPathfinding=true)
                // So we MUST check !isPathfinding before blacklisting.
                const now = (window as any).game ? (window as any).game.simTotalTimeSec : time;
                if (this.targetUnit) {
                    console.log(`Goblin ${this.id} stuck reaching target ${this.targetUnit.id}.Blacklisting.`);
                    // Blacklist for 10 seconds
                    this.ignoredTargets.set(this.targetUnit.id, now + 10);
                    this.targetUnit = null;
                } else if (this.targetBuilding) {
                    // Building unreachable? Maybe just skip turn or random move.
                    // But strictly, we should probably ignore it too.
                    console.log(`Goblin ${this.id} stuck reaching Building ${this.targetBuilding.id}.Blacklisting.`);
                    // FIX: Blacklist unreachable buildings to prevent State Oscillation Loop
                    this.ignoredTargets.set(this.targetBuilding.id || this.targetBuilding.userData.id, now + 10);
                    this.targetBuilding = null;
                }
            }
        } else {
            // Attack
            // Ensure we stop moving to attack clearly (visuals)
            // this.isMoving = false; // Optional, smartMove handles it if we don't call it? 
            // Stick to attackTarget logic.
            this.attackTarget(time, deltaTime);
        }
    }


    /**
     * @deprecated Use scanForTargets instead. Kept for backward compatibility with tests.
     */
    findTarget(units, buildings) {
        return this.scanForTargets(units, buildings);
    }

    scanForTargets(units?: any[], buildings?: any[]) {
        const time = (window as any).game ? (window as any).game.simTotalTimeSec : 0;

        // DEBUG
        // if (this.id % 10 === 0) console.log(`[Goblin ${ this.id }] scanForTargets...`);

        if (this.frustratedUntil && time < this.frustratedUntil) return;

        // If we have a target, check if valid
        if (this.targetUnit && (this.targetUnit.isDead || this.targetUnit.isFinished)) {
            this.targetUnit = null;
        }
        if (this.targetBuilding) {
            const b = this.targetBuilding;
            // SYNC FIX: Use isDestroyed() logic
            const isDead = b.isDestroyed ? b.isDestroyed() : (b.userData && b.userData.hp <= 0);
            if (isDead) {
                this.targetBuilding = null;
            }
        }

        if (this.targetUnit) return; // Keep Unit target (High Priority)
        // If targetBuilding, we still scan to find closer Units or Buildings (Opportunity)

        // Find Unit
        // Reduced ranges per User Request (Too fast detection)
        // Find Unit
        // Reduced ranges per User Request (Too fast detection)
        // Check for raiding state (can be string or state object)
        const isRaiding = (this.state === 'raiding' || this.state instanceof Raid);
        // User Request: "Humans detect goblins but goblins don't detect humans"
        // Cause: Human Range (Knight=50, Worker=15) vs Goblin Range (12).
        // Fix: Narrow Ranges (Base 20->12, Raid 25->18) to delay conflict.
        const searchDistUnits = isRaiding ? 18.0 : 12.0; // Reduced ranges
        // Optimization: Use Spatial Grid Search to avoid O(N) scan

        // if (this.id % 10 === 0) console.log(`[Goblin ${ this.id }] invoking terrain.findBestTarget(Units)...`);

        const closestUnit = this.terrain.findBestTarget('unit', this.gridX, this.gridZ, searchDistUnits, (entity, dist) => {
            if (entity.isSleeping) return Infinity; // Ignore sleeping
            if (entity.isInsideBuilding) return Infinity; // Ignore units inside buildings (Attack the building instead!)
            // Blacklist Check
            const now = (window as any).game ? (window as any).game.simTotalTimeSec : Date.now() / 1000;
            const expiry = this.ignoredTargets.get(entity.id);
            if (expiry !== undefined && expiry > now) return Infinity;

            const h = this.terrain.getTileHeight(entity.gridX, entity.gridZ);
            let score = dist;
            if (h > 8) score += 20.0; // Rock Penalty
            return score;
        });
        if (closestUnit) console.log(`[Goblin ${this.id}] Found Unit Candidate: ${closestUnit.id} Dist:? `);

        // Find Building
        // User Request: Match building range to unit range (Reduced from 20/30)
        const bldDist = searchDistUnits;
        // Optimization: Use Spatial Grid Search
        const closestBuilding = this.terrain.findBestTarget('building', this.gridX, this.gridZ, bldDist, (entity, dist) => {
            // Blacklist Check
            const now = (window as any).game ? (window as any).game.simTotalTimeSec : Date.now() / 1000;
            const id = entity.id || (entity.userData ? entity.userData.id : null);
            const expiry = id ? this.ignoredTargets.get(id) : undefined;
            if (expiry !== undefined && expiry > now) return Infinity;

            if (!entity.userData || entity.userData.type === 'goblin_hut' || entity.userData.type === 'cave') return Infinity;
            // Rule: Only ignore if BOTH population and hp are depleted
            const pop = entity.userData.population || 0;
            const hp = (entity.userData.hp === undefined) ? 50 : entity.userData.hp;
            if (pop <= 0 && hp <= 0) return Infinity;
            return dist;
        });

        // Decision Logic: Arsonist Bias
        // If we have both, prefer Building if it is reasonably close.
        // Rule: If Building is within 10 tiles, ALWAYS prioritze it over Unit (unless Unit is literally touching us?)
        // Rule: If Building is closer than Unit, take Building.

        let chosen: any = null;

        if (closestUnit && closestBuilding) {
            // Arsonist Logic: If Building is CLOSE (< 15), burn it!
            const W = this.terrain.logicalWidth || 80;
            const D = this.terrain.logicalDepth || 80;

            // Recalc precise distances
            const uDx = Math.abs(closestUnit.gridX - this.gridX);
            const uDz = Math.abs(closestUnit.gridZ - this.gridZ);
            const uAdx = Math.min(uDx, W - uDx);
            const uAdz = Math.min(uDz, D - uDz);
            const uDist = Math.sqrt(uAdx * uAdx + uAdz * uAdz);

            const bDx = Math.abs(closestBuilding.gridX - this.gridX);
            const bDz = Math.abs(closestBuilding.gridZ - this.gridZ);
            const bAdx = Math.min(bDx, W - bDx);
            const bAdz = Math.min(bDz, D - bDz);
            const bDist = Math.sqrt(bAdx * bAdx + bAdz * bAdz);

            if (bDist < 15.0) {
                chosen = closestBuilding;
            } else {
                chosen = (uDist < bDist) ? closestUnit : closestBuilding;
            }
        } else {
            chosen = closestUnit || closestBuilding;
        }

        if (chosen) {
            if (closestUnit && chosen === closestUnit) {
                this.targetUnit = chosen;
                this.targetBuilding = null;
            } else {
                this.targetBuilding = chosen;
                this.targetUnit = null;
            }

            // HOTSPOT REPORT: Alert defensive squads of goblin presence
            if ((window as any).game && ((window as any).game as any).reportGlobalBattle) {
                ((window as any).game as any).reportGlobalBattle(chosen.gridX, chosen.gridZ);
            }
        }

        // Clan Memory Logic (Keep existing)
        if (!this.targetUnit && !this.targetBuilding) {
            if (this.currentMemoryTarget) {
                const dist = this.getDistance(this.currentMemoryTarget.x, this.currentMemoryTarget.z);
                if (dist < 5.0) {
                    if ((window as any).game && (window as any).game.goblinManager) {
                        (window as any).game.goblinManager.reportRaidFailure(this.clanId, this.currentMemoryTarget.x, this.currentMemoryTarget.z);
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



    moveRandomly(time: number) {
        // Clan Memory Logic: 60% chance to move towards a known raid spot (Was 30%)
        if (this.clanId && Math.random() < 0.6) {
            // Distraction: 5% chance to drop out of raid path (Was 20%)
            if (Math.random() < 0.05) {
                console.log(`Goblin ${this.id} distracted from raid!`);
                this.tryBuildHut();
            } else if ((window as any).game && (window as any).game.goblinManager) {
                const target = (window as any).game.goblinManager.getClanRaidTarget(this.clanId);
                if (target) {
                    this.currentMemoryTarget = target;
                    // Move towards target using robust fallback logic
                    const dist = this.getDistance(target.x, target.z);
                    if (dist > 3.0) {
                        this.smartMove(target.x, target.z, time);
                        return;
                    }
                }
            }
        }

        // --- SCOUT LOGIC (User Request) ---
        // Normal Goblins only: 10% chance to wander far (15-30 tiles)
        if (this.type === 'normal' && Math.random() < 0.10) {
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;
            const range = 15 + Math.random() * 15; // 15-30
            const angle = Math.random() * Math.PI * 2;

            let tx = this.gridX + Math.cos(angle) * range;
            let tz = this.gridZ + Math.sin(angle) * range;

            // Wrap
            if (tx < 0) tx = (tx % logicalW + logicalW) % logicalW;
            else if (tx >= logicalW) tx = tx % logicalW;

            if (tz < 0) tz = (tz % logicalD + logicalD) % logicalD;
            else if (tz >= logicalD) tz = tz % logicalD;

            // Check Reachability
            if (this.isReachable(tx, tz)) {
                // Check Sea Level (Don't scout into water)
                const th = this.terrain.getTileHeight(tx, tz);
                if (th > 0) {
                    // Go!
                    console.log(`[Goblin ${this.id}] Scouting to ${tx.toFixed(1)},${tz.toFixed(1)} `);
                    this.smartMove(tx, tz, time);
                    return;
                }
            }
        }

        // Random adjacent move (Existing random logic)
        // Wait, `startMove` in Goblin was just a wrapper.
        // `Actor` has `startMove` from `Entity`.
        // Goblin `startMove` (lines 776+) had logic for speed/stuck.
        // We removed `startMove` override? No, I should KEEP Goblin's startMove override if it has specific logic.
        // Ah, I need to check if I deleted `startMove` in previous step?
        // I deleted `moveToTarget`.

        // Let's verify `moveRandomly` content.

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
            let nextX = Math.floor(this.gridX + dir.x);
            let nextZ = Math.floor(this.gridZ + dir.z);

            // Wrap
            if (nextX < 0) nextX = logicalW - 1;
            if (nextX >= logicalW) nextX = 0;
            if (nextZ < 0) nextZ = logicalD - 1;
            if (nextZ >= logicalD) nextZ = 0;

            // Region Check for Random Move (Strict)
            if (!this.isReachable(nextX, nextZ)) continue;

            const targetH = this.terrain.getTileHeight(nextX, nextZ);

            // Allow climbing up to 2.0 units
            if (Math.abs(targetH - currentH) <= 2.0) {
                // Check Sea Level
                if (targetH > 0) {
                    // Check Building (Goblin specific preference not to walk INTO huts?)
                    if (this.terrain.grid[nextX] && this.terrain.grid[nextX][nextZ] && this.terrain.grid[nextX][nextZ].hasBuilding) continue;

                    this.startMove(nextX, nextZ, time);
                    return;
                }
            }
        }
        this.lastTime = time;
    }

    handleMoveFailure(time: number) {
        this.pathFailCount = (this.pathFailCount || 0) + 1;
        if (this.id % 5 === 0) console.log(`[Goblin ${this.id}] Move Fail.Count:${this.pathFailCount} `);
        if (this.pathFailCount > 3) {
            console.log(`Goblin ${this.id} gave up target! Stuck / Coast.`);
            this.targetUnit = null;
            this.targetBuilding = null;
            this.currentMemoryTarget = null;
            this.path = null;
            this.pathFailCount = 0;
            this.moveRandomly(time);
        }
    }

    startMove(tx: number, tz: number, time: number) {
        // Safety: Ensure we have valid coords
        if (this.gridX === undefined || isNaN(this.gridX)) {
            console.error(`Goblin ${this.id} startMove failed: Invalid gridX(${this.gridX})`);
            this.isMoving = false;
            return;
        }

        let targetH = 0;
        let currentH = 0;

        if (this.terrain.getInterpolatedHeight) {
            targetH = this.terrain.getInterpolatedHeight(tx, tz);
            currentH = this.terrain.getInterpolatedHeight(this.gridX, this.gridZ);
        } else {
            targetH = this.terrain.getTileHeight(tx, tz);
            currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        }

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
        // Speed Logic
        const heightDiff = Math.abs(targetH - currentH);

        // Safety check for terrain grid access
        let targetM = 0.5;
        if (this.terrain.grid && this.terrain.grid[tx] && this.terrain.grid[tx][tz]) {
            targetM = this.terrain.grid[tx][tz].moisture || 0.5;
        }

        if (targetH > 8) {
            this.moveDuration = 6.0; // Rock: Very Slow
        } else if (heightDiff > 0.1) {
            this.moveDuration = 3.0; // Slope: Slow
        } else if (targetM > 0.6) {
            this.moveDuration = 2.0; // Swamp: Slow
        } else {
            this.moveDuration = 0.8; // Base
        }

        this.stuckCount = 0;
        this.pathFailCount = 0;
    }

    // updateMovement inherited

    onMoveFinished(time) {
        // Reset Limbs
        this.limbs.leftArm.x = 0;
        this.limbs.rightArm.x = 0;
        this.limbs.leftLeg.x = 0;
        this.limbs.rightLeg.x = 0;

        // Final Snap handled by Entity (if called via super)
        super.onMoveFinished(time);
    }

    onMoveStep(progress) {
        // Walk anim (Phase-locked DO NOT use manual timer)
        const freq = Math.PI * 4;
        const amp = 0.5;
        const swing = Math.sin(progress * freq) * amp;

        this.limbs.leftArm.x = swing;
        this.limbs.rightArm.x = -swing;
        this.limbs.leftLeg.x = -swing;
        this.limbs.rightLeg.x = swing;
    }


    // updatePosition inherited from Entity

    attackTarget(time, deltaTime) {
        // console.log(`[Goblin DEBUG]attackTarget.Unit:${ !!this.targetUnit } Bldg:${ !!this.targetBuilding } `);

        // Trigger Wave System logic (Call for help!)
        if ((window as any).game && (window as any).game.goblinManager) {
            const currentTarget = this.targetUnit || this.targetBuilding;
            // Notify manager of activity AND target
            (window as any).game.goblinManager.notifyClanActivity(this.clanId, currentTarget);
        }

        if (this.targetUnit) {
            this.attackUnit(this.targetUnit);
        } else if (this.targetBuilding) {
            this.attackBuilding(this.targetBuilding);
        }
    }

    attackUnit(unit: any) {
        // console.log(`[Goblin ${ this.id }] attackUnit called for Unit ${ unit.id }.CD:${ this.attackCooldown } `);
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
            if ((window as any).game && (window as any).game.spawnProjectile) {
                const startPos = this.position.clone().add(new THREE.Vector3(0, 0.8 * this.scale, 0));
                const targetPos = unit.position.clone().add(new THREE.Vector3(0, 0.5, 0)); // Chest
                (window as any).game.spawnProjectile(startPos, targetPos, 0x00FFFF);
            }
        } else {
            // Melee
            this.limbs.rightArm.x = -Math.PI / 2; // Raise club
        }

        // Synced Damage
        if (!this.isRanged) this.limbs.rightArm.x = 0; // Swing

        // Range Check safety
        const dist = this.getDistance(unit.gridX, unit.gridZ);
        // Fix: Use attackRange if available (e.g. King has 4.0), otherwise fallback to 1.5 (Melee)
        // Ensure we include a small buffer for grid quantization errors? No, trust range.
        const range = this.attackRange || 1.5;
        if (!unit.isDead && (this.isRanged || dist <= range)) {
            unit.takeDamage(this.damage, this);
            console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${unit.hp} `);
        }

        this.attackCooldown = this.attackRate;
    }

    attackBuilding(building: any) {
        if (!building) return;

        // GHOST ATTACK FIX: Check if building is dead
        const isDead = building.isDestroyed ? building.isDestroyed() : (building.userData && building.userData.hp <= 0);
        if (isDead) {
            this.targetBuilding = null;
            return;
        }

        if (this.attackCooldown > 0) return;

        // --- Visuals ---
        if (this.isRanged) {
            this.limbs.rightArm.x = -Math.PI;
            setTimeout(() => { if (!this.isDead) this.limbs.rightArm.x = 0; }, 500);

            if ((window as any).game && (window as any).game.spawnProjectile) {
                const startPos = this.position.clone().add(new THREE.Vector3(0, 0.8 * this.scale, 0));
                let tx, tz;
                if (this.terrain && this.terrain.gridToWorld) {
                    tx = this.terrain.gridToWorld(building.userData.gridX);
                    tz = this.terrain.gridToWorld(building.userData.gridZ);
                } else {
                    tx = building.userData.gridX;
                    tz = building.userData.gridZ;
                }
                const targetPos = new THREE.Vector3(tx, (building.y || 0) + 1, tz);
                (window as any).game.spawnProjectile(startPos, targetPos, 0x00FFFF);
            }
        } else {
            this.limbs.rightArm.x = -Math.PI / 2;
            setTimeout(() => {
                if (!this.isDead) this.limbs.rightArm.x = 0;
            }, 200);
        }

        // NEW: Use Building.js method if available (Encapsulated Logic)
        if (building.takeDamage) {
            const retaliation = building.takeDamage(this.damage || 10);

            // Apply Retaliation
            if (retaliation > 0 && !this.isRanged) {
                this.takeDamage(retaliation, null);
            }

            // Check Destruction (Match Building Logic)
            const isDestroyed = (building.isDestroyed && typeof building.isDestroyed === 'function') ?
                building.isDestroyed() :
                (building.hp <= 0 && (building.type === 'farm' || !building.population || building.population < 1.0));

            console.log(`[Goblin ${this.id}] AttackBuilding Result - BldgType: ${building.type}, HP: ${building.hp}, Pop: ${building.population}, isDestroyed: ${isDestroyed} `);

            if (isDestroyed) {
                this.destroyBuilding(building);
                this.targetBuilding = null;
            } else {
                this.attackCooldown = this.attackRate || 1.5;
            }
            return;
        }

        // --- FALLBACK (Legacy Object) ---
        const damage = this.damage || 10;

        // 1. Ensure HP exists and reduce it
        if (building.userData.hp === undefined) building.userData.hp = 100;
        building.userData.hp -= damage;
        if (building.hp !== undefined) building.hp = building.userData.hp;

        // 2. Population Reduction and Retaliation
        if (building.userData.population > 0) {
            // NERF: Limit population reduction.
            const popDamage = Math.max(1, Math.floor(damage * 0.1));
            building.userData.population -= popDamage;
            if (building.population !== undefined) building.population = building.userData.population;
            console.log(`Goblin Raid: House population reduced. Rem: ${building.userData.population} `);

            // Retaliation
            const typeFactor = (building.userData.type === 'tower') ? 10.0 : 4.0;
            const effectivePop = Math.max(0, building.userData.population);
            const retaliation = Math.floor(effectivePop * typeFactor);

            if (retaliation > 0 && !this.isRanged) {
                this.takeDamage(retaliation, null);
            }
        }

        // 3. Destruction Check
        const finalPop = building.userData.population || 0;
        const finalHp = building.userData.hp || 0;
        const bType = building.userData.type;

        // Rule: HP=0 means destroyed (Farms fix: ignore pop, House fix: require pop=0)
        const isDestroyed = (finalHp <= 0) && (bType === 'farm' || finalPop < 1.0);

        if (isDestroyed) {
            console.log(`Goblin destroyed Building ${bType} (Legacy)!`);
            this.destroyBuilding(building);
            this.targetBuilding = null;
        } else {
            this.attackCooldown = this.attackRate || 1.5;
        }
    }



    destroyBuilding(building) {
        if (!building) return;
        this.terrain.removeBuilding(building);

        // Proper Cleanup for Entities
        if (typeof building.die === 'function') {
            building.die();
        } else {
            // Legacy or Object: Mark as dead for checks
            building.userData.isDead = true;
        }

        console.log(`Goblin ${this.id} destroyed ${building.userData.type} !`);
        if ((window as any).game && (window as any).game.goblinManager) {
            (window as any).game.goblinManager.increasePlunder();
        }
        this.targetBuilding = null;
    }





    die(reason = "Unknown") {
        if (this.isDead) return;
        this.isDead = true;
        this.terrain.unregisterEntity(this);

        if (this.clanId && (window as any).game && (window as any).game.goblinManager) {
            // (window as any).game.goblinManager.reportCasualty(this.clanId, this.gridX, this.gridZ); 
        }

        this.createCross();
        console.log(`Goblin(${this.type}) died.ID:${this.id} `);

        if (this.type === 'king' && (window as any).game) {
            (window as any).game.mana += 500;
            console.log("King Defeated! +500 Mana");

            if (this.terrain && this.terrain.createFloatingText) {
                this.terrain.scene.add(this.terrain.createFloatingText("+500", this.mesh.position, 0xFFFF00));
            }
        }
    }

    // --- COMBAT LOGIC (RESTORED) ---
    // Fixes Passive Goblins

    takeDamage(amount, attacker, isCounter = false) {
        if (this.isDead || this.isFinished) return;

        // --- DEATH COUNTER (User Request) ---
        // If lethal damage AND melee range, trigger retaliation before dying
        if (amount >= this.hp && !isCounter && attacker && attacker.hp > 0) {
            const dist = this.getDistance(attacker.gridX, attacker.gridZ);
            const meleeRange = 2.0; // Wiggle room
            if (dist <= meleeRange) {
                // Must not be ranged unit sniper (attacker.isRanged check?)
                // Attacker might be ranged unit but standing close. 
                // Logic: "Non-ranged combat". If I am melee, I can hit back if close.
                // If I am ranged, I might not counteract efficiently? 
                // User said: "Non-ranged combat... one-pan... always retaliation".
                // Assume if distance is close, it counts as melee engagement.
                console.log(`[Goblin ${this.id}] Death Counter! Hitting ${attacker.id} `);
                // Nerf: 50% damage logic (User Request)
                attacker.takeDamage(this.damage * 0.5, this, true); // isCounter = true
            }
        }

        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
            // XP or Score logic here
        } else {
            // Reaction
            this.lastHitTime = (window as any).game ? (window as any).game.simTotalTimeSec : 0;

            // Retaliate if not already locked on a high prio target
            if (attacker && (!this.targetUnit || Math.random() < 0.3)) {
                if (attacker.hp > 0) {
                    this.targetUnit = attacker;
                    // State machine usually updates on next tick:
                    // GoblinCombat checks target. If we are in Wander, next scan will pick it up?
                    // Or force switch?
                    // Ideally force switch if damaged.
                    if (this.state && this.state.constructor.name !== 'Combat') {
                        this.changeState(new Combat(this));
                    }
                }
            }
        }
    }





    dispose() {
        if (this.crossMesh) {
            this.scene.remove(this.crossMesh);
            this.crossMesh.traverse((child) => {
                const c = child as THREE.Mesh;
                if (c.material) {
                    const mats = Array.isArray(c.material) ? c.material : [c.material];
                    mats.forEach(m => m.dispose());
                }
            });
            this.crossMesh = null;
        }
        this.terrain.unregisterEntity(this);
    }

    createCross() {
        const group = new THREE.Group();
        if (!Goblin.assets.geometries.crossV) return;

        const vMesh = new THREE.Mesh(Goblin.assets.geometries.crossV, Goblin.assets.materials.cross);
        vMesh.position.y = 0.4;
        group.add(vMesh);

        const hMesh = new THREE.Mesh(Goblin.assets.geometries.crossH, Goblin.assets.materials.cross);
        hMesh.position.y = 0.6;
        group.add(hMesh);

        const vPos = this.terrain.getVisualPosition(this.gridX, this.gridZ, true);
        group.position.set(vPos.x, vPos.y + 0.2, vPos.z);

        this.scene.add(group);
        this.crossMesh = group;
        this.deathTimer = 0;

        setTimeout(() => {
            if (this.crossMesh) {
                this.crossMesh.traverse((c: any) => {
                    if (c.isMesh) {
                        if (c.geometry) c.geometry.dispose();
                        if (c.material) {
                            if (Array.isArray(c.material)) c.material.forEach((m: any) => m.dispose());
                            else c.material.dispose();
                        }
                    }
                });
                this.scene.remove(this.crossMesh);
                this.crossMesh = null;
            }
        }, 1500);
    }

    updateDeathAnimation(deltaTime) {
        if (!this.crossMesh) {
            this.isFinished = true;
            return;
        }

        if (isNaN(this.deathTimer)) this.deathTimer = 0;
        const safeDt = (deltaTime > 0) ? deltaTime : 0.016;
        this.deathTimer += safeDt;

        const duration = 1.0;

        if (this.deathTimer >= duration) {
            this.scene.remove(this.crossMesh);

            if (this.terrain && this.terrain.unregisterEntity) {
                this.terrain.unregisterEntity(this);
            }

            this.crossMesh.children.forEach((child: any) => {
                if (child.material) {
                    if (!child.userData.clonedMat) {
                        child.material = child.material.clone();
                        child.userData.clonedMat = true;
                    }
                    child.material.opacity = Math.max(0, 1.0 - (this.deathTimer / duration));
                }
            });

            this.crossMesh.children.forEach((child: any) => {
                if (child.material && child.userData.clonedMat && this.deathTimer >= duration) {
                    if (typeof child.material.dispose === 'function') {
                        child.material.dispose();
                    }
                }
            });
            this.crossMesh = null;
            this.isFinished = true;
        } else {
            this.crossMesh.position.y += deltaTime * 1.0;
            // Progressive Fade
            this.crossMesh.children.forEach((child: any) => {
                if (child.material) {
                    if (!child.userData.clonedMat) {
                        child.material = child.material.clone();
                        child.userData.clonedMat = true;
                    }
                    child.material.opacity = Math.max(0, 1.0 - (this.deathTimer / duration));
                }
            });
        }
    }

    migrate(time) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        const angle = Math.random() * Math.PI * 2;
        const dist = 20 + Math.random() * 20;
        let tx = Math.floor(this.gridX + Math.cos(angle) * dist);
        let tz = Math.floor(this.gridZ + Math.sin(angle) * dist);

        // Wrap
        if (tx < 0) tx += logicalW;
        if (tx >= logicalW) tx -= logicalW;
        if (tz < 0) tz += logicalD;
        if (tz >= logicalD) tz -= logicalD;

        const h = this.terrain.getTileHeight(tx, tz);
        if (h <= 0) tx = (tx + 5) % logicalW;

        console.log(`Goblin ${this.id} attempting migration to ${tx},${tz} `);

        this.migrationTarget = { x: tx, z: tz };
        const moved = this.smartMove(tx, tz, time);

        if (moved) {
            this.action = 'migrating';
        } else {
            console.log(`Goblin ${this.id} migration path blocked.Resetting.`);
            this.migrationTarget = null;
            this.action = 'wandering'; // Reset action
            this.wanderCount = 0; // Reset counter so we don't spam migrate
        }
    }

    tryBuildHut() {
        const x = Math.round(this.gridX);
        const z = Math.round(this.gridZ);
        if (!this.terrain.grid[x] || !this.terrain.grid[x][z]) return false;
        if (this.terrain.grid[x][z].hasBuilding) return false;
        const h = this.terrain.getTileHeight(x, z);
        if (h > 8 || h <= 0) return false;
        const allBuildings = this.terrain.buildings || [];
        const minSpacing = 6.0;
        for (const b of allBuildings) {
            if (b.userData.type === 'goblin_hut') {
                const dx = b.userData.gridX - x;
                const dz = b.userData.gridZ - z;
                if (dx * dx + dz * dz < minSpacing * minSpacing) return false;
            }
        }
        const hut = this.terrain.addBuilding('goblin_hut', x, z);
        if (hut) {
            hut.userData.clanId = this.clanId;
            console.log(`[Goblin] ID:${this.id} built a Hut at ${x},${z} `);
            return true;
        }
        return false;
    }


    // --- PERSISTENCE ---
    serialize() {
        return {
            id: this.id,
            gridX: this.gridX,
            gridZ: this.gridZ,
            type: this.type,
            clanId: this.clanId,
            hp: this.hp,
            maxHp: this.maxHp,
            age: this.age, // FIX: Ensure age is persisted
            lifespan: this.lifespan,
            isDead: this.isDead,
            isFinished: this.isFinished,
            state: this.state ? this.state.constructor.name : 'Wander',
            // Raid Goal Persistence
            raidTargetX: this.raidGoal ? this.raidGoal.x : null,
            raidTargetY: this.raidGoal ? this.raidGoal.y : (this.raidGoal ? (this.raidGoal.z) : null), // Supporting both Y and Z
            raidTargetZ: this.raidGoal ? this.raidGoal.z : null,
            raidTargetTS: this.raidGoal ? this.raidGoal.timestamp : null, // Restoration FIX
            migrationTarget: this.migrationTarget,
            scale: this.scale
        };
    }

    // --- TOOLTIP OVERRIDE ---

    updateCombatLogic(time, deltaTime) {
        // Cooldown Management
        if (this.attackCooldown > 0) this.attackCooldown -= deltaTime;

        // 1. Target Validation
        if (this.targetUnit && this.targetUnit.isDead) this.targetUnit = null;
        if (this.targetBuilding && this.targetBuilding.userData.hp <= 0) this.targetBuilding = null;

        if (!this.targetUnit && !this.targetBuilding) return;

        // 2. Act based on target
        if (this.targetUnit) {
            this.chaseTimer = (this.chaseTimer || 0) + deltaTime;
            if (this.chaseTimer > 10.0) {
                // Give up
                this.targetUnit = null;
                this.chaseTimer = 0;
            } else {
                const moved = this.smartMove(this.targetUnit.gridX, this.targetUnit.gridZ, time);
                if (moved === false) {
                    // Unreachable
                    if (!this.ignoredTargets) this.ignoredTargets = new Map(); // Ensure Map exists
                    this.ignoredTargets.set(this.targetUnit.id, time + 10.0);
                    this.targetUnit = null;
                    this.chaseTimer = 0;
                    return;
                }

                if (!this.targetUnit) return;

                // DYNAMIC RANGE: Use attackRange if set (King: 4.0, Shaman: 8.0) or default 1.8
                const range = this.attackRange || 1.8;
                if (this.getDistance(this.targetUnit.gridX, this.targetUnit.gridZ) <= range) {
                    this.attackTarget(time, deltaTime);
                    this.chaseTimer = 0;
                }
            }
        } else if (this.targetBuilding) {
            const approach = this.getApproachPoint(this.targetBuilding);
            if (!approach) return; // Add Check
            const moved = this.smartMove(approach.x, approach.z, time);

            if (moved === false) {
                this.ignoredTargets.set(this.targetBuilding.id, time + 10.0);
                this.targetBuilding = null;
                return;
            }

            // Building Range: Base Range + Building Radius Allowance
            const range = (this.attackRange || 1.8) + 0.7;
            if (this.getDistanceToBuilding(this.targetBuilding) <= range) {
                this.attackTarget(time, deltaTime);
            }
        }
    }


    static deserialize(data, scene, terrain) {
        // Map Legacy Keys
        const type = data.type || data.t || 'normal';
        const clanId = data.clanId || data.c || 0;
        let raidTarget = null;

        // Legacy RG
        if (data.rg) {
            raidTarget = { x: data.rg.x, z: data.rg.z } as any;
        }
        // Modern Raid Target
        else if (data.raidTargetX !== null && data.raidTargetX !== undefined) {
            // Fix: Add timestamp (defaults to current time or restored value)
            const now = ((window as any).game && (window as any).game.simTotalTimeSec) ? (window as any).game.simTotalTimeSec : 0;
            const ts = (data.raidTargetTS !== undefined) ? data.raidTargetTS : now;
            raidTarget = { x: data.raidTargetX, z: data.raidTargetZ, timestamp: ts } as any;
        }

        const goblin = new Goblin(scene, terrain, data.gridX !== undefined ? data.gridX : data.x, data.gridZ !== undefined ? data.gridZ : data.z, type, clanId, raidTarget);
        goblin.id = (data.id !== undefined) ? Number(data.id) : goblin.id;

        // Restore Stats (Legacy h/m/a/l)
        if (data.hp !== undefined) goblin.hp = data.hp;
        else if (data.h !== undefined) goblin.hp = data.h;

        if (data.maxHp !== undefined) goblin.maxHp = data.maxHp;
        else if (data.m !== undefined) goblin.maxHp = data.m;

        if (data.lifespan !== undefined) goblin.lifespan = data.lifespan;
        else if (data.l !== undefined) goblin.lifespan = data.l;

        if (data.age !== undefined) goblin.age = data.age;
        else if (data.a !== undefined) goblin.age = data.a;

        goblin.isDead = data.isDead || false;
        goblin.isFinished = data.isFinished || false;

        // Restore State Name
        const sName = (data.state || data.s || 'idle').toLowerCase();

        if (sName.includes('raid')) {
            goblin.changeState(new Raid(goblin));
            if (raidTarget) goblin.state.raidGoal = raidTarget;
        } else if (sName.includes('combat') || sName.includes('fight')) {
            goblin.changeState(new Combat(goblin));
        } else if (sName.includes('wander')) {
            goblin.changeState(new Wander(goblin));
        } else if (sName.includes('build')) {
            goblin.changeState(new Build(goblin, data.bx || 0, data.bz || 0));
        } else if (sName.includes('retreat')) {
            goblin.changeState(new Retreat(goblin));
        } else {
            goblin.changeState(new Wander(goblin));
        }

        // Migration
        if (data.migrationTarget || data.mt) goblin.migrationTarget = data.migrationTarget || data.mt;
        if (data.scale) goblin.scale = data.scale;

        return goblin;
    }
}
