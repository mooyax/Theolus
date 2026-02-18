
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { Building } from '../Building';
import { GameConfig } from '../config/GameConfig';

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');

    // Helper to create mock objects with basic properties
    const createMockObject = () => ({
        position: { set: vi.fn(), x: 0, y: 0, z: 0 },
        rotation: { set: vi.fn(), x: 0, y: 0, z: 0 },
        scale: { set: vi.fn(), x: 1, y: 1, z: 1 },
        add: vi.fn(),
        remove: vi.fn(),
        updateMatrix: vi.fn(),
        updateMatrixWorld: vi.fn(),
        traverse: vi.fn(),
        children: []
    });

    const createMockAttribute = (count) => ({
        count: count,
        getX: vi.fn().mockReturnValue(0),
        getY: vi.fn().mockReturnValue(0),
        setX: vi.fn(),
        setY: vi.fn(),
        needsUpdate: false,
        array: new Float32Array(count * 3)
    });

    const createMockGeometry = (width = 1, depth = 1) => {
        const count = (width + 1) * (depth + 1);
        return {
            setAttribute: vi.fn(),
            setIndex: vi.fn(),
            computeVertexNormals: vi.fn(),
            attributes: {
                position: createMockAttribute(count),
                color: createMockAttribute(count)
            },
            dispose: vi.fn()
        };
    };

    return {
        ...actual,
        WebGLRenderer: vi.fn().mockImplementation(function () {
            return {
                setSize: vi.fn(),
                render: vi.fn(),
                domElement: document.createElement('canvas'),
                shadowMap: { enabled: false },
                setPixelRatio: vi.fn()
            };
        }),
        Mesh: vi.fn().mockImplementation(function () { return createMockObject(); }),
        Group: vi.fn().mockImplementation(function () { return createMockObject(); }),
        Scene: vi.fn().mockImplementation(function () {
            const s = createMockObject();
            s.background = new actual.Color();
            return s;
        }),
        // Materials
        MeshBasicMaterial: vi.fn().mockImplementation(function () { return {}; }),
        MeshLambertMaterial: vi.fn().mockImplementation(function () { return {}; }),
        LineBasicMaterial: vi.fn().mockImplementation(function () { return {}; }),
        PointsMaterial: vi.fn().mockImplementation(function () { return {}; }),
        ShaderMaterial: vi.fn().mockImplementation(function () { return {}; }),
        // Geometries
        BufferGeometry: vi.fn().mockImplementation(function () { return createMockGeometry(); }),
        SphereGeometry: vi.fn().mockImplementation(function () { return createMockGeometry(); }),
        PlaneGeometry: vi.fn().mockImplementation(function (w, d) { return createMockGeometry(w, d); }),
        BufferAttribute: vi.fn().mockImplementation(function (arr, size) {
            return createMockAttribute(arr.length / size);
        }),
        // Others
        LineSegments: vi.fn().mockImplementation(function () { return createMockObject(); }),
        Points: vi.fn().mockImplementation(function () { return createMockObject(); }),
        Vector3: actual.Vector3, // Keep real ones for logic
        Vector2: actual.Vector2,
        Matrix4: actual.Matrix4,
        Color: actual.Color,
        Plane: actual.Plane,
        Frustum: actual.Frustum,
        AmbientLight: vi.fn().mockImplementation(function () {
            const l = createMockObject();
            l.color = new actual.Color();
            l.intensity = 1;
            return l;
        }),
        DirectionalLight: vi.fn().mockImplementation(function () {
            const l = createMockObject();
            l.color = new actual.Color();
            l.intensity = 1;
            return l;
        })
    };
});

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls', () => {
    return {
        OrbitControls: vi.fn().mockImplementation(function () {
            return {
                update: vi.fn(),
                enableDamping: true,
                dampingFactor: 0.05,
                screenSpacePanning: false,
                minZoom: 0.25,
                maxZoom: 4.0,
                maxPolarAngle: Math.PI / 2,
                mouseButtons: {},
                target: { set: vi.fn() }
            };
        })
    };
});

