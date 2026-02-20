import * as THREE from 'three';

// Temporary interface for Terrain until migrated
interface TerrainMock {
    logicalWidth: number;
    logicalDepth: number;
    registerEntity?: (e: Entity, x: number, z: number, type: string) => void;
    unregisterEntity?: (e: Entity) => void;
    moveEntity?: (e: Entity, ox: number, oz: number, nx: number, nz: number, type: string) => void;
    getVisualOffset?: (x: number, z: number) => { x: number, y: number };
    getInterpolatedHeight?: (x: number, z: number) => number;
    getTileHeight?: (x: number, z: number) => number;
}

export class Entity {
    static nextId: number = 0;

    public id: number;
    public scene: THREE.Scene;
    public terrain: any; // Keeping any for now to avoid strict conflict with JS Terrain
    public game: any;
    public frameCount: number;
    public gridX: number;
    public gridZ: number;
    public type: string;
    public spatialType: string;

    public position: THREE.Vector3;
    public rotationY: number;
    public userData: any = {}; // Shared storage for metadata

    public isMoving: boolean = false;
    public moveTimer: number;
    public moveDuration: number;
    public moveStartTime: number;
    public startGridX: number;
    public startGridZ: number;
    public targetGridX: number;
    public targetGridZ: number;

    // Visual State
    public walkAnimTimer: number;

    // Optional / Dynamic properties
    protected _isDead: boolean = false;
    get isDead(): boolean { return this._isDead; }
    set isDead(val: boolean) { this._isDead = val; }
    public age?: number;
    public limbs?: any; // Used by subclasses
    // Virtual Methods
    onMoveStep(progress: number): void { }
    onMoveFinished(time: number): void { }

    constructor(scene: THREE.Scene, terrain: any, x: number, z: number, type?: string) {
        this.id = Entity.nextId++;
        console.log(`[Entity ${this.id}] CONSTRUCTOR START: type=${type} at ${x},${z}`);
        this.scene = scene;
        this.terrain = terrain;

        // Polyfill (window as any).game access safely
        const w = (typeof window !== 'undefined') ? window as any : (typeof global !== 'undefined' ? (global as any).window : null);
        this.game = w?.game || null;

        this.frameCount = 0;
        this.gridX = x;
        this.gridZ = z;
        this.type = type || 'entity';
        // NEW: Separate spatial indexing type from logical entity type
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
        this.walkAnimTimer = 0;

        // Register in Spatial Grid
        if (this.terrain && this.terrain.registerEntity) {
            console.log(`[Entity ${this.id}] Calling registerEntity...`);
            this.terrain.registerEntity(this, this.gridX, this.gridZ, this.spatialType);
            console.log(`[Entity ${this.id}] registerEntity returned.`);
        }

        // Initial visual sync
        console.log(`[Entity ${this.id}] Calling updatePosition...`);
        this.updatePosition();
        console.log(`[Entity ${this.id}] updatePosition returned.`);
    }

    // --- POSITIONING ---

    updatePosition() {
        if (isNaN(this.gridX) || isNaN(this.gridZ)) return;
        if (!this.position) return;
        this.getPositionForGrid(this.gridX, this.gridZ, this.position);
    }

