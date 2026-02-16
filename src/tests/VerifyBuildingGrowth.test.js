import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Building } from '../Building';
import { GameConfig } from '../config/GameConfig';
import * as THREE from 'three';

// Mock THREE

vi.mock('three', () => {
    class MockVector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set = vi.fn().mockReturnThis();
        copy = vi.fn().mockReturnThis();
        clone = vi.fn(() => new MockVector3(this.x, this.y, this.z));
    }
    class MockObject {
        position = new MockVector3();
        rotation = { x: 0, y: 0, z: 0 };
        add = vi.fn();
        remove = vi.fn();
    }
    return {
        Scene: MockObject,
        Vector3: MockVector3,
        Object3D: MockObject,
        Group: MockObject,
        Mesh: MockObject,
        BoxGeometry: vi.fn(),
        MeshLambertMaterial: vi.fn(),
    };
});

// Mock Entity to avoid inheritance issues if deep
vi.mock('../Entity.js', () => {
    return {
        Entity: class Entity {
            constructor() {
                this.userData = {};
                this.id = 1;
            }
            update() { }
        }
    };
});

describe('Building Population Growth', () => {
    let building;

    beforeEach(() => {
        // Reset config to known state for test
        // In JS test environment we can just mute the property or use Object.assign if needed
        GameConfig.buildings.cave = {
            hp: 200,
            capacity: 20,
            growthRate: 0.5 // Test expectation
        };

        building = new Building(new THREE.Scene(), {}, 'cave', 0, 0);
        building.userData = {
            type: 'cave',
            population: 0,
            capacity: 20
        };
        building._population = 0; // Sync internal
    });

    it('should grow population over time', () => {
        // Update for 1 second
        building.update(0, 1.0);

        // Rate is 0.5/s
        expect(building.population).toBeCloseTo(0.5);
        expect(building.userData.population).toBeCloseTo(0.5);
    });

    it('should cap population at capacity', () => {
        building.population = 19.8;
        building.update(0, 1.0); // +0.5 = 20.3 -> Cap 20

        expect(building.population).toBe(20);
    });

    it('should reach spawn threshold (10.0) in 20 seconds with 0.5 rate', () => {
        building.population = 0;
        // 20 updates of 1.0s
        for (let i = 0; i < 20; i++) {
            building.update(0, 1.0);
        }
        expect(building.population).toBeCloseTo(10.0);
    });
});
