import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit'; // Adjust path if needed
import { Game } from '../Game';

describe('Unit Combat Fixes', () => {
    let mockScene;
    let mockTerrain;
    let unit;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        mockTerrain = {
            grid: [],
            getTileHeight: vi.fn(() => 1),
            checkFlatArea: vi.fn(() => true)
        };

        // Mock Unit (Partial)
        unit = new Unit(mockScene, mockTerrain, 10, 10, 'soldier');

        // Mock sub-methods to verify dispatcher
        unit.attackGoblin = vi.fn();
        unit.attackBuilding = vi.fn();
        unit.attackUnit = vi.fn();
    });

    it('should dispatch to attackGoblin when target is a Goblin', () => {
        const goblin = {
            constructor: { name: 'GoblinWarrior' }, // Mock constructor name check
            id: 99,
            gridX: 11, gridZ: 11
        };

        unit.attack(goblin, 100);
        expect(unit.attackGoblin).toHaveBeenCalledWith(goblin);
        expect(unit.attackBuilding).not.toHaveBeenCalled();
        expect(unit.attackUnit).not.toHaveBeenCalled();
    });

    it('should dispatch to attackBuilding when target is a Building', () => {
        const building = {
            type: 'building',
            userData: { type: 'house', id: 50 },
            id: 50,
            gridX: 12, gridZ: 12
        };

        unit.attack(building, 100);
        expect(unit.attackBuilding).toHaveBeenCalledWith(building);
        expect(unit.attackGoblin).not.toHaveBeenCalled();
    });

    it('should dispatch to attackUnit when target is a Unit/Sheep', () => {
        const sheep = {
            constructor: { name: 'Sheep' },
            type: 'passive',
            id: 200,
            gridX: 13, gridZ: 13
        };

        unit.attack(sheep, 100);
        expect(unit.attackUnit).toHaveBeenCalledWith(sheep);
    });

    it('should handle missing target gracefully', () => {
        unit.attack(null, 100);
        expect(unit.attackGoblin).not.toHaveBeenCalled();
        expect(unit.attackBuilding).not.toHaveBeenCalled();
        expect(unit.attackUnit).not.toHaveBeenCalled();
    });
});
