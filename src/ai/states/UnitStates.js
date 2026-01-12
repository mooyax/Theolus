import { State, WanderState } from './State.js';

export class UnitWanderState extends WanderState {
    constructor(actor) {
        super(actor);
    }

    enter(prev) {
        super.enter(prev);
        this.actor.isMoving = false; // Always stop previous movement initially. 
        // If we have a resume target, smartMove will re-enable it below.


        // Context Restoration (Resume Logic)
        if (this.resumeContext) {

            // Restore Action - Safety Check
            // Do NOT restore Job-related actions (e.g. 'Approaching Job', 'Working') in WanderState
            // Only restore 'Migrating' or specific movement actions
            if (this.resumeContext.action === 'Migrating') {
                this.actor.action = 'Migrating';
                if (this.resumeContext.migrationTarget) {
                    this.actor.migrationTarget = this.resumeContext.migrationTarget;
                }
            } else {
                this.actor.action = 'Idle';
            }

            // Restore Movement Target (Both Migrating and Generic Move)
            if (this.resumeContext.target) {
                this.actor.targetGridX = this.resumeContext.target.x;
                this.actor.targetGridZ = this.resumeContext.target.z;
                // Force pathfinding immediately (bypass throttle) for state transition
                this.actor.lastPathTime = -100;
                // Trigger movement immediately
                if (this.actor.smartMove) {
                    this.actor.smartMove(this.resumeContext.target.x, this.resumeContext.target.z, this.actor.simTime || 0);
                }
            }
        } else {
            // Default Behavior
            // Don't overwrite 'Migrating' if we are in the middle of migration (Self-Transition check)
            if (this.actor.action !== 'Migrating') {
                this.actor.action = 'Idle';
            }
        }
    }

