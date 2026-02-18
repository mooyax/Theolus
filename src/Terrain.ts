import * as THREE from 'three';
console.log('[DEBUG] Terrain.ts top-level load');
import { Building } from './Building';
import { GameConfig } from './config/GameConfig';

export class Terrain {
    // --- Core THREE.js Systems ---
    public scene: THREE.Scene;
    public clippingPlanes: THREE.Plane[];
    public renderer?: any;
    public camera?: any;
    public controls?: any;
    public ambientLight?: any;
    public directionalLight?: any;
    public statsDisplay?: any;
    public performanceMonitor?: any;

    // --- Visualization & Meshes ---
    public geometry: THREE.PlaneGeometry | null = null;
    public mesh: THREE.Mesh | null = null;
    public waterMesh: THREE.Mesh | null = null;
    public meshes: any[] = []; // Changed to any[] for broad compatibility
    public visibleChunks: { [key: string]: THREE.Mesh } = {};
    public chunkSize: number = 20;
    public gridLinesMesh: THREE.LineSegments | null = null;
    public gridDotsMesh: THREE.Points | null = null;

    // --- State and Flags ---
    private _biomeColors: any; // Cache for getBiomeColor
    public isNight: boolean = false;
    public _lastIsNight?: boolean;
    public currentSeason?: string;
    public isRestoring: boolean = false;
    public colorsDirty: boolean = false;
    public needsRegionRecalc: boolean = false;
    public regionRecalcTimer: number = 0;
    public frameCount: number = 0;
    public lastFrameTime: number = 0;

    // --- Logic & Managers ---
    public weatherManager?: any;
    public cloudManager?: any;
    public rainParticleSystem?: any;
    public snowParticleSystem?: any;
    public unitRenderer?: any;
    public buildingRenderer?: any;
    public goblinRenderer?: any;
    public inputManager?: any;

    // --- Pathfinding & Workers ---
    public worker?: Worker;
    public workerRequests?: Map<number, any>;
    public requestIdCounter: number = 0;
    public pathfindingCalls: number = 0;
    public pathCache: any[] = [];

    // --- Map Data ---
    public logicalWidth: number;
    public logicalDepth: number;
    public width: number;
    public depth: number;
    public seed: number = 0;
    public lastYieldTime: number = 0;
    public totalHousingPop: number = 0;
    public totalUnits: number = 0;
    public buildings: any[] = [];
    public grid: any[][] = [];
    public entityGrid: any[][][]; // x, z -> array of entities
    public trees: { gridX: number, gridZ: number, rotationY: number, scale: number, gridY?: number }[] = [];

    constructor(scene: THREE.Scene, clippingPlanes?: THREE.Plane[], width?: number, depth?: number) {
        this.scene = scene;
        this.clippingPlanes = clippingPlanes || [];
        this.logicalWidth = width || 160;
        this.logicalDepth = depth || 160;
        this.width = this.logicalWidth; // Assuming 1:1 for now, sync with existing logic if needed
        this.depth = this.logicalDepth;

        // DEBUG: Verify method existence
        console.log('[Terrain] Constructor. updatePopulation type:', typeof this.updatePopulation);


        // Pathfinding Cache
        this.pathCache = [];
        this.pathfindingCalls = 0; // Budget per frame

        // Initialize Web Worker
        if (typeof Worker !== 'undefined') {
            this.worker = new Worker(new URL('./workers/pathfindingWorker.js', import.meta.url), { type: 'module' });
            this.worker.onerror = (e) => console.error('[Terrain] Worker Error:', e);
            this.workerRequests = new Map();
            this.requestIdCounter = 0;

            this.worker.onmessage = (e) => {
                const { type, id, payload } = e.data;
                // console.log(`[Terrain] Worker Message: ${type} ID:${id}`);
                if (type === 'PATH_RESULT') {
                    const req = this.workerRequests!.get(id);
                    if (req) {
                        const count = payload ? payload.length : 0;
                        // console.log(`[Terrain] Path Response ID:${id} Length:${count}`);
                        req.resolve(payload);
                        this.workerRequests!.delete(id);
                    }
                } else if (type === 'PATH_ERROR') {
                    const req = this.workerRequests!.get(id);
                    if (req) {
                        console.error(`[Terrain] Worker Error Response ID:${id}`, payload.error);
                        req.reject(new Error(payload.error));
                        this.workerRequests!.delete(id);
                    }
                } else if (type === 'DEBUG_GET_HEIGHT') {
                    // Handled by console.log inside worker, but if we wanted to pass back...
                }
            };
        }
        this.width = this.logicalWidth * 3; // Visual size (3x3 grid)
        this.depth = this.logicalDepth * 3;

        this.grid = []; // Stores the 40x40 logical data
        this.geometry = null;
        this.mesh = null;
        this.chunkSize = 16;
        this.visibleChunks = {}; // "x,z" -> mesh

        // Pathfinding Optimization
        this.pathCache = []; // Shared Memory for Long Paths: { sx, sz, ex, ez, path, timestamp }
        this.pathfindingCalls = 0; // Frame budget
        this.lastFrameTime = 0; // To reset stats
        this.waterMesh = null;
        this.meshes = []; // Keep for compatibility if other classes check it, but will contain only 1 mesh
        this.buildings = []; // Track all buildings for population logic

        this.initTerrain();

        this.totalHousingPop = 0;

        // Spatial Partitioning for Entities
        this.entityGrid = [];
        this.initEntityGrid();
    }




    // --- LCG PRNG for Deterministic Entity Placement ---
    public rngState: number = 0;

    initRNG(seed: number) {
        this.rngState = seed % 2147483647;
        if (this.rngState <= 0) this.rngState += 2147483646;
    }

    seededRandom() {
        if (!this.rngState) return Math.random(); // Fallback
        this.rngState = (this.rngState * 16807) % 2147483647;
        return (this.rngState - 1) / 2147483646;
    }

    async checkYield() {
        // Only yield if requested and time passed
        if (performance.now() - this.lastYieldTime > 16) {
            await new Promise(resolve => setTimeout(resolve, 0));
            this.lastYieldTime = performance.now();
            return true;
        }
        return false;
    }

    initEntityGrid() {
        this.entityGrid = [];
        for (let x = 0; x < this.logicalWidth; x++) {
            this.entityGrid[x] = [];
            for (let z = 0; z < this.logicalDepth; z++) {
                this.entityGrid[x][z] = []; // Array of entities in this cell
            }
        }
    }

    isValidGrid(x, z) {
        return x >= 0 && x < this.logicalWidth && z >= 0 && z < this.logicalDepth;
    }

    registerEntity(entity: any, x: number, z: number, type: string) {
        const ix = Math.floor(x);
        const iz = Math.floor(z);
        if (!this.isValidGrid(ix, iz)) return;


        entity._spatial = { // Cache spatial data
            x: x,
            z: z,
            type: type
        };

        if (!this.entityGrid[ix]) this.entityGrid[ix] = []; // Safety
        if (!this.entityGrid[ix][iz]) this.entityGrid[ix][iz] = []; // Safety

        this.entityGrid[ix][iz].push(entity);
    }

    unregisterEntity(entity) {
        if (!entity._spatial) return;
        const { x, z } = entity._spatial;
        const ix = Math.floor(x);
        const iz = Math.floor(z);

        if (this.isValidGrid(ix, iz)) {
            if (this.entityGrid[ix] && this.entityGrid[ix][iz]) {
                const cell = this.entityGrid[ix][iz];
                const idx = cell.indexOf(entity);
                if (idx !== -1) {
                    cell.splice(idx, 1);
                }
            }
        }
        entity._spatial = null;
    }

    // Helper: Convert Grid Coord to World Coord (flat, no height, CENTERED)
    gridToWorld(val: number) {
        // logicalWidth 160 -> -80 to +80
        // val is 0..159
        // Return CENTER of the tile (e.g. index 0 -> -79.5)
        return (val - this.logicalWidth / 2) + 0.5;
    }

    worldToGrid(val: number) {
        return Math.floor(val + this.logicalWidth / 2);
    }

    moveEntity(entity: any, oldX: number, oldZ: number, newX: number, newZ: number, type: string) {
        const iOldX = Math.floor(oldX);
        const iOldZ = Math.floor(oldZ);
        const iNewX = Math.floor(newX);
        const iNewZ = Math.floor(newZ);

        if (iOldX === iNewX && iOldZ === iNewZ) {
            // Still in same cell, no need to update grid
            entity._spatial = { x: iNewX, z: iNewZ, type }; // Update pos in metadata though
            return;
        }
        this.unregisterEntity(entity);
        this.registerEntity(entity, newX, newZ, type);
    }



    findNearestEntity(type, centerX, centerZ, maxRadius) {
        let nearest = null;
        let minDistSq = maxRadius * maxRadius;
        const r = Math.ceil(maxRadius);
        const W = this.logicalWidth;
        const H = this.logicalDepth;

        for (let dx = -r; dx <= r; dx++) {
            for (let dz = -r; dz <= r; dz++) {
                // Check Bounds if not wrapping? No, we assume wrapping logic for game.
                // But optimization: Check Euclidean distance of dx,dz before grid lookup?
                const distSq = dx * dx + dz * dz;
                if (distSq > maxRadius * maxRadius) continue;

                const ix = Math.floor((centerX + dx + W) % W);
                const iz = Math.floor((centerZ + dz + H) % H);

                if (!this.entityGrid[ix] || !this.entityGrid[ix][iz]) continue;
                const cell = this.entityGrid[ix][iz];
                for (let i = 0; i < cell.length; i++) {
                    const e = cell[i];
                    if (e._spatial && e._spatial.type === type) {
                        if (e.isDead) continue;
                        if (distSq < minDistSq) {
                            minDistSq = distSq;
                            nearest = e;
                        }
                    }
                }
            }
        }
        return nearest;
    }

    findBestTarget(type: string, centerX: number, centerZ: number, maxRadius: number, costFn: (e: any, d: number) => number, candidateList: any[] | null = null) {
        let bestEntity = null;
        let bestScore = Infinity;

        // Region Check
        const W = this.logicalWidth;
        const H = this.logicalDepth;

        // Wrap Center
        centerX = ((centerX % W) + W) % W;
        centerZ = ((centerZ % H) + H) % H;

        const ix = Math.floor(centerX);
        const iz = Math.floor(centerZ);

        if (!this.grid[ix] || !this.grid[ix][iz]) {
            // console.warn(`[Terrain] Validating BestTarget Center: Invalid Grid ${ix},${iz}`);
            return null;
        }

        const sourceCell = this.grid[ix][iz];
        const sourceRegion = sourceCell ? sourceCell.regionId : 0;

        // Optimization: Linear Scan vs Grid Search
        // Grid Search Area ~ (2R)^2.
        // If candidateList is provided and smaller than Grid Area, use Linear Scan.
        // Threshold: If Area > 3 * ListSize, Linear is faster (approx).
        const gridArea = (2 * maxRadius) * (2 * maxRadius);
        const useLinear = candidateList && (gridArea > (candidateList.length * 3) || candidateList.length < 100);

        if (useLinear) {
            // Linear Scan optimization
            for (let i = 0; i < candidateList.length; i++) {
                const e = candidateList[i];
                if (e.isDead || e.isFinished) continue;

                // Region Filter
                if (type !== 'building' && sourceRegion > 0) {
                    if (!this.grid[e.gridX]) continue; // Safety
                    const tCell = this.grid[e.gridX][e.gridZ];
                    if (!tCell || tCell.regionId !== sourceRegion) continue;
                }

                // Verify Type (if mixed list)
                // Linear scan assumes list is pre-filtered or we check broadly.
                // We don't strict check 'unit' vs 'worker' here usually, but if needed:
                if (type === 'building' && (!e.userData || !['house', 'farm', 'barracks', 'tower', 'mansion', 'goblin_hut', 'cave'].includes(e.userData.type))) {
                    // building check
                }

                // Distance Check
                let dx = Math.abs(e.gridX - centerX);
                let dz = Math.abs(e.gridZ - centerZ);
                if (dx > W / 2) dx = W - dx;
                if (dz > H / 2) dz = H - dz;

                const dist = Math.sqrt(dx * dx + dz * dz);
                if (dist > maxRadius) continue;

                const score = costFn(e, dist);
                if (score < bestScore) {
                    bestScore = score;
                    bestEntity = e;
                }
            }
            return bestEntity;
        }

        // Fallback to Grid Search (Original Logic)
        const r = Math.ceil(maxRadius);
        const maxRadiusSq = maxRadius * maxRadius;
        const entityGrid = this.entityGrid;

        if (!entityGrid) return null;

        for (let dx = -r; dx <= r; dx++) {
            const dxSq = dx * dx;
            if (dxSq > maxRadiusSq) continue;

            let ix = Math.floor(centerX + dx);
            if (ix < 0 || ix >= W) ix = ((ix % W) + W) % W;

            if (!entityGrid[ix]) {
                continue;
            }

            for (let dz = -r; dz <= r; dz++) {
                const dzSq = dz * dz;
                const distSq = dxSq + dzSq;
                if (distSq > maxRadiusSq) continue;

                let iz = Math.floor(centerZ + dz);
                if (iz < 0 || iz >= H) iz = ((iz % H) + H) % H;

                // Region Check
                if (sourceRegion > 0) {
                    const cData = this.grid[ix][iz];
                    if (cData && cData.regionId !== sourceRegion) {
                        continue;
                    }
                }

                const cell = entityGrid[ix][iz];
                if (!cell || cell.length === 0) {
                    continue;
                }

                const dist = Math.sqrt(distSq);

                for (let i = 0; i < cell.length; i++) {
                    const e = cell[i];
                    if (!e._spatial) continue;

                    let isMatch = (e._spatial.type === type);

                    // Wildcard: 'unit' matches all human units
                    if (!isMatch && type === 'unit') {
                        // EXPLICIT FILTER: Check against known non-human types
                        const sType = e._spatial.type;
                        // Removed 'sheep' from exclusion list so hunters/units can target them as neutral units
                        if (sType === 'building' || sType === 'cave' || sType === 'goblin' || sType === 'fish' || sType === 'bird') {
                            isMatch = false;
                        } else {
                            // Valid human unit (worker, soldier, knight, etc.) or neutral sheep
                            isMatch = true;
                        }
                    }

                    if (isMatch) {
                        if (e.isDead || e.isFinished) continue;

                        const score = costFn(e, dist);
                        if (score < bestScore) {
                            bestScore = score;
                            bestEntity = e;
                        }
                    }
                }
            }
        }
        return bestEntity;
    }

