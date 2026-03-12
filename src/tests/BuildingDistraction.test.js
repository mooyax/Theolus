import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Job, Wander } from '../ai/states/UnitStates.js';

// Mock Global Window/Game
const mockGame = {
    gameTime: 100,
    entityManager: {
        units: [],
        getAllUnits: function () { return this.units; },
        register: function (u) { this.units.push(u); },
        clear: function () { this.units = []; },
        getAllGoblins: () => []
    },
    get units() { return this.entityManager.units; },
    buildings: [],
    requests: [],
    isNight: false,
    findBestRequest: vi.fn(() => null),
    claimRequest: vi.fn(() => true),
    releaseRequest: vi.fn(),
    completeRequest: vi.fn(),
    totalPopulation: 10
};
vi.stubGlobal('game', mockGame);
vi.stubGlobal('window', { game: mockGame });

const mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
const mockTerrain = {
    getTileHeight: () => 10,
    gridToWorld: (x) => x,
    getVisualOffset: () => ({ x: 0, y: 0 }),
    getBuildingSize: () => 1,
    getRegion: () => 1,
    grid: [],
    buildings: [],
    addBuilding: vi.fn((type, x, z) => ({ type, gridX: x, gridZ: z, userData: { type, gridX: x, gridZ: z } })),
    removeBuilding: vi.fn(),
    registerEntity: vi.fn(),
    unregisterEntity: vi.fn(),
    findPath: vi.fn((sx, sz, tx, tz) => [{ x: sx, z: sz }, { x: tx, z: tz }]), // Direct path
    findPathAsync: vi.fn((sx, sz, tx, tz) => Promise.resolve([{ x: sx, z: sz }, { x: tx, z: tz }])),
    isReachable: () => true,
    isAdjacentToRegion: () => true,
    moveEntity: vi.fn(),
    getRandomPointInRegion: vi.fn(() => ({ x: 10, z: 10 })),
    findBestTarget: vi.fn(() => null)
};

// Setup Grid
for (let x = 0; x < 40; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 40; z++) {
        mockTerrain.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false };
    }
}

describe('Building Distraction Bug', () => {
    let unit;

    beforeEach(() => {
        vi.clearAllMocks();
        mockTerrain.buildings = [];
        mockGame.entityManager.clear();

        // Create Worker Unit
        unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        mockGame.entityManager.register(unit);

    });
    it('should NOT build a house while in Job moving to target', () => {
        // 1. Assign Job (Move to 20,20)
        // Correctly use ID for assignedTo
        const request = { id: 1, type: 'manual', x: 20, z: 20, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = request;
        unit.changeState(new Job(unit));

        expect(unit.state.constructor.name).toBe('Job');

        // 2. Simulate Movement
        unit.canBuildAt = vi.fn(() => true);
        unit.tryBuildStructure = vi.fn(() => true);

        // Update loop
        for (let i = 0; i < 60; i++) { // 1 second @ 60fps
            unit.updateLogic(i * 0.16, 0.16);
        }

        // 3. Assetions
        expect(unit.state.constructor.name).toBe('Job');

        // It SHOULD NOT have called tryBuildStructure
        expect(unit.tryBuildStructure).not.toHaveBeenCalled();

    });
    it('should NOT build immediately after job abort (cooldown check)', () => {
        // 1. Simulate Job Abort
        unit.lastJobAbortTime = 5.0; // Aborted at 5.0s
        const currentTime = 6.0;     // Current time 6.0s (Delta 1.0s < 5.0s Cooldown)

        // 2. Switch to WanderState
        unit.changeState(new Wander(unit));

        // 3. Mock logic
        unit.canBuildAt = vi.fn(() => true);
        unit.tryBuildStructure = vi.fn(() => true);

        // 4. Update
        unit.updateLogic(currentTime, 0.1);

        // 5. Assert NO Build
        expect(unit.tryBuildStructure).not.toHaveBeenCalled();

        // 6. Fast Forward >> Cooldown (Offset > 5s)
        const futureTime = 12.0; // 12 - 5 = 7s > 5s
        unit.updateLogic(futureTime, 0.1);

    });
});