    update(time, deltaTime, isNightParam, goblins) {
        // console.log(`[JobState DEBUG] Update called for Unit ${this.actor.id}`);

        // 0. Assigned Job Check (If Game.js force-assigned a job)
        if (this.actor.targetRequest) {
            this.actor.changeState(new JobState(this.actor));
            return;
        }

        // 0b. Existing Combat Target Check (e.g. from searchSurroundings or Manual)
        if (this.actor.targetGoblin || this.actor.targetBuilding) {
            this.actor.changeState(new CombatState(this.actor));
            return;
        }

        // 1. Self Defense (High Priority)
        if (this.actor.checkSelfDefense && this.actor.checkSelfDefense(goblins)) {
            this.actor.changeState(new CombatState(this.actor));
            return;
        }

        // 1b. Night Check: Go to sleep if not working or fighting
        const isNight = isNightParam || this.actor.isNight || (window.game && window.game.isNight);
        if (isNight && !this.actor.targetRequest && !this.actor.targetGoblin && !this.actor.targetBuilding) {
            // Check for MANUAL requests before sleeping
            if (window.game) {
                const manReq = window.game.findBestRequest(this.actor, false); // No snatch
                if (manReq && manReq.isManual) {
                    if (window.game.claimRequest(this.actor, manReq)) {
                        this.actor.targetRequest = manReq;
                        this.actor.changeState(new JobState(this.actor));
                        return;
                    }
                }
            }
            this.actor.changeState(new SleepState(this.actor));
            return;
        }

        // 1c. Squad Order Check (Raid Points)
        if (this.actor.role !== 'worker' && this.actor.findRaidTarget && this.actor.findRaidTarget()) {
            if (this.actor.action !== 'Migrating' && this.actor.action !== 'Reinforcing') {
                this.actor.changeState(new CombatState(this.actor));
                return;
            }
        }

        // 2. Job Search
        if (window.game) {
            const req = window.game.findBestRequest(this.actor, true); // true = allow snatching nearby assigned jobs
            if (req) {
                if (window.game.claimRequest(this.actor, req)) {
                    if (this.actor.id === 0) console.log(`[UnitWander] Found Job! ${req.type}.`);
                    this.actor.targetRequest = req;
                    this.actor.changeState(new JobState(this.actor));
                    return;
                }
            }
        }

        // 2b. Building & Stagnation (Worker only)
        if (this.actor.role === 'worker' && !isNight && !this.actor.targetGoblin && !this.actor.targetBuilding) {
            // Check Cooldown from Job Abort
            if (this.actor.lastJobAbortTime && (time - this.actor.lastJobAbortTime < 5.0)) {
                // Just wander/idle for a bit to prevent immediate distraction building
            } else {
                // GUARD: If we have a targetRequest, DO NOT BUILD.
                if (this.actor.targetRequest) return;

                const cell = this.actor.terrain.grid[this.actor.gridX][this.actor.gridZ];
                if (!this.actor.isMoving && !this.actor.isSleeping && cell.height > 0) {
                    if (!this.actor.canBuildAt || this.actor.canBuildAt(this.actor.gridX, this.actor.gridZ)) {
                        this.actor.buildTimer = (this.actor.buildTimer || 0) + deltaTime;
                        if (this.actor.buildTimer >= 1.0) {
                            const success = this.actor.tryBuildStructure(time);
                            if (success) {
                                this.actor.stagnationTimer = 0;
                                this.actor.buildTimer = 0;
                            } else {
                                this.actor.stagnationTimer = (this.actor.stagnationTimer || 0) + deltaTime;
                            }
                        }
                    } else {
                        this.actor.stagnationTimer = (this.actor.stagnationTimer || 0) + deltaTime;
                    }
                }
            }
            if (this.actor.stagnationTimer > 20.0) {
                this.actor.migrate(time);
            }
        }

        // 2c. Patrol (Non-worker only)
        if (this.actor.role !== 'worker' && !this.actor.targetRequest && !this.actor.targetGoblin && !this.actor.isMoving) {
            if (this.actor.patrol) {
                this.actor.patrol(time);
            }
        }

        // 4. Check for Migration
        if (this.actor.action === 'Migrating' && this.actor.migrationTarget) {
            this.actor.migrationTimer = (this.actor.migrationTimer || 0) + deltaTime;
            if (this.actor.migrationTimer > 30.0) {
                this.actor.migrate(time);
                return;
            }

            const isAttack = this.actor.checkSelfDefense(goblins) && (this.actor.targetGoblin || this.actor.targetBuilding);
            // Worker Safeguard: Do not interrupt work for buildings
            const isBusyWorker = (this.actor.role === 'worker' && this.actor.targetRequest);

            if (isAttack && !isBusyWorker) {
                this.actor.action = 'Fighting';
                this.actor.changeState(new CombatState(this.actor));
                this.actor.migrationTarget = null;
                return;
            }

            // Movement Logic
            if (!this.actor.isMoving && this.actor.migrationTarget) {
                const dist = this.actor.getDistance(this.actor.migrationTarget.x, this.actor.migrationTarget.z);
                if (dist < 2.0) {
                    this.actor.action = 'Idle';
                    this.actor.migrationTarget = null;
                } else {
                    this.actor.smartMove(this.actor.migrationTarget.x, this.actor.migrationTarget.z, time);
                }
            }
            return;
        }

        // 5. Default Wander (Base Class)
        super.update(time, deltaTime);

        if (!this.actor.isMoving && this.actor.role === 'worker' && Math.random() < 0.05) {
            this.actor.moveRandomly(time);
        }
    }
}

export class JobState extends State {
    constructor(actor) {
        super(actor);
        this.targetRequest = actor.targetRequest;
        this.resumeState = null;
        this.lastMoveAttempt = 0;
        this.pathFailures = 0;
        this.stuckTimer = 0;
        this.checkStuckInterval = 2.0;
        this.lastStuckCheck = 0;
        this.lastPos = { x: 0, z: 0 };
        this.name = "JobState";
    }

