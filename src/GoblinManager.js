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
            mesh: cave,
            gridX: x,
            gridZ: z,
            originalHeight: height,
            spawnCooldown: Math.random() * this.spawnInterval
        });
    }

    update(deltaTime, isNight, units) {
        const time = performance.now();

        // Spawn Goblins
        this.caves.forEach((cave, index) => {
            // Check if cave is still valid
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
                    // console.log(`GoblinManager: Spawning goblin from cave at ${cave.gridX},${cave.gridZ}`);
                    this.spawnGoblinAtCave(cave);
                    cave.spawnCooldown = this.spawnInterval + Math.random() * 5;
                } else {
                    // if (Math.random() < 0.01) console.log("GoblinManager: Max Goblins reached");
                }
            }
        });

        // Update Goblins
        const buildings = this.terrain.buildings || [];
        // Units passed in arguments

        for (let i = this.goblins.length - 1; i >= 0; i--) {
            const goblin = this.goblins[i];
            goblin.update(time, deltaTime, units, buildings);

            if (goblin.isFinished) {
                this.goblins.splice(i, 1);
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
                this.spawnGoblin(tx, tz);
                return;
            }
        }
        // If all blocked, spawn at cave center
        this.spawnGoblin(cave.gridX, cave.gridZ);
    }

    spawnGoblin(x, z) {
        const isHob = Math.random() < 0.1; // 10% chance
        const type = isHob ? 'hobgoblin' : 'normal';
        const goblin = new Goblin(this.scene, this.terrain, x, z, type);
        this.goblins.push(goblin);
        console.log("Goblin spawned at", x, z);
    }
}
