import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import * as THREE from 'three';

// Mock Terrain
const mockTerrain = {
    logicalWidth: 100,
    logicalDepth: 100,
    getTileHeight: vi.fn(() => 5),
    registerEntity: vi.fn(),
    gridToWorld: vi.fn((x) => x),
    getRegion: vi.fn(() => 1),
    // Added grid mock as some logic might access it
    grid: Array(100).fill(0).map(() => Array(100).fill({ height: 5 })),
    unregisterEntity: vi.fn(),
};

describe('Unit Update Verification', () => {
    let unit;

    beforeEach(() => {
        // Mock global game
        global.window = global.window || {};
        window.game = {
            simTotalTimeSec: 100,
            isNight: false,
            resources: { grain: 0, meat: 0, fish: 0 },
            totalPopulation: 0,
            consumeMana: vi.fn(),
            findBestRequest: vi.fn(),
            claimRequest: vi.fn(),
            minimal: true
        };

        // Use global THREE mocks from setup.js
        unit = new Unit(new THREE.Scene(), mockTerrain, 20, 20, 'worker');
    });

    it('should have updateLogic method', () => {
        expect(typeof unit.updateLogic).toBe('function');
    });

    it('should increment age in update', () => {
        // Reset age for predictability
        unit.age = 20;
        // Age increases by deltaTime * ageRate. 
        // For worker, rate is 0.2. deltaTime=1.0 -> increase 0.2
        unit.update(100, 1.0);
        expect(unit.age).toBeCloseTo(20 + 0.2);
    });

    it('should call updateMovement in update', () => {
        // We can spy on the existing method
        const spy = vi.spyOn(unit, 'updateMovement');
        unit.update(100, 1.0);
        expect(spy).toHaveBeenCalledWith(100);
    });

    it('should call updateLogic fallback in update', () => {
        const spy = vi.spyOn(unit, 'updateLogic');
        unit.update(100, 1.0);
        expect(spy).toHaveBeenCalled();
    });
});
