
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
            logicalWidth: 160,
            logicalDepth: 160,
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

    it('Worker should NOT scan if random > 0.5 and prob is low (Global Performance Hack)', () => {
        unit.detectionProbability = 0.05; // Very low
        vi.spyOn(Math, 'random').mockReturnValue(0.9); // Both > 0.1 and > 0.5
        unit.updateCombatTarget([], [], []);
        // Global performance hack might skip the entire scan
        expect(mockTerrain.findBestTarget).not.toHaveBeenCalled();
    });

    it('Worker SHOULD scan if very close target might exist (Scan always allowed if prob >= 0.1)', () => {
        unit.detectionProbability = 0.3;
        vi.spyOn(Math, 'random').mockReturnValue(0.9); 
        unit.updateCombatTarget([], [], []);
        // With 0.3, the global performance hack doesn't trigger
        expect(mockTerrain.findBestTarget).toHaveBeenCalled();
    });

    it('Goblin SHOULD scan always (Global check removed from Goblin)', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.9);
        goblin.scanForTargets([], []);
        expect(mockTerrain.findBestTarget).toHaveBeenCalled();
    });

    it('Should detect target with 100% probability if distance <= 1.0', () => {
        unit.detectionProbability = 0.1; // Low base prob
        const targets = [{ id: 1, gridX: 0.5, gridZ: 0.5, faction: 'goblin', type: 'goblin' }];
        
        // Setup findBestTarget to trigger callback
        mockTerrain.findBestTarget.mockImplementation((type, x, z, dist, callback, list) => {
            const score = callback(targets[0], 0.7); // Dist 0.7 (<= 1.0)
            return (score === Infinity) ? null : targets[0];
        });

        vi.spyOn(Math, 'random').mockReturnValue(0.99); // Force fail base prob
        unit.updateCombatTarget([], [], targets);
        
        expect(unit.targetGoblin).not.toBeNull();
    });
});
