export class State {
    public actor: any;
    constructor(actor: any) {
        this.actor = actor;
    }

    enter(previousState?: State) {
        // console.log(`[${this.actor.type} ${this.actor.id}] Entering ${this.constructor.name}`);
    }

    update(...args: any[]) {
        // Override
    }

    exit(nextState?: State) {
        // Override
    }

    /**
     * Standardized Movement Helper
     * Moves actor towards target using smartMove. 
     * Returns TRUE if Arrived (dist <= range), FALSE if Moving.
     */
    approachTarget(tx: number, tz: number, range: number = 1.5, time: number = 0): boolean {
        const dist = this.actor.getDistance(tx, tz);
        if (dist <= range) {
            return true; // Arrived
        }

        // Not arrived, move closer
        if (this.actor.smartMove) {
            this.actor.smartMove(tx, tz, time);
        }
        return false;
    }
}

export class Idle extends State {
    public timer: number;
    public duration: number;
    constructor(actor: any) {
        super(actor);
        this.timer = 0;
        this.duration = 1.0 + Math.random() * 2.0;
    }

    enter(prev?: State) {
        this.timer = 0;
        this.duration = 1.0 + Math.random() * 2.0;
        this.actor.action = "Idle";
        this.actor.isMoving = false;
    }

    update(...args: any[]) {
        const [time, deltaTime, isNight, units = [], buildings = [], goblins = []] = args;
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

export class WanderBase extends State {
    public moveInterval: number;
    public lastTime: number;
    constructor(actor: any) {
        super(actor);
        this.moveInterval = 2.0 + Math.random() * 3.0;
        this.lastTime = 0;
    }

    enter(prev?: State) {
        if (!this.actor.isMoving) {
            this.actor.action = "Idle";
        } else {
            this.actor.action = "Moving";
        }

        // REMOVED: Do NOT force stop if no path. Linear movement (no path) must persist.
        // if (!this.actor.path || this.actor.path.length === 0) {
        //     this.actor.isMoving = false;
        // }
        // Initialize lastTime to 0. First update will sync it.
        this.lastTime = 0;
    }

    update(...args: any[]) {
        const [time, deltaTime] = args;
        // time is already in seconds (simTotalTimeSec)
        if (this.lastTime === 0) this.lastTime = time;

        if (!this.actor.isMoving && (time - this.lastTime > this.moveInterval)) {
            this.actor.moveRandomly(time);
            this.actor.action = "Moving";
            this.lastTime = time;
            this.moveInterval = 2.0 + Math.random() * 3.0;
        } else if (!this.actor.isMoving) {
            this.actor.action = "Idle";
        } else {
            // Ensure action is Moving if isMoving is true
            this.actor.action = "Moving";
        }
    }
}
