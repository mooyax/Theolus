import * as THREE from 'three';
console.log('[DEBUG] Game.ts top-level load');
import { Terrain } from './Terrain';
import { InputManager } from './InputManager';
import { Unit } from './Unit';
import { Warship } from './Warship';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SaveManager } from './SaveManager';

import { CloudManager } from './CloudManager';
import { BirdManager } from './BirdManager';
import { SheepManager } from './SheepManager';
import { Wander, Job, Combat, Sleep } from './ai/states/UnitStates.js';

import { SoundManager } from './SoundManager';
import { GoblinManager } from './GoblinManager';
import { FishManager } from './FishManager';
import { WeatherManager, WeatherType } from './WeatherManager';

// Minimap switched to TS
import { Minimap } from './Minimap';

import { Compass } from './Compass';
import { UnitRenderer } from './UnitRenderer';
import { BuildingRenderer } from './BuildingRenderer';
import { GoblinRenderer } from './GoblinRenderer';
import { TreeRenderer } from './TreeRenderer.js';
import { PerformanceMonitor } from './PerformanceMonitor';

import { GameConfig, Levels } from './config/GameConfig'; // Direct Import
import { EnemyAI } from './ai/EnemyAI';
import { SmokeManager } from './SmokeManager';
import { SeaDecorationRenderer } from './SeaDecorationRenderer.js';
import { LandDecorationRenderer } from './LandDecorationRenderer.js';

export interface Squad {
    id: number;
    members: number[]; // Unit IDs
    target: { x: number, z: number, time?: number } | null;
    action: string;
    type?: string;
    lastUpdate?: number;
    time?: number;
}

export interface GameResource {
    grain: number;
    fish: number;
    meat: number;
}

export interface Request {
    id: string | number;
    type: string;
    x: number;
    z: number;
    status: 'pending' | 'assigned' | 'completed' | 'cancelled';
    assignedTo: number | null; // Unit ID
    data?: any;
    priority?: number;
    createdAt: number; // Standardized
    completedAt?: number;
    mesh?: THREE.Mesh | null;
    isManual?: boolean;
    excludedUntil?: number;
    lastAttempt?: number;
    building?: any;
    assignedAt?: number;
    faction?: string; // Added: Faction ownership
}

export class BattleMemory {
    public raids: { x: number, z: number, time: number, threat: number }[];

    constructor() {
        this.raids = []; // {x, z, time, threat}
    }

    reportRaid(x: number, z: number, time: number) {
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

    reportClear(x: number, z: number) {
        // Remove specific raid point after investigation (Investigated)
        this.raids = this.raids.filter(r => {
            const dx = r.x - x;
            const dz = r.z - z;
            // If within very close range (5.0), remove it
            return (dx * dx + dz * dz) > 25;
        });
    }

    serialize() {
        return this.raids;
    }

    deserialize(data: any[]) {
        if (Array.isArray(data)) {
            this.raids = data;
        }
    }

    getPriorities(currentTime: number) {
        // Return active raids not too old (5 mins)
        return this.raids.filter(r => (currentTime - r.time) < 300);
    }
}

export class Game {
    public scene!: THREE.Scene;
    // DEBUG: Static counter for instances
    static INSTANCE_COUNT = 0;
    public instanceId: number;
    private _frameCount: number = 0;

    // Getter/Setter to trap resets
    get frameCount(): number { return this._frameCount; }
    set frameCount(v: number) {
        if (v === 0 && this._frameCount > 0) {
            console.error(`[Game ${this.instanceId}] CRITICAL: frameCount RESET to 0!`, new Error().stack);
        }
        this._frameCount = v;
    }

    // ... (rest of class)



    public camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | any; // Any allows for mock
    public currentLevelIndex: number = 0; // Level System
    public currentSeed: number | null = null; // Seed System
    public renderer!: THREE.WebGLRenderer;
    public controls!: OrbitControls;
    public clock!: THREE.Clock;
    // Array-based Queues
    public requestQueue: Request[] = []; // Unified queue
    public goblins: any[];
    public fishes: any[];
    public sheeps: any[];

    // Managers
    public terrain!: Terrain;
    public inputManager!: InputManager;
    public saveManager: SaveManager;
    public goblinManager: GoblinManager;
    public fishManager: FishManager;
    public sheepManager: SheepManager;
    public cloudManager: CloudManager;
    public birdManager: BirdManager;
    public weatherManager!: WeatherManager;
    public soundManager!: SoundManager;
    public smokeManager!: SmokeManager;
    public seaDecorationRenderer!: SeaDecorationRenderer;
    public landDecorationRenderer!: LandDecorationRenderer;
    private smokeTimer: number = 0;

    // Entity Arrays (Mirroring Terrain for easy access)
    public units: Unit[];
    get buildings(): any[] { return (this.terrain && this.terrain.buildings) ? this.terrain.buildings : []; }

    // UI/Renderers
    public minimap!: Minimap;
    public compass!: Compass;
    public unitRenderer!: UnitRenderer;
    public buildingRenderer!: BuildingRenderer;
    public goblinRenderer!: GoblinRenderer;
    public treeRenderer!: TreeRenderer;
    public performanceMonitor!: PerformanceMonitor;
    public statsDisplay: HTMLElement | null;
    public unitScanBudget: number;
    public battleMemory: BattleMemory;
    public squads: Map<number, Squad>; // Squad Manager
    public resources: GameResource;

    // Game State
    public mana: number;
    public gameActive: boolean;

    // Lights & Envirionment
    public ambientLight!: THREE.AmbientLight;
    public directionalLight!: THREE.DirectionalLight;
    public clippingPlanes: THREE.Plane[];
    public viewRadius: number; // Default initialized
    public frustum!: THREE.Frustum;
    public projScreenMatrix!: THREE.Matrix4;

    // Time & Cycle
    public gameTime: number;
    public gameTotalTime: number;
    public simTotalTimeSec: number;
    public lastTime: number;
    public timeScale: number;
    public dayNightSpeed: number;
    public isNight: boolean;
    public currentSeasonIndex: number;
    public swayIntensity: number = 1.0;
    public season: string;
    public daysPassed: number;
    public prevTimeOfDay: number;
    public lastHeartbeat: number;
    // Missing Properties added for Type Safety
    public battleHotspots: { x: number, z: number, intensity: number, time: number, regionId?: number }[] = [];
    public squadMobilizationTimer: number = 0;
    public unitMap: Map<number, Unit> = new Map();
    public requestCheckIndex: number = 0;

    public enemyAI!: EnemyAI;
    private _tmpVec: THREE.Vector3;
    public totalPopulation: number;
    public markerTime: number;
    public projectiles: any[];
    public stopped: boolean;
    public animationFrameId: number | null;
    public raidPoints: { x: number, z: number, time: number }[];
    public manualWorkerSpawns: number;

    // Request System
    public requestIdCounter: number;
    public projectileGeo: THREE.SphereGeometry;
    public markerMaterial!: THREE.MeshBasicMaterial | THREE.ShaderMaterial;
    // Loading
    public isLoading: boolean;
    public get isLoaded(): boolean { return !this.isLoading; }
    public frameCounter: number;
    public minimal: boolean;
    public readyPromise: Promise<void>;
    private resolveReady!: () => void;

    // Raid Logic

    constructor(sceneOverride?: any, terrainOverride?: any, minimal: boolean = false, goblinManagerOverride: any = null) {
        if (typeof sceneOverride === 'boolean') {
            minimal = sceneOverride;
            sceneOverride = undefined;
        }
        this.clippingPlanes = []; // Default empty array for all modes

        this.instanceId = ++Game.INSTANCE_COUNT;
        this.minimal = minimal;
        console.log(`[Game ${this.instanceId}] Constructor. minimal=${this.minimal}`);

        // Register for automatic cleanup in tests
        if ((globalThis as any).__game_instances) {
            (globalThis as any).__game_instances.add(this);
        }

        this._tmpVec = new THREE.Vector3();

        this.mana = 100;
        this.gameActive = false;
        this.unitScanBudget = 1000;
        this.stopped = false;
        try {
            this.viewRadius = GameConfig?.render?.viewRadius || 40;
        } catch (e) { console.error('GameConfig Fail', e); this.viewRadius = 40; }
        this.statsDisplay = null;
        this.isLoading = true;
        this.frameCounter = 0;

        this.requestQueue = [];
        this.goblins = [];
        this.fishes = [];
        this.sheeps = [];
        this.units = [];
        this.squads = new Map();
        this.unitMap = new Map();
        this.resources = { grain: 0, fish: 0, meat: 0 };
        this.clippingPlanes = [];
        this.projectiles = [];
        this.raidPoints = [];
        this.battleHotspots = [];
        this.squadMobilizationTimer = 0;
        this.totalPopulation = 0;
        this.markerTime = 0;
        this.animationFrameId = null;
        this.manualWorkerSpawns = 0;
        this.requestCheckIndex = 0;

        this.gameTime = 8.0; // Start at 8:00
        this.gameTotalTime = 0;
        this.simTotalTimeSec = 0;
        this.frameCount = 0;
        this.lastTime = 0;
        this.timeScale = 1.0;
        this.dayNightSpeed = 0.05;
        this.isNight = false;
        this.currentSeasonIndex = 0;
        this.season = 'Spring';
        this.daysPassed = 0;
        this.prevTimeOfDay = 0;
        this.lastHeartbeat = 0;
        this.requestIdCounter = 0;
        this.readyPromise = new Promise(resolve => {
            this.resolveReady = resolve;
        });

        // --- 2. Core Managers ---
        this.battleMemory = new BattleMemory();
        this.saveManager = new SaveManager();
        this.soundManager = new SoundManager();

        (window as any).game = this;

        console.log('[Game] Init SphereGeometry');
        // --- 3. Shared Assets (Visual-only) ---
        this.projectileGeo = new THREE.SphereGeometry(0.2, 8, 8); // Satisfy TS definite assignment
        this.initMarkerMaterial();

        // --- 4. Branched Initialization (Minimal/Override vs Full) ---
        if (sceneOverride || this.minimal) {
            console.log('[Game] Minimal/Override Init Start');
            // Setup Minimal/Mocked environment
            this.scene = sceneOverride || new THREE.Scene();

            this.camera = {
                position: new THREE.Vector3(),
                updateMatrixWorld: () => { },
                matrixWorldInverse: new THREE.Matrix4(),
                matrixWorld: new THREE.Matrix4(),
                projectionMatrix: new THREE.Matrix4(),
                updateProjectionMatrix: () => { },
                lookAt: () => { }
            } as any;

            this.renderer = {
                shadowMap: {},
                setPixelRatio: () => { },
                setSize: () => { },
                domElement: document.createElement('canvas'),
                render: () => { },
                dispose: () => { },
                setClearColor: () => { },
                localClippingEnabled: false,
                clippingPlanes: []
            } as any;

            this.controls = {
                target: new THREE.Vector3(),
                update: () => { },
                enableDamping: false,
                mouseButtons: {}
            } as any;

            this.markerMaterial = {
                clone: function () {
                    const cloned = {
                        uniforms: {
                            uColor: { value: new THREE.Color() },
                            uTime: { value: 0 },
                            uIsNight: { value: 0 },
                            uClippingPlanes: { value: [] }
                        },
                        dispose: () => { }
                    };
                    return cloned;
                },
                uniforms: {
                    uColor: { value: new THREE.Color() },
                    uTime: { value: 0 },
                    uIsNight: { value: 0 }
                },
                dispose: () => { }
            } as any;

            if (this.minimal) {
                console.log('[Game] Minimal: Init Clock');
                this.clock = new THREE.Clock();

            } else {
                if (!this.clock) this.clock = new THREE.Clock(); // Make sure clock exists if not minimal but overridden
            }

            // Minimal Terrain Mock (Only if not overridden)
            if (terrainOverride) {
                console.log(`[Game FORCE CONST ${this.instanceId}] Assigning terrainOverride to this.terrain`);
                this.terrain = terrainOverride;
            } else {
                console.log(`[DEBUG] Game ${this.instanceId} creating mock terrain`);
                this.terrain = {
                    width: 160, depth: 160,
                    logicalWidth: 160, logicalDepth: 160,
                    buildings: [], entityGrid: [],
                    pathfindingCalls: 0,
                    initEntityGrid: function () {
                        this.entityGrid = Array(160).fill(0).map(() => Array(160).fill(0).map(() => []));
                    },
                    getTileHeight: () => 10,
                    isWalkable: () => true,
                    isReachable: () => true,
                    update: function (dt, spawnCb, night, units, active, resources) {
                        // Enhanced mock to track population for tests
                        this.buildings.forEach(b => {
                            if (b.userData && (b.userData.type === 'house' || b.userData.type === 'goblin_hut')) {
                                b.population = (b.population || 0) + (dt * 0.1); // Fake growth
                            }
                        });
                    },
                    registerEntity: () => { }, unregisterEntity: () => { },
                    removeBuilding: function (building: any) {
                        const idx = this.buildings.indexOf(building);
                        if (idx !== -1) this.buildings.splice(idx, 1);
                    },
                    updateMeshPosition: () => { }, updateLights: () => { }, getBuildingAt: () => null, getRegion: () => 1,
                    isValidGrid: () => true, findPath: () => [], findPathAsync: () => Promise.resolve([]),
                    findBestTarget: () => null,
                    resetPathfindingBudget: () => { }, // GameLoop内で呼ばれるため必要
                    isAdjacentToRegion: () => false,
                    checkYield: () => Promise.resolve(), checkFlatArea: () => true,
                    generateRandomTerrain: async () => { }, setHeight: () => { }, updateColors: () => { }, // Mock methods
                    gridToWorld: (v: any) => v, worldToGrid: (v: any) => v, setSeason: () => { },
                    getVisualPosition: (x: number, z: number) => ({ x: x - 80, y: 10, z: z - 80 }),
                    addBuilding: function (type: string, x: number, z: number) {
                        const b = { userData: { type, gridX: x, gridZ: z }, gridX: x, gridZ: z, population: 0 };
                        (this.buildings as any[]).push(b);
                        return b;
                    },
                    getRandomPointInRegion: () => ({ x: 10, z: 10 }),
                    serialize: () => ({ h: [], n: [], b: [], logicalWidth: 160, logicalDepth: 160, version: 2 }),
                    deserialize: () => { },
                    grid: Array(160).fill(0).map(() => Array(160).fill(0).map(() => ({ height: 1, regionId: 1 })))
                } as any;
            }
            this.terrain?.initEntityGrid?.();
        }

        if (this.minimal) {
            console.log('[Game] Minimal: Init Managers');
            // Initialize ONLY essential managers for logic tests
            console.log('[Game] Minimal: Init GoblinManager');
            this.goblinManager = goblinManagerOverride || new GoblinManager(this.scene, this.terrain, this, []);
            /*
            this.fishManager = new FishManager(this.scene, this.terrain, []);
            this.cloudManager = new CloudManager(this.scene, 100, 100);
            this.birdManager = new BirdManager(this.scene, 100, 100, []);
            this.sheepManager = new SheepManager(this.scene, this.terrain, []);
            this.minimap = new Minimap(this);
            this.compass = new Compass(this);
            this.unitRenderer = new UnitRenderer(this.scene, this.terrain, []);
            this.buildingRenderer = new BuildingRenderer(this.scene, this.terrain, [], 100);
            this.goblinRenderer = new GoblinRenderer(this.scene, this.terrain, []);
            this.performanceMonitor = new PerformanceMonitor();
            this.inputManager = new InputManager(this.scene, this.camera, this.terrain, () => { }, this.units, this.unitRenderer, this);
            */
            console.log('[Game] Minimal: Init EnemyAI');
            this.enemyAI = new EnemyAI(this); // Init Enemy AI

            this.smokeManager = new SmokeManager(this.scene, 500, this.clippingPlanes); // Small pool for minimal mode

            this.isLoading = false;
            console.log('[Game] Minimal: Done.');
        }


        const doFull = !sceneOverride && !this.minimal;
        if (doFull) {
            // Full Three.js setup
            console.log("[Game] Initializing Full Three.js components...");
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x87CEEB);

            this.viewRadius = GameConfig.render.viewRadius || 60;
            const aspect = window.innerWidth / window.innerHeight;
            const d = this.viewRadius * 1.5;

            this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
            this.camera.position.set(20, 20, 20);
            this.camera.lookAt(this.scene.position);

            this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
            this.renderer.localClippingEnabled = true; // Essential for the clipping planes!
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            this.renderer.setSize(window.innerWidth, window.innerHeight);
            if (this.renderer && this.renderer.shadowMap) {
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = (THREE as any).PCFSoftShadowMap || 1;
            }
            if (typeof document !== 'undefined') {
                document.body.appendChild(this.renderer.domElement);
            }

            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.screenSpacePanning = false;
            this.controls.minZoom = 0.25;
            this.controls.maxZoom = 8.0;
            this.controls.maxPolarAngle = Math.PI / 2;

            if ((THREE as any).MOUSE) {
                this.controls.mouseButtons = {
                    LEFT: THREE.MOUSE.ROTATE,
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: THREE.MOUSE.PAN
                };
            }

            this.clock = new THREE.Clock();

            const r = this.viewRadius;
            this.clippingPlanes = [
                new THREE.Plane(new THREE.Vector3(1, 0, 0), r),
                new THREE.Plane(new THREE.Vector3(-1, 0, 0), r),
                new THREE.Plane(new THREE.Vector3(0, 0, 1), r),
                new THREE.Plane(new THREE.Vector3(0, 0, -1), r)
            ];
            // Disable global clipping to prevent it from affecting everything (like clouds).
            // Individual materials (Terrain, Units, etc.) use this.clippingPlanes locally.
            // this.renderer.clippingPlanes = this.clippingPlanes;

            // Full Terrain Initialization
            console.log('[Game] Debug Levels:', Levels);
            const initialLevel = Levels ? Levels[0] : null; // Safe access
            if (!initialLevel) console.error('[Game] FATAL: Levels[0] is missing!');

            this.terrain = terrainOverride || new Terrain(this.scene, this.clippingPlanes, initialLevel?.mapWidth || 100, initialLevel?.mapDepth || 100);
        }

