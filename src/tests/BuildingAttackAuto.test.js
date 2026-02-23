import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';
import { Wander, Combat } from '../ai/states/UnitStates.js';

describe('Autonomous Building Attack', () => {
    let unit;
    let terrain;
    let game;

    beforeEach(() => {
        terrain = {
            getTileHeight: vi.fn().mockReturnValue(10),
            findBestTarget: vi.fn(),
            findPath: vi.fn().mockReturnValue([{ x: 10, z: 15 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 15 }]),
            buildings: [],
            grid: [],
            isReachable: () => true
        };

        game = {
            gameTotalTime: 0,
            simTotalTimeSec: 0,
            frameCounter: 0,
            goblinManager: { goblins: [] },
            reportGlobalBattle: vi.fn(),
        };
        

        unit = new Unit(null, terrain, 10, 10, 'knight');
        unit.id = 1;
        unit.game = game;
        unit.state = new Wander(unit);
    });

    it('should automatically engage a nearby goblin hut', () => {
        const hut = {
            id: 'hut1',
            gridX: 10,
            gridZ: 15,
            userData: { type: 'goblin_hut', hp: 100 }
        };
        terrain.buildings = [hut];

        unit.getDistance = (x, z) => Math.sqrt(Math.pow(x - unit.gridX, 2) + Math.pow(z - unit.gridZ, 2));

        terrain.findBestTarget = (type, x, z, range, filter, candidates) => {
            if (type === 'building') {
                return hut;
            }
            return null;
        };

        unit.checkSelfDefense(null, true);

        expect(unit.targetBuilding).toBe(hut);
        unit.state.update(0.1, 0.1);

        expect(unit.state).toBeInstanceOf(Combat);
        expect(['Fighting', 'Chasing']).toContain(unit.action);
    });

    it('should NOT engage if worker (safeguard check)', () => {
        unit.role = 'worker';
        unit.targetRequest = { id: 1 };

        const hut = {
            id: 'hut1',
            gridX: 10,
            gridZ: 15,
            userData: { type: 'goblin_hut', hp: 100 }
        };
        terrain.buildings = [hut];
        terrain.findBestTarget = (type) => hut;

        if (window.game) window.game.frameCount = 4;
        unit.checkSelfDefense(null, false);
        unit.targetBuilding = hut;

        unit.state.update(0.1, 0.1);

        expect(unit.state).not.toBeInstanceOf(Combat);
        expect(unit.action).not.toBe('Fighting');
    });
});
