
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game';
import { Unit } from '../Unit';
import * as THREE from 'three';
import { Wander, Job } from '../ai/states/UnitStates';

// MOCKS
vi.mock('three', async (importActual) => {
    const actual = await importActual();
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('canvas'); }
            setPixelRatio() { }
            setSize() { }
            render() { }
            setClearColor() { }
        }
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn() }; }
        update() { }
    }
}));

vi.mock('../Terrain', () => ({
    Terrain: class {
        constructor() {
            this.logicalWidth = 160;
            this.logicalDepth = 160;
            this.grid = Array(160).fill(null).map(() => Array(160).fill(null).map(() => ({ regionId: 1, height: 1 })));
            this.pathfindingCalls = 0;
            this.pathCache = [];
        }
        initTerrain() { }
        getTileHeight() { return 1; }
        update() { }
        updateLights() { }
        updateMeshPosition() { }
        findBestTarget = vi.fn(() => null);
        findPath(sx, sz, ex, ez) {
            return [
                { x: Math.round(sx) + 1, z: Math.round(sz) + 1 },
                { x: Math.round(ex), z: Math.round(ez) }
            ];
        }
        findPathAsync(sx, sz, ex, ez) {
            return Promise.resolve(this.findPath(sx, sz, ex, ez));
        }
        isAdjacentToRegion() { return true; }
        getBuildingSize() { return 1; }
        getRegion() { return 1; }
        getRandomPointInRegion() { return { x: 5, z: 5 }; }
    }
}));

vi.mock('../Minimap', () => ({ Minimap: class { update() { } } }));
vi.mock('../Compass', () => ({ Compass: class { update() { } } }));
vi.mock('../CloudManager', () => ({ CloudManager: class { update() { } } }));
vi.mock('../BirdManager', () => ({ BirdManager: class { update() { } } }));
vi.mock('../SheepManager', () => ({ SheepManager: class { update() { } } }));
vi.mock('../GoblinManager', () => ({ GoblinManager: class { update() { } } }));
vi.mock('../FishManager', () => ({ FishManager: class { update() { } } }));
vi.mock('../SoundManager', () => ({
    SoundManager: class {
        constructor() { this.init = vi.fn(); }
        playSound() { }
        update() { }
    }
}));
vi.mock('../UnitRenderer', () => ({
    UnitRenderer: class {
        init() { }
        update() { }
    }
}));
vi.mock('../BuildingRenderer', () => ({
    BuildingRenderer: class {
        update() { }
        updateLighting() { }
        init() { }
    }
}));
vi.mock('../GoblinRenderer', () => ({ GoblinRenderer: class { update() { } init() { } } }));
vi.mock('../InputManager', () => ({ InputManager: class { update() { } } }));
vi.mock('../SaveManager', () => ({ SaveManager: class { update() { } } }));

describe('Stuck and Marker Debugging', () => {
    let game;

    beforeEach(() => {
        document.body.innerHTML = '<div id="stats"></div><div id="loading-screen"></div><div id="loading-bar"></div><div id="loading-text"></div>';
        vi.clearAllMocks();
        game = new Game();
        game.entityManager.clear();
        game.requestQueue = [];
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should move IMMEDIATELY when assigned a job (no 3s delay)', async () => {
        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        game.entityManager.register(unit);
        unit.updateLogic(0, 0, false, []);
        expect(unit.state).toBeInstanceOf(Wander);

        const req = game.addRequest('move', 50, 50);

        game.assignRequestSync(req, unit);

        await vi.waitFor(async () => {
            await Promise.resolve();
            unit.updateLogic(0.016, 0.016, false, []);
            await Promise.resolve();

            expect(unit.isMoving).toBe(true);
            expect(unit.path).toBeTruthy();
            expect(unit.path.length).toBeGreaterThan(0);
            expect(unit.state).toBeInstanceOf(Job);
        }, { timeout: 1000, interval: 10 });

        expect(unit.targetRequest).toBeDefined();
        expect(unit.targetRequest.id).toBe(req.id);
    });
});