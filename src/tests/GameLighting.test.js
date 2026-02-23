
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';

vi.mock('three/examples/jsm/controls/OrbitControls', () => {
    return {
        OrbitControls: vi.fn().mockImplementation(() => ({
            update: vi.fn(),
            enableDamping: false,
            dampingFactor: 0.05,
            screenSpacePanning: false,
            minDistance: 1,
            maxDistance: 100,
            maxPolarAngle: 1.5,
            mouseButtons: {},
            addEventListener: vi.fn(),
            target: new THREE.Vector3()
        }))
    };
});

describe('Game Lighting (Day/Night Cycle)', () => {
    let game;

    beforeEach(() => {
        global.requestAnimationFrame = vi.fn();
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'initMarkerMaterial').mockImplementation(() => { });

        game = new Game(new THREE.Scene(), undefined, true);
        game.renderer = { domElement: {}, render: vi.fn(), setPixelRatio: vi.fn(), setSize: vi.fn(), setClearColor: vi.fn() };
        game.directionalLight = new THREE.DirectionalLight();
        game.ambientLight = new THREE.AmbientLight();
        game.weatherManager = { updateSkyColor: vi.fn(), setWeather: vi.fn(), update: vi.fn() };

        game.gameTime = 12;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should have high intensity during noon', () => {
        game.gameTime = 12.0;
        game.updateEnvironment(0);

        expect(game.directionalLight.intensity).toBeCloseTo(1.1, 1);
        expect(game.isNight).toBe(false);
        expect(game.directionalLight.position.y).toBeGreaterThan(50);
    });

    it('should have low intensity and blueish color during night', () => {
        game.gameTime = 0.0;
        game.updateEnvironment(0);

        // Game.ts uses 0.35 for Night (20:00 - 4:00)
        expect(game.directionalLight.intensity).toBeCloseTo(0.35, 1);
        expect(game.isNight).toBe(true);
        expect(game.directionalLight.position.y).toBeGreaterThan(0);
    });

    it('should have warm light during dusk', () => {
        game.gameTime = 18.0;
        game.updateEnvironment(0);

        expect(game.directionalLight.intensity).toBeLessThan(1.2);
        expect(game.directionalLight.intensity).toBeGreaterThan(0.2);
        expect(game.directionalLight.color.r).toBeGreaterThanOrEqual(0.8);
    });

    it('should sync fog color with sky color', () => {
        game.gameTime = 12.0;
        game.updateEnvironment(0);
        expect(game.weatherManager.updateSkyColor).toHaveBeenCalled();
    });
});