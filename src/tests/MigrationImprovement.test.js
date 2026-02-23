
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';

// Mocks
class MockTerrain {
    constructor() {
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.grid = [];
        for (let x = 0; x < 100; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                this.grid[x][z] = { height: 10, hasBuilding: false };
            }
        }
        this.buildings = [];
    }
    getTileHeight(x, z) { return 1; }
    getInterpolatedHeight(x, z) { return 1; }
    registerEntity() { }
    unregisterEntity() { }
    addBuilding() { return true; }
    checkBuildingSpace() { return true; }
    findBestTarget() { return null; }
    modifyMoisture() { }
    getRegion(x, z) { return 1; }
    getRandomPointInRegion(regionId, x, z, range) { return { x: 50, z: 50 }; }
    findPath(sx, sz, tx, tz) { return [{ x: tx, z: tz }]; }
    findPathAsync(sx, sz, tx, tz) { return Promise.resolve(this.findPath(sx, sz, tx, tz)); }
}

const mockScene = { add: () => { }, remove: () => { } };

describe('Migration Improvements', () => {
    let unit, terrain;

    beforeEach(() => {
        terrain = new MockTerrain();
        unit = new Unit(mockScene, terrain, 50, 50, 'worker');
        unit.id = 'test-migrant';
        unit.moveInterval = 0;
        unit.game = {
            battleMemory: { reportRaid: () => { } },
            simTotalTimeSec: 0,
            findBestRequest: () => null,
            claimRequest: () => false,
            requestQueue: []
        };
    });

    it('should retry migration after 30 seconds timeout', () => {
        const randSpy = vi.spyOn(Math, 'random').mockReturnValue(0.99);
        unit.migrate(0);
        unit.migrationTarget = { x: 80, z: 80 };
        unit.action = 'Migrating';

        // < 30s
        unit.updateLogic(10, 10.0, false, [], [], []);
        expect(unit.action).toBe('Migrating');

        // > 30s
        unit.updateLogic(40, 25.0, false, [], [], []);
        expect(unit.migrationTimer).toBe(0);
        expect(unit.action).toBe('Migrating');

        randSpy.mockRestore();
    });

    it('should interrupt migration if enemy is found (Priority)', () => {
        unit.migrate(0);
        unit.migrationTarget = { x: 80, z: 80 };
        unit.action = 'Migrating';

        unit.checkSelfDefense = vi.fn().mockImplementation(() => {
            unit.targetGoblin = { id: 'enemy', isDead: false, gridX: 60, gridZ: 60 };
            return true;
        });

        const randSpy = vi.spyOn(Math, 'random').mockReturnValue(0.01);

        unit.updateLogic(1, 1.0, false, [], [], []);
        unit.updateLogic(2, 1.0, false, [], [], []);

        expect(unit.action).toBe('Chasing');
        expect(unit.migrationTarget).toBeNull();

        randSpy.mockRestore();
    });

    it('should stop migrating if construction succeeds', () => {
        unit.migrate(0);
        unit.migrationTarget = { x: 80, z: 80 };
        unit.action = 'Migrating';

        vi.spyOn(unit, 'buildFarm').mockReturnValue(true);

        if (unit.buildFarm()) {
            unit.action = 'Idle';
            unit.migrationTarget = null;
        }

        expect(unit.action).toBe('Idle');
        expect(unit.migrationTarget).toBeNull();
    });

    it('DEBUG: should log blockage reasons correctly', () => {
        terrain.grid[21][20] = { height: 10, hasBuilding: false };
        terrain.grid[20][20] = { height: 1, hasBuilding: false };

        terrain.getTileHeight = (x, z) => {
            return (terrain.grid[x] && terrain.grid[x][z]) ? terrain.grid[x][z].height : 1;
        };

        unit.gridX = 20;
        unit.gridZ = 20;

        const slopeResult = unit.canMoveTo(21, 20);
        expect(slopeResult).toBe(false);

        terrain.grid[22][20] = { height: 0, hasBuilding: false };
        const waterResult = unit.canMoveTo(22, 20);
        expect(waterResult).toBe(false);
    });
});