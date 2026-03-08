import { State, WanderBase, CombatStateBase } from './State.js';
import { IAiActor } from './IAiActor.js';

export class Combat extends CombatStateBase {
    public name: string = 'Combat';

    constructor(actor: IAiActor) {
        super(actor);
    }

    enter(prev?: State) {
        super.enter(prev);
        // FIX: Continuous follow when switching from Raid or another Combat
        const isContinuous = prev && (prev.constructor.name === 'Raid' || prev.constructor.name === 'Combat');
        if (isContinuous) {
            this.actor.isMoving = true;
        }

        // Special: Notify Clan activity on combat start (Rallying)
        if ((window as any).game && (window as any).game.goblinManager) {
            const currentTarget = this.actor.targetUnit || this.actor.targetBuilding;
            (window as any).game.goblinManager.notifyClanActivity(this.actor.clanId, currentTarget);
        }
    }

    protected executeAttack(target: any, time: number, deltaTime: number) {
        // Attack attempt
        this.actor.attack(target, time);
    }

    protected handleTargetLost() {
        // Goblins default back to Raid when target is lost
        this.actor.changeState(new Raid(this.actor));
    }
}

export class Build extends State {
    public buildX: number;
    public buildZ: number;
    public timer: number;
    constructor(actor: IAiActor, buildX: number, buildZ: number) {
        super(actor);
        this.buildX = buildX;
        this.buildZ = buildZ;
        this.timer = 0;
    }

    enter() {
        this.actor.action = "Building";
        this.actor.isMoving = false;
        if (this.actor.id % 20 === 0) console.log(`[Goblin ${this.actor.id}] ENTER BuildState at ${this.buildX},${this.buildZ}`);
    }

    update(...args: any[]) {
        this.actor.action = "Building";
        const [time, deltaTime, isNight, units = [], buildings = []] = args;
        if (!this.approachTarget(this.buildX, this.buildZ, 1.5, time)) {
            // Still Moving
            // Check for Throttling stuck
            if (!this.actor.isMoving && !this.actor.isPathfindingThrottled && !this.actor.isWaitingForPath) {
                this.actor.changeState(new Wander(this.actor));
            }
            return;
        }

        // Arrived. Build!
        this.actor.action = "Building";
        this.timer += deltaTime;
        if (this.timer > 5.0) { // Take 5 seconds to "build"
            const terrain = this.actor.terrain;
            if (terrain && terrain.canAddBuilding(this.buildX, this.buildZ, 1, 1)) {
                // Add building
                const b = terrain.addBuilding('goblin_hut', this.buildX, this.buildZ);
                if (b) {
                    console.log(`[Goblin ${this.actor.id}] Constructed Goblin Hut at ${this.buildX},${this.buildZ}`);
                    // Optionally consume something or just finish
                }
            }
            this.actor.changeState(new Wander(this.actor));
        }
    }
}

export class Raid extends State {
    public scanTimer: number;
    constructor(actor: IAiActor) {
        super(actor);
        this.scanTimer = 0;
    }

    enter() {
        this.actor.action = "Moving";
        this.actor.isMoving = false; // Trigger pathfinding
    }

