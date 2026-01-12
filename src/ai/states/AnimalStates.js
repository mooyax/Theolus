import { State, WanderState } from './State.js';

export class SheepWanderState extends WanderState {
    constructor(actor) {
        super(actor);
    }

    update(time, deltaTime) {
        // Predator Check (Goblins, Wolves?)
        if (this.actor.checkForPredators) {
            const predator = this.actor.checkForPredators();
            if (predator) {
                this.actor.targetPredator = predator;
                this.actor.changeState(new SheepFleeState(this.actor));
                return;
            }
        }

        super.update(time, deltaTime);
    }
}

export class SheepFleeState extends State {
    constructor(actor) {
        super(actor);
        this.fleeTimer = 0;
    }

    enter() {
        this.actor.action = "Fleeing";
        if (this.actor.id === 0) console.log(`[Sheep] Fleeing from ${this.actor.targetPredator ? this.actor.targetPredator.type : 'Unknown'}`);
    }

    update(time, deltaTime) {
        this.fleeTimer += deltaTime;
        if (this.fleeTimer > 5.0) {
            // Calm down
            this.actor.targetPredator = null;
            this.actor.changeState(new SheepWanderState(this.actor));
            return;
        }

        if (this.actor.targetPredator) {
            // Run away!
            // Naive flee: Move away from predator
            const pred = this.actor.targetPredator;
            const dx = this.actor.gridX - pred.gridX;
            const dz = this.actor.gridZ - pred.gridZ;

            // Normalize and step
            // Just verify we move AWAY.
            // If too close, panic run.

            // TODO: Implement flee movement logic in Sheep.js or here?
            // Calling actor.fleeFrom(predator) is best.
            if (this.actor.fleeFrom) {
                this.actor.fleeFrom(pred, time);
            } else {
                // Fallback: Just wander randomly (panic)
                this.actor.moveRandomly(time);
            }
        } else {
            this.actor.changeState(new SheepWanderState(this.actor));
        }
    }
}
