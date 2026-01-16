
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

describe('Unit Combat Hysteresis (Stickiness)', () => {
    let unit;
    let mockGame;
    let mockTerrain;

    beforeEach(() => {
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
            battleMemory: { getPriorities: () => [] }
        };
        global.window = { game: mockGame };

        unit = new Unit(null, mockTerrain, 50, 50, 'knight');
        unit.id = 1;
        unit.game = mockGame;
    });

    it('should stay focused on existing targetRaidPoint despite a slightly closer new hotspot', () => {
        // 1. Initial State: Target A is at (70, 70)
        const spotA = { x: 70, z: 70, intensity: 50, time: 100 };
        mockGame.battleHotspots = [spotA];

        // Mock distance to be meaningful
        unit.getDistance = (x, z) => Math.sqrt((unit.gridX - x) ** 2 + (unit.gridZ - z) ** 2);

        // First findRaidTarget call sets the target
        unit.findRaidTarget();
        expect(unit.targetRaidPoint).toEqual({ x: 70, z: 70 });

        // 2. New Hotspot B appears at (35, 35)
        // Distance Unit(50,50) -> SpotA(70,70) is ~28.2
        // Distance Unit(50,50) -> SpotB(35,35) is ~21.2
        // Spot B is closer by ~7 tiles.
        // Hysteresis bonus is 15.0, so it should NOT switch yet.
        const spotB = { x: 35, z: 35, intensity: 50, time: 100 };
        mockGame.battleHotspots = [spotA, spotB];

        unit.findRaidTarget();

        // Should STILL be Spot A because the bonus (-15) makes ScoreA (28.2 - 15 = 13.2) < ScoreB (21.2)
        expect(unit.targetRaidPoint).toEqual({ x: 70, z: 70 });
    });

    it('should switch target if the new hotspot is significantly closer (beyond hysteresis)', () => {
        // Target A at (70, 70) [Dist 28.2]
        const spotA = { x: 70, z: 70, intensity: 50, time: 100 };
        unit.targetRaidPoint = { x: 70, z: 70 };

        // 1. Target C at (55, 55) [Dist 7.0]
        // Distance difference is 21.2.
        // Even with bonus (-15), ScoreA (28.2 - 15 = 13.2) > ScoreC (7.0)
        const spotC = { x: 55, z: 55, intensity: 50, time: 100 };
        mockGame.battleHotspots = [spotA, spotC];

        unit.findRaidTarget();

        // Should switch to Spot C
        expect(unit.targetRaidPoint).toEqual({ x: 55, z: 55 });
    });

    it('should apply stickiness during checkSelfDefense for entities', () => {
        const goblinA = { id: 'gA', gridX: 60, gridZ: 60, isDead: false };
        const goblinB = { id: 'gB', gridX: 45, gridZ: 45, isDead: false };

        // Mock findBestTarget behavior
        mockTerrain.findBestTarget.mockImplementation((type, x, z, rad, costFn) => {
            if (type !== 'goblin') return null; // Avoid building search errors
            const scoreA = costFn(goblinA, unit.getDistance(60, 60));
            const scoreB = costFn(goblinB, unit.getDistance(45, 45));
            return scoreA < scoreB ? goblinA : goblinB;
        });

        // Case 1: Already targeting A (60,60) [Dist 14.1]
        // B is at (45,45) [Dist 7.07]
        // Goblin A score = 14.1 - 500 (sticky) = -485.9
        // Goblin B score = 7.07
        unit.targetGoblin = goblinA;
        unit.checkSelfDefense([goblinA, goblinB]);
        expect(unit.targetGoblin).toBe(goblinA);

        // Case 2: No current target, should pick closest (B)
        unit.targetGoblin = null;
        unit.checkSelfDefense([goblinA, goblinB]);
        expect(unit.targetGoblin).toBe(goblinB);
    });
});
