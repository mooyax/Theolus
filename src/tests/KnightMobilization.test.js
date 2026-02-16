
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Combat, Job, Wander } from '../ai/states/UnitStates.js';
import { Actor } from '../Actor.js';

// Mock MockTerrain
class MockTerrain {
    constructor() {
        this.grid = [];
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.buildings = [];
        for (let x = 0; x < 100; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                this.grid[x][z] = { height: 1, regionId: 1 };
            }
        }
        // Create Region 2 (Island)
        for (let x = 60; x < 80; x++) {
            for (let z = 60; z < 80; z++) {
                this.grid[x][z].regionId = 2;
            }
        }
    }
    getTileHeight(x, z) { return 1; }
    getRegion(x, z) {
        if (x >= 0 && x < 100 && z >= 0 && z < 100) return this.grid[x][z].regionId;
        return 0;
    }
    findPathAsync(sx, sz, tx, tz) { return Promise.resolve([]); } // Mock pathfinding
    findPath(sx, sz, tx, tz) { return null; }
    unregisterEntity() { }
    registerEntity() { }
    findClosestReachablePoint(tx, tz, regionId) {
        // Mock Proxy finder
        if (regionId === 1 && tx === 70 && tz === 70) return { x: 55, z: 55 }; // Proxy point near ID 2
        return null;
    }
}

class MockGame {
    constructor() {
        this.simTotalTimeSec = 100;
        this.battleHotspots = [];
        this.squads = new Map();
        this.units = [];
    }
}

describe('Knight Mobilization Debug', () => {
    let unit, terrain, game;

    beforeEach(() => {
        terrain = new MockTerrain();
        game = new MockGame();
        window.game = game; // FIX: Unit.js relies on window.game global
        global.THREE = THREE;
        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'knight'); // Knight in Region 1
        unit.game = game;
        unit.id = 1;
        unit.role = 'knight';
        game.units.push(unit);
    });

    it('should mobilize to global hotspot in SAME region', () => {
        // Hotspot in Region 1
        game.battleHotspots.push({ x: 20, z: 20, intensity: 50, time: 100, regionId: 1 });

        // Manual Trigger
        const inputs = unit.findRaidTarget();
        // Logic: findRaidTarget() -> true if valid

        expect(unit.targetRaidPoint).not.toBeNull();
        expect(unit.targetRaidPoint.x).toBe(20);
    });

    it('should IGNORE global hotspot in DIFFERENT region if no proxy found', () => {
        // Hotspot in Region 2 (Unreachable)
        game.battleHotspots.push({ x: 70, z: 70, intensity: 50, time: 100, regionId: 2 });

        // Disable proxy mock for this test
        vi.spyOn(terrain, 'findClosestReachablePoint').mockReturnValue(null);

        const res = unit.findRaidTarget();
        expect(res).toBeFalsy();
        expect(unit.targetRaidPoint).toBeNull();
    });

    it('should USE PROXY for global hotspot in DIFFERENT region', () => {
        // Hotspot in Region 2 (Unreachable)
        game.battleHotspots.push({ x: 70, z: 70, intensity: 50, time: 100, regionId: 2 });

        // Proxy Mock handled in class (returns 55,55)

        const res = unit.findRaidTarget();
        expect(res).toBe(true);
        expect(unit.targetRaidPoint).toEqual({ x: 55, z: 55 });
    });
});
