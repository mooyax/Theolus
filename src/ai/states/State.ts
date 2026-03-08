export class State {
    public actor: any;
    constructor(actor: any) {
        this.actor = actor;
    }

    enter(previousState?: State) {
        // console.log(`[${this.actor.type} ${this.actor.id}] Entering ${this.constructor.name}`);
    }

    update(...args: any[]) {
        // Override
    }

    exit(nextState?: State) {
        // Override
    }

    /**
     * Standardized Movement Helper
     * Moves actor towards target using smartMove. 
     * Returns TRUE if Arrived (dist <= range), FALSE if Moving.
     */
    approachTarget(tx: number, tz: number, range: number = 1.5, time: number = 0): boolean {
        const dist = this.actor.getDistance(tx, tz);
        if (dist <= range) {
            return true; // Arrived
        }

        // Not arrived, move closer
        if (this.actor.smartMove) {
            this.actor.smartMove(tx, tz, time);
        }
        return false;
    }
}

export class Idle extends State {
    public timer: number;
    public duration: number;
    constructor(actor: any) {
        super(actor);
        this.timer = 0;
        this.duration = 1.0 + Math.random() * 2.0;
    }

    enter(prev?: State) {
        this.timer = 0;
        this.duration = 1.0 + Math.random() * 2.0;
        this.actor.action = "Idle";
        this.actor.isMoving = false;
    }

    update(...args: any[]) {
        const [time, deltaTime, isNight, units = [], buildings = [], goblins = []] = args;
        this.timer += deltaTime;
        if (this.timer > this.duration) {
            // Default transition: Wander
            // Note: Specific actors might override this or handle transitions in their Update loop
            if (this.actor.changeState) {
                // Determine next state? For now, let Actor subclass logic decide via overrides or checking flags
                // Ideally, State should trigger transition.
                // Let's assume generic Actor wanders.
                // But we don't have WanderState instance here? 
                // Factory? Or just let Actor handle high level?
                // Better: Actor has .states collection.
            }
        }
    }
}

export class WanderBase extends State {
    public moveInterval: number;
    public lastTime: number;
    constructor(actor: any) {
        super(actor);
        this.moveInterval = 2.0 + Math.random() * 3.0;
        this.lastTime = 0;
    }

    enter(prev?: State) {
        if (!this.actor.isMoving) {
            this.actor.action = "Idle";
        } else {
            this.actor.action = "Moving";
        }

        // REMOVED: Do NOT force stop if no path. Linear movement (no path) must persist.
        // if (!this.actor.path || this.actor.path.length === 0) {
        //     this.actor.isMoving = false;
        // }
        // Initialize lastTime to 0. First update will sync it.
        this.lastTime = 0;
    }

    update(...args: any[]) {
        const [time, deltaTime] = args;
        // time is already in seconds (simTotalTimeSec)
        if (this.lastTime === 0) this.lastTime = time;

        if (!this.actor.isMoving && (time - this.lastTime > this.moveInterval)) {
            this.actor.moveRandomly(time);
            this.actor.action = "Moving";
            this.lastTime = time;
            this.moveInterval = 2.0 + Math.random() * 3.0;
        } else if (!this.actor.isMoving) {
            // Guard: Do not overwrite specialized actions like 'Patrolling' or 'Migrating'
            if (this.actor.action !== 'Patrolling' && this.actor.action !== 'Migrating' && this.actor.action !== 'Working') {
                this.actor.action = "Idle";
            }
        } else {
            // Ensure action is Moving if isMoving is true
            this.actor.action = "Moving";
        }
    }
}

/**
 * Common Base for Combat States (Human Units & Goblins)
 */
export class CombatStateBase extends State {
    public target: any = null;
    public stuckTimer: number = 0;

    constructor(actor: any) {
        super(actor);
    }

    enter(prev?: State) {
        this.stuckTimer = 0;
        this.actor.isMoving = false;
        this.actor.action = "Fighting";

        // Clear non-combat high-level targets
        if (this.actor.migrationTarget) this.actor.migrationTarget = null;
        if (this.actor.patrolTarget) this.actor.patrolTarget = null;
        // Preserve targetRaidPoint to allow getBehaviorMode() to work
    }

