import * as THREE from 'three';

export class Entity {
    static nextId = 0;

    constructor(scene, terrain, x, z, type) {
        this.id = Entity.nextId++;
        this.scene = scene;
        this.terrain = terrain;
        this.game = (typeof window !== 'undefined') ? window.game : (typeof global !== 'undefined' ? global.window?.game : null);
        this.frameCount = 0;
        this.gridX = x;
        this.gridZ = z;
        this.type = type || 'entity';
        // NEW: Separate spatial indexing type from logical entity type
        // This allows 'hobgoblin' to be indexed as 'goblin' if passed to super() constructor
        this.spatialType = type || 'entity';

        this.position = new THREE.Vector3();
        this.rotationY = 0;

        // Movement State
        this.isMoving = false;
        this.moveTimer = 0;
        this.moveDuration = 1.0;
        this.moveStartTime = 0;
        this.startGridX = 0;
        this.startGridZ = 0;
        this.targetGridX = 0;
        this.targetGridZ = 0;

        // Visual State
        this.walkAnimTimer = 0; // Shared anim timer?

        // Register in Spatial Grid
        if (this.terrain && this.terrain.registerEntity) {
            this.terrain.registerEntity(this, this.gridX, this.gridZ, this.spatialType);
        }

        // Initial visual sync
        this.updatePosition();
    }

    // --- POSITIONING ---

    updatePosition() {
        if (isNaN(this.gridX) || isNaN(this.gridZ)) return;
        this.getPositionForGrid(this.gridX, this.gridZ, this.position);
    }

    // OPTIMIZED: Use target vector to avoid garbage collection
    getPositionForGrid(x, z, target = null) {
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;

        // Center check
        const rawX = x - logicalW / 2 + 0.5;
        const rawZ = z - logicalD / 2 + 0.5;

        // Apply Terrain Distortion (Visual)
        // Plane Coordinates: x = rawX, y = -rawZ
        const planeX = rawX;
        const planeY = -rawZ;

        let ox = 0, oy = 0;
        if (this.terrain && this.terrain.getVisualOffset) {
            const offsets = this.terrain.getVisualOffset(planeX, planeY);
            ox = offsets.x;
            oy = offsets.y;
        }

        // KEY FIX: Use Interpolated Height for smooth visual snap
        let height = 0;
        if (this.terrain && this.terrain.getInterpolatedHeight) {
            height = this.terrain.getInterpolatedHeight(x, z);
        } else if (this.terrain && this.terrain.getTileHeight) {
            height = this.terrain.getTileHeight(x, z);
        }

        if (target) {
            target.set(rawX + ox, height, rawZ - oy);
            return target;
        }
        return new THREE.Vector3(rawX + ox, height, rawZ - oy);
    }

    getDistance(tx, tz, ox = null, oz = null) {
        const sx = (ox !== null) ? ox : this.gridX;
        const sz = (oz !== null) ? oz : this.gridZ;
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;

        let dx = Math.abs(sx - tx);
        let dz = Math.abs(sz - tz);

        if (dx > logicalW / 2) dx = logicalW - dx;
        if (dz > logicalD / 2) dz = logicalD - dz;

        return Math.sqrt(dx * dx + dz * dz);
    }

    // --- MOVEMENT ENGINE ---

    getVisualX(time) {
        if (!this.isMoving) return this.gridX;
        const progress = Math.max(0, Math.min(1, (time - this.moveStartTime) / this.moveDuration));
        // Simple Lerp (Wrap aware)
        let sx = this.startGridX;
        let tx = this.targetGridX;
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
        if (tx - sx > logicalW / 2) sx += logicalW;
        if (sx - tx > logicalW / 2) sx -= logicalW;
        let x = sx + (tx - sx) * progress;
        return ((x % logicalW) + logicalW) % logicalW;
    }

    getVisualZ(time) {
        if (!this.isMoving) return this.gridZ;
        const progress = Math.max(0, Math.min(1, (time - this.moveStartTime) / this.moveDuration));
        // Simple Lerp (Wrap aware)
        let sz = this.startGridZ;
        let tz = this.targetGridZ;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;
        if (tz - sz > logicalD / 2) sz += logicalD;
        if (sz - tz > logicalD / 2) sz -= logicalD;
        let z = sz + (tz - sz) * progress;
        return ((z % logicalD) + logicalD) % logicalD;
    }

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
            const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
            const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;
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

        // Immediate Animation Sync
        if (this.onMoveStep) this.onMoveStep(0);

        // Rotation
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;

        let dx = tx - this.gridX;
        let dz = tz - this.gridZ;

        // Wrap Logic for Rotation
        if (Math.abs(dx) > logicalW / 2) dx -= Math.sign(dx) * logicalW;
        if (Math.abs(dz) > logicalD / 2) dz -= Math.sign(dz) * logicalD;

        this.rotationY = Math.atan2(dx, dz);
    }

    updateMovement(time) {
        if (!this.isMoving) return;



        let progress = (time - this.moveStartTime) / this.moveDuration;
        if (isNaN(progress)) progress = 0;

        if (progress >= 1) {
            // ARRIVAL
            this.isMoving = false;

            // Spatial Update
            if (this.terrain && this.terrain.moveEntity) {
                this.terrain.moveEntity(this, this.gridX, this.gridZ, this.targetGridX, this.targetGridZ, this.spatialType);
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
            const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
            const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;

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
            this.getPositionForGrid(cx, cz, this.position);

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

    // --- SHARED TOOLTIP LOGIC ---
    getTooltip() {
        let text = `ID: ${this.id}`;

        if (this.age !== undefined) {
            text += `\nAge: ${Math.floor(this.age)}`;
        }
        return text;
    }
}
