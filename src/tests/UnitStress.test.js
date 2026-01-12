import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { JobState } from '../ai/states/UnitStates.js';

// Reuse mocks from MovingFlicker.test.js or use simplified ones
vi.mock('three', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.domElement = document.createElement('canvas'); }
            setPixelRatio() { }
            setSize() { }
            render() { }
            setClearColor() { }
        },
        Scene: class extends actual.Scene {
            constructor() { super(); this.background = { setHex: () => { } }; }
        },
    };
});

describe('Unit AI Stress Testing', () => {
    let game;
    let scene;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'startNewGame').mockImplementation(() => { }); // Prevent heavy init
        document.body.innerHTML = '<div id="ui"></div><canvas id="minimap"></canvas><div id="mana-bar"></div><div id="loading-screen"></div>';

        scene = new THREE.Scene();
        game = new Game(scene, null, true); // Use minimal init
        window.game = game;
        game.gameActive = true;

        // Mock terrain for stress (No real pathfinding required, just the budget system)
        game.terrain.pathfindingCalls = 0;
        game.terrain.getTileHeight = () => 1;
        game.terrain.grid = Array(160).fill(0).map(() => Array(160).fill(0).map(() => ({ regionId: 1, height: 1 })));
        game.terrain.isReachable = () => true;
        game.terrain.findPath = vi.fn().mockImplementation(() => [{ x: 50, z: 50 }]);
        game.terrain.isAdjacentToRegion = () => true;
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should handle 100 units starting distant jobs simultaneously without dropping tasks', () => {
        const units = [];
        const numUnits = 100;

        // Force all units to frame 0
        game.frameCounter = 0;

        for (let i = 0; i < numUnits; i++) {
            const u = game.spawnUnit(2, 2, 'worker');
            u.id = i;
            units.push(u);

            const req = game.addRequest('raise', 100, 100, null, null, null, true); // Manual
            game.claimRequest(u, req);
        }

        // Initially all in JobState
        units.forEach(u => expect(u.state).toBeInstanceOf(JobState));

        // Simulation Loop
        // We expect that frame 0 will allow some units to pathfind, others will be throttled
        // THROTTLE_BUDGET is 100 in Actor.js (or similar)

        for (let frame = 1; frame <= 10; frame++) {
            game.frameCounter = frame;
            game.terrain.pathfindingCalls = 0; // Reset budget per frame

            units.forEach(u => {
                u.updateLogic(frame * 0.1, 0.1);
            });

            // Verify NO unit dropped the job
            const jobStateCount = units.filter(u => u.state instanceof JobState).length;
            expect(jobStateCount).toBe(numUnits);

            // Check if any were throttled (dist is large, so they WANT A*)
            // This is just to confirm the throttle is actually being hit in this test setup
            const throttledCount = units.filter(u => u.isPathfindingThrottled).length;
            // First frame: some should be throttled if budget < numUnits (depending on Actor.js implementation)
            // Note: Since each u.updateLogic calls smartMove, and smartMove increments budget...
        }

        // Final Verify
        units.forEach(u => {
            expect(u.state).toBeInstanceOf(JobState);
            expect(u.action).toBe('Approaching Job');
        });
    });

    it('should eventually reach target even with extreme congestion (low budget)', () => {
        // Mock a VERY low budget
        const budgetLimit = 1; // Only 1 unit per frame gets to pathfind

        const units = [];
        const numUnits = 5; // Smaller set for faster verification

        for (let i = 0; i < numUnits; i++) {
            const u = game.spawnUnit(2, 2, 'worker');
            u.id = i;
            units.push(u);
            const req = game.addRequest('raise', 10, 10, null, null, null, true);
            game.claimRequest(u, req);
        }

        let movedUnits = new Set();

        // Need enough frames for all units to get a slot (at least numUnits * 2)
        for (let frame = 0; frame < 50; frame++) {
            game.frameCounter = frame;
            let framePathfindingAttempted = false;

            units.forEach(u => {
                const prevX = u.gridX;

                // If this unit doesn't have a path, it will try to pathfind
                // Controlled budget simulation
                if (!u.path) {
                    if (framePathfindingAttempted) {
                        game.terrain.pathfindingCalls = 100; // Throttled for others
                    } else {
                        game.terrain.pathfindingCalls = 0; // Allowed for this one
                    }
                } else {
                    game.terrain.pathfindingCalls = 0; // Movement doesn't use budget
                }

                // FORCE FAST ARRIVAL for stress test
                u.moveDuration = 0.01;

                u.updateLogic(frame * 0.1, 0.1);
                // ESSENTIAL: updateMovement must be called to actually advance the unit after startMove!
                if (u.updateMovement) u.updateMovement(frame * 0.1 + 0.05, 0.1);

                if (u.gridX !== prevX) {
                    movedUnits.add(u.id);
                }

                // If it successfully started pathfinding (or was already pathfinding)
                if (!framePathfindingAttempted && u.isMoving && !u.isPathfindingThrottled && !u.path) {
                    // This unit consumed the slot
                    framePathfindingAttempted = true;
                }
                // Actually, Actor.js sets this.path IMMEDIATELY on successful findPath.
                if (!framePathfindingAttempted && u.path) {
                    framePathfindingAttempted = true;
                }
            });

            if (frame % 10 === 0) {
                console.log(`[Stress Test] Frame ${frame}. Moved: ${movedUnits.size}/${numUnits}. BudgetCalls: ${game.terrain.pathfindingCalls}`);
            }

            if (movedUnits.size === numUnits) break;
        }

        // Verify all units eventually moved/pathfound
        expect(movedUnits.size).toBe(numUnits);
        units.forEach(u => {
            expect(u.state).toBeInstanceOf(JobState);
            expect(u.targetRequest).not.toBeNull();
        });
    });
});
