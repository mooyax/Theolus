import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.ts';
import { GameConfig } from '../config/GameConfig';

describe('Warship Fishing Interference', () => {
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
            grid: Array(80).fill(0).map(() => Array(80).fill(0).map(() => ({ height: -1, moisture: 0.5 })))
        };
        mockGame = {
            resources: { fish: 0, meat: 0 },
            units: [],
            addMana: vi.fn(),
        };
        const w = (typeof window !== 'undefined') ? window : (typeof global !== 'undefined' ? global.window : {});
        w.game = mockGame;
    });

    it('Player fisher should gather fish when no enemies are present', () => {
        const fisher = new Unit(mockScene, mockTerrain, 10, 10, 'fisher', false, null, 'player');
        fisher.game = mockGame;
        mockGame.units.push(fisher);

        fisher.gatherResources(100);
        expect(mockGame.resources.fish).toBeGreaterThan(0);
    });

    it('Player fisher should NOT gather fish when an enemy warship is nearby', () => {
        const fisher = new Unit(mockScene, mockTerrain, 10, 10, 'fisher', false, null, 'player');
        fisher.game = mockGame;
        mockGame.units.push(fisher);

        // Add enemy warship within 20 tiles (at 15, 15)
        const enemyWarship = new Unit(mockScene, mockTerrain, 15, 15, 'warship', false, null, 'enemy');
        mockGame.units.push(enemyWarship);

        const initialFish = mockGame.resources.fish;
        fisher.gatherResources(100);
        expect(mockGame.resources.fish).toBe(initialFish);
    });

    it('Player fisher should gather fish when enemy warship is far away', () => {
        const fisher = new Unit(mockScene, mockTerrain, 10, 10, 'fisher', false, null, 'player');
        fisher.game = mockGame;
        mockGame.units.push(fisher);

        // Add enemy warship beyond 20 tiles (at 40, 40)
        const enemyWarship = new Unit(mockScene, mockTerrain, 40, 40, 'warship', false, null, 'enemy');
        mockGame.units.push(enemyWarship);

        const initialFish = mockGame.resources.fish;
        fisher.gatherResources(100);
        expect(mockGame.resources.fish).toBeGreaterThan(initialFish);
    });

    it('Enemy warship should NOT add fish to player resources', () => {
        const enemyWarship = new Unit(mockScene, mockTerrain, 10, 10, 'warship', false, null, 'enemy');
        enemyWarship.game = mockGame;
        mockGame.units.push(enemyWarship);

        const initialFish = mockGame.resources.fish;
        enemyWarship.gatherResources(100);
        expect(mockGame.resources.fish).toBe(initialFish);
    });

    it('Player warship should gather double fish when no enemies are present', () => {
        const playerWarship = new Unit(mockScene, mockTerrain, 10, 10, 'warship', false, null, 'player');
        playerWarship.game = mockGame;
        mockGame.units.push(playerWarship);

        const initialFish = mockGame.resources.fish;
        playerWarship.gatherResources(100);

        const baseAmount = GameConfig.economy.food.fisherAmount || 1.5;
        expect(mockGame.resources.fish).toBe(initialFish + baseAmount * 2.0);
    });
});
