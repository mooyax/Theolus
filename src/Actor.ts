import * as THREE from 'three';
import { Entity } from './Entity';

export class Actor extends Entity {
    public static ignoreDetectionProbability: boolean = false; // Added for testing
    public path: any[] | null;
    public pathIndex: number;
    public stuckCount: number;
    public stuckTimer: number;
    public lastPos: THREE.Vector3;
    public pathFailCount: number;
    public action: string = "";
    public lastMoveLog: string = ""; // Debug Info
    public raidGoal: { x: number, z: number, timestamp?: number } | null = null;
    public age: number = 0;
    public lifespan: number = 100;
    public isFinished: boolean = false;
    public unreachableTimer: number = 0;

    // AI Target Interaction
    public mesh: THREE.Mesh | any = null;
    public targetRequest: any | null; // Job
    public targetItem: any | null;    // Item to pick up
    public heldItem: any | null;
    public targetEntity: any | null;  // Generic target
    public targetBuilding: any | null = null;

    // Combat
    public hp: number;
    public maxHp: number;
    public damage: number;
    public attackRate: number;
    public attackCooldown: number;
    public attackRange: number;
    public isRanged: boolean = false;
    public isNaval: boolean = false;
    public projectileColor: number = 0xFF4400; // Default Orange/Fire
    public scale: number = 1.0;
    public faction: string = 'neutral';

    // Config
    public baseMoveDuration: number;

    // AI Pathfinding State
    public lastPathTime: number = 0;
    public isPathfinding: boolean;
    public isPathfindingThrottled: boolean = false;
    public isUnreachable: boolean = false;
    public isWaitingForPath: boolean = false;
    public minDistToTarget: number;
    public pathStagnation: number;
    public pathRequestId: number = 0; // Async Stale Check
    public pathTargetX?: number;
    public pathTargetZ?: number;
    public pathRequestedTargetX?: number;
    public pathRequestedTargetZ?: number;

    // State Machine
    public state: any;
    public simTime: number;

    public targetUnit: any | null = null;
    public targetGoblin: any | null = null;
    public lastScanFrame: number = -1;
    public scanTimer: number = 0;
    public stagnationTimer: number = 0;
    private _lastDelta: number = 0;
    public ignoredTargets: Map<string | number, number> = new Map();
    public detectionProbability: number = 1.0;
    public findPathAsync?: (tx: number, tz: number, depth?: number, id?: number) => Promise<any[] | null>;

    /**
     * Common damage handling for all actors.
     * Includes "Death Counter" logic (retaliation before dying) and automatic targeting.
     */
    public takeDamage(amount: number, attacker: any = null, isCounter: boolean = false) {
        if (this.isDead) return;

        // --- DEATH COUNTER (Retaliation) ---
        // If lethal damage and close range, hit back before dying
        if (amount >= this.hp && !isCounter && attacker && attacker.hp > 0) {
            const dist = this.getDistance(attacker.gridX, attacker.gridZ);
            const meleeRange = 2.0;

            if (dist <= meleeRange) {
                // Counter attack deals 50% damage
                const counterDmg = (this as any).damage ? (this as any).damage * 0.5 : 5;
                if (typeof attacker.takeDamage === 'function') {
                    attacker.takeDamage(counterDmg, this, true);
                }
            }
        }

        this.hp -= amount;
        if (this.id === 0 || (attacker && attacker.id === 0)) console.log(`[Damage Debug] ${this.type} (ID:${this.id}) took ${amount} dmg from ${attacker ? attacker.type : 'unknown'}. HP: ${this.hp.toFixed(1)}/${this.maxHp}`);
        if (isNaN(this.hp)) this.hp = 0;

        if (this.hp <= 0) {
            this.hp = 0;
            if ((this as any).die) {
                (this as any).die();
            } else {
                this.isDead = true;
            }
        } else {
            // Retaliation: Target the attacker if not already engaged
            if (attacker && attacker.hp > 0 && !this.targetUnit && !this.targetGoblin && !this.targetBuilding) {
                // Use faction/base type for robust targeting
                const aType = attacker.type; // subspecies for goblins, 'unit' for units
                const isGoblin = (aType === 'goblin' || attacker.faction === 'enemy');
                const isUnit = (aType === 'unit' || aType === 'sheep' || attacker.faction === 'player');

                if (isGoblin) {
                    this.targetGoblin = attacker;
                } else if (isUnit) {
                    this.targetUnit = attacker;
                }
            }
        }
    }

