
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
        this.pathfindingCalls = 0;

        // Initialize simple grid
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

    getRegion(x, z) {
        return this.grid[x][z].regionId;
    }

    getRandomPointInRegion(regionId, cx, cz, radius) {
        // Return a deterministic point for testing if region matches
        if (regionId === 1) return { x: 50, z: 50 }; // Valid point
        return null;
    }

    findBestTarget(type, x, z, range, callback) {
        // Simple mock for search
        return null;
    }

    findPath(sx, sz, tx, tz) {
        return [{ x: tx, z: tz }];
    }

    checkFlatArea(x, z, size) {
        return false; // Force build failure for Migration Test
    }

    addBuilding(type, x, z) {
        // Mock add
    }

    registerEntity(entity, x, z, type) {
        // Mock register
    }

    unregisterEntity(entity) {
        // Mock unregister
    }
}


describe('Squad AI & Region Logic', () => {
    let game;
    let terrain;
    let scene;

    beforeEach(() => {
        game = new MockGame();
        // Global injection needed for Unit.js
        window.game = game;

        terrain = new MockTerrain();
        // Mock Scene object properly
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

        // Create two units in the same squad
        const unitA = new Unit(scene, terrain, 10, 10, 'knight', false, squadId);
        const unitB = new Unit(scene, terrain, 20, 20, 'knight', false, squadId);

        // Unit A spots an enemy
        const enemy = { id: 99, gridX: 50, gridZ: 50 };
        unitA.reportEnemy(enemy);

        // Verify Squad info updated
        const squad = game.getSquad(squadId);
        expect(squad.target).toEqual(expect.objectContaining({ x: 50, z: 50 }));

        // Unit B checks for squad orders
        // Mock isReachable to allow
        unitB.isReachable = vi.fn().mockReturnValue(true);

        const found = unitB.findRaidTarget();
        expect(found).toBe(true);
        expect(unitB.targetRaidPoint).toEqual(expect.objectContaining({ x: 50, z: 50 }));
    });

    it('Regression: Migration Stagnation Fix (Knight)', () => {
        // Knight migrates. Fails to build (naturally). Should revert to Idle.
        const unit = new Unit(scene, terrain, 10, 10, 'knight', false, null);

        // Setup Migration State
        unit.action = 'Migrating';
        unit.migrationTarget = { x: 30, z: 30 };
        unit.gridX = 30; // Manually arrive
        unit.gridZ = 30;

        // Execute onMoveFinished
        unit.onMoveFinished(1000);

        // Expect Idle
        expect(unit.action).toBe('Idle');
        expect(unit.migrationTarget).toBeNull();
    });

    it('Regression: Migration Stagnation Fix (Worker)', () => {
        // Worker migrates. Fails to build (mock checkFlatArea=false). Should Retry (MoveRandomly -> Moving) or Idle fallback.
        const unit = new Unit(scene, terrain, 10, 10, 'worker', false, null);

        unit.action = 'Migrating';
        unit.migrationTarget = { x: 30, z: 30 };
        unit.gridX = 30;
        unit.gridZ = 30;

        // Mock moveRandomly to simulate failure to start moving
        const moveSpy = vi.spyOn(unit, 'moveRandomly').mockImplementation(() => {
            // Do nothing. isMoving remains false.
        });

        unit.onMoveFinished(1000);

        expect(moveSpy).toHaveBeenCalled();
        // Should trigger Safety Force Idle
        expect(unit.action).toBe('Idle');
    });
    it('should allow cross-region movement if target is very close (Self Defense)', () => {
        const unit = new Unit(scene, terrain, 10, 10, 'knight', false, null);

        // Mock Regions
        // Unit is at 10,10 (Region 1 mocked by default)

        // Target at 12,12 (Distance ~2.8) -> Should allow even if region differs
        // Mock getRegion to return diff for 12,12
        vi.spyOn(terrain, 'getRegion').mockImplementation((x, z) => {
            if (x === 10 && z === 10) return 1;
            if (x === 12 && z === 12) return 2; // Different Region
            return 1;
        });

        // Mock Grid Access (Actor uses this.terrain.grid direct access)
        terrain.grid[10][10] = { regionId: 1, height: 10 };
        terrain.grid[12] = [];
        terrain.grid[12][12] = { regionId: 2, height: 10 };

        // Act
        const reachable = unit.isReachable(12, 12);

        // Assert
        expect(reachable).toBe(true);

        // Far target (Distance > 5) -> Should fail
        terrain.grid[20] = [];
        terrain.grid[20][20] = { regionId: 2, height: 10 };
        const farReachable = unit.isReachable(20, 20); // Dist ~14

        expect(farReachable).toBe(false);
    });
});
