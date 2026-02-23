
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { GoblinManager } from '../GoblinManager.js';

vi.mock('../Goblin.js', () => {
    return {
        Goblin: class {
            constructor() {
                this.mesh = {
                    position: { y: 0, x: 0, z: 0 },
                    torsoNormal: { rotation: { set: vi.fn() } },
                    headGroup: { rotation: { set: vi.fn() } },
                    updateMatrix: vi.fn()
                };
            }
            static initAssets() { }
            static assets = {
                materials: { head: {}, body: {}, limb: {} },
                geometries: { torsoNormal: {}, head: {}, limb: {} }
            };
        }
    };
});

describe('GoblinManager Cave Persistence', () => {
    let mockScene, mockTerrain, manager;

    beforeEach(() => {
        mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn().mockReturnValue({
                add: vi.fn(),
                remove: vi.fn(),
                children: []
            })
        };

        mockTerrain = {
            logicalWidth: 20,
            logicalDepth: 20,
            grid: [],
            getTileHeight: vi.fn((x, z) => 5.0),
            getWidth: () => 20,
            getDepth: () => 20
        };

        for (let x = 0; x < 20; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                mockTerrain.grid[x][z] = { height: 5.0 };
            }
        }

        vi.spyOn(GoblinManager.prototype, 'generateCaves').mockImplementation(() => { });
        manager = new GoblinManager(mockScene, mockTerrain, {}, []);
        manager.caves = [];
        manager.caveGroup = new THREE.Group();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should update cave Y position when terrain height changes', () => {
        const cave = {
            mesh: { position: { x: 0, y: 5.0, z: 0 }, updateMatrix: vi.fn() },
            gridX: 10,
            gridZ: 10,
            originalHeight: 5.0
        };
        manager.caves.push(cave);

        mockTerrain.getTileHeight.mockReturnValue(8.0);
        manager.update(0, 0.1, false, []);

        expect(cave.mesh.position.y).toBe(8.0);
        expect(cave.originalHeight).toBe(8.0);
    });

    it('should destroy cave if submerged (height <= 0)', () => {
        const caveMesh = new THREE.Mesh();
        const cave = { mesh: caveMesh, gridX: 10, gridZ: 10, originalHeight: 5.0 };
        manager.caves.push(cave);

        mockTerrain.getTileHeight.mockReturnValue(-1.0);
        manager.update(0, 0.1, false, []);

        expect(mockScene.remove).toHaveBeenCalled();
        expect(manager.caves.length).toBe(0);
    });
});