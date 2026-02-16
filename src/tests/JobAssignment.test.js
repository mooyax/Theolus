import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Job Assignment Chaining Test
 * 
 * Verifies the robustness of job assignments, sequential claims, 
 * and automatic job chaining (continuation).
 * 
 * Uses a constructor-less Game object to avoid heavy engine dependencies (WebGL, Sound, etc.).
 */

// COMPLETELY MOCK state modules to avoid dependency hell
vi.mock('../ai/states/UnitStates.js', () => ({
    Job: class Job {
        constructor(actor) {
            this.actor = actor;
            this.targetRequest = actor ? actor.targetRequest : null;
        }
        enter() { }
        update(time, deltaTime) {
            // Minimal simulation of completion logic in Job.js
            if (this.targetRequest && this.actor.gridX === this.targetRequest.x && this.actor.gridZ === this.targetRequest.z) {
                const game = this.actor.game;
                game.completeRequest(this.actor, this.targetRequest);

                // Trigger chaining logic (simplified from UnitStates.js)
                const next = game.findBestRequest(this.actor);
                if (next) {
                    game.claimRequest(this.actor, next);
                }
            }
        }
    },
    Wander: class Wander {
        constructor(actor) { this.actor = actor; }
        enter() { }
        update() { }
    }
}));

const { Game } = await import('../Game.js');

describe('Job Assignment & Continuation', () => {
    let game;
    let unit;

    beforeEach(() => {
        vi.clearAllMocks();

        // Setup minimal Game environment
        game = Object.create(Game.prototype);
        game.requestQueue = [];
        game.units = [];
        game.forceAssignRequest = vi.fn();
        game.assignRequestSync = vi.fn();
        game.completeRequest = vi.fn((u, req) => { req.status = 'completed'; });
        game.findBestRequest = vi.fn((u) => {
            return game.requestQueue.find(r => r.status === 'pending');
        });

        // Setup minimal Unit environment
        unit = {
            id: 0,
            gridX: 50, gridZ: 50,
            role: 'worker',
            targetRequest: null,
            changeState: vi.fn(function (newState) {
                this.state = newState;
                if (newState.enter) newState.enter();
            }),
            action: '',
            isMoving: false,
            lastPathTime: 0,
            game: game
        };
        game.units.push(unit);

        // Add claimRequest implementation manually if prototype is fully mocked, 
        // but here we want to test the REAL claimRequest in Game.js.
    });

    it('should release old job when a new job is claimed (Sequential assignment)', () => {
        const req1 = { id: 1, type: 'raise', x: 60, z: 60, status: 'pending', assignedTo: null };
        const req2 = { id: 2, type: 'lower', x: 70, z: 70, status: 'pending', assignedTo: null };
        game.requestQueue.push(req1, req2);

        // 1. Claim Req 1
        game.claimRequest(unit, req1);
        expect(req1.status).toBe('assigned');
        expect(unit.targetRequest).toBe(req1);

        // 2. Claim Req 2 (Sequential marker placement)
        game.claimRequest(unit, req2);

        expect(req2.status).toBe('assigned');
        expect(req1.status).toBe('pending', 'Old request should be released to pending status');
        expect(req1.assignedTo).toBe(null);
        expect(unit.targetRequest).toBe(req2);
    });

    it('should continue to the next nearby job after completing current one (Chaining)', () => {
        const req1 = { id: 1, type: 'raise', x: 51, z: 50, status: 'pending', assignedTo: null };
        const req2 = { id: 2, type: 'lower', x: 52, z: 50, status: 'pending', assignedTo: null };
        game.requestQueue.push(req1, req2);

        // 1. Assign first job
        game.claimRequest(unit, req1);
        expect(unit.state).toBeDefined();

        // 2. Simulate arrival and completion
        unit.gridX = 51;
        unit.gridZ = 50;
        unit.state.update(100, 1.0);

        // 3. Verify req1 completed and chain to req2
        expect(req1.status).toBe('completed');
        expect(req1.status).toBe('completed');
        expect(unit.targetRequest).toBe(req2);
        expect(req2.status).toBe('assigned');
        expect(req2.assignedTo).toBe(unit.id);
    });

    it('should properly interrupt and change state if a job is snatched by another unit', () => {
        const unit2 = {
            id: 1,
            gridX: 60, gridZ: 61,
            role: 'worker',
            targetRequest: null,
            changeState: vi.fn(),
            isMoving: true,
            game: game
        };
        game.units.push(unit2);

        const req = { id: 10, type: 'raise', x: 60, z: 60, status: 'assigned', assignedTo: unit2.id };
        unit2.targetRequest = req;

        // Player places a new marker closer to 'unit', or 'unit' is just better.
        // If claimRequest is called for 'unit' on an already assigned job:
        game.claimRequest(unit, req);

        expect(req.assignedTo).toBe(unit.id);
        expect(unit.targetRequest).toBe(req);

        // Unit 2 should be notified and state changed back to Wander
        expect(unit2.targetRequest).toBe(null);
        expect(unit2.isMoving).toBe(false);
        expect(unit2.changeState).toHaveBeenCalled();
    });
});