    initGrid() {
        this.grid = [];
        for (let x = 0; x < this.logicalWidth; x++) {
            this.grid[x] = [];
            for (let z = 0; z < this.logicalDepth; z++) {
                this.grid[x][z] = {
                    height: 0,
                    type: 'grass',
                    hasBuilding: false,
                    noise: (Math.random() - 0.5) * 0.05 // Pre-calculate noise
                };
            }
        }
    }

    initMeshes() {
        // Dispose existing if any
        if (this.geometry) this.geometry.dispose();
        if (this.mesh) {
            this.scene.remove(this.mesh);
            if (this.mesh.material) {
                if (Array.isArray(this.mesh.material)) this.mesh.material.forEach(m => m.dispose());
                else this.mesh.material.dispose();
            }
        }
        if (this.waterMesh) {
            this.scene.remove(this.waterMesh);
            if (this.waterMesh.geometry) this.waterMesh.geometry.dispose();
            if (this.waterMesh.material) {
                const materials = Array.isArray(this.waterMesh.material) ? this.waterMesh.material : [this.waterMesh.material];
                materials.forEach((m: any) => {
                    if (m.dispose) m.dispose();
                });
            }
        }

        this.width = this.logicalWidth * 3;
        this.depth = this.logicalDepth * 3;

        // 1. Create Single Large Geometry
        this.geometry = new THREE.PlaneGeometry(this.width, this.depth, this.width, this.depth);
        const count = this.geometry.attributes.position.count;
        this.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

        const posAttr = this.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const x = posAttr.getX(i);
            const y = posAttr.getY(i);
            const offsets = this.getVisualOffset(x, y);
            posAttr.setX(i, x + offsets.x);
            posAttr.setY(i, y + offsets.y);
        }
        posAttr.needsUpdate = true;

