
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game.js';
import { Terrain } from '../Terrain.js';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';
import * as THREE from 'three';

// Mock THREE
global.THREE = THREE;

describe('Manual Request Integration', () => {
    let game;
    let terrain;
    let unit;

    beforeEach(() => {
        // Setup simple Mock Game
        game = {
            scene: new THREE.Scene(),
            units: [],
            requests: [],
            requestMarkers: {},
            requestIdCounter: 0,
            addRequest: function (type, gx, gz, manual) {
                const id = `req_${this.requestIdCounter++}`;
                this.requests.push({
                    id, type, gridX: gx, gridZ: gz, x: gx, z: gz, manual,
                    assignedTo: null,
                    creationTime: Date.now() / 1000
                });
                return id;
            },
            findBestRequest: function (unit) {
                return this.requests.find(r => !r.assignedTo);
            },
            claimRequest: function (unit, req) {
                if (!req) return false;
                req.assignedTo = unit.id;
                req.claimedBy = unit.id;
                req.status = 'assigned';
                unit.targetRequest = req;
                unit.changeState(new Job(unit));
                return true;
            },
            assignRequests: function () {
                const req = this.requests.find(r => !r.assignedTo);
                if (req && this.units.length > 0) {
                    this.claimRequest(this.units[0], req);
                }
            },
            completeRequest: vi.fn(),
            releaseRequest: function (unit, req) {
                if (req) {
                    req.assignedTo = null;
                    req.status = 'pending';
                }
            },
            update: vi.fn(),
            checkYield: async () => { },
            gameActive: true,
            isNight: false,
            season: 'spring',
            canAction: () => true,
            simTotalTimeSec: 0,
            gameTotalTime: 0
        };

        // Real Terrain (but no Worker)
        terrain = new Terrain(game.scene);
        terrain.logicalWidth = 20;
        terrain.logicalDepth = 20;
        terrain.grid = Array(20).fill(null).map(() =>
            Array(20).fill(null).map(() => ({ height: 5, moisture: 0.5, type: 'grass' }))
        );
        terrain.worker = undefined; // Force Sync

        // Link Game and Terrain
        game.terrain = terrain;

        // Init Unit
        unit = new Unit(game.scene, terrain, 5, 5, 'worker');
        unit.id = 1;
        unit.game = game;

        game.units.push(unit);

        // Fix: UnitStates relies on window.game
        window.game = game;
    });

    afterEach(() => {
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should assign a manual request and move unit towards it', async () => {
        // 1. Create Request nearby at (10, 5) - Straight line flat
        game.addRequest('flatten', 10, 5, true);

        expect(game.requests.length).toBe(1);
        const req = game.requests[0];

        // 2. Assign requests directly
        game.assignRequests();
        await unit.updateLogic(0.1);
        await new Promise(r => setTimeout(r, 0));

        // 3. Verify Assignment
        expect(unit.targetRequest).toBeDefined();
        expect(req.claimedBy).toBe(unit.id);

        // 4. Verify Movement
        await unit.updateLogic(0.1);

        if (unit.path) {
            expect(unit.path.length).toBeGreaterThan(0);
        } else {
            for (let i = 0; i < 10; i++) {
                await new Promise(r => setTimeout(r, 10));
                if (unit.path) break;
            }
        }
        expect(unit.path).toSatisfy(p => p && p.length > 0);

        // 5. Simulate movement updates
        const startX = unit.gridX;
        let moved = false;
        for (let i = 0; i < 20; i++) {
            game.simTotalTimeSec += 0.1;
            unit.updateLogic(game.simTotalTimeSec, 0.1, false, [], [], []);
            unit.updateMovement(game.simTotalTimeSec);
            if (Math.abs(unit.gridX - startX) > 0.001) moved = true;
        }
        expect(moved).toBe(true);
    });

    it('should fail to find path if blocked by water', async () => {
        for (let z = 0; z < 20; z++) {
            terrain.grid[7][z].height = 0;
        }
        for (let x = 8; x < 13; x++) {
            for (let z = 3; z < 8; z++) {
                terrain.grid[x][z].height = 0;
            }
        }

        game.addRequest('flatten', 10, 5, true);
        game.assignRequests();
        await unit.updateLogic(0.1);

        if (unit.targetRequest) {
            await unit.updateLogic(0.1);
            expect(unit.path).toSatisfy(p => !p || p.length === 0);
        } else {
            expect(unit.targetRequest).toBeUndefined();
        }
    });
});