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
        let nearest = null;
        let minDistSq = maxRadius * maxRadius;

        // Spiral / BFS search is good, but simple localized loop is easier for manageable radius
        const r = Math.ceil(maxRadius);
        const minX = Math.max(0, centerX - r);
        const maxX = Math.min(this.logicalWidth - 1, centerX + r);
        const minZ = Math.max(0, centerZ - r);
        const maxZ = Math.min(this.logicalDepth - 1, centerZ + r);

        for (let x = minX; x <= maxX; x++) {
            for (let z = minZ; z <= maxZ; z++) {
                const cell = this.entityGrid[x][z];
                // Iterate entities in this cell
                for (let i = 0; i < cell.length; i++) {
                    const e = cell[i];
                    // Check type
                    // Check if entity is valid/alive? (Caller should ensure registration relies on alive)
                    // We assume registered entities are alive.

                    // e._spatial.type should match
                    if (e._spatial && e._spatial.type === type) {
                        // Check exact distance
                        const dx = x - centerX;
                        const dz = z - centerZ;
                        const distSq = dx * dx + dz * dz;
                        if (distSq < minDistSq) {
                            if (e.isDead) continue; // Safety check
                            minDistSq = distSq;
                            nearest = e;
                        }
                    }
                }
            }
        }
        return nearest;
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
                let height = (n * 20) - 8;
                height = Math.max(-5, height); // Cap depth at -5
                height = Math.round(height);

                this.grid[x][z].height = height;
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

        // Wireframe Overlay (Restored for visualization)
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
            clippingPlanes: this.clippingPlanes,
            clipShadows: false
        });
        const wireframe = new THREE.Mesh(this.geometry, wireframeMaterial);

        wireframeMaterial.polygonOffset = true;
        wireframeMaterial.polygonOffsetFactor = 1;
        wireframeMaterial.polygonOffsetUnits = 1;

        this.mesh.add(wireframe);

        this.scene.add(this.mesh);
        this.meshes.push(this.mesh); // For InputManager compatibility
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

    updateColors(isNight = false) {
        const colors = this.geometry.attributes.color.array;
        const positions = this.geometry.attributes.position.array;

        // Optimization: Pre-calculate building map for faster "glow" lookup?
        // grid[x][z].hasBuilding is O(1). 

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
                let color = new THREE.Color();

                if (height <= 0) {
                    color.setHex(0xF4A460); // Sand
                } else if (height <= 4) {
                    color.setHex(0x66CC66); // Lighter Grass
                } else if (height <= 8) {
                    color.setHex(0x005522); // Forest
                } else {
                    color.setHex(0x808080); // Rock
                }

                const hsl = {};
                color.getHSL(hsl);
                hsl.l = Math.max(0.2, Math.min(0.9, hsl.l + noise));
                if (height > 4 && height <= 8) hsl.h += noise * 2;

                // Night Logic: Dim everything, then add Glow
                if (isNight) {
                    hsl.l *= 0.3; // Dim terrain significantly at night

                    // Glow Logic
                    // Check local and neighbors for buildings
                    // Radius 2 check (5x5) for soft spread
                    let lightIntensity = 0.0;

                    // Simple range check: -2 to +2
                    // Optimization: Only check if we are NOT water (height > 0)
                    if (height > 0) {
                        for (let dx = -2; dx <= 2; dx++) {
                            for (let dz = -2; dz <= 2; dz++) {
                                const nx = (lx + dx + this.logicalWidth) % this.logicalWidth;
                                const nz = (lz + dz + this.logicalDepth) % this.logicalDepth;
                                if (this.grid[nx][nz].hasBuilding) {
                                    // Distance falloff
                                    const dist = Math.sqrt(dx * dx + dz * dz);
                                    if (dist <= 2.5) {
                                        // Specific Building Type Logic?
                                        // Castle = Brighter/Larger? for now uniformity
                                        // Add intensity based on distance
                                        lightIntensity += Math.max(0, 1.0 - (dist / 2.5));
                                    }
                                }
                            }
                        }
                    }

                    // Apply Glow (Warm Yellow)
                    if (lightIntensity > 0) {
                        // Blend towards yellow/orange
                        // lightIntensity can exceed 1 with multiple neighbors, clamp it
                        lightIntensity = Math.min(1.0, lightIntensity);

                        // Target Color: Warm Orange Glow (H: 30-40, S: 1.0, L: 0.5-0.8)
                        // Current Color is Dimmed Terrain.
                        // We add Light.

                        // Lerp hue towards Orange (0.1)
                        // Increase Lightness

                        const glowH = 0.1; // Orange
                        const glowS = 1.0;
                        const glowL = 0.6;

                        // Simple Lerp
                        hsl.h = hsl.h * (1 - lightIntensity) + glowH * lightIntensity;
                        hsl.s = hsl.s * (1 - lightIntensity) + glowS * lightIntensity;
                        hsl.l = hsl.l + (glowL * lightIntensity); // Additive light
                    }
                }

                color.setHSL(hsl.h, hsl.s, hsl.l);

                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
            }
        }
        this.geometry.attributes.color.needsUpdate = true;
    }

    modifyHeight(startX, startZ, amount) {
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
                this.scene.remove(cell.building);
                if (cell.building.userData && cell.building.userData.clones) {
                    cell.building.userData.clones.forEach(clone => this.scene.remove(clone));
                }
                cell.building = null;
                cell.hasBuilding = false;

                // Remove from buildings array
                const index = this.buildings.indexOf(cell.building);
                if (index > -1) {
                    this.buildings.splice(index, 1);
                }

                console.log("Building destroyed at", cx, cz);
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
                    neighborCell.height = currentHeight - 1;
                    queue.push(nw);
                }
                // If difference < -1, push neighbor DOWN (if we lowered the center)
                else if (diff < -1) {
                    neighborCell.height = currentHeight + 1;
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

            checkTiles.forEach(t => {
                const cell = this.grid[t.x][t.z];
                if (cell.hasBuilding && cell.building) {
                    // Verify flatness AND Water Level
                    const b = cell.building;
                    let isValid = true;

                    // 1. Water Check: If base is <= 0, destroy immediately
                    const baseHeight = this.grid[t.x][t.z].height;
                    if (baseHeight <= 0) {
                        isValid = false;
                        console.log("Building drowned!");
                    }

                    if (b.userData.type === 'house' || b.userData.type === 'farm') {
                        // Check 4 corners of this tile
                        const h00 = this.grid[t.x][t.z].height;
                        const h10 = this.grid[(t.x + 1) % this.logicalWidth][t.z].height;
                        const h01 = this.grid[t.x][(t.z + 1) % this.logicalDepth].height;
                        const h11 = this.grid[(t.x + 1) % this.logicalWidth][(t.z + 1) % this.logicalDepth].height;

                        if (h00 !== h10 || h00 !== h01 || h00 !== h11) {
                            isValid = false;
                        }
                    } else if (b.userData.type === 'castle') {
                        // Check 2x2 area flatness
                        // Castle origin is at b.userData.gridX, gridZ
                        const bx = b.userData.gridX;
                        const bz = b.userData.gridZ;

                        // Check all 4 tiles of the castle
                        // Actually, we just need to check if the castle's base is flat.
                        // Castle occupies (bx,bz), (bx+1,bz), (bx,bz+1), (bx+1,bz+1)
                        // All 9 vertices must be same height? 
                        // Or just the 4 tiles are flat?
                        // Let's check the 4 tiles.

                        const tiles = [
                            { x: bx, z: bz },
                            { x: (bx + 1) % this.logicalWidth, z: bz },
                            { x: bx, z: (bz + 1) % this.logicalDepth },
                            { x: (bx + 1) % this.logicalWidth, z: (bz + 1) % this.logicalDepth }
                        ];

                        // Get height of first tile
                        const h = this.grid[bx][bz].height;

                        // Check if all 4 tiles are flat and at height h
                        // This implies checking all corners of all 4 tiles.
                        // Simplified: Check all vertices involved.
                        // Vertices: (bx,bz) to (bx+2,bz+2)

                        for (let i = 0; i <= 2; i++) {
                            for (let j = 0; j <= 2; j++) {
                                const vx = (bx + i) % this.logicalWidth;
                                const vz = (bz + j) % this.logicalDepth;
                                if (this.grid[vx][vz].height !== h) {
                                    isValid = false;
                                }
                            }
                        }
                    }

                    if (!isValid) {
                        // Destroy building
                        this.scene.remove(b);
                        if (b.userData.clones) {
                            b.userData.clones.forEach(clone => this.scene.remove(clone));
                        }

                        // Clear references
                        // For castle, we need to clear multiple cells
                        if (b.userData.type === 'castle') {
                            const bx = b.userData.gridX;
                            const bz = b.userData.gridZ;
                            const tiles = [
                                { x: bx, z: bz },
                                { x: (bx + 1) % this.logicalWidth, z: bz },
                                { x: bx, z: (bz + 1) % this.logicalDepth },
                                { x: (bx + 1) % this.logicalWidth, z: (bz + 1) % this.logicalDepth }
                            ];
                            tiles.forEach(tile => {
                                const c = this.grid[tile.x][tile.z];
                                c.hasBuilding = false;
                                c.building = null;
                            });
                        } else {
                            cell.hasBuilding = false;
                            cell.building = null;
                        }

                        // Remove from buildings array
                        const index = this.buildings.indexOf(b);
                        if (index > -1) {
                            this.buildings.splice(index, 1);
                        }

                        console.log("Building destroyed due to terrain change at", t.x, t.z);
                    }
                }
            });
        }

        this.updateMesh();
        this.updateColors();
    }

    getTileHeight(x, z) {
        const lx = (Math.round(x) + this.logicalWidth) % this.logicalWidth;
        const lz = (Math.round(z) + this.logicalDepth) % this.logicalDepth;
        if (this.grid[lx] && this.grid[lx][lz]) {
            const h = this.grid[lx][lz].height;
            // Debug Log (Sparse) - Removed for performance
            // if (window.game && Math.random() < 0.0001) {
            //     console.log(`Terrain Debug: getTileHeight(${x},${z}) -> [${lx},${lz}] = ${h}`);
            // }
            return h;
        }
        console.warn(`Terrain Debug: Invalid Grid Access at ${lx},${lz}`);
        return 0;
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
        this.modifyHeight(x, z, 1);
    }

    lower(x, z) {
        this.modifyHeight(x, z, -1);
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
            if (check.y > 20) continue;
            if (check.y < -5) break; // Below ground

            const h = this.getInterpolatedHeight((check.x + this.width / 2), (check.z + this.depth / 2));
            // Wait, getInterpolatedHeight expects Grid coordinates (0..40/120).
            // World coordinates: 0,0 is center.
            // visual width is this.width.
            // Grid 0,0 corresponds to World -width/2, -depth/2 ?
            // Need to map World -> Grid.

            // From initTerrain: 
            // this.width = this.logicalWidth * 3;
            // Geometry centered.
            // So Grid X = (World X + Width/2).
            // But we use logical wrapping.

            // Let's use the helper:
            // InputManager uses `getTileHeight(gridX, gridZ)`.
            // World -> Grid:
            // const gridX = Math.floor(intersect.point.x + logicalW/2);
            // This assumes 1 world unit = 1 grid unit?
            // Yes, PlaneGeometry(width, depth, width, depth) means 1 segment = 1 unit.

            // Refined Grid Mapping:
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

    /**
     * Registers a new building at the given coordinates.
     * Replaces old mesh-based logic.
     */
    addBuilding(type, gridX, gridZ) {
        // Use exact height to prevent submerging on flat-but-fractional terrain
        // getTileHeight uses floor(), which causes issues.
        const h = this.grid[gridX][gridZ].height;

        const building = {
            type: type,
            gridX: gridX,
            gridZ: gridZ,
            y: h,
            population: 0,
            id: Math.random().toString(36).substr(2, 9) // Unique ID
        };

        // Initial population
        if (type === 'house' || type === 'farm') building.population = 10;
        if (type === 'castle') building.population = 50;

        // Compatibility Shim for Goblin/Legacy logic
        building.userData = building;

        this.buildings.push(building);

        // Mark grid
        // Mark grid
        const cell = this.grid[gridX][gridZ];
        cell.hasBuilding = true;
        cell.building = building;

        // Castle extra cells
        if (type === 'castle') {
            // Mark 2x2
            const offsets = [{ x: 1, z: 0 }, { x: 0, z: 1 }, { x: 1, z: 1 }];
            offsets.forEach(o => {
                const ox = (gridX + o.x) % this.logicalWidth;
                const oz = (gridZ + o.z) % this.logicalDepth;
                this.grid[ox][oz].hasBuilding = true;
                this.grid[ox][oz].building = building;
            });
        }

        console.log(`Building added: ${type} at ${gridX},${gridZ}`);
        return building;
    }

    removeBuilding(building) {
        const idx = this.buildings.indexOf(building);
        if (idx !== -1) {
            this.buildings.splice(idx, 1);
            console.log("Terrain: Building removed from list. Remaining:", this.buildings.length);
        } else {
            console.warn("Terrain: removeBuilding called but building not found in list!");
        }

        // Unmark grid
        // Simple 1x1 unmark (Castle needs more, but for now ok)
        // Ideally should check all cells pointing to this building
        for (let x = 0; x < this.logicalWidth; x++) {
            for (let z = 0; z < this.logicalDepth; z++) {
                if (this.grid[x][z].building === building) {
                    this.grid[x][z].hasBuilding = false;
                    this.grid[x][z].building = null;
                }
            }
        }
    }

    updatePopulation(deltaTime, spawnCallback) {
        // 1 real second = 12 game seconds
        // Base growth: 5 per real second. -> Adjusted logic below

        // Resource check
        const resources = window.game ? window.game.resources : { grain: 0, fish: 0, meat: 0 };

        let variety = 0;
        if (resources.grain > 0) variety++;
        if (resources.fish > 0) variety++;
        if (resources.meat > 0) variety++;

        // Base rate logic
        // If 0 variety, very slow growth? Or 0?
        // Let's say base is 0.05.
        // Variety multiplier: 1 type -> 1x, 2 types -> 3x, 3 types -> 6x ?
        // User said "balance of 3 types changes growth rate".

        let multiplier = 0.5;
        if (variety === 1) multiplier = 1.0;
        if (variety === 2) multiplier = 2.5;
        if (variety === 3) multiplier = 5.0;

        const baseRate = 0.2 * multiplier;
        const farmBonus = 0.1; // Reduced since farms provide grain which provides multiplier

        this.buildings.forEach(building => {
            const type = building.userData.type;

            if (type === 'house' || type === 'castle') {
                const bx = building.userData.gridX;
                const bz = building.userData.gridZ;

                // Count nearby farms still relevant? Maybe Keep it as "Job" bonus
                // But mainly rely on Global Food.
                // Let's keep farm bonus scaling but small.

                let rate = baseRate;

                // Castle Bonus: 2x Growth
                if (type === 'castle') {
                    rate *= 2;
                }

                // Diminishing Returns based on Total Population
                const totalPop = window.game ? window.game.totalPopulation : 0;
                const diminishingFactor = 2000 / (2000 + totalPop);
                rate *= diminishingFactor;

                building.userData.population += rate * deltaTime;

                if (building.userData.population >= 100) {
                    building.userData.population = 0;

                    // Consume Food on Spawn
                    let consumed = false;
                    if (resources.fish > 0) { resources.fish--; consumed = true; }
                    if (resources.meat > 0) { resources.meat--; consumed = true; }
                    if (resources.grain > 0) { resources.grain--; }

                    spawnCallback(bx, bz);
                }
            } else if (type === 'farm') {
                // Farm Logic: Generate Food
                // Use population field as progress (0-100)
                // Rate: 100 / 10 seconds = 10 per second
                const growthRate = 10;
                building.userData.population = (building.userData.population || 0) + growthRate * deltaTime;

                if (building.userData.population >= 100) {
                    building.userData.population = 0;
                    if (window.game && window.game.resources) {
                        window.game.resources.grain++;
                        // Visual feedback could go here
                    }
                }
            }
        });

        // Update Total Population Global (Housing Pop + Active Units)
        this.totalHousingPop = 0;
        this.buildings.forEach(b => {
            if (b.userData.population) this.totalHousingPop += b.userData.population;
        });

        // Game.js handles the final sum with unit count

    }

    update(deltaTime, spawnCallback) {
        this.updatePopulation(deltaTime, spawnCallback);
        // updateLights requires 'time' (hour of day), not deltaTime?
        // updateLights signature: updateLights(time)
        // Game.js passes deltaTime, but doesn't pass 'time' to terrain.update currently.
        // Let's defer updateLights or fix signature. 
        // Game.js has: this.goblinManager.update(time, deltaTime)
        // Terrain update only gets deltaTime currently in Game.js which I just wrote.
        // I should update Game.js to pass time too if needed.
        // For now, let's just fix the crash by adding the method.
    }

    updateLights(time) {
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
    }

    serialize() {
        const data = {
            logicalWidth: this.logicalWidth,
            logicalDepth: this.logicalDepth,
            grid: []
        };

        for (let x = 0; x < this.logicalWidth; x++) {
            data.grid[x] = [];
            for (let z = 0; z < this.logicalDepth; z++) {
                const cell = this.grid[x][z];
                const cellData = {
                    height: cell.height,
                    noise: cell.noise,
                    hasBuilding: cell.hasBuilding,
                    building: null
                };

                if (cell.hasBuilding && cell.building) {
                    cellData.building = {
                        type: cell.building.userData.type,
                        population: cell.building.userData.population,
                        gridX: cell.building.userData.gridX,
                        gridZ: cell.building.userData.gridZ
                    };
                }
                data.grid[x][z] = cellData;
            }
        }
        return data;
    }

    deserialize(data) {
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

        // Clear grid buildings references
        for (let x = 0; x < this.logicalWidth; x++) {
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
            for (let z = 0; z < this.logicalDepth; z++) {
                const cellData = data.grid[x][z];
                this.grid[x][z].height = cellData.height;
                this.grid[x][z].noise = cellData.noise;

                // Restore Buildings
                if (cellData.hasBuilding && cellData.building) {
                    // Only restore if we are at the origin of the building to prevent duplication
                    if (cellData.building.gridX === x && cellData.building.gridZ === z) {
                        if (cellData.building.type === 'house') {
                            this.restoreHouse(cellData.building);
                        } else if (cellData.building.type === 'farm') {
                            this.restoreFarm(cellData.building);
                        } else if (cellData.building.type === 'castle') {
                            this.restoreCastle(cellData.building);
                        }
                    }
                }
            }
        }

        this.updateMesh();
        this.updateColors();
    }

    restoreHouse(data) {
        // Duplicate logic from Unit.buildHouse but simplified for restoration
        const houseGroup = new THREE.Group();

        // We need textures. Can we reuse Unit's texture generators?
        // They are instance methods of Unit. 
        // Let's make them static or move them to a Utils class?
        // For now, I'll duplicate the texture creation or create a temporary Unit to generate them?
        // Better: Just create simple materials for now or duplicate code.
        // Duplicating code is safer to avoid dependency hell right now.

        const woodTexture = this.createWoodTexture();
        const roofTexture = this.createRoofTexture();
        const wallMaterial = new THREE.MeshLambertMaterial({ map: woodTexture });
        const roofMaterial = new THREE.MeshLambertMaterial({ map: roofTexture });

        const wallGeo = new THREE.BoxGeometry(0.6, 0.4, 0.6);
        const walls = new THREE.Mesh(wallGeo, wallMaterial);
        walls.position.y = 0.2;
        houseGroup.add(walls);

        const roofGeo = new THREE.ConeGeometry(0.5, 0.4, 4);
        const roof = new THREE.Mesh(roofGeo, roofMaterial);
        roof.position.y = 0.6;
        roof.rotation.y = Math.PI / 4;
        houseGroup.add(roof);

        // Add Light
        const light = new THREE.PointLight(0xFFaa33, 0, 5); // Orange light, initially off (intensity 0)
        light.position.set(0, 0.5, 0);
        houseGroup.add(light);
        houseGroup.userData.light = light;

        const height = this.getTileHeight(data.gridX, data.gridZ);
        houseGroup.position.set(
            data.gridX - this.logicalWidth / 2 + 0.5,
            height,
            data.gridZ - this.logicalDepth / 2 + 0.5
        );

        this.scene.add(houseGroup);

        // Clones
        const clones = [];
        const offsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];
        offsets.forEach(offset => {
            const clone = houseGroup.clone();
            clone.position.x += offset.x * this.logicalWidth;
            clone.position.z += offset.z * this.logicalDepth;
            this.scene.add(clone);
            clones.push(clone);
        });

        houseGroup.userData.clones = clones;
        houseGroup.userData.type = 'house';
        houseGroup.userData.population = data.population;
        houseGroup.userData.gridX = data.gridX;
        houseGroup.userData.gridZ = data.gridZ;

        const cell = this.grid[data.gridX][data.gridZ];
        cell.hasBuilding = true;
        cell.building = houseGroup;
        this.buildings.push(houseGroup);
    }

    restoreFarm(data) {
        const farmGroup = new THREE.Group();

        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#DAA520';
        ctx.fillRect(0, 0, 64, 64);
        ctx.fillStyle = '#B8860B';
        for (let i = 0; i < 10; i++) ctx.fillRect(i * 6, 0, 2, 64);
        const wheatTexture = new THREE.CanvasTexture(canvas);

        const material = new THREE.MeshLambertMaterial({ map: wheatTexture });
        const geometry = new THREE.PlaneGeometry(0.8, 0.8);
        geometry.rotateX(-Math.PI / 2);

        const farm = new THREE.Mesh(geometry, material);
        farm.position.y = 0.05;
        farmGroup.add(farm);

        const height = this.getTileHeight(data.gridX, data.gridZ);
        farmGroup.position.set(
            data.gridX - this.logicalWidth / 2 + 0.5,
            height,
            data.gridZ - this.logicalDepth / 2 + 0.5
        );

        this.scene.add(farmGroup);

        const clones = [];
        const offsets = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 },
            { x: -1, z: 1 }, { x: -1, z: -1 }
        ];
        offsets.forEach(offset => {
            const clone = farmGroup.clone();
            clone.position.x += offset.x * this.logicalWidth;
            clone.position.z += offset.z * this.logicalDepth;
            this.scene.add(clone);
            clones.push(clone);
        });

        farmGroup.userData.clones = clones;
        farmGroup.userData.type = 'farm';
        farmGroup.userData.gridX = data.gridX;
        farmGroup.userData.gridZ = data.gridZ;

        const cell = this.grid[data.gridX][data.gridZ];
        cell.hasBuilding = true;
        cell.building = farmGroup;
        this.buildings.push(farmGroup);
    }

    createWoodTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Base brown
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, 0, 64, 64);

        // Wood grain lines
        ctx.strokeStyle = '#5D2906';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * 8 + Math.random() * 4);
            ctx.lineTo(64, i * 8 + Math.random() * 4);
            ctx.stroke();
        }

        return new THREE.CanvasTexture(canvas);
    }

    createRoofTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        // Base red/brown
        ctx.fillStyle = '#A52A2A';
        ctx.fillRect(0, 0, 64, 64);

        // Shingles
        ctx.fillStyle = '#800000';
        for (let y = 0; y < 64; y += 8) {
            for (let x = 0; x < 64; x += 8) {
                if ((x + y) % 16 === 0) ctx.fillRect(x, y, 7, 7);
            }
        }

        return new THREE.CanvasTexture(canvas);
    }
    restoreCastle(data) {
        const castleGroup = new THREE.Group();

        // Main Keep
        const keepGeo = new THREE.BoxGeometry(1.6, 1.0, 1.6);
        const keepMat = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const keep = new THREE.Mesh(keepGeo, keepMat);
        keep.position.y = 0.5;
        castleGroup.add(keep);

        // Windows
        const windowMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const windowGeo = new THREE.PlaneGeometry(0.3, 0.3);
        const windows = [];

        for (let i = 0; i < 4; i++) {
            const win = new THREE.Mesh(windowGeo, windowMat.clone());
            win.position.y = 0.6;
            if (i === 0) { win.position.z = 0.81; win.position.x = 0; }
            if (i === 1) { win.position.z = -0.81; win.position.x = 0; win.rotation.y = Math.PI; }
            if (i === 2) { win.position.x = 0.81; win.position.z = 0; win.rotation.y = Math.PI / 2; }
            if (i === 3) { win.position.x = -0.81; win.position.z = 0; win.rotation.y = -Math.PI / 2; }
            castleGroup.add(win);
            windows.push(win);
        }

        // Roof
        const roofGeo = new THREE.CylinderGeometry(0.5, 1.1, 0.6, 4);
        const roofMat = new THREE.MeshLambertMaterial({ color: 0x800000 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.y = 1.3;
        roof.rotation.y = Math.PI / 4;
        castleGroup.add(roof);

        const height = this.getTileHeight(data.gridX, data.gridZ);
        castleGroup.position.set(
            data.gridX - this.logicalWidth / 2 + 1.0,
            height,
            data.gridZ - this.logicalDepth / 2 + 1.0
        );

        this.scene.add(castleGroup);

        // Mark all 4 cells
        const bx = data.gridX;
        const bz = data.gridZ;
        const tiles = [
            { x: bx, z: bz },
            { x: (bx + 1) % this.logicalWidth, z: bz },
            { x: bx, z: (bz + 1) % this.logicalDepth },
            { x: (bx + 1) % this.logicalWidth, z: (bz + 1) % this.logicalDepth }
        ];

        tiles.forEach(tile => {
            const c = this.grid[tile.x][tile.z];
            c.hasBuilding = true;
            c.building = castleGroup;
        });

        castleGroup.userData.type = 'castle';
        castleGroup.userData.population = data.population;
        castleGroup.userData.gridX = data.gridX;
        castleGroup.userData.gridZ = data.gridZ;
        castleGroup.userData.windows = windows;

        this.buildings.push(castleGroup);
    }
}
