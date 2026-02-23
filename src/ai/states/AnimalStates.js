import { State, WanderBase } from './State.js';

export class SheepWander extends WanderBase {
    constructor(actor) {
        super(actor);
    }

    update(time, deltaTime) {
        // Predator Check (Goblins, Wolves?)
        if (this.actor.checkForPredators) {
            const predator = this.actor.checkForPredators();
            if (predator) {
                this.actor.targetPredator = predator;
                this.actor.changeState(new SheepFlee(this.actor));
                return;
            }
        }

        super.update(time, deltaTime);
    }
}

export class SheepFlee extends State {
    constructor(actor) {
        super(actor);
        this.fleeTimer = 0;
        this.refreshTimer = 0;
    }

    enter() {
        this.actor.action = "Fleeing";
        if (this.actor.id === 0) console.log(`[Sheep] Fleeing from ${this.actor.targetPredator ? this.actor.targetPredator.type : 'Unknown'}`);
    }

    update(time, deltaTime) {
        this.fleeTimer += deltaTime;
        this.refreshTimer += deltaTime;

        const pred = this.actor.targetPredator;

        // 1. EXIT CONDITIONS
        // - Dead predator
        // - Too far away (Escaped!)
        // - Flee timer elapsed (5s)
        let shouldStop = false;

        if (!pred || pred.isDead) {
            shouldStop = true;
        } else {
            const distSq = this.actor.getDistance(pred.gridX, pred.gridZ);
            if (distSq > 10.0) {
                shouldStop = true; // Escaped the range!
            }
        }

        if (this.fleeTimer > 5.0) {
            shouldStop = true;
        }

        if (shouldStop) {
            this.actor.targetPredator = null;
            this.actor.changeState(new SheepWander(this.actor));
            return;
        }

        // 2. MOVEMENT (Throttled update to avoid jitter)
        if (this.refreshTimer > 0.6) {
            this.refreshTimer = 0;
            if (this.actor.fleeFrom) {
                this.actor.fleeFrom(pred, time);
            } else {
                this.actor.moveRandomly(time);
            }
        }
    }
}
