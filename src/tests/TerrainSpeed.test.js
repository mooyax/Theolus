
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit';
import { Goblin } from '../Goblin';
import { Terrain } from '../Terrain';
import { Game } from '../Game';
import * as THREE from 'three';

// Mocks
class MockScene {
    add() { }
    remove() { }
    getObjectByName() { return null; }
    children = [];
}

class MockTerrain {
    constructor() {
        this.logicalWidth = 10;
        this.logicalDepth = 10;
        this.grid = [];
        for (let x = 0; x < 10; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 10; z++) {
                this.grid[x][z] = { height: 1, moisture: 0.5, type: 'grass', regionId: 1 };
            }
        }
        this.scene = new MockScene();
    }
    getTileHeight(x, z) {
        if (x < 0 || x >= 10 || z < 0 || z >= 10) return 0;
        return this.grid[x][z].height;
    }
    getMoisture(x, z) {
        if (x < 0 || x >= 10 || z < 0 || z >= 10) return 0;
        return this.grid[x][z].moisture;
    }
    setHeight(x, z, h) { this.grid[x][z].height = h; }
    setMoisture(x, z, m) { this.grid[x][z].moisture = m; }
    registerEntity() { }
    unregisterEntity() { }
    moveEntity() { }
    getVisualOffset() { return { x: 0, y: 0 }; }
    getInterpolatedHeight(x, z) { return this.getTileHeight(Math.round(x), Math.round(z)); }
    gridToWorld(g) { return g; }
}

describe('Terrain Speed Rules', () => {
    let terrain;
    let scene;

    beforeEach(() => {
        scene = new MockScene();
        terrain = new MockTerrain();
    });

    const testSpeed = (ActorClass, name) => {
        describe(`${name} Movement Speed`, () => {
            let actor;
            beforeEach(() => {
                actor = new ActorClass(scene, terrain, 0, 0, 'test');
                actor.gridX = 0;
                actor.gridZ = 0;
            });

            it('should have basic speed on Flat Terrain', () => {
                terrain.setHeight(1, 0, 1.0);
                actor.startMove(1, 0, 0);
                expect(actor.moveDuration).toBeCloseTo(0.8, 2);
            });

            it('should slow down on Rock (Height > 9)', () => {
                terrain.setHeight(0, 0, 10.0);
                terrain.setHeight(1, 0, 10.0);
                actor.gridX = 0;
                actor.gridZ = 0;
                actor.startMove(1, 0, 0);
                expect(actor.moveDuration).toBeGreaterThan(5.0);
            });

            it('should slow down on Slope', () => {
                terrain.setHeight(0, 0, 1.0);
                terrain.setHeight(1, 0, 2.0);
                actor.startMove(1, 0, 0);
                expect(actor.moveDuration).toBeGreaterThan(2.0);
            });

            it('should slow down in Swamp (Moisture > 0.6)', () => {
                terrain.setHeight(0, 0, 1.0);
                terrain.setHeight(1, 0, 1.0);
                terrain.setMoisture(1, 0, 0.8);
                actor.startMove(1, 0, 0);
                expect(actor.moveDuration).toBeGreaterThan(1.5);
            });
        });
    };

    testSpeed(Unit, 'Unit');
    testSpeed(Goblin, 'Goblin');
});