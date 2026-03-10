
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Actor } from '../Actor.js';
import * as THREE from 'three';

describe('Unit Combat Hysteresis (Stickiness)', () => {
    let unit;
    let mockGame;
    let mockTerrain;

    beforeEach(() => {
        Actor.ignoreDetectionProbability = false;
        Actor.ignoreDetectionProbability = false;
        Unit.assets = { initialized: true };

        mockTerrain = {
            grid: [],
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: () => 0,
            getInterpolatedHeight: () => 0,
            getVisualPosition: () => ({ x: 0, y: 0, z: 0 }),
            findPathAsync: () => Promise.resolve([]),
            isWalkable: () => true,
            isReachable: () => true,
            findClosestReachablePoint: (x, z) => ({ x, z }),
            findBestTarget: vi.fn(),
            checkYield: () => Promise.resolve()
        };

        // Init Grid
        for (let x = 0; x < 100; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                mockTerrain.grid[x][z] = { regionId: 1 };
            }
        }

        mockGame = {
            frameCount: 9, // (9 + unit.id(1)) % 10 === 0 for Knight Check
            simTotalTimeSec: 100,
            battleHotspots: [],
            battleMemory: { getPriorities: () => [] },
            unitScanBudget: 100
        };

        window.game = mockGame;

        unit = new Unit(null, mockTerrain, 50, 50, 'knight');
        unit.id = 1;
        unit.game = mockGame;
    });

    it('should stay focused on existing targetRaidPoint despite a slightly closer new hotspot', () => {
        const spotA = { x: 70, z: 70, intensity: 50, time: 100 };
        mockGame.battleHotspots = [spotA];

        unit.getDistance = (x, z) => Math.sqrt((unit.gridX - x) ** 2 + (unit.gridZ - z) ** 2);

        unit.findRaidTarget();
        expect(unit.targetRaidPoint).toEqual({ x: 70, z: 70 });

        const spotB = { x: 35, z: 35, intensity: 50, time: 100 };
        mockGame.battleHotspots = [spotA, spotB];

        unit.findRaidTarget();
        expect(unit.targetRaidPoint).toEqual({ x: 70, z: 70 });
    });

    it('should switch target if the new hotspot is significantly closer (beyond hysteresis)', () => {
        const spotA = { x: 70, z: 70, intensity: 50, time: 100 };
        unit.targetRaidPoint = { x: 70, z: 70 };

        const spotC = { x: 55, z: 55, intensity: 50, time: 100 };
        mockGame.battleHotspots = [spotA, spotC];
        unit.getDistance = (x, z) => Math.sqrt((unit.gridX - x) ** 2 + (unit.gridZ - z) ** 2);

        unit.findRaidTarget();
        expect(unit.targetRaidPoint).toEqual({ x: 55, z: 55 });
    });

    it('should apply stickiness during checkSelfDefense for entities', () => {
        const goblinA = { id: 'gA', gridX: 60, gridZ: 60, isDead: false };
        const goblinB = { id: 'gB', gridX: 45, gridZ: 45, isDead: false };

        unit.getDistance = (x, z) => Math.sqrt((unit.gridX - x) ** 2 + (unit.gridZ - z) ** 2);

        mockTerrain.findBestTarget.mockImplementation((type, x, z, rad, costFn) => {
            if (type !== 'goblin') return null;
            const scoreA = costFn(goblinA, unit.getDistance(60, 60));
            const scoreB = costFn(goblinB, unit.getDistance(45, 45));
            return scoreA < scoreB ? goblinA : goblinB;
        });

        unit.targetGoblin = goblinA;
        unit.checkSelfDefense([goblinA, goblinB]);
        expect(unit.targetGoblin).toBe(goblinA);

        unit.targetGoblin = null;
        unit.checkSelfDefense([goblinA, goblinB]);
        expect(unit.targetGoblin).toBe(goblinB);
    });
});