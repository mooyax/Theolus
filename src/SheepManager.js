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
        if (Sheep.assets && Sheep.assets.materials) {
            const mats = Sheep.assets.materials;
            Object.values(mats).forEach(mat => {
                if (mat) mat.clippingPlanes = this.clippingPlanes;
            });
        }

        this.initSheeps();
    }

    reset() {
        console.log("Resetting SheepManager...");
        if (this.sheeps) {
            for (const s of this.sheeps) {
                if (s && s.dispose) s.dispose();
            }
        }
        this.sheeps = [];
    }

    initSheeps() {
        this.reset();

        const logicalW = this.terrain ? (this.terrain.logicalWidth || 80) : 80;
        const logicalD = this.terrain ? (this.terrain.logicalDepth || 80) : 80;

        for (let i = 0; i < this.sheepCount; i++) {
            this.spawnRandomSheep(logicalW, logicalD);
        }
    }

    spawnRandomSheep(logicalW, logicalD) {
        if (!this.terrain) return;
        let attempts = 0;
        while (attempts < 50) {
            const x = Math.floor(Math.random() * logicalW);
            const z = Math.floor(Math.random() * logicalD);
            const height = this.terrain.getTileHeight(x, z);

            const cell = this.terrain.grid && this.terrain.grid[x] && this.terrain.grid[x][z];
            if (height > 0.5) { // Land
                // Verify no building
                if (!cell || !cell.hasBuilding) {
                    const sheep = new Sheep(this.scene, this.terrain, x, z);
                    this.sheeps.push(sheep);
                    return;
                }
            }
            attempts++;
        }
    }

    removeSheep(sheep) {
        if (sheep && sheep.dispose) {
            sheep.dispose();
        }
    }

    update(time, deltaTime) {
        if (!this.sheeps) return;

        for (let i = this.sheeps.length - 1; i >= 0; i--) {
            const sheep = this.sheeps[i];
            if (!sheep) continue;

            // Logic (AI)
            if (sheep.updateLogic) sheep.updateLogic(time, deltaTime);

            // Movement (Physics/Animation)
            if (sheep.updateMovement) sheep.updateMovement(time);

            if (sheep.isDead) {
                this.removeSheep(sheep);
                this.sheeps.splice(i, 1);
            }
        }

        // Maintain population (Regeneration)
        if (this.sheeps.length < this.sheepCount) {
            const logicalW = this.terrain ? (this.terrain.logicalWidth || 80) : 80;
            const logicalD = this.terrain ? (this.terrain.logicalDepth || 80) : 80;
            if (Math.random() < 0.05) { // 5% chance per frame to try spawning
                this.spawnRandomSheep(logicalW, logicalD);
            }
        }
    }
}
