
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';

// Mock Classes
class MockTerrain {
    constructor() {
        this.logicalWidth = 20;
        this.logicalDepth = 20;
        this.grid = [];
        for (let x = 0; x < 20; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                this.grid[x][z] = { height: 1.0, regionId: 1 };
            }
        }
        // Create Water Gap (Region 0) at x=10
        for (let z = 0; z < 20; z++) {
            this.grid[10][z].height = 0;
            this.grid[10][z].regionId = 0;
        }
        // Island at x > 10 (Region 2)
        for (let x = 11; x < 20; x++) {
            for (let z = 0; z < 20; z++) {
                this.grid[x][z].regionId = 2;
            }
        }
        this.registerEntity = vi.fn();
        this.unregisterEntity = vi.fn();
        this.findBestTarget = vi.fn(() => null); // Added findBestTarget as a mock function
        this.getTileHeight = (x, z) => this.grid[x][z].height;
        this.getRegionId = (x, z) => this.grid[x][z].regionId;
    }
}

describe('Shoreline Loop Reproduction', () => {
    let terrain;
    let unit;
    let goblin;

    beforeEach(() => {
        terrain = new MockTerrain();
        const scene = new THREE.Scene();
        unit = new Unit(scene, terrain, 5, 5, 'soldier'); // Region 1
        unit.id = 1;

        goblin = {
            id: 2,
            gridX: 15, // Region 2 (Across water)
            gridZ: 5,
            isDead: false
        };
    });

    it('should NOT target unrelated region goblin via checkSelfDefense', () => {
        // Mock Goblins list
        const goblins = [goblin];

        // Mock findBestTarget to emulate the filtering logic
        terrain.findBestTarget = vi.fn((type, x, z, r, filter, candidates) => {
            if (candidates) {
                for (const g of candidates) {
                    if (filter(g, 10) !== Infinity) return g;
                }
            }
            return null;
        });

        // Call the suspect function
        unit.checkSelfDefense(goblins, true);

        // Expectation: Unit should IGNORE the goblin because it is in a different region
        expect(unit.targetGoblin).toBeNull();
    });

    it('should NOT target land goblin when unit is in water (Region 0)', () => {
        // Move unit to water
        unit.gridX = 10;
        unit.gridZ = 5;

        // Mock findBestTarget
        terrain.findBestTarget = vi.fn((type, x, z, r, filter, candidates) => {
            if (candidates) {
                for (const g of candidates) {
                    if (filter(g, 10) !== Infinity) return g;
                }
            }
            return null;
        });

        const goblins = [goblin]; // Goblin at 15,5 (Region 2)

        unit.checkSelfDefense(goblins, true);

        expect(unit.targetGoblin).toBeNull();
    });
});
