
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Job } from '../ai/states/UnitStates.js';

describe('Unit AI Stress Testing', () => {
    let game;
    let scene;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'startNewGame').mockImplementation(() => { });
        document.body.innerHTML = '<div id="ui"></div><canvas id="minimap"></canvas><div id="mana-bar"></div><div id="loading-screen"></div><div id="loading-bar"></div><div id="loading-text"></div>';

        scene = new THREE.Scene();
        game = new Game(scene, null, true);
        window.game = game;
        game.gameActive = true;

        game.terrain.pathfindingCalls = 0;
        game.terrain.getTileHeight = () => 1;
        game.terrain.grid = Array(160).fill(0).map(() => Array(160).fill(0).map(() => ({ regionId: 1, height: 1 })));
        game.terrain.isReachable = () => true;
        game.terrain.findBestTarget = vi.fn().mockReturnValue(null);
        game.terrain.findPath = vi.fn().mockImplementation((sx, sz, tx, tz) => [{ x: tx, z: tz }]);
        game.terrain.findPathAsync = vi.fn().mockImplementation((sx, sz, tx, tz) => Promise.resolve([{ x: tx, z: tz }]));
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
        game.frameCounter = 0;

        for (let i = 0; i < numUnits; i++) {
            const u = game.spawnUnit(2, 2, 'worker');
            u.id = i;
            units.push(u);
            const req = game.addRequest('raise', 100, 100, true);
            game.claimRequest(u, req);
        }

        units.forEach(u => expect(u.state).toBeInstanceOf(Job));

        for (let frame = 1; frame <= 10; frame++) {
            game.frameCounter = frame;
            game.terrain.pathfindingCalls = 0;
            units.forEach(u => {
                u.updateLogic(frame * 0.1, 0.1);
            });
            const jobStateCount = units.filter(u => u.state instanceof Job).length;
            expect(jobStateCount).toBe(numUnits);
        }

        units.forEach(u => {
            expect(u.state).toBeInstanceOf(Job);
            expect(u.action).toBe('Approaching Job');
        });
    });

    it('should eventually reach target even with extreme congestion (low budget)', async () => {
        const numUnits = 5;
        const units = [];

        for (let i = 0; i < numUnits; i++) {
            const u = game.spawnUnit(2, 2, 'worker');
            u.id = i;
            units.push(u);
            const req = game.addRequest('raise', 10, 10, true);
            game.claimRequest(u, req);
        }

        let movedUnits = new Set();

        for (let frame = 0; frame < 50; frame++) {
            game.frameCounter = frame;
            let framePathfindingAttempted = false;

            await new Promise(resolve => setTimeout(resolve, 0));

            units.forEach(u => {
                const prevX = u.gridX;
                if (!u.path) {
                    if (framePathfindingAttempted) {
                        game.terrain.pathfindingCalls = 100;
                    } else {
                        game.terrain.pathfindingCalls = 0;
                    }
                } else {
                    game.terrain.pathfindingCalls = 0;
                }

                u.moveDuration = 0.01;
                u.updateLogic(frame * 0.1, 0.1);
                if (u.updateMovement) u.updateMovement(frame * 0.1 + 0.05, 0.1);

                if (Math.abs(u.gridX - prevX) > 0.001) {
                    movedUnits.add(u.id);
                }

                if (!framePathfindingAttempted && u.path) {
                    framePathfindingAttempted = true;
                }
            });

            if (movedUnits.size === numUnits) break;
        }

        expect(movedUnits.size).toBe(numUnits);
    });
});