    enter(prev) {
        // Capture previous movement target (Resume Logic) - MUST BE FIRST
        // Capture BEFORE we modify actor.action or target properties
        this.savedResumeContext = {
            action: this.actor.action,
            // FIX: Only capture target if we were actually moving!
            // Otherwise we might capture stale data (e.g. 0,0 from constructor)
            target: (this.actor.isMoving && this.actor.targetGridX !== undefined && this.actor.targetGridZ !== undefined)
                ? { x: this.actor.targetGridX, z: this.actor.targetGridZ }
                : null,
            migrationTarget: this.actor.migrationTarget || null
        };

        this.actor.targetBuilding = null;
        this.actor.isSleeping = false;
        this.actor.action = 'Approaching Job';
        this.actor.isMoving = false;
        this.actor.lastPathTime = -100; // Force pathfinding immediately (bypass throttle)
        this.targetRequest = this.actor.targetRequest;

        if (this.targetRequest) {
            // Force immediate pathfinding start (without full update cycle to avoid time distortion)
            const vx = this.actor.getVisualX ? this.actor.getVisualX(0) : this.actor.gridX;
            const vz = this.actor.getVisualZ ? this.actor.getVisualZ(0) : this.actor.gridZ;
            this.actor.smartMove(this.targetRequest.x, this.targetRequest.z, this.actor.simTime || 0);
        }

        if (prev instanceof JobState || prev instanceof CombatState) {
            // Keep existing resume state if possible
        } else {
            this.resumeState = prev;
        }

        if (this.actor.id === 0) console.log(`[JobState] Entered. Target: ${this.targetRequest ? this.targetRequest.type : 'None'}. ResumeCtx: ${this.savedResumeContext ? this.savedResumeContext.action : 'None'}`);

        const time = this.actor.simTime || 0;
        this.lastStuckCheck = time;
        const vx = this.actor.getVisualX ? this.actor.getVisualX(0) : this.actor.gridX;
        const vz = this.actor.getVisualZ ? this.actor.getVisualZ(0) : this.actor.gridZ;
        this.lastPos = { x: vx, z: vz };
    }

    exit(nextState) {
        // If we are switching to another JobState for the SAME request, do not clear it.
        if (nextState instanceof JobState && nextState.targetRequest && this.targetRequest && nextState.targetRequest.id === this.targetRequest.id) {
            return;
        }

        // PERSISTENCE: If we are switching to a temporary state (Combat/Sleep), 
        // we keep the targetRequest on the actor so it can be resumed by WanderState.
        // We also keep MANUAL jobs by default unless explicitly cleared by JobState.update (Unreachable/Done).
        if (nextState instanceof CombatState || nextState instanceof SleepState) {
            return;
        }

        if (this.actor.targetRequest && this.targetRequest && this.actor.targetRequest.id === this.targetRequest.id) {
            // Only clear if NOT a manual job, or if we are going to a "true" idle state
            if (!this.targetRequest.isManual) {
                this.actor.targetRequest = null;
            }
        }
    }

    // Helper to pass context back
    getResumeState() {

        const state = new UnitWanderState(this.actor);
        state.resumeContext = this.savedResumeContext;
        return state;
    }

