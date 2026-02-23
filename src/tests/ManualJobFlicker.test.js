
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Job } from '../ai/states/UnitStates.js';

describe('Manual Job Flicker Investigation', () => {
    let game;
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
            grid: [],
            getTileHeight: vi.fn().mockReturnValue(1),
            findBestTarget: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            registerEntity: vi.fn(),
            scene: new THREE.Scene(),
            gridToWorld: (g) => g,
            getVisualOffset: vi.fn().mockReturnValue({ x: 0, y: 0 })
        };
        for (let x = 0; x < 40; x++) {
            terrainMock.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                terrainMock.grid[x][z] = { regionId: 1, height: 1 };
            }
        }

        unit = new Unit(new THREE.Scene(), terrainMock, 10, 10, 'worker');
        unit.id = 1;
        unit.checkSelfDefense = vi.fn().mockImplementation((goblins) => {
            if (unit.targetGoblin) return true;
            if (goblins && goblins.length > 0) {
                const g = goblins[0];
                const dist = Math.sqrt((unit.gridX - g.gridX) ** 2 + (unit.gridZ - g.gridZ) ** 2);
                if (dist < 10) {
                    unit.targetGoblin = g;
                    return true;
                }
            }
            return false;
        });

        unit.smartMove = vi.fn();

        goblin = new Goblin(new THREE.Scene(), terrainMock, 15, 10);
        goblin.id = 100;
        goblin.isDead = false;
    });

    afterEach(() => {
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should NOT switch to Combat when performing a Manual Job, even if enemy is near', () => {
        const manualReq = { id: 'req_manual', type: 'move', x: 30, z: 10, assignedTo: unit.id, isManual: true, status: 'assigned' };
        unit.targetRequest = manualReq;

        const jobState = new Job(unit);
        unit.changeState(jobState);

        expect(unit.state).toBeInstanceOf(Job);

        unit.updateLogic(100, 0.1, false, [], [], [goblin]);

        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetGoblin).toBeNull();
    });
});