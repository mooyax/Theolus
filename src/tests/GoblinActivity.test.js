
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { GoblinManager } from '../GoblinManager.js';
import { Goblin } from '../Goblin.js';
import * as THREE from 'three';
import { MockGame, MockTerrain } from './TestHelper.js';

describe('Goblin Activity & Persistence', () => {
    let goblinManager;
    let mockGame;
    let mockTerrain;

    beforeAll(() => {
        Goblin.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);

        mockTerrain.grid = Array.from({ length: 100 }, () =>
            Array.from({ length: 100 }, () => ({ height: 1.0, hasBuilding: false }))
        );

        mockTerrain.getTileHeight = () => 5.0;
        mockTerrain.getVisualPosition = (x, z) => new THREE.Vector3(x, 1.0, z);
        mockTerrain.logicalWidth = 100;
        mockTerrain.logicalDepth = 100;
        mockTerrain.entityGrid = Array(100).fill(0).map(() => Array(100).fill([]));
        mockTerrain.registerEntity = vi.fn((e, x, z) => {
            if (!mockTerrain.entityGrid[x]) mockTerrain.entityGrid[x] = [];
            if (!mockTerrain.entityGrid[x][z]) mockTerrain.entityGrid[x][z] = [];
            mockTerrain.entityGrid[x][z].push(e);
        });
        mockTerrain.moveEntity = vi.fn();
        mockTerrain.unregisterEntity = vi.fn();
        mockTerrain.buildings = [];

        mockGame.terrain = mockTerrain;

        goblinManager = new GoblinManager(mockGame.scene, mockTerrain);
        mockGame.goblinManager = goblinManager;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should spawn a goblin at a cave and persist effectively', () => {
        const cave = {
            mesh: { position: { x: 50, y: 1, z: 50 } },
            gridX: 50,
            gridZ: 50,
            building: { userData: { type: 'cave', gridX: 50, gridZ: 50, population: 10 } },
            clanId: 'test_clan'
        };
        mockTerrain.buildings.push(cave.building);
        mockTerrain.grid[50][50].hasBuilding = true;

        goblinManager.spawnGoblinAtCave(cave);
        expect(goblinManager.goblins.length).toBe(1);

        const goblin = goblinManager.goblins[0];
        expect(Math.abs(goblin.gridX - 50)).toBeLessThanOrEqual(2);
        expect(Math.abs(goblin.gridZ - 50)).toBeLessThanOrEqual(2);
        expect(goblin.isDead).toBe(false);

        goblinManager.update(0.1, 0.016, false, [], 1.0, { position: { x: 50, z: 50 } });
        expect(goblin.state).toBeDefined();

        for (let i = 0; i < 300; i++) {
            goblinManager.update(0.1 + i * 0.016, 0.016, false, [], 1.0, { position: { x: 50, z: 50 } });
            if (goblin.isDead) break;
        }

        expect(goblin.isDead).toBe(false);
        expect(goblinManager.goblins.length).toBe(1);
    });
});