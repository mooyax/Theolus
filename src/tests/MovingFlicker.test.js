
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import fs from 'fs';

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

vi.mock('../ui/ActionLabel.js', () => ({
    ActionLabel: class { update() { } }
}));

// Mock Minimap & Compass
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } serialize() { return {}; } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));

import { Unit } from '../Unit.js';
import { Game } from '../Game.js';
import { JobState } from '../ai/states/UnitStates.js';

// Mock Game.animate to avoid matrix/camera errors in headless environment
Game.prototype.animate = vi.fn();

// Mock Unit assets initialization to avoid canvas issues
Unit.initAssets = vi.fn();
Unit.createFaceTexture = vi.fn().mockReturnValue({});
Unit.createHairTexture = vi.fn().mockReturnValue({});
Unit.assets.initialized = true;
Unit.assets.textures = { face: {}, hair: {} };
Unit.assets.materials = {
    skin: {}, clothes: {}, tool: {}, hat: {}, armor: {}, helmet: {},
    robe: {}, wizardHat: {}, metal: {}, wood: {}, darkMagic: {},
    redIndicator: {}, face: {}, hair: {}
};
Unit.assets.geometries = {
    body: {}, head: {}, facePlane: {}, limb: {}, sword: {}, staff: {},
    wizardHat: {}, wizardHatBrim: {}, jobIndicatorTop: {}, jobIndicatorDot: {}
};

