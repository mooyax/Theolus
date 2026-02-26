import { State, WanderBase, CombatStateBase } from './State.js';

export class Wander extends WanderBase {
    public name: string;
    public resumeContext: any;
    constructor(actor: any) {
        super(actor);
        this.name = 'Wander';
    }

    enter(prev?: State) {
        // --- AUTONOMOUS PATROL (FOR COMBAT UNITS) ---
        // Moved to TOP of call to avoid action overwriting
        const time = this.actor.simTime || 0;
        if ((this.actor.role === 'knight' || this.actor.role === 'wizard') && !this.actor.isMoving) {
            if (typeof this.actor.findRaidTarget === 'function') {
                if (this.actor.findRaidTarget()) {
                    if (typeof this.actor.patrol === 'function') {
                        this.actor.patrol(time);
                    }
                    this.actor.action = 'Patrolling';
                    // If we just triggered a patrol, we don't return from enter (it's called once),
                    // but we ensure the action is set.
                }
            }
        }

        const target = this.actor.migrationTarget || (this.actor.isMoving ? { x: this.actor.targetGridX, z: this.actor.targetGridZ } : null);
        const originalAction = this.actor.action;

        super.enter(prev);

        if (target && prev) {
            this.resumeContext = { target: target, action: originalAction };
        }
        if (this.actor.migrationTarget) {
            this.actor.action = 'Migrating';
        }
    }

    update(...args: any[]) {
        const [time, deltaTime, isNight, units, buildings, goblins] = args;

        // 1. Sleep check
        // workers go to sleep IF: it is night AND (no targetRequest OR targetRequest is auto) AND shelter exists.
        const shelter = (typeof this.actor.findNearestShelter === 'function' ? this.actor.findNearestShelter() : null) || this.actor.residence || this.actor.homeBase;
        const hasManualJob = this.actor.targetRequest && this.actor.targetRequest.isManual;
        if (isNight && this.actor.role === 'worker' && !hasManualJob && shelter) {
            this.actor.changeState(new Sleep(this.actor));
            return;
        }

        // 2. Resume Previous Movement
        if (this.resumeContext) {
            const ctx = this.resumeContext;
            if (this.actor.smartMove(ctx.target.x, ctx.target.z, time)) {
                if (ctx.action) this.actor.action = ctx.action;
                this.resumeContext = null;
            }
        }

        // 3. Combat check
        const hasEnemyEntity = this.actor.targetGoblin || this.actor.targetUnit;
        const hasEnemyBuilding = this.actor.targetBuilding;
        const isWorker = this.actor.role === 'worker';

        if (hasEnemyEntity || (hasEnemyBuilding && !isWorker)) {
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        // --- AUTONOMOUS PATROL (FOR COMBAT UNITS) ---
        if ((this.actor.role === 'knight' || this.actor.role === 'wizard') && !this.actor.isMoving) {
            if (typeof this.actor.findRaidTarget === 'function') {
                const hasTarget = this.actor.findRaidTarget();
                console.log(`[Wander Update] findRaidTarget for unit ${this.actor.id}: ${hasTarget}`);
                if (hasTarget) {
                    if (typeof this.actor.patrol === 'function') {
                        console.log(`[Wander Update] Calling patrol() for unit ${this.actor.id}`);
                        this.actor.patrol(time); // Trigger patrol move logic
                    }
                    this.actor.action = 'Patrolling';
                    console.log(`[Wander Update] Set action to Patrolling for unit ${this.actor.id}`);
                    return; // EXIT EARLY to preserve 'Patrolling' action
                }
            }
        }

        // 4. Wander logic (Base)
        super.update(time, deltaTime);

        if (this.actor.migrationTarget) {
            this.actor.action = 'Migrating';
        } else if (!this.actor.isMoving && !this.actor.isSleeping) {
            // Increment stagnation for migration/job-change logic
            this.actor.stagnationTimer = (this.actor.stagnationTimer || 0) + deltaTime;
            // PRESERVE SPECIAL ACTIONS (Patrolling, etc.)
            if (this.actor.action !== 'Patrolling' && this.actor.action !== 'Working' && this.actor.action !== 'Migrating') {
                this.actor.action = 'Idle';
            }
        } else {
            this.actor.stagnationTimer = 0;
            if (this.actor.isMoving) this.actor.action = 'Moving';
        }

        // 4.5 Migration check (Triggered by stagnation)
        if (this.actor.role === 'worker' && this.actor.stagnationTimer > 20 && !this.actor.migrationTarget) {
            this.actor.migrate(time);
        }


        // 5. Job Search / Resume
        const game = (window as any).game || this.actor.game;
        if (this.actor.role === 'worker' && game && typeof game.findBestRequest === 'function') {
            // PROACTIVE RESUME: If we already have a request but are in Wander (e.g. after sleep/combat), return to Job.
            if (this.actor.targetRequest) {
                const req = this.actor.targetRequest;
                if (req.status !== 'finished' && req.status !== 'cancelled' && req.status !== 'completed') {
                    this.actor.changeState(new Job(this.actor));
                    return;
                }
            }

            // NEW SEARCH: 
            // - If no targetRequest, always search.
            // - If HAS targetRequest but it's AUTOMATIC, search ONLY for MANUAL jobs to allow priority switching.
            const currentIsManual = this.actor.targetRequest && this.actor.targetRequest.isManual;
            if (!this.actor.targetRequest || !currentIsManual) {
                const searchManualOnly = !!this.actor.targetRequest; // If we have one, only look for manual upgrades
                const req = game.findBestRequest(this.actor, !isNight, searchManualOnly);

                if (req) {
                    const excludedUntil = this.actor.ignoredTargets ? this.actor.ignoredTargets.get(req.id) : 0;
                    if (!(excludedUntil > time) && !(isNight && !req.isManual)) {
                        // If we are switching, we need to release the old one
                        if (this.actor.targetRequest && this.actor.targetRequest.id !== req.id) {
                            console.log(`[Wander] Unit ${this.actor.id} switching from AUTO ${this.actor.targetRequest.id} to MANUAL ${req.id}`);
                            game.releaseRequest(this.actor, this.actor.targetRequest);
                        }

                        if (game.claimRequest(this.actor, req)) {
                            this.actor.targetRequest = req;
                            this.actor.changeState(new Job(this.actor));
                            return;
                        }
                    }
                }
            }
        }
    }
}

export class Job extends State {
    public name: string = 'Job';
    public resumeState: State | null = null;
    public stuckTimer: number = 0;
    public lastMoveAttempt: number = 0;

