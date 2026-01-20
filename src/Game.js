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
import { UnitWanderState, JobState, CombatState, SleepState } from './ai/states/UnitStates.js';
import { GoblinRenderer } from './GoblinRenderer.js';
import { PerformanceMonitor } from './PerformanceMonitor.js';

import GameConfig from './config/GameConfig.json'; // Direct Import

export class BattleMemory {
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
        return this.raids.filter(r => (currentTime - r.time) < 300);
    }
}

export class Game {
    constructor(sceneOverride, terrainOverride, minimal = false) {
        this.saveManager = new SaveManager();
        this.soundManager = new SoundManager();
        this.mana = 100; // Initial Mana
        this.gameActive = false; // Start Screen Gate
        this.unitScanBudget = 1000; // Initialize Scan Budget

        // Battle Memory System (Global used by Freelancers)
        this.battleMemory = new BattleMemory();

        // Global Squad Manager (Persistent Squads)
        this.squads = new Map(); // id -> { id, type, target: {x,z,time}, members: [], lastUpdate }

        window.game = this;

        // 1. Setup Scene & Camera
        if (sceneOverride) {
            this.scene = sceneOverride;
            // Minimal Mock Camera/Renderer setup if needed, or skip
            // Assuming Override handles strict needs or tests mock dependencies
            this.camera = {
                position: { set: () => { }, x: 0, y: 0, z: 0 },
                lookAt: () => { },
                updateProjectionMatrix: () => { },
                zoom: 1.0
            };
            this.renderer = {
                domElement: { addEventListener: () => { } },
                setSize: () => { },
                render: () => { },
                setClearColor: () => { },
                dispose: () => { }
            }; // Minimal dummy
            this.clippingPlanes = [];
            this.scene.add = () => { }; // Dummy
        } else {
            this.scene = new THREE.Scene();
            console.log("Scene created:", !!this.scene, "Pos:", typeof this.scene.position);
            const skyColor = new THREE.Color(0x87CEEB);
            this.scene.background = skyColor;

            const aspect = window.innerWidth / window.innerHeight;
            // User requested zoomed in view (d=20) -> Expanded to d=50 to prevent clipping
            // 2. Setup Renderer (Moved up slightly or just setting camera first)

            // 4. Clipping Planes & View Config
            this.viewRadius = GameConfig.render.viewRadius || 60; // Increased default

            // Calculate Frustum Size based on ViewRadius to prevent clipping
            // Ortho Size 'd' is half-height. Total height = 2d.
            // We need 'd' to be slightly larger than viewRadius to account for rotation/tilt.
            // CRITICAL: Must cover the DIAGONAL of the square (radius * sqrt(2) ~= 1.41)
            // Using 1.5 for safety buffer.
            const d = this.viewRadius * 1.5;

            this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
            console.log(`Camera created: d=${d} based on radius=${this.viewRadius}`);

            this.camera.position.set(20, 20, 20); // Isometric
            this.camera.lookAt(this.scene.position);

            // Fog Removed per User Request (Hard edges preferred)
            this.scene.fog = null;


            // 2. Setup Renderer
            this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.localClippingEnabled = true;
            document.body.appendChild(this.renderer.domElement);

            // 3. Controls
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.screenSpacePanning = false;
            // User Change: Allow Zoom Out to see full viewRadius
            this.controls.minZoom = 0.25; // Relaxed (0.5 was maybe still tight for d=72)
            this.controls.maxZoom = 4.0; // 8.0 might be excessive
            this.controls.maxPolarAngle = Math.PI / 2;

            // 4. Clipping Planes
            this.viewRadius = GameConfig.render.viewRadius || 120; // Used to be 30
            const r = this.viewRadius;
            this.clippingPlanes = [
                new THREE.Plane(new THREE.Vector3(1, 0, 0), r),
                new THREE.Plane(new THREE.Vector3(-1, 0, 0), r),
                new THREE.Plane(new THREE.Vector3(0, 0, 1), r),
                new THREE.Plane(new THREE.Vector3(0, 0, -1), r)
            ];
            // CRITICAL FIX: Revert to Local Clipping to prevent Clouds from being clipped.
            // All renderers (Terrain, Unit, Building, Goblin) now handle clipping planes manually.
            this.renderer.clippingPlanes = []; // Explicitly empty to ensure no global clipping occurs
            this.renderer.localClippingEnabled = true;

            this.setupLights();
        }

        // 7. Request System (Worker Jobs)
        this.requestQueue = []; // { id, type, x, z, status: 'pending'|'assigned', assignedTo: unitId, data: {} }
        this.requestIdCounter = 0;
        this.projectiles = []; // Active visual projectiles

        // 5. Terrain
        if (terrainOverride) {
            this.terrain = terrainOverride;
        } else if (minimal) {
            this.terrain = {
                logicalWidth: 160, logicalDepth: 160,
                grid: [], buildings: [], entityGrid: [],
                initEntityGrid: function () {
                    this.entityGrid = Array(160).fill(0).map(() => Array(160).fill(0).map(() => []));
                },
                getTileHeight: () => 0, isWalkable: () => true, isReachable: () => true,
                update: () => { }, registerEntity: () => { }, unregisterEntity: () => { }, removeBuilding: () => { },
                updateMeshPosition: () => { },
                updateLights: () => { },
                getBuildingAt: () => null,
                getRegion: () => 1,
                isValidGrid: () => true, findPath: () => [],
                findPathAsync: () => Promise.resolve([]),
                checkYield: () => Promise.resolve(),
                checkFlatArea: () => true,
                gridToWorld: (v) => v, worldToGrid: (v) => v, setSeason: () => { },
                addBuilding: function (type, x, z) { const b = { userData: { type, gridX: x, gridZ: z }, gridX: x, gridZ: z }; this.buildings.push(b); if (this.grid && this.grid[x] && this.grid[x][z]) this.grid[x][z].hasBuilding = true; return b; },
                getRandomPointInRegion: () => ({ x: 10, z: 10 }),
                serialize: function () { return { h: [], n: [], b: this.buildings || [], logicalWidth: 160, logicalDepth: 160, version: 2 }; },
                deserialize: function (d) { if (d && d.b) this.buildings = d.b; },
                grid: Array(160).fill(0).map(() => Array(160).fill(0).map(() => ({ height: 1, regionId: 1 })))
            };
            this.terrain.initEntityGrid();
        } else {
            try {
                this.terrain = new Terrain(this.scene, this.clippingPlanes);
                console.log("Terrain created:", !!this.terrain);
            } catch (e) {
                console.log("Terrain creation failed:", e);
                // throw e; // Let it bubble
            }
        }

        this.units = [];
        this.resources = {
            grain: 0,
            fish: 0,
            meat: 0
        };

        // 6. Managers
        if (!minimal) {
            // Managers Order is important for dependencies
            this.cloudManager = new CloudManager(this.scene, this.terrain.width, this.terrain.depth);
            this.birdManager = new BirdManager(this.scene, this.terrain.width, this.terrain.depth, this.clippingPlanes);
            this.sheepManager = new SheepManager(this.scene, this.terrain, this.clippingPlanes);
            this.goblinManager = new GoblinManager(this.scene, this.terrain, this, this.clippingPlanes);
            this.fishManager = new FishManager(this.scene, this.terrain, this.clippingPlanes);
            this.minimap = new Minimap(this);
            this.compass = new Compass(this);

            // Increase maxInstances to 12000 to handle 9000+ units
            this.unitRenderer = new UnitRenderer(this.scene, this.terrain, this.clippingPlanes, 12000);
            this.unitRenderer.init(); // Fire and forget async init
            this.buildingRenderer = new BuildingRenderer(this.scene, this.terrain, this.clippingPlanes, 5000);
            this.buildingRenderer.init(); // Fire and forget async init

            // パフォーマンス監視
            this.performanceMonitor = new PerformanceMonitor();
            // URLパラメータでperformance=trueの場合は自動で有効化
            if (typeof window !== 'undefined' && window.location && window.location.search && window.location.search.includes('performance=true')) {
                this.performanceMonitor.enable();
            }

            // InputManager needs access to UnitRenderer for raycasting (tooltips)
            // Pass 'this' (Game instance) for Mana control
            this.inputManager = new InputManager(this.scene, this.camera, this.terrain, this.spawnUnit.bind(this), this.units, this.unitRenderer, this);
        } else {
            // Minimal stubs if needed to prevent crash
            this.goblinManager = {
                update: () => { },
                reset: () => { },
                scanForCaves: () => { },
                serialize: () => ({}),
                deserialize: () => { },
                notifyClanActivity: () => { },
                clans: {},
                goblins: []
            };
            this.units = []; // Already init above but safe
        }

        // Initialize Marker Shader Material
        this.initMarkerMaterial();

        // REMOVED INITIAL SPAWN FROM CONSTRUCTOR (Moved to startNewGame)
        /*
        let sx = 10, sz = 10;
        ...
        */

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

        // Debug Season Toggle (P Key) → 変更: Pキーはパフォーマンス、Seasonは別キーへ
        window.addEventListener('keydown', (e) => {
            // F key: パフォーマンスモニターのトグル
            if (e.key === 'f' || e.key === 'F') {
                this.performanceMonitor.toggle();
                console.log(`[DEBUG] Performance Monitor: ${this.performanceMonitor.enabled ? 'Enabled' : 'Disabled'}`);
            }
            // S key: シーズン切り替え (Pから変更)
            else if (e.key === 's' || e.key === 'S') {
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
            role = 'worker'; // Just worker for now? Or keep vague.
        }

        const unit = new Unit(this.scene, this.terrain, x, z, role, isSpecial, squadId);
        unit.game = this;
        unit.homeBase = homeBase; // Link

        this.units.push(unit);

        // TRIGGER: Newly spawned unit immediately checks for work!
        if (unit.role === 'worker') {
            this.processAssignments();
        }

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
            if (this.scene.background && this.scene.background.setHex) this.scene.background.setHex(0x000033);
            if (this.directionalLight) this.directionalLight.intensity = 0.2;
        } else {
            if (this.scene.background && this.scene.background.setHex) this.scene.background.setHex(0x87CEEB);
            if (this.directionalLight) this.directionalLight.intensity = 1.0;
        }
        this.isNight = isNight;
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
            #include <clipping_planes_pars_vertex>
            varying vec2 vUv;
            varying vec3 vViewPosition;
            void main() {
                vUv = uv;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                vViewPosition = -mvPosition.xyz;
                #include <clipping_planes_vertex>
            }
        `;

        const fragmentShader = `
            #include <clipping_planes_pars_fragment>
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;

            // Simple Pseudo-Random Noise
            float random (vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            void main() {
                #include <clipping_planes_fragment>
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
            side: THREE.DoubleSide,
            clipping: true // FIX: Support clipping planes
        });
        this.markerMaterial.clippingPlanes = this.clippingPlanes;
    }

    // --- Request System ---
    addRequest(type, x, z, isManual = true, visX = null, visZ = null, building = null) {
        // Mana Check (Consume Upfront? Or on completion?)
        // User requested: "Instruct workers... they operate."
        // Consuming upfront prevents spamming without resources.
        // Costs are handled in InputManager currently, but should ideally optionally be here.
        // For now, assume Mana is already checked/consumed by InputManager for visual feedback.

        // User requested: "Instruct workers... they operate."
        // MANUAL JOBS are special: High Priority & Sticky
        // REFACTOR: All jobs are now treated as "Manual" (Persistent).
        const id = `req_${this.requestIdCounter++}`;
        const req = {
            id: id,
            type: type, // 'raise', 'lower', 'build_tower', 'build_barracks', 'migration'
            x: x,
            z: z,
            status: 'pending',
            assignedTo: null,
            mesh: null,
            createdAt: this.simTotalTimeSec || 0,
            isManual: !!isManual,
            building: (building && typeof building === 'object' && building.id) ? building : null,
            excludedUntil: 0 // New: Global Cooldown timestamp
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
            material.clippingPlanes = this.clippingPlanes;
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
        // Fixed: Use the renamed        // Initial Assign Try
        this.assignRequestSync(req);

        return req;
    }

    findBestRequest(unit, allowSnatch = false) {
        if (!unit) return null;
        let bestReq = null;
        let minDistSq = Infinity;

        const logicalW = this.terrain.logicalWidth || 160;
        const logicalD = this.terrain.logicalDepth || 160; // Added logicalD
        const now = this.simTotalTimeSec;
        const ux = (unit.getVisualX) ? unit.getVisualX(now) : unit.gridX;
        const uz = (unit.getVisualZ) ? unit.getVisualZ(now) : unit.gridZ;

        for (const req of this.requestQueue) {
            if (req.status === 'completed') continue;
            if (unit.role !== 'worker') continue;

            if (unit.role !== 'worker') continue;

            // GLOBAL COOLDOWN CHECK
            if (req.excludedUntil && req.excludedUntil > this.simTotalTimeSec) {
                continue;
            }

            // Priority: Pending first. 
            // Snatch: If allowSnatch is true, we can steal 'assigned' jobs if we are very close.
            if (req.status !== 'pending') {
                if (!allowSnatch) continue;
                if (req.status !== 'assigned') continue;
                if (String(req.assignedTo) === String(unit.id)) continue; // Already ours
                // NEVER snatch a Manual job from its owner
                if (req.isManual) continue;
            }

            // WRAP-AWARE DISTANCE
            let dx = Math.abs(req.x - ux);
            let dz = Math.abs(req.z - uz);

            if (dx > logicalW / 2) dx = logicalW - dx;
            if (dz > logicalD / 2) dz = logicalD - dz; // Corrected to logicalD

            const distSq = dx * dx + dz * dz;

            if (unit.ignoredTargets && unit.ignoredTargets.has(req.id)) {
                const expiry = unit.ignoredTargets.get(req.id);
                // Fix: findBestRequest should probably take 'time' or use a logic-consistent time
                // For now, let's use the unit's lastTime or game's sim time
                // Use internal sim time
                const currentTime = this.simTotalTimeSec;
                if (currentTime < expiry) {
                    console.error(`[Game] Skipping ignored request ${req.id} for Unit ${unit.id}. Exp: ${expiry} Now: ${currentTime}`);
                    continue;
                } else {
                    console.error(`[Game] Ignored request ${req.id} EXPIRED for Unit ${unit.id}. Exp: ${expiry} Now: ${currentTime} - Re-allowing.`);
                    unit.ignoredTargets.delete(req.id);
                }
            }

            // SNATCH RULE: Only snatch if DISTANCE is VERY small (e.g. < 3 tiles)
            if (req.status === 'assigned') {
                // NEVER snatch a Manual job from its owner
                if (req.isManual) continue;

                // For Auto jobs, check if we are closer by a significant margin
                const currentOwner = this.units.find(u => String(u.id) === String(req.assignedTo));
                if (currentOwner) {
                    let dOwner = Math.abs(currentOwner.gridX - req.x);
                    let dzOwner = Math.abs(currentOwner.gridZ - req.z);
                    if (dOwner > logicalW / 2) dOwner = logicalW - dOwner;
                    if (dzOwner > logicalD / 2) dzOwner = logicalD - dzOwner;
                    const dSqOwner = dOwner * dOwner + dzOwner * dzOwner;

                    // Only snatch if we are at least 30% closer
                    if (distSq < dSqOwner * 0.7) {
                        // This unit is significantly closer, allow snatching
                        // Continue to the general bestReq comparison below
                    } else {
                        // Owner is still reasonably close or closer, don't snatch
                        continue;
                    }
                }
            }


            if (distSq < minDistSq || (req.isManual && !bestReq?.isManual)) {
                // REGIONAL REACHABILITY CHECK
                if (unit.isReachable) {
                    if (!unit.isReachable(req.x, req.z)) {
                        continue;
                    }
                }

                // Manual Override: If this is manual, and bestReq wasn't, TAKE IT.
                // If both are manual, take closer.
                if (req.isManual) {
                    // If we already had a manual one, only switch if this one is closer
                    if (bestReq && bestReq.isManual) {
                        if (distSq < minDistSq) {
                            minDistSq = distSq;
                            bestReq = req;
                        }
                    } else {
                        // Previous best wasn't manual, so this wins automatically
                        minDistSq = distSq;
                        bestReq = req;
                    }
                } else {
                    // This is normal auto-job.
                    // If we already found a manual job, IGNORE this one.
                    if (bestReq && bestReq.isManual) continue;

                    // Standard closest wins
                    minDistSq = distSq;
                    bestReq = req;
                }
            }
        }

        if (bestReq) {
            // console.log(`[Game] Found request for Unit ${unit.id}: ${bestReq.type} at dist ${Math.sqrt(minDistSq)} `);
        }

        return bestReq;
    }

    processAssignments(batchSize = 100) {
        if (!this.requestQueue) return;
        let processed = 0;
        const now = this.simTotalTimeSec;

        for (const req of this.requestQueue) {
            if (req.status === 'pending') {
                // GLOBAL COOLDOWN CHECK
                if (req.excludedUntil && req.excludedUntil > now) continue;

                // Throttle: Don't retry same request too often (e.g., every 0.2s)
                if (req.lastAttempt && (now - req.lastAttempt < 0.2)) continue;

                if (processed >= batchSize) break;

                this.assignRequestSync(req);
                req.lastAttempt = now;
                processed++;
            }
        }
    }

    // Renamed from forceAssignRequest (Old Async) to Sync Helper


    assignRequestSync(req) {
        if (!req || req.status !== 'pending') return;

        // Synchronous Logic (No Timeout)
        try {
            // Safeguard
            if (!this.units || !req || req.status !== 'pending') return;

            // Find nearest capable worker who is NOT already working/busy
            let bestUnit = null;
            let minDistSq = Infinity; // GLOBAL SEARCH

            const logicalW = this.terrain.logicalWidth || 160;
            const logicalD = this.terrain.logicalDepth || 160;

            let debugScanned = 0;
            let debugBusy = 0;
            let debugRole = 0;
            let debugValid = 0;

            for (const unit of this.units) {
                if (unit.isDead) continue;
                if (unit.role !== 'worker') {
                    debugRole++; continue;
                }
                debugScanned++;

                let scorePenalty = 0;


                // Preemption Logic: STRICTLY Prefer FREE units.
                // MODIFIED: Allow interrupting units in low-priority states (Wander, Moving, Idle) if Request is MANUAL.
                // If Request is AUTO (Low Priority), respect "Moving" (Approaching) units to prevent juggling.

                // Strictly Busy States (Never Interrupt)
                // MODIFIED: 'Migrating' is now interruptible by MANUAL requests.
                // 'Building' is also interruptible if it just started or is low priority? 
                // No, 'Building' is a finished action.
                if (unit.action === 'Working' || unit.action === 'Building' || unit.action === 'Harvesting') {
                    debugBusy++;
                    continue;
                }

                // Manual jobs is IMMUNE to preemption from other sync assignments
                if (unit.targetRequest && unit.targetRequest.isManual) {
                    continue;
                }

                // If new job is AUTO (not manual), don't interrupt units already having a job
                if (unit.targetRequest && !req.isManual) {
                    continue;
                }

                // Fighting and Sleeping are normally busy, but can be preempted by requests
                // Since all requests are now treated as "Manual"/High Priority, we allow preemption.
                const isFightingOrSleeping = unit.state && (unit.state.constructor.name === 'CombatState' || unit.state.constructor.name === 'SleepState');
                if (isFightingOrSleeping) {
                    // Preemption allowed but penalized slightly?
                    scorePenalty += 50;
                }

                // Distance Score
                const dist = unit.getDistance(req.x, req.z);
                const totalScore = dist + scorePenalty;

                if (totalScore < minDistSq) {
                    minDistSq = totalScore;
                    bestUnit = unit;
                }
            }

            // Assign to best unit found
            if (bestUnit) {
                this.claimRequest(bestUnit, req);
            }

        } catch (e) {
            console.error("[Game] assignRequestSync error:", e);
        }
    }

    // Legacy Alias
    forceAssignRequest(req) {
        this.assignRequestSync(req);
    }

    detectZombieRequests() {
        // Runs occasionally to fix sync errors
        if (!this.units || !this.requestQueue) return;

        for (const req of this.requestQueue) {
            if (req.status === 'assigned' && req.assignedTo !== null) {
                // Find unit
                const u = this.units.find(unit => String(unit.id) === String(req.assignedTo));

                // Zombie Case 1: Unit invalid/dead
                if (!u || u.isDead) {
                    console.log(`[Game] Detected ZOMBIE Request req_${req.id} (Assigned to Dead/Missing ${req.assignedTo}). Resetting.`);
                    req.status = 'pending';
                    req.assignedTo = null;
                    if (req.mesh) req.mesh.material = this.markerMaterial;
                    continue;
                }

                // Zombie Case 2: Unit forgot about request (or ID mismatch)
                // Use ID comparison because object references might differ after load
                if (!u.targetRequest || String(u.targetRequest.id) !== String(req.id)) {
                    console.log(`[Game] Detected ZOMBIE Request req_${req.id} (Assigned to ${u.id}, but unit has ${u.targetRequest ? u.targetRequest.id : 'null'}). Resetting.`);
                    req.status = 'pending';
                    req.assignedTo = null;
                    if (req.mesh) req.mesh.material = this.markerMaterial;
                }
            }
        }
    }



    claimRequest(unit, req) {
        if (!unit || !req) return false;
        if (req.status === 'assigned' && String(req.assignedTo) === String(unit.id)) return true; // Already assigned

        // Global Cooldown Check (Double check for race conditions)
        if (req.excludedUntil && req.excludedUntil > this.simTotalTimeSec) {
            if (req.status === 'assigned' && String(req.assignedTo) === String(unit.id)) return true; // Already assigned
            return false; // Cannot claim if excluded and not already assigned to this unit
        }

        // 1. CLEAR OLD ASSIGNMENT (If snatching from someone else)
        if (req.status === 'assigned' && req.assignedTo !== null) {
            const oldUnit = this.units.find(u => String(u.id) === String(req.assignedTo));
            if (oldUnit) {
                oldUnit.targetRequest = null;
                oldUnit.isMoving = false; // Stop moving towards stolen job
                // If old unit was approaching, it should rethink.
                if (oldUnit.changeState) {
                    const nextState = oldUnit.getDefaultState ? oldUnit.getDefaultState() : "Wander";
                    oldUnit.changeState(nextState);
                }
            }
        }

        // 2. DETACH SELF FROM OLD JOBS
        if (unit.targetRequest && unit.targetRequest.id !== req.id) {
            this.releaseRequest(unit, unit.targetRequest);
        }

        // 3. ATOMIC ASSIGNMENT
        req.status = 'assigned';
        req.assignedTo = unit.id;
        req.assignedAt = this.simTotalTimeSec; // Track when it was assigned for Watchdog
        unit.targetRequest = req;

        // COMBAT CLEAR: Stop fighting to work
        unit.targetGoblin = null;
        unit.targetBuilding = null;
        unit.isSleeping = false; // Awake when assigned a job
        unit.action = 'Approaching Job';
        unit.isMoving = false; // INTERRUPT: Stop any current walk (Wander/Patrol) to react to Job!
        unit.lastPathTime = 0; // Force immediate pathfinding for new job

        // CRITICAL: Ensure JobState is active and fresh
        if (unit.changeState) {
            unit.changeState(new JobState(unit));
        }

        // console.log(`[Game] Request ${req.id} assigned to Unit ${unit.id}`);
        return true;
    }

    deferRequest(req, durationSeconds) {
        if (!req) return;
        req.status = 'pending';
        req.assignedTo = null;
        req.excludedUntil = (this.simTotalTimeSec || 0) + durationSeconds;

        console.log(`[Game] Request ${req.id} Deferred (Excluded) for ${durationSeconds}s until ${req.excludedUntil.toFixed(1)}`);
    }

    releaseRequest(unit, req) {
        if (!req) return;
        if (String(req.assignedTo) === String(unit.id)) {
            req.assignedTo = null;
            if (req.status === 'assigned') {
                req.status = 'pending';
                this.forceAssignRequest(req);
            }
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

            // Notify units assigned to this request
            if (actualReq.assignedTo !== null && actualReq.assignedTo !== undefined) {
                const u = this.units.find(unit => unit.id === actualReq.assignedTo);
                if (u && u.targetRequest && u.targetRequest.id === actualReq.id) {
                    u.targetRequest = null;
                    if (u.changeState) u.changeState(u.getDefaultState ? u.getDefaultState() : "Wander");
                }
            }

            console.log(`[Game] Request ${actualReq.id} removed and assignments cleared.`);
        }
    }

    tryCancelRequest(x, z) {
        if (!this.requestQueue) return false;
        const radius = 3.0; // Search radius

        const idx = this.requestQueue.findIndex(r => {
            let dx = Math.abs(r.x - x);
            let dz = Math.abs(r.z - z);
            if (this.terrain) {
                if (dx > this.terrain.logicalWidth / 2) dx = this.terrain.logicalWidth - dx;
                if (dz > this.terrain.logicalDepth / 2) dz = this.terrain.logicalDepth - dz;
            }
            return (dx * dx + dz * dz) < (radius * radius);
        });

        if (idx !== -1) {
            const req = this.requestQueue[idx];
            console.log(`[Game] Cancelling Request ${req.id} at ${req.x},${req.z}`);

            // 1. Release assigned unit
            if (req.assignedTo !== null && req.assignedTo !== undefined) {
                const unit = this.units.find(u => String(u.id) === String(req.assignedTo));
                if (unit) {
                    unit.targetRequest = null;
                    if (unit.resetToDefaultState) {
                        unit.resetToDefaultState();
                    } else if (unit.changeState) {
                        const nextState = unit.getDefaultState ? unit.getDefaultState() : new UnitWanderState(unit);
                        unit.changeState(nextState);
                    }
                }
            }

            // 2. Visual cleanup
            if (req.mesh) {
                if (req.mesh.parent) req.mesh.parent.remove(req.mesh);
                else if (this.scene) this.scene.remove(req.mesh);

                if (req.mesh.geometry) req.mesh.geometry.dispose();
                if (req.mesh.material) {
                    const mats = Array.isArray(req.mesh.material) ? req.mesh.material : [req.mesh.material];
                    mats.forEach(m => { if (m && m.dispose) m.dispose(); });
                }
            }

            // 3. Remove and Refund
            this.requestQueue.splice(idx, 1);
            if (this.consumeMana) this.consumeMana(-10); // Refund
            return true;
        }
        return false;
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

    checkExpiredRequests(currentTime) {
        // Timeout: 300s (5 Minutes) - User wants orders to persist until done.
        // Was 45s, which is too short for a queue of 10+ items with few workers.
        const TIMEOUT = 300;

        // Iterate backwards to safe splice
        for (let i = this.requestQueue.length - 1; i >= 0; i--) {
            const req = this.requestQueue[i];

            // 1. ZOMBIE WATCHDOG: Check for Broken Assignments
            if (req.status === 'assigned') {
                const assigneeId = req.assignedTo;
                // If ID is present, verify unit exists and knows about job
                if (assigneeId !== null) {
                    const unit = this.units.find(u => String(u.id) === String(assigneeId));

                    let isBroken = false;
                    if (!unit) isBroken = true; // Unit vanished
                    else if (unit.isDead) isBroken = true; // Unit dead
                    else if (!unit.targetRequest || String(unit.targetRequest.id) !== String(req.id)) {
                        // Unit dropped job (e.g. interruption) without Releasing?
                        // Or unit has a different job?
                        isBroken = true;
                    } else if (unit.targetGoblin || (unit.targetBuilding && unit.targetBuilding.userData && unit.targetBuilding.userData.hp > 0)) {
                        // ZOMBIE CHECK ENHANCEMENT: Unit is busy fighting!
                        // FIX: Only reset if they have been assigned FOR OVER 60s and still haven't reached.
                        // And check assignedAt, not createdAt!
                        const assignedAt = req.assignedAt || req.createdAt;
                        if (currentTime - assignedAt > 60.0) isBroken = true;
                    } else if (unit.action === 'Going to Work' || unit.action === 'Approaching Job') {
                        // Movement Watchdog
                        const assignedAt = req.assignedAt || req.createdAt;
                        if (currentTime - assignedAt > 120.0) isBroken = true; // 2 Minute travel timeout
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

                if (currentTime - req.lastAttempt > 0.2) {
                    const pendingDuration = currentTime - req.createdAt;
                    if (pendingDuration > 60.0 && pendingDuration % 10.0 < 1.0) {
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

                // Keep for 0.2 seconds to show "Green" success state (Reduced from 0.5s)
                if (currentTime - req.completedAt > 0.2) {
                    // console.log(`[Game] Removing Completed Request ${req.id}`);
                    if (req.mesh) {
                        this.scene.remove(req.mesh);
                        if (req.mesh.geometry) req.mesh.geometry.dispose();
                        if (req.mesh.material) {
                            const materials = Array.isArray(req.mesh.material) ? req.mesh.material : [req.mesh.material];
                            materials.forEach(m => { if (m && typeof m.dispose === 'function') m.dispose(); });
                        }
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
                    if (req.mesh.material) {
                        const materials = Array.isArray(req.mesh.material) ? req.mesh.material : [req.mesh.material];
                        materials.forEach(m => { if (m && typeof m.dispose === 'function') m.dispose(); });
                    }
                    req.mesh = null; // Prevent dangling ref
                }

                this.requestQueue.splice(i, 1);
            }
        }

        // BATCH ASSIGNMENT: Process up to 50 pending requests per frame
        this.processAssignments(50);
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
                    const materials = Array.isArray(p.mesh.material) ? p.mesh.material : [p.mesh.material];
                    materials.forEach(m => { if (m && typeof m.dispose === 'function') m.dispose(); });
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
                if (p.mesh.material) {
                    const materials = Array.isArray(p.mesh.material) ? p.mesh.material : [p.mesh.material];
                    materials.forEach(m => { if (m && typeof m.dispose === 'function') m.dispose(); });
                }
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
        if (unit.id === 0 || Math.random() < 0.1) {
            console.log(`[Game] Unit ${unit.id} completing Request ${req.type} at ${req.x},${req.z}`);
        }

        // Execute Action (Safely)
        let success = true;
        try {
            const tx = Math.round(req.x);
            const tz = Math.round(req.z);

            if (req.type === 'raise') {
                this.terrain.raise(tx, tz);
            } else if (req.type === 'lower') {
                this.terrain.lower(tx, tz);
            } else if (req.type === 'build_tower') {
                this.terrain.addBuilding('tower', tx, tz);
            } else if (req.type === 'build_barracks') {
                this.terrain.addBuilding('barracks', tx, tz);
            }
        } catch (e) {
            console.error(`[Game] Request Execution Failed for ${req.type} at ${req.x},${req.z}:`, e);
            success = false;
        }

        if (success) {
            // Mark as Completed (Handled by checkExpiredRequests for visual delay + removal)
            req.status = 'completed';
            req.completedAt = this.simTotalTimeSec;

            // Visual Feedback: Turn Green immediately
            if (req.mesh) {
                if (req.mesh.material && req.mesh.material.uniforms) {
                    req.mesh.material.uniforms.uColor.value.setHex(0x00FF00);
                }
            }
        } else {
            // If failed (e.g. invalid location), remove immediately to prevent getting stuck
            this.removeRequest(req);
        }
    }

    updateCameraControls() {
        if (this.controls) this.controls.update();

        // Update clipping planes
        // Sync with Controls Target (LookAt point) instead of Camera Position
        // This ensures clipping is centered on what the user is actually looking at
        let cx, cz;
        if (this.controls && this.controls.target) {
            cx = this.controls.target.x;
            cz = this.controls.target.z;
        } else {
            cx = this.camera.position.x;
            cz = this.camera.position.z;
        }

        const viewRadius = this.viewRadius || 120; // Use configured radius (GameConfig.render.viewRadius)

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

        const elHouse = document.getElementById('house-val');
        if (elHouse) elHouse.innerText = this.terrain.buildings.filter(b => b.userData.type === 'house').length;
        // document.getElementById('castle-val').innerText = ... (Removed from UI)
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

        this.updateButtonStates();
    }

    updateButtonStates() {
        const mana = this.mana || 0;

        // 1. Barracks Logic
        const barracksCount = this.terrain ? this.terrain.buildings.filter(b => b.userData.type === 'barracks').length : 0;
        // Threshold: 0 -> 1000, 1 -> 2000, 2 -> 3000... (Example Scaling)
        // User said: "1000 for first, 2000 for next (if 1 exists)".
        const barracksCost = 1000 * (barracksCount + 1);

        const btnBarracks = document.getElementById('btn-barracks');
        if (btnBarracks) {
            // Check if affordable
            if (mana < barracksCost) {
                btnBarracks.disabled = true;
                btnBarracks.style.opacity = '0.5';
                btnBarracks.style.pointerEvents = 'none';
            } else {
                btnBarracks.disabled = false;
                btnBarracks.style.opacity = '1.0';
                btnBarracks.style.pointerEvents = 'auto';
            }
        }

        // 2. Tower Logic (Same as Barracks?)
        // User: "Barracks, Tower... if restricted". Assuming same logic for now.
        const towerCount = this.terrain ? this.terrain.buildings.filter(b => b.userData.type === 'tower').length : 0;
        const towerCost = 1000 * (towerCount + 1);

        const btnTower = document.getElementById('btn-tower');
        if (btnTower) {
            if (mana < towerCost) {
                btnTower.disabled = true;
                btnTower.style.opacity = '0.5';
                btnTower.style.pointerEvents = 'none';
            } else {
                btnTower.disabled = false;
                btnTower.style.opacity = '1.0';
                btnTower.style.pointerEvents = 'auto';
            }
        }

        // 3. Worker Spawn Logic
        // "Worker generation... cannot press if mana restricted"
        // Let's assume a cost of 50 for manual spawn.
        const spawnCost = 50;
        const btnSpawn = document.getElementById('btn-spawn');
        if (btnSpawn) {
            if (mana < spawnCost) {
                btnSpawn.disabled = true;
                btnSpawn.style.opacity = '0.5';
                btnSpawn.style.pointerEvents = 'none';
            } else {
                btnSpawn.disabled = false;
                btnSpawn.style.opacity = '1.0';
                btnSpawn.style.pointerEvents = 'auto';
            }
        }
    }

    animate() {
        if (!this.gameActive && this.stopped) return; // Prevent restart if stopped
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        // Performance: Frame Counter for Time Slicing
        this.frameCounter = (this.frameCounter || 0) + 1;

        const time = performance.now();
        // Cap max deltaTime to prevent explosion on tab switch, but apply timeScale
        let deltaTime = Math.min((time - this.lastTime) / 1000, 0.1);
        this.lastTime = time;

        this.lastTime = time;

        // --- START SCREEN GATE ---
        // if (!this.gameActive) ... (Removed early return to allow preview)

        // Heartbeat
        if (!this.lastHeartbeat || time - this.lastHeartbeat > 5000) {
            this.lastHeartbeat = time;
        }

        let isNight = false;

        if (this.gameActive) {
            // Apply Speed Multiplier
            deltaTime *= (this.timeScale || 1.0);

            // PERFORMANCE: Global Unit Scan Budget (Shared across all units)
            // Limit expensive spatial queries per frame to prevent CPU lock at high pop.
            // 7700 units / 20 frames = 385 scans/frame -> Too heavy.
            // Limit to ~50-100 per frame.
            this.unitScanBudget = 100;
            if (this.units.length > 5000) this.unitScanBudget = 50;

            // Accumulate SIMULATED time in SECONDS
            if (this.simTotalTimeSec === undefined) this.simTotalTimeSec = (this.gameTotalTime || 0) / 1000;
            this.simTotalTimeSec += deltaTime;
            const simTimeSec = this.simTotalTimeSec;

            // パフォーマンス測定: 更新処理開始
            if (this.performanceMonitor) this.performanceMonitor.startUpdate();

            try {
                isNight = this.updateEnvironment(deltaTime);
                this.updateSeasons(deltaTime);
                if (this.terrain) {
                    // Terrain.update() 内の updatePopulation() は house/barracks のみを更新
                    this.terrain.update(deltaTime, this.handleBuildingSpawn.bind(this), isNight);

                    // CRITICAL: cave/goblin_hut は自律的に成長するため、個別に update() を呼ぶ必要がある
                    // Terrain.updatePopulation() は house/barracks のみを処理するため
                    if (this.terrain.buildings) {
                        this.terrain.buildings.forEach(b => {
                            if (b.update && (b.type === 'cave' || b.type === 'goblin_hut')) {
                                b.update(simTimeSec, deltaTime);
                            }
                        });
                    }
                }
            } catch (e) { console.error("Env/Season Error:", e); }

            // Check for Request Timeouts
            this.checkExpiredRequests(simTimeSec);
            this.updateRequestMarkers();

            // --- ZOMBIE WATCHDOG (Fix: Ghost Assignments) ---
            if (this.frameCount % 60 === 0) { // Approx once per second
                this.detectZombieRequests();
            }

            // --- BATTLE HOTSPOTS & MOBILIZATION ---
            this.updateBattleHotspots(deltaTime);
            this.updateSquadMobilization(deltaTime);

            // パフォーマンス測定: 更新処理終了
            if (this.performanceMonitor) this.performanceMonitor.endUpdate();
        } else {
            // Preview Mode: Just update lights/visuals sparingly
            if (this.terrain) {
                // Force static time or slow rotation? Just basic update for visuals (water shader)
                // Pass 0 delta to avoid simulation updates if any
                this.terrain.update(0.01, null, false);
            }
        }

        try {
            this.updateCameraControls();
        } catch (e) { console.error("Cam Error:", e); }

        try {
            this.updateStats();
        } catch (e) { console.error("Stats Error:", e); }

        if (this.gameActive) {
            // --- MANA SYSTEM ---
            const pop = (this.totalPopulation || 0);
            const manaDelta = pop * 0.1 * deltaTime;
            this.mana += manaDelta;

            try {
                this.inputManager.update(deltaTime);
            } catch (e) { console.error("Input Error:", e); }
        }

        // Cloud update moved to consolidated block later

        // Calculate Frustum for Culling
        this.camera.updateMatrixWorld();
        this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();

        const frustum = new THREE.Frustum();
        const projScreenMatrix = new THREE.Matrix4();
        projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(projScreenMatrix);

        // Manager updates moved to consolidated block later

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
        const timeVal = this.simTotalTimeSec || 0;
        if (this.markerTime === undefined) this.markerTime = 0;
        this.markerTime += deltaTime;
        try {
            for (const req of this.requestQueue) {
                if (req.mesh) {
                    const materials = Array.isArray(req.mesh.material) ? req.mesh.material : [req.mesh.material];
                    materials.forEach(m => {
                        if (m && m.uniforms && m.uniforms.uTime) {
                            m.uniforms.uTime.value = this.markerTime;
                        }
                    });
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

        if (this.gameActive) {

            try {
                // Pre-calc camera position to avoid repetitive access
                const camX = this.camera ? this.camera.position.x : 0;
                const camZ = this.camera ? this.camera.position.z : 0;
                const hasCamera = !!this.camera;

                // Time Slicing & Throttling
                // More aggressive throttling for distant units to handle 2000+ entities
                const INTERVAL_NEAR = 2;   // 30 FPS (Every 2nd frame)
                const INTERVAL_MID = 4;    // 15 FPS (Improved from 10/6FPS) for "Clunky" report @ 200 units
                const INTERVAL_FAR = 30;   // 2 FPS (Reduced from 1 FPS for smoothness/responsiveness balance)
                const INTERVAL_VERY_FAR = 60; // 1 FPS (For > 120 units away)

                const DIST_NEAR_SQ = 60 * 60; // 60 units (Increased from 40 for smoother zoom-out)
                const DIST_FAR_SQ = 90 * 90;  // 90 units (Shifted out)
                const DIST_VERY_FAR_SQ = 130 * 130; // 130 units

                for (let i = this.units.length - 1; i >= 0; i--) {
                    const unit = this.units[i];

                    // 1. Dynamic Time-Sliced Logic Update
                    let interval = INTERVAL_NEAR;
                    let distSq = 0;

                    if (hasCamera) {
                        const dx = unit.position.x - camX;
                        const dz = unit.position.z - camZ;
                        distSq = dx * dx + dz * dz;

                        if (distSq > DIST_VERY_FAR_SQ) {
                            interval = INTERVAL_VERY_FAR;
                        } else if (distSq > DIST_FAR_SQ) {
                            interval = INTERVAL_FAR;
                        } else if (distSq > DIST_NEAR_SQ) {
                            interval = INTERVAL_MID;
                        }
                    }

                    // 2. Throttled Position/Height Updates (Visuals)
                    // Only update Movement/Height every few frames for distant units to save CPU
                    // FIX: Clamp max throttle to 3 frames (~20FPS) to prevent visual stutter even if Logic is slow (1FPS)
                    // Adjusted: Only throttle if interval is VERY high (>30). Medium distance should be smooth.
                    const moveInterval = (interval > 30) ? 3 : 1;
                    if ((this.frameCount + i) % moveInterval === 0) {
                        if (unit.updateMovement) unit.updateMovement(this.simTotalTimeSec);
                    }

                    // Force full update for selected unit or very close? Not needed if smooth enough.

                    // Spread updates evenly using unit ID or index
                    // (frameCount + i) ensure 1/N units update each frame
                    if ((this.frameCount + i) % interval === 0) {
                        try {
                            // Scale deltaTime by interval to compensate for infrequent updates?
                            // Logic usually relies on "total time" or "state duration", not integration.
                            // But cooldowns (dt) need to be accumulated.
                            // Unit.updateLogic(time, dt)
                            // We should pass 'deltaTime * interval' so timers tick correctly.
                            const logicDt = deltaTime * interval;

                            unit.updateLogic(this.simTotalTimeSec, logicDt, isNight, this.goblinManager.goblins);
                        } catch (e) {
                            console.error("Unit Logic Error:", e, unit);
                        }

                        // Dead checks only needed on logic updates
                        if (unit.isDead && unit.isFinished) {
                            this.units.splice(i, 1);
                        }
                    }
                }
            } catch (e) {
                console.error("Unit Loop Error:", e);
            }
        }

        try {
            if (this.gameActive) {
                // Consolidate Manager Updates
                this.frustum = frustum; // Store for other uses
                if (this.cloudManager) this.cloudManager.update(deltaTime, this.camera);
                if (this.birdManager) this.birdManager.update(deltaTime, this.simTotalTimeSec, frustum);
                if (this.sheepManager) this.sheepManager.update(this.simTotalTimeSec, deltaTime);
                if (this.fishManager) this.fishManager.update(this.simTotalTimeSec, deltaTime, frustum);
                if (this.goblinManager) this.goblinManager.update(this.simTotalTimeSec, deltaTime, false, this.units, this.timeScale, this.camera);

                // Terrain update already happened above line 1350, but let's ensure it's not double updated if possible.
                // Wait, if terrain.update happens twice, that's bad for building timers.
                // Removing this one.
            }
        } catch (e) { console.error("Manager Update Error:", e); }
        if (this.controls && this.controls.enabled) this.controls.update();

        // SKIP RENDERER UPDATES DURING LOADING
        // This prevents heavy mesh rebuilding while data is being populated asynchronously
        if (this.isLoading) {
            this.renderer.render(this.scene, this.camera);
            if (this.performanceMonitor) {
                this.performanceMonitor.endRender();
                this.performanceMonitor.update(this);
            }
            return;
        }

        try {
            // ALWAYS update visual mesh position and lights for preview
            this.terrain.updateMeshPosition(this.camera);
            this.terrain.updateLights(this.gameTime);

            // Update Clipping Planes to Follow Camera
            if (this.clippingPlanes && this.clippingPlanes.length === 4) {
                // Use camera target (focus point) instead of camera position for isometric view clipping
                const cx = (this.controls && this.controls.target) ? this.controls.target.x : (this.camera ? this.camera.position.x : 0);
                const cz = (this.controls && this.controls.target) ? this.controls.target.z : (this.camera ? this.camera.position.z : 0);
                const r = this.viewRadius || 30;

                // Planes:
                // 0: (1,0,0) -> x + d > 0 -> x > -d. We want x > cx - r. So -d = cx - r => d = -cx + r.
                // 1: (-1,0,0)-> -x + d > 0 -> x < d. We want x < cx + r. So d = cx + r.
                // 2: (0,0,1) -> z + d > 0 -> z > -d. We want z > cz - r. So d = -cz + r.
                // 3: (0,0,-1)-> -z + d > 0 -> z < d. We want z < cz + r. So d = cz + r.

                this.clippingPlanes[0].constant = -cx + r;
                this.clippingPlanes[1].constant = cx + r;
                this.clippingPlanes[2].constant = -cz + r;
                this.clippingPlanes[3].constant = cz + r;
            }
        } catch (e) { console.error("Terrain Visuals Error:", e); }


        if (this.buildingRenderer) {
            this.buildingRenderer.updateLighting(isNight);
        }

        // Update Unit Renderer
        if (this.unitRenderer) {
            try {
                this.unitRenderer.update(this.units, frustum, this.controls ? this.controls.target : this.camera.position);
            } catch (e) { console.error("UnitRenderer Error:", e); }
        }

        // Update Building Renderer
        if (this.buildingRenderer) {
            try {
                this.buildingRenderer.update(this.terrain.buildings, frustum, this.controls ? this.controls.target : this.camera.position);
            } catch (e) { console.error("BuildingRenderer Error:", e); }
        }

        // Update Goblin Renderer
        if (this.goblinManager && this.goblinManager.renderer) {
            try {
                this.goblinManager.renderer.update(this.goblinManager.goblins, this.controls ? this.controls.target : this.camera.position);
            } catch (e) { console.error("GoblinRenderer Error:", e); }
        }

        // パフォーマンス測定: レンダリング開始
        if (this.performanceMonitor) this.performanceMonitor.startRender();

        this.renderer.render(this.scene, this.camera);

        // パフォーマンス測定: レンダリング終了 & 更新
        if (this.performanceMonitor) {
            this.performanceMonitor.endRender();
            this.performanceMonitor.update(this);
        }
    }

    saveGame(slotId) {
        if (!this.saveManager) return false;
        try {
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
                units: this.units.map(u => u.serialize()),
                requests: this.requestQueue.map(req => ({
                    id: req.id,
                    type: req.type,
                    x: req.x,
                    z: req.z,
                    status: req.status,
                    assignedTo: req.assignedTo,
                    assignedAt: req.assignedAt,
                    createdAt: req.createdAt,
                    isManual: req.isManual,
                })),
                gameTime: this.gameTime,
                goblinManager: this.goblinManager ? this.goblinManager.serialize() : null,
                // Camera State
                camera: {
                    position: { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
                    zoom: this.camera.zoom,
                    target: this.controls && this.controls.target ?
                        { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z } :
                        { x: 0, y: 0, z: 0 }
                },
            };
            return this.saveManager.save(slotId, saveData);
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }

    startNewGame() {
        if (this.gameActive) return;

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

        this.gameActive = true;
        this.lastTime = performance.now(); // Reset lastTime to avoid huge delta

        // Show UI
        const ui = document.getElementById('ui');
        if (ui) ui.style.display = 'flex';

        console.log("[Game] Start New Game!");
    }

    regenerateWorld() {
        console.log("[Game] Regenerating World...");
        this.gameActive = false; // Pause sim

        // 1. Reset Terrain
        if (this.terrain) {
            this.terrain.buildings = [];
            this.terrain.generateRandomTerrain();
            // Force visual update
            this.terrain.updateMesh();
            this.terrain.updateColors(this.season || 'Spring', false);
        }

        // 2. Clear Units / Goblins
        if (this.units) {
            this.units.forEach(u => {
                if (u.dispose) u.dispose();
                this.scene.remove(u.mesh);
                if (u.crossMesh) this.scene.remove(u.crossMesh);
            });
            this.units = [];
        }

        if (this.goblinManager) {
            this.goblinManager.reset();
            // Note: generateRandomTerrain also nukes buildings, but goblinManager tracks caves too?
            // Need to rescan/regen caves maybe?
            // GoblinManager has 'scanForCaves' but terrain is fresh. 
            // In fact, generateRandomTerrain only makes land. 
            // We should let GoblinManager init caves if needed, or leave empty until Start.
            // Actually, for PREVIEW, maybe we want to see caves?
            // Let's call generateCaves!
            if (this.goblinManager.generateCaves) this.goblinManager.generateCaves();
        }

        // 3. Clear Requests
        if (this.requestQueue) {
            this.requestQueue.forEach(req => {
                if (req.mesh) this.scene.remove(req.mesh);
            });
            this.requestQueue = [];
        }

        // 4. Reset Camera (Preview Angle)
        // Find a nice spot? Center is usually safe.
        // Or pick a random spot like Spawn?
        const rW = this.terrain.logicalWidth || 80;
        const rD = this.terrain.logicalDepth || 80;
        const cx = Math.floor(Math.random() * rW);
        const cz = Math.floor(Math.random() * rD);
        const h = this.terrain.getTileHeight(cx, cz);

        const wx = cx - (rW / 2);
        const wz = cz - (rD / 2);

        if (this.controls) {
            this.controls.target.set(wx, h, wz);
            this.camera.position.set(wx + 30, h + 30, wz + 30);
            this.controls.update();
        }

        console.log("[Game] World Regenerated.");
    }

    async loadGame(slotId) {
        if (!this.saveManager) return false;

        // Simulation Guard: Disable updates during async load
        const wasActive = this.gameActive;
        this.gameActive = false;

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

        try {
            // Time Slicing Yield Logic
            let lastYieldTime = performance.now();
            const checkYield = async () => {
                if (performance.now() - lastYieldTime > 16) {
                    await new Promise(r => setTimeout(r, 0));
                    lastYieldTime = performance.now();
                    return true;
                }
                return false;
            };

            // Small delay to let UI render (yield)
            if (loadingText) loadingText.innerText = 'Reading Data...';
            await new Promise(r => setTimeout(r, 50));

            const saveData = this.saveManager.load(slotId);
            if (!saveData) {
                console.error("Load Game Failed: No data for slot", slotId);
                if (loadingScreen) loadingScreen.style.display = 'none';
                return false;
            }
            console.log("Load Game: Data found", saveData);

            if (loadingText) loadingText.innerText = 'Cleaning Up...';
            // await checkYield(); // Let UI update 'Cleaning Up'
            await new Promise(r => setTimeout(r, 16));

            // Show UI
            const ui = document.getElementById('ui');
            if (ui) ui.style.display = 'flex';

            // Reset Systems
            if (this.goblinManager) this.goblinManager.reset();
            this.clearProjectiles();

            // FIX: Clear Request Queue and visual markers on load
            if (this.requestQueue) {
                for (const req of this.requestQueue) {
                    if (req.mesh) {
                        this.scene.remove(req.mesh);
                        if (req.mesh.geometry) req.mesh.geometry.dispose();
                        if (req.mesh.material) {
                            const materials = Array.isArray(req.mesh.material) ? req.mesh.material : [req.mesh.material];
                            materials.forEach(m => { if (m && typeof m.dispose === 'function') m.dispose(); });
                        }
                    }
                    await checkYield();
                }
                this.requestQueue = [];
            }

            // FIX: Dispose old renderers to prevent "Ghost" meshes (duplicates)
            if (this.buildingRenderer && this.buildingRenderer.dispose) this.buildingRenderer.dispose();
            if (this.goblinRenderer && this.goblinRenderer.dispose) this.goblinRenderer.dispose();
            if (this.unitRenderer && this.unitRenderer.dispose) this.unitRenderer.dispose();

            // Chunked / Async Deserialization to prevent freeze
            console.log('[Game] Deserializing terrain...');
            await this.terrain.deserialize(saveData.terrain, (pct) => {
                const scaledPct = Math.floor(pct * 0.5); // 0% -> 50%
                if (loadingBar) loadingBar.style.width = scaledPct + '%';
                if (loadingText) loadingText.innerText = scaledPct + '%';
            });

            console.log('[Game] Terrain deserialized.');

            if (loadingText) loadingText.innerText = 'Initializing Renderers...';
            // await new Promise(r => setTimeout(r, 16));

            if (loadingText) loadingText.innerText = 'Initializing Buildings...';
            this.buildingRenderer = new BuildingRenderer(this.scene, this.terrain, this.clippingPlanes);
            await this.buildingRenderer.init();

            await checkYield();

            if (loadingText) loadingText.innerText = 'Initializing Goblins...';
            // FIX: Re-link GoblinManager renderer correctly and dispose old one
            if (this.goblinManager && this.goblinManager.renderer && this.goblinManager.renderer.dispose) {
                this.goblinManager.renderer.dispose();
            }
            this.goblinRenderer = new GoblinRenderer(this.scene, this.terrain, this.clippingPlanes);
            await this.goblinRenderer.init();
            if (this.goblinManager) this.goblinManager.renderer = this.goblinRenderer;

            await checkYield();

            if (loadingText) loadingText.innerText = 'Initializing Units...';
            this.unitRenderer = new UnitRenderer(this.scene, this.terrain, this.clippingPlanes);
            await this.unitRenderer.init();

            await checkYield();

            // Re-link InputManager
            if (this.inputManager) this.inputManager.unitRenderer = this.unitRenderer;

            // Terrain Finished (~50%) -> Jump to 60% (Rebuild Mesh overhead)
            if (loadingBar) loadingBar.style.width = '60%';
            if (loadingText) loadingText.innerText = '60%';
            await checkYield();

            console.log('[Game] Loading resources/time...');
            this.resources = saveData.resources || { grain: 0, fish: 0, meat: 0 };
            this.gameTime = saveData.gameTime || 8;
            this.gameTotalTime = saveData.gameTotalTime || 0;
            this.simTotalTimeSec = this.gameTotalTime / 1000; // FIX: Sync runtime timer with saved time

            console.log('[Game] Updating environment...');
            // Immediate isNight update to ensure state consistency before unit logic runs
            this.updateEnvironment(0);
            await checkYield();

            // Restore Season
            this.currentSeasonIndex = saveData.currentSeasonIndex || 0;
            this.daysPassed = saveData.daysPassed || 0;

            const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
            this.season = SEASONS[this.currentSeasonIndex];
            if (this.terrain) this.terrain.setSeason(this.season);
            await checkYield();

            // Restore Units
            if (this.units) {
                this.units.forEach(u => {
                    if (u.dispose) u.dispose();
                    this.scene.remove(u.mesh);
                    if (u.crossMesh) this.scene.remove(u.crossMesh);
                });
            }
            this.units.length = 0; // Clear instead of replace reference

            if (saveData.units) {
                console.log(`[Game] Restoring ${saveData.units.length} units...`);
                try {
                    // Batch Restore Units
                    const totalUnits = saveData.units.length;
                    for (let i = 0; i < totalUnits; i++) {
                        // Time-based Yield
                        if (await checkYield()) {
                            // 60% -> 80%
                            const progress = 60 + Math.floor((i / totalUnits) * 20);
                            if (loadingBar) loadingBar.style.width = progress + '%';
                            if (loadingText) loadingText.innerText = progress + '%';
                        }

                        const uData = saveData.units[i];
                        const u = Unit.deserialize(uData, this.scene, this.terrain);
                        if (u) {
                            this.units.push(u);
                        }
                    }
                } catch (e) { console.error("CRITICAL Unit restore failed:", e); throw e; }
            }
            console.log(`[Game] Successfully restored ${this.units.length} units.`);

            // Restore Goblin Manager
            if (this.goblinManager) {
                if (saveData.goblinManager) {
                    this.goblinManager.deserialize(saveData.goblinManager);

                    // Diagnostic: Verify no Units in Goblin array
                    const mixedUnits = this.goblinManager.goblins.filter(g => g.type === 'unit' || g.role);
                    if (mixedUnits.length > 0) {
                        console.error(`[DIAGNOSTIC] Transformation Error Detected! ${mixedUnits.length} Units found in Goblin Manager!`, mixedUnits);
                    }
                } else {
                    this.goblinManager.scanForCaves();
                }
            }

            // Restore Requests (Persistent Instruction Markers)
            if (saveData.requests) {
                // FORCE RESET to prevent duplicates if user clicked during async load
                this.requestQueue.length = 0;
                console.log(`[Game] Restoring ${saveData.requests.length} requests...`);
                let maxId = 0;
                const totalReqs = saveData.requests.length;

                for (let i = 0; i < totalReqs; i++) {
                    if (await checkYield()) {
                        // 80% -> 90%
                        const progress = 80 + Math.floor((i / totalReqs) * 10);
                        if (loadingBar) loadingBar.style.width = progress + '%';
                        if (loadingText) loadingText.innerText = progress + '%';
                    }

                    const rData = saveData.requests[i];

                    // Parse ID
                    const parts = rData.id.split('_');
                    const idNum = parseInt(parts[parts.length - 1]);
                    if (!isNaN(idNum) && idNum > maxId) maxId = idNum;

                    // Recreate Visual Mesh
                    let h = this.terrain.getTileHeight(rData.x, rData.z);
                    if (h === undefined || isNaN(h)) h = 10;

                    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16, 1, true);

                    // Clone material with safety and color restoration
                    let material;
                    if (this.markerMaterial && this.markerMaterial.clone) {
                        material = this.markerMaterial.clone();
                        if (material.uniforms && material.uniforms.uColor) {
                            const colorHex = (rData.status === 'completed') ? 0x00FF00 : 0xFFFF00;
                            material.uniforms.uColor.value.setHex(colorHex);
                        }
                        material.clippingPlanes = this.clippingPlanes;
                    } else {
                        console.warn("[Game] Warning: markerMaterial missing on Load. Using fallback.");
                        material = new THREE.MeshBasicMaterial({ color: 0xFFFF00, transparent: true, opacity: 0.8 });
                    }

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.renderOrder = 2000; // CRITICAL: Ensure visibility over terrain
                    mesh.position.set(rData.x, h + 2, rData.z);
                    this.scene.add(mesh);

                    const req = {
                        id: rData.id,
                        type: rData.type,
                        x: rData.x,
                        z: rData.z,
                        status: rData.status,
                        assignedTo: rData.assignedTo,
                        assignedAt: rData.assignedAt || ((rData.status === 'assigned') ? ((this.gameTotalTime || 0) / 1000) : undefined),
                        createdAt: rData.createdAt || Date.now(),
                        // BACKWARD COMPATIBILITY: 
                        // If isManual matches, good. If missing (legacy save), auto-detect based on type.
                        isManual: (rData.isManual !== undefined) ? !!rData.isManual : ['raise', 'lower', 'flatten', 'wall', 'door', 'build_tower', 'build_barracks', 'build_farm', 'build_house', 'migration'].includes(rData.type),
                        mesh: mesh
                    };
                    this.requestQueue.push(req);
                }

                // Update ID Counter
                this.requestIdCounter = Math.max(this.requestIdCounter, maxId + 1);
            }

            // RE-LINK UNITS (Restoration)
            if (this.units) {
                let maxUnitId = -1;
                this.units.forEach(u => {
                    if (u.id > maxUnitId) maxUnitId = u.id;

                    // Link HomeBase
                    if (u.savedHomeBaseX !== undefined) {
                        const hb = this.terrain.getBuildingAt(u.savedHomeBaseX, u.savedHomeBaseZ);
                        if (hb) u.homeBase = hb;
                    }

                    // Link Request (Persistent)
                    if (u.savedTargetRequestId) {
                        // Type-safe comparison using String() to handle JSON string/number mismatch
                        const req = this.requestQueue.find(r => String(r.id) === String(u.savedTargetRequestId));
                        if (req) {
                            // CONFLICT CHECK: Prevent multiple units from claiming the same job
                            if (req.assignedTo && String(req.assignedTo) !== String(u.id)) {
                                const currentOwner = this.units.find(un => String(un.id) === String(req.assignedTo));
                                if (currentOwner) {
                                    console.warn(`[Game] Conflict: Unit ${u.id} tried to claim Job ${req.id}, but it is already owned by ${currentOwner.id}. Yielding to owner.`);
                                    u.targetRequest = null;
                                    u.savedTargetRequestId = null;
                                    // Unit remains in WanderState (set by Unit.deserialize)
                                    return; // Skip linking
                                }
                            }

                            u.targetRequest = req;
                            console.log(`[Game] Re-linked Unit ${u.id} to Request ${req.id}`);

                            // Fix Status
                            if (req.status === 'pending') req.status = 'assigned';
                            // Typed comparison: stringify for safety or use loose equality
                            if (String(req.assignedTo) !== String(u.id)) {
                                console.log(`[Game] Correcting Request ownership for ${req.id} ( ${req.assignedTo} -> ${u.id} )`);
                                req.assignedTo = u.id;
                            }

                            // Force Action Reset and STATE transition so StateMachine (JobState) picks it up
                            u.action = 'Going to Work';
                            if (u.changeState && typeof JobState !== 'undefined') {
                                u.changeState(new JobState(u));
                            }
                        } else {
                            u.targetRequest = null;
                        }
                        u.savedTargetRequestId = null;
                    }
                });

                // Restore Unit ID Counter
                Unit.nextId = maxUnitId + 1;

                // SANITY CHECK: Reset requests that are 'assigned' but owner is missing/mismatched
                this.requestQueue.forEach(req => {
                    if (req.status === 'assigned') {
                        const owner = this.units.find(u => String(u.id) === String(req.assignedTo));
                        if (!owner || !owner.targetRequest || String(owner.targetRequest.id) !== String(req.id)) {
                            console.log(`[Game] Ghost Assignment Cleaned: Request ${req.id} (assigned to ${req.assignedTo}) reset to pending.`);
                            req.status = 'pending';
                            req.assignedTo = null;
                        }
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

            // Force one render update to verify state
            if (this.buildingRenderer) this.buildingRenderer.forceUpdate = true;

            // Resume Engine
            this.isLoading = false;
            this.gameActive = true;
            this.lastTime = performance.now();
            return true;

        } catch (e) {
            console.error("Critical Load Error:", e);
            if (loadingScreen) loadingScreen.style.display = 'none';
            alert("Load Failed: " + e.message);
            this.gameActive = true; // Ensure game is not stuck in paused state
            return false;
        }
    }

    // --- SQUAD MANAGEMENT ---
    registerSquad(type) {
        if (!this.squads) this.squads = new Map();
        const id = Math.floor(Math.random() * 1000000);
        this.squads.set(id, {
            id: id,
            type: type,
            target: null, // {x, z, time}
            lastUpdate: this.simTotalTimeSec || 0
        });
        // console.log(`[Game] Registered Squad ${id} (${type})`);
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
                squad.target = { x: x, z: z, time: this.simTotalTimeSec };
                squad.lastUpdate = this.simTotalTimeSec;
            } else {
                // Refresh time
                if (squad.target) squad.target.time = this.simTotalTimeSec;
            }
        }

        // Also report to Global Hotspots (Total Mobilization)
        this.reportGlobalBattle(x, z);
    }

    updateBattleHotspots(deltaTime) {
        if (!this.battleHotspots) return;

        const now = this.simTotalTimeSec;
        const decayRate = 2.0; // intensity per second (Reduced from 5.0 for longer pursuit)

        this.battleHotspots = this.battleHotspots.filter(h => {
            // Intensity Decay
            h.intensity -= decayRate * deltaTime;

            // Age Decay (Timeout if no activity for 60s)
            const isTooOld = (now - h.time > 60.0);

            return h.intensity > 0 && !isTooOld;
        });
    }

    reportGlobalBattle(x, z) {
        if (!this.battleHotspots) this.battleHotspots = [];

        const now = this.simTotalTimeSec;
        const groupingDist = 15.0; // Max distance to group skirmishes

        // Find existing hotspot
        let existing = null;
        for (const h of this.battleHotspots) {
            const dx = h.x - x;
            const dz = h.z - z;
            if (Math.sqrt(dx * dx + dz * dz) < groupingDist) {
                existing = h;
                break;
            }
        }

        if (existing) {
            // Update Centroid (Weighted move towards new report)
            const weight = 0.2;
            existing.x = existing.x * (1 - weight) + x * weight;
            existing.z = existing.z * (1 - weight) + z * weight;

            // Increase Intensity (Cap at 100)
            existing.intensity = Math.min(100, (existing.intensity || 10) + 15); // Increased from 10
            existing.time = now;
        } else {
            // New Hotspot
            const regionId = this.terrain ? this.terrain.getRegion(x, z) : 0;
            this.battleHotspots.push({
                x: x,
                z: z,
                intensity: 40.0, // Initial intensity (Increased from 20)
                time: now,
                regionId: regionId
            });
            console.log(`[Game] New Battle Hotspot at ${x.toFixed(0)},${z.toFixed(0)} (Region:${regionId})`);
        }
    }

    updateSquadMobilization(deltaTime) {
        // Run mobilization check every 2 seconds to save CPU
        this.mobilizationTimer = (this.mobilizationTimer || 0) + deltaTime;
        if (this.mobilizationTimer < 2.0) return;
        this.mobilizationTimer = 0;

        if (!this.battleHotspots || this.battleHotspots.length === 0) return;
        if (!this.squads) return;

        const now = this.simTotalTimeSec;

        for (const [squadId, squad] of this.squads) {
            // Consider squad "Idle" if it has no target or target is very old (> 5s)
            // Reduced from 15s to 5s for faster response to new hotspots.
            const isIdle = !squad.target || (now - squad.target.time > 5.0);

            if (isIdle) {
                // Find best hotspot
                let bestHotspot = null;
                let maxScore = -Infinity;

                // Find a representative member for distance/region check
                const firstMember = this.units.find(u => u.squadId === squadId && !u.isDead);
                if (!firstMember) continue;

                const myRegion = this.terrain ? this.terrain.getRegion(firstMember.gridX, firstMember.gridZ) : 0;

                for (const h of this.battleHotspots) {
                    // REACHABILITY CHECK
                    if (h.regionId !== myRegion && h.regionId > 0 && myRegion > 0) continue;

                    const dist = Math.sqrt(Math.pow(h.x - firstMember.gridX, 2) + Math.pow(h.z - firstMember.gridZ, 2));

                    // Score = Intensity / Dist (Prefer intense nearby battles)
                    const score = h.intensity / (dist + 5.0);

                    if (score > maxScore) {
                        maxScore = score;
                        bestHotspot = h;
                    }
                }

                if (bestHotspot && maxScore > 0.2) { // Minimum threshold to mobilize (Lowered from 0.5)
                    console.log(`[Game] Mobilizing Squad ${squadId} to Hotspot at ${bestHotspot.x.toFixed(0)},${bestHotspot.z.toFixed(0)} (Intensity:${bestHotspot.intensity.toFixed(1)})`);
                    this.reportSquadTarget(squadId, bestHotspot.x, bestHotspot.z);
                }
            }
        }
    }


    getRegion(x, z) {
        if (!this.terrain || !this.terrain.grid) return -1;
        const logicalW = this.terrain.logicalWidth || 160;
        const logicalD = this.terrain.logicalDepth || 160;
        let rx = Math.floor(x);
        let rz = Math.floor(z);
        if (rx < 0) rx = (rx % logicalW + logicalW) % logicalW;
        else if (rx >= logicalW) rx = rx % logicalW;
        if (rz < 0) rz = (rz % logicalD + logicalD) % logicalD;
        else if (rz >= logicalD) rz = rz % logicalD;

        const c = this.terrain.grid[rx] ? this.terrain.grid[rx][rz] : null;
        return c ? c.regionId : -1;
    }

    stop() {
        this.gameActive = false;
        this.stopped = true;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    dispose() {
        this.stop();
        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }
        if (this.inputManager && this.inputManager.dispose) {
            this.inputManager.dispose();
        }
        if (this.controls && this.controls.dispose) {
            this.controls.dispose();
        }
        if (this.minimap && this.minimap.dispose) {
            this.minimap.dispose();
        }
    }
}
