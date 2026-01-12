
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

// Mock THREE and dependencies (Copy from JobReassignment.test.js)
vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('div'); }
            setSize() { }
            setClearColor() { }
            render() { }
            setPixelRatio() { }
        },
        TextureLoader: class {
            load(url, cb) { if (cb) cb({}); return {}; }
        }
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() {
            this.enabled = true;
            this.target = new THREE.Vector3();
            this.update = vi.fn();
            this.addEventListener = vi.fn();
        }
    }
}));
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } serialize() { return {}; } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

describe('Action Label Stability', () => {
    let game;

    beforeEach(() => {
        vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });
        game = new Game(null, null, true); // Use minimal init
        game.units = [];
        game.requestQueue = [];
        game.goblinManager = { update: vi.fn(), goblins: [] };
        window.game = game;
        game.gameActive = true;

        // Setup simple grid
        // game.terrain.logicalWidth/Depth already set in mock above
        game.terrain.grid = [];
        for (let x = 0; x < 100; x++) {
            game.terrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                game.terrain.grid[x][z] = { height: 1, regionId: 1, type: 'grass' };
            }
        }
        // game.terrain.initEntityGrid(); // Mocked

        // Mock findPath to return a multi-step path
        game.terrain.findPath = vi.fn().mockImplementation((sx, sz, ex, ez) => {
            return [{ x: sx + 1, z: sz }, { x: sx + 2, z: sz }, { x: ex, z: ez }];
        });
    });

    it('should maintain stable action label during multi-tile job approach', () => {
        const unit = game.spawnUnit(10, 10, 'worker');

        // Add a Request
        const req = game.addRequest('raise', 50, 50);
        req.isManual = true;

        // Initial Assignment
        game.processAssignments();

        expect(unit.targetRequest).toBe(req);
        // Initial check after enter()
        expect(unit.action).toBe('Approaching Job');

        // Simulate logic updates and movement
        for (let step = 0; step < 3; step++) {
            const time = 100 + step;

            // 1. Logic Update
            unit.updateLogic(time, 1.0, false, []);

            // Should stay as Job label
            expect(unit.action).toBe('Approaching Job');

            // 2. Movement Update (takes time)
            unit.updateMovement(time + 0.5);

            // Should STILL be Job label during interpolation
            expect(unit.action).toBe('Approaching Job');

            unit.updateMovement(time + 1.0); // Arrives at tile boundary

            // Check label after onMoveFinished
            expect(unit.action).not.toBe('Idle');
            expect(unit.action).toBe('Approaching Job');
        }

        // Final assertions
        expect(unit.action).not.toBe('Idle');
        expect(unit.action).not.toBe('Moving');
        expect(unit.action).toBe('Approaching Job');
    });
});
