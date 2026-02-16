
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { Terrain } from '../Terrain'; // Will mock class
import * as THREE from 'three';

// Mock THREE
global.THREE = THREE;

describe('Unit AI Search Optimization', () => {
    let unit;
    let mockGame;
    let mockTerrain;
    let mockGoblinManager;
    let mockGoblins = [];

    beforeEach(() => {
        // Mock THREE math
        // Unit.js needs assets
        Unit.assets = { initialized: true };

        // Mock Terrain
        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            buildings: [],
            grid: [],
            // Methods needed for search
            entityGrid: [],
            findBestTarget: vi.fn(), // New method
            getTileHeight: () => 0,
            getInterpolatedHeight: () => 0, // Used by updatePosition
            getVisualPosition: () => ({ x: 0, y: 0, z: 0 }), // Used by updatePosition
            getVisualOffset: () => ({ x: 0, y: 0, z: 0 }),
            isValidGrid: () => true,
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
        };

        // Init Grid
        for (let x = 0; x < 100; x++) {
            mockTerrain.entityGrid[x] = [];
            for (let z = 0; z < 100; z++) mockTerrain.entityGrid[x][z] = [];
        }

        // Mock Goblin Manager (Old Way - kept for structure but unused by new logic)
        mockGoblins = [];
        mockGoblinManager = {
            goblins: mockGoblins
        };

        // Mock Game
        mockGame = {
            goblinManager: mockGoblinManager,
            gameTotalTime: 1000
        };

        // Create Unit
        unit = new Unit(null, mockTerrain, 0, 0, 'guard');
        unit.game = mockGame;
        unit.id = 999;

        // Suppress console
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('should use Spatial Search to find goblin', () => {
        // Setup mock return
        const goblin = { id: 101, gridX: 5, gridZ: 5, isDead: false, type: 'goblin' };
        // We simulate findBestTarget returning this goblin
        mockTerrain.findBestTarget.mockReturnValue(goblin);

        // Run Search (Using checkSelfDefense now)
        unit.checkSelfDefense(null, true);

        // Expectation 1: Unit calls findBestTarget
        // Default range for non-knight units in checkSelfDefense is 20
        expect(mockTerrain.findBestTarget).toHaveBeenCalledWith('goblin', 0, 0, 20, expect.any(Function), expect.any(Array));

        // Expectation 2: Unit sets target
        expect(unit.targetGoblin).toBe(goblin);
    });

    it('should find Base using Spatial Search', () => {
        // Setup mock return for building
        const hut = {
            id: 202,
            userData: { type: 'goblin_hut', gridX: 20, gridZ: 20 },
            gridX: 20, gridZ: 20
        };

        // Make sure goblin search returns null so it proceeds to buildings
        mockTerrain.findBestTarget.mockImplementation((type, x, z, r, cb) => {
            if (type === 'goblin') return null;
            if (type === 'building') return hut;
            return null;
        });

        unit.checkSelfDefense(null, true);

        // Expectation: Calls findBestTarget for building
        // Building range for non-knight units in checkSelfDefense is 10
        expect(mockTerrain.findBestTarget).toHaveBeenCalledWith('building', 0, 0, 10, expect.any(Function), expect.any(Array));
    });
});
