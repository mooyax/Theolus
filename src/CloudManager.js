import * as THREE from 'three';

export class CloudManager {
    constructor(scene, terrainWidth, terrainDepth) {
        this.scene = scene;
        this.width = terrainWidth;
        this.depth = terrainDepth;
        this.clouds = [];

        this.initClouds();
    }

    initClouds() {
        const cloudCount = 15;

        for (let i = 0; i < cloudCount; i++) {
            const cloud = this.createCloud();
            this.resetCloudPosition(cloud, true); // true = random initial position
            this.scene.add(cloud);
            this.clouds.push({
                mesh: cloud,
                speed: 0.5 + Math.random() * 1.0 // Random speed
            });
        }
    }

    createCloud() {
        const cloudGroup = new THREE.Group();

        // Use Icosahedron for smoother, puffy look
        const geometry = new THREE.IcosahedronGeometry(0.6, 0);
        const material = new THREE.MeshLambertMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.8,
            flatShading: true
        });

        // Create a cluster of shapes
        const blocks = 3 + Math.floor(Math.random() * 5);

        for (let i = 0; i < blocks; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 1,
                (Math.random() - 0.5) * 2
            );
            // Random scale for each block
            mesh.scale.set(
                1 + Math.random(),
                0.5 + Math.random(),
                1 + Math.random()
            );
            cloudGroup.add(mesh);
        }

        return cloudGroup;
    }

    resetCloudPosition(cloud, randomStart = false) {
        // Start from -X side, move towards +X
        const x = randomStart
            ? (Math.random() - 0.5) * this.width * 1.5 // Anywhere
            : -this.width / 2 - 10; // Start off-screen left

        const z = (Math.random() - 0.5) * this.depth * 1.5;
        const y = 15 + Math.random() * 10; // Height 15-25

        cloud.position.set(x, y, z);
    }

    update(deltaTime) {
        // deltaTime is in seconds
        for (const cloudData of this.clouds) {
            const { mesh, speed } = cloudData;

            mesh.position.x += speed * deltaTime * 2; // Move along X

            // Check bounds
            if (mesh.position.x > this.width / 2 + 10) {
                this.resetCloudPosition(mesh);
            }
        }
    }
}
