import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export class BuildingRenderer {
    constructor(scene, terrain, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain; // Store reference to Terrain
        this.terrainWidth = terrain.logicalWidth;
        this.terrainDepth = terrain.logicalDepth;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = 10000;
        this.meshes = {};
        this.initAssets();
        this.initInstancedMeshes();

        // Frustum Culling Helpers
        this._scratchVector = new THREE.Vector3();
        this._scratchSphere = new THREE.Sphere(new THREE.Vector3(), 2.0);
        this._dummy = new THREE.Object3D();
    }

    initAssets() {
        this.assets = {};

        const matOptions = {
            clippingPlanes: this.clippingPlanes,
            clipShadows: true
        };

        // --- HOUSE (New: Mini Castle Style 2x2) ---
        // Fits in 2x2. Size approx 1.8
        this.assets.houseWallGeo = new THREE.BoxGeometry(1.6, 0.8, 1.6);
        this.assets.houseWallGeo.translate(0, 0.4, 0);

        // Stone Texture (Reuse Castle Logic)
        const canvasC = document.createElement('canvas');
        canvasC.width = 128; canvasC.height = 64;
        const ctxC = canvasC.getContext('2d');

        const canvasCE = document.createElement('canvas');
        canvasCE.width = 128; canvasCE.height = 64;
        const ctxCE = canvasCE.getContext('2d');

        // B1. Base Stone Gray/Brown
        ctxC.fillStyle = '#654321'; ctxC.fillRect(0, 0, 128, 64);
        ctxCE.fillStyle = '#000000'; ctxCE.fillRect(0, 0, 128, 64);

        // B2. Stone Bricks Pattern
        ctxC.fillStyle = '#5A3A1A';
        for (let y = 0; y < 64; y += 16) {
            for (let x = 0; x < 128; x += 16) {
                if (((x + y) / 16) % 2 === 0) ctxC.fillRect(x + 1, y + 1, 14, 14);
            }
        }

        // B3. Windows 
        const drawCastleWindow = (cx, cy) => {
            ctxC.fillStyle = '#111';
            ctxC.fillRect(cx - 6, cy - 8, 12, 16);
            ctxCE.fillStyle = '#FFFFFF';
            ctxCE.fillRect(cx - 4, cy - 6, 8, 12);
        };
        drawCastleWindow(32, 32);
        drawCastleWindow(96, 32);

        this.assets.houseWallMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasC),
            emissiveMap: new THREE.CanvasTexture(canvasCE),
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });

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

        // T1. Base Stone (Darker Gray)
        ctxT.fillStyle = '#505050'; ctxT.fillRect(0, 0, 128, 256);

        // T2. Bricks (Smaller/Denser)
        ctxT.fillStyle = '#404040';
        for (let y = 0; y < 256; y += 16) {
            const rowOffset = (y / 16) % 2 === 0 ? 0 : 8;
            for (let x = 0; x < 128; x += 16) {
                ctxT.fillRect((x + rowOffset) % 128 + 1, y + 1, 14, 14);
            }
        }

        // T3. Windows (Arrow Slits) - Vertical and Narrow
        // Place them at specific heights (e.g., 30%, 60%)
        // Avoid top 10% (Rim)
        ctxT.fillStyle = '#101010'; // Black hole
        // Lower Tier
        ctxT.fillRect(20, 80, 8, 24);
        ctxT.fillRect(80, 80, 8, 24);
        // Upper Tier
        ctxT.fillRect(50, 180, 8, 24);
        ctxT.fillRect(110, 180, 8, 24);

        // Tower Material (New)
        this.assets.towerMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasT),
            color: 0xeeeeee,
            emissive: 0x000000
        });

        // Cap Material (Top/Bottom) - Plain Dark Stone
        this.assets.towerCapMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            color: 0x505050, // Match base canvas color
            map: null,
            emissive: 0x000000
        });

        console.log("Tower Debug: Generated High-Res Tower Texture + Cap Material");

        // Emissive Window for Tower (always glowing slightly?) or night logic?
        // Let's rely on standard emissive toggle in updateLighting.color: 0x800000 });

        // --- FARM (2x2) ---
        // Size 2x2 tiles. Visual size ~1.8
        this.assets.farmGeo = new THREE.PlaneGeometry(1.8, 1.8);
        this.assets.farmGeo.rotateX(-Math.PI / 2);
        this.assets.farmGeo.translate(0, 0.05, 0);

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

        // --- BARRACKS (3x3) ---
        // Center of 3x3 is (x+1, z+1). 
        // Visual size ~2.5x2.5
        // Taller Walls (User Request): 0.8 -> 1.2
        this.assets.barracksGeo = new THREE.BoxGeometry(2.4, 1.2, 2.4);
        this.assets.barracksGeo.translate(0, 0.6, 0);

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

        // Needed for updates
        [this.assets.houseWallMat, this.assets.barracksMat].forEach(m => {
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
    }


    update(buildings, frustum, camera) {
        if (!buildings) return;

        const logicalW = this.terrainWidth || 80;
        const logicalD = this.terrainDepth || 80;

        let baseGridX = 0;
        let baseGridZ = 0;
        if (camera) {
            baseGridX = Math.round(camera.position.x / logicalW);
            baseGridZ = Math.round(camera.position.z / logicalD);
        }

        // Optimization: Only update if Camera Chunk changed OR Building Count changed OR Force Update
        if (this._lastBaseGridX === baseGridX &&
            this._lastBaseGridZ === baseGridZ &&
            this._lastBuildingCount === buildings.length &&
            !this.forceUpdate) {
            return;
        }

        this._lastBaseGridX = baseGridX;
        this._lastBaseGridZ = baseGridZ;
        this._lastBuildingCount = buildings.length;
        this.forceUpdate = false;

        let hIdx = 0, fIdx = 0, gIdx = 0, mIdx = 0, tIdx = 0;
        const dummy = this._dummy;

        const offsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        // Colors
        const colorRoof = new THREE.Color(0xFFFFFF); // White to show texture
        const colorBarracksRoof = new THREE.Color(0xFFFFFF);
        const colorGoblinHut = new THREE.Color(0xAAAAAA);


        for (const b of buildings) {
            const x = b.gridX;
            const z = b.gridZ;
            const vPos = this.terrain.getVisualPosition(x, z, true);
            const y = vPos.y || 0; // Use terrain visual height!

            for (const offset of offsets) {
                // Apply Base Shift
                const shiftX = (offset.x + baseGridX) * logicalW;
                const shiftZ = (offset.z + baseGridZ) * logicalD;

                const posX = vPos.x + shiftX;
                const posZ = vPos.z + shiftZ;

                // Center Offsets by Type
                let finalX = posX;
                let finalZ = posZ;

                // House 2x2 offset: +0.5
                // Farm 2x2 offset: +0.5 (Midpoint of 0 and 1)
                // Mansion 3x3 offset: +1.0 (Midpoint of 0,1,2 = 1)
                if (b.type === 'farm' || b.type === 'house') {
                    finalX += 0.5;
                    finalZ += 0.5;
                } else if (b.type === 'barracks' || b.type === 'tower') {
                    finalX += 1.0;
                    finalZ += 1.0;
                }

                if (b.type === 'tower') {
                    // Force Visible logic covered by radius below
                }

                // Frustum Culling
                // Note: If we optimize updates, we LOSE dynamic frustum culling per frame.
                // The GPU will draw everything we put in the buffer.
                // However, since we re-update on camera chunk change, we cull large swaths.
                // To keep high perf, we might want to skip detailed frustum culling here if we are not updating every frame.
                // Actually, if we don't update every frame, we act as "Static Draw".
                // InstancedMesh supports Frustum Culling natively if we set valid boundingSphere.
                // But we set frustumCulled = false because we wrap.
                // Conclusion: By caching the buffer, we are drawing ALL instances (9x copies).
                // Is this faster than CPU culling 9x every frame?
                // Yes, GPU culling is fast. CPU Loop overhead was the bottleneck.

                // if (frustum) { ... } // Removed Frustum check for Static Batching

                dummy.position.set(finalX, y, finalZ);
                // Safety: Ensure scale is 1
                dummy.scale.set(1, 1, 1);
                dummy.rotation.set(0, b.rotation || 0, 0);
                dummy.updateMatrix();

                if (b.type === 'house' && hIdx < this.MAX_INSTANCES) {
                    this.meshes.houseWalls.setMatrixAt(hIdx, dummy.matrix);
                    this.meshes.houseRoofs.setMatrixAt(hIdx, dummy.matrix);
                    this.meshes.houseRoofs.setColorAt(hIdx, colorRoof);
                    hIdx++;
                } else if (b.type === 'farm' && fIdx < this.MAX_INSTANCES) {
                    this.meshes.farms.setMatrixAt(fIdx, dummy.matrix);
                    fIdx++;
                } else if (b.type === 'barracks' && mIdx < this.MAX_INSTANCES) {
                    this.meshes.barracksWalls.setMatrixAt(mIdx, dummy.matrix);
                    this.meshes.barracksRoofs.setMatrixAt(mIdx, dummy.matrix);
                    this.meshes.barracksRoofs.setColorAt(mIdx, colorBarracksRoof);
                    mIdx++;
                } else if (b.type === 'goblin_hut' && gIdx < this.MAX_INSTANCES) {
                    this.meshes.goblinHuts.setMatrixAt(gIdx, dummy.matrix);
                    this.meshes.goblinHuts.setColorAt(gIdx, colorGoblinHut);
                    this.meshes.goblinHuts.setColorAt(gIdx, colorGoblinHut);
                    gIdx++;
                } else if (b.type === 'tower' && tIdx < this.MAX_INSTANCES) {
                    this.meshes.towers.setMatrixAt(tIdx, dummy.matrix);
                    this.meshes.towerRims.setMatrixAt(tIdx, dummy.matrix);
                    tIdx++;
                }
            }
        }

        if (Math.random() < 0.005) {
            console.log(`[BuildingRenderer] Updated Buffers. House:${hIdx}, Farm:${fIdx} (BaseGrid: ${baseGridX},${baseGridZ})`);
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
        this.meshes.goblinHuts.instanceMatrix.needsUpdate = true;
        if (this.meshes.goblinHuts.instanceColor) this.meshes.goblinHuts.instanceColor.needsUpdate = true;
        this.meshes.barracksWalls.instanceMatrix.needsUpdate = true;
        this.meshes.barracksRoofs.instanceMatrix.needsUpdate = true;
        if (this.meshes.barracksRoofs.instanceColor) this.meshes.barracksRoofs.instanceColor.needsUpdate = true;
        this.meshes.towers.instanceMatrix.needsUpdate = true;
        this.meshes.towerRims.instanceMatrix.needsUpdate = true;
    }

    updateLighting(isNight) {
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
}
