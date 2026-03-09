import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.ts';
import { Warship } from '../Warship.ts';
import { GameConfig } from '../config/GameConfig';

describe('Warship Fishing', () => {
    let mockScene, mockTerrain, mockGame;

    beforeEach(() => {
        mockScene = new THREE.Scene();
        mockTerrain = {
            logicalWidth: 80,
            logicalDepth: 80,
            getTileHeight: vi.fn().mockReturnValue(-1), // Water
            getInterpolatedHeight: vi.fn().mockReturnValue(-1),
            getVisualPosition: vi.fn().mockReturnValue(new THREE.Vector3(0, 0, 0)),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            findBestTarget: vi.fn(),
        };
        mockGame = {
            resources: { fish: 0, meat: 0, food: 0 },
            addMana: vi.fn(),
            registerSquad: vi.fn().mockReturnValue('squad1'),
            units: []
        };
        const w = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global.window : {});
        w.game = mockGame;
    });

    it('should gather double fish for warships (Unit class)', () => {
        const warship = new Unit(mockScene, mockTerrain, 10, 10, 'warship');
        warship.game = mockGame; // Explicitly set to ensure test independence from window
        const initialFish = mockGame.resources.fish;

        // Base fishing amount is GameConfig.economy.food.fisherAmount (1.0)
        // Warship should gather 1.0 * 2.0 = 2.0
        warship.gatherResources(100);

        expect(mockGame.resources.fish).toBe(initialFish + 2.0);
    });

    it('should gather double fish for Warship class', () => {
        const warship = new Warship(mockScene, mockTerrain, 10, 10, 'player');
        warship.game = mockGame;
        const initialFish = mockGame.resources.fish;

        warship.gatherResources(100);

        expect(mockGame.resources.fish).toBe(initialFish + 2.0);
    });
});
