export class State {
    constructor(actor) {
        this.actor = actor;
    }

    enter(previousState) {
        // console.log(`[${this.actor.type} ${this.actor.id}] Entering ${this.constructor.name}`);
    }

    update(time, deltaTime) {
        // Override
    }

    exit(nextState) {
        // Override
    }
}

export class IdleState extends State {
    constructor(actor) {
        super(actor);
        this.timer = 0;
        this.duration = 1.0 + Math.random() * 2.0;
    }

    enter(prev) {
        this.timer = 0;
        this.duration = 1.0 + Math.random() * 2.0;
        this.actor.action = "Idle";
        this.actor.isMoving = false;
    }

    update(time, deltaTime) {
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

export class WanderState extends State {
    constructor(actor) {
        super(actor);
        this.moveInterval = 2.0 + Math.random() * 3.0;
        this.lastTime = 0;
    }

    enter(prev) {
        this.actor.action = "Wandering";
        // Only stop if no path exists (Fix for Resume Logic)
        if (!this.actor.path || this.actor.path.length === 0) {
            this.actor.isMoving = false;
        }
        // Initialize lastTime to 0. First update will sync it.
        this.lastTime = 0;
    }

    update(time, deltaTime) {
        // time is already in seconds (simTotalTimeSec)
        if (this.lastTime === 0) this.lastTime = time;

        if (!this.actor.isMoving && (time - this.lastTime > this.moveInterval)) {
            this.actor.moveRandomly(time);
            this.lastTime = time;
            this.moveInterval = 2.0 + Math.random() * 3.0;
        }
    }
}
