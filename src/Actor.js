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

        // State Machine
        this.state = null;
        this.simTime = 0; // Track simulation time

        // Job Management
        this.ignoredTargets = new Map(); // ID -> ExpiryTime
    }

    changeState(newState) {
        if (this.state && typeof this.state.exit === 'function') {
            this.state.exit(newState);
        }
        const prev = this.state;
        this.state = newState;
        if (this.state && typeof this.state.enter === 'function') {
            this.state.enter(prev);
        }
    }

    // Shared Reachability Check (The "Region Map" Logic)
    isReachable(tx, tz) {
        if (!this.terrain || !this.terrain.grid) return true; // Fallback

        const logicalW = (this.terrain && this.terrain.logicalWidth) ? this.terrain.logicalWidth : 160;
        const logicalD = (this.terrain && this.terrain.logicalDepth) ? this.terrain.logicalDepth : 160;

        // Wrap Logic for Check
        let checkX = Math.round(tx);
        let checkZ = Math.round(tz);

        // Check Wrapping for safe array access
        checkX = ((checkX % logicalW) + logicalW) % logicalW;
        checkZ = ((checkZ % logicalD) + logicalD) % logicalD;

        // Get Cells
        const mCell = this.terrain.grid[this.gridX] ? this.terrain.grid[this.gridX][this.gridZ] : null;
        const tCell = this.terrain.grid[checkX] ? this.terrain.grid[checkX][checkZ] : null;

        if (mCell && tCell) {
            const mRegion = mCell.regionId;
            const tRegion = tCell.regionId;

            // SPECIAL CASE: Region 0 but Height > 0 (Pending Re-calculation)
            // If either cell is on land (h > 0) but has no region ID (0), 
            // and we are within the debounce window of Terrain.js (needsRegionRecalc),
            // we assume it's reachable for "Manual" or "Urgent" tasks to prevent job drops.
            if (this.terrain.needsRegionRecalc) {
                const targetH = tCell.height;
                const myH = mCell.height;
                if (targetH > 0 && myH > 0) {
                    // Both on land. If one is region 0, it's likely a fresh terrain change.
                    if (mRegion === 0 || tRegion === 0) return true;
                }
            }

            // Same region is reachable
            if (mRegion === tRegion && mRegion !== undefined) return true;

            // Different Regions: 0 = Water, >0 = Land
            const dist = this.getDistance(tx, tz);
            if (mRegion > 0 && tRegion > 0) {
                if (dist < 5.0) return true;
                return false;
            }

            // SPECIAL RULE: Land (>0) to Water (0) (e.g. Raise Land Task)
            if (mRegion > 0 && tRegion === 0) {
                if (dist < 3.0) return true;
                if (this.terrain.isAdjacentToRegion(checkX, checkZ, mRegion)) return true;
                return false;
            }

            if (mRegion === 0 && tRegion > 0) return false;
        }
        return true;
    }

    // Compatibility for tests and legacy calls
    triggerMove(tx, tz, time) {
        // Map to smartMove which handles pathfinding and linear fallback
        // If smartMove returns false (blocked), we might want to force it for tests?
        // But smartMove is the source of truth for movement logic now.
        return this.smartMove(tx, tz, time);
    }

    // Unified Move Logic (The "Smart Move")
    // Tries to follow path -> Tries to pathfind -> Fallback to Linear
    // Returns: true if move execution started (or path processing), false if blocked/failed
    smartMove(tx, tz, time, depth = 0) {
        if (depth > 5) return false; // Prevent infinite recursion if multiple nodes are at same spot
        this.isPathfindingThrottled = false;
        // 1. Path Following
        if (this.path && this.path.length > 0) {
            // Check if path is stale (Target changed)
            const lastNode = this.path[this.path.length - 1];
            // FIX: Relaxed threshold from 0.5 to 2.0 to allow for "best effort" paths 
            // from A* (e.g. adjacent tile if target blocked) without stuttering re-calc.
            if (Math.abs(lastNode.x - tx) > 2.0 || Math.abs(lastNode.z - tz) > 2.0) {
                // Path destination does not match request. Discard.
                if (this.id === 0) console.log(`[Actor] Discarding stale path. Target changed to ${tx},${tz} from ${lastNode.x},${lastNode.z}`);
                this.path = null;
            }
        }

        if (this.path && this.path.length > 0) {
            // Check if we are already at path[0] (e.g. Start Node from A*)
            // Or if we arrived from previous move
            const node = this.path[0];
            const dx = Math.abs(this.gridX - node.x);
            const dz = Math.abs(this.gridZ - node.z);

            // "Arrived" threshold (0.1 is safe for integer grid)
            if (dx < 0.1 && dz < 0.1) {
                // We are at this node. Advance.
                this.path.shift();
                if (this.path.length === 0) {
                    this.path = null;
                } else {
                    // Immediately process next node
                    return this.smartMove(tx, tz, time, depth + 1);
                }
            } else {
                // Not at node. Move towards it.
                if (this.canMoveTo(node.x, node.z)) {
                    // Check if already heading there
                    const isHeadingToWaypoint = this.isMoving &&
                        Math.abs(this.targetGridX - node.x) < 0.01 &&
                        Math.abs(this.targetGridZ - node.z) < 0.01;

                    if (!isHeadingToWaypoint) {
                        this.executeMove(node.x, node.z, time);
                    }
                    return true;
                } else {
                    // Path Blocked
                    // console.log("Path Blocked");
                    this.path = null; // Recalculate
                }
            }
        }

        // 2. Pathfinding Calculation (if no path)
        if (!this.path || this.path.length === 0) {
            const dist = this.getDistance(tx, tz);
            //  console.log(`[Actor ${this.id}] SmartMove Dist: ${dist} Path: ${this.path ? 'Yes' : 'No'}`);

            // Debug test flicker
            // console.log("SmartMove Internal Dist Check:", dist);
            // throw new Error(`SMARTMOVE CALLED. Dist: ${dist}`);

            // Threshold for A* (Reduced from 15.0 to 4.0 because "Linear" fails on C-shapes)
            // If distance is > 4 (just outside immediate proximity), we prefer A* for accuracy.
            // Unit.js uses A* for dist > 15 (or when stuck). Actor should be smart.
            if (dist > 4.0) {
                // Attempt Pathfinding
                // Add random jitter to throttle in Seconds (1.0s - 3.0s)
                const throttle = 1.0 + (this.id % 20) * 0.1;

                if (time === 0 || this.lastPathTime === 0 || time - this.lastPathTime > throttle) {
                    // PRE-CHECK BUDGET (Was 100)
                    // If we have budget, use it!
                    const calls = this.terrain.pathfindingCalls || 0;
                    if (calls < 100) {
                        this.lastPathTime = time;

                        if (!this.isReachable(tx, tz)) {
                            return false;
                        }

                        const newPath = this.terrain.findPath(this.gridX, this.gridZ, tx, tz);
                        if (newPath && newPath.length > 0) {
                            this.path = newPath;

                            // FIX: Skip start node
                            if (this.path.length > 0) {
                                const first = this.path[0];
                                if (Math.abs(this.gridX - first.x) < 0.5 && Math.abs(this.gridZ - first.z) < 0.5) {
                                    this.path.shift();
                                }
                            }

                            if (this.path.length > 0) {
                                const next = this.path.shift();
                                if (this.canMoveTo(next.x, next.z)) {
                                    this.executeMove(next.x, next.z, time);
                                    return true;
                                } else {
                                    this.path = null; // Blocked at start, discard path
                                    return false;
                                }
                            }
                        } else {
                            // Pathfinding Failed (Unreachable).
                            if (this.terrain.pathfindingCalls < 100) {
                                // If we HAD budget and still failed, it's truly blocked.
                                // DO NOT FALLBACK TO LINEAR.
                                this.isUnreachable = true;
                                return false;
                            }
                            // If throttled/budget-fail, we wait (return false or try linear? Wait is safer).
                            this.isPathfindingThrottled = true; // Budget Exceeded
                            return false;
                        }
                    } else {
                        // Budget Exceeded (Pre-check)
                        this.isPathfindingThrottled = true;
                    }
                } else {
                    // Throttled.
                    this.isPathfindingThrottled = true;
                }

                // If we are here (dist > 4) and have no path, DO NOT Fallback to Linear.
                // Linear is only for short range (<4).
                if (!this.path) return false;
            }

            // 3. Linear Fallback (Only if dist <= 4.0)
            if (!this.isReachable(tx, tz)) return false;

            const logicalW = this.terrain ? this.terrain.logicalWidth : 160;
            const logicalD = this.terrain ? this.terrain.logicalDepth : 160;

            let dx = tx - this.gridX;
            let dz = tz - this.gridZ;

            // Wrap shortest path
            if (Math.abs(dx) > logicalW / 2) dx -= Math.sign(dx) * logicalW;
            if (Math.abs(dz) > logicalD / 2) dz -= Math.sign(dz) * logicalD;

            let nx = Math.round(this.gridX);
            let nz = Math.round(this.gridZ);

            // Try Diagonal First (8-way movement if delta is large enough on both axes)
            const canDiagonal = Math.abs(dx) > 0.5 && Math.abs(dz) > 0.5;
            if (canDiagonal) {
                const diagX = ((nx + Math.sign(dx) % logicalW) + logicalW) % logicalW;
                const diagZ = ((nz + Math.sign(dz) % logicalD) + logicalD) % logicalD;
                if (this.canMoveTo(diagX, diagZ)) {
                    if (!this.isMoving || Math.abs(this.targetGridX - diagX) > 0.01 || Math.abs(this.targetGridZ - diagZ) > 0.01) {
                        this.executeMove(diagX, diagZ, time);
                    }
                    return true;
                }
            }

            // Try Primary Axis
            let primaryX = nx;
            let primaryZ = nz;
            if (Math.abs(dx) > Math.abs(dz)) primaryX = ((nx + Math.sign(dx) % logicalW) + logicalW) % logicalW;
            else primaryZ = ((nz + Math.sign(dz) % logicalD) + logicalD) % logicalD;

            if (this.canMoveTo(primaryX, primaryZ)) {
                if (!this.isMoving || Math.abs(this.targetGridX - primaryX) > 0.01 || Math.abs(this.targetGridZ - primaryZ) > 0.01) {
                    this.executeMove(primaryX, primaryZ, time);
                }
                return true;
            }

            // Try Secondary Axis (Sliding)
            let secondaryX = nx;
            let secondaryZ = nz;
            if (Math.abs(dx) > Math.abs(dz)) {
                if (dz !== 0) secondaryZ = ((nz + Math.sign(dz) % logicalD) + logicalD) % logicalD;
            } else {
                if (dx !== 0) secondaryX = ((nx + Math.sign(dx) % logicalW) + logicalW) % logicalW;
            }

            if (this.canMoveTo(secondaryX, secondaryZ)) {
                if (!this.isMoving || Math.abs(this.targetGridX - secondaryX) > 0.01 || Math.abs(this.targetGridZ - secondaryZ) > 0.01) {
                    this.executeMove(secondaryX, secondaryZ, time);
                }
                return true;
            }

            // FALLBACK 2: Force Pathfinding (Linear Blocked by Terrain/Water)
            // If we failed linear move, and we don't have a path, and throttle allows...

            // Critical Fix: If we stuck repeatedly, allow pathfinding immediately regardless of throttle
            // Using "stuckCount" from Unit.js or inferring from failure? 
            // We lack "stuckCount" here in Actor, but JobState might track it.
            // Let's use a local random chance if blocked to break throttle for urgent cases.

            const dist2 = this.getDistance(tx, tz);
            // Expanded range (was 15.0/30.0) and random urgency
            if (!this.path && dist2 <= 80.0) {
                const throttle = 1.0 + (this.id % 20) * 0.1;
                // Urgent bypass: Increased to 40% chance per frame if blocked (was 10%)
                // This ensures they don't look "dumb" for too long when hitting a wall
                const urgent = Math.random() < 0.4;

                if (urgent || time - this.lastPathTime > throttle) {
                    this.isPathfindingThrottled = false;
                    // Check Budget
                    if (this.terrain.pathfindingCalls >= 30) {
                        this.isPathfindingThrottled = true;
                        return false;
                    }

                    this.lastPathTime = time;

                    // Check Reachability (Again, just in case)
                    if (!this.isReachable(tx, tz)) return false;

                    const newPath = this.terrain.findPath(this.gridX, this.gridZ, tx, tz);
                    if (newPath && newPath.length > 0) {
                        // console.log(`[Actor ${this.id}] Pathfinding Success (Len:${newPath.length}). Executing immediately.`);
                        this.path = newPath;
                        // RECURSIVE CALL: Execute first step immediately to prevent 3s delay
                        return this.smartMove(tx, tz, time);
                    } else {
                        if (this.terrain.pathfindingCalls < 100) this.isUnreachable = true;
                        return false;
                    }
                } else {
                    // Throttled
                    this.isPathfindingThrottled = true;
                }
            }
        }

        return false; // Blocked
    }

    updateLogic(time, deltaTime, units, buildings) {
        this.simTime = time;
        // State Machine Override
        if (this.state) {
            this.state.update(time, deltaTime, units, buildings);
            return;
        }

        // Default Behavior (if no state)
        if (!this.isMoving) {
            // ... (Existing primitive wander moved to WanderState, 
            // but keep basic random move here for backward compatibility or simple actors)
        }
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
        // Force Fix for Test Stability/Legacy Issues
        if (this.targetGridX !== x) this.targetGridX = x;
        if (this.targetGridZ !== z) this.targetGridZ = z;

        // DISTANCE SCALING FIX (Same as Unit.js)
        const logicalW = this.terrain ? this.terrain.logicalWidth : 160;
        const logicalD = this.terrain ? this.terrain.logicalDepth : 160;

        // FIX: Calculate from current VISUAL position if already moving
        let startX = this.gridX;
        let startZ = this.gridZ;

        if (this.isMoving) {
            const progress = (time - this.moveStartTime) / this.moveDuration;
            const dist = this.getDistance(this.targetGridX, this.targetGridZ);
            if (dist < 1.0) {
                this.isMoving = false;
                this.gridX = this.targetGridX;
                this.gridZ = this.targetGridZ;
                return;
            }

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

        let base = 0.6;
        if (targetHeight > 8) base += 2.0;

        // Apply: Scale by distance to prevent Zeno's Paradox reset issues
        this.moveDuration = (base + (heightDiff * 1.5)) * Math.max(0.25, dist2D);

        // Reset counters?
        this.stuckCount = 0;
    }
    // --- TOOLTIP OVERRIDE ---
    getTooltip() {
        let text = super.getTooltip();

        // State Inspection
        if (this.state && this.state.constructor) {
            let sName = this.state.constructor.name;
            // CLEANUP: Strip unnecessary prefixes for UI
            sName = sName.replace('Goblin', '').replace('Unit', '').replace('State', '');
            text += `\nState: ${sName}`;
        }
        else if (this.getBehaviorMode) {
            text += `\nMode: ${this.getBehaviorMode()}`;
        }

        if (this.action) text += `\nAct: ${this.action}`;

        // Status Flags
        if (this.isDead) text += `\n[DEAD]`;
        if (this.isFinished) text += `\n[FINISHED]`;
        if (this.raidGoal) text += `\nRaid: ${this.raidGoal.x.toFixed(0)},${this.raidGoal.z.toFixed(0)}`;

        return text;
    }
    // --- UTILS ---
    getDistanceToBuilding(b) {
        if (!b) return Infinity;
        let size = 1;
        // Hardcode sizes or check terrain? Terrain reference is better.
        if (this.terrain && this.terrain.getBuildingSize) {
            size = this.terrain.getBuildingSize(b.type || (b.userData ? b.userData.type : 'house'));
        } else {
            // Fallback
            const t = b.type || (b.userData ? b.userData.type : 'house');
            if (t === 'house' || t === 'farm' || t === 'goblin_hut' || t === 'cave') size = 2;
            if (t === 'mansion' || t === 'barracks' || t === 'tower') size = 3;
            if (t === 'castle') size = 4;
            // Note: Cave size? Usually 2x2.
        }

        // Handling both Mesh based 'b' or userData based 'b'
        const gx = (b.userData) ? b.userData.gridX : b.gridX;
        const gz = (b.userData) ? b.userData.gridZ : b.gridZ;

        if (gx === undefined || gz === undefined) return this.getDistance(b.x, b.z); // Fallback

        const minX = gx;
        const maxX = gx + size - 1;
        const minZ = gz;
        const maxZ = gz + size - 1;

        const dx = Math.max(minX - this.gridX, 0, this.gridX - maxX);
        const dz = Math.max(minZ - this.gridZ, 0, this.gridZ - maxZ);

        return Math.sqrt(dx * dx + dz * dz);
    }

    getDistance(tx, tz) {
        if (!this.terrain) return 0;
        const W = this.terrain.logicalWidth || 160;
        const D = this.logicalDepth || this.terrain.logicalDepth || 160;

        let dx = Math.abs(this.gridX - tx);
        let dz = Math.abs(this.gridZ - tz);

        // Word-wrap awareness (Torus geometry)
        if (dx > W / 2) dx = W - dx;
        if (dz > D / 2) dz = D - dz;

        return Math.sqrt(dx * dx + dz * dz);
    }


    getApproachPoint(target) {
        if (!target) return null;
        if (target.gridX === undefined || (target.userData && target.userData.gridX !== undefined)) {
            // Check if it's a building with userData or simple entity
            const b = target.userData ? target.userData : target;

            // Check if it IS a building (Static/Obstacle)
            // If it's a dynamic unit (Actor), simple center tracking is fine.
            // If it's a Building (grid-based obstacle), we need perimeter.
            // Assuming 'type' check or just geometry check.

            if (b.type && (b.type === 'house' || b.type === 'farm' || b.type === 'goblin_hut' || b.type === 'cave' || b.type === 'tower' || b.type === 'barracks' || b.type === 'castle')) {
                const size = (this.terrain && this.terrain.getBuildingSize) ? this.terrain.getBuildingSize(b.type) : 1;

                // Scan perimeter
                let bestPoint = null;
                let minDist = Infinity;

                const minX = b.gridX - 1;
                const maxX = b.gridX + size;
                const minZ = b.gridZ - 1;
                const maxZ = b.gridZ + size;

                const W = (this.terrain && this.terrain.logicalWidth) || 80;
                const D = (this.terrain && this.terrain.logicalDepth) || 80;

                for (let x = minX; x <= maxX; x++) {
                    for (let z = minZ; z <= maxZ; z++) {
                        // Skip internal cells
                        if (x >= b.gridX && x < b.gridX + size && z >= b.gridZ && z < b.gridZ + size) continue;

                        // Wrap coords for check
                        const wx = (x % W + W) % W;
                        const wz = (z % D + D) % D;

                        // Check Walkability (isValidGrid handled by grid check)
                        // But for pathfinding target, we just want a VALID cell.
                        if (this.terrain.getTileHeight(wx, wz) > 0) { // Land check? Or specific isWalkable?
                            // Simple dist check
                            const dist = this.getDistance(wx, wz);
                            if (dist < minDist) {
                                minDist = dist;
                                bestPoint = { x: wx, z: wz };
                            }
                        }
                    }
                }
                return bestPoint || { x: b.gridX, z: b.gridZ }; // Fallback
            }
        }
        return { x: target.gridX, z: target.gridZ }; // Default
    }
}
