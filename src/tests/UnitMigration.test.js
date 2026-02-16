import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Unit } from '../Unit';
import { Wander } from '../ai/states/UnitStates.js';
import * as THREE from 'three';
import { MockGame, MockTerrain } from './TestHelper.js';

// Mock THREE
global.THREE = THREE;

describe('Unit Migration Logic', () => {
    let unit;
    let mockGame;
    let mockTerrain;

    beforeEach(() => {
        Unit.assets = { initialized: true };

        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);
        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;

        // Ensure resources for tests
        mockGame.resources = { grain: 100, totalPopulation: 100 };
        mockGame.totalPopulation = 100;

        try {
            unit = new Unit(mockGame.scene, mockTerrain, 50, 50, 'worker');
        } catch (e) {
            console.error("UNIT CONSTRUCTOR FAILED:", e);
            throw e;
        }
        unit.id = 1;
        unit.game = mockGame; // Ensure explicit link

        // Initial state
        unit.changeState(new Wander(unit));

        unit.triggerMove = vi.fn();
        unit.updatePosition = vi.fn();
        unit.smartMove = vi.fn(); // Stub smartMove too
        unit.checkStuck = vi.fn(); // Stub checkStuck to prevent crash

        vi.spyOn(Math, 'random').mockReturnValue(0.5); // Predictable random
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return true on successful build', () => {
        unit.stagnationTimer = 4;

        // Fix: Height must be <= 8 for building
        mockTerrain.grid[50][50].height = 1;

        // Mock success for House (2x2)
        vi.spyOn(mockTerrain, 'checkFlatArea').mockReturnValue(true);
        const addBuildingSpy = vi.spyOn(mockTerrain, 'addBuilding');

        const result = unit.tryBuildStructure(1000);

        expect(addBuildingSpy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should increment stagnation on failed build', () => {
        // Migration logic now resides in Wander for workers
        unit.role = 'worker';
        unit.stagnationTimer = 0;
        unit.lastGridX = 50; unit.lastGridZ = 50;
        unit.gridX = 50; unit.gridZ = 50;
        unit.isMoving = false;
        unit.isSleeping = false;

        // Mock terrain to fail build (e.g. no flat area)
        vi.spyOn(mockTerrain, 'checkFlatArea').mockReturnValue(false);

        unit.updateLogic(1000, 1.0);
        expect(unit.stagnationTimer).toBeGreaterThan(0);
    });

    it('should migrate after 20 seconds of stagnation', () => {
        unit.role = 'worker';
        unit.stagnationTimer = 20.1;
        unit.lastGridX = 50; unit.lastGridZ = 50;
        unit.gridX = 50; unit.gridZ = 50;
        unit.isMoving = false;
        unit.isSleeping = false;

        vi.spyOn(unit, 'migrate');
        unit.updateLogic(5000, 1.0);

        expect(unit.migrate).toHaveBeenCalled();
    });
});
