
import * as THREE from 'three';
import { Goblin } from './Goblin.js';
import { GoblinRenderer } from './GoblinRenderer.js';

export class GoblinManager {
    constructor(scene, terrain, particleManager) {
        this.scene = scene;
        this.terrain = terrain;
        this.particleManager = particleManager;
        this.goblins = [];
        this.caves = [];
        this.hutSpawnTimers = new Map(); // Map<Building, float>

        this.renderer = new GoblinRenderer(scene, terrain, terrain.clippingPlanes);

        this.spawnTimer = 0;
        this.spawnInterval = 2; // Spawn every 2 seconds (faster!)
        this.plunderCount = 0; // Track successful raids
        this.MAX_GOBLINS = 20000; // InstancedMesh allows high count!
        this.clanMemory = {}; // { clanId: [ {x,z,weight,timestamp} ] }

        // Initialize Goblin Assets & Apply Clipping
        Goblin.initAssets();
        const gmats = Goblin.assets.materials;
        Object.values(gmats).forEach(mat => {
            if (mat) mat.clippingPlanes = this.terrain.clippingPlanes;
        });

        this.caveGroup = new THREE.Group();
        this.scene.add(this.caveGroup);

        // Initialize caves
        this.generateCaves();

        // Debug: Force spawn one goblin immediately
        if (this.caves.length > 0) {
            console.log("GoblinManager: Force spawning Debug Goblin");
            this.spawnGoblinAtCave(this.caves[0]);
        }
    }

    reset() {
        console.log("Resetting GoblinManager...");
        // Clear all goblins
        for (const g of this.goblins) {
            if (g.mesh) this.scene.remove(g.mesh);
            if (g.dispose) g.dispose();
        }
        this.goblins = [];
        this.plunderCount = 0;

        // Caves are managed partly by Terrain restoration.
        // We should clear our reference list. Terrain deserialization will restore 'cave' buildings.
        // But GoblinManager needs to re-link or re-scan?
        // Actually, Terrain treats caves as buildings.
        // GoblinManager creates separate Cave meshes?
        // Line 26: this.caveGroup = new THREE.Group().
        this.caves.forEach(c => {
            if (c.mesh) this.caveGroup.remove(c.mesh);
        });
        this.caves = [];
        // Re-generate caves?
        // If loading a game, caves come from save data (Terrain).
        // GoblinManager normally generates caves in constructor.
        // We need a way to "adopt" restored caves or re-scan.
        // For now, let's just clear. If Terrain restores them, does GoblinManager know?
        // STARTUP ISSUE: Terrain restores buildings. GoblinManager needs to know about them to spawn goblins!
        // We might need a `scanForCaves` method or `registerCave` called by Terrain?
        // Current logic: generateCaves() makes new ones.
        // We need to implement scanning.
    }

    scanForCaves() {
        // Find existing caves in Terrain
        this.terrain.buildings.forEach(b => {
            if (b.userData.type === 'cave') {
                // Create visual/logic wrapper for GoblinManager
                this.registerCave(b);
            }
        });
    }

    registerCave(building) {
        // Avoid duplicates
        if (this.caves.some(c => c.gridX === building.userData.gridX && c.gridZ === building.userData.gridZ)) return;

        const cave = {
            gridX: building.userData.gridX,
            gridZ: building.userData.gridZ,
            mesh: new THREE.Group(), // Placeholder or link to building mesh?
            // Actually, GoblinManager creates its own meshes usually.
            // If Terrain handles visuals for 'cave', we don't need double visuals.
            // But code line 26 implies `caveGroup`.
            spawnCooldown: 0,
            originalHeight: building.y,
            building: building, // Link
            clanId: `clan_${building.userData.gridX}_${building.userData.gridZ} `
        };
        // Visuals? 
        // If Terrain renders cave, we don't need to add another mesh.
        // But let's keep logic compatible.
        this.caves.push(cave);
    }

