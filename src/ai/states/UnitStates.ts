import { State, WanderBase } from './State.js';

export class Wander extends WanderBase {
    public name: string;
    public resumeContext: any;
    constructor(actor: any) {
        super(actor);
        this.name = 'Wander';
    }

    enter(prev?: State) {
        super.enter(prev);

        // Capture current movement as potential resume target if entering from a non-resumable state
        const target = this.actor.migrationTarget || (this.actor.isMoving ? { x: this.actor.targetGridX, z: this.actor.targetGridZ } : null);

        // Preserve existing resumeContext if transitioning between AI states (e.g. Job -> Wander)
        if (!this.resumeContext || !this.resumeContext.target) {
            this.resumeContext = target ? { action: this.actor.migrationTarget ? 'Migrating' : 'Moving', target } : { action: 'Idle' };
        }

        // Force action restoration
        const softActions = ['Idle', 'Moving', 'None', 'Working', 'Approaching Job'];
        if (!this.actor.action || softActions.includes(this.actor.action)) {
            this.actor.action = this.resumeContext.action;
        }

        // RESUME MOVEMENT: Start moving towards the resumed target if we aren't already
        if (this.resumeContext.target && !this.actor.isMoving && this.actor.smartMove) {
            this.actor.smartMove(this.resumeContext.target.x, this.resumeContext.target.z, (this.actor.game ? this.actor.game.simTotalTimeSec : 0));
        }
    }

