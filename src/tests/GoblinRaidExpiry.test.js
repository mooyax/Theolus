import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoblinManager } from '../GoblinManager.js';
import { Goblin } from '../Goblin.js';
import { Raid, Wander } from '../ai/states/GoblinStates.js';
import * as THREE from 'three';

describe('Goblin Raid Expiry Persistence', () => {
    let goblinManager;
    let mockTerrain;
    let mockScene;

    beforeEach(() => {
        // Setup Mocks
        mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn()
        };
        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: vi.fn().mockReturnValue(5),
            getVisualOffset: vi.fn().mockReturnValue({ x: 0, y: 0 }),
            gridToWorld: (v) => v,
            addBuilding: vi.fn().mockReturnValue({ userData: { gridX: 10, gridZ: 10 } }),
            getBuildingAt: vi.fn(),
            unregisterAll: vi.fn(),
            registerEntity: vi.fn(),
            grid: Array(100).fill(null).map(() => Array(100).fill({ hasBuilding: false })),
            buildings: [],
            clippingPlanes: []
        };

        // Mock window.game for time checks and alert
        // Avoid directly stubbing 'window' global, instead assign to window.game if it exists
        if (typeof window !== 'undefined') {
            window.game = {
                simTotalTimeSec: 100,
                terrain: mockTerrain,
                units: [],
                buildings: [],
                requestQueue: [],
                releaseRequest: vi.fn(),
                checkExpiredRequests: vi.fn()
            };
        }

        // Stub global alert to prevent ReferenceError in catch block
        vi.stubGlobal('alert', vi.fn());

        // Spy on console.error to see failures
        vi.spyOn(console, 'error');

        goblinManager = new GoblinManager(mockScene, mockTerrain, {});
    });

    it('should serialize and deserialize raidGoal timestamp', () => {
        // 1. Create Goblin in RaidState with explicit Timestamp
        const goblin = new Goblin(mockScene, mockTerrain, 10, 10, 'normal');
        goblin.id = 1;
        const raidGoal = { x: 50, z: 50, timestamp: 40.0 }; // Old timestamp (60s ago)
        goblin.raidGoal = raidGoal;
        goblin.changeState(new Raid(goblin));
        goblinManager.goblins.push(goblin);

        // 2. Serialize
        const data = goblinManager.serialize();

        // Verify manually first: did we even save it?
        const serializedGoblin = data.goblins[0];
        // FAIL CONDITION expectation: serializedGoblin.rg.timestamp is likely undefined currently

        // 3. Deserialize
        const newManager = new GoblinManager(mockScene, mockTerrain, {});
        newManager.deserialize(data);
        const restoredGoblin = newManager.goblins[0];

        // 4. Verification
        expect(restoredGoblin).toBeDefined();
        expect(restoredGoblin.state.constructor.name).toBe('Raid');
        expect(restoredGoblin.raidGoal).toBeDefined();
        expect(restoredGoblin.raidGoal.x).toBe(50);

        // This is the CRITICAL Assertion
        expect(restoredGoblin.raidGoal.timestamp).toBe(40.0);
    });

    it('should expire RaidState after load if timestamp is preserved', () => {
        // Setup serialized data with timestamp (simulating proper save)
        const savedData = {
            goblins: [{
                id: 99, x: 10, z: 10, t: 'normal', s: 'Raid',
                rg: { x: 50, z: 50, ts: 10.0 } // Use 'ts' as per implementation
            }]
        };

        goblinManager.deserialize(savedData);
        const goblin = goblinManager.goblins[0];

        // Pre-update check
        expect(goblin.state.constructor.name).toBe('Raid');

        // Update
        // goblin.updateLogic(time, deltaTime)
        // We need to verify state.update handles the expiry.
        // We can call state.update directly to bypass intervals
        goblin.state.update(100.0, 0.1, [], []);

        // Should switch to Wander because 100 - 10 > 60
        expect(goblin.state.constructor.name).toBe('Wander');
    });
});
