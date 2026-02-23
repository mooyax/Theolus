
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
        // Mock geometry stuff to avoid "position attribute missing"
        terrain.geometry = {
            attributes: {
                position: { count: 100, array: new Float32Array(300), getX: () => 0, getY: () => 0, needsUpdate: false },
                color: { count: 100, array: new Float32Array(300), setXYZ: vi.fn(), needsUpdate: false }
            },
            computeVertexNormals: vi.fn()
        };
        terrain.updateMesh = vi.fn();
        terrain.updateColors = vi.fn();

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
        // Setup Goblin
        Goblin.initAssets = vi.fn();
        Goblin.assets.initialized = true;

        const goblin = new Goblin(scene, terrain, 11, 10); // Adjacent

        // Setup Building
        const building = terrain.addBuilding('house', 10, 10, true);
        building.hp = 30; // Sync HP directly for Class (Was 10, but Goblin Dmg is now 15)
        building.userData.hp = 30;
        building.population = 0; // Empty
        building.userData.population = 0;

        // Goblin targets building
        goblin.targetBuilding = building;

        // Mock attack logic calls
        // We actally want to call attackBuilding directly to test the damage/destroy logic

        // Check initial state
        expect(terrain.buildings).toContain(building);

        // Attack loop
        // Attack 1: Damage (15 dmg)
        goblin.attackBuilding(building);
        expect(building.userData.hp).toBeLessThan(30);
        expect(terrain.buildings).toContain(building);

        // Force kill
        building.hp = 1;
        building.userData.hp = 1;
        goblin.attackCooldown = 0; // Reset cooldown
        goblin.attackBuilding(building);

        // Should be destroyed now
        expect(terrain.buildings).not.toContain(building);
        // Correct check for Class Instance
        expect(building.isDead).toBe(true);

    });
    it('should handle identity mismatch (Ghost Building)', () => {
        const realBuilding = terrain.addBuilding('house', 20, 20, true);

        // Create a fake "ghost" object that mimics the real one
        const ghost = { ...realBuilding };
        // Note: Shallow copy, but distinct object reference.

        expect(terrain.buildings).toContain(realBuilding);
        expect(terrain.buildings).not.toContain(ghost);

        // Attempt to remove using ghost
        terrain.removeBuilding(ghost);

        // logic in removeBuilding handles this by searching coords
        expect(terrain.buildings.length).toBe(0);
    });
    it('should destroy building if HP <= 0 even if population > 0', () => {
        Goblin.initAssets = vi.fn();
        Goblin.assets.initialized = true;

        const goblin = new Goblin(scene, terrain, 11, 10);
        const building = terrain.addBuilding('house', 10, 10, true);

        // Setup: HP 1, Pop 10
        building.hp = 1;
        building.userData.hp = 1;
        building.population = 10;
        building.userData.population = 10;

        // Attack 1: HP goes to <= 0
        goblin.attackBuilding(building);

        expect(building.hp).toBeLessThanOrEqual(0);
        // Should be destroyed regardless of population
        expect(terrain.buildings).not.toContain(building);
        expect(building.isDead).toBe(true);

});
});