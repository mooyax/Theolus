
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';

// Mock Globals
global.window = {
    game: {
        gameTotalTime: 0
    }
};

global.THREE = THREE;

import { Unit } from '../Unit.js';

describe('Unit Behavior Mode', () => {
    let unit;
    let mockTerrain;
    let mockScene;

    beforeEach(() => {
        // Mock Terrain
        mockTerrain = {
            logicalWidth: 10,
            logicalDepth: 10,
            getTileHeight: vi.fn().mockReturnValue(1),
            getVisualPosition: vi.fn().mockReturnValue(new THREE.Vector3(0, 0, 0)),
            grid: Array(10).fill(0).map(() => Array(10).fill({ height: 1, moisture: 0.5 })),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            checkCollision: vi.fn().mockReturnValue(false)
        };

        mockScene = { add: vi.fn(), remove: vi.fn() };
        Unit.initAssets = vi.fn();

        // Prevent updatePosition logic from running
        vi.spyOn(Unit.prototype, 'updatePosition').mockImplementation(() => { });

        unit = new Unit(mockScene, mockTerrain, 5, 5);
        unit.id = 1;
    });

    it('should return Patrol for Knight/Wizard when idle', () => {
        unit.role = 'knight';
        expect(unit.getBehaviorMode()).toBe('Patrol');

        unit.role = 'wizard';
        expect(unit.getBehaviorMode()).toBe('Patrol');
    });

    it('should return Wander for Worker when idle', () => {
        unit.role = 'worker';
        expect(unit.getBehaviorMode()).toBe('Wander');
    });

    it('should return Combat when targetGoblin is set', () => {
        unit.targetGoblin = { id: 99 };
        expect(unit.getBehaviorMode()).toBe('Combat');
    });

    it('should return Siege when targetBuilding is set', () => {
        unit.targetBuilding = { id: 88, type: 'goblin_hut' };
        expect(unit.getBehaviorMode()).toBe('Siege');
    });

    it('should return Working when targetRequest is set', () => {
        unit.targetRequest = { id: 77, type: 'build_house' };
        expect(unit.getBehaviorMode()).toBe('Working');
    });

    it('should return Exploration with coords when targetRaidPoint is set', () => {
        unit.targetRaidPoint = { x: 10, z: 20 };
        expect(unit.getBehaviorMode()).toBe('Exploration (10,20)');
    });

    it('should return Migrating when action is Migrating', () => {
        unit.action = 'Migrating';
        expect(unit.getBehaviorMode()).toBe('Migrating');
    });

    it('should prioritize Combat over Exploration', () => {
        unit.targetGoblin = { id: 99 };
        unit.targetRaidPoint = { x: 10, z: 20 };
        // Combat is higher up in the function
        expect(unit.getBehaviorMode()).toBe('Combat');
    });
});
