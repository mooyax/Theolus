import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Wander, Job, Combat, Sleep, Build as UnitBuild } from '../ai/states/UnitStates.js';
import { Wander as GoblinWander, Build as GoblinBuild } from '../ai/states/GoblinStates.js';



describe('AI Unification & Tooltip Format', () => {
    let mockScene;
    let mockTerrain;

    beforeEach(() => {
        mockScene = new THREE.Scene();
        mockTerrain = {
            logicalWidth: 80,
            logicalDepth: 80,
            grid: Array(80).fill().map(() => Array(80).fill().map(() => ({
                height: 1,
                regionId: 1
            }))),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            getTileHeight: vi.fn().mockReturnValue(1),
            getInterpolatedHeight: vi.fn().mockReturnValue(1),
            getVisualOffset: vi.fn().mockReturnValue({ x: 0, y: 0 }),
            findBestTarget: vi.fn(),
            findPath: vi.fn(),
            findClosestReachablePoint: vi.fn(),
            getRandomPointInRegion: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            modifyMoisture: vi.fn(),
            checkFlatArea: vi.fn().mockReturnValue(true),
            moveEntity: vi.fn(),
            addBuilding: vi.fn().mockReturnValue({ id: 'b1', userData: { type: 'goblin_hut', HP: 10, faction: 'goblin' } }),
            gridToWorld: vi.fn((v) => v),
            worldToGrid: vi.fn((v) => v),
            wrap: vi.fn((v, m) => ((v % m) + m) % m),
            findBestRequest: vi.fn(),
            claimRequest: vi.fn(),
            assignRequestSync: vi.fn()
        };
        global.window = {
            game: {
                units: [],
                buildings: [],
                goblinManager: {
                    goblins: [],
                    clans: { 0: { active: true } },
                    getClanRaidTarget: vi.fn()
                },
                simTotalTimeSec: 0,
                getSquad: vi.fn(),
                reportSquadTarget: vi.fn(),
                reportGlobalBattle: vi.fn(),
                findBestRequest: vi.fn(),
                claimRequest: vi.fn(),
                assignRequestSync: vi.fn()
            }
        };
    });

    it('should show Moving action for both Human and Goblin when isMoving is true', () => {
        try {
            const unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
            unit.isMoving = true;
            unit.updateLogic(100, 0.016, false, [], [], []);
            expect(unit.action).toBe('Moving');

            const goblin = new Goblin(mockScene, mockTerrain, 20, 20, 'normal');
            goblin.isMoving = true;
            goblin.updateMovement = vi.fn(); // Prevent physics from resetting isMoving
            goblin.updateLogic(100, 0.016, [], [], []);
            expect(goblin.action).toBe('Moving');
        } catch (e) {
            console.error("CAUGHT ERROR:", e);
            throw e;
        }
    });

    it('should show Building action for both Human and Goblin in Build state', () => {
        const unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        const goblin = new Goblin(mockScene, mockTerrain, 20, 20, 'normal');

        const buildX = 15, buildZ = 15;

        // Use the actual classes since they set the action in 'enter'
        unit.changeState(new Wander(unit)); // Transition to Wander first
        goblin.changeState(new GoblinWander(goblin));

        // Now move to Build state or similar for humans?
        // Humans use Job state for building? No, I added Build state to UnitStates.js
        unit.changeState(new UnitBuild(unit));
        goblin.changeState(new GoblinBuild(goblin, buildX, buildZ));

        expect(unit.action).toBe('Building');
        expect(goblin.action).toBe('Building');
    });

    it('should have consistent tooltip data structure (id, name, action, hp, level)', () => {
        const unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        unit.id = 123;
        unit.name = "Worker Bob";
        unit.hp = 80;
        unit.maxHp = 100;
        unit.level = 2;
        unit.action = "Moving";

        const data = unit.serialize();
        // Check if essential fields exist for tooltip
        expect(data).toHaveProperty('id', 123);
        expect(data).toHaveProperty('name', "Worker Bob");
        expect(data).toHaveProperty('action', "Moving");
        expect(data).toHaveProperty('hp', 80);
        expect(data).toHaveProperty('maxHp', 100);
        expect(data).toHaveProperty('level', 2);
    });
});

