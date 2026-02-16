
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Refined Mock: Use Actual Three for Math, Mock only Renderer/DOM bits
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
            dispose() { }
        },
        TextureLoader: class {
            load(url, cb) { if (cb) cb({}); return {}; }
        }
    };
});

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => {
    return {
        OrbitControls: class {
            constructor() {
                this.enabled = true;
                this.target = new THREE.Vector3();
                this.update = vi.fn();
                this.addEventListener = vi.fn();
            }
        }
    };
});

// Mock Minimap & Compass
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } serialize() { return {}; } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

describe('Job Reassignment on Death', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });

        game = new Game(null, null, true); // Use minimal init
        window.game = game;
        game.gameActive = true;
        game.simTotalTimeSec = 100;

        // Setup a simple grid
        game.terrain.logicalWidth = 100;
        game.terrain.logicalDepth = 100;
        game.terrain.grid = [];
        for (let x = 0; x < 100; x++) {
            game.terrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                game.terrain.grid[x][z] = { height: 1, regionId: 1, type: 'grass' };
            }
        }
        // Also init entity grid
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

    it('should reassign job when original worker dies', () => {
        // 1. Create 2 Workers
        const unit1 = game.spawnUnit(10, 10, 'worker');
        const unit2 = game.spawnUnit(50, 50, 'worker');

        // Use ID based verification
        const id1 = unit1.id;
        const id2 = unit2.id;

        // 2. Add a Request
        const req = game.addRequest('raise', 12, 12);

        // 3. Trigger Assignment
        game.processAssignments();

        expect(req.assignedTo).toBe(id1);
        expect(unit1.targetRequest).toBe(req);

        // 4. Kill unit1
        console.log(`[Test] Killing unit1 (ID:${id1})...`);
        unit1.die();

        // Explicitly trigger reassignment process
        game.processAssignments();
        console.log(`[Test] Request Status: ${req.status}, AssignedTo: ${req.assignedTo}`);

        try {
            expect(req.status).toBe('assigned');
            expect(req.assignedTo).toBe(id2);
            expect(unit2.targetRequest).not.toBeNull();
            expect(unit2.targetRequest.id).toBe(req.id);
        } catch (e) {
            console.error("[Test Failure Details]", e);
            throw e;
        }
    });
});
