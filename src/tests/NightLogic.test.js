
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js'; // Adjust path if needed
// Mock Three.js and Globals
global.window = { game: {} };
global.document = {
    getElementById: () => ({ innerText: '', style: {} }),
    createElement: () => ({ getContext: () => ({ drawImage: () => { }, clearRect: () => { }, fillRect: () => { } }) })
};

// Mock THREE
const mockVector3 = { set: () => { }, copy: () => { }, clone: () => ({ sub: () => ({ length: () => 10 }) }) };
vi.mock('three', () => ({
    Vector3: class { constructor() { return mockVector3; } },
    Group: class { constructor() { this.position = mockVector3; this.add = () => { }; this.remove = () => { }; } },
    Mesh: class { constructor() { this.position = mockVector3; this.material = { color: { setHex: () => { } } }; } },
    BoxGeometry: class { translate() { } dispose() { } },
    SphereGeometry: class { translate() { } dispose() { } },
    CylinderGeometry: class { translate() { } dispose() { } },
    ConeGeometry: class { translate() { } dispose() { } },
    MeshStandardMaterial: class { dispose() { } },
    CanvasTexture: class { dispose() { } }
}));

describe('Night Logic - Shelter Entry', () => {
    let output = [];
    const scene = new (require('three').Group)();

    // Mock Terrain
    // Mock Terrain
    const terrain = {
        logicalWidth: 20,
        logicalDepth: 20,
        getTileHeight: () => 10,
        getInterpolatedHeight: () => 10,
        grid: [], // Will populate
        buildings: [],
        registerEntity: () => { },
        unregisterEntity: () => { },
        moveEntity: () => { },
        getVisualPosition: () => ({ x: 0, y: 0, z: 0 })
    };

    // Init Grid
    for (let x = 0; x < 20; x++) {
        terrain.grid[x] = [];
        for (let z = 0; z < 20; z++) {
            terrain.grid[x][z] = { hasBuilding: false, building: null };
        }
    }

    // Helpers
    const placeHouse = (x, z) => {
        const house = {
            type: 'house',
            gridX: x,
            gridZ: z,
            userData: { hp: 100, gridX: x, gridZ: z, type: 'house' }
        };
        terrain.grid[x][z].hasBuilding = true;
        terrain.grid[x][z].building = house;
        terrain.buildings.push(house);
        return house;
    };

    it('Worker should engage pathfinding to House but is likely blocked', () => {
        // Setup
        const u1 = new Unit(scene, terrain, 0, 0, 'worker');
        u1.moveInterval = 0; // Immediate
        u1.lastTime = 0;

        // Place House at 1,0 (Adjacent)
        const house = placeHouse(1, 0);
        u1.homeBase = house;

        // Is Night
        const isNight = true;
        const time = 1000;

        // Run Logic
        u1.updateLogic(time, 100, isNight, [], [], [], []);

        // Expectation:
        // 1. Action should be 'Going Home' (triggerMove preserves non-Idle actions)
        expect(u1.action).toBe('Going Home');

        // 2. Unit SHOULD be moving (if blocked, isMoving would be false)
        expect(u1.isMoving).toBe(true);
        expect(u1.targetGridX).toBe(1);

        // Simulate Move Completion
        u1.gridX = 1; u1.gridZ = 0; u1.isMoving = false;

        // Run Logic Again (Inside House)
        u1.updateLogic(time + 2000, 100, isNight, [], [], [], []);

        // Expectation: Sleeping
        expect(u1.isSleeping).toBe(true);
    });
});
