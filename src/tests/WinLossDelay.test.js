import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game.ts';
import { Terrain } from '../Terrain';
import { GameConfig } from '../config/GameConfig';

// Mock Config to ensure reliable combat/stats
vi.mock('../config/GameConfig', async () => {
    const actual = await vi.importActual('../config/GameConfig');
    return {
        ...actual,
        Levels: actual.Levels || [{
            levelId: 1,
            title: "Test Level",
            mapWidth: 10,
            mapDepth: 10,
            initialState: { unitCount: 1, hasEnemyBase: false, hasEnemyGuard: false, goblinCaves: 1 },
            generation: { rockHeight: 10, moistureBase: 0.5, treeDensity: 0.5, landRatio: 0.5 }
        }],
        GameConfig: {
            ...actual.GameConfig,
            goblins: {
                ...actual.GameConfig.goblins,
                normal: { ...actual.GameConfig.goblins.normal, hp: 10, damage: 10 }
            }
        }
    };
});

// Mock both variants
import { Levels as LevelsMock } from '../config/GameConfig';

// Mock Renderers and UI to prevent crash
vi.mock('../UnitRenderer', () => ({ UnitRenderer: class { init() { return Promise.resolve(); } dispose() { } } }));
vi.mock('../BuildingRenderer', () => ({ BuildingRenderer: class { init() { return Promise.resolve(); } dispose() { } } }));
vi.mock('../GoblinRenderer', () => ({ GoblinRenderer: class { init() { return Promise.resolve(); } dispose() { } } }));
vi.mock('../TreeRenderer', () => ({ TreeRenderer: class { init() { return Promise.resolve(); } dispose() { } } }));
vi.mock('../Minimap', () => ({ Minimap: class { update() { } drawRaidPing() { } serialize() { return {}; } deserialize() { } dispose() { } } }));
vi.mock('../Compass', () => ({ Compass: class { update() { } dispose() { } } }));
vi.mock('../WeatherManager', () => ({ WeatherManager: class { update() { } setSeason() { } dispose() { } } }));
vi.mock('../SoundManager', () => ({ SoundManager: class { play() { } stop() { } update() { } setSkyColor() { } dispose() { } } }));
vi.mock('../CloudManager', () => ({ CloudManager: class { update() { } dispose() { } } }));
vi.mock('../BirdManager', () => ({ BirdManager: class { update() { } dispose() { } } }));
vi.mock('../FishManager', () => ({ FishManager: class { update() { } dispose() { } } }));
vi.mock('../SheepManager', () => ({ SheepManager: class { update() { } dispose() { } initSheeps() { } } }));
vi.mock('../PerformanceMonitor', () => ({ PerformanceMonitor: class { enable() { } disable() { } toggle() { } update() { } startUpdate() { } endUpdate() { } startRender() { } endRender() { } updateEntityCount() { } getStats() { return {}; } dispose() { } begin() { } end() { } } }));
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({ OrbitControls: class { constructor() { this.target = { set: vi.fn() }; this.mouseButtons = {}; this.enableDamping = false; } update() { } dispose() { } } }));

vi.mock('../Terrain', () => {
    return {
        Terrain: vi.fn().mockImplementation(() => {
            return {
                grid: [],
                buildings: [],
                logicalWidth: 10,
                logicalDepth: 10,
                seed: 12345,
                initTerrain: vi.fn(),
                initEntityGrid: vi.fn(),
                getTileHeight: vi.fn(() => 0),
                serialize: vi.fn(() => ({ seed: 12345, h: [], n: [], b: [] })),
                dispose: vi.fn()
            };
        })
    };
});
vi.mock('../Terrain.ts', () => {
    return {
        Terrain: vi.fn().mockImplementation(() => {
            return {
                grid: [],
                buildings: [],
                logicalWidth: 10,
                logicalDepth: 10,
                seed: 12345,
                initTerrain: vi.fn(),
                initEntityGrid: vi.fn(),
                getTileHeight: vi.fn(() => 0),
                serialize: vi.fn(() => ({ seed: 12345, h: [], n: [], b: [] })),
                dispose: vi.fn()
            };
        })
    };
});

// Mock with and without extension to be safe
vi.mock('../GoblinManager', () => {
    return {
        GoblinManager: vi.fn().mockImplementation(() => {
            return {
                goblins: [],
                caves: [],
                update: vi.fn(),
                reset: vi.fn(),
                generateCaves: vi.fn(),
                serialize: vi.fn(() => ({ goblins: [], caves: [] })),
                setTerrain: vi.fn()
            };
        })
    };
});
vi.mock('../GoblinManager.js', () => {
    return {
        GoblinManager: vi.fn().mockImplementation(() => {
            return {
                goblins: [],
                caves: [],
                update: vi.fn(),
                reset: vi.fn(),
                generateCaves: vi.fn(),
                serialize: vi.fn(() => ({ goblins: [], caves: [] })),
                setTerrain: vi.fn()
            };
        })
    };
});

