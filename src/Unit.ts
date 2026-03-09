import * as THREE from 'three';

import { Actor } from './Actor';
import { Wander, Job, Combat, Sleep } from './ai/states/UnitStates.js';
import { GameConfig } from './config/GameConfig';
import { IAiActor } from './ai/states/IAiActor';

export class Unit extends Actor implements IAiActor {
    static assets: any = {
        geometries: {},
        materials: {},
        textures: {},
        initialized: false
    };
    static initPromise: Promise<void> | null = null;
    static nextId = 0;

    // Properties
    public role: string;
    public isSpecial: boolean;
    public squadId: string | number | null;
    public lastJobResult: string = "None"; // Debug Info


    public lastGridX: number;
    public lastGridZ: number;
    public stagnationTimer: number;
    public buildStagnationCount: number;
    public lastTime: number;
    public lastGatherTime: number;
    public lastHitTime: number = 0;

    public moveInterval: number;
    public huntingCooldown: number;
    public target: any;
    public targetX: number;
    public targetZ: number;

    public wanderCount: number;
    public migrationTarget: any;
    public patrolTarget: any;
    public patrolTimer: number;

    // public ignoredTargets: Map<number | string, number>; // Inherited from Actor as Map<string | number, number>
    public debugFrame: number;

    public isSleeping: boolean = false;
    public isNaval: boolean = false;

    public targetRaidPoint: any | null;
    public lastWaterLogTime?: number; // Added for logging throttle

    // Scan Timer
    public scanTimer: number = 0;
    public invasionTimer: number = 0;

    // Missing Props
    public homeBase: Unit | any | null = null; // Sometimes refers to a Building (Entity), sometimes Unit?
    public residence: any | null = null;
    public xp: number = 0;
    public crossMesh: any;
    public level: number = 1;
    public name: string = "Unit";
    public lastPathAttempt: number = 0;
    public savedHomeBaseX: number = 0;
    public savedHomeBaseZ: number = 0;
    public savedTargetRequestId: number | null = null;
    public migrationTimer: number = 0;
    // public checkStuck: boolean = false; // Removed to avoid conflict with method, or just unused.
    public moisture: number = 100;
    public deathTimer: number = 0;

    static async initAssets(checkYield: any, updateStatus: any) {
        if (Unit.assets.initialized) return Promise.resolve();
        if (Unit.initPromise) return Unit.initPromise;

        Unit.initPromise = (async () => {
            console.log("[Unit] Starting initAssets...");

            // Yield Helper (Force Yield if supported)
            const yieldOp = async (label) => {
                console.log(`[Unit] Yielding: ${label || ''}`);
                if (checkYield) await checkYield(true);
                console.log(`[Unit] Resumed: ${label || ''}`);
            };

            if (updateStatus) updateStatus("Initializing Units (Geometries)...");

            // Geometries
            try {
                console.log("[Unit] Creating Geometries...");
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
            } catch (e) {
                console.error("[Unit] Error creating geometries:", e);
            }

            await yieldOp("After Geometries");
            if (updateStatus) updateStatus("Initializing Units (Hats)...");

            try {
                console.log("[Unit] Creating Hats...");
                // Wizard Hat (Cone + Brim)
                // Brim: Cylinder thin
                const brimGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 16);
                brimGeo.translate(0, 0, 0);
                // Cone
                const coneGeo = new THREE.ConeGeometry(0.15, 0.4, 16);
                coneGeo.translate(0, 0.2, 0);

                const hatGeo = new THREE.ConeGeometry(0.2, 0.5, 16);
                hatGeo.translate(0, 0.25, 0);
                Unit.assets.geometries.wizardHat = hatGeo;

                const hatBrimGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 16);
                Unit.assets.geometries.wizardHatBrim = hatBrimGeo;

                // Job Indicator (!) - Top Cylinder and Bottom Dot
                const indicatorTopGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.25, 8);
                indicatorTopGeo.translate(0, 0.15, 0);
                Unit.assets.geometries.jobIndicatorTop = indicatorTopGeo;

                const indicatorDotGeo = new THREE.SphereGeometry(0.04, 8, 8);
                indicatorDotGeo.translate(0, -0.05, 0);
                Unit.assets.geometries.jobIndicatorDot = indicatorDotGeo;
            } catch (e) { console.error("[Unit] Error creating hats:", e); }

            await yieldOp("After Hats");
            if (updateStatus) updateStatus("Initializing Units (Materials)...");

