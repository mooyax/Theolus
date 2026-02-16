import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GoblinManager } from '../GoblinManager.js';

describe('Goblin Raid Threshold', () => {
    let goblinManager;
    let mockTerrain;
    let mockScene;

    beforeEach(() => {
        mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn()
        };
        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: vi.fn().mockReturnValue(5), // Valid height
            addBuilding: vi.fn().mockReturnValue({ userData: { gridX: 10, gridZ: 10 } }), // Returns valid building
            grid: Array(100).fill(null).map(() => Array(100).fill({ hasBuilding: false })),
            buildings: [],
            clippingPlanes: []
        };
        // Mock Goblin internal assets init to avoid THREE errors
        // (Assuming Goblin.initAssets handles itself or we mock it if needed)

        goblinManager = new GoblinManager(mockScene, mockTerrain, {});
        // Clear any auto-generated caves/clans to start fresh
        goblinManager.clans = {};
        goblinManager.caves = [];
    });

    it('should NOT activate raid on first aggression (1/3)', () => {
        const clanId = 'clan_test';
        const target = { x: 50, z: 50 };

        goblinManager.notifyClanActivity(clanId, target);

        const clan = goblinManager.clans[clanId];
        expect(clan).toBeDefined();
        expect(clan.aggression).toBe(1.0);
        expect(clan.active).toBe(false);
    });

    it('should activate raid on aggression threshold (15.0)', () => {
        const clanId = 'clan_test_active';
        const target = { x: 50, z: 50 };

        // Pump to 14 (Below Threshold)
        for (let i = 0; i < 14; i++) {
            goblinManager.notifyClanActivity(clanId, target);
        }
        expect(goblinManager.clans[clanId].aggression).toBe(14.0);
        expect(goblinManager.clans[clanId].active).toBe(false);

        // 15th (Activate)
        goblinManager.notifyClanActivity(clanId, target);
        expect(goblinManager.clans[clanId].aggression).toBe(15.0);
        expect(goblinManager.clans[clanId].active).toBe(true);
    });

    it('should decay aggression over time', () => {
        const clanId = 'clan_decay';
        const target = { x: 50, z: 50 };

        // Pump to 2.0
        goblinManager.notifyClanActivity(clanId, target);
        goblinManager.notifyClanActivity(clanId, target);
        const clan = goblinManager.clans[clanId];
        expect(clan.aggression).toBe(2.0);

        // Simulate 10 seconds passing
        // Decay rate is 0.1 per second (deltaTime * 0.1)
        for (let i = 0; i < 10; i++) {
            goblinManager.updateClanWaves(1.0);
        }

        // Expected: 2.0 - (10 * 0.1) = 1.0
        expect(clan.aggression).toBeCloseTo(1.0, 1);
        expect(clan.active).toBe(false);
    });

    it('should reset aggression decay if it drops below zero', () => {
        const clanId = 'clan_zero';
        goblinManager.notifyClanActivity(clanId, { x: 50, z: 50 }); // 1.0

        // Wait long time (20s -> -1.0)
        for (let i = 0; i < 20; i++) {
            goblinManager.updateClanWaves(1.0);
        }

        const clan = goblinManager.clans[clanId];
        expect(clan.aggression).toBe(0);
    });

    it('should DEACTIVATE raid state if aggression decays to zero', () => {
        const clanId = 'clan_peace';
        const target = { x: 50, z: 50 };

        // 1. Activate (15 hits)
        for (let i = 0; i < 15; i++) {
            goblinManager.notifyClanActivity(clanId, target);
        }
        const clan = goblinManager.clans[clanId];
        expect(clan.active).toBe(true);
        expect(clan.aggression).toBe(15.0);

        // 2. Decay logic (War Exhaustion)
        // Rate: 0.05 per sec. Need 15.0 / 0.05 = 300s
        // Simulate 310s
        for (let i = 0; i < 310; i++) {
            goblinManager.updateClanWaves(1.0); // 1s
        }

        // 3. Verify Deactivation
        expect(clan.aggression).toBe(0);
        expect(clan.active).toBe(false); // Should return to peace
    });
});
