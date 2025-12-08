import * as THREE from 'three';
import { Terrain } from './Terrain.js';
import { InputManager } from './InputManager.js';
import { Unit } from './Unit.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SaveManager } from './SaveManager.js';

import { CloudManager } from './CloudManager.js';
import { BirdManager } from './BirdManager.js';
import { SheepManager } from './SheepManager.js';

import { SoundManager } from './SoundManager.js';
import { GoblinManager } from './GoblinManager.js';
import { FishManager } from './FishManager.js';

import { Minimap } from './Minimap.js';

import { Compass } from './Compass.js';
import { UnitRenderer } from './UnitRenderer.js';
import { BuildingRenderer } from './BuildingRenderer.js';

export class Game {
    constructor() {
        console.log("Game constructor called");
        this.saveManager = new SaveManager();
        this.soundManager = new SoundManager();
        window.game = this;

        // 1. Setup Scene & Camera
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue

        const aspect = window.innerWidth / window.innerHeight;
        // User requested zoomed in view (d=20)
        const d = 20;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        this.camera.position.set(20, 20, 20); // Isometric
        this.camera.lookAt(this.scene.position);

        // 2. Setup Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.localClippingEnabled = false;
        document.body.appendChild(this.renderer.domElement);

        // 3. Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minZoom = 0.8;
        this.controls.maxZoom = 4.0;
        this.controls.maxPolarAngle = Math.PI / 2;

        // 4. Clipping Planes (Radius 30) - Initialize EARLY
        const viewRadius = 30;
        this.clippingPlanes = [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
            new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)
        ];
        this.renderer.clippingPlanes = [];
        this.renderer.localClippingEnabled = true; // Enable per-object clipping logic

        this.setupLights();

        // 5. Terrain
        this.terrain = new Terrain(this.scene, this.clippingPlanes);
        this.units = [];
        this.resources = {
            wood: 0,
            fish: 0,
            meat: 0
        };

        // 6. Managers
        this.inputManager = new InputManager(this.scene, this.camera, this.terrain, this.spawnUnit.bind(this), this.units);
        this.cloudManager = new CloudManager(this.scene, this.terrain.width, this.terrain.depth); // Clouds NOT clipped
        this.birdManager = new BirdManager(this.scene, this.terrain.width, this.terrain.depth, this.clippingPlanes);
        this.sheepManager = new SheepManager(this.scene, this.terrain, this.clippingPlanes);
        this.goblinManager = new GoblinManager(this.scene, this.terrain, this, this.clippingPlanes);
        this.fishManager = new FishManager(this.scene, this.terrain, this.clippingPlanes);
        this.minimap = new Minimap(this);
        this.compass = new Compass(this);
        this.unitRenderer = new UnitRenderer(this.scene, this.terrain, this.clippingPlanes);
        this.buildingRenderer = new BuildingRenderer(this.scene, this.terrain.logicalWidth, this.terrain.logicalDepth, this.clippingPlanes);

        // Spawn initial unit on Land
        let sx = 10, sz = 10;
        let foundSpot = false;
        let attempts = 0;
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        while (!foundSpot && attempts < 1000) {
            const rx = Math.floor(Math.random() * logicalW);
            const rz = Math.floor(Math.random() * logicalD);
            const h = this.terrain.getTileHeight(rx, rz);
            if (h > 1.0) {
                sx = rx;
                sz = rz;
                foundSpot = true;
            }
            attempts++;
        }

        this.spawnUnit(sx, sz, true);

        // Move camera to spawn
        if (foundSpot) {
            const wx = sx - (logicalW / 2);
            const wz = sz - (logicalD / 2);
            if (this.controls) {
                this.controls.target.set(wx, 0, wz);
                this.camera.position.set(wx + 20, 20, wz + 20);
                this.controls.update();
            }
        }

        this.statsDisplay = document.getElementById('stats-container');
        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.lastTime = performance.now();
        this.gameTime = 8;
        this.gameTime = 8;
        this.timeScale = 0.0166; // 1 real second = 1 game minute (approx)

