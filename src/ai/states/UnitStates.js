import { State, WanderState } from './State.js';

export class UnitWanderState extends WanderState {
    constructor(actor) {
        super(actor);
        this.name = 'UnitWanderState';
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
                return;
            }
        }

        // 2c. Patrol (Non-worker only)
        // 2x. Passive Actions (Resource Gathering) - Run even if moving
        if (this.actor.role === 'fisher' || this.actor.role === 'hunter') {
            if (window.game && window.game.resources) {
                this.actor.gatherResources(time);
            }
        }

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
        this.name = 'JobState';
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
        this.actor.isUnreachable = false; // FIX: Clear stale unreachable flag from previous jobs
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
        if (!this.targetRequest) console.warn(`[JobState ${this.actor.id}] getResumeState called with NO targetRequest.`);
        const state = new UnitWanderState(this.actor);
        state.resumeContext = this.savedResumeContext;
        return state;
    }

    update(time, deltaTime, isNightParam, goblins) {
        if (!this.targetRequest) {
            console.warn(`[JobState ${this.actor.id}] Abort: No targetRequest (Update). Switching to Wander.`);
            this.actor.changeState(this.getResumeState());
            return;
        }

        // DEBUG: Flapping Diagnosis
        if (String(this.targetRequest.assignedTo) !== String(this.actor.id)) {
            console.warn(`[JobState ${this.actor.id}] Ownership LOST for Job ${this.targetRequest.id}. Assignee: ${this.targetRequest.assignedTo}. Switching to Wander.`);
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
            // FIX: Allow occasional scans for VERY CLOSE threats (specifically buildings blocking path)
            // checkSelfDefense logic in Unit.js now handles filtering.
            if (this.actor.checkSelfDefense && this.actor.checkSelfDefense(goblins)) {
                if (this.actor.targetGoblin || this.actor.targetBuilding) {
                    console.log(`[JobState ${this.actor.id}] Worker found threat/target on path!`);
                    this.actor.changeState(new CombatState(this.actor));
                    return;
                }
            }
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

        const dist = this.actor.getDistance(this.targetRequest.x, this.targetRequest.z);
        if (dist < 1.5) {
            this.actor.isMoving = false;
            if (this.actor.id === 0) console.log(`[JobState] Arrived at Job. Completing...`);

            // COMPLETION LOGIC
            if (this.actor.onMoveFinished) this.actor.onMoveFinished(time);

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

        if (this.targetRequest.status === 'pending' || this.targetRequest.status === 'assigned') {
            const moved = this.actor.triggerMove(this.targetRequest.x, this.targetRequest.z, time);

            // 1. Pathfinding Returned Null (Unreachable)
            if (this.actor.isUnreachable) {
                console.warn(`[JobState ${this.actor.id}] Abort: Target Unreachable. Req:${this.targetRequest.id} at ${this.targetRequest.x},${this.targetRequest.z}`);
                const game = this.actor.game || window.game;
                const deferTime = this.targetRequest.isManual ? 3.0 : 15.0;
                if (game && game.deferRequest) game.deferRequest(this.targetRequest, deferTime);

                this.actor.targetRequest = null;
                if (this.actor.ignoredTargets) this.actor.ignoredTargets.set(this.targetRequest.id, time + deferTime);
                this.targetRequest = null; // Clear local ref too
                this.actor.isUnreachable = false;
                this.actor.stuckCount = 0;
                this.actor.lastJobAbortTime = time; // Set abort time for unreachability too
                this.actor.changeState(this.getResumeState());
                return;
            }

            if (!moved) {
                // Check for STUCK (Physical block or Logic block)
                // Stuck accumulation is handled in triggerMove / handleStuck of Unit.js
                // But we can check if triggerMove returned false repeatedly?

                // Unit.js handles stuckCount internally.
                // If stuckCount > 10, Unit logic might try to unstick?
                // JobState should monitor progress.
                if (!this.lastPos) this.lastPos = { x: this.actor.gridX, z: this.actor.gridZ };

                const dm = Math.abs(this.actor.gridX - this.lastPos.x) + Math.abs(this.actor.gridZ - this.lastPos.z);
                if (dm < 0.01) {
                    this.stuckTimer += deltaTime;
                } else {
                    this.stuckTimer = 0;
                    this.lastPos = { x: this.actor.gridX, z: this.actor.gridZ };
                }
            } else {
                // Moving OK
                this.stuckTimer = 0;
                this.pathFailures = 0;
            }

            // pathFailures logic (from previous persistence check)
            // If Unit.smartMove fails repeatedly?
            if (!moved && !this.actor.isMoving && !this.actor.isPathfinding) {
                this.pathFailures++;
            }

            // Tuned Thresholds:
            // StuckTimer: 45s (Long wait for transient crowds)
            // PathFailures: 100 frames (Approx 2-3s of solid blocking)
            // User requested: "Persistence" with "Abandonment if impossible".

            // Dynamic Threshold based on Crowd?
            const nearby = (this.actor.terrain && this.actor.terrain.findNearestEntity) ? this.actor.terrain.findNearestEntity('unit', this.actor.gridX, this.actor.gridZ, 2) : null;
            const failureThreshold = nearby ? 150 : 100; // More tolerance if crowded

            if (this.pathFailures > failureThreshold || this.stuckTimer > 45.0) {
                console.warn(`[JobState ${this.actor.id}] Abort: Path Failures > ${failureThreshold} or Stuck > 45s.`);
                const game = this.actor.game || window.game;
                const deferTime = this.targetRequest.isManual ? 3.0 : 15.0;
                if (game && game.deferRequest) game.deferRequest(this.targetRequest, deferTime);

                this.actor.targetRequest = null;
                if (this.actor.ignoredTargets) this.actor.ignoredTargets.set(this.targetRequest.id, time + deferTime);
                this.targetRequest = null;
                this.pathFailures = 0;
                this.stuckTimer = 0;
                this.actor.lastJobAbortTime = time; // Prevent immediate distraction building
                this.actor.changeState(this.getResumeState());
                return;
            }
            // 3. Physical Stuck Check
            if (time - this.lastStuckCheck >= this.checkStuckInterval) {
                this.lastStuckCheck = time;

                const vx = this.actor.getVisualX ? this.actor.getVisualX(time) : this.actor.gridX;
                const vz = this.actor.getVisualZ ? this.actor.getVisualZ(time) : this.actor.gridZ;
                const dx = Math.abs(vx - this.lastPos.x);
                const dz = Math.abs(vz - this.lastPos.z);

                if (dx < 0.5 && dz < 0.5) {
                    this.stuckTimer += this.checkStuckInterval;
                    const stuckThreshold = 45.0;
                    if (this.stuckTimer > stuckThreshold) {
                        console.warn(`[JobState ${this.actor.id}] Abort: Physical Stuck > 45s.`);
                        const game = this.actor.game || window.game;
                        const deferTime = this.targetRequest.isManual ? 3.0 : 15.0;
                        if (game && game.deferRequest) game.deferRequest(this.targetRequest, deferTime);

                        this.actor.targetRequest = null;
                        if (this.actor.ignoredTargets) this.actor.ignoredTargets.set(this.targetRequest.id, time + deferTime);
                        this.targetRequest = null;
                        this.stuckTimer = 0;
                        this.actor.lastJobAbortTime = time; // Set abort time for physical stuck

                        this.actor.changeState(this.getResumeState());
                        return;
                    }
                } else {
                    if (this.targetRequest) {
                        this.stuckTimer = 0;
                    }
                    this.lastPos = { x: vx, z: vz };
                }
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
        // FIX: Release job assignment so other workers can take it!
        if (this.actor.targetRequest) {
            if (window.game && window.game.releaseRequest) {
                console.log(`[CombatState ${this.actor.id}] Releasing Job ${this.actor.targetRequest.id} to fight!`);
                window.game.releaseRequest(this.actor, this.actor.targetRequest);
            }
            this.actor.targetRequest = null;
        }

        this.actor.action = 'Fighting';
        this.stagnationTimer = 0;
        this.update(this.actor.simTime || 0, 0); // Force immediate update with valid time
    }

    getResumeState() {
        const state = new UnitWanderState(this.actor);
        state.resumeContext = this.savedResumeContext;
        return state;
    }


    update(time, deltaTime, isNightParam, goblins) {
        // 0. Acquire Target if missing
        if (!this.actor.targetGoblin && !this.actor.targetBuilding) {

            // AGGRESSION FIX: Immediate Chain Attack
            // Before giving up, do a FORCE SCAN for nearby enemies
            if (this.actor.findNextEnemy && this.actor.findNextEnemy()) {
                // If found, loop continues naturally with new target
            } else {
                // Find Raid Point (Hotspots/Squad)
                if (this.actor.findRaidTarget) {
                    this.actor.findRaidTarget();
                }

                // Search for nearby Goblins/Buildings to engage
                // (Already covered by findNextEnemy above, but kept for fallback logic if API changes)
                if (!this.actor.targetGoblin && !this.actor.targetBuilding && this.actor.checkSelfDefense) {
                    this.actor.checkSelfDefense(goblins);
                }
            }
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
                // Don't exit immediately, try finding next enemy next frame
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
            // FIX: Before moving to Raid Point, SCAN for enemies along the path!
            // If we blindly move to Raid Point, we ignore goblins we bump into.
            if (this.actor.checkSelfDefense && this.actor.checkSelfDefense(goblins)) {
                if (this.actor.targetGoblin || this.actor.targetBuilding) {
                    // Found one! Re-run logic immediately next frame (or loop?)
                    // Just return, next frame 'target' will be set.
                    return;
                }
            }

            // If still no target, move to Raid Point
            if (this.actor.targetRaidPoint) {
                this.actor.smartMove(this.actor.targetRaidPoint.x, this.actor.targetRaidPoint.z, time);
                this.actor.action = "Patrolling";
                return;
            }
            // Retrying findNextEnemy() here is redundant as loop top handles it next frame
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
        if (this.actor.targetGoblin) {
            if (this.actor.attackGoblin) {
                this.actor.attackGoblin(this.actor.targetGoblin);
            } else {
                // Fallback for tests
                let damage = this.actor.damage || 10;
                this.actor.targetGoblin.takeDamage(damage, this.actor);
                if (this.actor.targetGoblin.isDead) this.actor.targetGoblin = null;
                this.actor.attackCooldown = this.actor.attackRate || 1.0;
            }
        } else if (this.actor.targetBuilding) {
            if (this.actor.attackBuilding) {
                this.actor.attackBuilding(this.actor.targetBuilding);
            } else {
                // Fallback for tests
                let damage = this.actor.damage || 10;
                if (target.userData && target.userData.hp !== undefined) {
                    target.userData.hp -= damage;
                    if (target.userData.hp <= 0 && window.game && window.game.terrain) {
                        window.game.terrain.removeBuilding(target);
                        this.actor.targetBuilding = null;
                    }
                }
                this.actor.attackCooldown = this.actor.attackRate || 1.0;
            }
        }
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
