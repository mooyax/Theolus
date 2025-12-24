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
import { GoblinRenderer } from './GoblinRenderer.js';

class BattleMemory {
    constructor() {
        this.raids = []; // {x, z, time, threat}
    }

    reportRaid(x, z, time) {
        // Avoid duplicate spots close by
        const existing = this.raids.find(r => {
            const dx = r.x - x;
            const dz = r.z - z;
            return (dx * dx + dz * dz) < 100; // 10 radius
        });

        if (existing) {
            existing.time = time; // Refresh time
            return;
        }

        this.raids.push({ x, z, time, threat: 10 });
        // Limit memory size
        if (this.raids.length > 20) this.raids.shift();
    }

    reportVictory(x, z) {
        // Remove raids near this spot
        this.raids = this.raids.filter(r => {
            const dx = r.x - x;
            const dz = r.z - z;
            return (dx * dx + dz * dz) > 100;
        });
    }

    reportClear(x, z) {
        // Remove specific raid point after investigation (Investigated)
        this.raids = this.raids.filter(r => {
            const dx = r.x - x;
            const dz = r.z - z;
            // If within very close range (5.0), remove it
            return (dx * dx + dz * dz) > 25;
        });
    }

    getPriorities(currentTime) {
        // Return active raids not too old (5 mins)
        return this.raids.filter(r => (currentTime - r.time) < 300000);
    }
}

