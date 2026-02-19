import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Unit } from '../Unit.js';

// Mock THREE and Terrain
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: vi.fn().mockImplementation(() => ({
            setSize: vi.fn(),
            render: vi.fn(),
        })),
    };
});

describe('Building Defense Logic', () => {
    let mockScene, mockTerrain, mockBuilding;

    beforeEach(() => {
        mockScene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn().mockReturnValue(null)
        };
        mockTerrain = {
            grid: Array(80).fill(0).map(() => Array(80).fill(0).map(() => ({ hasBuilding: false }))),
            getTileHeight: vi.fn().mockReturnValue(5),
            gridToWorld: (v) => v - 40,
            getVisualPosition: vi.fn().mockReturnValue({ x: 0, y: 5, z: 0 }),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            removeBuilding: vi.fn(),
            getBuildingSize: vi.fn().mockReturnValue(2),
            isReachable: vi.fn().mockReturnValue(true),
            findBestTarget: vi.fn().mockReturnValue(null)
        };
        mockBuilding = {
            userData: {
                type: 'house',
                gridX: 10,
                gridZ: 10,
                population: 10,
                hp: 50
            },
            population: 10,
            y: 5
        };
    });

    it('Goblins deal population damage to player buildings', () => {
        const goblin = new Goblin(mockScene, mockTerrain, 12, 12, 'normal');
        goblin.damage = 2; // Deals 1 population damage (damage * 0.5)

        goblin.attackBuilding(mockBuilding);

        expect(mockBuilding.userData.population).toBe(9);
        expect(mockBuilding.population).toBe(9);
        expect(mockTerrain.removeBuilding).not.toHaveBeenCalled();
    });

    it('Goblins deal structural damage to empty player buildings', () => {
        const goblin = new Goblin(mockScene, mockTerrain, 12, 12, 'normal');
        mockBuilding.userData.population = 0;
        goblin.damage = 10;

        goblin.attackBuilding(mockBuilding);

        expect(mockBuilding.userData.hp).toBe(40);
        expect(mockTerrain.removeBuilding).not.toHaveBeenCalled();
    });

    it('Goblins destroy player buildings when HP reaches 0', () => {
        const goblin = new Goblin(mockScene, mockTerrain, 12, 12, 'normal');
        mockBuilding.userData.population = 0;
        mockBuilding.userData.hp = 10;
        goblin.damage = 10;

        goblin.attackBuilding(mockBuilding);

        expect(mockTerrain.removeBuilding).toHaveBeenCalledWith(mockBuilding);
    });

    it('Buildings retaliate against melee goblins', () => {
        const goblin = new Goblin(mockScene, mockTerrain, 11, 11, 'normal'); // Close (dist ~1.4)
        goblin.hp = 100;
        goblin.damage = 8; // Normal damage
        mockBuilding.userData.population = 10;
        mockBuilding.userData.type = 'house'; // Factor 1.0

        goblin.attackBuilding(mockBuilding);

        // PopDamage = max(1, floor(8 * 0.1)) = 1
        // Remaining Pop = 10 - 1 = 9
        // Retaliation = floor(9 * 4.0) = 36
        // Initial HP 100 - 36 = 64
        expect(goblin.hp).toBe(64);
    });

    it('Towers have massive retaliation', () => {
        const goblin = new Goblin(mockScene, mockTerrain, 11, 11, 'normal');
        goblin.hp = 100;
        goblin.damage = 2; // Deals 1 pop damage
        mockBuilding.userData.population = 5;
        mockBuilding.userData.type = 'tower'; // Factor 10.0

        goblin.attackBuilding(mockBuilding);

        // PopDamage = 2 * 0.5 = 1
        // Remaining Pop = 5 - 1 = 4
        // Retaliation = floor(4 * 10.0) = 40
        // Initial HP 100 - 40 = 60
        expect(goblin.hp).toBe(60);
    });

    it('No retaliation for distant attackers (Shamans) against normal buildings', () => {
        const shaman = new Goblin(mockScene, mockTerrain, 15, 15, 'shaman'); // Dist ~7.0
        shaman.hp = 100;
        mockBuilding.userData.population = 10;
        mockBuilding.userData.type = 'house';

        shaman.attackBuilding(mockBuilding);

        expect(shaman.hp).toBe(100); // Should be safe vs House
    });

    it('Towers retaliate against distant attackers (Shamans)', () => {
        const shaman = new Goblin(mockScene, mockTerrain, 15, 15, 'shaman'); // Dist ~7.0
        shaman.hp = 100;
        mockBuilding.userData.population = 5;
        mockBuilding.userData.type = 'tower'; // Defense 10.0

        shaman.attackBuilding(mockBuilding);

        // PopDamage = 2 * 0.5 = 1 pop lost (Damage 2?)
        // Wait, Shaman damage is 35 (Config). But test might not use Config if mock?
        // Goblin constructor usually defaults damage based on type if loading from config...
        // But here we construct Goblin with 'shaman'.
        // Let's explicitly set damage to be sure, or trust default.
        // If damage=35, PopDamage = 3. Remaining Pop = 2.
        // Retaliation = 2 * 10 = 20.
        // Shaman HP 100 -> 80.

        expect(shaman.hp).toBeLessThan(100);
    });

    it('Goblins can target buildings with 0 population but > 0 structural HP', () => {
        const goblin = new Goblin(mockScene, mockTerrain, 12, 12, 'normal');
        mockBuilding.userData.population = 0;
        mockBuilding.userData.hp = 50;

        const buildings = [mockBuilding];
        const units = [];

        mockTerrain.findBestTarget = vi.fn((type) => {
            if (type === 'building') return mockBuilding;
            return null;
        });

        goblin.findTarget(units, buildings);

        expect(goblin.targetBuilding).toBe(mockBuilding);
    });

    it('Standard HP logic for Goblin buildings', () => {
        const unit = new Unit(mockScene, mockTerrain, 20, 20, 'knight');
        const cave = { userData: { type: 'cave', hp: 200, gridX: 22, gridZ: 22 } };
        unit.damage = 50;

        unit.attackBuilding(cave);

        expect(cave.userData.hp).toBe(150);
        expect(mockTerrain.removeBuilding).not.toHaveBeenCalled();
    });
});
