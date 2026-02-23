
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';

vi.mock('../Minimap.js', () => ({
    Minimap: class {
        update() { }
        drawRaidPing() { }
    }
}));

vi.mock('../CloudManager.js', () => ({
    CloudManager: class {
        update() { }
        draw() { }
    }
}));

vi.mock('../BuildingRenderer.js', () => ({
    BuildingRenderer: class {
        constructor() { }
        init() { return Promise.resolve(); }
        update() { }
        draw() { }
        dispose() { }
        updateLighting() { }
    }
}));

vi.mock('../Compass.js', () => ({
    Compass: class {
        update() { }
        draw() { }
    }
}));

vi.mock('../Unit.js', async (importOriginal) => {
    const actual = await importOriginal();
    actual.Unit.createFaceTexture = () => ({});
    actual.Unit.createWoodTexture = () => ({});
    actual.Unit.createHairTexture = () => ({});
    return actual;
});

vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });

describe('Job Assignment Idempotency', () => {
    let mockGame;
    let mockUnit;
    let mockJob;

    beforeEach(() => {
        const mockScene = {
            add: vi.fn(),
            getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }),
            remove: vi.fn(),
            background: new THREE.Color()
        };
        const mockTerrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: vi.fn().mockReturnValue(10),
            logicalWidth: 100,
            logicalDepth: 100,
            grid: Array(100).fill(null).map(() => Array(100).fill(null).map(() => ({ regionId: 1, height: 10, hasBuilding: false }))),
            buildings: [],
            isReachable: vi.fn().mockReturnValue(true),
            findPath: vi.fn().mockImplementation((x1, y1, x2, y2) => [{ x: x2, z: y2 }]),
            pathfindingCalls: 0,
            checkFlatArea: vi.fn().mockReturnValue(true),
            moveEntity: vi.fn(),
            addBuilding: vi.fn().mockImplementation((type, x, z) => {
                const b = { userData: { type, gridX: x, gridZ: z, population: 0 } };
                mockTerrain.buildings.push(b);
                return b;
            }),
            removeBuilding: vi.fn(),
            initTerrain: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            isAdjacentToRegion: vi.fn().mockReturnValue(true),
            getBuildingSize: vi.fn().mockReturnValue(1),
            clippingPlanes: [],
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 0 }]),
            checkYield: () => Promise.resolve(),
            getWidth: () => 100,
            getDepth: () => 100,
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn()
        };

        mockUnit = new Unit(mockScene, mockTerrain, 0, 0, 'worker');
        mockUnit.id = 1;
        mockJob = { id: 101, x: 20, z: 0, type: 'build', status: 'pending' };
        mockGame = new Game(mockScene, mockTerrain);
        mockGame.units = [mockUnit];
        mockGame.requestQueue = [mockJob];

        // Suppress alert in tests
        window.alert = vi.fn();
    });

    afterEach(() => {
        window.game = null;
        vi.clearAllMocks();
    });

    it('should NOT reset movement if claiming the same job twice', () => {
        let success1 = mockGame.claimRequest(mockUnit, mockJob);

        expect(success1).toBe(true);
        expect(mockUnit.targetRequest).toBe(mockJob);
        expect(mockJob.status).toBe('assigned');
        expect(mockJob.assignedTo).toBe(mockUnit.id);

        mockUnit.isMoving = true;
        mockUnit.moveStartTime = 1000;
        mockUnit.action = "Approaching Job";

        const success2 = mockGame.claimRequest(mockUnit, mockJob);

        expect(success2).toBe(true);
        expect(mockUnit.isMoving).toBe(true);
        expect(mockUnit.moveStartTime).toBe(1000);
        expect(mockUnit.action).toBe("Approaching Job");
    });
});