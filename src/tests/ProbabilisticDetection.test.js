
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { Goblin } from '../Goblin';
import { Actor } from '../Actor';
import * as THREE from 'three';

// Mock THREE
global.THREE = THREE;

describe('Probabilistic Detection', () => {
    let unit;
    let goblin;
    let mockTerrain;

    beforeEach(() => {
        Unit.assets = { initialized: true };
        Goblin.assets = { initialized: true };
        Actor.ignoreDetectionProbability = false; // Enable probability for this test

        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            grid: [],
            gridToWorld: (v) => v,
            getTileHeight: () => 1.0,
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            findBestTarget: vi.fn(),
        };

        // Mock Game
        const mockGame = {
            simTotalTimeSec: 100,
            frameCount: 0
        };

        // Create Worker (Prob = 0.3)
        unit = new Unit(null, mockTerrain, 0, 0, 'worker');
        unit.game = mockGame;
        unit.detectionProbability = 0.3;

        // Create Normal Goblin (Prob = 0.2)
        goblin = new Goblin(null, mockTerrain, 10, 10, 'normal');
        goblin.detectionProbability = 0.2;

        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('Worker should NOT detect enemy if random > probability', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5); // 0.5 > 0.3
        unit.updateCombatTarget([], [], []);
        expect(mockTerrain.findBestTarget).not.toHaveBeenCalled();
    });

    it('Worker SHOULD detect enemy if random <= probability', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.1); // 0.1 <= 0.3
        unit.updateCombatTarget([], [], []);
        expect(mockTerrain.findBestTarget).toHaveBeenCalled();
    });

    it('Goblin should NOT scan if random > probability', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5); // 0.5 > 0.2
        goblin.scanForTargets([], []);
        expect(mockTerrain.findBestTarget).not.toHaveBeenCalled();
    });

    it('Goblin SHOULD scan if random <= probability', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.1); // 0.1 <= 0.2
        goblin.scanForTargets([], []);
        expect(mockTerrain.findBestTarget).toHaveBeenCalled();
    });

    it('Should ALWAYS scan if already has a target (Hysteresis)', () => {
        unit.targetGoblin = { id: 1, gridX: 1, gridZ: 1 };
        vi.spyOn(Math, 'random').mockReturnValue(0.9); // 0.9 > 0.3 but should scan anyway
        unit.updateCombatTarget([], [], []);
        expect(mockTerrain.findBestTarget).toHaveBeenCalled();
    });
});