        // Initial Resources - Give some to start with so stats show up
        this.resources = {
            grain: 10,
            fish: 10,
            meat: 10
        };

        // Init Audio Listeners
        const initAudio = () => {
            if (this.soundManager.initialized) return;
            this.soundManager.init(this.camera);
            window.removeEventListener('click', initAudio);
            window.removeEventListener('touchstart', initAudio);
            window.removeEventListener('touchend', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
        window.addEventListener('click', initAudio);
        window.addEventListener('touchstart', initAudio);
        window.addEventListener('touchend', initAudio);
        window.addEventListener('keydown', initAudio);

        window.addEventListener('keydown', initAudio);

        // Spawn initial units
        // First unit is special (Leader)
        this.spawnUnit(undefined, undefined, true);

        this.animate();
    }

    setupLights() {
        this.ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(this.ambientLight);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(10, 20, 10);
        this.scene.add(this.directionalLight);
    }

    spawnUnit(x, z, isSpecial = false) {
        const unit = new Unit(this.scene, this.terrain, x, z, isSpecial);
        this.units.push(unit);
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const d = 20;
        this.camera.left = -d * aspect;
        this.camera.right = d * aspect;
        this.camera.top = d;
        this.camera.bottom = -d;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateEnvironment(deltaTime) {
        this.gameTime += deltaTime * this.timeScale;
        if (this.gameTime >= 24) this.gameTime = 0;

        const hours = Math.floor(this.gameTime);
        const minutes = Math.floor((this.gameTime % 1) * 60);
        const timeString = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
        const timeDisplay = document.getElementById('time-val');
        if (timeDisplay) timeDisplay.innerText = timeString;

        // Simple Day/Night
        let isNight = false;
        if (this.gameTime >= 18 || this.gameTime < 6) {
            isNight = true;
            this.scene.background.setHex(0x000033);
            this.directionalLight.intensity = 0.2;
        } else {
            this.scene.background.setHex(0x87CEEB);
            this.directionalLight.intensity = 1.0;
        }
        return isNight;
    }

    updateCameraControls() {
        if (this.controls) this.controls.update();

        // Update clipping planes
        const cx = this.camera.position.x;
        const cz = this.camera.position.z;
        const viewRadius = 30;

        if (this.clippingPlanes) {
            this.clippingPlanes[0].constant = -(cx - viewRadius);
            this.clippingPlanes[1].constant = (cx + viewRadius);
            this.clippingPlanes[2].constant = -(cz - viewRadius);
            this.clippingPlanes[3].constant = (cz + viewRadius);
        }
    }

    updateStats() {
        if (!this.statsDisplay) return;

        // Calculate Population
        // Calculate Population
        // Total Population = Units (Walkers) + Housing Population (Mana/Potential)
        const housingPop = this.terrain.totalHousingPop || 0;
        this.totalPopulation = Math.floor(housingPop) + this.units.length;

        document.getElementById('pop-val').innerText = Math.floor(this.totalPopulation || 0);
        document.getElementById('house-val').innerText = this.terrain.buildings.filter(b => b.userData.type === 'house').length;
        document.getElementById('grain-val').innerText = this.resources.grain;
        document.getElementById('fish-val').innerText = this.resources.fish;
        document.getElementById('meat-val').innerText = this.resources.meat;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = performance.now();
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;

        // Heartbeat
        if (!this.lastHeartbeat || time - this.lastHeartbeat > 5000) {
            // console.log("Game Loop OK. FPS:", Math.round(1 / deltaTime), "Units:", this.units.length);
            this.lastHeartbeat = time;
        }

        let isNight = false;
        try {
            isNight = this.updateEnvironment(deltaTime);
        } catch (e) { console.error("Env Error:", e); }

        try {
            this.updateCameraControls();
        } catch (e) { console.error("Cam Error:", e); }

        try {
            this.updateStats();
        } catch (e) { console.error("Stats Error:", e); }

        try {
            this.inputManager.update(deltaTime);
        } catch (e) { console.error("Input Error:", e); }

        try {
            this.cloudManager.update(deltaTime, this.camera);
        } catch (e) { console.error("Cloud Error:", e); }

        // Calculate Frustum for Culling
        this.camera.updateMatrixWorld();
        this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();

        const frustum = new THREE.Frustum();
        const projScreenMatrix = new THREE.Matrix4();
        projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(projScreenMatrix);

        try {
            this.birdManager.update(deltaTime, time / 1000, frustum);
        } catch (e) { console.error("Bird Error:", e); }

        try {
            this.sheepManager.update(time / 1000, deltaTime);
        } catch (e) { console.error("Sheep Error:", e); }

        try {
            this.goblinManager.update(deltaTime, isNight, this.units);
        } catch (e) { console.error("Goblin Manager Error:", e); }

        try {
            this.fishManager.update(time, deltaTime, frustum);
        } catch (e) { console.error("Fish Error:", e); }

        if (this.minimap) {
            try {
                this.minimap.update();
            } catch (e) { console.error("Minimap Error:", e); }
        }

        if (this.compass) {
            try {
                this.compass.update();
            } catch (e) { console.error("Compass Error:", e); }
        }

        for (let i = this.units.length - 1; i >= 0; i--) {
            const unit = this.units[i];
            // Simplify: No longer pass goblins/fish/sheep for target seeking (except Goblins maybe for combat?)
            // We keep Goblins, but remove Fishes/Sheeps.
            unit.update(time, deltaTime, isNight, this.goblinManager.goblins);

            if (unit.isDead && unit.isFinished) {
                this.units.splice(i, 1);
            }
        }

        this.terrain.update(deltaTime, this.spawnUnit.bind(this));

        // Update House Lights (Via BuildingRenderer)
        // Update House Lights (Via BuildingRenderer)
        this.terrain.updateLights(this.gameTime); // Restored for Terrain Glow
        if (this.buildingRenderer) {
            this.buildingRenderer.updateLighting(isNight);
        }

        // Update Unit Renderer
        if (this.unitRenderer) {
            this.unitRenderer.update(this.units, frustum);
        }

        // Update Building Renderer
        if (this.buildingRenderer) {
            this.buildingRenderer.update(this.terrain.buildings);
        }

        this.renderer.render(this.scene, this.camera);
    }

    saveGame(slotId) {
        if (!this.saveManager) return false;
        const saveData = {
            slotId: slotId,
            timestamp: Date.now(),
            resources: this.resources,
            gameTime: this.gameTime,
            terrain: this.terrain.serialize(),
            units: this.units.map(u => u.serialize()),
        };
        console.log("Saving Game Data:", saveData);
        if (!saveData.terrain) console.error("Save Error: Terrain data is missing!");
        return this.saveManager.save(slotId, saveData);
    }

    loadGame(slotId) {
        if (!this.saveManager) return false;
        const saveData = this.saveManager.load(slotId);
        if (!saveData) {
            console.error("Load Game Failed: No data for slot", slotId);
            return false;
        }
        console.log("Load Game: Data found", saveData);

        this.resources = saveData.resources || { grain: 0, fish: 0, meat: 0 };
        this.gameTime = saveData.gameTime || 8;

        try {
            console.log("Deserializing Terrain with:", saveData.terrain);
            this.terrain.deserialize(saveData.terrain);
        } catch (e) {
            console.error("Terrain deserialize failed:", e);
            return false;
        }

        // Recreate units
        try {
            this.units.forEach(u => {
                if (u.mesh) {
                    this.scene.remove(u.mesh);
                    if (u.mesh.geometry) u.mesh.geometry.dispose();
                }
            });
            this.units = [];
        } catch (e) {
            console.error("Unit cleanup failed:", e);
        }

        try {
            const unitsData = saveData.units || [];
            unitsData.forEach(unitData => {
                try {
                    const unit = Unit.deserialize(unitData, this.scene, this.terrain);
                    this.units.push(unit);
                } catch (err) {
                    console.error("Failed to deserialize unit:", err, unitData);
                }
            });
        } catch (e) {
            console.error("Unit restoration loop failed:", e);
        }

        this.inputManager.units = this.units;

        console.log("Game loaded from slot", slotId);
        return true;
    }
}
