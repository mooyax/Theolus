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
        this.mana = 100; // Initial Mana

        // Battle Memory System (Global)
        this.battleMemory = {
            raids: [], // {x, z, time, threat}
            victories: [], // {x, z, time} 
            reportRaid: (x, z) => {
                this.battleMemory.raids.push({ x, z, time: this.gameTotalTime, threat: 10 });
                // Clean old
                if (this.battleMemory.raids.length > 20) this.battleMemory.raids.shift();
            },
            reportVictory: (x, z) => {
                this.battleMemory.victories.push({ x, z, time: this.gameTotalTime });
                // Remove nearby raids
                this.battleMemory.raids = this.battleMemory.raids.filter(r => {
                    const dx = r.x - x;
                    const dz = r.z - z;
                    return (dx * dx + dz * dz) > 100; // Keep if far away
                });
            },
            getPriorities: () => {
                // Return recent raids
                // Filter out very old raids (> 300 seconds)
                const now = this.gameTotalTime;
                return this.battleMemory.raids.filter(r => (now - r.time) < 300000);
            }
        };

        window.game = this;

        // 1. Setup Scene & Camera
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue

        const aspect = window.innerWidth / window.innerHeight;
        // User requested zoomed in view (d=20) -> Expanded to d=50 to prevent clipping
        const d = 50;
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
            grain: 0,
            fish: 0,
            meat: 0
        };

        // 6. Managers
        // Managers Order is important for dependencies
        this.cloudManager = new CloudManager(this.scene, this.terrain.width, this.terrain.depth);
        this.birdManager = new BirdManager(this.scene, this.terrain.width, this.terrain.depth, this.clippingPlanes);
        this.sheepManager = new SheepManager(this.scene, this.terrain, this.clippingPlanes);
        this.goblinManager = new GoblinManager(this.scene, this.terrain, this, this.clippingPlanes);
        this.fishManager = new FishManager(this.scene, this.terrain, this.clippingPlanes);
        this.minimap = new Minimap(this);
        this.compass = new Compass(this);

        this.unitRenderer = new UnitRenderer(this.scene, this.terrain, this.clippingPlanes);
        this.buildingRenderer = new BuildingRenderer(this.scene, this.terrain, this.clippingPlanes);

        // InputManager needs access to UnitRenderer for raycasting (tooltips)
        // Pass 'this' (Game instance) for Mana control
        this.inputManager = new InputManager(this.scene, this.camera, this.terrain, this.spawnUnit.bind(this), this.units, this.unitRenderer, this);

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
        this.gameTotalTime = 0; // Initialize explicitly to 0
        this.raidPoints = []; // Raid Memory
        this.timeScale = 1.0; // Default speed 1.0

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

        // Debug Speed Toggle
        window.toggleDebugSpeed = () => {
            const btn = document.getElementById('debug-speed-btn');
            if (this.timeScale === 1.0) {
                this.timeScale = 10.0;
                console.log("Debug Speed: 10x");
                if (btn) btn.classList.add('active');
            } else {
                this.timeScale = 1.0;
                console.log("Debug Speed: 1x");
                if (btn) btn.classList.remove('active');
            }
        };

        // Debug Season Toggle (P Key)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'p' || e.key === 'P') {
                const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
                this.currentSeasonIndex = ((this.currentSeasonIndex || 0) + 1) % 4;
                const newSeason = SEASONS[this.currentSeasonIndex];
                console.log(`[DEBUG] Force Cycle Season: ${newSeason}`);

                this.season = newSeason;
                this.daysPassed = (this.daysPassed || 0) + 1; // Increment day to prevent immediate overwrite?
                if (this.terrain) this.terrain.setSeason(newSeason);

                // Update UI if exists
                const seasonVal = document.getElementById('season-val');
                if (seasonVal) seasonVal.textContent = newSeason;
            }
        });

        this.timeScale = 1.0; // Default

        this.animate();
    }

    setupLights() {
        this.ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(this.ambientLight);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(10, 20, 10);
        this.scene.add(this.directionalLight);
    }

    spawnUnit(x, z, roleOrSpecial = false) {
        let role = 'worker';
        let isSpecial = false;

        // Check if argument is Role (String) or Special (Boolean)
        if (typeof roleOrSpecial === 'string') {
            role = roleOrSpecial;
            isSpecial = false; // Natural birth is not special
        } else if (typeof roleOrSpecial === 'boolean') {
            isSpecial = roleOrSpecial;

            // If God Spawn (Special), assign Random Role based on Pop
            const currentPop = this.totalPopulation || this.units.length || 0;
            if (currentPop >= 30) {
                const r = Math.random();
                if (r < 0.3) role = 'hunter';
                else if (r < 0.6) role = 'fisher';
            }
        }

        const unit = new Unit(this.scene, this.terrain, x, z, role, isSpecial);
        this.units.push(unit);
    }

    handleBuildingSpawn(x, z, buildingType) {
        // Callback from Terrain when a building overflows
        let role = 'worker';

        // Determine role based on building type or global needs
        if (buildingType === 'barracks') {
            role = 'knight';
        } else if (buildingType === 'tower') {
            role = 'wizard';
        } else {
            // Normal House Spawn Logic
            const totalActiveUnits = this.units.length;
            // If population is high, diversify
            if (totalActiveUnits > 20) {
                const r = Math.random();
                if (r < 0.25) role = 'hunter';
                else if (r < 0.50) role = 'fisher';
            }
        }

        // Spawn nearby
        // Terrain passes building center x,z.
        // We might want to randomize slightly?
        // Unit constructor handles snapping to grid.
        this.spawnUnit(x, z, role);
        return true;
    }

    recordRaidPoint(x, z) {
        // Add point if far enough from existing
        const exists = this.raidPoints.some(p => Math.abs(p.x - x) < 10 && Math.abs(p.z - z) < 10);
        if (!exists) {
            this.raidPoints.push({ x, z, time: this.gameTime });
            // console.log(`[Game] Raid Point Recorded at ${x},${z}`);
        }
    }

    canAction() {
        return this.mana >= 0;
    }

    consumeMana(amount) {
        this.mana -= amount;
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
        this.gameTime += deltaTime * (this.dayNightSpeed || 0.05);
        if (this.gameTime >= 24) this.gameTime = 0;

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

    updateSeasons(deltaTime) {
        // Season Config
        const SEASON_LENGTH_DAYS = 3; // 3 days per season
        const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];

        if (this.currentSeasonIndex === undefined) this.currentSeasonIndex = 0;

        // Detect Day Rollover (timeOfDay wraps 1.0 -> 0.0)
        // updateEnvironment() runs BEFORE this and updates this.gameTime.
        // gameTime 0..24 hrs.
        const currentTimeOfDay = (this.gameTime / 24.0);

        if (this.prevTimeOfDay === undefined) this.prevTimeOfDay = currentTimeOfDay;

        if (currentTimeOfDay < this.prevTimeOfDay) {
            // New Day
            this.daysPassed = (this.daysPassed || 0) + 1;
            console.log(`New Day! Day ${this.daysPassed}. Season: ${SEASONS[this.currentSeasonIndex]}`);

            if (this.daysPassed % SEASON_LENGTH_DAYS === 0) {
                this.currentSeasonIndex = (this.currentSeasonIndex + 1) % 4;
                const newSeason = SEASONS[this.currentSeasonIndex];
                console.log(`Season Changed to: ${newSeason}`);

                // Notify Terrain
                if (this.terrain) this.terrain.setSeason(newSeason);
            }
        }
        this.prevTimeOfDay = currentTimeOfDay;

        // Initial / Constant Sync
        const currentSeason = SEASONS[this.currentSeasonIndex];
        if (this.season !== currentSeason) {
            console.log(`[DEBUG] Game.updateSeasons: Syncing season mismatch. Game:${this.season} -> ${currentSeason}`);
            this.season = currentSeason;
            if (this.terrain) this.terrain.setSeason(this.season);
        }
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
        // User Request: 1 Unit = 10 Pop.
        // Total Population = (Units * 10) + Housing Population
        const housingPop = this.terrain.totalHousingPop || 0;
        this.totalPopulation = Math.floor(housingPop) + (this.units.length * 10);

        const hours = Math.floor(this.gameTime);
        const minutes = Math.floor((this.gameTime % 1) * 60);
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const isNight = (this.gameTime >= 18 || this.gameTime < 6);
        const weatherIcon = isNight ? '🌙' : '☀️';

        document.getElementById('time-val').innerText = `${timeStr} ${weatherIcon}`;
        document.getElementById('season-val').innerText = this.season || 'Spring';

        document.getElementById('pop-val').innerText = Math.floor(this.totalPopulation || 0);

        // Active Unit Counts
        const knights = this.units.filter(u => u.role === 'knight').length;
        const wizards = this.units.filter(u => u.role === 'wizard').length;

        document.getElementById('active-val').innerText = this.units.length;
        const elKnight = document.getElementById('knight-val');
        if (elKnight) elKnight.innerText = knights;
        const elWizard = document.getElementById('wizard-val');
        if (elWizard) elWizard.innerText = wizards;

        document.getElementById('house-val').innerText = this.terrain.buildings.filter(b => b.userData.type === 'house').length;
        document.getElementById('castle-val').innerText = this.terrain.buildings.filter(b => b.userData.type === 'barracks').length;
        document.getElementById('grain-val').innerText = Math.floor(this.resources.grain);
        document.getElementById('fish-val').innerText = Math.floor(this.resources.fish);
        document.getElementById('meat-val').innerText = Math.floor(this.resources.meat);

        // Mana Check
        const elMana = document.getElementById('mana-val');
        if (elMana) {
            elMana.innerText = Math.floor(this.mana);
            // Change color if negative
            elMana.style.color = this.mana < 0 ? '#ff4444' : 'white';
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = performance.now();
        // Cap max deltaTime to prevent explosion on tab switch, but apply timeScale
        let deltaTime = Math.min((time - this.lastTime) / 1000, 0.1);
        this.lastTime = time;

        // Apply Speed Multiplier
        deltaTime *= (this.timeScale || 1.0);

        // Accumulate SIMULATED time in MILLISECONDS
        this.gameTotalTime += deltaTime * 1000;
        const simTime = this.gameTotalTime;
        const simTimeSec = simTime / 1000; // Legacy seconds for managers

        // Heartbeat
        if (!this.lastHeartbeat || time - this.lastHeartbeat > 5000) {
            // console.log("Game Loop OK. FPS:", Math.round(1 / deltaTime), "Units:", this.units.length);
            this.lastHeartbeat = time;
        }

        let isNight = false;
        try {
            isNight = this.updateEnvironment(deltaTime);
            this.updateSeasons(deltaTime);
        } catch (e) { console.error("Env/Season Error:", e); }

        try {
            this.updateCameraControls();
        } catch (e) { console.error("Cam Error:", e); }

        try {
            this.updateStats();
        } catch (e) { console.error("Stats Error:", e); }

        // --- MANA SYSTEM ---
        // --- MANA SYSTEM ---
        // Use Game's totalPopulation (Active Units + Housing) calculated in updateStats
        const pop = (this.totalPopulation || 0);
        // Debug
        // if (Math.random() < 0.01) console.log("Mana Delta:", pop * 0.1 * deltaTime, "Pop:", pop);
        // Mana Gain: 0.1 per person per second. 
        // 10 Pop = 1 Mana/sec
        // 100 Pop = 10 Mana/sec
        const manaDelta = pop * 0.1 * deltaTime;
        this.mana += manaDelta;
        // No Cap? "Statistical info shows accumultated sin" - maybe limitless.

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
            this.birdManager.update(deltaTime, simTimeSec, frustum);
        } catch (e) { console.error("Bird Error:", e); }

        try {
            this.sheepManager.update(simTimeSec, deltaTime);
        } catch (e) { console.error("Sheep Error:", e); }

        try {
            // Pass timeScale for dynamic staggering inside GoblinManager
            this.goblinManager.update(simTime, deltaTime, isNight, this.units, this.timeScale);
        } catch (e) { console.error("Goblin Manager Error:", e); }

        try {
            this.fishManager.update(simTime, deltaTime, frustum);
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

        if (this.inputManager) {
            this.inputManager.update();
        }

        // Initialize frameCount if needed
        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;

        // Staggered Unit Updates (Processing Load Halving)
        const stagger = Math.max(1, Math.floor(4 / this.timeScale));
        const parity = this.frameCount % stagger;

        for (let i = this.units.length - 1; i >= 0; i--) {
            const unit = this.units[i];

            // 1. Always Update Movement (Visuals) - Every Frame
            if (unit.updateMovement) {
                unit.updateMovement(simTime);
            }

            // 2. Staggered Logic Update (AI, Aging, etc.)
            if (i % stagger === parity) {
                try {
                    unit.updateLogic(simTime, deltaTime * stagger, isNight, this.goblinManager.goblins);
                } catch (e) {
                    console.error("Unit Logic Error:", e, unit);
                    // Kill unit to prevent persistent crash
                    unit.isDead = true;
                }

                if (unit.isDead && unit.isFinished) {
                    this.units.splice(i, 1);
                }
            }
        }

        try {
            this.terrain.update(deltaTime, this.handleBuildingSpawn.bind(this), isNight);
        } catch (e) { console.error("Terrain Update Error:", e); }

        this.terrain.updateMeshPosition(this.camera);

        // Update House Lights (Via BuildingRenderer)
        this.terrain.updateLights(this.gameTime);
        if (this.buildingRenderer) {
            this.buildingRenderer.updateLighting(isNight);
        }

        // Update Unit Renderer
        if (this.unitRenderer) {
            try {
                this.unitRenderer.update(this.units, frustum, this.camera);
            } catch (e) { console.error("UnitRenderer Error:", e); }
        }

        // Update Building Renderer
        if (this.buildingRenderer) {
            try {
                this.buildingRenderer.update(this.terrain.buildings, frustum, this.camera);
            } catch (e) { console.error("BuildingRenderer Error:", e); }
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
            // Season Persistence
            currentSeasonIndex: this.currentSeasonIndex,
            daysPassed: this.daysPassed,

            terrain: this.terrain.serialize(),
            terrain: this.terrain.serialize(),
            terrain: this.terrain.serialize(),
            units: this.units.filter(u => !u.isDead).map(u => u.serialize()),
            // Camera State
            camera: {
                position: { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
                zoom: this.camera.zoom,
                target: { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z }
            }
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

        // Reset Systems
        if (this.goblinManager) this.goblinManager.reset();

        this.resources = saveData.resources || { grain: 0, fish: 0, meat: 0 };
        this.gameTime = saveData.gameTime || 8;

        // Restore Season
        this.currentSeasonIndex = saveData.currentSeasonIndex || 0;
        this.daysPassed = saveData.daysPassed || 0;
        // Force update immediately
        const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
        this.season = SEASONS[this.currentSeasonIndex];
        if (this.terrain) this.terrain.setSeason(this.season);

        try {
            console.log("Deserializing Terrain with:", saveData.terrain);
            this.terrain.deserialize(saveData.terrain);
        } catch (e) {
            console.error("Terrain deserialize failed:", e);
            return false;
        }

        if (this.goblinManager) this.goblinManager.scanForCaves();

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

        if (saveData.camera) {
            if (saveData.camera.position) {
                this.camera.position.set(saveData.camera.position.x, saveData.camera.position.y, saveData.camera.position.z);
            }
            if (saveData.camera.zoom) {
                this.camera.zoom = saveData.camera.zoom;
            }
            if (saveData.camera.target) {
                this.controls.target.set(saveData.camera.target.x, saveData.camera.target.y, saveData.camera.target.z);
            }
            this.camera.updateProjectionMatrix();
            this.controls.update();
        }

        console.log("Game loaded from slot", slotId);
        return true;
    }
}
