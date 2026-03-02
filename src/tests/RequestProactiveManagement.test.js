import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game';
import { Entity } from '../Entity';
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
        Entity.nextId = 0;

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

        game = new Game(null, terrainMock, true);
        game.simTotalTimeSec = 100;

        const mockScene = new THREE.Scene();
        unit = new Unit(mockScene, terrainMock, 10, 10, 'worker');
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

    it('should block cross-region even if manual, but allow for ranged units', () => {
        terrainMock.grid[10][10].regionId = 1;
        terrainMock.grid[12][12].regionId = 0; // Different region, very close
        terrainMock.isAdjacentToRegion.mockReturnValue(false);

        // Case 1: Manual worker -> Still blocked (strictly region-based)
        unit.isRanged = false;
        unit.attackRange = 1.0;
        expect(unit.isReachable(12, 12)).toBe(false);

        // Case 2: Ranged entity -> Allowed if within attackRange
        unit.isRanged = true;
        unit.attackRange = 5.0; // Dist to (12,12) is ~2.8
        expect(unit.isReachable(12, 12)).toBe(true);

        // Case 3: Ranged entity -> Blocked if beyond attackRange
        unit.attackRange = 1.0;
        expect(unit.isReachable(12, 12)).toBe(false);
    });
});
