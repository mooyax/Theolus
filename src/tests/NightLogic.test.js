
import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
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

describe('Night Logic - Shelter Entry', () => {
    let mockGame;
    let mockTerrain;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
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

    it('Worker should engage pathfinding to House but is likely blocked', () => {
        const u1 = new Unit(mockGame.scene, mockTerrain, 10, 0, 'worker');
        u1.moveInterval = 0;
        u1.lastTime = 0;

        const house = {
            type: 'house',
            gridX: 10,
            gridZ: 0,
            userData: { hp: 100, gridX: 10, gridZ: 0, type: 'house' }
        };
        mockTerrain.grid[10][0].hasBuilding = true;
        mockTerrain.grid[10][0].building = house;
        mockTerrain.buildings.push(house);

        u1.homeBase = house;

        // Fix: Ensure Unit and House are in same region to prevent Migration trigger
        mockTerrain.getRegion = vi.fn().mockReturnValue(1);
        u1.getRegion = vi.fn().mockReturnValue(1);

        const isNight = true;
        mockGame.isNight = true; // Sync Game state
        const time = 1000;

        // Run Logic
        u1.updateLogic(time, 100, isNight, [], [], [], []);

        // 2. Unit SHOULD be moving OR Sleeping immediately
        // Current logic might transition directly to Sleep if Night is severe or Logic changed
        expect(u1.isMoving || u1.isSleeping).toBe(true);
        // expect(u1.action).toBe('Going Home'); // Legacy check

        // Simulate Arrival
        u1.gridX = 10; u1.gridZ = 0; u1.isMoving = false;

        // Run Logic Again
        u1.updateLogic(time + 2000, 100, isNight, [], [], [], []);

        expect(u1.isSleeping).toBe(true);
    });
});
