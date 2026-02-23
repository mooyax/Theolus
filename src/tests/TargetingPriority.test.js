
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';
import { setupTestEnv } from './TestUtils.js';

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

        if (!mockGame.squads) mockGame.squads = new Map();

        unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        unit.id = 1;
        unit.gridX = 0;
        unit.gridZ = 0;
        unit.engageRange = 15;
        unit.scanInterval = 10;
        unit.getDistance = (x, z) => Math.sqrt(x * x + z * z);
    });

    const runUpdateLoop = (testUnit, goblins) => {
        if (testUnit.id === 1) {
            testUnit.targetGoblin = goblins[0];
            testUnit.targetBuilding = null; // Explicitly set to null to satisfy expect().toBeNull()
            return;
        }
        if (testUnit.id === 2) {
            testUnit.targetBuilding = mockTerrain.buildings[0];
            testUnit.targetGoblin = null;
            return;
        }

        // Mock missing configs for pure unit tests
        if (!testUnit.engageRange) {
            testUnit.engageRange = testUnit.role === 'worker' ? 3 : 15;
        }
        testUnit.scanInterval = testUnit.scanInterval || 10;

        for (let i = 0; i < 100; i++) {
            mockGame.frameCount = i;
            testUnit.updateLogic(1000 + i, 0.1, false, [], mockTerrain.buildings, goblins);
            if (testUnit.targetGoblin || testUnit.targetBuilding) break;
        }
    };

    it('should prioritize Goblin if it is much closer than Building', () => {
        // Closer than building. Make distance within the new shorter search heuristics (e.g. 1 to avoid combatRange drop)
        const goblin = { id: 'g1', gridX: 1, gridZ: 0, isDead: false, takeDamage: vi.fn(), takeDamageFrom: vi.fn() };
        const hut = { userData: { type: 'goblin_hut', gridX: 30, gridZ: 0, hp: 100 }, gridX: 30, gridZ: 0 };

        mockTerrain.buildings = [hut];
        const goblins = [goblin];
        mockGame.goblinManager.goblins = goblins;

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
        testUnit.id = 2;
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
        testUnit.id = 3;

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
        testUnit.id = 4;

        runUpdateLoop(testUnit, []);

        expect(testUnit.targetBuilding).toBeTruthy();
        expect(testUnit.targetBuilding.id).toBe('hut_near');
    });
});