    /**
     * Unified attack method for all targets (units or buildings).
     */
    public attack(target: any): boolean {
        const time = (window as any).game?.simTotalTimeSec || 0;
        return this.performAttack(target, time);
    }


    getDistanceToBuilding(target: any): number {
        if (!target) return Infinity;
        let size = 1;
        const bType = target.type || target.userData?.type;
        if (target.userData?.isBuilding || bType === 'cave' || target.type === 'building' || (!target.role && target.hp !== undefined)) {
            if (this.terrain && typeof this.terrain.getBuildingSize === 'function' && bType) {
                size = this.terrain.getBuildingSize(bType);
            } else if (target.userData?.size) {
                size = target.userData.size;
            } else if (bType === 'cave') {
                size = 2; // Safety fallback
            }
        }

        const W = (this.terrain && this.terrain.logicalWidth) || 160;
        const D = (this.terrain && this.terrain.logicalDepth) || 160;

        if (size <= 1) {
            return this.getDistance(target.gridX, target.gridZ);
        }

        let minDist = Infinity;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // Correct wrapping for each tile of the multi-tile building
                const tx = ((target.gridX + i) % W + W) % W;
                const tz = ((target.gridZ + j) % D + D) % D;
                const d = this.getDistance(tx, tz);
                if (d < minDist) minDist = d;
            }
        }
        return minDist;
    }

    /**
     * Internal implementation of the attack logic.
     * Shared by both the main dispatcher and specialized wrappers.
     */
    protected performAttack(target: any, time: number): boolean {
        // ALWAYS LOG entry for simulation debugging
        const t = (time !== undefined) ? time : ((window as any).game ? (window as any).game.simTotalTimeSec : 0) || 0;
        const acd = this.attackCooldown || 0;

        if (this.id === 0 || (target && target.id === 0) || this.type === 'goblin_king') {
            console.log(`[Combat Entry] ${this.type} (ID:${this.id}) trying to attack ${target ? (target.type || target.userData?.type) : 'null'} (ID:${target ? target.id : 'null'}) at time ${t.toFixed(1)}. CD:${acd.toFixed(2)} TargetDead:${target?.isDead}`);
        }

        if (!target || target.isDead || target.hp <= 0) return false;
        if (acd > 0) return false;

        const range = this.attackRange || 2.0;
        const effectiveDist = this.getDistanceToBuilding(target);

        if (effectiveDist <= range) {
            this.action = 'Fighting';

            // Face Target (Center of building)
            const bType = target.type || target.userData?.type;
            const size = (this.terrain && typeof this.terrain.getBuildingSize === 'function' && bType) ? this.terrain.getBuildingSize(bType) : 1;
            const W = (this.terrain && this.terrain.logicalWidth) || 160;
            const D = (this.terrain && this.terrain.logicalDepth) || 160;

            const targetCenterX = target.gridX + (size - 1) * 0.5;
            const targetCenterZ = target.gridZ + (size - 1) * 0.5;

            let dx = targetCenterX - this.gridX;
            let dz = targetCenterZ - this.gridZ;

            // Wrap dx/dz for rotation
            if (Math.abs(dx) > W / 2) dx -= Math.sign(dx) * W;
            if (Math.abs(dz) > D / 2) dz -= Math.sign(dz) * D;

            this.rotationY = Math.atan2(dx, dz);

            // Apply Damage
            const dmg = this.damage || 5;
            if (typeof target.takeDamage === 'function') {
                target.takeDamage(dmg, this);
            }

            // Visuals / Projectiles (Only spawn when attack actually happens)
            if (this.isRanged && (window as any).game && (window as any).game.spawnProjectile) {
                const startHeight = 0.8 * (this.scale || 1.0);
                const startPos = this.position.clone().add(new THREE.Vector3(0, startHeight, 0));

                let targetPos: THREE.Vector3;
                if (target.position) {
                    targetPos = target.position.clone().add(new THREE.Vector3(0, 0.5, 0));
                } else {
                    // For buildings, target the center visually
                    const ty = (target.y || target.userData?.y || 0) + 1.5;
                    const worldCenter = this.terrain.getVisualPosition(targetCenterX, targetCenterZ);
                    targetPos = new THREE.Vector3(worldCenter.x, ty, worldCenter.z);
                }

                (window as any).game.spawnProjectile(startPos, targetPos, this.projectileColor);
            }

            // Set Cooldown
            this.attackCooldown = this.attackRate || 1.0;
            return true;
        } else {
            if (this.id === 0 || (target && target.id === 0) || this.type === 'goblin_king') {
                console.log(`[Combat Debug] ${this.type} (ID:${this.id}) OUT OF RANGE for ${target.type || target.userData?.type}. Range:${range.toFixed(1)} Dist:${effectiveDist.toFixed(1)}`);
            }
        }

        return false;
    }

    die(reason?: string) {
        if (this.isDead) {
            if (this.mesh) this.mesh.visible = false;
            return;
        }
        this.isDead = true;
        if (this.mesh) this.mesh.visible = false;
        if (this.terrain && this.terrain.unregisterEntity) {
            this.terrain.unregisterEntity(this);
        }
    }

    getBehaviorMode(): string { return 'Idle'; }
    onMoveStep(time: number) { }

    constructor(scene: THREE.Scene, terrain: any, x: number, z: number, type: string) {
        super(scene, terrain, x, z, type);

        // AI State
        this.path = null;
        this.pathIndex = 0;
        this.stuckCount = 0;
        this.pathFailCount = 0;
        this.lastPathTime = 0;
        this.isPathfinding = false;
        this.isPathfindingThrottled = false;
        this.isUnreachable = false;
        this.isWaitingForPath = false;

        this.minDistToTarget = Infinity;
        this.pathStagnation = 0;
        this.stagnationTimer = 0; // Initialize stagnation timer

        this.state = null;
        this.simTime = 0;

        this.action = 'Idle';
        this.hp = 100;
        this.maxHp = 100;
        this.damage = 10;
        this.attackRate = 1.0;
        this.attackCooldown = 0;
        this.attackRange = 1.0;
        this.baseMoveDuration = 1.0;
        this.stuckTimer = 0;
        this.lastPos = new THREE.Vector3(this.gridX, 0, this.gridZ);
        this.pathFailCount = 0;
        this.stagnationTimer = 0;
    }

    changeState(newState: any) {
        if (!newState) return;
        if (this.state && this.state.exit) {
            this.state.exit(newState);
        }
        const prevState = this.state;
        this.state = newState;
        if (this.state.enter) {
            this.state.enter(prevState);
        }
    }

    isReachable(tx: number, tz: number, isManualOverride?: boolean) {

        if (!this.terrain || !this.terrain.grid) return true;
        const logicalW = this.terrain.logicalWidth || 240;
        const logicalD = this.terrain.logicalDepth || 240;

        let checkX = Math.round(tx);
        let checkZ = Math.round(tz);
        checkX = ((checkX % logicalW) + logicalW) % logicalW;
        checkZ = ((checkZ % logicalD) + logicalD) % logicalD;

        const mCell = this.terrain.grid[Math.floor(this.gridX)] ? this.terrain.grid[Math.floor(this.gridX)][Math.floor(this.gridZ)] : null;
        const tCell = this.terrain.grid[checkX] ? this.terrain.grid[checkX][checkZ] : null;

        if (mCell && tCell) {
            const mRegion = mCell.regionId;
            const tRegion = tCell.regionId;

            // SAME REGION: Always reachable if on same landmass/waterbody
            if (mRegion === tRegion || mRegion === undefined || tRegion === undefined) return true;

            // ADJACENT CHECK (e.g. Land worker reaching adjacent water tile)
            // Relax for building requests (radius 5 instead of 1)
            const radius = isManualOverride ? 5 : 1;
            if (this.terrain.isAdjacentToRegion && this.terrain.isAdjacentToRegion(tx, tz, mRegion, radius)) {
                return true;
            }

            // CROSS-REGION CHECK: Strictly unreachable if regions differ
            if (this.isNaval) {
                // Ships in shallow water (0.0-0.5) might be in a land region (Positive ID)
                // but should be reachable from water (RegionId 0 or Negative)
                const mH = mCell.height;
                const tH = tCell.height;
                if (mH <= 0.5 && tH <= 0.5) return true;
            }

            if (this.isRanged && (this as any).attackRange) {
                const dist = this.getDistance(tx, tz);
                if (dist <= (this as any).attackRange) return true;
            }

            return false;
        }
        return true;
    }

    triggerMove(tx, tz, time) {
        return this.smartMove(tx, tz, time);
    }

    clearPath() {
        if (this.isMoving) {
            this.stopMove(this.simTime || 0);
        }
        this.path = null;
        this.pathRequestId++;
        this.pathTargetX = undefined;
        this.pathTargetZ = undefined;
        this.isPathfinding = false;
        this.isWaitingForPath = false;
    }

    setMoveLog(reason: string, time: number, isError: boolean = false) {
        const lastTime = (this as any).lastMoveLogTime || 0;
        const lastWasError = (this as any).lastMoveLogIsError || false;
        if (lastWasError && (time - lastTime < 1.0) && !isError) return;
        this.lastMoveLog = reason;
        (this as any).lastMoveLogTime = time;
        (this as any).lastMoveLogIsError = isError;
    }

    smartMove(tx: number, tz: number, time: number, depth: number = 0): boolean {
        if (isNaN(tx) || isNaN(tz)) return false;
        if (depth > 10) return false;

        if (this.isUnreachable) {
            if (!this.unreachableTimer) this.unreachableTimer = time;
            if (time - this.unreachableTimer > 5.0) {
                this.isUnreachable = false;
                this.unreachableTimer = 0;
            }
        }

        if (this.isUnreachable) return false;
        if (depth > 5) return false;
        if (tx === 0 && tz === 0) return false;

        this.isPathfindingThrottled = false;
        this.isWaitingForPath = false;

        // 1. Path Following
        if (this.path && this.path.length > 0) {
            this.setMoveLog("Following Path", time);
            const pTx = (this as any).pathTargetX;
            const pTz = (this as any).pathTargetZ;

            let invalid = false;
            if (pTx !== undefined && pTz !== undefined) {
                if (this.getDistance(tx, tz, pTx, pTz) > 1.0) invalid = true;
            }

            if (invalid) {
                const timeSinceLast = (time === 0 || this.lastPathTime === 0) ? 999 : Math.abs(time - this.lastPathTime);
                if (timeSinceLast < 1.0) {
                    this.isPathfindingThrottled = true;
                    return this.isMoving; // Return true only if already moving; if idle, return false to allow stuck detection
                }
                this.clearPath();
            }

            if (this.path && this.path.length > 0) {
                const node = this.path[0];
                const distToNextNode = this.getDistance(node.x, node.z);
                // console.log(`[Actor ${this.id}] Path following. Node:${node.x},${node.z} Dist:${distToNextNode}`);
                if (distToNextNode < 0.1) {
                    this.path.shift();
                    if (this.path.length === 0) {
                        this.path = null;
                    } else {
                        return this.smartMove(tx, tz, time, depth + 1);
                    }
                } else {
                    const isHeadingToWaypoint = this.isMoving && this.getDistance(node.x, node.z, (this as any).targetGridX, (this as any).targetGridZ) < 0.01;
                    if (isHeadingToWaypoint) {
                        return true;
                    }
                    if (!this.canMoveTo || this.canMoveTo(node.x, node.z)) {
                        this.executeMove(node.x, node.z, time);
                        return true;
                    } else {
                        this.clearPath();
                    }
                }
            }
        }

        // 2. Pathfinding / Fallback
        if (!this.path || this.path.length === 0) {
            const dist = this.getDistance(tx, tz);
            if (dist <= 1.5) {
                if (dist < 0.05) {
                    this.isMoving = false;
                    return false;
                }
                const isAlreadyHeadingThere = this.isMoving && Math.abs(this.targetGridX - tx) < 0.01 && Math.abs(this.targetGridZ - tz) < 0.01;
                if (!isAlreadyHeadingThere) this.executeMove(tx, tz, time);
                return true;
            }

            if (dist < 0.01) {
                this.isMoving = false;
                return false;
            }

            const timeSinceLast = (time === 0 || this.lastPathTime === 0) ? 999 : Math.abs(time - this.lastPathTime);
            const isManualJob = (this.action === 'Approaching Job' || this.action === 'Chasing' || (this as any).targetRequest?.isManual);
            if (timeSinceLast < 1.0 && !isManualJob) {
                this.isPathfindingThrottled = true;
                return true; // Return true to indicate busy/waiting
            }
            if (this.isPathfinding) return true;

            const isNewTarget = (tx !== this.pathTargetX || tz !== this.pathTargetZ);
            if (isNewTarget) {
                this.isUnreachable = false;
                this.pathFailCount = 0;
            }

            if (this.isUnreachable || !this.isReachable(tx, tz, isManualJob)) {
                this.isUnreachable = true;
                this.pathFailCount++; // Count reachable/bounds failures as path failures
                return false;
            }

            this.isUnreachable = false;
            this.isPathfinding = true;

            const calls = (this.terrain && this.terrain.pathfindingCalls) || 0;
            if (calls >= 500) {
                this.isWaitingForPath = true;
                this.isPathfinding = false;
                return true;
            }

            this.lastPathTime = time;
            if (this.terrain) this.terrain.pathfindingCalls = (this.terrain.pathfindingCalls || 0) + 1;

            if (typeof this.terrain.findPathAsync !== 'function') {
                this.isPathfinding = false;
                return false;
            }

            this.pathRequestId++;
            const currentRequestId = this.pathRequestId;
            this.isWaitingForPath = true;
            this.terrain.findPathAsync(this.gridX, this.gridZ, tx, tz, 0, this.id, this.isNaval)
                .then(newPath => {
                    if (this.pathRequestId !== currentRequestId) return;
                    this.isPathfinding = false;
                    this.isWaitingForPath = false;
                    if (!newPath || newPath.length === 0) {
                        this.isUnreachable = true;
                        this.unreachableTimer = time;
                        this.pathFailCount++;
                    } else {
                        this.path = newPath;
                        this.pathTargetX = tx;
                        this.pathTargetZ = tz;
                        this.isUnreachable = false;
                        this.smartMove(tx, tz, time, depth + 1);
                    }
                })
                .catch(() => {
                    this.isPathfinding = false;
                    this.isWaitingForPath = false;
                    this.isUnreachable = true;
                });
            return true;
        }
        return false;
    }

    update(time: number, deltaTime: number) {
        this._lastDelta = deltaTime;
        this.updateMovement(time);
        this.updateLogic(time, deltaTime);

        // Update lastPos AFTER logic checks so distSq calculation in updateLogic is valid for next frame
        this.lastPos.set(this.gridX, 0, this.gridZ);
    }
    updateMovement(time: number) {
        super.updateMovement(time);
    }


    onMoveFinished(time: number) {
        if (this.isDead || this.isFinished) return;

        // Path following recursion
        if (this.path && this.path.length > 0) {
            const tx = this.pathTargetX !== undefined ? this.pathTargetX : this.path[this.path.length - 1].x;
            const tz = this.pathTargetZ !== undefined ? this.pathTargetZ : this.path[this.path.length - 1].z;
            this.smartMove(tx, tz, time);
        }
    }

    updateLogic(time: number, deltaTime: number, isNight: boolean = false, units: any[] | null = null, buildings: any[] | null = null, goblins: any[] | null = null) {
        if (this.isDead || this.isFinished) return;
        this.simTime = time;

        // --- Stagnation Tracking (AI timeout) ---
        let isStagnant = !this.isMoving;
        if (this.isMoving) {
            const limit = Math.max(3.0, (this.moveDuration || 1.0) * 3 + 2.0);
            if (time - this.moveStartTime > limit) isStagnant = true;
        }

        if (isStagnant) {
            this.stagnationTimer = (this.stagnationTimer || 0) + deltaTime;
        } else {
            const distSq = (this.gridX - this.lastPos.x) ** 2 + (this.gridZ - this.lastPos.z) ** 2;
            if (distSq > 0.0001) {
                this.stagnationTimer = 0;
            }
        }

        this.updateLifecycle(deltaTime);

        // 1. Scan for targets (can be overridden/mocked)
        // MANUAL JOBS should ignore distractions (satisfies ManualJobFlicker.test.js)
        // REGULAR JOBS should still allow Self-Defense (satisfies Regression_WorkerLogic.test.js)
        const isDoingManualJob = this.targetRequest && this.targetRequest.isManual;
        if (!isDoingManualJob) {
            const forceFirstScan = (this.lastScanFrame === -1);
            this.checkSelfDefense(goblins, forceFirstScan, units, buildings);
        }

        // 2. Update state logic
        if (this.state && typeof this.state.update === 'function') {
            this.state.update(time, deltaTime, isNight, units, buildings, goblins);
        }
    }

    checkSelfDefense(passedGoblins: any[] | null = null, forceScan: boolean = false, passedUnits: any[] | null = null, passedBuildings: any[] | null = null) {
        const hasSearch = this.terrain && typeof (this.terrain as any).findBestTarget === 'function';

        // QUICK EXIT: If already in combat and has target, update it and return true
        const hasUrgentTarget = !!(this.targetGoblin || this.targetUnit || this.targetBuilding);
        if (hasUrgentTarget) {
            if (hasSearch) {
                const bList = passedBuildings || (this.game && this.game.buildings) || [];
                this.updateCombatTarget(passedUnits, bList, passedGoblins);
            }
            return true;
        }

        // Throttling Check (Optimized performance)
        if (hasSearch && this.game) {
            const frameCount = (this.game as any).frameCount || 0;
            const role = (this as any).role || this.type;
            const interval = (role === 'knight' || role === 'wizard') ? 10 : (role === 'worker' ? 30 : 20);

            const shouldScan = (forceScan || ((frameCount + this.id) % interval === 0));
            if (shouldScan) {
                // SCAN BUDGET CHECK
                if (!forceScan && this.game.unitScanBudget !== undefined) {
                    let isNearby = false;
                    const cam = this.game.camera;
                    if (cam && this.position) {
                        const distSq = (this.position.x - cam.position.x) ** 2 + (this.position.z - cam.position.z) ** 2;
                        if (distSq < 400) isNearby = true;
                    }

                    if (!isNearby) {
                        if (this.game.unitScanBudget > 0) {
                            this.game.unitScanBudget--;
                        } else {
                            return false; // Skip scan due to budget
                        }
                    }
                }

                // ALLOW workers with jobs to scan, but keep them on a strict budget/interval
                // (Old code skipped them entirely)

                // Sync targets
                const bList = passedBuildings || (this.game && this.game.buildings) || [];
                this.updateCombatTarget(passedUnits, bList, passedGoblins);
                this.lastScanFrame = frameCount;
                return true;
            }
        }
        return false;
    }

    updateCombatTarget(passedUnits: any[] | null, passedBuildings: any[] | null, passedGoblins: any[] | null) {
        if (this.isDead || this.isFinished) return;

        // --- PROBABILISTIC DETECTION ---
        // If we don't have a target, only scan based on probability
        const hasUrgentTarget = !!(this.targetGoblin || this.targetUnit || this.targetBuilding);
        if (!hasUrgentTarget && this.detectionProbability < 1.0 && !Actor.ignoreDetectionProbability) {
            if (Math.random() > this.detectionProbability) return;
        }

        if (!this.terrain || typeof (this.terrain as any).findBestTarget !== 'function') return;

        const role = (this as any).role || this.type;
        const maxDist = (role === 'knight' || role === 'wizard') ? 50 : 20;

        // 1. Unified Search Scope
        const golbinList = (passedGoblins && passedGoblins.length > 0) ? passedGoblins : (this.game && this.game.goblinManager && Array.isArray(this.game.goblinManager.goblins) ? this.game.goblinManager.goblins : []);
        const unitList = (passedUnits && passedUnits.length > 0) ? passedUnits : (this.game && Array.isArray(this.game.units) ? this.game.units : []);
        const sheepList = (this.game && this.game.sheepManager && Array.isArray(this.game.sheepManager.sheeps)) ? this.game.sheepManager.sheeps : [];
        const buildingList = (passedBuildings && passedBuildings.length > 0) ? passedBuildings : (this.game && Array.isArray(this.game.buildings) ? this.game.buildings : []);

        // 2. Scan Categories
        let bestTarget: any = null;
        let bestScore = Infinity;
        let targetType: 'goblin' | 'unit' | 'building' | null = null;

        // --- Goblin Scan ---
        const foundGoblin = (this.terrain as any).findBestTarget('goblin', this.gridX, this.gridZ, maxDist, (g: any, dist: number) => {
            if (g.isDead || g.isFinished || g.id === this.id) return Infinity;
            if (this.ignoredTargets && (this.ignoredTargets.get(g.id) || 0) > this.simTime) return Infinity;
            return (this.targetGoblin && this.targetGoblin.id === g.id) ? dist * 0.4 : dist;
        }, golbinList);
        if (foundGoblin) {
            const score = (this.targetGoblin && this.targetGoblin.id === foundGoblin.id) ? this.getDistance(foundGoblin.gridX, foundGoblin.gridZ) * 0.4 : this.getDistance(foundGoblin.gridX, foundGoblin.gridZ);
            if (score < bestScore) {
                bestScore = score;
                bestTarget = foundGoblin;
                targetType = 'goblin';
            }
        }

        // --- Unit Scan ---
        let bestFoundUnit: any = null;
        let bestUnitScore = Infinity;

        const scanUnitList = (list: any[]) => {
            const foundU = (this.terrain as any).findBestTarget('unit', this.gridX, this.gridZ, maxDist, (u: any, dist: number) => {
                if (u.isDead || u.isFinished) return Infinity;
                if (role === 'worker' && this.targetRequest && !this.targetUnit) return Infinity;
                if (this.ignoredTargets && (this.ignoredTargets.get(u.id) || 0) > this.simTime) return Infinity;
                if (u.faction === this.faction) return Infinity;

                let score = dist;
                if (u.type === 'sheep') score *= 1.5;
                if (this.targetUnit && this.targetUnit.id === u.id) score *= 0.4;
                return score;
            }, list);

            if (foundU) {
                const score = (this.targetUnit && this.targetUnit.id === foundU.id) ? this.getDistance(foundU.gridX, foundU.gridZ) * 0.4 : this.getDistance(foundU.gridX, foundU.gridZ);
                if (score < bestUnitScore) {
                    bestUnitScore = score;
                    bestFoundUnit = foundU;
                }
            }
        };

        if (unitList && unitList.length > 0) scanUnitList(unitList);
        if (sheepList && sheepList.length > 0) scanUnitList(sheepList);

        const foundUnit = bestFoundUnit;
        if (foundUnit) {
            if (bestUnitScore < bestScore) {
                bestScore = bestUnitScore;
                bestTarget = foundUnit;
                targetType = 'unit';
            }
        }

        // --- Building Scan ---
        const foundBuilding = (this.terrain as any).findBestTarget('building', this.gridX, this.gridZ, maxDist, (b, dist) => {
            const hp = b.userData ? b.userData.hp : (b.hp !== undefined ? b.hp : 100);
            if (hp <= 0) return Infinity;

            const bFaction = b.faction || (b.userData ? b.userData.faction : null);
            if (bFaction === this.faction) return Infinity;

            if (role === 'worker' && (this as any).targetRequest) return Infinity;
            if (this.ignoredTargets && (this.ignoredTargets.get(b.id) || 0) > this.simTime) return Infinity;

            let score = dist;
            if (this.targetBuilding && this.targetBuilding.id === b.id) score *= 0.9;
            return score;
        }, buildingList);

        if (foundBuilding) {
            const bX = foundBuilding.gridX !== undefined ? foundBuilding.gridX : (foundBuilding.userData ? foundBuilding.userData.gridX : foundBuilding.x);
            const bZ = foundBuilding.gridZ !== undefined ? foundBuilding.gridZ : (foundBuilding.userData ? foundBuilding.userData.gridZ : foundBuilding.z);

            if (bX !== undefined && bZ !== undefined) {
                const score = (this.targetBuilding && this.targetBuilding.id === foundBuilding.id) ? this.getDistance(bX, bZ) * 0.4 : this.getDistance(bX, bZ);
                if (score < bestScore) {
                    bestScore = score;
                    bestTarget = foundBuilding;
                    targetType = 'building';
                }
            }
        }

        // 3. Apply Winner (PERSISTENTLY)
        if (bestTarget) {
            if (!this.targetGoblin && !this.targetUnit && !this.targetBuilding) {
                console.log(`[Combat] ${this.type} ${this.id} ACQUIRED new target: ${targetType} ${bestTarget.id}`);
            }
            this.targetGoblin = (targetType === 'goblin') ? bestTarget : null;
            this.targetUnit = (targetType === 'unit') ? bestTarget : null;
            this.targetBuilding = (targetType === 'building') ? bestTarget : null;
        } else {
            // Re-validate existing target even if no new target found
            if (this.targetUnit) {
                const u = this.targetUnit;
                const d = this.getDistance(u.gridX, u.gridZ);
                const invalid = u.isDead || u.isFinished || d > maxDist;
                if (invalid) {
                    console.log(`[Combat] ${this.type} ${this.id} DROPPED unit ${u.id}. Dead:${u.isDead} Fin:${u.isFinished} Dist:${d.toFixed(1)} Max:${maxDist}`);
                    this.targetUnit = null;
                }
            }
            if (this.targetBuilding) {
                const b = this.targetBuilding;
                const bHP = b.userData ? b.userData.hp : (b.hp !== undefined ? b.hp : 100);
                const bx = b.gridX !== undefined ? b.gridX : (b.userData ? b.userData.gridX : b.x);
                const bz = b.gridZ !== undefined ? b.gridZ : (b.userData ? b.userData.gridZ : b.z);
                const d = this.getDistance(bx, bz);
                const invalid = bHP <= 0 || (bx !== undefined && bz !== undefined && d > maxDist);
                if (invalid) {
                    console.log(`[Combat] ${this.type} ${this.id} DROPPED building ${b.id}. HP:${bHP} Dist:${d.toFixed(1)} Max:${maxDist}`);
                    this.targetBuilding = null;
                }
            }
        }
    }

    updateLifecycle(deltaTime: number) {
        if (this.isDead || this.isFinished) return;

        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }

        if (this.hp < this.maxHp && !this.isDead) {
            this.hp = Math.min(this.maxHp, this.hp + deltaTime / 60.0);
        }

        if (this.age !== undefined) {
            const role = (this as any).role || this.type;
            let ageRate = 0.2;
            if (role === 'noble') ageRate = 0.05;
            else if (role === 'knight' || role === 'wizard') ageRate = 0.02;

            this.age += deltaTime * ageRate;
            if (this.age >= this.lifespan) {
                this.die("Old Age");
            }
        }

        if (this.terrain && this.terrain.getTileHeight) {
            const isMinimal = (this.game && this.game.minimal) || (window as any).game?.minimal;
            const currentH = this.terrain.getTileHeight(this.gridX, this.gridZ);
            if (currentH <= 0 && !isMinimal && !this.isNaval) {
                this.die("Drowning");
            }
        }
    }

    getDistance(tx: number, tz: number, ox: number | null = null, oz: number | null = null): number {
        const sx = (ox !== null) ? ox : this.gridX;
        const sz = (oz !== null) ? oz : this.gridZ;
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 160;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 160;
        let dx = Math.abs(sx - tx);
        let dz = Math.abs(sz - tz);
        if (dx > logicalW / 2) dx = logicalW - dx;
        if (dz > logicalD / 2) dz = logicalD - dz;
        return Math.sqrt(dx * dx + dz * dz);
    }

    getApproachPoint(target: any): { x: number, z: number } | null {
        if (!target) return null;
        let tx = target.gridX;
        let tz = target.gridZ;
        if (tx === undefined && target.userData) tx = target.userData.gridX;
        if (tz === undefined && target.userData) tz = target.userData.gridZ;
        if (tx === undefined || tz === undefined) return null;

        const bType = target.type || target.userData?.type;
        const size = (this.terrain && typeof this.terrain.getBuildingSize === 'function' && bType) ? this.terrain.getBuildingSize(bType) : 1;
        const W = (this.terrain && this.terrain.logicalWidth) || 160;
        const D = (this.terrain && this.terrain.logicalDepth) || 160;

        // Target the center
        const targetCenterX = tx + (size - 1) * 0.5;
        const targetCenterZ = tz + (size - 1) * 0.5;

        const dist = this.getDistance(targetCenterX, targetCenterZ);
        if (dist < 1.0) return { x: targetCenterX, z: targetCenterZ };

        // Move towards center but stop at range
        let dx = (targetCenterX - this.gridX);
        let dz = (targetCenterZ - this.gridZ);

        // Wrap dx/dz for angle calculation
        if (Math.abs(dx) > W / 2) dx -= Math.sign(dx) * W;
        if (Math.abs(dz) > D / 2) dz -= Math.sign(dz) * D;

        const angle = Math.atan2(dx, dz);
        const approachRange = 0.5; // Stop slightly before center
        return {
            x: (this.gridX + Math.sin(angle) * (dist - approachRange)) % W,
            z: (this.gridZ + Math.cos(angle) * (dist - approachRange)) % D
        };
    }

    canMoveTo(x: number, z: number): boolean {
        const h = this.terrain.getTileHeight(x, z);
        if (h <= 0) return false;
        const curH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        return Math.abs(h - curH) <= 3.0;
    }

    executeMove(tx: number, tz: number, time: number) {
        this.startMove(tx, tz, time);
    }

    getTooltip(): string {
        let text = `ID: ${this.id}\nType: ${this.type}\nAction: ${this.action}`;
        if (this.age !== undefined) text += `\nAge: ${Math.floor(this.age)}`;
        return text;
    }

    dispose() {
        if (this.terrain && this.terrain.unregisterEntity) {
            this.terrain.unregisterEntity(this);
        }
    }
}
