
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Actor } from '../Actor.js';
import { Goblin } from '../Goblin.js';
import { Combat } from '../ai/states/UnitStates.js';

describe('Combat Stuck Investigation', () => {
    let unit;
    let goblin;
    let terrainMock;

    beforeEach(() => {
        window.game = {
            isNight: false,
            resources: {},
            releaseRequest: vi.fn(),
            completeRequest: vi.fn(),
            findBestRequest: vi.fn(),
            claimRequest: vi.fn().mockReturnValue(true),
            simTotalTimeSec: 0,
            frameCount: 0
        };

        terrainMock = {
            grid: Array(40).fill(null).map(() => Array(40).fill({ regionId: 1, height: 1 })),
            getTileHeight: vi.fn().mockReturnValue(1),
            findBestTarget: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            registerEntity: vi.fn(),
            scene: new THREE.Scene(),
            gridToWorld: (g) => g,
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 })
        };

        unit = new Unit(new THREE.Scene(), terrainMock, 10, 10, 'worker');
        unit.id = 1;

        unit.smartMove = vi.fn().mockReturnValue(true);
        unit.isUnreachable = false;
        unit.checkSelfDefense = vi.fn().mockReturnValue(false);

        goblin = new Goblin(new THREE.Scene(), terrainMock, 20, 10);
        goblin.id = 100;
        goblin.isDead = false;

        unit.targetGoblin = goblin;
        const combatState = new Combat(unit);
        unit.changeState(combatState);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should NOT get stuck in Combat state if target is unreachable', () => {
        unit.smartMove.mockImplementation(() => {
            unit.isUnreachable = true;
            return false;
        });

        unit.updateLogic(100, 0.1, false, [], [], [goblin]);
        expect(unit.smartMove).toHaveBeenCalled();
        expect(unit.isUnreachable).toBe(true);

        unit.updateLogic(101, 0.1, false, [], [], [goblin]);
        expect(unit.state).not.toBeInstanceOf(Combat);
        expect(unit.targetGoblin).toBeNull();
    });

    it('should NOT get stuck in Combat state if smartMove fails (No Path) even if isUnreachable is false', () => {
        unit.isUnreachable = false;
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));

        unit.smartMove.mockImplementation(() => {
            unit.isUnreachable = true;
            return false;
        });
        unit.updateLogic(102, 0.1, false, [], [], [goblin]);
        expect(unit.state).not.toBeInstanceOf(Combat);
    });

    it('should add unreachable target to ignoredTargets to prevent loop (Infinite Loop Prevention)', () => {
        unit.isUnreachable = false;
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));

        unit.smartMove.mockImplementation(() => {
            unit.isUnreachable = true;
            return false;
        });
        unit.updateLogic(103, 0.1, false, [], [], [goblin]);

        expect(unit.state).not.toBeInstanceOf(Combat);
        expect(unit.targetGoblin).toBeNull();
        expect(unit.ignoredTargets.has(goblin.id)).toBe(true);
    });

    it('should Handle Async Pathfinding Errors gracefully (prevent stuck state)', async () => {
        unit.isUnreachable = false;
        unit.targetGoblin = goblin;
        unit.changeState(new Combat(unit));

        terrainMock.findPathAsync = vi.fn().mockRejectedValue(new Error("Async Error Simulation"));
        unit.smartMove = Actor.prototype.smartMove.bind(unit);

        unit.updateLogic(200, 0.1, false, [], [], [goblin]);
        expect(terrainMock.findPathAsync).toHaveBeenCalled();

        await new Promise(resolve => setTimeout(resolve, 50));
        expect(unit.isUnreachable).toBe(true);
        expect(unit.isPathfinding).toBe(false);

        unit.updateLogic(201, 0.1, false, [], [], [goblin]);
        expect(unit.state).not.toBeInstanceOf(Combat);
    });
});