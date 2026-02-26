import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Combat, Wander } from '../ai/states/GoblinStates.js';
import * as THREE from 'three';

const mockScene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
const mockTerrain = {
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
                    const score = cost ? cost(e, d) : d;
                    if (score < bestScore) { bestScore = score; best = e; }
                }
            }
        }
        return best;
    },
    findPath: (sx, sz, ex, ez) => [{ x: ex, z: ez }],
    findPathAsync: (sx, sz, ex, ez) => Promise.resolve([{ x: ex, z: ez }]),
    isReachable: () => true,
    getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 })
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
        window.game = {
            goblinManager: { notifyClanActivity: vi.fn() }
        };
        vi.clearAllMocks();

        goblin = new Goblin(mockScene, mockTerrain, 10, 10, 'normal', null, null);
        goblin.damage = 10;
        goblin.attackCooldown = 0;

        unitTarget = {
            id: 'unit_victim',
            gridX: 11, // Close enough to attack instantly
            gridZ: 10,
            hp: 100,
            maxHp: 100,
            isDead: false,
            isFinished: false,
            userData: { type: 'knight' },
            position: { x: 11, y: 10, z: 10, clone: () => ({ add: () => ({}) }) },
            takeDamage: vi.fn((amt) => { unitTarget.hp -= amt; })
        };
    });

    it('should find target, chase, and attack', async () => {
        // Force state transition
        goblin.targetUnit = unitTarget;
        goblin.changeState(new Combat(goblin));

        expect(goblin.targetUnit).toBe(unitTarget);
        expect(goblin.state.name).toBe('Combat');

        // Step 2: Execute attack
        goblin.attackCooldown = 0;
        goblin.updateLogic(100.1, 0.1, [unitTarget], []);

        expect(unitTarget.takeDamage).toHaveBeenCalled();
    });
});