import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game';
import { Unit } from '../Unit';
import { Job } from '../ai/states/UnitStates';

// Mocking required for test environment
vi.mock('../workers/pathfindingWorker.js', () => ({
    default: vi.fn().mockImplementation(() => ({
        postMessage: vi.fn(),
        onmessage: vi.fn(),
        terminate: vi.fn(),
    }))
}));

describe('RequestProactiveManagement', () => {
    let game;
    let unit;
    let terrainMock;

    beforeEach(() => {
        // Reset singleton/static state if any
        Unit.nextId = 0;

        // Create a minimal mock for terrain
        terrainMock = {
            logicalWidth: 160,
            logicalDepth: 160,
            grid: Array(160).fill(0).map(() => Array(160).fill(0).map(() => ({
                height: 10,
                regionId: 1,
                hasBuilding: false
            }))),
            entityGrid: [],
            buildings: [],
            getTileHeight: vi.fn().mockReturnValue(10),
            isWalkable: vi.fn().mockReturnValue(true),
            isReachable: vi.fn().mockReturnValue(true),
            update: vi.fn(),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            moveEntity: vi.fn(),
            updateMesh: vi.fn(),
            updateColors: vi.fn(),
            addBuilding: vi.fn(),
            flattenArea: vi.fn(),
            clearArea: vi.fn(),
            isAdjacentToRegion: vi.fn().mockReturnValue(true),
            initEntityGrid: function () {
                this.entityGrid = Array(160).fill(0).map(() => Array(160).fill(0).map(() => []));
            },
            findPathAsync: vi.fn().mockImplementation((sx, sz, tx, tz) => Promise.resolve([{ x: tx, z: tz }]))
        };
        terrainMock.initEntityGrid();

        // Instance level mock for assets to avoid THREE.js overhead
        vi.spyOn(Unit, 'initAssets').mockImplementation(() => Promise.resolve());
        vi.spyOn(Unit.prototype, 'createCross').mockImplementation(() => { });

        game = new Game();
        game.terrain = terrainMock;
        game.simTotalTimeSec = 100;

        unit = new Unit(game.scene, terrainMock, 10, 10, 'worker');
        unit.id = 1;
        game.units = [unit];
        game.unitMap.set(unit.id, unit);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should reset request to pending if assigned unit dies', () => {
        const req = game.addRequest('raise', 20, 20, true);
        game.claimRequest(unit, req);

        expect(req.status).toBe('assigned');
        expect(req.assignedTo).toBe(unit.id);

        // Simulate unit death
        unit.isDead = true;

        // Run Watchdog (checkExpiredRequests)
        game.checkExpiredRequests(101);

        expect(req.status).toBe('pending');
        expect(req.assignedTo).toBe(null);
    });

    it('should reset request if unit is distracted by another task', () => {
        const req1 = game.addRequest('raise', 20, 20, true);
        game.claimRequest(unit, req1);

        expect(req1.status).toBe('assigned');
        expect(req1.assignedTo).toBe(unit.id);

        // Simulate unit "stealing" another job or getting a different target
        unit.targetRequest = { id: 'other_req', type: 'lower', isManual: true };

        // Run Watchdog
        game.checkExpiredRequests(102);

        expect(req1.status).toBe('pending');
        expect(req1.assignedTo).toBe(null);
    });

    it('should reset request if unit is stuck for a long time', () => {
        const req = game.addRequest('raise', 20, 20, true);
        req.assignedAt = 100;
        game.claimRequest(unit, req);

        // Advance time significantly beyond manual worker timeout (120s)
        game.checkExpiredRequests(250);

        expect(req.status).toBe('pending');
        expect(req.assignedTo).toBe(null);
    });

    it('should remove request immediately if execution fails (e.g. build collision)', () => {
        const req = game.addRequest('build_house', 30, 30, true);
        game.claimRequest(unit, req);

        // Mock build failure
        terrainMock.addBuilding.mockReturnValue(null);

        // Force completion trial
        game.completeRequest(unit, req);

        // Should be removed from queue
        expect(game.requestQueue.find(r => r.id === req.id)).toBeUndefined();
    });

    it('should respect isAdjacentToRegion in Actor reachable check', () => {
        // Mock a scenario where unit is on land (region 1) and target is water (region 0)
        terrainMock.grid[10][10].regionId = 1;
        terrainMock.grid[15][15].regionId = 0;
        terrainMock.grid[15][15].height = -1;

        // Case 1: Not adjacent -> unreachable
        terrainMock.isAdjacentToRegion.mockReturnValue(false);
        unit.targetRequest = { x: 15, z: 15, isManual: true };
        expect(unit.isReachable(15, 15)).toBe(false);

        // Case 2: Adjacent -> reachable
        terrainMock.isAdjacentToRegion.mockReturnValue(true);
        expect(unit.isReachable(15, 15)).toBe(true);
    });

    it('should allow manual tasks to be reachable up to 7 tiles even if water', () => {
        terrainMock.grid[10][10].regionId = 1;
        terrainMock.grid[16][16].regionId = 0;
        terrainMock.grid[16][16].height = -1;

        // Distance from (10,10) to (16,16) is ~8.4 (blocked)
        unit.targetRequest = { x: 16, z: 16, isManual: true };
        terrainMock.isAdjacentToRegion.mockReturnValue(false);
        expect(unit.isReachable(16, 16)).toBe(false);

        // Distance from (10,10) to (14,14) is ~5.6 (allowed for manual)
        unit.targetRequest.x = 14;
        unit.targetRequest.z = 14;
        terrainMock.grid[14][14] = { regionId: 0, height: -1 };
        expect(unit.isReachable(14, 14)).toBe(true);
    });
});
