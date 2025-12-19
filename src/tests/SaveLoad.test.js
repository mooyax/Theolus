
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Terrain } from '../Terrain.js';
import { SaveManager } from '../SaveManager.js';
import LZString from 'lz-string';

// Mock Browser Globals
// Mock Browser Globals
global.window = {
    innerWidth: 1024,
    innerHeight: 768,
    devicePixelRatio: 1,
    addEventListener: vi.fn(),
};
global.document = {
    getElementById: vi.fn(),
    createElement: vi.fn().mockReturnValue({
        getContext: vi.fn().mockReturnValue({
            fillRect: vi.fn(),
            fillStyle: '',
            beginPath: vi.fn(),
            moveTo: vi.fn(),
            lineTo: vi.fn(),
            stroke: vi.fn(),
        }),
        style: {}
    }),
    body: {
        appendChild: vi.fn(),
        style: {}
    }
};
global.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
};
global.alert = vi.fn();
global.Image = vi.fn(); // For textures

// Mock OrbitControls BEFORE imports (hoisted)
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: vi.fn().mockImplementation(() => ({
        enableDamping: true,
        update: vi.fn(),
        target: { set: vi.fn(), x: 0, y: 0, z: 0 },
        minZoom: 0,
        maxZoom: 10,
        dispose: vi.fn()
    }))
}));

// Mock THREE partially
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: vi.fn().mockImplementation(() => ({
            setPixelRatio: vi.fn(),
            setSize: vi.fn(),
            domElement: document.createElement('canvas'), // Real mock element
            render: vi.fn(),
            dispose: vi.fn(),
            shadowMap: {},
            outputEncoding: null,
            capabilities: { getMaxAnisotropy: () => 1 }
        }))
    };
});

// Mock THREE GLOBAL for scripts that rely on it (if any legacy)
import * as THREE from 'three';
global.THREE = THREE;

describe('Save/Load System', () => {
    let game;
    let mockScene;

    beforeEach(() => {
        vi.clearAllMocks();

        // Mock UI Elements
        const mockElement = {
            style: { display: 'none', width: '0%' },
            innerText: ''
        };
        document.getElementById.mockReturnValue(mockElement);

        // Mock Scene
        mockScene = new THREE.Scene();

        // Setup Game
        try {
            console.log("Initializing Game...");
            game = new Game();
        } catch (e) {
            console.error("Game Instantiation Error Message:", e.message);
            console.error("Game Instantiation Stack:", e.stack);
            throw e;
        }
        game.scene = mockScene;

        // Initialize Managers
        game.saveManager = new SaveManager();

        // Setup Terrain
        game.terrain = new Terrain(mockScene, {});
        // Mock rendering methods
        game.terrain.generate = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.updateColors = vi.fn();
        game.terrain.removeBuilding = vi.fn(); // Mock removal during clear

        // Setup Terrain Grid
        game.terrain.logicalWidth = 10;
        game.terrain.logicalDepth = 10;
        game.terrain.grid = Array(10).fill(0).map((_, x) =>
            Array(10).fill(0).map((_, z) => ({
                height: 1,
                noise: 0.5,
                moisture: 0.5,
                hasBuilding: false,
                building: null
            }))
        );
        game.terrain.buildings = [];
    });

    it('should save game data correctly', () => {
        game.resources = { grain: 100, fish: 50, meat: 25 };
        game.gameTime = 12.0;

        // Add building
        const mockBuilding = {
            userData: { type: 'house', population: 5, gridX: 2, gridZ: 2 },
            position: new THREE.Vector3(2, 1, 2),
            rotation: 0
        };
        game.terrain.grid[2][2].hasBuilding = true;
        game.terrain.grid[2][2].building = mockBuilding;
        game.terrain.buildings.push(mockBuilding);

        const result = game.saveGame(1);

        expect(result).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalled();

        const callArgs = localStorage.setItem.mock.calls[0];
        expect(callArgs[0]).toBe('god_game_save_1'); // Check key

        // Verify Data Integrity
        const val = callArgs[1];
        const decompressed = LZString.decompressFromUTF16(val);
        const json = JSON.parse(decompressed);

        expect(json.data.resources.grain).toBe(100);
        // Verify building in terrain grid?
        // Terrain.serialize loops grid.
        // We mocked grid, so it should be there.
        // Note: Terrain.serialize relies on `this.grid`.
        // Verify expected building count logic if possible?
        // Or just trust unit test coverage for Terrain.
        expect(json.data.terrain).toBeDefined();
    });

    it('should load game data correctly', async () => {
        const savedData = {
            timestamp: Date.now(),
            data: {
                resources: { grain: 999, fish: 888, meat: 777 },
                gameTime: 6.0,
                terrain: {
                    logicalWidth: 10,
                    logicalDepth: 10,
                    grid: Array(10).fill(0).map((_, x) =>
                        Array(10).fill(0).map((_, z) => ({
                            h: 5, n: 0.5,
                            hb: (x === 5 && z === 5) ? 1 : 0,
                            b: (x === 5 && z === 5) ? { t: 'house', p: 10, x: 5, z: 5 } : undefined
                        }))
                    )
                },
                units: [],
                goblinManager: null, // Test null handling
                camera: { position: { x: 0, y: 0, z: 0 }, zoom: 1, target: { x: 0, y: 0, z: 0 } }
            }
        };

        const compressed = LZString.compressToUTF16(JSON.stringify(savedData));
        localStorage.getItem.mockReturnValue(compressed);

        // Ensure Terrain.deserialize can run.
        // It calls this.addBuilding. We mock it to avoid creating real Meshes that might fail in JSDOM/Node without canvas.
        game.terrain.addBuilding = vi.fn().mockImplementation((type, x, z) => {
            const b = new THREE.Mesh();
            b.userData = { type, gridX: x, gridZ: z, population: 0 };
            game.terrain.buildings.push(b);
            return b;
        });

        // Mock setSeason
        game.terrain.setSeason = vi.fn();

        const success = await game.loadGame(1);

        expect(success).toBe(true);
        expect(game.resources.grain).toBe(999);
        expect(game.terrain.addBuilding).toHaveBeenCalledWith('house', 5, 5, true);

        // Verify Loading Screen was hidden
        const loadingScreen = document.getElementById('loading-screen'); // Returns mock
        // Since getElementById returns the SAME object reference mock, we can check it.
        // Wait, document.getElementById is a mock returning a NEW object or same?
        // My mock: `mockReturnValue(mockElement)` -> SAME element every call.
        const mockEl = document.getElementById();
        expect(mockEl.style.display).toBe('none'); // Should be hidden at end
    });
});
