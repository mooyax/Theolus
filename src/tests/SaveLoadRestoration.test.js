
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';
import LZString from 'lz-string';

// --- MOCKS ---
// (Copying minimal mocks from SaveLoad.test.js)
// Mocks are handled by setup.js

describe('Save/Load Job Restoration', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        // Prevent background animation loop
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });

        // Reset ID counters
        Unit.nextId = 0;
        game = new Game();
        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.calculateRegions = vi.fn();
        game.terrain.deserialize = vi.fn().mockResolvedValue(true);
    });

    it('should restore unit ID and re-link to Job correctly', async () => {
        // 1. Setup Test World
        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        unit.id = 55; // Unusual ID to test persistence
        game.units.push(unit);

        const req = game.addRequest('raise', 12, 12, true); // Manual
        req.id = 'req_manual_1';
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;

        // Verify pre-save state
        expect(unit.id).toBe(55);
        expect(req.assignedTo).toBe(55);

        // 2. SAVE
        const saveData = game.saveGame(1);
        expect(saveData).toBe(true);

        const val = localStorage.setItem.mock.calls[0][1];
        const decompressed = LZString.decompressFromUTF16(val);
        const json = JSON.parse(decompressed);

        // Verify ID was saved
        const savedUnit = json.data.units[0];
        expect(savedUnit.id).toBe(55);

        // 3. Reset Game and LOAD
        game.units = [];
        game.requestQueue = [];
        Unit.nextId = 0; // Reset counter for load

        localStorage.getItem.mockReturnValue(val);
        const success = await game.loadGame(1);
        expect(success).toBe(true);

        // 4. VERIFY RESTORATION
        expect(game.units.length).toBe(1);
        const restoredUnit = game.units[0];
        expect(restoredUnit.id).toBe(55); // PERSISTENCE!
        expect(Unit.nextId).toBe(56);     // Counter restored!

        expect(game.requestQueue.length).toBe(1);
        const restoredReq = game.requestQueue[0];
        expect(restoredReq.id).toBe('req_manual_1');
        expect(restoredReq.assignedTo).toBe(55); // Link preserved!

        expect(restoredUnit.targetRequest).toBe(restoredReq);
        expect(restoredUnit.state.constructor.name).toBe('Job'); // NEW: Forced transition
        expect(restoredUnit.action).toBe('Approaching Job'); // Corrected expectation
    });

    it('should reset ghost-assigned requests during load', async () => {
        // Mock a save with an assigned request but NO unit
        const savedData = {
            timestamp: Date.now(),
            data: {
                resources: {},
                gameTime: 12,
                terrain: {
                    logicalWidth: 80,
                    logicalDepth: 80, // Added logicalDepth
                    grid: [],
                    buildings: []
                },
                units: [], // NO UNITS
                requests: [
                    { id: 'req_ghost', type: 'raise', x: 5, z: 5, status: 'assigned', assignedTo: 99, isManual: true }
                ]
            }
        };
        const compressed = LZString.compressToUTF16(JSON.stringify(savedData));
        localStorage.getItem.mockReturnValue(compressed);

        await game.loadGame(1);

        expect(game.requestQueue.length).toBe(1);
        const req = game.requestQueue[0];
        expect(req.status).toBe('pending'); // CLEANUP!
        expect(req.assignedTo).toBeNull();
    });
});
