import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Building } from '../Building.js';
import { Game } from '../Game.js';

// --- Global Mocks/Setup ---
if (typeof HTMLCanvasElement !== 'undefined') {
    HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((type) => {
        if (type !== '2d') return null;
        return {
            fillRect: vi.fn(),
            clearRect: vi.fn(),
            getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
            putImageData: vi.fn(),
            createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
            setTransform: vi.fn(),
            drawImage: vi.fn(),
            save: vi.fn(),
            restore: vi.fn(),
            beginPath: vi.fn(),
            moveTo: vi.fn(),
            lineTo: vi.fn(),
            closePath: vi.fn(),
            stroke: vi.fn(),
            fill: vi.fn(),
            arc: vi.fn(),
            createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
            measureText: vi.fn(() => ({ width: 0 })),
        };
    });
}

// Mock Component classes
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } dispose() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { update() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { update() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { update() { } } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { update() { } } }));
vi.mock('../SoundManager.js', () => ({ SoundManager: class { init() { } play() { } initialized = true; } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { update() { } dispose() { } initAssets() { } initInstancedMeshes() { } updateLighting() { } assets = { caveGeo: { parameters: { radiusTop: 0.45 } } }; } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { update() { } dispose() { } initAssets() { } updateLighting() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { update() { } dispose() { } initAssets() { } updateLighting() { } } }));
vi.mock('../InputManager.js', () => ({ InputManager: class { update() { } } }));
vi.mock('../ParticleManager.js', () => ({ ParticleManager: class { update() { } } }));
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({ OrbitControls: class { update() { } } }));

// Mock THREE more robustly
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    class MockRenderer {
        constructor() {
            this.domElement = document.createElement('canvas');
            this.clippingPlanes = [];
            this.localClippingEnabled = false;
        }
        setSize() { }
        setPixelRatio() { }
        render() { }
        setClearColor() { }
        dispose() { }
    }
    return {
        ...actual,
        WebGLRenderer: MockRenderer
    };
});

// Mock Unit & Goblin (Static methods)
vi.mock('../Unit.js', async () => {
    const { Unit } = await vi.importActual('../Unit.js');
    Unit.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
    Unit.initAssets = vi.fn();
    return { Unit };
});

vi.mock('../Goblin.js', async () => {
    const { Goblin } = await vi.importActual('../Goblin.js');
    Goblin.createFaceTexture = vi.fn().mockReturnValue(new THREE.Texture());
    Goblin.initAssets = vi.fn();
    return { Goblin };
});

const mockTerrain = {
    logicalWidth: 240,
    logicalDepth: 240,
    width: 720,
    depth: 720,
    buildings: [],
    grid: Array(240).fill(0).map(() => Array(240).fill(0).map(() => ({ height: 1, hasBuilding: false }))),
    getVisualPosition: (x, z) => ({ x, y: 1, z }),
    getVisualOffset: () => ({ x: 0, y: 0 }),
    getTileHeight: () => 1,
    getInterpolatedHeight: () => 1,
    isValidGrid: () => true,
    isWalkable: () => true,
    isReachable: () => true,
    update: vi.fn(),
    registerEntity: vi.fn(),
    unregisterEntity: vi.fn(),
    moveEntity: vi.fn(),
    canAddBuilding: () => true,
    addBuilding: vi.fn().mockImplementation((type, x, z) => {
        const b = new Building(null, mockTerrain, type, x, z);
        mockTerrain.buildings.push(b);
        return b;
    }),
    findBestTarget: () => null,
    clippingPlanes: []
};

describe('Goblin Spawning Logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockTerrain.buildings = [];
    });

    it('should update building population', () => {
        const cave = new Building(null, mockTerrain, 'cave', 10, 10);
        mockTerrain.buildings.push(cave);

        expect(cave.userData.population).toBe(0);

        const deltaTime = 1.0;
        cave.update(0, deltaTime);

        // Cave growth rate is 0.3
        expect(cave.userData.population).toBeCloseTo(0.3, 2);
    });

    it('should synchronize clipping planes with controls.target when available', () => {
        const game = new Game(null, mockTerrain, true);

        // Mock controls.target
        game.controls = {
            target: new THREE.Vector3(500, 0, 500),
            update: vi.fn(),
            domElement: document.createElement('canvas')
        };

        game.camera.position.set(100, 100, 100); // Camera follows target but is far away
        game.updateCameraControls();

        const viewRadius = 150;
        // Should use target (500) instead of camera position (100)
        expect(game.clippingPlanes[1].constant).toBe(500 + viewRadius);
        expect(game.clippingPlanes[1].constant).not.toBe(100 + viewRadius);
    });
});
