import * as THREE from 'three';

export class CloudManager {
    constructor(scene, terrainWidth, terrainDepth) {
        this.scene = scene;
        this.clouds = [];
        this.cloudCount = 30;
        this.spreadRadius = 80;

        const width = 512;
        const height = 512;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // PIXEL-BASED FRACTAL NOISE GENERATION (True Organic Clouds)
        const imgData = ctx.createImageData(width, height);
        const data = imgData.data;

        // FBM-like Noise using summed Sine waves
        // This simulates Perlin noise layers without external libs.
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Normalized coords -1 to 1
                const nx = (x / width - 0.5) * 2;
                const ny = (y / height - 0.5) * 2;

                // Base Distance from center (Mask)
                const d = Math.sqrt(nx * nx + ny * ny);

                // Turbulence: Sum of sines at different frequencies
                // Frequencies determined by multipliers (3, 4, 10, 20 etc)
                // Looks chaotic and organic.
                const turbulence =
                    (Math.sin(nx * 3.0 + ny * 2.5) + Math.cos(ny * 3.5 - nx * 2.5)) * 0.25 +
                    (Math.sin(nx * 8.0 + ny * 6.0) + Math.cos(ny * 9.0 - nx * 7.0)) * 0.12 +
                    (Math.sin(nx * 18.0) + Math.cos(ny * 22.0)) * 0.05;

                // Subtract distance and turbulence from 1.0 (Center is 1, Edge is 0)
                // "Erode" the circle with noise
                const mask = 1.0 - (d + turbulence * 1.5);

                // Soft Clamping / Smoothstep
                let alpha = mask < 0 ? 0 : mask > 1 ? 1 : mask * mask * (3 - 2 * mask);

                // Extra circular fade to force edges to zero (avoid box artifacts)
                const edgeFade = Math.max(0, 1 - Math.pow(d, 4));
                alpha *= edgeFade;

                // FORCE EDGE TRANSPARENCY
                // Ensure the absolute 2px border of the texture is transparent to prevent clamping artifacts
                if (x < 2 || x >= width - 2 || y < 2 || y >= height - 2) {
                    alpha = 0;
                }

                const idx = (y * width + x) * 4;
                data[idx] = 255;     // R - ALWAYS WHITE (Safari Fix)
                data[idx + 1] = 255; // G - ALWAYS WHITE
                data[idx + 2] = 255; // B - ALWAYS WHITE
                // Alpha Logic:
                // Multiply allows softness. Max 0.7 for moderate transparency.
                data[idx + 3] = Math.floor(Math.max(0, Math.min(1, alpha * 0.7)) * 255);
            }
        }

        ctx.putImageData(imgData, 0, 0);

        this.texture = new THREE.CanvasTexture(canvas);
        this.texture.colorSpace = THREE.SRGBColorSpace;
        this.texture.minFilter = THREE.LinearMipmapLinearFilter;

        this.material = new THREE.SpriteMaterial({
            map: this.texture,
            transparent: true,
            opacity: 0.9,
            color: 0xFFFFFF,
            depthWrite: false,
            blending: THREE.NormalBlending,
            clippingPlanes: [], // Explicitly disable clipping
            fog: false          // Ignore fog
        });

        // Initialize Clouds
        this.initClouds();

        // Wind
        this.windSpeed = 1.0;
        this.windDir = new THREE.Vector3(1, 0, 0.5).normalize();
    }

    initClouds() {
        for (let i = 0; i < this.cloudCount; i++) {
            const sprite = new THREE.Sprite(this.material);

            // Randomize Scale & Aspect
            const baseScale = 20 + Math.random() * 10;
            const aspect = 1.2 + Math.random() * 0.6;
            sprite.scale.set(baseScale * aspect, baseScale, 1);

            // Layering Logic: High clouds move slower, Low clouds move faster
            const isHigh = Math.random() > 0.6;
            const height = isHigh ? (40 + Math.random() * 10) : (20 + Math.random() * 10);
            const speedFact = isHigh ? 0.5 : 1.2;

            sprite.material = this.material.clone();
            sprite.material.rotation = Math.random() * Math.PI * 2;

            // Store meta for update
            sprite.userData = {
                height: height,
                speedMultiplier: speedFact,
                baseOpacity: 0.7 + Math.random() * 0.2
            };

            // Random Position
            sprite.position.set(
                (Math.random() - 0.5) * this.spreadRadius * 2,
                height,
                (Math.random() - 0.5) * this.spreadRadius * 2
            );

            this.scene.add(sprite);
            this.clouds.push(sprite);
        }
    }

    updateColor(color) {
        // Sync cloud base color with ambient light color (for dawn/dusk/night Tint)
        // We tint the material base color to match the environment tone
        if (this.material) {
            this.material.color.lerp(color, 0.4); // Blend with sky to pick up atmosphere
        }
        // Also update cloned materials
        for (const cloud of this.clouds) {
            if (cloud.material) {
                cloud.material.color.lerp(color, 0.4);
            }
        }
    }

    update(deltaTime, camera) {
        if (!camera || !camera.position) return;

        const camX = camera.position.x;
        const camZ = camera.position.z;
        const range = this.spreadRadius;

        for (const cloud of this.clouds) {
            // Apply parallax speed
            const speed = this.windSpeed * (cloud.userData.speedMultiplier || 1.0);
            cloud.position.addScaledVector(this.windDir, speed * deltaTime);

            let dx = cloud.position.x - camX;
            let dz = cloud.position.z - camZ;

            if (dx > range) cloud.position.x -= range * 2;
            else if (dx < -range) cloud.position.x += range * 2;

            if (dz > range) cloud.position.z -= range * 2;
            else if (dz < -range) cloud.position.z += range * 2;

            // Keep height consistent
            if (cloud.userData.height) {
                cloud.position.y = cloud.userData.height;
            }
        }
    }
}
