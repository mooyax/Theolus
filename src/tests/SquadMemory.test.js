
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';

// Mocks
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = {}; }
            setPixelRatio() { }
            setSize() { }
            render() { }
        },
        // Helpers
        Vector3: actual.Vector3,
        Sphere: actual.Sphere,
        Object3D: actual.Object3D,
        CanvasTexture: class { constructor() { } }
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn(), clone: vi.fn() }; } // Partial Vector3
        update() { }
        enableDamping = false;
    }
}));

// Mock Managers
vi.mock('../InputManager.js', () => ({ InputManager: class { update() { } } }));
vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { update() { } reset() { } scanForCaves() { } } }));
vi.mock('../SoundManager.js', () => ({ SoundManager: class { } }));
vi.mock('../SaveManager.js', () => ({ SaveManager: class { } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { update() { } } }));
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { update() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { update() { } updateLighting() { } } }));
vi.mock('../Terrain.js', () => ({
    Terrain: class {
        constructor() {
            this.buildings = [];
            this.logicalWidth = 100;
            this.logicalDepth = 100;
            this.width = 100;
            this.depth = 100;
            this.clippingPlanes = [];
        }
        update() { }
        updateMeshPosition() { }
        updateLights() { }
        getTileHeight() { return 1; }
        getInterpolatedHeight() { return 1; }
        registerEntity() { }
        unregisterEntity() { }
        setSeason() { }
        deserialize(data) {
            // Basic deserialize mock if Game relies on it to restore buildings
            // For Load test, we might need to manually populate buildings if valid logic calls this.
        }
        serialize() { return {}; }
    }
}));

global.THREE = await vi.importActual('three');

describe('Squad-Based Memory', () => {
    let game;
    let terrain;

    beforeEach(() => {
        // Mock global rAF FIRST
        global.requestAnimationFrame = vi.fn();
        global.cancelAnimationFrame = vi.fn();

        // Mock global window
        global.window = {
            addEventListener: vi.fn(),
            innerWidth: 1024,
            innerHeight: 768,
            devicePixelRatio: 1,
            requestAnimationFrame: global.requestAnimationFrame,
            cancelAnimationFrame: global.cancelAnimationFrame,
        };

        // Mock global document
        global.document = {
            createElement: () => ({
                width: 64, height: 64,
                getContext: () => ({
                    fillStyle: '',
                    fillRect: () => { }
                })
            }),
            body: { appendChild: vi.fn() },
            getElementById: vi.fn()
        };

        // Setup Game
        game = new Game();
        terrain = game.terrain;

        // Reset buildings 
        terrain.buildings = [];
    });

    it('should link manually spawned units to nearby barracks', () => {
        const barracks = { type: 'barracks', gridX: 10, gridZ: 10, userData: { type: 'barracks' } };
        terrain.buildings.push(barracks);

        const unit = game.spawnUnit(12, 12, null, barracks);

        expect(unit.homeBase).toBe(barracks);
        expect(unit.role).toBe('knight');
        expect(barracks.userData.memory).toBeDefined();
    });

    it('should report enemy immediately on hit (Swarming Trigger)', () => {
        const barracks = { type: 'barracks', gridX: 10, gridZ: 10, userData: { type: 'barracks', memory: null } };
        terrain.buildings.push(barracks);

        const knight = game.spawnUnit(10, 10, null, barracks);
        // Ensure cooldown 0
        knight.attackCooldown = 0;

        const goblin = { id: 'g1', gridX: 15, gridZ: 15, hp: 100, takeDamage: vi.fn(), isDead: false };

        // ACTION: Attack
        knight.attackGoblin(goblin);

        expect(goblin.takeDamage).toHaveBeenCalled();
        expect(goblin.isDead).toBe(false);

        // CHECK MEMORY for swarming
        expect(barracks.userData.memory).toBeDefined();
        const memories = barracks.userData.memory.getPriorities(0);
        expect(memories).toHaveLength(1);
        expect(memories[0].x).toBe(15);
    });

    it('should re-link Wizards to Tower after Load Game', () => {
        const tower = { type: 'tower', gridX: 20, gridZ: 20, userData: { type: 'tower', gridX: 20, gridZ: 20 } };
        terrain.buildings.push(tower);

        const mockSaveData = {
            units: [{
                role: 'wizard',
                gridX: 22,
                gridZ: 22,
                isSpecial: false,
                hp: 50,
                // PERSISTENCE TEST: Explicit Link to Tower at 20,20
                homeBaseGridX: 20,
                homeBaseGridZ: 20
            }],
            camera: { position: { x: 0, y: 0, z: 0 } },
            terrain: {}
        };

        game.saveManager = {
            load: vi.fn().mockReturnValue(mockSaveData)
        };

        // Suppress logs
        const spyLog = vi.spyOn(console, 'log').mockImplementation(() => { });
        const spyError = vi.spyOn(console, 'error').mockImplementation(() => { });

        const result = game.loadGame(1);
        expect(result).toBe(true);
        expect(game.units).toHaveLength(1);

        const wizard = game.units[0];
        expect(wizard.role).toBe('wizard');
        expect(wizard.homeBase).toBe(tower); // CRITICAL CHECK
        expect(tower.userData.memory).toBeDefined(); // CRITICAL CHECK

        spyLog.mockRestore();
        spyError.mockRestore();
    });
});
