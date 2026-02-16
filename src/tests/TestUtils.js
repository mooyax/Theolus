
import { vi } from 'vitest';
import { Terrain } from '../Terrain';
import { MockGame, MockTerrain } from './TestHelper';

/**
 * Standard setup for Game and Terrain in tests.
 * @param {Object} options
 * @param {boolean} options.useMockTerrain - If true, uses MockTerrain from TestHelper. If false, uses real Terrain.
 * @returns {Object} { game, terrain, scene }
 */
export function setupTestEnv(options = { useMockTerrain: false }) {
    // 1. Setup Global Game Mock
    const mockGame = new MockGame();
    // Ensure window.game is set
    if (typeof window === 'undefined') {
        global.window = { game: mockGame };
    } else {
        window.game = mockGame;
    }

    // 2. Setup Scene Mock
    const mockScene = {
        add: vi.fn(),
        remove: vi.fn(),
        getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }),
        clear: vi.fn()
    };
    mockGame.scene = mockScene;

    // 3. Setup Terrain
    let terrain;
    if (options.useMockTerrain) {
        terrain = new MockTerrain(100, 100);
        // Link MockTerrain to MockGame if structure requires it
        mockGame.terrain = terrain;
    } else {
        // Use Real Terrain with Mock Scene
        terrain = new Terrain(mockScene);
        terrain.buildings = [];
        // Mock crucial visual methods to avoid overhead
        terrain.updateMesh = vi.fn();
        terrain.updateColors = vi.fn();
        mockGame.terrain = terrain;
    }

    return { game: mockGame, terrain, scene: mockScene };
}

export function createTestBuilding(type, x, z, population = 0) {
    return {
        userData: { type, gridX: x, gridZ: z, population, capacity: 10, id: `b_${x}_${z}` },
        population,
        gridX: x,
        gridZ: z
    };
}
