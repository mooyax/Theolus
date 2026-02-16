import * as THREE from 'three';
console.log("[DEBUG] Actor.ts loaded");
import { Entity } from './Entity';

export class Actor extends Entity {
    public path: any[] | null;
    public pathIndex: number;
    public stuckCount: number;
    public stuckTimer: number;
    public lastPos: THREE.Vector3;
    public pathFailCount: number;
    public action: string = "";
    public lastMoveLog: string = ""; // Debug Info
    public raidGoal: { x: number, z: number, timestamp?: number } | null = null;
    public age: number = 0;
    public lifespan: number = 100;
    public isFinished: boolean = false;
    public unreachableTimer: number = 0;

    // AI Target Interaction
    public mesh: THREE.Mesh | any = null; // Added for shared access
    public targetRequest: any | null; // Job
    public targetItem: any | null;    // Item to pick up
    public heldItem: any | null;
    public targetEntity: any | null;  // Generic target
    public targetBuilding: any | null;

    // Combat
    public hp: number;
    public maxHp: number;
    public damage: number;
    public attackRate: number;
    public attackCooldown: number;
    public combatRange: number;
    public isRanged: boolean = false;

    // Config
    public baseMoveDuration: number;

    // AI Pathfinding State
    public lastPathTime: number = 0;
    public isPathfinding: boolean;
    public isPathfindingThrottled: boolean = false;
    public isUnreachable: boolean = false;
    public isWaitingForPath: boolean = false;
    public minDistToTarget: number;
    public pathStagnation: number;
    public pathRequestId: number = 0; // Async Stale Check
    public pathTargetX?: number;
    public pathTargetZ?: number;
    public pathRequestedTargetX?: number;
    public pathRequestedTargetZ?: number;

    // State Machine
    public state: any;
    public simTime: number;

