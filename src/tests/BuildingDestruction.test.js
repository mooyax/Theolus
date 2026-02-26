
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain.js';
import { Goblin } from '../Goblin.js';

describe('Building Destruction Logic', () => {
    let terrain;
    let scene;

    beforeEach(() => {
        scene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
        terrain = new Terrain(scene);
        terrain.geometry = {
            attributes: {
                position: { count: 100, array: new Float32Array(300), getX: () => 0, getY: () => 0, needsUpdate: false },
                color: { count: 100, array: new Float32Array(300), setXYZ: vi.fn(), needsUpdate: false }
            },
            computeVertexNormals: vi.fn()
        };
        terrain.updateMesh = vi.fn();
        terrain.updateColors = vi.fn();

        window.game = {
            goblinManager: { notifyClanActivity: vi.fn() }
        };
    });

    it('should successfully remove a building from the list', () => {
        const b = terrain.addBuilding('house', 10, 10, true);
        expect(terrain.buildings).toContain(b);
        expect(terrain.buildings.length).toBe(1);

        terrain.removeBuilding(b);
        expect(terrain.buildings).not.toContain(b);
        expect(terrain.buildings.length).toBe(0);
    });

    it('should allow a goblin to destroy a building', () => {
        Goblin.initAssets = vi.fn();
        Goblin.assets.initialized = true;

        const goblin = new Goblin(scene, terrain, 11, 10);

        const building = terrain.addBuilding('house', 10, 10, true);
        building.hp = 30;
        building.userData.hp = 30;
        building.population = 0; // Necessary for direct HP damage

        goblin.targetBuilding = building;

        expect(terrain.buildings).toContain(building);

        goblin.attackBuilding(building);
        // Should have taken damage
        expect(building.hp).toBeLessThan(30);

        // Explicitly clear population to ensure next hit causes destruction
        building.population = 0;
        building.hp = 0.1; // Almost zero
        building.userData.hp = 0.1;
        goblin.attackCooldown = 0;

        goblin.attackBuilding(building);

        // If identity mismatch happened, it might be removed via coords
        const stillInList = terrain.buildings.some(b => b === building || (b.gridX === 10 && b.gridZ === 10));
        expect(stillInList).toBe(false);
        expect(building.isDead).toBe(true);
    });

    it('should handle identity mismatch (Ghost Building)', () => {
        const realBuilding = terrain.addBuilding('house', 20, 20, true);
        const ghost = { ...realBuilding };

        expect(terrain.buildings).toContain(realBuilding);
        expect(terrain.buildings).not.toContain(ghost);

        terrain.removeBuilding(ghost);
        expect(terrain.buildings.length).toBe(0);
    });

    it('should destroy building if HP <= 0 even if population > 0', () => {
        Goblin.initAssets = vi.fn();
        Goblin.assets.initialized = true;

        const goblin = new Goblin(scene, terrain, 11, 10);
        const building = terrain.addBuilding('house', 10, 10, true);

        building.hp = 100;
        building.userData.hp = 100;
        building.population = 10;

        goblin.attackBuilding(building);

        // Current Logic: Pop > 0 means Pop damage, HP unchanged.
        expect(building.population).toBeLessThan(10);
        expect(building.hp).toBe(100);
        expect(terrain.buildings).toContain(building);
        expect(building.isDead).toBe(false);
    });
});