    update(...args: any[]) {
        const [time, deltaTime, isNightParam, units = [], buildings = [], goblins = []] = args;

        // 1. Job Assignment Check (Pre-existing target check)
        const isNight = isNightParam || this.actor.isNight || ((window as any).game && (window as any).game.isNight);
        if (this.actor.targetRequest && !(this instanceof Job)) {
            // FIX: If it's night, only snap into Job state automatically for MANUAL requests.
            if (!isNight || this.actor.targetRequest.isManual) {
                this.actor.changeState(new Job(this.actor));
                return;
            }
        }

        // 2. Combat / Defense Checks
        if (this.actor.targetGoblin || this.actor.targetBuilding) {
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        if (this.actor.checkSelfDefense && this.actor.checkSelfDefense(goblins)) {
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        // 3. Night & Sleep
        const shelter = (isNight && this.actor.role === 'worker' && !this.actor.targetGoblin && !this.actor.targetBuilding)
            ? (this.actor.findNearestShelter ? this.actor.findNearestShelter() : null)
            : null;

        if (isNight && shelter) {
            // Check for manual emergency job logic (from original code)
            if ((window as any).game) {
                const manReq = (window as any).game.findBestRequest(this.actor, false);
                if (manReq && manReq.isManual) {
                    if ((window as any).game.claimRequest(this.actor, manReq)) {
                        this.actor.targetRequest = manReq;
                        const newJob = new Job(this.actor);
                        this.actor.changeState(newJob);
                        newJob.enter(this);
                        return;
                    }
                }
            }
            this.actor.changeState(new Sleep(this.actor));
            return;
        }

        // 4. Squad Orders / Raid
        if (this.actor.role !== 'worker' && this.actor.findRaidTarget && this.actor.findRaidTarget()) {
            if (this.actor.action !== 'Migrating' && this.actor.action !== 'Reinforcing') {
                this.actor.changeState(new Combat(this.actor));
                return;
            }
        }

        // 5. Job Search（労働者のみがリクエストを探す）
        const game = (window as any).game;
        if (this.actor.role === 'worker' && game && typeof game.findBestRequest === 'function' && !(this instanceof Job) && !this.actor.targetRequest) {
            // 夜間はマニュアルジョブのみ検索する
            const allowAuto = !isNight;
            const req = game.findBestRequest(this.actor, allowAuto);
            if (req) {
                // 夜間に自動ジョブはスキップ
                if (isNight && !req.isManual) {
                    // Skip auto jobs at night
                } else {
                    if (typeof game.claimRequest === 'function' && game.claimRequest(this.actor, req)) {
                        this.actor.targetRequest = req;
                        const newJob = new Job(this.actor);
                        this.actor.changeState(newJob);
                        newJob.enter(this);
                        return;
                    }
                }
            }
        }

        // 0. Migration (Moved DOWN, after Job Search)
        if (this.actor.action === 'Migrating' && this.actor.migrationTarget) {
            this.actor.migrationTimer = (this.actor.migrationTimer || 0) + deltaTime;
            if (this.actor.migrationTimer > 30.0) {
                this.actor.migrate(time); // Re-pick migration target if taking too long
                return;
            }

            // Migration Movement Logic
            if (!this.actor.isMoving && this.actor.migrationTarget) {
                // REDUCED RANGE: Use tiny range (0.5) to avoid instant arrival
                if (this.unitApproachTarget(this.actor.migrationTarget.x, this.actor.migrationTarget.z, 0.5, time)) {
                    this.actor.action = 'Idle';
                    this.actor.migrationTarget = null;
                }
            }
            return;
        }

        // 7. Building & Stagnation (Continued)
        const canBuild = this.actor.role === 'worker' || this.actor.role === 'hunter' || this.actor.role === 'fisher';
        if (canBuild && !isNight && !this.actor.targetGoblin && !this.actor.targetBuilding) {
            if (this.actor.action === 'Migrating') {
                return;
            }

            if (this.actor.stagnationTimer > 20.0) {
                this.actor.migrate(time);
                return;
            }

            if (this.actor.lastJobAbortTime && (time - this.actor.lastJobAbortTime < 5.0)) {
            } else {
                const cell = this.actor.terrain.grid[Math.floor(this.actor.gridX)][Math.floor(this.actor.gridZ)];
                if (!this.actor.isMoving && !this.actor.isSleeping && cell.height > 0) {
                    if (this.actor.canBuildAt && this.actor.canBuildAt(this.actor.gridX, this.actor.gridZ)) {
                        this.actor.buildTimer = (this.actor.buildTimer || 0) + deltaTime;
                        if (this.actor.buildTimer >= 1.0) {
                            const gx = Math.floor(this.actor.gridX);
                            const gz = Math.floor(this.actor.gridZ);
                            this.actor.changeState(new Build(this.actor, gx, gz));
                            return;
                        }
                    } else {
                        // FIX: Worker needs to move if it cannot build here!
                        // Currently it just sits for 20s.
                        this.actor.stagnationTimer = (this.actor.stagnationTimer || 0) + deltaTime;

                        // Use moveInterval to wander around looking for a spot
                        if (!this.lastTime || time - this.lastTime > (this.moveInterval || 4.0)) {
                            if (this.actor.moveRandomly) this.actor.moveRandomly(time);
                            this.lastTime = time;
                            this.moveInterval = 2.0 + Math.random() * 3.0;
                        }
                    }
                }
            }
        }

        // 8. Patrol
        if (this.actor.role !== 'worker' && !this.actor.targetRequest && !this.actor.targetGoblin && !this.actor.isMoving) {
            if (this.actor.patrol) {
                this.actor.patrol(time);
            } else {
                if (!this.lastTime || this.lastTime === 0) {
                    this.lastTime = time;
                } else if (time - this.lastTime > (this.moveInterval || 3.0)) {
                    if (this.actor.moveRandomly) this.actor.moveRandomly(time);
                    this.lastTime = time;
                    this.moveInterval = 2.0 + Math.random() * 3.0;
                }
            }
        }

        // REMOVED: super.update(time, deltaTime) because it overwrites this.actor.action to 'Idle'
        // and Wander class already implements the movement timer logic internally.

        if (this.actor.isMoving && this.actor.action !== 'Migrating' && this.actor.action !== 'Reinforcing') {
            this.actor.action = 'Moving';
        } else if (!this.actor.isMoving && this.actor.action === 'Moving') {
            this.actor.action = 'Idle';
        }
    }

    private unitApproachTarget(tx: number, tz: number, range: number, time: number): boolean {
        const dx = tx - this.actor.gridX;
        const dz = tz - this.actor.gridZ;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist <= range) return true;
        if (!this.actor.isMoving) {
            if (this.actor.smartMove) {
                this.actor.smartMove(tx, tz, time);
            } else if (this.actor.moveDirectly) {
                this.actor.moveDirectly(tx, tz, time);
            }
        }
        return false;
    }
}

export class Build extends State {
    public name: string = 'Build';
    public buildX: number;
    public buildZ: number;
    public timer: number;
    constructor(actor: any, x: number, z: number) {
        super(actor);
        this.buildX = x;
        this.buildZ = z;
        this.timer = 0;
    }

