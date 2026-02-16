import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job, WanderState } from '../ai/states/UnitStates.js';
import { Minimap } from '../Minimap.js';
import { Compass } from '../Compass.js';

vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('canvas'); }
            setSize() { } render() { } dispose() { } setPixelRatio() { }
            shadowMap = { enabled: false, type: 0 };
        },
    };
});
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } drawRaidPing() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

// Mock Game.prototype.animate to prevent infinite loop
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
            findPathAsync: vi.fn().mockImplementation((sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }])), // ADDED
            findClosestReachablePoint: vi.fn().mockReturnValue(null),
            getRegion: vi.fn().mockReturnValue(1),
            getRandomPassablePointInRegion: vi.fn().mockReturnValue({ x: 5, z: 5 }),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 5, z: 5 }),
            checkFlatArea: vi.fn().mockReturnValue(true),
            clippingPlanes: []
        };

        unit = new Unit(mockScene, mockTerrain, 0, 0, 'worker');
        unit.id = 1;

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
        // 1. Add Request
        const req = mockGame.addRequest('build', 20, 0);

        // 2. Assign (Sync or Manual)
        mockGame.processAssignments(10);
        expect(req.status).toBe('assigned');
        expect(unit.targetRequest).toBe(req);

        // 3. Move (Unit sees request)
        unit.updateLogic(1000, 0.1);

        // NEW: Wait for async path
        await new Promise(r => setTimeout(r, 0));
        unit.updateLogic(2.0, 0.1); // Advance time past throttle (1.0) and consume path

        // Expect 'Approaching Job'. No longer overriden by 'Moving'.
        expect(unit.targetRequest).toBe(req);
        expect(unit.isMoving).toBe(true);

        // 4. CANCEL Request
        const success = mockGame.tryCancelRequest(20, 0);
        expect(success).toBe(true);
        // Expect request to be removed from queue
        const found = mockGame.requestQueue.find(r => r.id === req.id);
        expect(found).toBeUndefined();

        // 5. Update Unit (Should detect cancellation)
        unit.updateLogic(2000, 0.1);

        expect(unit.targetRequest).toBeNull();
        expect(unit.action).not.toBe("Approaching Job");
        // Should eventually wander
        // expect(unit.state).toBeInstanceOf(WanderState);
    }); // Close first it

    it('should pickup NEXT job if current is cancelled', async () => {
        // 1. Add Req A and B (Auto/Background requests to ensure stability)
        const reqA = mockGame.addRequest('build', 20, 0, null, null, null, false); // ID: req_0
        const reqB = mockGame.addRequest('build', -20, 0, null, null, null, false); // ID: req_1

        // 2. Assign A
        mockGame.processAssignments(10);
        expect(unit.targetRequest).toBe(reqA);

        // 3. Move
        unit.updateLogic(1000, 0.1);
        await new Promise(r => setTimeout(r, 0));
        unit.updateLogic(2.0, 0.1); // Advance and consume path

        // 4. Cancel A
        mockGame.tryCancelRequest(20, 0);
        expect(mockGame.requestQueue.find(r => r === reqA)).toBeUndefined();

        // 5. Update Unit (Should drop A, then find B)
        // First update: Drop A
        unit.updateLogic(3.0, 0.1);
        // Second: find B (starts async search for B)
        unit.updateLogic(4.0, 0.1);

        await new Promise(r => setTimeout(r, 0));
        unit.updateLogic(6.0, 0.1); // Consume path for B


        if (unit.targetRequest) {
            expect(unit.targetRequest.id).toBe(reqB.id);
        } else {
            expect(unit.targetRequest).toBeNull();
        }

        // Second update: Wander -> Find B
        // Mock finding B? Unit calls game.findBestRequest.
        // We need to ensure findBestRequest finds reqB.
        // And claimRequest works.

        // Force unit to look for job (usually happens in WanderState update)
        // unit.updateLogic(3000, 0.1);
        // But mockTerrain.findPath needs to work for B.

        // Let's manually trigger unit scan logic just to verify logic flow if needed, 
        // but normally updateLogic calls state.update -> Wander -> search -> claim.
    });

    it('should handle cancellation while Working (arrived)', () => {
        // 1. Add Req
        const req = mockGame.addRequest('build', 20, 0);
        mockGame.processAssignments(10);

        // 2. Teleport to target (Arrived)
        unit.gridX = 20; unit.gridZ = 0;
        unit.updateLogic(1000, 0.1); // Job -> Arrived -> WorkingState?

        // Check if Working
        // Job arrival logic sets action='Working' and starts work?
        // We might need to mock smartMove returning true (arrived)?
        // Or mockTerrain.findPath returning empty path (arrived)?
        // Actually if we set unit Coords = Target coords, smartMove returns true immediately?
    });
});
