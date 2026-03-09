
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game.ts';
import { Wander, Job, Combat, Sleep } from '../ai/states/UnitStates.js';
console.log("[DEBUG] Wander class type in test:", typeof Wander);
import { SaveManager } from '../SaveManager.js';
import LZString from 'lz-string';

describe('Save/Load Full State Logic', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        game = new Game(undefined, undefined, true); // minimal mode
        window.game = game;
    });

    it('should serialize and deserialize mana, squads, and battle statistics correctly', async () => {
        // 1. Setup State
        game.mana = 42;
        game.resources = { grain: 100, fish: 50, meat: 25 };

        // Mock Squads
        game.squads.set(123, {
            id: 123,
            type: 'hunter',
            target: { x: 10, z: 20 },
            members: [1, 2, 3],
            action: 'traveling'
        });

        // Mock Battle Memory
        game.battleMemory.reportRaid(5, 5, 100);
        game.battleHotspots = [{ x: 5, z: 5, intensity: 1.0, time: 100 }];
        game.raidPoints = [{ x: 5, z: 5, time: 100 }];

        // 2. Save
        const result = game.saveGame('test_slot');
        expect(result).toBe(true);

        // Capture saved data
        const callArgs = localStorage.setItem.mock.calls[0];
        const val = callArgs[1];
        const decompressed = LZString.decompressFromUTF16(val);
        const saveData = JSON.parse(decompressed).data;

        // Verify SaveData contents
        expect(saveData.mana).toBe(42);
        expect(saveData.squads).toBeDefined();
        expect(saveData.squads.length).toBe(1);
        expect(saveData.squads[0][0]).toBe(123); // Map Key
        expect(saveData.battleMemory).toBeDefined();
        expect(saveData.battleMemory.length).toBe(1);
        expect(saveData.battleHotspots.length).toBe(1);
        expect(saveData.raidPoints.length).toBe(1);
        console.log("Save data verified.");

        // 3. Clear and Load
        console.log("--- STARTING LOAD PHASE ---");
        let newGame;
        try {
            newGame = new Game(undefined, undefined, true);
            newGame.camera = { position: { set: vi.fn() }, zoom: 1, updateProjectionMatrix: vi.fn() };
            newGame.controls = { target: { set: vi.fn() }, update: vi.fn() };
            console.log("newGame instance created with mocks.");

            // Manual dependency injection for test
            newGame.terrain = {
                deserialize: vi.fn().mockResolvedValue(true),
                getTileHeight: vi.fn().mockReturnValue(10),
                getBuildingAt: vi.fn().mockReturnValue(null),
                setSeason: vi.fn(),
                updateMesh: vi.fn(),
                calculateRegions: vi.fn()
            };
            newGame.goblinRenderer = { init: vi.fn().mockResolvedValue(true) };
            newGame.unitRenderer = { init: vi.fn().mockResolvedValue(true) };
            newGame.buildingRenderer = { forceUpdate: false };
            console.log("Sub-systems mocked.");

            console.log("Executing: await newGame.loadGame('test_slot')");
            const success = await newGame.loadGame('test_slot');
            console.log("DONE 执行 await newGame.loadGame. Result:", success);
            expect(success).toBe(true);
        } catch (err) {
            console.error("!!! LOAD PHASE FAILED WITH ERROR:", err);
            console.error("Error Stack:", err.stack);
            throw err;
        }

        console.log("Verifying restored state...");
        // 4. Verify Restoration
        expect(newGame.mana).toBe(42);
        expect(newGame.resources.grain).toBe(100);
        expect(newGame.squads.has(123)).toBe(true);
        expect(newGame.squads.get(123).type).toBe('hunter');
        expect(newGame.battleMemory.raids.length).toBe(1);
        expect(newGame.battleMemory.raids[0].x).toBe(5);
        expect(newGame.battleHotspots.length).toBe(1);
        expect(newGame.raidPoints.length).toBe(1);
    });
});