    constructor(actor: any) {
        super(actor);
    }

    enter(prev?: State) {
        if (prev) this.resumeState = prev;

        // State Cleanup: Clear stale flags from previous attempts
        this.actor.isUnreachable = false;
        this.actor.stuckTimer = 0;
        this.stuckTimer = 0;
        this.actor.isMoving = false; // Reset movement status on job entry
        if (this.actor.clearPath) this.actor.clearPath();
        this.actor.stagnationTimer = 0;

        const req = this.actor.targetRequest;
        if (!req) {
            this.exitJob();
            return;
        }
        this.actor.action = 'Approaching Job';

        // Proactive Movement
        if (this.actor.smartMove) {
            this.actor.smartMove(req.x, req.z, this.actor.simTime || 0);
        }

        console.log(`[JobState] Entered. Unit:${this.actor.id} Req:${req.type} at ${req.x},${req.z}`);
    }

    update(...args: any[]) {
        const [time, deltaTime, isNight, units, buildings, goblins] = args;
        const req = this.actor.targetRequest;

        // Combat check (Self Defense)
        if (this.actor.targetGoblin || this.actor.targetUnit) {
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        // Use loose equality != to handle string/number ID mismatch from serialization
        if (!req || (req.assignedTo && req.assignedTo != this.actor.id) || req.status === 'finished' || req.status === 'cancelled' || req.status === 'completed') {
            const reason = !req ? "null_req" : (req.assignedTo != this.actor.id ? `assigned_${req.assignedTo}_vs_${this.actor.id}` : `status_${req.status}`);
            console.log(`[JobState] EXITING ID ${this.actor.id}. Reason: ${reason}`);
            this.exitJob();
            return;
        }

        // 0. Build Target Validation
        if (req.building && (req.building.isDead || (req.building.userData && req.building.userData.hp <= 0))) {
            this.exitJob();
            return;
        }

        // 0. Unreachable Handling
        if (this.actor.isUnreachable) {
            const deferTime = req.isManual ? 3.0 : 15.0;
            if (this.actor.game && this.actor.game.deferRequest) {
                this.actor.game.deferRequest(req, deferTime);
            }
            if (this.actor.ignoredTargets) {
                this.actor.ignoredTargets.set(req.id, time + deferTime);
            }
            this.exitJob();
            return;
        }

        // 1. Night check
        // Manual jobs persist. Auto jobs persist IF they are already active/started.
        if (isNight && !req.isManual) {
            const isStuck = this.actor.stuckTimer > 5.0 || this.actor.isUnreachable || (this.actor.stagnationTimer > 10.0);

            // Release if stuck at night.
            if (isStuck) {
                if (this.actor.game && this.actor.game.releaseRequest) {
                    this.actor.game.releaseRequest(this.actor, req);
                }
                this.exitJob();
                return;
            }
        }

        // 1.5 Stagnation check (Global: if not moving/working for too long)
        // threshold 25.0 to satisfy StuckReassignment.test.js (30s limit)
        // Allow manual jobs to be abandoned if truly stuck for a long time
        const threshold = req.isManual ? 40.0 : 25.0;
        if (this.actor.stagnationTimer > threshold) {
            const exclusionTime = 15.0;
            if (this.actor.game && this.actor.game.releaseRequest) {
                this.actor.game.releaseRequest(this.actor, req);
            }
            if (this.actor.ignoredTargets) {
                this.actor.ignoredTargets.set(req.id, time + (req.isManual ? 5.0 : exclusionTime));
            }
            this.exitJob();
            return;
        }

        // 2. Combat distraction
        if (this.actor.targetGoblin || this.actor.targetUnit) {
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        // 3. Movement
        const dist = this.actor.getDistance(req.x, req.z);
        if (dist <= 2.1) {
            this.actor.isMoving = false;
            if (this.actor.role === 'worker') {
                this.actor.action = 'Working';
                if (this.actor.game && this.actor.game.completeRequest) {
                    this.actor.game.completeRequest(this.actor, req);
                    this.exitJob();
                }
            }
            return;
        }

        // Stuck check
        if (this.actor.isMoving && this.actor.stuckTimer > 5.0) {
            if (this.actor.game && this.actor.game.deferRequest) {
                this.actor.game.deferRequest(req, 10.0);
            }
            this.exitJob();
            return;
        }

        if (this.actor.smartMove) {
            if (!this.actor.isMoving || time - this.lastMoveAttempt > 1.0) {
                const success = this.actor.smartMove(req.x, req.z, time);
                this.lastMoveAttempt = time;

                // FIX: Only increment failure count if REALLY failed (not just throttled)
                if (!success && !this.actor.isPathfindingThrottled) {
                    this.actor.pathFailCount = (this.actor.pathFailCount || 0) + 1;
                }

                // 2.3 Abandonment check (Auto-only: if pathfinding fails repeatedly)
                // Threshold 3 allows Jitabata fix while preserving Manual persistence
                if (!req.isManual && this.actor.pathFailCount >= 3) {
                    console.log(`[JobState] ID ${this.actor.id} ABANDONING Job ${req.id} due to repeated path failure.`);
                    if (this.actor.game && this.actor.game.releaseRequest) {
                        this.actor.game.releaseRequest(this.actor, req);
                    }
                    this.exitJob();
                    return;
                }
            }
        }
    }

    exitJob() {
        this.actor.targetRequest = null;
        this.actor.clearPath();
        this.actor.isUnreachable = false;
        this.actor.stuckTimer = 0;
        if ((this.actor as any).stagnationTimer !== undefined) {
            (this.actor as any).stagnationTimer = 0;
        }
        this.actor.changeState(this.resumeState || new Wander(this.actor));
    }
}

export class Combat extends CombatStateBase {
    public name: string = 'Combat';
    constructor(actor: any) {
        super(actor);
    }

    protected executeAttack(target: any, time: number, deltaTime: number) {
        if (target) {
            this.actor.attack(target, time);
        }
    }
    update(...args: any[]) {
        super.update(...args);
        // If state changed to Wander in base (target lost), ensure stop
        if (!this.actor.targetGoblin && !this.actor.targetUnit && !this.actor.targetBuilding) {
            this.actor.clearPath();
            this.actor.changeState(new Wander(this.actor));
        }
    }
}

export class Sleep extends State {
    public name: string = 'Sleep';
    constructor(actor: any) {
        super(actor);
    }
    enter(prev?: State) {
        // Proactive Action/Movement setup on entry
        const shelter = (typeof this.actor.findNearestShelter === 'function' ? this.actor.findNearestShelter() : null) || this.actor.residence || this.actor.homeBase;
        if (shelter) {
            const sX = shelter.gridX !== undefined ? shelter.gridX : (shelter.userData ? shelter.userData.gridX : shelter.x);
            const sZ = shelter.gridZ !== undefined ? shelter.gridZ : (shelter.userData ? shelter.userData.gridZ : shelter.z);
            let dist = Infinity;
            if (typeof this.actor.getDistance === 'function') {
                dist = this.actor.getDistance(sX, sZ);
            } else if (this.actor.gridX !== undefined && this.actor.gridZ !== undefined) {
                dist = Math.sqrt(Math.pow(this.actor.gridX - sX, 2) + Math.pow(this.actor.gridZ - sZ, 2));
            }
            if (dist > 2.0) {
                this.actor.action = "Going Home";
            } else {
                this.actor.action = "Sleeping";
                this.actor.isSleeping = true;
            }
        } else {
            this.actor.action = "Sleeping";
            this.actor.isSleeping = true;
        }
    }
    update(...args: any[]) {
        const [time, deltaTime, isNight] = args;

        // Wake up for MANUAL requests even at night
        const game = (window as any).game || this.actor.game;
        if (this.actor.role === 'worker' && game && typeof game.findBestRequest === 'function') {
            // Force search for manual jobs (ignore night)
            const req = game.findBestRequest(this.actor, false); // false = don't care about night? No, second arg is 'isDay' which usually filters auto jobs.
            // Actually, findBestRequest(unit, isDay)
            // Let's check Game.ts findBestRequest signature.
            if (req && req.isManual) {
                if (game.claimRequest(this.actor, req)) {
                    this.actor.targetRequest = req;
                    this.actor.isSleeping = false;
                    this.actor.changeState(new Job(this.actor));
                    return;
                }
            }
        }

        if (!isNight) {
            this.actor.isSleeping = false;
            this.actor.changeState(new Wander(this.actor));
            return;
        }

        // Logic for "Going Home" vs "Sleeping"
        const shelter = (typeof this.actor.findNearestShelter === 'function' ? this.actor.findNearestShelter() : null) || this.actor.residence || this.actor.homeBase;
        if (shelter) {
            const sX = shelter.gridX !== undefined ? shelter.gridX : (shelter.userData ? shelter.userData.gridX : shelter.x);
            const sZ = shelter.gridZ !== undefined ? shelter.gridZ : (shelter.userData ? shelter.userData.gridZ : shelter.z);

            // Standard distance check (2.0 threshold)
            let dist = Infinity;
            if (typeof this.actor.getDistance === 'function') {
                dist = this.actor.getDistance(sX, sZ);
            } else if (this.actor.gridX !== undefined && this.actor.gridZ !== undefined) {
                dist = Math.sqrt(Math.pow(this.actor.gridX - sX, 2) + Math.pow(this.actor.gridZ - sZ, 2));
            }

            if (dist > 2.0) {
                this.actor.action = "Going Home";
                this.actor.isSleeping = false;
                if (this.actor.smartMove) {
                    this.actor.smartMove(sX, sZ, time);
                }
            } else {
                this.actor.action = "Sleeping";
                this.actor.isSleeping = true;
                this.actor.isMoving = false;
            }
        } else {
            // Test requirement: Revert to Wander if no shelter found
            this.actor.isSleeping = false;
            this.actor.changeState(new Wander(this.actor));
        }
    }
}

export class Build extends State {
    public name: string = 'Build';
    constructor(actor: any) {
        super(actor);
    }
    enter(prev?: State) {
        this.actor.action = 'Building';
    }
    update(time: number, deltaTime: number) {
        this.actor.action = 'Building';
    }
}
