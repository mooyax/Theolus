import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoblinManager } from '../GoblinManager.js';
import { Goblin } from '../Goblin.js';
import { Raid, Wander } from '../ai/states/GoblinStates.js';
import { MockGame, MockTerrain } from './TestHelper';
import * as THREE from 'three';

describe('Goblin Raid Expiry Persistence', () => {
    let game;
    let goblinManager;
    let mockTerrain;
    let mockScene;

    beforeEach(() => {
        game = new MockGame();
        mockScene = game.scene;
        mockTerrain = new MockTerrain(100, 100);
        game.terrain = mockTerrain;
        
        window.game = game;

        goblinManager = new GoblinManager(mockScene, mockTerrain, game, []);
        // Clear any auto-generated caves/clans to start fresh
        goblinManager.clans = {};
        goblinManager.caves = [];

        game.goblinManager = goblinManager;
    });

    it('should serialize and deserialize raidGoal timestamp', () => {
        // 1. Create Goblin in RaidState with explicit Timestamp
        const goblin = new Goblin(mockScene, mockTerrain, 10, 10, 'normal');
        goblin.id = 1;
        const raidGoal = { x: 50, z: 50, timestamp: 40.0 }; // Old timestamp
        goblin.raidGoal = raidGoal;
        goblin.changeState(new Raid(goblin));
        game.entityManager.register(goblin);

        // 2. Serialize
        const data = goblinManager.serialize();

        // 3. Deserialize
        const newManager = new GoblinManager(mockScene, mockTerrain, game, []);
        newManager.deserialize(data);
        const restoredGoblin = newManager.goblins[0];

        // 4. Verification
        expect(restoredGoblin).toBeDefined();
        expect(restoredGoblin.state.constructor.name).toBe('Raid');
        expect(restoredGoblin.raidGoal).toBeDefined();
        expect(restoredGoblin.raidGoal.x).toBe(50);
        expect(restoredGoblin.raidGoal.timestamp).toBe(40.0);
    });

    it('should expire RaidState after load if timestamp is preserved', () => {
        // Setup serialized data with timestamp (simulating proper save)
        const savedData = {
            clans: [],
            goblins: [{
                id: 99, x: 10, z: 10, type: 'normal', state: 'Raid',
                raidGoal: { x: 50, z: 50, timestamp: 10.0 } 
            }]
        };

        goblinManager.deserialize(savedData);
        const goblin = goblinManager.goblins[0];

        // Pre-update check
        expect(goblin.state.constructor.name).toBe('Raid');

        // Update
        game.simTotalTimeSec = 100.0;
        goblin.state.update(100.0, 0.1, [], []);

        // Should switch to Wander because 100 - 10 > 60
        expect(goblin.state.constructor.name).toBe('Wander');
    });
});