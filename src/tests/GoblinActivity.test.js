
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import { GoblinManager } from '../GoblinManager.js';
import { Goblin } from '../Goblin.js';
import * as THREE from 'three';
import { MockGame, MockTerrain } from './TestHelper.js';

// Mock Three.js essentials
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        InstancedMesh: class {
            constructor() {
                this.instanceMatrix = { setUsage: vi.fn(), needsUpdate: false };
                this.instanceColor = { needsUpdate: false };
                this.updateMatrix = vi.fn();
                this.setMatrixAt = vi.fn();
                this.setColorAt = vi.fn();
                this.count = 0;
                this.dispose = vi.fn();
            }
        },
        Scene: class {
            add() { }
            remove() { }
        },
        Group: class {
            add() { }
            remove() { }
        }
    };
});

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

        // Setup simple valid terrain with INDEPENDENT objects for grid cells
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
        mockTerrain.buildings = []; // Initialize empty

        mockGame.terrain = mockTerrain;

        goblinManager = new GoblinManager(mockGame.scene, mockTerrain);
        mockGame.goblinManager = goblinManager;
        global.window = { game: mockGame };
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

        // Also ensure grid has building flag if manager checks it
        mockTerrain.grid[50][50].hasBuilding = true;

        // 1. Spawn
        try {
            goblinManager.spawnGoblinAtCave(cave);
            console.log("Spawn called. Goblins count:", goblinManager.goblins.length);
        } catch (e) {
            console.error("Spawn ERROR:", e);
        }
        expect(goblinManager.goblins.length).toBe(1);

        const goblin = goblinManager.goblins[0];
        // Goblin spawns at neighbor, so check distance is small
        expect(Math.abs(goblin.gridX - 50)).toBeLessThanOrEqual(2);
        expect(Math.abs(goblin.gridZ - 50)).toBeLessThanOrEqual(2);
        expect(goblin.isDead).toBe(false);

        // 2. Simulate Updates (Activity)
        // 2. Simulate Updates (Activity)
        goblinManager.update(0.1, 0.016, false, [], 1.0, { position: { x: 50, z: 50 } });

        expect(goblin.state).toBeDefined();

        // Move forward in time
        const startPos = goblin.position.clone();

        // Run loop for 5 seconds logic time
        for (let i = 0; i < 300; i++) {
            goblinManager.update(0.1 + i * 0.016, 0.016, false, [], 1.0, { position: { x: 50, z: 50 } });
            if (goblin.isDead) {
                console.error(`Goblin died at iteration ${i}. Pos: ${goblin.gridX},${goblin.gridZ}`);
                break;
            }
        }

        // 3. Verify Persistence
        expect(goblin.isDead).toBe(false);
        expect(goblinManager.goblins.length).toBe(1);

        console.log(`Goblin End Pos: ${goblin.position.x},${goblin.position.z} (Start: 50,50)`);
    });
});
