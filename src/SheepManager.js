import * as THREE from 'three';
import { Sheep } from './Sheep.js';

export class SheepManager {
    constructor(scene, terrain, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.sheeps = [];
        this.sheepCount = 10;

        // Init Assets via Class
        Sheep.initAssets();
        // Apply Clipping
        const mats = Sheep.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat) mat.clippingPlanes = this.clippingPlanes;
        });

        this.initSheeps();
        console.log("SheepManager Refactored: Initialized with Entity-based Sheep.");
    }

    reset() {
        console.log("Resetting SheepManager...");
        for (const s of this.sheeps) {
            if (s.dispose) s.dispose();
        }
        this.sheeps = [];
    }

    initSheeps() {
        this.reset();

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        for (let i = 0; i < this.sheepCount; i++) {
            this.spawnRandomSheep(logicalW, logicalD);
        }
    }

    spawnRandomSheep(logicalW, logicalD) {
        let attempts = 0;
        while (attempts < 50) {
            const x = Math.floor(Math.random() * logicalW);
            const z = Math.floor(Math.random() * logicalD);
            const height = this.terrain.getTileHeight(x, z);

            const cell = this.terrain.grid[x] && this.terrain.grid[x][z];
            if (height > 0.5) { // Land
                // Verify no building
                if (!cell || !cell.hasBuilding) {
                    const sheep = new Sheep(this.scene, this.terrain, x, z);
                    this.sheeps.push(sheep);
                    return;
                }
            }
            if (attempts === 49) {
                // Silently fail if no spot found (e.g. water world or crowded)
                return;
            }
            attempts++;
        }
    }

    removeSheep(sheep) {
        sheep.dispose();
    }

    update(time, deltaTime) {
        if (this.sheeps.length > 0) {
            // Log suppressed
        }
        for (let i = this.sheeps.length - 1; i >= 0; i--) {
            const sheep = this.sheeps[i];

            // Logic (AI)
            sheep.updateLogic(time, deltaTime);

            // Movement (Physics/Animation)
            sheep.updateMovement(time);

            if (sheep.isDead) {
                this.removeSheep(sheep);
                this.sheeps.splice(i, 1);
            }
        }
    }
}
