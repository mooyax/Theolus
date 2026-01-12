import * as THREE from 'three';

import { Actor } from './Actor.js';
import { WanderState } from './ai/states/State.js';
import { UnitWanderState, JobState, CombatState, SleepState } from './ai/states/UnitStates.js';

export class Unit extends Actor {
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

        // Job Indicator (!) - Top Cylinder and Bottom Dot
        const indicatorTopGeo = new THREE.CylinderGeometry(0.04, 0.02, 0.25, 8);
        indicatorTopGeo.translate(0, 0.15, 0);
        Unit.assets.geometries.jobIndicatorTop = indicatorTopGeo;

        const indicatorDotGeo = new THREE.SphereGeometry(0.04, 8, 8);
        indicatorDotGeo.translate(0, -0.05, 0);
        Unit.assets.geometries.jobIndicatorDot = indicatorDotGeo;

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
        // Wizard Materials
        Unit.assets.materials.robe = new THREE.MeshStandardMaterial({ color: 0x444499, roughness: 1.0 });
        Unit.assets.materials.wizardHat = new THREE.MeshStandardMaterial({ color: 0x333388, roughness: 1.0 });

        // New Item Materials
        Unit.assets.materials.metal = new THREE.MeshStandardMaterial({ color: 0xDDDDDD, metalness: 0.9, roughness: 0.2 });
        Unit.assets.materials.wood = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9 });
        Unit.assets.materials.darkMagic = new THREE.MeshStandardMaterial({ color: 0x330033, roughness: 1.0 });

        // Red indicator for (!)
        Unit.assets.materials.redIndicator = new THREE.MeshStandardMaterial({
            color: 0xFF0000,
            emissive: 0xFF0000,
            emissiveIntensity: 1.0,
            roughness: 0.05,
            metalness: 0.5
        });

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

    constructor(scene, terrain, x, z, role, isSpecial = false, squadId = null) {
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
        this.type = this.role; // Fix: Ensure type mirrors role for persistence/logic
        this.isSpecial = specialFlag;
        this.squadId = squadId; // Squad ID for coordinated attacks

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
        this.isSleeping = false;
        this.isNight = false; // Sync flag for states
        this.isDead = false;
        this.isMoving = false; // Entity base normally sets this, but be sure
        this.debugFrame = 0; // Initialize for logic gatesr)
        this.hp = 50 + Math.floor(Math.random() * 15); // BUFF: 35->50 (Avg 57)
        this.maxHp = this.hp;
        this.attackCooldown = 0;
        this.attackRate = 1.0;
        this.damage = 12; // BUFF: 8 -> 12 (3-shot Goblins)
        this.targetGoblin = null;

        // Stats Overrides
        if (this.role === 'knight') {
            this.hp *= 20; // BUFF: 15x -> 20x (Base ~40 -> 800 HP)
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

        // Blacklist for failed paths
        this.ignoredTargets = new Map(); // id -> expiryTime

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
        this.targetX = 0;
        this.targetZ = 0;

        // Initialize State Machine
        // Default to WanderState (which handles Idle/Wander/Sleep/Combat transitions)
        if (typeof UnitWanderState !== 'undefined') {
            this.changeState(new UnitWanderState(this));
        } else {
            // If UnitStates.js is circular dependency, we might need a lazy init or check.
            // But for now, assuming import is available.
            // Actually, Unit.js imports UnitWanderState? Let's check imports first.
            // If imports are missing, we add them.
            // See step 4 for import check.
        }
        // this.moveStartTime = 0; // Already defined above
        // this.moveDuration = 1000; // Already defined above

        // Register in Spatial Grid
        if (this.terrain && this.terrain.registerEntity) {
            this.terrain.registerEntity(this, this.gridX, this.gridZ, 'unit');
        }
        console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${this.role} Pos:${this.gridX},${this.gridZ}`);

        this.wanderCount = 0;
        this.migrationTarget = null;

        // Target Ignoring Logic (Replaces global cooldown)
        this.ignoredTargets = new Map(); // id -> timestamp until ignored
        this.debugFrame = 0;
    }

    takeDamage(amount, attacker) {
        if (this.isDead || this.isFinished) return;

        this.hp -= amount;
        if (isNaN(this.hp)) this.hp = 0;

        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
            if (attacker && attacker.increasePlunder) attacker.increasePlunder(); // Goblin reward
        } else {
            // Hit Flash / Reaction
            this.lastHitTime = this.simTime || 0;

            // Retaliate if idle or wandering
            if (!this.targetGoblin && attacker && attacker.hp > 0) {
                // All units should retaliate for self-defense if hit
                this.targetGoblin = attacker;
            }
        }
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;

        console.log(`Unit ${this.id} (${this.role}) DIED. R.I.P.`);

        // Release any held job
        const g = this.game || window.game;
        if (this.targetRequest && g) {
            console.log(`[Unit ${this.id}] Releasing request via ${g === this.game ? 'this.game' : 'window.game'}`);
            g.releaseRequest(this, this.targetRequest);
            this.targetRequest = null;
        }

        if (this.terrain && this.terrain.unregisterEntity) {
            this.terrain.unregisterEntity(this);
        }

        this.createCross();
    }

    attackGoblin(goblin) {
        // console.log(`[Unit Debug] Attack request. CD: ${this.attackCooldown}`);
        if (this.attackCooldown > 0) return;
        if (goblin.isDead) {
            this.targetGoblin = null;
            return;
        }

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

    attackBuilding(building, damageOverride) {
        if (this.attackCooldown > 0) return;
        if (!building || !building.userData) return;

        const damage = (damageOverride !== undefined) ? damageOverride : (this.damage || 10);
        const bType = building.userData.type;

        // --- NEW: Class-based Logic ---
        if (building.takeDamage) {
            building.takeDamage(damage);
            // Retaliation? Unit.js currently doesn't handle retaliation from Buildings as well as Goblin.js
            // But Building.js's takeDamage returns retaliation damage.
            // Let's use it!
            // const retaliation = building.takeDamage(damage);
            // if (retaliation > 0) this.takeDamage(retaliation); 
            // Wait, Unit.js logic below is quite specific. Let's stick to safe addition for now.
            if (building.hp <= 0) {
                this.terrain.removeBuilding(building);
                this.targetBuilding = null;
                this.searchSurroundings(this.gridX, this.gridZ);
            }
            this.attackCooldown = this.attackRate;
            return;
        }

        // --- VISUALS ---

        // --- FARM LOGIC (Fixed HP) ---
        if (bType === 'farm') {
            // Farm HP Fixed to 5
            if (building.userData.hp === undefined) building.userData.hp = 5;
            // Cap max HP for farms to 5 if it was higher (legacy fix)
            if (building.userData.hp > 5) building.userData.hp = 5;

            building.userData.hp -= damage;
            console.log(`Unit ${this.id} attacking Farm. HP: ${building.userData.hp}`);

            if (building.userData.hp <= 0) {
                console.log(`Farm Destroyed!`);
                this.terrain.removeBuilding(building);
                this.targetBuilding = null;
                this.searchSurroundings(this.gridX, this.gridZ);
            }
        }
        // --- POPULATED BUILDING LOGIC (Pop = HP + Counter Attack) ---
        else if (bType === 'house' || bType === 'mansion' || bType === 'castle' || bType === 'tower' || bType === 'barracks') {

            // 1. DAMAGE (Population Loss)
            // If population is 0, it's effectively 1 HP (Structure only)
            let pop = building.userData.population || 0;

            if (pop <= 0) {
                // Empty building - destroyed instantly
                console.log(`Unit ${this.id} destroyed Empty ${bType}!`);
                this.terrain.removeBuilding(building);
                this.targetBuilding = null;
                this.searchSurroundings(this.gridX, this.gridZ);
                this.attackCooldown = this.attackRate;
                return;
            }

            // Damage formulation: 1 Damage = 1 Population ?
            // Units deal ~10-20 damage. Houses have ~10-100 pop.
            // Direct subtraction seems fair.
            // Safety: Don't drop below 0 immediately, handle removal.
            building.userData.population -= Math.ceil(damage / 2); // Halve damage so populations last a bit longer?
            // Let's stick to 1:1 roughly, maybe slightly dampened to prevent 1-shotting small houses.
            // Actually, `this.damage` is around 10. A house with 5 people (new) dies in 1 hit. Seems realistic.

            // Sync visualized population
            building.population = building.userData.population;

            console.log(`Unit ${this.id} attacked ${bType}. Pop remaining: ${building.userData.population}`);

            if (building.userData.population <= 0) {
                console.log(`${bType} Destroyed (Population wiped out)!`);
                this.terrain.removeBuilding(building);
                this.targetBuilding = null;
                this.searchSurroundings(this.gridX, this.gridZ);
            } else {
                // 2. COUNTER ATTACK (Retaliation)
                // Only if survivors exists
                let retaliationFactor = 0.5; // Default (House/Worker)

                if (bType === 'tower') retaliationFactor = 2.0; // Wizards (Strong)
                if (bType === 'barracks') retaliationFactor = 1.5; // Knights (Medium-Strong)
                if (bType === 'castle') retaliationFactor = 2.0; // Elite

                // Damage based on CURRENT population (Strength in numbers)
                // Cap effective output to avoid 1-shotting the attacker instantly if pop is huge (100 pop * 2 = 200 dmg!)
                // Cap at 30? Or allow swarms to be deadly?
                // Populous: Angry mobs ARE deadly. 
                // Let's dampen slightly: damage = sqrt(pop) * factor?
                // Or linear but small per person.

                // Let's try Linear: Each person deals 0.5 damage?
                const retaliationDamage = Math.floor(pop * retaliationFactor * 0.5);

                if (retaliationDamage > 0) {
                    console.log(`[Combat] ${bType} (Pop ${pop}) retaliates! Deals ${retaliationDamage} dmg to Unit ${this.id}`);
                    this.takeDamage(retaliationDamage);
                }
            }
        }
        // --- OTHERS (Goblin Hut / Cave) ---
        else {
            // Standard HP Logic for Enemy Buildings
            if (building.userData.hp === undefined) {
                building.userData.hp = (building.userData.type === 'cave' ? 200 : 100);
            }
            building.userData.hp -= damage;
            console.log(`Unit ${this.id} attacking ${building.userData.type}. HP: ${building.userData.hp}`);

            if (building.userData.hp <= 0) {
                this.terrain.removeBuilding(building);
                this.targetBuilding = null;
                this.searchSurroundings(this.gridX, this.gridZ);
            }
        }

        this.attackCooldown = this.attackRate;
    }

    debugGetAge() {
        return "DEBUG_AGE_" + this.age;
    }


    getDefaultState() {
        return new UnitWanderState(this);
    }

    resetToDefaultState() {
        console.log(`[Unit ${this.id}] Resetting to default state.`);
        this.targetRequest = null;
        this.isMoving = false;
        this.isUnreachable = false;
        this.stagnationCount = 0;
        this.stuckCount = 0;

        if (this.changeState) {
            this.changeState(this.getDefaultState());
        }
    }




    checkSelfDefense(passedGoblins) {
        // --- TARGET SCANNING (From Legacy Logic) ---

        // Priority: Calculate Best Target (Goblin vs Building)
        let bestTarget = null;
        let bestScore = Infinity; // Lower is better

        // COMMITMENT LOGIC:
        const hasValidGoblin = this.targetGoblin && !this.targetGoblin.isDead;
        const hasValidBuilding = this.targetBuilding && this.targetBuilding.userData && this.targetBuilding.userData.hp > 0;

        let isBusy = (this.action === 'Chasing' || this.action === 'Fighting' || this.action === 'Sieging' || this.action === 'Unstuck' || this.action === 'Reinforcing');

        // WORKER PACIFISM
        if (this.role === 'worker' && this.targetRequest) isBusy = true;

        this.scanTimer = (this.scanTimer || 0) + 1;

        // Adaptive Scan Rate
        let scanInterval = 30;
        if (hasValidGoblin || hasValidBuilding) {
            scanInterval = 300; // 5 seconds commitment
        }

        const forceScan = (this.scanTimer > scanInterval);

        // Logic: Scan if Idle OR Invalid Target OR Force Scan... UNLESS Worker is Working
        let shouldScan = (!isBusy || (!hasValidGoblin && !hasValidBuilding) || forceScan);
        if (this.role === 'worker' && this.targetRequest) shouldScan = false;

        // Jitabata Fix: Prevent jitter during Reinforcing/Migration unless forced
        if ((this.action === 'Reinforcing' || this.action === 'Migrating' || this.migrationTarget) && !forceScan) return false;

        // OPTIMIZATION: Time Slicing (Load Balancing)
        // Spread checks across frames based on ID to prevent spikes
        const frame = (window.game && window.game.frameCounter) ? window.game.frameCounter : 0;
        if (!forceScan && (frame + this.id) % 20 !== 0) {
            // Skip check this frame (check only ~3 times per second at 60fps)
            // Unless we are Knight/Wizard (check more often?) -> Knights maybe every 10 frames
            if ((this.role === 'knight' || this.role === 'wizard') && (frame + this.id) % 10 !== 0) {
                return false;
            } else if (this.role === 'worker') {
                return false;
            }
        }

        // console.log(`[Defense Debug ${this.id}] shouldScan:${shouldScan} isBusy:${isBusy} force:${forceScan} PassedGoblins:${passedGoblins ? passedGoblins.length : 'None'}`);

        // DEBUG: Force scan if target is manually cleared (null) but we are in CombatState? 
        // No, relies on loop.

        if (shouldScan) {
            if (forceScan) this.scanTimer = 0;

            // Current Target Data for Hysteresis
            const currentTargetId = this.targetGoblin ? this.targetGoblin.id :
                (this.targetBuilding ? this.targetBuilding.id : null);

            // Fetch Goblins from Global Manager if available
            const goblins = passedGoblins || (window.game && window.game.goblinManager ? window.game.goblinManager.goblins : []);

            // 1. Scan Goblins
            if (goblins) {
                const maxDist = (this.role === 'knight' || this.role === 'wizard') ? 50 : 15;

                for (const g of goblins) {
                    if (g.isDead) continue;
                    if (this.ignoredTargets.has(g.id)) continue;

                    const d = this.getDistance(g.gridX, g.gridZ);

                    // Strict Region Check
                    const myRegion = (this.terrain.grid[this.gridX] && this.terrain.grid[this.gridX][this.gridZ]) ? this.terrain.grid[this.gridX][this.gridZ].regionId : 1;
                    const gRegion = (this.terrain.grid[g.gridX] && this.terrain.grid[g.gridX][g.gridZ]) ? this.terrain.grid[g.gridX][g.gridZ].regionId : 1;

                    if (myRegion !== gRegion) {
                        if (d > 2.5) continue;
                    }

                    // Relaxed Range for Current Target (Stickiness)
                    let limit = maxDist;
                    if (g.id === currentTargetId) limit = maxDist * 2.0;

                    if (d > limit) continue;

                    // HEIGHT CHECK
                    const myH = this.terrain.getTileHeight(this.gridX, this.gridZ);
                    const targetH = this.terrain.getTileHeight(g.gridX, g.gridZ);
                    if (Math.abs(myH - targetH) > 10.0) continue;

                    let h = 0;
                    // Safe Height Check
                    if (this.terrain.getTileHeight) h = this.terrain.getTileHeight(g.gridX, g.gridZ);

                    let score = d - 1000.0; // Base priority for Goblins (High)
                    if (h > 8) score += 20;

                    // Sticky Bonus
                    if (g.id === currentTargetId) score -= 500.0;

                    if (score < bestScore) {
                        bestScore = score;
                        bestTarget = { type: 'goblin', obj: g };
                    }
                }
            }

            // 2. Scan Buildings
            if (this.terrain.buildings) {
                const range = (this.role === 'knight' || this.role === 'wizard') ? Infinity : 10;
                for (const b of this.terrain.buildings) {
                    if (this.role === 'worker' && b.userData.type !== 'goblin_hut' && b.userData.type !== 'cave') continue;
                    if (b.userData.type === 'goblin_hut' || b.userData.type === 'cave') {
                        if (b.userData && b.userData.hp <= 0) continue;
                        if (this.ignoredTargets.has(b.id)) continue;
                        const d = this.getDistance(b.gridX, b.gridZ);
                        if (d > range) continue;

                        let score = d - 5.0; // Lower priority than goblins (-1000)
                        if (b.id === currentTargetId) score -= 500.0; // Sticky Bonus

                        if (d < 8.0 && (this.role === 'knight' || this.role === 'wizard')) score -= 2000.0; // Sieging Logic Override

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
                if (bestTarget.type === 'goblin') this.targetGoblin = bestTarget.obj;
                else this.targetBuilding = bestTarget.obj;
            }

            // Priority 3: Raid Point (Squad OR Global)
            const hasRaidTarget = this.findRaidTarget();

            // PRIORITY ARBITRATION: Squad vs Local
            if (this.targetGoblin && hasRaidTarget) {
                const d = this.getDistance(this.targetGoblin.gridX, this.targetGoblin.gridZ);
                if (d > 5.0) {
                    this.targetGoblin = null;
                }
            }
        }

        // Return true if we have a valid target to engage
        return (!!this.targetGoblin || !!this.targetBuilding);
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
        if (!target) return;

        const x = target.gridX;
        const z = target.gridZ;

        // 1. Report to Squad (Priority)
        if (this.squadId && window.game) {
            window.game.reportSquadTarget(this.squadId, x, z);
        } else if (window.game) {
            // If no squad, report directly to Global
            window.game.reportGlobalBattle(x, z);
        }

        // 2. Report to Global Memory (Legacy/Freelancer backup)
        // This helps units without squads or if squad logic fails
        if (this.game && this.game.battleMemory) {
            this.game.battleMemory.reportRaid(x, z, (this.game.simTotalTimeSec || 0));
        }
    }

    findRaidTarget() {
        // PRIORITY 1: Check Squad Orders
        if (this.squadId && window.game) {
            const squad = window.game.getSquad(this.squadId);
            if (squad && squad.target) {
                // Use window.game.simTotalTimeSec for consistency (Seconds)
                // squad.target.time is expected to be in seconds from Game.js
                const now = window.game.simTotalTimeSec || 0;
                const age = now - squad.target.time;

                // Debug Log for Stagnation
                if (Math.random() < 0.05 && this.role === 'knight') {
                    const d = this.getDistance(squad.target.x, squad.target.z);
                    console.log(`[Unit ${this.id} SquadDebug] ID:${this.squadId} Target:${squad.target.x},${squad.target.z} Dist:${d.toFixed(1)} Age:${age.toFixed(1)}s Reachable:${this.isReachable(squad.target.x, squad.target.z)} `);
                }

                if (age < 30) { // Valid for 30s
                    // Check if close enough to be "arrived" (to stop jitter)
                    const d = this.getDistance(squad.target.x, squad.target.z);
                    // Tightened threshold from 5.0 to 2.0 to force units closer to the fight
                    if (d > 2.0) {
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
                    }
                }
            }
        }

        // PRIORITY 2: Total Mobilization (Global Hotspots)
        // Only for Combat Units
        if ((this.role === 'knight' || this.role === 'wizard') && window.game && window.game.battleHotspots && window.game.battleHotspots.length > 0) {
            const now = window.game.simTotalTimeSec || 0;
            // Find closest reachable hotspot
            let bestSpot = null;
            let minD = Infinity;

            for (const spot of window.game.battleHotspots) {
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
                    if (!proxyFound) continue; // Truly unreachable
                }

                if (d < 2.0) continue; // Already there

                if (d < minD) {
                    minD = d;
                    bestSpot = { x: targetX, z: targetZ };
                }
            }

            if (bestSpot) {
                this.targetRaidPoint = { x: bestSpot.x, z: bestSpot.z };
                return true;
            }
        }

        // PRIORITY 3: Global Memory (Legacy/Fallback)
        let memories = [];
        const currentTime = (this.game) ? this.game.simTotalTimeSec : 0;

        if (this.game && this.game.battleMemory) {
            memories = this.game.battleMemory.getPriorities(currentTime);
        }

        if (!memories || memories.length === 0) {
            return;
        }

        let nearest = null;
        let minDist = Infinity;

        memories.forEach(p => {
            let targetX = p.x;
            let targetZ = p.z;
            let dist = this.getDistance(targetX, targetZ);

            // HUGE CHANGE: Do not target points we are already at!
            // Legacy check was < 8.0, but if we use Proxy, we might be AT proxy.
            if (dist < 4.0) return;

            // Check ignore list by coord
            if (this.ignoredTargets && this.ignoredTargets.has(`${p.x},${p.z}`)) return;

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

            if (dist < minDist) {
                minDist = dist;
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



    checkArrivalAtRaidPoint() {
        if (!this.targetRaidPoint) return;
        const dist = this.getDistance(this.targetRaidPoint.x, this.targetRaidPoint.z);
        if (dist <= 2.0) { // Standardized to 2.0 (was 3.0)
            console.log(`[Unit ${this.id}] Arrived at Raid Point. Scanning...`);
            this.searchSurroundings(this.gridX, this.gridZ);
            // If search did not lock onto a target, clear the raid point to prevent stuck state
            if (!this.targetGoblin && !this.targetBuilding) {
                console.log(`[Unit ${this.id}] Nothing found at Raid Point. Clearing Shared Memory.`);

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

    searchSurroundings(x, z, goblins) {
        // Active scan for Goblins OR Buildings
        if (!this.game) return;

        // OPTIMIZATION: Worker SKIP
        if (this.role === 'worker' && this.targetRequest) return;

        // OPTIMIZATION: Time Slicing
        // Use a different modulo offset than checkSelfDefense to avoid CPU spikes in same frame
        const frame = (window.game && window.game.frameCounter) ? window.game.frameCounter : 0;
        if ((frame + this.id + 5) % 20 !== 0) {
            // Check only rarely
            // If Knight/Wizard, slightly more often?
            if ((this.role === 'knight' || this.role === 'wizard') && (frame + this.id + 5) % 10 !== 0) {
                return;
            } else if (this.role === 'worker') {
                return;
            }
        }

        // Ensure we have candidates for finding goblins
        const goblinCandidates = goblins || (window.game && window.game.goblinManager ? window.game.goblinManager.goblins : []);

        if (this.terrain && this.terrain.findBestTarget) {
            // 1. Goblins (Optimized)
            // Use Role-based range (Knights/Wizards can see farther)
            const range = (this.role === 'knight' || this.role === 'wizard') ? 50 : 12;

            const goblin = this.terrain.findBestTarget('goblin', x, z, range, (g, dist) => {
                const now = window.game ? window.game.gameTotalTime : Date.now();

                // SELF DEFENSE OVERRIDE: If super close (< 5.0), ignore the Ignore List!
                const isVeryClose = (dist < 5.0);

                if (!isVeryClose) {
                    if (this.ignoredTargets.has(g.id) && now < this.ignoredTargets.get(g.id)) return Infinity;
                }
                if (g.isDead) return Infinity;

                // HEIGHT CHECK
                // const myH ... we don't have 'this' context in simple lambda? we do.
                const myH = this.terrain.getTileHeight(this.gridX, this.gridZ);
                const targetH = this.terrain.getTileHeight(g.gridX, g.gridZ);
                if (Math.abs(myH - targetH) > 10.0) return Infinity;

                // REGION CHECK
                if (this.terrain.grid) {
                    const mCell = this.terrain.grid[this.gridX][this.gridZ];
                    const tCell = this.terrain.grid[g.gridX][g.gridZ];
                    if (mCell && tCell && mCell.regionId !== tCell.regionId && mCell.regionId > 0 && tCell.regionId > 0) {
                        return Infinity; // Unreachable
                    }
                }

                // REGION CHECK
                if (!isVeryClose && this.terrain.grid) { // Skip region check if self-defense
                    const mCell = this.terrain.grid[this.gridX][this.gridZ];
                    const tCell = this.terrain.grid[g.gridX][g.gridZ];
                    if (mCell && tCell && mCell.regionId !== tCell.regionId && mCell.regionId > 0 && tCell.regionId > 0) {
                        return Infinity; // Unreachable
                    }
                }

                return dist; // Simple closest check
            }, goblinCandidates); // Pass candidates!

            if (goblin) {
                this.targetGoblin = goblin;
                this.reportEnemy(goblin);
                console.log(`Unit ${this.id} found Goblin via Spatial Search!`);
                return;
            }

            // 2. Buildings (Optimized)
            // Range 25. Types: goblin_hut or cave.
            const building = this.terrain.findBestTarget('building', x, z, 25, (b, dist) => {
                const now = window.game ? window.game.gameTotalTime : Date.now();
                const id = b.userData ? (b.userData.id || b.id) : b.id;
                if (id && this.ignoredTargets.has(id) && now < this.ignoredTargets.get(id)) return Infinity;

                if (b.userData.type === 'goblin_hut' || b.userData.type === 'cave') {
                    // REGION CHECK
                    if (this.terrain.grid) {
                        const mCell = this.terrain.grid[this.gridX][this.gridZ];
                        const tCell = this.terrain.grid[b.gridX][b.gridZ];
                        if (mCell && tCell && mCell.regionId !== tCell.regionId && mCell.regionId > 0 && tCell.regionId > 0) {
                            return Infinity;
                        }
                    }
                    return dist;
                }
                return Infinity; // Ignore other buildings
            });

            if (building) {
                console.log(`Unit ${this.id} found Base via Spatial Search!`);
                this.targetBuilding = building;
                this.reportEnemy(building);
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
            } else if (this.action === 'Going to Work' || this.action === 'Approaching Job') {
                // Keep the job label if we just arrived/built at job site
            }
            this.buildStagnationCount = 0;
        } else {
            // Check based on Target presence, not Action string (since executeMove overwrites action)
            if (this.migrationTarget) {
                if (this.role === 'worker') {
                    // Workers searched for land but failed to build. Try nearby.
                    console.log(`Unit ${this.id} (Worker) migration target invalid for build. Searching nearby...`);
                    this.moveRandomly(time);

                    // SAFETY: If moveRandomly failed to trigger move (stuck in corner), FORCE IDLE.
                    if (!this.isMoving) {
                        this.action = 'Idle';
                    }
                } else {
                    // Knights/Wizards just finished their "Migration" travel. 
                    // They don't build. Just stop here.
                    console.log(`Unit ${this.id} (${this.role}) finished migrating. Resuming Idle.`);
                    this.action = 'Idle';
                    this.migrationTarget = null;
                }
                this.buildStagnationCount = 0;
            } else if (!this.targetRequest) {
                // FIXED: Only count stagnation if we have NO active job.
                // Otherwise moving across large distances for a job triggers accidental migration.
                this.buildStagnationCount = (this.buildStagnationCount || 0) + 1;
                if (this.buildStagnationCount > 5) {
                    console.log(`Unit ${this.id} stuck/stagnant (No Build). Migrating...`);
                    this.migrate(time);
                    this.buildStagnationCount = 0;
                }
            } else {
                // Have job, reset stagnation
                this.buildStagnationCount = 0;
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
        // Use Actor.smartMove for robust movement (Pathing + Linear Fallback + Region Check)
        // Note: smartMove handles wrapping, reachability, and A* pathfinding
        const moved = this.smartMove(tx, tz, time);

        if (moved) {
            // Success
            this.stuckCount = 0;
        } else {
            // Blocked / Failed
            // Unit specific stuck handling
            if (!this.isMoving) {
                this.stuckCount = (this.stuckCount || 0) + 1;
                // Only give up after significant failures (e.g. 10 frames of blockage)
                // This prevents giving up on transient collisions, but ensures we eventually drop unreachable targets.
                if (this.stuckCount > 10) {
                    this.handleStuck();
                }
            }
        }
    }

    handleStuck() {
        // Give up logic
        const time = (window.game) ? window.game.gameTotalTime : 0;
        console.log(`Unit ${this.id} stuck. Handling stuck state...`);

        this.path = null;

        // Ignore current targets
        const ignoreDuration = time + 5000;
        if (this.targetGoblin) {
            this.ignoredTargets.set(this.targetGoblin.id, ignoreDuration);
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
        this.action = "Idle";
        this.isMoving = false;

        // Revert to Random Move or Idle
        console.warn(`[Unit ${this.id}] Stuck Recovery triggered. Resetting to Idle.`);
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
            const now = (this.game) ? this.game.gameTotalTime : Date.now();
            if (now - (this.lastWaterLogTime || 0) > 5000) {
                console.log(`[Unit ${this.id}] Blocked by Water at ${checkX},${checkZ} H:${targetHeight}`);
                this.lastWaterLogTime = now;
            }
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
        // Protect specific actions (Migrating, Reinforcing, Job-related, etc.)
        const protectedActions = ["Migrating", "Reinforcing", "Going to Work", "Approaching Job", "Working", "Harvesting", "Fighting", "Sieging", "Chasing"];
        // ACTION OVERWRITE FIX:
        // Only set "Moving" if we are in a bland state. "Idle", "Wandering", "Patrolling".
        // Never overwrite Job/Combat specific action strings.
        // Also respect "isMoving" flag from State Machine.
        if (!this.action || this.action === "Idle" || this.action === "Wandering" || this.action === "Patrolling") {
            this.action = "Moving";
        }

        // Speed Logic (Can override Entity defaults)
        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetHeight = this.terrain.getTileHeight(nextX, nextZ);
        const heightDiff = Math.abs(targetHeight - currentHeight);

        // Base Speed: 0.8s per tile
        // Slope Penalty: +1.0s per height unit
        // High Altitude (>8): +2.0s flat penalty (Thin air / Snow)
        let base = 0.8;
        if (targetHeight > 8) base += 2.0;

        // DISTANCE CHECK (Horizontal)
        // FIX: If we are already moving, we must calculate distance from our CURRENT VISUAL POSITION
        // otherwise retargeting mid-move causes "Overspeed" (covering extra distance in standard time).

        let startX = this.gridX;
        let startZ = this.gridZ;

        if (this.isMoving) {
            const progress = (time - this.moveStartTime) / this.moveDuration;
            // Clamp progress for safety, though >1 handled by updateMovement usually
            const p = Math.max(0, Math.min(1, progress));

            // Wrap safe Lerp (copied from Entity logic)
            let sx = this.startGridX;
            let sz = this.startGridZ;
            let tx = this.targetGridX;
            let tz = this.targetGridZ; // Use actual memory targets

            // Wrap adjust
            if (tx - sx > logicalW / 2) sx += logicalW;
            if (sx - tx > logicalW / 2) sx -= logicalW;
            if (tz - sz > logicalD / 2) sz += logicalD;
            if (sz - tz > logicalD / 2) sz -= logicalD;

            startX = sx + (tx - sx) * p;
            startZ = sz + (tz - sz) * p;
        }

        let dx = Math.abs(nextX - startX);
        let dz = Math.abs(nextZ - startZ);
        if (dx > logicalW / 2) dx = logicalW - dx; // Wrap logic
        if (dz > logicalD / 2) dz = logicalD - dz;
        const dist2D = Math.sqrt(dx * dx + dz * dz);

        // Apply distance multiplier 
        // Use Math.max(0.1) just in case dist2D is tiny to avoid 0 duration
        this.moveDuration = (base * Math.max(0.1, dist2D)) + (heightDiff * 1.0);

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
                // Ensure resources exist
                if (window.game && window.game.resources) {
                    window.game.resources.fish = (window.game.resources.fish || 0) + 1;
                }
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

            // Region Check (CRITICAL FIX)
            const myCell = this.terrain.grid[this.gridX][this.gridZ];
            const targetCell = this.terrain.grid[goblin.gridX][goblin.gridZ];

            if (myCell && targetCell) {
                const myRegion = myCell.regionId;
                const targetRegion = targetCell.regionId;

                if (myRegion > 0) {
                    // Land-to-Land: Must match
                    if (targetRegion !== myRegion) continue;
                } else {
                    // Water-to-Land: Strictly Forbidden (Blindness)
                    // Prevents "Seeing Island from Shore"
                    if (targetRegion > 0) continue;
                }
            }

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
        let dx = Math.abs(this.gridX - tx);
        let dz = Math.abs(this.gridZ - tz);

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        if (dx > logicalW / 2) dx = logicalW - dx;
        if (dz > logicalD / 2) dz = logicalD - dz;

        return Math.sqrt(dx * dx + dz * dz);
    }

    moveRandomly(time) {
        // Region-based Exploration (Replacing old random walk)

        // 1. Get Current Region
        const currentRegion = this.terrain.getRegion(this.gridX, this.gridZ);

        // 2. Determine Patrol Radius (Larger for Knights)
        const radius = (this.role === 'knight') ? 30 : 15;

        // 3. Find Valid Point in SAME Region
        const target = this.terrain.getRandomPointInRegion(currentRegion, this.gridX, this.gridZ, radius);

        if (target) {
            this.smartMove(target.x, target.z, time);
        } else {
            // Fallback: Just stand still or try small random step if stuck
            this.checkStuck();
        }
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
        this.action = 'Migrating';
        // Ensure state is valid so updateLogic delegates to State Machine
        if (!this.state || !(this.state instanceof UnitWanderState)) {
            this.state = new UnitWanderState(this); // Direct set to avoid 'enter' overriding action if not careful
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
        if (this.state && this.state.constructor) {
            const stateName = this.state.constructor.name;

            // Map State Class Names to User-Friendly Display Strings
            if (stateName === "UnitWanderState") {
                return (this.role === 'knight' || this.role === 'wizard') ? "Patrol" : "Wander";
            }
            if (stateName === "CombatState") {
                if (this.targetGoblin) return 'Combat';
                if (this.targetBuilding) return 'Siege';
                if (this.targetRaidPoint) return `Patrolling (${this.targetRaidPoint.x},${this.targetRaidPoint.z})`;
                return 'Combat';
            }
            if (stateName === "JobState") return 'Working';
            if (stateName === "SleepState") return 'Sleeping';

            return stateName; // Fallback to class name
        }

        // Fallback checks for units without states (backwards compat)
        if (this.targetRequest) return 'Working';
        if (this.targetGoblin || this.targetBuilding) return 'Combat';

        if (this.role === 'knight' || this.role === 'wizard') return 'Patrol';
        return 'Wander';
    }

    updateLogic(time, deltaTime, isNight, goblins, fishes, sheeps) {
        this.simTime = time;
        // 1. Always update death animation (Fix: Sticky Cross)
        this.updateDeathAnimation(deltaTime);

        // 2. Stop logic if dead (Fix: Ghost Unit / Proceeds without display)
        if (this.isDead) return;

        // 0. Aging Logic (Restored)
        const ageRate = (this.role === 'knight' || this.role === 'wizard') ? 0.02 : 0.2;
        this.age += deltaTime * ageRate;
        if (this.age >= this.lifespan && !this.isDead) { // Redundant !isDead check but safe
            this.die();
            return; // Stop logic if dead
        }

        // 1. State Machine (Priority)
        if (this.state) {
            this.state.update(time, deltaTime, isNight, goblins);
        }



        // 3. Combat / Defense
        // Removed duplicated call. Handled by State Machine (CombatState).
        // if (this.updateCombatLogic) this.updateCombatLogic(time, deltaTime);

        // 4. Legacy Checks (Test Compatibility / Fallback)
        // OPTIMIZATION: If we have a State Machine, DO NOT run these legacy checks concurrently!
        // This was causing double-processing (O(N^2) or 2x CPU usage).
        // FIX: Ensure this block ONLY runs if really no state (e.g. Unit Tests without State)
        if (!this.state) {
            if (this.checkSelfDefense) this.checkSelfDefense(goblins);
            if (this.searchSurroundings) this.searchSurroundings(this.gridX, this.gridZ, goblins);
        }
    }

    // --- COMBAT LOGIC (RESTORED) ---
    // Implemented to fix Indestructible Caves and Passive Units


    updateCombatLogic(time, deltaTime) {
        // LEGACY: Deprecated. Logic moved to CombatState.js
        // Kept empty structure if external calls exist, but implementation removed to prevent conflict.
        return;
    }



    tryBuildStructure(time) {
        // Restriction: Only Workers can build (User Request)
        if (this.role !== 'worker') return false;

        // Busy Check: If assigned a job, do not auto-build
        if (this.targetRequest) {
            console.log(`[Unit ${this.id}] tryBuildStructure BLOCKED by targetRequest: ${this.targetRequest.id}`);
            return false;
        }

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const x = this.gridX;
        const z = this.gridZ;
        const cell = this.terrain.grid[x][z];

        if (cell.hasBuilding) return false;

        if (cell.height > 8) return false;

        const buildings = (this.terrain && this.terrain.buildings) ? this.terrain.buildings : [];
        const houseCount = buildings.filter(b => b.type === 'house').length;
        const farmCount = buildings.filter(b => b.type === 'farm').length;
        const mansionCount = buildings.filter(b => b.type === 'mansion').length;
        const totalPop = window.game ? window.game.totalPopulation : 0;

        // 2. Tower Logic (3x3) - Unlock at 3000
        const towers = buildings.filter(b => b.type === 'tower');
        const towerTarget = Math.floor(totalPop / 3000);

        if (towers.length < towerTarget) {
            if (this.terrain.checkFlatArea(x, z, 3)) {
                this.terrain.addBuilding('tower', x, z);
                this.moveRandomly(time);
                return true;
            }
        }

        // 3. Barracks Logic (3x3) - Replaces Mansion
        const barracksCount = buildings.filter(b => b.type === 'barracks').length;
        // Logic: 1 Barracks per 1000 pop or just keep same ratio as original
        const barracksTarget = Math.floor(totalPop / 1000);

        if (barracksCount < barracksTarget) {
            // Barracks is size 3 now
            if (this.terrain.checkFlatArea(x, z, 3)) {
                this.terrain.addBuilding('barracks', x, z);
                this.moveRandomly(time);
                return true;
            }
        }

        // 3. Farm Logic (2x2)
        const res = (window.game && window.game.resources) ? window.game.resources : { grain: 100 };
        const food = res.grain || 0;
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
        let cell = null;
        if (this.terrain.grid[this.gridX] && this.terrain.grid[this.gridX][this.gridZ]) {
            cell = this.terrain.grid[this.gridX][this.gridZ];
        } else {
            console.error(`[Unit ${this.id}] buildFarm: Cell not found at ${this.gridX},${this.gridZ}`);
        }

        if (cell) {
            if (cell.moisture < 0.2) {
                console.error(`[Unit ${this.id}] Farm failed: Too dry (${cell.moisture}). Improving land.`);
                this.improveLand(time);
                return true; // Action taken (Improvement)
            }
            const m = cell.moisture || 0.5;

            const diff = Math.abs(m - 0.5);
            let successChance = 1.0 - (diff * 2.5);
            if (successChance < 0) successChance = 0;

            if (Math.random() > successChance) {
                console.log(`Farm construction failed due to soil conditions (Moisture: ${m.toFixed(2)}, Chance: ${(successChance * 100).toFixed(0)}%). Improving Land.`);
                this.improveLand(time);
                return true; // Action taken
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
            id: this.id, // PERSIST ID
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
            console.log(`[Unit ${this.id}] Pathfinding SUCCESS! Found path of length ${path.length} to ${tx},${tz}`);
            this.path = path;
            this.stuckCount = 0; // Reset stuck since we found a solution
        } else {
            // console.warn(`[Unit ${this.id}] Pathfinding Failed.`);
            // ABORT TARGET if unreachable (Prevent sticking to coast)
            // Downgraded log to prevent spam
            if (this.id === 0 || Math.random() < 0.05) console.log(`[Unit ${this.id}] Pathfinding Failed (UNREACHABLE). Blocked by terrain/water? Aborting & Blacklisting.`);

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
                this.ignoredTargets.set(`p_${this.targetRaidPoint.x}_${this.targetRaidPoint.z}`, now + 15.0);
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
        const type = data.type || data.role || (data.isSpecial ? 'knight' : 'worker'); // Fallback logic
        const unit = new Unit(scene, terrain, data.gridX, data.gridZ, type, data.isSpecial);
        unit.id = (data.id !== undefined) ? Number(data.id) : unit.id; // Restore ID as Number
        unit.age = data.age || 20;

        // Restore State Properties
        // We must override the default state set by constructor if needed
        // Assuming default constructor sets WanderState which makes isMoving=false

        if (data.isMoving) {
            unit.isMoving = true;
        }

        if (data.moveDuration) {
            unit.moveDuration = data.moveDuration;
        }



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
        const actionStr = (unit.action || "Idle").toLowerCase();
        if (actionStr.includes('job') || actionStr.includes('work')) {
            unit.changeState(new JobState(unit));
        } else if (actionStr.includes('fight') || actionStr.includes('combat')) {
            unit.changeState(new CombatState(unit));
        } else if (actionStr.includes('sleep')) {
            unit.changeState(new SleepState(unit));
        } else {
            unit.changeState(new UnitWanderState(unit));
        }

        if (unit.isDead) {
            if (!unit.isFinished) {
                unit.createCross();
            }
        }

        // Restore Ignored Targets (Job Stability)
        if (data.ignoredTargets && Array.isArray(data.ignoredTargets)) {
            unit.ignoredTargets = new Map(data.ignoredTargets);
        }

        return unit;
    }
}
