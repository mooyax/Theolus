import * as THREE from 'three';
import { Goblin } from './Goblin.js';

export class GoblinManager {
    constructor(scene, terrain, unitManager, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain;
        this.unitManager = unitManager; // To pass to goblins for targeting
        this.clippingPlanes = clippingPlanes || [];
        this.goblins = [];
        this.caves = [];
        this.spawnTimer = 0;
        this.spawnInterval = 2; // Spawn every 2 seconds (faster!)
        this.spawnInterval = 2; // Spawn every 2 seconds (faster!)
        this.plunderCount = 0; // Track successful raids
        this.MAX_GOBLINS = 300; // Hard Cap to prevent lag
        this.clanMemory = {}; // { clanId: [ {x,z,weight,timestamp} ] }

        // Initialize Goblin Assets & Apply Clipping
        Goblin.initAssets();
        const gmats = Goblin.assets.materials;
        Object.values(gmats).forEach(mat => {
            if (mat) mat.clippingPlanes = this.clippingPlanes;
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

    generateCaves() {
        console.log("GoblinManager: Generation started...");
        const caveCount = 5;
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let created = 0;
        let attempts = 0;

        while (created < caveCount && attempts < 1000) {
            attempts++;
            const x = Math.floor(Math.random() * logicalW);
            const z = Math.floor(Math.random() * logicalD);

            if (this.isValidCaveSpot(x, z)) {
                this.createCave(x, z);
                created++;
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

    createCave(x, z) {
        const height = this.terrain.getTileHeight(x, z);

        // Cave Mesh
        const caveGeo = new THREE.SphereGeometry(0.4, 8, 8, 0, Math.PI);
        const caveMat = new THREE.MeshLambertMaterial({
            color: 0x222222,
            clippingPlanes: this.clippingPlanes
        });
        const cave = new THREE.Mesh(caveGeo, caveMat);

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        cave.position.set(
            x - logicalW / 2 + 0.5,
            height,
            z - logicalD / 2 + 0.5
        );

        cave.rotation.x = -Math.PI / 2;
        cave.scale.set(1, 0.5, 1);

        this.caveGroup.add(cave);

        this.caves.push({
            gridX: x,
            gridZ: z,
            originalHeight: height,
            spawnCooldown: Math.random() * this.spawnInterval,
            clanId: `clan_cave_${x}_${z}` // Group ID
        });
    }

    update(time, deltaTime, isNight, units, timeScale = 1.0) {
        // time passed is simTime (ms)

        // Spawn Goblins
        this.caves.forEach((cave, index) => {
            // Check if cave is still valid
            // Scale check frequency or just run? Spawn logic is simple.
            const currentHeight = this.terrain.getTileHeight(cave.gridX, cave.gridZ);

            if (currentHeight <= 0 || Math.abs(currentHeight - cave.originalHeight) > 1.0) {
                this.scene.remove(cave.mesh);
                this.caveGroup.remove(cave.mesh);
                this.caves.splice(index, 1);
                return;
            }

            cave.spawnCooldown -= deltaTime;
            if (cave.spawnCooldown <= 0) {
                if (this.goblins.length < 50) {
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

        // CULLING LOGIC: If vastly overpopulated, remove some each frame
        if (this.goblins.length > (this.MAX_GOBLINS || 300)) {
            // Remove 1 random goblin per frame to reduce population
            const killIdx = Math.floor(Math.random() * this.goblins.length);
            const victim = this.goblins[killIdx];
            if (victim) {
                this.scene.remove(victim.mesh);
                this.terrain.unregisterEntity(victim);
                this.goblins.splice(killIdx, 1);
                // Skip standard update for this victim (it's gone now)
            }
        }

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
                goblin.updateLogic(time, deltaTime * stagger, units, buildings);

                if (goblin.isFinished) {
                    this.goblins.splice(i, 1);
                }
            }
        }
    }

    spawnGoblinAtCave(cave) {
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
        console.log(`Goblin spawned at ${x},${z} Clan:${clanId}`);
    }

    increasePlunder() {
        this.plunderCount++;
        console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount}`);
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
            if (b.userData.type === 'goblin_hut') {
                b.userData.population = (b.userData.population || 0) + growthRate * deltaTime;

                if (b.userData.population >= 10) {
                    b.userData.population -= 10;

                    // Global Cap Limit
                    if (this.goblins.length >= (this.MAX_GOBLINS || 300)) {
                        // Cap reached, population stalled or lost?
                        // Just ignore spawn.
                        return;
                    }

                    // Spawn logic reuse
                    // Use a temporary fake cave object to reuse spawnGoblinAtCave logic which checks neighbors
                    // Use hut location as clanId ONLY if not set
                    const clanId = b.userData.clanId || `clan_hut_${b.userData.gridX}_${b.userData.gridZ}`;
                    const fakeCave = { gridX: b.userData.gridX, gridZ: b.userData.gridZ, clanId: clanId };
                    this.spawnGoblinAtCave(fakeCave);
                    console.log(`Goblin born from Hut! Clan: ${clanId}`);
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