    generateCaves() {
        console.log("GoblinManager: Generation started...");
        const caveCount = 5;
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let created = 0;
        let attempts = 0;

        while (created < caveCount && attempts < 5000) {
            attempts++;
            const x = Math.floor(Math.random() * logicalW);
            const z = Math.floor(Math.random() * logicalD);

            if (this.isValidCaveSpot(x, z)) {
                if (this.createCave(x, z)) {
                    created++;
                }
            }
        }
        console.log(`GoblinManager: Generated ${created} goblin caves after ${attempts} attempts.`);
    }

    isValidCaveSpot(x, z) {
        const height = this.terrain.getTileHeight(x, z);
        // Height (2-10)
        if (height <= 2 || height > 10) return false;
        return true;
    }

    createCaveTexture() {
        if (this.caveTexture) return this.caveTexture;

        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Dark hole
        const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(0.6, '#1a1a1a');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);

        // Add some "eyes" inside (optional scary effect)
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(50, 50, 2, 0, Math.PI * 2);
        ctx.arc(78, 50, 2, 0, Math.PI * 2);
        ctx.fill();

        this.caveTexture = new THREE.CanvasTexture(canvas);
        return this.caveTexture;
    }

    createCave(x, z) {
        const height = this.terrain.getTileHeight(x, z);

        // Cave Mesh (Final: Black Sphere)
        // Full sphere logic, Black Lambert
        const caveGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const caveMat = new THREE.MeshLambertMaterial({
            color: 0x000000,
            clippingPlanes: this.terrain.clippingPlanes || []
        });
        const cave = new THREE.Mesh(caveGeo, caveMat);

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        cave.position.set(
            x - logicalW / 2 + 0.5,
            height,
            z - logicalD / 2 + 0.5
        );

        cave.scale.set(1, 0.6, 1); // Slight flattening

        this.caveGroup.add(cave);

        const valid = this.terrain.addBuilding('cave', x, z);
        if (valid) {
            console.log(`GoblinManager: Cave registered at ${x},${z} `);
            // Link mesh to building for reverse lookup if needed later
            valid.userData.linkedMesh = cave;

            this.caves.push({
                mesh: cave, // CRITICAL FIX: Reference to mesh
                building: valid, // Reference to Terrain Building
                gridX: x,
                gridZ: z,
                originalHeight: height,
                spawnCooldown: Math.random() * this.spawnInterval,
                clanId: `clan_cave_${x}_${z} ` // Group ID
            });
            return true;
        } else {
            console.warn(`GoblinManager: Failed to register cave at ${x},${z} (Terrain rejected)`);
            // Cleanup mesh if registration failed (though forced generation should prevent this)
            this.caveGroup.remove(cave);
            return false;
        }
    }

    update(time, deltaTime, isNight, units, timeScale = 1.0, camera) {
        // time passed is simTime (ms)

        // Spawn Goblins
        this.caves.forEach((cave, index) => {
            // Debug Log first cave position periodically
            if (index === 0 && Math.random() < 0.01) {
                console.log(`[GoblinManager] Cave 0 Pos: ${cave.mesh.position.x.toFixed(2)}, ${cave.mesh.position.y.toFixed(2)}, ${cave.mesh.position.z.toFixed(2)} Visible:${cave.mesh.visible} Parent:${!!cave.mesh.parent} `);
            }

            // Check if cave is still valid
            // Scale check frequency or just run? Spawn logic is simple.
            const currentHeight = this.terrain.getTileHeight(cave.gridX, cave.gridZ);

            if (currentHeight <= 0) {
                // Destroy if submerged
                console.error(`[GoblinManager] Cave destroyed: SUBMERGED(H = ${currentHeight})`);
                this.destroyCave(cave, index);
                return;
            }

            // Sync with Terrain Building (If destroyed by Unit)
            if (cave.building) {
                const buildingExists = this.terrain.buildings.includes(cave.building);
                if (!buildingExists) {
                    console.error(`[GoblinManager] Cave destroyed: BUILDING MISSING from Terrain!`);
                    this.destroyCave(cave, index);
                    return;
                }
                // VISUAL PERSISTENCE FIX: Sync Mesh Height with Building Height
                // Terrain.js updates building.y when modifying height.
                if (cave.mesh.position.y !== cave.building.y) {
                    cave.mesh.position.y = cave.building.y;
                }
            } else {
                // Fallback if no building link (legacy?)
                cave.mesh.position.y = currentHeight;
            }

            // Persistence Update: If height changes, move the cave with it
            if (Math.abs(currentHeight - cave.originalHeight) > 0.1) {
                cave.originalHeight = currentHeight;
                cave.mesh.position.y = currentHeight;
                cave.mesh.updateMatrix();
            }

            cave.spawnCooldown -= deltaTime;
            if (cave.spawnCooldown <= 0) {
                // Removed hard cap of 50. Use global limit if needed.
                if (this.goblins.length < (this.MAX_GOBLINS || 20000)) {
                    this.spawnGoblinAtCave(cave);
                    cave.spawnCooldown = this.spawnInterval + Math.random() * 5;
                }
            }
        });

        // 1.5 Goblin Hut Logic (New)
        this.updateHuts(deltaTime);

        // Update Goblins
        const buildings = this.terrain.buildings || [];

        // Dynamic Staggering: Maintain ~30Hz-60Hz logic updates regardless of timeScale
        // Base stagger was 2.
        const stagger = Math.max(1, Math.floor(2 / timeScale));

        // CULLING LOGIC REMOVED (User Request: Lifespan handles population control)
        // if (this.goblins.length > (this.MAX_GOBLINS || 1000)) ...

        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;
        const parity = this.frameCount % stagger;

        for (let i = this.goblins.length - 1; i >= 0; i--) {
            const goblin = this.goblins[i];

            // 1. Always Update Movement & Visuals (Every Frame)
            if (goblin.updateMovement) {
                goblin.updateMovement(time);
            }
            if (goblin.updateVisuals) {
                goblin.updateVisuals();
            }

            // 2. Staggered Logic Update
            if (i % stagger === parity) {
                // Compensate deltaTime: passed dt is realDelta * timeScale.
                // We run this block 1/stagger times.
                // So effective dt for logic is dw * stagger.
                try {
                    if (goblin.isDead) {
                        goblin.updateDeathAnimation(deltaTime * stagger);
                    } else {
                        goblin.updateLogic(time, deltaTime * stagger, units, buildings);
                    }
                } catch (e) {
                    console.error(`[GoblinManager] Error updating goblin ${i}: `, e);
                    // Dispose if corrupted?
                    continue; // Fix: Don't abort entire loop
                }

                if (goblin.isFinished) {
                    // console.log(`[GoblinManager] Removing finished goblin index ${ i } `);
                    this.goblins.splice(i, 1);
                }
            }
        }
        if (this.renderer) this.renderer.update(this.goblins, camera);
    }

    spawnGoblinAtCave(cave) {
        // Validation: Verify Cave Still Exists
        if (cave.building) {
            // Check Terrain List
            if (!this.terrain.buildings.includes(cave.building)) {
                console.warn("[GoblinManager] Aborting spawn: Cave building missing");
                this.destroyCave(cave, this.caves.indexOf(cave)); // Self-heal
                return;
            }
        }
        // Check Grid Consistency
        const cell = this.terrain.grid[cave.gridX][cave.gridZ];
        if (!cell || !cell.hasBuilding) {
            console.warn("[GoblinManager] Aborting spawn: Grid cell has no building");
            // Force cleanup?
            return;
        }

        const neighbors = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ];

        // Shuffle
        neighbors.sort(() => Math.random() - 0.5);

        for (const n of neighbors) {
            const tx = cave.gridX + n.x;
            const tz = cave.gridZ + n.z;
            const h = this.terrain.getTileHeight(tx, tz);
            if (h > 0) {
                this.spawnGoblin(tx, tz, cave.clanId);
                return;
            }
        }
        // If all blocked, spawn at cave center
        this.spawnGoblin(cave.gridX, cave.gridZ, cave.clanId);
    }

    spawnGoblin(x, z, clanId = null) {
        const isHob = Math.random() < 0.1; // 10% chance
        const type = isHob ? 'hobgoblin' : 'normal';
        const goblin = new Goblin(this.scene, this.terrain, x, z, type, clanId);
        this.goblins.push(goblin);

        if (this.terrain.registerEntity) {
            this.terrain.registerEntity(goblin, x, z, 'goblin');
        }

        console.log(`Goblin spawned at ${x},${z} Clan:${clanId} `);
    }

    increasePlunder() {
        this.plunderCount++;
        console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount} `);
    }

    updateHuts(deltaTime) {
        // Base growth
        let growthRate = 0.15; // Balance: 1 goblin per ~66s (Was 0.3, orig 0.1)
        // Plunder Bonus: +0.03 per plunder (Was 0.05, orig 0.02)
        growthRate += this.plunderCount * 0.03;

        // Cap bonus?
        if (growthRate > 2.0) growthRate = 2.0;

        const buildings = this.terrain.buildings || [];
        buildings.forEach(b => {
            if (!b.userData) return;
            if (b.userData.type === 'goblin_hut') {
                b.userData.population = (b.userData.population || 0) + growthRate * deltaTime;

                if (b.userData.population >= 10) {
                    // Global Cap Limit REMOVED
                    // if (this.goblins.length >= (this.MAX_GOBLINS || 1000)) return;

                    b.userData.population -= 10;

                    // Spawn logic reuse
                    // Use a temporary fake cave object to reuse spawnGoblinAtCave logic which checks neighbors
                    // Use hut location as clanId ONLY if not set
                    const clanId = b.userData.clanId || `clan_hut_${b.userData.gridX}_${b.userData.gridZ}`;
                    const fakeCave = { gridX: b.userData.gridX, gridZ: b.userData.gridZ, clanId: clanId };
                    this.spawnGoblinAtCave(fakeCave);
                    console.log(`Goblin born from Hut! Clan: ${clanId}. Global Pop: ${this.goblins.length}`);
                }
            }
        });
    }

    recordRaidLocation(clanId, x, z) {
        if (!clanId) return;
        if (!this.clanMemory[clanId]) this.clanMemory[clanId] = [];

        const memories = this.clanMemory[clanId];
        // Check overlap
        const existing = memories.find(m => Math.abs(m.x - x) < 5 && Math.abs(m.z - z) < 5);
        if (existing) {
            existing.weight = Math.min(existing.weight + 1, 10);
            existing.timestamp = window.game ? window.game.gameTotalTime : Date.now();
        } else {
            memories.push({
                x: x,
                z: z,
                weight: 1,
                timestamp: window.game ? window.game.gameTotalTime : Date.now()
            });
        }

        // Sort by weight desc
        memories.sort((a, b) => b.weight - a.weight);
        // Limit memory size
        if (memories.length > 5) memories.length = 5;
    }

    getClanRaidTarget(clanId) {
        if (!clanId || !this.clanMemory[clanId] || this.clanMemory[clanId].length === 0) return null;

        // Pick weighted random
        const memories = this.clanMemory[clanId];
        const totalW = memories.reduce((acc, m) => acc + m.weight, 0);
        let r = Math.random() * totalW;

        for (const m of memories) {
            r -= m.weight;
            if (r <= 0) return m;
        }
        return memories[0];
    }

    destroyCave(cave, index) {
        console.error(`[GoblinManager] DESTROYING CAVE at ${cave.gridX},${cave.gridZ}!`);
        // Trace stack to see who called it
        // console.trace();
        if (cave.mesh) {
            this.scene.remove(cave.mesh);
            this.caveGroup.remove(cave.mesh);
        }
        // Also remove from terrain if it's still there (e.g. submerged case)
        if (cave.building && this.terrain.buildings.includes(cave.building)) {
            this.terrain.removeBuilding(cave.building);
        }
        this.caves.splice(index, 1);
    }

    reportRaidFailure(clanId, x, z) {
        if (!clanId || !this.clanMemory[clanId]) return;

        const memories = this.clanMemory[clanId];
        const index = memories.findIndex(m => Math.abs(m.x - x) < 5 && Math.abs(m.z - z) < 5);

        if (index !== -1) {
            memories[index].weight -= 2; // Decrease weight (Failure penalty)
            console.log(`Clan ${clanId} raid failure at ${x},${z}. Weight: ${memories[index].weight}`);

            if (memories[index].weight <= 0) {
                memories.splice(index, 1);
                console.log(`Clan ${clanId} forgot raid location ${x},${z}`);
            }
        }
    }
}
