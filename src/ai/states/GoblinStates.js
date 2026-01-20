import { State, WanderState } from './State.js';

export class GoblinCombatState extends State {
    constructor(actor) {
        super(actor);
        this.stagnationTimer = 0;
    }
    enter() {
        // console.log(`[GoblinState ${this.actor.id}] ENTER CombatState. Target: ${this.actor.targetUnit ? 'Unit ' + this.actor.targetUnit.id : 'Building'}`);
        if (this.actor.action !== "Fighting") {
            this.actor.action = "Fighting";
            this.actor.isMoving = false; // Stop immediately to attack or re-evaluate
        }
        this.stagnationTimer = 0; // Reset
    }
    update(time, deltaTime, units, buildings) {
        // Target Validation
        const target = this.actor.targetUnit || this.actor.targetBuilding;
        if (!target) {
            this.actor.changeState(new GoblinRaidState(this.actor));
            return;
        }

        // --- BUILDING PERSISTENCE CHECK ---
        if (this.actor.targetBuilding) {
            // FIX: Don't use O(N) includes check. Use HP check.
            const b = this.actor.targetBuilding;
            const isDead = (b.isDestroyed && b.isDestroyed()) || (b.userData.hp <= 0 && (b.userData.population || 0) < 1.0);

            if (isDead) {
                console.log(`[GoblinCombat ${this.actor.id}] Target Dead/Destroyed. Switching to Raid.`);
                this.actor.targetBuilding = null;
                this.actor.changeState(new GoblinRaidState(this.actor));
                return;
            }
        }

        // --- UNIT DEATH CHECK ---
        if (this.actor.targetUnit && (this.actor.targetUnit.isDead || this.actor.targetUnit.isFinished)) {
            console.log(`[GoblinCombat ${this.actor.id}] Target Unit Dead. Switching to Raid.`);
            this.actor.targetUnit = null;
            this.actor.changeState(new GoblinRaidState(this.actor));
            return;
        }

        // Stagnation Detection
        this.stagnationTimer += deltaTime;
        if (this.stagnationTimer > 15.0) {
            // STABILIZATION: Blacklist target to prevent immediate re-engagement (Flip-Flop)
            // If we stuck for 15s, we can't reach it. Ignore for 10s.
            const now = window.game ? window.game.simTotalTimeSec : 0;
            if (this.actor.targetUnit) {
                if (this.actor.ignoredTargets) this.actor.ignoredTargets.set(this.actor.targetUnit.id, now + 10.0);
                // console.log(`[GoblinState] Stagnation: Ignoring Unit ${this.actor.targetUnit.id} for 10s`);
            }
            if (this.actor.targetBuilding) {
                if (this.actor.ignoredTargets && this.actor.targetBuilding.userData) {
                    const id = this.actor.targetBuilding.id || this.actor.targetBuilding.userData.id;
                    this.actor.ignoredTargets.set(id, now + 15.0);
                    console.log(`[GoblinCombat ${this.actor.id}] Stagnation (15s). Blacklisting Building ${id}. Switching to Raid.`);
                }
            }

            this.actor.targetUnit = null;
            this.actor.targetBuilding = null;
            this.actor.changeState(new GoblinRaidState(this.actor));
            return;
        }

        // Use logic from Goblin.js
        if (this.actor.executeCombatLogic) {
            // ENCOUNTER COMBAT START
            // If target is Building or far Unit, check for nearby enemies to engage
            const primaryTarget = this.actor.targetUnit || this.actor.targetBuilding;

            if (primaryTarget) {
                const dist = this.actor.targetUnit ?
                    this.actor.getDistance(this.actor.targetUnit.gridX, this.actor.targetUnit.gridZ) :
                    (this.actor.getDistanceToBuilding ? this.actor.getDistanceToBuilding(this.actor.targetBuilding) : 999);

                if (dist < 3.0) {
                    this.stagnationTimer = 0; // Reset while in range
                } else if (dist > 8.0) {
                    // If primary target is far, scan for nearby (5.0) opportunity targets
                    const range = 5.0;
                    // Use fallback check if scanForTargets not suitable (scanForTargets usually sets target directly)
                    // But we want to find ONE and compare.

                    // Optimization: Use simple distance check against KNOWN units if accessing ALL units is heavy?
                    // GoblinManager has list of units? No, simple scanForTargets re-run is easiest but might override target.
                    // Goblin.js `scanForTargets` implementation:
                    // It checks nearby units/buildings and sets `this.targetUnit`.

                    // Let's manually scan nearby units
                    const units = (window.game && window.game.units) ? window.game.units : [];
                    let bestUnit = null;
                    let bestDist = range;

                    for (const u of units) {
                        if (u.isDead) continue;
                        // Optimization: Manhattan check first
                        if (Math.abs(u.gridX - this.actor.gridX) > range || Math.abs(u.gridZ - this.actor.gridZ) > range) continue;

                        const d = this.actor.getDistance(u.gridX, u.gridZ);
                        if (d < bestDist) {
                            bestDist = d;
                            bestUnit = u;
                        }
                    }

                    if (bestUnit && (!this.actor.targetUnit || bestUnit.id !== this.actor.targetUnit.id)) {
                        console.log(`[GoblinState ${this.actor.id}] Encounter! Switching from ${this.actor.targetUnit ? 'Unit' : 'Building'} to Nearby Unit ${bestUnit.id}`);
                        this.actor.targetUnit = bestUnit;
                        // Prioritize Unit over Building, but KEEP targetBuilding to resume later!
                        // this.actor.targetBuilding = null; 
                    }
                }
            }
            // ENCOUNTER COMBAT END

            this.actor.executeCombatLogic(time, deltaTime);
        } else {
        }

        // If after update logic, we lost targets (killed/destroyed), switch back
        if (!this.actor.targetUnit && !this.actor.targetBuilding) {
            this.actor.changeState(new GoblinRaidState(this.actor));
        }
    }
}

