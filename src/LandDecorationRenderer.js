import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class LandDecorationRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 20000) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = maxInstances;
        this.meshes = {};
        this._dummy = new THREE.Object3D();
        this.initialized = false;
    }

    async init() {
        console.log("[LandDecorationRenderer] Initializing Assets...");
        this.initAssets();
        this.initInstancedMeshes();
        this.initialized = true;
        console.log("[LandDecorationRenderer] Initialization Complete.");
    }

    initAssets() {
        this.assets = {};
        const matOptions = {
            clippingPlanes: this.clippingPlanes,
            side: THREE.DoubleSide,
            vertexColors: true,
            flatShading: true
        };

        // --- 1. Flower Geometry (Split into Stem/Leaves and Petals/Core) ---
        // Stems & Leaves (Always Green)
        const stemGeo = new THREE.BoxGeometry(0.04, 0.3, 0.04);
        stemGeo.translate(0, 0.15, 0);

        const leaf1 = new THREE.BoxGeometry(0.12, 0.02, 0.06);
        leaf1.rotateZ(Math.PI / 6);
        leaf1.translate(0.06, 0.12, 0);
        const leaf2 = leaf1.clone().rotateY(Math.PI); // Opposite side

        this.assets.flowerStemGeo = BufferGeometryUtils.mergeGeometries([stemGeo, leaf1, leaf2]);

        // Green vertex colors for stems/leaves
        const fsCount = this.assets.flowerStemGeo.attributes.position.count;
        const fsCols = new Float32Array(fsCount * 3);
        const leafColor = new THREE.Color(0x4CAF50); // Natural Green
        for (let i = 0; i < fsCount; i++) {
            fsCols[i * 3] = leafColor.r;
            fsCols[i * 3 + 1] = leafColor.g;
            fsCols[i * 3 + 2] = leafColor.b;
        }
        this.assets.flowerStemGeo.setAttribute('color', new THREE.BufferAttribute(fsCols, 3));

        // Petals & Core (Positioned at top of stem)
        const plane1 = new THREE.PlaneGeometry(0.5, 0.5, 1, 1);
        plane1.translate(0, 0.25, 0);
        const plane2 = plane1.clone().rotateY(Math.PI / 3);
        const plane3 = plane1.clone().rotateY(Math.PI * 2 / 3);
        const petalsGeo = BufferGeometryUtils.mergeGeometries([plane1, plane2, plane3]);

        const coreGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
        coreGeo.translate(0, 0.25, 0);

        // Petal colors (White for setColorAt multiplication)
        const pCount = petalsGeo.attributes.position.count;
        const pCols = new Float32Array(pCount * 3).fill(1.0);
        petalsGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

        // Core colors (Fixed Yellow)
        const coreCount = coreGeo.attributes.position.count;
        const coreCols = new Float32Array(coreCount * 3);
        const coreColor = new THREE.Color(0xFFEB3B); // Bright Yellow
        for (let i = 0; i < coreCount; i++) {
            coreCols[i * 3] = coreColor.r;
            coreCols[i * 3 + 1] = coreColor.g;
            coreCols[i * 3 + 2] = coreColor.b;
        }
        coreGeo.setAttribute('color', new THREE.BufferAttribute(coreCols, 3));

        this.assets.flowerPetalGeo = BufferGeometryUtils.mergeGeometries([petalsGeo, coreGeo]);
        this.assets.flowerPetalGeo.translate(0, 0.25, 0); // Lift petals to be on top of the 0.3 height stem

        this.assets.flowerMat = new THREE.MeshPhongMaterial({
            ...matOptions,
            shininess: 0,
            transparent: false,
            alphaTest: 0.5
        });

        // --- 2. Mushroom Geometry ---
        // Stem
        this.assets.mushroomStemGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.25, 6);
        this.assets.mushroomStemGeo.translate(0, 0.125, 0);
        const sCount = this.assets.mushroomStemGeo.attributes.position.count;
        const sCols = new Float32Array(sCount * 3).fill(0.9); // Creamy white
        this.assets.mushroomStemGeo.setAttribute('color', new THREE.BufferAttribute(sCols, 3));

        // Cap (Half-sphere)
        this.assets.mushroomCapGeo = new THREE.SphereGeometry(0.18, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2);
        this.assets.mushroomCapGeo.translate(0, 0.2, 0);
        const cCount = this.assets.mushroomCapGeo.attributes.position.count;
        const cCols = new Float32Array(cCount * 3).fill(1.0); // White base for setColorAt
        this.assets.mushroomCapGeo.setAttribute('color', new THREE.BufferAttribute(cCols, 3));

        this.assets.mushroomMat = new THREE.MeshPhongMaterial({
            ...matOptions,
            shininess: 5
        });

        // Apply Wind Sway Shader (Similar to TreeRenderer)
        const applySway = (mat, isFlower = true) => {
            mat.onBeforeCompile = (shader) => {
                shader.uniforms.uTime = { value: 0 };
                shader.uniforms.uSwayIntensity = { value: 1.0 };
                shader.vertexShader = `
                    uniform float uTime;
                    uniform float uSwayIntensity;
                ` + shader.vertexShader;

                const swaySpeed = isFlower ? "1.5" : "1.2";
                const swayRange = isFlower ? "0.08" : "0.04";

                shader.vertexShader = shader.vertexShader.replace(
                    '#include <begin_vertex>',
                    `
                    vec3 transformed = vec3(position);
                    #ifdef USE_INSTANCING
                        vec3 wPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
                    #else
                        vec3 wPos = vec3(modelMatrix[3][0], modelMatrix[3][1], modelMatrix[3][2]);
                    #endif
                    // Sway more at the top, less at bottom. 
                    // Lower flowers/mushrooms sway less than trees.
                    float heightFactor = max(0.0, position.y);
                    float sway = sin(uTime * ${swaySpeed} + wPos.x * 0.5 + wPos.z * 0.3) * ${swayRange} * heightFactor * uSwayIntensity;
                    transformed.x += sway;
                    transformed.z += sway * 0.5;
                    `
                );
                mat.userData.shader = shader;
            };
        };

        applySway(this.assets.flowerMat, true);
        applySway(this.assets.mushroomMat, false);
    }

    initInstancedMeshes() {
        const make = (geo, mat) => {
            const m = new THREE.InstancedMesh(geo, mat, this.MAX_INSTANCES);
            m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            m.castShadow = true;
            m.receiveShadow = true;
            m.frustumCulled = false;
            m.count = 0;
            this.scene.add(m);
            return m;
        };

        this.meshes.flowerStems = make(this.assets.flowerStemGeo, this.assets.flowerMat);
        this.meshes.flowerPetals = make(this.assets.flowerPetalGeo, this.assets.flowerMat);
        this.meshes.mushroomStems = make(this.assets.mushroomStemGeo, this.assets.mushroomMat);
        this.meshes.mushroomCaps = make(this.assets.mushroomCapGeo, this.assets.mushroomMat);
    }

    update(viewCenter, time = 0, swayIntensity = 1.0) {
        if (!this.initialized || !this.terrain) return;

        // Update Uniforms
        if (this.assets.flowerMat.userData.shader) {
            this.assets.flowerMat.userData.shader.uniforms.uTime.value = time;
            this.assets.flowerMat.userData.shader.uniforms.uSwayIntensity.value = swayIntensity;
        }
        if (this.assets.mushroomMat.userData.shader) {
            this.assets.mushroomMat.userData.shader.uniforms.uTime.value = time;
            this.assets.mushroomMat.userData.shader.uniforms.uSwayIntensity.value = swayIntensity;
        }

        const terrain = this.terrain;
        const viewRadius = 80; // Reasonable culling radius
        const dummy = this._dummy;

        // --- 1. Update Flowers ---
        let fIdx = 0;
        const flowerCols = [
            new THREE.Color(0xFF8A80), // Red
            new THREE.Color(0xFFD54F), // Amber/Yellow
            new THREE.Color(0x80D8FF), // Light Blue
            new THREE.Color(0xF06292), // Pink
            new THREE.Color(0xB388FF)  // Purple
        ];

        const season = terrain.currentSeason || 'Spring';
        if (season !== 'Winter') {
            for (const f of terrain.flowers) {
                // Seasonal Filter for Flowers
                if (season === 'Autumn') {
                    // Only show ~40% of flowers in Autumn (using grid position for stable randomness)
                    const fHash = (Math.sin(f.gridX * 12.9898 + f.gridZ * 78.233) * 43758.5453) % 1;
                    if (Math.abs(fHash) > 0.4) continue;
                }

                const worldPos = terrain.getVisualPosition(f.gridX, f.gridZ);
                const dx = worldPos.x - viewCenter.x;
                const dz = worldPos.z - viewCenter.z;
                if (dx * dx + dz * dz > viewRadius * viewRadius) continue;
                if (fIdx >= this.MAX_INSTANCES) break;

                const exactY = terrain.getVisualHeight(worldPos.x, worldPos.z);
                dummy.position.set(worldPos.x, exactY - 0.05, worldPos.z);
                dummy.rotation.set(f.rotationX || 0, f.rotationY, f.rotationZ || 0);

                dummy.scale.set(f.scale, f.scale, f.scale);
                dummy.updateMatrix();

                this.meshes.flowerStems.setMatrixAt(fIdx, dummy.matrix);
                this.meshes.flowerPetals.setMatrixAt(fIdx, dummy.matrix);

                this.meshes.flowerPetals.setColorAt(fIdx, flowerCols[f.type % flowerCols.length]);
                this.meshes.flowerStems.setColorAt(fIdx, new THREE.Color(1, 1, 1)); // Neutral color, stem vertex colors are green
                fIdx++;
            }
        }
        this.meshes.flowerStems.count = fIdx;
        this.meshes.flowerPetals.count = fIdx;
        this.meshes.flowerStems.instanceMatrix.needsUpdate = true;
        this.meshes.flowerPetals.instanceMatrix.needsUpdate = true;
        if (this.meshes.flowerPetals.instanceColor) this.meshes.flowerPetals.instanceColor.needsUpdate = true;
        if (this.meshes.flowerStems.instanceColor) this.meshes.flowerStems.instanceColor.needsUpdate = true;

        // --- 2. Update Mushrooms ---
        let mIdx = 0;
        const capCols = [
            new THREE.Color(0xEF5350), // Red (Fly Agaric)
            new THREE.Color(0x8D6E63), // Brown
            new THREE.Color(0xFFCA28)  // Orange/Golden
        ];

        if (season !== 'Winter') {
            for (const m of terrain.mushrooms) {
                // Seasonal Filter for Mushrooms
                if (season === 'Spring' || season === 'Summer') {
                    // Only show in high moisture areas (>0.7) during Spring/Summer
                    const moisture = terrain.getMoisture(m.gridX, m.gridZ);
                    if (moisture < 0.7) continue;
                }

                const worldPos = terrain.getVisualPosition(m.gridX, m.gridZ);
                const dx = worldPos.x - viewCenter.x;
                const dz = worldPos.z - viewCenter.z;
                if (dx * dx + dz * dz > viewRadius * viewRadius) continue;
                if (mIdx >= this.MAX_INSTANCES) break;

                const exactY = terrain.getVisualHeight(worldPos.x, worldPos.z);
                dummy.position.set(worldPos.x, exactY - 0.05, worldPos.z);
                dummy.rotation.set(m.rotationX || 0, m.rotationY, m.rotationZ || 0);

                dummy.scale.set(m.scale, m.scale, m.scale);
                dummy.updateMatrix();

                this.meshes.mushroomStems.setMatrixAt(mIdx, dummy.matrix);
                this.meshes.mushroomCaps.setMatrixAt(mIdx, dummy.matrix);

                this.meshes.mushroomCaps.setColorAt(mIdx, capCols[m.type % capCols.length]);
                this.meshes.mushroomStems.setColorAt(mIdx, new THREE.Color(1, 1, 1)); // Keep stem neutral

                mIdx++;
            }
        }
        this.meshes.mushroomStems.count = mIdx;
        this.meshes.mushroomCaps.count = mIdx;
        this.meshes.mushroomStems.instanceMatrix.needsUpdate = true;
        this.meshes.mushroomCaps.instanceMatrix.needsUpdate = true;
        if (this.meshes.mushroomStems.instanceColor) this.meshes.mushroomStems.instanceColor.needsUpdate = true;
        if (this.meshes.mushroomCaps.instanceColor) this.meshes.mushroomCaps.instanceColor.needsUpdate = true;
    }

    dispose() {
        for (const key in this.meshes) {
            this.scene.remove(this.meshes[key]);
            if (this.meshes[key].geometry) this.meshes[key].geometry.dispose();
            if (this.meshes[key].material) this.meshes[key].material.dispose();
        }
        this.meshes = {};
        this.initialized = false;
    }
}
