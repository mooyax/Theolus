import { Entity } from './Entity.js';

export class Actor extends Entity {
    constructor(scene, terrain, x, z, type) {
        super(scene, terrain, x, z, type);

        // AI State
        this.path = null;
        this.pathIndex = 0;
        this.stuckCount = 0;
        this.pathFailCount = 0;
        this.lastPathTime = 0;

        // Stagnation
        this.minDistToTarget = Infinity;
        this.pathStagnation = 0;
    }

    // Shared Reachability Check (The "Region Map" Logic)
    isReachable(tx, tz) {
        if (!this.terrain || !this.terrain.grid) return true; // Fallback

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Wrap Logic for Check
        let checkX = Math.round(tx);
        let checkZ = Math.round(tz);

        // Check Wrapping for safe array access
        if (checkX < 0) checkX = (checkX % logicalW + logicalW) % logicalW;
        else if (checkX >= logicalW) checkX = checkX % logicalW;

        if (checkZ < 0) checkZ = (checkZ % logicalD + logicalD) % logicalD;
        else if (checkZ >= logicalD) checkZ = checkZ % logicalD;

        // Get Cells
        const mCell = this.terrain.grid[this.gridX] ? this.terrain.grid[this.gridX][this.gridZ] : null;
        const tCell = this.terrain.grid[checkX] ? this.terrain.grid[checkX][checkZ] : null;

        if (mCell && tCell) {
            const mRegion = mCell.regionId;
            const tRegion = tCell.regionId;

            // 0 = Water, >0 = Land
            // Rule 1: Water Blindness (Water cannot go to Land directly? or just restricted?)
            // Assuming Units/Goblins walk on Land (Region > 0).
            // If I am on Land, I cannot reach different Land Region.
            if (mRegion > 0 && tRegion > 0 && mRegion !== tRegion) {
                // EXCEPTION: If the target is VERY close (Visual Range / Glitch), allow it.
                // This prevents units getting stuck on region boundaries (bridges/ramps)
                const dx = tx - this.gridX;
                const dz = tz - this.gridZ; // Note: using grid coords
                const distSq = dx * dx + dz * dz;
                if (distSq < 25.0) { // Sqrt(25) = 5.0 tiles.
                    // console.log("Allowing Cross-Region Move (Close Range)");
                    return true;
                }
                return false;
            }

            // If I am in Water (0), I can't reach Land? (Maybe swimming?)
            // For now, strict check to prevent shore loop:
            if (mRegion === 0 && tRegion > 0) return false;
        }
        return true;
    }

