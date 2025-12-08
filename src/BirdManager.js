import * as THREE from 'three';

export class BirdManager {
    static assets = {
        geometries: {},
        materials: {},
        initialized: false
    };

    static initAssets() {
        if (BirdManager.assets.initialized) return;

        // Body
        const bodyGeo = new THREE.ConeGeometry(0.05, 0.2, 4);
        bodyGeo.rotateX(Math.PI / 2); // Point forward
        BirdManager.assets.geometries.body = bodyGeo;

        // Wings
        const wingGeo = new THREE.BufferGeometry();
        const wingVertices = new Float32Array([
            0, 0, 0,       // Root
            0.3, 0, 0.1,   // Tip
            0, 0, 0.15     // Back
        ]);
        wingGeo.setAttribute('position', new THREE.BufferAttribute(wingVertices, 3));
        wingGeo.computeVertexNormals();
        BirdManager.assets.geometries.wing = wingGeo;

        // Materials
        BirdManager.assets.materials.body = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
        BirdManager.assets.materials.wing = new THREE.MeshBasicMaterial({ color: 0xEEEEEE, side: THREE.DoubleSide });

        BirdManager.assets.initialized = true;
    }

    constructor(scene, terrainWidth, terrainDepth, clippingPlanes) {
        BirdManager.initAssets();

        this.scene = scene;
        this.terrainWidth = terrainWidth;
        this.terrainDepth = terrainDepth;
        this.clippingPlanes = clippingPlanes || [];
        this.birds = [];
        this.birdCount = 20;

        // Apply Clipping
        const mats = BirdManager.assets.materials;
        Object.values(mats).forEach(mat => {
            if (mat) mat.clippingPlanes = this.clippingPlanes;
        });

        this.initBirds();
    }

    initBirds() {
        for (let i = 0; i < this.birdCount; i++) {
            const birdGroup = new THREE.Group();

            // Body
            const body = new THREE.Mesh(BirdManager.assets.geometries.body, BirdManager.assets.materials.body);
            birdGroup.add(body);

            // Wings
            const leftWing = new THREE.Mesh(BirdManager.assets.geometries.wing, BirdManager.assets.materials.wing);
            leftWing.position.set(0, 0, 0);
            birdGroup.add(leftWing);

            const rightWing = new THREE.Mesh(BirdManager.assets.geometries.wing, BirdManager.assets.materials.wing);
            rightWing.position.set(0, 0, 0);
            rightWing.scale.x = -1; // Mirror
            birdGroup.add(rightWing);

            // Store wings for animation
            birdGroup.userData.leftWing = leftWing;
            birdGroup.userData.rightWing = rightWing;

            // Random start position
            birdGroup.position.set(
                (Math.random() - 0.5) * this.terrainWidth,
                15 + Math.random() * 10, // Height 15-25
                (Math.random() - 0.5) * this.terrainDepth
            );

            // Random velocity
            const speed = 2 + Math.random() * 2;
            const angle = Math.random() * Math.PI * 2;
            birdGroup.userData.velocity = new THREE.Vector3(
                Math.cos(angle) * speed,
                0,
                Math.sin(angle) * speed
            );
            birdGroup.userData.speed = speed;
            birdGroup.userData.turnSpeed = 0.5 + Math.random();

            // Random wing flap offset
            birdGroup.userData.flapOffset = Math.random() * 100;

            this.scene.add(birdGroup);
            this.birds.push(birdGroup);
        }
    }

    update(deltaTime, time, frustum) {
        this.birds.forEach(bird => {
            // Move
            bird.position.addScaledVector(bird.userData.velocity, deltaTime);

            // Wrap around world
            const limitX = this.terrainWidth / 2;
            const limitZ = this.terrainDepth / 2;

            if (bird.position.x > limitX) bird.position.x -= this.terrainWidth;
            if (bird.position.x < -limitX) bird.position.x += this.terrainWidth;
            if (bird.position.z > limitZ) bird.position.z -= this.terrainDepth;
            if (bird.position.z < -limitZ) bird.position.z += this.terrainDepth;

            // Frustum Check
            let isVisible = true;
            if (frustum) {
                const sphere = new THREE.Sphere(bird.position, 1.0);
                isVisible = frustum.intersectsSphere(sphere);
            }

            if (!isVisible) {
                bird.visible = false;
                return; // Skip animation
            }
            bird.visible = true;

            // Simple steering (turn slowly)
            // Occasionally change direction
            if (Math.random() < 0.01) {
                const angle = (Math.random() - 0.5) * 2; // -1 to 1
                bird.userData.velocity.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle * bird.userData.turnSpeed * deltaTime);
            }

            // Orient to velocity
            bird.lookAt(bird.position.clone().add(bird.userData.velocity));

            // Flap wings (Rotation)
            const flapSpeed = 15;
            const flapAngle = Math.sin(time * flapSpeed + bird.userData.flapOffset) * 0.5; // +/- 0.5 rad

            bird.userData.leftWing.rotation.z = flapAngle;
            bird.userData.rightWing.rotation.z = -flapAngle;

            // Random Chirp
            if (Math.random() < 0.001) { // Low chance per frame
                if (window.game && window.game.soundManager) {
                    window.game.soundManager.playBirdSound(bird.position);
                }
            }
        });
    }
}