    update(...args: any[]) {
        const [time, deltaTime] = args;

        // 1. Validate Target
        this.target = this.actor.targetUnit || this.actor.targetGoblin || this.actor.targetBuilding;
        if (!this.target || this.isTargetInvalid(this.target)) {
            this.actor.targetUnit = null;
            this.actor.targetGoblin = null;
            this.actor.targetBuilding = null;
            this.handleTargetLost();
            return;
        }

        // 2. Range Check
        const dist = this.getDistanceToTarget(this.target);
        const range = this.actor.attackRange || 1.5;

        if (dist <= range) {
            // IN RANGE -> Attack
            this.actor.isMoving = false;
            this.actor.action = "Fighting";
            this.executeAttack(this.target, time, deltaTime);
            this.stuckTimer = 0;
            return; // Exit after attacking
        } else {
            // OUT OF RANGE -> Chase
            this.actor.action = "Chasing";

            let tgtX = this.target.gridX;
            let tgtZ = this.target.gridZ;

            // NEW: If target is a building with size > 1, path to closest cell of footprint
            const isBuilding = !!(this.target.isBuilding || (this.target.userData && this.target.userData.isBuilding) ||
                (!this.target.role && (this.target.type === 'goblin_hut' || this.target.type === 'cave' || this.target.faction === 'enemy_building' || this.target.hp !== undefined)));

            if (isBuilding && this.actor.terrain && typeof this.actor.terrain.getBuildingSize === 'function') {
                const bType = this.target.userData?.type || this.target.type;
                if (bType) {
                    const bSize = this.actor.terrain.getBuildingSize(bType);
                    const W = this.actor.terrain.logicalWidth || 160;
                    const D = this.actor.terrain.logicalDepth || 160;

                    if (bSize > 1) {
                        // AI Improvement: Target the center of the building footprint
                        tgtX = (this.target.gridX + (bSize - 1) * 0.5) % W;
                        tgtZ = (this.target.gridZ + (bSize - 1) * 0.5) % D;
                    }
                }
            }

            const moved = this.actor.smartMove ? this.actor.smartMove(tgtX, tgtZ, time) : false;

            // 3. Stuck/Unreachable Detection
            const isPathfindingActive = this.actor.isPathfinding || this.actor.isPathfindingThrottled || this.actor.isWaitingForPath;
            const isTrulyStuck = !moved && !isPathfindingActive;

            if (isTrulyStuck) {
                this.stuckTimer += deltaTime;
                if (this.stuckTimer > 3.0 || this.actor.isUnreachable) {
                    this.handleStuck(this.target, time);
                }
            } else {
                this.stuckTimer = 0;
            }
        }
    }

    // --- Helpers (Overrideable) ---

    protected isTargetInvalid(target: any): boolean {
        if (target.isDead || target.isFinished) return true;
        if (target.isDestroyed && target.isDestroyed()) return true;
        if (target.hp !== undefined && target.hp <= 0) return true;
        return false;
    }

    protected getDistanceToTarget(target: any): number {
        // IMPROVED: Robust Actor vs Building detection
        const isActor = !!(target.role ||
            target.type === 'goblin' ||
            target.type === 'normal' ||
            target.type === 'shaman' ||
            target.type === 'hobgoblin' ||
            target.type === 'king' ||
            target.type === 'goblin_king' ||
            (target.gridX !== undefined && !target.isBuilding && (!target.userData || !target.userData.isBuilding)));

        // Building if explicitly marked, or has structural context without actor markers
        const isBuilding = !!(target.isBuilding || (target.userData && target.userData.isBuilding) ||
            (!isActor && (target.type === 'goblin_hut' || target.type === 'cave' || target.faction === 'enemy_building' || (target.hp !== undefined && !target.role))));

        if (isBuilding && this.actor.getDistanceToBuilding) {
            return this.actor.getDistanceToBuilding(target);
        }
        return this.actor.getDistance(target.gridX, target.gridZ);
    }

    protected handleTargetLost() {
        // Default behavior: return to Wander
        // Subclasses can override this (e.g. search for new target)
    }

    protected handleStuck(target: any, time: number) {
        console.log(`[Combat] Actor ${this.actor.id} stuck. Abandoning target.`);
        if (this.actor.ignoredTargets) {
            this.actor.ignoredTargets.set(target.id, time + 10.0);
        }
        this.actor.targetUnit = null;
        this.actor.targetGoblin = null;
        this.actor.targetBuilding = null;
        this.handleTargetLost();
    }

    /**
     * Virtual method to be implemented by Unit Combat or Goblin Combat
     */
    protected executeAttack(target: any, time: number, deltaTime: number) {
        // Implement in subclass: this.actor.attack(target) etc.
    }
}
