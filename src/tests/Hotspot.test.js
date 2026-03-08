
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Global Battle Hotspots Logic', () => {
    let mockGame;

    beforeEach(() => {
        mockGame = {
            battleHotspots: [],
            squads: new Map(),
            units: [],
            terrain: {
                getRegion: vi.fn().mockReturnValue(1)
            }
        };
    });

    it('Clusters nearby battle reports', async () => {
        const { Game } = await import('../Game.ts');
        const reportFn = Game.prototype.reportGlobalBattle.bind(mockGame);

        reportFn(10, 10);
        reportFn(12, 12);

        expect(mockGame.battleHotspots.length).toBe(1);
        expect(mockGame.battleHotspots[0].intensity).toBeGreaterThan(20);
    });

    it('Decays intensity', async () => {
        const { Game } = await import('../Game.ts');
        const reportFn = Game.prototype.reportGlobalBattle.bind(mockGame);
        const updateFn = Game.prototype.updateBattleHotspots.bind(mockGame);

        reportFn(10, 10);
        const initial = mockGame.battleHotspots[0].intensity;

        updateFn(1.0);
        expect(mockGame.battleHotspots[0].intensity).toBe(initial - 2.0);
    });

    it('Mobilizes idle squads to intense hotspots (Updated Threshold)', async () => {
        const { Game } = await import('../Game.ts');
        const mobFn = Game.prototype.updateSquadMobilization.bind(mockGame);
        const reportSquadFn = vi.fn();
        mockGame.reportSquadTarget = reportSquadFn;

        mockGame.simTotalTimeSec = 100;
        mockGame.squads.set(1, { target: { time: 94 } });
        mockGame.units.push({ squadId: 1, gridX: 20, gridZ: 20, isDead: false });

        mockGame.battleHotspots.push({ x: 100, z: 20, intensity: 100, regionId: 1, time: 100 });

        mockGame.squadMobilizationTimer = 2.0;
        mobFn(0.1);

        expect(reportSquadFn).toHaveBeenCalledWith(1, 100, 20);
    });

    it('Triggers autonomous patrol for idle Knights', async () => {
        // Instead of complex prototype binding, let's use a real unit with mocked dependencies
        const { Unit } = await import('../Unit.ts');
        const { Wander } = await import('../ai/states/UnitStates.ts');

        // We need a terrain mock that satisfies Unit dependencies
        const mockTerrain = {
            getTileHeight: vi.fn().mockReturnValue(10),
            grid: Array(100).fill(0).map(() => Array(100).fill({ regionId: 1 })),
            buildings: [],
            isWithinBounds: vi.fn().mockReturnValue(true),
            isAdjacentToRegion: vi.fn().mockReturnValue(true),
            logicalWidth: 100,
            logicalDepth: 100
        };

        const unit = new Unit({ add: vi.fn() }, mockTerrain, 20, 20, 'knight');
        unit.patrol = vi.fn().mockReturnValue(true);
        unit.findRaidTarget = vi.fn().mockReturnValue(true);

        // Ensure unit is in Wander state
        unit.changeState(new Wander(unit));

        // Run update
        unit.updateLogic(1000, 10, false, [], [], []);

        expect(unit.action).toBe("Patrolling");
        expect(unit.patrol).toHaveBeenCalled();
    });

    it('Mobilizes idle squads', async () => {
        const { Game } = await import('../Game.ts');
        const mobFn = Game.prototype.updateSquadMobilization.bind(mockGame);
        const reportSquadFn = vi.fn();
        mockGame.reportSquadTarget = reportSquadFn;

        mockGame.squads.set(1, { target: null });
        mockGame.units.push({ squadId: 1, gridX: 20, gridZ: 20, isDead: false });

        mockGame.battleHotspots.push({ x: 50, z: 50, intensity: 100, regionId: 1, time: Date.now() });

        mockGame.squadMobilizationTimer = 2.0;
        mobFn(0.1);

        expect(reportSquadFn).toHaveBeenCalledWith(1, 50, 50);
    });

    it('Does not mobilize across regions', async () => {
        const { Game } = await import('../Game.ts');
        const mobFn = Game.prototype.updateSquadMobilization.bind(mockGame);
        const reportSquadFn = vi.fn();
        mockGame.reportSquadTarget = reportSquadFn;

        mockGame.squads.set(1, { target: null });
        mockGame.units.push({ squadId: 1, gridX: 20, gridZ: 20, isDead: false });

        mockGame.terrain.getRegion.mockReturnValue(1);
        mockGame.battleHotspots.push({ x: 50, z: 50, intensity: 100, regionId: 2, time: Date.now() });

        mockGame.squadMobilizationTimer = 2.0;
        mobFn(0.1);

        expect(reportSquadFn).not.toHaveBeenCalled();
    });
});
