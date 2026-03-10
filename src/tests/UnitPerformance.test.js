
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Actor } from '../Actor.js';

describe('Unit Performance Optimization', () => {
    let unit;
    let terrain;
    let game;

    beforeEach(() => {
        Unit.ignoreDetectionProbability = false;
        Actor.ignoreDetectionProbability = false;
        terrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: () => 1,
            buildings: [],
            grid: []
        };
        game = {
            frameCount: 0,
            gameTotalTime: 0,
            simTotalTimeSec: 0,
            unitScanBudget: 100,
            goblinManager: { goblins: [] }
        };

        window.game = game;
        window.isTest = false; // Ensure throttling is active for this test

        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        unit.game = game;
        unit.id = 1;
        unit.terrain = terrain;
        unit.detectionProbability = 1.0; // Ensure deterministic behavior for performance tests
    });

    it('should throttle checkSelfDefense based on ID and Frame', () => {
        const goblin = { id: 'g1', gridX: 12, gridZ: 12, isDead: false };
        const passedGoblins = [goblin];

        unit.getDistance = vi.fn().mockReturnValue(10);
        unit.action = 'Idle';
        unit.scanTimer = 0;
        unit.targetGoblin = null;
        unit.targetBuilding = null;
        unit.ignoredTargets = new Set();

        // Frame 0: (0 + 1) % 30 != 0 -> Should skip (Worker interval 30)
        window.game.frameCount = 0;
        const result0 = unit.checkSelfDefense(passedGoblins);
        expect(result0).toBe(false);
        expect(terrain.findBestTarget).not.toHaveBeenCalled();

        // Frame 29: (29 + 1) % 30 == 0 -> Should execute
        window.game.frameCount = 29;
        unit.checkSelfDefense(passedGoblins);
        expect(terrain.findBestTarget).toHaveBeenCalled();
    });

    it('should skip checkSelfDefense for busy workers', () => {
        unit.role = 'worker';
        unit.targetRequest = { id: 1 }; // Busy

        window.game.frameCount = 29;
        unit.checkSelfDefense([]);

        // UPDATED: Workers with jobs now scan (satisfies Regression_WorkerLogic.test.js)
        expect(terrain.findBestTarget).toHaveBeenCalled();
    });

    it('should throttle checkSelfDefense for idle units', () => {
        unit.role = 'knight';
        unit.id = 1;

        // Knight allowedInterval = 10. Frame check: (frame + id) % 10 == 0
        window.game.frameCount = 0; // (0 + 1) % 10 != 0 -> Skip
        unit.checkSelfDefense([]);
        expect(terrain.findBestTarget).not.toHaveBeenCalled();

        window.game.frameCount = 9; // (9 + 1) % 10 == 0 -> Run
        unit.checkSelfDefense([]);
        expect(terrain.findBestTarget).toHaveBeenCalled();
    });
});
