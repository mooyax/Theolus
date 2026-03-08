import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.ts';
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
        };
        mockGame = {
            resources: { fish: 0, meat: 0, grain: 0 },
            addMana: vi.fn(),
            registerSquad: vi.fn().mockReturnValue('squad1'),
        };
        const w = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global.window : {});
        w.game = mockGame;
    });

    it('should gather double fish for warships', () => {
        const warship = new Unit(mockScene, mockTerrain, 10, 10, 'warship');
        const initialFish = mockGame.resources.fish;

        // Base fishing amount is GameConfig.economy.food.fisherAmount (1.0)
        // Warship should gather 1.0 * 2.0 = 2.0
        warship.gatherResources(100);

        expect(mockGame.resources.fish).toBe(initialFish + 2.0);
    });
});
