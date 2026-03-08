import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Warship } from '../Warship';
import { Combat, Wander } from '../ai/states/UnitStates';

// Mock Terrain
class MockTerrain {
    constructor() {
        this.grid = Array(100).fill(null).map((_, x) => Array(100).fill(null).map((_, z) => ({
            height: -1, // water
            regionId: -1,
            x: x, z: z,
            hasBuilding: false
        })));
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.buildings = [];
    }
    getTileHeight(x, z) {
        x = Math.floor(x); z = Math.floor(z);
        return this.grid[x] && this.grid[x][z] ? this.grid[x][z].height : 0;
    }
    getRegion(x, z) {
        x = Math.floor(x); z = Math.floor(z);
        return this.grid[x] && this.grid[x][z] ? this.grid[x][z].regionId : 0;
    }
    findBestTarget(type, x, z, range, filter, list) {
        const targetList = list || [];
        let best = null;
        let minDist = range;
        for (const item of targetList) {
            const dx = item.gridX - x;
            const dz = item.gridZ - z;
            const d = Math.sqrt(dx * dx + dz * dz);
            if (d <= range) {
                const res = filter(item, d);
                if (res < Infinity) {
                    if (d < minDist) {
                        minDist = d;
                        best = item;
                    }
                }
            }
        }
        return best;
    }
    unregisterEntity() { }
    gridToWorld(v) { return v; }
    getRandomPointInRegion() { return { x: 55, z: 50 }; }
}

describe('Warship Invasion and Combat Stuck Fix Verification', () => {
    let warship;
    let terrain;
    let scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = new MockTerrain();
        warship = new Warship(scene, terrain, 50, 50, 'player');
        warship.game = {
            frameCount: 0,
            spawnUnit: vi.fn(),
            reportGlobalBattle: vi.fn(),
            goblinManager: { goblins: [] }
        };
    });

    it('should NOT pick up targets beyond 25 units', () => {
        const enemyGoblin = { id: 'g1', gridX: 90, gridZ: 50, isDead: false, isNaval: false };
        warship.game.goblinManager.goblins = [enemyGoblin];

        // Frame 0: checkSelfDefense runs
        warship.updateLogic(0, 0.1);

        // Distance is 40. Scan range is 25. Should stay in Wander.
        expect(warship.state.name).toBe('Wander');
        expect(warship.targetGoblin).toBeNull();
    });

    it('should NOT initiate invasion if target is further than 20 units', () => {
        // Force enter Combat with a target at distance 22
        const enemyGoblin = { id: 'g1', gridX: 72, gridZ: 50, isDead: false, isNaval: false };
        warship.game.goblinManager.goblins = [enemyGoblin];

        warship.updateLogic(0, 0.1); // Picks it up because 22 < 25
        expect(warship.state.name).toBe('Combat');

        // Occupation near land
        terrain.grid[51][50].height = 5;
        terrain.buildings = [{ type: 'house', userData: { faction: 'player' }, isDead: false }];

        // Advance 10 seconds
        for (let i = 0; i < 10; i++) warship.updateLogic(1 + i, 1.0);

        // Invasion should NOT happen because distance 22 > 20
        expect(warship.game.spawnUnit).not.toHaveBeenCalled();
    });

    it('should DROP target and return to Wander if distance exceeds 35', () => {
        const enemyGoblin = { id: 'g1', gridX: 70, gridZ: 50, isDead: false, isNaval: false };
        warship.game.goblinManager.goblins = [enemyGoblin];

        warship.updateLogic(0, 0.1); // Distance 20
        expect(warship.state.name).toBe('Combat');

        // Target moves away
        enemyGoblin.gridX = 90; // Distance 40

        warship.updateLogic(1, 0.1);

        expect(warship.state.name).toBe('Wander');
        expect(warship.targetGoblin).toBeNull();
    });

    it('should fallback to Wander movement if Patrol smartMove fails', () => {
        // Mock findRaidTarget to return a building on land that is unreachable
        terrain.buildings = [{ gridX: 80, gridZ: 50, type: 'house', userData: { faction: 'enemy' }, isDead: false }];

        // Mock smartMove to fail (e.g. because it's land and can't find path)
        vi.spyOn(warship, 'smartMove').mockReturnValue(false);

        const moveRandomlySpy = vi.spyOn(warship, 'moveRandomly');

        // Step 1: Initialize simTime and lastTime in state
        warship.updateLogic(1, 0.1);

        // Step 2: Time has passed, but isMoving check might have happened at same T.
        // Step 3: Advance time beyond moveInterval (2.0 + 3.0 = 5.0)
        warship.updateLogic(10, 0.1);

        // In Wander state update, if patrol fails, it should continue to random move logic
        expect(moveRandomlySpy).toHaveBeenCalled();
    });
});
