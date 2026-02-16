
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Use Partial Mock
vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('div'); }
            setSize() { }
            render() { }
            setPixelRatio() { }
            dispose() { }
        },
        TextureLoader: class { load(url, cb) { if (cb) cb({}); return {}; } }
    };
});
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } serialize() { return {}; } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({ OrbitControls: class { constructor() { this.target = new THREE.Vector3(); } update() { } } }));

describe('Stuck/Throttled Job Reassignment', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        Unit.nextId = 0; // Reset IDs for deterministic results
        vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });
        game = new Game(null, null, true); // Use minimal init
        window.game = game;
        game.gameActive = true;

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
        game.terrain.findBestTarget = vi.fn(() => null);
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should release job if throttled and not moving for 45s', () => {
        // Fix: Spawn unit1 OFFICIALLY closer (70,70 for target 80,80) so it wins assignment over unit2 (10,10)
        const unit1 = game.spawnUnit(70, 70, 'worker');
        const unit2 = game.spawnUnit(10, 10, 'worker');

        // Target is far away. Use AUTO job (isManual=false) so it gets released.
        const req = game.addRequest('raise', 80, 80, false);
        game.processAssignments();

        expect(req.assignedTo).toBe(unit1.id);
        expect(unit1.state.name).toBe('Job');

        // Force stuck position
        unit1.lastPos = { x: 10, z: 10 };
        unit1.stuckTimer = 0;
        unit1.isPathfinding = false; // FIX: Ensure we aren't stuck "waiting" for a path from a previous call

        // Mock smartMove to simulate Throttling persistence
        // vi.spyOn might trigger prototype chain issues or bind issues, so overwrite instance method directly.
        unit1.smartMove = (tx, tz, time) => {
            unit1.isPathfindingThrottled = true;
            return false;
        };

        // Advance time by 60s (to be safe, threshold is 45)
        let time = 100;
        // Update existing terrain mocks instead of replacing
        game.terrain.findBestTarget = vi.fn(() => null);
        game.terrain.findPathAsync = vi.fn().mockResolvedValue([{ x: 80, z: 80 }]);
        // game.terrain.isReachable is likely real, or mock if needed (assumed walkable)

        const dt = 1.0;
        for (let i = 0; i < 30; i++) {
            time += dt;
            game.simTotalTimeSec = time;
            unit1.updateLogic(time, dt, false, []);
        }

        // Unit1 should have RELEASED the job and NOT picked it up yet (Excluded for 15s)
        expect(req.status).toBe('pending');
        expect(req.assignedTo).toBeNull();
        expect(unit1.targetRequest).toBeNull();
        expect(unit1.state.name).toBe('Wander');
    });
});
