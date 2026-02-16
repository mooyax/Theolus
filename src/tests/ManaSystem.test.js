import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../Game.js';
import { InputManager } from '../InputManager.js';
import * as THREE from 'three';

// Mocks
vi.mock('three', async () => {
    return {
        Raycaster: class {
            constructor() { this.ray = { origin: {}, direction: {} }; }
            setFromCamera() { }
            intersectObjects() { return []; }
        },
        Vector2: class { x = 0; y = 0; set() { } },
        Vector3: class { x = 0; y = 0; z = 0; },
        ConeGeometry: class { dispose() { } },
        MeshBasicMaterial: class {
            constructor() {
                this.color = { setHex: vi.fn() };
                this.dispose = vi.fn();
            }
        },
        Mesh: class {
            constructor(geo, mat) {
                this.position = { set: vi.fn() };
                this.rotation = { x: 0 };
                this.material = mat || { color: { setHex: vi.fn() } };
                this.geometry = geo || { dispose: vi.fn() };
            }
        },
        Scene: class { add() { } remove() { } }
    };
});

global.document = {
    getElementById: () => ({
        innerText: '',
        style: {},
        addEventListener: vi.fn(),
        classList: { toggle: vi.fn() },
        textContent: ''
    }),
    createElement: () => ({ getContext: () => ({ fillRect: () => { }, fillStyle: '' }) }),
    body: { appendChild: () => { } },
    addEventListener: () => { }
};
global.window = {
    innerWidth: 100, innerHeight: 100,
    devicePixelRatio: 1,
    addEventListener: () => { },
    game: {} // Ensure window.game exists
};

describe('Mana System', () => {
    let mockGame;

    beforeEach(() => {
        // Partial Mock of Game Logic
        mockGame = {
            gameActive: true,
            mana: 100,
            canAction: function () { return this.mana >= 0; },
            consumeMana: vi.fn(function (amount) { this.mana -= amount; }),
            addRequest: vi.fn()
        };
    });

    it('should block actions when mana is negative', () => {
        mockGame.mana = -5;
        expect(mockGame.canAction()).toBe(false);
    });

    it('should allow actions when mana is positive', () => {
        mockGame.mana = 5;
        expect(mockGame.canAction()).toBe(true);
    });

    it('should consume mana correctly', () => {
        mockGame.consumeMana(10);
        expect(mockGame.mana).toBe(90);
        expect(mockGame.consumeMana).toHaveBeenCalledWith(10);
    });

    describe('InputManager Integration', () => {
        let inputManager;
        let mockTerrain;

        beforeEach(() => {
            mockTerrain = {
                raise: vi.fn(),
                lower: vi.fn(),
                getVisualPosition: () => ({ x: 0, y: 0, z: 0 }),
                raycast: () => ({ x: 0, y: 0, z: 0 }),
                logicalWidth: 10, logicalDepth: 10
            };
            const mockScene = { add: () => { } };
            const mockCamera = {};

            inputManager = new InputManager(
                mockScene, mockCamera, mockTerrain,
                vi.fn(), [], {}, mockGame
            );
        });

        it('should consume mana on raise terrain', () => {
            inputManager.mode = 'raise';
            // Simulate Click Event
            const event = { clientX: 0, clientY: 0, button: 0 };

            // Setup raycast hit
            mockTerrain.raycast = () => ({ x: 5, y: 0, z: 5 });

            inputManager.handleInteraction(event);

            expect(mockGame.addRequest).toHaveBeenCalled();
            expect(mockGame.consumeMana).toHaveBeenCalledWith(10);
            expect(mockGame.mana).toBe(90);
        });

        it('should block raise terrain if mana is negative', () => {
            mockGame.mana = -1;
            inputManager.mode = 'raise';
            const event = { clientX: 0, clientY: 0, button: 0 };
            mockTerrain.raycast = () => ({ x: 5, y: 0, z: 5 });

            inputManager.handleInteraction(event);

            expect(mockTerrain.raise).not.toHaveBeenCalled();
            expect(mockGame.consumeMana).not.toHaveBeenCalled();
        });
    });
});
