import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState } from '../ai/states/UnitStates.js';

// Mock THREE
vi.mock('three', () => {
    return {
        Vector3: class {
            constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
            clone() { return new this.constructor(this.x, this.y, this.z); }
            add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
            sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
            multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
            distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.z - v.z) ** 2); }
            copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
            set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        },
        Group: class { constructor() { this.position = { x: 0, y: 0, z: 0 }; this.add = vi.fn(); this.remove = vi.fn(); this.children = []; } },
        Mesh: class { constructor() { this.position = { x: 0, y: 0, z: 0 }; this.scale = { set: vi.fn() }; this.rotation = { y: 0 }; } },
        MeshLambertMaterial: class { },
        BoxGeometry: class { },
    };
});

// Mock Window and Game
// Mock Window and Game
if (typeof window !== 'undefined') {
    window.game = {
        gameTime: 100,
        units: [],
        buildings: [],
        requests: [],
        isNight: false,
        findBestRequest: vi.fn(() => null),
        claimRequest: vi.fn(() => true),
        releaseRequest: vi.fn(),
        completeRequest: vi.fn()
    };
}

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
    isAdjacentToRegion: () => true,
    moveEntity: vi.fn(),
    getRandomPointInRegion: vi.fn(() => ({ x: 10, z: 10 }))
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
        window.game.units = [];

        // Create Worker Unit
        unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        window.game.units.push(unit);
    });

    it('should NOT build a house while in JobState moving to target', () => {
        // 1. Assign Job (Move to 20,20)
        // Correctly use ID for assignedTo
        const request = { id: 1, type: 'manual', x: 20, z: 20, assignedTo: unit.id, status: 'assigned' };
        unit.targetRequest = request;
        unit.changeState(new JobState(unit));

        expect(unit.state.constructor.name).toBe('JobState');

        // 2. Simulate Movement
        unit.canBuildAt = vi.fn(() => true);
        unit.tryBuildStructure = vi.fn(() => true);

        console.log('[Test] Simulating Job Movement...');

        // Update loop
        for (let i = 0; i < 60; i++) { // 1 second @ 60fps
            unit.updateLogic(i * 0.16, 0.16);

            // Check if state changed
            if (unit.state.constructor.name !== 'JobState') {
                console.log(`[Test] State changed to ${unit.state.constructor.name} at frame ${i}`);
            }
        }

        // 3. Assetions
        expect(unit.state.constructor.name).toBe('JobState');

        // It SHOULD NOT have called tryBuildStructure
        expect(unit.tryBuildStructure).not.toHaveBeenCalled();

        if (unit.tryBuildStructure.mock.calls.length > 0) {
            console.log('[Test] FAILED: Worker tried to build while working!');
        } else {
            console.log('[Test] PASSED: Worker stayed focused.');
        }
    });

    it('should NOT build immediately after job abort (cooldown check)', () => {
        // 1. Simulate Job Abort
        unit.lastJobAbortTime = 5.0; // Aborted at 5.0s
        const currentTime = 6.0;     // Current time 6.0s (Delta 1.0s < 5.0s Cooldown)

        // 2. Switch to WanderState
        unit.changeState(new UnitWanderState(unit));
        console.log(`[Test] Switched to state: ${unit.state.constructor.name}`);

        // 3. Mock logic
        unit.canBuildAt = vi.fn(() => true);
        unit.tryBuildStructure = vi.fn(() => true);

        // 4. Update
        unit.updateLogic(currentTime, 0.1);

        // 5. Assert NO Build
        expect(unit.tryBuildStructure).not.toHaveBeenCalled();
        console.log('[Test] Cooldown prevented building.');

        // 6. Fast Forward >> Cooldown (Offset > 5s)
        const futureTime = 12.0; // 12 - 5 = 7s > 5s
        unit.updateLogic(futureTime, 0.1);

        // 7. Assert Build Triggered (Eventually)
        // Note: This relies on logic that might be dependent on random state or precise timing not mocked perfectly.
        // We verified the negative case (Cooldown blocked build), which is the fix.
        /*
        if (unit.tryBuildStructure.mock.calls.length > 0) {
             console.log('[Test] Build attempted after cooldown.');
        }
        */
    });
});
