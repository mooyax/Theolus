
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit';
import { Terrain } from '../Terrain';
import * as THREE from 'three';

// Mock THREE
global.THREE = THREE;

describe('Unit Migration Logic', () => {
    let unit;
    let mockTerrain;

    beforeEach(() => {
        Unit.assets = { initialized: true };

        // Mock Window Game
        global.window = {
            game: {
                resources: { grain: 100 },
                totalPopulation: 100
            }
        };

        mockTerrain = {
            logicalWidth: 100,
            logicalDepth: 100,
            buildings: [],
            grid: [],
            getTileHeight: () => 1, // Valid land
            getInterpolatedHeight: () => 1,
            getVisualPosition: () => ({ x: 0, y: 0, z: 0 }),
            isValidGrid: () => true,
            checkFlatArea: vi.fn(), // Mock build checks
            addBuilding: vi.fn(),
            moveEntity: vi.fn(),
            getVisualOffset: () => ({ x: 0, y: 0 }),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
        };

        // Init Grid
        for (let x = 0; x < 100; x++) {
            mockTerrain.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                mockTerrain.grid[x][z] = { hasBuilding: false, height: 1, moisture: 0.5 };
            }
        }

        try {
            unit = new Unit(null, mockTerrain, 50, 50, 'worker');
        } catch (e) {
            console.error("UNIT CONSTRUCTOR FAILED:", e);
            throw e;
        }
        unit.id = 1;
        // Stub triggerMove to verify migration targeting
        unit.triggerMove = vi.fn();
        unit.updatePosition = vi.fn();

        // Suppress logs
        vi.spyOn(console, 'log').mockImplementation(() => { });
    });

    it('should return true on successful build', () => {
        unit.stagnationTimer = 4;

        // Mock success for House (2x2)
        mockTerrain.checkFlatArea.mockReturnValue(true);

        const result = unit.tryBuildStructure(1000);

        expect(mockTerrain.addBuilding).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should increment stagnation on failed build', () => {
        unit.stagnationTimer = 0;

        // Mock failure (Not flat)
        mockTerrain.checkFlatArea.mockReturnValue(false);
        // Also force Farm fail
        unit.buildFarm = () => false;

        // We need to call logic that triggers tryBuildStructure via updateMovement
        // But modifying tryBuildStructure directly is easier to test boolean return
        const result = unit.tryBuildStructure(1000);

        expect(result).toBe(false);

        // Let's test `updateMovement` integration (Simulate arrival)
        unit.isMoving = true;
        unit.moveStartTime = 0;
        unit.moveDuration = 100;

        try {
            unit.updateMovement(200); // Finish move
        } catch (e) {
            console.error("updateMovement FAILED:", e);
            throw e;
        }

        expect(unit.stagnationTimer).toBe(1);
    });

    it('should migrate after 5 failures', () => {
        unit.stagnationTimer = 5;
        mockTerrain.checkFlatArea.mockReturnValue(false);
        unit.buildFarm = () => false;

        unit.isMoving = true;
        unit.moveStartTime = 0;
        unit.moveDuration = 100;

        try {
            unit.updateMovement(200); // Fail 6th time -> Trigger Migrate
        } catch (e) {
            console.error("updateMovement FAILED:", e);
            throw e;
        }

        expect(unit.triggerMove).toHaveBeenCalled();
        // Verify distance > 10 (Migration) vs local (Building move is usually random small)
        const callArgs = unit.triggerMove.mock.calls[0];
        const tx = callArgs[0];
        const tz = callArgs[1];

        const dx = Math.abs(tx - 50);
        const dz = Math.abs(tz - 50);
        const dist = Math.sqrt(dx * dx + dz * dz);

        expect(dist).toBeGreaterThan(15);
    });
});
