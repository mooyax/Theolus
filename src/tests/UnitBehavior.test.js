
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
import { Wander as UnitWanderState, Combat, Job } from '../ai/states/UnitStates.js';

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
            checkCollision: vi.fn().mockReturnValue(false),
            findPathAsync: vi.fn().mockReturnValue(Promise.resolve([])),
            findBestTarget: vi.fn().mockReturnValue(null),
            buildings: [] // Ensure buildings array exists
        };

        mockScene = { add: vi.fn(), remove: vi.fn() };
        Unit.initAssets = vi.fn();

        // Prevent updatePosition logic from running
        vi.spyOn(Unit.prototype, 'updatePosition').mockImplementation(() => { });

        unit = new Unit(mockScene, mockTerrain, 5, 5);
        unit.id = 1;

        // Mock game for behavior logic
        global.window.game = {
            gameTotalTime: 0,
            findBestRequest: vi.fn().mockReturnValue(null)
        };
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
        unit.targetGoblin = { id: 99, x: 10, z: 10, gridX: 10, gridZ: 10, takeDamage: vi.fn(), isDead: false };
        unit.changeState(new Combat(unit));
        expect(unit.getBehaviorMode()).toBe('Combat');
        expect(unit.state).toBeInstanceOf(Combat);
    });

    it('should return Siege when targetBuilding is set', () => {
        const building = { id: 88, type: 'goblin_hut', userData: { hp: 100 } };
        mockTerrain.buildings = [building]; // Fix: Add to terrain so Combat accepts it
        unit.targetBuilding = building;
        unit.changeState(new Combat(unit));
        expect(unit.getBehaviorMode()).toBe('Siege');
        expect(unit.state).toBeInstanceOf(Combat);
    });

    it('should return Working when targetRequest is set', () => {
        const req = { id: 77, type: 'build_house', assignedTo: unit.id };
        unit.targetRequest = req;
        unit.changeState(new Job(unit));
        expect(unit.getBehaviorMode()).toBe('Working');
        expect(unit.state).toBeInstanceOf(Job);
    });

    it('should return Patrolling with coords when targetRaidPoint is set', () => {
        unit.targetRaidPoint = { x: 10, z: 20 };
        unit.changeState(new Combat(unit));
        expect(unit.getBehaviorMode()).toBe('Patrolling (10,20)');
        expect(unit.state).toBeInstanceOf(Combat);
    });

    it('should return Wander for Migrating if action is Migrating but state is Wander', () => {
        unit.role = 'worker';
        unit.action = 'Migrating';
        expect(unit.getBehaviorMode()).toBe('Wander');
    });

    it('should prioritize Combat mode when in Combat', () => {
        unit.targetGoblin = { id: 99, x: 10, z: 10, gridX: 10, gridZ: 10, takeDamage: vi.fn(), isDead: false };
        unit.targetRaidPoint = { x: 10, z: 20 };
        unit.changeState(new Combat(unit));
        // Combat logic prioritizes Target over RaidPoint
        expect(unit.getBehaviorMode()).toBe('Combat');
    });
});
