import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class SeaDecorationRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 5000) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = maxInstances;
        this.meshes = {};
        this._dummy = new THREE.Object3D();
        this.initialized = false;

        this.decorations = []; // { x, z, type, rotationY, scale }
    }

    async init() {
        console.log("[SeaDecorationRenderer] Initializing Assets...");
        this.initAssets();
        this.generateDecorationData();
        this.initInstancedMeshes();
        this.initMarineSnow();
        this.initialized = true;
        console.log("[SeaDecorationRenderer] Initialization Complete.");
    }

    initAssets() {
        this.assets = {};

        const matOptions = {
            clippingPlanes: this.clippingPlanes,
            side: THREE.DoubleSide,
            transparent: true,
            alphaTest: 0.5
        };

        // 1. Seaweed Geometry (Bushier Cluster)
        const partsSeaweed = [];
        for (let i = 0; i < 4; i++) {
            const blade = new THREE.PlaneGeometry(0.35, 1.0, 1, 4);
            blade.translate(0, 0.5, 0);
            blade.rotateY(i * Math.PI / 4);
            // Tilt some blades for better top visibility
            blade.rotateX((Math.random() - 0.5) * 0.4);
            partsSeaweed.push(blade);
        }
        this.assets.seaweedGeo = BufferGeometryUtils.mergeGeometries(partsSeaweed);

        // Seaweed Texture (Procedural)
        const seaweedCanvas = document.createElement('canvas');
        seaweedCanvas.width = 64;
        seaweedCanvas.height = 128;
        const ctx = seaweedCanvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 128, 0, 0);
        grad.addColorStop(0, '#1B5E20'); // Dark Green
        grad.addColorStop(1, '#4CAF50'); // Light Green
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(32, 128);
        ctx.quadraticCurveTo(5, 64, 32, 0);
        ctx.quadraticCurveTo(59, 64, 32, 128);
        ctx.fill();

        const seaweedTex = new THREE.CanvasTexture(seaweedCanvas);
        this.assets.seaweedMat = new THREE.MeshPhongMaterial({
            ...matOptions,
            map: seaweedTex,
            shininess: 10
        });
        this.assets.seaweedMat.userData.uTime = { value: 0 };

        const applyUnderwaterEffects = (mat) => {
            mat.onBeforeCompile = (shader) => {
                if (mat === this.assets.seaweedMat) {
                    shader.uniforms.uTime = this.assets.seaweedMat.userData.uTime;
                    shader.vertexShader = shader.vertexShader.replace('#include <common>', `
                        #include <common>
                        uniform float uTime;
                    `);
                    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
                        vec3 transformed = vec3(position);
                        float wave = sin(uTime * 1.5 + position.y * 2.0) * 0.15 * position.y;
                        transformed.x += wave;
                        transformed.z += wave * 0.5;
                    `);
                }

                shader.vertexShader = shader.vertexShader.replace('#include <common>', `
                    #include <common>
                    varying vec3 vWorldPos;
                `);
                shader.vertexShader = shader.vertexShader.replace('#include <worldpos_vertex>', `
                    #include <worldpos_vertex>
                    vec4 instWorldPos = vec4(transformed, 1.0);
                    #ifdef USE_INSTANCING
                        instWorldPos = instanceMatrix * instWorldPos;
                    #endif
                    vWorldPos = (modelMatrix * instWorldPos).xyz;
                `);

                shader.fragmentShader = shader.fragmentShader.replace('#include <common>', `
                    #include <common>
                    varying vec3 vWorldPos;
                `);
                shader.fragmentShader = shader.fragmentShader.replace('#include <color_fragment>', `
                    #include <color_fragment>
                    float depth = max(0.0, 0.25 - vWorldPos.y);
                    vec3 waterColor = vec3(0.0, 0.1, 0.2);
                    diffuseColor.rgb = mix(diffuseColor.rgb, waterColor, clamp(depth * 1.5, 0.0, 0.5));
                    
                    float dist = distance(vWorldPos, cameraPosition);
                    float fog = smoothstep(20.0, 60.0, dist);
                    diffuseColor.rgb = mix(diffuseColor.rgb, waterColor, fog * 0.8);
                `);
            };
        };

        applyUnderwaterEffects(this.assets.seaweedMat);

        // 2. Coral Geometry (Bubble Coral - More organic)
        const partsCoral = [];
        const bubbleCount = 8;
        for (let i = 0; i < bubbleCount; i++) {
            const size = 0.1 + Math.random() * 0.2;
            const bubble = new THREE.SphereGeometry(size, 6, 6);
            const dist = i === 0 ? 0 : 0.15 + Math.random() * 0.2;
            const angle = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            bubble.translate(
                Math.cos(angle) * Math.sin(phi) * dist,
                Math.abs(Math.cos(phi) * dist) + size * 0.5,
                Math.sin(angle) * Math.sin(phi) * dist
            );
            partsCoral.push(bubble);
        }
        this.assets.coralGeo = BufferGeometryUtils.mergeGeometries(partsCoral);
        this.assets.coralMat = new THREE.MeshPhongMaterial({
            ...matOptions,
            color: 0xff4f70, // Vivid Pinkish-red
            transparent: false,
            alphaTest: 0,
            flatShading: true
        });
        applyUnderwaterEffects(this.assets.coralMat);

        // 3. Small Rock Geometry
        const rockGeo = new THREE.SphereGeometry(0.2, 5, 5);
        rockGeo.scale(1, 0.6, 1.2);
        this.assets.rockGeo = rockGeo;
        this.assets.rockMat = new THREE.MeshPhongMaterial({
            ...matOptions,
            color: 0x6a6a6a,
            transparent: false,
            alphaTest: 0,
            flatShading: true
        });
        applyUnderwaterEffects(this.assets.rockMat);
    }

    generateDecorationData() {
        const W = this.terrain.logicalWidth;
        const D = this.terrain.logicalDepth;

        for (let i = 0; i < 1000; i++) {
            const x = Math.floor(Math.random() * W);
            const z = Math.floor(Math.random() * D);
            const h = this.terrain.getTileHeight(x, z);

            if (h <= -1.0) { // Sea floor
                const type = Math.random() > 0.4 ? 'seaweed' : (Math.random() > 0.3 ? 'coral' : 'rock');
                this.decorations.push({
                    gridX: x,
                    gridZ: z,
                    type: type,
                    rotationY: Math.random() * Math.PI * 2,
                    scale: 0.5 + Math.random() * 1.0
                });
            }
        }
    }

    initInstancedMeshes() {
        const make = (geo, mat) => {
            const m = new THREE.InstancedMesh(geo, mat, this.MAX_INSTANCES);
            m.instanceMatrix.setUsage(THREE.StaticDrawUsage);
            m.frustumCulled = false;
            m.count = 0;
            this.scene.add(m);
            return m;
        };

        this.meshes.seaweed = make(this.assets.seaweedGeo, this.assets.seaweedMat);
        this.meshes.coral = make(this.assets.coralGeo, this.assets.coralMat);
        this.meshes.rock = make(this.assets.rockGeo, this.assets.rockMat);
    }

    initMarineSnow() {
        const count = 500;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const W = this.terrain.width;
        const D = this.terrain.depth;

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * W;
            pos[i * 3 + 1] = Math.random() * -3.0; // Under water
            pos[i * 3 + 2] = (Math.random() - 0.5) * D;
            sizes[i] = Math.random() * 0.05 + 0.02;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.05,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.marineSnow = new THREE.Points(geo, mat);
        this.scene.add(this.marineSnow);
    }

    update(time, deltaTime) {
        if (!this.initialized) return;

        // Seaweed Wave Update
        if (this.assets.seaweedMat.userData.uTime) {
            this.assets.seaweedMat.userData.uTime.value = time;
        }

        // Marine Snow Update
        if (this.marineSnow) {
            const pos = this.marineSnow.geometry.attributes.position.array;
            for (let i = 0; i < pos.length; i += 3) {
                pos[i + 1] -= deltaTime * 0.05; // Fall slowly
                pos[i] += Math.sin(time * 0.5 + i) * 0.002; // Drifting
                if (pos[i + 1] < -5.0) pos[i + 1] = 0; // Wrap top
            }
            this.marineSnow.geometry.attributes.position.needsUpdate = true;
        }

        // Instanced Mesh Update (Static position but needs to handle wrapping if terrain tiles)
        // For now, let's just place them once since the decorations are generated based on grid.
        if (this.decorations.length > 0 && this.meshes.seaweed.count === 0) {
            let counts = { seaweed: 0, coral: 0, rock: 0 };
            const dummy = this._dummy;

            for (const d of this.decorations) {
                const worldPos = this.terrain.getVisualPosition(d.gridX, d.gridZ);
                const h = worldPos.y;

                dummy.position.set(worldPos.x, h, worldPos.z);
                dummy.rotation.set(0, d.rotationY, 0);
                dummy.scale.set(d.scale, d.scale, d.scale);
                dummy.updateMatrix();

                const m = this.meshes[d.type];
                if (m && counts[d.type] < this.MAX_INSTANCES) {
                    m.setMatrixAt(counts[d.type], dummy.matrix);
                    counts[d.type]++;
                }
            }

            for (const key in this.meshes) {
                this.meshes[key].count = counts[key];
                this.meshes[key].instanceMatrix.needsUpdate = true;
            }
        }
    }

    dispose() {
        for (const key in this.meshes) {
            this.scene.remove(this.meshes[key]);
            this.meshes[key].geometry.dispose();
            this.meshes[key].material.dispose();
        }
        if (this.marineSnow) {
            this.scene.remove(this.marineSnow);
            this.marineSnow.geometry.dispose();
            this.marineSnow.material.dispose();
        }
    }
}
