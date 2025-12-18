import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../UnitRefactored.js';
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
        Unit.prototype.searchSurroundings = vi.fn();
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
        mockGame = { raidPoints: [] };
        global.window.game = mockGame;

        // Create a standard worker unit for baseline tests
        unit = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'worker');
    });

    it('should initialize with age 20', () => {
        expect(unit.age).toBe(20);
    });

    it('should increment age when updateLogic is called', () => {
        const initialAge = unit.age;
        const deltaTime = 1.0; // 1 second

        try {
            unit.updateLogic(1000, deltaTime, false, [], [], []);
        } catch (e) {
            console.error("Test Error:", e);
            throw e;
        }

        console.log("DEBUG: Age Start:", initialAge, "Age End:", unit.age);
        expect(unit.age).toBeGreaterThan(initialAge);
        expect(unit.age).toBeCloseTo(initialAge + deltaTime, 5);
    });

    it('should die when age exceeds lifespan', () => {
        unit.lifespan = 10;
        unit.age = 9.9;

        // Update small step - still alive
        unit.updateLogic(1000, 0.05, false, [], [], []);
        expect(unit.isDead).toBe(false);

        // Update to exceed lifespan
        unit.updateLogic(1000, 0.2, false, [], [], []);
        expect(unit.isDead).toBe(true);
    });

    it('should age slower for Knights and Wizards (0.1 rate)', () => {
        const knight = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'knight');
        const wizard = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'wizard');

        const deltaTime = 10.0;

        knight.updateLogic(1000, deltaTime, false, [], [], []);
        wizard.updateLogic(1000, deltaTime, false, [], [], []);

        // 10 seconds passed, but strict 0.1 rate means 1.0 age added. Start age 20.
        expect(knight.age).toBeCloseTo(21.0, 1);
        expect(wizard.age).toBeCloseTo(21.0, 1);
    });

    it('should have longer lifespan for Special units', () => {
        const originalRandom = Math.random;
        Math.random = () => 0; // Min value

        const u1 = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'worker', false);

        expect(u1.lifespan).toBe(80);

        Math.random = originalRandom;
    });

});
