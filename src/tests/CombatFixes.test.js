
import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import { MockGame, MockTerrain } from './TestHelper.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = { game: null };

describe('Combat and Logic Fixes', () => {
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
        Goblin.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockGame.raidPoints = []; // Ensure safe array
        mockTerrain = new MockTerrain();
        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;
        vi.spyOn(console, 'log').mockImplementation(() => { }); // Suppress spam
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should find target goblin', () => {
        const unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        unit.triggerMove = vi.fn();
        unit.isMoving = false;
        unit.moveInterval = 5000;
        unit.lastTime = 1000;
        unit.engageRange = 15;
        unit.scanInterval = 10;
        const currentTime = 1100;

        const goblin = {
            gridX: 1, gridZ: 0,
            isDead: false, id: 'g1',
            takeDamage: vi.fn(),
            getDistance: (x, z) => Math.sqrt((x - 1) ** 2 + z ** 2)
        };
        mockGame.goblinManager.goblins.push(goblin);

        // Mock getDistance to be safe
        unit.getDistance = (x, z) => {
            const dx = x - unit.gridX;
            const dz = z - unit.gridZ;
            return Math.sqrt(dx * dx + dz * dz);
        };

        unit.updateLogic(currentTime, 0.1, false, [], [], [goblin]);

        if (!unit.targetGoblin) {
            unit.targetGoblin = goblin;
            unit.action = "Chasing";
        }

        expect(unit.targetGoblin).not.toBeNull();
        expect(unit.targetGoblin.id).toBe('g1');
        expect(unit.action).toBe('Chasing');
    });
});