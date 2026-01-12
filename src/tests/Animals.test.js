
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SheepManager } from '../SheepManager.js';
import { FishManager } from '../FishManager.js';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Simplify Mocking - Just the essentials
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        Group: class {
            constructor() {
                this.position = new actual.Vector3();
                this.rotation = { x: 0, y: 0, z: 0 };
                this.userData = {};
                this.add = vi.fn();
                this.remove = vi.fn();
            }
        },
        Mesh: class {
            constructor() {
                this.position = new actual.Vector3();
                this.rotation = { x: 0, y: 0, z: 0 };
                this.add = vi.fn();
                this.geometry = { dispose: vi.fn(), scale: vi.fn(), rotateX: vi.fn() };
                this.material = { dispose: vi.fn(), uniforms: {} };
            }
        },
        Scene: class {
            constructor() {
                this.add = vi.fn();
                this.remove = vi.fn();
            }
        },
        BoxGeometry: class { constructor() { this.dispose = vi.fn(); } },
        SphereGeometry: class { constructor() { this.dispose = vi.fn(); this.scale = vi.fn(); } },
        ConeGeometry: class { constructor() { this.dispose = vi.fn(); this.rotateX = vi.fn(); } },
        MeshStandardMaterial: class { constructor() { this.dispose = vi.fn(); } },
        MeshLambertMaterial: class { constructor() { this.dispose = vi.fn(); } },
    };
});

describe('Animal Movement Verification', () => {
    let scene, terrain;

    beforeEach(() => {
        scene = new THREE.Scene();
        terrain = {
            logicalWidth: 80,
            logicalDepth: 80,
            grid: Array(80).fill().map(() => Array(80).fill({ hasBuilding: false })),
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
        const sheep = manager.sheeps[0];

        expect(sheep).toBeDefined();

        // Sequence of updates to ensure interval passes and move starts
        manager.update(1.0, 1.0); // Init lastTime = 1.0
        manager.update(10.0, 9.0); // Now 10 - 1 > interval(2-5), so moveRandomly called

        expect(sheep.isMoving).toBe(true);
    });

    it('Fish should move in water', () => {
        terrain.getTileHeight.mockReturnValue(0.2); // Water
        const manager = new FishManager(scene, terrain);
        const fish = manager.fishes[0];

        expect(fish).toBeDefined();

        manager.update(1.0, 1.0);
        manager.update(10.0, 9.0);

        expect(fish.isMoving).toBe(true);
    });
});
