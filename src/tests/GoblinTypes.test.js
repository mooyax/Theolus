
import { describe, it, expect, beforeEach, vi, afterEach, beforeAll } from 'vitest';
import * as THREE from 'three';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import { MockGame, MockTerrain } from './TestHelper.js';

vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        InstancedMesh: class {
            constructor() {
                this.isObject3D = true; // Required for Scene.add
                this.instanceMatrix = { setUsage: vi.fn() };
                this.updateMatrix = vi.fn();
                this.setMatrixAt = vi.fn();
                this.setColorAt = vi.fn();
                this.count = 0;
                this.castShadow = false;
                this.receiveShadow = false;
                this.frustumCulled = false;
                this.dispose = vi.fn();
                this.removeFromParent = vi.fn(); // Required for Object3D.add
                this.dispatchEvent = vi.fn(); // Required for EventDispatcher
                this.addEventListener = vi.fn();
                this.removeEventListener = vi.fn();
            }
        },
        Scene: vi.fn(() => ({
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn(), // Critical Fix
            clear: vi.fn()
        })),
    };
});

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Goblin Types & Stats', () => {
    let mockGame;
    let mockTerrain;

    beforeAll(() => {
        Goblin.initAssets = vi.fn(() => {
            const box = new THREE.BoxGeometry();
            const mat = new THREE.MeshBasicMaterial();
            Goblin.assets = {
                geometries: {
                    torsoNormal: box, height: box, head: box, ear: box, arm: box, leg: box, club: box, staff: box
                },
                materials: { club: mat, staff: mat }
            };
        });
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain();
        // Ensure TestHelper mock has gridToWorld
        if (!mockTerrain.gridToWorld) mockTerrain.gridToWorld = (v) => v * 10;

        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should create Goblin King with correct stats', () => {
        const king = new Goblin(mockGame.scene, mockTerrain, 10, 10, 'king');
        expect(king.type).toBe('king');
        expect(king.hp).toBeGreaterThan(50);
        expect(king.damage).toBeGreaterThan(10);
    });

    it('should create Goblin Shaman with correct stats', () => {
        const shaman = new Goblin(mockGame.scene, mockTerrain, 10, 10, 'shaman');
        expect(shaman.type).toBe('shaman');
        expect(shaman.attackRange).toBe(8.0);
    });

    it('should correctly spawn types based on random probability', () => {
        const gm = new GoblinManager(mockGame.scene, mockTerrain);
        mockGame.goblinManager = gm;
        // Force King spawn (probKing ~0.01, so 0.0 should trigger King)
        vi.spyOn(Math, 'random').mockReturnValue(0.0);

        gm.spawnGoblin(10, 10);

        const g = gm.goblins[gm.goblins.length - 1];
        expect(g).toBeDefined();
        expect(g.type).toBe('king');
    });

    it('should use staff visual for Shaman in Renderer logic', () => {
        const shaman = new Goblin(mockGame.scene, mockTerrain, 10, 10, 'shaman');
        expect(shaman.hasStaff).toBe(true);
    });
});