    update(...args: any[]) {
        this.actor.action = "Raiding";
        const [time, deltaTime, isNight, units = [], buildings = []] = args;
        // 1. Scan for Targets (Units/Buildings)
        this.scanTimer += deltaTime;
        if (this.scanTimer > 1.0) { // Scan every 1 second
            this.scanTimer = 0;
            // Use Goblin's internal findTarget logic (refactored or legacy wrapper)
            if (this.actor.scanForTargets) {
                // Fallback to (window as any).game if args missing (safety)
                const u = units || ((window as any).game ? (window as any).game.units : []);
                const b = buildings || ((window as any).game ? (window as any).game.buildings : []);
                this.actor.scanForTargets(u, b);

                // findTarget sets targets internally? Or returns them?
                // Legacy Goblin.js findTarget sets this.targetUnit / this.targetBuilding
                // So checking them afterwards:
            }

            if (this.actor.targetUnit || this.actor.targetBuilding) {
                // Switching to Combat
                // console.log(`[GoblinRaid] Found Building ${this.actor.targetBuilding.id || '?'}. Switching to Combat.`);
                this.actor.changeState(new Combat(this.actor));
                return;
            }
        }

        // 2. Move Logic
        // Goblins have 'raidGoal'.
        if (this.actor.raidGoal) {
            // Expiration Check (Cleanup Stuck Raiders)
            if (this.actor.raidGoal.timestamp) {
                const now = time; // FIX: Use passed time instead of (window as any).game
                // Expiry matches Clan Alert Expiry (60s)
                if (now - this.actor.raidGoal.timestamp > 60.0) {
                    this.actor.changeState(new Wander(this.actor));
                    return;
                }
            }

            // --- CLAN ACTIVITY CHECK (NEW) ---
            const manager = (window as any).game ? (window as any).game.goblinManager : null;

            // Debug Logs
            if (manager && manager.clans) {
                const clan = manager.clans[this.actor.clanId];

                if (clan && !clan.active) {
                    this.actor.changeState(new Retreat(this.actor));
                    return;
                }
            }

            // Move to Goal
            if (this.approachTarget(this.actor.raidGoal.x, this.actor.raidGoal.z, 5.0, time)) {
                // Arrived at Raid Goal.
                // CHAIN ATTACK LOGIC: Don't just wander. Scan area immediately.
                if (this.actor.scanForTargets) {
                    const u = units || ((window as any).game ? (window as any).game.units : []);
                    const b = buildings || ((window as any).game ? (window as any).game.buildings : []);
                    this.actor.scanForTargets(u, b);

                    if (this.actor.targetUnit || this.actor.targetBuilding) {
                        this.actor.changeState(new Combat(this.actor));
                        return;
                    }
                }

                // If no local target, try to find a NEW raid goal from Clan Memory
                if ((window as any).game && (window as any).game.goblinManager) {
                    const newTarget = (window as any).game.goblinManager.getClanRaidTarget(this.actor.clanId);
                    if (newTarget) {
                        // Is it different/far enough?
                        const d2 = this.actor.getDistance(newTarget.x, newTarget.z);
                        if (d2 > 10.0) {
                            this.actor.raidGoal = newTarget;
                            console.log(`[Goblin ${this.actor.id}] Chain Attack! Moving to new target.`);
                            return; // Continue Raiding
                        }
                    }
                }

                this.actor.changeState(new Wander(this.actor));
                return;
            } else {
                // Still Moving
                if (!this.actor.isMoving && !this.actor.isPathfindingThrottled && !this.actor.isWaitingForPath) {
                    // Fallback to Wander if unreachable (BUT NOT if just throttled)
                    this.actor.changeState(new Wander(this.actor));
                }
            }
        } else {
            // No Raid Goal? Just wander.
            this.actor.changeState(new Wander(this.actor));
        }
    }
}

export class Retreat extends State {
    public cave: any;
    constructor(actor: IAiActor) {
        super(actor);
        this.cave = null;
    }

    enter() {
        this.actor.action = "Moving";
        // Find nearest cave of same clan
        const manager = (window as any).game ? (window as any).game.goblinManager : null;
        if (manager && this.actor.clanId) {
            // Use simple clanId match. If multiple caves, find closest later?
            // For now, first found is fine.
            this.cave = manager.caves.find(c => c.clanId === this.actor.clanId);
        }
        this.actor.isMoving = false; // Trigger new path
    }

    update(...args: any[]) {
        this.actor.action = "Retreating";
        const [time, deltaTime, isNight, units = [], buildings = []] = args;
        if (!this.cave) {
            this.actor.isDead = true; // Despawn if no home
            return;
        }

        if (this.approachTarget(this.cave.gridX, this.cave.gridZ, 2.0, time)) {
            this.actor.isDead = true; // Despawn upon reaching cave
            return;
        }

        // Still Moving
        if (!this.actor.isMoving && !this.actor.isPathfindingThrottled && !this.actor.isWaitingForPath) {
            this.actor.isDead = true; // Despawn if truly stuck during retreat
        }
    }
}


