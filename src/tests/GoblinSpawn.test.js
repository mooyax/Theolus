
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoblinManager } from '../GoblinManager.js';
import * as THREE from 'three';

// Mock Three.js
global.THREE = THREE;

describe('Goblin Hut Spawning', () => {
    let goblinManager;
    let mockScene;
    let mockTerrain;
    let mockGame;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        mockTerrain = {
            buildings: [],
            checkBuildingIntegrity: vi.fn(),
            getInterpolatedHeight: () => 0,
            logicalWidth: 100, logicalDepth: 100
        };

        // Mock Game
        mockGame = {
            units: [],
            scene: mockScene
        };
        global.window = { game: mockGame };

        goblinManager = new GoblinManager(mockScene, mockTerrain);
        // Force low cap for testing if needed, or check default
        // goblinManager.MAX_GOBLINS is typically 300
    });

    it('should spawn goblin when hut population reaches 10', () => {
        // Setup a Hut
        const hut = {
            userData: {
                type: 'goblin_hut',
                population: 9.9,
                gridX: 10,
                gridZ: 10,
                id: 'hut_1'
            }
        };
        mockTerrain.buildings = [hut];

        // Mock spawnGoblinAtCave to detect success
        // We need to spy on it, but it's a method of the same instance.
        const spawnSpy = vi.spyOn(goblinManager, 'spawnGoblinAtCave');
        spawnSpy.mockImplementation(() => true); // Simulate success

        // Update with enough time for growth
        // Growth ~ 1.0 * rate * dt. rate depends on 'goblins.length' (growthRate logic)
        // Let's force growth.
        // check code: const growthRate = (1.0 + (this.goblins.length / 50)); 
        // If 0 goblins, rate is 1.0.

        const deltaTime = 1.0; // Should add ~1.0 pop -> 10.9
        goblinManager.updateHuts(deltaTime);

        expect(hut.userData.population).toBeLessThan(10); // Should reset (subtract 10)
        expect(spawnSpy).toHaveBeenCalled();
    });

    it('should NOT spawn if Global Cap is reached', () => {
        // Setup Hut
        const hut = {
            userData: { type: 'goblin_hut', population: 9.9, gridX: 10, gridZ: 10 }
        };
        mockTerrain.buildings = [hut];

        // Fill Global Cap
        goblinManager.goblins = Array(300).fill({}); // Simulate 300 goblins

        const spawnSpy = vi.spyOn(goblinManager, 'spawnGoblinAtCave');

        goblinManager.updateHuts(1.0);

        expect(spawnSpy).not.toHaveBeenCalled();
        expect(hut.userData.population).toBeLessThan(10); // Logic says: "Cap reached... Just ignore spawn."
        // Wait, if it returns, does it subtract population?
        // Code line 314: "return;" immediately.
        // But subtraction (line 308) happens BEFORE check?
        // Let's verify that too. If it mistakenly consumes pop without spawning, that's a "silent fail".
        // Or if it subtracts and fails, it's just "loss".
        // If the code is:
        // if (pop >= 10) { pop -= 10; if (cap) return; ... }
        // Then pop consumes, but no spawn.
    });

    it('should retry if spawn fails due to location?', () => {
        // Current logic:
        // this.spawnGoblinAtCave(fakeCave);
        // If this returns false (blocked), is pop restored?
        // Looking at code: it just calls it. No return value check.
        // So pop is lost if spawn fails.
        // This explains "nothing happens" -> Pop consumed, spawn failed (blocked?), nothing appears.
    });

});
