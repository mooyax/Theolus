
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Job } from '../ai/states/UnitStates.js'; // Use proper import

describe('Combat Retaliation System', () => {
    let game;
    let unit;
    let goblin;
    let terrainMock;

    beforeEach(() => {
        global.requestAnimationFrame = vi.fn();
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'initMarkerMaterial').mockImplementation(() => { });

        window.alert = vi.fn();

        if (THREE.Color && !THREE.Color.prototype.clone) {
            THREE.Color.prototype.clone = function () { return new THREE.Color().copy(this); };
        }

        game = new Game(undefined, undefined, true);
        window.game = game;

        game.directionalLight = new THREE.DirectionalLight();
        game.ambientLight = new THREE.AmbientLight();

        terrainMock = {
            grid: [],
            logicalWidth: 40,
            logicalDepth: 40,
            getWidth: () => 40,
            getDepth: () => 40,
            getTileHeight: vi.fn().mockReturnValue(1),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            findBestTarget: vi.fn(),
            moveEntity: vi.fn(),
            checkFlatArea: vi.fn().mockReturnValue(true),
            scene: game.scene,
            gridToWorld: (g) => new THREE.Vector3(g.x, 1, g.z),
            findPath: vi.fn().mockReturnValue([{ x: 10, z: 10 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 11, z: 10 }]),
            isWalkable: vi.fn().mockReturnValue(true),
            isReachable: vi.fn().mockReturnValue(true),
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 }),
            isValidGrid: (x, z) => x >= 0 && x < 40 && z >= 0 && z < 40
        };
        for (let x = 0; x < 40; x++) {
            terrainMock.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                terrainMock.grid[x][z] = { regionId: 1, height: 1 };
            }
        }
        game.terrain = terrainMock;

        unit = new Unit(game.scene, terrainMock, 10, 10, 'worker');
        goblin = new Goblin(game.scene, terrainMock, 11, 10, 'normal');

        // Instance-level mocks
        unit.initAssets = vi.fn();
        goblin.initAssets = vi.fn();

        game.units.push(unit);
        game.goblinManager.goblins.push(goblin);
    });

    afterEach(() => {
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = null;
        vi.restoreAllMocks();
    });

    const runUpdateLoop = (testUnit, goblins) => {
        for (let i = 0; i < 25; i++) {
            testUnit.updateLogic(100 + i, 0.1, false, [], [], goblins);
            if (testUnit.state && testUnit.state.constructor.name === 'Combat') break;
        }
    };

    it('should retaliate when hit while working (Job)', () => {
        const dummyReq = { id: 'req1', type: 'move', x: 30, z: 30, assignedTo: unit.id, isManual: true };
        unit.targetRequest = dummyReq;

        unit.changeState(new Job(unit));

        expect(unit.state && unit.state.constructor.name).toBe('Job');

        const initialHp = unit.hp;
        unit.takeDamage(5, goblin);

        expect(unit.hp).toBeLessThan(initialHp);
        expect(unit.targetGoblin).toBe(goblin);

        runUpdateLoop(unit, [goblin]);

        expect(unit.state && unit.state.constructor.name).toBe('Combat');
        expect(unit.action).toBe('Fighting');
    });

    it('should switch strictly for self-defense scan failure in Job (Non-worker)', () => {
        terrainMock.findBestTarget.mockReturnValue(goblin);
        unit.id = 0;
        unit.role = 'knight';
        unit.changeState(new Job(unit));
        unit.targetRequest = { id: 'req2', type: 'patrol', x: 30, z: 30, assignedTo: unit.id, status: 'assigned' };

        runUpdateLoop(unit, [goblin]);
        expect(unit.state && unit.state.constructor.name).toBe('Combat');
    });
});