    enter() {
        this.actor.isMoving = false;
        this.actor.action = "Building";
        this.actor.migrationTarget = null;
        this.actor.migrationTimer = 0;
        this.timer = 0;
    }

    update(time: number, deltaTime: number, isNight: boolean, units: any[], buildings: any[], goblins: any[]) {
        this.timer += deltaTime;
        if (this.timer >= 1.0) {
            if (this.actor.tryBuildStructure) {
                this.actor.tryBuildStructure(time);
            }
            this.actor.changeState(new Wander(this.actor));
        }
    }
}

export class Job extends State {
    public name: string = 'Job';
    public targetRequest: any;
    private resumeState?: State;
    private lastMoveAttempt: number = 0;
    private stuckTimer: number = 0;

    constructor(actor: any) {
        super(actor);
        this.targetRequest = actor.targetRequest;
        this.resumeState = undefined;
        this.lastMoveAttempt = 0;
        this.stuckTimer = 0;
    }

    enter(prev?: State) {
        if (prev && !(prev instanceof Job)) {
            this.resumeState = prev;
        }
        this.actor.action = 'Approaching Job';
        this.actor.isUnreachable = false;
        (this.actor as any).lastSmartMoveTargetX = undefined;
        (this.actor as any).lastSmartMoveTargetZ = undefined;
        if (this.actor.clearPath) this.actor.clearPath(); // Clear old path and invalidate pending requests to prevent mismatch warning

        // FOR STUCK AND MARKER TEST: Trigger immediate movement if path available
        if (this.actor.targetRequest && this.actor.smartMove) {
            this.actor.smartMove(this.actor.targetRequest.x, this.actor.targetRequest.z, this.actor.simTime || 0);
        }
    }

