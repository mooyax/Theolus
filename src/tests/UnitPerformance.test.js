
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';

describe('Unit Performance Optimization', () => {
    let unit;
    let terrain;
    let game;

    beforeEach(() => {
        terrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: () => 1,
            buildings: [],
            grid: []
        };
        game = {
            frameCounter: 0,
            gameTotalTime: 0,
            simTotalTimeSec: 0,
            goblinManager: { goblins: [] }
        };
        global.window = { game };

        unit = new Unit(null, terrain, 10, 10, 'worker');
        unit.id = 1;
        unit.game = game;
    });

    it('should throttle checkSelfDefense based on ID and Frame', () => {
        // Prepare mocks
        const goblin = { id: 'g1', gridX: 12, gridZ: 12, isDead: false };
        const passedGoblins = [goblin];

        // Mock getDistance to track calls
        unit.getDistance = vi.fn().mockReturnValue(10);

        // Ensure unit properties allow scanning
        unit.action = 'Idle';
        unit.scanTimer = 0;
        unit.targetGoblin = null;
        unit.targetBuilding = null;
        unit.ignoredTargets = new Set();

        // Frame 0: (0 + 1) % 20 != 0 -> Should skip
        window.game.frameCount = 0;
        const result0 = unit.checkSelfDefense(passedGoblins);
        expect(result0).toBe(false);
        expect(unit.getDistance).not.toHaveBeenCalled();

        // Frame 19: (19 + 1) % 20 == 0 -> Should execute
        window.game.frameCount = 19;
        unit.checkSelfDefense(passedGoblins);

        // findBestTarget should be called instead of manual getDistance loop
        expect(terrain.findBestTarget).toHaveBeenCalledWith('goblin', 10, 10, expect.any(Number), expect.any(Function), passedGoblins);
    });

    it('should skip searchSurroundings for busy workers', () => {
        unit.role = 'worker';
        unit.targetRequest = { id: 1 }; // Busy

        unit.searchSurroundings(10, 10, []);

        // Should return immediately, findBestTarget NOT called
        expect(terrain.findBestTarget).not.toHaveBeenCalled();
    });

    it('should throttle searchSurroundings for idle units', () => {
        unit.role = 'knight';
        unit.id = 1;

        // Offset is (frame + id) % 20 [id=2 for this unit]
        // Target: (frame + 2) % 20 == 0 -> frame = 18

        window.game.frameCount = 0; // (0 + 2) = 2 % 20 != 0 -> Skip
        unit.searchSurroundings(10, 10, []);
        expect(terrain.findBestTarget).not.toHaveBeenCalled();

        window.game.frameCount = 14; // (14 + 1 + 5) = 20 % 20 == 0 -> Run
        unit.searchSurroundings(10, 10, []);
        // Note: Knight/Wizard run every 10 frames check
        // if ((frame + this.id) % 20 !== 0) {
        //    if (Knight/Wizard && (frame + id) % 10 !== 0) return;
        // }

        expect(terrain.findBestTarget).toHaveBeenCalled();
    });
});