export class Game {
    constructor() {
        console.log("Game constructor called");
        this.saveManager = new SaveManager();
        this.soundManager = new SoundManager();
        this.mana = 100; // Initial Mana

        // Battle Memory System (Global)
        // Battle Memory System (Global used by Freelancers)
        this.battleMemory = new BattleMemory();

        // Global Squad Manager (Persistent Squads)
        this.squads = new Map(); // id -> { id, type, target: {x,z,time}, members: [], lastUpdate }

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

        // 7. Request System (Worker Jobs)
        this.requestQueue = []; // { id, type, x, z, status: 'pending'|'assigned', assignedTo: unitId, data: {} }
        // 7. Request System (Worker Jobs)
        this.requestQueue = []; // { id, type, x, z, status: 'pending'|'assigned', assignedTo: unitId, data: {} }
        this.requestIdCounter = 0;
        this.projectiles = []; // Active visual projectiles

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

        // Initialize Marker Shader Material
        this.initMarkerMaterial();

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

    spawnUnit(x, z, roleOrSpecial = false, sourceBuilding = null, squadId = null) {
        // Determine Role based on Source Building (Explicit Link)
        let role = 'citizen'; // Default
        let isSpecial = false;
        let homeBase = null;

        if (roleOrSpecial === true) {
            isSpecial = true;
            role = 'worker'; // Force Worker for Manual Spawn (Red)
        } else if (typeof roleOrSpecial === 'string') {
            role = roleOrSpecial;
        } else if (sourceBuilding) {
            // Explicit Linkage from Terrain.js
            homeBase = sourceBuilding;
            if (sourceBuilding.type === 'barracks') role = 'knight';
            else if (sourceBuilding.type === 'tower') role = 'wizard';
            else {
                // Houses spawn diversity:
                // 60% Worker (Generalist/Moisture)
                // 20% Hunter (Forest/Mountain)
                // 20% Fisher (Water)
                const r = Math.random();
                if (r < 0.2) role = 'hunter';
                else if (r < 0.4) role = 'fisher';
                else role = 'worker';
            }

            // Init Memory if needed (and persist it?)
            if ((role === 'knight' || role === 'wizard') && !sourceBuilding.userData.memory) {
                sourceBuilding.userData.memory = new BattleMemory();
            }
            console.log(`Spawned ${role} linked to ${sourceBuilding.type} at ${sourceBuilding.userData.gridX},${sourceBuilding.userData.gridZ} SquadID:${squadId}`);
        } else {
            // Manual Spawn (God Mode) without specific role requested
            // User requested NO Proximity search fallback for Knights/Wizards.
            // Defaults to Citizen/Worker logic or simple random citizen.
            role = Math.random() > 0.5 ? 'worker' : 'worker'; // Just worker for now? Or keep vague.
            role = Math.random() > 0.5 ? 'worker' : 'worker'; // Just worker for now? Or keep vague.
        }

        const unit = new Unit(this.scene, this.terrain, x, z, role, isSpecial, squadId);
        unit.game = this;
        unit.homeBase = homeBase; // Link

        this.units.push(unit);
        return unit;
    }

    handleBuildingSpawn(x, z, buildingType, sourceBuilding, squadId = null) {
        // Callback from Terrain when a building overflows
        // We now receive sourceBuilding!
        this.spawnUnit(x, z, null, sourceBuilding, squadId); // null roleOrSpecial lets spawnUnit decide based on building
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

    // --- Request System ---
    initMarkerMaterial() {
        // Shader for Rising Light Particles
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;

            // Simple Pseudo-Random Noise
            float random (vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            void main() {
                // Scroll UVs vertically
                vec2 st = vUv;
                // ULTRA FINE SETTINGS (Adjusted for Visibility)
                float time = uTime * 8.0; 
                
                // Grid: 60x40 (Fine but visible)
                vec2 grid = vec2(st.x * 60.0, st.y * 40.0 - time);
                vec2 ipos = floor(grid);
                vec2 fpos = fract(grid);

                // Random brightness
                float noise = random(ipos);
                
                // Very Sparse (95% empty) -> Visible Dust
                float sparkle = step(0.95, noise);
                
                // Sharp tiny dots
                float dist = length(fpos - 0.5);
                float glow = 1.0 - smoothstep(0.0, 0.4, dist); // Tighter glow
                
                // Fade out at top and bottom
                float alpha = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
                
                // Core Pillar Glow (Vertical Beam)
                float beam = (1.0 - abs(vUv.x - 0.5) * 2.0);
                beam = smoothstep(0.4, 0.8, beam) * 0.3; // Subtle core
                
                // Combine
                float finalAlpha = (sparkle * glow) + beam;
                finalAlpha *= alpha;

                gl_FragColor = vec4(uColor, finalAlpha);
            }
        `;

        this.markerMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(0xFFFF00) } // Default Yellow
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false, // Don't write depth (transparency)
            side: THREE.DoubleSide
        });
    }

    // --- Request System ---
    addRequest(type, x, z, assignedUnit = null, visX = null, visZ = null) {
        // Mana Check (Consume Upfront? Or on completion?)
        // User requested: "Instruct workers... they operate."
        // Consuming upfront prevents spamming without resources.
        // Costs are handled in InputManager currently, but should ideally optionally be here.
        // For now, assume Mana is already checked/consumed by InputManager for visual feedback.

        const id = `req_${this.requestIdCounter++}`;
        const req = {
            id: id,
            type: type, // 'raise', 'lower', 'build_tower', 'build_barracks'
            x: x,
            z: z,
            status: 'pending',
            assignedTo: null,
            mesh: null,
            createdAt: Date.now()
        };

        // VISUAL MARKER (Rising Light Particles)
        // Cylinder Geometry (open ended)
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16, 1, true); // Radius 0.5, Height 5

        // Clone material to allow independent color changes (Yellow -> Green)
        // Clone material to allow independent color changes (Yellow -> Green)
        let material;
        if (this.markerMaterial && this.markerMaterial.clone) {
            material = this.markerMaterial.clone();
            if (material.uniforms && material.uniforms.uColor) {
                material.uniforms.uColor.value.setHex(0xFFFF00); // Yellow
            }
        } else {
            console.warn("[Game] Warning: markerMaterial missing or invalid. Using fallback.");
            material = new THREE.MeshBasicMaterial({ color: 0xFFFF00, transparent: true, opacity: 0.8 });
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.renderOrder = 2000; // Draw after terrain transparents

        // Visual Position Logic
        const drawX = (visX !== null) ? visX : x;
        const drawZ = (visZ !== null) ? visZ : z;

        let h = this.terrain.getTileHeight(x, z);
        if (h === undefined || isNaN(h)) h = 10;

        // Cylinder Height 4 -> Center at +2 puts bottom at h
        mesh.position.set(drawX, h + 2, drawZ);
        this.scene.add(mesh);
        req.mesh = mesh;

        this.requestQueue.push(req);
        console.log(`[Game] Request Added: ${type} at (${x},${z}) ID:${id}`);

        // FORCE ASSIGNMENT (User Request: "Nearby workers should accept")
        this.forceAssignRequest(req);

        return req;
    }

    findBestRequest(unit) {
        if (!unit) return null;
        let bestReq = null;
        let minDistSq = Infinity;

        const logicalW = this.terrain.logicalWidth || 160;
        const logicalD = this.terrain.logicalDepth || 160;

        for (const req of this.requestQueue) {
            if (req.status !== 'pending') continue;

            // WRAP-AWARE DISTANCE
            let dx = Math.abs(req.x - unit.gridX);
            let dz = Math.abs(req.z - unit.gridZ);

            if (dx > logicalW / 2) dx = logicalW - dx;
            if (dz > logicalD / 2) dz = logicalD - dz;

            const distSq = dx * dx + dz * dz;

            if (distSq < minDistSq) {
                minDistSq = distSq;
                bestReq = req;
            }
        }

        if (bestReq) {
            // console.log(`[Game] Found request for Unit ${unit.id}: ${bestReq.type} at dist ${Math.sqrt(minDistSq)} `);
        }

        return bestReq;
    }

    forceAssignRequest(req) {
        if (!req || req.status !== 'pending') return;

        // Async to prevent UI Freeze / Stack recursion
        setTimeout(() => {
            try {
                // Safeguard against race conditions
                if (!this.units || !req || req.status !== 'pending') return;

                // Find nearest capable worker who is NOT already working/busy
                let bestUnit = null;
                let minDistSq = Infinity; // GLOBAL SEARCH

                const logicalW = this.terrain.logicalWidth || 80;
                const logicalD = this.terrain.logicalDepth || 80;

                let debugScanned = 0;
                let debugBusy = 0;
                let debugRole = 0;
                let debugValid = 0;

                for (const unit of this.units) {
                    if (unit.role !== 'worker') { debugRole++; continue; }
                    debugScanned++;

                    // Preemption Logic: Prefer FREE units, but accept BUSY ones if necessary.
                    let scorePenalty = 0;
                    if (unit.targetRequest) {
                        debugBusy++;
                        scorePenalty = 1000000; // Prefer free unit ANYWHERE over busy unit
                    } else if (unit.action === 'Working') {
                        scorePenalty = 1000000; // Busy working
                    } else {
                        debugValid++;
                    }

                    // WRAP-AWARE DISTANCE
                    let dx = Math.abs(unit.gridX - req.x);
                    let dz = Math.abs(unit.gridZ - req.z);

                    if (dx > logicalW / 2) dx = logicalW - dx;
                    if (dz > logicalD / 2) dz = logicalD - dz;

                    const dSq = dx * dx + dz * dz;
                    const finalScore = dSq + scorePenalty;

                    if (finalScore < minDistSq) {
                        minDistSq = finalScore;
                        bestUnit = unit;
                    }
                }

                // DEBUG LOG: Why is no one picked?
                if (!bestUnit) {
                    console.log(`[Game] forceAssignRequest FAILED for Req ${req.id}. Scanned:${debugScanned} (RoleSkipped:${debugRole}) Busy:${debugBusy} Valid:${debugValid}. TotalUnits:${this.units.length}`);
                } else {
                    console.log(`[Game] forceAssignRequest FOUND Unit ${bestUnit.id} (DistSq:${minDistSq}). Scanned:${debugScanned}`);
                }

                if (bestUnit) {
                    // INTERRUPT IF BUSY
                    if (bestUnit.targetRequest) {
                        // console.log(`[Game] INTERRUPTING Unit ${bestUnit.id} (Job: ${bestUnit.targetRequest.id}) for Priority Request ${req.id}`);
                        this.releaseRequest(bestUnit, bestUnit.targetRequest); // Return old job to pool
                        bestUnit.targetRequest = null;
                        bestUnit.action = 'Idle';
                    }

                    if (this.claimRequest(bestUnit, req)) {
                        bestUnit.targetRequest = req;
                        bestUnit.action = 'Approaching Job';
                        console.log(`[Game] Force-Assigned Request ${req.id} to Unit ${bestUnit.id} (Score: ${minDistSq.toFixed(1)})`);
                    }
                } else {
                    // console.warn(`[Game] Force Assign FAILED for ${req.id}. Scanned:${this.units.length} (Workers:${debugScanned} Busy:${debugBusy} Valid:${debugValid})`);
                }
            } catch (e) {
                console.error("[Game] Force Assignment Error:", e);
            }
        }, 10);
    }

    detectZombieRequests() {
        // Runs occasionally to fix sync errors
        if (!this.units || !this.requestQueue) return;

        for (const req of this.requestQueue) {
            if (req.status === 'assigned' && req.assignedTo !== null) {
                // Find unit
                const u = this.units.find(unit => unit.id === req.assignedTo);

                // Zombie Case 1: Unit invalid/dead
                if (!u || u.isDead) {
                    console.log(`[Game] Detected ZOMBIE Request req_${req.id} (Assigned to Dead/Missing ${req.assignedTo}). Resetting.`);
                    req.status = 'pending';
                    req.assignedTo = null;
                    if (req.mesh) req.mesh.material = this.markerMaterial;
                    continue;
                }

                // Zombie Case 2: Unit forgot about request
                // Zombie Case 2: Unit forgot about request (or ID mismatch)
                // Use ID comparison because object references might differ after load
                if (!u.targetRequest || u.targetRequest.id !== req.id) {
                    console.log(`[Game] Detected ZOMBIE Request req_${req.id} (Assigned to ${u.id}, but unit has ${u.targetRequest ? u.targetRequest.id : 'null'}). Resetting.`);
                    req.status = 'pending';
                    req.assignedTo = null;
                    if (req.mesh) req.mesh.material = this.markerMaterial;
                }
            }
        }
    }



    claimRequest(unit, req) {
        if (!req || req.status !== 'pending') return false;

        // Check if unit is capable
        if (unit.role !== 'worker') return false; // Only workers

        req.status = 'assigned';
        req.assignedTo = unit.id;

        // COMBAT CLEAR: Stop fighting to work
        unit.targetGoblin = null;
        unit.targetBuilding = null;
        unit.action = 'Idle'; // Reset action to ensure smooth transition

        // console.log(`[Game] Request ${req.id} assigned to Unit ${unit.id}`);
        return true;
    }

    releaseRequest(unit, req) {
        if (!req) return;
        if (req.assignedTo === unit.id) {
            req.status = 'pending';
            req.assignedTo = null;
            console.log(`[Game] Request ${req.id} released by Unit ${unit.id}. Searching for replacement...`);
            this.forceAssignRequest(req);
        }
    }

    removeRequest(req) {
        if (!req) return;
        // Use ID based lookup for robustness against deserialization clones
        const idx = this.requestQueue.findIndex(r => r === req || r.id === req.id);

        if (idx > -1) {
            const actualReq = this.requestQueue[idx];
            this.requestQueue.splice(idx, 1);
            if (actualReq.mesh) this.scene.remove(actualReq.mesh);
            console.log(`[Game] Request ${actualReq.id} COMPLETED and removed.`);
        }
    }

    updateRequestMarkers() {
        if (!this.scene || !this.camera) return;
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        const camX = this.camera.position.x;
        const camZ = this.camera.position.z;

        for (const req of this.requestQueue) {
            // Update Mesh Position if it exists
            if (req.mesh) {
                // Find the periodic position closest to the camera
                // Formula: base + round((target - base) / period) * period
                // CRITICAL FIX: req.x is Logical Index (0..W). World Base is (req.x - W/2).

                const baseReqX = req.x - logicalW / 2;
                const baseReqZ = req.z - logicalD / 2;

                const newX = baseReqX + Math.round((camX - baseReqX) / logicalW) * logicalW;
                const newZ = baseReqZ + Math.round((camZ - baseReqZ) / logicalD) * logicalD;

                let h = this.terrain.getTileHeight(req.x, req.z);
                if (h === undefined || isNaN(h)) h = 10;

                req.mesh.position.set(newX, h + 2.5, newZ);
            } else {
                // Throttled Warning for missing mesh
                if (this.frameCount % 300 === 0) {
                    console.warn(`[Game] Request ${req.id} has NO MESH! Status: ${req.status}`);
                }
            }
        }
    }

    // Cancel Request at specific location (Proximity Search)
    tryCancelRequest(x, z) {
        // Find nearest request within radius (User Request: "Nearby")
        const searchRadius = 3.0;
        let bestIdx = -1;
        let minDistSq = searchRadius * searchRadius;

        for (let i = 0; i < this.requestQueue.length; i++) {
            const r = this.requestQueue[i];
            if (r.status !== 'pending' && r.status !== 'assigned') continue; // Can cancel assigned too? Let's allow pending only for now to act as "Cleanup"

            const dx = r.x - x;
            const dz = r.z - z;
            const distSq = dx * dx + dz * dz;

            if (distSq < minDistSq) {
                minDistSq = distSq;
                bestIdx = i;
            }
        }

        if (bestIdx !== -1) {
            const req = this.requestQueue[bestIdx];

            // Remove Visuals
            if (req.mesh) {
                this.scene.remove(req.mesh);
                if (req.mesh.geometry) req.mesh.geometry.dispose();
                if (req.mesh.material) req.mesh.material.dispose();
            }

            // Remove from queue
            this.requestQueue.splice(bestIdx, 1);
            console.log(`[Game] Request Canceled at ${req.x},${req.z} (Target: ${x},${z})`);

            // Refund Mana
            this.consumeMana(-10);

            return true;
        }
        return false;
    }

    checkExpiredRequests(currentTime) {
        // Timeout: 300s (5 Minutes) - User wants orders to persist until done.
        // Was 45s, which is too short for a queue of 10+ items with few workers.
        const TIMEOUT = 300000;

        // Iterate backwards to safe splice
        for (let i = this.requestQueue.length - 1; i >= 0; i--) {
            const req = this.requestQueue[i];

            // 1. ZOMBIE WATCHDOG: Check for Broken Assignments
            if (req.status === 'assigned') {
                const assigneeId = req.assignedTo;
                // If ID is present, verify unit exists and knows about job
                if (assigneeId !== null) {
                    const unit = this.units.find(u => u.id === assigneeId);

                    let isBroken = false;
                    if (!unit) isBroken = true; // Unit vanished
                    else if (unit.isDead) isBroken = true; // Unit dead
                    else if (unit.targetRequest !== req) {
                        // Unit dropped job (e.g. interruption) without Releasing?
                        // Or unit has a different job?
                        isBroken = true;
                    }

                    if (isBroken) {
                        console.warn(`[Game] Detected ZOMBIE Request ${req.id} (Assigned to ${assigneeId}). Resetting.`);
                        req.status = 'pending';
                        req.assignedTo = null;
                        this.forceAssignRequest(req); // Try to re-assign immediately
                        continue; // Skip timeout check this frame, treated as pending next time
                    }
                }
            }

            // 2. PERIODIC RETRY (For Pending Requests)
            // If it failed initially (all busy), retry every 1s.
            if (req.status === 'pending') {
                if (!req.lastAttempt) req.lastAttempt = req.createdAt;

                if (currentTime - req.lastAttempt > 1000) {
                    const pendingDuration = currentTime - req.createdAt;
                    if (pendingDuration > 60000 && pendingDuration % 10000 < 1000) {
                        // Warn every ~10s after 60s of waiting (Reduced spam)
                        console.log(`[Game] Request ${req.id} pending for ${(pendingDuration / 1000).toFixed(1)}s.`);
                    }
                    this.forceAssignRequest(req);
                    req.lastAttempt = currentTime;
                }
            }

            // 3. REMOVE COMPLETED REQUESTS (Green Markers)
            if (req.status === 'completed') {
                if (!req.completedAt) req.completedAt = currentTime; // Should be set by completeRequest, but safety.

                // Keep for 2 seconds to show "Green" success state
                if (currentTime - req.completedAt > 2000) {
                    // console.log(`[Game] Removing Completed Request ${req.id}`);
                    if (req.mesh) {
                        this.scene.remove(req.mesh);
                        if (req.mesh.geometry) req.mesh.geometry.dispose();
                        if (req.mesh.material) req.mesh.material.dispose();
                        req.mesh = null;
                    }
                    this.requestQueue.splice(i, 1);
                    continue;
                }
            }

            // 4. TIMEOUT (Only for pending)
            if (req.status === 'pending' && (currentTime - req.createdAt > TIMEOUT)) {
                console.log(`[Game] Request Timed Out: ${req.type} ID:${req.id}`);

                // Remove Visuals
                if (req.mesh) {
                    this.scene.remove(req.mesh);
                    if (req.mesh.geometry) req.mesh.geometry.dispose();
                    if (req.mesh.material) req.mesh.material.dispose();
                    req.mesh = null; // Prevent dangling ref
                }

                this.requestQueue.splice(i, 1);
            }
        }
    }

    clearProjectiles() {
        if (!this.projectiles) return;
        console.log(`Clearing ${this.projectiles.length} projectiles...`);
        for (const p of this.projectiles) {
            if (p.mesh) {
                this.scene.remove(p.mesh);
                if (p.mesh.geometry) p.mesh.geometry.dispose();
                // Material might be shared (markerMaterial), so don't dispose shared material
                if (p.mesh.material && p.mesh.material !== this.markerMaterial) {
                    p.mesh.material.dispose();
                }
            }
        }
        this.projectiles = [];
    }

    // --- Projectile System ---
    spawnProjectile(startPos, endPos, color = 0xFF4400) {
        // Shared Geometry (Sphere)
        if (!this.projectileGeo) this.projectileGeo = new THREE.SphereGeometry(0.3, 16, 16);

        // Material (Fireball Shader)
        const material = this.markerMaterial.clone();
        material.uniforms.uColor.value.setHex(color); // Use passed color

        const mesh = new THREE.Mesh(this.projectileGeo, material);
        mesh.position.copy(startPos);

        // MAP WRAPPING VISUAL FIX
        // If dist > logicalWidth / 2, move target to be adjacent!
        const logicalW = (this.terrain && this.terrain.logicalWidth) ? this.terrain.logicalWidth : 80;
        const logicalD = (this.terrain && this.terrain.logicalDepth) ? this.terrain.logicalDepth : 80;

        const dx = endPos.x - startPos.x;
        const dz = endPos.z - startPos.z;

        // If distance along axis > half map, wrap it
        // Assumes World Coordinate ~ Grid Coordinate (centered usually, but let's check magnitude)
        // Default scale is 1 unit = 1 tile? Yes.

        const finalTarget = endPos.clone();

        // Wrap X
        if (Math.abs(dx) > logicalW / 2) {
            if (dx > 0) finalTarget.x -= logicalW;
            else finalTarget.x += logicalW;
        }

        // Wrap Z
        if (Math.abs(dz) > logicalD / 2) {
            if (dz > 0) finalTarget.z -= logicalD;
            else finalTarget.z += logicalD;
        }

        this.scene.add(mesh);

        this.projectiles.push({
            mesh: mesh,
            target: finalTarget,
            speed: 15.0, // Fast
            uTime: 0
        });
    }

    updateProjectiles(deltaTime) {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];

            // Animate Shader
            p.uTime += deltaTime;
            if (p.mesh.material.uniforms) {
                p.mesh.material.uniforms.uTime.value = p.uTime;
            }

            // Move
            const dir = new THREE.Vector3().subVectors(p.target, p.mesh.position);
            const dist = dir.length();

            if (dist < 0.5) {
                // Hit/Arrived
                this.scene.remove(p.mesh);
                if (p.mesh.material) p.mesh.material.dispose();
                this.projectiles.splice(i, 1);
            } else {
                dir.normalize();
                const moveDist = p.speed * deltaTime;
                if (moveDist >= dist) {
                    p.mesh.position.copy(p.target);
                } else {
                    p.mesh.position.add(dir.multiplyScalar(moveDist));
                }
            }
        }
    }

    completeRequest(unit, req) {
        if (!req) return;
        // console.log(`[Game] Completing Request ${req.type} at ${req.x},${req.z} `);

        // Execute Action (Safely)
        let success = true;
        try {
            if (req.type === 'raise') {
                this.terrain.raise(req.x, req.z);
            } else if (req.type === 'lower') {
                this.terrain.lower(req.x, req.z);
            } else if (req.type === 'build_tower') {
                this.terrain.addBuilding('tower', req.x, req.z);
            } else if (req.type === 'build_barracks') {
                this.terrain.addBuilding('barracks', req.x, req.z);
            }
        } catch (e) {
            console.error(`[Game] Request Execution Failed for ${req.type} at ${req.x},${req.z}:`, e);
            success = false;
        }

        if (success) {
            // Mark as Completed (Handled by checkExpiredRequests for visual delay + removal)
            req.status = 'completed';
            req.completedAt = Date.now();

            // Visual Feedback: Turn Green immediately
            if (req.mesh) {
                if (req.mesh.material && req.mesh.material.uniforms) {
                    req.mesh.material.uniforms.uColor.value.setHex(0x00FF00);
                }
            }
        } else {
            // If failed (e.g. invalid location), remove immediately? Or retry?
            // For now, remove to prevent getting stuck
            const idx = this.requestQueue.indexOf(req);
            if (idx !== -1) this.requestQueue.splice(idx, 1);
            if (req.mesh) this.scene.remove(req.mesh);
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
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} `;
        const isNight = (this.gameTime >= 18 || this.gameTime < 6);
        const weatherIcon = isNight ? '🌙' : '☀️';

        document.getElementById('time-val').innerText = `${timeStr} ${weatherIcon} `;
        const elDay = document.getElementById('day-val');
        if (elDay) elDay.innerText = `Day ${this.daysPassed || 1} `;

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

        // Pathfinding Budget Reset (Performance Safety)
        if (this.terrain && this.terrain.resetPathfindingBudget) {
            this.terrain.resetPathfindingBudget();
        }

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
            if (this.terrain) {
                this.terrain.update(deltaTime, this.handleBuildingSpawn.bind(this), isNight);
            }
        } catch (e) { console.error("Env/Season Error:", e); }

        // Check for Request Timeouts
        this.checkExpiredRequests(Date.now());
        this.updateRequestMarkers();

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
            this.goblinManager.update(simTime, deltaTime, isNight, this.units, this.timeScale, this.camera);
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

        // Update Request Markers
        try {
            this.updateRequestMarkers();
        } catch (e) { console.error("RequestMarkers Error:", e); }

        // Animate Shader Uniforms
        const timeVal = simTimeSec;
        if (this.markerTime === undefined) this.markerTime = 0;
        this.markerTime += deltaTime;
        try {
            for (const req of this.requestQueue) {
                if (req.mesh && req.mesh.material.uniforms) {
                    req.mesh.material.uniforms.uTime.value = this.markerTime;
                }
            }
        } catch (e) { console.error("Shader Uniforms Error:", e); }

        // Update Projectiles
        try {
            this.updateProjectiles(deltaTime);
        } catch (e) { console.error("Projectiles Error:", e); }

        // Initialize frameCount if needed
        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;

        // Staggered Unit Updates
        const stagger = Math.max(1, Math.floor(4 / this.timeScale));
        const parity = this.frameCount % stagger;

        try {
            for (let i = this.units.length - 1; i >= 0; i--) {
                const unit = this.units[i];
                // 1. Always Update Movement (Visuals)
                if (unit.updateMovement) unit.updateMovement(simTime);

                // 2. Staggered Logic Update
                if (i % stagger === parity) {
                    try {
                        unit.updateLogic(simTime, deltaTime * stagger, isNight, this.goblinManager.goblins);
                    } catch (e) {
                        console.error("Unit Logic Error:", e, unit);
                    }
                    if (unit.isDead && unit.isFinished) {
                        this.units.splice(i, 1);
                    }
                }
            }
        } catch (e) { console.error("Unit Loop Error:", e); }

        try {
            this.terrain.update(deltaTime, this.handleBuildingSpawn.bind(this), isNight);
        } catch (e) { console.error("Terrain Update Error:", e); }

        try {
            this.terrain.updateMeshPosition(this.camera);
            this.terrain.updateLights(this.gameTime);
        } catch (e) { console.error("Terrain Visuals Error:", e); }

        // Debug BuildingRenderer Call
        if (this.frameCount % 120 === 0) {
            const bLen = this.terrain.buildings ? this.terrain.buildings.length : 'null';
            console.log(`[Game] calling BR.update. BR exists: ${!!this.buildingRenderer}, Buildings: ${bLen}`);
        }

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
            // Scene Audit (Repeat every 300 frames - approx 5s)
            if (this.frameCount % 300 === 0) {
                const counts = {};
                this.scene.traverse(obj => {
                    if (obj.isMesh) {
                        let key = obj.name || 'Unnamed';
                        if (obj.isInstancedMesh) {
                            const geoType = (obj.geometry) ? obj.geometry.type : 'UnknownGeo';
                            // Log the count (active instances) and max capacity
                            key = `[Instanced] ${geoType} (Active:${obj.count}/${obj.instanceMatrix.count})`;
                        } else if (key === 'Unnamed') {
                            // Fingerprint Geometry (Mesh)
                            if (obj.geometry) {
                                const geo = obj.geometry;
                                const type = geo.type;
                                let params = '';
                                if (type === 'BoxGeometry' && geo.parameters) {
                                    const p = geo.parameters;
                                    params = `(${p.width.toFixed(1)},${p.height.toFixed(1)},${p.depth.toFixed(1)})`;
                                } else if (type === 'SphereGeometry' && geo.parameters) {
                                    params = `(R${geo.parameters.radius.toFixed(1)})`;
                                } else if (type === 'ConeGeometry') {
                                    params = '(Cone)';
                                }
                                key = `Unnamed_${type}${params}`;
                            }
                        }
                        counts[key] = (counts[key] || 0) + 1;
                    }
                });
                console.log(`[Scene Audit] Objects:`, JSON.stringify(counts));
            }
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
            gameTotalTime: this.gameTotalTime,
            // Season Persistence
            currentSeasonIndex: this.currentSeasonIndex,
            daysPassed: this.daysPassed,

            terrain: this.terrain.serialize(),
            units: this.units.filter(u => !u.isDead).map(u => u.serialize()),
            goblinManager: this.goblinManager ? this.goblinManager.serialize() : null,
            // Camera State
            camera: {
                position: { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
                zoom: this.camera.zoom,
                target: { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z }
            },
            // Request Persistence
            requests: this.requestQueue.map(req => ({
                id: req.id,
                type: req.type,
                x: req.x,
                z: req.z,
                status: req.status,
                assignedTo: req.assignedTo,
                createdAt: req.createdAt,
                // Do NOT save mesh
            }))
        };
        console.log("Saving Game Data:", saveData);
        if (!saveData.terrain) console.error("Save Error: Terrain data is missing!");
        return this.saveManager.save(slotId, saveData);
    }

    async loadGame(slotId) {
        if (!this.saveManager) return false;

        // Show Loading Screen
        const loadingScreen = document.getElementById('loading-screen');
        const loadingBar = document.getElementById('loading-bar');
        const loadingText = document.getElementById('loading-text');

        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            if (loadingBar) loadingBar.style.width = '0%';
            if (loadingText) loadingText.innerText = '0%';
        }

        // Indicate Loading Start
        console.log("Load Started...");

        // Small delay to let UI render (yield)
        await new Promise(r => setTimeout(r, 50));

        const saveData = this.saveManager.load(slotId);
        if (!saveData) {
            console.error("Load Game Failed: No data for slot", slotId);
            if (loadingScreen) loadingScreen.style.display = 'none';
            return false;
        }
        console.log("Load Game: Data found", saveData);

        // Reset Systems
        if (this.goblinManager) this.goblinManager.reset();
        this.clearProjectiles();

        // FIX: Clear Request Queue and visual markers on load
        if (this.requestQueue) {
            this.requestQueue.forEach(req => {
                if (req.mesh) {
                    this.scene.remove(req.mesh);
                    if (req.mesh.geometry) req.mesh.geometry.dispose();
                    if (req.mesh.material) req.mesh.material.dispose();
                }
            });
            this.requestQueue = [];
        }

        // FIX: Dispose old renderers to prevent "Ghost" meshes (duplicates)
        if (this.buildingRenderer && this.buildingRenderer.dispose) this.buildingRenderer.dispose();
        if (this.goblinRenderer && this.goblinRenderer.dispose) this.goblinRenderer.dispose();
        if (this.unitRenderer && this.unitRenderer.dispose) this.unitRenderer.dispose();

        // Re-Initialize Renderers (Assets are cached, but meshes need fresh scene add?)
        // Wait, if we dispose meshes, we need to RE-CREATE them.
        // BuildingRenderer constructor calling initInstancedMeshes.
        // But we are keeping the SAME instance of BuildingRenderer.
        // So we must manually re-call helper to create new meshes!
        // OR we just create NEW renderers?
        // New renderers is safer as it resets internal state (counts).

        this.buildingRenderer = new BuildingRenderer(this.scene, this.terrain, this.clippingPlanes);
        this.goblinRenderer = new GoblinRenderer(this.scene, this.terrain, this.clippingPlanes);
        // UnitRenderer might be needed too
        this.unitRenderer = new UnitRenderer(this.scene, this.terrain, this.clippingPlanes);

        // Re-link InputManager
        if (this.inputManager) this.inputManager.unitRenderer = this.unitRenderer;

        // Chunked / Async Deserialization to prevent freeze
        await this.terrain.deserialize(saveData.terrain, (pct) => {
            if (loadingBar) loadingBar.style.width = pct + '%';
            if (loadingText) loadingText.innerText = pct + '%';
        });

        // Continue Restoration
        this.resources = saveData.resources || { grain: 0, fish: 0, meat: 0 };
        this.gameTime = saveData.gameTime || 8;
        this.gameTotalTime = saveData.gameTotalTime || 0;

        // Restore Season
        this.currentSeasonIndex = saveData.currentSeasonIndex || 0;
        this.daysPassed = saveData.daysPassed || 0;

        const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
        this.season = SEASONS[this.currentSeasonIndex];
        if (this.terrain) this.terrain.setSeason(this.season);

        // Restore Units
        if (this.units) {
            this.units.forEach(u => {
                if (u.dispose) u.dispose();
                this.scene.remove(u.mesh);
                if (u.crossMesh) this.scene.remove(u.crossMesh);
            });
        }
        this.units = [];

        if (saveData.units) {
            try {
                // Pre-import Unit to ensure availability if needed, mainly for reference. 
                // It is imported at module level, so should be fine.
                saveData.units.forEach(uData => {
                    const u = Unit.deserialize(uData, this.scene, this.terrain);
                    if (u) {
                        this.units.push(u);
                    }
                });
            } catch (e) { console.error("Unit restore failed:", e); }
        }

        // Restore Goblin Manager
        if (this.goblinManager) {
            if (saveData.goblinManager) {
                this.goblinManager.deserialize(saveData.goblinManager);
            } else {
                this.goblinManager.scanForCaves();
            }
        }

        // Restore Requests (Persistent Instruction Markers)
        if (saveData.requests) {
            console.log(`[Game] Restoring ${saveData.requests.length} requests...`);
            let maxId = 0;
            saveData.requests.forEach(rData => {
                // Parse ID
                const parts = rData.id.split('_');
                const idNum = parseInt(parts[parts.length - 1]);
                if (!isNaN(idNum) && idNum > maxId) maxId = idNum;

                // Recreate Visual Mesh
                let h = this.terrain.getTileHeight(rData.x, rData.z);
                if (h === undefined || isNaN(h)) h = 10;

                const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16, 1, true);
                // geometry.translate(0, 2, 0); // Removed translation to match addRequest (which sets pos directly)
                const material = this.markerMaterial.clone();

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(rData.x, h + 2, rData.z);
                this.scene.add(mesh);

                const req = {
                    id: rData.id,
                    type: rData.type,
                    x: rData.x,
                    z: rData.z,
                    status: rData.status,
                    assignedTo: rData.assignedTo,
                    createdAt: rData.createdAt || Date.now(),
                    mesh: mesh
                };
                this.requestQueue.push(req);
            });

            // Update ID Counter
            this.requestIdCounter = Math.max(this.requestIdCounter, maxId + 1);
        }

        // RE-LINK UNITS (Restoration)
        if (this.units) {
            this.units.forEach(u => {
                // Link HomeBase
                if (u.savedHomeBaseX !== undefined) {
                    const hb = this.terrain.getBuildingAt(u.savedHomeBaseX, u.savedHomeBaseZ);
                    if (hb) u.homeBase = hb;
                }

                // Link Request (Persistent)
                if (u.savedTargetRequestId) {
                    const req = this.requestQueue.find(r => r.id === u.savedTargetRequestId);
                    if (req) {
                        u.targetRequest = req;
                        console.log(`[Game] Re-linked Unit ${u.id} to Request ${req.id}`);

                        // Fix Status
                        if (req.status === 'pending') req.status = 'assigned';
                        if (req.assignedTo !== u.id) req.assignedTo = u.id; // Override
                    } else {
                        u.targetRequest = null;
                    }
                    u.savedTargetRequestId = null;
                }
            });
        }

        // Restore Camera
        if (saveData.camera) {
            this.camera.position.set(saveData.camera.position.x, saveData.camera.position.y, saveData.camera.position.z);

            if (this.controls) {
                this.controls.target.set(saveData.camera.target.x, saveData.camera.target.y, saveData.camera.target.z);
                this.controls.update();
            }

            // Set zoom AFTER controls update to ensure it sticks
            // Fallback to 1.0 if missing
            const restoredZoom = (saveData.camera.zoom !== undefined) ? saveData.camera.zoom : 1.0;
            this.camera.zoom = restoredZoom;
            this.camera.updateProjectionMatrix();
            console.log(`[Game] Restored Camera Zoom: ${restoredZoom}`);
        }

        // Hide Loading Screen
        if (loadingScreen) {
            if (loadingBar) loadingBar.style.width = '100%';
            if (loadingText) loadingText.innerText = '100%';

            // Small delay for 100% check
            await new Promise(r => setTimeout(r, 200));
            loadingScreen.style.display = 'none';
        }

        return true;
    }

