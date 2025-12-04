import * as THREE from 'three';
import { Terrain } from './Terrain.js';
import { InputManager } from './InputManager.js';
import { Unit } from './Unit.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SaveManager } from './SaveManager.js';
import { CloudManager } from './CloudManager.js';

export class Game {
    constructor() {
        console.log("Game constructor called");
        this.saveManager = new SaveManager();
        window.game = this; // Expose for UI

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue

        // Camera setup for isometric view
        const aspect = window.innerWidth / window.innerHeight;
        // We want to show exactly 1 grid size (40 units).
        // d represents half-height. So height = 2d = 40 => d = 20.
        const d = 40;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);

        this.camera.position.set(20, 20, 20); // Isometric position
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.localClippingEnabled = false; // Use global clipping
        document.body.appendChild(this.renderer.domElement);

        // OrbitControls setup
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // Smooth motion
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minZoom = 0.8; // Restrict zoom out
        this.controls.maxZoom = 4.0; // Allow more zoom in
        this.controls.maxPolarAngle = Math.PI / 2; // Don't go below ground

        // Clipping Planes (Global)
        // We want a 40x40 box centered on the camera.
        // Normals pointing IN.
        this.clippingPlanes = [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),  // Left
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0), // Right
            new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),  // Top (Z+)
            new THREE.Plane(new THREE.Vector3(0, 0, -1), 0)  // Bottom (Z-)
        ];
        this.renderer.clippingPlanes = this.clippingPlanes;

        this.setupLights();

        // No Fog as requested
        // this.scene.fog = new THREE.Fog(0x87CEEB, 20, 50);

        this.setupLights();

        this.terrain = new Terrain(this.scene);
        this.inputManager = new InputManager(this.scene, this.camera, this.terrain, this.spawnUnit.bind(this));
        this.cloudManager = new CloudManager(this.scene, this.terrain.width, this.terrain.depth);

        this.units = [];
        // Spawn initial unit
        this.spawnUnit(10, 10);

        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.lastTime = performance.now();

        // Day-Night Cycle
        this.gameTime = 8; // Start at 8:00 AM
        this.timeScale = 1;

        this.animate();
    }

    saveGame(slotId) {
        const data = {
            gameTime: this.gameTime,
            terrain: this.terrain.serialize(),
            units: this.units.map(u => u.serialize())
        };
        return this.saveManager.save(slotId, data);
    }

    loadGame(slotId) {
        const data = this.saveManager.load(slotId);
        if (!data || !data.data) {
            console.error("No save data found for slot", slotId);
            return false;
        }

        const saveData = data.data;

        // Restore Game Time
        this.gameTime = saveData.gameTime;

        // Restore Terrain
        this.terrain.deserialize(saveData.terrain);

        // Restore Units
        // Clear existing
        this.units.forEach(u => {
            this.scene.remove(u.mesh);
            if (u.clones) u.clones.forEach(c => this.scene.remove(c.mesh));
            if (u.crossMesh) this.scene.remove(u.crossMesh);
        });
        this.units = [];

        // Recreate units
        saveData.units.forEach(unitData => {
            const unit = Unit.deserialize(unitData, this.scene, this.terrain);
            this.units.push(unit);
        });

        console.log("Game loaded from slot", slotId);
        return true;
    }

    spawnUnit(x, z) {
        const unit = new Unit(this.scene, this.terrain, x, z);
        this.units.push(unit);
    }

    setupLights() {
        this.ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
        this.scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(10, 20, 10);
        this.scene.add(this.directionalLight);
    }

    onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        const d = 40; // Maintain 1 grid size

        this.camera.left = -d * aspect;
        this.camera.right = d * aspect;
        this.camera.top = d;
        this.camera.bottom = -d;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = performance.now();
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;

        this.updateEnvironment(deltaTime);

        // Update Units and remove dead ones
        for (let i = this.units.length - 1; i >= 0; i--) {
            const unit = this.units[i];
            unit.update(time, deltaTime);
            if (unit.isDead && unit.isFinished) {
                this.units.splice(i, 1);
            }
        }

        this.cloudManager.update(deltaTime);

        // Update Population
        this.terrain.updatePopulation(deltaTime, (x, z) => {
            this.spawnUnit(x, z);
            console.log("New unit spawned at", x, z);
        });

        this.controls.update();

        // Infinite Scroll Logic
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const limitX = logicalW / 2;
        const limitZ = logicalD / 2;

        if (this.controls.target.x > limitX) {
            this.controls.target.x -= logicalW;
            this.camera.position.x -= logicalW;
        } else if (this.controls.target.x < -limitX) {
            this.controls.target.x += logicalW;
            this.camera.position.x += logicalW;
        }

        if (this.controls.target.z > limitZ) {
            this.controls.target.z -= logicalD;
            this.camera.position.z -= logicalD;
        } else if (this.controls.target.z < -limitZ) {
            this.controls.target.z += logicalD;
            this.camera.position.z += logicalD;
        }

        // Update Clipping Planes to follow camera
        // We want a 40x40 box centered on the camera's X/Z position
        const cx = this.camera.position.x;
        const cz = this.camera.position.z;
        const halfSize = 40; // 80 / 2

        // Planes: Left, Right, Top, Bottom
        // Normal (1,0,0) -> Constant = -minX
        // Normal (-1,0,0) -> Constant = maxX
        // Normal (0,0,1) -> Constant = -minZ
        // Normal (0,0,-1) -> Constant = maxZ

        if (this.clippingPlanes) {
            this.clippingPlanes[0].constant = -(cx - halfSize);
            this.clippingPlanes[1].constant = (cx + halfSize);
            this.clippingPlanes[2].constant = -(cz - halfSize);
            this.clippingPlanes[3].constant = (cz + halfSize);
        }

        this.renderer.render(this.scene, this.camera);
    }

    updateEnvironment(deltaTime) {
        // Update time
        // 12x Speed: 1 real day = 2 real hours
        // 1 real second = 12 game seconds
        // 12 game seconds = 12/3600 hours = 1/300 hours
        this.gameTime += (deltaTime / 75);
        if (this.gameTime >= 24) this.gameTime -= 24;

        // Update UI
        const hours = Math.floor(this.gameTime);
        const minutes = Math.floor((this.gameTime - hours) * 60);
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            timeDisplay.textContent = timeString;
        }

        // Calculate lighting based on time
        const time = this.gameTime;

        let skyColor, ambientColor, sunColor, sunIntensity;

        // Simple keyframes
        // Night: 0-5, Dawn: 5-7, Day: 7-17, Dusk: 17-19, Night: 19-24

        if (time >= 5 && time < 7) {
            // Dawn
            const t = (time - 5) / 2;
            skyColor = new THREE.Color(0x000022).lerp(new THREE.Color(0x87CEEB), t);
            ambientColor = new THREE.Color(0x111111).lerp(new THREE.Color(0x666666), t);
            sunColor = new THREE.Color(0xFF8800).lerp(new THREE.Color(0xFFFFFF), t);
            sunIntensity = 0.1 + t * 0.9;
        } else if (time >= 7 && time < 17) {
            // Day
            skyColor = new THREE.Color(0x87CEEB);
            ambientColor = new THREE.Color(0x666666);
            sunColor = new THREE.Color(0xFFFFFF);
            sunIntensity = 1.0;
        } else if (time >= 17 && time < 19) {
            // Dusk
            const t = (time - 17) / 2;
            skyColor = new THREE.Color(0x87CEEB).lerp(new THREE.Color(0x000022), t); // To Night Blue
            // Actually Dusk usually goes Orange/Red first
            const duskSky = new THREE.Color(0xFF4500);
            if (t < 0.5) {
                skyColor = new THREE.Color(0x87CEEB).lerp(duskSky, t * 2);
            } else {
                skyColor = duskSky.lerp(new THREE.Color(0x000022), (t - 0.5) * 2);
            }

            ambientColor = new THREE.Color(0x666666).lerp(new THREE.Color(0x111111), t);
            sunColor = new THREE.Color(0xFFFFFF).lerp(new THREE.Color(0xFF4500), t);
            sunIntensity = 1.0 - t * 0.9;
        } else {
            // Night
            skyColor = new THREE.Color(0x000022);
            ambientColor = new THREE.Color(0x111111);
            sunColor = new THREE.Color(0x000000);
            sunIntensity = 0.1;
        }

        this.scene.background = skyColor;
        this.ambientLight.color = ambientColor;
        this.directionalLight.color = sunColor;
        this.directionalLight.intensity = sunIntensity;

        // Rotate Sun
        // 0 = -Z (Midnight), 6 = +X (Rise), 12 = +Z (Noon), 18 = -X (Set)
        // Simple rotation around X axis? No, usually rises East sets West.
        // Let's say X is East-West.
        // Angle from -PI to PI
        const angle = ((time - 12) / 12) * Math.PI; // Noon = 0
        // this.directionalLight.position.set(Math.sin(angle) * 20, Math.cos(angle) * 20, 10);
        // Keep it simple for isometric shadows
        // Just vary Y and X
        const sunX = Math.sin(time / 24 * Math.PI * 2) * 30;
        const sunY = Math.cos((time - 12) / 12 * Math.PI) * 30; // High at noon
        if (sunY < 0) {
            // Night sun (Moon?)
            // this.directionalLight.position.set(sunX, -sunY, 10);
        } else {
            this.directionalLight.position.set(sunX, sunY, 10);
        }
    }
}
