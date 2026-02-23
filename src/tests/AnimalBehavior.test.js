import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Sheep } from '../Sheep.js';

describe('AnimalBehavior', () => {
    let terrainMock;
    let sceneMock;

    beforeEach(() => {
        sceneMock = {
            add: vi.fn(),
            remove: vi.fn()
        };

        terrainMock = {
            logicalWidth: 160,
            logicalDepth: 160,
            getTileHeight: vi.fn().mockReturnValue(10),
            unregisterEntity: vi.fn(),
            registerEntity: vi.fn()
        };

        // Static mocks for Sheep visuals
        vi.spyOn(Sheep, 'initAssets').mockImplementation(() => { });
        vi.spyOn(Sheep.prototype, 'createMesh').mockImplementation(() => ({
            position: { copy: vi.fn() },
            rotation: { y: 0 },
            userData: {}
        }));
    });

    it('should calculate flee vector correctly across wrap-around boundaries', () => {
        // Sheep at x=1, Predator at x=159. 
        // Wrapped distance is 2. Flee direction should be TOWARDS +x.
        const sheep = new Sheep(sceneMock, terrainMock, 1, 10);
        const predator = { gridX: 159, gridZ: 10, type: 'goblin' };

        // Mock smartMove to capture the target coordinates
        const smartMoveSpy = vi.spyOn(sheep, 'smartMove').mockImplementation(() => { });

        sheep.fleeFrom(predator, 0);

        // Vector away from 159 to 1 (wrapped) is +2.
        // Flee dist is 6. So target should be roughly 1 + 6 = 7.
        expect(smartMoveSpy).toHaveBeenCalled();
        const [tx, tz] = smartMoveSpy.mock.calls[0];
        console.log(`[TEST] Flee across boundary result: tx=${tx}, tz=${tz}`);

        expect(tx).toBeGreaterThan(1); // Moving away from 159 (which is to the left in wrapped space)
        expect(tx).toBeLessThan(10);
        expect(tz).toBe(10);
    });

    it('should wrap target coordinates correctly in fleeFrom', () => {
        terrainMock.logicalWidth = 100;
        terrainMock.logicalDepth = 100;

        const sheep = new Sheep(sceneMock, terrainMock, 0, 0);
        const predator = { gridX: 1, gridZ: 0 }; // Predator to the right

        // Flee from 1 towards -x. 0 -> -6. Wrapped should be 94.
        const smartMoveSpy = vi.spyOn(sheep, 'smartMove').mockImplementation(() => { });

        sheep.fleeFrom(predator, 0);

        const [tx, tz] = smartMoveSpy.mock.calls[0];
        expect(tx).toBe(94);
        expect(tz).toBe(0);
    });
});
