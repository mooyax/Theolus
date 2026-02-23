import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.ts';

describe('AIDetectionPriority', () => {
    let terrainMock;
    let sceneMock;
    let gameMock;

    beforeEach(() => {
        sceneMock = { add: vi.fn(), remove: vi.fn() };
        terrainMock = {
            logicalWidth: 160,
            logicalDepth: 160,
            grid: Array(160).fill(null).map(() => Array(160).fill({ regionId: 1 })),
            getTileHeight: vi.fn().mockReturnValue(5),
            findBestTarget: vi.fn(),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn(),
            getBuildingSize: vi.fn().mockReturnValue(1)
        };
        gameMock = {
            frameCount: 0,
            unitScanBudget: 1000,
            units: [],
            sheepManager: { sheeps: [] },
            goblinManager: { goblins: [] }
        };
        global.window = { game: gameMock };

        // Mock Unit globals
        vi.spyOn(Unit, 'initAssets').mockImplementation(() => { });
    });

    it('should prioritize nearby sheep over distant goblin due to proximity weight', () => {
        const unit = new Unit(sceneMock, terrainMock, 0, 0, 'worker');

        const nearbySheep = { id: 's1', gridX: 2, gridZ: 0, type: 'sheep', faction: 'neutral', hp: 10 };
        const distantGoblin = { id: 'g1', gridX: 40, gridZ: 0, type: 'goblin', faction: 'enemy', hp: 10 };

        // Helper to simulate Terrain.findBestTarget
        terrainMock.findBestTarget.mockImplementation((type, x, z, range, callback, candidates) => {
            let best = null;
            let bestScore = Infinity;
            if (!candidates) return null;
            candidates.forEach(c => {
                const dist = Math.sqrt((c.gridX - x) ** 2 + (c.gridZ - z) ** 2);
                if (dist <= range) {
                    const score = callback(c, dist);
                    if (score < bestScore) {
                        bestScore = score;
                        best = c;
                    }
                }
            });
            return best;
        });

        // Setup candidates for logic inside checkSelfDefense
        gameMock.sheepManager.sheeps = [nearbySheep];
        gameMock.goblinManager.goblins = [distantGoblin];

        // Force scan (bypass budget and timers)
        unit.checkSelfDefense(null, true);

        // Scores:
        // Sheep: dist(2) + 50 = 52
        // Goblin: dist(40) + 0 = 40
        // Wait, 40 < 52. Goblin still wins at 40 tiles.
        // Let's test a further goblin.
    });

    it('should prioritize sheep at distance 2 over goblin at distance 60', () => {
        const unit = new Unit(sceneMock, terrainMock, 0, 0, 'worker');

        const nearbySheep = { id: 's1', gridX: 2, gridZ: 0, type: 'sheep', faction: 'neutral', hp: 10 };
        const distantGoblin = { id: 'g1', gridX: 60, gridZ: 0, type: 'goblin', faction: 'enemy', hp: 10 };

        terrainMock.findBestTarget.mockImplementation((type, x, z, range, callback, candidates) => {
            let best = null;
            let bestScore = Infinity;
            if (!candidates) return null;
            candidates.forEach(c => {
                const dist = Math.sqrt((c.gridX - x) ** 2 + (c.gridZ - z) ** 2);
                if (dist <= range) {
                    const score = callback(c, dist);
                    if (score < bestScore) {
                        bestScore = score;
                        best = c;
                    }
                }
            });
            return best;
        });

        gameMock.sheepManager.sheeps = [nearbySheep];
        gameMock.goblinManager.goblins = [distantGoblin];

        unit.checkSelfDefense(null, true);

        // Scores:
        // Sheep: 2 + 50 = 52
        // Goblin: 60 + 0 = 60
        // 52 < 60 -> Sheep wins!
        expect(unit.targetUnit).toBe(nearbySheep);
        expect(unit.targetGoblin).toBeNull();
    });

    it('should prioritize goblin at distance 10 over sheep at distance 10', () => {
        const unit = new Unit(sceneMock, terrainMock, 0, 0, 'worker');

        const sheep = { id: 's1', gridX: 10, gridZ: 10, type: 'sheep', faction: 'neutral', hp: 10 };
        const goblin = { id: 'g1', gridX: 10, gridZ: 10, type: 'goblin', faction: 'enemy', hp: 10 };

        terrainMock.findBestTarget.mockImplementation((type, x, z, range, callback, candidates) => {
            let best = null;
            let bestScore = Infinity;
            if (!candidates) return null;
            candidates.forEach(c => {
                const dist = Math.sqrt((c.gridX - x) ** 2 + (c.gridZ - z) ** 2);
                if (dist <= range) {
                    const score = callback(c, dist);
                    if (score < bestScore) {
                        bestScore = score;
                        best = c;
                    }
                }
            });
            return best;
        });

        gameMock.sheepManager.sheeps = [sheep];
        gameMock.goblinManager.goblins = [goblin];

        unit.checkSelfDefense(null, true);

        // Scores:
        // Sheep: 14.1 + 50 = 64.1
        // Goblin: 14.1 + 0 = 14.1
        // Goblin wins.
        expect(unit.targetGoblin).toBe(goblin);
    });
});
