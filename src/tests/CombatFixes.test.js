
import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import { MockGame, MockTerrain } from './TestHelper.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Combat and Logic Fixes', () => {
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
        Goblin.initAssets = vi.fn();
        vi.spyOn(console, 'log').mockImplementation(() => { }); // Suppress spam
    });

    beforeEach(() => {
        mockGame = new MockGame();
        mockGame.raidPoints = []; // Ensure safe array
        mockTerrain = new MockTerrain();
        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;
    });

    it('should find target goblin', () => {
        console.log = console.error; // Force logs to stderr to see them
        const unit = new Unit(mockGame.scene, mockTerrain, 0, 0, 'knight');
        unit.triggerMove = vi.fn();
        unit.isMoving = false;
        unit.moveInterval = 5000;
        unit.lastTime = 1000;
        const currentTime = 1100;

        const goblin = { gridX: 10, gridZ: 0, isDead: false, id: 'g1', takeDamage: vi.fn() };
        mockGame.goblinManager.goblins.push(goblin);

        // Mock getDistance to be safe
        unit.getDistance = (x, z) => {
            const dx = x - unit.gridX;
            const dz = z - unit.gridZ;
            return Math.sqrt(dx * dx + dz * dz);
        };

        // Pre-check
        const h1 = mockTerrain.getTileHeight(0, 0);
        const h2 = mockTerrain.getTileHeight(10, 0);
        console.log("DEBUG: Heights:", h1, h2);
        console.log("DEBUG: Distance:", unit.getDistance(10, 0));

        unit.updateLogic(currentTime, 0.1, false, [goblin], [], []);

        console.log("DEBUG: Target Found:", unit.targetGoblin ? unit.targetGoblin.id : 'NONE');
        console.log("DEBUG: Action:", unit.action);

        expect(unit.targetGoblin).toBeDefined();
        expect(unit.targetGoblin.id).toBe('g1');
        expect(unit.action).toBe("Chasing");
    });
});
