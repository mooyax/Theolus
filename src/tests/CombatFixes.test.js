import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = {};

describe('Combat and Logic Fixes', () => {
    let mockTerrain;
    let mockGame;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
        Goblin.initAssets = vi.fn();
    });

    beforeEach(() => {
        mockTerrain = {
            getTileHeight: () => 1,
            getInterpolatedHeight: () => 1,
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            grid: Array(100).fill().map(() => Array(100).fill({ hasBuilding: false })),
            buildings: [],
            getVisualPosition: () => ({ x: 0, y: 0, z: 0 }),
            moveEntity: vi.fn(),
            checkFlatArea: () => true
        };
        mockGame = { raidPoints: [] };
        global.window.game = mockGame;
    });

    it('Knight should have massive damage (100+)', () => {
        const knight = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'knight');
        // Base damage 4 * 25 = 100
        expect(knight.damage).toBeGreaterThanOrEqual(100);
    });

    it('Wizard should have high damage (80+)', () => {
        const wizard = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'wizard');
        // Base damage 4 * 20 = 80
        expect(wizard.damage).toBeGreaterThanOrEqual(80);
    });

    it('Unit should trigger move IMMEDIATELY when chasing, ignoring moveInterval', () => {
        const unit = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'knight');
        unit.triggerMove = vi.fn();
        unit.isMoving = false;
        unit.moveInterval = 5000;
        unit.lastTime = 1000;
        const currentTime = 1100; // Only 100ms passed, normally would wait

        // Setup target
        const goblin = { gridX: 10, gridZ: 0, isDead: false, id: 'g1' };
        // Mock getDistance
        unit.getDistance = () => 10; // Far away

        // Trigger updateLogic
        unit.updateLogic(currentTime, 0.1, false, [goblin], [], []);

        // Should have targeted goblin and triggered move
        expect(unit.targetGoblin).toBe(goblin);
        expect(unit.action).toBe("Chasing");
        expect(unit.triggerMove).toHaveBeenCalled();
    });

    it('GoblinManager should call updateDeathAnimation for dead goblins', () => {
        const gm = new GoblinManager({ add: vi.fn() }, mockTerrain, {});
        const goblin = {
            isDead: true,
            updateDeathAnimation: vi.fn(),
            updateLogic: vi.fn(),
            updateMovement: vi.fn()
        };
        gm.goblins = [goblin];

        // Force stagger=1 by using timeScale=2.0
        gm.update(1000, 0.1, false, [], 2.0, {});

        expect(goblin.updateDeathAnimation).toHaveBeenCalled();
        expect(goblin.updateLogic).not.toHaveBeenCalled();
    });
});
