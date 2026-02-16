import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Unit Lifecycle and Aging', () => {
    let unit;
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
        // Mock complex logic to isolate lifecycle tests
        Unit.prototype.moveRandomly = vi.fn();
        Unit.prototype.checkSelfDefense = vi.fn();
        Unit.prototype.triggerMove = vi.fn();
        Unit.prototype.updateMovement = vi.fn();
        Unit.prototype.die = vi.fn(function () { this.isDead = true; });
    });

    beforeEach(() => {
        mockTerrain = {
            getTileHeight: () => 1,
            getInterpolatedHeight: () => 1,
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            grid: Array(100).fill().map(() => Array(100).fill({})),
            buildings: [],
            logicalWidth: 100,
            logicalDepth: 100
        };
        mockGame = {
            raidPoints: [],
            findBestRequest: vi.fn().mockReturnValue(null),
            minimal: true
        };
        global.window.game = mockGame;
        unit = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'worker');
    });

    it('should initialize with age 20', () => {
        expect(unit.age).toBe(20);
    });

    it('should increment age when updateLogic is called', () => {
        const initialAge = unit.age;
        const deltaTime = 10.0; // Use 10s to see 2.0 age gain

        unit.updateLogic(1000, deltaTime, false, [], [], []);

        // Worker agingRate is 0.2. 10 * 0.2 = 2.0.
        expect(unit.age).toBeCloseTo(initialAge + 2.0, 1);
    });

    it('should die when age exceeds lifespan', () => {
        unit.lifespan = 50;
        unit.age = 49.9;

        // Update with 1s (0.2 age gain)
        unit.updateLogic(1000, 1.0, false, [], [], []);
        expect(unit.isDead).toBe(true);
    });

    it('should age slower for Knights and Wizards (0.02 rate)', () => {
        const knight = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'knight');
        const wizard = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'wizard');

        knight.age = 20.0;
        wizard.age = 20.0;

        const deltaTime = 10.0;

        knight.updateLogic(1000, deltaTime, false, [], [], []);
        wizard.updateLogic(1000, deltaTime, false, [], [], []);

        // 10 seconds * 0.02 rate = 0.2 age added.
        expect(knight.age).toBeCloseTo(20.2, 1);
        expect(wizard.age).toBeCloseTo(20.2, 1);
    });

    it('should have longer lifespan for Special units', () => {
        const originalRandom = Math.random;
        Math.random = () => 0; // Min value

        const u1 = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'worker', false);

        expect(u1.lifespan).toBe(80);

        Math.random = originalRandom;
    });

});
