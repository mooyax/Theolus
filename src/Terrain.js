import * as THREE from 'three';
import { Building } from './Building.js';
import GameConfig from './config/GameConfig.json';

export class Terrain {
    constructor(scene, clippingPlanes) {
        this.scene = scene;
        this.clippingPlanes = clippingPlanes || [];
        // Expanded Map 160 -> 240
        this.logicalWidth = GameConfig.terrain.logicalWidth;
        this.logicalDepth = GameConfig.terrain.logicalDepth;

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
                if (type === 'PATH_RESULT') {
                    const req = this.workerRequests.get(id);
                    if (req) {
                        req.resolve(payload);
                        this.workerRequests.delete(id);
                    }
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

    registerEntity(entity, x, z, type) {
        const ix = Math.floor(x);
        const iz = Math.floor(z);
        if (!this.isValidGrid(ix, iz)) return;

        // Add metadata to entity if not present (handled by caller mostly, but useful here)
        entity._spatial = { x: ix, z: iz, type };

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
    gridToWorld(val) {
        // logicalWidth 160 -> -80 to +80
        // val is 0..159
        // Return CENTER of the tile (e.g. index 0 -> -79.5)
        return (val - this.logicalWidth / 2) + 0.5;
    }

    moveEntity(entity, oldX, oldZ, newX, newZ, type) {
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

    findBestTarget(type, centerX, centerZ, maxRadius, costFn, candidateList = null) {
        let bestEntity = null;
        let bestScore = Infinity;

        // Region Check
        const W = this.logicalWidth;
        const H = this.logicalDepth;

        // Wrap Center
        centerX = ((centerX % W) + W) % W;
        centerZ = ((centerZ % H) + H) % H;

        const sourceCell = this.grid[Math.floor(centerX)][Math.floor(centerZ)];
        const sourceRegion = sourceCell ? sourceCell.regionId : 0;

        // If source is water (0), we assume they can target anything (e.g. boats/swim) or nothing.
        // But preventing Land->Water targeting is key.
        // If sourceRegion > 0, we require targetRegion === sourceRegion.

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
                // Buildings (multi-tile) might be reachable even if anchor is in different region.
                // Units self-verify reachability via Pathing/CostFn.
                if (type !== 'building' && sourceRegion > 0) {
                    const tCell = this.grid[e.gridX][e.gridZ];
                    if (!tCell || tCell.regionId !== sourceRegion) continue;
                }

                // Verify Type (if mixed list, though mostly pre-filtered)
                // If candidateList is "units", they are units.
                if (type === 'building' && (!e.userData || e.userData.type !== 'house' && e.userData.type !== 'farm' && e.userData.type !== 'barracks' && e.userData.type !== 'tower' && e.userData.type !== 'mansion' && e.userData.type !== 'goblin_hut' && e.userData.type !== 'cave')) {
                    // Loose type check if needed, or rely on caller
                }

                // Distance Check
                // Handle Wrapping manually for distance
                let dx = Math.abs(e.gridX - centerX);
                let dz = Math.abs(e.gridZ - centerZ);

                // Wrap logic for shortest distance
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
        // Optimization: Use Squared Radius for inner loop checks to avoid Sqrt
        const maxRadiusSq = maxRadius * maxRadius;

        // Debug Log
        if (type === 'building' && maxRadius < 70) {
            // console.log(`[Terrain] findBestTarget searching for building at ${centerX},${centerZ} rad:${maxRadius}`);
        }

        // Cache common values
        const grid = this.entityGrid; // Direct ref
        if (!grid) return null;

        for (let dx = -r; dx <= r; dx++) {
            // Optimization: Outer loop distance check (Box vs Circle early pruning)
            const dxSq = dx * dx;
            if (dxSq > maxRadiusSq) continue;

            const targetX = centerX + dx;
            // Wrap X (Efficient)
            let ix = targetX;
            if (ix < 0 || ix >= W) {
                ix = ((ix % W) + W) % W;
            }
            ix = Math.floor(ix);

            // Safety
            if (!grid[ix]) continue;

            for (let dz = -r; dz <= r; dz++) {
                // Distance Check Squared
                const dzSq = dz * dz;
                const distSq = dxSq + dzSq;
                if (distSq > maxRadiusSq) continue;

                const targetZ = centerZ + dz;
                // Wrap Z
                let iz = targetZ;
                if (iz < 0 || iz >= H) {
                    iz = ((iz % H) + H) % H;
                }
                iz = Math.floor(iz);

                // Check Cell Region
                // Check Cell Region
                if (sourceRegion > 0) {
                    const cData = this.grid[ix][iz];
                    if (cData.regionId !== sourceRegion) continue;
                }

                // Entity Check (Optimized)
                const cell = grid[ix][iz];
                if (!cell || cell.length === 0) continue;

                // Only calc true Sqrt distance if we find an entity candidate
                // But we need distance for Score.
                const dist = Math.sqrt(distSq);

                for (let i = 0; i < cell.length; i++) {
                    const e = cell[i];
                    // Direct property check is faster than _spatial lookup if aligned?
                    // Safe to use _spatial.type
                    if (e._spatial && e._spatial.type === type) {
                        if (e.isDead) continue;

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
            if (this.waterMesh.material) this.waterMesh.material.dispose();
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
        this.generateRandomTerrain();
    }

    generateRandomTerrain() {
        // Use a random offset so every reload is different
        this.seed = Math.random();
        this.lastYieldTime = 0; // For Time Slicing

        // Populate Logical Grid
        for (let x = 0; x < this.logicalWidth; x++) {
            for (let z = 0; z < this.logicalDepth; z++) {
                // Normalize coordinates to 0..1 for seamless noise
                const u = x / this.logicalWidth;
                const v = z / this.logicalDepth;

                // Use Seamless FBM
                let n = this.seamlessFbm(u, v, this.seed);

                // Stress Test Mode: Forces Flat Terrain
                if (typeof window !== 'undefined' && window.location && window.location.search && window.location.search.includes('stressTest=true')) {
                    this.grid[x][z].height = 1;
                    this.grid[x][z].moisture = 0.5; // Default green
                    continue;
                }

                // Map 0..1 to desired height range
                // n is 0..1. 0.5 is average?
                // Previously: n*20 - 5. Range -5 to 15.
                // 0 -> -5. 1 -> 15. 
                // Water is <= 0.
                // So n <= 0.25 (5/20) means water. 25% water.
                // User wants MORE water. Let's make it 40% water.
                // n <= 0.4.
                // If n=0.4, height should be 0.
                // height = (n * scale) - offset.
                // 0 = 0.4 * scale - offset => offset = 0.4 * scale.
                // Let's keep scale 20. offset = 8.
                // height = (n * 20) - 8.
                // Range: -8 to 12.
                // Water is n < 0.4.
                // User wants less flat land -> Increase Amplitude (Scale)
                // Old: (n * 20) - 8 => Range -8 to 12
                // New: (n * 35) - 15 => Range -15 to 20 (Simulates steeper terrain)
                let height = (n * 35) - 15;
                height = Math.max(-5, height); // Cap depth at -5
                height = Math.round(height);

                this.grid[x][z].height = height;

                // Moisture Map (Different seed)
                // Normalize 0..1
                let m = this.seamlessFbm(u, v, this.seed + 123.45);
                this.grid[x][z].moisture = m;
            }
        }

        this.updateMesh();
        this.calculateRegions();
        this.syncToWorker(); // Send initial data to worker
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
        const queue = [];
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
                        const { x: cx, z: cz } = queue.pop(); // Stack (DFS) or Queue (BFS) - Stack fits array better

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
                                neighbor.regionId = currentRegion;
                                queue.push({ x: nx, z: nz });
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

        // Flatten HeightMap
        const W = this.logicalWidth;
        const H = this.logicalDepth;
        const data = new Int16Array(W * H);

        for (let z = 0; z < H; z++) {
            for (let x = 0; x < W; x++) {
                if (this.grid[x] && this.grid[x][z]) {
                    data[z * W + x] = this.grid[x][z].height;
                }
            }
        }

        // Transfer buffer for speed
        this.worker.postMessage({
            type: 'INIT',
            payload: { w: W, h: H, data: data }
        }, [data.buffer]);

        console.log("[Terrain] Synced Grid to Pathfinding Worker.");

        // Also buffer region updates? 
        // Currently A* uses pure height/slope, so regions aren't strictly needed for pathing,
        // but might be useful later.
    }

    updateWorkerCell(x, z, h) {
        if (!this.worker) return;
        this.worker.postMessage({
            type: 'UPDATE_CELL',
            payload: { x, z, h }
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

    updateColors() {
        // ... (existing updateColors logic moved here if needed, or calling super)
        // Need to check where updateColors was defined.
        // It was called on Line 308. I likely overwrote it or need to find it.
        // Wait, line 308 is `this.updateColors()`. I need to NOT overwrite it if it exists elsewhere.
        // Looking at file content, `updateColors` was called but NOT visible in snippet 3041.
        // I will assume it's defined later.
        // I will INSERT `calculateRegions` BEFORE `generateRandomTerrain`. 
        // Or after.
        // Actually, snippet 3041 ended at line 350. `updateColors` might be further down?
        // Let me check.
        // I will insert `calculateRegions` at the end of the file or near methods.
        // Line 308 calls `this.updateColors`.
        // I will add `calculateRegions` method definition in a safe spot (e.g. after `initTerrain` or `generateRandomTerrain`).
        // And CALL it inside `generateRandomTerrain`.
        // The instruction says "EndLine: 309".
        // Code snippet 3041:
        // 307: this.updateMesh();
        // 308: this.updateColors();
        // 309: }
        // I will replace 308-309 to call calculateRegions.
    }

    updateMesh() {
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

        this.geometry.attributes.position.needsUpdate = true;

        // Native smooth normals work perfectly on a continuous mesh!
        this.geometry.computeVertexNormals();
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

        this.mesh = new THREE.Mesh(this.geometry, material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.set(0, 0, 0); // Centered

        // 1. Grid Lines (Gray) - User Request
        const gridGeo = new THREE.BufferGeometry();
        gridGeo.setAttribute('position', this.geometry.attributes.position);

        // Generate Custom Indices for Grid Lines (Horizontal and Vertical only)
        const indices = [];
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

        const gridMesh = new THREE.LineSegments(gridGeo, gridMat);
        gridMesh.position.set(0, 0, 0.04); // Slightly below dots
        this.mesh.add(gridMesh);

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
        const dotsMesh = new THREE.Points(this.geometry, dotsMaterial);
        dotsMesh.position.set(0, 0, 0.05); // Slight lift to avoid Z-fighting

        this.mesh.add(dotsMesh);

        this.scene.add(this.mesh);
        this.meshes.push(this.mesh);
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
        this.scene.add(this.waterMesh);
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

    setSeason(season) {
        if (this.currentSeason !== season) {
            console.log(`[DEBUG] Terrain.setSeason: Changing from ${this.currentSeason} to ${season}`);
            this.currentSeason = season;
            this.updateColors(this._lastIsNight);
        }
    }

    updateColors(isNight) {
        if (isNight === undefined) isNight = this._lastIsNight || false;
        const colors = this.geometry.attributes.color.array;
        const positions = this.geometry.attributes.position.array;
        const season = this.currentSeason || 'Spring';
        // Debug first iteration
        console.log(`[DEBUG] Terrain.updateColors: Season=${season}, IsNight=${isNight}`);

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];

            const gx = Math.round(x + this.width / 2);
            const gy = Math.round(-y + this.depth / 2);

            const lx = ((gx % this.logicalWidth) + this.logicalWidth) % this.logicalWidth;
            const lz = ((gy % this.logicalDepth) + this.logicalDepth) % this.logicalDepth;

            if (this.grid[lx] && this.grid[lx][lz]) {
                const cell = this.grid[lx][lz];
                const height = cell.height;
                const noise = cell.noise;
                const moisture = cell.moisture || 0.5;

                // Use Shared Helper
                const color = this.getBiomeColor(height, moisture, noise, isNight, season, lx, lz);

                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }
        }
        this.geometry.attributes.color.needsUpdate = true;
    }
    // SHARED HELPER for Main View & Minimap

    isReachable(sx, sz, tx, tz) {
        const startCell = this.grid[sx % this.logicalWidth][sz % this.logicalDepth];
        const targetCell = this.grid[tx % this.logicalWidth][tz % this.logicalDepth];
        if (!startCell || !targetCell) return false;
        if (targetCell.height <= 0) return false; // In water
        return startCell.regionId === targetCell.regionId;
    }

    updateColors(season = 'Spring', isNight = false) {
        if (!this.geometry) return;

        const count = this.geometry.attributes.position.count;
        const colorAttr = this.geometry.attributes.color;
        const width = this.logicalWidth;
        const depth = this.logicalDepth;

        // Visual Params
        const isWinter = season === 'Winter';

        for (let i = 0; i < count; i++) {
            // Mapping from PlaneGeometry vertex index to Grid Coordinate
            const x = this.geometry.attributes.position.getX(i);
            const z = this.geometry.attributes.position.getY(i); // Plane is XY

            // Convert to Logical Grid (Approximate for Visuals)
            // Assuming 1 unit = 1 grid cell roughly, or use modulo
            // Simpler: map x,z to grid using logic similar to getVisualPosition inverse
            // But here we iterate vertices.
            // Let's assume standard mapping:
            let lx = Math.floor((x + width / 2));
            let lz = Math.floor((-z + depth / 2)); // z is -y in plane

            // Clamp / Wrap
            lx = ((lx % width) + width) % width;
            lz = ((lz % depth) + depth) % depth;

            const cell = this.grid[lx][lz];
            if (cell) {
                const height = cell.height;
                const moisture = cell.moisture || 0.5;
                const noise = cell.noise;

                const color = this.getBiomeColor(height, moisture, noise, isNight, season, lx, lz);
                colorAttr.setXYZ(i, color.r, color.g, color.b);
            }
        }
        colorAttr.needsUpdate = true;
    }

    getBiomeColor(height, moisture, noise, isNight, season, lx, lz, forMinimap = false) {
        const color = new THREE.Color();

        // 1. Water Logic (Minimap Only)
        if (forMinimap && height <= 0) {
            // Lighter "Mizuiro" (Light Blue)
            // Gradient based on depth
            const waterColor = new THREE.Color(0x00BFFF); // Deep Sky Blue
            const deepColor = new THREE.Color(0x00008B); // Dark Blue

            let depthConfig = Math.min(1.0, Math.abs(height) / 5.0);
            waterColor.lerp(deepColor, depthConfig * 0.5);

            return waterColor;
        }

        // 2. Standard Terrain Logic (Height & Season) - Base Color
        if (height <= 4) {
            // Grass / Plains
            if (season === 'Winter') {
                color.setHex(0xBDB76B); // Khaki
                // Add tiny noise
                const n = (noise + 1) * 0.5;
                color.lerp(new THREE.Color(0xA09A5A), n * 0.2);
            } else if (season === 'Summer') {
                color.setHex(0x00A850); // Vibrant Green
            } else if (season === 'Autumn' || season === 'Spring') {
                color.setHex(0x88DD88); // Spring
            } else {
                color.setHex(0x88DD88); // Default
            }
        } else if (height <= 8) {
            // Forest
            if (season === 'Winter') {
                color.setHex(0xFFFFFF); // White
                const n = (noise + 1) * 0.5;
                color.lerp(new THREE.Color(0xEEF5FF), n * 0.1);
            } else if (season === 'Autumn') {
                // Patchy Autumn
                const dot = lx * 12.9898 + lz * 78.233;
                let hash = Math.sin(dot) * 43758.5453;
                hash = hash - Math.floor(hash);

                if (hash > 0.66) color.setHex(0xCC0000); // Red
                else if (hash > 0.33) color.setHex(0xFFCC00); // Yellow
                else color.setHex(0x228B22); // Green
            } else if (season === 'Summer') {
                color.setHex(0x006400); // Deep Green
            } else {
                color.setHex(0x228B22); // Spring
            }
        } else {
            // Rock
            color.setHex(0x808080);
            const n = (noise + 1) * 0.5;
            color.lerp(new THREE.Color(0x606060), n * 0.2);
        }

        // 3. Special Biome Logic (Desert / Swamp)
        // Desert
        if (moisture < 0.5 && height <= 8) {
            const sandColor = new THREE.Color(0xF4A460);
            let sandFactor = 1.0;
            if (moisture > 0.35) sandFactor = 1.0 - ((moisture - 0.35) / 0.15);
            color.lerp(sandColor, sandFactor);
        }

        // Swamp
        if (moisture > 0.6 && height <= 3) {
            const swampColor = new THREE.Color(0x2F4F4F);
            let moistFade = Math.min(1.0, Math.max(0, (moisture - 0.6) / 0.15));
            // Autumn Swamp
            if (season === 'Autumn') swampColor.setHex(0x4B3621);
            let heightFade = (height > 2) ? (1.0 - (height - 2)) : 1.0;
            color.lerp(swampColor, moistFade * heightFade);
        }

        // 4. Night Mode
        if (isNight) {
            const hsl = {};
            color.getHSL(hsl);
            hsl.l *= 0.3; // Dim

            // Glow Logic (Simplified) - Removed expensive neighbor check for performance in helper
            // Or keep it? getBiomeColor is called 25600 times. Neighbor check is 25x.
            // That's 640k checks.
            // Simplified: Just use self building? Or global light map?
            // For now, simple dim.
            // If we want glow, pass it in? OR check grid.
            // Let's keep it simple for now to fix syntax.

            // Restore Glow if needed later.

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
        const queue = [];

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
            this.updateWorkerCell(start.x, start.z, this.grid[start.x][start.z].height); // SYNC
            totalChange += Math.abs(amount);
            queue.push(start);
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
                    this.updateWorkerCell(nw.x, nw.z, newH); // SYNC
                    queue.push(nw);
                }
                // If difference < -1, push neighbor DOWN (if we lowered the center)
                else if (diff < -1) {
                    const newH = currentHeight + 1;
                    totalChange += Math.abs(newH - neighborHeight);
                    neighborCell.height = newH;
                    this.updateWorkerCell(nw.x, nw.z, newH); // SYNC
                    queue.push(nw);
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

        this.updateMesh();
        this.updateColors();
        this.needsRegionRecalc = true; // Set flag for deferred recalculation

        return totalChange;
    }

    getTileHeight(x, z) {
        const lx = (Math.round(x) + this.logicalWidth) % this.logicalWidth;
        const lz = (Math.round(z) + this.logicalDepth) % this.logicalDepth;
        if (this.grid[lx] && this.grid[lx][lz]) {
            const h = this.grid[lx][lz].height;
            return h;
        }
        return 0;
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

        let h;
        if (dx + dz <= 1) {
            // Triangle 1: (0,0), (1,0), (0,1)
            // Plane defined by h00, h10, h01
            // h = h00 + (h10 - h00)*dx + (h01 - h00)*dz
            h = h00 + (h10 - h00) * dx + (h01 - h00) * dz;
        } else {
            // Triangle 2: (1,1), (1,0), (0,1)
            // Interpolate from (1,1) back?
            // h = h11 + (h10 - h11)*(1-dz) + (h01 - h11)*(1-dx)
            // Let's verify:
            // At dx=1, dz=0 (h10): h11 + (h10-h11)*1 + 0 = h10. OK.
            // At dx=0, dz=1 (h01): h11 + 0 + (h01-h11)*1 = h01. OK.
            // At dx=1, dz=1 (h11): h11 + 0 + 0 = h11. OK.
            h = h11 + (h10 - h11) * (1 - dz) + (h01 - h11) * (1 - dx);
        }

        return h;
    }

    isValidGrid(x, z) {
        return x >= 0 && x < this.logicalWidth && z >= 0 && z < this.logicalDepth;
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
        // Step size (1.0 is grid size)
        const step = 0.5;
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

    addBuilding(type, gridX, gridZ, force = false, skipMeshUpdate = false) {
        this.invalidatePathCache();

        // Use exact height
        if (!this.grid[gridX] || !this.grid[gridX][gridZ]) return null;
        // const h = this.grid[gridX][gridZ].height;

        // Use Building Class
        const building = new Building(this.scene, this, type, gridX, gridZ);
        // Adjust Y (Building constructor does updatePosition, but using tile height)
        // Building constructor sets position from grid using getPositionForGrid.
        // We might need to sync the specific rotation logic if needed, but visually Entity handles it.
        // Custom Rotation (legacy had random rotation)
        building.rotation = Math.random() * Math.PI * 2;

        // Squad Registration (Legacy Logic - moved here or inside Building?)
        // Building.js doesn't have Game instance access easily unless passed.
        // Let's keep squad logic here for now using compatibility userData.
        if (type === 'barracks' || type === 'tower') {
            if (window.game && window.game.registerSquad) {
                building.userData.squadId = window.game.registerSquad(type);
            }
        }

        const W = this.logicalWidth;
        const D = this.logicalDepth;
        const size = this.getBuildingSize(type);

        // Always flatten
        this.clearArea(gridX, gridZ, size);
        this.flattenArea(gridX, gridZ, size);

        // SAFETY CHECK
        if (!force && type !== 'cave' && !this.checkFlatArea(gridX, gridZ, size)) {
            return null;
        }

        // console.log(`[Terrain] addBuilding: ${type} at ${gridX},${gridZ}. Force:${force}`);

        this.buildings.push(building);

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const x = (gridX + i) % W;
                const z = (gridZ + j) % D;
                const cell = this.grid[x][z];
                cell.hasBuilding = true;
                cell.building = building;
            }
        }

        // console.log(`[Terrain] Building Added: ${type} at (${gridX}, ${gridZ}) Size:${size}x${size}. Total: ${this.buildings.length}`);

        // Entity constructor already registers it!
        // this.registerEntity(building, gridX, gridZ, 'building');
        if (!skipMeshUpdate && !this.isRestoring) this.updateMesh();

        return building;
    }

    clearArea(gridX, gridZ, size) {
        // Remove any buildings in this area
        const buildingsToRemove = new Set();
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
    }

    removeBuilding(building) {
        this.invalidatePathCache();
        if (!building) return;

        // 1. Remove from List
        let index = this.buildings.indexOf(building);

        if (index === -1) {
            console.log(`[Terrain] removeBuilding: Identity mismatch! searching by coord ${building.gridX},${building.gridZ}`);
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
            console.log(`[Terrain] removeBuilding: Failed to find in list! ${building.gridX},${building.gridZ}`);
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

        console.log(`[Terrain] Building removed at ${startX},${startZ}`);
    }

    invalidatePathCache() {
        this.pathCache = [];
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

    checkFlatArea(x, z, size) {
        const W = this.logicalWidth;
        const D = this.logicalDepth;
        if (!this.grid[x] || !this.grid[x][z]) return false;
        const h0 = this.grid[x][z].height;

        if (h0 <= 0) return false; // Cannot build on water
        if (this.grid[x][z].hasBuilding) return false;

        // Check Vertices (size + 1 for cell coverage)
        for (let i = 0; i <= size; i++) {
            for (let j = 0; j <= size; j++) {
                const nx = (x + i) % W;
                const nz = (z + j) % D;
                const cell = this.grid[nx][nz];

                // Strict: Must be same height, not water
                if (cell.height !== h0) return false;
                if (cell.height <= 0) return false;

                // Only check hasBuilding for the INTERIOR cells (0..size-1)
                // Shared edges (index == size) can be adjacent to other buildings?
                // Actually, to prevent overlap, we check hasBuilding on Cells.
                // Loop i,j corresponds to Vertices here.
                // BUT grid.hasBuilding usually marks the Cell anchored at that vertex.
                // If i == size, we are at the far edge vertex.
                // The cell at nx,nz (far edge) is OUTSIDE the building area.
                // So we should NOT check hasBuilding for i==size or j==size.

                if (i < size && j < size) {
                    if (cell.hasBuilding) return false;
                }
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
                    // Integrity Check: If building exists here, check if it survives
                    if (cell.hasBuilding && cell.building) {
                        this.checkBuildingIntegrity(cell.building);
                    }
                }
                // Also remove trees/rocks (noise)?
            }
        }
        if (changed) {
            this.updateMesh();
            this.updateColors(); // If height changed colors might change
            this.calculateRegions();
        }
        return true;
    }

    updatePopulation(deltaTime, isNight, activeUnits, spawnCallback) {
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
        let consumptionRate = 0.005;
        // Night: 1/10th consumption (User Request)
        if (isNight) consumptionRate *= 0.1;

        let foodNeed = totalPopulation * consumptionRate * deltaTime;



        // Make window.game.resources check safe
        const resources = (window.game && window.game.resources) ? window.game.resources : { grain: 0, fish: 0, meat: 0 };
        let hasFood = true;

        if (foodNeed > 0) {
            let needGrain = foodNeed * 0.40;
            let needMeat = foodNeed * 0.30;
            let needFish = foodNeed * 0.30;

            const consume = (type, amount) => {
                if (amount <= 0) return 0;
                if (resources[type] >= amount) {
                    resources[type] -= amount;
                    return 0;
                } else {
                    const consumed = resources[type];
                    resources[type] = 0;
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
        if (resources.grain > 0) variety++;
        if (resources.fish > 0) variety++;
        if (resources.meat > 0) variety++;

        let multiplier = 0.5;
        if (variety === 1) multiplier = 1.0;
        if (variety === 2) multiplier = 2.5;
        if (variety === 3) multiplier = 5.0;

        const baseRate = 0.05 * multiplier; // Tuned: 0.05 base = ~3m. With Variety(5x) = ~36s.

        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;

        // Staggered Updates
        const staggerCount = 20;
        const currentFrame = this.frameCount % staggerCount;

        this.buildings.forEach((building, index) => {
            // Skip unless it's this building's turn
            if (index % staggerCount !== currentFrame) return;

            // Adjust deltaTime to account for skipped frames
            const simDeltaTime = deltaTime * staggerCount;

            const type = building.userData.type;

            if (type === 'house' || type === 'barracks') {
                const bx = building.userData.gridX;
                const bz = building.userData.gridZ;

                let rate = baseRate;

                let cap = 10; // House Cap (User Request)

                if (type === 'barracks') {
                    rate *= 20; // Significantly faster (User Request)
                    cap = 200; // Aligned with UI
                }

                // Diminishing Returns
                const diminishingFactor = 200000 / (200000 + totalPopulation);
                rate *= diminishingFactor;

                if (!hasFood) rate *= 0.25; // Starvation slows growth but doesn't stop it (Legacy compatibility)

                // SYNC FIX: Update Class Property if available
                if (typeof building.population === 'number') {
                    building.population += rate * simDeltaTime;
                    // Building.update() will sync this back to userData later
                    // But we keep userData in sync now just in case
                    building.userData.population = building.population;
                } else {
                    // Legacy Fallback (Object literal)
                    building.userData.population += rate * simDeltaTime;
                }


                // Spawning Logic (When full)
                const currentPop = (typeof building.population === 'number') ? building.population : building.userData.population;

                if (currentPop >= cap) {
                    if (spawnCallback) {
                        if (type === 'house') {
                            // House: Spawn 1 unit, Reset to 0 (User Request)
                            const spawned = spawnCallback(bx, bz, type, building);
                            if (spawned) {
                                if (typeof building.population === 'number') building.population = 0;
                                building.userData.population = 0;
                            } else {
                                if (typeof building.population === 'number') building.population = cap;
                                building.userData.population = cap; // Wait if blocked
                            }
                        } else if (type === 'barracks') {
                            // Barracks: Spawn 2 units (Halved per User Request), Reset to 0
                            let spawnedCount = 0;
                            for (let k = 0; k < 2; k++) {
                                // Pass Squad ID!
                                if (spawnCallback(bx, bz, type, building, building.userData.squadId)) spawnedCount++;
                            }
                            if (spawnedCount > 0) {
                                if (typeof building.population === 'number') building.population = 0;
                                building.userData.population = 0;
                            } else {
                                if (typeof building.population === 'number') building.population = cap;
                                building.userData.population = cap;
                            }
                        } else {
                            // Just clamp
                            const clampVal = (currentPop > cap) ? cap : currentPop;
                            if (typeof building.population === 'number') building.population = clampVal;
                            building.userData.population = clampVal;
                        }
                    }
                }
            } else if (type === 'tower') {
                // TOWER SPAWN LOGIC
                const rate = baseRate * 20; // Significantly faster
                const cap = 300; // Aligned with UI

                building.userData.population += rate * simDeltaTime;

                if (building.userData.population >= cap) {
                    // SPAWN 2 WIZARDS (Halved per User Request)
                    if (spawnCallback) {
                        let spawnedCount = 0;
                        for (let k = 0; k < 2; k++) {
                            // Pass Squad ID!
                            if (spawnCallback(building.userData.gridX, building.userData.gridZ, 'tower', building, building.userData.squadId)) spawnedCount++;
                        }

                        if (spawnedCount > 0) {
                            building.userData.population = 0;
                        } else {
                            building.userData.population = cap;
                        }
                    }
                }
            } else if (type === 'farm') {
                // Farm Logic: Yield based on Moisture
                // Farm Logic
                const growthRate = 10;
                building.userData.population = (building.userData.population || 0) + growthRate * simDeltaTime;

                while (building.userData.population >= 100) {
                    building.userData.population -= 100;
                    if (window.game && window.game.resources) {
                        // Variable Yield based on Moisture
                        const x = building.userData.gridX;
                        const z = building.userData.gridZ;
                        const m = this.grid[x][z].moisture || 0.5;

                        const diff = Math.abs(m - 0.5);
                        let efficiency = 1.0 - (diff * 2.0); // 0.5 diff -> 0 efficiency
                        if (efficiency < 0.2) efficiency = 0.2; // Min 20%

                        // Buff: Increase base yield 5 -> 50 -> Nerf to 20 -> Nerf to 8
                        const yieldAmount = Math.floor(8 * efficiency);
                        window.game.resources.grain += yieldAmount;
                    }
                }
            }
        });
    }

    update(deltaTime, spawnCallback, isNight) {
        // 1. Visual Updates
        if (this.colorsDirty) {
            this.updateColors();
            this.colorsDirty = false;
        }

        if (this.waterMesh && this.waterMesh.material.uniforms) {
            this.waterMesh.material.uniforms.uTime.value += deltaTime;
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
        // activeUnits approximated as 0 here (or we could track it, but for now 0 is safe/optimistic)
        this.updatePopulation(deltaTime, isNight, 0, spawnCallback);
    }

    updateLights(time) {
        // Obsolete: BuildingRenderer handles lighting via material uniforms
        return;
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
            r: (b.rotation !== undefined) ? Math.round(b.rotation * 100) / 100 : 0
        }));

        const data = {
            logicalWidth: W,
            logicalDepth: D,
            version: 2,
            h: hList,
            n: nList,
            b: encodedBuildings
        };

        if (hasMoisture) data.m = mList;
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

        const newW = (data.logicalWidth !== undefined) ? data.logicalWidth : data.width;
        const newD = (data.logicalDepth !== undefined) ? data.logicalDepth : data.depth;

        if (newW !== this.logicalWidth || newD !== this.logicalDepth) {
            console.log(`[Terrain] deserialize: Resize detected! ${this.logicalWidth}x${this.logicalDepth} -> ${newW}x${newD}`);
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
                            rotation: bd.r
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
                            console.error(`[Terrain] Failed to restore building ${bd.t} at index ${i}:`, e2);
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
                                rotation: (bData.r !== undefined) ? bData.r : bData.rotation
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
                                    fullData.userData.squadId = window.game.registerSquad('tower');
                                }
                                this.restoreTower(fullData);
                            } else if (type === 'barracks') {
                                if (fullData.userData && !fullData.userData.squadId) {
                                    fullData.userData.squadId = window.game.registerSquad('barracks');
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
        this.syncToWorker(); // Init worker with loaded data
    }


    restoreHouse(data) {
        const building = this.addBuilding('house', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            building.level = data.level || 1;
            building.userData.level = data.level || 1;
            if (data.rotation !== undefined) building.rotation = data.rotation;
        }
    }

    restoreFarm(data) {
        const building = this.addBuilding('farm', data.gridX, data.gridZ, true);
        if (building) {
            building.userData.hp = 5; // Farm HP
            if (data.rotation !== undefined) building.rotation = data.rotation;
        }
    }

    restoreMansion(data) {
        const building = this.addBuilding('mansion', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            building.level = data.level || 1;
            building.userData.level = data.level || 1;
            if (data.rotation !== undefined) building.rotation = data.rotation;
        }
    }

    // Legacy support
    restoreCastle(data) {
        const b = this.addBuilding('castle', data.gridX, data.gridZ, true);
        if (b) {
            b.population = data.population || 0;
            b.userData.population = data.population || 0;
            b.level = data.level || 2;
            b.userData.level = data.level || 2;
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

        if (this.mesh.position.x !== snapX || this.mesh.position.z !== snapZ) {
            this.mesh.position.set(snapX, 0, snapZ);
            if (this.waterMesh) {
                this.waterMesh.position.set(snapX, 0.2, snapZ);
            }
            // console.log(`Terrain Snapped to ${ snapX }, ${ snapZ } `);
        }
    }

    restoreGoblinHut(data) {
        // Use addBuilding to ensure consistency with other buildings
        const building = this.addBuilding('goblin_hut', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 1;
            building.userData.population = data.population || 1;
            if (data.rotation !== undefined) building.rotation = data.rotation;
        } else {
            console.warn("Failed to restore goblin_hut at", data.gridX, data.gridZ);
        }
    }

    restoreTower(data) {
        const building = this.addBuilding('tower', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            if (data.rotation !== undefined) building.rotation = data.rotation;
        }
    }

    restoreBarracks(data) {
        // Handle migration from Mansion -> Barracks if needed, or just standard restore
        const building = this.addBuilding('barracks', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
            if (data.rotation !== undefined) building.rotation = data.rotation;
        }
    }

    restoreCave(data) {
        // Caves are 1x1 (?) or larger? Checked addBuilding: 'cave' size=1.
        // Special: Caves might be auto-flattened or integrated differently.
        // Just use addBuilding to ensure visual creation.
        // HOWEVER, removeBuilding blocks cave removal. Checks?
        const building = this.addBuilding('cave', data.gridX, data.gridZ, true);
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

    findPathAsync(sx, sz, ex, ez, maxSteps = 0) {
        if (!this.worker) {
            // Fallback to sync if worker not ready
            return Promise.resolve(this.findPath(sx, sz, ex, ez, maxSteps));
        }

        return new Promise((resolve, reject) => {
            const id = ++this.requestIdCounter;
            this.workerRequests.set(id, { resolve, reject });

            this.worker.postMessage({
                type: 'FIND_PATH',
                id: id,
                payload: { sx, sz, ex, ez, maxSteps }
            });

            // Timeout safety?
            // setTimeout(() => { ... }, 5000);
        });
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

        // --- 2. BUDGET CHECK (Skip Calculation if overloaded) ---
        // Only applies if we didn't find a cache.
        if (this.pathfindingCalls > 50) { // Reduced from 100 to 50 to balance with higher maxSteps
            return null;
        }

        // --- 3. DEEP A* (Pioneer Calculation) ---

        // Validate Start/End
        const W = this.logicalWidth;
        const H = this.logicalDepth;
        if (maxStepsParam) console.log(`[Terrain] findPath with custom limit: ${maxStepsParam}`);

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

        const startNode = { x: sx, z: sz, g: 0, h: 0, f: 0, parent: null };
        const openList = [startNode];
        const openMap = new Map(); // O(1) Lookup
        openMap.set(`${sx},${sz}`, startNode);

        const closedSet = new Set(); // Stores "x,z" keys

        let steps = 0;
        const maxSteps = maxStepsParam > 0 ? maxStepsParam : 40000; // Increased to 40000 to escape deep traps

        let bestNode = startNode;
        let minH = Infinity;

        while (openList.length > 0) {
            steps++;
            if (steps > maxSteps) {
                console.log(`[Terrain] findPath MAX STEPS (${maxSteps}) Exceeded. Returning Partial Path to closest node (${bestNode.x},${bestNode.z} h:${bestNode.h.toFixed(1)}).`);

                // Reconstruct Partial Path
                const path = [];
                let curr = bestNode;
                while (curr) {
                    path.push({ x: curr.x, z: curr.z });
                    curr = curr.parent;
                }
                return path.reverse();
            }

            // Sort (Optimizable with Heap, but Array.sort is fast for small N)
            // Tip: Insert in order to avoid full sort? For now, sort is fine.
            openList.sort((a, b) => a.f - b.f);
            const current = openList.shift();

            // Track Best Node (Closest to Target by Heuristic)
            if (current.h < minH) {
                minH = current.h;
                bestNode = current;
            }

            const key = `${current.x},${current.z}`;
            openMap.delete(key);
            closedSet.add(key);

            if (current.x === ex && current.z === ez) {
                // Reconstruct Path
                const path = [];
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

                const nKey = `${nx},${nz}`;
                if (closedSet.has(nKey)) continue;
                if (!this.grid[nx] || !this.grid[nx][nz]) continue; // Guard against undefined grid

                const hStart = this.grid[current.x][current.z].height;
                const hEnd = this.grid[nx][nz].height;

                if (hEnd <= 0) continue; // Water
                // DEBUG: Log if blocked by wall
                // if (hEnd > 8) console.log(`[Terrain] Wall at ${nx},${nz} (H:${hEnd})`);

                const slope = Math.abs(hEnd - hStart);
                if (slope > 2.0) continue; // Restore steepness limit

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
                } else {
                    const newNode = {
                        x: nx, z: nz,
                        g: gScore, h: hScore, f: gScore + hScore,
                        parent: current
                    };
                    openList.push(newNode);
                    openMap.set(nKey, newNode);
                }
            }
        }
        return null; // No path found
    }

    /**
     * Finds the best target within a range using spatial partitioning or list iteration.
     * @param {string} type - 'goblin', 'unit', 'building', or 'any'
     * @param {number} cx - Center Grid X
     * @param {number} cz - Center Grid Z
     * @param {number} maxRange - Radius to search
     * @param {function} scoreFn - (entity, dist) => score (Lower is better). Return Infinity to skip.
     * @param {Array} list - Optional. If provided and small, scans this list. If large, prefers grid.
     */
    findBestTarget(type, cx, cz, maxRange, scoreFn, list) {
        let best = null;
        let bestScore = Infinity;

        // Use Spatial Grid if available and list is large or missing
        // This is O(R^2) vs O(N)
        // If maxRange is huge (e.g. 100), R^2 = 10000. N might be 18000.
        // If maxRange is small (15), R^2 = 225. Much faster.
        const useGrid = (this.entityGrid && (!list || list.length > 500) && maxRange < 40);

        if (useGrid) {
            const range = Math.ceil(maxRange);
            const W = this.logicalWidth;
            const D = this.logicalDepth;
            const minX = Math.max(0, cx - range);
            const maxX = Math.min(W - 1, cx + range);
            const minZ = Math.max(0, cz - range);
            const maxZ = Math.min(D - 1, cz + range);

            // OPTIMIZATION: Spiral Search or simple Scan?
            // Simple scan is cache-friendly-ish.
            for (let x = minX; x <= maxX; x++) {
                for (let z = minZ; z <= maxZ; z++) {
                    const cell = this.entityGrid[x][z];
                    if (!cell || cell.length === 0) continue;

                    // Dist Check (Manhattan first?)
                    // const dx = Math.abs(x - cx);
                    // const dz = Math.abs(z - cz);
                    // if (dx + dz > range * 1.5) continue; // Approx circle

                    for (const e of cell) {
                        // Type Check
                        if (type !== 'any') {
                            if (type === 'goblin' && e.type !== 'goblin') continue;
                            if (type === 'building' && e.type !== 'building') continue;
                            if (type === 'unit' && e.type !== 'unit') continue;
                        }

                        const d2 = (e.gridX - cx) ** 2 + (e.gridZ - cz) ** 2;
                        if (d2 > maxRange * maxRange) continue;

                        const dist = Math.sqrt(d2);
                        const score = scoreFn(e, dist);

                        if (score < bestScore) {
                            bestScore = score;
                            best = e;
                        }
                    }
                }
            }
        } else {
            // Fallback: List Iteration
            // If no list provided, assume buildings (legacy safe) or empty
            let candidates = list;
            if (!candidates) {
                if (type === 'building') candidates = this.buildings;
                // else if (type === 'goblin') candidates = window.game?.goblinManager?.goblins || []; // Unsafe coupling?
                else candidates = [];
            }

            for (const e of candidates) {
                // Pre-filter by dist?
                // Assuming candidates can be anywhere.
                const d2 = (e.gridX - cx) ** 2 + (e.gridZ - cz) ** 2;
                if (d2 > maxRange * maxRange) continue;

                const dist = Math.sqrt(d2);
                const score = scoreFn(e, dist);

                if (score < bestScore) {
                    bestScore = score;
                    best = e;
                }
            }
        }

        return best;
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
        console.log(`[Terrain] Validated/Cleared ${count} entities of type '${type}'.`);
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
            { x: cx, z: cz - 1 }
        ];

        const W = this.logicalWidth || 160;
        const D = this.logicalDepth || 160;

        for (const n of neighbors) {
            let nx = n.x;
            let nz = n.z;

            // Wrap
            if (nx < 0) nx = W - 1;
            else if (nx >= W) nx = 0;
            if (nz < 0) nz = D - 1;
            else if (nz >= D) nz = 0;

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
                if (this.grid[wx][wz].regionId === regionId) {
                    return { x: wx, z: wz };
                }
            }
        }
        return null;
    }
}