export class GoblinBuildState extends State {
    constructor(actor, buildX, buildZ) {
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

    update(time, deltaTime) {
        const dist = this.actor.getDistance(this.buildX, this.buildZ);
        if (dist > 1.5) {
            if (!this.actor.isMoving) {
                const moved = this.actor.smartMove(this.buildX, this.buildZ, time);
                if (!moved && !this.actor.isPathfindingThrottled) {
                    this.actor.changeState(new GoblinWanderState(this.actor));
                }
            }
            return;
        }

        // Arrived. Build!
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
            this.actor.changeState(new GoblinWanderState(this.actor));
        }
    }
}

export class GoblinRaidState extends State {
    constructor(actor) {
        super(actor);
        this.scanTimer = 0;
    }

    enter() {
        this.actor.action = "Raiding";
        this.actor.isMoving = false; // Trigger pathfinding
    }

    update(time, deltaTime, units, buildings) {
        // 1. Scan for Targets (Units/Buildings)
        this.scanTimer += deltaTime;
        if (this.scanTimer > 1.0) { // Scan every 1 second
            this.scanTimer = 0;
            // Use Goblin's internal findTarget logic (refactored or legacy wrapper)
            if (this.actor.scanForTargets) {
                // Fallback to window.game if args missing (safety)
                const u = units || (window.game ? window.game.units : []);
                const b = buildings || (window.game ? window.game.buildings : []);
                this.actor.scanForTargets(u, b);

                // findTarget sets targets internally? Or returns them?
                // Legacy Goblin.js findTarget sets this.targetUnit / this.targetBuilding
                // So checking them afterwards:
            }

            if (this.actor.targetUnit || this.actor.targetBuilding) {
                // Switching to Combat
                // console.log(`[GoblinRaid] Found Building ${this.actor.targetBuilding.id || '?'}. Switching to Combat.`);
                this.actor.changeState(new GoblinCombatState(this.actor));
                return;
            }
        }

        // 2. Move Logic
        // Goblins have 'raidGoal'.
        if (this.actor.raidGoal) {
            // Expiration Check (Cleanup Stuck Raiders)
            if (this.actor.raidGoal.timestamp) {
                const now = time; // FIX: Use passed time instead of window.game
                // Expiry matches Clan Alert Expiry (60s)
                if (now - this.actor.raidGoal.timestamp > 60.0) {
                    this.actor.changeState(new GoblinWanderState(this.actor));
                    return;
                }
            }

            // --- CLAN ACTIVITY CHECK (NEW) ---
            const manager = window.game ? window.game.goblinManager : null;

            // Debug Logs
            if (manager && manager.clans) {
                const clan = manager.clans[this.actor.clanId];

                if (clan && !clan.active) {
                    this.actor.changeState(new GoblinRetreatState(this.actor));
                    return;
                }
            }

            const dist = this.actor.getDistance(this.actor.raidGoal.x, this.actor.raidGoal.z);
            if (dist < 5.0) {
                // Arrived at Raid Goal.
                // CHAIN ATTACK LOGIC: Don't just wander. Scan area immediately.
                if (this.actor.scanForTargets) {
                    const u = units || (window.game ? window.game.units : []);
                    const b = buildings || (window.game ? window.game.buildings : []);
                    this.actor.scanForTargets(u, b);

                    if (this.actor.targetUnit || this.actor.targetBuilding) {
                        this.actor.changeState(new GoblinCombatState(this.actor));
                        return;
                    }
                }

                // If no local target, try to find a NEW raid goal from Clan Memory
                // (e.g. adjacent building we didn't see?)
                if (window.game && window.game.goblinManager) {
                    const newTarget = window.game.goblinManager.getClanRaidTarget(this.actor.clanId);
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

                this.actor.changeState(new GoblinWanderState(this.actor));
                return;
            }

            // Move to Goal
            if (!this.actor.isMoving) {
                const moved = this.actor.smartMove(this.actor.raidGoal.x, this.actor.raidGoal.z, time);
                this.actor.lastTime = time;

                if (!moved) {
                    // Fallback to Wander if unreachable (BUT NOT if just throttled)
                    if (!this.actor.isPathfindingThrottled) {
                        this.actor.changeState(new GoblinWanderState(this.actor));
                    }
                }
            }
        } else {
            // No Raid Goal? Just wander.
            this.actor.changeState(new GoblinWanderState(this.actor));
        }
    }
}

export class GoblinRetreatState extends State {
    constructor(actor) {
        super(actor);
        this.cave = null;
    }

