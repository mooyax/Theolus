
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
        const unit1 = game.spawnUnit(10, 10, 'worker');
        const unit2 = game.spawnUnit(50, 50, 'worker');

        // Target is far away
        const req = game.addRequest('raise', 80, 80);
        game.processAssignments();

        expect(req.assignedTo).toBe(unit1.id);
        expect(unit1.state.name).toBe('JobState');

        // Force stuck position
        unit1.lastPos = { x: 10, z: 10 };
        unit1.stuckTimer = 0;

        // Mock smartMove to simulate Throttling persistence
        // vi.spyOn might trigger prototype chain issues or bind issues, so overwrite instance method directly.
        unit1.smartMove = (tx, tz, time) => {
            unit1.isPathfindingThrottled = true;
            return false;
        };

        // Advance time by 60s (to be safe, threshold is 45)
        let time = 100;
        const dt = 1.0;
        for (let i = 0; i < 60; i++) {
            time += dt;
            unit1.updateLogic(time, dt, false, []);
        }

        // Unit1 should have released the job
        expect(unit1.targetRequest).toBeNull();

        // In our current implementation, releaseRequest calls forceAssignRequest synchronously.
        // So it might already be assigned to unit2.
        expect(req.assignedTo).not.toBe(unit1.id);
        expect(req.assignedTo).toBe(unit2.id);

        // Verify state of unit2
        expect(unit2.targetRequest).not.toBeNull();
        expect(unit2.targetRequest.id).toBe(req.id);
    });
});