describe('WinLossDelay (TDD)', () => {
    let game;

    beforeEach(() => {
        document.body.innerHTML = '<div id="ui"></div><div id="loading-screen"></div>';

        const mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            clear: vi.fn(),
            traverse: vi.fn()
        };

        const mockTerrain = {
            grid: Array(10).fill(0).map(() => Array(10).fill({ height: 0, type: 'grass' })),
            buildings: [],
            logicalWidth: 10,
            logicalDepth: 10,
            seed: 12345,
            initTerrain: vi.fn(),
            initEntityGrid: vi.fn(),
            getTileHeight: vi.fn(() => 0),
            serialize: vi.fn(() => ({ seed: 12345, h: [], n: [], b: [] })),
            dispose: vi.fn(),
            clippingPlanes: []
        };

        const mockGoblinManager = {
            goblins: [],
            caves: [],
            update: vi.fn(),
            reset: vi.fn(),
            generateCaves: vi.fn(),
            serialize: vi.fn(() => ({ goblins: [], caves: [] }))
        };

        // Inject mocks to bypass internal creation
        // scene, terrain, minimal, goblinManager
        game = new Game(mockScene, mockTerrain, true, mockGoblinManager);

        // Ensure units initialized
        game.units = [];

        // Mock SaveManager
        game.saveManager = {
            save: vi.fn((slot, data) => {
                localStorage.setItem('save_slot_' + slot, JSON.stringify(data));
                return true;
            }),
            load: vi.fn((slot) => {
                const data = localStorage.getItem('save_slot_' + slot);
                return data ? JSON.parse(data) : null;
            })
        };

        // Mock rendering and UI
        game.initStartScreen = vi.fn();
        game.updateUI = vi.fn();
    });

    afterEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    it('should save and restore currentLevelIndex and currentSeed', async () => {
        console.log('[Test] Start Save Test');
        // Arrange
        game.currentLevelIndex = 2;
        game.currentSeed = 99999;

        // Act
        await game.saveGame(1);

        // Reset state
        game.currentLevelIndex = 0;
        game.currentSeed = 0;

        await game.loadGame(1);

        // Assert
        expect(game.currentLevelIndex).toBe(2);
        expect(game.currentSeed).toBe(99999);
    });

    it('should detect Victory when all goblins, caves, and enemy units are gone', () => {
        // Arrange
        game.gameActive = true;
        // Verify method exists first (It shouldn't yet)
        if (typeof game.evaluateWinLoss !== 'function') {
            // Throwing explicitly to show RED state if method missing
            throw new Error("Method evaluateWinLoss not implemented");
        }

        // Setup Player units
        game.units.push({ id: 1, faction: 'player', isDead: false });

        // Setup No Enemies
        game.goblinManager.goblins = [];
        game.goblinManager.caves = [];
        game.terrain.buildings = []; // No enemy huts

        // Act
        const result = game.evaluateWinLoss();
        console.log('Victory Test Result:', result); // DEBUG

        // Assert
        expect(result).toBe('win');
    });

    it('should detect Loss when all player units and buildings are gone', () => {
        // Arrange
        game.gameActive = true;
        if (typeof game.evaluateWinLoss !== 'function') {
            throw new Error("Method evaluateWinLoss not implemented");
        }

        // Setup Enemy existence (to prevent Win)
        game.goblinManager.goblins = [{ id: 1, type: 'goblin' }];

        // Setup No Player Units/Buildings
        game.units = [];
        game.terrain.buildings = [];

        // Act
        const result = game.evaluateWinLoss();
        console.log('Loss Test Result:', result); // DEBUG

        // Assert
        expect(result).toBe('loss');
    });

    it('should return null when game is ongoing', () => {
        // Arrange
        game.gameActive = true;
        if (typeof game.evaluateWinLoss !== 'function') {
            throw new Error("Method evaluateWinLoss not implemented");
        }

        // Setup Both Sides
        game.units = [{ id: 1, faction: 'player', isDead: false }];
        game.goblinManager.goblins = [{ id: 1, type: 'goblin' }];

        // Act
        const result = game.evaluateWinLoss();
        console.log('Ongoing Test Result:', result); // DEBUG

        // Assert
        expect(result).toBe(null);
    });
});