    takeDamage(amount: number, attacker: any = null, isCounter: boolean = false) {
        if (this.isDead) return;
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.isDead = true;
            // console.log(`[Actor ${this.id}] Died.`);

            // --- SHEEP HARVEST REWARD ---
            if (this.type === 'sheep') {
                const game = this.game || (window as any).game;
                if (game && game.resources) {
                    game.resources.meat = (game.resources.meat || 0) + 1000;
                    console.log(`[Actor ${this.id}] Sheep Harvested! +1000 Meat. Total: ${game.resources.meat}`);
                }
            }
        }
    }

    // Virtual Methods (Default Implementation)
    getBehaviorMode(): string { return 'Idle'; }
    onMoveStep(time: number) { }

    constructor(scene: THREE.Scene, terrain: any, x: number, z: number, type: string) {
        super(scene, terrain, x, z, type);
        console.log(`[DIAG] Actor Created ID: ${this.id}`);
        console.log(`[DIAG] Actor smartMove type: ${typeof this.smartMove}`);
        console.log(`[DIAG] Actor smartMove body snapshot: ${this.smartMove ? this.smartMove.toString().substring(0, 100) : 'null'}`);

        // AI State
        this.path = null;
        this.pathIndex = 0;
        this.stuckCount = 0;
        this.pathFailCount = 0;
        this.lastPathTime = 0;
        this.isPathfinding = false; // ASYNC FLAG
        this.isPathfindingThrottled = false;
        this.isUnreachable = false;
        this.isWaitingForPath = false;

        // Stagnation
        this.minDistToTarget = Infinity;
        this.pathStagnation = 0;

        // State Machine
        this.state = null;
        this.simTime = 0; // Track simulation time

        // Job Management
        this.action = 'Idle';
        // Config defaults
        this.hp = 100;
        this.maxHp = 100;
        this.damage = 10;
        this.attackRate = 1.0;
        this.attackCooldown = 0;
        this.combatRange = 1.0;
        this.baseMoveDuration = 1.0;
        this.stuckTimer = 0;
        this.lastPos = new THREE.Vector3();
        this.pathRequestId = 0;
    }

    changeState(newState: any) {
        if (!newState) return;
        if (this.state && this.state.exit) {
            this.state.exit(newState);
        }
        if (this.id === 0) {
            const oldName = this.state ? this.state.constructor.name : 'None';
            const newName = newState ? newState.constructor.name : 'None';
            const reqId = this.targetRequest ? this.targetRequest.id : 'null';
            console.log(`[Actor 0] CHANGE STATE: ${oldName} -> ${newName} Request:${reqId} `);
        }
        const prevState = this.state;
        this.state = newState;
        if (this.state.enter) {
            this.state.enter(prevState);
        }
    }

    // Shared Reachability Check (The "Region Map" Logic)

    isReachable(tx: number, tz: number) {
        if (!this.terrain || !this.terrain.grid) return true; // Fallback


        const logicalW = (this.terrain && this.terrain.logicalWidth) ? this.terrain.logicalWidth : 240;
        const logicalD = (this.terrain && this.terrain.logicalDepth) ? this.terrain.logicalDepth : 240;

        // Wrap Logic for Check
        let checkX = Math.round(tx);
        let checkZ = Math.round(tz);

        // Check Wrapping for safe array access
        checkX = ((checkX % logicalW) + logicalW) % logicalW;
        checkZ = ((checkZ % logicalD) + logicalD) % logicalD;

        // Get Cells
        const mCell = this.terrain.grid[Math.floor(this.gridX)] ? this.terrain.grid[Math.floor(this.gridX)][Math.floor(this.gridZ)] : null;
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

            // Land to Land (Different mass): BLOCK (Strict)
            if (mRegion > 0 && tRegion > 0) {
                // console.warn(`[Actor ${this.id}] Land to Land BLOCK (Check: ${mRegion} vs ${tRegion})`);
                const dist = this.getDistance(tx, tz);
                if (dist < 3.0) return true;
                return false;
            }

            // SPECIAL RULE: Land (>0) to Water (0) (e.g. Raise Land Task)
            if (mRegion > 0 && tRegion === 0) {
                const dist = this.getDistance(tx, tz);
                if (dist < 3.0) return true;
                if (this.terrain.isAdjacentToRegion(checkX, checkZ, mRegion)) return true;
                return false;
            }

            // Water to Land: BLOCK
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

    clearPath() {
        this.path = null;
        this.pathRequestId++; // Invalidate any pending pathfinding results
        this.pathTargetX = undefined;
        this.pathTargetZ = undefined;
        this.isPathfinding = false;
        this.isWaitingForPath = false;
        this.isUnreachable = false; // FIX: Ensure we can retry after a path is explicitly cleared
        // Don't clear lastMoveLog here, let it persist until next smartMove success
    }

    setMoveLog(reason: string, time: number, isError: boolean = false) {
        // Prevents unreadable flickering by keeping errors for at least 1.0s
        const lastTime = (this as any).lastMoveLogTime || 0;
        const lastWasError = (this as any).lastMoveLogIsError || false;

        if (lastWasError && (time - lastTime < 1.0) && !isError) {
            // Keep the error message for a bit longer
            return;
        }

        this.lastMoveLog = reason;
        (this as any).lastMoveLogTime = time;
        (this as any).lastMoveLogIsError = isError;

        if (isError) {
            (this as any).lastFailureReason = reason;
            (this as any).lastFailureTime = time;
        }
    }

    // Unified Move Logic (The "Smart Move")
    // Tries to follow path -> Tries to pathfind -> Fallback to Linear
    // Returns: true if move execution started (or path processing), false if blocked/failed
    smartMove(tx: number, tz: number, time: number, depth: number = 0): boolean {
        if (isNaN(tx) || isNaN(tz)) {
            console.error(`[Actor ${this.id}] smartMove received NaN target: ${tx},${tz} `);
            return false;
        }

        if (depth > 10) {
            console.error(`[Actor ${this.id}] smartMove potential infinite recursion!`);
            return false;
        }

        // --- 1. Validation & Cache Check ---

        // FIX: Retry unreachable targets periodically (every 5s)
        if (this.isUnreachable) {
            if (!this.unreachableTimer) this.unreachableTimer = time;
            if (time - this.unreachableTimer > 5.0) { // Standard 5s retry
                this.isUnreachable = false;
                this.unreachableTimer = 0;
            }
        }

        // Only reset unreachable if target changed significantly
        // USE getDistance for wrap-aware check
        const lastTx = (this as any).lastSmartMoveTargetX;
        const lastTz = (this as any).lastSmartMoveTargetZ;
        const distFromLastTarget = (lastTx !== undefined && lastTz !== undefined) ? this.getDistance(tx, tz, lastTx, lastTz) : 999;

        // FIX: Increase threshold from 0.1 to 2.0 to prevent "Busy Wait" loop when chasing moving targets
        if (lastTx === undefined || distFromLastTarget > 2.0) {
            console.log(`[Actor ${this.id}] Resetting Unreachable (Target changed or initializing)`);
            this.isUnreachable = false;
            (this as any).lastSmartMoveTargetX = tx;
            (this as any).lastSmartMoveTargetZ = tz;
        }

        if (this.isUnreachable) {
            // console.warn(`[Actor ${this.id}] smartMove ABORT: isUnreachable=TRUE`);
            return false;
        }

        if (depth > 5) return false;

        // Sanity Check: If target is invalid, abort immediately to prevent flicker
        if (isNaN(tx) || isNaN(tz) || (tx === 0 && tz === 0)) {
            this.setMoveLog(`Invalid Target (${tx},${tz})`, time, true);
            return false;
        }

        this.isPathfindingThrottled = false;
        this.isWaitingForPath = false;

        // 1. Path Following
        if (this.path && this.path.length > 0) {
            this.setMoveLog("Following Path", time);
            const pTx = (this as any).pathTargetX;
            const pTz = (this as any).pathTargetZ;

            let invalid = false;
            if (pTx !== undefined && pTz !== undefined) {
                // USE getDistance for wrap-aware check
                if (this.getDistance(tx, tz, pTx, pTz) > 0.5) {
                    invalid = true;
                }
            } else {
                const lastNode = this.path[this.path.length - 1];
                if (this.getDistance(tx, tz, lastNode.x, lastNode.z) > 2.0) invalid = true;
            }

            if (invalid) {
                if (this.pathTargetX !== undefined) {
                    const pTx = this.pathTargetX;
                    const pTz = this.pathTargetZ || 0;
                    if (this.getDistance(tx, tz, pTx, pTz) > 0.1) {
                        const endNode = this.path[this.path.length - 1];
                        // IMPROVED: Only invalidate if the OVERALL REQUESTED TARGET has changed.
                        // This allows for Partial Paths (where endNode is not the destination)
                        // and prevents the "Target Mismatch" flicker loop.
                        const requestedDist = (this.pathRequestedTargetX !== undefined && this.pathRequestedTargetZ !== undefined) ?
                            this.getDistance(tx, tz, this.pathRequestedTargetX, this.pathRequestedTargetZ) : 999;

                        if (requestedDist < 3.0) {
                            // Keep current path, it's still heading to the same logical destination
                            this.pathTargetX = tx;
                            this.pathTargetZ = tz;
                        } else {
                            this.setMoveLog(`Target Moved (${requestedDist.toFixed(1)})`, time, true);
                            this.clearPath();
                        }
                    }
                } else {
                    this.setMoveLog("PathTarget Missing", time, true);
                    this.clearPath();
                }
            }

            // Move logic outside if (invalid)
            if (this.path && this.path.length > 0) {
                const node = this.path[0];
                // USE getDistance for wrap-aware check
                const distToNextNode = this.getDistance(node.x, node.z);
                if (distToNextNode < 0.1) {
                    this.path.shift();
                    if (this.path.length === 0) {
                        this.path = null;
                    } else {
                        return this.smartMove(tx, tz, time, depth + 1);
                    }
                } else {
                    const isHeadingToWaypoint = this.isMoving &&
                        this.getDistance(node.x, node.z, this.targetGridX, this.targetGridZ) < 0.01;

                    let canMove = true;
                    if (!isHeadingToWaypoint) {
                        canMove = this.canMoveTo && this.canMoveTo(node.x, node.z);
                    }

                    if (canMove) {
                        if (!isHeadingToWaypoint) {
                            this.executeMove(node.x, node.z, time);
                        }
                        return true;
                    } else {
                        this.clearPath(); // Use clearPath for consistency
                        this.setMoveLog("Path Blocked (Node Unreachable)", time, true);
                    }
                }
            }
        }

        // 2. Pathfinding / Fallback Trigger
        if (!this.path || this.path.length === 0) {
            // DEBUG: Trace entry
            // console.error(`[Actor ${this.id}] SmartMove Logic. Path is empty.`);

            const dist = this.getDistance(tx, tz);

            // FIX: Restore Linear Fallback for small distances to avoid unnecessary pathfinding calls and fix legacy tests
            if (dist <= 1.5) {
                if (dist < 0.05) {
                    // console.log(`[Actor ${this.id}] Arrived at destination.`);
                    this.isMoving = false;
                    return false;
                }

                const isAlreadyHeadingThere = this.isMoving &&
                    Math.abs(this.targetGridX - tx) < 0.01 &&
                    Math.abs(this.targetGridZ - tz) < 0.01;

                if (!isAlreadyHeadingThere) {
                    this.executeMove(tx, tz, time);
                }
                return true;
            }

            // Throttle
            const throttle = 1.0 + (this.id % 20) * 0.1;
            const timeSinceLast = (time === 0 || this.lastPathTime === 0) ? 999 : Math.abs(time - this.lastPathTime);

            // PRIORITY: If we are heading to a manual goal (Job) or Chasing a target, bypass throttle
            // This prevents "stuttering" when finishing a partial path segment or chasing enemies.
            const isManualJob = (this.action === 'Approaching Job' || this.action === 'Chasing');

            if (timeSinceLast < throttle && !isManualJob) {
                this.isPathfindingThrottled = true;
                return true; // BUSY: Pathfinding requested recently, don't abandon state yet
            }

            if (this.isPathfinding) {
                return true;
            }

            // Moved: Only update lastPathTime IF we actually attempt the calculation (budget Permitting)
            // this.lastPathTime = time;

            // OPTIMIZATION: If we already have a path and are just checking reachability mid-stream,
            // be more permissive to prevent "flickering" during terrain changes.
            const alreadyHasPath = this.path && this.path.length > 0;
            if (!alreadyHasPath && (this.isUnreachable || !this.isReachable(tx, tz))) {
                // console.warn(`[Actor ${this.id}] IsReachable=False`);
                this.isUnreachable = true;
                return false;
            }

            this.isUnreachable = false;
            this.isPathfinding = true;

            const calls = (this.terrain && this.terrain.pathfindingCalls) || 0;
            if (calls >= 500) { // INCREASED BUDGET: From 50 to 500 to accommodate 1500+ units
                this.isWaitingForPath = true;
                this.isPathfinding = false;
                this.setMoveLog("Budget Throttled", time, true);
                // CRITICAL FIX: Do NOT update lastPathTime here. 
                // We want to try again ASAP when budget allows.
                return true; // BUSY: Budget full, don't abandon state. Next frame we try again.
            }

            // SUCCESS: Attempting pathfinding
            this.lastPathTime = time;
            if (this.terrain) this.terrain.pathfindingCalls = (this.terrain.pathfindingCalls || 0) + 1;

            if (typeof this.terrain.findPathAsync !== 'function') {
                console.error(`[Actor ${this.id}] Blocked: findPathAsync missing`);
                this.isPathfinding = false;
                return false;
            }

            this.isPathfinding = true;
            this.pathRequestId++;
            this.pathRequestedTargetX = tx;
            this.pathRequestedTargetZ = tz;
            const currentRequestId = this.pathRequestId;
            // const reqStart = performance.now();
            this.isWaitingForPath = true;
            this.terrain.findPathAsync(this.gridX, this.gridZ, tx, tz, 0, this.id)
                .then(newPath => {
                    if (this.pathRequestId !== currentRequestId) {
                        this.isPathfinding = false;
                        this.isWaitingForPath = false;
                        return;
                    }
                    this.isPathfinding = false;
                    this.isWaitingForPath = false;
                    this.pathTargetX = tx;
                    this.pathTargetZ = tz;

                    // FIX: Filter out "One Node Path" where start == end or very close
                    // This prevents infinite loop of Request -> Path[Current] -> Consumption -> Request
                    let isShortPath = false;
                    if (newPath && newPath.length === 1) {
                        const node = newPath[0];
                        // USE getDistance for wrap-aware check
                        const d = this.getDistance(node.x, node.z);
                        if (d < 0.2) isShortPath = true;
                    }

                    if (!newPath || newPath.length === 0 || isShortPath) {
                        console.warn(`[Actor ${this.id}] Pathfinding FAILED: Empty/Short path returned. Current Pos: ${this.gridX},${this.gridZ} -> Target: ${tx},${tz} Len:${newPath ? newPath.length : 0} Short:${isShortPath}`);
                        this.isUnreachable = true;
                        if (this.action === 'Approaching Job') {
                            if ((this as any).changeState && (this as any).getResumeState) {
                                (this as any).changeState((this as any).getResumeState());
                            }
                        }
                        this.isMoving = false;
                        this.onMoveFinished(time);
                        return;
                    }

                    console.log(`[Actor ${this.id}] Pathfinding SUCCESS: Got ${newPath.length} nodes to ${tx},${tz}`);
                    this.path = newPath;
                    this.pathIndex = 0;
                    this.isUnreachable = false;
                    this.smartMove(tx, tz, time, depth + 1);
                })
                .catch(e => {
                    console.error(`[Actor ${this.id}] Pathfinding Error: `, e);
                    this.isPathfinding = false;
                    this.isWaitingForPath = false;
                    // FIX: Mark as unreachable on error to prevent infinite retry loop in Combat
                    this.isUnreachable = true;
                    this.isMoving = false;
                });
            return true;
        }

        console.error(`[Actor ${this.id}] Fallthrough Reached! Should be impossible. Path:${this.path}`);
        return false;
    }

    /**
     * @override Standard Entity Update
     * Used by tests and simpler loop logic.
     * Note: Game.ts loop calls updateMovement/updateLogic separately for performance/staggering.
     */
    override update(time: number, deltaTime: number) {
        if (this.isDead) return;
        this.updateMovement(time);

        // Simple fallback for updateLogic if called outside regular game loop
        this.updateLogic(time, deltaTime, false, [], [], []);
    }

    updateLogic(time: number, deltaTime: number, isNight: boolean, units: any[], buildings: any[], goblins: any[]) {
        // Default: Do nothing
        this.simTime = time;
        // State Machine Override
        if (this.state) {
            this.state.update(time, deltaTime, isNight, units, buildings, goblins);
            return;
        }

        // Default Behavior (if no state)
        if (!this.isMoving) {
            // ... (Existing primitive wander moved to WanderState, 
            // but keep basic random move here for backward compatibility or simple actors)
        }
    }

    // Basic Validation (Can override)
    canMoveTo(x: number, z: number) {
        // Height / Building check
        const h = this.terrain.getTileHeight(x, z);
        if (h <= 0) return false;

        const curH = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (Math.abs(h - curH) > 3.0) return false;

        // Building Check: Optional?
        // Unit.js REMOVED hasBuilding check to allow pathing through own buildings (roads).
        // Goblin.js keeps it (block entering buildings).
        // Base Actor will be permissive (allow), subclasses can restrict.
        // Actually, preventing walking INTO a building is good visual.
        // But pathfinding nodes might be ON a building?
        // Let's return true by default regarding buildings, only check terrain.

        return true;
    }

    executeMove(tx: number, tz: number, time: number) {
        this.startMove(tx, tz, time);
    }

    onMoveFinished(time: number) {
        // Reset Limbs
        if (this.limbs) {
            this.limbs.leftArm = this.limbs.leftArm || { x: 0 }; this.limbs.leftArm.x = 0;
            this.limbs.rightArm = this.limbs.rightArm || { x: 0 }; this.limbs.rightArm.x = 0;
            this.limbs.leftLeg = this.limbs.leftLeg || { x: 0 }; this.limbs.leftLeg.x = 0;
            this.limbs.rightLeg = this.limbs.rightLeg || { x: 0 }; this.limbs.rightLeg.x = 0;
        }

        // Final Snap handled by Entity (if called via super)
        super.onMoveFinished(time);

        // FIX: Idle/Move Stuttering
        // Immediately try to advance path instead of waiting for next Logic Tick (1s delay).
        // Pass 'depth=1' or similar to prevent infinite recursion if 0-dist nodes exist?
        // smartMove has internal path check.
        if (this.path && this.path.length > 0) {
            // Re-invoke smartMove to pick next node
            // Use current safe 'time' or simTime logic?
            const now = (this.game && this.game.simTotalTimeSec) ? this.game.simTotalTimeSec : time;
            // preserve target from state if available
            // Fix: Use stored pathTarget instead of inferring from last node
            const pTx = (this as any).pathTargetX;
            const pTz = (this as any).pathTargetZ;

            if (pTx !== undefined && pTz !== undefined) {
                this.smartMove(pTx, pTz, now);
            } else {
                // Fallback
                const lastNode = this.path[this.path.length - 1];
                if (lastNode) {
                    this.smartMove(lastNode.x, lastNode.z, now);
                }
            }
        }
    }

    // --- TOOLTIP OVERRIDE ---
    getTooltip() {
        let text = super.getTooltip();

        // State Inspection
        if (this.state && this.state.constructor) {
            let sName = this.state.constructor.name;
            // CLEANUP: Strip unnecessary prefixes for UI
            sName = sName.replace('Goblin', '').replace('Unit', '').replace('State', '');
            text += `\nState: ${sName} `;
        }
        else if (this.getBehaviorMode) {
            text += `\nMode: ${this.getBehaviorMode()} `;
        }

        if (this.action) text += `\nAct: ${this.action} `;

        // Status Flags
        if (this.isDead) text += `\n[DEAD]`;
        if (this.isFinished) text += `\n[FINISHED]`;
        if (this.raidGoal) text += `\nRaid: ${this.raidGoal.x.toFixed(0)},${this.raidGoal.z.toFixed(0)} `;

        return text;
    }
    // --- UTILS ---
    getDistanceToBuilding(b: any) {
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



    getApproachPoint(target: any) {
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
                let bestPoint: { x: number, z: number } | null = null;
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

    // --- MOVEMENT OVERRIDE & WATCHDOG ---
    updateMovement(time: number) {
        // 1. Standard Entity Movement
        super.updateMovement(time);

        // 2. FAILSAFE: Watchdog for Frozen Animation
        // If "Moving" flag is stuck true for too long without arriving, force stop.
        if (this.isMoving) {
            // Buffer: 3x duration + 2s (Generous, to avoid cutting off valid slow moves)
            // But strict enough to catch infinite loops.
            const limit = Math.max(3.0, (this.moveDuration || 1.0) * 3 + 2.0);
            const elapsed = time - this.moveStartTime;

            if (elapsed > limit) {
                // Detected STUCK State
                // if (this.id % 10 === 0) console.warn(`[Actor ${ this.id }]Watchdog: Force stopping stuck movement.Elapsed: ${ elapsed.toFixed(1) } s > Limit: ${ limit.toFixed(1) } s`);

                // Force Stop
                this.isMoving = false;
                this.path = null; // Clear path to force re-think

                // Snap to target to ensure we don't drift? 
                // Better to snap to "Target" which was our destination.
                this.gridX = this.targetGridX;
                this.gridZ = this.targetGridZ;

                if (this.onMoveFinished) this.onMoveFinished(time);
            }
        }
    }

    dispose() {
        super.dispose();
        this.path = null;
        this.targetRequest = null;
        this.targetEntity = null;
        this.targetBuilding = null;
    }
}