        this.createMesh();
        this.createWater();
    }

    initTerrain() {
        this.initGrid();
        this.initMeshes();
        // this.generateRandomTerrain(); // DEFERRED: Call manually in Start/Regen to prevent load freeze
    }

    async generateRandomTerrain(isPreview = false, genParams: any = null, seed: number | null = null) {
        // Use a random offset so every reload is different, unless seed is provided
        this.seed = seed !== null ? seed : Math.random();
        const intSeed = Math.floor(this.seed * 2147483647);
        this.initRNG(intSeed); // Initialize seeded RNG logic
        console.log(`[Terrain] DETERMINISM: generateRandomTerrain seed=${this.seed.toFixed(6)} intSeed=${intSeed} rngState=${this.rngState}`);

        this.lastYieldTime = performance.now(); // Reset Yield Timer

        // Reset Grid (Clear previous buildings, flags, etc.)
        this.initGrid();

        // Populate Logical Grid
        for (let x = 0; x < this.logicalWidth; x++) {
            // Time Slicing to prevent freeze
            await this.checkYield();

            for (let z = 0; z < this.logicalDepth; z++) {
                // Normalize coordinates to 0..1 for seamless noise
                const u = x / this.logicalWidth;
                const v = z / this.logicalDepth;

                // Mapping Seeded Noise to 0..1 range
                // FBM typically lands in [0.2, 0.8] range. We map it to [0.0, 1.0].
                let rawN = this.seamlessFbm(u, v, this.seed);
                let n = (rawN - 0.2) / 0.6;
                n = Math.max(0, Math.min(1.0, n));

                const landRatio = (genParams && genParams.landRatio !== undefined) ? genParams.landRatio : 0.6;
                const seaLevel = 1.0 - landRatio;

                let height = 0;
                if (n >= seaLevel) {
                    // LAND CALCULATION
                    // Map [seaLevel, 1.0] to [0.0, 1.0] land progress
                    let landProgress = (n - seaLevel) / (1.0 - seaLevel);

                    // POWER CURVE: Make high peaks (Rock) rare and lowlands (Plains) broad.
                    // n^1.5 curve creates steeper mountains and flatter valleys.
                    let curvedProgress = Math.pow(landProgress, 1.6); // 1.6 is a good balance for RTS terrain

                    const rockHeight = (genParams && genParams.rockHeight !== undefined) ? genParams.rockHeight : 12;
                    height = curvedProgress * rockHeight;
                } else {
                    // SEA CALCULATION
                    // Map [0.0, seaLevel] to [-5, 0.0] depth range
                    let seaProgress = n / seaLevel;
                    height = (seaProgress - 1.0) * 5.0; // Max depth 5
                }

                height = Math.round(height); // Snap to step for logic and flat surfaces
                this.grid[x][z].height = height;

                // Moisture Map (Different seed)
                // Normalize 0..1
                let m = this.seamlessFbm(u, v, this.seed + 123.45);

                // PARAMETERIZED Moisture
                if (genParams && genParams.moistureBase !== undefined) {
                    // Shift moisture: base 0.5 -> target.
                    // If target 0.2 (Dry), we subtract 0.3?
                    // Let's Just Multiply? m * 2 * base?
                    // Better: m + (base - 0.5)
                    m += (genParams.moistureBase - 0.5);
                    m = Math.max(0, Math.min(1, m));
                }

                this.grid[x][z].moisture = m;
            }
        }

        this.updateMesh();
        await this.calculateRegions(); // Ensure regions are calculated (async if needed, or make async)

        // Generate Trees
        await this.generateTrees(isPreview, genParams);

        this.syncToWorker(); // Send initial data to worker
    }

    // Force set height (for spawn safety)
    setHeight(x: number, z: number, h: number) {
        if (x >= 0 && x < this.logicalWidth && z >= 0 && z < this.logicalDepth) {
            this.grid[x][z].height = h;
        }
    }

    async calculateRegions(useAsync = false) {
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        let currentRegion = 0;

        // Reset Regions
        for (let x = 0; x < W; x++) {
            for (let z = 0; z < D; z++) {
                this.grid[x][z].regionId = 0; // 0 = Water / Unprocessed
            }
        }

        // Flood Fill (Updated to 8-Way to match A* movement)
        const queue: { x: number, z: number }[] = [];
        const directions = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        // Yield interval for heavy calculation
        // const yieldInterval = 20; // Removed in favor of Time Slicing

        for (let x = 0; x < W; x++) {
            // Yield to main thread to prevent freeze (Only in Async Mode)
            if (useAsync) await this.checkYield();

            for (let z = 0; z < D; z++) {
                const startCell = this.grid[x][z];
                // If Land (>0) and not assigned logic region yet
                if (startCell.height > 0 && startCell.regionId === 0) {

                    currentRegion++;
                    startCell.regionId = currentRegion;
                    queue.push({ x, z });

                    while (queue.length > 0) {
                        const item = queue.pop();
                        if (!item) break;
                        const { x: cx, z: cz } = item;

                        for (const dir of directions) {
                            // Apply Wrapping
                            let nx = cx + dir.x;
                            let nz = cz + dir.z;

                            if (nx < 0) nx = W - 1;
                            if (nx >= W) nx = 0;
                            if (nz < 0) nz = D - 1;
                            if (nz >= D) nz = 0;

                            const neighbor = this.grid[nx][nz];
                            if (neighbor.height > 0 && neighbor.regionId === 0) {
                                // FIX: Check Slope Connectivity (Must match Pathfinding Limit 3.0)
                                // If slope is too steep, it's a separate region (unreachable)
                                const hDiff = Math.abs(neighbor.height - this.grid[cx][cz].height); // Compare with current cell
                                if (hDiff <= 3.0) {
                                    neighbor.regionId = currentRegion;
                                    queue.push({ x: nx, z: nz });
                                }
                            }
                        }
                    }
                }
            }
        }
        // console.log(`[Terrain] Regions Calculated: ${currentRegion} islands found.`);
        this.updateColors(); // Optional debug visual
    }

    syncToWorker() {
        if (!this.worker) return;

        // Flatten HeightMap & MoistureMap
        const W = this.logicalWidth;
        const H = this.logicalDepth;
        const data = new Int16Array(W * H);
        const moistureData = new Float32Array(W * H); // Use Float for precision

        for (let z = 0; z < H; z++) {
            for (let x = 0; x < W; x++) {
                if (this.grid[x] && this.grid[x][z]) {
                    data[z * W + x] = this.grid[x][z].height;
                    moistureData[z * W + x] = this.grid[x][z].moisture || 0.5;
                }
            }
        }

        // Transfer buffer for speed
        // Note: we can't easily transfer both if they are separate without copy logic, 
        // but simple postMessage with transfer list is fine.
        this.worker.postMessage({
            type: 'INIT',
            payload: { w: W, h: H, data: data, moistureData: moistureData }
        }, [data.buffer, moistureData.buffer]);

        console.log("[Terrain] Synced Grid to Pathfinding Worker.");

        // Also buffer region updates? 
        // Currently A* uses pure height/slope, so regions aren't strictly needed for pathing,
        // but might be useful later.
    }

    updateWorkerCell(x, z, h, m) {
        if (!this.worker) return;
        this.worker.postMessage({
            type: 'UPDATE_CELL',
            payload: { x, z, h, m }
        });
    }

    // Helper: Find a valid tile in the specified region closest to target (x,z)
    // Used for "Near Reachable" checks (e.g. Unit wants to help Squad but target is on another island/bridge)
    findClosestReachablePoint(targetX, targetZ, regionId, maxRadius = 10) {
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        const cx = Math.round(targetX);
        const cz = Math.round(targetZ);

        // Spiral Search
        // Since we want CLOSEST, outward spiral is best.
        let bestX = -1;
        let bestZ = -1;
        // Optimization: Just scan box? Spiral is better for "closest".
        // Simple BFS-like expansion

        // Check center first
        if (this.canAccess(cx, cz, regionId)) return { x: cx, z: cz };

        for (let r = 1; r <= maxRadius; r++) {
            for (let i = -r; i <= r; i++) {
                // Top/Bottom rows
                if (this.canAccess(cx + i, cz - r, regionId)) return { x: this.wrap(cx + i, W), z: this.wrap(cz - r, D) };
                if (this.canAccess(cx + i, cz + r, regionId)) return { x: this.wrap(cx + i, W), z: this.wrap(cz + r, D) };
                // Left/Right columns (excluding corners checked above)
                if (i > -r && i < r) {
                    if (this.canAccess(cx - r, cz + i, regionId)) return { x: this.wrap(cx - r, W), z: this.wrap(cz + i, D) };
                    if (this.canAccess(cx + r, cz + i, regionId)) return { x: this.wrap(cx + r, W), z: this.wrap(cz + i, D) };
                }
            }
        }
        return null;
    }

    canAccess(x, z, regionId) {
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        const wx = ((x % W) + W) % W;
        const wz = ((z % D) + D) % D;

        if (this.grid[wx] && this.grid[wx][wz]) {
            // Check Match
            // Note: regionId 0 is water. If input regionId > 0, we need strict match.
            return this.grid[wx][wz].regionId === regionId;
        }
        return false;
    }

    wrap(val, max) {
        return ((val % max) + max) % max;
    }



    updateMesh() {
        if (!this.geometry) return;
        const positions = this.geometry.attributes.position.array;

        // Loop through all vertices of the Super-Grid
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1]; // PlaneGeometry is XY

            // Map local position to Super-Grid coordinates (0..120)
            // Plane is centered, so x is -60 to 60.
            const gx = Math.round(x + this.width / 2);
            const gy = Math.round(-y + this.depth / 2);

            // Map to Logical Grid (0..40) with wrapping
            // We want the center of the supergrid to map to the logical grid nicely.
            // But since it's a tiling, simple modulo works.
            const lx = ((gx % this.logicalWidth) + this.logicalWidth) % this.logicalWidth;
            const lz = ((gy % this.logicalDepth) + this.logicalDepth) % this.logicalDepth;

            if (this.grid[lx] && this.grid[lx][lz]) {
                positions[i + 2] = this.grid[lx][lz].height;
            }
        }

        if (this.geometry) {
            this.geometry.attributes.position.needsUpdate = true;
            // Native smooth normals work perfectly on a continuous mesh!
            this.geometry.computeVertexNormals();
        }
    }

    createMesh() {
        if (this.mesh) this.scene.remove(this.mesh);
        this.meshes = [];

        const material = new THREE.MeshLambertMaterial({
            vertexColors: true,
            flatShading: false, // Smooth shading
            clippingPlanes: this.clippingPlanes,
            clipShadows: false
        });

        if (!this.geometry) return;
        this.mesh = new THREE.Mesh(this.geometry, material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.set(0, 0, 0); // Centered
        this.mesh.receiveShadow = true; // Enable shadows on terrain!

        // 1. Grid Lines (Gray) - User Request
        const gridGeo = new THREE.BufferGeometry();
        gridGeo.setAttribute('position', this.geometry.attributes.position);

        // Generate Custom Indices for Grid Lines (Horizontal and Vertical only)
        const indices: number[] = [];
        const cols = this.width + 1;
        const rows = this.depth + 1;

        for (let z = 0; z < rows; z++) {
            for (let x = 0; x < cols; x++) {
                const i = z * cols + x;
                if (x < this.width) indices.push(i, i + 1);
                if (z < this.depth) indices.push(i, i + cols);
            }
        }
        gridGeo.setIndex(indices);

        const gridMat = new THREE.LineBasicMaterial({
            color: 0x000000, // Back to Black
            transparent: true,
            opacity: 0.15,   // Original opacity
            clippingPlanes: this.clippingPlanes
        });

        this.gridLinesMesh = new THREE.LineSegments(gridGeo, gridMat);
        this.gridLinesMesh.position.set(0, 0, 0.04); // Slightly below dots
        this.gridLinesMesh.visible = false; // Start hidden by default
        this.mesh.add(this.gridLinesMesh);

        // 2. Grid Dots (Matching Lines)
        const dotsMaterial = new THREE.PointsMaterial({
            color: 0x000000, // Match Grid (Black)
            size: 0.15,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.2,    // Subtle dots
            clippingPlanes: this.clippingPlanes
        });

        // We can reuse the main geometry directly because it has vertices at grid intersections
        this.gridDotsMesh = new THREE.Points(this.geometry, dotsMaterial);
        this.gridDotsMesh.position.set(0, 0, 0.05); // Slight lift to avoid Z-fighting
        this.gridDotsMesh.visible = false; // Start hidden by default

        this.mesh.add(this.gridDotsMesh);

        if (this.mesh) {
            const s = this.scene || (window as any).game?.scene;
            if (s && s.add) {
                s.add(this.mesh);
                this.meshes.push(this.mesh);
            } else {
                console.warn("[Terrain] No scene to add mesh to!");
            }
        }
    }

    createWater() {
        if (this.waterMesh) this.scene.remove(this.waterMesh);

        const waterGeo = new THREE.PlaneGeometry(this.width, this.depth);
        const waterMat = new THREE.MeshLambertMaterial({
            color: 0x1E90FF,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide,
            clippingPlanes: this.clippingPlanes,
            clipShadows: false
        });

        this.waterMesh = new THREE.Mesh(waterGeo, waterMat);
        this.waterMesh.rotation.x = -Math.PI / 2;
        this.waterMesh.position.set(0, 0.2, 0); // Slightly above 0

        const s = this.scene || (window as any).game?.scene;
        if (s && s.add) {
            s.add(this.waterMesh);
        }
    }

    updateLights(gameTime) {
        // Simple IsNight verification (match Game.js logic approx)
        // Game.js: >= 18 || < 6
        const isNight = (gameTime >= 18 || gameTime < 6);

        if (this._lastIsNight !== isNight) {
            this._lastIsNight = isNight;
            this.updateColors(isNight);
            console.log(`Terrain: Night Lights Update. Night=${isNight}`);
        }
    }

    setSeason(season: string) {
        if (this.currentSeason === season) return;
        this.currentSeason = season;
        this.colorsDirty = true;

        // Update weather if available
        if (this.weatherManager && this.weatherManager.setSeason) {
            this.weatherManager.setSeason(season);
        }

        // Trigger colors update (compatibility with legacy calls)
        this.updateColors(this.isNight);

        console.log(`[Terrain] Season set to: ${season}`);
    }


    // SHARED HELPER for Main View & Minimap
    isReachable(sx, sz, tx, tz) {
        const startCell = this.grid[sx % this.logicalWidth][sz % this.logicalDepth];
        const targetCell = this.grid[tx % this.logicalWidth][tz % this.logicalDepth];
        if (!startCell || !targetCell) return false;

        // If target is water (height <= 0), it doesn't have a regionId (0).
        // We check if it's adjacent to the starter's region.
        if (targetCell.height <= 0) {
            const directions = [
                { x: 1, z: 0 }, { x: -1, z: 0 },
                { x: 0, z: 1 }, { x: 0, z: -1 },
                { x: 1, z: 1 }, { x: 1, z: -1 },
                { x: -1, z: 1 }, { x: -1, z: -1 }
            ];
            for (const dir of directions) {
                let nx = (tx + dir.x + this.logicalWidth) % this.logicalWidth;
                let nz = (tz + dir.z + this.logicalDepth) % this.logicalDepth;
                const neighbor = this.grid[nx][nz];
                if (neighbor && neighbor.regionId === startCell.regionId) {
                    return true;
                }
            }
            return false;
        }

        return startCell.regionId === targetCell.regionId;
    }

    updateColors(isNight = false) {
        const season = this.currentSeason || 'Spring';
        if (!this.geometry) return;

        const count = this.geometry.attributes.position.count;
        const colorAttr = this.geometry.attributes.color;
        const width = this.logicalWidth;
        const depth = this.logicalDepth;

        // Visual Params
        const isWinter = season === 'Winter';

        // Pre-calculate random noise function to avoid Math.random() in loop if possible
        // But for static terrain, deterministic hash is better.
        const seed = this.seed + 9999;

        for (let i = 0; i < count; i++) {
            // Mapping from PlaneGeometry vertex index to Grid Coordinate
            const x = this.geometry.attributes.position.getX(i);
            const z = this.geometry.attributes.position.getY(i); // Plane is XY

            // Convert to Logical Grid (Approximate for Visuals)
            let lx = Math.floor((x + width / 2));
            let lz = Math.floor((-z + depth / 2)); // z is -y in plane

            // Clamp / Wrap
            lx = ((lx % width) + width) % width;
            lz = ((lz % depth) + depth) % depth;

            // Get Neighbors for Curvature
            const cell = this.grid[lx][lz];

            // Safety check
            if (cell) {
                const height = cell.height;
                const moisture = cell.moisture || 0.5;
                const noise = cell.noise;

                // 1. Base Color
                const baseColor = this.getBiomeColor(height, moisture, noise, isNight, season, lx, lz);

                // 2. Micro-Noise (Texture)
                // Deterministic random using coordinates
                // simple hash
                const noiseVal = ((Math.sin(lx * 12.9898 + lz * 78.233 + seed) * 43758.5453) % 1);
                // Range 0.96 to 1.04 (Multiplicative)
                // This scales brightness without washing out color (unlike adding white)
                const noiseScale = 1.0 + (noiseVal - 0.5) * 0.08;

                // 3. Curvature (Pseudo-AO / Ridge Highlight)
                // Get neighbors (wrapping)
                const nN = this.grid[lx][(lz - 1 + depth) % depth]?.height ?? height;
                const nS = this.grid[lx][(lz + 1) % depth]?.height ?? height;
                const nE = this.grid[(lx + 1) % width][lz]?.height ?? height;
                const nW = this.grid[(lx - 1 + width) % width][lz]?.height ?? height;

                // Laplacian (Curvature)
                // Positive = Peak/Ridge (Convex) -> Lighten
                // Negative = Valley/Bowl (Concave) -> Darken
                const curvature = (height * 4) - (nN + nS + nE + nW);
                const curvatureStrength = 0.05; // Tunable
                // Multiplicative factor: 1.0 +/- adjustment
                const curveScale = 1.0 + (curvature * curvatureStrength);

                // Apply adjustments via Multiplication (Preserves Hue/Saturation better)
                // Combine scales
                const totalScale = noiseScale * curveScale;

                baseColor.r = THREE.MathUtils.clamp(baseColor.r * totalScale, 0, 1);
                baseColor.g = THREE.MathUtils.clamp(baseColor.g * totalScale, 0, 1);
                baseColor.b = THREE.MathUtils.clamp(baseColor.b * totalScale, 0, 1);

                colorAttr.setXYZ(i, baseColor.r, baseColor.g, baseColor.b);
            }
        }
        colorAttr.needsUpdate = true;
    }

    async generateTrees(isPreview = false, genParams: any = null) {
        // Preview Optimization: Sync with normal or use genParams density
        const densityFactor = (genParams && genParams.treeDensity !== undefined) ? genParams.treeDensity : 1.0;

        for (let x = 0; x < this.logicalWidth; x++) {
            // Time Slicing
            await this.checkYield();

            for (let z = 0; z < this.logicalDepth; z++) {
                this.generateTreesAt(x, z, densityFactor);
            }
        }
        console.log(`[Terrain] Generated ${this.trees.length} trees (Preview=${isPreview}, Density=${densityFactor}).`);
    }

    /**
     * Helper: Generate trees on a specific tile based on biome rules
     */
    generateTreesAt(x: number, z: number, densityFactor: number = 1.0) {
        const cell = this.grid[x][z];
        if (!cell) return;

        // STRICT BIOME CHECK
        // Forest is strictly Height 4-9 AND Moisture >= 0.45
        const h = cell.height;
        const m = (cell.moisture !== undefined) ? cell.moisture : 0.5;

        if (h < 4.0) return;   // Eliminate Plains (<= 4.0)
        if (h > 9.0) return;   // Eliminate Rock (> 9.0)
        if (m < 0.45) return;  // Eliminate Desert/Drylands

        // Density Check (Deterministic using seed + offset)
        const dRand = this.random(x, z, this.seed + 500);
        if (dRand > densityFactor) return;

        // Increased density (User Request) - Deterministic
        const countRand = this.random(x, z, this.seed + 600);
        const treeCount = countRand < 0.3 ? 2 : (countRand < 0.9 ? 1 : 0);

        for (let i = 0; i < treeCount; i++) {
            // Offset per i to differentiate multiple trees on same tile
            const ix = this.random(x + i, z, this.seed + 700);
            const iz = this.random(x, z + i, this.seed + 800);
            const rot = this.random(x + i, z + i, this.seed + 900);
            const sc = this.random(z + i, x + i, this.seed + 1000);

            this.trees.push({
                gridX: x + ix,
                gridZ: z + iz,
                rotationY: rot * Math.PI * 2,
                scale: 1.5 + sc * 1.0 // 1.5 ~ 2.5
            });
        }
    }

    getBiomeColor(height: number, moisture: number, noise: number, isNight: boolean, season: string, lx: number, lz: number, forMinimap: boolean = false, targetColor: THREE.Color | null = null) {
        const color = targetColor || new THREE.Color();

        // Cached Colors initialization (Lazy)
        if (!this._biomeColors) {
            this._biomeColors = {
                water: new THREE.Color(0x00BFFF),
                deepWater: new THREE.Color(0x00008B),
                winterGrass: new THREE.Color(0xBDB76B),
                winterGrassMix: new THREE.Color(0xA09A5A),
                summerGrass: new THREE.Color(0x00A850),
                springGrass: new THREE.Color(0x88DD88),
                winterForest: new THREE.Color(0xFFFFFF),
                winterForestMix: new THREE.Color(0xEEF5FF),
                autumnForest: new THREE.Color(0x228B22), // Restore Original Green
                deepForest: new THREE.Color(0x006400),
                rock: new THREE.Color(0x808080),
                rockMix: new THREE.Color(0x606060),
                sand: new THREE.Color(0xF4A460),
                swamp: new THREE.Color(0x2F4F4F),
                swampAutumn: new THREE.Color(0x4B3621)
            };
        }
        const C = this._biomeColors;

        // 1. Water Logic (Minimap Only - or if wanted visually)
        // User requested removing blue overlay from main terrain, BUT Minimap needs to show Water.
        if (forMinimap && height <= 0) {
            let depthConfig = Math.min(1.0, Math.abs(height) / 5.0);
            color.copy(C.water).lerp(C.deepWater, depthConfig * 0.5);
            return color;
        }

        // 2. Standard Terrain Logic (Height & Season) - Base Color
        // FIXED THRESHOLDS: Beach <= 1.0, Plains <= 4.0, Forest <= 9.0, Rock > 9.0

        const brightSand = C.sand.clone().lerp(new THREE.Color(0xFFFFFF), 0.5);
        const springGrass = C.springGrass;
        const summerGrass = C.summerGrass;
        const winterGrass = C.winterGrass;

        if (height <= 0.0) {
            // DEEP BEACH / UNDERWATER
            color.copy(brightSand);
            if (season === 'Winter') color.lerp(new THREE.Color(0xFFFFFF), 0.5);
        } else if (height === 1.0) {
            // COASTLINE BLEND (The actual "Beach" look)
            // 50% Sand, 50% Grass. This creates a narrow transition.
            let grassCol = (season === 'Summer') ? summerGrass : (season === 'Winter' ? winterGrass : springGrass);
            color.copy(brightSand).lerp(grassCol, 0.5);
            if (season === 'Winter') color.lerp(new THREE.Color(0xFFFFFF), 0.2);
        } else if (height <= 4.0) {
            // Grass / Plains
            if (season === 'Winter') {
                color.copy(C.winterGrass);
                const n = (noise + 1) * 0.5;
                color.lerp(C.winterGrassMix, n * 0.2);
            } else if (season === 'Summer') {
                color.copy(C.summerGrass);
            } else {
                color.copy(C.springGrass); // Spring/Autumn/Default
            }
        } else if (height <= 9.0) {
            // Forest
            if (season === 'Winter') {
                color.copy(C.winterForest);
                const n = (noise + 1) * 0.5;
                color.lerp(C.winterForestMix, n * 0.1);
            } else if (season === 'Summer') {
                color.copy(C.deepForest);
            } else {
                color.copy(C.autumnForest); // Autumn/Default
            }
        } else {
            // Rock
            color.copy(C.rock);
            const n = (noise + 1) * 0.5;
            color.lerp(C.rockMix, n * 0.2);
        }

        // 3. Special Biome Logic (Desert / Swamp)

        // Desert (Sand)
        // Reform: Reduced max moisture for desert from 0.5 to 0.3.
        if (moisture < 0.3 && height <= 8) {
            let sandFactor = 1.0;
            // Fade out from 0.2 to 0.3
            if (moisture > 0.2) sandFactor = 1.0 - ((moisture - 0.2) / 0.1);
            color.lerp(C.sand, sandFactor);
        }

        // Swamp
        // Reform: 
        // 1. Lower bound > 2.5 matches user request to clear coast (0-2.5 kept as Grass/Forest).
        // 2. Upper bound <= 10 (was 3) to spread swamp inland into forest, avoiding "ring around the coast" effect.
        if (moisture > 0.8 && height > 2.5 && height <= 10) {
            let moistFade = Math.min(1.0, Math.max(0, (moisture - 0.8) / 0.1));
            // Removed steep height fade at top, just fade at bottom if needed

            if (season === 'Autumn') {
                color.lerp(C.swampAutumn, moistFade);
            } else {
                color.lerp(C.swamp, moistFade);
            }
        }

        // (Removed complex neighbor check for beach, now based on height 0-1 gradient)

        // 4. Night Mode
        if (isNight) {
            const hsl = { h: 0, s: 0, l: 0 };
            color.getHSL(hsl);
            hsl.l *= 0.3; // Dim
            color.setHSL(hsl.h, hsl.s, hsl.l);
        }

        return color;
    }

    modifyMoisture(gx, gz, amount) {
        const lx = ((gx % this.logicalWidth) + this.logicalWidth) % this.logicalWidth;
        const lz = ((gz % this.logicalDepth) + this.logicalDepth) % this.logicalDepth;

        if (this.grid[lx] && this.grid[lx][lz]) {
            const cell = this.grid[lx][lz];
            cell.moisture = Math.max(0, Math.min(1, (cell.moisture || 0.5) + amount));
            this.updateColorAt(lx, lz);
        }
    }

    updateColorAt(gridX, gridZ) {
        if (!this.geometry) return;
        const isNight = this._lastIsNight || false;
        const season = this.currentSeason || 'Spring';
        const colorAttr = this.geometry.attributes.color;
        const W = this.logicalWidth;
        const H = this.logicalDepth;
        const cols = W + 1; // 161 (0..160)

        // Candidates logic for wrapping seams
        const candidates = [{ x: gridX, z: gridZ }];
        if (gridX === 0) candidates.push({ x: W, z: gridZ });
        if (gridZ === 0) candidates.push({ x: gridX, z: H });
        if (gridX === 0 && gridZ === 0) candidates.push({ x: W, z: H });

        candidates.forEach(pos => {
            const index = pos.z * cols + pos.x;
            if (index < 0 || index >= colorAttr.count) return;

            const lx = pos.x % W;
            const lz = pos.z % H;

            if (this.grid[lx] && this.grid[lx][lz]) {
                const cell = this.grid[lx][lz];
                const height = cell.height;
                const noise = cell.noise;
                const moisture = cell.moisture || 0.5;

                // USE HELPER
                const color = this.getBiomeColor(height, moisture, noise, isNight, season, lx, lz);

                colorAttr.setXYZ(index, color.r, color.g, color.b);
            }
        });
        colorAttr.needsUpdate = true;
    }

    modifyHeight(startX, startZ, amount) {
        let totalChange = 0;
        // Queue for propagation
        const queue: { x: number; z: number }[] = [];
        const affectedTiles = new Set<string>();

        // Helper to get wrapped coordinates
        const getWrapped = (x, z) => {
            return {
                x: (x + this.logicalWidth) % this.logicalWidth,
                z: (z + this.logicalDepth) % this.logicalDepth
            };
        };

        // Initial modification
        const start = getWrapped(startX, startZ);
        if (this.grid[start.x] && this.grid[start.x][start.z]) {
            this.grid[start.x][start.z].height += amount;
            this.updateWorkerCell(start.x, start.z, this.grid[start.x][start.z].height, this.grid[start.x][start.z].moisture || 0.5); // SYNC
            totalChange += Math.abs(amount);
            queue.push(start);
            affectedTiles.add(`${start.x},${start.z}`);
        }

        // Propagate
        let head = 0;
        while (head < queue.length) {
            const current = queue[head++];
            const cx = current.x;
            const cz = current.z;
            const cell = this.grid[cx][cz];
            const currentHeight = cell.height;

            // Destroy building if present
            if (cell.hasBuilding && cell.building) {
                // Fix: Caves float/adapt to terrain
                if (cell.building.userData.type === 'cave') {
                    cell.building.y = currentHeight;
                    cell.building.userData.y = currentHeight;
                } else {
                    this.removeBuilding(cell.building);
                }
            }

            const neighbors = [
                { x: cx + 1, z: cz },
                { x: cx - 1, z: cz },
                { x: cx, z: cz + 1 },
                { x: cx, z: cz - 1 }
            ];

            for (const n of neighbors) {
                const nw = getWrapped(n.x, n.z);
                const neighborCell = this.grid[nw.x][nw.z];
                const neighborHeight = neighborCell.height;

                const diff = currentHeight - neighborHeight;

                // If difference > 1, pull neighbor UP
                if (diff > 1) {
                    const newH = currentHeight - 1;
                    totalChange += Math.abs(newH - neighborHeight);
                    neighborCell.height = newH;
                    this.updateWorkerCell(nw.x, nw.z, newH, neighborCell.moisture || 0.5); // SYNC
                    queue.push(nw);
                    affectedTiles.add(`${nw.x},${nw.z}`);
                }
                // If difference < -1, push neighbor DOWN (if we lowered the center)
                else if (diff < -1) {
                    const newH = currentHeight + 1;
                    totalChange += Math.abs(newH - neighborHeight);
                    neighborCell.height = newH;
                    this.updateWorkerCell(nw.x, nw.z, newH, neighborCell.moisture || 0.5); // SYNC
                    queue.push(nw);
                    affectedTiles.add(`${nw.x},${nw.z}`);
                }
            }
            // Check for building destruction on affected tiles
            // Affected tiles are those sharing the vertex (cx, cz)
            // (cx-1, cz-1), (cx, cz-1), (cx-1, cz), (cx, cz)
            // We need to check if any building on these tiles is still valid (flat)

            const checkTiles = [
                { x: (cx - 1 + this.logicalWidth) % this.logicalWidth, z: (cz - 1 + this.logicalDepth) % this.logicalDepth },
                { x: cx, z: (cz - 1 + this.logicalDepth) % this.logicalDepth },
                { x: (cx - 1 + this.logicalWidth) % this.logicalWidth, z: cz },
                { x: cx, z: cz }
            ];

            // Centralized Integrity Check
            checkTiles.forEach(t => {
                const cell = this.grid[t.x][t.z];
                if (cell.hasBuilding && cell.building) {
                    if (!this.checkBuildingIntegrity(cell.building)) {
                        this.removeBuilding(cell.building);
                    }
                }
            });
        }

        // Remove trees from all affected tiles
        this.removeTreesByTiles(affectedTiles);

        // Regenerate trees on affected tiles (especially for preview mode or immediate feedback)
        // Note: We use density 1.0 for manual modification usually, 
        // but if game is not active (preview), use the density factor or just generate.
        const isPreview = !(window as any).game || !(window as any).game.gameActive;
        const dFactor = isPreview ? 0.1 : 1.0;

        affectedTiles.forEach(key => {
            const [x, z] = key.split(',').map(Number);
            this.generateTreesAt(x, z, dFactor);
        });

        this.updateMesh();
        this.updateColors();
        this.needsRegionRecalc = true; // Set flag for deferred recalculation

        return totalChange;
    }

    getTileHeight(x, z) {
        const lx = (Math.floor(x) + this.logicalWidth) % this.logicalWidth;
        const lz = (Math.floor(z) + this.logicalDepth) % this.logicalDepth;
        if (this.grid[lx] && this.grid[lx][lz]) {
            const h = this.grid[lx][lz].height;
            return h;
        }
        return 0;
    }

    getMoisture(x, z) {
        const lx = (Math.floor(x) + this.logicalWidth) % this.logicalWidth;
        const lz = (Math.floor(z) + this.logicalDepth) % this.logicalDepth;
        if (this.grid[lx] && this.grid[lx][lz]) {
            return this.grid[lx][lz].moisture || 0.5;
        }
        return 0.5;
    }

    getBuildingAt(x, z) {
        // Search buildings list for exact match
        // Or check grid? Grid also has .building property
        const lx = (Math.round(x) + this.logicalWidth) % this.logicalWidth;
        const lz = (Math.round(z) + this.logicalDepth) % this.logicalDepth;

        if (this.grid[lx] && this.grid[lx][lz] && this.grid[lx][lz].building) {
            return this.grid[lx][lz].building;
        }
        return null; // or scan this.buildings if grid logic unreliable?
    }



    // Helper for Visual Alignment
    getVisualOffset(localX, localY) {
        // Suppress visual distortion under buildings
        if (this.grid) {
            const W = this.logicalWidth || 160;
            const D = this.logicalDepth || 160;

            // Map Plane Coords to Grid
            const gx = Math.round(localX + W / 2);
            const gz = Math.round(-localY + D / 2);

            const lx = ((gx % W) + W) % W;
            const lz = ((gz % D) + D) % D;

            if (this.grid[lx] && this.grid[lx][lz] && this.grid[lx][lz].hasBuilding) {
                return { x: 0, y: 0 };
            }
        }

        // Periodic Distortion (Seamless)
        // W = 160 (logicalWidth) * 3 typically? No, logicalWidth is 160.
        // Plane is 3x width? No, logicalWidth is used for wrapping.
        // We want period = logicalWidth.
        const W = this.logicalWidth || 80;
        const D = this.logicalDepth || 80;

        const freqX = (Math.PI * 2) / W;
        const freqZ = (Math.PI * 2) / D;

        // Use higher harmonic to match original "0.4" approx density
        // 0.4 approx 8 * 2PI/160 (0.31). Let's use integer Multiplier.
        // x * freqX * 10 -> 10 waves per map.

        const phaseX = localX * freqX * 10;
        const phaseY = localY * freqZ * 10;

        // Original: (sin(y*0.5) + cos(x*0.4)) * 0.2
        const offsetX = (Math.sin(phaseY) + Math.cos(phaseX)) * 0.2;
        const offsetY = (Math.cos(phaseY) + Math.sin(phaseX)) * 0.2;

        return { x: offsetX, y: offsetY };
    }

    getVisualPosition(gridX, gridZ, isCentered = true) {
        // Convert Grid Coord -> Physical World Coord (including distortion)
        const logicalW = this.logicalWidth || 80;
        const logicalD = this.logicalDepth || 80;

        // Base Coordinate
        // If isCentered is true, we add 0.5 to move to tile center.
        // If false, we stay at integer coordinate (Vertex/Corner).
        const offset = isCentered ? 0.5 : 0.0;

        const rawX = (gridX - logicalW / 2) + offset;
        const rawZ = (gridZ - logicalD / 2) + offset;

        // In PlaneGeometry local space (before rotation -PI/2):
        // x = rawX
        // y = -rawZ
        const planeX = rawX;
        const planeY = -rawZ;

        const offsets = this.getVisualOffset(planeX, planeY);

        // Apply offsets
        const visualX = rawX + offsets.x;
        const visualZ = rawZ - offsets.y;

        // Get Height
        const h = this.getTileHeight(gridX, gridZ);

        return { x: visualX, y: h, z: visualZ };
    }

    getInterpolatedHeight(x, z) {
        // Wrap coordinates to positive range first
        let wx = (x % this.logicalWidth + this.logicalWidth) % this.logicalWidth;
        let wz = (z % this.logicalDepth + this.logicalDepth) % this.logicalDepth;

        const x0 = Math.floor(wx);
        const z0 = Math.floor(wz);
        const x1 = (x0 + 1) % this.logicalWidth;
        const z1 = (z0 + 1) % this.logicalDepth;

        const dx = wx - x0;
        const dz = wz - z0;

        const h00 = this.grid[x0][z0].height;
        const h10 = this.grid[x1][z0].height;
        const h01 = this.grid[x0][z1].height;
        const h11 = this.grid[x1][z1].height;

        // Triangle Grid Interpolation (Matches PlaneGeometry triangulation)
        // Splits are typically along (0,1) -> (1,0) diagonal??
        // Default Three.js PlaneGeometry:
        // Quad vertices: (x,z), (x+1,z), (x,z+1), (x+1,z+1)
        // Indices usually: (TL, BL, TR) and (TR, BL, BR) ... wait.
        // Let's assume (0,0)-(1,0)-(0,1) is Tri 1 (Top-Left / Bottom-Left depending on coord system)
        // And (1,0)-(1,1)-(0,1) is Tri 2.

        // This corresponds to checking if dx + dz <= 1

        // However, Three.js coordinates (X, -Z) in PlaneGeometry? 
        // Let's assume standard Grid logic:
        // h00 (0,0), h10 (1,0), h01 (0,1), h11 (1,1)

        // Bilinear Interpolation
        // More robust against triangle splitting differences and produces smoother internal movement.
        // H(x,z) = (1-x)(1-z)h00 + x(1-z)h10 + (1-x)z h01 + xz h11

        const w00 = (1 - dx) * (1 - dz);
        const w10 = dx * (1 - dz);
        const w01 = (1 - dx) * dz;
        const w11 = dx * dz;

        const h = (h00 * w00) + (h10 * w10) + (h01 * w01) + (h11 * w11);

        return h;
    }



    // Accurate Height Calculation for Visual Mesh
    getVisualHeight(vx, vz) {
        const W = this.logicalWidth;
        const D = this.logicalDepth;

        // vx, vz are in World Coordinates (centered, e.g. -80 to 80)
        // Convert to Logical Grid Coordinates (0 to 160) for finding grid index
        // FIX: Account for Centered Origin (-W/2) -> Grid 0
        let wx = ((vx + W / 2) % W + W) % W;
        let wz = ((vz + D / 2) % D + D) % D;

        const gx = Math.floor(wx);
        const gz = Math.floor(wz);

        // Search 2x2 neighborhood
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const cx = (gx + i + W) % W;
                const cz = (gz + j + D) % D;

                // Get 4 corners in World Coordinates
                let p00 = this.getVisualPosition(cx, cz, false);
                let p10 = this.getVisualPosition(cx + 1, cz, false); // Intentionally not wrapping input to preserve continuity if possible? 
                // Wait, getVisualPosition handles wrapping internally based on input grid indices?
                // Actually getVisualPosition(160) -> returns coordinates for 160 (which is 80 world).
                // But getVisualPosition takes gridX.
                // We must handle wrapping carefully.
                // Let's rely on Unwrapping relative to Input vx, vz.

                // However, getVisualPosition(cx, ...) uses normalized cx (0..159).
                p00 = this.getVisualPosition(cx, cz, false);
                p10 = this.getVisualPosition(cx + 1, cz, false);
                const p01 = this.getVisualPosition(cx, cz + 1, false);
                const p11 = this.getVisualPosition(cx + 1, cz + 1, false);

                // Unwrap Triangle points to be near vx, vz
                const unwrap = (val, target, size) => {
                    let d = val - target;
                    while (d > size / 2) { val -= size; d -= size; }
                    while (d < -size / 2) { val += size; d += size; }
                    return val;
                };

                p00.x = unwrap(p00.x, vx, W);
                p00.z = unwrap(p00.z, vz, D);

                p10.x = unwrap(p10.x, vx, W);
                p10.z = unwrap(p10.z, vz, D);

                p01.x = unwrap(p01.x, vx, W);
                p01.z = unwrap(p01.z, vz, D);

                p11.x = unwrap(p11.x, vx, W);
                p11.z = unwrap(p11.z, vz, D);

                // Use vx, vz directly as they are the targets (World Coords)
                // Check Triangles
                if (this.isPointInTriangle(vx, vz, p00.x, p00.z, p10.x, p10.z, p01.x, p01.z)) {
                    return this.calcHeightFromTriangle(vx, vz, p00, p10, p01);
                }
                if (this.isPointInTriangle(vx, vz, p10.x, p10.z, p11.x, p11.z, p01.x, p01.z)) {
                    return this.calcHeightFromTriangle(vx, vz, p10, p11, p01);
                }
            }
        }

        // Fallback: Bilinear (Still might be slightly off due to visual offset, but better than 0 or integer snap)
        // Ensure we pass the Logic Coordinates (Float), not Grid Indices (Int), 
        // to get bilinear interpolation instead of stepping.
        return this.getInterpolatedHeight(wx, wz);
    }

    isPointInTriangle(px, pz, ax, az, bx, bz, cx, cz) {
        // Barycentric technique
        const v0x = cx - ax;
        const v0z = cz - az;
        const v1x = bx - ax;
        const v1z = bz - az;
        const v2x = px - ax;
        const v2z = pz - az;

        const dot00 = v0x * v0x + v0z * v0z;
        const dot01 = v0x * v1x + v0z * v1z;
        const dot02 = v0x * v2x + v0z * v2z;
        const dot11 = v1x * v1x + v1z * v1z;
        const dot12 = v1x * v2x + v1z * v2z;

        const invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        const v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        const EPSILON = 1e-6;
        return (u >= -EPSILON) && (v >= -EPSILON) && (u + v <= 1 + EPSILON);
    }

    calcHeightFromTriangle(x, z, pA, pB, pC) {
        // Plane equation from 3 points: Ax + By + Cz + D = 0
        // Normal vector N = (B-A) x (C-A)
        const v1x = pB.x - pA.x;
        const v1y = pB.y - pA.y;
        const v1z = pB.z - pA.z;

        const v2x = pC.x - pA.x;
        const v2y = pC.y - pA.y;
        const v2z = pC.z - pA.z;

        // Cross Product (Nx, Ny, Nz)
        const nx = v1y * v2z - v1z * v2y;
        const ny = v1z * v2x - v1x * v2z;
        const nz = v1x * v2y - v1y * v2x;

        // Plane: nx(x - Ax) + ny(y - Ay) + nz(z - Az) = 0
        // Solve for y:
        // ny(y - Ay) = -nx(x - Ax) - nz(z - Az)
        // y = Ay - (nx/ny)(x - Ax) - (nz/ny)(z - Az)

        if (Math.abs(ny) < 1e-5) return pA.y; // Vertical plane safeguard

        const y = pA.y - (nx / ny) * (x - pA.x) - (nz / ny) * (z - pA.z);
        return y;
    }

    raise(x, z) {
        this.invalidatePathCache();
        return this.modifyHeight(x, z, 1);
    }

    lower(x, z) {
        this.invalidatePathCache();
        return this.modifyHeight(x, z, -1);
    }

    // ...

    // Seamless Fractal Brownian Motion
    seamlessFbm(u, v, seed) {
        let total = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;

        for (let i = 0; i < 4; i++) {
            total += this.periodicNoise(u * frequency, v * frequency, frequency, seed) * amplitude;
            maxValue += amplitude;
            amplitude *= 0.5;
            frequency *= 2;
        }

        return total / maxValue;
    }

    periodicNoise(x, z, period, seed) {
        const scale = 5.0;
        const xx = x * scale;
        const zz = z * scale;
        const p = period * scale;

        const i = Math.floor(xx);
        const j = Math.floor(zz);
        const f = xx - i;
        const g = zz - j;

        const pi = Math.floor(p);
        const wrap = (v) => (v % pi + pi) % pi;

        const a = this.random(wrap(i), wrap(j), seed);
        const b = this.random(wrap(i + 1), wrap(j), seed);
        const c = this.random(wrap(i), wrap(j + 1), seed);
        const d = this.random(wrap(i + 1), wrap(j + 1), seed);

        const u = f * f * (3 - 2 * f);
        const v = g * g * (3 - 2 * g);

        return (1 - u) * (1 - v) * a +
            u * (1 - v) * b +
            (1 - u) * v * c +
            u * v * d;
    }

    /**
     * Efficiently raycast against the heightmap using ray marching.
     * Returns the intersection point {x, y, z} or null.
     */
    raycast(origin, direction) {
        // Step size (1.0 is grid size - optimized)
        const step = 1.0;
        const maxDist = 300; // View distance

        const pos = origin.clone();
        const dir = direction.clone().normalize();
        const check = new THREE.Vector3();

        for (let d = 0; d < maxDist; d += step) {
            check.copy(dir).multiplyScalar(d).add(origin);

            // Optimization
            if (check.y > 50) continue;
            if (check.y < -10) break; // Below ground

            // Refined Grid Mapping: (World 0,0 is Grid Center)
            const gx = check.x + this.logicalWidth / 2;
            const gz = check.z + this.logicalDepth / 2;

            const h_terrain = this.getInterpolatedHeight(gx, gz);

            if (check.y <= h_terrain) {
                check.y = h_terrain;
                return check;
            }
        }
        return null;
    }

    random(x, z, seed) {
        const sin = Math.sin(x * 12.9898 + z * 78.233 + seed) * 43758.5453123;
        return sin - Math.floor(sin);
    }

    addBuilding(type, gridX, gridZ, force = false, skipMeshUpdate = false, faction: string = 'player') {
        this.invalidatePathCache();

        // Use exact height
        if (!this.grid || !this.grid[gridX] || !this.grid[gridX][gridZ]) {
            console.warn(`[Terrain] addBuilding failed: Invalid Grid ${gridX},${gridZ}`);
            return null;
        }

        // Create Building
        const building = new Building(this.scene, this, type, gridX, gridZ);
        building.rotationY = Math.random() * Math.PI * 2;

        if (type === 'barracks' || type === 'tower') {
            if ((window as any).game && (window as any).game.registerSquad) {
                (building as any).userData.squadId = (window as any).game.registerSquad(type);
            }
        }

        building.userData.faction = faction;
        const size = this.getBuildingSize(type);

        if (!force && type !== 'cave') {
            const h = this.grid[gridX][gridZ].height;
            if (h > 12) {
                if (type === 'house' || type === 'farm' || type === 'barracks') {
                    return null;
                }
            }
        }

        this.clearArea(gridX, gridZ, size);
        this.flattenArea(gridX, gridZ, size);

        if (!force && type !== 'cave' && !this.checkFlatArea(gridX, gridZ, size)) {
            return null;
        }

        this.buildings.push(building);
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const x = (gridX + i) % W;
                const z = (gridZ + j) % D;
                this.grid[x][z].hasBuilding = true;
                this.grid[x][z].building = building;
            }
        }

        if (!skipMeshUpdate && !this.isRestoring) this.updateMesh();

        return building;
    }

    clearArea(gridX, gridZ, size) {
        // Remove any buildings in this area
        const buildingsToRemove = new Set<any>();
        const W = this.logicalWidth;
        const D = this.logicalDepth;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const x = (gridX + i) % W;
                const z = (gridZ + j) % D;
                const cell = this.grid[x][z];
                if (cell.hasBuilding && cell.building) {
                    buildingsToRemove.add(cell.building);
                }
            }
        }

        for (const b of buildingsToRemove) {
            console.log(`[Terrain] Clearing obstacle: ${b.type} for new construction.`);
            this.removeBuilding(b);
        }

        // Remove trees in the construction area
        if (!this.isRestoring) {
            this.removeTreesAt(gridX, gridZ, size);
        }
    }

    removeBuilding(building) {
        this.invalidatePathCache();
        if (!building) return;

        // 1. Remove from List
        let index = this.buildings.indexOf(building);

        if (index === -1) {
            console.log(`[Terrain] removeBuilding: Identity mismatch! searching by coord ${building.gridX},${building.gridZ} `);
            index = this.buildings.findIndex(b => b.gridX === building.gridX && b.gridZ === building.gridZ);
        }

        if (index > -1) {
            // Replace the passed object with the authoritative one from the list if different
            // This ensures strict equality checks later might succeed if we use the list one
            if (this.buildings[index] !== building) {
                console.log(`[Terrain] Swapping ghost building object for authoritative one.`);
                building = this.buildings[index];
            }
            this.buildings.splice(index, 1);
        } else {
            console.log(`[Terrain] removeBuilding: Failed to find in list! ${building.gridX},${building.gridZ} `);
            // Force removal even if not in list?
        }

        // 2. Clear Grid Cells
        const size = this.getBuildingSize(building.userData.type);
        const startX = building.gridX;
        const startZ = building.gridZ;
        const W = this.logicalWidth;
        const D = this.logicalDepth;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const x = (startX + i) % W;
                const z = (startZ + j) % D;
                if (this.grid[x] && this.grid[x][z]) {
                    const cell = this.grid[x][z];
                    // Relaxed Check: If cell references THIS building OR we just removed a building at this location
                    // actually, safely just check if it IS the building.
                    // If we swapped 'building' above, this check should pass.
                    if (cell.building === building) {
                        cell.hasBuilding = false;
                        cell.building = null;
                    } else if (cell.building && (
                        (cell.building.gridX === startX && cell.building.gridZ === startZ) ||
                        (cell.building.constructor === Object && cell.building.x === undefined) // Generic object check?
                    )) {
                        // Fallback: Coordinate Match (Ghost Busting)
                        console.warn(`[Terrain] Force clearing cell ${x},${z} (Identity Mismatch resolved)`);
                        cell.hasBuilding = false;
                        cell.building = null;
                    }
                }
            }
        }

        // 3. Remove from Spatial Grid
        if (this.entityGrid) {
            // Check if unregisterEntity exists, otherwise manual splice
            if (this.unregisterEntity) {
                this.unregisterEntity(building);
            } else {
                // Manual Fallback (Assume gridX/Z are valid)
                // This is unlikely to happen if unregisterEntity is defined above.
                // But for safety:
                const gx = Math.floor(building.userData.gridX); // or building.gridX
                const gz = Math.floor(building.userData.gridZ);
                if (this.entityGrid[gx] && this.entityGrid[gx][gz]) {
                    const idx = this.entityGrid[gx][gz].indexOf(building);
                    if (idx > -1) this.entityGrid[gx][gz].splice(idx, 1);
                }
            }
        }

        // 4. Mark as dead
        building.userData.isDead = true;
        building.userData.hp = 0; // Ensure units know it is destroyed

        console.log(`[Terrain] Building removed at ${startX},${startZ} `);
    }



    // --- Terrain Analysis ---
    // Helper: Centralize Building Size Logic
    getBuildingSize(type) {
        if (type === 'tower') return 3;
        if (type === 'barracks') return 3;
        if (type === 'farm') return 2;
        if (type === 'house') return 2;
        // goblin_hut = 1, cave = 1, default = 1
        return 1;
    }

    checkBuildingIntegrity(b) {
        if (!b) return false;

        // 1. Check Water (Drowning)
        const rootH = this.grid[b.gridX][b.gridZ].height;
        if (rootH <= 0) return false;

        // 2. Strict Check: Ground height must match Building creation height
        // This ensures buried/floating buildings (even 1x1) are destroyed.
        // Also destroys legacy buildings (undefined y) on terrain change.
        // Exception: Caves track terrain
        if (b.userData.type !== 'cave') {
            if (typeof b.y !== 'number' || Math.abs(rootH - b.y) > 0.1) {
                console.log(`[Terrain] Integrity Fail: Type = ${b.userData.type} RootH = ${rootH.toFixed(2)} b.y = ${b.y} (Height Mismatch)`);
                return false;
            }
        }

        // 2. Check Flatness based on Size
        const type = b.userData.type;
        const size = this.getBuildingSize(type);
        // goblin_hut = 1, cave = 1

        // CAVE EXEMPTION: Caves adapt to terrain, don't need flat ground
        if (type === 'cave') return true;

        // Use checkFlatArea but we need to check if existing building IS us.
        // checkFlatArea returns false if ANY building exists (including us).
        // So we copy logic but allow 'us'.

        // Actually, we just need to verify Vertex Flatness of the area.
        const W = this.logicalWidth;
        const D = this.logicalDepth;

        for (let i = 0; i <= size; i++) {
            for (let j = 0; j <= size; j++) {
                const nx = (b.gridX + i) % W;
                const nz = (b.gridZ + j) % D;
                const cell = this.grid[nx][nz];

                if (cell.height !== rootH) {
                    // console.log(`[Terrain] Integrity Fail: ${ type } at ${ b.gridX },${ b.gridZ } - Not Flat at ${ nx },${ nz } `);
                    return false;
                }
                if (cell.height <= 0) return false;
            }
        }
        return true;
    }

    checkFlatArea(x, z, size, tolerance = 0.1) {
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        if (!this.grid[x] || !this.grid[x][z]) return false;
        const h0 = this.grid[x][z].height;

        if (h0 <= 0) return false; // Cannot build on water
        if (this.grid[x][z].hasBuilding) return false;

        // Check Vertices (size + 1 for cell coverage? No, size 2 means 2x2 cells)
        // Actually typically Loop is 0..size-1 for Cells.
        // If size=2 (2x2 cells), we check vertices 0..2 (3x3 points)?
        // Or just check Cell heights?
        // Let's assume Cell Height Uniformity for now.

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const nx = (x + i) % W;
                const nz = (z + j) % D;
                const cell = this.grid[nx][nz];

                // Strict: Must be within tolerance of h0, not water
                if (Math.abs(cell.height - h0) > tolerance) return false;
                if (cell.height <= 0) return false;

                if (cell.hasBuilding) return false;
            }
        }
        return true;
    }

    // New: Flatten Area for construction
    flattenArea(x, z, size) {
        const h0 = this.grid[x][z].height;
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        let changed = false;

        for (let i = 0; i <= size; i++) {
            for (let j = 0; j <= size; j++) {
                const nx = (x + i) % W;
                const nz = (z + j) % D;
                const cell = this.grid[nx][nz];

                if (cell.height !== h0) {
                    cell.height = h0;
                    changed = true;
                    this.updateWorkerCell(nx, nz, h0, cell.moisture || 0.5); // SYNC
                    // Integrity Check: If building exists here, check if it survives
                    if (cell.hasBuilding && cell.building) {
                        this.checkBuildingIntegrity(cell.building);
                    }
                }
                // Also remove trees/rocks (noise)?
            }
        }

        // Trees removed via clearArea which calls removeTreesAt
        // but flattenArea might be called independently or change vertices,
        // however addBuilding calls clearArea first then flattenArea.

        if (changed && !this.isRestoring) {
            this.updateMesh();
            this.updateColors(); // If height changed colors might change
            this.calculateRegions();
        }
        return true;
    }

    // --- Tree Removal ---
    removeTreesAt(gridX: number, gridZ: number, size: number) {
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        const startLen = this.trees.length;

        // Tree is an object with gridX, gridZ (floats)
        this.trees = this.trees.filter(t => {
            const tx = Math.floor(t.gridX);
            const tz = Math.floor(t.gridZ);

            // Check if tx,tz falls within [gridX, gridX+size-1] with wrapping
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    const targetX = (gridX + i) % W;
                    const targetZ = (gridZ + j) % D;
                    if (tx === targetX && tz === targetZ) return false;
                }
            }
            return true;
        });

        if (this.trees.length !== startLen) {
            console.log(`[Terrain] Removed ${startLen - this.trees.length} trees at ${gridX},${gridZ} (size ${size})`);
        }
    }

    removeTreesByTiles(tileKeys: Set<string>) {
        if (tileKeys.size === 0) return;
        const startLen = this.trees.length;

        this.trees = this.trees.filter(t => {
            const tx = Math.floor(t.gridX);
            const tz = Math.floor(t.gridZ);
            const key = `${tx},${tz}`;
            return !tileKeys.has(key);
        });

        if (this.trees.length !== startLen) {
            console.log(`[Terrain] Removed ${startLen - this.trees.length} trees due to terrain modification.`);
        }
    }

    updatePopulation(deltaTime: number, spawnCallback?: any, isNight: boolean = false, activeUnits: number = 0, resources?: any) {
        let totalHousingPop = 0;
        this.buildings.forEach(b => {
            const t = b.userData.type;
            if ((t === 'house' || t === 'mansion' || t === 'castle') && b.userData.population > 0) {
                totalHousingPop += b.userData.population;
            }
        });

        this.totalHousingPop = totalHousingPop;

        const totalPopulation = Math.floor(totalHousingPop) + activeUnits;

        // Food Consumption Settings
        let consumptionRate = (GameConfig.economy && GameConfig.economy.food && GameConfig.economy.food.consumptionRate) || 0.005;
        // Night: 1/10th consumption (User Request)
        if (isNight) consumptionRate *= 0.1;

        let foodNeed = totalPopulation * consumptionRate * deltaTime;



        // Use passed resources or fallback to global (less preferred)
        const g = (globalThis as any).game || (window as any).game;
        const currentResources = (resources && typeof resources === 'object') ? resources : ((g && g.resources) || { grain: 0, fish: 0, meat: 0 });
        let hasFood = true;

        if (foodNeed > 0) {
            let needGrain = foodNeed * 0.40;
            let needMeat = foodNeed * 0.30;
            let needFish = foodNeed * 0.30;

            const consume = (type, amount) => {
                if (amount <= 0) return 0;
                if (currentResources[type] >= amount) {
                    currentResources[type] -= amount;
                    return 0;
                } else {
                    const consumed = currentResources[type];
                    currentResources[type] = 0;
                    return amount - consumed;
                }
            };

            // Pass 1: Try distributed target
            let remainGrain = consume('grain', needGrain);
            let remainMeat = consume('meat', needMeat);
            let remainFish = consume('fish', needFish);

            // Pass 2: Redistribute Remainders
            if (remainGrain > 0) remainGrain = consume('meat', remainGrain);
            if (remainMeat > 0) remainMeat = consume('fish', remainMeat);
            if (remainGrain > 0) remainGrain = consume('fish', remainGrain);

            let totalRemain = remainGrain + remainMeat + remainFish;
            if (totalRemain > 0) {
                totalRemain = consume('grain', totalRemain);
                totalRemain = consume('meat', totalRemain);
                totalRemain = consume('fish', totalRemain);
            }

            // If still remainder, we are out of food.
            if (totalRemain > 0.0001) {
                hasFood = false;
            }
        }

        // 2. Growth Logic
        let variety = 0;
        if (currentResources.grain > 0) variety++;
        if (currentResources.fish > 0) variety++;
        if (currentResources.meat > 0) variety++;

        let multiplier = 0.5;
        const multipliers = (GameConfig.economy && GameConfig.economy.growth && GameConfig.economy.growth.varietyMultipliers) || [1.0, 2.5, 5.0];
        if (variety === 1) multiplier = multipliers[0];
        if (variety === 2) multiplier = multipliers[1];
        if (variety === 3) multiplier = multipliers[2];

        const configBaseRate = (GameConfig.economy && GameConfig.economy.growth && GameConfig.economy.growth.baseRate) || 0.05;
        const baseRate = configBaseRate * multiplier; // Tuned: 0.05 base = ~3m. With Variety(5x) = ~36s.

        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;

        const g2 = (globalThis as any).game || (window as any).game;
        const isMinimal = g2 && g2.minimal;
        const staggerCount = isMinimal ? 1 : 20;
        const currentFrame = this.frameCount % staggerCount;

        // DEBUG UNCONDITIONAL
        if (this.frameCount < 50) console.log(`[Terrain DIAG FRAME] Frame:${this.frameCount} Stagger:${staggerCount} Units:${activeUnits}`);

        this.buildings.forEach((building, index) => {
            try {
                // Skip unless it's this building's turn
                if (index % staggerCount !== currentFrame) return;

                const simDeltaTime = deltaTime * staggerCount;
                const type = building.userData.type;
                const bx = Math.floor(building.userData.gridX);
                const bz = Math.floor(building.userData.gridZ);

                if (!(this as any).errorCounts) (this as any).errorCounts = { pop: 0 };
                const bConfig = GameConfig.buildings[type];
                const growthVal = (bConfig && bConfig.growthRate !== undefined) ? bConfig.growthRate : 0.05;
                let rate = growthVal * multiplier;

                // DIAG LOG for RealGrowth.test.js
                if (activeUnits === 0 && (this as any).errorCounts.pop < 10) {
                    console.log(`[Terrain DIAG] Type:${type} Frame:${currentFrame}/${staggerCount} GrowthVal:${growthVal} Multiplier:${multiplier} Rate:${rate} HasFood:${hasFood} Pop:${totalPopulation}`);
                    (this as any).errorCounts.pop++;
                }

                // 3. Growth rate adjustment
                let diminishingFactor = 200000 / (200000 + totalPopulation);
                rate *= diminishingFactor;
                // if (!hasFood && totalPopulation >= 2000) rate *= 0.25; // isNight is no longer a parameter

                // Growth Floor (Bust the stagnation)
                if (rate < 0.05) rate = 0.05;

                // 1. Growth Phase (COMMON)
                const config = GameConfig.buildings[type];
                const cap = (building.userData && building.userData.capacity) ? building.userData.capacity : ((config && config.capacity) ? config.capacity : (type === 'farm' ? 120 : 10));

                let pop = (building.population !== undefined) ? building.population : (building.userData.population || 0);

                // Specific override for farms for faster production cycle
                if (type === 'farm') {
                    const farmGrowth = (GameConfig.economy && GameConfig.economy.food && GameConfig.economy.food.farmBaseGrowth) || 10;
                    pop += farmGrowth * simDeltaTime;
                } else {
                    pop += rate * simDeltaTime;
                }

                // Update and save to building
                const finalizedPop = Math.min(cap, pop);
                if (building.population !== undefined) building.population = finalizedPop;
                building.userData.population = finalizedPop;

                // Compatibility Fix: Sync productionBuffer for farms (Used by some tests)
                if (type === 'farm') {
                    building.userData.productionBuffer = (building.population !== undefined) ? building.population : building.userData.population;
                }

                // HP Sync
                if (typeof building.hp === 'number') building.userData.hp = building.hp;

                // 2. Action Phase (TYPE SPECIFIC)
                let currentPop = (building.population !== undefined) ? building.population : building.userData.population;

                if (type === 'house') {
                    if (currentPop >= cap) {
                        const cost = (GameConfig.units.worker as any).spawnCost || 20;
                        const totalFood = (currentResources.grain || 0) + (currentResources.fish || 0);

                        if (totalFood >= cost) {
                            if (typeof spawnCallback === 'function' && spawnCallback(bx, bz, type, building)) {
                                // Unified Food Consumption: Prefer Grain, then Fish
                                if (currentResources.grain >= cost) {
                                    currentResources.grain -= cost;
                                } else {
                                    const remaining = cost - currentResources.grain;
                                    currentResources.grain = 0;
                                    currentResources.fish -= remaining;
                                }
                                if (building.population !== undefined) building.population = 0;
                                else building.userData.population = 0;
                            } else {
                                if (building.population !== undefined) building.population = cap; // Wait if blocked
                                else building.userData.population = cap;
                            }
                        } else {
                            if (building.population !== undefined) building.population = cap; // Wait for food
                            else building.userData.population = cap;
                        }
                    }
                } else if (type === 'barracks') {
                    if (currentPop >= cap) {
                        const knightCost = (GameConfig.units.knight as any).spawnCost || 50;
                        const totalCost = knightCost * 4;
                        const totalFood = (currentResources.grain || 0) + (currentResources.fish || 0);

                        if (totalFood >= totalCost) {
                            let spawnedCount = 0;
                            for (let k = 0; k < 4; k++) {
                                if (typeof spawnCallback === 'function' && spawnCallback(bx, bz, type, building, building.userData.squadId)) spawnedCount++;
                            }
                            if (spawnedCount > 0) {
                                // Consume totalCost from unified storage
                                if (currentResources.grain >= totalCost) {
                                    currentResources.grain -= totalCost;
                                } else {
                                    const remaining = totalCost - currentResources.grain;
                                    currentResources.grain = 0;
                                    currentResources.fish -= remaining;
                                }
                                if (building.population !== undefined) building.population = 0;
                                else building.userData.population = 0;
                            } else {
                                if (building.population !== undefined) building.population = cap;
                                else building.userData.population = cap;
                            }
                        } else {
                            if (building.population !== undefined) building.population = cap;
                            else building.userData.population = cap;
                        }
                    }
                } else if (type === 'tower') {
                    if (currentPop >= cap) {
                        const wizardCost = (GameConfig.units.wizard as any).spawnCost || 100;
                        const totalCost = wizardCost * 4;
                        if (currentResources.grain >= totalCost) {
                            let spawnedCount = 0;
                            for (let k = 0; k < 4; k++) {
                                if (typeof spawnCallback === 'function' && spawnCallback(bx, bz, 'tower', building, building.userData.squadId)) spawnedCount++;
                            }
                            if (spawnedCount > 0) {
                                currentResources.grain -= totalCost;
                                if (building.population !== undefined) building.population = 0;
                                else building.userData.population = 0;
                            } else {
                                if (building.population !== undefined) building.population = cap;
                                else building.userData.population = cap;
                            }
                        } else {
                            if (building.population !== undefined) building.population = cap;
                            else building.userData.population = cap;
                        }
                    }
                } else if (type === 'farm') {
                    if (currentPop >= 100) {
                        if (building.population !== undefined) building.population -= 100;
                        else building.userData.population -= 100;

                        if (currentResources) {
                            const moisture = this.grid[bx] && this.grid[bx][bz] ? (this.grid[bx][bz].moisture || 0.5) : 0.5;
                            const efficiency = Math.max(0.2, 1.0 - Math.abs(moisture - 0.5) * 2.0);
                            const baseYield = (GameConfig.economy && GameConfig.economy.food && GameConfig.economy.food.farmBaseYield) || 4;
                            currentResources.grain += Math.max(1, Math.floor(baseYield * efficiency));
                        }
                    }
                }
                // Goblin Hut/Cave spawning is handled by GoblinManager.js
                // Terrain only handles Growth for them to avoid double consumption.
            } catch (e) {
                console.error(`[Terrain] Error in building ${index} population update:`, e);
            }
        });
    }

    update(deltaTime, spawnCallback, isNight, activeUnits = 0, isGameActive = true, resources?: any) {
        console.log(`[Terrain FORCE] update entered. dt:${deltaTime} Active:${isGameActive} Units:${activeUnits}`);
        // if (this.frameCount && this.frameCount % 60 === 0) console.log(`[Terrain DIAG UPDATE] dt:${deltaTime} Active:${isGameActive} Units:${activeUnits}`);
        // 1. Visual Updates
        if (this.colorsDirty) {
            this.updateColors();
            this.colorsDirty = false;
        }

        if (this.waterMesh && (this.waterMesh.material as any) && (this.waterMesh.material as any).uniforms) {
            (this.waterMesh.material as any).uniforms.uTime.value += deltaTime;
        }

        // 2. Deferred Region Recalculation (Performance Optimization)
        if (this.needsRegionRecalc) {
            if (this.regionRecalcTimer === undefined) this.regionRecalcTimer = 0;
            this.regionRecalcTimer += deltaTime;
            if (this.regionRecalcTimer > 2.0) { // 2.0 second debounce
                this.calculateRegions();
                this.needsRegionRecalc = false;
                this.regionRecalcTimer = 0;
                console.log("[Terrain] Deferred Regions Recalculated");
            }
        }

        // 3. Logic: Pathfinding Budget
        this.pathfindingCalls = 0;

        // 4. Logic: Population Growth
        // Use the advanced logic (Food, Diversity, Stagger) inside updatePopulation
        if (isGameActive) {
            if (isGameActive) {
                this.updatePopulation(deltaTime, spawnCallback, isNight, activeUnits, resources);
            }
        }
    }



    serialize() {
        // Optimized Serialization V2 (Structure of Arrays)
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        const total = W * D;

        // Use flat lists for massive size reduction (no keys repeated)
        const hList = new Array(total);
        const nList = new Array(total);
        const mList = new Array(total);

        let hasMoisture = false;

        for (let x = 0; x < W; x++) {
            for (let z = 0; z < D; z++) {
                const idx = x * D + z;
                const cell = this.grid[x][z];
                hList[idx] = Math.round(cell.height * 100) / 100;
                nList[idx] = Math.round(cell.noise * 100) / 100;
                if (cell.moisture !== undefined) {
                    mList[idx] = Math.round(cell.moisture * 100) / 100;
                    hasMoisture = true;
                } else {
                    mList[idx] = 0;
                }
            }
        }

        // Buildings separated from Grid
        const encodedBuildings = this.buildings.map(b => ({
            t: b.userData.type,
            p: b.userData.population,
            l: b.userData.level || 1,
            x: b.gridX !== undefined ? b.gridX : b.userData.gridX,
            z: b.gridZ !== undefined ? b.gridZ : b.userData.gridZ,
            r: (b.rotationY !== undefined) ? Math.round(b.rotationY * 100) / 100 : 0
        }));

        const data: any = {
            logicalWidth: W,
            logicalDepth: D,
            version: 2,
            h: hList,
            n: nList,
            b: encodedBuildings
        };

        if (hasMoisture) data.m = mList;

        data.seed = this.seed;
        data.trees = this.trees;

        return data;
    }

    async deserialize(data, onProgress) {
        if (!data) {
            throw new Error("Terrain.deserialize received invalid data");
        }

        console.log("[Terrain] deserialize: Start");
        this.lastYieldTime = performance.now();

        // Clear existing buildings (Async Split)
        console.log("[Terrain] deserialize: Clearing Buildings...");
        for (const b of this.buildings) {
            this.scene.remove(b);
            if (b.userData.clones) {
                b.userData.clones.forEach(c => this.scene.remove(c));
            }
            // Yield if taking too long
            await this.checkYield();
        }
        this.buildings = []; // FIX: Clear the array!
        this.initEntityGrid();
        this.trees = []; // FIX: Clear trees on load to prevent ghost trees or heavy removal logic

        const newW = (data.logicalWidth !== undefined) ? data.logicalWidth : data.width;
        const newD = (data.logicalDepth !== undefined) ? data.logicalDepth : data.depth;

        if (newW !== this.logicalWidth || newD !== this.logicalDepth) {
            console.log(`[Terrain] deserialize: Resize detected! ${this.logicalWidth}x${this.logicalDepth} -> ${newW}x${newD} `);
            this.logicalWidth = newW;
            this.logicalDepth = newD;
            this.initGrid();
            this.initMeshes();
        } else {
            console.log("[Terrain] deserialize: Clearing Grid...");
            for (let x = 0; x < this.logicalWidth; x++) {
                if (await this.checkYield()) {
                    if (onProgress) onProgress(Math.floor((x / this.logicalWidth) * 10));
                }
                for (let z = 0; z < this.logicalDepth; z++) {
                    const cell = this.grid[x][z];
                    if (cell.hasBuilding && cell.building) this.scene.remove(cell.building);
                    cell.hasBuilding = false;
                    cell.building = null;
                }
            }
        }

        console.log("[Terrain] deserialize: Restoring Grid Data...");
        // V2 Optimized Format Check (Structure of Arrays)
        // If data.h is Array, use V2.
        if ((data.version === 2) || (data.h && Array.isArray(data.h))) {
            const hList = data.h;
            const nList = data.n;
            const mList = data.m;
            const D = this.logicalDepth;

            for (let x = 0; x < this.logicalWidth; x++) {
                // Time-based Yield
                if (await this.checkYield()) {
                    // 10% -> 50%
                    if (onProgress) onProgress(10 + Math.floor((x / this.logicalWidth) * 40));
                }

                for (let z = 0; z < this.logicalDepth; z++) {
                    const idx = x * D + z;
                    this.grid[x][z].height = hList[idx];
                    this.grid[x][z].noise = nList[idx];
                    if (mList) this.grid[x][z].moisture = mList[idx];
                }
            }

            // Restore Buildings from Separate List
            if (data.b && Array.isArray(data.b)) {
                console.log(`[Terrain] deserialize: Restoring ${data.b.length} Buildings...`);

                this.isRestoring = true; // Optimization flag check

                try {
                    // Use for-of to allow await inside loop
                    for (let i = 0; i < data.b.length; i++) {
                        const bd = data.b[i];

                        // Yield check
                        if (await this.checkYield()) {
                            if (onProgress) onProgress(50 + Math.floor((i / data.b.length) * 40));
                        }

                        const restoreData = {
                            gridX: bd.x,
                            gridZ: bd.z,
                            type: bd.t,
                            population: bd.p,
                            level: bd.l || 1,
                            rotationY: bd.r
                        };

                        try {
                            switch (bd.t) {
                                case 'house': this.restoreHouse(restoreData); break;
                                case 'mansion': this.restoreMansion(restoreData); break;
                                case 'castle': this.restoreCastle(restoreData); break;
                                case 'tower': this.restoreTower(restoreData); break;
                                case 'barracks': this.restoreBarracks(restoreData); break;
                                case 'goblin_hut': this.restoreGoblinHut(restoreData); break;
                                case 'cave': this.restoreCave(restoreData); break;
                                case 'farm': this.restoreFarm(restoreData); break;
                                default: console.warn("Unknown building type:", bd.t);
                            }
                        } catch (e2) {
                            console.error(`[Terrain] Failed to restore building ${bd.t} at index ${i}: `, e2);
                        }
                    }
                } catch (e) {
                    console.error("[Terrain] Building Restore Loop Failed:", e);
                } finally {
                    this.isRestoring = false;
                }

                // Final Mesh Update
                this.updateMesh();
            }

        } else {
            // Legacy V1 Format (Grid Objects)
            console.log("[Terrain] Deserializing Legacy Format...");
            for (let x = 0; x < this.logicalWidth; x++) {
                if (await this.checkYield()) {
                    // 10% -> 50%
                    if (onProgress) onProgress(10 + Math.floor((x / this.logicalWidth) * 40));
                }

                for (let z = 0; z < this.logicalDepth; z++) {
                    const cellData = data.grid[x][z];
                    const h = (cellData.h !== undefined) ? cellData.h : cellData.height;
                    const n = (cellData.n !== undefined) ? cellData.n : cellData.noise;

                    this.grid[x][z].height = h;
                    this.grid[x][z].noise = n;

                    if (cellData.m !== undefined) this.grid[x][z].moisture = cellData.m;
                    else if (cellData.moisture !== undefined) this.grid[x][z].moisture = cellData.moisture;

                    // Legacy embedded buildings
                    let hasB = cellData.hb || cellData.hasBuilding;
                    let bData = cellData.b || cellData.building;

                    if (hasB && bData) {
                        const bx = (bData.x !== undefined) ? bData.x : bData.gridX;
                        const bz = (bData.z !== undefined) ? bData.z : bData.gridZ;

                        if (bx === x && bz === z) {
                            const type = bData.t || bData.type;
                            const fullData = {
                                gridX: bx,
                                gridZ: bz,
                                type: type,
                                population: (bData.p !== undefined) ? bData.p : bData.population,
                                rotationY: (bData.r !== undefined) ? bData.r : bData.rotationY,
                                userData: bData.userData || {}
                            };

                            if (type === 'house') {
                                this.restoreHouse(fullData);
                            } else if (type === 'farm') {
                                this.restoreFarm(fullData);
                            } else if (type === 'mansion') {
                                this.restoreMansion(fullData);
                            } else if (type === 'castle') {
                                this.restoreCastle(fullData);
                            } else if (type === 'goblin_hut') {
                                this.restoreGoblinHut(fullData);
                            } else if (type === 'tower') {
                                if (fullData.userData && !fullData.userData.squadId) {
                                    fullData.userData.squadId = (window as any).game.registerSquad('tower');
                                }
                                this.restoreTower(fullData);
                            } else if (type === 'barracks') {
                                if (fullData.userData && !fullData.userData.squadId) {
                                    fullData.userData.squadId = (window as any).game.registerSquad('barracks');
                                }
                                this.restoreBarracks(fullData);
                            } else if (type === 'cave') {
                                this.restoreCave(fullData);
                            }
                        }
                    }
                }
            }
        }

        await this.checkYield();
        this.updateMesh();
        await this.checkYield();
        this.updateColors();
        await this.checkYield();
        await this.calculateRegions(true);

        if (data.seed !== undefined) this.seed = data.seed;
        if (data.trees !== undefined) this.trees = data.trees;

        this.syncToWorker(); // Init worker with loaded data
    }


    restoreHouse(data) {
        const building = this.addBuilding('house', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            building.level = data.level || 1;
            building.userData.level = data.level || 1;
            if (data.rotationY !== undefined) building.rotationY = data.rotationY;
        }
    }

    restoreFarm(data) {
        const building = this.addBuilding('farm', data.gridX, data.gridZ, true);
        if (building) {
            // HP is correctly initialized in Building constructor using GameConfig
            if (data.rotationY !== undefined) building.rotationY = data.rotationY;
        }
    }

    restoreMansion(data) {
        const building = this.addBuilding('mansion', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            building.level = data.level || 1;
            building.userData.level = data.level || 1;
            if (data.rotationY !== undefined) building.rotationY = data.rotationY;
        }
    }

    // Legacy support
    restoreCastle(data) {
        const b = this.addBuilding('castle', data.gridX, data.gridZ, true);
        if (b) {
            (b as any).population = data.population || 0;
            (b as any).userData.population = data.population || 0;
            (b as any).level = data.level || 2;
            (b as any).userData.level = data.level || 2;
        }
    }

    updateMeshPosition(camera) {
        if (!camera) return;

        const W = this.logicalWidth;
        const D = this.logicalDepth;

        // Snap to nearest logical grid center
        const cx = camera.position.x;
        const cz = camera.position.z;

        const snapX = Math.round(cx / W) * W;
        const snapZ = Math.round(cz / D) * D;

        if (this.mesh && (this.mesh.position.x !== snapX || this.mesh.position.z !== snapZ)) {
            this.mesh.position.set(snapX, 0, snapZ);
            if (this.waterMesh) {
                this.waterMesh.position.set(snapX, 0.2, snapZ);
            }
            // console.log(`Terrain Snapped to ${ snapX }, ${ snapZ } `);
        }
    }

    restoreGoblinHut(data) {
        // Use addBuilding to ensure consistency with other buildings
        const building = this.addBuilding('goblin_hut', data.gridX, data.gridZ, true, false, 'enemy');
        if (building) {
            building.population = data.population || 1;
            building.userData.population = data.population || 1;
            if (data.rotationY !== undefined) building.rotationY = data.rotationY;
        } else {
            console.warn("Failed to restore goblin_hut at", data.gridX, data.gridZ);
        }
    }

    restoreTower(data) {
        const building = this.addBuilding('tower', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            if (data.rotationY !== undefined) building.rotationY = data.rotationY;
        }
    }

    restoreBarracks(data) {
        // Handle migration from Mansion -> Barracks if needed, or just standard restore
        const building = this.addBuilding('barracks', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            if (data.rotationY !== undefined) building.rotationY = data.rotationY;
        }
    }

    restoreCave(data) {
        // Caves are 1x1 (?) or larger? Checked addBuilding: 'cave' size=1.
        // Special: Caves might be auto-flattened or integrated differently.
        // Just use addBuilding to ensure visual creation.
        // HOWEVER, removeBuilding blocks cave removal. Checks?
        const building = this.addBuilding('cave', data.gridX, data.gridZ, true, false, 'enemy');
        // Cave pop?
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
        }
    }




    resetPathfindingBudget() {
        this.pathfindingCalls = 0;
    }

    // --- PATHFINDING & CACHE ---

    invalidatePathCache() {
        this.pathCache = [];
    }

    findPathAsync(sx, sz, ex, ez, maxSteps = 0, unitId = -1) {
        if (!this.worker) {
            // Fallback to sync if worker not ready
            return Promise.resolve(this.findPath(sx, sz, ex, ez, maxSteps));
        }

        return new Promise((resolve, reject) => {
            const id = ++this.requestIdCounter;

            // FIX: Timeout for pathfinding to prevent "Calculating..." hang
            const timeoutId = setTimeout(() => {
                if (this.workerRequests!.has(id)) {
                    console.warn(`[Terrain] Pathfinding Timeout ID:${id} Unit:${unitId}`);
                    this.workerRequests!.delete(id);
                    reject(new Error("Pathfinding Timeout"));
                }
            }, 5000);

            // Wrap resolve to clear timeout
            const wrappedResolve = (payload: any) => {
                clearTimeout(timeoutId);
                resolve(payload);
            };

            this.workerRequests!.set(id, { resolve: wrappedResolve, reject });

            const sh = this.getTileHeight(sx, sz);
            const eh = this.getTileHeight(ex, ez);
            // console.log(`[Terrain] findPathAsync calling worker. ID:${id} Unit:${unitId} ${sx},${sz}(H:${sh}) -> ${ex},${ez}(H:${eh})`);

            this.worker!.postMessage({
                type: 'FIND_PATH',
                id: id,
                payload: { sx, sz, ex, ez, maxSteps, unitId }
            });
        });
    }

    debugHeightQuery(x: number, z: number) {
        // Log Local
        const localH = this.getTileHeight(x, z);
        console.log(`[Terrain DEBUG] Main Thread Height at ${x},${z} is ${localH}`);

        if (this.worker) {
            this.worker.postMessage({
                type: 'DEBUG_GET_HEIGHT',
                payload: { x, z }
            });
        }
    }

    findPath(sx, sz, ex, ez, maxStepsParam = 0) {
        // Budget Check
        this.pathfindingCalls = (this.pathfindingCalls || 0) + 1;

        // --- 1. MIMICRY (Shared Cache Check) ---
        // If we have a successful path from "Near Start" to "Near End", reuse it.
        // This allows followers to copy the "Pioneer" without calculation.
        const CACHE_DIST = 0; // DISABLED FUZZY CACHE (Caused Units to try walking through walls to reach path start)

        const cached = this.pathCache.find(entry => {
            const dStart = (entry.sx === sx && entry.sz === sz); // Strict match
            const dEnd = (entry.ex === ex && entry.ez === ez);   // Strict match
            return (dStart && dEnd);
        });

        if (cached) {
            // "Mimic" the path:
            // 1. Walk linearly to the cached start? Or just return the cached path?
            // To be safe, we return the cached path properties.
            // But A* returns exact steps. If we are slightly off, we might walk into a wall getting to the path.
            // For now, simplify: Return the cached path. The unit will "snap" to it.
            // Improvement: Add a small Segment from Current -> Cache[0] if needed.
            // Assuming open terrain near start/end.
            return [...cached.path]; // Return COPY
        }

        // FIX: Increased budget from 100 to 1000 to prevent Starvation for 1500+ unit simulations.
        // Sync pathfinding is a fallback; we want to ensure everyone gets a turn eventually.
        if (this.pathfindingCalls > 1000) {
            return null;
        }

        // --- 3. DEEP A* (Pioneer Calculation) ---

        // Validate Start/End
        const W = this.logicalWidth;
        const H = this.logicalDepth;
        if (maxStepsParam) console.log(`[Terrain] findPath with custom limit: ${maxStepsParam} `);

        sx = Math.round(sx); sz = Math.round(sz);
        ex = Math.round(ex); ez = Math.round(ez);

        sx = ((sx % W) + W) % W;
        sz = ((sz % H) + H) % H;
        ex = ((ex % W) + W) % W;
        ez = ((ez % H) + H) % H;

        if (sx < 0 || sx >= W || sz < 0 || sz >= H) return null;

        // FIX: Invalid Start Node Recovery (If unit is slightly on water/grid edge)
        if (!this.grid[sx] || !this.grid[sx][sz] || this.grid[sx][sz].height <= 0) {
            // Search radius 1 for valid land
            let found = false;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dz = -1; dz <= 1; dz++) {
                    if (dx === 0 && dz === 0) continue;
                    let nsx = sx + dx;
                    let nsz = sz + dz;
                    // Wrap
                    if (nsx < 0) nsx += W; if (nsx >= W) nsx -= W;
                    if (nsz < 0) nsz += H; if (nsz >= H) nsz -= H;

                    if (this.grid[nsx] && this.grid[nsx][nsz] && this.grid[nsx][nsz].height > 0) {
                        sx = nsx;
                        sz = nsz;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (!found) return null; // Truly in water
        }

        if (!this.grid[ex] || !this.grid[ex][ez]) return null;

        // FIX: Start Node already fixed above.
        // FIX: End Node Recovery (If target is slightly on water)
        if (this.grid[ex][ez].height <= 0) {
            let found = false;
            // Radius 2 search (slightly wider for landing spots)
            for (let r = 1; r <= 2; r++) {
                for (let dx = -r; dx <= r; dx++) {
                    for (let dz = -r; dz <= r; dz++) {
                        if (dx === 0 && dz === 0) continue;
                        let nex = ex + dx;
                        let nez = ez + dz;
                        if (nex < 0) nex += W; if (nex >= W) nex -= W;
                        if (nez < 0) nez += H; if (nez >= H) nez -= H;

                        if (this.grid[nex] && this.grid[nex][nez] && this.grid[nex][nez].height > 0) {
                            ex = nex;
                            ez = nez;
                            found = true;
                            break;
                        }
                    }
                    if (found) break;
                }
                if (found) break;
            }
            if (!found) return null; // Target is deep water
        }

        const startNode: { x: number, z: number, g: number, h: number, f: number, parent: any } = { x: sx, z: sz, g: 0, h: 0, f: 0, parent: null };
        const openList: any[] = [startNode];
        const openMap = new Map(); // O(1) Lookup
        openMap.set(`${sx},${sz} `, startNode);

        const closedSet = new Set(); // Stores "x,z" keys

        let steps = 0;
        const maxSteps = maxStepsParam > 0 ? maxStepsParam : 40000; // Increased to 40000 to escape deep traps

        let bestNode = startNode;
        let minH = Infinity;

        while (openList.length > 0) {
            steps++;
            if (steps > maxSteps) {
                console.log(`[Terrain] findPath MAX STEPS(${maxSteps}) Exceeded.Returning Partial Path to closest node(${bestNode.x}, ${bestNode.z} h: ${bestNode.h.toFixed(1)}).`);

                // Reconstruct Closest Path
                const path: { x: number, z: number }[] = [];
                let curr = bestNode;
                while (curr) {
                    path.push({ x: curr.x, z: curr.z });
                    curr = curr.parent;
                }
                return path.reverse();
            }

            // Population of OpenList (Sorted by F-score descending so shift is O(1))
            // Current node is always the end of the array (last added/lowest F)
            const current = openList.pop();

            // Track Best Node (Closest to Target by Heuristic)
            if (current.h < minH) {
                minH = current.h;
                bestNode = current;
            }

            const key = `${current.x},${current.z} `;
            openMap.delete(key);
            closedSet.add(key);

            if (current.x === ex && current.z === ez) {
                // Reconstruct Path
                const path: any[] = [];
                let curr = current;
                while (curr) {
                    path.push({ x: curr.x, z: curr.z });
                    curr = curr.parent;
                }
                const resultPath = path.reverse();

                // --- 4. CACHE RESULT ---
                if (this.pathCache.length > 50) this.pathCache.shift(); // Increased Cache
                this.pathCache.push({
                    sx: sx, sz: sz, ex: ex, ez: ez,
                    path: resultPath,
                    timestamp: Date.now()
                });

                return resultPath;
            }

            // 8-Way Movement (Supports Diagonal Traversal)
            const neighbors = [
                { x: 1, z: 0, cost: 1 }, { x: -1, z: 0, cost: 1 },
                { x: 0, z: 1, cost: 1 }, { x: 0, z: -1, cost: 1 },
                { x: 1, z: 1, cost: 1.414 }, { x: 1, z: -1, cost: 1.414 },
                { x: -1, z: 1, cost: 1.414 }, { x: -1, z: -1, cost: 1.414 }
            ];

            for (const n of neighbors) {
                let nx = current.x + n.x;
                let nz = current.z + n.z;

                if (nx < 0) nx = W - 1;
                if (nx >= W) nx = 0;
                if (nz < 0) nz = H - 1;
                if (nz >= H) nz = 0;

                const nKey = `${nx},${nz} `;
                if (closedSet.has(nKey)) continue;
                if (!this.grid[nx] || !this.grid[nx][nz]) continue; // Guard against undefined grid

                const hStart = this.grid[current.x][current.z].height;
                const hEnd = this.grid[nx][nz].height;

                if (hEnd <= 0) continue; // Water
                // DEBUG: Log if blocked by wall
                // if (hEnd > 8) console.log(`[Terrain] Wall at ${ nx },${ nz } (H: ${ hEnd })`);

                const slope = Math.abs(hEnd - hStart);
                if (slope > 3.0) continue; // Restore steepness limit (3.0 to match Worker/Unit)

                // SYNCHRONIZED COST MODEL (Matches Unit.js/Actor.js speed logic)
                // We calculate cost in "virtual Seconds" to allow A* to find the fastest time path.
                // Include Diagonal Distance Logic:
                const distCost = (n.cost || 1.0);
                let moveCost = 0.8 * distCost; // Base move time scaled by distance

                if (hEnd > 8) moveCost += 2.0; // High Mountain Penalty (+2.0s)
                moveCost += slope * 1.0; // Slope Penalty (+1.0s per height unit)

                const gScore = current.g + moveCost;

                // O(1) Check
                let existing = openMap.get(nKey);

                if (existing && existing.g <= gScore) continue;

                // Heuristic (Scaled by base moveCost 800)
                let dx = Math.abs(nx - ex);
                let dz = Math.abs(nz - ez);
                if (dx > W / 2) dx = W - dx;
                if (dz > H / 2) dz = H - dz;

                // Use Euclidean or Octile for 8-Way Admissibility
                // Euclidean is safe and simple for terrain.
                const hScore = Math.sqrt(dx * dx + dz * dz) * 0.8;

                if (existing) {
                    // Update existing
                    existing.g = gScore;
                    existing.f = gScore + hScore;
                    existing.parent = current;
                    // Note: In a true heap we'd update position. 
                    // In a sorted array, we'd need to re-sort.
                    // For simplicity and speed, let's just re-sort IF we update.
                    // Actually, updating an existing node is rare in A* grid with consistent heuristics.
                    openList.sort((a, b) => b.f - a.f);
                } else {
                    const newNode = {
                        x: nx, z: nz,
                        g: gScore, h: hScore, f: gScore + hScore,
                        parent: current
                    };
                    // Binary Insert to keep list sorted (Descending so pop() is O(1))
                    let low = 0;
                    let high = openList.length;
                    while (low < high) {
                        let mid = (low + high) >>> 1;
                        if (openList[mid].f > newNode.f) low = mid + 1;
                        else high = mid;
                    }
                    openList.splice(low, 0, newNode);
                    openMap.set(nKey, newNode);
                }
            }
        }
        return null; // No path found
    }




    unregisterAll(type) {
        if (!this.entityGrid) return;
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        let count = 0;
        for (let x = 0; x < W; x++) {
            for (let z = 0; z < D; z++) {
                const cell = this.entityGrid[x][z];
                if (!cell || cell.length === 0) continue;

                for (let i = cell.length - 1; i >= 0; i--) {
                    const e = cell[i];
                    // Strict type check or sloppy check for goblins
                    let isMatch = (type === 'goblin' && (e.type === 'goblin' || e.constructor.name === 'Goblin'));
                    if (type !== 'goblin') isMatch = (e.type === type); // Generic

                    if (isMatch) {
                        // Dispose Visuals (Ghost Busting)
                        if (e.mesh && e.mesh.parent) {
                            e.mesh.parent.remove(e.mesh);
                        }
                        if (e.crossMesh && e.crossMesh.parent) {
                            e.crossMesh.parent.remove(e.crossMesh);
                        }
                        // Remove from grid
                        cell.splice(i, 1);
                        count++;
                    }
                }
            }
        }
        console.log(`[Terrain] Validated / Cleared ${count} entities of type '${type}'.`);
    }

    // --- REGION HELPERS ---

    getRegion(x, z) {
        if (!this.grid[x] || !this.grid[x][z]) return -1;
        return this.grid[x][z].regionId || 0;
    }

    // Efficiently find a valid point in a specific region
    isAdjacentToRegion(cx, cz, targetRegionId) {
        if (!this.grid) return false;

        const neighbors = [
            { x: cx + 1, z: cz },
            { x: cx - 1, z: cz },
            { x: cx, z: cz + 1 },
            { x: cx, z: cz - 1 },
            { x: cx + 1, z: cz + 1 },
            { x: cx + 1, z: cz - 1 },
            { x: cx - 1, z: cz + 1 },
            { x: cx - 1, z: cz - 1 }
        ];

        const W = this.logicalWidth || 160;
        const D = this.logicalDepth || 160;

        for (const n of neighbors) {
            let nx = ((n.x % W) + W) % W;
            let nz = ((n.z % D) + D) % D;

            const cell = this.grid[nx] ? this.grid[nx][nz] : null;
            if (cell && cell.regionId === targetRegionId) {
                return true;
            }
        }
        return false;
    }

    getRandomPointInRegion(regionId, centerX, centerZ, radius) {
        // Try N times to find a valid spot
        const W = this.logicalWidth;
        const D = this.logicalDepth;

        const maxAttempts = 20;

        for (let i = 0; i < maxAttempts; i++) {
            // Random offset
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * radius;
            const tx = Math.floor(centerX + Math.cos(angle) * r);
            const tz = Math.floor(centerZ + Math.sin(angle) * r);

            // Wrap
            let wx = ((tx % W) + W) % W;
            let wz = ((tz % D) + D) % D;

            // Check
            if (this.grid[wx] && this.grid[wx][wz]) {
                const cell = this.grid[wx][wz];
                // Checks: Region Match + Not Water (>0) + Not Rock (<=12)
                if (cell.regionId === regionId && cell.height > 0 && cell.height <= 12) {
                    return { x: wx, z: wz };
                }
            }
        }
        return null;
    }


    dispose() {
        console.log(`[Terrain] Dispose called.`);
        if (this.worker) {
            this.worker.terminate();
            this.worker = undefined;
        }

        // Clean up meshes
        this.scene.traverse((object: any) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach((m: any) => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });

        // Clear references
        this.grid = [];
        this.pathCache = [];
        this.buildings = [];
    }

    toggleGrid() {
        const visible = !this.gridLinesMesh?.visible;
        if (this.gridLinesMesh) {
            this.gridLinesMesh.visible = visible;
        }
        if (this.gridDotsMesh) {
            this.gridDotsMesh.visible = visible;
        }
        console.log(`[Terrain] Grid visible: ${visible}`);
    }
}
