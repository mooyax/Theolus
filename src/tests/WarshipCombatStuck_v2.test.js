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
    getTileHeight(x, z) { return this.grid[x][z] ? this.grid[x][z].height : 0; }
    getRegion(x, z) { return this.grid[x][z] ? this.grid[x][z].regionId : 0; }
    findBestTarget(type, x, z, range, filter, list) {
        if (this.mockTarget && this.mockTargetType === type) {
            const dist = 5; // Fixed dist for mock
            if (filter(this.mockTarget, dist) === Infinity) return null;
            return this.mockTarget;
        }
        return null;
    }
    unregisterEntity() { }
    gridToWorld(v) { return v; }
}

describe('Warship Combat Stuck Investigation (Part 2)', () => {
    let warship;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain();
        warship = new Warship(scene, terrain, 50, 50, 'enemy');
        warship.game = { frameCount: 0 };
    });

    it('should NOT acquire already dead target from checkSelfDefense', () => {
        // Setup a dead target that findBestTarget might mistakenly return
        terrain.mockTargetType = 'human';
        terrain.mockTarget = { id: 'dead1', type: 'unit', gridX: 55, gridZ: 50, hp: 0, isDead: true, faction: 'player' };

        // Run checkSelfDefense
        const found = warship.checkSelfDefense();

        // It should NOT find it because u.isDead check in Warship.ts:143
        expect(found).toBe(false);
        expect(warship.targetUnit).toBeNull();
    });

    it('should exit Combat state when no targets are near', () => {
        // 1. Manually enter Combat state with a target
        const target = { id: 'target1', type: 'unit', gridX: 55, gridZ: 50, hp: 100, isDead: false, faction: 'player' };
        warship.targetUnit = target;
        warship.changeState(new Combat(warship));
        expect(warship.state.name).toBe('Combat');

        // 2. Remove the target (it dies or moves out of range)
        terrain.mockTarget = null;
        target.hp = 0;
        target.isDead = true;

        // 3. Update logic. It should detect target is gone and revert to Wander
        // Warship.ts:196 calls checkSelfDefense()
        // Warship.ts:197 checks currentTarget
        // UnitStates.ts:Combat.update checks if any target exists
        warship.updateLogic(10, 0.1);

        expect(warship.targetUnit).toBeNull();
        expect(warship.state.name).toBe('Wander');
    });

    it('should NOT acquire neutral/friendly buildings by mistake', () => {
        // Setup a friendly building
        terrain.mockTargetType = 'building';
        terrain.mockTarget = {
            id: 'b1',
            type: 'house',
            gridX: 60,
            gridZ: 50,
            hp: 100,
            userData: { faction: 'enemy', hp: 100, type: 'house' } // Same faction as warship
        };

        const found = warship.checkSelfDefense();

        // It should NOT find it because b.userData.faction === this.faction check in Warship.ts:150
        expect(found).toBe(false);
        expect(warship.targetBuilding).toBeNull();
    });
});
