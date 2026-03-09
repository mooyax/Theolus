import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Terrain } from '../Terrain';
import { Game } from '../Game';
import { Warship } from '../Warship';
import * as THREE from 'three';

// Mock Scene
const mockScene = {
    add: vi.fn(),
    remove: vi.fn(),
    children: [],
    traverse: vi.fn()
};

describe('Final Port Visuals and Warship Spawn Fix Verification', () => {
    let terrain;
    const size = 80;

    beforeEach(() => {
        // Mock terrain
        terrain = new Terrain(mockScene, [], size, size);
        terrain.initGrid();

        // Use height 1.0 for land to avoid "cliff" detection (> 2.0)
        for (let x = 0; x < size; x++) {
            for (let z = 0; z < size; z++) {
                terrain.grid[x][z] = {
                    height: (x < 40) ? 1.0 : -1.0,
                    type: 'grass',
                    hasBuilding: false,
                    moisture: 0.5
                };
            }
        }
        terrain.calculateRegions();
    });

    it('Terrain.addBuilding for port should set visualYOverride to 0.22', () => {
        const result = terrain.addBuilding('port', 39, 20);
        expect(result).not.toBeNull();

        const port = terrain.buildings[0];
        expect(port.type).toBe('port');
        expect(port.y).toBe(0.22);
        expect(port.visualYOverride).toBe(0.22);
    });

    it('Terrain.getBuildingOffset for port should return y = 0.0', () => {
        const offset = terrain.getBuildingOffset('port', 39, 20);
        expect(offset.y).toBe(0.0);
    });

    it('Game.handleBuildingSpawn for port should spawn warship even in deep water (0.5)', () => {
        const mockGame = {
            terrain: terrain,
            spawnUnit: vi.fn(),
            handleBuildingSpawn: Game.prototype.handleBuildingSpawn
        };

        // Make water deeper (0.4)
        for (let x = 40; x < size; x++) {
            for (let z = 0; z < size; z++) {
                terrain.grid[x][z].height = -0.4;
            }
        }

        terrain.addBuilding('port', 40, 20);
        const port = terrain.buildings[0];
        port.userData = { type: 'port', gridX: 40, gridZ: 20, faction: 'player' };

        mockGame.handleBuildingSpawn(40, 20, 'port', port);

        expect(mockGame.spawnUnit).toHaveBeenCalled();
    });

    it('Warship.getPositionForGrid should return y = 0.22 and isNaval is true', () => {
        const ship = new Warship(mockScene, terrain, 50, 50, 'player');
        const pos = ship.getPositionForGrid(50, 50);
        expect(pos.y).toBe(0.22);
        expect(ship.isNaval).toBe(true);
    });
});
