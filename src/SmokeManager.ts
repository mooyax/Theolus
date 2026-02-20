import * as THREE from 'three';

/**
 * Lightweight Particle System for Building Smoke
 * Uses THREE.Points for high performance and minimal draw calls.
 */
export class SmokeManager {
    private scene: THREE.Scene;
    private maxParticles: number;
    private particles: THREE.Points;
    private geometry: THREE.BufferGeometry;
    private positions: Float32Array;
    private velocities: Float32Array;
    private ages: Float32Array;
    private lifeTimes: Float32Array;
    private nextIndex: number = 0;
    private texture: THREE.Texture | null = null;

    constructor(scene: THREE.Scene, maxParticles: number = 2000) {
        this.scene = scene;
        this.maxParticles = maxParticles;

        this.positions = new Float32Array(maxParticles * 3);
        this.velocities = new Float32Array(maxParticles * 3);
        this.ages = new Float32Array(maxParticles);
        this.lifeTimes = new Float32Array(maxParticles);

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

        const texture = this.createSmokeTexture();

        const material = new THREE.PointsMaterial({
            color: 0xdddddd,
            size: 4.0,
            map: texture,
            transparent: true,
            opacity: 0.4, // 少し下げて重なりを自然に
            depthWrite: false,
            depthTest: true,
            blending: THREE.NormalBlending
        });

        this.particles = new THREE.Points(this.geometry, material);
        this.particles.frustumCulled = false;
        this.particles.renderOrder = 500;
        this.scene.add(this.particles);

        // Hide off-screen initially
        for (let i = 0; i < maxParticles; i++) {
            this.positions[i * 3 + 1] = -1000;
        }
    }

    /**
     * Create a procedural radial gradient texture for soft smoke
     */
    private createSmokeTexture(): THREE.Texture {
        const size = 64;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');

        if (context) {
            const gradient = context.createRadialGradient(
                size / 2, size / 2, 0,
                size / 2, size / 2, size / 2
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
            gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)');
            gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);
        }

        this.texture = new THREE.CanvasTexture(canvas);
        return this.texture;
    }

    /**
     * Emit a single puff of smoke from a specific world position
     */
    emit(x: number, y: number, z: number) {
        const i = this.nextIndex;

        // Set Position (Top of chimney/building approx)
        this.positions[i * 3] = x + (Math.random() - 0.5) * 0.2;
        this.positions[i * 3 + 1] = y;
        this.positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.2;

        // Set Drift Velocity (Upwards + slight random sway)
        this.velocities[i * 3] = (Math.random() - 0.5) * 0.1;
        this.velocities[i * 3 + 1] = 0.2 + Math.random() * 0.2; // 少し速く上昇
        this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

        this.ages[i] = 0;
        this.lifeTimes[i] = 2.0 + Math.random() * 2.0;

        this.nextIndex = (this.nextIndex + 1) % this.maxParticles;
    }

    update(deltaTime: number) {
        const posAttr = this.geometry.getAttribute('position') as THREE.BufferAttribute;

        for (let i = 0; i < this.maxParticles; i++) {
            if (this.positions[i * 3 + 1] < -500) continue; // Inactive

            this.ages[i] += deltaTime;

            if (this.ages[i] >= this.lifeTimes[i]) {
                // Die: move offscreen
                this.positions[i * 3 + 1] = -1000;
            } else {
                // Move
                this.positions[i * 3] += this.velocities[i * 3] * deltaTime;
                this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * deltaTime;
                this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * deltaTime;

                // Slow down and grow slightly? (Can't grow individual point size easily without shader)
                // Just drift
            }
        }

        posAttr.needsUpdate = true;
        this.geometry.computeBoundingSphere(); // バウンディング領域を更新してカリングを防止
    }

    dispose() {
        this.scene.remove(this.particles);
        this.geometry.dispose();
        (this.particles.material as THREE.Material).dispose();
        if (this.texture) this.texture.dispose();
    }
}
