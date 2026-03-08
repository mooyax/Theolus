import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Warship } from '../Warship';
import { Combat, Wander } from '../ai/states/UnitStates';

// Mock Terrain (Pure JS)
class MockTerrain {
    constructor() {
        this.grid = Array(100).fill(null).map(() => Array(100).fill(null).map(() => ({ height: 0, regionId: 1 })));
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.buildings = [];
    }
    getTileHeight(x, z) { return this.grid[x][z].height; }
    getRegion(x, z) { return this.grid[x][z].regionId; }
    findBestTarget(type, x, z, range, filter, list) {
        if (type === 'human' || type === 'unit') {
            const unit = { id: 'target1', type: 'unit', gridX: x + 40, gridZ: z, hp: 100, isDead: false, faction: 'player' };
            if (filter(unit, 40) === Infinity) return null;
            return unit;
        }
        return null;
    }
    unregisterEntity() { }
    gridToWorld(v) { return v; }
}

describe('Warship Combat Stuck Investigation', () => {
    let warship;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain();
        warship = new Warship(scene, terrain, 50, 50, 'enemy');
        warship.game = { frameCount: 0 };
    });

    it('should respect ignoredTargets in checkSelfDefense', () => {
        warship.ignoredTargets.set('target1', 100);
        warship.simTime = 10;

        const found = warship.checkSelfDefense();

        expect(found).toBe(false);
        expect(warship.targetUnit).toBeNull();
    });

    it('should not acquire unreachable target repeatedly', () => {
        const target = { id: 'target1', type: 'unit', gridX: 90, gridZ: 50, hp: 100, isDead: false, faction: 'player' };
        terrain.grid[90][50].regionId = 2; // Different region

        // Mock reachability to be always false for this target
        warship.isReachable = vi.fn().mockReturnValue(false);

        // 1. First tick: acquire target (Combat entry)
        warship.updateLogic(1, 0.1);
        expect(warship.state.name).toBe('Combat');
        expect(warship.targetUnit).not.toBeNull();

        // 2. Second tick: detect STUCK (unreachable) and clear state
        // In Combat.update -> CombatStateBase.update -> handleStuck
        warship.updateLogic(2, 0.1);

        // Target should be cleared and added to ignoredTargets
        expect(warship.targetUnit).toBeNull();
        expect(warship.state.name).toBe('Wander');
        expect(warship.ignoredTargets.has('target1')).toBe(true);

        // 3. Third tick: checkSelfDefense should NOT re-acquire it
        warship.updateLogic(3, 0.1);
        expect(warship.targetUnit).toBeNull();
        expect(warship.state.name).toBe('Wander');
    });
});