describe('Moving Flicker Check', () => {
    let game;
    let unit;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        const scene = new THREE.Scene();
        game = new Game(scene, null, true); // Use minimal init
        window.game = game;
        game.gameActive = true;

        // Ensure manual request logic works
        game.requestQueue = [];

        // Mock terrain for pathfinding
        game.terrain = {
            grid: Array(100).fill(null).map(() => Array(100).fill({ type: 'ground', height: 1 })),
            findBestTarget() { return null; },
            getTileHeight: () => 1,
            getWidth: () => 100,
            getDepth: () => 100,
            isWalkable: () => true,
            findPath: vi.fn().mockImplementation((x1, z1, x2, z2) => {
                // Return a simple straight line path
                const path = [];
                const dx = Math.sign(x2 - x1);
                const dz = Math.sign(z2 - z1);
                let cx = x1, cz = z1;
                while (Math.abs(cx - x2) > 0.5 || Math.abs(cz - z2) > 0.5) {
                    cx += dx;
                    cz += dz;
                    path.push({ x: cx, z: cz });
                }
                return path;
            }),
            findPathAsync: vi.fn().mockImplementation((x1, z1, x2, z2) => {
                const path = [];
                const dx = Math.sign(x2 - x1);
                const dz = Math.sign(z2 - z1);
                let cx = x1, cz = z1;
                while (Math.abs(cx - x2) > 0.5 || Math.abs(cz - z2) > 0.5) {
                    cx += dx;
                    cz += dz;
                    path.push({ x: cx, z: cz });
                }
                return Promise.resolve(path);
            }),
            updateCurrentRegions: () => { },
            update: () => { },
            getBuildingAt: () => null,
            moveEntity: () => { },
            initEntityGrid: () => { },
            checkYield: () => Promise.resolve(),
            isReachable: () => true
        };
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should NOT flicker to Idle while moving to a distant job', async () => {
        unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;

        // Add a manual request far away
        const req = game.addRequest('raise', 50, 50, true);

        // Assign
        const claimed = game.claimRequest(unit, req);
        expect(claimed).toBe(true);
        expect(unit.targetRequest).toBe(req);
        expect(unit.state).toBeInstanceOf(JobState);

        // Track state changes
        const actions = [];
        const states = [];

        // Run simulation for 100 frames
        for (let i = 0; i < 100; i++) {
            game.frameCounter = i;
            const time = i * 0.1;

            // Manually update unit logic
            unit.updateLogic(time, 0.1);

            // ALLOW ASYNC RESOLUTION
            await new Promise(r => setTimeout(r, 0));

            actions.push(unit.action);
            states.push(unit.state.constructor.name);

            // Fail immediately if we see unexpected Idle
            if (unit.state.constructor.name !== 'JobState') {
                console.log(`[Flicker Detected] Frame ${i}: State=${unit.state.constructor.name}, Action=${unit.action}`);
            }
        }

        // Verify we stayed in JobState
        const nonJobStates = states.filter(s => s !== 'JobState');
        expect(nonJobStates.length).toBe(0);

        // Verify action didn't flicker to Idle
        const idleFrames = actions.map((a, i) => ({ a, i })).filter(pair => pair.a === 'Idle');

        // Note: skip slow fs.writeFileSync in tests
        /*
        try {
            fs.writeFileSync('C:/Users/mooya/develop/test/test_actions.log', JSON.stringify(actions, null, 2));
        } catch (e) { }
        */

        if (idleFrames.length > 0) {
            const msg = `Idle detected at frames: ${idleFrames.map(p => p.i).join(', ')}`;
            throw new Error(msg);
        }
        expect(idleFrames.length).toBe(0);
    });

    it('should reproduce flicker when pathfinding budget is exhausted', async () => {
        // Mock budget exhaustion
        game.terrain.pathfindingCalls = 100;

        unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;

        // Add an AUTOMATIC request (threshold = 5)
        const req = game.addRequest('raise', 50, 50, false); // isManual = false

        // Assign
        const claimed = game.claimRequest(unit, req);
        expect(claimed).toBe(true);
        expect(unit.targetRequest).toBe(req);
        expect(unit.state).toBeInstanceOf(JobState);

        // Track changes
        const states = [];

        // Run simulation for 10 frames
        for (let i = 0; i < 10; i++) {
            game.frameCounter = i;
            unit.updateLogic(i * 0.1, 0.1);
            await new Promise(r => setTimeout(r, 0));
            states.push(unit.state.constructor.name);
        }

        // This is EXPECTED TO FAIL until the fix is applied
        const jobStateCount = states.filter(s => s === 'JobState').length;
        if (jobStateCount < 10) {
            console.log(`[Reproduction Successful] Unit dropped job in frames: ${states.map((s, i) => s !== 'JobState' ? i : null).filter(x => x !== null).join(', ')}`);
        }

        expect(states[9]).toBe('JobState');
        expect(unit.action).toBe('Approaching Job');
    });

    it('should NOT drop manual job if temporarily blocked mid-move', async () => {
        unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;

        // Manual request (High tolerance = 100)
        const req = game.addRequest('raise', 50, 50, true);
        game.claimRequest(unit, req);

        // Frame 0-10: Moving fine
        for (let i = 0; i < 10; i++) {
            unit.updateLogic(i * 0.1, 0.1);
            await new Promise(r => setTimeout(r, 0));
            expect(unit.state).toBeInstanceOf(JobState);
        }

        // Frame 11-40: Force BLOCKAGE (canMoveTo fails)
        const originalCanMove = unit.canMoveTo;
        unit.canMoveTo = vi.fn().mockReturnValue(false);

        for (let i = 11; i < 40; i++) {
            unit.updateLogic(i * 0.1, 0.1);
            await new Promise(r => setTimeout(r, 0));
            // Should stay in JobState even if blocked for 30 frames
            expect(unit.state).toBeInstanceOf(JobState);
            expect(unit.action).toBe('Approaching Job');
        }

        // Frame 41: Unblock
        unit.canMoveTo = originalCanMove;
        unit.updateLogic(4.1, 0.1);

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.action).toBe('Approaching Job');
    });

    it('should resume job after combat interruption', () => {
        unit = game.spawnUnit(10, 10, 'worker');
        unit.id = 0;
        unit.hp = 100;

        const req = game.addRequest('raise', 50, 50, true);
        game.claimRequest(unit, req);

        // Start moving
        unit.updateLogic(0.1, 0.1);
        expect(unit.state).toBeInstanceOf(JobState);

        // Interruption: Attack!
        // Simulate a combat-triggering event or state change
        const CombatState = class {
            constructor(u) { this.actor = u; }
            enter(prev) {
                this.actor.action = 'Fighting';
                this.resumeState = prev;
            }
            update() { }
            exit() { }
        };

        unit.changeState(new CombatState(unit));
        expect(unit.action).toBe('Fighting');
        expect(unit.targetRequest).toBe(req); // Request should be KEPT

        // Resolve combat: Switch back to resume state (which should be JobState)
        const resume = unit.state.resumeState;
        unit.changeState(resume || new JobState(unit));

        expect(unit.state).toBeInstanceOf(JobState);
        expect(unit.action).toBe('Approaching Job');
        expect(unit.targetRequest).toBe(req);
    });
});