    update(time, deltaTime, isNightParam, goblins) {
        if (!this.targetRequest) {
            this.actor.changeState(this.getResumeState());
            return;
        }

        if (this.targetRequest.assignedTo !== this.actor.id) {
            console.log(`[JobState ${this.actor.id}] Ownership LOST for Job ${this.targetRequest.id}. Switching to Wander.`);
            this.actor.changeState(this.getResumeState());
            return;
        }
        if (this.targetRequest.status === 'completed' || this.targetRequest.status === 'expired') {
            this.actor.targetRequest = null;
            this.actor.changeState(this.getResumeState());
            return;
        }

        // 1. Retaliation (Highest Priority): If HIT (targetGoblin set), switch to Combat
        if (this.actor.targetGoblin) {
            console.log(`[JobState ${this.actor.id}] Retaliating against Goblin ${this.actor.targetGoblin.id}!`);
            this.actor.changeState(new CombatState(this.actor));
            return;
        }

        if (this.actor.role === 'worker') {
            // Pacifism (Don't scan aggressively), but Retaliation handled above.
        } else {
            // Aggressive Guards (Knights/Wizards)
            if (this.actor.checkSelfDefense && this.actor.checkSelfDefense(goblins)) {
                // Fix: Actually enter combat instead of just returning
                // Allow entering combat if we found a goblin OR a building
                if (this.actor.targetGoblin || this.actor.targetBuilding) {
                    console.log(`[JobState ${this.actor.id}] Auto-engaging target!`);
                    this.actor.changeState(new CombatState(this.actor));
                    return;
                }
            }
        }

        if (isNightParam && this.actor.role === 'worker') {
            // Only release AUTO jobs at night. Manual jobs (isManual) take priority over sleep.
            if (!this.targetRequest.isManual) {
                if (window.game) window.game.releaseRequest(this.actor, this.targetRequest);
                this.targetRequest = null;
                this.actor.targetRequest = null;
                this.actor.changeState(new SleepState(this.actor));
                return;
            }
        }

        const vx = this.actor.getVisualX ? this.actor.getVisualX(time) : this.actor.gridX;
        const vz = this.actor.getVisualZ ? this.actor.getVisualZ(time) : this.actor.gridZ;
        const dist = this.actor.getDistance(this.targetRequest.x, this.targetRequest.z, vx, vz);

        const approachDist = (this.targetRequest.type === 'raise' || this.targetRequest.type === 'lower') ? 3.0 : 2.0;

        if (dist <= approachDist) {
            if (this.actor.isMoving) {
                const oldX = this.actor.gridX;
                const oldZ = this.actor.gridZ;
                this.actor.gridX = Math.round(vx);
                this.actor.gridZ = Math.round(vz);
                this.actor.isMoving = false;
                if (this.actor.terrain && this.actor.terrain.moveEntity) {
                    this.actor.terrain.moveEntity(this.actor, oldX, oldZ, this.actor.gridX, this.actor.gridZ, this.actor.spatialType || 'unit');
                }
                if (this.actor.onMoveFinished) this.actor.onMoveFinished(time);
            }
            this.actor.action = "Working";

            if (window.game) window.game.completeRequest(this.actor, this.targetRequest);
            this.targetRequest = null;
            this.actor.targetRequest = null;

            if (window.game) {
                const next = window.game.findBestRequest(this.actor);
                if (next && window.game.claimRequest(this.actor, next)) {
                    this.actor.targetRequest = next;
                    this.targetRequest = next;
                    this.actor.action = 'Approaching Job';
                    this.enter(this);
                    return;
                }
            }
            this.actor.changeState(this.getResumeState());
            return;
        }

        if (this.targetRequest && this.targetRequest.building) {
            const b = this.targetRequest.building;
            // Check if building still exists in terrain or is not dead
            const stillExists = this.actor.terrain && this.actor.terrain.buildings && this.actor.terrain.buildings.includes(b);
            if (!stillExists || b.isDead) {
                console.log(`[JobState ${this.actor.id}] Target building destroyed. Releasing job.`);
                if (window.game) window.game.releaseRequest(this.actor, this.targetRequest);
                this.actor.targetRequest = null;
                this.targetRequest = null;
                this.actor.changeState(this.getResumeState());
                return;
            }
        }

        const isHeadingToTarget = this.actor.isMoving &&
            this.actor.targetGridX !== undefined &&
            Math.abs(this.actor.targetGridX - this.targetRequest.x) < 0.1 &&
            Math.abs(this.actor.targetGridZ - this.targetRequest.z) < 0.1;

        if (!isHeadingToTarget || !this.actor.isMoving) {
            const moved = this.actor.smartMove(this.targetRequest.x, this.targetRequest.z, time);

            // FIX: Immediate Release if Unreachable (Pathfinding Explicitly Returned Null)
            if (this.actor.isUnreachable) {
                console.log(`[JobState ${this.actor.id}] Request Unreachable (No Path). Releasing Job.`);

                // CRITICAL FIX: Add to ignore list to prevent immediate reclaim by WanderState
                if (this.actor.ignoredTargets) this.actor.ignoredTargets.set(this.targetRequest.id, time + 10.0);

                if (window.game) window.game.releaseRequest(this.actor, this.targetRequest);
                this.targetRequest = null;
                this.actor.targetRequest = null;
                this.actor.isUnreachable = false;
                this.actor.changeState(this.getResumeState());
                return;
            }

            this.lastMoveAttempt = time;

            // FIX: If smartMove returned true but we are throttled, do NOT count as failure
            if (!moved && !this.actor.isMoving && !this.actor.isPathfindingThrottled && !this.actor.isUnreachable) {
                const failureInc = (this.targetRequest.isManual) ? 5 : 1;
                this.pathFailures = (this.pathFailures || 0) + failureInc;
                this.actor.stuckCount = (this.actor.stuckCount || 0) + failureInc;

                if (this.actor.stuckCount > 30) {
                    this.actor.lastPathTime = 0;
                    this.actor.stuckCount = 0;
                }

                const isUnreachable = this.actor.isReachable && !this.actor.isReachable(this.targetRequest.x, this.targetRequest.z);

                // STICKY JOBS: Reduce threshold for manual jobs (100 = approx 6-10s of blocking)
                // Auto jobs patience increased to 50 frames (~1.5s - 5s depending on frame rate) to avoid flickering.
                const failureThreshold = (this.targetRequest && this.targetRequest.isManual) ? 100 : 50;

                if (isUnreachable || this.pathFailures > failureThreshold || this.stuckTimer > 45.0) {
                    console.warn(`[JobState ${this.actor.id}] ABORTING JOB ${this.targetRequest.id}. Reason: Fail:${this.pathFailures}, Stuck:${this.stuckTimer}, Unreach:${isUnreachable}. Ignore Expiry: ${time + 60.0}`);
                    if (this.actor.ignoredTargets) this.actor.ignoredTargets.set(this.targetRequest.id, time + 60.0);
                    if (window.game) window.game.releaseRequest(this.actor, this.targetRequest);

                    // Fix: Do not nullify this.targetRequest before exit() runs, otherwise exit() won't clear unit.targetRequest
                    // We rely on exit() to clear unit.targetRequest.
                    // But checking logic: exit uses (this.actor.targetRequest === this.targetRequest)
                    // So we must keep this.targetRequest valid for a moment.

                    // Actually, simpler: explicit clear if we know we are aborting.
                    this.actor.targetRequest = null;
                    this.targetRequest = null;

                    // Prevention of "Distracted Building": Set cooldown
                    this.actor.lastJobAbortTime = time;

                    this.actor.changeState(this.getResumeState());
                    return;
                }
            } else {
                // If moved OR throttled OR unreachable-flag-checked-already, reset or hold failures
                // Resetting pathFailures on success is standard
                if (moved) this.pathFailures = 0;
            }
        }

        if (time - this.lastStuckCheck >= this.checkStuckInterval) {
            this.lastStuckCheck = time;


            const vx = this.actor.getVisualX ? this.actor.getVisualX(time) : this.actor.gridX;
            const vz = this.actor.getVisualZ ? this.actor.getVisualZ(time) : this.actor.gridZ;
            const dx = Math.abs(vx - this.lastPos.x);
            const dz = Math.abs(vz - this.lastPos.z);
            if (dx < 0.5 && dz < 0.5) {
                this.stuckTimer += this.checkStuckInterval;
                const stuckThreshold = (this.targetRequest && this.targetRequest.isManual) ? 45.0 : 15.0; // Reduced from 300 to 45
                if (this.stuckTimer > stuckThreshold) {
                    if (this.actor.ignoredTargets) this.actor.ignoredTargets.set(this.targetRequest.id, time + 30.0);
                    if (window.game) window.game.releaseRequest(this.actor, this.targetRequest);

                    this.actor.targetRequest = null;
                    this.targetRequest = null;

                    this.actor.changeState(this.getResumeState());
                    return;
                }
            } else {
                this.stuckTimer = 0;
                this.lastPos = { x: vx, z: vz };
            }
        }
    }


}

