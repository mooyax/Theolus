
import { describe, it, expect, vi, beforeEach, beforeAll, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

global.THREE = THREE;
if (!global.window) global.window = { game: null };

describe('Unit Movement Wrapping', () => {
    let mockTerrain;
    let unit;

    beforeAll(() => {
        Unit.initAssets = vi.fn();
    });

    beforeEach(() => {
        const grid = Array(80).fill().map(() => Array(80).fill({ hasBuilding: false }));

        mockTerrain = {
            getTileHeight: (x, z) => 1,
            getInterpolatedHeight: (x, z) => 1,
            grid: grid,
            logicalWidth: 80, // Use 80 as in game
            logicalDepth: 80,
            getWidth: () => 80,
            getDepth: () => 80,
            getVisualPosition: () => ({ x: 0, y: 0, z: 0 }),
            moveEntity: vi.fn(),
            registerEntity: vi.fn(),
            getBuildingSize: () => 1,
            findPath: (sx, sz, ex, ez) => {
                const dx = ex - sx;
                const dz = ez - sz;
                const distSq = dx * dx + dz * dz;

                if (distSq < 100 && (Math.abs(dx) > 1 || Math.abs(dz) > 1)) {
                    return [
                        { x: (sx + Math.sign(dx) + 80) % 80, z: (sz + Math.sign(dz) + 80) % 80 },
                        { x: ex, z: ez }
                    ];
                }
                return [{ x: ex, z: ez }];
            },
            findPathAsync: async function (sx, sz, ex, ez) {
                return this.findPath(sx, sz, ex, ez);
            },
            getRegion: (x, z) => 1,
            isAdjacentToRegion: () => true,
            isValidGrid: (x, z) => x >= 0 && x < 80 && z >= 0 && z < 80,
            updateMeshPosition: vi.fn(),
            updateLights: vi.fn()
        };

        unit = new Unit({ add: vi.fn() }, mockTerrain, 0, 0, 'worker');
        unit.gridX = 0; unit.gridZ = 0;
        unit.targetGridX = 0; unit.targetGridZ = 0;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should move normally for short distances', async () => {
        unit.gridX = 10;
        unit.gridZ = 10;
        unit.triggerMove(15, 10, 1000);
        await new Promise(r => setTimeout(r, 0));
        unit.triggerMove(15, 10, 1001); // Retry with path

        expect(unit.targetGridX).toBe(11);
        expect(unit.targetGridZ).toBe(10);
    });

    it('should wrap LEFT if target is across right boundary', async () => {
        unit.gridX = 10;
        unit.gridZ = 10;
        unit.triggerMove(70, 10, 1000);
        await new Promise(r => setTimeout(r, 0));
        unit.triggerMove(70, 10, 1001);

        expect(unit.targetGridX).toBe(70);
        expect(unit.targetGridZ).toBe(10);
    });

    it('should wrap RIGHT if target is across left boundary', async () => {
        unit.gridX = 70;
        unit.gridZ = 10;
        unit.triggerMove(10, 10, 1000);
        await new Promise(r => setTimeout(r, 0));
        unit.triggerMove(10, 10, 1001);

        expect(unit.targetGridX).toBe(10);
        expect(unit.targetGridZ).toBe(10);
    });

    it('should handle Z axis wrapping', async () => {
        unit.gridX = 10;
        unit.gridZ = 10;
        unit.triggerMove(10, 70, 1000);
        await new Promise(r => setTimeout(r, 0));
        unit.triggerMove(10, 70, 1001);

        expect(unit.targetGridX).toBe(10);
        expect(unit.targetGridZ).toBe(70);
    });
});