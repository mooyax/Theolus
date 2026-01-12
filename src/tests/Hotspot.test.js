import { describe, it, expect, vi, beforeEach } from 'vitest';

// We will test the logic by extracting it or using a mock object
// This avoids the complex Game constructor

describe('Global Battle Hotspots Logic', () => {
    let mockGame;

    beforeEach(() => {
        mockGame = {
            battleHotspots: [],
            squads: new Map(),
            units: [],
            terrain: {
                getRegion: vi.fn().mockReturnValue(1)
            },
            // Copy logic from Game.prototype (or just re-implement here to verify the ALGORITHM)
            // But better to test the ACTUAL code. 
            // We can manually attach the functions from Game.js if we import it.
        };
    });

    // Strategy: Import Game but don't call constructor
    // Since Game is a class, we can get methods from prototype

    it('Clusters nearby battle reports', async () => {
        // Dynamic import to avoid side effects if any
        const { Game } = await import('../Game.js');
        const reportFn = Game.prototype.reportGlobalBattle.bind(mockGame);

        reportFn(10, 10);
        reportFn(12, 12);

        expect(mockGame.battleHotspots.length).toBe(1);
        expect(mockGame.battleHotspots[0].intensity).toBeGreaterThan(20);
    });

    it('Decays intensity', async () => {
        const { Game } = await import('../Game.js');
        const reportFn = Game.prototype.reportGlobalBattle.bind(mockGame);
        const updateFn = Game.prototype.updateBattleHotspots.bind(mockGame);

        reportFn(10, 10);
        const initial = mockGame.battleHotspots[0].intensity;

        updateFn(1.0);
        expect(mockGame.battleHotspots[0].intensity).toBe(initial - 2.0); // Reduced decay
    });

    it('Mobilizes idle squads to intense hotspots (Updated Threshold)', async () => {
        const { Game } = await import('../Game.js');
        const mobFn = Game.prototype.updateSquadMobilization.bind(mockGame);
        const reportSquadFn = vi.fn();
        mockGame.reportSquadTarget = reportSquadFn;

        mockGame.simTotalTimeSec = 100;
        // Setup idle squad (no target for > 5s)
        mockGame.squads.set(1, { target: { time: 94 } }); // 6s ago
        mockGame.units.push({ squadId: 1, gridX: 20, gridZ: 20, isDead: false });

        // Setup distant hotspot (dist 80)
        // Score = 40 / (80 + 5) = 40/85 = 0.47 > 0.2
        mockGame.battleHotspots.push({ x: 100, z: 20, intensity: 100, regionId: 1, time: 100 });

        mockGame.mobilizationTimer = 2.0;
        mobFn(0.1);

        expect(reportSquadFn).toHaveBeenCalledWith(1, 100, 20);
    });

    it('Triggers autonomous patrol for idle Knights', async () => {
        const { Unit } = await import('../Unit.js');

        const mockUnit = {
            id: -1, // Avoid debug blocks
            role: 'knight',
            action: 'Idle',
            isMoving: false,
            gridX: 20,
            gridZ: 20,
            lastTime: 0,
            moveInterval: 500,
            patrol: vi.fn(function () { this.action = 'Patrolling'; }),
            targetGoblin: null,
            targetBuilding: null,
            targetRaidPoint: null,
            targetRequest: null,
            ignoredTargets: new Map(),
            findRaidTarget: vi.fn().mockReturnValue(false),
            terrain: {
                getTileHeight: vi.fn().mockReturnValue(10),
                grid: Array(100).fill(0).map(() => Array(100).fill({ regionId: 1 })),
                buildings: []
            },
            gatherResources: vi.fn(),
            scanTimer: 0,
            age: 20,
            lifespan: 100,
            stagnationTimer: 0,
            stuckCount: 0,
            die: vi.fn(),
            updateDeathAnimation: vi.fn(),
            updateCombatLogic: vi.fn(),
            updateWorkerLogic: vi.fn(),
            checkSelfDefense: vi.fn().mockReturnValue(false),
            executeMove: vi.fn(),
            changeState: vi.fn(function (s) { this.state = s; })
        };

        const { UnitWanderState } = await import('../ai/states/UnitStates.js');
        mockUnit.state = new UnitWanderState(mockUnit);

        const updateFn = Unit.prototype.updateLogic.bind(mockUnit);
        updateFn(1000, 10, false, [], [], []); // time=1000, deltaTime=10

        expect(mockUnit.action).toBe("Patrolling");
        expect(mockUnit.patrol).toHaveBeenCalled();
    });

    it('Mobilizes idle squads', async () => {
        const { Game } = await import('../Game.js');
        const mobFn = Game.prototype.updateSquadMobilization.bind(mockGame);
        const reportSquadFn = vi.fn();
        mockGame.reportSquadTarget = reportSquadFn;

        // Setup idle squad
        mockGame.squads.set(1, { target: null });
        mockGame.units.push({ squadId: 1, gridX: 20, gridZ: 20, isDead: false });

        // Setup hotspot
        mockGame.battleHotspots.push({ x: 50, z: 50, intensity: 100, regionId: 1, time: Date.now() });

        mockGame.mobilizationTimer = 2.0;
        mobFn(0.1);

        expect(reportSquadFn).toHaveBeenCalledWith(1, 50, 50);
    });

    it('Does not mobilize across regions', async () => {
        const { Game } = await import('../Game.js');
        const mobFn = Game.prototype.updateSquadMobilization.bind(mockGame);
        const reportSquadFn = vi.fn();
        mockGame.reportSquadTarget = reportSquadFn;

        mockGame.squads.set(1, { target: null });
        mockGame.units.push({ squadId: 1, gridX: 20, gridZ: 20, isDead: false });

        // Squad is in region 1
        mockGame.terrain.getRegion.mockReturnValue(1);

        // Hotspot is in region 2
        mockGame.battleHotspots.push({ x: 50, z: 50, intensity: 100, regionId: 2, time: Date.now() });

        mockGame.mobilizationTimer = 2.0;
        mobFn(0.1);

        expect(reportSquadFn).not.toHaveBeenCalled();
    });
});