    // OPTIMIZED: Use target vector to avoid garbage collection
    getPositionForGrid(x: number, z: number, target: THREE.Vector3 | null = null): THREE.Vector3 {
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;

        // Center check
        const rawX = x - logicalW / 2 + 0.5;
        const rawZ = z - logicalD / 2 + 0.5;

        // Apply Terrain Distortion (Visual)
        // Plane Coordinates: x = rawX, y = -rawZ (Match Terrain Logic: Plane Y is World -Z)
        const planeX = rawX;
        const planeY = -rawZ;

        let ox = 0, oy = 0;
        if (this.terrain && this.terrain.getVisualOffset) {
            const offsets = this.terrain.getVisualOffset(planeX, planeY);
            if (offsets) {
                ox = offsets.x;
                oy = offsets.y;
            }
        }

        // KEY FIX: Use Interpolated Height for smooth visual snap, at the VISUAL position
        // ox, oy are periodic distortions. Match Terrain.ts getVisualPosition: visualZ = rawZ - oy
        let height = 0;
        if (this.terrain && this.terrain.getVisualHeight) {
            // Use the CORRECT visual coordinates for lookup
            height = this.terrain.getVisualHeight(rawX + ox, rawZ - oy);
        } else if (this.terrain && this.terrain.getInterpolatedHeight) {
            height = this.terrain.getInterpolatedHeight(rawX, rawZ);
        } else if (this.terrain && this.terrain.getTileHeight) {
            height = this.terrain.getTileHeight(this.gridX, this.gridZ);
        }

        if (target) {
            target.set(rawX + ox, height, rawZ - oy);
            return target;
        }
        return new THREE.Vector3(rawX + ox, height, rawZ - oy);
    }

    getDistance(tx: number, tz: number, ox: number | null = null, oz: number | null = null): number {
        const sx = (ox !== null) ? ox : this.gridX;
        const sz = (oz !== null) ? oz : this.gridZ;

        if (ox !== null && Math.abs(sx - tx) < 0.001 && Math.abs(sz - tz) < 0.001) {
            // console.log("Short circuit 0");
        }
        const logicalW = (this.terrain && this.terrain.logicalWidth) || 240;
        const logicalD = (this.terrain && this.terrain.logicalDepth) || 240;

        let dx = Math.abs(sx - tx);
        let dz = Math.abs(sz - tz);

        if (dx > logicalW / 2) dx = logicalW - dx;
        if (dz > logicalD / 2) dz = logicalD - dz;

        return Math.sqrt(dx * dx + dz * dz);
    }

    // --- MOVEMENT ENGINE ---

    getVisualX(time: number): number {
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

    getVisualZ(time: number): number {
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

    startMove(tx: number, tz: number, time: number) {
        // Validation handled by caller usually, but we can do basic checks here
        // SMART MOVEMENT START
        // If already moving, start from CURRENT interpolated position to prevent "Teleport Back" glitch.
        if (this.isMoving) {
            const progress = (time - this.moveStartTime) / this.moveDuration;
            const clampedProg = Math.max(0, Math.min(1, progress));

            // Calculate current visual position logic
            // Note: Use simple Lerp here consistent with updateMovement
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

        console.log(`[Entity ${this.id}] startMove -> isMoving:true. Target:${tx},${tz} StartTime:${time.toFixed(4)}`);

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

    updateMovement(time: number) {
        if (!this.isMoving) return;

        let progress = (time - this.moveStartTime) / this.moveDuration;
        if (isNaN(progress)) progress = 0;


        if (progress >= 1) {
            // ARRIVAL
            this.isMoving = false;
            console.log(`[Entity ${this.id}] updateMovement ARRIVAL -> isMoving:false. Time:${time.toFixed(4)} StartTime:${this.moveStartTime.toFixed(4)} Dur:${this.moveDuration.toFixed(4)} PrevGrid:${this.gridX},${this.gridZ} Target:${this.targetGridX},${this.targetGridZ}`);

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
    update(time: number, deltaTime: number) {
        // Override me
    }

    die(reason?: string) {
        this.isDead = true;
        if (this.terrain && this.terrain.unregisterEntity) {
            this.terrain.unregisterEntity(this);
        }
    }

    dispose() {
        this.isDead = true;
        if (this.terrain && this.terrain.unregisterEntity) {
            this.terrain.unregisterEntity(this);
        }
    }

    // --- SHARED TOOLTIP LOGIC ---
    getTooltip(): string {
        let text = `ID: ${this.id}`;

        if (this.age !== undefined) {
            text += `\nAge: ${Math.floor(this.age)}`;
        }
        return text;
    }
}
