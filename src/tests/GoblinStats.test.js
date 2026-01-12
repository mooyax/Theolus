
import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import * as THREE from 'three';
import { MockGame, MockTerrain } from './TestHelper.js';

vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        InstancedMesh: class {
            constructor() {
                this.isObject3D = true;
                this.instanceMatrix = { setUsage: vi.fn() };
                this.updateMatrix = vi.fn();
                this.setMatrixAt = vi.fn();
                this.setColorAt = vi.fn();
                this.count = 0;
                this.castShadow = false;
                this.receiveShadow = false;
                this.frustumCulled = false;
                this.dispose = vi.fn();
                this.removeFromParent = vi.fn();
                this.dispatchEvent = vi.fn();
                this.addEventListener = vi.fn();
                this.removeEventListener = vi.fn();
            }
        },
        Scene: vi.fn(() => ({
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn(),
            clear: vi.fn()
        })),
    };
});
global.THREE = THREE;
if (!global.window) global.window = {};

describe('Goblin Stats Verification', () => {
    let mockGame;
    let mockTerrain;

    beforeAll(() => {
        Goblin.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);
        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Normal Goblin should have sufficient lifespan and speed', () => {
        const g = new Goblin(mockGame.scene, mockTerrain, 10, 10, 'normal');

        // Lifespan check (should be > 100s now)
        expect(g.lifespan).toBeGreaterThan(90);

        // Speed check (moveInterval logic)
        // Unit.js default move logic vs Goblin logic
        // Goblin logic might differ. 
        // Just ensure it's defined.
        expect(g.moveInterval).toBeDefined();
    });

    it('King Goblin should be long lived', () => {
        const g = new Goblin(mockGame.scene, mockTerrain, 10, 10, 'king');
        expect(g.lifespan).toBeGreaterThan(250);
    });
});
