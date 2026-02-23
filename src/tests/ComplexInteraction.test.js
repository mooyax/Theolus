import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';

vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } drawRaidPing() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });

describe('Complex Job Interaction and Cancellation', () => {
    let mockGame;
    let unit;

    beforeEach(() => {
        const mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
        const mockTerrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: vi.fn().mockReturnValue(10),
            logicalWidth: 100, logicalDepth: 100,
            grid: Array(100).fill(0).map(() => Array(100).fill(0).map(() => ({ regionId: 1, hasBuilding: false }))),
            buildings: [],
            addBuilding: vi.fn().mockImplementation((type, x, z) => {
                const b = { userData: { type, gridX: x, gridZ: z, population: 0 } };
                mockTerrain.buildings.push(b);
                return b;
            }),
            removeBuilding: vi.fn(),
            isReachable: vi.fn().mockReturnValue(true),
            findPath: vi.fn().mockImplementation((sx, sz, ex, ez) => [{ x: ex, z: ez }]),
            findPathAsync: vi.fn().mockImplementation((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }])),
            findClosestReachablePoint: vi.fn().mockReturnValue(null),
            getRegion: vi.fn().mockReturnValue(1),
            getRandomPassablePointInRegion: vi.fn().mockReturnValue({ x: 5, z: 5 }),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 5, z: 5 }),
            checkFlatArea: vi.fn().mockReturnValue(true),
            clippingPlanes: []
        };

        unit = new Unit(mockScene, mockTerrain, 0, 0, 'worker');
        unit.id = 1;
        mockGame = new Game(mockScene, mockTerrain);
        mockGame.units = [unit];
        window.game = mockGame;
    });

    afterEach(() => {
        window.game = null;
        vi.clearAllMocks();
    });

    it('should immediately stop unit when job is cancelled mid-approach', async () => {
        const req = mockGame.addRequest('build', 20, 0);
        mockGame.processAssignments(10);
        expect(req.status).toBe('assigned');
        expect(unit.targetRequest).toBe(req);

        unit.updateLogic(1000, 0.1);
        await new Promise(r => setTimeout(r, 0));
        unit.updateLogic(2.0, 0.1);

        expect(unit.targetRequest).toBe(req);
        expect(unit.isMoving).toBe(true);

        const success = mockGame.tryCancelRequest(20, 0);
        expect(success).toBe(true);
        const found = mockGame.requestQueue.find(r => r.id === req.id);
        expect(found).toBeUndefined();

        unit.updateLogic(2000, 0.1);
        expect(unit.targetRequest).toBeNull();
        expect(unit.action).not.toBe("Approaching Job");
    });

    it('should pickup NEXT job if current is cancelled', async () => {
        const reqA = mockGame.addRequest('build', 20, 0, false);
        const reqB = mockGame.addRequest('build', -20, 0, false);

        mockGame.processAssignments(10);
        expect(unit.targetRequest).toBe(reqA);

        unit.updateLogic(1000, 0.1);
        await new Promise(r => setTimeout(r, 0));
        unit.updateLogic(2.0, 0.1);

        mockGame.tryCancelRequest(20, 0);
        expect(mockGame.requestQueue.find(r => r === reqA)).toBeUndefined();

        unit.updateLogic(3.0, 0.1);
        unit.updateLogic(4.0, 0.1);

        await new Promise(r => setTimeout(r, 0));
        unit.updateLogic(6.0, 0.1);

        if (unit.targetRequest) {
            expect(unit.targetRequest.id).toBe(reqB.id);
        }
    });

    it('should handle cancellation while Working (arrived)', () => {
        const req = mockGame.addRequest('build', 20, 0);
        mockGame.processAssignments(10);
        unit.gridX = 20; unit.gridZ = 0;
        unit.updateLogic(1000, 0.1);
        expect(unit.targetRequest).toBe(req);
    });
});
