
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game';
import { Unit } from '../Unit';
import * as THREE from 'three';

// Mocks
// Mocks
vi.mock('three', async () => {
    const actual = await vi.importActual('three');

    class MockWebGLRenderer {
        constructor() {
            this.domElement = document.createElement('canvas');
            this.clippingPlanes = [];
            this.shadowMap = { enabled: false, type: 0 };
        }
        setSize() { }
        setPixelRatio() { }
        render() { }
        compile() { }
        getParameters() { return { maxTextures: 16 }; }
    }

    class MockAudioListener {
        constructor() {
            this.position = { set: vi.fn() };
            this.rotation = { set: vi.fn() };
            this.up = { set: vi.fn() };
        }
    }

    class MockAudio {
        constructor() {
            this.isPlaying = false;
        }
        setBuffer() { }
        setLoop() { }
        setVolume() { }
        play() { }
        stop() { }
    }

    return {
        ...actual,
        WebGLRenderer: MockWebGLRenderer,
        TextureLoader: class { load() { return new actual.Texture(); } },
        AudioListener: MockAudioListener,
        Audio: MockAudio,
        AudioLoader: class { load() { } },
    };
});

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() {
            this.enableDamping = true;
            this.dampingFactor = 0.05;
            this.minZoom = 0.4;
            this.maxZoom = 8.0;
            this.maxPolarAngle = Math.PI / 2;
            this.screenSpacePanning = false;
        }
        update() { }
    }
}));

vi.mock('../Terrain.js', () => ({
    Terrain: class {
        constructor() {
            this.width = 100;
            this.depth = 100;
            this.logicalWidth = 100;
            this.logicalDepth = 100;
            this.getTileHeight = vi.fn().mockReturnValue(10);
            this.isWalkable = vi.fn().mockReturnValue(true);
            this.getTileType = vi.fn().mockReturnValue('grass');
            this.setSeason = vi.fn();
        }
        update() { }
        updateMeshPosition() { }
        updateLights() { } // Added to Fix TypeError
    }
}));

vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { update() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { update() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { update() { } } }));
vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { update() { } } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { update() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { update() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { update() { } updateLighting() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { update() { } } }));
vi.mock('../InputManager.js', () => ({ InputManager: class { update() { } } }));
vi.mock('../SaveManager.js', () => ({ SaveManager: class { update() { } } }));
vi.mock('../SoundManager.js', () => ({
    SoundManager: class {
        constructor() {
            this.init = vi.fn();
            this.initialized = false;
        }
        update() { }
    }
}));

describe('Manual Assignment Debugging', () => {
    let game;

    beforeEach(() => {
        // Basic DOM setup
        document.body.innerHTML = '<div id="stats"></div><div id="debug-speed-btn"></div>'; // Fix Stats Error by using correct ID 'stats'

        vi.clearAllMocks();

        // IMPORTANT: Reset modules to ensure fresh Game instance and mocks
        vi.resetModules();

        // Re-instantiate Game
        // Note: In a real app we might rely on a singleton or proper DI.
        // Here we just want a fresh 'game' object.
        game = new Game();
        game.requestQueue = [];
        game.units = [];
        game.simTotalTimeSec = 0;

        // Ensure terrain is set (it's mocked via constructor but let's be safe)
        if (!game.terrain) {
            game.terrain = new (require('../Terrain.js').Terrain)();
        }
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should assign a manual request to an Idle worker', () => {
        const u = new Unit(game.scene, game.terrain, 0, 0, 'worker');
        u.id = 1;
        u.action = 'Idle';
        u.targetRequest = null;
        game.units.push(u);

        const req = game.addRequest('build', 10, 10);

        expect(req.assignedTo).toBe(u.id);
        expect(u.targetRequest).toBe(req);
    });

    it('should NOT assign to a Busy worker (already working)', () => {
        const u = new Unit(game.scene, game.terrain, 0, 0, 'worker');
        u.id = 1;
        u.action = 'Working';
        u.targetRequest = { id: 'req_existing' };
        game.units.push(u);

        const req = game.addRequest('build', 10, 10);

        expect(req.assignedTo).toBeNull();
    });

    it('should assign to a Wandering worker (Low Priority)', () => {
        const u = new Unit(game.scene, game.terrain, 0, 0, 'worker');
        u.id = 1;
        u.action = 'Wander'; // Wandering is "active" but low priority?
        u.targetRequest = null;
        game.units.push(u);

        const req = game.addRequest('build', 10, 10);

        // This confirms if "Wander" is treated as Busy
        expect(req.assignedTo).toBe(u.id);
        expect(u.targetRequest).toBe(req);
    });

    it('should assign to a Moving worker (Low Priority)', () => {
        const u = new Unit(game.scene, game.terrain, 0, 0, 'worker');
        u.id = 1;
        u.action = 'Moving'; // Moving could be wandering
        u.targetRequest = null;
        game.units.push(u);

        const req = game.addRequest('build', 10, 10);

        expect(req.assignedTo).toBe(u.id);
    });

    it('should re-assign a unit that is "Moving" to a job (Not yet Working)', () => {
        // Setup a unit that is already assigned to a request but still moving (not Working)
        const u = new Unit(game.scene, game.terrain, 0, 0, 'worker');
        u.id = 10;
        u.action = 'Moving'; // e.g. walking to the first job
        u.targetRequest = { id: 'req_old', x: 50, z: 50, status: 'assigned', assignedTo: 10 }; // Already has a job
        game.units.push(u);

        // Add a NEW manual request
        const req = { id: 'req_new', x: 10, z: 10, type: 'build', status: 'pending', isManual: true };

        // Push and assigning
        game.requestQueue.push(req);
        game.assignRequestSync(req);

        // Expectation: The unit should switch to the NEW request
        expect(u.targetRequest).toBe(req);
        expect(req.assignedTo).toBe(u.id);
        expect(req.status).toBe('assigned');
    });
});