export class Wander extends WanderBase {

    public scanTimer: number;
    constructor(actor: IAiActor) {
        super(actor);
        this.scanTimer = 0;
    }

    update(...args: any[]) {
        const [time, deltaTime, isNight, units = [], buildings = []] = args;
        // DEBUG: State Trace
        if (this.actor.id % 10 === 0 && Math.random() < 0.05) {
            console.log(`[GoblinWander Debug] ID:${this.actor.id} State:Wander Update. Timer:${this.scanTimer.toFixed(2)} dt:${deltaTime.toFixed(4)} findTarget:${typeof this.actor.findTarget}`);
        }

        super.update(time, deltaTime); // Handle random movement

        // Sync Action
        if (this.actor.isMoving) {
            this.actor.action = 'Moving';
        } else {
            this.actor.action = 'Idle';
        }

        this.scanTimer += deltaTime;

        // DYNAMIC INTERVAL: Scale with population to prevent O(N) overload
        const totalGoblins = ((window as any).game && (window as any).game.goblinManager && (window as any).game.goblinManager.goblins) ? (window as any).game.goblinManager.goblins.length : 0;
        let scanInterval = 0.5;
        if (totalGoblins > 7000) scanInterval = 5.0; // Extreme load
        else if (totalGoblins > 5000) scanInterval = 3.0;
        else if (totalGoblins > 2000) scanInterval = 1.5;
        else if (totalGoblins > 500) scanInterval = 1.0;

        if (this.scanTimer > scanInterval) {
            // SCAN BUDGET CHECK
            let canScan = true;
            if ((window as any).game && (window as any).game.goblinManager && (window as any).game.goblinManager.scanBudget !== undefined) {
                // PRIORITY: Units in Combat/Raid or close to camera skip budget
                const isUrgent = this.actor.action === 'Fighting' || this.actor.action === 'Sieging' || this.constructor.name === 'Combat' || this.constructor.name === 'Raid';
                const cam = (window as any).game.camera;
                const distSq = (this.actor.position && cam) ? ((this.actor.position.x - cam.position.x) ** 2 + (this.actor.position.z - cam.position.z) ** 2) : 9999;

                const isPriority = isUrgent || distSq < 400; // < 20m

                if (!isPriority) {
                    if ((window as any).game.goblinManager.scanBudget > 0) {
                        (window as any).game.goblinManager.scanBudget--;
                    } else {
                        canScan = false;
                        // Keep timer high, retry next frame (with randomness?)
                        this.scanTimer -= Math.random() * 0.2;
                    }
                }
            }

            if (canScan) {
                this.scanTimer = 0;
                // Add jitter to desynchronize
                this.scanTimer -= Math.random() * 0.5;

                if (this.actor.scanForTargets) {
                    // DEBUG: Pre-Call
                    if (this.actor.id % 10 === 0) console.log(`[GoblinState Debug] ID:${this.actor.id} Calling scanForTargets...`);

                    const u = units || ((window as any).game ? (window as any).game.units : []);
                    const b = buildings || ((window as any).game ? (window as any).game.buildings : []);
                    this.actor.scanForTargets(u, b);
                }

                if (this.actor.targetUnit || this.actor.targetBuilding) {
                    this.actor.changeState(new Combat(this.actor));
                    return;
                }
            }
        }

        // --- RETREAT CHECK REMOVED ---
        // Ambient goblins should wander even if clan is not in War Mode.

        // --- BUILD CHECK (NEW) ---
        if (this.actor.type === 'goblin' && Math.random() < 0.02) {
            const terrain = this.actor.terrain;
            if (terrain) {
                const gx = Math.round(this.actor.gridX);
                const gz = Math.round(this.actor.gridZ);
                if (terrain.canAddBuilding(gx, gz, 1, 1)) {
                    this.actor.changeState(new Build(this.actor, gx, gz));
                    return;
                }
            }
        }
    }
}

// --- NAMES MATCH DESIGN SPEC ---
