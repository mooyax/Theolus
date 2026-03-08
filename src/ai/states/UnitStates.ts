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
        const time = this.actor.simTime || 0;
        if ((this.actor.role === 'knight' || this.actor.role === 'wizard' || this.actor.role === 'warship') && !this.actor.isMoving) {
            if (typeof this.actor.findRaidTarget === 'function') {
                if (this.actor.findRaidTarget()) {
                    if (typeof this.actor.patrol === 'function') {
                        const success = this.actor.patrol(time);
                        if (success) {
                            this.actor.action = 'Patrolling';
                        }
                    }
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

        // 1. Resume Previous Movement
        if (this.resumeContext) {
            const ctx = this.resumeContext;
            const success = this.actor.smartMove(ctx.target.x, ctx.target.z, time);
            if (success) {
                if (ctx.action) this.actor.action = ctx.action;
                this.resumeContext = null;
            } else if (!success && !this.actor.isPathfinding && !this.actor.isWaitingForPath) {
                // FAILED: Target might be unreachable now. Abandon resume.
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
        if ((this.actor.role === 'knight' || this.actor.role === 'wizard' || this.actor.role === 'warship') && !this.actor.isMoving) {
            if (typeof this.actor.findRaidTarget === 'function') {
                const hasTarget = this.actor.findRaidTarget();
                if (hasTarget) {
                    if (typeof this.actor.patrol === 'function') {
                        const success = this.actor.patrol(time);
                        if (success) {
                            this.actor.action = 'Patrolling';
                            return;
                        }
                    }
                }
            }
        }

        // 4. Wander logic (Base)
        super.update(time, deltaTime);

        if (this.actor.migrationTarget) {
            this.actor.action = 'Migrating';
        } else if (!this.actor.isMoving && !this.actor.isSleeping) {
            this.actor.stagnationTimer = (this.actor.stagnationTimer || 0) + deltaTime;
            if (this.actor.action !== 'Patrolling' && this.actor.action !== 'Working' && this.actor.action !== 'Migrating') {
                this.actor.action = 'Idle';
            }
        } else {
            this.actor.stagnationTimer = 0;
            if (this.actor.isMoving) this.actor.action = 'Moving';
        }

        // 4.5 Migration check
        if (this.actor.role === 'worker' && this.actor.stagnationTimer > 20 && !this.actor.migrationTarget) {
            this.actor.migrate(time);
        }

        // 5. Job Search / Resume (Worker only)
        const game = (window as any).game || this.actor.game;
        if (this.actor.role === 'worker' && game && typeof game.findBestRequest === 'function') {
            if (this.actor.targetRequest) {
                const req = this.actor.targetRequest;
                if (req.status !== 'finished' && req.status !== 'cancelled' && req.status !== 'completed') {
                    this.actor.changeState(new Job(this.actor));
                    return;
                } else {
                    // FIX: Clear obsolete request to remove "!" indicator from unit headers
                    this.actor.targetRequest = null;
                }
            }
        }

        // 6. Sleep check (Priority at Night: Go home if it's night and no manual job)
        // Naval Units (Ships) do NOT sleep at night.
        const finalIsManual = this.actor.targetRequest && this.actor.targetRequest.isManual;
        if (isNight && !finalIsManual && !this.actor.isNaval) {
            this.actor.changeState(new Sleep(this.actor));
            return;
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
        this.actor.isUnreachable = false;
        this.actor.stuckTimer = 0;
        this.stuckTimer = 0;
        this.actor.isMoving = false;
        if (this.actor.clearPath) this.actor.clearPath();
        this.actor.stagnationTimer = 0;

        const req = this.actor.targetRequest;
        if (!req) {
            this.exitJob();
            return;
        }
        this.actor.action = 'Approaching Job';

        if (this.actor.smartMove) {
            this.actor.smartMove(req.x, req.z, this.actor.simTime || 0);
        }
    }

    update(...args: any[]) {
        const [time, deltaTime, isNight, units, buildings, goblins] = args;
        const req = this.actor.targetRequest;

        if (this.actor.targetGoblin || this.actor.targetUnit) {
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        if (!req || (req.assignedTo && req.assignedTo != this.actor.id) || req.status === 'finished' || req.status === 'cancelled' || req.status === 'completed') {
            this.exitJob();
            return;
        }

        if (req.building && (req.building.isDead || (req.building.userData && req.building.userData.hp <= 0))) {
            this.exitJob();
            return;
        }

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

        const dist = this.actor.getDistance(req.x, req.z);
        const isStuck = (this.actor.stuckTimer > 5.0) || this.actor.isUnreachable || (this.actor.stagnationTimer > 10.0);

        if (isNight && !req.isManual && !this.actor.isNaval) {
            if (dist > 3.0 || isStuck) {
                if (this.actor.game && this.actor.game.releaseRequest) {
                    this.actor.game.releaseRequest(this.actor, req);
                }
                this.actor.changeState(new Sleep(this.actor));
                return;
            }
        }

        const threshold = req.isManual ? 40.0 : 25.0;
        if (this.actor.stagnationTimer > threshold) {
            if (this.actor.game && this.actor.game.releaseRequest) {
                this.actor.game.releaseRequest(this.actor, req);
            }
            if (this.actor.ignoredTargets) {
                this.actor.ignoredTargets.set(req.id, time + (req.isManual ? 5.0 : 15.0));
            }
            this.exitJob();
            return;
        }

        if (this.actor.targetGoblin || this.actor.targetUnit) {
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        // Dynamic completion threshold: allow land workers to "reach" water markers from the shore
        const isWaterTarget = this.actor.terrain.getTileHeight(req.x, req.z) <= 0;
        const completionThreshold = (isWaterTarget && !this.actor.isNaval) ? 5.5 : 2.1;

        if (dist <= completionThreshold) {
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

        if (this.actor.isMoving && this.actor.stuckTimer > 5.0) {
            if (this.actor.game && this.actor.game.deferRequest) {
                this.actor.game.deferRequest(req, 10.0);
            }
            this.exitJob();
            return;
        }

        if (this.actor.smartMove) {
            if (!this.actor.isMoving || time - this.lastMoveAttempt > 1.0) {
                let tx = req.x;
                let tz = req.z;

                // Adjust for water-based markers (like Ports)
                const h = this.actor.terrain.getTileHeight(tx, tz);
                if (h <= 0 && !this.actor.isNaval) {
                    const nearestLand = this.actor.terrain.findNearestTileByCondition(
                        tx, tz, 5,
                        (cell: any) => cell.height > 0 && this.actor.isReachable(cell.x, cell.z, true)
                    );
                    if (nearestLand) {
                        tx = nearestLand.x;
                        tz = nearestLand.z;
                    }
                }

                const success = this.actor.smartMove(tx, tz, time);
                this.lastMoveAttempt = time;
                if (!success && !this.actor.isPathfindingThrottled) {
                    this.actor.pathFailCount = (this.actor.pathFailCount || 0) + 1;
                }
                if (!req.isManual && this.actor.pathFailCount >= 3) {
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

    enter(prev?: State) {
        super.enter(prev);
        if (this.actor.isSleeping) {
            this.actor.isSleeping = false;
        }
        if (this.actor.mesh) {
            this.actor.mesh.visible = true;
        }
    }

    protected executeAttack(target: any, time: number, deltaTime: number) {
        if (target) {
            this.actor.attack(target, time);
        }
    }
    update(...args: any[]) {
        super.update(...args);
        const [time, deltaTime] = args;

        // Warship Invasion Logic
        if (this.actor.role === 'warship' && typeof this.actor.updateInvasion === 'function') {
            const target = this.actor.targetGoblin || this.actor.targetUnit || this.actor.targetBuilding;
            this.actor.updateInvasion(deltaTime, target);
        }

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
        const shelter = (typeof this.actor.findNearestShelter === 'function' ? this.actor.findNearestShelter() : null) || this.actor.residence || this.actor.homeBase;
        if (shelter) {
            this.actor.action = "Going Home";
        } else {
            this.actor.action = "Idle";
        }
    }
    update(...args: any[]) {
        const [time, deltaTime, isNight, units, buildings, goblins] = args;
        if (this.actor.targetGoblin || this.actor.targetUnit || this.actor.targetBuilding) {
            this.actor.isSleeping = false;
            if (this.actor.mesh) this.actor.mesh.visible = true;
            this.actor.changeState(new Combat(this.actor));
            return;
        }

        const game = (window as any).game || this.actor.game;

        if (!isNight || this.actor.isNaval) {
            this.actor.isSleeping = false;
            if (this.actor.mesh) this.actor.mesh.visible = true;
            this.actor.changeState(new Wander(this.actor));
            return;
        }

        const shelter = (typeof this.actor.findNearestShelter === 'function' ? this.actor.findNearestShelter() : null) || this.actor.residence || this.actor.homeBase;
        if (shelter) {
            const sX = shelter.gridX !== undefined ? shelter.gridX : (shelter.userData ? shelter.userData.gridX : shelter.x);
            const sZ = shelter.gridZ !== undefined ? shelter.gridZ : (shelter.userData ? shelter.userData.gridZ : shelter.z);

            const dist = this.actor.getDistance(sX, sZ);

            if (dist > 2.0) {
                this.actor.action = "Going Home";
                this.actor.isSleeping = false;
                if (this.actor.mesh) this.actor.mesh.visible = true;
                if (this.actor.smartMove) {
                    this.actor.smartMove(sX, sZ, time);
                }
            } else {
                this.actor.action = "Sleeping";
                this.actor.isSleeping = true;
                this.actor.isMoving = false;
                if (this.actor.mesh) this.actor.mesh.visible = false;
            }
        } else {
            this.actor.isSleeping = false;
            if (this.actor.mesh) this.actor.mesh.visible = true;
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
