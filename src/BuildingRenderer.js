import * as THREE from 'three';

export class BuildingRenderer {
    constructor(scene, terrainWidth, terrainDepth, clippingPlanes) {
        this.scene = scene;
        this.terrainWidth = terrainWidth;
        this.terrainDepth = terrainDepth;
        this.clippingPlanes = clippingPlanes || [];
        this.MAX_INSTANCES = 2000;
        this.meshes = {};
        this.initAssets();
        this.initInstancedMeshes();
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

        // 2. Draw Windows (Front and Back? Box mapping wraps around)
        // Simple UV box mapping: usually faces are chunks of the texture.
        // Let's draw a window in the middle of the texture, effectively putting one on every face slightly?
        // BoxGeometry UVs map the whole texture to each face by default (usually).

        const drawWindow = (cx, cy) => {
            // Diffuse: Dark Blue/Black frame
            ctx.fillStyle = '#222';
            ctx.fillRect(cx - 10, cy - 10, 20, 20);

            // Emissive Map: WHITE mask
            // The actual color will be set by material.emissive
            ctxE.fillStyle = '#FFFFFF';
            ctxE.fillRect(cx - 8, cy - 8, 16, 16);
        };

        // Draw window in center (will appear on all 4 sides if standard UVs)
        drawWindow(32, 32);

        this.assets.houseWallMat = new THREE.MeshLambertMaterial({
            ...matOptions,
            map: new THREE.CanvasTexture(canvas),
            emissiveMap: new THREE.CanvasTexture(canvasE),
            emissive: 0xFFFFFF, // White multiplier for the map
            emissiveIntensity: 0.0 // Start off
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
        this.assets.farmGeo.translate(0, 0.2, 0);

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
        canvasC.width = 128; canvasC.height = 64; // Wider for detailed pattern
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

        // B3. Windows (Archer Slits / Grand Windows)
        const drawCastleWindow = (cx, cy) => {
            // Dark Frame
            ctxC.fillStyle = '#111';
            ctxC.fillRect(cx - 6, cy - 8, 12, 16);

            // Emissive Mask (White)
            ctxCE.fillStyle = '#FFFFFF';
            ctxCE.fillRect(cx - 4, cy - 6, 8, 12);
        };

        // Draw multiple windows on the texture strip
        // Since BoxGeometry maps the whole texture to faces, we position them nicely.
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
    }

    update(buildings) {
        if (!buildings) return;

        let hIdx = 0, fIdx = 0, cIdx = 0;
        const dummy = new THREE.Object3D();
        const logicalW = this.terrainWidth || 80;
        const logicalD = this.terrainDepth || 80;

        const offsets = [
            { x: 0, z: 0 },
            { x: 1, z: 0 }, { x: -1, z: 0 }, { x: 0, z: 1 }, { x: 0, z: -1 },
            { x: 1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: -1, z: -1 }
        ];

        for (const b of buildings) {
            const x = b.gridX;
            const z = b.gridZ;
            const y = b.y || 0;

            for (const offset of offsets) {
                const wx = (x - logicalW / 2) + 0.5 + (offset.x * logicalW);
                const wz = (z - logicalD / 2) + 0.5 + (offset.z * logicalD);

                dummy.position.set(wx, y, wz);
                dummy.rotation.set(0, 0, 0);
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
                    // Castle specific offset: +1.0 from corner
                    const wxC = (x - logicalW / 2) + 1.0 + (offset.x * logicalW);
                    const wzC = (z - logicalD / 2) + 1.0 + (offset.z * logicalD);
                    dummy.position.set(wxC, y, wzC);
                    dummy.updateMatrix();
                    this.meshes.castleKeeps.setMatrixAt(cIdx, dummy.matrix);
                    this.meshes.castleRoofs.setMatrixAt(cIdx, dummy.matrix);
                    cIdx++;
                }
            }
        }

        this.meshes.houseWalls.count = hIdx;
        this.meshes.houseRoofs.count = hIdx;
        this.meshes.farms.count = fIdx;
        this.meshes.castleKeeps.count = cIdx;
        this.meshes.castleRoofs.count = cIdx;

        this.meshes.houseWalls.instanceMatrix.needsUpdate = true;
        this.meshes.houseRoofs.instanceMatrix.needsUpdate = true;
        this.meshes.farms.instanceMatrix.needsUpdate = true;
        this.meshes.castleKeeps.instanceMatrix.needsUpdate = true;
        this.meshes.castleRoofs.instanceMatrix.needsUpdate = true;
        this.meshes.castleRoofs.instanceMatrix.needsUpdate = true;
    }

    updateLighting(isNight) {
        if (this._lastIsNight === isNight) return;
        this._lastIsNight = isNight;
        console.log(`BuildingRenderer: Night Mode ${isNight ? 'ON' : 'OFF'}`);

        // Toggle lights (Emissive glow)
        // With emissiveMap, color should be White (to show map colors) or Black (to turn off if no map? No, map defines emission)
        // Actually, just toggling intensity is enough if we have a map!

        const intensity = isNight ? 1.0 : 0.0;

        if (this.assets.houseWallMat) {
            this.assets.houseWallMat.emissive.setHex(isNight ? 0xFF8C00 : 0x000000); // Warm Orange
            this.assets.houseWallMat.emissiveIntensity = intensity;
            this.assets.houseWallMat.needsUpdate = true;
        }
        if (this.assets.castleKeepMat) {
            // Castle now uses EmissiveMap too!
            this.assets.castleKeepMat.emissive.setHex(0xFFFFFF); // White mask base
            this.assets.castleKeepMat.emissive.setHex(isNight ? 0xFF8C00 : 0x000000); // Wait, if I use White mask, I set Color here.
            // If uses Map: Emissive color multiplies with map.
            // Map is White (1,1,1) at windows. Emissive Color (Orange) * Map (White) = Orange.
            // Map is Black (0,0,0) at walls. Emissive Color (Orange) * Map (Black) = Black.
            // So: Set Emissive Color to Orange. Set Intensity to 1.0 (or 0.0).

            this.assets.castleKeepMat.emissive.setHex(isNight ? 0xFF8C00 : 0x000000); // Warm Orange
            this.assets.castleKeepMat.emissiveIntensity = intensity;
            this.assets.castleKeepMat.needsUpdate = true;
        }
    }
}
