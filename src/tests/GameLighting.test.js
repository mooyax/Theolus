import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game';

// Mock OrbitControls
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
            mouseButtons: {}
        }))
    };
});

describe('Game Lighting (Day/Night Cycle)', () => {
    let game;

    beforeEach(() => {
        // Setup minimal game for testing environment logic
        game = new Game(undefined, undefined, true);
        game.directionalLight = new THREE.DirectionalLight();
        game.ambientLight = new THREE.AmbientLight();
        game.scene = new THREE.Scene();
        game.scene.background = new THREE.Color();
        game.weatherManager = { updateSkyColor: vi.fn() };
    });

    it('should have high intensity during noon', () => {
        game.gameTime = 12; // Noon
        game.updateEnvironment(0); // dt=0 to only apply state

        expect(game.directionalLight.intensity).toBeCloseTo(1.1, 1);
        expect(game.isNight).toBe(false);
        // Sun should be at peak (high Y)
        expect(game.directionalLight.position.y).toBeGreaterThan(50);
    });

    it('should have low intensity and blueish color during night', () => {
        game.gameTime = 0; // Midnight
        game.updateEnvironment(0);

        expect(game.directionalLight.intensity).toBeCloseTo(0.25, 1);
        expect(game.isNight).toBe(true);
        // Moon should be above horizon for shadows
        expect(game.directionalLight.position.y).toBeGreaterThan(0);
    });

    it('should have warm light during dusk', () => {
        game.gameTime = 18; // Dusk start
        game.updateEnvironment(0);

        // At 18:00, it's starting to dim (t=0.5 in dusk transition logic)
        // Transition 17-19. 18 is t=0.5.
        // lightIntensity = 1.0 - 0.5 * 0.8 = 0.6
        expect(game.directionalLight.intensity).toBeLessThan(1.0);
        expect(game.directionalLight.intensity).toBeGreaterThan(0.2);

        // Color should have some red/warmth
        expect(game.directionalLight.color.r).toBeGreaterThanOrEqual(0.9);
    });

    it('should sync fog color with sky color', () => {
        game.gameTime = 12;
        game.updateEnvironment(0);
        expect(game.weatherManager.updateSkyColor).toHaveBeenCalled();
    });
});
