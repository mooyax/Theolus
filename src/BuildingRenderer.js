import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { GameConfig } from './config/GameConfig';

export class BuildingRenderer {
    constructor(scene, terrain, clippingPlanes, maxInstances = 10000) {
        this.scene = scene;
        this.terrain = terrain; // Store reference to Terrain
        this.terrainWidth = terrain.logicalWidth;
        this.terrainDepth = terrain.logicalDepth;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = maxInstances;
        this.meshes = {};

        // Frustum Culling Helpers
        this._scratchVector = new THREE.Vector3();
        this._scratchSphere = new THREE.Sphere(new THREE.Vector3(), 2.0);
        this._dummy = new THREE.Object3D();
        this.forceUpdate = true; // 初回および強制更新用フラグ
    }

    async init() {
        console.log("[BuildingRenderer] Initializing Assets...");
        await this.initAssets();
        await this.initInstancedMeshes();
        this.initialized = true;
        console.log("[BuildingRenderer] Initialization Complete.");
    }

    async initAssets() {
        this.assets = {};

        const matOptions = {
            clippingPlanes: this.clippingPlanes,
            clipShadows: true
        };

        const houseWallMain = new THREE.BoxGeometry(1.6, 0.8, 1.6);
        houseWallMain.translate(0, 0.4, 0);

        // UV for Wall: Map V to [0.5, 1.0] (Upper half with windows)
        const wallUv = houseWallMain.getAttribute('uv');
        for (let i = 0; i < wallUv.count; i++) {
            wallUv.setY(i, wallUv.getY(i) * 0.5 + 0.5);
        }

        const houseChimney = new THREE.BoxGeometry(0.3, 0.8, 0.3);
        houseChimney.translate(0.5, 0.8, 0.5);

        // UV for Chimney: Side faces map to windows-less stone, Top face to hole shadow
        const chimneyUv = houseChimney.getAttribute('uv');
        for (let i = 0; i < chimneyUv.count; i++) {
            // i=8..11 are top face (Standard Cube UV ordering)
            if (i >= 8 && i <= 11) {
                // Map to Hole Shadow Area (Bottom right: 124,124 to 128,128)
                // V: 124/128..128/128 -> UV V: 1.0 - (0.97..1.0) = 0..0.03
                chimneyUv.setXY(i, 0.98, 0.02);
            } else {
                // Map to Plain Stone Area (Lower half: V 0.1 to 0.45)
                chimneyUv.setY(i, chimneyUv.getY(i) * 0.35 + 0.1);
            }
        }

        this.assets.houseWallGeo = BufferGeometryUtils.mergeGeometries([houseWallMain, houseChimney]);

        // Stone Texture (Enlarged to 128x128 to separate areas)
        const canvasC = document.createElement('canvas');
        canvasC.width = 128; canvasC.height = 128; // Increased height
        const ctxC = canvasC.getContext('2d');

        const canvasCE = document.createElement('canvas');
        canvasCE.width = 128; canvasCE.height = 128; // Increased height
        const ctxCE = canvasCE.getContext('2d');

        // B1. Base Stone Gray/Brown (Entire Canvas)
        ctxC.fillStyle = '#654321'; ctxC.fillRect(0, 0, 128, 128);
        ctxCE.fillStyle = '#000000'; ctxCE.fillRect(0, 0, 128, 128);

        // B2. Stone Bricks Pattern (Upper Half for Wall, Lower Half for Chimney Side)
        ctxC.fillStyle = '#5A3A1A';
        for (let y = 0; y < 128; y += 16) {
            for (let x = 0; x < 128; x += 16) {
                if (((x + y) / 16) % 2 === 0) ctxC.fillRect(x + 1, y + 1, 14, 14);
            }
        }

        // B2.5 Hole Shadow (Bottom Right corner)
        ctxC.fillStyle = '#111';
        ctxC.fillRect(124, 124, 4, 4);

        // B3. Windows (ONLY in Upper Half: Y 0-64)
        const drawCastleWindow = (cx, cy) => {
            ctxC.fillStyle = '#111';
            ctxC.fillRect(cx - 6, cy - 8, 12, 16);
            ctxCE.fillStyle = '#FFFFFF';
            ctxCE.fillRect(cx - 4, cy - 6, 8, 12);
        };
        drawCastleWindow(32, 24); // Y within 0-64
        drawCastleWindow(96, 24); // Y within 0-64

        this.assets.houseWallMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasC),
            emissiveMap: new THREE.CanvasTexture(canvasCE),
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });

        await this.terrain.checkYield();

        // Roof Texture (Shingles)
        const canvasR = document.createElement('canvas');
        canvasR.width = 64; canvasR.height = 64;
        const ctxR = canvasR.getContext('2d');
        ctxR.fillStyle = '#800000'; ctxR.fillRect(0, 0, 64, 64); // Base Red
        ctxR.fillStyle = '#600000';
        for (let r = 0; r < 64; r += 8) { // Layers
            ctxR.fillRect(0, r, 64, 2);
        }
        ctxR.fillStyle = '#A00000';
        for (let r = 0; r < 64; r += 8) {
            for (let c = (r % 16 === 0 ? 0 : 4); c < 64; c += 8) {
                ctxR.fillRect(c, r, 2, 8);
            }
        }

        this.assets.houseRoofMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasR),
            color: 0xFFFFFF // Let texture dictate color
        });

        // House Roof (Cone/Pyramid for Castle look)
        this.assets.houseRoofGeo = new THREE.ConeGeometry(1.2, 0.8, 4);
        this.assets.houseRoofGeo.translate(0, 1.2, 0); // Sit on top of wall (0.8 height)
        this.assets.houseRoofGeo.rotateY(Math.PI / 4);

        await this.terrain.checkYield();

        // --- TOWER (Cylinder, 3x3) ---
        // Medieval Tower: Tall Stone Cylinder, Flat Top (Crenellated look implied)
        // Height 4.5. Width 1.4 radius.
        const towerBase = new THREE.CylinderGeometry(1.4, 1.4, 4.5, 16);
        towerBase.translate(0, 2.25, 0); // Center at 2.25

        // Top Rim (Battlements)
        const towerRim = new THREE.CylinderGeometry(1.6, 1.6, 0.4, 16);
        towerRim.translate(0, 4.5, 0); // On top

        // Save as separate assets for Split Rendering (Safe vs Merge)
        this.assets.towerGeo = towerBase;      // Base
        this.assets.towerRimGeo = towerRim;    // Rim

        console.log("Tower Geometry Initialized (Split Mode)");

        // Create Dedicated Tower Texture (Tall, High Res to verify roughness/windows)
        // Canvas: 128 width (circumference approx), 256 height (tall)
        const canvasT = document.createElement('canvas');
        canvasT.width = 128; canvasT.height = 256;
        const ctxT = canvasT.getContext('2d');

        const canvasTE = document.createElement('canvas');
        canvasTE.width = 128; canvasTE.height = 256;
        const ctxTE = canvasTE.getContext('2d');

        // T1. Base Stone (Darker Gray)
        ctxT.fillStyle = '#505050'; ctxT.fillRect(0, 0, 128, 256);
        ctxTE.fillStyle = '#000000'; ctxTE.fillRect(0, 0, 128, 256); // Black Emissive Base

        // T2. Bricks (Smaller/Denser)
        ctxT.fillStyle = '#404040';
        for (let y = 0; y < 256; y += 16) {
            const rowOffset = (y / 16) % 2 === 0 ? 0 : 8;
            for (let x = 0; x < 128; x += 16) {
                ctxT.fillRect((x + rowOffset) % 128 + 1, y + 1, 14, 14);
            }
        }

        // T3. Windows (Arrow Slits) - Vertical and Narrow
        const drawTowerWindow = (x, y, w, h) => {
            ctxT.fillStyle = '#101010'; // Black hole
            ctxT.fillRect(x, y, w, h);

            // Emissive Light (Warm White)
            ctxTE.fillStyle = '#FFFFEE';
            ctxTE.fillRect(x + 1, y + 1, w - 2, h - 2); // Slightly smaller for frame effect
        };

        // Lower Tier
        drawTowerWindow(20, 80, 6, 18);
        drawTowerWindow(80, 80, 6, 18);
        // Upper Tier
        drawTowerWindow(50, 180, 6, 18);
        drawTowerWindow(110, 180, 6, 18);

        // Tower Material (New)
        this.assets.towerMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasT),
            emissiveMap: new THREE.CanvasTexture(canvasTE),
            color: 0xeeeeee,
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });

        // Cap Material (Top/Bottom) - Plain Dark Stone
        this.assets.towerCapMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            color: 0x505050, // Match base canvas color
            map: null,
            emissive: 0x000000
        });

        console.log("Tower Debug: Generated High-Res Tower Texture + Cap Material");

        await this.terrain.checkYield();

        // --- FARM (2x2) ---
        // Size 2x2 tiles. Visual size ~1.8
        // Convert to Box with segments for waving (1.8 width x 0.2 height x 1.8 depth)
        this.assets.farmGeo = new THREE.BoxGeometry(1.8, 0.2, 1.8, 4, 1, 4);
        // Translate so base is at 0 (original was plane at 0.05, let's keep it similar)
        this.assets.farmGeo.translate(0, 0.1, 0);

        const canvas3 = document.createElement('canvas');
        canvas3.width = 64; canvas3.height = 64;
        const ctx3 = canvas3.getContext('2d');
        ctx3.fillStyle = '#DAA520'; ctx3.fillRect(0, 0, 64, 64);
        ctx3.fillStyle = '#B8860B';
        for (let i = 0; i < 10; i++) ctx3.fillRect(i * 6, 0, 2, 64);
        this.assets.farmMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvas3),
            side: THREE.DoubleSide
        });

        // Add Uniforms for Wind Waving
        const farmUniforms = {
            uTime: { value: 0 },
            uSwayIntensity: { value: 1.0 }
        };

        this.assets.farmMat.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = farmUniforms.uTime;
            shader.uniforms.uSwayIntensity = farmUniforms.uSwayIntensity;
            shader.vertexShader = `
                uniform float uTime;
                uniform float uSwayIntensity;
            ` + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                vec3 transformed = vec3(position);
                // Only wave the top of the box (the crops)
                if (position.y > 0.05) {
                    float waveX = sin(uTime * 1.5 + position.x * 2.0 + position.z * 1.0) * 0.05 * uSwayIntensity;
                    float waveZ = cos(uTime * 1.2 + position.z * 2.0 + position.x * 1.0) * 0.03 * uSwayIntensity;
                    transformed.x += waveX;
                    transformed.z += waveZ;
                }
                `
            );
        };
        (this.assets.farmMat).uniforms = farmUniforms;

        await this.terrain.checkYield();

        // --- BARRACKS (3x3) ---
        // Center of 3x3 is (x+1, z+1). 
        // Visual size ~2.5x2.5
        // Taller Walls (User Request): 0.8 -> 1.2
        const barracksWallMain = new THREE.BoxGeometry(2.4, 1.2, 2.4);
        barracksWallMain.translate(0, 0.6, 0);

        const barracksChimney = new THREE.BoxGeometry(0.4, 1.0, 0.4);
        barracksChimney.translate(0.8, 1.2, 0.8);

        // UV Adjustment for Barracks Chimney Hole
        const buvAttr = barracksChimney.getAttribute('uv');
        for (let i = 8; i <= 11; i++) {
            buvAttr.setXY(i, 0.96, 0.05); // Fixed V
        }

        this.assets.barracksGeo = BufferGeometryUtils.mergeGeometries([barracksWallMain, barracksChimney]);

        // Barracks Texture (Medieval Stone - Wider)
        const canvasM = document.createElement('canvas');
        canvasM.width = 128; canvasM.height = 64;
        const ctxM = canvasM.getContext('2d');

        const canvasME = document.createElement('canvas');
        canvasME.width = 128; canvasME.height = 64;
        const ctxME = canvasME.getContext('2d');

        // M1. Base
        ctxM.fillStyle = '#654321'; ctxM.fillRect(0, 0, 128, 64);
        ctxME.fillStyle = '#000000'; ctxME.fillRect(0, 0, 128, 64);

        // M2. Stone Bricks (Same pattern as House)
        ctxM.fillStyle = '#5A3A1A';
        for (let y = 0; y < 64; y += 16) {
            for (let x = 0; x < 128; x += 16) {
                if (((x + y) / 16) % 2 === 0) ctxM.fillRect(x + 1, y + 1, 14, 14);
            }
        }

        // M2.5 Special Shadow for Chimney Hole
        ctxM.fillStyle = '#0a0a0a';
        ctxM.fillRect(120, 56, 8, 8);

        // M3. Windows (3 Windows for wider facade)
        const drawMansionWindow = (cx, cy) => {
            ctxM.fillStyle = '#111';
            ctxM.fillRect(cx - 6, cy - 8, 12, 16);
            ctxME.fillStyle = '#FFFFEE'; // Warm light
            ctxME.fillRect(cx - 4, cy - 6, 8, 12);
        };
        drawMansionWindow(22, 32);
        drawMansionWindow(64, 32);
        drawMansionWindow(106, 32);

        // Barracks Roof (Dark Red/Brown Medieval)
        // Change Shape: 8-sided (Octagonal) to differ from House (Pyramid)
        // Fix Buried: Radius 2.0 to cover Box corners (distance ~1.7)
        this.assets.barracksRoofGeo = new THREE.ConeGeometry(2.0, 1.2, 8);
        // Raised to sit on 1.2 wall (Center at 1.2 + 0.6 = 1.8)
        this.assets.barracksRoofGeo.translate(0, 1.8, 0);
        // this.assets.barracksRoofGeo.rotateY(Math.PI / 4); // Not needed for 8-sided

        this.assets.barracksMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasM),
            emissiveMap: new THREE.CanvasTexture(canvasME),
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });
        // Match House Roof Color (0x800000) or similar
        this.assets.barracksRoofMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasR),
            color: 0xFFFFFF
        });

        // --- GOBLIN HUT ---
        this.assets.goblinHutGeo = new THREE.ConeGeometry(0.4, 0.6, 6);
        this.assets.goblinHutGeo.translate(0, 0.3, 0);

        const canvasG = document.createElement('canvas');
        canvasG.width = 64; canvasG.height = 64;
        const ctxG = canvasG.getContext('2d');
        ctxG.fillStyle = '#654321'; ctxG.fillRect(0, 0, 64, 64);
        ctxG.fillStyle = '#8B4513';
        for (let i = 0; i < 30; i++) ctxG.fillRect(Math.random() * 60, Math.random() * 60, 4, 2);

        this.assets.goblinHutMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasG),
            color: 0xAAAAAA
        });
        // --- CAVE (Goblin Lair) ---
        // Rock Mound (Hemisphere) - Radius 0.8
        // this.assets.caveGeo = new THREE.SphereGeometry(0.8, 7, 7, 0, Math.PI * 2, 0, Math.PI * 0.48);
        // this.assets.caveGeo.scale(1, 0.8, 1);
        // caveGeo: Flat circular hole
        // Reduced radius from 0.8 to 0.45 to fit within 1.0 grid tile
        this.assets.caveGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.05, 16);
        this.assets.caveGeo.translate(0, 0, 0);
        // Note: Sphere centers at 0. Since we used top hemisphere, base is at 0.

        const canvasK = document.createElement('canvas');
        canvasK.width = 64; canvasK.height = 64;
        const ctxK = canvasK.getContext('2d');

        // Draw a dark hole with a textured rim
        if (ctxK.createRadialGradient) {
            const grad = ctxK.createRadialGradient(32, 32, 5, 32, 32, 30);
            grad.addColorStop(0, '#000000'); // Center: pitch black hole
            grad.addColorStop(0.7, '#1a1a1a'); // Inner shadow
            grad.addColorStop(1, '#404040'); // Rim: rocky dark gray
            ctxK.fillStyle = grad;
        } else {
            ctxK.fillStyle = '#101010'; // Fallback
        }
        ctxK.fillRect(0, 0, 64, 64);

        // Add some noise/cracks to the rim
        ctxK.fillStyle = '#101010';
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 28 + Math.random() * 4;
            ctxK.fillRect(32 + Math.cos(angle) * dist, 32 + Math.sin(angle) * dist, 2, 2);
        }

        this.assets.caveMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasK),
            color: 0x808080
        });

        // Needed for updates
        [this.assets.houseWallMat, this.assets.barracksMat, this.assets.towerMat, this.assets.caveMat].forEach(m => {
            if (m) { m.clippingPlanes = this.clippingPlanes; m.needsUpdate = true; }
        });
    }

    initInstancedMeshes() {
        const make = (geo, mat) => {
            const m = new THREE.InstancedMesh(geo, mat, this.MAX_INSTANCES);
            m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            m.castShadow = true;
            m.receiveShadow = true;
            m.frustumCulled = false;
            m.count = 0; // FIX: Start with 0 visible instances to avoid initial merged rendering at 0,0,0
            this.scene.add(m);
            return m;
        };

        this.meshes.houseWalls = make(this.assets.houseWallGeo, this.assets.houseWallMat);
        this.meshes.houseRoofs = make(this.assets.houseRoofGeo, this.assets.houseRoofMat);
        this.meshes.farms = make(this.assets.farmGeo, this.assets.farmMat);
        this.meshes.goblinHuts = make(this.assets.goblinHutGeo, this.assets.goblinHutMat);

        // Multi-Material for Tower: [Side, Top, Bottom]
        const towerMats = [this.assets.towerMat, this.assets.towerCapMat, this.assets.towerCapMat];
        this.meshes.towers = make(this.assets.towerGeo, towerMats);
        this.meshes.towerRims = make(this.assets.towerRimGeo, towerMats);

        // New: Barracks
        this.meshes.barracksWalls = make(this.assets.barracksGeo, this.assets.barracksMat);
        this.meshes.barracksRoofs = make(this.assets.barracksRoofGeo, this.assets.barracksRoofMat);
        this.meshes.caves = make(this.assets.caveGeo, this.assets.caveMat);
    }


    update(buildings, frustum, viewCenter, time = 0, swayIntensity = 1.0) {
        if (!this.initialized) return; // Guard: Not initialized

        // Update Shader Uniforms
        if (this.assets.farmMat && this.assets.farmMat.uniforms) {
            this.assets.farmMat.uniforms.uTime.value = time;
            this.assets.farmMat.uniforms.uSwayIntensity.value = swayIntensity;
        }

        if (!buildings) return;

        if (!viewCenter) {
            // console.warn("[BuildingRenderer] Missing viewCenter, allow default 0,0,0");
            viewCenter = new THREE.Vector3(0, 0, 0);
        }

        // Debug Log (Moved to Top)
        if (!this._debugTimer) this._debugTimer = 0;
        this._debugTimer++;
        if (this._debugTimer > 120) {
            this._debugTimer = 0;
            const counts = {};
            buildings.forEach(b => {
                const t = (b.userData && b.userData.type) ? b.userData.type : 'unknown';
                counts[t] = (counts[t] || 0) + 1;
            });
            // console.log(`[BuildingRenderer] ListSize=${buildings.length}. Types:`, JSON.stringify(counts));

        }

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let baseGridX = 0;
        let baseGridZ = 0;
        if (viewCenter) {
            baseGridX = Math.round(viewCenter.x / logicalW);
            baseGridZ = Math.round(viewCenter.z / logicalD);
        }

        this.forceUpdate = false;

        let hIdx = 0, fIdx = 0, gIdx = 0, mIdx = 0, tIdx = 0, cIdx = 0;
        const dummy = this._dummy;

        const offsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        // Colors
        const colorRoof = new THREE.Color(0xFFFFFF); // White to show texture
        const colorRoofEnemy = new THREE.Color(0x5D4037); // Dark Brown (User request: Faction distinction)
        const colorBarracksRoof = new THREE.Color(0xFFFFFF);
        const colorGoblinHut = new THREE.Color(0xAAAAAA);
        const colorTowerPlayer = new THREE.Color(0xeeeeee);
        const colorTowerEnemy = new THREE.Color(0x4D342E); // Darker Brown




        const viewRadius = (GameConfig && GameConfig.render && GameConfig.render.viewRadius) ? GameConfig.render.viewRadius : 120;

        for (const b of buildings) {

            // Safety: Ensure type is valid
            if (!b.type) continue;

            const vPos = this.terrain.getVisualPosition(b.gridX, b.gridZ, true);
            const y = vPos.y || 0;
            const rotY = (b.rotationY !== undefined) ? b.rotationY : (b.rotation || 0);

            // Dynamic Wrapping Logic
            const minKx = Math.floor((viewCenter.x - viewRadius - vPos.x) / logicalW);
            const maxKx = Math.ceil((viewCenter.x + viewRadius - vPos.x) / logicalW);

            const minKz = Math.floor((viewCenter.z - viewRadius - vPos.z) / logicalD);
            const maxKz = Math.ceil((viewCenter.z + viewRadius - vPos.z) / logicalD);

            for (let kx = minKx; kx <= maxKx; kx++) {
                for (let kz = minKz; kz <= maxKz; kz++) {
                    const shiftX = kx * logicalW;
                    const shiftZ = kz * logicalD;

                    const posX = vPos.x + shiftX;
                    const posZ = vPos.z + shiftZ;

                    // Box Culling
                    const dx = Math.abs(posX - viewCenter.x);
                    const dz = Math.abs(posZ - viewCenter.z);
                    if (dx > viewRadius + 10.0 || dz > viewRadius + 10.0) continue;

                    // Center Offsets by Type
                    let finalX = posX;
                    let finalZ = posZ;

                    if (b.type === 'farm' || b.type === 'house' || b.type === 'goblin_hut') {
                        finalX += 0.5;
                        finalZ += 0.5;
                    } else if (b.type === 'barracks' || b.type === 'tower') {
                        finalX += 1.0;
                        finalZ += 1.0;
                    }

                    dummy.position.set(finalX, y, finalZ);
                    dummy.scale.set(1, 1, 1);
                    dummy.rotation.set(0, rotY, 0);
                    dummy.updateMatrix();

                    if (b.type === 'house' && hIdx < this.MAX_INSTANCES) {
                        this.meshes.houseWalls.setMatrixAt(hIdx, dummy.matrix);
                        this.meshes.houseRoofs.setMatrixAt(hIdx, dummy.matrix);

                        // Faction Color
                        if (b.userData && b.userData.faction === 'enemy') {
                            this.meshes.houseRoofs.setColorAt(hIdx, colorRoofEnemy);
                        } else {
                            this.meshes.houseRoofs.setColorAt(hIdx, colorRoof);
                        }
                        hIdx++;
                    } else if (b.type === 'farm' && fIdx < this.MAX_INSTANCES) {
                        this.meshes.farms.setMatrixAt(fIdx, dummy.matrix);

                        // Faction Color for Farms
                        if (b.userData && b.userData.faction === 'enemy') {
                            this.meshes.farms.setColorAt(fIdx, new THREE.Color(0x3E2723)); // Dark Muddy Brown
                        } else {
                            this.meshes.farms.setColorAt(fIdx, new THREE.Color(0xA8E4A0)); // Soft Green (Mixed with yellow texture = healthy field)
                        }

                        fIdx++;
                    } else if (b.type === 'barracks' && mIdx < this.MAX_INSTANCES) {
                        this.meshes.barracksWalls.setMatrixAt(mIdx, dummy.matrix);
                        this.meshes.barracksRoofs.setMatrixAt(mIdx, dummy.matrix);

                        // Faction Color
                        if (b.userData && b.userData.faction === 'enemy') {
                            this.meshes.barracksRoofs.setColorAt(mIdx, colorRoofEnemy);
                        } else {
                            this.meshes.barracksRoofs.setColorAt(mIdx, colorBarracksRoof);
                        }

                        mIdx++;
                    } else if (b.type === 'goblin_hut' && gIdx < this.MAX_INSTANCES) {
                        this.meshes.goblinHuts.setMatrixAt(gIdx, dummy.matrix);
                        this.meshes.goblinHuts.setColorAt(gIdx, colorGoblinHut);
                        gIdx++;
                    } else if (b.type === 'tower' && tIdx < this.MAX_INSTANCES) {
                        this.meshes.towers.setMatrixAt(tIdx, dummy.matrix);
                        // Faction Color (Tower Body)
                        if (b.userData && b.userData.faction === 'enemy') {
                            this.meshes.towers.setColorAt(tIdx, colorRoofEnemy); // Dark Brown
                        } else {
                            this.meshes.towers.setColorAt(tIdx, colorTowerPlayer);
                        }

                        this.meshes.towerRims.setMatrixAt(tIdx, dummy.matrix);
                        if (b.userData && b.userData.faction === 'enemy') {
                            this.meshes.towerRims.setColorAt(tIdx, colorTowerEnemy); // Darker Brown
                        } else {
                            this.meshes.towerRims.setColorAt(tIdx, colorTowerPlayer);
                        }
                        tIdx++;
                    } else if (b.type === 'cave' && cIdx < this.MAX_INSTANCES) {
                        this.meshes.caves.setMatrixAt(cIdx, dummy.matrix);
                        cIdx++;
                    }
                }
            }
        }

        if (Math.random() < 0.005) {
            // console.log(`[BuildingRenderer] Updated Buffers. House:${hIdx}, Farm:${fIdx} (BaseGrid: ${baseGridX},${baseGridZ})`);
        }

        this.meshes.houseWalls.count = hIdx;

        this.meshes.houseRoofs.count = hIdx;
        this.meshes.farms.count = fIdx;
        this.meshes.goblinHuts.count = gIdx;
        this.meshes.barracksWalls.count = mIdx;
        // this.meshes.barracksWalls.count = mIdx; // Duplicate line removed
        this.meshes.barracksRoofs.count = mIdx;
        this.meshes.towers.count = tIdx;
        this.meshes.towerRims.count = tIdx;

        this.meshes.houseWalls.instanceMatrix.needsUpdate = true;
        this.meshes.houseRoofs.instanceMatrix.needsUpdate = true;
        if (this.meshes.houseRoofs.instanceColor) this.meshes.houseRoofs.instanceColor.needsUpdate = true;

        this.meshes.farms.instanceMatrix.needsUpdate = true;
        if (this.meshes.farms.instanceColor) this.meshes.farms.instanceColor.needsUpdate = true;

        this.meshes.goblinHuts.instanceMatrix.needsUpdate = true;
        if (this.meshes.goblinHuts.instanceColor) this.meshes.goblinHuts.instanceColor.needsUpdate = true;

        this.meshes.barracksWalls.instanceMatrix.needsUpdate = true;
        this.meshes.barracksRoofs.instanceMatrix.needsUpdate = true;
        if (this.meshes.barracksRoofs.instanceColor) this.meshes.barracksRoofs.instanceColor.needsUpdate = true;

        this.meshes.towers.instanceMatrix.needsUpdate = true;
        if (this.meshes.towers.instanceColor) this.meshes.towers.instanceColor.needsUpdate = true;

        this.meshes.towerRims.instanceMatrix.needsUpdate = true;
        if (this.meshes.towerRims.instanceColor) this.meshes.towerRims.instanceColor.needsUpdate = true;

        this.meshes.caves.count = cIdx;
        this.meshes.caves.instanceMatrix.needsUpdate = true;
    }

    updateLighting(isNight) {
        if (!this.initialized) return;
        if (this._lastIsNight === isNight) return;
        this._lastIsNight = isNight;
        // console.log(`BuildingRenderer: Night Mode ${isNight ? 'ON' : 'OFF'}`);

        const intensity = isNight ? 1.0 : 0.0;
        const color = isNight ? 0xFF8C00 : 0x000000;

        if (this.assets.houseWallMat) {
            this.assets.houseWallMat.emissive.setHex(color);
            this.assets.houseWallMat.emissiveIntensity = intensity;
            this.assets.houseWallMat.needsUpdate = true;
        }
        if (this.assets.barracksMat) {
            this.assets.barracksMat.emissive.setHex(color);
            this.assets.barracksMat.emissiveIntensity = intensity;
            this.assets.barracksMat.needsUpdate = true;
        }
        if (this.assets.towerMat) {
            this.assets.towerMat.emissive.setHex(color);
            this.assets.towerMat.emissiveIntensity = intensity;
            this.assets.towerMat.needsUpdate = true;
        }
        if (this.assets.castleKeepMat) {
            this.assets.castleKeepMat.emissive.setHex(color);
            this.assets.castleKeepMat.emissiveIntensity = intensity;
            this.assets.castleKeepMat.needsUpdate = true;
        }
        if (this.assets.barracksMat) {
            this.assets.barracksMat.emissive.setHex(color);
            this.assets.barracksMat.emissiveIntensity = intensity;
            this.assets.barracksMat.needsUpdate = true;
        }
    }
    dispose() {
        console.log("[BuildingRenderer] Disposing...");
        const remove = (m) => {
            if (m) {
                this.scene.remove(m);
                if (m.geometry) m.geometry.dispose();
                if (m.material) {
                    if (Array.isArray(m.material)) m.material.forEach(mat => mat.dispose());
                    else m.material.dispose();
                }
            }
        };

        remove(this.meshes.houseWalls);
        remove(this.meshes.houseRoofs);
        remove(this.meshes.farms);
        remove(this.meshes.goblinHuts);
        remove(this.meshes.towers);
        remove(this.meshes.towerRims);
        remove(this.meshes.barracksWalls);
        remove(this.meshes.barracksRoofs);
        remove(this.meshes.caves);

        // Clear assets
        Object.values(this.assets).forEach(a => {
            if (a && a.dispose) a.dispose();
        });
        this.meshes = {};
    }
}