    update(time: number, deltaTime: number, isNight: boolean, units: any[], buildings: any[], goblins: any[]) {
        if (!this.actor.targetRequest || this.actor.targetRequest.status === 'completed') {
            this.exitJob();
            return;
        }

        // --- TARGET VALIDATION ---
        const target = this.actor.targetRequest.building;
        if (target && (target.isDead || (target.isDestroyed && target.isDestroyed()))) {
            this.exitJob();
            return;
        }

        // FIX: Manual Job Priority. Do not auto-scan for enemies. Only fight if attacked (retaliation).
        const isManual = this.actor.targetRequest && this.actor.targetRequest.isManual;
        const hasTarget = this.actor.targetGoblin || this.actor.targetBuilding;

        // If Manual and no active target (from retaliation), skip proactive scanning.
        if (!isManual || hasTarget) {
            const prevTarget = this.actor.targetGoblin || this.actor.targetBuilding || this.actor.targetUnit;
            if (this.actor.checkSelfDefense && this.actor.checkSelfDefense(goblins)) {
                const newTarget = this.actor.targetGoblin || this.actor.targetBuilding || this.actor.targetUnit;
                if (newTarget !== prevTarget) {
                    this.actor.changeState(new Combat(this.actor));
                    return;
                }
            }
        }

        const req = this.actor.targetRequest;
        // if (req) {
        //    console.log(`[JobCheck] Unit:${this.actor.id} Req:${req.id} Assigned:${req.assignedTo} Status:${req.status}`);
        // }

        // FIX: Check if request is still valid/assigned to us
        // Use != for loose comparison (Legacy saves might have String vs Number IDs)
        // If req.status is NOT 'assigned', or assignedTo doesn't match, we must exit.
        if (!req || req.status !== 'assigned' || (req.assignedTo != this.actor.id)) {
            this.exitJob();
            return;
        }

        const dx = req.x - this.actor.gridX;
        const dz = req.z - this.actor.gridZ;
        const distSq = dx * dx + dz * dz;

        if (distSq < 2.25) { // 1.5 distance squared = 2.25. Job approach threshold
            this.actor.action = 'Working';
            this.actor.isMoving = false;
            if (this.actor.workOnRequest) {
                this.actor.workOnRequest(req, time, deltaTime);
            }
            if (req.status === 'completed') {
                this.exitJob();
            }
        } else {
            // --- STUCK HANDLING & NEAR ARRIVAL ---
            // Throttled pathfinding should still eventually time out (Stability vs Stuck Reassignment)
            if (!this.actor.isMoving && !this.actor.isPathfinding) {
                this.stuckTimer += deltaTime;

                // Near Arrival Trick: If we are close (dist < 3) and stuck, just start working
                if (this.stuckTimer > 2.0 && distSq < 9.0) {
                    this.actor.action = 'Working';
                    this.actor.isMoving = false;
                    if (this.actor.workOnRequest) {
                        this.actor.workOnRequest(req, time, deltaTime);
                    }
                    if (req.status === 'completed') {
                        this.exitJob();
                    }
                    return;
                }

                // Total Abandonment
                // FIX: Throttled pathfinding is allowed for longer (25s) but not forever.
                // Normal stalls (e.g. wall/collision) still time out at 5s.
                const maxStuck = this.actor.isPathfindingThrottled ? 25.0 : 5.0;

                if (this.stuckTimer > maxStuck) {
                    console.log(`[Job State] Unit ${this.actor.id} stuck for ${this.stuckTimer.toFixed(1)}s (Throttled:${this.actor.isPathfindingThrottled}). Abandoning Job.`);
                    if (this.actor.game && this.actor.game.releaseRequest) {
                        this.actor.game.releaseRequest(this.actor, req);
                    }
                    if (this.actor.ignoredTargets) {
                        this.actor.ignoredTargets.set(req.id, (time || 0) + 15.0);
                    }
                    this.actor.lastJobAbortTime = time;
                    this.exitJob();
                    return;
                }
            } else {
                this.stuckTimer = 0;
            }

            this.actor.action = 'Approaching Job';
            let moveStarted = false;

            // THROTTLE: Avoid calling smartMove every frame if we are already moving to the same spot
            const timeSinceLast = (this.lastMoveAttempt === 0) ? 999 : Math.abs(time - this.lastMoveAttempt);
            const targetChanged = this.actor.getDistance(req.x, req.z, (this.actor as any).lastSmartMoveTargetX, (this.actor as any).lastSmartMoveTargetZ) > 0.5;

            if (this.actor.smartMove) {
                if (!this.actor.isMoving || targetChanged || timeSinceLast > 1.0) {
                    moveStarted = this.actor.smartMove(req.x, req.z, time);
                    this.lastMoveAttempt = time;
                } else {
                    moveStarted = true; // Assume true if already moving
                }
            }

            // Defer if unreachable (Test ManualJobRetry)
            // We check this AFTER smartMove to pick up immediate failures (like in mocks)
            // AND outside the throttle block so we catch async failures that happened while throttled

            if (!moveStarted && this.actor.isUnreachable && !this.actor.isWaitingForPath && distSq >= 2.25) {
                // Safety: If we have a valid path, we are NOT unreachable. 
                // This protects against stale flags or race conditions where path is found but flag lags.
                if (this.actor.path && this.actor.path.length > 0) {
                    this.actor.isUnreachable = false;
                    return;
                }

                console.warn(`[JobState] DIAG: Job Abort Unreachable. Unit:${this.actor.id} moveStarted=${moveStarted}, isU=${this.actor.isUnreachable}, isW=${this.actor.isWaitingForPath}, distSq=${distSq.toFixed(1)}`);
                console.warn(`[JobState] Job Abandoned: Unreachable. ReqID:${req.id}`);

                const deferTime = req.isManual ? 3.0 : 15.0;
                if (this.actor.game && this.actor.game.deferRequest) {
                    this.actor.game.deferRequest(req, deferTime);
                }
                if (this.actor.ignoredTargets) {
                    this.actor.ignoredTargets.set(req.id, (time || 0) + deferTime);
                }
                this.actor.lastJobAbortTime = time;
                this.exitJob();
                return;
            }
        }
    }

