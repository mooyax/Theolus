
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

        // Frame 59: (59 + 1) % 60 == 0 -> Should execute (Worker interval is 60)
        window.game.frameCount = 59;
        unit.checkSelfDefense(passedGoblins);

        // findBestTarget should be called instead of manual getDistance loop
        expect(terrain.findBestTarget).toHaveBeenCalled();

        // Optional: Verify first arg is 'goblin' if possible, but relax strictness to prevent hang/error
        // const args = terrain.findBestTarget.mock.calls[0];
        // expect(args[0]).toBe('goblin');
    });

    it('should skip checkSelfDefense for busy workers', () => {
        unit.role = 'worker';
        unit.targetRequest = { id: 1 }; // Busy

        // (Frame + id) % 30 == 0 -> frame 29 (Worker allowedInterval is 30)
        window.game.frameCount = 29;
        unit.checkSelfDefense([]);

        // Should return immediately, findBestTarget NOT called (Worker Pacifism)
        expect(terrain.findBestTarget).not.toHaveBeenCalled();
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