        if (!this.minimal) {
            // --- 5. Full Mode Managers & Listeners ---
            this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Increased from 0.5
            this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Increased from 0.8
            this.directionalLight.position.set(20, 40, 20); // Higher and further for better shadows

            // Shadow Settings
            if (this.directionalLight.shadow) {
                this.directionalLight.castShadow = true;
                this.directionalLight.shadow.mapSize.width = 2048;
                this.directionalLight.shadow.mapSize.height = 2048;
                this.directionalLight.shadow.camera.left = -100;
                this.directionalLight.shadow.camera.right = 100;
                this.directionalLight.shadow.camera.top = 100;
                this.directionalLight.shadow.camera.bottom = -100;
                this.directionalLight.shadow.camera.near = 0.5;
                this.directionalLight.shadow.camera.far = 200;
                this.directionalLight.shadow.bias = -0.0001; // Fine-tuned for terrain self-shadow
            }

            this.scene.add(this.ambientLight);
            this.scene.add(this.directionalLight);
            if (this.terrain) {
                console.log('[Game] Init CloudManager');
                this.cloudManager = new CloudManager(this.scene, this.terrain.width, this.terrain.depth);
            }

            console.log('[Game] Init BirdManager');
            this.birdManager = new BirdManager(this.scene, this.terrain.width, this.terrain.depth);
            this.sheepManager = new SheepManager(this.scene, this.terrain, this.clippingPlanes);
            this.goblinManager = goblinManagerOverride || new GoblinManager(this.scene, this.terrain, this, this.clippingPlanes);
            this.fishManager = new FishManager(this.scene, this.terrain, this.clippingPlanes);

            console.log('[Game] Init Minimap');
            this.minimap = new Minimap(this);
            console.log('[Game] Init Compass');
            this.compass = new Compass(this);
            console.log('[Game] Init WeatherManager');
            this.weatherManager = new WeatherManager(this.scene, this.clippingPlanes);
            if (!this.smokeManager) this.smokeManager = new SmokeManager(this.scene, 2000, this.clippingPlanes);
            console.log('[Game] Init SeaDecorationRenderer');
            this.seaDecorationRenderer = new SeaDecorationRenderer(this.scene, this.terrain, this.clippingPlanes);

            console.log('[Game] Init UnitRenderer');
            this.unitRenderer = new UnitRenderer(this.scene, this.terrain, this.clippingPlanes, 12000);
            this.unitRenderer.init();
            console.log('[Game] Init BuildingRenderer');
            this.buildingRenderer = new BuildingRenderer(this.scene, this.terrain, this.clippingPlanes, 5000);
            this.buildingRenderer.init();
            console.log('[Game] Init GoblinRenderer');
            this.goblinRenderer = new GoblinRenderer(this.scene, this.terrain, this.clippingPlanes, 50000);
            this.goblinRenderer.init();
            console.log('[Game] Init TreeRenderer');
            this.treeRenderer = new TreeRenderer(this.scene, this.terrain, this.clippingPlanes, 120000);
            this.treeRenderer.init();
            console.log('[Game] Init LandDecorationRenderer');
            this.landDecorationRenderer = new LandDecorationRenderer(this.scene, this.terrain, this.clippingPlanes);
            this.landDecorationRenderer.init();

            console.log('[Game] Init PerformanceMonitor');
            this.performanceMonitor = new PerformanceMonitor();
            if (typeof window !== 'undefined' && window.location?.search?.includes('performance=true')) {
                this.performanceMonitor.enable();
            }

            this.inputManager = new InputManager(this.scene, this.camera, this.terrain, this.spawnUnit.bind(this), this.units, this.unitRenderer, this);
            this.enemyAI = new EnemyAI(this); // Init Enemy AI

            if (typeof document !== 'undefined') {
                this.statsDisplay = document.getElementById('stats-container');
                window.addEventListener('resize', this.onWindowResize.bind(this));

                window.addEventListener('keydown', (e) => {
                    if (e.key === 'f' || e.key === 'F') {
                        if (this.performanceMonitor) this.performanceMonitor.toggle();
                    } else if (e.key === 's' || e.key === 'S') {
                        const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
                        this.currentSeasonIndex = ((this.currentSeasonIndex || 0) + 1) % 4;
                        const newSeason = SEASONS[this.currentSeasonIndex];
                        this.season = newSeason;
                        this.daysPassed = (this.daysPassed || 0) + 1;
                        if (this.terrain) this.terrain.setSeason(newSeason);
                        const seasonVal = document.getElementById('season-val');
                        if (seasonVal) seasonVal.textContent = newSeason;

                        // Auto-Weather on Season change
                        if (this.weatherManager) {
                            if (newSeason === 'Winter') this.weatherManager.setWeather('Snow');
                            else this.weatherManager.setWeather('Rain');
                        }
                    } else if (e.key === 'w' || e.key === 'W') {
                        // Manual Weather Cycle
                        if (this.weatherManager) {
                            const types: WeatherType[] = ['Clear', 'Rain', 'HeavyRain', 'Snow', 'HeavySnow', 'Fog'];
                            const curIndex = types.indexOf(this.weatherManager.currentWeather || 'Clear');
                            const nextType = types[(curIndex + 1) % types.length];
                            this.weatherManager.setWeather(nextType);
                        }
                    } else if (e.key === 'g' || e.key === 'G') {
                        if (this.terrain) {
                            this.terrain.toggleGrid();
                        }
                    }
                });

                // Debug Speed Toggle
                (window as any).toggleDebugSpeed = () => {
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

                // UI Listeners (New Game, Regenerate, etc.)
            }
        }

        this.frustum = new THREE.Frustum();
        this.projScreenMatrix = new THREE.Matrix4();

        this.initMarkerMaterial();

        // Async Initialization Block (Preview)
        (async () => {
            if (minimal) {
                this.resolveReady();
                return;
            }
            try {
                // Fix: Initialize isNight for preview
                this.isNight = false;

                // Simplified: Use the newly async regenerateWorld to setup the initial preview
                console.log("[Game] Generating Initial Preview World...");
                await this.regenerateWorld();

                // Initialize Managers properly
                console.log("[Game] Initializing Managers (Bird, Sheep, Fish)...");
                const initPromises: Promise<any>[] = [];
                if (this.birdManager && typeof this.birdManager.init === 'function') initPromises.push(this.birdManager.init());
                if (this.sheepManager && typeof this.sheepManager.init === 'function') initPromises.push(this.sheepManager.init());
                if (this.fishManager && typeof this.fishManager.init === 'function') initPromises.push(this.fishManager.init());

                if (initPromises.length > 0) {
                    await Promise.all(initPromises);
                }

                // Initial Camera Position for Preview (Center & Orbit)
                const w = this.terrain.logicalWidth || 80;
                const d = this.terrain.logicalDepth || 80;
                const cx = Math.floor(w / 2);
                const cz = Math.floor(d / 2);
                let h = 0;
                if (this.terrain.getTileHeight) h = this.terrain.getTileHeight(cx, cz);

                if (this.controls) {
                    this.controls.target.set(0, h, 0);
                    this.camera.position.set(40, h + 40, 40);
                    this.controls.update();
                }

                // Should hide loading screen AFTER terrain is ready
                this.isLoading = false;

                // PREVENT AUTO-START IN TESTS to avoid hanging background loops
                const isTest = typeof window !== 'undefined' && (window as any).__vitest_environment__;
                if (!minimal && !isTest) {
                    this.animate();
                }

                // Initialize Start Screen UI
                if (!minimal) {
                    this.initStartScreen();
                }

                this.resolveReady();

            } catch (err: any) {
                console.error("FATAL INIT ERROR:", err);
                this.resolveReady(); // Resolve anyway to avoid hanging tests
                const ui = document.getElementById('ui');
                if (ui) {
                    ui.innerHTML += `<div style="position:absolute;top:0;left:0;color:red;background:black;z-index:9999;padding:20px;">FATAL ERROR: ${err.message}<br><pre>${err.stack}</pre></div>`;
                }
            }
        })();
    }

    initStartScreen() {
        // --- Start Screen Logic ---
        const btnNew = document.getElementById('start-new-btn');
        const btnLoad = document.getElementById('start-load-btn');
        const btnRegen = document.getElementById('regenerate-btn');
        const startScreen = document.getElementById('start-screen');
        const ui = document.getElementById('ui');

        console.log("[Game] Initializing Start Screen Listeners...");

        // Visibility Check for LOAD button
        if (btnLoad && this.saveManager) {
            const slots = this.saveManager.getSlots();
            const hasSaves = slots.some(s => !s.empty);
            if (hasSaves) {
                btnLoad.style.display = 'block';
                console.log("[Game] Save data detected. Showing LOAD button.");
            } else {
                btnLoad.style.display = 'none';
            }
        }

        if (btnNew) {
            btnNew.onclick = () => {
                console.log("[Game] NEW GAME Clicked");
                this.startNewGame();
                if (startScreen) startScreen.style.display = 'none';
                if (ui) ui.style.display = 'flex';
            };
        } else {
            console.warn("[Game] #start-new-btn not found!");
        }

        if (btnRegen) {
            btnRegen.onclick = () => {
                console.log("[Game] REGENERATE Clicked");
                this.regenerateWorld();
            };
        }

        if (btnLoad) {
            btnLoad.onclick = () => {
                console.log("[Game] LOAD Clicked");
                const modal = document.getElementById('save-modal');
                if (modal && this.saveManager) {
                    modal.style.display = 'flex';
                    this.saveManager.refreshSlotList(
                        this.saveGame.bind(this),
                        async (slotId: number) => {
                            const success = await this.loadGame(slotId);
                            if (success) {
                                if (startScreen) startScreen.style.display = 'none';
                                modal.style.display = 'none';
                                if (ui) ui.style.display = 'flex';
                            }
                            return success;
                        }
                    );
                }
            };
        }

        // Global UI listeners
        document.getElementById('save-load-btn')?.addEventListener('click', () => {
            const modal = document.getElementById('save-modal');
            if (modal) {
                modal.style.display = 'flex';
                this.saveManager.refreshSlotList(
                    this.saveGame.bind(this),
                    this.loadGame.bind(this)
                );
            }
        });

        document.getElementById('close-modal')?.addEventListener('click', () => {
            document.getElementById('save-modal')!.style.display = 'none';
        });

        document.getElementById('help-btn')?.addEventListener('click', () => {
            document.getElementById('help-modal')!.style.display = 'flex';
        });

        document.getElementById('close-help-btn')?.addEventListener('click', () => {
            document.getElementById('help-modal')!.style.display = 'none';
        });
    }

    setupLights() {
        this.ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(this.ambientLight);
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(10, 20, 10);
        this.scene.add(this.directionalLight);
    }

