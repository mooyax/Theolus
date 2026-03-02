
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Unit } from '../Unit.js';

// Mock dependencies
class MockGame {
    constructor() {
        this.squads = new Map();
        this.battleMemory = {
            reportRaid: vi.fn(),
            getPriorities: vi.fn().mockReturnValue([]),
            reportClear: vi.fn()
        };
        this.gameTotalTime = 1000;
        this.simTotalTimeSec = 1000;
        this.resources = { fish: 0, meat: 0, grain: 0 };
    }

    registerSquad(type) {
        const id = Math.floor(Math.random() * 1000000);
        this.squads.set(id, {
            id: id,
            type: type,
            target: null,
            lastUpdate: Date.now()
        });
        return id;
    }

    getSquad(id) {
        return this.squads.get(id);
    }

    reportSquadTarget(squadId, x, z) {
        const squad = this.squads.get(squadId);
        if (squad) {
            squad.target = { x: x, z: z, time: Date.now() };
            squad.lastUpdate = Date.now();
        }
    }
}

class MockTerrain {
    constructor() {
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.grid = [];
        this.buildings = [];
        for (let x = 0; x < 100; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                this.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false };
            }
        }
    }
    getTileHeight(x, z) {
        if (x < 0 || x >= 100 || z < 0 || z >= 100) return 0;
        return this.grid[x][z].height;
    }
    getRegion(x, z) { return this.grid[x] && this.grid[x][z] ? this.grid[x][z].regionId : 1; }
    getRandomPointInRegion(regionId, cx, cz, radius) { return { x: 50, z: 50 }; }
    findBestTarget() { return null; }
    findPath(sx, sz, tx, tz) { return [{ x: tx, z: tz }]; }
    checkFlatArea() { return false; }
    addBuilding() { }
    registerEntity() { }
    unregisterEntity() { }
}

describe('Squad AI & Region Logic', () => {
    let game;
    let terrain;
    let scene;

    beforeEach(() => {
        game = new MockGame();
        window.game = game;
        terrain = new MockTerrain();
        scene = { add: vi.fn(), remove: vi.fn(), position: { x: 0, y: 0, z: 0 } };
    });

    afterEach(() => {
        window.game = undefined;
    });

    it('should register a squad and assign valid ID', () => {
        const id = game.registerSquad('barracks');
        expect(id).toBeDefined();
        const squad = game.getSquad(id);
        expect(squad).toBeDefined();
        expect(squad.type).toBe('barracks');
    });

    it('should share targets among squad members', () => {
        const squadId = game.registerSquad('barracks');
        const unitA = new Unit(scene, terrain, 10, 10, 'knight', false, squadId);
        const unitB = new Unit(scene, terrain, 20, 20, 'knight', false, squadId);

        const enemy = { id: 99, gridX: 50, gridZ: 50 };
        unitA.reportEnemy(enemy);

        const squad = game.getSquad(squadId);
        expect(squad.target).toEqual(expect.objectContaining({ x: 50, z: 50 }));

        unitB.isReachable = vi.fn().mockReturnValue(true);
        const found = unitB.findRaidTarget();
        expect(found).toBe(true);
        expect(unitB.targetRaidPoint).toEqual(expect.objectContaining({ x: 50, z: 50 }));
    });

    it('Regression: Migration Stagnation Fix (Knight)', () => {
        const unit = new Unit(scene, terrain, 10, 10, 'knight', false, null);
        unit.action = 'Migrating';
        unit.migrationTarget = { x: 30, z: 30 };
        unit.gridX = 30;
        unit.gridZ = 30;
        unit.onMoveFinished(1000);
        expect(unit.action).toBe('Idle');
        expect(unit.migrationTarget).toBeNull();
    });

    it('Regression: Migration Stagnation Fix (Worker)', () => {
        const unit = new Unit(scene, terrain, 10, 10, 'worker', false, null);
        unit.action = 'Migrating';
        unit.migrationTarget = { x: 30, z: 30 };
        unit.gridX = 30;
        unit.gridZ = 30;
        const moveSpy = vi.spyOn(unit, 'moveRandomly').mockImplementation(() => { });
        unit.onMoveFinished(1000);
        expect(moveSpy).toHaveBeenCalled();
        expect(unit.action).toBe('Idle');
    });

    it('should block cross-region even if close, except for ranged units', () => {
        const unit = new Unit(scene, terrain, 10, 10, 'knight', false, null);
        vi.spyOn(terrain, 'getRegion').mockImplementation((x, z) => {
            if (x === 10 && z === 10) return 1;
            if (x === 12 && z === 12) return 2;
            return 1;
        });
        terrain.grid[10][10] = { regionId: 1, height: 10 };
        terrain.grid[12] = [];
        terrain.grid[12][12] = { regionId: 2, height: 10 };

        // Case 1: Melee knight -> Blocked (strictly region-based)
        unit.isRanged = false;
        unit.attackRange = 1.0;
        expect(unit.isReachable(12, 12)).toBe(false);

        // Case 2: Ranged unit -> Allowed if within range
        unit.isRanged = true;
        unit.attackRange = 5.0; // Dist to (12,12) is ~2.8
        expect(unit.isReachable(12, 12)).toBe(true);

        // Case 3: Ranged unit -> Blocked if beyond range
        unit.attackRange = 1.0;
        expect(unit.isReachable(12, 12)).toBe(false);
    });
});