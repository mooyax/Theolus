import * as THREE from 'three';

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

        // --- HOUSE ---
        // Wall Geometry
        this.assets.houseWallGeo = new THREE.BoxGeometry(0.6, 0.4, 0.6);
        this.assets.houseWallGeo.translate(0, 0.2, 0);

        // Diffuse Texture (Logs + Windows)
        // Emissive Texture (Black + Glowing Windows)
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');

        const canvasE = document.createElement('canvas');
        canvasE.width = 64; canvasE.height = 64;
        const ctxE = canvasE.getContext('2d');

        // 1. Base Logs
        ctx.fillStyle = '#8B4513'; ctx.fillRect(0, 0, 64, 64);
        ctxE.fillStyle = '#000000'; ctxE.fillRect(0, 0, 64, 64); // Dark by default

        ctx.strokeStyle = '#5D2906'; ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath(); ctx.moveTo(0, i * 8); ctx.lineTo(64, i * 8); ctx.stroke();
        }

        // 2. Draw Windows
        const drawWindow = (cx, cy) => {
            // Diffuse: Dark Blue/Black frame
            ctx.fillStyle = '#222';
            ctx.fillRect(cx - 10, cy - 10, 20, 20);

            // Emissive Map: WHITE mask
            ctxE.fillStyle = '#FFFFFF';
            ctxE.fillRect(cx - 8, cy - 8, 16, 16);
        };

        drawWindow(32, 32);

        this.assets.houseWallMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvas),
            emissiveMap: new THREE.CanvasTexture(canvasE),
            emissive: 0xFFFFFF,
            emissiveIntensity: 0.0
        });

        // House Roof
        this.assets.houseRoofGeo = new THREE.ConeGeometry(0.5, 0.4, 4);
        this.assets.houseRoofGeo.translate(0, 0.6, 0);
        this.assets.houseRoofGeo.rotateY(Math.PI / 4);

        const canvas2 = document.createElement('canvas');
        canvas2.width = 64; canvas2.height = 64;
        const ctx2 = canvas2.getContext('2d');
        ctx2.fillStyle = '#A52A2A'; ctx2.fillRect(0, 0, 64, 64);
        ctx2.fillStyle = '#800000';
        for (let y = 0; y < 64; y += 8) for (let x = 0; x < 64; x += 8) if ((x + y) % 16 === 0) ctx2.fillRect(x, y, 7, 7);
        this.assets.houseRoofMat = new THREE.MeshLambertMaterial({ ...matOptions, map: new THREE.CanvasTexture(canvas2) });

        // --- FARM ---
        this.assets.farmGeo = new THREE.PlaneGeometry(0.8, 0.8);
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

        // --- CASTLE ---
        this.assets.castleKeepGeo = new THREE.BoxGeometry(1.6, 1.0, 1.6);
        this.assets.castleKeepGeo.translate(0, 0.5, 0);

        // Castle Texture Generation
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
            // Dark Frame
            ctxC.fillStyle = '#111';
            ctxC.fillRect(cx - 6, cy - 8, 12, 16);

            // Emissive Mask (White)
            ctxCE.fillStyle = '#FFFFFF';
            ctxCE.fillRect(cx - 4, cy - 6, 8, 12);
        };

        drawCastleWindow(32, 32);
        drawCastleWindow(96, 32);

        this.assets.castleKeepMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasC),
            emissiveMap: new THREE.CanvasTexture(canvasCE),
            emissive: 0x000000,
            emissiveIntensity: 0.0
        });

        this.assets.castleRoofGeo = new THREE.CylinderGeometry(0.5, 1.1, 0.6, 4);
        this.assets.castleRoofGeo.translate(0, 1.3, 0);
        this.assets.castleRoofGeo.rotateY(Math.PI / 4);
        this.assets.castleRoofMat = new THREE.MeshLambertMaterial({ ...matOptions, color: 0x800000 });

        // --- GOBLIN HUT ---
        this.assets.goblinHutGeo = new THREE.ConeGeometry(0.4, 0.6, 6); // Simple cone hut
        this.assets.goblinHutGeo.translate(0, 0.3, 0); // Base at 0

        // Straw-like material
        const canvasG = document.createElement('canvas');
        canvasG.width = 64; canvasG.height = 64;
        const ctxG = canvasG.getContext('2d');
        ctxG.fillStyle = '#654321'; ctxG.fillRect(0, 0, 64, 64);
        ctxG.fillStyle = '#8B4513';
        // Straw pattern
        for (let i = 0; i < 30; i++) {
            ctxG.fillRect(Math.random() * 60, Math.random() * 60, 4, 2);
        }
        this.assets.goblinHutMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvasG),
            color: 0xAAAAAA // Tint
        });

        // Explicitly assign clippingPlanes to ensure reference is kept
        const allMats = [
            this.assets.houseWallMat,
            this.assets.houseRoofMat,
            this.assets.farmMat,
            this.assets.castleKeepMat,
            this.assets.castleKeepMat,
            this.assets.castleRoofMat,
            this.assets.goblinHutMat
        ];
        allMats.forEach(mat => {
            if (mat) {
                mat.clippingPlanes = this.clippingPlanes;
                mat.needsUpdate = true;
            }
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
        this.meshes.castleKeeps = make(this.assets.castleKeepGeo, this.assets.castleKeepMat);
        this.meshes.castleRoofs = make(this.assets.castleRoofGeo, this.assets.castleRoofMat);
        this.meshes.goblinHuts = make(this.assets.goblinHutGeo, this.assets.goblinHutMat);
    }


    update(buildings, frustum, camera) {
        if (!buildings) return;

        let hIdx = 0, fIdx = 0, cIdx = 0, gIdx = 0;
        const dummy = this._dummy;
        const logicalW = this.terrainWidth || 80;
        const logicalD = this.terrainDepth || 80;

        let baseGridX = 0;
        let baseGridZ = 0;
        if (camera) {
            baseGridX = Math.round(camera.position.x / logicalW);
            baseGridZ = Math.round(camera.position.z / logicalD);
        }

        const offsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        for (const b of buildings) {
            const x = b.gridX;
            const z = b.gridZ;
            const y = b.y || 0;

            const vPos = this.terrain.getVisualPosition(x, z, true);

            for (const offset of offsets) {
                // Apply Base Shift
                const shiftX = (offset.x + baseGridX) * logicalW;
                const shiftZ = (offset.z + baseGridZ) * logicalD;

                const posX = vPos.x + shiftX;
                const posZ = vPos.z + shiftZ;

                // Frustum Culling
                if (frustum) {
                    this._scratchVector.set(posX, y + 0.5, posZ);
                    this._scratchSphere.center.copy(this._scratchVector);

                    if (!frustum.intersectsSphere(this._scratchSphere)) {
                        continue; // Skip invisible
                    }
                }

                dummy.position.set(posX, y, posZ);
                dummy.rotation.set(0, b.rotation || 0, 0);
                dummy.scale.set(1, 1, 1);
                dummy.updateMatrix();

                if (b.type === 'house' && hIdx < this.MAX_INSTANCES) {
                    this.meshes.houseWalls.setMatrixAt(hIdx, dummy.matrix);
                    this.meshes.houseRoofs.setMatrixAt(hIdx, dummy.matrix);
                    hIdx++;
                } else if (b.type === 'farm' && fIdx < this.MAX_INSTANCES) {
                    this.meshes.farms.setMatrixAt(fIdx, dummy.matrix);
                    fIdx++;
                } else if (b.type === 'castle' && cIdx < this.MAX_INSTANCES) {
                    const wxC = posX; // Use calculated pos (includes offset)
                    const wzC = posZ;
                    // Note: Original code had +1.0 offset for castle?
                    // Previous: (x - logicalW/2) + 1.0 + (offset.x * logicalW)
                    // vPos.x is (x - logicalW/2).
                    // So we needed +1.0.
                    // Castle is 2x2. Centered at +0.5, +0.5?
                    // Let's preserve the +1.0 offset relative to base.

                    dummy.position.set(wxC + 1.0, y, wzC + 1.0);
                    dummy.updateMatrix();
                    this.meshes.castleKeeps.setMatrixAt(cIdx, dummy.matrix);
                    this.meshes.castleRoofs.setMatrixAt(cIdx, dummy.matrix);
                    cIdx++;
                } else if (b.type === 'goblin_hut' && gIdx < this.MAX_INSTANCES) {
                    this.meshes.goblinHuts.setMatrixAt(gIdx, dummy.matrix);
                    gIdx++;
                }
            }
        }

        this.meshes.houseWalls.count = hIdx;
        this.meshes.houseRoofs.count = hIdx;
        this.meshes.farms.count = fIdx;
        this.meshes.castleKeeps.count = cIdx;
        this.meshes.castleRoofs.count = cIdx;
        this.meshes.goblinHuts.count = gIdx;

        this.meshes.houseWalls.instanceMatrix.needsUpdate = true;
        this.meshes.houseRoofs.instanceMatrix.needsUpdate = true;
        this.meshes.farms.instanceMatrix.needsUpdate = true;
        this.meshes.castleKeeps.instanceMatrix.needsUpdate = true;
        this.meshes.castleRoofs.instanceMatrix.needsUpdate = true;
        this.meshes.goblinHuts.instanceMatrix.needsUpdate = true;
        this.meshes.castleRoofs.instanceMatrix.needsUpdate = true;
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
    }
}
