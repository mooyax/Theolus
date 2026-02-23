
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

describe('Job Reassignment on Death', () => {
    let game;

    beforeEach(() => {
        global.requestAnimationFrame = vi.fn();

        // Use instance-level mocking instead of prototype-level to avoid cross-test pollution
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'initMarkerMaterial').mockImplementation(() => { });

        vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });

        if (THREE.Color && !THREE.Color.prototype.clone) {
            THREE.Color.prototype.clone = function () { return new THREE.Color().copy(this); };
        }

        game = new Game(new THREE.Scene(), undefined, true);
        game.renderer = { domElement: {}, render: vi.fn(), setPixelRatio: vi.fn(), setSize: vi.fn(), setClearColor: vi.fn() };
        game.gameActive = true;
        game.simTotalTimeSec = 100;

        game.directionalLight = new THREE.DirectionalLight();
        game.ambientLight = new THREE.AmbientLight();

        game.terrain.logicalWidth = 100;
        game.terrain.logicalDepth = 100;
        game.terrain.grid = [];
        for (let x = 0; x < 100; x++) {
            game.terrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                game.terrain.grid[x][z] = { height: 1, regionId: 1, type: 'grass' };
            }
        }
        game.terrain.initEntityGrid();

        window.alert = vi.fn();
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should reassign job when original worker dies', () => {
        const unit1 = game.spawnUnit(10, 10, 'worker');
        const unit2 = game.spawnUnit(50, 50, 'worker');

        // Instance-level mock
        unit1.initAssets = vi.fn();
        unit2.initAssets = vi.fn();

        const req = game.addRequest('raise', 12, 12);
        game.processAssignments();

        expect(req.assignedTo).toBe(unit1.id);
        expect(unit1.state && unit1.state.constructor.name).toBe('Job');

        unit1.die();
        game.processAssignments();

        expect(req.status).toBe('assigned');
        expect(req.assignedTo).toBe(unit2.id);
        expect(unit2.state && unit2.state.constructor.name).toBe('Job');
    });
});