
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Sleep } from '../ai/states/UnitStates.js'; // Use proper import

describe('Night Loading Job Assignment', () => {
    let game;
    let scene;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="loading-screen" style="display:block">
                <div id="loading-bar" style="width:0%"></div>
                <div id="loading-text">0%</div>
            </div>
            <div id="ui"></div>
            <canvas id="minimap"></canvas>
            <div id="mana-bar"></div>
        `;

        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'initMarkerMaterial').mockImplementation(() => { });

        if (THREE.Color && !THREE.Color.prototype.clone) {
            THREE.Color.prototype.clone = function () { return new THREE.Color().copy(this); };
        }
        if (THREE.Color && !THREE.Color.prototype.lerp) {
            THREE.Color.prototype.lerp = function (c, t) {
                this.r += (c.r - this.r) * t;
                this.g += (c.g - this.g) * t;
                this.b += (c.b - this.b) * t;
                return this;
            };
        }

        scene = new THREE.Scene();
        game = new Game(scene, null, true);

        game.directionalLight = new THREE.DirectionalLight();
        game.ambientLight = new THREE.AmbientLight();
        game.controls = {
            target: new THREE.Vector3(),
            update: vi.fn(),
            dispose: vi.fn()
        };

        window.alert = vi.fn();
        game.gameActive = true;
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should correctly resume manual job when loaded at night', async () => {
        game.gameTime = 20;
        game.updateEnvironment(0);
        expect(game.isNight).toBe(true);

        const unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;
        unit.initAssets = vi.fn();

        const req = game.addRequest('raise', 15, 15, true);
        game.claimRequest(unit, req);

        expect(unit.targetRequest).toBe(req);
        expect(unit.state && unit.state.constructor.name).toBe('Job');

        game.saveGame(1);

        const newGame = new Game(new THREE.Scene(), null, true);
        newGame.controls = { target: new THREE.Vector3(), update: vi.fn(), dispose: vi.fn() };
        newGame.directionalLight = new THREE.DirectionalLight();
        newGame.ambientLight = new THREE.AmbientLight();

        const success = await newGame.loadGame(1);
        expect(success).toBe(true);

        const loadedUnit = newGame.units.find(u => u.id === 0);
        const loadedReq = newGame.requestQueue.find(r => r.id === req.id);

        expect(loadedUnit).toBeDefined();
        loadedUnit.initAssets = vi.fn();

        expect(loadedReq).toBeDefined();
        expect(newGame.isNight).toBe(true);
        expect(loadedUnit.targetRequest.id).toBe(loadedReq.id);
        expect(loadedUnit.state && loadedUnit.state.constructor.name).toBe('Job');

        newGame.dispose();
    });

    it('should wake up unit if they were saved while sleeping but had a job assigned (manual)', async () => {
        game.gameTime = 20;
        game.updateEnvironment(0);

        const unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;
        unit.initAssets = vi.fn();

        unit.changeState(new Sleep(unit));
        expect(unit.state && unit.state.constructor.name).toBe('Sleep');

        const req = game.addRequest('raise', 11, 11, true);
        game.claimRequest(unit, req);

        expect(unit.state && unit.state.constructor.name).toBe('Job');
        expect(unit.isMoving).toBe(true);

        game.saveGame(2);

        const newGame = new Game(new THREE.Scene(), null, true);
        newGame.controls = { target: new THREE.Vector3(), update: vi.fn(), dispose: vi.fn() };
        newGame.directionalLight = new THREE.DirectionalLight();
        newGame.ambientLight = new THREE.AmbientLight();

        await newGame.loadGame(2);

        const loadedUnit = newGame.units.find(u => u.id === 0);
        loadedUnit.initAssets = vi.fn();
        expect(loadedUnit.state && loadedUnit.state.constructor.name).toBe('Job');
        expect(loadedUnit.targetRequest.x).toBe(11);
        expect(loadedUnit.targetRequest.z).toBe(11);

        newGame.dispose();
    });

    it('should treat legacy requests (missing isManual) as manual for specific types', async () => {
        const legacyData = {
            gameTime: 20,
            terrain: {
                serialize: () => ({}),
                deserialize: vi.fn().mockResolvedValue(true)
            },
            units: [{
                id: 10, role: 'worker', gridX: 10, gridZ: 10,
                targetRequestId: 'req_legacy'
            }],
            requests: [{
                id: 'req_legacy',
                type: 'raise',
                x: 15, z: 15,
                status: 'assigned',
                assignedTo: 10
            }],
            camera: { position: { x: 0, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 } }
        };

        const loadGame = new Game(new THREE.Scene(), null, true);
        loadGame.controls = { target: new THREE.Vector3(), update: vi.fn(), dispose: vi.fn() };
        loadGame.directionalLight = new THREE.DirectionalLight();
        loadGame.ambientLight = new THREE.AmbientLight();

        vi.spyOn(loadGame.saveManager, 'load').mockReturnValue(legacyData);
        vi.spyOn(Unit.prototype, 'smartMove').mockImplementation(() => { });

        await loadGame.loadGame(3);

        const loadedReq = loadGame.requestQueue.find(r => r.id === 'req_legacy');
        expect(loadedReq).toBeDefined();
        expect(loadedReq.isManual).toBe(true);

        const loadedUnit = loadGame.units.find(u => u.id === 10);
        loadedUnit.initAssets = vi.fn();
        expect(loadedUnit.targetRequest).toBe(loadedReq);
        expect(loadedUnit.state && loadedUnit.state.constructor.name).toBe('Job');

        loadGame.dispose();
    });
});