
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';
import { Wander, Combat } from '../ai/states/UnitStates.js';

describe('Autonomous Building Attack', () => {
    let unit;
    let terrain;
    let game;

    beforeEach(() => {
        // Mock Terrain
        terrain = {
            getTileHeight: vi.fn().mockReturnValue(10), // Flat
            findBestTarget: vi.fn(), // We will mock this specifically
            findPath: vi.fn().mockReturnValue([{ x: 10, z: 15 }]), // Mock findPath
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 15 }]), // Mock findPathAsync
            buildings: [],
            grid: [],
            isReachable: () => true
        };

        // Mock Game
        game = {
            gameTotalTime: 0,
            simTotalTimeSec: 0,
            frameCounter: 0,
            goblinManager: { goblins: [] },
            reportGlobalBattle: vi.fn(), // Mock reportGlobalBattle
        };
        global.window = { game };

        unit = new Unit(null, terrain, 10, 10, 'knight');
        unit.id = 1;
        unit.game = game; // Explicitly set game
        unit.state = new Wander(unit);
        console.log('Unit created. Game set:', !!unit.game);
    });

    it('should automatically engage a nearby goblin hut', () => {
        // Setup: A Goblin Hut nearby (distance 5)
        const hut = {
            id: 'hut1',
            gridX: 10,
            gridZ: 15,
            userData: { type: 'goblin_hut', hp: 100 }
        };
        terrain.buildings = [hut];

        // Mock getDistance to work
        unit.getDistance = (x, z) => Math.sqrt(Math.pow(x - unit.gridX, 2) + Math.pow(z - unit.gridZ, 2));

        // Let's Mock findBestTarget. 
        // In Unit.js: this.terrain.findBestTarget('building', ...)
        terrain.findBestTarget = (type, x, z, range, filter, candidates) => {
            if (type === 'building') {
                console.log('Mock findBestTarget called for building');
                return hut;
            }
            return null;
        };

        // Time Slicing Bypass: Use forceScan=true
        unit.checkSelfDefense(null, true);

        expect(unit.targetBuilding).toBe(hut);

        // Now update WanderState
        // unit.checkSelfDefense = vi.fn().mockReturnValue(true); // Allow self defense

        unit.state.update(0.1, 0.1);

        expect(unit.state).toBeInstanceOf(Combat);
        // Distance is 5, so it should be Chasing initially
        expect(['Fighting', 'Chasing']).toContain(unit.action);
        console.log('Unit successfully entered Combat for Building');
    });

    it('should NOT engage if worker (safeguard check)', () => {
        unit.role = 'worker';
        unit.targetRequest = { id: 1 }; // Busy working

        const hut = {
            id: 'hut1',
            gridX: 10,
            gridZ: 15,
            userData: { type: 'goblin_hut', hp: 100 }
        };
        terrain.buildings = [hut];
        // Worker only targets huts, but prioritized?

        terrain.findBestTarget = (type) => hut; // Even if it finds it...

        // Time Slicing Bypass: Set frame such that scan is allowed but NOT forced
        if (window.game) window.game.frameCount = 4; // Bypasses time-slicing
        unit.checkSelfDefense(null, false);
        // Worker with request stays busy, so shouldScan should be false!

        // Let's manually set target to ensure we test the state transition
        unit.targetBuilding = hut;

        // Update state
        unit.state.update(0.1, 0.1);

        // Explicitly check that state is NOT Combat
        // Worker with request transitions to Job automatically in WanderState
        expect(unit.state).not.toBeInstanceOf(Combat);
        expect(unit.action).not.toBe('Fighting');
        console.log('Worker correctly ignored combat due to job');
    });
});
