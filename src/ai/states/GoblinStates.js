import { State, WanderState } from './State.js';

export class GoblinRaidState extends State {
    constructor(actor) {
        super(actor);
        this.scanTimer = 0;
    }

    enter() {
        if (this.actor.id % 20 === 0) console.log(`[Goblin ${this.actor.id}] ENTER RaidState. Goal: ${this.actor.raidGoal?.x},${this.actor.raidGoal?.z}`);
        this.actor.action = "Raiding";
        this.actor.isMoving = false; // Trigger pathfinding
    }

    update(time, deltaTime, units, buildings) {
        // 1. Scan for Targets (Units/Buildings)
        this.scanTimer += deltaTime;
        if (this.scanTimer > 1.0) { // Scan every 1 second
            this.scanTimer = 0;
            // Use Goblin's internal findTarget logic (refactored or legacy wrapper)
            if (this.actor.findTarget) {
                // Fallback to window.game if args missing (safety)
                const u = units || (window.game ? window.game.units : []);
                const b = buildings || (window.game ? window.game.buildings : []);
                this.actor.findTarget(u, b);

                // findTarget sets targets internally? Or returns them?
                // Legacy Goblin.js findTarget sets this.targetUnit / this.targetBuilding
                // So checking them afterwards:
            }

            if (this.actor.targetUnit || this.actor.targetBuilding) {
                // Switching to Combat
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
            if (manager && manager.clans && this.actor.clanId) {
                const clan = manager.clans[this.actor.clanId];
                if (clan && !clan.active) {
                    this.actor.changeState(new GoblinRetreatState(this.actor));
                    return;
                }
            }

            const dist = this.actor.getDistance(this.actor.raidGoal.x, this.actor.raidGoal.z);
            if (dist < 5.0) {
                // Arrived at Raid Goal.
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

export class GoblinWanderState extends WanderState {
    constructor(actor) {
        super(actor);
        this.scanTimer = 0;
    }

    update(time, deltaTime, units, buildings) {
        super.update(time, deltaTime); // Handle random movement

        this.scanTimer += deltaTime;
        if (this.scanTimer > 1.0) { // Scan every 1s
            this.scanTimer = 0;
            if (this.actor.findTarget) {
                const u = units || (window.game ? window.game.units : []);
                const b = buildings || (window.game ? window.game.buildings : []);
                this.actor.findTarget(u, b);

                if (this.actor.targetUnit || this.actor.targetBuilding) {
                    this.actor.changeState(new GoblinCombatState(this.actor));
                    return;
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

// Revert to cleanup
export class GoblinCombatState extends State {
    constructor(actor) {
        super(actor);
        this.stagnationTimer = 0;
    }
    enter() {
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
            const terrain = this.actor.terrain || (window.game ? window.game.terrain : null);
            if (terrain && terrain.buildings && !terrain.buildings.includes(this.actor.targetBuilding)) {
                console.log(`[GoblinCombatState] Target Building at ${this.actor.targetBuilding.gridX},${this.actor.targetBuilding.gridZ} vanished from Terrain.`);
                this.actor.targetBuilding = null;
                this.actor.changeState(new GoblinRaidState(this.actor));
                return;
            }
        }

        // Stagnation Detection
        this.stagnationTimer += deltaTime;
        if (this.stagnationTimer > 15.0) {
            this.actor.targetUnit = null;
            this.actor.targetBuilding = null;
            this.actor.changeState(new GoblinRaidState(this.actor));
            return;
        }

        // Use logic from Goblin.js
        if (this.actor.executeCombatLogic) {
            const dist = this.actor.targetUnit ?
                this.actor.getDistance(this.actor.targetUnit.gridX, this.actor.targetUnit.gridZ) :
                (this.actor.getDistanceToBuilding ? this.actor.getDistanceToBuilding(this.actor.targetBuilding) : 999);

            if (dist < 3.0) {
                this.stagnationTimer = 0; // Reset while in range
            }

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
