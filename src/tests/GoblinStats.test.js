
import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import * as THREE from 'three';
import { MockGame, MockTerrain } from './TestHelper.js';

global.THREE = THREE;
if (!global.window) global.window = { game: null };

describe('Goblin Stats Verification', () => {
    let mockGame;
    let mockTerrain;

    beforeAll(() => {
        Goblin.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);
        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Normal Goblin should have sufficient lifespan and speed', () => {
        const g = new Goblin(mockGame.scene, mockTerrain, 10, 10, 'normal');

        // Lifespan check (should be > 90s)
        expect(g.lifespan).toBeGreaterThan(90);

        // Speed check (moveInterval logic)
        expect(g.moveInterval).toBeDefined();
    });

    it('King Goblin should be long lived', () => {
        const g = new Goblin(mockGame.scene, mockTerrain, 10, 10, 'king');
        expect(g.lifespan).toBeGreaterThan(250);
    });
});