    spawnUnit(x: number, z: number, roleOrSpecial: string | boolean | null = null, sourceBuilding: any = null, squadId: any = null, isManualClick = false, faction: string = 'player') {
        // Determine Role based on Source Building (Explicit Link)
        let role = 'citizen'; // Default
        let isSpecial = false;
        let homeBase = null;

        if (roleOrSpecial === true) {
            isSpecial = true;
            role = 'worker'; // Force Worker for Manual Spawn (Red)
            if (isManualClick) this.manualWorkerSpawns++; // Increment only on manual UI click
        } else if (typeof roleOrSpecial === 'string') {
            role = roleOrSpecial;
        } else if (sourceBuilding) {
            // Explicit Linkage from Terrain.js
            homeBase = sourceBuilding;
            // Fix: Check sourceBuilding.type correctly. 
            // Note: In tests, sourceBuilding might be a plain object { type: 'tower', userData: ... }
            const bType = sourceBuilding.type || (sourceBuilding.userData && sourceBuilding.userData.type);

            // LOUD LOG
            // console.log(`!!! SPAWNING TYPECHECK: ${bType} (Expected: tower/barracks) !!!`);

            if (bType === 'barracks') role = 'knight';
            else if (bType === 'tower') role = 'wizard';
            else if (bType === 'port') role = 'warship';
            else {
                // Houses spawn diversity:
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
            // diversity:
            const r = Math.random();
            if (r < 0.25) role = 'hunter';
            else if (r < 0.5) role = 'fisher';
            else role = 'worker';
        }

        const unit: any = (role === 'warship')
            ? new Warship(this.scene, this.terrain, x, z, faction)
            : new Unit(this.scene, this.terrain, x, z, role, isSpecial, squadId, faction);

        unit.game = this;
        unit.homeBase = homeBase; // Link

        this.units.push(unit);
        if (unit.isNaval || role === 'warship') {
            // console.log(`[Game] !!! WARSHIP SPAWNED !!! ID:${unit.id} at ${x.toFixed(2)},${z.toFixed(2)} Faction:${faction} isNaval:${unit.isNaval}`);
        }
        if (this.unitMap) this.unitMap.set(unit.id, unit);

        // TRIGGER: Newly spawned unit immediately checks for work!
        const canWork = unit.role === 'worker' || unit.role === 'hunter' || unit.role === 'fisher';
        if (canWork) {
            this.processAssignments();
        }

        return unit;
    }

    handleBuildingSpawn(x, z, buildingType, sourceBuilding, squadId = null) {
        // Callback from Terrain when a building overflows
        const faction = (sourceBuilding && sourceBuilding.userData && sourceBuilding.userData.faction) ? sourceBuilding.userData.faction : 'player';

        if (buildingType === 'goblin_hut' || buildingType === 'cave') {
            if (this.goblinManager && this.goblinManager.spawnGoblin) {
                this.goblinManager.spawnGoblin(x, z, 'normal', sourceBuilding);
                return true;
            }
            return false;
        } else {
            // Human spawn
            let spawnX = x;
            let spawnZ = z;

            let role: string | null = null;
            if (buildingType === 'port') {
                role = 'warship';
                // Search for water tile outside the port's 3x3 footprint
                const waterTile = this.terrain.findNearestTileByCondition(
                    x + 1, z + 1,
                    6,
                    (cell: any) => cell.height <= 0.5 && !cell.hasBuilding
                );
                if (waterTile) {
                    spawnX = waterTile.x;
                    spawnZ = waterTile.z;
                }
            }

            this.spawnUnit(spawnX, spawnZ, role, sourceBuilding, squadId, false, faction);

        }
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
        if (!this.camera || !this.renderer) return;
        const aspect = window.innerWidth / window.innerHeight;

        if (this.camera instanceof THREE.OrthographicCamera) {
            const d = (this.viewRadius || 60) * 1.5;
            this.camera.left = -d * aspect;
            this.camera.right = d * aspect;
            this.camera.top = d;
            this.camera.bottom = -d;
            this.camera.updateProjectionMatrix();
        } else if (this.camera instanceof THREE.PerspectiveCamera) {
            this.camera.aspect = aspect;
            this.camera.updateProjectionMatrix();
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    updateEnvironment(deltaTime: number) {
        this.gameTime += deltaTime * (this.dayNightSpeed || 0.05);
        if (this.gameTime >= 24) this.gameTime = 0;

        // 1. Calculate Orb Positions (Sun & Moon)
        const dayAngle = ((this.gameTime - 6) / 12) * Math.PI;
        const radius = 80;
        const sunX = Math.cos(dayAngle) * radius;
        const sunY = Math.sin(dayAngle) * radius;
        const sunZ = 30;

        const moonAngle = dayAngle + Math.PI;
        const moonX = Math.cos(moonAngle) * radius;
        const moonY = Math.sin(moonAngle) * radius;
        const moonZ = -30;

        // 2. Determine Day/Night State
        const isNight = (this.gameTime < 6 || this.gameTime >= 18);
        this.isNight = isNight;

        // 3. Dynamic Color Interpolation (Enhanced Vibe)
        const nightSky = new THREE.Color(0x000015); // Deep space
        const dawnSky = new THREE.Color(0xFF8C5A);  // Warm Orange
        const daySky = new THREE.Color(0x87CEEB);   // Sky Blue
        const duskSky = new THREE.Color(0x603080);  // Twilight Purple/Orange mix target

        const sunMorning = new THREE.Color(1.0, 0.82, 0.63); // #FFD2A0
        const sunNoon = new THREE.Color(1.0, 1.0, 0.94);    // #FFFFF0
        const sunEvening = new THREE.Color(1.0, 0.55, 0.35);  // #FF8C5A
        const moonColor = new THREE.Color(0xCCCCFF);

        let skyColor = daySky.clone();
        let lightColor = sunNoon.clone();
        let lightIntensity = 1.0;
        let ambientIntensity = 0.5;
        let ambientColor = new THREE.Color(0xFFFFFF);
        let targetPos = new THREE.Vector3(sunX, sunY, sunZ);

        // Transition Logic
        if (this.gameTime >= 4 && this.gameTime < 8) {
            // Dawn (4:00 - 8:00) - Start earlier for pre-dawn glow
            const t = (this.gameTime - 4) / 4;
            skyColor.copy(nightSky).lerp(dawnSky, t);
            if (t > 0.6) skyColor.lerp(daySky, (t - 0.6) * 2.5);

            lightColor.copy(moonColor).lerp(sunMorning, t);
            lightIntensity = 0.2 + t * 0.8;
            ambientIntensity = 0.2 + t * 0.4;
            ambientColor.lerp(new THREE.Color(0xFFDAB9), t); // Peach tint
        } else if (this.gameTime >= 8 && this.gameTime < 16) {
            // Day (8:00 - 16:00)
            skyColor.copy(daySky);
            if (this.gameTime < 11) {
                const t = (this.gameTime - 8) / 3;
                lightColor.copy(sunMorning).lerp(sunNoon, t);
            } else if (this.gameTime < 13) {
                lightColor.copy(sunNoon);
            } else {
                const t = (this.gameTime - 13) / 3;
                lightColor.copy(sunNoon).lerp(sunEvening, t);
            }
            lightIntensity = 1.1; // Bright noon
            ambientIntensity = 0.6;
        } else if (this.gameTime >= 16 && this.gameTime < 20) {
            // Dusk (16:00 - 20:00)
            const t = (this.gameTime - 16) / 4;
            skyColor.copy(daySky).lerp(new THREE.Color(0xFF4500), t); // Orange
            if (t > 0.5) skyColor.lerp(nightSky, (t - 0.5) * 2);

            lightColor.copy(sunEvening).lerp(moonColor, t);
            lightIntensity = 1.0 - t * 0.8;
            ambientIntensity = 0.6 - t * 0.2; // Smooth transition toward 0.4

            const blueShadow = new THREE.Color(0x404080);
            ambientColor.lerp(blueShadow, t);
        } else {
            // Night (20:00 - 4:00)
            skyColor.copy(nightSky);
            lightColor.copy(moonColor);

            // Adjust Moon Intensity based on Height to avoid over-brightness at 23:00
            // moonY peaks at ~23:50 (angle +PI)
            const absMoonY = Math.abs(moonY);
            lightIntensity = 0.35 - (absMoonY / radius) * 0.05; // Slightly lower when moon is high

            ambientIntensity = 0.4; // Base ambient for visibility (was 0.35)
            ambientColor.setHex(0x252550); // Slightly brighter/bluer night (was 0x202040)
            targetPos.set(moonX, moonY, moonZ);
        }

        // --- NEW: Sub-horizon Light Inversion (Avoid "flat" look during pre-dawn/post-dusk) ---
        // If the source is below the ground, mirror it UP but keep the low angle.
        // This ensures buildings/terrain have shadows even when sun/moon is just below horizon.
        if (targetPos.y < 5) {
            // Lerp upward when passing horizon to maintain shading depth
            const minY = 5.0;
            if (targetPos.y < 0) targetPos.y = Math.abs(targetPos.y) + minY;
            else targetPos.y = Math.max(minY, targetPos.y);
        }

        // Apply to Scene
        if (this.scene.background instanceof THREE.Color) {
            this.scene.background.copy(skyColor);
        }
        if (this.directionalLight) {
            this.directionalLight.position.copy(targetPos);
            this.directionalLight.color.copy(lightColor);
            this.directionalLight.intensity = lightIntensity;
        }
        if (this.ambientLight) {
            this.ambientLight.intensity = ambientIntensity;
            // Mix ambient with sky color for atmospheric scattering effect
            this.ambientLight.color.copy(ambientColor).lerp(skyColor, 0.2);
        }

        // 4. Sync with WeatherManager (Fog color)
        if (this.weatherManager) {
            this.weatherManager.updateSkyColor(skyColor);
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
            this.season = currentSeason;
            if (this.terrain) this.terrain.setSeason(this.season);
        }
    }

    // --- Request System ---
    initMarkerMaterial() {
        if (this.minimal) return;
        console.log('[Game] initMarkerMaterial Start');
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
        console.log('[Game] initMarkerMaterial Done');
    }

    // --- Request System ---
    // --- Request System ---
    addRequest(type: string, x: number, z: number, isManual = true, visX: number | null = null, visZ: number | null = null, building: any = null, faction: string = 'player') {
        // Mana Check (Consume Upfront? Or on completion?)
        // User requested: "Instruct workers... they operate."
        // Consuming upfront prevents spamming without resources.
        // Costs are handled in InputManager currently, but should ideally optionally be here.
        // For now, assume Mana is already checked/consumed by InputManager for visual feedback.

        // User requested: "Instruct workers... they operate."
        // MANUAL JOBS are special: High Priority & Sticky
        // REFACTOR: All jobs are now treated as "Manual" (Persistent).
        const id = `req_${this.requestIdCounter++}`;

        // CRITICAL FIX: Enforce Integer Logic Coordinates
        // This prevents pathfinding oscillation where 10.5 != 10.0
        const gridX = Math.round(x);
        const gridZ = Math.round(z);

        const req: Request = {
            id: id,
            type: type, // 'raise', 'lower', 'build_tower', 'build_barracks', 'migration'
            x: gridX,
            z: gridZ,
            status: 'pending',
            assignedTo: null,
            mesh: null,
            createdAt: this.simTotalTimeSec || 0,
            isManual: !!isManual,
            building: (building && typeof building === 'object' && building.id) ? building : null,
            excludedUntil: 0, // New: Global Cooldown timestamp
            faction: faction // Use passed faction
        };

        // VISUAL MARKER (Rising Light Particles)
        // Cylinder Geometry (open ended)
        if (faction === 'player') {
            const geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 16, 1, true); // Radius 0.5, Height 5

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
        } else {
            req.mesh = null;
        }

        // DEDUPLICATION: Check if a similar pending request already exists
        const existingReq = this.requestQueue.find(r =>
            r.status === 'pending' &&
            r.type === type &&
            r.x === x &&
            r.z === z &&
            r.isManual === isManual // Only strict dedup for same manual/auto status
        );

        if (existingReq) {
            console.log(`[Game] Duplicate Request Ignored: ${type} at (${x},${z})`);
            // Flash existing mesh to acknowledge input?
            return existingReq;
        }

        this.requestQueue.push(req);
        console.log(`[Game] Request Added: ${type} at (${x},${z}) ID:${id}`);

        // FORCE ASSIGNMENT (User Request: "Nearby workers should accept")
        // Fixed: Use the renamed        // Initial Assign Try
        this.assignRequestSync(req);

        return req;
    }

    getDistance(x1, z1, x2, z2) {
        if (!this.terrain) return Math.sqrt((x1 - x2) ** 2 + (z1 - z2) ** 2);
        const w = this.terrain.logicalWidth || 240;
        const d = this.terrain.logicalDepth || 240;
        let dx = Math.abs(x1 - x2);
        let dz = Math.abs(z1 - z2);
        if (dx > w / 2) dx = w - dx;
        if (dz > d / 2) dz = d - dz;
        return Math.sqrt(dx * dx + dz * dz);
    }

    findBestRequest(unit: Unit, allowAuto = true, manualOnly = false, allowSnatch = true) {
        if (!unit) return null;
        // Priority: Calculate Best Target (Goblin vs Building)
        let bestTarget: { type: string, obj: any } | null = null;
        let bestReq = null;
        let minDistSq = Infinity;

        const logicalW = this.terrain.logicalWidth || 160;
        const logicalD = this.terrain.logicalDepth || 160;
        const now = this.simTotalTimeSec;
        const ux = (unit.getVisualX) ? unit.getVisualX(now) : unit.gridX;
        const uz = (unit.getVisualZ) ? unit.getVisualZ(now) : unit.gridZ;

        for (const req of this.requestQueue) {
            if (req.status === 'completed') continue;
            if (manualOnly && !req.isManual) continue;
            if (!allowAuto && !req.isManual) continue;

            // FACTION CHECK: Only process requests for own faction
            const reqFaction = req.faction || 'player';
            const unitFaction = unit.faction || 'player';
            if (reqFaction !== unitFaction) {
                continue;
            }

            // GLOBAL COOLDOWN CHECK
            if (req.excludedUntil && req.excludedUntil > this.simTotalTimeSec) {
                continue;
            }

            // Priority: Pending first. 
            // Snatch: If allowSnatch is true, we can steal 'assigned' jobs if we are very close.
            if (req.status !== 'pending') {
                const isOurs = String(req.assignedTo) === String(unit.id);
                if (!allowSnatch && !isOurs) continue;
                if (req.status !== 'assigned') continue;

                if (isOurs) {
                    // Sticky Manual Job: Allow re-picking our own manual job
                    if (!req.isManual) continue;
                } else {
                    // NEVER snatch a Manual job from its owner UNLESS they are distracted by combat
                    if (req.isManual) {
                        const owner = this.units.find(u => String(u.id) === String(req.assignedTo));
                        const isOwnerFighting = owner && owner.state && (owner.state.name === 'Combat' || owner.state.constructor.name === 'Combat');
                        if (!isOwnerFighting) continue;
                    }
                }
            }

            // WRAP-AWARE DISTANCE
            let dx = Math.abs(req.x - ux);
            let dz = Math.abs(req.z - uz);

            if (dx > logicalW / 2) dx = logicalW - dx;
            if (dz > logicalD / 2) dz = logicalD - dz; // Corrected to logicalD

            const distSq = dx * dx + dz * dz;

            if (unit.ignoredTargets && unit.ignoredTargets.has(req.id)) {
                const expiry = unit.ignoredTargets.get(req.id);
                const currentTime = this.simTotalTimeSec;
                if (expiry !== undefined && expiry > 0 && currentTime <= expiry) {
                    console.error(`[Game] Skipping ignored request ${req.id} for Unit ${unit.id}. Exp: ${expiry} Now: ${currentTime}`);
                    continue;
                } else {
                    if (expiry !== undefined) {
                        console.error(`[Game] Ignored request ${req.id} EXPIRED for Unit ${unit.id}. Exp: ${expiry} Now: ${currentTime} - Re-allowing.`);
                        unit.ignoredTargets.delete(req.id);
                    }
                }
            }
            // SNATCH RULE: Only snatch if DISTANCE is significantly smaller
            if (req.status === 'assigned') {
                const currentOwner = this.units.find(u => String(u.id) === String(req.assignedTo));
                if (currentOwner && currentOwner !== unit) {
                    // NEVER snatch if owner is already on-site or working
                    if (currentOwner.action === 'Working' || currentOwner.action === 'Building') continue;

                    let dOwner = this.getDistance ? this.getDistance(currentOwner.gridX, currentOwner.gridZ, req.x, req.z) : Math.abs(currentOwner.gridX - req.x) + Math.abs(currentOwner.gridZ - req.z);

                    // NEW: If current owner is distracted by Combat, relax snatching rules
                    const isOwnerFighting = currentOwner.state && (currentOwner.state.name === 'Combat' || currentOwner.state.constructor.name === 'Combat');

                    // Only snatch if we are significantly closer (OR if owner is fighting, allow any free worker to take over)
                    const snatchThreshold = 0.5;
                    const shouldSnatch = isOwnerFighting || (distSq < (dOwner * dOwner) * snatchThreshold);

                    if (!shouldSnatch) {
                        continue;
                    }
                }
            }

            const r = req as any as Request;
            const b = bestReq as any as Request | null;

            if (distSq < minDistSq || (r.isManual && !b?.isManual)) {
                // REGIONAL REACHABILITY CHECK
                if (unit.isReachable) {
                    if (!unit.isReachable(req.x, req.z, req.isManual)) {
                        continue;
                    }
                }

                // Manual Override: If this is manual, and bestReq wasn't, TAKE IT.
                if (r.isManual) {
                    if (b && b.isManual) {
                        if (distSq < minDistSq) {
                            minDistSq = distSq;
                            bestReq = r as any;
                        }
                    } else {
                        minDistSq = distSq;
                        bestReq = r as any;
                    }
                } else {
                    if (b && b.isManual) continue;
                    minDistSq = distSq;
                    bestReq = r as any;
                }
            }
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

        // NIGHT RULE: Do not assign AUTO requests at night
        if (this.isNight && !req.isManual) return;

        // Synchronous Logic (No Timeout)
        try {
            // Safeguard
            if (!this.units || !this.terrain || !req || req.status !== 'pending') return;
            const reqFaction = req.faction || 'player';
            let bestUnit: Unit | null = null;
            let minDistSq = Infinity;
            const SEARCH_RAD = 80;

            // 1. SPATIAL SEARCH (Optimization)
            // If unit count is low, array scan is MUCH faster than 80x80 grid scan
            const grid = this.terrain.entityGrid;
            const unitCountThreshold = 2000; // Grid scan is ~25k iterations. Array scan with 340 units is ~76x faster.

            if (grid && this.units.length > unitCountThreshold) {
                const W = this.terrain.logicalWidth || 160;
                const D = this.terrain.logicalDepth || 160;
                const rx = Math.round(req.x);
                const rz = Math.round(req.z);

                for (let dx = -SEARCH_RAD; dx <= SEARCH_RAD; dx += 1) {
                    for (let dz = -SEARCH_RAD; dz <= SEARCH_RAD; dz += 1) {
                        const ix = ((rx + dx) % W + W) % W;
                        const iz = ((rz + dz) % D + D) % D;

                        const cell = grid[ix] ? grid[ix][iz] : null;
                        if (!cell || cell.length === 0) continue;

                        for (let i = 0; i < cell.length; i++) {
                            const unit = cell[i];
                            if (!unit || unit.isDead) continue;
                            if (unit.role !== 'worker') continue;
                            if ((unit.faction || 'player') !== reqFaction) continue;

                            if (unit.targetRequest && unit.targetRequest.id === req.id) continue; // Already assigned to this one

                            // MANUAL SWITCH RULE:
                            // If req is manual, allow workers to switch IF they are doing an AUTO job.
                            // If req is auto, skip busy workers.
                            if (unit.targetRequest) {
                                if (req.isManual && !unit.targetRequest.isManual) {
                                    // Allowed to switch
                                } else {
                                    continue;
                                }
                            }
                            // Skip those explicitly in Working/Building to avoid interrupting active progress
                            if (unit.action === 'Working' || unit.action === 'Building' || unit.action === 'Harvesting') {
                                continue;
                            }

                            const dist = (unit.gridX - req.x) ** 2 + (unit.gridZ - req.z) ** 2;
                            let scorePenalty = 0;
                            if (unit.state) {
                                if (unit.state.constructor.name === 'Combat') continue; // FORBID Combat preemption
                                if (unit.state.constructor.name === 'Sleep') scorePenalty += 50;
                            }

                            // Distance Limit for Automatic Jobs (Prevent extreme long-distance travels)
                            if (!req.isManual && dist > 120 * 120) continue;

                            const totalScore = dist + scorePenalty;

                            // FAST FAIL: If score is already worse than the best we found, skip expensive reachability check
                            if (totalScore >= minDistSq) continue;

                            // NEW: Reachability Guard (Expensive check, only perform if unit is geometrically the best candidate so far)
                            if (unit.isReachable && !unit.isReachable(req.x, req.z, req.isManual)) {
                                continue;
                            }

                            minDistSq = totalScore;
                            bestUnit = unit;
                        }
                    }
                }
            }

            // FALLBACK: Global Scan (If no unit found in radius, OR if grid missing)
            if (!bestUnit) {
                if (req.isManual) console.log(`[Game] No worker in radius ${SEARCH_RAD} for Manual Req ${req.id}. Trying Global Scan...`);
                for (const unit of this.units) {
                    if (unit.isDead) continue;
                    const unitFaction = unit.faction || 'player';
                    if (unitFaction !== reqFaction) continue;
                    if (unit.role !== 'worker') continue;

                    if (unit.targetRequest && unit.targetRequest.id === req.id) continue;

                    if (unit.targetRequest) {
                        if (req.isManual && !unit.targetRequest.isManual) {
                            // Allowed
                        } else {
                            continue;
                        }
                    }
                    if (unit.action === 'Working' || unit.action === 'Building' || unit.action === 'Harvesting') {
                        continue;
                    }

                    const dist = (unit.gridX - req.x) ** 2 + (unit.gridZ - req.z) ** 2;
                    let scorePenalty = 0;
                    if (unit.state) {
                        if (unit.state.constructor.name === 'Combat') continue; // FORBID Combat preemption
                        if (unit.state.constructor.name === 'Sleep') scorePenalty += 50;
                    }

                    // Distance Limit for Automatic Jobs (Prevent extreme long-distance travels)
                    if (!req.isManual && dist > 120 * 120) continue;

                    const totalScore = dist + scorePenalty;

                    // FAST FAIL: If score is already worse than the best we found, skip expensive reachability check
                    if (totalScore >= minDistSq) continue;

                    // NEW: Reachability Guard (Expensive check, only perform if unit is geometrically the best candidate so far)
                    if (unit.isReachable && !unit.isReachable(req.x, req.z, req.isManual)) {
                        continue;
                    }

                    minDistSq = totalScore;
                    bestUnit = unit;
                }
            }

            // Fallback: If no worker nearby, maybe scan a small subset of all units? 
            // Or just leave it for another frame? (Better for performance)
            // If the map is 160x160, Radius 30 is quite large.

            if (bestUnit) {
                this.claimRequest(bestUnit as any, req);
            }
        } catch (e) {
            console.error("[Game] assignRequestSync error:", e);
        }
    }

    // Legacy Alias
    forceAssignRequest(req) {
        this.assignRequestSync(req);
    }

    claimRequest(unit, req) {
        if (!unit || !req) return false;

        // --- FACTION CHECK ---
        const uFaction = (unit.faction) ? unit.faction : 'player';
        const rFaction = (req.faction) ? req.faction : 'player';
        if (uFaction !== rFaction) return false;

        if (req.status === 'assigned' && String(req.assignedTo) === String(unit.id)) {
            // Even if already assigned, ensure the unit is actually in Job state
            const isAlreadyInJob = unit.state && (unit.state.name === 'Job' || unit.state.constructor.name === 'Job');
            if (isAlreadyInJob) return true;
        }


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
        let isSwitching = false;
        if (unit.targetRequest && unit.targetRequest.id !== req.id) {
            this.releaseRequest(unit, unit.targetRequest);
            isSwitching = true;
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
        if (unit.faction === 'enemy') {
            unit.action = 'Moving';
        } else {
            unit.action = 'Approaching Job';
        }
        unit.isMoving = false; // INTERRUPT: Stop any current walk (Wander/Patrol) to react to Job!
        unit.lastPathTime = 0; // Force immediate pathfinding for new job

        // 4. CHANGE STATE (Only if needed)
        // Guard: If already in Job for this request, don't re-enter (prevents loop/flicker)
        const isAlreadyInJob = unit.state && (unit.state.name === 'Job' || unit.state.constructor.name === 'Job');
        if (!isAlreadyInJob || isSwitching) {
            if (unit.changeState) {
                unit.changeState(new Job(unit));
            }
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
            }
        }
        // FIX: Ensure unit side reference is also cleared to avoid ghost indicators (!)
        if (unit && unit.targetRequest && unit.targetRequest.id === req.id) {
            unit.targetRequest = null;
            if (unit.changeState && unit.getDefaultState) {
                unit.changeState(unit.getDefaultState());
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
                    if (u.changeState) {
                        const defaultState = (u as any).getDefaultState ? (u as any).getDefaultState() : null;
                        u.changeState(defaultState || new Wander(u));
                    }
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
            // --- 1. Dimensions ---
            const logicalW = this.terrain ? this.terrain.logicalWidth : 160;
            const logicalD = this.terrain ? this.terrain.logicalDepth : 160;

            if (dx > logicalW / 2) dx = logicalW - dx;
            if (dz > logicalD / 2) dz = logicalD - dz;

            return (dx * dx + dz * dz) < (radius * radius);
        });

        if (idx !== -1) {
            const req = this.requestQueue[idx];
            req.status = 'cancelled'; // SIGNAL: Mark as cancelled for active Jobs
            console.log(`[Game] Cancelling Request ${req.id} at ${req.x},${req.z}`);

            // 1. Release assigned unit
            if (req.assignedTo !== null && req.assignedTo !== undefined) {
                const unit = this.units.find(u => String(u.id) === String(req.assignedTo));
                if (unit) {
                    unit.targetRequest = null;
                    unit.targetRequest = null;
                    if (unit.state instanceof Job) {
                        const nextState = unit.getDefaultState();
                        if (unit.changeState) unit.changeState(nextState);
                    } else if (unit.changeState) {
                        unit.changeState(new Wander(unit));
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
                // Throttled Warning for missing mesh (Only for player markers)
                const faction = req.faction || 'player';
                if (this.frameCount % 300 === 0 && faction === 'player') {
                    console.warn(`[Game] Request ${req.id} has NO MESH! Status: ${req.status}`);
                }
            }
        }
    }

    // Cancel Request at specific location (Proximity Search)

    /**
     * Watchdog: Scan for expired or broken requests.
     * This is the entry point called by the main loop/tests.
     */
    checkExpiredRequests(currentTime: number) {
        // Sync simulation time (useful for tests advancing time manually)
        this.simTotalTimeSec = currentTime;

        // Timeout: 300s (5 Minutes)
        const TIMEOUT = 300;

        // 1. CLEANUP: Remove completed or extremely old pending requests
        for (let i = this.requestQueue.length - 1; i >= 0; i--) {
            const req = this.requestQueue[i];
            if (!req) continue;

            if (req.status === 'completed') {
                if (!req.completedAt) req.completedAt = currentTime;
                if (currentTime - (req.completedAt || 0) > 0.2) {
                    this.removeRequest(req);
                    continue;
                }
            }

            if (req.status === 'pending' && (currentTime - (req.createdAt || 0) > TIMEOUT)) {
                console.log(`[Game] Request Timed Out: ${req.type} ID:${req.id}`);
                this.removeRequest(req);
                continue;
            }
        }

        // 2. WATCHDOG: Detect and fix stuck assignments
        this.detectZombieRequests(50);

        // 3. SCHEDULER: Process pending requests
        this.processAssignments(50);
    }

    /**
     * Internal watchdog logic to scan assignments.
     */
    detectZombieRequests(BUDGET = 50) {
        if (!this.requestQueue) return;
        const total = this.requestQueue.length;
        if (total === 0) return;

        if (this.requestCheckIndex === undefined) this.requestCheckIndex = 0;
        const startIdx = this.requestCheckIndex % total;
        const currentTime = this.simTotalTimeSec;

        for (let i = 0; i < Math.min(total, BUDGET); i++) {
            const idx = (startIdx + i) % total;
            const req = this.requestQueue[idx];
            if (!req) continue;

            if (req.status === 'assigned') {
                const assigneeId = req.assignedTo;
                if (assigneeId !== null) {
                    const maxStuck = req.isManual ? 60.0 : 30.0;
                    const maxFighting = 60.0; // Increased from 10.0 to prevent resetting during long battles
                    const maxDecoupled = 5.0; // Increased from 1.0 to prevent premature reset during loading or lag

                    const now = this.simTotalTimeSec;
                    const assignedTime = req.assignedAt || 0;
                    const timeDiff = now - assignedTime;

                    const unit = this.units.find(u => String(u.id) === String(req.assignedTo));

                    let needsReset = false;
                    let reason = "";

                    if (!unit || unit.isDead) {
                        needsReset = true;
                        reason = !unit ? "Unit not found" : "Unit dead";
                    } else if (unit.targetRequest && String(unit.targetRequest.id) !== String(req.id)) {
                        needsReset = true;
                        reason = "Unit has different request";
                    } else if (unit.ignoredTargets && unit.ignoredTargets.has(req.id)) { // FIX: Use req.id directly, not Number(req.id)
                        needsReset = true;
                        reason = "Unit ignored request (Unreachable)";
                    } else if (unit.action === 'Fighting' || (unit.state && unit.state.name === 'Combat')) {
                        if (timeDiff > maxFighting) {
                            needsReset = true;
                            reason = "Distracted/Fighting too long";
                        }
                    } else if (unit.action === 'Working' || unit.action === 'Building' || unit.action === 'Approaching Job') {
                        if (timeDiff > maxStuck) {
                            needsReset = true;
                            reason = `Stuck in ${unit.action} for too long (${timeDiff.toFixed(1)}s)`;
                        }
                    } else {
                        // Unit is Idle, Wander, or other state while assigned a job
                        if (timeDiff > maxDecoupled) {
                            needsReset = true;
                            reason = `State decoupled (${unit.action || 'unknown'})`;
                        }
                    }

                    if (needsReset) {
                        console.warn(`[Game] Watchdog: Detected ZOMBIE Request ${req.id} (Assigned to ${assigneeId}). Reason: ${reason}. Resetting.`);
                        req.status = 'pending';
                        req.assignedTo = null;
                        if (req.mesh) {
                            if (this.markerMaterial) Object.assign(req.mesh.material, this.markerMaterial);
                            else (req.mesh as any).material.color?.set(0xffffff);
                        }
                    }
                } else {
                    req.status = 'pending';
                }
            }

            if (req.status === 'pending') {
                if (!req.lastAttempt) req.lastAttempt = req.createdAt || currentTime;
                if (currentTime - (req.lastAttempt || 0) > 1.0) {
                    this.assignRequestSync(req);
                    req.lastAttempt = currentTime;
                }
            }
        }
        this.requestCheckIndex = (startIdx + BUDGET) % total;
    }

    private removeRequestAt(idx: number) {
        const req = this.requestQueue[idx];
        if (req && req.mesh) {
            this.scene.remove(req.mesh);
            if (req.mesh.geometry) req.mesh.geometry.dispose();
            if (req.mesh.material) {
                const materials = Array.isArray(req.mesh.material) ? req.mesh.material : [req.mesh.material];
                materials.forEach(m => { if (m && typeof (m as any).dispose === 'function') (m as any).dispose(); });
            }
            req.mesh = null;
        }
        this.requestQueue.splice(idx, 1);
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
        const material = this.markerMaterial.clone() as THREE.ShaderMaterial;
        material.uniforms.uColor.value.setHex(color); // Use passed color

        const mesh = new THREE.Mesh(this.projectileGeo, material);
        mesh.position.copy(startPos);

        // MAP WRAPPING VISUAL FIX
        // If dist > logicalWidth / 2, wrap target to be adjacent!
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

            // Validation: Height Check for Buildings
            if (req.type === 'build_tower' || req.type === 'build_barracks' || req.type === 'build_house' || req.type === 'build_port') {
                const h = this.terrain.getTileHeight(tx, tz);
                const isPort = req.type === 'build_port';
                // Tower/Barracks/House must be on land (h > 0). Port can be in water or on coast.
                if (h > 12 || (!isPort && h <= 0)) {
                    console.warn(`[Game] Manual build failed: Invalid terrain (Height: ${h}, type: ${req.type}) at ${tx},${tz}`);
                    this.removeRequest(req);
                    return;
                }
            }

            if (req.type === 'raise') {
                this.terrain.raise(tx, tz);
            } else if (req.type === 'lower') {
                this.terrain.lower(tx, tz);
            } else if (req.type === 'flatten') {
                this.terrain.flattenArea(tx, tz, 2); // Default size 2
            } else if (req.type === 'clear') {
                this.terrain.clearArea(tx, tz, 2); // Default size 2
            } else if (req.type === 'build_tower') {
                // FORCE=FALSE: Even if it's a manual request, we must validate the final terrain state
                const b = this.terrain.addBuilding('tower', tx, tz, false, false, unit.faction);
                if (!b) success = false;
            } else if (req.type === 'build_barracks') {
                const b = this.terrain.addBuilding('barracks', tx, tz, false, false, unit.faction);
                if (!b) success = false;
            } else if (req.type === 'build_house') {
                const b = this.terrain.addBuilding('house', tx, tz, false, false, unit.faction);
                if (!b) success = false;
            } else if (req.type === 'build_port') {
                // Auto-flatten is SKIPPED for ports to preserve the coastline
                // FORCE=FALSE is CRITICAL here to prevent landlocked ports
                const b = this.terrain.addBuilding('port', tx, tz, false, false, unit.faction);
                if (!b) {
                    console.warn(`[Game] Manual port build failed: Terrain constraints (Coastal/Connectivity) at ${tx},${tz}`);
                    success = false;
                }
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
                if (req.mesh && req.mesh.material) {
                    // Cast to ShaderMaterial to access uniforms safely
                    const mat = req.mesh.material as THREE.ShaderMaterial;
                    if (mat.uniforms && mat.uniforms.uColor) {
                        mat.uniforms.uColor.value = new THREE.Color(0x00FF00); // Green
                        mat.uniforms.uTime.value = (req.markerTime || 0); // Use stored offset
                    }
                }
            }
        } else {
            // Execution Failed (e.g. invalid location, building collision)
            // Remove immediately to free unit and clear queue
            console.log(`[Game] Request Execution Failed (${req.type}). Removing from queue.`);
            this.removeRequest(req);
        }
    }

    updateCameraControls() {
        if (this.controls) {
            this.controls.update();
        }

        // Safety check for camera (essential for tests)
        if (!this.camera) return;

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

        if (this.clippingPlanes && this.clippingPlanes.length >= 4) {
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
        // Filter out Enemy Units from population count
        const playerUnits = this.units.filter(u => u.faction !== 'enemy');
        let housingPop = 0;
        if (this.terrain && this.terrain.buildings) {
            this.terrain.buildings.forEach((b: any) => {
                if (b.userData && (b.userData.type === 'house' || b.userData.type === 'castle')) {
                    housingPop += (b.population || 0);
                }
            });
        }
        this.totalPopulation = Math.floor(housingPop) + (playerUnits.length * 10);

        const hours = Math.floor(this.gameTime);
        const minutes = Math.floor((this.gameTime % 1) * 60);
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} `;
        const isNight = (this.gameTime >= 18 || this.gameTime < 6);
        let weatherIcon = isNight ? '🌙' : '☀️';

        // Overwrite with weather icon if not clear
        if (this.weatherManager) {
            const w = this.weatherManager.currentWeather;
            if (w === 'Rain') weatherIcon = '🌧️';
            else if (w === 'HeavyRain') weatherIcon = '⛈️';
            else if (w === 'Snow') weatherIcon = '❄️';
            else if (w === 'HeavySnow') weatherIcon = '🌨️';
        }

        (document.getElementById('time-val') as HTMLElement).innerText = `${timeStr} ${weatherIcon} `;
        const elDay = document.getElementById('day-val') as HTMLElement;
        if (elDay) elDay.innerText = `Day ${this.daysPassed || 1} `;

        (document.getElementById('season-val') as HTMLElement).innerText = this.season || 'Spring';

        (document.getElementById('pop-val') as HTMLElement).innerText = Math.floor(this.totalPopulation || 0).toString();

        // Level Display Update
        const levelNum = (this.currentLevelIndex || 0) + 1;
        const elLevelVal = document.getElementById('level-val');
        if (elLevelVal) elLevelVal.innerText = `Level ${levelNum}`;
        const elStartLevel = document.getElementById('start-level-display');
        if (elStartLevel) elStartLevel.innerText = `Level ${levelNum}`;

        // Active Unit Counts
        const knights = playerUnits.filter(u => u.role === 'knight').length;
        const wizards = playerUnits.filter(u => u.role === 'wizard').length;
        const warships = playerUnits.filter(u => u.role === 'warship').length;

        (document.getElementById('active-val') as HTMLElement).innerText = playerUnits.length.toString();
        const elKnight = document.getElementById('knight-val') as HTMLElement;
        if (elKnight) elKnight.innerText = knights.toString();
        const elWizard = document.getElementById('wizard-val') as HTMLElement;
        if (elWizard) elWizard.innerText = wizards.toString();
        const elWarship = document.getElementById('warship-val') as HTMLElement;
        if (elWarship) elWarship.innerText = warships.toString();

        const elHouse = document.getElementById('house-val') as HTMLElement;
        // Exclude enemy houses
        if (elHouse && this.terrain && this.terrain.buildings) {
            elHouse.innerText = this.terrain.buildings.filter((b: any) => b.userData.type === 'house' && b.userData.faction !== 'enemy').length.toString();
        }
        // document.getElementById('castle-val').innerText = ... (Removed from UI)
        (document.getElementById('grain-val') as HTMLElement).innerText = Math.floor(this.resources.grain).toString();
        (document.getElementById('fish-val') as HTMLElement).innerText = Math.floor(this.resources.fish).toString();
        (document.getElementById('meat-val') as HTMLElement).innerText = Math.floor(this.resources.meat).toString();

        // Mana Check
        const elMana = document.getElementById('mana-val') as HTMLElement;
        if (elMana) {
            elMana.innerText = Math.floor(this.mana).toString();
            // Change color if negative
            elMana.style.color = this.mana < 0 ? '#ff4444' : 'white';
        }

        this.updateButtonStates();
    }

    updateButtonStates() {
        const mana = this.mana || 0;

        // 1. Barracks Logic
        const barracksCount = (this.terrain && this.terrain.buildings) ? this.terrain.buildings.filter((b: any) => b.userData.type === 'barracks').length : 0;
        // Threshold: 0 -> 1000, 1 -> 2000, 2 -> 3000... (Example Scaling)
        // User said: "1000 for first, 2000 for next (if 1 exists)".
        const barracksCost = 1000 * (barracksCount + 1);

        const btnBarracks = document.getElementById('btn-barracks') as HTMLButtonElement;
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
        // 5. Port Cost
        const portCount = (this.terrain && this.terrain.buildings) ? this.terrain.buildings.filter((b: any) => b.userData.type === 'port').length : 0;
        const portCost = 150 * (portCount + 1); // Example cost, adjust as needed

        const btnPort = document.getElementById('btn-port') as HTMLButtonElement;
        if (btnPort) {
            if (mana < portCost) {
                btnPort.disabled = true;
                btnPort.style.opacity = '0.5';
                btnPort.style.pointerEvents = 'none';
            } else {
                btnPort.disabled = false;
                btnPort.style.opacity = '1.0';
                btnPort.style.pointerEvents = 'auto';
            }
        }

        const towerCount = (this.terrain && this.terrain.buildings) ? this.terrain.buildings.filter((b: any) => b.userData.type === 'tower').length : 0;
        const towerCost = 1000 * (towerCount + 1);

        const btnTower = document.getElementById('btn-tower') as HTMLButtonElement;
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

        // 3. House Logic
        const houseCost = 100;
        const btnHouse = document.getElementById('btn-house') as HTMLButtonElement;
        if (btnHouse) {
            if (mana < houseCost) {
                btnHouse.disabled = true;
                btnHouse.style.opacity = '0.5';
                btnHouse.style.pointerEvents = 'none';
            } else {
                btnHouse.disabled = false;
                btnHouse.style.opacity = '1.0';
                btnHouse.style.pointerEvents = 'auto';
            }
        }

        // 4. Worker Spawn Logic
        // "Worker generation... cannot press if mana restricted"
        // Let's assume a cost of 50 for manual spawn.
        const spawnCost = 50;
        const btnSpawn = document.getElementById('btn-spawn') as HTMLButtonElement;
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

    // Error Throttling
    private errorCounts: { [key: string]: number } = {};
    private logErrorThrottle(key: string, error: any) {
        if (!this.errorCounts[key]) this.errorCounts[key] = 0;
        if (this.errorCounts[key] < 10) {
            console.error(`[${key}]`, error);
            this.errorCounts[key]++;
            if (this.errorCounts[key] === 10) console.warn(`[${key}] Suppressing further errors.`);
        }
    }
    update(deltaTime: number) {
        if (this.minimal && (this.frameCount % 60 === 0 || this.frameCount < 5)) {
            console.log(`[DEBUG] Game ${this.instanceId} update. Frame=${this.frameCount}, minimal=${this.minimal}, terrainType=${typeof this.terrain}, isMock=${!!(this.terrain as any).resetPathfindingBudget}`);
        }
        if (this.stopped) return;

        // CRITICAL FIX: Reset pathfinding budget every frame to prevent infinite "Calculating..."
        if (this.terrain && typeof this.terrain.resetPathfindingBudget === 'function') {
            if (this.minimal && this.frameCount % 60 === 0) {
                console.log(`[DEBUG] Calling resetPathfindingBudget on terrain. constructor: ${this.terrain.constructor?.name}, hasPathfindingCalls: ${'pathfindingCalls' in this.terrain}`);
            }
            this.terrain.resetPathfindingBudget();
        }

        const actualDt = deltaTime * (this.timeScale || 1.0);

        // Accumulate SIMULATED time (Pause during preview)
        if (this.simTotalTimeSec === undefined) this.simTotalTimeSec = (this.gameTotalTime || 0) / 1000;

        if (this.gameActive) {
            this.simTotalTimeSec += actualDt;
            if (this.gameTotalTime !== undefined) this.gameTotalTime += actualDt * 1000;
        }
        const simTimeSec = this.simTotalTimeSec;

        if (this.performanceMonitor) this.performanceMonitor.startUpdate();

        // 1. ALWAYS RUN: Visuals, Environment, Camera, Input, Stats, Minimap, Compass
        const tStart = performance.now();
        try {
            // Environment/Time Progression Logic
            // Pause time progression (Day/Night, Seasons) until game is active ('NEW' or 'Load' button pressed)
            const logicDt = this.gameActive ? actualDt : 0;
            this.isNight = this.updateEnvironment(logicDt);
            this.updateSeasons(logicDt);

            if (this.weatherManager) {
                this.weatherManager.update(simTimeSec, actualDt, this.camera, this.season || 'Spring');
            }
            if (this.cloudManager) {
                this.cloudManager.update(actualDt, this.camera);
                // Sync cloud color with sky color for atmosphere
                if ((this.cloudManager as any).updateColor) {
                    (this.cloudManager as any).updateColor(this.ambientLight.color);
                }
            }

            if (this.gameActive) {
                if (this.seaDecorationRenderer) {
                    this.seaDecorationRenderer.update(simTimeSec, actualDt);
                }

                if (this.birdManager) {
                    this.birdManager.update(actualDt, simTimeSec, this.frustum);
                }

                // Environment Objects Logic - Move back inside gameActive to freeze in preview
                if (this.sheepManager) {
                    this.sheepManager.update(simTimeSec, actualDt);
                }
                if (this.fishManager) {
                    this.fishManager.update(simTimeSec, actualDt);
                }
            }

            if (this.smokeManager) {
                this.smokeManager.update(actualDt);

                // Emit smoke periodically from specific buildings with chimneys
                this.smokeTimer += actualDt;
                if (this.smokeTimer > 0.3) {
                    this.smokeTimer = 0;
                    if (this.terrain && this.terrain.buildings) {
                        this.terrain.buildings.forEach(b => {
                            // Only emit from buildings that have chimneys (House, Barracks)
                            const type = b.type;
                            const isResidential = type === 'house' || type === 'mansion' || type === 'castle' || type === 'barracks';

                            if (isResidential && !b.isDestroyed()) {
                                const pos = this.terrain.getVisualPosition(b.gridX, b.gridZ);
                                const rotY = b.rotationY || 0;

                                // Default fallback offsets
                                let ox = 0, oy = 1.6, oz = 0;
                                let bx = pos.x, bz = pos.z;

                                // Specific chimney offsets matching BuildingRenderer geometry
                                if (type === 'house') {
                                    ox = 0.5; oy = 1.25; oz = 0.5; // 1.2 -> 1.25
                                    bx += 0.5; bz += 0.5;
                                } else if (type === 'barracks') {
                                    ox = 0.8; oy = 1.75; oz = 0.8; // 1.7 -> 1.75
                                    bx += 1.0; bz += 1.0;
                                }

                                // Rotate offset around Y axis (matches THREE.js CCW rotation)
                                const cosR = Math.cos(rotY);
                                const sinR = Math.sin(rotY);
                                const rx = ox * cosR + oz * sinR;
                                const rz = -ox * sinR + oz * cosR;

                                this.smokeManager.emit(bx + rx, pos.y + oy, bz + rz);
                            }
                        });
                    }
                }
            }

            // 0. Calculate Sway Intensity based on Weather
            this.swayIntensity = 1.0;
            if (this.weatherManager) {
                const w = this.weatherManager.currentWeather;
                const intensities: Record<string, number> = {
                    'Clear': 1.0,
                    'Rain': 1.6,
                    'HeavyRain': 2.4, // Reduced from 4.0 to prevent showing ocean floor (0.07 * 2.4 = 0.168 < 0.2)
                    'Snow': 1.2,
                    'HeavySnow': 2.0, // Reduced from 3.0
                    'Fog': 0.7
                };
                this.swayIntensity = intensities[w] || 1.0;
            }

            const tTerrain = performance.now();
            if (this.terrain) {
                this.terrain.update(actualDt, (x, z, type, b, sid) => this.handleBuildingSpawn(x, z, type, b, sid), this.isNight, this.units.length, this.gameActive, this.resources, this.swayIntensity);

                // Only update building logic if game is active
                if (this.gameActive && this.terrain.buildings) {
                    this.terrain.buildings.forEach(b => {
                        // All buildings should be checked for destruction cleanup
                        if (b.update) b.update(simTimeSec, actualDt);

                        if (b.isDestroyed && b.isDestroyed()) {
                            // console.log(`[Game] Removing destroyed building: ${b.type} (${b.id})`);
                            if (this.terrain.removeBuilding) {
                                this.terrain.removeBuilding(b);
                            }
                        }
                    });
                }
            }
            const tTerrainEnd = performance.now();
            if (tTerrainEnd - tTerrain > 15) console.log(`[Perf] Terrain.update took ${(tTerrainEnd - tTerrain).toFixed(2)}ms`);

        } catch (e) {

            this.logErrorThrottle("Env/Season", e);
        }

        try { this.updateStats(); } catch (e) { this.logErrorThrottle("Stats", e); }
        try { this.updateCameraControls(); } catch (e) { }

        if (this.inputManager) {
            try { this.inputManager.update(actualDt); } catch (e) { }
        }

        // Minimap & Compass should update in preview too
        const tMini = performance.now();
        if (this.minimap) {
            try { this.minimap.update(); } catch (e) { }
        }
        if (tMini - tStart > 10) { // Check accumulating time
            const tEnd = performance.now();
            // console.warn(`[Perf] Update Part 1 took ${(tEnd - tStart).toFixed(2)}ms (Minimap: ${(tEnd - tMini).toFixed(2)}ms)`);
        }

        if (this.compass) {
            try { this.compass.update(); } catch (e) { }
        }

        // 2. GAME ACTIVE ONLY: Units, AI, Logic, Requests, Mana
        // 2. GAME ACTIVE ONLY: Units, AI, Logic, Requests, Mana
        if (this.gameActive) {
            this.frameCount++;
            // this.frameCounter++; // REMOVED (Double counting, animate() already does this)

            // Mana
            const pop = (this.totalPopulation || 0);
            this.mana += pop * 0.1 * actualDt;

            // Enemy AI
            // Enemy AI & Goblin Logic
            try {
                if (this.enemyAI) this.enemyAI.update(actualDt);
                if (this.goblinManager) {
                    this.goblinManager.update(this.simTotalTimeSec || 0, actualDt, this.isNight, this.units, this.terrain.buildings, this.timeScale, this.camera);
                }
            } catch (e) { this.logErrorThrottle("EnemyAI/Goblins", e); }

            // Debug Log for Active State (Throttled)
            if (this.frameCount % 60 === 0) { // More frequent logging (approx 1 sec)
                console.log(`[Game ${this.instanceId}] Active. Frame=${this.frameCount} Time=${this.simTotalTimeSec.toFixed(1)} Pop=${this.totalPopulation}`);

                // Check Win/Loss
                this.checkWinLoss();
            }

            // Unit Updates (Time-Sliced)
            // Scale budget to ~30% of units (min 300, max 2000)
            // Increased to prevent "starvation" of high-ID units in dense populations.
            this.unitScanBudget = Math.min(2000, Math.max(300, Math.floor(this.units.length * 0.4)));

            try {
                const camX = this.camera ? this.camera.position.x : 0;
                const camZ = this.camera ? this.camera.position.z : 0;

                const INTERVAL_NEAR = 2;
                const INTERVAL_MID = 4;
                const INTERVAL_FAR = 30;
                const DIST_NEAR_SQ = 60 * 60;
                const DIST_FAR_SQ = 130 * 130;

                for (let i = this.units.length - 1; i >= 0; i--) {
                    const unit = this.units[i];
                    if (!unit) continue;

                    let interval = INTERVAL_NEAR;
                    const dx = unit.position.x - camX;
                    const dz = unit.position.z - camZ;
                    const distSq = dx * dx + dz * dz;

                    // Priority Check: Combat or Mission units update more regularly
                    // constructor.name check matches AI Unification names (Combat, Job)
                    // ADDED: isDead should also be urgent to ensure quick cleanup
                    const isUrgent = (unit.state && (unit.state.constructor.name === 'Combat' || unit.state.constructor.name === 'Job')) ||
                        unit.isDead || unit.isFinished;

                    if (!isUrgent) {
                        if (distSq > DIST_FAR_SQ) interval = INTERVAL_FAR;
                        else if (distSq > DIST_NEAR_SQ) interval = INTERVAL_MID;
                    }

                    const moveInterval = (interval > 30) ? 3 : 1;
                    if ((this.frameCounter + i) % moveInterval === 0) {
                        if (unit.updateMovement) unit.updateMovement(simTimeSec);
                    }

                    // Sync Action label even if logic is skipped (Prevent 'Moving' stuck)
                    if (unit.isMoving && (unit.action === 'Idle' || !unit.action)) {
                        unit.action = 'Moving';
                    } else if (unit.action === 'Moving' && !unit.isMoving) {
                        unit.action = 'Idle';
                    }

                    if ((this.frameCounter + i) % interval === 0) {
                        // --- BUDGET CHECK ---
                        let canUpdate = true;
                        if (!isUrgent && distSq > 400) { // > 20m
                            // REMOVED: Pre-logic budget consumption
                            // Let the internal state logic (e.g. checkSelfDefense) manage its own budget.
                            // This frame, they are ALLOWED to run their logic.
                            canUpdate = true;
                        }

                        // ALWAYS Update Age & Timers (Critical for Life Cycle)
                        if (unit.updateAge) unit.updateAge(actualDt * interval); // Ensure age progresses

                        // PRIORITY: Dead or Finished units ALWAYS update regardless of budget
                        if (!canUpdate && (unit.isDead || unit.isFinished)) {
                            canUpdate = true;
                        }

                        if (!canUpdate) {
                            // FIX: Worker needs to move if it cannot build here!
                            unit.stagnationTimer = (unit.stagnationTimer || 0) + actualDt;

                            // FAILSAFE: If stagnated too long (> 5s), force update
                            if (unit.stagnationTimer > 5.0) {
                                canUpdate = true;
                                unit.stagnationTimer = 0;
                                if (this.frameCounter % 60 === 0) console.log(`[Game] Unit ${unit.id} Forced Update (Stagnation)`);
                            }
                        } else {
                            unit.stagnationTimer = 0;
                        }

                        // DEBUG UNIT UPDATE
                        if (i === 0 && this.frameCounter % 60 === 0) {
                            console.log(`[Game DEBUG] Unit[0] update check. DistSq=${distSq.toFixed(0)} Interval=${interval} IsUrgent=${isUrgent} Budget=${this.unitScanBudget} CanUpdate=${canUpdate}`);
                        }

                        if (canUpdate) {
                            try {
                                const logicDt = actualDt * interval;
                                if (unit.updateLogic) {
                                    unit.updateLogic(simTimeSec, logicDt, this.isNight,
                                        this.units,
                                        this.terrain.buildings,
                                        this.goblinManager ? this.goblinManager.goblins : []
                                    );
                                } else {
                                    if (this.frameCounter % 120 === 0) console.warn(`[Game] Unit ${unit.id} has NO updateLogic! Type: ${unit.constructor.name}`);
                                }
                            } catch (e) {
                                console.error(`[Game] Error in Unit ${unit.id} updateLogic:`, e);
                                this.logErrorThrottle("UnitLogic", e);
                            }
                        }

                        if (unit.isDead && unit.isFinished) {
                            if (this.unitMap) this.unitMap.delete(unit.id);
                            this.units.splice(i, 1);
                        }
                    }
                }
            } catch (e) { this.logErrorThrottle("UnitLoop", e); }

            // --- GLOBAL UPDATES (Terrain/Economy) ---
            // Removed: terrain.updatePopulation(actualDt) - Now handled inside terrain.update() 
            // to prevent double growth and consolidate parameters (isNight, spawnCallback).

            // BUDGETED LOGIC: Interleave expensive checks across multiple frames
            if (this.frameCounter % 15 === 0) {
                this.checkExpiredRequests(simTimeSec);
            }
            if (this.frameCounter % 30 === 0) {
                this.detectZombieRequests();
            }

            this.updateBattleHotspots(actualDt);
            this.updateSquadMobilization(actualDt);
            this.updateProjectiles(actualDt); // Only update projectiles if game active
        }

        // --- ALWAYS RUN (Preview & Active) ---
        if (this.frameCounter % 2 === 0) {
            this.updateRequestMarkers();
        }

        // Shader Uniforms (Markers) - Keep updating for visual persistence if needed
        this.markerTime = (this.markerTime || 0) + actualDt;
        try {
            for (const req of this.requestQueue) {
                const mesh = req.mesh;
                if (mesh && mesh.material) {
                    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                    mats.forEach(m => {
                        if ((m as any).uniforms && (m as any).uniforms.uTime) {
                            (m as any).uniforms.uTime.value = this.markerTime;
                        }
                    });
                }
            }
        } catch (e) { }

        if (this.frameCounter % 60 === 0) {
            // Suppress heartbeat if not active to reduce log spam
            if (this.gameActive) {
                console.log(`[Game] Heartbeat: Active = ${this.gameActive}, Units = ${this.units.length}, Pop = ${this.totalPopulation.toFixed(0)}, FPS = ${(1 / actualDt).toFixed(1)} `);
            }
        }

        if (this.performanceMonitor) this.performanceMonitor.endUpdate();
    }

    animate() {
        if (this.stopped) {
            if (this.animationFrameId !== null) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            return;
        }

        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

        try {
            this.frameCounter = (this.frameCounter || 0) + 1;

            const time = performance.now();
            let deltaTime = (time - (this.lastTime || time)) / 1000;
            if (isNaN(deltaTime) || deltaTime < 0) deltaTime = 0;
            if (deltaTime > 0.5) deltaTime = 0.5;
            this.lastTime = time;

            this.update(deltaTime);

            if (this.clippingPlanes && this.clippingPlanes.length === 4 && this.controls && this.controls.target) {
                const tx = this.controls.target.x;
                const tz = this.controls.target.z;
                const r = this.viewRadius;
                this.clippingPlanes[0].constant = r - tx;
                this.clippingPlanes[1].constant = r + tx;
                this.clippingPlanes[2].constant = r - tz;
                this.clippingPlanes[3].constant = r + tz;
            }

            if (!this.isLoading) {
                let frustum = new THREE.Frustum();
                if (this.camera && typeof this.camera.updateMatrixWorld === 'function' && this.camera.projectionMatrix) {
                    this.camera.updateMatrixWorld();
                    frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse));
                }

                try {
                    if (this.birdManager) this.birdManager.update(deltaTime, this.simTotalTimeSec || 0, frustum);
                    if (this.sheepManager) this.sheepManager.update(this.simTotalTimeSec || 0, deltaTime);
                    if (this.fishManager) this.fishManager.update(this.simTotalTimeSec || 0, deltaTime, frustum);

                    if (typeof this.terrain.updateMeshPosition === 'function') {
                        this.terrain.updateMeshPosition(this.camera);
                    }

                    if (this.gameActive) {
                        if (typeof this.terrain.updateLights === 'function') {
                            this.terrain.updateLights(this.gameTime);
                        }
                        if (this.buildingRenderer && typeof this.buildingRenderer.updateLighting === 'function') {
                            this.buildingRenderer.updateLighting(this.isNight);
                        }
                    }

                    if (this.unitRenderer && typeof this.unitRenderer.update === 'function') {
                        this.unitRenderer.update(this.units, (this.controls && this.controls.target) ? this.controls.target : (this.camera ? this.camera.position : new THREE.Vector3()));
                    }
                    if (this.buildingRenderer && this.terrain && typeof this.buildingRenderer.update === 'function') {
                        this.buildingRenderer.update(this.terrain.buildings || [], frustum, (this.controls && this.controls.target) ? this.controls.target : (this.camera ? this.camera.position : new THREE.Vector3()), this.simTotalTimeSec || 0, this.swayIntensity);
                    }
                    if (this.goblinRenderer && this.goblinManager && typeof this.goblinRenderer.update === 'function') {
                        this.goblinRenderer.update(this.goblinManager.goblins, (this.controls && this.controls.target) ? this.controls.target : (this.camera ? this.camera.position : new THREE.Vector3()));
                    }
                    if (this.seaDecorationRenderer && typeof this.seaDecorationRenderer.update === 'function') {
                        this.seaDecorationRenderer.update(this.simTotalTimeSec || 0);
                    }
                    if (this.treeRenderer && typeof this.treeRenderer.update === 'function') {
                        this.treeRenderer.update((this.controls && this.controls.target) ? this.controls.target : (this.camera ? this.camera.position : new THREE.Vector3()), this.simTotalTimeSec || 0, this.swayIntensity);
                    }
                    if (this.landDecorationRenderer && typeof this.landDecorationRenderer.update === 'function') {
                        this.landDecorationRenderer.update((this.controls && this.controls.target) ? this.controls.target : (this.camera ? this.camera.position : new THREE.Vector3()), this.simTotalTimeSec || 0, this.swayIntensity || 1.0);
                    }
                    if (this.cloudManager && typeof this.cloudManager.update === 'function') {
                        this.cloudManager.update(deltaTime, this.simTotalTimeSec || 0);
                    }
                    if (this.smokeManager && typeof this.smokeManager.update === 'function') {
                        this.smokeManager.update(deltaTime);
                    }
                } catch (e) {
                    console.error("[Game] Render-update loop error:", e);
                }
            } else {
                // LIMITED UPDATE DURING LOADING (For Previews)
                try {
                    if (this.seaDecorationRenderer && typeof this.seaDecorationRenderer.update === 'function') {
                        this.seaDecorationRenderer.update(this.simTotalTimeSec || 0);
                    }
                    if (this.treeRenderer && typeof this.treeRenderer.update === 'function') {
                        this.treeRenderer.update((this.controls && this.controls.target) ? this.controls.target : (this.camera ? this.camera.position : new THREE.Vector3()), this.simTotalTimeSec || 0, this.swayIntensity);
                    }
                    if (this.landDecorationRenderer && typeof this.landDecorationRenderer.update === 'function') {
                        this.landDecorationRenderer.update((this.controls && this.controls.target) ? this.controls.target : (this.camera ? this.camera.position : new THREE.Vector3()), this.simTotalTimeSec || 0, this.swayIntensity || 1.0);
                    }
                } catch (e) {
                    console.error("[Game] Loading-render-update error:", e);
                }
            }

            if (this.performanceMonitor) this.performanceMonitor.startRender();

            // DEBUG PANEL UPDATE
            const u = (window as any).debugSelectedUnit;
            const panel = document.getElementById('unit-debug-panel');
            if (panel && u) {
                try {
                    const isGoblin = u.type === 'goblin';
                    const isUnit = u.type === 'unit';
                    const typeLabel = isGoblin ? 'Goblin' : (isUnit ? 'Human' : (u.constructor ? u.constructor.name : 'Entity'));

                    const hpVal = Math.floor(u.hp || 0);
                    const hpMaxVal = Math.floor(u.maxHp || 100);
                    const hpInfo = `HP: ${hpVal} / ${hpMaxVal}`;
                    const posInfo = `Pos: ${typeof u.gridX === 'number' ? u.gridX.toFixed(1) : '?'}, ${typeof u.gridZ === 'number' ? u.gridZ.toFixed(1) : '?'}`;
                    const stateName = u.state ? u.state.constructor.name : (u.action || 'Idle');

                    const now = this.simTotalTimeSec || 0;
                    const elapsedMove = u.isMoving ? (now - (u.moveStartTime || 0)).toFixed(2) : "0.00";
                    const dur = (u.moveDuration !== undefined) ? u.moveDuration.toFixed(2) : "Undef";

                    let reqInfo = "No Request";
                    if (u.targetRequest) {
                        const rx = typeof u.targetRequest.x === 'number' ? u.targetRequest.x.toFixed(1) : '?';
                        const rz = typeof u.targetRequest.z === 'number' ? u.targetRequest.z.toFixed(1) : '?';
                        reqInfo = `Req:${u.targetRequest.id || '?'} (${u.targetRequest.status || '?'}) \nAt:${rx},${rz} `;
                    }

                    const pathInfo = (u.path && u.path.length > 0) ? `Path:${u.path.length} nodes` :
                        ((u.isWaitingForPath || u.isPathfinding) ? "Calculating..." :
                            (u.isPathfindingThrottled ? "Throttled (Wait)" : "No Path"));
                    const moveInfo = `Moving:${u.isMoving} (T:${elapsedMove} / D:${dur}) `;

                    let targetInfo = "No TargetObj";
                    let targetDist = "";
                    if (u.targetGoblin) {
                        const t = u.targetGoblin;
                        targetInfo = `En:Goblin(${t.id}) @${t.gridX.toFixed(1)},${t.gridZ.toFixed(1)}`;
                        targetDist = `Dst:${u.getDistance(t.gridX, t.gridZ).toFixed(1)}`;
                    } else if (u.targetUnit) {
                        const t = u.targetUnit;
                        targetInfo = `En:Unit(${t.id}) @${t.gridX.toFixed(1)},${t.gridZ.toFixed(1)}`;
                        targetDist = `Dst:${u.getDistance(t.gridX, t.gridZ).toFixed(1)}`;
                    } else if (u.targetBuilding) {
                        const t = u.targetBuilding;
                        const tx = t.gridX !== undefined ? t.gridX : (t.userData ? t.userData.gridX : 0);
                        const tz = t.gridZ !== undefined ? t.gridZ : (t.userData ? t.userData.gridZ : 0);
                        targetInfo = `Build:${t.id || 'Obj'} @${tx.toFixed(1)},${tz.toFixed(1)}`;
                        targetDist = `Dst:${u.getDistance(tx, tz).toFixed(1)}`;
                    }

                    const throttleInfo = `Throttled:${u.isPathfindingThrottled ? "YES (Wait)" : "NO"}`;
                    const lastPathInfo = `LastP:${(u.lastPathTime || 0).toFixed(1)} `;
                    const failsafeInfo = `Unreachable:${u.isUnreachable || false} Dead:${u.isDead} Stuck:${u.stuckCount || 0}`;

                    let failInfo = "No Recent Fail";
                    if (u.lastFailureReason && (now - (u.lastFailureTime || 0) < 5.0)) {
                        failInfo = `FAIL: ${u.lastFailureReason} (${(now - u.lastFailureTime).toFixed(1)}s ago)`;
                    }

                    let isStillActive = false;
                    if (isUnit) isStillActive = this.units.includes(u);
                    else if (isGoblin && this.goblinManager) isStillActive = this.goblinManager.goblins.includes(u);
                    else isStillActive = !u.isDead;

                    if (u.isDead || !isStillActive) {
                        panel.innerText = `[${typeLabel} ${u.id}] Disposed / Dead`;
                    } else {
                        let txt = `[${typeLabel} ${u.id}] ${u.role || u.type || ''} \n`;
                        txt += `${hpInfo} | ${posInfo}\n`;
                        txt += `State: ${stateName} \n`;
                        if (u.lastJobResult) txt += `LastJob: ${u.lastJobResult} / Log: ${u.lastMoveLog || ''}\n`;
                        txt += `${reqInfo}\n${pathInfo}\n${moveInfo}\n`;
                        txt += `${targetInfo} | ${targetDist} | ${throttleInfo}\n`;
                        txt += `${failsafeInfo} | ${lastPathInfo}\n`;
                        txt += `--------------------\n`;
                        txt += `${failInfo}`;
                        panel.innerText = txt;
                    }
                    panel.style.display = 'block';
                } catch (e) {
                    console.error("[Game] Debug panel update error:", e);
                }
            }

            this.renderer.render(this.scene, this.camera);
            if (this.performanceMonitor) {
                this.performanceMonitor.endRender();
                this.performanceMonitor.update(this);
            }
        } catch (fatalError) {
            console.error("[Game] FATAL_GAME_LOOP", fatalError);
        }
    }

    saveGame(slotId: string) {
        if (!this.saveManager) return false;
        try {
            console.log('[Game] Serializing Resources...');
            const resources = this.resources;

            console.log('[Game] Serializing Terrain...');
            const terrainData = this.terrain.serialize();
            console.log(`[Game] Terrain data size: ${JSON.stringify(terrainData).length}`);

            console.log('[Game] Serializing Units...');
            const unitData = this.units.map((u, i) => {
                try {
                    const s = u.serialize();
                    // Optional: check individual unit size if needed
                    return s;
                } catch (err) {
                    console.error(`[Game] Failed to serialize unit at index ${i}`, err);
                    throw err;
                }
            });

            const requestData = this.requestQueue.map(req => ({
                id: req.id,
                type: req.type,
                x: req.x,
                z: req.z,
                status: req.status,
                assignedTo: req.assignedTo,
                assignedAt: req.assignedAt,
                createdAt: req.createdAt,
                isManual: req.isManual,
            }));

            const goblinData = this.goblinManager ? this.goblinManager.serialize() : null;

            const saveData = {
                slotId: slotId,
                timestamp: Date.now(),
                resources: resources,
                mana: this.mana, // PERSIST MANA
                gameTime: this.gameTime,
                gameTotalTime: this.gameTotalTime,
                currentSeasonIndex: this.currentSeasonIndex,
                daysPassed: this.daysPassed,
                terrain: terrainData,
                units: unitData,
                requests: requestData,
                goblinManager: goblinData,
                battleMemory: this.battleMemory ? this.battleMemory.raids : [], // PERSIST BATTLE_MEMORY
                battleHotspots: this.battleHotspots || [], // PERSIST HOTSPOTS
                raidPoints: this.raidPoints || [], // PERSIST RAID_POINTS
                squads: Array.from(this.squads.entries()), // PERSIST SQUADS as Array
                camera: {
                    position: { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
                    zoom: this.camera.zoom,
                    target: this.controls && this.controls.target ?
                        { x: this.controls.target.x, y: this.controls.target.y, z: this.controls.target.z } :
                        { x: 0, y: 0, z: 0 }
                },
                currentLevelIndex: this.currentLevelIndex,
                currentSeed: this.currentSeed || (this.terrain ? this.terrain.seed : null)
            };
            console.log(`[Game] Saving Game: Slot=${slotId}`);
            const result = this.saveManager.save(slotId, saveData);
            return result;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }


    async startNewGame() {
        console.log(`DEBUG: startNewGame. CurrentLevel=${this.currentLevelIndex} CurrentSeed=${this.terrain?.seed}`);
        if (this.gameActive || this.isLoading) return; // Prevent Double Click

        this.isLoading = true; // LOCK
        console.log(`[Game] Starting Level ${this.currentLevelIndex + 1} with Seed ${this.terrain?.seed}`);

        // [USER_REQUEST] リセット処理を削除し、プレビュー時の状態を維持
        // Use the seed that was generated during preview, and DO NOT reset stats
        await this.startLevel(this.currentLevelIndex, this.terrain?.seed || null, false);
    }

    async startLevel(levelIndex: number, specificSeed: number | null = null, resetStats: boolean = true) {
        if (!Levels[levelIndex]) {
            console.error(`[Game] Level ${levelIndex} not found!`);
            return;
        }

        const config = Levels[levelIndex];
        this.currentLevelIndex = levelIndex;
        console.log(`[Game] Starting Level ${config.levelId}: ${config.title}, W=${config.mapWidth} (ResetStats=${resetStats})`);

        if (resetStats) {
            // Reset Resources for New Level Preview
            this.resources = { grain: 50, fish: 50, meat: 0 };
            this.mana = 100;
            this.totalPopulation = 0;

            // Reset Time to 8:00 AM for New Level Preview
            this.gameTime = 8.0;
            this.gameTotalTime = 0;
            this.simTotalTimeSec = 0;
            this.daysPassed = 0;
            this.isNight = false;
            this.prevTimeOfDay = 8.0;
        }

        let preservedSeed: number | null = specificSeed;

        // 0. Clear Old Entities (Prevent Double Spawn on Restart)
        this.clearEntities();

        // 1. Dispose Old Terrain
        if (this.terrain) {
            // Check if we should preserve seed (Same Level/Size & Level 0)
            if (levelIndex === 0 &&
                this.terrain.logicalWidth === config.mapWidth &&
                this.terrain.logicalDepth === config.mapDepth &&
                this.terrain.seed &&
                specificSeed === null) { // Only preserve if specificSeed NOT provided
                console.log(`[Game] DETERMINISM: Preserving Seed: ${this.terrain.seed}`);
                preservedSeed = this.terrain.seed;
            } else if (specificSeed !== null) {
                console.log(`[Game] DETERMINISM: Using Specific Seed: ${specificSeed}`);
            } else {
                console.log(`[Game] DETERMINISM: Seed NOT Preserved. LvlIdx:${levelIndex} Terrain:${this.terrain.logicalWidth}x${this.terrain.logicalDepth} Config:${config.mapWidth}x${config.mapDepth} Seed:${this.terrain.seed}`);
            }

            console.log("[Game] Disposing Old Terrain...");
            if (this.terrain.mesh) this.scene.remove(this.terrain.mesh);
            if (this.terrain.waterMesh) this.scene.remove(this.terrain.waterMesh);
            if (this.terrain.geometry) this.terrain.geometry.dispose();
        }

        // 2. Create New Terrain
        if (!this.minimal) {
            console.log(`[Game] Creating New Terrain (${config.mapWidth}x${config.mapDepth})...`);
            // Correct arguments: scene, clippingPlanes, width, depth
            this.terrain = new Terrain(this.scene, this.clippingPlanes, config.mapWidth, config.mapDepth);
        } else {
            console.log("[Game] Minimal Mode: Skipping real Terrain creation in startLevel, using existing mock.");
        }

        // 3. Update Manager References (CRITICAL)
        if (this.inputManager) this.inputManager.terrain = this.terrain;
        if (this.unitRenderer) this.unitRenderer.terrain = this.terrain;
        if (this.buildingRenderer) this.buildingRenderer.terrain = this.terrain;
        if (this.goblinRenderer) this.goblinRenderer.terrain = this.terrain;
        if (this.treeRenderer) this.treeRenderer.terrain = this.terrain;
        if (this.goblinManager) this.goblinManager.terrain = this.terrain;
        if (this.fishManager) this.fishManager.terrain = this.terrain;
        if (this.sheepManager) this.sheepManager.terrain = this.terrain;
        if (this.seaDecorationRenderer) this.seaDecorationRenderer.terrain = this.terrain;
        if (this.landDecorationRenderer) this.landDecorationRenderer.terrain = this.terrain;


        // 4. Generate Terrain Data (Async)
        if (!this.minimal) {
            console.log("[Game] Generating Level Terrain Data...");
            try {
                await this.terrain.generateRandomTerrain(false, config.generation, preservedSeed);
                console.log(`[Game] Terrain Generated. Seed: ${this.terrain.seed}`);
            } catch (e) {
                console.error("[Game] Level Terrain Generation Failed:", e);
            }

            this.terrain.updateMesh();
            this.terrain.updateColors(this.isNight);
        }

        // Reset Managers
        if (this.goblinManager) {
            this.goblinManager.reset();
            // Pass Cave Count from Level Config
            this.goblinManager.generateCaves(config.initialState.goblinCaves);
        }
        if (this.fishManager) this.fishManager.init();
        if (this.sheepManager) this.sheepManager.initSheeps();
        if (this.seaDecorationRenderer) await this.seaDecorationRenderer.init();


        // Spawn Initial Units
        try {
            // Find Spawn Spot
            let sx = Math.floor(config.mapWidth / 2);
            let sz = Math.floor(config.mapDepth / 2);
            let found = false;

            // Search land from center outwards
            const maxRadius = Math.floor(Math.max(config.mapWidth, config.mapDepth) / 2);
            for (let r = 0; r < maxRadius && !found; r++) {
                for (let dx = -r; dx <= r && !found; dx++) {
                    for (let dz = -r; dz <= r && !found; dz++) {
                        // Only check the perimeter of the current square ring
                        if (Math.abs(dx) !== r && Math.abs(dz) !== r) continue;

                        const tx = (sx + dx + config.mapWidth) % config.mapWidth;
                        const tz = (sz + dz + config.mapDepth) % config.mapDepth;

                        if (this.terrain.grid[tx] && this.terrain.grid[tx][tz] && this.terrain.grid[tx][tz].height >= 1) {
                            sx = tx;
                            sz = tz;
                            found = true;
                        }
                    }
                }
            }

            // Fallback: If no land found, force land at the center
            if (!found) {
                sx = Math.floor(config.mapWidth / 2);
                sz = Math.floor(config.mapDepth / 2);
                console.log(`[Game] No land found for initial spawn. Leveling center at ${sx},${sz}`);

                // Set center and surrounding tiles to ground level
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dz = -1; dz <= 1; dz++) {
                        const tx = (sx + dx + config.mapWidth) % config.mapWidth;
                        const tz = (sz + dz + config.mapDepth) % config.mapDepth;
                        this.terrain.setHeight(tx, tz, 2);
                        this.terrain.updateWorkerCell(tx, tz, 2, 0.5);
                    }
                }
                this.terrain.updateMesh();
                this.terrain.updateColors(this.isNight);
            }

            console.log(`[Game] Spawning Player at ${sx}, ${sz}`);

            // Spawn Workers based on Config
            const unitCount = config.initialState.unitCount || 3;
            for (let i = 0; i < unitCount; i++) {
                this.spawnUnit(sx, sz, (i === 0) ? 'worker' : null);
            }

            // Enemy Base
            if (config.initialState.hasEnemyBase) {
                this.spawnEnemyBase(sx, sz);
            }

            // Camera Setup
            const h = this.terrain.getTileHeight(sx, sz);
            if (this.controls) {
                this.controls.target.set(0, Math.max(0, h), 0); // Center relative? No, sx is grid coord.
                // gridToWorld conversion needed?
                // Visual Center is 0,0 for Grid Center?
                // Terrain.getVisualPosition returns world coord.
                // Let's rely on previous logic: wx = sx - (W/2)
                const wx = sx - (config.mapWidth / 2);
                const wz = sz - (config.mapDepth / 2);

                this.controls.target.set(wx, Math.max(0, h), wz);
                this.camera.position.set(wx + 20, Math.max(10, h + 20), wz + 20);
                this.controls.update();
            }

        } catch (e) {
            console.error("[Game] Error in Level Spawn:", e);
        } finally {
            this.gameActive = true;
            this.isLoading = false;
            this.lastTime = performance.now();
            const ui = document.getElementById('ui') as HTMLElement;
            if (ui) ui.style.display = 'flex';
        }

        console.log("[Game] Level Started. Setting gameActive = true");
        this.gameActive = true;
        this.isLoading = false;
        this.lastTime = performance.now(); // Reset time to delta correctly
    }

    clearEntities() {
        // 1. Clear Units / Goblins
        if (this.units) {
            this.units.forEach(u => {
                if (u.dispose) u.dispose();
                if (u.mesh) {
                    this.scene.remove(u.mesh);
                    // Ensure mesh children are also gone
                    u.mesh.traverse((child: any) => {
                        if (child.isMesh) {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) child.material.forEach((m: any) => m.dispose());
                                else child.material.dispose();
                            }
                        }
                    });
                }
                if (u.crossMesh) this.scene.remove(u.crossMesh);
            });
            this.units = [];
            if (this.unitMap) this.unitMap.clear();
        }

        if (this.goblinManager) {
            this.goblinManager.reset();
        }

        if (this.sheepManager) {
            this.sheepManager.reset();
        }

        if (this.fishManager) {
            this.fishManager.reset();
        }

        if (this.seaDecorationRenderer) {
            this.seaDecorationRenderer.dispose();
        }

        // 2. Clear Requests
        if (this.requestQueue) {
            this.requestQueue.forEach(req => {
                if (req.mesh) this.scene.remove(req.mesh);
            });
            this.requestQueue = [];
        }

        // 3. Clear Squads & Stats
        if (this.squads) this.squads.clear();
        this.totalPopulation = 0;
        this.requestIdCounter = 0;
        this.battleHotspots = [];
        this.projectiles = []; // Should clear meshes too ideally? 
        // Projectile cleanup is handled in dispose but not regenerate usually? 
        // Let's add it for safety.
        if (this.projectiles) {
            this.projectiles.forEach(p => { if (p.mesh) this.scene.remove(p.mesh); });
            this.projectiles = [];
        }

        if (this.seaDecorationRenderer) {
            this.seaDecorationRenderer.dispose();
        }

        // 4. Force Tree Re-init
        if (this.treeRenderer) {
            this.treeRenderer.forceUpdate = true;
        }
    }

    async regenerateWorld() {
        console.log("[Game] Regenerating World...");
        console.trace("[DEBUG] regenerateWorld Trace");
        this.gameActive = false; // Pause sim

        this.terrain.buildings = [];

        // Use current level config instead of Levels[0] fixed
        const config = Levels[this.currentLevelIndex] || Levels[0];
        const previewConfig = config.generation || null;

        // Await terrain generation to ensure heights are ready before placing objects
        await this.terrain.generateRandomTerrain(false, previewConfig);

        // [USER_REQUEST] 再生成プレビュー時にもリセット
        this.resources = { grain: 50, fish: 50, meat: 0 };
        this.mana = 100;
        this.gameTime = 8.0;
        this.simTotalTimeSec = 0;
        this.prevTimeOfDay = 8.0;
        this.isNight = false;

        // Force visual update
        this.terrain.updateMesh();
        this.terrain.updateColors(this.isNight);

        // 2. Clear Entities
        this.clearEntities();

        if (this.goblinManager) {
            if (this.goblinManager.generateCaves) {
                this.goblinManager.reset();
                this.goblinManager.generateCaves(config.initialState.goblinCaves);
            }
        }

        // 3. Re-init Visual Environment Objects for Preview
        if (this.sheepManager) this.sheepManager.initSheeps();
        if (this.fishManager) this.fishManager.init();
        if (this.seaDecorationRenderer) {
            await this.seaDecorationRenderer.init();
            // Force an initial update to set instance matrices even if gameActive is false
            this.seaDecorationRenderer.update(0, 0);
        }

        // 4. Force Bird Re-init
        if (this.birdManager) {
            // Birds are usually managed by scene removal in clearEntities if implemented, 
            // but BirdManager might need a specific reset. Let's ensure they are fresh.
            if ((this.birdManager as any).birds) {
                (this.birdManager as any).birds.forEach(b => this.scene.remove(b));
                (this.birdManager as any).birds = [];
                (this.birdManager as any).initBirds();
            }
        }

        // 描画バッファを強制リフレッシュ
        if (this.buildingRenderer) this.buildingRenderer.forceUpdate = true;

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
        let loadingScreen: HTMLElement | null = null;
        let loadingBar: HTMLElement | null = null;
        let loadingText: HTMLElement | null = null;

        try {
            loadingScreen = document.getElementById('loading-screen');
            loadingBar = document.getElementById('loading-bar');
            loadingText = document.getElementById('loading-text');
        } catch (e) {
            console.warn("[Game] UI elements not available - skipping loading screen updates.");
        }

        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            if (loadingBar) loadingBar.style.width = '0%';
            if (loadingText) loadingText.innerText = '0%';
        }

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

            // 1. Load data from SaveManager
            const saveData = this.saveManager.load(slotId);
            if (!saveData) {
                console.warn("[Game] Load failed: No data found for slot", slotId);
                if (loadingScreen) loadingScreen.style.display = 'none';
                return false;
            }

            // Restore Level & Seed
            if (saveData.currentLevelIndex !== undefined) {
                this.currentLevelIndex = saveData.currentLevelIndex;
            }
            if (saveData.currentSeed !== undefined) {
                this.currentSeed = saveData.currentSeed;
            }

            if (loadingText) loadingText.innerText = 'Cleaning Up...';
            // await checkYield(); // Let UI update 'Cleaning Up'
            await new Promise(r => setTimeout(r, 16));

            // Show UI
            try {
                const ui = document.getElementById('ui');
                if (ui) ui.style.display = 'flex';
            } catch (e) { }

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
            await this.terrain.deserialize(saveData.terrain, (pct) => {
                const scaledPct = Math.floor(pct * 0.5); // 0% -> 50%
                if (loadingBar) loadingBar.style.width = scaledPct + '%';
                if (loadingText) loadingText.innerText = scaledPct + '%';
            });


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

            // Re-link InputManager and Decoration Renderers
            if (this.inputManager) this.inputManager.unitRenderer = this.unitRenderer;
            if (this.landDecorationRenderer) this.landDecorationRenderer.terrain = this.terrain;
            if (this.treeRenderer) this.treeRenderer.terrain = this.terrain;

            // Terrain Finished (~50%) -> Jump to 60% (Rebuild Mesh overhead)
            if (loadingBar) loadingBar.style.width = '60%';
            if (loadingText) loadingText.innerText = '60%';
            await checkYield();

            // Level/Season Restoration
            this.currentLevelIndex = saveData.currentLevelIndex || 0;
            this.currentSeed = saveData.currentSeed || null;
            this.gameTime = saveData.gameTime || 0;
            this.gameTotalTime = saveData.gameTotalTime || 0;
            this.currentSeasonIndex = saveData.currentSeasonIndex || 0;
            this.daysPassed = saveData.daysPassed || 0;

            // Resource Restoration
            if (saveData.resources) {
                this.resources = { ...saveData.resources };
            }
            this.mana = saveData.mana || 0;

            // Battle Statistics Restoration
            if (saveData.battleMemory && this.battleMemory && this.battleMemory.deserialize) {
                this.battleMemory.deserialize(saveData.battleMemory);
            }
            this.battleHotspots = saveData.battleHotspots || [];
            this.raidPoints = saveData.raidPoints || [];

            // Squad Restoration
            if (saveData.squads) {
                this.squads = new Map(saveData.squads);
            }

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
            this.unitMap.clear();

            let maxUnitId = -1;
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
                            this.unitMap.set(u.id, u);
                            if (u.id > maxUnitId) maxUnitId = u.id;
                        }
                    }
                } catch (e) { console.error("CRITICAL Unit restore failed:", e); throw e; }
            }



            // Restore Goblin Manager
            if (this.goblinManager) {
                if (saveData.goblinManager) {
                    this.goblinManager.deserialize(saveData.goblinManager);

                    // Diagnostic: Verify no Units in Goblin array
                    const mixedUnits = (this.goblinManager.goblins || []).filter(g => g.type === 'unit' || g.role);
                    if (mixedUnits.length > 0) {
                        console.error(`[DIAGNOSTIC] Transformation Error Detected! ${mixedUnits.length} Units found in Goblin Manager!`, mixedUnits);
                    }
                } else {
                    this.goblinManager.scanForCaves();
                }
            }

            // Restore Requests (Persistent Instruction Markers)
            let maxReqIdNum = -1;
            if (saveData.requests) {
                // FORCE RESET to prevent duplicates if user clicked during async load
                this.requestQueue.length = 0;
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
                    if (!isNaN(idNum) && idNum > maxReqIdNum) maxReqIdNum = idNum;

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
                    if (this.scene) {
                        this.scene.add(mesh);
                    }

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
            }

            // RE-LINK UNITS (Restoration)
            console.log("[DEBUG] Starting Unit Re-linking...");
            try {
                if (this.units) {
                    this.units.forEach(u => {
                        const numericId = Number(u.id);
                        if (!isNaN(numericId) && numericId > maxUnitId) maxUnitId = numericId;

                        // Link HomeBase
                        if (u.savedHomeBaseX !== undefined) {
                            const hb = this.terrain.getBuildingAt(u.savedHomeBaseX, u.savedHomeBaseZ);
                            if (hb) u.homeBase = hb;
                        }

                        // Link Request (Persistent)
                        if (u.savedTargetRequestId) {
                            const req = this.requestQueue.find(r => String(r.id) === String(u.savedTargetRequestId));
                            if (req) {
                                // CONFLICT CHECK
                                if (req.assignedTo && String(req.assignedTo) !== String(u.id)) {
                                    const currentOwner = this.units.find(un => String(un.id) === String(req.assignedTo));
                                    if (currentOwner) {
                                        console.warn(`[Game] Conflict: Unit ${u.id} tried to claim Job ${req.id}, owned by ${currentOwner.id}.`);
                                        u.targetRequest = null;
                                        u.savedTargetRequestId = null;
                                        return;
                                    }
                                }

                                u.targetRequest = req;
                                if (req.status === 'pending') req.status = 'assigned';
                                if (String(req.assignedTo) !== String(u.id)) {
                                    req.assignedTo = u.id;
                                }

                                // State upgrade
                                if (u.changeState) {
                                    try {
                                        u.changeState(new Job(u));
                                    } catch (stateErr) {
                                        console.error(`[Game] FAILED to change state for unit ${u.id}:`, stateErr);
                                    }
                                }
                            } else {
                                u.targetRequest = null;
                            }
                            u.savedTargetRequestId = null;
                        }
                    });

                    // Restore ID Counters (Consolidated)
                    if (maxUnitId >= 0) Unit.nextId = maxUnitId + 1;
                    if (maxReqIdNum >= 0) this.requestIdCounter = maxReqIdNum + 1;

                    // FIX: Ghost Assignment Cleanup
                    // If a request is assigned to a non-existent unit, reset it to pending.
                    this.requestQueue.forEach(req => {
                        if (req.status === 'assigned' && req.assignedTo !== null) {
                            if (!this.unitMap.has(req.assignedTo)) {
                                console.warn(`[Game] Resetting ghost-assigned request ${req.id} (Unit ${req.assignedTo} missing).`);
                                req.status = 'pending';
                                req.assignedTo = null;
                            }
                        }
                    });
                }
            } catch (unitErr) {
                console.error("[Game] Error during unit re-linking:", unitErr);
                throw unitErr;
            }

            // Restore Camera
            console.log("[DEBUG] Restoring Camera...");
            try {
                if (saveData.camera) {
                    if (this.camera) {
                        if (saveData.camera.position) {
                            this.camera.position.set(saveData.camera.position.x, saveData.camera.position.y, saveData.camera.position.z);
                        }
                        const restoredZoom = (saveData.camera.zoom !== undefined) ? saveData.camera.zoom : 1.0;
                        this.camera.zoom = restoredZoom;
                        if (this.camera.updateProjectionMatrix) {
                            this.camera.updateProjectionMatrix();
                        }
                    }

                    if (this.controls && saveData.camera.target) {
                        this.controls.target.set(saveData.camera.target.x, saveData.camera.target.y, saveData.camera.target.z);
                        this.controls.update();
                    }
                }
            } catch (cameraErr) {
                console.error("[Game] Error during camera restoration:", cameraErr);
            }

            // Hide Loading Screen
            if (loadingScreen) {
                if (loadingBar) loadingBar.style.width = '100%';
                if (loadingText) loadingText.innerText = '100%';
                try {
                    await new Promise(r => setTimeout(r, 200));
                } catch (e) { }
                loadingScreen.style.display = 'none';
            }

            // Force one render update
            if (this.buildingRenderer) this.buildingRenderer.forceUpdate = true;

            // FIX: Ensure environment (isNight, visuals) is synced with restored gameTime
            this.updateEnvironment(0);

            // Resume Engine
            this.isLoading = false;
            this.gameActive = true;
            return true;
        } catch (e) {
            console.error("Critical Load Failure CAUGHT in loadGame:", e);
            if (e instanceof Error) console.error(e.stack);
            if (loadingScreen) loadingScreen.style.display = 'none';
            if (typeof alert !== 'undefined') {
                alert("Load Failed: " + (e instanceof Error ? e.message : "Internal Error"));
            }
            this.gameActive = true;
            return false;
        }
    }

    // --- SQUAD MANAGEMENT ---
    registerSquad(type) {
        if (!this.squads) this.squads = new Map();
        const id = Math.floor(Math.random() * 1000000);
        this.squads.set(id, {
            id: id,
            type: type, // Keep type property
            target: null,
            members: [],
            action: 'idle',
            lastUpdate: this.simTotalTimeSec || 0
        });
        return id;
    }

    getSquad(id) {
        if (!this.squads) return null;
        return this.squads.get(id) || null;
    }

    reportSquadTarget(squadId: number, x: number, z: number) {
        const squad = this.getSquad(squadId);
        if (squad) {
            // Update target if new or different
            if (!squad.target || squad.target.x !== x || squad.target.z !== z) {
                squad.target = { x: x, z: z, time: this.simTotalTimeSec || 0 };
                squad.lastUpdate = this.simTotalTimeSec || 0;
            } else {
                // Refresh time
                if (squad.target) squad.target.time = this.simTotalTimeSec || 0;
            }
        }

        // Also report to Global Hotspots (Total Mobilization)
        this.reportGlobalBattle(x, z);
    }

    updateBattleHotspots(deltaTime: number) {
        if (!this.battleHotspots) return;

        const now = this.simTotalTimeSec;
        const decayRate = 2.0;

        const oldLen = this.battleHotspots.length;
        this.battleHotspots = this.battleHotspots.filter(h => {
            const oldInt = h.intensity;
            h.intensity -= decayRate * deltaTime;
            const isTooOld = (now !== undefined) ? (now - (h.time || 0) > 60.0) : false;
            const keep = h.intensity > 0 && !isTooOld;
            // console.log(`[Hotspot Debug] Decay: ${oldInt.toFixed(1)} -> ${h.intensity.toFixed(1)} (Keep: ${keep})`);
            return keep;
        });
        if (this.battleHotspots.length !== oldLen) {
            console.log(`[Hotspot Debug] Hotspots remaining: ${this.battleHotspots.length}`);
        }
    }

    reportGlobalBattle(x: number, z: number) {
        if (!this.battleHotspots) this.battleHotspots = [];

        const now = this.simTotalTimeSec || 0;
        const groupingDist = 15.0; // Max distance to group skirmishes

        // Find existing hotspot
        let existing: { x: number, z: number, intensity: number, time: number, regionId?: number } | null = null;
        for (const h of this.battleHotspots) {
            const dx = h.x - x;
            const dz = h.z - z;
            const d = Math.sqrt(dx * dx + dz * dz);
            if (d < groupingDist) {
                existing = h;
                console.log(`[Hotspot Debug] Grouping with existing at ${h.x.toFixed(0)},${h.z.toFixed(0)} (Dist: ${d.toFixed(1)})`);
                break;
            }
        }

        if (existing) {
            // Update Centroid (Weighted move towards new report)
            const weight = 0.2;
            existing.x = existing.x * (1 - weight) + x * weight;
            existing.z = existing.z * (1 - weight) + z * weight;

            // Increase Intensity (Cap at 100)
            const oldInt = existing.intensity || 20;
            existing.intensity = Math.min(100, oldInt + 10);
            existing.time = now;
        } else {
            // New Hotspot
            const regionId = this.terrain ? this.terrain.getRegion(x, z) : 0;
            this.battleHotspots.push({
                x: x,
                z: z,
                intensity: 20.0, // Initial intensity
                time: now,
                regionId: regionId
            });
        }
    }

    updateSquadMobilization(deltaTime: number) {
        // Run mobilization check every 2 seconds to save CPU
        this.squadMobilizationTimer = (this.squadMobilizationTimer || 0) + deltaTime;
        if (this.squadMobilizationTimer < 2.0) return;
        this.squadMobilizationTimer = 0;

        if (!this.battleHotspots || this.battleHotspots.length === 0) return;
        if (!this.squads) return;

        const now = this.simTotalTimeSec;

        for (const [squadId, squad] of this.squads) {
            // Consider squad "Idle" if it has no target or target is very old (> 5s)
            // Reduced from 15s to 5s for faster response to new hotspots.
            const isIdle = !squad.target || (now !== undefined && (now - (squad.target.time || 0) > 5.0));

            if (isIdle) {
                // Find best hotspot
                let bestHotspot: { x: number, z: number, intensity: number, time: number, regionId?: number } | null = null;
                let maxScore = -Infinity;

                // Find a representative member for distance/region check
                const firstMember = this.units.find(u => u.squadId === squadId && !u.isDead);
                if (!firstMember) continue;

                const myRegion = this.terrain ? this.terrain.getRegion(firstMember.gridX, firstMember.gridZ) : 0;

                for (const h of this.battleHotspots) {
                    // REACHABILITY CHECK
                    if (h.regionId !== undefined && myRegion !== undefined && h.regionId !== myRegion && h.regionId > 0 && myRegion > 0) continue;

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
        console.log(`[Game] Dispose called for Game Instance.`);
        this.stopped = true;
        this.stop();

        if (this.renderer) {
            try {
                if (typeof this.renderer.dispose === 'function') this.renderer.dispose();
            } catch (e) { }
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                try { this.renderer.domElement.parentNode.removeChild(this.renderer.domElement); } catch (e) { }
            }
        }

        // 1. Clear Entities & Managers
        this.units.forEach(u => { if (u.dispose) u.dispose(); });
        this.goblins.forEach(g => { if (g.dispose) g.dispose(); });
        this.buildings.forEach(b => { if (b.dispose) b.dispose(); });
        this.fishes.forEach(f => { if (f.dispose) f.dispose(); });
        this.sheeps.forEach(s => { if (s.dispose) s.dispose(); });
        this.projectiles.forEach(p => { if (p.mesh && p.mesh.geometry) p.mesh.geometry.dispose(); });

        this.units = [];
        this.goblins = [];
        this.fishes = [];
        this.sheeps = [];
        this.requestQueue = [];
        this.clippingPlanes = [];
        this.projectiles = [];
        this.raidPoints = [];
        this.battleHotspots = [];
        if (this.unitMap) this.unitMap.clear();
        if (this.squads) this.squads.clear();

        // 2. Renderer-specific cleanups
        if (this.inputManager && this.inputManager.dispose) this.inputManager.dispose();
        if (this.controls && this.controls.dispose) this.controls.dispose();
        if (this.minimap && this.minimap.dispose) this.minimap.dispose();
        if (this.unitRenderer && this.unitRenderer.dispose) this.unitRenderer.dispose();
        if (this.buildingRenderer && this.buildingRenderer.dispose) this.buildingRenderer.dispose();
        if (this.goblinRenderer && this.goblinRenderer.dispose) this.goblinRenderer.dispose();
        if (this.treeRenderer && this.treeRenderer.dispose) this.treeRenderer.dispose();
        if (this.soundManager && this.soundManager.dispose) this.soundManager.dispose();
        if (this.smokeManager && this.smokeManager.dispose) this.smokeManager.dispose();
        if (this.terrain && (this.terrain as any).dispose) (this.terrain as any).dispose();

        // 3. Scene Traversal for Three.js cleanup
        if (this.scene && typeof this.scene.traverse === 'function') {
            this.scene.traverse((object: any) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach((mat: any) => mat.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        }

        if ((window as any).game === this) {
            (window as any).game = undefined as any;
        }

        // Register for automatic cleanup in tests
        if ((globalThis as any).__game_instances) {
            (globalThis as any).__game_instances.add(this);
        }
    }

    // --- WIN / LOSS LOGIC ---
    evaluateWinLoss(): 'win' | 'loss' | null {
        // 1. Check Defeat: Player Wiped Out
        // Player Units (Must be alive)
        const playerUnits = this.units.filter(u => u.faction === 'player' && !u.isDead);
        // Player Buildings (Strictly 'player' faction and NOT destroyed)
        const playerBuildings = this.terrain.buildings.filter(b => {
            const isAlive = b.isDestroyed ? !b.isDestroyed() : (b.userData.hp > 0);
            return b.userData.faction === 'player' && isAlive;
        });

        // Debug Log
        if (playerUnits.length === 0 && playerBuildings.length === 0) {
            console.log(`[Game] evaluateWinLoss: Player assets zero. Units:0 Buildings:0`);
        }

        // If no units and no buildings, IT IS OVER.
        if (playerUnits.length === 0 && playerBuildings.length === 0) {
            return 'loss';
        }

        // 2. Check Victory: Enemies Wiped Out
        let goblinCount = 0;
        let caveCount = 0;
        if (this.goblinManager) {
            // Count alive goblins
            goblinCount = this.goblinManager.goblins.filter(g => !g.isDead).length;
            // Count alive caves
            caveCount = this.goblinManager.caves ? this.goblinManager.caves.filter(c => {
                const b = c.building;
                return b && (b.isDestroyed ? !b.isDestroyed() : (b.userData.hp > 0));
            }).length : 0;
        }

        // Enemy Buildings (registered in terrain)
        const enemyBuildings = this.terrain.buildings.filter(b => {
            const isAlive = b.isDestroyed ? !b.isDestroyed() : (b.userData.hp > 0);
            return b.userData.faction === 'enemy' && isAlive;
        });

        // Enemy Units (Must be alive)
        // Check for ANY faction that is NOT 'player' and NOT 'neutral'
        const enemyUnits = this.units.filter(u => u.faction !== 'player' && u.faction !== 'neutral' && !u.isDead);

        if (goblinCount === 0 && caveCount === 0 && enemyBuildings.length === 0 && enemyUnits.length === 0) {
            console.log(`[Game] evaluateWinLoss: Enemy assets zero. Goblins:0 Caves:0 enemyBuildings:0 enemyUnits:0`);
            return 'win';
        }


        return null;
    }


    checkWinLoss() {
        if (!this.gameActive) return;

        const result = this.evaluateWinLoss();
        if (result === 'win') {
            this.showGameOver(true);
        } else if (result === 'loss') {
            this.showGameOver(false);
        }
    }

    private clearDebugSelection() {
        (window as any).debugSelectedUnit = null;
        const panel = document.getElementById('unit-debug-panel');
        if (panel) panel.style.display = 'none';
    }

    showGameOver(won: boolean) {
        console.log(`GAME OVER: ${won ? "VICTORY" : "DEFEAT"}`);
        this.gameActive = false;
        this.isLoading = false; // Ensure inputs aren't locked if checks depend on it
        this.clearDebugSelection();

        const screen = document.getElementById('game-over-screen');
        const title = document.getElementById('game-over-title');
        const msg = document.getElementById('game-over-message');
        const retryBtn = document.getElementById('retry-btn');
        const nextBtn = document.getElementById('next-level-btn');
        const returnBtn = document.getElementById('return-title-btn');

        if (screen && title && msg && retryBtn && nextBtn && returnBtn) {
            screen.style.display = 'flex';

            if (won) {
                title.innerText = "VICTORY";
                title.className = "win-text";
                msg.innerText = "All enemies have been vanquished!";
                nextBtn.style.display = 'inline-block';
                retryBtn.style.display = 'none';

                // Button Events (One-time or replacement)
                nextBtn.onclick = () => {
                    screen.style.display = 'none';
                    this.nextLevel();
                };
            } else {
                title.innerText = "DEFEAT";
                title.className = "lose-text";
                msg.innerText = "Your civilization has fallen.";
                nextBtn.style.display = 'none';
                retryBtn.style.display = 'inline-block';

                retryBtn.onclick = () => {
                    screen.style.display = 'none';
                    this.retryLevel();
                };
            }

            returnBtn.onclick = () => {
                screen.style.display = 'none';
                this.returnToTitle();
            };
        }
    }

    async retryLevel() {
        console.log("Retrying Level...");
        this.clearDebugSelection();
        await this.startLevel(this.currentLevelIndex, this.currentSeed);
    }

    async nextLevel() {
        console.log("Advancing to Next Level (Preview Flow)...");
        const nextIdx = this.currentLevelIndex + 1;
        if (Levels[nextIdx]) {
            this.currentLevelIndex = nextIdx;
            this.clearDebugSelection();

            // 1. Reset Game State to Preview
            this.gameActive = false;
            this.isLoading = true; // Show loading while regenerating

            // 2. Show Start Screen again for the new level
            const startScreen = document.getElementById('start-screen');
            const mainUI = document.getElementById('ui');
            if (startScreen) startScreen.style.display = 'flex';
            if (mainUI) mainUI.style.display = 'none';

            // 3. Regenerate for the NEW level as preview
            await this.regenerateWorld();

            this.isLoading = false;
        } else {
            alert("Congratulations! You have completed all levels!");
            this.returnToTitle();
        }
    }

    returnToTitle() {
        if (window.confirm("Return to Title Screen?")) {
            if (window.location) window.location.reload();
        }
    }

    spawnEnemyBase(playerX: number, playerZ: number) {
        const W = this.terrain.logicalWidth || 80;
        const D = this.terrain.logicalDepth || 80;
        const dist = Math.floor(W * 0.5); // Opposite side

        // Base Target: Opposite side roughly
        let centerX = (Math.floor(playerX) + dist) % W;
        let centerZ = (Math.floor(playerZ) + dist) % D;

        // Spiral Search for Valid Land
        let ex = centerX;
        let ez = centerZ;
        let found = false;

        // Simple Spiral (Increased attempts)
        let dx = 0;
        let dz = 0;
        let step = 1;
        let turn = 0;

        for (let i = 0; i < 2000; i++) {
            const tx = (centerX + dx + W) % W;
            const tz = (centerZ + dz + D) % D;
            const h = this.terrain.getTileHeight(tx, tz);
            // Relaxed threshold: 0.8 instead of 1.2 for more candidate spots
            if (h > 0.8) {
                ex = tx;
                ez = tz;
                found = true;
                break;
            }
            if (turn === 0) dx++;
            else if (turn === 1) dz++;
            else if (turn === 2) dx--;
            else if (turn === 3) dz--;

            if (turn % 2 === 0) {
                if (Math.abs(dx) >= step) turn = (turn + 1) % 4;
            } else {
                if (Math.abs(dz) >= step) {
                    turn = (turn + 1) % 4;
                    step++;
                }
            }
        }

        // Global Search Fallback
        if (!found) {
            console.log("[Game] Spiral search failed for Enemy Base. Starting Global Scan...");
            for (let retryX = 0; retryX < W; retryX += 2) {
                for (let retryZ = 0; retryZ < D; retryZ += 2) {
                    const h = this.terrain.getTileHeight(retryX, retryZ);
                    if (h > 0.8) {
                        ex = retryX;
                        ez = retryZ;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        }

        if (!found) {
            console.error("[Game] CRITICAL: No land found anywhere for Enemy Base! Spawning aborted.");
            return;
        }

        console.log(`[Game] Spawning Enemy Base at ${ex},${ez} (Player at ${playerX},${playerZ})`);
        console.log("[[UPDATE VERIFIED]] Spawning Light Enemy Base (House+Worker only)");

        // Enemy House (Faction: 'enemy')
        this.terrain.addBuilding('house', ex, ez, true, false, 'enemy');

        // Config Driven Defenses
        const config = Levels[this.currentLevelIndex];
        if (config && config.initialState.hasEnemyGuard) {
            // Enemy Tower
            // Find spot near base
            this.terrain.addBuilding('tower', (ex + 2) % W, ez, false, false, 'enemy');

            // Enemy Guards
            this.spawnUnit((ex - 1 + W) % W, ez, 'knight', null, null, false, 'enemy');
            this.spawnUnit(ex, (ez + 1) % D, 'wizard', null, null, false, 'enemy');
        }

        // Enemy Units (Black Hair)
        // Worker
        this.spawnUnit((ex + 1) % W, ez, 'worker', null, null, false, 'enemy');
    }
}