    // Unified Move Logic (The "Smart Move")
    // Tries to follow path -> Tries to pathfind -> Fallback to Linear
    // Returns: true if move execution started (or path processing), false if blocked/failed
    smartMove(tx, tz, time) {
        // 1. Path Following
        if (this.path && this.path.length > 0) {
            // We have a path.
            // Check if we reached the next node?
            // Usually we move towards path[0].
            // But we need to verify if path[0] is still valid?

            // In Unit.js `triggerMove`, it consumes path[0] IF it executes move.
            // In Goblin.js, it tracks `pathIndex`.

            // Let's use the 'consume' approach: path[0] is IMMEDIATE target.
            const node = this.path[0];

            // Execute
            if (this.canMoveTo(node.x, node.z)) {
                this.executeMove(node.x, node.z, time);
                this.path.shift(); // Consumed
                if (this.path.length === 0) this.path = null;
                return true;
            } else {
                // Blocked. Dynamic obstacle?
                // console.log("Path Blocked");
                this.path = null; // Recalculate
            }
        }

        // 2. Pathfinding Calculation (if no path)
        if (!this.path) {
            const dist = this.getDistance(tx, tz);
            // Threshold for A* (Don't A* for short dists unless blocked?)
            // Unit.js uses A* for dist > 15 (or when stuck). Actor should be smart.
            if (dist > 15.0) {
                // Attempt Pathfinding
                // Add random jitter to throttle to prevent synchronized "wake up" of all units
                const throttle = 1000 + (this.id % 20) * 100; // Spread over 1-3s based on ID

                if (time - this.lastPathTime > throttle) {

                    // PRE-CHECK BUDGET: Don't consume throttle if we can't search
                    if (this.terrain.pathfindingCalls > 10) {
                        return true; // Wait for next frame, keep priority
                    }

                    this.lastPathTime = time;

                    // Check Reachability First!
                    if (!this.isReachable(tx, tz)) {
                        return false; // Failure (Unreachable Region)
                    }

                    // Wrapper for findPath that handles wrapping? 
                    // Usually Terrain.findPath handles coords?
                    // Let's assume passed coords are correct.
                    const newPath = this.terrain.findPath(this.gridX, this.gridZ, tx, tz);
                    if (newPath && newPath.length > 0) {
                        this.path = newPath;
                        // Skip move this frame, wait for next frame to consume path
                        return true; // "Processed"
                    } else {
                        // PATHFINDING FAILED (Complexity or Impossible)
                        // Do NOT pretend to wait. Fall through to Linear Move logic.
                        // If Linear Move also fails, we return false, triggering "Stuck" logic in Unit.js.
                        console.warn(`[Actor ${this.id}] Pathfinding Failed. Falling back to Linear.`);
                    }
                } else {
                    // Throttled. Wait.
                    return true;
                }
            }
        }

        // 3. Linear Fallback (If Pathfinding failed or close enough)
        // Check Reachability First!
        if (!this.isReachable(tx, tz)) {
            return false;
        }

        // Linear Move Logic with Wrap
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let dx = tx - this.gridX;
        let dz = tz - this.gridZ;

        // Wrap shortest path
        if (Math.abs(dx) > logicalW / 2) dx -= Math.sign(dx) * logicalW;
        if (Math.abs(dz) > logicalD / 2) dz -= Math.sign(dz) * logicalD;

        // Primary Axis
        let nextX = this.gridX;
        let nextZ = this.gridZ;

        if (Math.abs(dx) > Math.abs(dz)) nextX += Math.sign(dx);
        else nextZ += Math.sign(dz);

        // Wrap Next Check
        if (nextX < 0) nextX = logicalW - 1;
        if (nextX >= logicalW) nextX = 0;
        if (nextZ < 0) nextZ = logicalD - 1;
        if (nextZ >= logicalD) nextZ = 0;

        if (this.canMoveTo(nextX, nextZ)) {
            this.executeMove(nextX, nextZ, time);
            return true;
        } else {
            // FALLBACK: Try Secondary Axis (Slide along obstacle)
            // Try moving along the other axis only
            let altX = this.gridX;
            let altZ = this.gridZ;

            if (Math.abs(dx) > Math.abs(dz)) {
                // Primary was X. Try Z.
                if (dz !== 0) altZ += Math.sign(dz);
            } else {
                // Primary was Z. Try X.
                if (dx !== 0) altX += Math.sign(dx);
            }

            // Wrap Alt
            if (altX < 0) altX = logicalW - 1;
            else if (altX >= logicalW) altX = 0;
            if (altZ < 0) altZ = logicalD - 1;
            else if (altZ >= logicalD) altZ = 0;

            if (this.canMoveTo(altX, altZ)) {
                this.executeMove(altX, altZ, time);
                return true;
            }
        }

        // FALLBACK 2: Force Pathfinding (Linear Blocked by Terrain/Water)
        // If we failed linear move, and we don't have a path, and throttle allows...
        // We should try A* even for short distances if we are stuck.
        const dist = this.getDistance(tx, tz);
        if (!this.path && dist <= 15.0) {
            const throttle = 1000 + (this.id % 20) * 100;
            if (time - this.lastPathTime > throttle) {
                // Check Budget
                if (this.terrain.pathfindingCalls > 10) return false;

                this.lastPathTime = time;

                // Check Reachability (Again, just in case)
                if (!this.isReachable(tx, tz)) return false;

                const newPath = this.terrain.findPath(this.gridX, this.gridZ, tx, tz);
                if (newPath && newPath.length > 0) {
                    console.log(`[Actor ${this.id}] Linear Failed. A* Found Path (Len:${newPath.length})`);
                    this.path = newPath;
                    return true; // "Processed" (will move next frame)
                }
            }
        }

        return false; // Blocked
    }

    // Basic Validation (Can override)
    canMoveTo(x, z) {
        // Height / Building check
        const h = this.terrain.getTileHeight(x, z);
        if (h <= 0) return false;

        const curH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (Math.abs(h - curH) > 2.0) return false;

        // Building Check: Optional?
        // Unit.js REMOVED hasBuilding check to allow pathing through own buildings (roads).
        // Goblin.js keeps it (block entering buildings).
        // Base Actor will be permissive (allow), subclasses can restrict.
        // Actually, preventing walking INTO a building is good visual.
        // But pathfinding nodes might be ON a building?
        // Let's return true by default regarding buildings, only check terrain.

        return true;
    }

    executeMove(x, z, time) {
        // Wrapper for Entity startMove
        super.startMove(x, z, time);

        // DISTANCE SCALING FIX (Same as Unit.js)
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // FIX: Calculate from current VISUAL position if already moving
        let startX = this.gridX;
        let startZ = this.gridZ;

        if (this.isMoving) {
            const progress = (time - this.moveStartTime) / this.moveDuration;
            const p = Math.max(0, Math.min(1, progress));

            let sx = this.startGridX;
            let sz = this.startGridZ;
            let tx = this.targetGridX;
            let tz = this.targetGridZ;

            if (tx - sx > logicalW / 2) sx += logicalW;
            if (sx - tx > logicalW / 2) sx -= logicalW;
            if (tz - sz > logicalD / 2) sz += logicalD;
            if (sz - tz > logicalD / 2) sz -= logicalD;

            startX = sx + (tx - sx) * p;
            startZ = sz + (tz - sz) * p;
        }

        let dx = Math.abs(x - startX);
        let dz = Math.abs(z - startZ);
        if (dx > logicalW / 2) dx = logicalW - dx; // Wrap logic
        if (dz > logicalD / 2) dz = logicalD - dz;
        const dist2D = Math.sqrt(dx * dx + dz * dz);

        // Calculate Height Penalty
        const currentHeight = this.terrain.getTileHeight(this.gridX, this.gridZ);
        const targetHeight = this.terrain.getTileHeight(x, z);
        const heightDiff = Math.abs(targetHeight - currentHeight);

        let base = 600;
        if (targetHeight > 8) base += 2000;

        // Apply
        this.moveDuration = (base * Math.max(1.0, dist2D)) + (heightDiff * 1000);

        // Reset counters?
        this.stuckCount = 0;
    }
}