    exitJob() {
        this.actor.targetRequest = null;
        this.actor.isUnreachable = false;
        // FIX: Clear path and movement so Wander doesn't resume the Job path
        if (this.actor.clearPath) this.actor.clearPath();
        this.actor.isMoving = false;

        if (this.resumeState) {
            this.actor.changeState(this.resumeState);
        } else {
            this.actor.changeState(new Wander(this.actor));
        }
    }
}

export class Combat extends State {
    public name: string = 'Combat';
    constructor(actor: any) {
        super(actor);
    }
    enter(prev?: State) {
        // Clear migration when entering combat
        this.actor.migrationTarget = null;
        this.actor.migrationTimer = 0;

        // Immediate State Resolution (Fix for "Fighting at range")
        const target = this.actor.targetGoblin || this.actor.targetBuilding || this.actor.targetUnit;
        if (target) {
            const dx = (target.gridX || target.x) - this.actor.gridX;
            const dz = (target.gridZ || target.z) - this.actor.gridZ;
            const distSq = dx * dx + dz * dz;
            this.actor.action = (distSq < 4) ? "Fighting" : "Chasing";
        } else {
            this.actor.action = "Fighting";
        }
    }
    update(time: number, deltaTime: number, isNight: boolean, units: any[], buildings: any[], goblins: any[]) {
        if (this.actor.id === 0 || this.actor.id === 1) console.log(`[Combat Debug ${this.actor.id}] Update Start. TargetG:${!!this.actor.targetGoblin} TargetB:${!!this.actor.targetBuilding}`);


        const target = this.actor.targetGoblin || this.actor.targetBuilding || this.actor.targetUnit;

        // Robust Death Check
        let isDead = !target;
        if (target) {
            const hp = (target.hp !== undefined) ? target.hp : (target.userData ? target.userData.hp : null);
            if (target.isDead === true || (hp !== null && hp <= 0)) {
                isDead = true;
            }
            // If it's a building and it's being removed
            if (target.userData && target.userData.isBeingRemoved) isDead = true;
        }

        if (isDead) {
            this.actor.targetGoblin = null;
            this.actor.targetBuilding = null;
            this.actor.targetUnit = null;
            this.actor.changeState(new Wander(this.actor));
            return;
        }

        // FIX: Switch target if a higher priority threat appears (e.g. Goblin while attacking Building)
        // Only check if we are NOT already targeting a goblin (highest priority)
        // FIX: Switch target if a higher priority threat appears (e.g. Goblin while attacking Building)
        // Only check if we are NOT already targeting a goblin (highest priority)
        if (!this.actor.targetGoblin && this.actor.checkSelfDefense) {
            const currentT = this.actor.targetGoblin || this.actor.targetBuilding || this.actor.targetUnit;
            if (this.actor.checkSelfDefense(goblins)) {
                const newT = this.actor.targetGoblin || this.actor.targetBuilding || this.actor.targetUnit;
                if (newT !== currentT) {
                    return; // Interrupt for NEW target
                }
            }
        }

        const dx = (target.gridX || target.x) - this.actor.gridX;
        const dz = (target.gridZ || target.z) - this.actor.gridZ;
        const distSq = dx * dx + dz * dz;

        if (distSq < 4) {
            this.actor.action = 'Fighting';
            this.actor.isMoving = false;
            // Generic fallback or specific methods
            // Generic fallback or specific methods
            if (this.actor.attack) {
                this.actor.attack(target, time);
            } else {
                // TYPE CHECK: Building vs Unit
                const isBuilding = (target.type === 'goblin_hut' || target.type === 'cave' || target.type === 'building' || (target.userData && target.userData.type === 'goblin_hut'));

                if (isBuilding) {
                    if (this.actor.attackBuilding) this.actor.attackBuilding(target);
                } else if (target.faction === 'enemy' || target.constructor.name.includes('Goblin')) {
                    if (this.actor.attackGoblin) this.actor.attackGoblin(target);
                } else if (target.hp !== undefined && (target.gridX !== undefined || target.x !== undefined)) {
                    // Fallback
                    if (this.actor.attackUnit) this.actor.attackUnit(target);
                }
            }
        } else {
            // CHASING LOGIC
            const isBuilding = (target.type === 'goblin_hut' || target.type === 'cave' || (target.userData && target.userData.type === 'goblin_hut'));
            let isInRange = false;

            if (isBuilding && this.actor.getDistanceToBuilding) {
                // Use precise distance to building edge
                const d = this.actor.getDistanceToBuilding(target);
                // 2.0 (Melee) + 0.5 (Buffer)
                if (d < 2.5) isInRange = true;
            } else {
                if (distSq < 4) isInRange = true;
            }

            if (isInRange) {
                // Just force fight action next frame (or update immediately)
                this.actor.action = 'Fighting';
                // We are in range but distSq was >= 4 (center-to-center).
                // Force attack call here to avoid stutter
                if (isBuilding && this.actor.attackBuilding) {
                    this.actor.attackBuilding(target);
                }
            } else {
                this.actor.action = 'Chasing';
                // ... SmartMove ...

                if (this.actor.smartMove) {
                    const moved = this.actor.smartMove((target.gridX || target.x), (target.gridZ || target.z), time);

                    // FIX: If target is unreachable path-wise ABANDON.
                    // BUT: If it just failed because of throttling or budget (isPathfindingThrottled/isWaitingForPath),
                    // DO NOT abandon. Wait for the next cycle.
                    const isTrulyUnreachable = !moved && !this.actor.isPathfinding && !this.actor.isPathfindingThrottled && !this.actor.isWaitingForPath;

                    if (isTrulyUnreachable) {
                        // Start a "Stuck Timer" or just abandon immediately?
                        // Immediate abandon is safer for "No Path" loops.
                        console.log(`[Combat] Move Failed (Unreachable/NoPath). Abandoning Combat. Unit:${this.actor.id}`);

                        // FIX: Add to ignoredTargets to prevent immediate re-targeting by checkSelfDefense
                        if (this.actor.targetGoblin) this.actor.ignoredTargets.set(this.actor.targetGoblin.id, time + 5.0); // Ignore for 5s
                        if (this.actor.targetBuilding) this.actor.ignoredTargets.set(this.actor.targetBuilding.id, time + 5.0);

                        this.actor.targetGoblin = null;
                        this.actor.targetBuilding = null;
                        this.actor.targetUnit = null;
                        this.actor.changeState(new Wander(this.actor));
                    }
                }
            }
        }
    }
}

export class Sleep extends State {
    public name: string = 'Sleep';
    constructor(actor: any) {
        super(actor);
    }
    enter() {
        this.actor.isMoving = false;
        this.actor.isSleeping = false; // まだ移動中。到着後にtrue
        this.actor.action = "Going Home"; // 帰宅中として開始
    }
    update(time: number, deltaTime: number, isNight: boolean, units: any[], buildings: any[], goblins: any[]) {
        if (!isNight) {
            this.actor.isSleeping = false;
            this.actor.changeState(new Wander(this.actor));
            return;
        }

        // ① マニュアルリクエスト優先チェック（shelter有無に関係なく最優先で起動可能）
        if ((window as any).game) {
            const manReq = (window as any).game.findBestRequest(this.actor, false);
            if (manReq && manReq.isManual) {
                if ((window as any).game.claimRequest(this.actor, manReq)) {
                    this.actor.isSleeping = false;
                    this.actor.targetRequest = manReq;
                    this.actor.changeState(new Job(this.actor));
                    return;
                }
            }
        }

        // ② シェルターを探して帰宅
        const shelter = this.actor.findNearestShelter ? this.actor.findNearestShelter() : null;
        if (shelter) {
            const dx = shelter.gridX - this.actor.gridX;
            const dz = shelter.gridZ - this.actor.gridZ;
            const distSq = dx * dx + dz * dz;
            if (distSq > 1.0) {
                // まだ家に到着していない。移動中
                this.actor.action = 'Going Home';
                this.actor.isSleeping = false;
                if (this.actor.smartMove) {
                    this.actor.smartMove(shelter.gridX, shelter.gridZ, time);
                }
            } else {
                // 家に到着 → Sleep（非表示化）
                this.actor.action = 'Sleeping';
                this.actor.isSleeping = true;
                this.actor.isMoving = false;
            }
        } else {
            // シェルターなし → Wanderに戻る（外で朝まで待機）
            this.actor.isSleeping = false;
            this.actor.changeState(new Wander(this.actor));
            return;
        }
    }
}
