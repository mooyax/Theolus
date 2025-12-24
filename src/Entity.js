import * as THREE from 'three';

export class Entity {
    static nextId = 0;

    constructor(scene, terrain, x, z, type) {
        this.id = Entity.nextId++; // Shared ID counter? Or separate? 
        // UnitMain had its own, Goblin had its own. 
        // If we mix them, ID collisions might happen if Game.js assumes Unit IDs start at 0.
        // Let's keep separate static counters in subclasses if needed, OR force unique IDs globally.
        // For safety, let's use the ID passed or let subclass handle ID generation.
        // Actually, let's let subclass set ID. 
        // But we DO need ID for logs.

        this.scene = scene;
        this.terrain = terrain;
        this.gridX = x;
        this.gridZ = z;
        this.type = type || 'entity';

        this.position = new THREE.Vector3();
        this.rotationY = 0;

        // Movement State
        this.isMoving = false;
        this.moveTimer = 0;
        this.moveDuration = 1000;
        this.moveStartTime = 0;
        this.startGridX = 0;
        this.startGridZ = 0;
        this.targetGridX = 0;
        this.targetGridZ = 0;

        // Visual State
        this.walkAnimTimer = 0; // Shared anim timer?

        // Register in Spatial Grid
        if (this.terrain && this.terrain.registerEntity) {
            this.terrain.registerEntity(this, this.gridX, this.gridZ, this.type);
        }

        // Initial visual sync
        this.updatePosition();
    }

    // --- POSITIONING ---

    updatePosition() {
        if (isNaN(this.gridX) || isNaN(this.gridZ)) return;

        const pos = this.getPositionForGrid(this.gridX, this.gridZ);
        this.position.copy(pos);
    }

    getPositionForGrid(x, z) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Center check
        const rawX = x - logicalW / 2 + 0.5;
        const rawZ = z - logicalD / 2 + 0.5;

        // Apply Terrain Distortion (Visual)
        // Plane Coordinates: x = rawX, y = -rawZ
        const planeX = rawX;
        const planeY = -rawZ;

        let offsets = { x: 0, y: 0 };
        if (this.terrain && this.terrain.getVisualOffset) {
            offsets = this.terrain.getVisualOffset(planeX, planeY);
        }

        // KEY FIX: Use Interpolated Height for smooth visual snap
        let height = 0;
        if (this.terrain && this.terrain.getInterpolatedHeight) {
            height = this.terrain.getInterpolatedHeight(x, z);
        } else if (this.terrain && this.terrain.getTileHeight) {
            height = this.terrain.getTileHeight(x, z);
        }

        return new THREE.Vector3(
            rawX + offsets.x,
            height,
            rawZ - offsets.y
        );
    }

    getDistance(tx, tz) {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let dx = Math.abs(this.gridX - tx);
        let dz = Math.abs(this.gridZ - tz);

        if (dx > logicalW / 2) dx = logicalW - dx;
        if (dz > logicalD / 2) dz = logicalD - dz;

        return Math.sqrt(dx * dx + dz * dz);
    }

    // --- MOVEMENT ENGINE ---

    startMove(tx, tz, time) {
        // Validation handled by caller usually, but we can do basic checks here
        // SMART MOVEMENT START
        // If already moving, start from CURRENT interpolated position to prevent "Teleport Back" glitch.
        if (this.isMoving) {
            const progress = (time - this.moveStartTime) / this.moveDuration;
            const clampedProg = Math.max(0, Math.min(1, progress));

            // Calculate current visual position logic
            // Note: Use simple Lerp here consistent with updateMovement
            // Wrap logic is complex, but for short distances standard Lerp is approx correct.
            // If wrapping was active, this might be slightly off, but better than snapping to tile center.
            let sx = this.startGridX;
            let sz = this.startGridZ;
            let oldTx = this.targetGridX;
            let oldTz = this.targetGridZ;

            // Wrap adjustment (matches updateMovement)
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;
            if (oldTx - sx > logicalW / 2) sx += logicalW;
            if (sx - oldTx > logicalW / 2) sx -= logicalW;
            if (oldTz - sz > logicalD / 2) sz += logicalD;
            if (sz - oldTz > logicalD / 2) sz -= logicalD;

            this.startGridX = sx + (oldTx - sx) * clampedProg;
            this.startGridZ = sz + (oldTz - sz) * clampedProg;

            // Re-normalize if we wrapped out of bounds (keep coords sane)
            // (Optional, but good for data hygiene)
            this.startGridX = ((this.startGridX % logicalW) + logicalW) % logicalW;
            this.startGridZ = ((this.startGridZ % logicalD) + logicalD) % logicalD;

        } else {
            this.startGridX = this.gridX;
            this.startGridZ = this.gridZ;
        }

        this.isMoving = true;
        this.moveStartTime = time;
        this.targetGridX = tx;
        this.targetGridZ = tz;

        // Rotation
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let dx = tx - this.gridX;
        let dz = tz - this.gridZ;

        // Wrap Logic for Rotation
        if (Math.abs(dx) > logicalW / 2) dx -= Math.sign(dx) * logicalW;
        if (Math.abs(dz) > logicalD / 2) dz -= Math.sign(dz) * logicalD;

        this.rotationY = Math.atan2(dx, dz);
    }

    updateMovement(time) {
        if (!this.isMoving) return;



        const progress = (time - this.moveStartTime) / this.moveDuration;

        if (progress >= 1) {
            // ARRIVAL
            this.isMoving = false;

            // Spatial Update
            if (this.terrain && this.terrain.moveEntity) {
                this.terrain.moveEntity(this, this.gridX, this.gridZ, this.targetGridX, this.targetGridZ, this.type);
            }

            this.gridX = this.targetGridX;
            this.gridZ = this.targetGridZ;

            // Final Snap (Visual)
            this.updatePosition();

            // Subclass hook
            if (this.onMoveFinished) {
                this.onMoveFinished(time);
            }
        } else {
            // LERP
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            let sx = this.startGridX;
            let sz = this.startGridZ;
            let tx = this.targetGridX;
            let tz = this.targetGridZ;

            // Wrap support for Lerp
            if (tx - sx > logicalW / 2) sx += logicalW;
            if (sx - tx > logicalW / 2) sx -= logicalW;
            if (tz - sz > logicalD / 2) sz += logicalD;
            if (sz - tz > logicalD / 2) sz -= logicalD;

            const cx = sx + (tx - sx) * progress;
            const cz = sz + (tz - sz) * progress;

            // Visual Update
            const pos = this.getPositionForGrid(cx, cz);
            this.position.copy(pos);

            // Subclass hook (Animation)
            if (this.onMoveStep) {
                this.onMoveStep(progress);
            }
        }
    }

    // --- LIFECYCLE ---

    die() {
        this.isDead = true;
        if (this.terrain && this.terrain.unregisterEntity) {
            this.terrain.unregisterEntity(this);
        }
    }
}
