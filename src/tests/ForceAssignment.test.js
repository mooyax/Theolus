
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

describe('Force Assignment Integration', () => {
    let game;
    let worker;

    beforeEach(() => {
        global.requestAnimationFrame = vi.fn();
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'initMarkerMaterial').mockImplementation(() => { });

        if (THREE.Color && !THREE.Color.prototype.clone) {
            THREE.Color.prototype.clone = function () { return new THREE.Color().copy(this); };
        }

        game = new Game(new THREE.Scene(), undefined, true);
        game.renderer = { domElement: {}, render: vi.fn(), setPixelRatio: vi.fn(), setSize: vi.fn(), setClearColor: vi.fn() };
        game.consumeMana = vi.fn();

        game.directionalLight = new THREE.DirectionalLight();
        game.ambientLight = new THREE.AmbientLight();

        worker = new Unit(game.scene, game.terrain, 10, 10, 'worker', false);
        worker.id = 1;
        worker.initAssets = vi.fn(); // Instance-level mock
        game.units = [worker];
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should successfully triggerMove without infinite loop', async () => {
        worker.triggerMove(11, 11, 1.0);
        worker.updateMovement(0.1);
        expect(worker.isMoving).toBe(true);
    });

    it('should handle Force Assignment logic block', async () => {
        const req = { id: 'req_force', type: 'raise', x: 11, z: 11, status: 'pending', createdAt: 0 };
        game.requestQueue = [req];

        game.claimRequest(worker, req);

        expect(worker.targetRequest).toBe(req);
        expect(req.status).toBe('assigned');
        expect(worker.isMoving).toBe(true);
    });
});