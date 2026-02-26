
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
        if (!mockGame.goblinManager) mockGame.goblinManager = { notifyClanActivity: vi.fn(), goblins: [] };
        if (!mockTerrain.getRandomPointInRegion) mockTerrain.getRandomPointInRegion = vi.fn().mockReturnValue({ x: 10, z: 10 });

        unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        unit.targetGoblin = null;
        unit.targetBuilding = null;
    });

    const runUpdateLoop = (testUnit, goblins) => {
        testUnit.scanTimer = 31;
        window.game.frameCount = 10;
        testUnit.id = 0;

        for (let i = 0; i < 5; i++) {
            testUnit.updateLogic(1000 + i, 1, false, [], mockTerrain.buildings, goblins);
            if (testUnit.targetGoblin || testUnit.targetBuilding) break;
        }
    };

    it('should prioritize Goblin if it is much closer than Building', () => {
        const goblin = { id: 'g1', gridX: 1, gridZ: 0, isDead: false, faction: 'enemy', type: 'goblin', takeDamage: vi.fn() };
        const hut = { userData: { type: 'goblin_hut', gridX: 30, gridZ: 0, hp: 100 }, gridX: 30, gridZ: 0, faction: 'enemy', id: 'hut1' };

        mockTerrain.buildings = [hut];
        const goblins = [goblin];
        mockGame.goblinManager.goblins = goblins;

        runUpdateLoop(unit, goblins);

        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.targetBuilding).toBeFalsy();
    });

    it('should prioritize Building if distances are very close (Siege Mode)', () => {
        const goblin = { id: 'g1', gridX: 7, gridZ: 0, isDead: false, faction: 'enemy', type: 'goblin' };
        const hut = {
            userData: { type: 'goblin_hut', gridX: 5, gridZ: 0, hp: 100 },
            gridX: 5,
            gridZ: 0,
            faction: 'enemy',
            id: 'hut_1'
        };
        mockTerrain.buildings = [hut];

        const testUnit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        testUnit.targetGoblin = null;
        testUnit.targetBuilding = null;

        runUpdateLoop(testUnit, [goblin]);

        expect(testUnit.targetBuilding).toBe(hut);
    });

    it('should NOT auto-target distant Huts (Workers are passive)', () => {
        const hut = {
            userData: { type: 'goblin_hut', gridX: 30, gridZ: 30, hp: 100 },
            gridX: 30,
            gridZ: 30,
            faction: 'enemy',
            id: 'hut_remote'
        };
        mockTerrain.buildings = [hut];

        const testUnit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'worker');
        runUpdateLoop(testUnit, []);

        expect(testUnit.targetBuilding).toBeFalsy();
    });

    it('should auto-target CLOSE Huts for self-defense (Workers)', () => {
        const hut = {
            userData: { type: 'goblin_hut', gridX: 1, gridZ: 0, hp: 100 },
            gridX: 1,
            gridZ: 0,
            faction: 'enemy',
            id: 'hut_near'
        };
        mockTerrain.buildings = [hut];

        const testUnit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'worker');
        runUpdateLoop(testUnit, []);

        expect(testUnit.targetBuilding).toBeTruthy();
    });
});