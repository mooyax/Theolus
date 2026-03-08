
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game.js';
import * as THREE from 'three';

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls', () => {
    return {
        OrbitControls: class {
            constructor() {
                this.domElement = {};
                this.update = vi.fn();
                this.enableDamping = true;
                this.addEventListener = vi.fn();
            }
        }
    };
});

// Mock Managers
vi.mock('../InputManager.js', () => ({ InputManager: class { constructor() { this.reset = vi.fn(); this.update = vi.fn(); } } }));
vi.mock('../rendering/UnitRenderer.js', () => ({ UnitRenderer: class { constructor() { this.init = vi.fn(); this.reset = vi.fn(); this.update = vi.fn(); } } }));
vi.mock('../rendering/BuildingRenderer.js', () => ({ BuildingRenderer: class { constructor() { this.init = vi.fn().mockResolvedValue(); this.reset = vi.fn(); this.update = vi.fn(); this.dispose = vi.fn(); } } }));
vi.mock('../rendering/CloudManager.js', () => ({ CloudManager: class { constructor() { this.update = vi.fn(); } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { constructor() { this.update = vi.fn(); } } }));
vi.mock('../ai/BirdManager.js', () => ({ BirdManager: class { constructor() { this.update = vi.fn(); } } }));
vi.mock('../ai/SheepManager.js', () => ({ SheepManager: class { constructor() { this.reset = vi.fn(); this.initSheeps = vi.fn(); this.update = vi.fn(); } } }));
vi.mock('../ai/GoblinManager.js', () => ({ GoblinManager: class { constructor() { this.reset = vi.fn(); this.generateCaves = vi.fn(); this.update = vi.fn(); this.goblins = []; } } }));
vi.mock('../ai/FishManager.js', () => ({ FishManager: class { constructor() { this.reset = vi.fn(); this.init = vi.fn(); this.update = vi.fn(); } } }));
vi.mock('../ui/Minimap.js', () => ({ Minimap: class { constructor() { this.update = vi.fn(); } } }));
vi.mock('../ui/Compass.js', () => ({ Compass: class { constructor() { this.update = vi.fn(); } } }));
vi.mock('../PerformanceMonitor.js', () => ({ PerformanceMonitor: class { constructor() { this.update = vi.fn(); } } }));

describe('Game Request Lifecycle', () => {
    let game;

    beforeEach(() => {
        global.requestAnimationFrame = vi.fn();
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'initMarkerMaterial').mockImplementation(() => { });

        game = new Game(new THREE.Scene(), undefined, true);
        game.renderer = { domElement: {}, render: vi.fn(), setPixelRatio: vi.fn(), setSize: vi.fn(), setClearColor: vi.fn() };
        game.controls = { update: vi.fn() };
        game.terrain = {
            update: vi.fn(),
            getTileHeight: vi.fn(() => 5),
            logicalWidth: 40,
            logicalDepth: 40,
            getWidth: () => 40,
            getDepth: () => 40,
            grid: Array(40).fill(null).map(() => Array(40).fill({ height: 5 })),
            setSeason: vi.fn(),
            calculateRegions: vi.fn().mockResolvedValue(true),
            syncToWorker: vi.fn(),
            initMeshes: vi.fn(),
            dispose: vi.fn(),
            getRegion: () => 1,
            getRandomPointInRegion: () => ({ x: 10, z: 10 })
        };
        game.updateRequestMarkers = vi.fn();
        game.resources = { mana: 100 };
        game.consumeMana = vi.fn((amount) => { game.resources.mana -= amount; });
        game.markerMaterial = { clone: () => ({ uniforms: { uColor: { value: { setHex: vi.fn() } } } }) };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should tag new requests with createdAt timestamp', () => {
        const now = 1000;
        game.simTotalTimeSec = now;
        const req = game.addRequest('raise', 10, 10);
        expect(req.createdAt).toBe(now);
        expect(req.status).toBe('pending');
    });

    it('should cleanup expired pending requests', () => {
        const start = 1000;
        game.simTotalTimeSec = start;
        const reqOld = game.addRequest('raise', 10, 10);
        game.simTotalTimeSec = start + 290;
        const reqNew = game.addRequest('raise', 20, 20);
        expect(game.requestQueue.length).toBe(2);

        const checkTime = start + 310;
        game.simTotalTimeSec = checkTime;
        game.checkExpiredRequests(checkTime);

        expect(game.requestQueue.length).toBe(1);
        expect(game.requestQueue[0]).toBe(reqNew);
    });

    it('should NOT cleanup assigned requests even if old', () => {
        const start = 100000;
        game.simTotalTimeSec = start;
        const req = game.addRequest('raise', 10, 10);
        req.status = 'assigned';
        const checkTime = start + 60000;
        game.checkExpiredRequests(checkTime);
        expect(game.requestQueue.length).toBe(1);
    });

    it('should cancel request via Proximity Search', () => {
        game.addRequest('raise', 10, 10);
        game.addRequest('raise', 20, 20);
        expect(game.requestQueue.length).toBe(2);
        const result = game.tryCancelRequest(11, 11);
        expect(result).toBe(true);
        expect(game.requestQueue.length).toBe(1);
        expect(game.requestQueue[0].x).toBe(20);
    });

    it('should prioritize nearest request when cancelling', () => {
        const r1 = game.addRequest('raise', 10, 10);
        const r2 = game.addRequest('raise', 12, 12);
        const res = game.tryCancelRequest(10, 11);
        expect(res).toBe(true);
        expect(game.requestQueue.find(r => r === r1)).toBeUndefined();
        expect(game.requestQueue.find(r => r === r2)).toBeDefined();
    });
});