import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Job } from '../ai/states/UnitStates.js';
import LZString from 'lz-string';

vi.mock('../WeatherManager.js', () => ({
    WeatherManager: class {
        constructor() { }
        update() { }
        setWeather() { }
        updateSkyColor() { }
    }
}));

describe('Save/Load Job Restoration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        Unit.nextId = 0;
    });

    afterEach(() => {
        if (window.game) {
            window.game.dispose();
            window.game = null;
        }
        localStorage.removeItem('god_game_save_999');
        localStorage.removeItem('god_game_save_1000');
        vi.restoreAllMocks();
    });

    it('should restore unit ID and re-link to Job correctly', async () => {
        const game = new Game();
        await game.readyPromise;
        window.game = game;
        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.calculateRegions = vi.fn();
        game.terrain.deserialize = vi.fn().mockResolvedValue(true);

        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        unit.id = 55;
        game.units.push(unit);

        const req = game.addRequest('raise', 12, 12, true);
        req.id = 'req_manual_1';
        unit.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = unit.id;

        expect(unit.id).toBe(55);
        expect(req.assignedTo).toBe(55);

        const saveData = game.saveGame(999);
        expect(saveData).toBe(true);

        const val = localStorage.getItem('god_game_save_999');
        const decompressed = LZString.decompressFromUTF16(val);
        const json = JSON.parse(decompressed);

        const savedUnit = json.data.units[0];
        expect(savedUnit.id).toBe(55);

        game.units.length = 0;
        game.requestQueue.length = 0;
        Unit.nextId = 0;

        const success = await game.loadGame(999);


        expect(success).toBe(true);
        expect(game.units.length).toBe(1);
        const restoredUnit = game.units[0];
        expect(restoredUnit.id).toBe(55);
        expect(Unit.nextId).toBe(56);

        expect(game.requestQueue.length).toBe(1);
        const restoredReq = game.requestQueue[0];
        expect(restoredReq.id).toBe('req_manual_1');
        expect(restoredReq.assignedTo).toBe(55);

        expect(restoredUnit.targetRequest).toBe(restoredReq);
        expect(restoredUnit.state.constructor.name).toBe('Job');
        expect(restoredUnit.action).toBe('Approaching Job');

        window.game = null;
    });

    it('should reset ghost-assigned requests during load', async () => {
        const game = new Game();
        await game.readyPromise;
        window.game = game;
        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.calculateRegions = vi.fn();
        game.terrain.deserialize = vi.fn().mockResolvedValue(true);

        const savedData = {
            timestamp: Date.now(),
            data: {
                resources: {},
                gameTime: 12,
                terrain: {
                    logicalWidth: 80,
                    logicalDepth: 80,
                    grid: [],
                    buildings: []
                },
                units: [],
                requests: [
                    { id: 'req_ghost', type: 'raise', x: 5, z: 5, status: 'assigned', assignedTo: 99, isManual: true }
                ]
            }
        };
        const compressed = LZString.compressToUTF16(JSON.stringify(savedData));
        localStorage.setItem('god_game_save_1000', compressed);

        await game.loadGame(1000);


        expect(game.requestQueue.length).toBe(1);
        const req = game.requestQueue[0];
        expect(req.status).toBe('pending');
        expect(req.assignedTo).toBeNull();

        window.game = null;
    });
});
