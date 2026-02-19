import * as THREE from 'three';
import { GameConfig } from './config/GameConfig.js';

export class TreeRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 120000) {
        this.scene = scene;
        this.terrain = terrain;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = maxInstances;
        this.meshes = {};
        this._dummy = new THREE.Object3D();
        this.initialized = false;
        this.forceUpdate = true;
    }

    async init() {
        console.log("[TreeRenderer] Initializing Assets...");
        this.initAssets();
        this.initInstancedMeshes();
        this.initialized = true;
        console.log("[TreeRenderer] Initialization Complete.");
    }

    initAssets() {
        this.assets = {};

        const matOptions = {
            clippingPlanes: this.clippingPlanes,
            clipShadows: true,
            vertexColors: true // Enable AO
        };

        // 1. Trunk (幹)
        this.assets.trunkGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.6, 6);
        this.assets.trunkGeo.translate(0, 0.3, 0);
        this.applyAO(this.assets.trunkGeo, 0.0, 0.6, 0.4, 1.0); // Darker bottom

        this.assets.trunkMat = new THREE.MeshPhongMaterial({
            ...matOptions,
            color: 0x5D4037, // Dark Brown
            flatShading: true,
            shininess: 0
        });

        // 2. Foliage (葉 - 2段の円錐)
        // Lower Foliage
        this.assets.leafLowerGeo = new THREE.ConeGeometry(0.4, 0.7, 8);
        this.assets.leafLowerGeo.translate(0, 0.8, 0);
        this.applyAO(this.assets.leafLowerGeo, 0.45, 1.15, 0.5, 1.0);

        // Upper Foliage
        this.assets.leafUpperGeo = new THREE.ConeGeometry(0.3, 0.6, 8);
        this.assets.leafUpperGeo.translate(0, 1.2, 0);
        this.applyAO(this.assets.leafUpperGeo, 0.9, 1.5, 0.5, 1.0);

        this.assets.leafMat = new THREE.MeshPhongMaterial({
            ...matOptions,
            color: 0xFFFFFF, // White (so setColorAt works correctly)
            flatShading: true,
            shininess: 5, // Reduced for softer look
            specular: 0x111111
        });

        // Add Uniforms for Tree Swaying
        const treeUniforms = {
            uTime: { value: 0 },
            uSwayIntensity: { value: 1.0 }
        };

        this.assets.leafMat.onBeforeCompile = (shader) => {
            shader.uniforms.uSwayIntensity = treeUniforms.uSwayIntensity;
            shader.uniforms.uTime = treeUniforms.uTime;
            shader.vertexShader = `
                uniform float uTime;
                uniform float uSwayIntensity;
            ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                vec3 transformed = vec3(position);
                
                // Get a world-ish position for seed (to make trees sway independently)
                #ifdef USE_INSTANCING
                    vec3 wPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
                #else
                    vec3 wPos = vec3(modelMatrix[3][0], modelMatrix[3][1], modelMatrix[3][2]);
                #endif

                // Sway more at the top (higher y), less at the bottom
                // position.y range in leaf meshes is approx 0.5 to 1.5
                float heightFactor = max(0.0, position.y - 0.4); 
                float swayX = sin(uTime * 1.0 + wPos.x * 0.5 + wPos.z * 0.3) * 0.08 * heightFactor * uSwayIntensity;
                float swayZ = cos(uTime * 0.8 + wPos.z * 0.5 + wPos.x * 0.3) * 0.05 * heightFactor * uSwayIntensity;
                transformed.x += swayX;
                transformed.z += swayZ;
                `
            );
        };
        (this.assets.leafMat).uniforms = treeUniforms;
    }

    applyAO(geo, minY, maxY, minB, maxB) {
        const count = geo.attributes.position.count;
        const colors = [];
        const pos = geo.attributes.position;
        for (let i = 0; i < count; i++) {
            const y = pos.getY(i);
            // Normalize y
            let t = (y - minY) / (maxY - minY);
            t = Math.max(0, Math.min(1, t));
            // Lerp brightness
            const b = minB + t * (maxB - minB);
            colors.push(b, b, b);
        }
        geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
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

        this.meshes.trunks = make(this.assets.trunkGeo, this.assets.trunkMat);
        this.meshes.leavesLower = make(this.assets.leafLowerGeo, this.assets.leafMat);
        this.meshes.leavesUpper = make(this.assets.leafUpperGeo, this.assets.leafMat);
    }

    update(viewCenter, time = 0, swayIntensity = 1.0) {
        if (!this.initialized || !this.terrain.trees) return;

        // Update Shader Uniforms
        if (this.assets.leafMat && this.assets.leafMat.uniforms) {
            this.assets.leafMat.uniforms.uTime.value = time;
            this.assets.leafMat.uniforms.uSwayIntensity.value = swayIntensity;
        }

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;
        const viewRadius = (GameConfig && GameConfig.render && GameConfig.render.viewRadius) ? GameConfig.render.viewRadius : 120;

        this.forceUpdate = false;

        let idx = 0;
        const dummy = this._dummy;
        const trees = this.terrain.trees;

        for (const t of trees) {
            const vPos = this.terrain.getVisualPosition(t.gridX, t.gridZ, false); // Use exact pos, not centered
            const y = vPos.y || 0;

            // Dynamic Wrapping Logic
            const minKx = Math.floor((viewCenter.x - viewRadius - vPos.x) / logicalW);
            const maxKx = Math.ceil((viewCenter.x + viewRadius - vPos.x) / logicalW);
            const minKz = Math.floor((viewCenter.z - viewRadius - vPos.z) / logicalD);
            const maxKz = Math.ceil((viewCenter.z + viewRadius - vPos.z) / logicalD);

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    const posX = vPos.x + kx * logicalW;
                    const posZ = vPos.z + kz * logicalD;

                    const dx = Math.abs(posX - viewCenter.x);
                    const dz = Math.abs(posZ - viewCenter.z);
                    if (dx > viewRadius + 5.0 || dz > viewRadius + 5.0) continue;

                    if (idx >= this.MAX_INSTANCES) break;

                    dummy.position.set(posX, y, posZ);
                    dummy.rotation.set(0, t.rotationY, 0);
                    dummy.scale.set(t.scale, t.scale, t.scale);
                    dummy.updateMatrix();

                    this.meshes.trunks.setMatrixAt(idx, dummy.matrix);
                    this.meshes.leavesLower.setMatrixAt(idx, dummy.matrix);
                    this.meshes.leavesUpper.setMatrixAt(idx, dummy.matrix);

                    // Seasonal & Individual Variation Seed
                    const seed = Math.sin(t.gridX * 12.9898 + t.gridZ * 78.233) * 43758.5453;
                    const rand = seed - Math.floor(seed);

                    // Individual variance (5-15% brightness)
                    const leafVar = 0.85 + (rand * 0.15);

                    // Seasonal Leaf Color
                    const season = this.terrain.currentSeason || 'Spring';
                    let leafBaseColor = new THREE.Color(0x2E7D32); // Default Green (Spring/Summer)

                    if (season === 'Winter') {
                        leafBaseColor.setHex(0xFFFFFF); // White (Snow)
                    } else if (season === 'Autumn') {
                        // Original Autumn Palette
                        if (rand > 0.7) {
                            leafBaseColor.setHex(0xB22222); // Fire Brick Red
                        } else if (rand > 0.4) {
                            leafBaseColor.setHex(0xFFAA00); // Orange
                        } else if (rand > 0.2) {
                            leafBaseColor.setHex(0xFFD700); // Gold Yellow
                        } else {
                            leafBaseColor.setHex(0x228B22); // Keep some Green
                        }
                    } else {
                        // Spring/Summer: Add slight variety
                        if (rand > 0.8) leafBaseColor.setHex(0x1B5E20); // Darker
                        else if (rand > 0.6) leafBaseColor.setHex(0x388E3C); // Lighter
                    }

                    // Apply individual variance
                    const finalLower = leafBaseColor.clone().multiplyScalar(leafVar);
                    // Upper foliage is slightly brighter to emphasize 3D tiers
                    const finalUpper = finalLower.clone().multiplyScalar(1.15);

                    this.meshes.leavesLower.setColorAt(idx, finalLower);
                    this.meshes.leavesUpper.setColorAt(idx, finalUpper);

                    idx++;
                }
            }
            if (idx >= this.MAX_INSTANCES) break;
        }

        this.meshes.trunks.count = idx;
        this.meshes.leavesLower.count = idx;
        this.meshes.leavesUpper.count = idx;

        this.meshes.trunks.instanceMatrix.needsUpdate = true;
        this.meshes.leavesLower.instanceMatrix.needsUpdate = true;
        this.meshes.leavesUpper.instanceMatrix.needsUpdate = true;

        if (this.meshes.leavesLower.instanceColor) this.meshes.leavesLower.instanceColor.needsUpdate = true;
        if (this.meshes.leavesUpper.instanceColor) this.meshes.leavesUpper.instanceColor.needsUpdate = true;
    }

    dispose() {
        console.log("[TreeRenderer] Disposing...");
        const remove = (m) => {
            if (m) {
                this.scene.remove(m);
                if (m.geometry) m.geometry.dispose();
                if (m.material) m.material.dispose();
            }
        };
        remove(this.meshes.trunks);
        remove(this.meshes.leavesLower);
        remove(this.meshes.leavesUpper);
        this.meshes = {};
    }
}
