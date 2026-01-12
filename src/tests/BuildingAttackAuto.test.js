
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';
import { UnitWanderState, CombatState } from '../ai/states/UnitStates.js';

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
            buildings: [],
            grid: []
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
        unit.state = new UnitWanderState(unit);
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

        // Time Slicing Bypass: Set frame such that (frame + id + 5) % 10 == 0
        // id=1. (frame + 6) % 10 == 0 -> frame=4
        if (window.game) window.game.frameCounter = 4;

        unit.searchSurroundings(10, 10, []);

        expect(unit.targetBuilding).toBe(hut);

        // Now update WanderState
        unit.checkSelfDefense = vi.fn().mockReturnValue(true); // Allow self defense

        unit.state.update(0.1, 0.1);

        expect(unit.state).toBeInstanceOf(CombatState);
        // Distance is 5, so it should be Chasing initially
        expect(['Fighting', 'Chasing']).toContain(unit.action);
        console.log('Unit successfully entered CombatState for Building');
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

        // Time Slicing Bypass
        if (window.game) window.game.frameCounter = 4;

        unit.searchSurroundings(10, 10, []);
        // Worker MIGHT find it.

        // Force busy check
        unit.isMoving = true;

        // We modified UnitStates to check (this.actor.targetGoblin || this.actor.targetBuilding) inside isAttack
        // But checkSelfDefense should return false for busy worker

        // Let's manually set target
        unit.targetBuilding = hut;

        // Update state
        unit.state.update(0.1, 0.1);

        // Explicitly check that state is NOT CombatState
        // Worker with request transitions to JobState automatically in WanderState
        expect(unit.state).not.toBeInstanceOf(CombatState);
        expect(unit.action).not.toBe('Fighting');
        console.log('Worker correctly ignored combat due to job');
    });
});