    // --- SQUAD MANAGEMENT ---
    registerSquad(type) {
        if (!this.squads) this.squads = new Map();
        const id = Math.floor(Math.random() * 1000000);
        this.squads.set(id, {
            id: id,
            type: type,
            target: null, // {x, z, time}
            lastUpdate: Date.now()
        });
        console.log(`[Game] Registered Squad ${id} (${type})`);
        return id;
    }

    getSquad(id) {
        if (!this.squads) return null;
        return this.squads.get(id);
    }

    reportSquadTarget(squadId, x, z) {
        if (!this.squads) return;
        const squad = this.squads.get(squadId);
        if (squad) {
            // Update target if new or different
            if (!squad.target || squad.target.x !== x || squad.target.z !== z) {
                console.log(`[Squad ${squadId}] Target Updated: ${x},${z}`);
                squad.target = { x: x, z: z, time: Date.now() };
                squad.lastUpdate = Date.now();
            } else {
                // Refresh time
                if (squad.target) squad.target.time = Date.now();
            }
        }

        // Also report to Global Hotspots (Total Mobilization)
        this.reportGlobalBattle(x, z);
    }

    reportGlobalBattle(x, z) {
        if (!this.battleHotspots) this.battleHotspots = [];

        const now = Date.now();
        // Cleanup old hotspots (> 30s)
        this.battleHotspots = this.battleHotspots.filter(h => now - h.time < 30000);

        // Check if close hotspot exists
        const existing = this.battleHotspots.find(h => {
            const dx = Math.abs(h.x - x);
            const dz = Math.abs(h.z - z); // Simple dist check (Manhattan approx)
            return dx < 10 && dz < 10;
        });

        if (existing) {
            existing.time = now; // Refresh
            existing.x = x; // Update centering
            existing.z = z;
        } else {
            this.battleHotspots.push({ x: x, z: z, time: now });
            console.log(`[Game] New Global Battle Hotspot reported at ${x},${z}`);
        }
    }






}
