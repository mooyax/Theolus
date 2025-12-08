import * as THREE from 'three';
import { Fish } from './Fish.js';

export class FishManager {
    constructor(scene, terrain, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.fishes = [];

        // Apply Clipping to Fish Assets
        Fish.initAssets();
        if (Fish.assets.materials.fish) {
            Fish.assets.materials.fish.clippingPlanes = this.clippingPlanes;
        }

        this.init();
    }

    init() {
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Try to spawn 75 fish (Reduced from 150)
        let count = 0;
        let attempts = 0;
        // ... (omitted) ... 

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

            // Frustum Culling for Fish
            if (frustum && fish.mesh) {
                const sphere = new THREE.Sphere(fish.mesh.position, 1.5);
                if (!frustum.intersectsSphere(sphere)) {
                    // Still update logic but skip animation if possible?
                    // Actually Fish.update handles both logic (movement) and animation (wiggle).
                    // We should pass frustum to fish.update or handle it here.
                    // If we skip fish.update entirely, they won't move.
                    // So we must call update, but tell it to skip visual updates.
                    fish.update(time, deltaTime, false); // false = not visible
                } else {
                    fish.update(time, deltaTime, true); // true = visible
                }
            } else {
                fish.update(time, deltaTime, true);
            }

            if (fish.isDead) {
                this.fishes.splice(i, 1);
            }
        }

        // Maintain population
        if (this.fishes.length < 60) {
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;
            if (Math.random() < 0.05) { // Reduced chance as well
                this.spawnRandomFish(logicalW, logicalD);
            }
        }
    }
}