export class CombatState extends State {
    constructor(actor) {
        super(actor);
        this.stagnationTimer = 0;
        this.name = "CombatState";
    }
    enter(prev) {
        // Capture Resume Context (Must be first)
        this.savedResumeContext = {
            action: this.actor.action,
            // FIX: Only capture target if moving
            target: (this.actor.isMoving && this.actor.targetGridX !== undefined && this.actor.targetGridZ !== undefined)
                ? { x: this.actor.targetGridX, z: this.actor.targetGridZ }
                : null,
            migrationTarget: this.actor.migrationTarget || null
        };


        this.actor.isSleeping = false;
        this.actor.migrationTarget = null;
        // FIX: Worker should NOT drop their job just because they defend themselves!
        // (WanderState will resume it after combat if actor.targetRequest is kept)
        // Only release if it's NOT a manual job OR if we are overwhelmed? 
        // For now, let's just keep it to resolve the "drop job on attack" bug.
        this.actor.action = 'Fighting';
        this.stagnationTimer = 0;
        this.update(this.actor.simTime || 0, 0); // Force immediate update with valid time
    }

    getResumeState() {
        const state = new UnitWanderState(this.actor);
        state.resumeContext = this.savedResumeContext;
        return state;
    }

    update(time, deltaTime) {

        if (!this.actor.targetGoblin && !this.actor.targetBuilding && this.actor.findRaidTarget) {
            this.actor.findRaidTarget();
        }

        if (!this.actor.targetGoblin && !this.actor.targetBuilding && !this.actor.targetRaidPoint) {
            this.actor.changeState(this.getResumeState());
            return;
        }

        // Manual Request Preemption (for workers)
        if (this.actor.role === 'worker' && window.game) {
            const manReq = window.game.findBestRequest(this.actor, false); // Only pending
            if (manReq && manReq.isManual) {
                if (window.game.claimRequest(this.actor, manReq)) {
                    this.actor.targetRequest = manReq;
                    this.actor.changeState(new JobState(this.actor));
                    return;
                }
            }
        }

        if (this.actor.targetBuilding) {
            const terrain = this.actor.terrain || window.game?.terrain;
            if (terrain && terrain.buildings && !terrain.buildings.includes(this.actor.targetBuilding)) {
                this.actor.targetBuilding = null;
                this.actor.changeState(this.getResumeState());
                return;
            }
        }

        this.stagnationTimer += deltaTime;
        if (this.stagnationTimer > 20.0) {
            this.actor.targetGoblin = null;
            this.actor.targetBuilding = null;
            this.actor.changeState(this.getResumeState());
            return;
        }

        // Ported Combat Logic from Unit.js (Legacy updateCombatLogic)
        let target = this.actor.targetGoblin || this.actor.targetBuilding;
        if (!target) {
            // FIX: If we have a RaidPoint, keep CombatState active (Patrolling)
            if (this.actor.targetRaidPoint) {
                return;
            }
            this.actor.changeState(this.getResumeState());
            return;
        }

        // 1. Distance Check
        let dist = 999;
        if (this.actor.targetGoblin) {
            dist = this.actor.getDistance(this.actor.targetGoblin.gridX, this.actor.targetGoblin.gridZ);
        } else if (this.actor.targetBuilding) {
            dist = this.actor.getDistance(this.actor.targetBuilding.gridX, this.actor.targetBuilding.gridZ);
            // Adjust for building size (Cave is size 2, center to center dist might be large)
            if (this.actor.targetBuilding.userData && this.actor.targetBuilding.userData.type === 'cave') dist -= 1.0;
        }

        // Stagnation Check reset
        if (dist < 3.0) this.stagnationTimer = 0;

        // Range Stats
        let range = 1.5; // Melee
        if (this.actor.role === 'wizard') range = 8.0;

        // 2. Move / Chase
        if (dist > range) {
            // Too far, move closer
            let tx = target.gridX;
            let tz = target.gridZ;

            // For buildings, use smartMove
            // Note: smartMove handles throttling implicitly.
            this.actor.smartMove(tx, tz, time);
            this.actor.action = "Chasing";
            return;
        }

        // 3. Attack (In Range)
        this.actor.action = "Fighting";
        this.actor.isMoving = false; // Stop to hit

        // Face Target
        const dx = target.gridX - this.actor.gridX;
        const dz = target.gridZ - this.actor.gridZ;
        this.actor.rotationY = Math.atan2(dx, dz);

        // Cooldown
        if (this.actor.attackCooldown > 0) {
            this.actor.attackCooldown -= deltaTime;
            return;
        }

        // EXECUTE ATTACK
        // Use Actor Stats (Fixed hardcoded override bug)
        let damage = this.actor.damage || 10;
        let rate = this.actor.attackRate || 1.0;

        // Legacy overrides removed in favor of Unit.js stats

        // Perform Damage
        if (this.actor.targetGoblin) {
            if (this.actor.targetGoblin.takeDamage) {
                this.actor.targetGoblin.takeDamage(damage, this.actor);
            }
            if (this.actor.targetGoblin.isDead) { // Check dead status
                this.actor.targetGoblin = null;
                // Don't switch state immediately, let next update handle target null check
            }
        } else if (this.actor.targetBuilding) {
            // Mock attackBuilding or direct HP modification for tests
            if (this.actor.attackBuilding) {
                this.actor.attackBuilding(this.actor.targetBuilding, damage);
            } else {
                // Fallback for tests if attackBuilding not on actor instance (though it should be)
                if (target.userData && target.userData.hp !== undefined) {
                    target.userData.hp -= damage;
                    if (target.userData.hp <= 0 && window.game && window.game.terrain) {
                        // Simple destruction mock
                        window.game.terrain.removeBuilding(target);
                        this.actor.targetBuilding = null;
                    }
                }
            }
        }

        this.actor.attackCooldown = rate;
    }
}



