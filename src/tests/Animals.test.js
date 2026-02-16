
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SheepManager } from '../SheepManager.js';
import { FishManager } from '../FishManager.js';
import { Sheep } from '../Sheep.js';
import { Fish } from '../Fish.js';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Local THREE mock removed to use global setup.js mock

describe('Animal Movement Verification', () => {
    let scene, terrain;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = {
            logicalWidth: 80,
            logicalDepth: 80,
            // grid needs to be a real 2D array of objects
            grid: Array(80).fill(null).map(() =>
                Array(80).fill(null).map(() => ({ hasBuilding: false }))
            ),
            getTileHeight: vi.fn(() => 1.0), // Land
            getInterpolatedHeight: vi.fn(() => 1.0),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            moveEntity: vi.fn(),
            findBestTarget: vi.fn()
        };
        // Mock global game
        window.game = { terrain, soundManager: { playSheepSound: vi.fn() } };
    });

    it('Sheep should move after interval (Manual Time Step)', () => {
        const manager = new SheepManager(scene, terrain);
        // Force spawn if random failed
        if (manager.sheeps.length === 0) {
            const s = new Sheep(scene, terrain, 10, 10);
            s.updatePosition();
            manager.sheeps.push(s);
        }
        const sheep = manager.sheeps[0];

        expect(sheep).toBeDefined();

        console.error(`[TEST DEBUG] manager.sheeps.length: ${manager.sheeps.length}`);
        console.error(`[TEST DEBUG] manager.update implementation: ${manager.update.toString()}`);

        // Sequence of updates to ensure interval passes and move starts
        manager.update(1.0, 1.0); // Init

        // Step through simulation to reach moveInterval (2-5s)
        for (let t = 2.0; t <= 12.0; t += 1.0) {
            window.game.simTotalTimeSec = t;
            sheep.updateLogic(t, 1.0);
            sheep.updateMovement(t);
            if (sheep.isMoving) break;
        }

        expect(sheep.isMoving).toBe(true);
    });

    it('Fish should move in water', () => {
        terrain.getTileHeight.mockReturnValue(0.2); // Water
        const manager = new FishManager(scene, terrain);
        // Force spawn if random failed
        if (manager.fishes.length === 0) {
            const f = new Fish(scene, terrain, 10, 10);
            f.updatePosition();
            // In Fish.js constructor, it might use WanderBase. Ensure it's working.
            manager.fishes.push(f);
        }
        const fish = manager.fishes[0];

        expect(fish).toBeDefined();

        for (let t = 2.0; t <= 12.0; t += 1.0) {
            window.game.simTotalTimeSec = t;
            fish.updateLogic(t, 1.0);
            fish.updateMovement(t);
            if (fish.isMoving) break;
        }

        expect(fish.isMoving).toBe(true);
    });
});
