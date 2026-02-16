
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Terrain } from '../Terrain.js';
import { Goblin } from '../Goblin.js';

// Mock THREE
vi.mock('three', () => {
    const Vector3 = class {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
        normalize() { return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
    };

    return {
        Scene: class { add() { } remove() { } getObjectByName() { } },
        Mesh: class {
            constructor() { this.position = new Vector3(); this.rotation = { x: 0 }; this.add = vi.fn(); }
        },
        Group: class { add() { }; position = new Vector3(); },
        TextureLoader: class { load() { return {}; } },
        CanvasTexture: class { constructor() { } },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: {
                        count: 100,
                        array: new Float32Array(300),
                        getX: () => 0, getY: () => 0, setX: () => { }, setY: () => { },
                        needsUpdate: false
                    },
                    color: { count: 100, array: new Float32Array(300), setXYZ: () => { }, needsUpdate: false }
                };
            }
            setAttribute() { }
            computeVertexNormals() { }
            setIndex() { }
        },
        BufferGeometry: class { setAttribute() { } setIndex() { } },
        BoxGeometry: class { translate() { } rotateY() { } },
        ConeGeometry: class { translate() { } rotateY() { } },
        CylinderGeometry: class { translate() { } },
        MeshLambertMaterial: class { },
        LineBasicMaterial: class { },
        PointsMaterial: class { },
        BufferAttribute: class { },
        Vector3: Vector3,
        Points: class { constructor() { this.position = new Vector3(); this.add = vi.fn(); } },
        LineSegments: class { constructor() { this.position = new Vector3(); this.add = vi.fn(); } },
        Color: class { setHex() { } lerp() { } copy() { } setHSL() { } getHSL() { return { h: 0, s: 0, l: 0 }; } },
        MathUtils: { degToRad: () => 0 },
        DoubleSide: 2,
    };
});

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
