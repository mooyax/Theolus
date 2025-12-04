
import * as THREE from 'three';

export class Terrain {
    constructor(scene) {
        this.scene = scene;
        this.logicalWidth = 80;
        this.logicalDepth = 80;
        this.width = this.logicalWidth * 3; // Visual size (3x3 grid)
        this.depth = this.logicalDepth * 3;

        this.grid = []; // Stores the 40x40 logical data
        this.geometry = null;
        this.mesh = null;
        this.waterMesh = null;
        this.waterMesh = null;
        this.meshes = []; // Keep for compatibility if other classes check it, but will contain only 1 mesh
        this.buildings = []; // Track all buildings for population logic

        this.initTerrain();
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
                let height = (n * 20) - 5;
                height = Math.max(-5, height);
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
            flatShading: false // Smooth shading
        });

        this.mesh = new THREE.Mesh(this.geometry, material);
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.position.set(0, 0, 0); // Centered

        // Wireframe Overlay
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });
        const wireframe = new THREE.Mesh(this.geometry, wireframeMaterial);
        // Lift slightly to avoid z-fighting on flat areas? 
        // Or just rely on it being a child.
        // With smooth shading + wireframe, z-fighting is less obvious than flat+wireframe.
        // Let's add a tiny offset to wireframe vertices? No, expensive.
        // PolygonOffset is best.
        wireframeMaterial.polygonOffset = true;
        wireframeMaterial.polygonOffsetFactor = 1;
        wireframeMaterial.polygonOffsetUnits = 1;

        this.mesh.add(wireframe);

        this.scene.add(this.mesh);
        this.meshes.push(this.mesh); // For InputManager compatibility
    }

    createWater() {
        if (this.waterMesh) this.scene.remove(this.waterMesh);

        const geometry = new THREE.PlaneGeometry(this.width, this.depth);
        geometry.rotateX(-Math.PI / 2);

        const material = new THREE.MeshLambertMaterial({
            color: 0x1E90FF,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });

        this.waterMesh = new THREE.Mesh(geometry, material);
        this.waterMesh.position.set(0, 0.5, 0);
        this.scene.add(this.waterMesh);
    }

    updateColors() {
        const colors = this.geometry.attributes.color.array;
        const positions = this.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];

            const gx = Math.round(x + this.width / 2);
            const gy = Math.round(-y + this.depth / 2);

            const lx = ((gx % this.logicalWidth) + this.logicalWidth) % this.logicalWidth;
            const lz = ((gy % this.logicalDepth) + this.logicalDepth) % this.logicalDepth;

            if (this.grid[lx] && this.grid[lx][lz]) {
                const height = this.grid[lx][lz].height;
                const noise = this.grid[lx][lz].noise; // Use stored noise
                let color = new THREE.Color();

                if (height <= 0) {
                    color.setHex(0xF4A460); // Sand
                } else if (height <= 4) {
                    color.setHex(0x228B22); // Grass
                } else if (height <= 8) {
                    color.setHex(0x001100); // Dark Green
                } else {
                    color.setHex(0x808080); // Rock
                }

                const hsl = {};
                color.getHSL(hsl);
                hsl.l = Math.max(0.2, Math.min(0.9, hsl.l + noise));
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
        }

        this.updateMesh();
        this.updateColors();
    }

    getTileHeight(x, z) {
        const lx = (Math.round(x) + this.logicalWidth) % this.logicalWidth;
        const lz = (Math.round(z) + this.logicalDepth) % this.logicalDepth;
        if (this.grid[lx] && this.grid[lx][lz]) {
            return this.grid[lx][lz].height;
        }
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

    isValid(x, z) {
        return true; // Always valid due to wrapping
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

    random(x, z, seed) {
        const sin = Math.sin(x * 12.9898 + z * 78.233 + seed) * 43758.5453123;
        return sin - Math.floor(sin);
    }

    updatePopulation(deltaTime, spawnCallback) {
        // 1 real second = 12 game seconds
        // Base growth: 5 per real second.
        // Farm bonus: +5 per farm per real second.

        const baseRate = 0.1;
        const farmBonus = 0.2;

        this.buildings.forEach(building => {
            const type = building.userData.type;

            if (type === 'house' || type === 'castle') {
                const bx = building.userData.gridX;
                const bz = building.userData.gridZ;

                // Count nearby farms
                let farmCount = 0;
                const radius = 3;
                for (let x = -radius; x <= radius; x++) {
                    for (let z = -radius; z <= radius; z++) {
                        const tx = (bx + x + this.logicalWidth) % this.logicalWidth;
                        const tz = (bz + z + this.logicalDepth) % this.logicalDepth;

                        const cell = this.grid[tx][tz];
                        if (cell.hasBuilding && cell.building && cell.building.userData.type === 'farm') {
                            farmCount++;
                        }
                    }
                }

                let rate = baseRate + (farmCount * farmBonus);

                // Castle Bonus: 2x Growth
                if (type === 'castle') {
                    rate *= 2;
                }

                building.userData.population += rate * deltaTime;

                if (building.userData.population >= 100) {
                    building.userData.population = 0;
                    spawnCallback(bx, bz);
                }
            }
        });
    }

    updateLights(time) {
        // Night: 19-24, 0-5. Dusk/Dawn transition?
        // Simple on/off for now.
        // On between 18:00 and 6:00?
        const isNight = (time >= 18 || time < 6);

        const colorHex = isNight ? 0xFFFF00 : 0x000000;

        // console.log("Updating lights. Time:", time, "IsNight:", isNight, "Color:", colorHex.toString(16));

        this.buildings.forEach(building => {
            if (building.userData.windows) {
                building.userData.windows.forEach(win => {
                    if (win.material) {
                        win.material.color.setHex(colorHex);
                        win.material.needsUpdate = true;
                    }
                });
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
                    // Temporarily set gridX/Z for build methods
                    // But build methods use `this.gridX` from Unit context? 
                    // Wait, buildHouse/Farm are in Unit.js, not Terrain.js.
                    // I need to call Unit methods or move build logic here?
                    // Or just manually reconstruct the building mesh here?
                    // Reconstructing here is cleaner for Terrain state restoration.

                    if (cellData.building.type === 'house') {
                        this.restoreHouse(cellData.building);
                    } else if (cellData.building.type === 'farm') {
                        this.restoreFarm(cellData.building);
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
}
