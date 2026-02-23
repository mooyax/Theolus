
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

describe('Action Label Stability', () => {
    let game;

    beforeEach(() => {
        vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });
        game = new Game(null, null, true);
        game.units = [];
        game.requestQueue = [];
        game.goblinManager = { update: vi.fn(), goblins: [] };
        window.game = game;
        game.gameActive = true;

        game.terrain.grid = [];
        for (let x = 0; x < 100; x++) {
            game.terrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                game.terrain.grid[x][z] = { height: 1, regionId: 1, type: 'grass' };
            }
        }

        game.terrain.findPath = vi.fn().mockImplementation((sx, sz, ex, ez) => {
            return [{ x: sx + 1, z: sz }, { x: sx + 2, z: sz }, { x: ex, z: ez }];
        });
        game.terrain.findPathAsync = vi.fn().mockImplementation((sx, sz, ex, ez) => {
            return Promise.resolve([{ x: sx + 1, z: sz }, { x: sx + 2, z: sz }, { x: ex, z: ez }]);
        });
    });

    afterEach(() => {
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should maintain stable action label during multi-tile job approach', async () => {
        const unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 1;
        const req = game.addRequest('raise', 50, 50);
        req.isManual = true;

        game.processAssignments();
        expect(unit.targetRequest).toBe(req);
        expect(unit.action).toBe('Approaching Job');

        for (let step = 0; step < 3; step++) {
            const time = 100 + step;
            unit.updateLogic(time, 1.0, false, []);
            await Promise.resolve();
            expect(unit.action).toBe('Approaching Job');
            unit.updateMovement(time + 0.5);
            expect(unit.action).toBe('Approaching Job');
            unit.updateMovement(time + 1.0);
            expect(unit.action).not.toBe('Idle');
            expect(unit.action).toBe('Approaching Job');
        }

        expect(unit.action).not.toBe('Idle');
        expect(unit.action).not.toBe('Moving');
        expect(unit.action).toBe('Approaching Job');
    });
});