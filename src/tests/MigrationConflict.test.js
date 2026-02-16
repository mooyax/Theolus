
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Wander } from '../ai/states/UnitStates.js';

// Mock Classes
class MockTerrain {
    constructor() {
        this.grid = [];
        this.logicalWidth = 40;
        this.logicalDepth = 40;
        this.buildings = [];

        // Init Grid
        for (let x = 0; x < 40; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                this.grid[x][z] = {
                    height: 1,
                    type: 'grass',
                    regionId: 1,
                    hasBuilding: false
                };
            }
        }
        this.pathfindingCalls = 0;
    }
    findBestTarget() { return null; }
    getTileHeight(x, z) { return 1; }
    getRegion(x, z) { return 1; }
    getRandomPointInRegion(regionId, x, z, range) {
        // Deterministic target for testing
        return { x: 30, z: 30 };
    }
    isAdjacentToRegion() { return false; }
    findPath(sx, sz, ex, ez) { return [{ x: Math.round((sx + ex) / 2), z: Math.round((sz + ez) / 2) }, { x: ex, z: ez }]; } // Mock path
    findPathAsync(sx, sz, ex, ez) { return Promise.resolve(this.findPath(sx, sz, ex, ez)); }
    moveEntity() { }
    unregisterEntity() { }
    registerEntity() { }
    findBestTarget() { return null; } // Return null (no target found)
    getBuildingSize() { return 1; }
    checkFlatArea(x, z, size) { return true; }
    addBuilding() { }
}

describe('Migration Conflict Regression (Jitabata Bug)', () => {
    let terrain;
    let unit;
    let scene;

    beforeEach(() => {
        terrain = new MockTerrain();
        const MockScene = { add: () => { }, remove: () => { } };
        scene = MockScene;

        // Create Worker Unit at 20,20
        unit = new Unit(scene, terrain, 20, 20, 'worker');

        // Ensure standard state
        unit.changeState(new Wander(unit));

        // Mock getDistance to wrap-aware mock supporting source points (for smartMove check)
        unit.getDistance = (tx, tz, ox = null, oz = null) => {
            const sx = (ox !== null) ? ox : unit.gridX;
            const sz = (oz !== null) ? oz : unit.gridZ;
            let dx = Math.abs(sx - tx);
            let dz = Math.abs(sz - tz);
            if (dx > terrain.logicalWidth / 2) dx = terrain.logicalWidth - dx;
            if (dz > terrain.logicalDepth / 2) dz = terrain.logicalDepth - dz;
            return Math.sqrt(dx * dx + dz * dz);
        };
    });

    it('should handle basic Unit update without crash', () => {
        const time = 1000;
        unit.updateLogic(time, 0.016);
        expect(unit.action).toBeDefined();
    });

    it('should NOT allow WanderState to interfere with Migration Movement', async () => {
        const time = 1000;

        // 1. Start Migration explicitly
        unit.migrate(time);

        expect(unit.action).toBe('Migrating');
        // Async pathfinding means we are either moving (short dist) or pathfinding (long dist)
        expect(unit.isMoving || unit.isPathfinding).toBe(true);

        // Wait for Async Pathfinding to resolve
        await new Promise(resolve => setTimeout(resolve, 0));

        // 2. Advance Frame with Wander active
        const deltaTime = 0.016;
        unit.updateLogic(time + deltaTime, deltaTime);

        // 3. Verify Integrity
        expect(unit.action).toBe('Migrating');
        expect(unit.isMoving).toBe(true);
    });

    it('should allow Migration Logic to control repeated movement', () => {
        // Test multiple frames to ensure "Jitabata" (Reset loop) doesn't occur
        const time = 2000;
        unit.migrate(time);

        // Capture initial step target
        const initialTargetX = unit.targetGridX;
        const initialTargetZ = unit.targetGridZ;
        unit.tryBuildStructure = vi.fn().mockReturnValue(false); // Fix: Prevent building distraction

        for (let i = 0; i < 60; i++) { // 1 second
            const t = time + i * 0.016;
            unit.updateLogic(t, 0.016);

            // Assert CONSTANT state (until arrival)
            // Linear speed is ~1 tile/sec. 60 frames = 1 sec.
            // Might arrive at 21,20?
            // If arrived, it picks NEXT step.
            // But action should remain 'Migrating'.

            if (unit.action !== 'Migrating') {
                console.log(`[Test Fail] Action changed to ${unit.action} at frame ${i}`);
            }
            expect(unit.action).toBe('Migrating');

            // Should NOT be Random Point (which mock returns as 30,30? No Mock returns 30,30 for Migrate Target)
            // But moveRandomly calls getPointInRegion.
            // If moveRandomly triggers, it might pick Random.
        }
    });
});
