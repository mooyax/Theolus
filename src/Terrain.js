import * as THREE from 'three';

export class Terrain {
    constructor(scene, clippingPlanes) {
        this.scene = scene;
        this.clippingPlanes = clippingPlanes || [];
        this.logicalWidth = 160;
        this.logicalDepth = 160;
        this.width = this.logicalWidth * 3; // Visual size (3x3 grid)
        this.depth = this.logicalDepth * 3;

        this.grid = []; // Stores the 40x40 logical data
        this.geometry = null;
        this.mesh = null;
        this.waterMesh = null;
        this.meshes = []; // Keep for compatibility if other classes check it, but will contain only 1 mesh
        this.buildings = []; // Track all buildings for population logic

        this.initTerrain();

        this.totalHousingPop = 0;

        // Spatial Partitioning for Entities
        this.entityGrid = [];
        this.initEntityGrid();
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
        if (!this.isValidGrid(x, z)) return;

        // Add metadata to entity if not present (handled by caller mostly, but useful here)
        entity._spatial = { x, z, type };

        this.entityGrid[x][z].push(entity);
    }

    unregisterEntity(entity) {
        if (!entity._spatial) return;
        const { x, z } = entity._spatial;

        if (this.isValidGrid(x, z)) {
            const cell = this.entityGrid[x][z];
            const idx = cell.indexOf(entity);
            if (idx !== -1) {
                cell.splice(idx, 1);
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
        if (Math.floor(oldX) === Math.floor(newX) && Math.floor(oldZ) === Math.floor(newZ)) {
            // Still in same cell, no need to update grid
            entity._spatial = { x: newX, z: newZ, type }; // Update pos in metadata though
            return;
        }
        this.unregisterEntity(entity);
        this.registerEntity(entity, newX, newZ, type);
    }



    findNearestEntity(type, centerX, centerZ, maxRadius) {
        // ... (Existing implementation kept for compatibility, or alias to findBestTarget?)
        // Let's keep existing and add new one to avoid breaking changes if used elsewhere efficiently.
        // Actually, let's implement findBestTarget below.
        let nearest = null;
        let minDistSq = maxRadius * maxRadius;
        const r = Math.ceil(maxRadius);
        const minX = Math.max(0, centerX - r);
        const maxX = Math.min(this.logicalWidth - 1, centerX + r);
        const minZ = Math.max(0, centerZ - r);
        const maxZ = Math.min(this.logicalDepth - 1, centerZ + r);

        for (let x = minX; x <= maxX; x++) {
            for (let z = minZ; z <= maxZ; z++) {
                const cell = this.entityGrid[x][z];
                for (let i = 0; i < cell.length; i++) {
                    const e = cell[i];
                    if (e._spatial && e._spatial.type === type) {
                        const dx = x - centerX;
                        const dz = z - centerZ;
                        const distSq = dx * dx + dz * dz;
                        if (distSq < minDistSq) {
                            if (e.isDead) continue;
                            minDistSq = distSq;
                            nearest = e;
                        }
                    }
                }
            }
        }
        return nearest;
    }

    findBestTarget(type, centerX, centerZ, maxRadius, costFn) {
        let bestEntity = null;
        let bestScore = Infinity;

        const r = Math.ceil(maxRadius);
        const minX = Math.max(0, centerX - r);
        const maxX = Math.min(this.logicalWidth - 1, centerX + r);
        const minZ = Math.max(0, centerZ - r);
        const maxZ = Math.min(this.logicalDepth - 1, centerZ + r);

        for (let x = minX; x <= maxX; x++) {
            for (let z = minZ; z <= maxZ; z++) {
                const cell = this.entityGrid[x][z];
                for (let i = 0; i < cell.length; i++) {
                    const e = cell[i];
                    if (e._spatial && e._spatial.type === type) {
                        if (e.isDead) continue;

                        const dx = x - centerX;
                        const dz = z - centerZ;
                        const dist = Math.sqrt(dx * dx + dz * dz);

                        if (dist > maxRadius) continue;

                        // Calculate Cost
                        const score = costFn(e, dist);

                        // We want the LOWEST score
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

    initTerrain() {
        // Initialize Logical Grid (40x40)
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

        // 1. Create Single Large Geometry (120x120)
        // Centered at 0,0. Covers -60 to 60.
        // We want the "Center" 40x40 to be at World 0,0.
        // PlaneGeometry is centered.
        this.geometry = new THREE.PlaneGeometry(this.width, this.depth, this.width, this.depth);
        // Rotate to XZ plane immediately to simplify logic? 
        // Or keep standard and rotate mesh. Standard is better for utils.

        const count = this.geometry.attributes.position.count;
        this.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));

        // 1.5. Apply Slight Terrain Distortion (User Request)
        // Adjust X/Y (which correspond to World X/Z) slightly to look natural
        const posAttr = this.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const x = posAttr.getX(i);
            const y = posAttr.getY(i);

            // Deterministic "Wobble" (Refactored to helper)
            const offsets = this.getVisualOffset(x, y);

            posAttr.setX(i, x + offsets.x);
            posAttr.setY(i, y + offsets.y);
        }
        // No need to update 'needsUpdate' yet as we haven't rendered, but good practice
        posAttr.needsUpdate = true;


        // 2. Generate Height Data (FBM) for Logical Grid
        this.generateRandomTerrain();

        // 3. Create Single Mesh
        this.createMesh();
        this.createWater();
    }

    generateRandomTerrain() {
        // Use a random offset so every reload is different
        this.seed = Math.random() * 100;

        // Populate Logical Grid
        for (let x = 0; x < this.logicalWidth; x++) {
            for (let z = 0; z < this.logicalDepth; z++) {
                // Normalize coordinates to 0..1 for seamless noise
                const u = x / this.logicalWidth;
                const v = z / this.logicalDepth;

                // Use Seamless FBM
                let n = this.seamlessFbm(u, v, this.seed);

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
        this.updateColors();
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
    getBiomeColor(height, moisture, noise, isNight, season, lx, lz, forMinimap = false) {
        const color = new THREE.Color();

        // 1. Sea Logic (RESTORED)
        if (height <= 0) {
            if (forMinimap) {
                // Minimap: Lighter "Mizuiro" Gradient
                const shallow = new THREE.Color(0x88CCFF);
                const deep = new THREE.Color(0x0066CC);
                let depthFactor = Math.abs(height) / 10.0;
                depthFactor = Math.min(1.0, depthFactor);
                color.copy(shallow).lerp(deep, depthFactor);
                return color;
            }

            // Terrain (3D View): SEABED COLOR
            color.setHex(0xF4A460); // Sand base
            // Texture variation using noise (0.9 to 1.1)
            const texture = 0.9 + (noise * 0.2);
            color.multiplyScalar(texture);
            return color;
        }

        // 2. Standard Terrain Logic (Height & Season) - Base Color
        if (height <= 4) {
            // Grass / Plains
            if (season === 'Winter') {
                // User Request: "Wasteland (Desert/Swamp/Sand) keep original."
                // "Plains (Grass) make Khaki (Withered)."
                color.setHex(0xBDB76B); // Khaki
                // Add tiny noise for texture
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
                // User Request: "Single solid colors dappled/spotted"
                // NEW: High-frequency pseudo-random noise based on coordinates (lx, lz).

                // Simple hash function for 0..1 range
                const dot = lx * 12.9898 + lz * 78.233;
                let hash = Math.sin(dot) * 43758.5453;
                hash = hash - Math.floor(hash); // Fract

                // Patches:
                if (hash > 0.66) color.setHex(0xCC0000); // Vivid Red
                else if (hash > 0.33) color.setHex(0xFFCC00); // Vivid Yellow
                else color.setHex(0x228B22); // Green
            } else if (season === 'Summer') {
                color.setHex(0x006400); // Deep Green
            } else {
                color.setHex(0x228B22); // Spring
            }
        } else {
            // Rock (Height > 8)
            color.setHex(0x808080);
            const n = (noise + 1) * 0.5;
            color.lerp(new THREE.Color(0x606060), n * 0.2);
        }

        // 3. Special Biome Logic (Desert / Swamp) - OVERRIDES
        // User Request (Winter): "Swamp... keep as original."
        // Means we apply Biome Logic even in Winter.
        // Desert
        if (moisture < 0.5 && height <= 8) {
            const sandColor = new THREE.Color(0xF4A460);
            let sandFactor = 1.0;
            if (moisture > 0.35) sandFactor = 1.0 - ((moisture - 0.35) / 0.15);
            color.lerp(sandColor, sandFactor);
        }

        // Swamp (High Moisture + Low Height)
        if (moisture > 0.6 && height <= 3) {
            const swampColor = new THREE.Color(0x2F4F4F);
            let moistFade = Math.min(1.0, Math.max(0, (moisture - 0.6) / 0.15));

            // Autumn Swamp -> Brownish
            if (season === 'Autumn') swampColor.setHex(0x4B3621);

            let heightFade = (height > 2) ? (1.0 - (height - 2)) : 1.0;
            color.lerp(swampColor, moistFade * heightFade);
        }

        // 4. Night Mode
        if (isNight) {
            const hsl = {};
            color.getHSL(hsl);

            hsl.l *= 0.3; // Dim

            // Glow Logic (Simplified for performance)
            let lightIntensity = 0.0;
            if (height > 0) {
                // Check neighbors (Radius 2)
                const W = this.logicalWidth;
                const H = this.logicalDepth;
                for (let dx = -2; dx <= 2; dx++) {
                    for (let dz = -2; dz <= 2; dz++) {
                        const nx = (lx + dx + W) % W;
                        const nz = (lz + dz + H) % H;
                        if (this.grid[nx] && this.grid[nx][nz] && this.grid[nx][nz].hasBuilding) {
                            const dist = Math.sqrt(dx * dx + dz * dz);
                            if (dist <= 2.5) lightIntensity += Math.max(0, 1.0 - (dist / 2.5));
                        }
                    }
                }
            }

            if (lightIntensity > 0) {
                lightIntensity = Math.min(1.0, lightIntensity);
                const glowH = 0.1; // Orange
                hsl.h = hsl.h * (1 - lightIntensity) + glowH * lightIntensity;
                hsl.l += lightIntensity * 0.4;
            }
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
                    queue.push(nw);
                }
                // If difference < -1, push neighbor DOWN (if we lowered the center)
                else if (diff < -1) {
                    const newH = currentHeight + 1;
                    totalChange += Math.abs(newH - neighborHeight);
                    neighborCell.height = newH;
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
            const W = this.logicalWidth || 80;
            const D = this.logicalDepth || 80;

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

        // Bilinear interpolation
        const h0 = h00 * (1 - dx) + h10 * dx;
        const h1 = h01 * (1 - dx) + h11 * dx;

        return h0 * (1 - dz) + h1 * dz;
    }

    isValidGrid(x, z) {
        return x >= 0 && x < this.logicalWidth && z >= 0 && z < this.logicalDepth;
    }

    raise(x, z) {
        return this.modifyHeight(x, z, 1);
    }

    lower(x, z) {
        return this.modifyHeight(x, z, -1);
    }



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

            // Check bounds (optimization)
            // But logical width is relative to world pos?
            // World 0,0 is at logicalWidth*1.5? No, center is complicated.
            // Let's just use getInterpolatedHeight which handles wrapping.

            // Optimization: If very high above max possible height (10-15), skip narrow checks?
            // Optimization: If very high above max possible height (e.g. 50), skip narrow checks
            if (check.y > 50) continue;
            if (check.y < -10) break; // Below ground

            // Refined Grid Mapping: (World 0,0 is Grid Center)
            const gx = check.x + this.logicalWidth / 2;
            const gz = check.z + this.logicalDepth / 2;

            const h_terrain = this.getInterpolatedHeight(gx, gz);

            if (check.y <= h_terrain) {
                // Hit (or went below)
                // Binary search refinement could be added here for precision
                // For now, return this point (slightly below surface)
                // Correct Y to terrain height?
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



    removeBuilding(b) {
        if (!b) return;

        // ENABLE CAVE DESTRUCTION (Requested by User)
        // if (b.userData && b.userData.type === 'cave') { ... }

        // console.warn(`[Terrain] Removing Building: ${b.userData.type} at ${b.gridX},${b.gridZ}`);
        // console.trace(); // Enable if needed, but warning might be enough to see context

        // Remove from list
        this.unregisterEntity(b);
        const idx = this.buildings.indexOf(b);
        if (idx > -1) this.buildings.splice(idx, 1);

        // Clear grid
        // Clear grid
        const size = this.getBuildingSize(b.type);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const x = (b.gridX + i) % this.logicalWidth;
                const z = (b.gridZ + j) % this.logicalDepth;
                if (this.grid[x][z].building === b) {
                    this.grid[x][z].hasBuilding = false;
                    this.grid[x][z].building = null;
                }
            }
        }
    }

    addBuilding(type, gridX, gridZ, force = false) {
        // Use exact height
        if (!this.grid[gridX] || !this.grid[gridX][gridZ]) return null;
        const h = this.grid[gridX][gridZ].height;

        const building = {
            type: type,
            gridX: gridX,
            gridZ: gridZ,
            y: h,
            rotation: Math.random() * Math.PI * 2,
            population: 0,
            id: Math.random().toString(36).substr(2, 9),
            userData: {
                type: type,
                gridX: gridX,
                gridZ: gridZ,
                population: 0,
                hp: (type === 'goblin_hut') ? 100 : (type === 'cave' ? 200 : 50)
            }
        };



        // Grid Occupation Logic
        const W = this.logicalWidth;
        const D = this.logicalDepth;

        // Consistent Sizing
        const size = this.getBuildingSize(type);

        // Auto-flatten for All Buildings (Worker prepares ground)
        // User reports buildings not appearing -> likely due to uneven ground check failing.
        // We force flatten the area to the height of the top-left (anchor) tile.
        // Auto-flatten for All Buildings (Worker prepares ground)
        if (true) { // Always flatten
            this.clearArea(gridX, gridZ, size); // Force remove obstacles
            this.flattenArea(gridX, gridZ, size);
        }

        // SAFETY CHECK: Verify flatness again (Internal enforcement)
        // Force Spawn for Caves: Bypass check
        if (!force && type !== 'cave' && !this.checkFlatArea(gridX, gridZ, size)) {
            // Should be flat now due to above, but if something failed:
            return null;
        }

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

        console.log(`[Terrain] Building Added: ${type} at (${gridX}, ${gridZ}) Size:${size}x${size}. Total: ${this.buildings.length}`);

        // OPTIMIZATION: Register as Entity for fast spatial search
        // Use Grid Center or Corner? Corner is gridX/Z.
        this.registerEntity(building, gridX, gridZ, 'building');

        // Refresh visuals to flatten ground under building (via getVisualOffset)
        this.updateMesh();

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

        const baseRate = 0.05 * multiplier; // Slower growth (Populous style)

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
                    rate *= 5; // Faster than house, but not instant
                    cap = 200; // Aligned with UI
                }

                // Diminishing Returns
                const diminishingFactor = 200000 / (200000 + totalPopulation);
                rate *= diminishingFactor;

                if (!hasFood) rate = 0;

                building.userData.population += rate * simDeltaTime;

                // Spawning Logic (When full)

                if (building.userData.population >= cap) {
                    if (spawnCallback) {
                        if (type === 'house') {
                            // House: Spawn 1 unit, Reset to 0 (User Request)
                            const spawned = spawnCallback(bx, bz, type, building);
                            if (spawned) {
                                building.userData.population = 0;
                            } else {
                                building.userData.population = cap; // Wait if blocked
                            }
                        } else if (type === 'barracks') {
                            // Barracks: Spawn 2 units (Halved per User Request), Reset to 0
                            let spawnedCount = 0;
                            for (let k = 0; k < 2; k++) {
                                if (spawnCallback(bx, bz, type, building)) spawnedCount++;
                            }
                            if (spawnedCount > 0) {
                                building.userData.population = 0;
                            } else {
                                building.userData.population = cap;
                            }
                        } else {
                            // Just clamp
                            if (building.userData.population > cap) building.userData.population = cap;
                        }
                    }
                }
            } else if (type === 'tower') {
                // TOWER SPAWN LOGIC
                const rate = baseRate * 5;
                const cap = 300; // Aligned with UI

                building.userData.population += rate * simDeltaTime;

                if (building.userData.population >= cap) {
                    // SPAWN 2 WIZARDS (Halved per User Request)
                    if (spawnCallback) {
                        let spawnedCount = 0;
                        for (let k = 0; k < 2; k++) {
                            if (spawnCallback(building.userData.gridX, building.userData.gridZ, 'tower', building)) spawnedCount++;
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
        if (this.colorsDirty) {
            this.updateColors();
            this.colorsDirty = false;
        }
        // Get active units from Global or verify
        const activeUnits = window.game && window.game.units ? window.game.units.length : 0;

        // Pass correct arguments: deltaTime, isNight, activeUnits, spawnCallback
        this.updatePopulation(deltaTime, isNight, activeUnits, spawnCallback);
    }

    updateLights(time) {
        // Obsolete: BuildingRenderer handles lighting via material uniforms
        return;
        /*
        // Night: 19-24, 0-5.
        const isNight = (time >= 18 || time < 6);
     
        // Optimization: Only update if state changed
        if (this._lastIsNight === isNight) return;
        this._lastIsNight = isNight;
     
        const colorHex = isNight ? 0xFFFF00 : 0x000000;
        // console.log("Updating lights. Time:", time, "IsNight:", isNight);
     
        this.buildings.forEach(building => {
            // Windows
            if (building.userData.windows) {
                building.userData.windows.forEach(win => {
                    if (win.material) {
                        win.material.color.setHex(colorHex);
                        // win.material.needsUpdate = true; // REMOVED: Expensive and unnecessary for color change
                    }
                });
            }
            // PointLight
            if (building.userData.light) {
                building.userData.light.intensity = isNight ? 1.0 : 0.0;
            }
        });
        */
    }

    serialize() {
        // Optimization: Reduce Precision and JSON structure overhead
        const data = {
            logicalWidth: this.logicalWidth,
            logicalDepth: this.logicalDepth,
            // Flattened or simplified? Keeping structure but optimizing entries.
            grid: []
        };

        const savedBuildingIds = new Set();

        for (let x = 0; x < this.logicalWidth; x++) {
            data.grid[x] = [];
            for (let z = 0; z < this.logicalDepth; z++) {
                const cell = this.grid[x][z];
                // Only save non-default check
                const cellData = {};

                // Truncate Precision (2 decimal places)
                // Math.round(num * 100) / 100
                cellData.h = Math.round(cell.height * 100) / 100;
                cellData.n = Math.round(cell.noise * 100) / 100;
                if (cell.moisture !== undefined) {
                    cellData.m = Math.round(cell.moisture * 100) / 100;
                }

                if (cell.hasBuilding) {
                    cellData.hb = 1;
                    if (cell.building) {
                        // Optimization: Verify building hasn't been saved yet
                        // Robust deduplication using ID
                        if (!savedBuildingIds.has(cell.building.id)) {
                            savedBuildingIds.add(cell.building.id);

                            // Save at current cell (effectively the "origin" for this save)
                            const bx = (cell.building.gridX !== undefined) ? cell.building.gridX : cell.building.userData.gridX;
                            const bz = (cell.building.gridZ !== undefined) ? cell.building.gridZ : cell.building.userData.gridZ;

                            cellData.b = {
                                t: cell.building.userData.type, // type
                                p: cell.building.userData.population, // population
                                x: bx,
                                z: bz,
                                r: (cell.building.rotation !== undefined) ? Math.round(cell.building.rotation * 100) / 100 : 0
                            };
                        }
                    }
                }

                data.grid[x][z] = cellData;
            }
        }
        return data;
    }

    async deserialize(data, onProgress) {
        if (!data) {
            console.error("Terrain.deserialize received invalid data:", data);
            return;
        }

        // Clear existing buildings
        this.buildings.forEach(b => {
            this.scene.remove(b);
            if (b.userData.clones) {
                b.userData.clones.forEach(c => this.scene.remove(c));
            }
        });
        this.buildings = [];

        // Clear grid buildings references - Fast synchronous clear is fine usually, 
        // but if map is huge, might need chunking too. Let's chunk logic width.
        const yieldInterval = 10; // Yield every 10 rows

        for (let x = 0; x < this.logicalWidth; x++) {
            // Yield periodically
            if (x % yieldInterval === 0) await new Promise(resolve => setTimeout(resolve, 0));

            for (let z = 0; z < this.logicalDepth; z++) {
                const cell = this.grid[x][z];
                if (cell.hasBuilding && cell.building) {
                    this.scene.remove(cell.building);
                }
                cell.hasBuilding = false;
                cell.building = null;
            }
        }

        // Restore Grid
        this.logicalWidth = data.logicalWidth;
        this.logicalDepth = data.logicalDepth;

        for (let x = 0; x < this.logicalWidth; x++) {
            // Yield periodically (Loading Bar effect?)
            if (x % yieldInterval === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
                if (onProgress) {
                    const pct = Math.floor((x / this.logicalWidth) * 100);
                    onProgress(pct);
                }
            }

            for (let z = 0; z < this.logicalDepth; z++) {
                const cellData = data.grid[x][z];
                // Support legacy format check? 
                // Checks if 'h' exists, otherwise use 'height'.
                const h = (cellData.h !== undefined) ? cellData.h : cellData.height;
                const n = (cellData.n !== undefined) ? cellData.n : cellData.noise;

                this.grid[x][z].height = h;
                this.grid[x][z].noise = n;
                if (cellData.m !== undefined) {
                    this.grid[x][z].moisture = cellData.m;
                } else if (cellData.moisture !== undefined) {
                    this.grid[x][z].moisture = cellData.moisture;
                }

                // Restore Buildings
                // Optimized format: hb (hasBuilding), b (building object with t, p, x, z, r)
                // Legacy: hasBuilding, building (type, population...)

                let hasB = cellData.hb || cellData.hasBuilding;
                let bData = cellData.b || cellData.building;

                if (hasB && bData) {
                    // Only restore if we are at the origin of the building to prevent duplication
                    // Check coords
                    const bx = (bData.x !== undefined) ? bData.x : bData.gridX;
                    const bz = (bData.z !== undefined) ? bData.z : bData.gridZ;

                    if (bx === x && bz === z) {
                        const type = bData.t || bData.type;
                        // Map simplified keys to full expected object
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
                            // Legacy: Convert to Mansion or House?
                            // User said "Abolish House/Farm, Rename Castle to House".
                            // If loading OLD castle, convert to NEW House (visual reuse).
                            // But old castle was 2x2. New House is 1x1.
                            // Safe fallback: Convert to Mansion (3x3)? Or keep as 'castle' legacy?
                            // Better: `restoreCastle` (Legacy) kept for compatibility, OR mapped to Mansion?
                            // Let's keep `restoreCastle` but maybe deprecate it.
                            this.restoreCastle(fullData);
                        } else if (type === 'goblin_hut') {
                            this.restoreGoblinHut(fullData);
                        } else if (type === 'tower') {
                            this.restoreTower(fullData);
                        } else if (type === 'barracks') {
                            this.restoreBarracks(fullData);
                        } else if (type === 'cave') {
                            this.restoreCave(fullData);
                        }
                    }
                }
            }
        }

        this.updateMesh();
        this.updateColors();
    }

    restoreHouse(data) {
        const building = this.addBuilding('house', data.gridX, data.gridZ, true);
        if (building) {
            building.population = data.population || 0;
            building.userData.population = data.population || 0;
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
            if (data.rotation !== undefined) building.rotation = data.rotation;
        }
    }

    // Legacy support
    restoreCastle(data) {
        // Keep old logic for old saves, or try to upgrade
        // For now, minimal support to prevent crash
        this.restoreMansion(data); // Upgrade to Mansion?
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




    findPath(sx, sz, ex, ez) {
        // A* Pathfinding (Simplified)
        // Returns array of {x, z} steps or null if no path
        const W = this.logicalWidth;
        const H = this.logicalDepth;

        // Wrap coords for start/end if needed, but assuming input is normalized helps

        // Priority Queue? Using simple array sort for now (Grid is small < 100x100)
        // If slow, optimize structure.

        const startNode = { x: sx, z: sz, g: 0, h: 0, f: 0, parent: null };
        const openList = [startNode];
        const closedSet = new Set(); // Stores "x,z" keys

        // Max steps to prevent infinite loop or lag
        let steps = 0;
        const maxSteps = 1000;

        while (openList.length > 0) {
            steps++;
            if (steps > maxSteps) return null; // Too complex

            // Get lowest F
            openList.sort((a, b) => a.f - b.f);
            const current = openList.shift();

            if (current.x === ex && current.z === ez) {
                // Reconstruct Path
                const path = [];
                let curr = current;
                while (curr) {
                    path.push({ x: curr.x, z: curr.z });
                    curr = curr.parent;
                }
                return path.reverse();
            }

            const key = `${current.x},${current.z} `;
            closedSet.add(key);

            const neighbors = [
                { x: 1, z: 0 }, { x: -1, z: 0 },
                { x: 0, z: 1 }, { x: 0, z: -1 }
            ];

            for (const n of neighbors) {
                let nx = current.x + n.x;
                let nz = current.z + n.z;

                // Wrapping logic handled carefully?
                // Pathfinder should handle wrapping OR inputs should be unwrapped?
                // Given the game wraps, pathfinder needs to understand wrapping neighbors.
                if (nx < 0) nx = W - 1;
                if (nx >= W) nx = 0;
                if (nz < 0) nz = H - 1;
                if (nz >= H) nz = 0;

                if (closedSet.has(`${nx},${nz} `)) continue;

                // Passability Check
                const hStart = this.grid[current.x][current.z].height;
                // Important: Ensure this.grid[nx][nz] exists (Safety)
                if (!this.grid[nx] || !this.grid[nx][nz]) continue;

                const hEnd = this.grid[nx][nz].height;

                // Allow walking on land (h > 0) and climbing up to 2.0
                if (hEnd <= 0) continue; // Water
                if (Math.abs(hEnd - hStart) > 2.0) continue; // Too steep
                if (this.grid[nx][nz].hasBuilding) continue; // Blocked by Building

                const gScore = current.g + 1; // Distance 1

                // Check if already in openList with lower G
                const existing = openList.find(node => node.x === nx && node.z === nz);
                if (existing && existing.g <= gScore) continue;

                // Heuristic (Manhattan with wrap awareness)
                let dx = Math.abs(nx - ex);
                let dz = Math.abs(nz - ez);
                if (dx > W / 2) dx = W - dx;
                if (dz > H / 2) dz = H - dz;
                const hScore = dx + dz;

                const newNode = {
                    x: nx,
                    z: nz,
                    g: gScore,
                    h: hScore,
                    f: gScore + hScore,
                    parent: current
                };

                if (existing) {
                    // Update existing (rarely reached with simplified queue logic above)
                    // We just replace or ignore. Since we checked gScore, we know ours is better.
                    // Ideally remove old, add new. 
                    // Array splice is fine for small list.
                    const idx = openList.indexOf(existing);
                    openList.splice(idx, 1);
                }
                openList.push(newNode);
            }
        }
        return null; // No path found
    }
}