export class SleepState extends State {
    constructor(actor) {
        super(actor);
    }
    enter() {
        if (this.actor.id === 0) console.log(`[SleepState] Entering Sleep logic.`);
        this.actor.action = "Sleeping";
        this.actor.isSleeping = false; // Start by moving to shelter
        this.update(this.actor.simTime || 0, 0, true); // Force isNightParam=true since we are entering SleepState
    }
    exit() {
        this.actor.isSleeping = false;
    }
    update(time, deltaTime, isNightParam, goblins) {
        const isNight = isNightParam || (window.game && window.game.isNight);

        // 0. Immediate Wakeup for Existing Manual Jobs (e.g. post-load)
        if (this.actor.targetRequest && this.actor.targetRequest.isManual) {
            this.actor.isSleeping = false;
            this.actor.targetRequest.status = 'assigned'; // Reinforce
            this.actor.changeState(new JobState(this.actor));
            return;
        }

        if (!isNight) {
            this.actor.isSleeping = false;
            this.actor.changeState(new UnitWanderState(this.actor));
            return;
        }

        if (this.actor.checkSelfDefense && this.actor.checkSelfDefense(goblins) && (this.actor.targetGoblin || this.actor.targetBuilding)) {
            this.actor.isSleeping = false;
            this.actor.changeState(new CombatState(this.actor));
            return;
        }

        // Manual Request Preemption (Wake up for player markers)
        if (this.actor.role === 'worker' && window.game) {
            const manReq = window.game.findBestRequest(this.actor, false);
            if (manReq && manReq.isManual) {
                if (window.game.claimRequest(this.actor, manReq)) {
                    this.actor.isSleeping = false;
                    this.actor.targetRequest = manReq;
                    this.actor.changeState(new JobState(this.actor));
                    return;
                }
            }
        }

        if (this.actor.isSleeping) return;

        const shelter = this.actor.findNearestShelter ? this.actor.findNearestShelter() : null;
        if (shelter) {
            const dist = this.actor.getDistance(shelter.gridX, shelter.gridZ);
            if (dist < 1.0) {
                this.actor.isSleeping = true;
                this.actor.isMoving = false;
                this.actor.action = "Sleeping";
            } else {
                this.actor.action = "Going Home";
                this.actor.smartMove(shelter.gridX, shelter.gridZ, time);
            }
        } else {
            this.actor.isSleeping = true;
            this.actor.isMoving = false;
        }
    }
}
