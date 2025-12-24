import * as THREE from 'three';
import { Fish } from './Fish.js';

export class FishManager {
    constructor(scene, terrain, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.fishes = [];

        // Apply Clipping via Class
        Fish.initAssets();
        if (Fish.assets.materials.fish) {
            Fish.assets.materials.fish.clippingPlanes = this.clippingPlanes;
        }

        this.init();
        console.log("FishManager Refactored: Initialized with Entity-based Fish.");
    }

    init() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        this.fishes = [];
        for (let i = 0; i < 75; i++) {
            this.spawnRandomFish(logicalW, logicalD);
        }
        console.log(`Spawned initial fish.`);
    }

    spawnRandomFish(logicalW, logicalD) {
        if (this.fishes.length >= 75) return;

        let attempts = 0;
        while (attempts < 10) {
            const x = Math.floor(Math.random() * logicalW);
            const z = Math.floor(Math.random() * logicalD);

            const height = this.terrain.getTileHeight(x, z);
            if (height <= 0.5) {
                const fish = new Fish(this.scene, this.terrain, x, z);
                this.fishes.push(fish);
                return;
            }
            attempts++;
        }
    }

    update(time, deltaTime, frustum) {
        for (let i = this.fishes.length - 1; i >= 0; i--) {
            const fish = this.fishes[i];

            // Logic
            fish.updateLogic(time, deltaTime);

            // Movement
            fish.updateMovement(time); // Physics

            if (fish.isDead) {
                this.removeFish(fish);
                this.fishes.splice(i, 1);
            }
        }

        // Maintain population
        if (this.fishes.length < 60) {
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;
            if (Math.random() < 0.05) {
                this.spawnRandomFish(logicalW, logicalD);
            }
        }
    }

    removeFish(fish) {
        fish.dispose();
    }
}
