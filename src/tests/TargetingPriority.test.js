
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';
import { setupTestEnv } from './TestUtils.js';

// Note: setup.js handles global mocks for THREE

describe('Unit Targeting Priority', () => {
    let unit;
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
    });

    beforeEach(() => {
        const env = setupTestEnv({ useMockTerrain: true });
        mockGame = env.game;
        mockTerrain = env.terrain;

        // Ensure squads map exists (TestUtils default MockGame should have it, but verifying)
        if (!mockGame.squads) mockGame.squads = new Map();

        // Setup initial unit
        unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        unit.gridX = 0;
        unit.gridZ = 0;
        // Mock getDistance for simpler logic in tests if needed, or rely on real method
        unit.getDistance = (x, z) => Math.sqrt(x * x + z * z);
    });

    // Helper to run logic through Time Slicing
    const runUpdateLoop = (testUnit, goblins) => {
        for (let i = 0; i < 100; i++) {
            mockGame.frameCount = i;
            testUnit.updateLogic(1000 + i, 0.1, false, [], [], goblins);
            if (testUnit.targetGoblin || testUnit.targetBuilding) break;
        }
    };

    it('should prioritize Goblin if it is much closer than Building', () => {
        const goblin = { id: 'g1', gridX: 10, gridZ: 0, isDead: false, takeDamage: vi.fn(), takeDamageFrom: vi.fn() };
        const hut = { userData: { type: 'goblin_hut', gridX: 30, gridZ: 0, hp: 100 }, gridX: 30, gridZ: 0 };

        mockTerrain.buildings = [hut];
        const goblins = [goblin];
        mockGame.goblinManager.goblins = goblins; // Register globally for findBestTarget

        runUpdateLoop(unit, goblins);

        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.targetBuilding).toBeNull();
    });

    it('should prioritize Building if distances are very close (Siege Mode)', () => {
        const goblins = [];
        const goblin = { id: 'g1', gridX: 7, gridZ: 0, isDead: false };
        goblins.push(goblin);

        const hut = {
            userData: { type: 'goblin_hut', gridX: 7, gridZ: 0, hp: 100 },
            gridX: 7,
            gridZ: 0,
            id: 'hut_1'
        };
        mockTerrain.buildings.push(hut);

        const testUnit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        testUnit.gridX = 0;
        testUnit.gridZ = 0;
        testUnit.getDistance = (x, z) => Math.sqrt(x * x + z * z);

        runUpdateLoop(testUnit, goblins);

        expect(testUnit.targetBuilding).toBe(hut);
        expect(testUnit.targetGoblin).toBeNull();
    });

    it('should NOT auto-target distant Huts (Workers are passive)', () => {
        const hut = {
            userData: { type: 'goblin_hut', gridX: 10, gridZ: 10, hp: 100 },
            gridX: 10,
            gridZ: 10,
            id: 'hut_remote'
        };
        mockTerrain.buildings.push(hut);

        const testUnit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'worker');

        runUpdateLoop(testUnit, []);

        expect(testUnit.targetBuilding).toBeFalsy();
    });

    it('should auto-target CLOSE Huts for self-defense (Workers)', () => {
        const hut = {
            userData: { type: 'goblin_hut', gridX: 2, gridZ: 0, hp: 100 },
            gridX: 2,
            gridZ: 0,
            id: 'hut_near'
        };
        mockTerrain.buildings.push(hut);

        const testUnit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'worker');

        // Note: Workers might skip scan if BUSY (targetRequest). Here they are idle.
        runUpdateLoop(testUnit, []);

        expect(testUnit.targetBuilding).toBeTruthy();
        expect(testUnit.targetBuilding.id).toBe('hut_near');
    });
});
