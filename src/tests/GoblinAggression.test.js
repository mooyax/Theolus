import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Combat, Wander } from '../ai/states/GoblinStates.js';
import * as THREE from 'three';

if (typeof window !== 'undefined') {
    window.game = null;
}

const mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
const mockTerrain = {
    findBestTarget: vi.fn(() => null),
    findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 10 }, { x: 20, z: 20 }]),
    getTileHeight: () => 10,
    gridToWorld: (x) => x,
    getVisualOffset: () => ({ x: 0, y: 0 }),
    getBuildingSize: () => 1,
    getRegion: () => 1,
    grid: [],
    buildings: [],
    removeBuilding: vi.fn(),
    registerEntity: vi.fn(),
    unregisterEntity: vi.fn(),
    findBestTarget: (type, x, z, rad, cost, list) => {
        let best = null;
        let bestScore = Infinity;
        if (list) {
            for (const e of list) {
                const d = Math.sqrt((e.gridX - x) ** 2 + (e.gridZ - z) ** 2);
                if (d <= rad) {
                    const score = cost(e, d);
                    if (score < bestScore) { bestScore = score; best = e; }
                }
            }
        }
        return best;
    },
    findPath: (sx, sz, ex, ez) => [{ x: ex, z: ez }],
    findPathAsync: (sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }]),
    isReachable: () => true,
    pathfindingCalls: 0
};

for (let x = 0; x < 40; x++) {
    mockTerrain.grid[x] = [];
    for (let z = 0; z < 40; z++) {
        mockTerrain.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false };
    }
}

describe('Goblin Aggression Bug', () => {
    let goblin;
    let unitTarget;

    beforeEach(() => {
        mockTerrain.buildings = [];
        vi.clearAllMocks();

        goblin = new Goblin(mockScene, mockTerrain, 10, 10, 'normal', null, null);

        unitTarget = {
            id: 'unit_victim',
            gridX: 15,
            gridZ: 10,
            hp: 100,
            maxHp: 100,
            isDead: false,
            isFinished: false,
            userData: { type: 'knight' },
            position: { x: 15, y: 10, z: 10, clone: () => ({ add: () => ({}) }) },
            takeDamage: vi.fn((amt) => { unitTarget.hp -= amt; })
        };
    });

    it('should find target, chase, and attack', async () => {
        mockTerrain.findBestTarget = vi.fn((type, x, z, rad) => {
            const d = Math.sqrt((unitTarget.gridX - x) ** 2 + (unitTarget.gridZ - z) ** 2);
            if (d <= rad) return unitTarget;
            return null;
        });

        expect(goblin.state.constructor.name).toBe('Wander');

        goblin.state.scanTimer = 2.0;
        goblin.updateLogic(0, 0.1, [unitTarget], []);

        expect(goblin.targetUnit).toBe(unitTarget);
        expect(goblin.state.constructor.name).toBe('Combat');

        goblin.updateLogic(0, 0.1, [unitTarget], []);

        await new Promise(resolve => setTimeout(resolve, 0));
        goblin.updateLogic(0.1, 0.1);

        expect(goblin.isMoving).toBe(true);
        goblin.gridX = 14;
        goblin.updateLogic(0, 0.1, [unitTarget], []);
        goblin.gridX = 13;
        goblin.updateLogic(0, 0.1, [unitTarget], []);
        goblin.gridX = 12;

        goblin.attackCooldown = 0;
        goblin.updateLogic(0, 0.1, [unitTarget], []);

        expect(unitTarget.takeDamage).toHaveBeenCalled();
    });

});