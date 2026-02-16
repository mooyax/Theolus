import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Game } from '../Game';
import { Unit } from '../Unit';
import { Job } from '../ai/states/UnitStates';

describe('Refuse Distraction Reconstructed', () => {
    let game;
    let unit;
    let mockTerrain;

    beforeEach(() => {
        vi.useFakeTimers();

        mockTerrain = {
            grid: Array.from({ length: 100 }, () => Array.from({ length: 100 }, () => ({ regionId: 1, height: 10, hasBuilding: false }))),
            logicalWidth: 100,
            logicalDepth: 100,
            getTileHeight: () => 10,
            getRegion: () => 1,
            isWalkable: () => true,
            checkCondition: () => true,
            getBuildingSize: () => 1,
            update: vi.fn(),
            getDistance: (x1, z1, x2, z2) => Math.sqrt((x1 - x2) ** 2 + (z1 - z2) ** 2),
            getVisualOffset: () => ({ x: 0, y: 0 }),
            addBuilding: vi.fn(),
            removeBuilding: vi.fn(),
        };

        game = new Game(null, mockTerrain, true);
        unit = new Unit(null, mockTerrain, 10, 10, 'worker');
        unit.id = 1; // Explicit ID
        game.units = [unit];
        window.game = game;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should initialize correctly', () => {
        expect(game).toBeDefined();
        expect(unit.id).toBe(1);
    });

    it('should prioritize MANUAL move marker over autonomous HOUSE BUILDING', () => {
        const manualReq = game.addRequest('move', 30, 30, true);
        unit.targetRequest = manualReq;
        manualReq.assignedTo = unit.id;
        manualReq.status = 'assigned';

        unit.changeState(new Job(unit));
        const canBuild = unit.tryBuildStructure(100);
        expect(canBuild).toBe(false);
    });

    it('should NOT Switch to a better Auto-Job if Manual Job is active', () => {
        const manualReq = game.addRequest('move', 30, 30, true);
        unit.targetRequest = manualReq;
        manualReq.assignedTo = unit.id;
        manualReq.status = 'assigned';
        unit.changeState(new Job(unit));

        const autoReq = game.addRequest('clear', 15, 15, false);
        // console.log(`[DEBUG TEST] manualReq:${manualReq.id} manual:${manualReq.isManual} autoReq:${autoReq.id} manual:${autoReq.isManual}`);

        const picked = game.findBestRequest(unit);
        // console.log(`[DEBUG TEST] picked:${picked?.id} manual:${picked?.isManual}`);

        if (picked?.id !== manualReq.id) {
            console.log(`[FAILURE] Picked ${picked?.id} instead of ${manualReq.id}`);
        }
        expect(picked?.id).toBe(manualReq.id);
    });
});
