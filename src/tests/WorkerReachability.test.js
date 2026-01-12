import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Worker Job Reachability', () => {
    let mockGame;
    let mockUnit;
    let mockTerrain;

    beforeEach(() => {
        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            grid: []
        };

        // Initialize grid
        for (let x = 0; x < 100; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                mockTerrain.grid[x][z] = { regionId: 1 };
            }
        }

        mockUnit = {
            id: 1,
            gridX: 10,
            gridZ: 10,
            role: 'worker',
            isReachable: vi.fn((tx, tz) => {
                const tCell = mockTerrain.grid[tx][tz];
                return tCell.regionId === 1; // Only same region reachable
            })
        };

        mockGame = {
            units: [mockUnit],
            requestQueue: [],
            terrain: mockTerrain,
            timeScale: 1.0,
            findBestRequest: vi.fn().mockImplementation((unit, snatch) => {
                // Simplified version of Game.js logic for mock
                return mockGame.requestQueue.find(r => {
                    const reachable = unit.isReachable(r.x, r.z);
                    return r.status === 'pending' && reachable;
                }) || null;
            }),
            assignRequestSync: vi.fn(),
            releaseRequest: vi.fn()
        };
    });

    it('findBestRequest filters out unreachable jobs', async () => {
        const { Game } = await import('../Game.js');
        const findBestRequest = Game.prototype.findBestRequest.bind(mockGame);

        // Job on an unreachable island (Region 2)
        mockTerrain.grid[50][50].regionId = 2;
        const unreachableReq = { id: 101, x: 50, z: 50, status: 'pending' };
        mockGame.requestQueue.push(unreachableReq);

        // Job on reachable island (Region 1)
        const reachableReq = { id: 102, x: 12, z: 12, status: 'pending' };
        mockGame.requestQueue.push(reachableReq);

        const best = findBestRequest(mockUnit);

        expect(best).toBeDefined();
        expect(best.id).toBe(102);
        expect(mockUnit.isReachable).toHaveBeenCalled();
    });

    it('forceAssignRequest skips unreachable units', async () => {
        const { Game } = await import('../Game.js');
        const forceAssignRequest = Game.prototype.forceAssignRequest.bind(mockGame);

        // Job on Region 2
        mockTerrain.grid[50][50].regionId = 2;
        const req = { id: 103, x: 50, z: 50, status: 'pending' };

        // mockUnit is on Region 1, so it shouldn't be picked for Region 2 job
        await forceAssignRequest(req);

        // Since it's async (setTimeout), we might need to wait or mock setTimeout
        // But forceAssignRequest uses ScorePenalty, let's just check if it FAILED to assign.
        // Actually, let's just verify the logic loop.

        // Wait for setTimeout
        await new Promise(r => setTimeout(r, 10));

        expect(req.status).toBe('pending'); // Still pending because no valid unit was found
        expect(req.assignedTo).toBeUndefined();
    });
});
