import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { GoblinManager } from '../GoblinManager.js';

// Mock Goblin Class BEFORE usage
vi.mock('../Goblin.js', () => {
    return {
        Goblin: class {
            constructor() { }
            static initAssets() { }
            static assets = { materials: {} };
        }
    };
});

// Mock DOM for Goblin.initAssets
global.document = {
    createElement: () => ({
        getContext: () => ({
            fillStyle: '', fillRect: () => { },
            drawImage: () => { }
        }),
        width: 0, height: 0
    })
};

describe('GoblinManager Cave Persistence', () => {
    let mockScene, mockTerrain, manager;

    beforeEach(() => {
        mockScene = {
            add: vi.fn(),
            remove: vi.fn()
        };

        // Mock Terrain
        mockTerrain = {
            logicalWidth: 20,
            logicalDepth: 20,
            grid: [],
            getTileHeight: vi.fn((x, z) => 5.0) // Default height 5.0
        };

        // Initialize mock grid for internal checks if any
        for (let x = 0; x < 20; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                mockTerrain.grid[x][z] = { height: 5.0 };
            }
        }

        // Prevent constructor from running complex logic
        vi.spyOn(GoblinManager.prototype, 'generateCaves').mockImplementation(() => { });

        manager = new GoblinManager(mockScene, mockTerrain, {}, []);
        manager.caves = []; // Clear random generation
        manager.caveGroup = { add: vi.fn(), remove: vi.fn() }; // Mock Group correctly
    });

    it('should update cave Y position when terrain height changes', () => {
        // 1. Create a cave at (10, 10)
        // Manually trigger createCave since generateCaves is random
        manager.createCave(10, 10);

        const cave = manager.caves[0];
        expect(cave).toBeDefined();
        expect(cave.mesh.position.y).toBe(5.0);
        expect(cave.originalHeight).toBe(5.0);

        // 2. Change Terrain Height Mock
        // Simulate terrain rising to 8.0
        mockTerrain.getTileHeight.mockReturnValue(8.0);

        // 3. Run Update
        manager.update(0, 0.1, false, []);

        // 4. Verify Cave Moved
        expect(cave.mesh.position.y).toBe(8.0);
        expect(cave.originalHeight).toBe(8.0);
    });

    it('should still destroy cave if submerged (height <= 0)', () => {
        manager.createCave(10, 10);
        const cave = manager.caves[0];

        // Sink Terrain
        mockTerrain.getTileHeight.mockReturnValue(-1.0);

        manager.update(0, 0.1, false, []);

        // Verify Removal
        expect(mockScene.remove).toHaveBeenCalledWith(cave.mesh);
        expect(manager.caves.length).toBe(0);
    });
});
