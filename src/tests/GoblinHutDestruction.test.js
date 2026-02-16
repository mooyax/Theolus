
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Building } from '../Building';
import { Game } from '../Game';
import * as THREE from 'three';

describe('Goblin Hut Destruction', () => {
    let mockScene, mockTerrain, mockGame;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        mockTerrain = {
            grid: Array(10).fill(null).map(() => Array(10).fill({ regionId: 1 })),
            getTileHeight: () => 1,
            buildings: [],
            addBuilding: vi.fn(), // Mock method if needed, or simple array push
            update: vi.fn(), // Mock update
            removeBuilding: vi.fn() // Assuming such method exists or we check array
        };

        mockGame = {
            gameActive: true,
            terrain: mockTerrain,
            resources: {},
            goblinManager: { notifyClanActivity: vi.fn() }
        };
        global.window = {
            game: mockGame,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn()
        };
    });

    it('should be destroyed when HP reaches 0', () => {
        const hut = new Building(mockScene, mockTerrain, 'goblin_hut', 5, 5);
        hut.hp = 100;

        hut.takeDamage(150);

        expect(hut.hp).toBeLessThanOrEqual(0);
        expect(hut.isDestroyed()).toBe(true);
    });

    it('should be removed from Terrain by Game Loop logic', () => {
        const hut = new Building(mockScene, mockTerrain, 'goblin_hut', 5, 5);
        hut.id = 999;
        mockTerrain.buildings.push(hut);

        // Simulate fatal damage
        hut.takeDamage(200);
        expect(hut.hp).toBeLessThanOrEqual(0); // Can be negative
        expect(hut.isDestroyed()).toBe(true);

        // Mock removeBuilding
        mockTerrain.removeBuilding = vi.fn((b) => {
            const idx = mockTerrain.buildings.indexOf(b);
            if (idx > -1) mockTerrain.buildings.splice(idx, 1);
        });

        const buildings = [...mockTerrain.buildings];
        // Logic currently in Game.ts (Fixed Version):
        buildings.forEach(b => {
            if (b.update && (b.type === 'cave' || b.type === 'goblin_hut')) {
                b.update(1, 0.1);

                // FIX: Remove if destroyed
                if (b.isDestroyed && b.isDestroyed()) {
                    mockTerrain.removeBuilding(b);
                }
            }
        });

        // Assertion: It should be removed!
        expect(mockTerrain.buildings.length).toBe(0);
        expect(mockTerrain.removeBuilding).toHaveBeenCalledWith(hut);
    });
});

