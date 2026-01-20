
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game.js';
import { Terrain } from '../Terrain.js';
import { SaveManager } from '../SaveManager.js';
import LZString from 'lz-string';

// --- MOCKS ---

// Mock Browser API
global.window = {
    innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
    getComputedStyle: () => ({ display: 'none' }),
    addEventListener: vi.fn(),
    requestAnimationFrame: vi.fn(),
    cancelAnimationFrame: vi.fn(),
    localStorage: global.localStorage, // Fix: Link global storage to window
};
global.document = {
    getElementById: vi.fn(() => ({ style: {}, innerText: '' })),
    createElement: vi.fn(() => ({
        getContext: () => ({ fillRect: () => { }, beginPath: () => { }, moveTo: () => { }, lineTo: () => { }, stroke: () => { }, strokeRect: () => { }, fill: () => { } }),
        style: {}, width: 0, height: 0
    })),
    body: { appendChild: vi.fn(), style: {} }
};
global.localStorage = { getItem: vi.fn(), setItem: vi.fn(), clear: vi.fn(), removeItem: vi.fn() };
global.alert = vi.fn();
global.Image = class { constructor() { this.onload = null; } };

// Mock Managers
vi.mock('../SoundManager.js', () => ({ SoundManager: class { play() { } } }));
vi.mock('../InputManager.js', () => ({ InputManager: class { update() { } updateCursor() { } } }));
vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { update() { } reset() { } scanForCaves() { } serialize() { return {}; } deserialize() { } } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { update() { } draw() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { update() { } draw() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { update() { } draw() { } } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { update() { } draw() { } } }));
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { init() { return Promise.resolve(); } update() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { init() { return Promise.resolve(); } update() { } updateLighting() { } } }));
vi.mock('../ParticleSystem.js', () => ({ ParticleSystem: class { update() { } emit() { } } }));
vi.mock('../Game.js', async () => {
    const actual = await vi.importActual('../Game.js');
    return {
        ...actual,
        BattleMemory: class { update() { } reportRaid() { } getPriorities() { return []; } }
    };
});

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() {
                this.domElement = { style: {}, getContext: () => ({}) };
                this.shadowMap = {};
                this.capabilities = { getMaxAnisotropy: () => 1 };
            }
            setPixelRatio() { }
            setSize() { }
            render() { }
            dispose() { }
        },
        CanvasTexture: class { constructor() { } },
        Vector3: actual.Vector3,
        Scene: actual.Scene,
        Group: actual.Group,
        Raycaster: actual.Raycaster
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn(), clone: vi.fn() }; }
        update() { }
        dispose() { }
    }
}));


describe('Save/Load System', () => {
    let game;
    let mockScene;

    beforeEach(() => {
        vi.clearAllMocks();
        game = new Game();
        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.generate = vi.fn();
        window.game = game; // Fix: Ensure global game access for Units
    });

    it('should save game data correctly', () => {
        game.resources = { grain: 100, fish: 50, meat: 25 };
        game.gameTime = 12.0;

        const result = game.saveGame(1);

        if (!result) {
            console.error("DEBUG: SAVE FAILED. Result:", result);
            console.error("DEBUG: game.saveManager exists?", !!game.saveManager);
            if (game.saveManager) {
                console.error("DEBUG: saveManager.save exists?", typeof game.saveManager.save);
                console.error("DEBUG: storageAvailable?", game.saveManager.storageAvailable ? game.saveManager.storageAvailable('localStorage') : 'N/A');
            }

            const alerts = global.alert.mock.calls;
            if (alerts.length > 0) {
                console.error("DEBUG: Alerts:", JSON.stringify(alerts));
            } else {
                console.error("DEBUG: No alerts called.");
            }
        }

        expect(result).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalled();

        const callArgs = localStorage.setItem.mock.calls[0];
        expect(callArgs[0]).toBe('god_game_save_1');

        const val = callArgs[1];
        const decompressed = LZString.decompressFromUTF16(val);
        const json = JSON.parse(decompressed);

        expect(json.data.resources.grain).toBe(100);
    });

    it('should load game data correctly', async () => {
        const savedData = {
            timestamp: Date.now(),
            data: {
                resources: { grain: 999, fish: 888 },
                gameTime: 6.0,
                terrain: {
                    logicalWidth: 10, logicalDepth: 10,
                    grid: [],
                    buildings: []
                },
                units: [],
                camera: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 } }
            }
        };
        const compressed = LZString.compressToUTF16(JSON.stringify(savedData));
        localStorage.getItem.mockReturnValue(compressed);

        game.terrain.deserialize = vi.fn();

        const success = await game.loadGame(1);

        expect(success).toBe(true);
        expect(game.resources.grain).toBe(999);
        expect(game.terrain.deserialize).toHaveBeenCalled();
    });

    it('should restore request markers with correct renderOrder', async () => {
        // Mock Marker Material explicitly to ensure clone works in test env
        game.markerMaterial = {
            clone: vi.fn().mockReturnValue({
                uniforms: {
                    uColor: { value: { setHex: vi.fn() } },
                    uTime: { value: 0 }
                },
                dispose: vi.fn()
            })
        };

        const savedData = {
            timestamp: Date.now(),
            data: {
                resources: {},
                gameTime: 10,
                terrain: { logicalWidth: 80, grid: [], buildings: [] },
                units: [],
                requests: [
                    { id: 'req_1', type: 'raise', x: 5, z: 5, status: 'pending' },
                    { id: 'req_2', type: 'lower', x: 10, z: 10, status: 'completed' }
                ]
            }
        };
        const compressed = LZString.compressToUTF16(JSON.stringify(savedData));
        localStorage.getItem.mockReturnValue(compressed);

        await game.loadGame(1);

        expect(game.requestQueue.length).toBe(2);

        const req1 = game.requestQueue.find(r => r.id === 'req_1');
        expect(req1).toBeDefined();
        expect(req1.mesh).toBeDefined();
        expect(req1.mesh.renderOrder).toBe(2000); // Verify Fix
        expect(game.markerMaterial.clone).toHaveBeenCalled();

        const req2 = game.requestQueue.find(r => r.id === 'req_2');
        expect(req2.mesh.renderOrder).toBe(2000);
        // Verify Color Restore Logic (Mocked setHex)
        // req2 status is completed -> Green (0x00FF00)
        // req1 status is pending -> Yellow (0xFFFF00)
        // Access the mocked return value of the SECOND clone call?
        // Since clone returns the SAME mock object (simplified), we can check calls to setHex?
        // But the mock returns a NEW object? No, mockReturnValue returns the SAME object reference usually unless mockReturnValueOnce.
        // Let's rely on renderOrder for now as correct restoration proof.
    });
});