            // Materials
            try {
                console.log("[Unit] Creating Materials...");
                Unit.assets.materials.skin = new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.8 });
                Unit.assets.materials.clothes = new THREE.MeshStandardMaterial({ color: 0x885533, roughness: 1.0 });
                Unit.assets.materials.tool = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.5 });
                Unit.assets.materials.hat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 1.0 });
                // Wood Material (for Staff/Tools)
                Unit.assets.materials.wood = new THREE.MeshStandardMaterial({ color: 0x5D4037, roughness: 1.0 }); // Dark Brown

                // Knight Materials
                Unit.assets.materials.armor = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.8, roughness: 0.2 });
                Unit.assets.materials.helmet = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.9, roughness: 0.1 });

                // Wizard Materials
                Unit.assets.materials.robe = new THREE.MeshStandardMaterial({ color: 0x444499, roughness: 1.0 });
                Unit.assets.materials.wizardHat = new THREE.MeshStandardMaterial({ color: 0x333388, roughness: 1.0 });

                // New Item Materials
                Unit.assets.materials.highLevelRobe = new THREE.MeshStandardMaterial({ color: 0x880000, roughness: 1.0 });

                // Enemy Faction Materials (Darker / Black-ish)
                Unit.assets.materials.enemySkin = new THREE.MeshStandardMaterial({ color: 0xaa8866, roughness: 0.9 }); // Slightly paler/greyer?
                Unit.assets.materials.enemyClothes = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1.0 }); // Dark Grey
                Unit.assets.materials.enemyArmor = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.3 }); // Black Metal
                Unit.assets.materials.enemyHelmet = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 1.0, roughness: 0.2 }); // Obsidian
                Unit.assets.materials.enemyRobe = new THREE.MeshStandardMaterial({ color: 0x220022, roughness: 1.0 }); // Dark Purple
                Unit.assets.materials.enemyHat = new THREE.MeshStandardMaterial({ color: 0x110011, roughness: 1.0 }); // Dark
            } catch (e) { console.error("[Unit] Error creating materials:", e); }

            await yieldOp("After Materials");

            // Red indicator for (!)
            Unit.assets.materials.redIndicator = new THREE.MeshStandardMaterial({
                color: 0xFF0000,
                emissive: 0xFF0000,
                emissiveIntensity: 1.0,
                roughness: 0.05,
                metalness: 0.5
            });

            // Faces & Textures
            if (updateStatus) updateStatus("Initializing Units (Textures)...");
            try {
                console.log("[Unit] Creating Face Texture...");
                Unit.assets.textures.face = Unit.createFaceTexture();
                Unit.assets.materials.face = new THREE.MeshStandardMaterial({ map: Unit.assets.textures.face, transparent: true });

                await yieldOp("After Face Texture");

                if (updateStatus) updateStatus("Initializing Units (Hair)...");
                console.log("[Unit] Creating Hair Texture...");
                Unit.assets.textures.hair = Unit.createHairTexture();
                // Use Lambert to match body lighting and prevent 'Standard' material darkening
                Unit.assets.materials.hair = new THREE.MeshLambertMaterial({ map: Unit.assets.textures.hair, transparent: true });
            } catch (e) { console.error("[Unit] Error creating textures:", e); }

            Unit.assets.materials.heads = null; // Deprecated (Split meshes)

            Unit.assets.initialized = true;
            console.log("[Unit] initAssets Complete.");
        })();

        return Unit.initPromise;
    }

    static createFaceTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.CanvasTexture(canvas); // Fallback
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
        if (!ctx) return new THREE.CanvasTexture(canvas);
        // Grayscale Noise for Tinting - Use WHITE base to preserve true tint color
        ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, 64, 64); // White Base
        ctx.fillStyle = '#DDDDDD'; // Very Light Grey Noise
        for (let i = 0; i < 40; i++) {
            ctx.fillRect(Math.random() * 60, Math.random() * 60, 4, 4);
        }
        return new THREE.CanvasTexture(canvas);
    }

    constructor(scene: THREE.Scene, terrain: any, x: number, z: number, role: string, isSpecial: boolean = false, squadId: string | number | null = null, faction: string = 'player') {
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
        this.lastGridX = this.gridX;
        this.lastGridZ = this.gridZ;

        console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${role} Pos:${x},${z} Special:${isSpecial}`);

        // Legacy compatibility check (if role arg is boolean)
        let specialFlag = isSpecial;
        if (typeof role === 'boolean') {
            specialFlag = role;
            role = 'worker';
        }

        this.role = role || 'worker';
        this.type = this.role;
        (this as any).role = this.role; // Explicitly expose for tests
        this.isSpecial = specialFlag;
        this.squadId = squadId; // Squad ID for coordinated attacks
        this.faction = faction;

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

        // Stats from Config
        let statConfig = GameConfig.units[this.role];
        if (!statConfig) statConfig = GameConfig.units.worker;

        this.isNaval = statConfig.isNaval || false;

        // Base HP
        let baseHp = GameConfig.units.worker.hp; // Default Base
        if (statConfig.hpMultiplier) baseHp *= statConfig.hpMultiplier;
        else if (statConfig.hp) baseHp = statConfig.hp;

        // Variance
        this.hp = baseHp + Math.floor(Math.random() * 15);

        // Special Unit Handling
        if (this.isSpecial && statConfig.specialMultiplier) {
            const sm = statConfig.specialMultiplier;
            if (sm.hp) this.hp = Math.floor(this.hp * sm.hp);
        }
        this.maxHp = this.hp;

        this.attackCooldown = 0;
        this.attackRate = statConfig.attackRate || 1.0;
        this.attackRange = statConfig.attackRange || 2.0;
        this.isRanged = !!statConfig.isRanged;
        if (statConfig.projectileColor) {
            this.projectileColor = statConfig.projectileColor;
        }

        // Damage
        let baseDamage = GameConfig.units.worker.damage;
        if (statConfig.damageMultiplier) {
            this.damage = Math.floor(baseDamage * statConfig.damageMultiplier);
        } else if (statConfig.damage) {
            this.damage = statConfig.damage;
        } else {
            this.damage = baseDamage;
        }

        if (this.isSpecial && statConfig.specialMultiplier && statConfig.specialMultiplier.damage) {
            this.damage = Math.floor(this.damage * statConfig.specialMultiplier.damage);
        }

        this.detectionProbability = statConfig.detectionProbability !== undefined ? statConfig.detectionProbability : 1.0;

        this.targetGoblin = null;
        this.targetRaidPoint = null; // Fix: Initialize to null
        this.invasionTimer = 0;

        // Lifespan
        // Lifespan
        // Lifespan
        const variance = Math.random() * (statConfig.lifespanVariance || 0);
        let baseLifespan = (statConfig.lifespanBase || 80) + variance;

        if (this.isSpecial && statConfig.specialMultiplier && statConfig.specialMultiplier.lifespan) {
            baseLifespan *= statConfig.specialMultiplier.lifespan;
        }
        this.lifespan = baseLifespan;

        this.age = this.isNaval ? 0 : 20; // Ships start at 0, Humans at 20
        this.isDead = false;
        this.isSleeping = false; // Missing flag init?


        this.updatePosition();

        this.moveTimer = 0;
        this.moveDuration = 0.8;
        this.moveStartTime = 0;

        // Blacklist for failed paths
        // this.ignoredTargets = new Map(); // id -> expiryTime // Removed: Inherited from Actor
        // Action Timers
        this.lastTime = 0;
        // Reduced interval for more active units (2s - 5s)
        this.moveInterval = 2.0 + Math.random() * 3.0;
        if (this.role === 'knight' || this.role === 'wizard') {
            this.moveInterval = 0; // Soldiers act immediately on spawn
        }

        this.stagnationTimer = 0;
        this.huntingCooldown = 0;
        this.target = null; // Assuming 'Target' was a typo for 'this.target'

        // Animation state
        this.targetX = 0;
        this.targetZ = 0;

        // Initialize State Machine
        // Default to WanderState (which handles Idle/Wander/Sleep/Combat transitions)
        if (typeof Wander !== 'undefined' && Wander !== null) {
            this.changeState(new Wander(this));
        } else {
            console.warn(`[Unit ${this.id}] Wander is undefined!`);
        }
        // If UnitStates.js is circular dependency, we might need a lazy init or check.
        // But for now, assuming import is available.
        // Actually, Unit.js imports Wander? Let's check imports first.
        // If imports are missing, we add them.
        // See step 4 for import check.

        // this.moveStartTime = 0; // Already defined above
        // this.moveDuration = 1000; // Already defined above

        // Register in Spatial Grid is handled by Entity constructor
        console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${this.role} Pos:${this.gridX},${this.gridZ}`);

        this.wanderCount = 0;
        this.migrationTarget = null;
        this.patrolTarget = null;
        this.patrolTimer = 0;

        // Target Ignoring Logic (Replaces global cooldown)
        // this.ignoredTargets = new Map(); // id -> timestamp until ignored // Removed: Inherited from Actor
        this.debugFrame = 0;
        console.log(`[UnitCore.js] Unit Construction Finished ID:${this.id}`);
    }

    // Movement Speed Logic
    startMove(targetX, targetZ, startTime) {
        // Base call to setup movement state (but we overwrite duration)
        super.startMove(targetX, targetZ, startTime);

        // Calculate Terrain-Based Speed
        // FIX: Use Interpolated Height for precise slope detection
        let currentH = 0;
        let targetH = 0;
        if (this.terrain.getInterpolatedHeight) {
            currentH = this.terrain.getInterpolatedHeight(this.gridX, this.gridZ);
            targetH = this.terrain.getInterpolatedHeight(targetX, targetZ);
        } else if (this.terrain.getTileHeight) {
            currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);
            targetH = this.terrain.getTileHeight(targetX, targetZ);
        }

        // Safety check for terrain grid access
        let targetM = 0.5;
        if (this.terrain.grid && this.terrain.grid[targetX] && this.terrain.grid[targetX][targetZ]) {
            targetM = this.terrain.grid[targetX][targetZ].moisture || 0.5;
        }

        const heightDiff = Math.abs(targetH - currentH);

        // Default Duration
        let duration = 0.8; // Base Speed

        // 1. Rock Penalty (High Altitude)
        if (targetH > 9.0) {
            duration = 6.0; // Very Slow
        }
        // 2. Slope Penalty (Climbing/Descending steep)
        // FIX: Reduction from 0.5 to 0.1 to catch sub-tile slopes and match Goblins
        else if (heightDiff > 0.1) {
            duration = 3.0; // Slope
        }
        // 3. Swamp Penalty (High Moisture)
        else if (targetM > 0.6) {
            duration = 2.0; // Swamp
        }

        // SCALING FIX: Mid-move updates
        // If startGridX is interpolated (from super.startMove), scale duration by remaining distance logic.
        // Base duration assumes full tile traversal (from gridX to target).
        const fullDist = Math.sqrt(Math.pow(targetX - this.gridX, 2) + Math.pow(targetZ - this.gridZ, 2));
        const actualDist = Math.sqrt(Math.pow(targetX - this.startGridX, 2) + Math.pow(targetZ - this.startGridZ, 2));

        if (fullDist > 0.001) {
            const ratio = actualDist / fullDist;
            // Clamp ratio to valid range (0.01 to 1.5?) 
            // 1.5 allows for slight overshoot correction without massive slow down.
            if (ratio < 1.0) {
                duration *= ratio;
            }
        }

        this.moveDuration = duration;
    }

    public takeDamage(amount: number, attacker: any = null, isCounter: boolean = false) {
        super.takeDamage(amount, attacker, isCounter);

        if (!this.isDead) {
            // Hit Flash / Reaction
            this.lastHitTime = this.simTime || 0;
        } else {
            if (attacker && attacker.increasePlunder) attacker.increasePlunder(); // Goblin reward
        }
    }

    die(reason?: string) {
        if (this.isDead) return;
        super.die(); // Sets isDead = true and hides mesh

        console.log(`Unit ${this.id} (${this.role}) DIED${reason ? ` (${reason})` : ''}. R.I.P.`);

        // Release any held job
        const g = this.game || (window as any).game;
        if (this.targetRequest && g) {
            console.log(`[Unit ${this.id}] Releasing request via ${g === this.game ? 'this.game' : '(window as any).game'}`);
            g.releaseRequest(this, this.targetRequest);
            this.targetRequest = null;
        }

        if (this.terrain && this.terrain.unregisterEntity) {
            this.terrain.unregisterEntity(this);
        }

        this.createCross();
    }




    debugGetAge() {
        return "DEBUG_AGE_" + this.age;
    }


    getDefaultState() {
        const sName = this.role.toLowerCase(); // Use role for default state logic
        if (sName.includes('wander')) return new Wander(this);
        if (sName.includes('job')) return new Job(this);
        if (sName.includes('combat')) return new Combat(this);
        if (sName.includes('sleep')) return new Sleep(this);
        return new Wander(this);
    }







    checkSelfDefense(passedGoblins: any[] | null = null, forceScan: boolean = false, passedUnits: any[] | null = null, passedBuildings: any[] | null = null) {
        if (this.isDead || this.isFinished) return false;

        // 1. Scan (calls Actor base)
        super.checkSelfDefense(passedGoblins, forceScan, passedUnits, passedBuildings);

        // 2. State Transition
        const hasEnemy = !!(this.targetGoblin || this.targetBuilding || this.targetUnit);
        if (hasEnemy && !(this.state instanceof Combat)) {
            this.changeState(new Combat(this));
        }

        return hasEnemy;
    }

    findNextEnemy() {
        return this.checkSelfDefense(null, true);
    }

    findTargetGoblin(goblins: any[]) {
        return this.checkSelfDefense(goblins, true);
    }

    updateCombatLogic(time: number, deltaTime: number) {
        return;
    }


    findTargetBuilding(range?: number) {
        if (!this.terrain || !this.terrain.buildings) return;
        const role = this.role || (this as any).type;
        let scanRange = (range !== undefined) ? range : 20;
        // Migration tests expect worker scan range to be 10 for buildings
        if (role === 'worker' && range === undefined) scanRange = 10;

        const found = this.terrain.findBestTarget('building', this.gridX, this.gridZ, scanRange, (b, dist) => {
            if (!b.userData || b.userData.hp <= 0) return Infinity;
            if (b.userData.faction === this.faction) return Infinity;

            const bType = b.userData.type;
            if (role === 'worker' && bType !== 'goblin_hut' && bType !== 'cave') return Infinity;

            return dist;
        }, this.terrain.buildings);

        if (found) {
            this.targetBuilding = found;
            this.reportEnemy(found);
        }
    }

    reportEnemy(target: any) {
        if (!target) return;

        const x = target.gridX;
        const z = target.gridZ;

        // 1. Report to Squad (Priority)
        if (this.squadId && (window as any).game) {
            (window as any).game.reportSquadTarget(this.squadId, x, z);
        } else if ((window as any).game) {
            // If no squad, report directly to Global
            (window as any).game.reportGlobalBattle(x, z);
        }

        // 2. Report to Global Memory (Legacy/Freelancer backup)
        // This helps units without squads or if squad logic fails
        if (this.game && this.game.battleMemory) {
            this.game.battleMemory.reportRaid(x, z, (this.game.simTotalTimeSec || 0));
        }
    }

    findRaidTarget(): boolean {
        // PRIORITY 1: Check Squad Orders
        if (this.squadId && (window as any).game) {
            const squad = (window as any).game.getSquad(this.squadId);
            if (squad && squad.target) {
                // Use (window as any).game.simTotalTimeSec for consistency (Seconds)
                // squad.target.time is expected to be in seconds from Game.js
                const now = (window as any).game.simTotalTimeSec || 0;
                const age = now - squad.target.time;

                // Debug Log for Stagnation
                // if (Math.random() < 0.05 && this.role === 'knight') { // Removed debug log
                //     const d = this.getDistance(squad.target.x, squad.target.z); // Removed debug log
                //     console.log(`[Unit ${this.id} SquadDebug] ID:${this.squadId} Target:${squad.target.x},${squad.target.z} Dist:${d.toFixed(1)} Age:${age.toFixed(1)}s Reachable:${this.isReachable(squad.target.x, squad.target.z)} `); // Removed debug log
                // }

                if (age < 30) { // Valid for 30s
                    // Check if close enough to be "arrived" (to stop jitter)
                    const d = this.getDistance(squad.target.x, squad.target.z);

                    // HYSTERESIS:
                    // Entry Threshold: 2.0 (Move closer)
                    // Exit Threshold: 1.5 (Stop moving if already there)
                    let threshold = 2.0;
                    if (this.targetRaidPoint && this.targetRaidPoint.x === squad.target.x && this.targetRaidPoint.z === squad.target.z) {
                        threshold = 1.5;
                    }

                    if (d > threshold) {
                        // Check reachability
                        if (this.isReachable(squad.target.x, squad.target.z)) {
                            this.targetRaidPoint = { x: squad.target.x, z: squad.target.z };
                            return true;
                        } else {
                            // UNREACHABLE? Trying Proxy Target!
                            // If target is in another region (e.g. across water), find closest point in MY region.
                            const myCell = this.terrain.grid[this.gridX][this.gridZ];
                            if (myCell && myCell.regionId > 0) {
                                const proxy = this.terrain.findClosestReachablePoint(squad.target.x, squad.target.z, myCell.regionId);
                                if (proxy) {
                                    // console.log(`[Unit ${this.id}] Squad Target Unreachable. Moving to Proxy: ${proxy.x},${proxy.z}`);
                                    this.targetRaidPoint = { x: proxy.x, z: proxy.z };
                                    return true;
                                }
                            }
                        }
                    } else {
                        // Arrived: Clear target to stop "Patrolling" state and allow Idle/Wander
                        if (this.targetRaidPoint && this.targetRaidPoint.x === squad.target.x && this.targetRaidPoint.z === squad.target.z) {
                            this.targetRaidPoint = null;
                        }
                    }
                }
            }
        }

        // PRIORITY 2: Total Mobilization (Global Hotspots)
        // Only for Combat Units
        if ((this.role === 'knight' || this.role === 'wizard') && (window as any).game && (window as any).game.battleHotspots && (window as any).game.battleHotspots.length > 0) {
            const now = (window as any).game.simTotalTimeSec || 0;
            // Find closest reachable hotspot
            let bestSpot: { x: number, z: number } | null = null;
            let minScore = Infinity;

            for (const spot of (window as any).game.battleHotspots) {
                if (now - spot.time > 30) continue; // Skip old (30s)

                let targetX = spot.x;
                let targetZ = spot.z;
                let d = this.getDistance(targetX, targetZ);

                // Check Region & Proxy Logic
                if (!this.isReachable(targetX, targetZ)) {
                    // Try Proxy
                    let proxyFound = false;
                    const myCell = this.terrain.grid[this.gridX][this.gridZ];
                    if (myCell && myCell.regionId > 0) {
                        const proxy = this.terrain.findClosestReachablePoint(targetX, targetZ, myCell.regionId);
                        if (proxy) {
                            targetX = proxy.x;
                            targetZ = proxy.z;
                            d = this.getDistance(targetX, targetZ);
                            proxyFound = true;
                        }
                    }
                    if (!proxyFound) {
                        continue; // Truly unreachable
                    }
                }

                if (d < 2.0) continue; // Already there

                // HYSTERESIS: Stickiness for current target
                let score = d;
                if (this.targetRaidPoint) {
                    const dx = this.targetRaidPoint.x - targetX;
                    const dz = this.targetRaidPoint.z - targetZ;
                    // If target is effectively the same as current, give it a big bonus
                    if (Math.abs(dx) < 1.0 && Math.abs(dz) < 1.0) {
                        score -= 15.0;
                    }
                }

                if (score < minScore) {
                    minScore = score;
                    bestSpot = { x: targetX, z: targetZ };
                }
            }

            if (bestSpot) {
                this.targetRaidPoint = { x: bestSpot.x, z: bestSpot.z };
                return true;
            }
        }

        // PRIORITY 3: Global Memory (Legacy/Fallback)
        let memories: any[] = [];
        const currentTime = (this.game) ? this.game.simTotalTimeSec : 0;

        if (this.game && this.game.battleMemory) {
            // WORKER FIX: Workers should NOT listen to global battle calls
            if (this.role !== 'worker') {
                memories = this.game.battleMemory.getPriorities(currentTime);
            }
        }

        if (!memories || memories.length === 0) {
            return false;
        }

        let nearest: { x: number, z: number } | null = null;
        let minScore = Infinity;

        memories.forEach(p => {
            let targetX = p.x;
            let targetZ = p.z;
            let dist = this.getDistance(targetX, targetZ);

            // HUGE CHANGE: Do not target points we are already at!
            // Legacy check was < 8.0, but if we use Proxy, we might be AT proxy.
            if (dist < 4.0) return;

            // Check ignore list by coord (Removed: incompatible with Set<number>)
            // if (this.ignoredTargets && this.ignoredTargets.has(`${p.x},${p.z}`)) return;

            // REGION CHECK (Added by User Request)
            // Ensure the raid point is reachable from current position
            if (this.terrain.grid) {
                const W = this.terrain.logicalWidth || 80;
                const D = this.terrain.logicalDepth || 80;

                // Safe Wrap for Grid Access
                let px = Math.round(targetX);
                let pz = Math.round(targetZ);
                px = ((px % W) + W) % W;
                pz = ((pz % D) + D) % D;

                const mCell = this.terrain.grid[this.gridX][this.gridZ];
                const tCell = (this.terrain.grid[px]) ? this.terrain.grid[px][pz] : null;

                if (mCell && tCell && mCell.regionId !== tCell.regionId && mCell.regionId > 0 && tCell.regionId > 0) {
                    // Try Proxy Logic Here Too
                    const proxy = this.terrain.findClosestReachablePoint(targetX, targetZ, mCell.regionId);
                    if (proxy) {
                        targetX = proxy.x;
                        targetZ = proxy.z;
                        dist = this.getDistance(targetX, targetZ);
                    } else {
                        return; // Skip unreachable island
                    }
                }
            }

            // HYSTERESIS: Stickiness
            let score = dist;
            if (this.targetRaidPoint) {
                const dx = this.targetRaidPoint.x - targetX;
                const dz = this.targetRaidPoint.z - targetZ;
                if (Math.abs(dx) < 1.0 && Math.abs(dz) < 1.0) {
                    score -= 15.0;
                }
            }

            if (score < minScore) {
                minScore = score;
                nearest = { x: targetX, z: targetZ };
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

        // 1. Priority: Go Home (Source Building)
        if (this.homeBase) {
            const b = this.homeBase;
            const isAlive = (b.userData && b.userData.hp > 0 && !b.isDestroyed?.());

            if (isAlive) {
                // Check Reachability
                if (this.isReachable(b.gridX, b.gridZ)) {
                    // Check Capacity? (Optional, maybe crowd into home is okay)
                    return b;
                }
            }
        }

        let nearest = null;
        let minDist = Infinity;

        // Optimization: Spiral Search or Grid Search instead of full list?
        // Full list is okay for < 100 buildings.

        for (const b of this.terrain.buildings) {
            // Basic Validity
            if (!b.userData || b.userData.hp <= 0) continue;
            if (b.isDestroyed && b.isDestroyed()) continue;

            // Type Check
            if (b.type !== 'house' && b.type !== 'castle' && b.type !== 'tower' && b.type !== 'barracks') continue;
            // Only Workers/Citizens hide in Houses. Soldiers might garrison in Towers/Barracks?
            // For now, allow all shelters.

            // Check ignore
            if (this.ignoredTargets && (this.ignoredTargets.get(b.id) || 0) > this.simTime) continue;

            // Faction Check (Strict)
            if (b.userData.faction && b.userData.faction !== this.faction) {
                if (b.userData.faction !== 'neutral') continue;
            }

            // Reachability Check (Expensive but necessary to prevent stuck units)
            // Perform distance check *first* to avoid expensive A* on far targets
            const d = this.getDistance(b.gridX, b.gridZ);
            if (d < minDist) {
                if (this.isReachable(b.gridX, b.gridZ)) {
                    minDist = d;
                    nearest = b;
                }
            }
        }
        return nearest;
    }



    checkArrivalAtRaidPoint() {
        if (!this.targetRaidPoint) return;
        const dist = this.getDistance(this.targetRaidPoint.x, this.targetRaidPoint.z);
        if (dist <= 2.0) { // Standardized to 2.0 (was 3.0)
            // console.log(`[Unit ${this.id}] Arrived at Raid Point. Scanning...`); // Removed debug log
            this.findNextEnemy();
            // If search did not lock onto a target, clear the raid point to prevent stuck state
            if (!this.targetGoblin && !this.targetBuilding) {
                // console.log(`[Unit ${this.id}] Nothing found at Raid Point. Clearing Shared Memory.`); // Removed debug log

                // Clear from Shared Memory (Global or Squad)
                if (this.homeBase && this.homeBase.userData && this.homeBase.userData.memory) {
                    this.homeBase.userData.memory.reportClear(this.targetRaidPoint.x, this.targetRaidPoint.z);
                } else if (this.game && this.game.battleMemory) {
                    this.game.battleMemory.reportClear(this.targetRaidPoint.x, this.targetRaidPoint.z);
                }

                this.targetRaidPoint = null;
            }
        }
    }





    patrol(time: number) {
        // IMPROVEMENT: Use persistent patrol target to prevent wandering

        // 1. Check if we already have a patrol target
        if (this.patrolTarget) {
            const dist = this.getDistance(this.patrolTarget.x, this.patrolTarget.z);
            if (dist < 3.0) {
                // Arrived. Chill for a bit, then pick new.
                this.patrolTimer = (this.patrolTimer || 0) + 1;
                // Arrived. Chill for a bit, then pick new.
                this.patrolTimer = (this.patrolTimer || 0) + 1;

                // Check if target request is recently completed
                if (this.targetRequest && this.targetRequest.completedAt && (this.game.simTotalTimeSec || 0) - (this.targetRequest.completedAt || 0) < 10) return; // Wait 10s before reuse
                // If waited long enough, pick new
                if (this.patrolTimer > 100) { // ~1.5s - 3s
                    this.patrolTarget = null;
                    this.patrolTimer = 0;
                } else {
                    // Just idle or look around
                    if (Math.random() < 0.05) this.moveRandomly(time);
                    return;
                }
            } else {
                // Keep moving to target
                this.triggerMove(this.patrolTarget.x, this.patrolTarget.z, time);
                return;
            }
        }

        // 2. Pick new target based on Role (Biome-seeking)
        let foundBiome = false;
        let bestEntity: any = null;

        if (this.role === 'fisher' || this.role === 'hunter') {
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            // PRIORITY: Find Active Entities (Fish/Sheep)
            let minDist = 40.0; // Searching Range

            if ((window as any).game) {
                let targets: any[] = [];
                if (this.role === 'fisher' && (window as any).game.fishManager) {
                    targets = (window as any).game.fishManager.fishes;
                } else if (this.role === 'hunter' && (window as any).game.sheepManager) {
                    targets = (window as any).game.sheepManager.sheeps;
                }

                if (targets && targets.length > 0) {
                    for (const t of targets) {
                        if (t.isDead) continue; // Skip ghost entities
                        const d = this.getDistance(t.gridX, t.gridZ);
                        if (d < minDist) {
                            minDist = d;
                            bestEntity = t;
                        }
                    }
                }
            }

            if (bestEntity) {
                // If Fisher, target LAND near fish. If Hunter, target Sheep directly.
                let tx = bestEntity.gridX;
                let tz = bestEntity.gridZ;
                let validParams = false;

                if (this.role === 'fisher') {
                    // Find neighbor land
                    const neighbors = [
                        { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 },
                        { x: 1, z: 1 }, { x: -1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: -1 }
                    ];

                    let bestLand: { x: number, z: number } | null = null;
                    let bestLandDist = 999;

                    for (const n of neighbors) {
                        let lx = (tx + n.x + logicalW) % logicalW;
                        let lz = (tz + n.z + logicalD) % logicalD;
                        const h = this.terrain.getTileHeight(lx, lz);

                        if (h > 0) { // It's Land
                            validParams = true;
                            // Fisher needs to be on land
                            if (!bestLand) bestLand = { x: lx, z: lz };
                        }
                    }

                    if (bestLand) {
                        tx = bestLand.x;
                        tz = bestLand.z;
                        validParams = true;
                    }
                } else {
                    // Hunter
                    validParams = true;
                }

                if (validParams) {
                    this.patrolTarget = { x: tx, z: tz };
                    this.patrolTimer = 0;
                    this.triggerMove(tx, tz, time);
                    foundBiome = true;
                }
            }

            // FALLBACK: Scan for Biome if no entity found
            if (!foundBiome) {
                // Scan larger radius for suitable terrain
                const searchRadius = 30;
                const attempts = 20;

                for (let i = 0; i < attempts; i++) {
                    const ox = Math.floor(Math.random() * (searchRadius * 2 + 1)) - searchRadius;
                    const oz = Math.floor(Math.random() * (searchRadius * 2 + 1)) - searchRadius;

                    let nx = (this.gridX + ox % logicalW + logicalW) % logicalW;
                    let nz = (this.gridZ + oz % logicalD + logicalD) % logicalD;

                    const h = this.terrain.getTileHeight(nx, nz);
                    let suitable = false;

                    if (this.role === 'fisher' && h <= 0) {
                        suitable = true;
                    } else if (this.role === 'hunter' && h > 4 && h <= 8) {
                        suitable = true;
                    }

                    if (suitable) {
                        if (h <= 0) {
                            // Water correction logic if needed
                            const neighbors = [
                                { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }
                            ];
                            for (const n of neighbors) {
                                let lx = (nx + n.x + logicalW) % logicalW;
                                let lz = (nz + n.z + logicalD) % logicalD;
                                if (this.terrain.getTileHeight(lx, lz) > 0) {
                                    nx = lx;
                                    nz = lz;
                                    break;
                                }
                            }
                            if (this.terrain.getTileHeight(nx, nz) <= 0) suitable = false;
                        }

                        if (suitable) {
                            this.patrolTarget = { x: nx, z: nz };
                            this.patrolTimer = 0;
                            this.triggerMove(nx, nz, time);
                            foundBiome = true;
                            break;
                        }
                    }
                }
            }
        }

        if (foundBiome) return;

        // 3. Fallback: Pick random building
        if (this.terrain.buildings && this.terrain.buildings.length > 0) {
            const r = Math.floor(Math.random() * this.terrain.buildings.length);
            const b = this.terrain.buildings[r];

            this.patrolTarget = { x: b.gridX, z: b.gridZ };
            this.patrolTimer = 0;

            this.triggerMove(b.gridX, b.gridZ, time);
        } else {
            // Fallback if no buildings
            this.moveRandomly(time);
        }
    }

    // updateMovement is inherited from Entity.
    // We implement hooks for Unit-specific logic.

    onMoveFinished(time: number) {
        // Reset limbs
        this.limbs.leftArm.x = 0;
        this.limbs.rightArm.x = 0;
        this.limbs.leftLeg.x = 0;
        this.limbs.rightLeg.x = 0;

        const built = this.tryBuildStructure(time);
        if (built) {
            // If we successfully built something, STOP MIGRATING. We found a home/job.
            if (this.action === 'Migrating') {
                // console.log(`Unit ${this.id} built structure during migration. Stopping.`); // Removed debug log
                this.action = 'Idle';
                this.migrationTarget = null;
                this.migrationTimer = 0;
            } else if (this.action === 'Going to Work' || this.action === 'Approaching Job') {
                // Keep the job label if we just arrived/built at job site
            }
            this.buildStagnationCount = 0;
        } else {
            // Check based on Target presence, not Action string (since executeMove overwrites action)
            if (this.migrationTarget) {
                if (this.role === 'worker') {
                    // Workers searched for land but failed to build. Try nearby.
                    // console.log(`Unit ${this.id} (Worker) migration target invalid for build. Searching nearby...`); // Removed debug log
                    this.moveRandomly(time);

                    // SAFETY: If moveRandomly failed to trigger move (stuck in corner), FORCE IDLE.
                    if (!this.isMoving) {
                        this.action = 'Idle';
                    }
                } else {
                    // Knights/Wizards just finished their "Migration" travel. 
                    // They don't build. Just stop here.
                    // console.log(`Unit ${this.id} (${this.role}) finished migrating. Resuming Idle.`); // Removed debug log
                    this.action = 'Idle';
                    this.migrationTarget = null;
                }
                this.buildStagnationCount = 0;
            } else if (!this.targetRequest) {
                // FIXED: Only count stagnation if we have NO active job.
                // Otherwise moving across large distances for a job triggers accidental migration.
                this.buildStagnationCount = (this.buildStagnationCount || 0) + 1;
                if (this.buildStagnationCount > 5) {
                    // console.log(`Unit ${this.id} stuck/stagnant (No Build). Migrating...`); // Removed debug log
                    this.migrate(time);
                    this.buildStagnationCount = 0;
                }
            } else {
                // Have job, reset stagnation
                this.buildStagnationCount = 0;
            }
        }

        // Critical: Call base class to handle Path Following recursion (smartMove next node)
        super.onMoveFinished(time);
    }

    onMoveStep(progress: number) {
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
        // Use Actor.smartMove for robust movement (Pathing + Linear Fallback + Region Check)
        // Note: smartMove handles wrapping, reachability, and A* pathfinding
        const moved = this.smartMove(tx, tz, time);

        if (moved) {
            // Success
            this.stuckCount = 0;
        } else {
            // Blocked / Failed
            // Unit specific stuck handling
            // FIX: Do not count as stuck if we are waiting for async pathfinding or throttled
            if (!this.isMoving && !this.isPathfinding && !this.isPathfindingThrottled) {
                this.stuckCount = (this.stuckCount || 0) + 1;
                // Only give up after significant failures (e.g. 60 frames of blockage ~1 sec)
                // This prevents giving up on transient collisions, but ensures we eventually drop unreachable targets.
                if (this.stuckCount > 60) {
                    this.handleStuck();
                }
            }
        }
        return moved;
    }

    handleStuck() {
        // Give up logic
        const time = ((window as any).game) ? (window as any).game.gameTotalTime : 0;
        console.log(`Unit ${this.id} stuck. Handling stuck state...`);

        this.path = null;

        // Ignore current targets
        // The Actor base class's ignoredTargets is a Map<string | number, number>, so we can add IDs.
        if (this.targetUnit) {
            this.ignoredTargets.set(this.targetUnit.id, time + 15.0);
            this.targetUnit = null;
        }
        if (this.targetBuilding) {
            this.ignoredTargets.set(this.targetBuilding.id, time + 15.0);
            this.targetBuilding = null;
        }
        // targetRaidPoint does not have an ID, so it cannot be added to ignoredTargets.
        this.targetRaidPoint = null;


        this.stuckCount = 0;
        this.action = "Idle";
        this.isMoving = false;

        // Revert to Random Move or Idle
        console.warn(`[Unit ${this.id}] Stuck Recovery triggered. Resetting to Idle.`);
    }

    updatePosition() {
        if (!this.terrain) return;
        // Use the robust base implementation instead of strict getVisualPosition
        this.getPositionForGrid(this.gridX, this.gridZ, this.position);

        if (this.isNaval) {
            this.position.y = 0; // Ships stay at sea level
        }

        if (this.mesh) {
            this.mesh.position.copy(this.position);
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

        if (this.isNaval) {
            if (targetHeight > 0) return false; // Ships cannot move on land
        } else {
            if (targetHeight <= 0) return false; // Land units cannot move on water
        }
        if (targetHeight > 8) {
            // console.log(`[Unit ${this.id}] Moving onto Rock at ${checkX},${checkZ} H:${targetHeight} (Speed Penalty)`); // Removed debug log
            // return false; // Rock - REVERTED per User Request (Slow movement)
        }

        // Slope check
        // Aligned with pathfindingWorker (3.0)
        if (Math.abs(targetHeight - currentHeight) > 3.0) {
            // console.log(`[Unit ${this.id}] Blocked by Slope at ${checkX},${checkZ} H:${currentHeight}->${targetHeight}`); // Removed debug log
            return false;
        }
        // console.log(`[Unit ${this.id}] canMoveTo(${checkX},${checkZ}) OK`); // Removed debug log

        // console.log(`[Unit ${this.id}] canMoveTo(${checkX},${checkZ}) checking grid...`); // Removed debug log

        // Building check
        if (!this.terrain || !this.terrain.grid) return true;
        const col = this.terrain.grid[checkX];
        if (!col) return true;
        const cell = col[checkZ];
        if (!cell) return true;
        if (cell.hasBuilding && cell.building) {
            // User Request: Allow passing through buildings
            return true;
        }
        // Implicit allow if no building
        return true;
    }

    /**
     * @override Standard Entity Update
     * Consolidates Movement, Aging, and Logic for tests and standard usage.
     */
    override update(time: number, deltaTime: number) {
        if (this.isDead) return;

        // 1. Core Actor Updates (Movement + call to updateLogic)
        super.update(time, deltaTime);

        // 2. Lifecycle Updates (Drowning, Aging, Regen) 
        // -> Moved into updateLogic() to prevent double call when Game.ts triggers both.
    }

    updateLogic(time: number, deltaTime: number, isNight: boolean = false, units: any[] = [], buildings: any[] = [], goblins: any[] = []) {
        if (this.isFinished) return;

        // 1. Death handling
        if (this.isDead) {
            if (this.updateDeathAnimation) this.updateDeathAnimation(deltaTime);
            return;
        }

        this.simTime = time;

        try {
            // 2. Call Actor base logic (Cooldowns, Aging, Drowning, and Combat Scanning)
            super.updateLogic(time, deltaTime, isNight, units, buildings, goblins);

            // 3. Passive Actions (Resource Gathering)
            if (this.role === 'fisher' || this.role === 'hunter' || this.role === 'warship') {
                this.gatherResources(time);
            }

            // 4. Visibility Sync
            if (this.mesh && !this.isDead) {
                const visible = !this.isSleeping;
                if (this.mesh.visible !== visible) this.mesh.visible = visible;
            }

        } catch (e) {
            console.error(`[Unit Error] ID ${this.id} in updateLogic:`, e);
        }
    }

    // ...



    gatherResources(time: number) {
        if (!this.game || !this.terrain) return;

        const cooldown = 5.0; // 5 seconds
        if (this.lastGatherTime && time - this.lastGatherTime < cooldown) return;

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let foundWater = false;
        let foundForest = false;

        const sampleOffsets: { x: number, z: number }[] = [];
        for (let r = 1; r <= 6; r++) {
            sampleOffsets.push({ x: r, z: 0 }, { x: -r, z: 0 }, { x: 0, z: r }, { x: 0, z: -r });
            sampleOffsets.push({ x: r, z: r }, { x: -r, z: r }, { x: r, z: -r }, { x: -r, z: -r });
        }

        for (const off of sampleOffsets) {
            let nx = Math.floor(this.gridX + off.x);
            let nz = Math.floor(this.gridZ + off.z);
            nx = (nx % logicalW + logicalW) % logicalW;
            nz = (nz % logicalD + logicalD) % logicalD;

            const h = this.terrain.getTileHeight(nx, nz);
            const m = this.terrain.getMoisture ? this.terrain.getMoisture(nx, nz) : 0.5;

            if (h <= 0) foundWater = true;
            else if (m > 0.7) foundForest = true;

            if (foundWater && foundForest) break;
        }

        if (this.game.resources) {
            const game = this.game;
            const economy = (GameConfig.economy && GameConfig.economy.food);

            // 1. Interference Check
            let isInterfered = false;
            if (foundWater && (this.role === 'fisher' || this.role === 'warship')) {
                const scanRange = 20.0;
                if (game.units) {
                    for (const u of game.units) {
                        if (u.isDead) continue;
                        if (u.faction !== this.faction && u.role === 'warship') {
                            const dist = this.getDistance(u.gridX, u.gridZ);
                            if (dist < scanRange) {
                                isInterfered = true;
                                break;
                            }
                        }
                    }
                }
            }

            // 2. Resource Addition (Only for Player faction)
            if (this.faction === 'player') {
                if (foundWater && (this.role === 'fisher' || this.role === 'warship')) {
                    if (!isInterfered) {
                        const amount = (economy && economy.fisherAmount) || 1.0;
                        const multiplier = (this.role === 'warship') ? 2.0 : 1.0;
                        game.resources.fish = (game.resources.fish || 0) + (amount * multiplier);
                        game.resources.food = (game.resources.food || 0) + (amount * multiplier);
                        this.lastGatherTime = time;
                    } else {
                        if (this.id === 0 || Math.random() < 0.05) {
                            console.log(`[Unit ${this.id}] Fishing interfered by enemy warship!`);
                        }
                    }
                }
                if (foundForest && this.role === 'hunter') {
                    const amount = (economy && economy.hunterAmount) || 4.0;
                    game.resources.meat = (game.resources.meat || 0) + amount;
                    game.resources.food = (game.resources.food || 0) + amount;
                    this.lastGatherTime = time;
                }
            }
        }
    }

    moveRandomly(time) {
        // Region-based Exploration (Replacing old random walk)
        this.clearPath(); // FIX: Prevent "Path Invalidated" warning by explicitly clearing old path before wandering

        // 1. Get Current Region
        const currentRegion = this.terrain.getRegion(this.gridX, this.gridZ);

        // 2. Determine Patrol Radius (Larger for Knights and Warships)
        const radius = (this.role === 'knight' || this.isNaval) ? 30 : 15;

        // 3. Find Valid Point in SAME Region
        const target = this.terrain.getRandomPointInRegion(currentRegion, this.gridX, this.gridZ, radius);

        if (target) {
            const h = this.terrain.getTileHeight(target.x, target.z);
            // Height verification: Land units (h > 0), Naval units (h <= 0)
            const isLandTarget = h > 0;
            const isNavalTarget = h <= 0;
            const canWander = this.isNaval ? isNavalTarget : isLandTarget;

            if (canWander) {
                this.smartMove(target.x, target.z, time);
                return;
            }
        }

        // 4. Fallback: If region random point fails (e.g. small peninsula, blocked), try adjacent tile (Sheep logic)
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const dirs = [{ x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 }];
        for (let i = dirs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
        }

        for (const dir of dirs) {
            let tx = this.gridX + dir.x;
            let tz = this.gridZ + dir.z;

            if (tx < 0) tx = logicalW - 1;
            if (tx >= logicalW) tx = 0;
            if (tz < 0) tz = logicalD - 1;
            if (tz >= logicalD) tz = 0;

            if (this.canMoveTo(tx, tz)) {
                this.executeMove(tx, tz, time);
                return;
            }
        }

        // SAFETY: If all else fails, force idle
        this.action = 'Idle';
    }

    // cleanIgnoredTargets removed (Deprecated)




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
                // console.log(`Unit warped from ${oldX},${oldZ} to ${tx},${tz}`); // Removed debug log
                found = true;
            }
            attempts++;
        }
    }

    migrate(time) {
        this.action = 'Migrating';
        // Ensure state is valid so updateLogic delegates to State Machine
        if (!this.state || !(this.state instanceof Wander)) {
            this.state = new Wander(this); // Direct set to avoid 'enter' overriding action if not careful
        }
        this.migrationTimer = 0;
        this.findBestPlaceToMigrate(time);
    }

    findBestPlaceToMigrate(time) {
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 80;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 80;
        let found = false;
        let attempts = 0;
        while (!found && attempts < 10) {
            const r = 20 + Math.random() * 20;
            const ang = Math.random() * Math.PI * 2;
            let tx = this.gridX + Math.cos(ang) * r;
            let tz = this.gridZ + Math.sin(ang) * r;

            // Wrap
            if (tx < 0) tx = (tx % logicalW + logicalW) % logicalW;
            else if (tx >= logicalW) tx = tx % logicalW;

            if (tz < 0) tz = (tz % logicalD + logicalD) % logicalD;
            else if (tz >= logicalD) tz = tz % logicalD;

            if (this.terrain && this.terrain.getTileHeight(tx, tz) > 0) {
                this.migrationTarget = { x: tx, z: tz };
                this.smartMove(tx, tz, time);
                found = true;
            }
            attempts++;
        }
    }

    getBehaviorMode() {
        if (this.isDead) return "Dead";

        // If we have a state object, use its name primarily
        if (this.state) {
            const stateName = (this.state as any).name || this.state.constructor.name;

            // Map State Class Names to User-Friendly Display Strings
            if (stateName === "Wander") {
                return (this.role === 'knight' || this.role === 'wizard') ? "Patrol" : "Wander";
            }
            if (stateName === "Combat") {
                if (this.targetGoblin) return 'Combat';
                if (this.targetBuilding) return 'Siege';
                if (this.targetRaidPoint) return `Patrolling (${this.targetRaidPoint.x},${this.targetRaidPoint.z})`;
                return 'Combat';
            }
            if (stateName === "Job") return 'Working';
            if (stateName === "Sleep") return 'Sleeping';

            // return stateName; // Fallback to class name -> REMOVE return to allow fallthrough
            // } -> REMOVE premature close

            // Fallback checks for units without states (backwards compat)
            if (this.targetRequest) return 'Working';
            if (this.targetGoblin || this.targetBuilding) return 'Combat';

            if (this.role === 'knight' || this.role === 'wizard') return 'Patrol';
            return 'Wander';
        }
        return 'Idle';
    }

    // updateLogic merged into the first implementation above.

    workOnRequest(req: any, time: number, deltaTime: number) {
        if (!req) return;
        if (this.game && this.game.completeRequest) {
            this.game.completeRequest(this, req);
        }
    }


    // --- COMBAT LOGIC (RESTORED) ---
    // Implemented to fix Indestructible Caves and Passive Units




    // Resume original code...






    tryBuildStructure(time) {
        // Restriction: Workers, Hunters, and Fishers can build
        const canBuild = this.role === 'worker' || this.role === 'hunter' || this.role === 'fisher';
        if (!canBuild) return false;

        // Busy Check
        if (this.targetRequest) return false;

        const x = Math.floor(this.gridX);
        const z = Math.floor(this.gridZ);
        const cell = this.terrain.grid[x][z];

        if (cell.hasBuilding) return false;
        if (cell.height <= 0) return false; // Water
        if (cell.height >= 13) return false; // Rock/High altitude restriction (Increased from 8 to allow forest building)

        const buildings = (this.terrain && this.terrain.buildings) ? this.terrain.buildings : [];

        // Single pass summary of buildings to avoid multiple .filter().length
        let houseCount = 0;
        let farmCount = 0;
        let barracksCount = 0;
        let towerCount = 0;
        let housingCapacity = 10; // Base capacity

        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            if (!b.userData || b.userData.faction !== this.faction) continue;

            const type = b.userData.type;
            if (type === 'house') {
                houseCount++;
                housingCapacity += (b.userData.capacity || 5);
            } else if (type === 'farm') {
                farmCount++;
            } else if (type === 'barracks') {
                barracksCount++;
            } else if (type === 'tower') {
                towerCount++;
            } else if (type === 'mansion') {
                housingCapacity += (b.userData.capacity || 20);
            }
        }

        // Population Calculation (OPTIMIZED: Use cached total)
        const currentPop = (this.game && this.game.totalPopulation) ? this.game.totalPopulation : 10;

        // 1. Barracks Logic (3x3 Flat) - Limit: 1 per 1000 units
        const barracksTarget = Math.floor(currentPop / 1000);
        if (barracksCount < barracksTarget) {
            if (this.terrain.checkFlatArea(x, z, 3, 0.01)) {
                this.terrain.addBuilding('barracks', x, z, false, false, this.faction);
                this.moveRandomly(time);
                return true;
            }
        }

        // 2. Tower Logic (3x3 Flat) - Limit: 1 per 3000 units
        const towerTarget = Math.floor(currentPop / 3000);
        if (towerCount < towerTarget) {
            if (this.terrain.checkFlatArea(x, z, 3, 0.01)) {
                this.terrain.addBuilding('tower', x, z, false, false, this.faction);
                this.moveRandomly(time);
                return true;
            }
        }

        // 3. Farm Logic (2x2 Flat) - 1 per 5 units (Food Supply)
        const farmTarget = Math.max(1, Math.ceil(currentPop / 5));
        if (farmCount < farmTarget) {
            if (this.terrain.checkFlatArea(x, z, 2, 0.01)) {
                if (this.buildFarm(time)) return true;
            }
            // Priority: Food First. If we need farms (Famine risk), do not build houses yet.
            return false;
        }

        // Build if we have less than (CurrentPop + 3) capacity (Strict Early-Game buffer for tests)
        // Late game (Pop > 100), use 1.5x multiplier.
        const housingBuffer = (currentPop < 100) ? (currentPop + 3) : (currentPop * 1.5);

        if (housingCapacity < housingBuffer) {
            if (this.terrain.checkFlatArea(x, z, 2, 0.01)) {
                // Moisture Check (Prefer dry land for houses?) - optional
                if (cell.moisture > 0.8) return false;

                this.terrain.addBuilding('house', x, z, false, false, this.faction);
                this.moveRandomly(time);
                return true;
            }
        }

        return false;
    }

    canBuildAt(x, z) {
        // console.log(`[canBuildAt] Checking ${x},${z} Role:${this.role}`);
        // Restriction: Workers, Hunters, and Fishers can build
        const canBuild = this.role === 'worker' || this.role === 'hunter' || this.role === 'fisher';
        if (!canBuild) return false;

        // Busy Check
        if (this.targetRequest) return false;

        // Quick verify for Wander State
        x = Math.floor(x);
        z = Math.floor(z);

        // Basic Checks
        if (!this.terrain.grid[x] || !this.terrain.grid[x][z]) return false;
        const cell = this.terrain.grid[x][z];
        if (cell.hasBuilding || cell.height <= 0 || cell.height >= 13) return false;

        // Check Flat Area (2x2 is minimum requirement for house/farm)
        if (!this.terrain.checkFlatArea || !this.terrain.checkFlatArea(x, z, 2, 0.01)) return false;

        const buildings = (this.terrain && this.terrain.buildings) ? this.terrain.buildings : [];
        const currentPop = (this.game && this.game.totalPopulation !== undefined) ? this.game.totalPopulation : 10;

        // --- Logic Mirroring tryBuildStructure ---

        // 1. Food Supply Check (Farm Priority)
        let farmCount = 0;
        for (let i = 0; i < buildings.length; i++) {
            if (buildings[i].userData && buildings[i].userData.faction === this.faction && buildings[i].userData.type === 'farm') {
                farmCount++;
            }
        }
        const farmTarget = Math.max(1, Math.ceil(currentPop / 5));

        // If we need farms, we CAN build here (even if house capacity is full)
        if (farmCount < farmTarget) {
            return true;
        }

        // 2. Housing Buffer Check
        let housingCapacity = 10;
        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            if (!b.userData || b.userData.faction !== this.faction) continue;
            const type = b.userData.type;
            if (type === 'house') housingCapacity += (b.userData.capacity || 5);
            else if (type === 'mansion') housingCapacity += (b.userData.capacity || 20);
            else if (type === 'castle') housingCapacity += (b.userData.capacity || 50); // Added for completeness
        }

        const housingBuffer = (currentPop < 100) ? (currentPop + 3) : (currentPop * 1.5);

        if (housingCapacity < housingBuffer) {
            // Moisture Check (Prefer dry land for houses in tryBuildStructure)
            if (cell.moisture > 0.8) return false;
            return true;
        }

        // 3. Military / Elite Buildings (Barracks/Tower)
        // These are low priority but still count as "Can Build"
        const barracksTarget = Math.floor(currentPop / 1000);
        const towerTarget = Math.floor(currentPop / 3000);

        // These need 3x3, but canBuildAt is a "pre-check" for any building.
        // If we want to be strict, we'd check checkFlatArea(3) here too, 
        // but 2x2 is the general intent of "this area is buildable".
        // However, if we ONLY want to stop if we'd actually build something:
        let barracksCount = 0;
        let towerCount = 0;
        for (let i = 0; i < buildings.length; i++) {
            const b = buildings[i];
            if (!b.userData || b.userData.faction !== this.faction) continue;
            if (b.userData.type === 'barracks') barracksCount++;
            else if (b.userData.type === 'tower') towerCount++;
        }

        if (barracksCount < barracksTarget || towerCount < towerTarget) {
            return true;
        }

        return false;
    }

    improveLand(time) {
        const gx = Math.floor(this.gridX);
        const gz = Math.floor(this.gridZ);
        if (!this.terrain.grid[gx] || !this.terrain.grid[gx][gz]) return;

        const cell = this.terrain.grid[gx][gz];
        const currentM = cell.moisture || 0.5;
        const targetM = 0.5;

        let diff = targetM - currentM;
        let change = diff * 0.4;

        if (Math.abs(change) < 0.1 && Math.abs(diff) > 0.01) {
            change = (diff > 0) ? 0.1 : -0.1;
        }

        if (Math.abs(change) > Math.abs(diff)) change = diff;

        this.terrain.modifyMoisture(this.gridX, this.gridZ, change);
        // console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${currentM.toFixed(2)} -> ${(currentM + change).toFixed(2)}`); // Removed debug log

        // Task Complete!
        if (this.targetRequest && this.game) {
            // Check if matches location (approx)
            if (Math.abs(this.targetRequest.x - this.gridX) < 2 && Math.abs(this.targetRequest.z - this.gridZ) < 2) {
                this.game.removeRequest(this.targetRequest);
                this.targetRequest = null;
            }
        }

        this.moveRandomly(time);
    }

    buildFarm(time) {
        let cell: any = null;
        if (this.terrain.grid[this.gridX] && this.terrain.grid[this.gridX][this.gridZ]) {
            cell = this.terrain.grid[this.gridX][this.gridZ];
        } else {
            console.error(`[Unit ${this.id}] buildFarm: Cell not found at ${this.gridX},${this.gridZ}`);
        }

        if (cell) {
            if (cell.height > 12) {
                // console.log(`[Unit ${this.id}] Farm failed: Too high (Rock).`); // Removed debug log
                return false;
            }
            if (cell.moisture < 0.2) {
                // console.error(`[Unit ${this.id}] Farm failed: Too dry (${cell.moisture}). Improving land.`); // Removed debug log
                this.improveLand(time);
                return true; // Action taken (Improvement)
            }
            const m = cell.moisture || 0.5;

            const diff = Math.abs(m - 0.5);
            let successChance = 1.0 - (diff * 2.5);
            if (successChance < 0) successChance = 0;

            if (Math.random() > successChance) {
                // console.log(`Farm construction failed due to soil conditions (Moisture: ${m.toFixed(2)}, Chance: ${(successChance * 100).toFixed(0)}%). Improving Land.`); // Removed debug log
                this.improveLand(time);
                return true; // Action taken
            }
        }

        this.terrain.addBuilding('farm', this.gridX, this.gridZ, false, false, this.faction);

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
        if (!ctx) return new THREE.CanvasTexture(canvas);

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
        if (!ctx) return new THREE.CanvasTexture(canvas);

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
            id: this.id, // PERSIST ID
            gridX: this.gridX,
            gridZ: this.gridZ,
            age: this.age,
            // Raid Goal Persistence
            raidGoal: this.raidGoal ? { x: (this.raidGoal as any).x, z: (this.raidGoal as any).z, timestamp: (this.raidGoal as any).timestamp } : null,
            lifespan: this.lifespan,
            isDead: this.isDead,
            isFinished: this.isFinished,
            isMoving: this.isMoving,
            targetX: this.targetX,
            targetZ: this.targetZ,
            moveStartTime: this.moveStartTime,
            moveDuration: this.moveDuration,
            startGridX: this.startGridX,
            startGridZ: this.startGridZ,
            targetGridX: this.targetGridX,
            targetGridZ: this.targetGridZ,
            isSpecial: this.isSpecial,
            role: this.role,
            type: this.type, // Explicitly persist type
            // Stats
            hp: this.hp,
            maxHp: this.maxHp,
            damage: this.damage,
            xp: this.xp || 0,
            level: this.level || 1,
            name: this.name,
            faction: this.faction,
            // Squad Persistence
            homeBaseGridX: hbx,
            homeBaseGridZ: hbz,
            squadId: this.squadId, // Persist Squad
            // Request Persistence
            targetRequestId: (this.targetRequest) ? this.targetRequest.id : null,
            action: this.action,
            // JOB STABILITY: Persist Ignored Targets
            ignoredTargets: (this.ignoredTargets && this.ignoredTargets.size > 0) ? Array.from(this.ignoredTargets.entries()) : []
        };
    }

    dispose() {
        super.dispose();
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
    }

    attemptPathfinding(time) {
        if (!this.terrain || !this.terrain.findPath) return;

        let tx, tz;

        if (this.targetGoblin) {
            tx = this.targetGoblin.gridX;
            tz = this.targetGoblin.gridZ;
        } else if (this.targetBuilding) {
            tx = this.targetBuilding.gridX;
            tz = this.targetBuilding.gridZ;
        } else if (this.targetRaidPoint) {
            tx = this.targetRaidPoint.x;
            tz = this.targetRaidPoint.z;
        } else if (this.migrationTarget) {
            tx = this.migrationTarget.x;
            tz = this.migrationTarget.z;
        } else {
            // No high level target known?
            return;
        }

        // Try to find path
        // Use a safe timeout to prevent spam if pathfinding blocked globally
        if (time - (this.lastPathAttempt || 0) < 2000) return;
        this.lastPathAttempt = time;

        const path = this.terrain.findPath(this.gridX, this.gridZ, tx, tz);

        if (path && path.length > 0) {
            this.path = path;
            this.stuckCount = 0; // Reset stuck since we found a solution
        } else {
            // console.warn(`[Unit ${ this.id }] Pathfinding Failed.`);
            // ABORT TARGET if unreachable (Prevent sticking to coast)
            // Downgraded log to prevent spam

            const now = (this.game) ? this.game.simTotalTimeSec : 0;

            // Blacklist targets (Seconds)
            if (this.targetUnit) this.ignoredTargets.set(this.targetUnit.id, now + 15.0);
            if (this.targetGoblin) this.ignoredTargets.set(this.targetGoblin.id, now + 15.0); // Also cover semantic logic
            if (this.targetBuilding) {
                const id = this.targetBuilding.userData ? (this.targetBuilding.userData.id || this.targetBuilding.id) : this.targetBuilding.id;
                if (id) this.ignoredTargets.set(id, now + 15.0);
            }
            if (this.targetRaidPoint) {
                // Synthetic ID for coords
                this.smartMove(this.targetRaidPoint.x, this.targetRaidPoint.z, now);
            }

            this.targetUnit = null;
            this.targetGoblin = null; // Ensure this is cleared too
            this.targetBuilding = null;
            this.targetRaidPoint = null;
            this.migrationTarget = null;
            this.targetRequest = null; // Drop job if unreachable
            this.path = null;
        }
    }

    static deserialize(data, scene, terrain) {
        // FIX: Prioritize role over type ('unit') to prevent worker-transformation bug
        const role = data.role || data.type || (data.isSpecial ? 'knight' : 'worker');
        const unit = new Unit(scene, terrain, data.gridX, data.gridZ, role, data.isSpecial, data.squadId, data.faction || 'player');

        unit.id = (data.id !== undefined) ? Number(data.id) : unit.id; // Restore ID as Number
        unit.age = data.age || 20;

        // Restore State Properties
        if (data.moveDuration) {
            unit.moveDuration = data.moveDuration;
        }

        if (typeof data.lifespan === 'number' && data.lifespan > 0) {
            unit.lifespan = data.lifespan;
        }

        unit.isDead = data.isDead || false;
        unit.isFinished = data.isFinished || false;

        // Restore Stats
        if (data.hp !== undefined) unit.hp = data.hp;
        if (data.maxHp !== undefined) unit.maxHp = data.maxHp;
        if (data.damage !== undefined) unit.damage = data.damage;
        if (data.xp !== undefined) unit.xp = data.xp;
        if (data.level !== undefined) unit.level = data.level;
        if (data.name !== undefined) unit.name = data.name;

        // Restore Squad Persistence (Temp storage for Game.js to use)
        if (data.homeBaseGridX !== undefined && data.homeBaseGridZ !== undefined) {
            unit.savedHomeBaseX = data.homeBaseGridX;
            unit.savedHomeBaseZ = data.homeBaseGridZ;
        }

        // Restore Squad ID (New Feature)
        if (data.squadId !== undefined) {
            unit.squadId = data.squadId;
        } else {
            unit.squadId = null; // Default for legacy saves
        }

        // Restore Request ID (Game.js will handle linking)
        if (data.targetRequestId) {
            unit.savedTargetRequestId = data.targetRequestId;
        }

        // MOVEMENT STATE RESET
        // Do NOT restore isMoving state blindly, because moveStartTime is relative to the previous session's clock.
        // If we restore it, the unit might teleport instantly or freeze.
        // Instead, we trust updateLogic to resume movement towards the target on the next frame.
        if (data.isMoving) {
            // Restore Intent so Logic picks it up
            if (data.targetGridX !== undefined) unit.targetGridX = data.targetGridX;
            if (data.targetGridZ !== undefined) unit.targetGridZ = data.targetGridZ;

            // Force Reset but Keep Action
            unit.isMoving = false;
            unit.action = data.action || "Idle";
        } else if (data.action) {
            unit.action = data.action;
        }

        // STATE RESTORATION
        // STATE RESTORATION
        const actionStr = (unit.action || "Idle").toLowerCase();
        // FIX: Do NOT restore Job here. Game.js handles linking and starting Job safely.
        // Starting it here would create a temporary "broken" state (no targetRequest linked yet).

        if (actionStr.includes('fight') || actionStr.includes('combat')) {
            // For combat, we might still be risky if target isn't valid, but keeping for now.
            // Ideally Game.js should handle all interactions.
            unit.changeState(new Combat(unit));
        } else if (actionStr.includes('sleep')) {
            unit.changeState(new Sleep(unit));
        } else if (unit.savedTargetRequestId || actionStr.includes('job') || actionStr.includes('work') || actionStr.includes('approaching')) {
            // FIX: Use Wander initially. Game.js will upgrade to Job after linking targetRequest.
            // Starting Job here without targetRequest causes immediate exit.
            unit.isUnreachable = false; // Ensure stale state is cleared
            unit.changeState(new Wander(unit));
        } else {
            // Default to Wander for Jobs too, until Game.js upgrades it to Job
            unit.changeState(new Wander(unit));
        }

        if (unit.isDead) {
            if (!unit.isFinished) {
                unit.createCross();
            }
        }

        // Restore Ignored Targets (Job Stability)
        if (data.ignoredTargets && Array.isArray(data.ignoredTargets)) {
            unit.ignoredTargets = new Map(data.ignoredTargets);
        } else {
            unit.ignoredTargets = new Map();
        }

        // Restore raidGoal (Raid Goal Persistence)
        if (data.raidGoal) {
            unit.raidGoal = {
                x: data.raidGoal.x,
                z: data.raidGoal.z,
                timestamp: data.raidGoal.timestamp
            };
        } else if (data.raidTargetX !== undefined && data.raidTargetZ !== undefined) {
            // Legacy Support
            unit.raidGoal = {
                x: data.raidTargetX,
                z: data.raidTargetZ,
                timestamp: data.raidTargetTS || 0
            };
        }

        return unit;
    }

    // --- MOVEMENT OVERRIDE (Ported from Actor for safety) ---
    updateMovement(time: number) {
        // Call super (Actor) to handle position interpolation and watchdog
        super.updateMovement(time);

        // Animation Logic (Direct Implementation)
        if (this.isMoving) {
            // Ensure limbs exist
            if (!this.limbs) {
                this.limbs = {
                    leftArm: { x: 0 }, rightArm: { x: 0 },
                    leftLeg: { x: 0 }, rightLeg: { x: 0 }
                };
            }

            // FIX: Use Progress-based Phase to ensure limbs are reset exactly at arrival (progress=1.0)
            // This eliminates "Jitter" when one move finishes and next hasn't started yet.
            const dur = (this.moveDuration && this.moveDuration > 0) ? this.moveDuration : 1.0;
            let progress = (time - this.moveStartTime) / dur;

            if (isNaN(progress)) progress = 0;
            progress = Math.max(0, Math.min(1, progress));

            // 2 full cycles per tile (4*PI)
            const phase = progress * Math.PI * 4;

            const amp = 0.5;

            this.limbs.leftLeg.x = Math.sin(phase) * amp;
            this.limbs.rightLeg.x = Math.sin(phase + Math.PI) * amp;
            this.limbs.leftArm.x = Math.sin(phase + Math.PI) * amp; // Opposite to leg
            this.limbs.rightArm.x = Math.sin(phase) * amp;
        }
    }

    // --- CRITICAL LIFECYCLE UPDATE ---
    // Called every frame (or budgeted interval) regardless of AI logic budget
    getAgeRate() {
        return (this.role === 'knight' || this.role === 'wizard') ? 0.02 : 0.2;
    }

    updateAge(deltaTime: number) {
        if (this.isDead || this.isFinished) return;

        // Use base lifecycle logic (Cooldowns, HP Recovery, Aging, Drowning)
        this.updateLifecycle(deltaTime);
    }
} // End of Unit Class