    enter() {
        this.actor.action = "Retreating";
        // Find nearest cave of same clan
        const manager = window.game ? window.game.goblinManager : null;
        if (manager && this.actor.clanId) {
            // Use simple clanId match. If multiple caves, find closest later?
            // For now, first found is fine.
            this.cave = manager.caves.find(c => c.clanId === this.actor.clanId);
        }
        this.actor.isMoving = false; // Trigger new path
    }

    update(time, deltaTime) {
        if (!this.cave) {
            this.actor.isDead = true; // Despawn if no home
            return;
        }

        const dist = this.actor.getDistance(this.cave.gridX, this.cave.gridZ);
        if (dist < 2.0) {
            this.actor.isDead = true; // Despawn upon reaching cave
            return;
        }

        if (!this.actor.isMoving) {
            const moved = this.actor.smartMove(this.cave.gridX, this.cave.gridZ, time);
            if (!moved && !this.actor.isPathfindingThrottled) {
                this.actor.isDead = true; // Despawn if truly stuck during retreat
            }
        }
    }
}

export class GoblinWanderState extends WanderState {
    constructor(actor) {
        super(actor);
        this.scanTimer = 0;
    }

    update(time, deltaTime, units, buildings) {
        // DEBUG: State Trace
        if (this.actor.id % 10 === 0 && Math.random() < 0.05) {
            console.log(`[GoblinState Debug] ID:${this.actor.id} State:Wander Update. Timer:${this.scanTimer.toFixed(2)} dt:${deltaTime.toFixed(4)} findTarget:${typeof this.actor.findTarget}`);
        }

        super.update(time, deltaTime); // Handle random movement

        this.scanTimer += deltaTime;

        // DYNAMIC INTERVAL: Scale with population to prevent O(N) overload
        const totalGoblins = (window.game && window.game.goblinManager && window.game.goblinManager.goblins) ? window.game.goblinManager.goblins.length : 0;
        let scanInterval = 0.5;
        if (totalGoblins > 7000) scanInterval = 5.0; // Extreme load
        else if (totalGoblins > 5000) scanInterval = 3.0;
        else if (totalGoblins > 2000) scanInterval = 1.5;
        else if (totalGoblins > 500) scanInterval = 1.0;

        if (this.scanTimer > scanInterval) {
            // SCAN BUDGET CHECK
            let canScan = true;
            if (window.game && window.game.goblinManager && window.game.goblinManager.scanBudget !== undefined) {
                if (window.game.goblinManager.scanBudget > 0) {
                    window.game.goblinManager.scanBudget--;
                } else {
                    canScan = false;
                    // Keep timer high, retry next frame (with randomness?)
                    // Add small random delay to prevent retry-stampede
                    this.scanTimer -= Math.random() * 0.2;
                }
            }

            if (canScan) {
                this.scanTimer = 0;
                // Add jitter to desynchronize
                this.scanTimer -= Math.random() * 0.5;

                if (this.actor.scanForTargets) {
                    // DEBUG: Pre-Call
                    if (this.actor.id % 10 === 0) console.log(`[GoblinState Debug] ID:${this.actor.id} Calling scanForTargets...`);

                    const u = units || (window.game ? window.game.units : []);
                    const b = buildings || (window.game ? window.game.buildings : []);
                    this.actor.scanForTargets(u, b);

                    if (this.actor.targetUnit || this.actor.targetBuilding) {
                        this.actor.changeState(new GoblinCombatState(this.actor));
                        return;
                    }
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
                    this.actor.changeState(new GoblinBuildState(this.actor, gx, gz));
                    return;
                }
            }
        }
    }
}