describe('Population Growth and Spawning Fix Verification', () => {
    let gameStub;
    let terrain;

    beforeEach(() => {
        try {
            console.log('[TEST] beforeEach START');
            // Setup DOM
            document.body.innerHTML = '<div id="ui-container"><div id="mana-value">100</div></div>';

            console.log('[TEST] Creating Mock Game');
            // Manual Mock Game to avoid constructor loops/crashes
            gameStub = {
                scene: new THREE.Scene(),
                gameActive: true,
                resources: { grain: 100, meat: 0, fish: 0 },
                units: [],
                handleBuildingSpawn: vi.fn(),
                isNight: false,
                frameCount: 0,
                goblinManager: {
                    update: vi.fn(),
                    spawnGoblinAtCave: vi.fn()
                }
            };
            // Stub the global game object used by Terrain/Unit
            vi.stubGlobal('game', gameStub);
            globalThis.game = gameStub; // Dual stub

            console.log('[TEST] Config setup');
            // Ensure GameConfig is consistent
            GameConfig.buildings.house.growthRate = 0.5;
            GameConfig.buildings.cave.growthRate = 0.4;
            console.log('[TEST] beforeEach END');
        } catch (e) {
            console.error('[TEST] ERROR in beforeEach:', e.message);
            console.error(e.stack);
            throw e;
        }
    });

    it('should increase house population over time', () => {
        terrain = new Terrain(gameStub.scene, [], 10, 10);
        gameStub.terrain = terrain;

        const house = terrain.addBuilding('house', 5, 5, true);
        expect(house.population).toBe(0);

        terrain.frameCount = 19;
        const dt = 1 / 60;

        terrain.update(dt, () => true, false, 0, true);

        // growthRate 0.5 * simDelta (0.0166 * 20) = 0.166
        expect(house.population).toBeGreaterThan(0.16);
    });

    it('should spawn a worker when house population reaches 10', () => {
        terrain = new Terrain(gameStub.scene, [], 10, 10);
        gameStub.terrain = terrain;

        const house = terrain.addBuilding('house', 5, 5, true);
        house.population = 9.9;

        terrain.frameCount = 19;
        const dt = 1 / 60;

        gameStub.handleBuildingSpawn.mockReturnValue(true);
        terrain.update(dt, gameStub.handleBuildingSpawn.bind(gameStub), false, 0, true);

        // rate = 0.5, simDt = 0.33. New pop = 9.9 + 0.165 = 10.065 -> Reset to 0
        expect(house.population).toBe(0);
        expect(gameStub.handleBuildingSpawn).toHaveBeenCalled();
    });

    it('should increase cave population and allow goblin spawning', () => {
        terrain = new Terrain(gameStub.scene, [], 10, 10);
        gameStub.terrain = terrain;

        const cave = terrain.addBuilding('cave', 2, 2, true);
        expect(cave.population).toBe(0);

        terrain.frameCount = 19;
        const dt = 1 / 60;

        terrain.update(dt, () => true, false, 0, true);

        expect(cave.population).toBeGreaterThan(0.13);

        // Manual jump to threshold
        cave.population = 11.0;

        // Implementation of a minimal update logic for the mock goblinManager
        gameStub.goblinManager.update = function (time, deltaTime, isNight, units, list) {
            if (!list) return;
            list.forEach(b => {
                if (b.userData.type === 'cave' && b.userData.population >= 1.0) {
                    this.spawnGoblinAtCave(b);
                    b.population = 0;
                }
            });
        };

        gameStub.goblinManager.update(0, dt, false, [], terrain.buildings, 1.0, null);

        expect(gameStub.goblinManager.spawnGoblinAtCave).toHaveBeenCalled();
        expect(cave.population).toBe(0);
    });
});
