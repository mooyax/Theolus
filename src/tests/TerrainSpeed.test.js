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
}

class MockTerrain {
    constructor() {
        this.logicalWidth = 10;
        this.logicalDepth = 10;
        this.grid = [];
        this.heightMap = new Float32Array(10 * 10);
        this.moistureMap = new Float32Array(10 * 10);

        // Init Grid
        for (let x = 0; x < 10; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 10; z++) {
                this.grid[x][z] = {
                    height: 1,
                    moisture: 0.5,
                    type: 'grass',
                    regionId: 1
                };
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
        // Mock Terrain might not have getMoisture implemented in original, 
        // but we need it for Swamp test. Assuming we will add it or access grid.
        return this.grid[x][z].moisture;
    }

    // Helper to set terrain for test
    setHeight(x, z, h) {
        this.grid[x][z].height = h;
    }

    setMoisture(x, z, m) {
        this.grid[x][z].moisture = m;
    }

    registerEntity() { }
    unregisterEntity() { }
    moveEntity() { }
    getVisualOffset() { return { x: 0, y: 0 }; }
    getInterpolatedHeight(x, z) { return this.getTileHeight(Math.round(x), Math.round(z)); }
    gridToWorld(g) { return g; }
}

describe('Terrain Speed Rules', () => {
    let terrain;
    let game;
    let scene;

    beforeEach(() => {
        scene = new MockScene();
        terrain = new MockTerrain();
        game = {
            simTotalTimeSec: 0,
            terrain: terrain
        };
        global.window = { game: game };
    });

    // Helper to run test for any Actor (Unit or Goblin)
    const testSpeed = (ActorClass, name) => {
        describe(`${name} Movement Speed`, () => {
            let actor;

            beforeEach(() => {
                actor = new ActorClass(scene, terrain, 0, 0, 'test');
                actor.gridX = 0;
                actor.gridZ = 0;
            });

            it('should have basic speed on Flat Terrain', () => {
                // Flat: 0,0 (H=1) -> 1,0 (H=1)
                terrain.setHeight(1, 0, 1.0);

                actor.startMove(1, 0, 0);

                expect(actor.moveDuration).toBeCloseTo(0.8, 2);
            });

            it('should slow down on Rock (Height > 8)', () => {
                // Rock: 0,0 (H=1) -> 1,0 (H=10)
                // Note: Actor might reject climbing if too steep. 
                // We need to set start height high too to simulate being ON/NEAR rock, 
                // or ensure climbing logic allows it if we just want to test speed setting.

                // Case A: Moving ONTO rock from high ground (Valid move)
                terrain.setHeight(0, 0, 9.0);
                terrain.setHeight(1, 0, 9.0);
                actor.gridX = 0;
                actor.gridZ = 0;

                actor.startMove(1, 0, 0);

                expect(actor.moveDuration).toBeCloseTo(6.0, 2);
            });

            it('should slow down on Slope (Height Diff > 0.1)', () => {
                // Slope: 0,0 (H=1) -> 1,0 (H=2) - Diff 1.0 (Valid climb <= 2.0)
                terrain.setHeight(0, 0, 1.0);
                terrain.setHeight(1, 0, 2.0);

                actor.startMove(1, 0, 0);

                expect(actor.moveDuration).toBeCloseTo(3.0, 2);
            });

            it('should slow down in Swamp (Moisture > 0.6)', () => {
                // Swamp: 0,0 (H=1, M=0.8) -> 1,0 (H=1, M=0.8)
                terrain.setHeight(0, 0, 1.0);
                terrain.setHeight(1, 0, 1.0);
                terrain.setMoisture(0, 0, 0.8);
                terrain.setMoisture(1, 0, 0.8); // Target is swamp

                actor.startMove(1, 0, 0);

                expect(actor.moveDuration).toBeCloseTo(2.0, 2);
            });
        });
    };

    testSpeed(Unit, 'Unit');
    testSpeed(Goblin, 'Goblin');
});

