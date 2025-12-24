
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

// Mock THREE
vi.mock('three', () => {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
    }

    class Object3D {
        position = new Vector3();
        rotation = { x: 0 };
        scale = { set: () => { } };
        add() { }
        remove() { }
    }

    class Mesh extends Object3D { }
    class LineSegments extends Object3D { }
    class Points extends Object3D { }

    return {
        Vector3,
        Object3D,
        Mesh,
        LineSegments,
        Points,
        PlaneGeometry: class {
            attributes = {
                position: {
                    count: 100,
                    array: new Float32Array(300),
                    getX: () => 0,
                    getY: () => 0,
                    setX: () => { },
                    setY: () => { }
                },
                color: { array: [], count: 100, needsUpdate: false }
            };
            setAttribute() { }
            computeVertexNormals() { }
            setIndex() { }
        },
        BufferGeometry: class {
            setAttribute() { }
            setIndex() { }
        },
        BufferAttribute: class { constructor(arr) { this.array = arr; } },
        MeshLambertMaterial: class { },
        LineBasicMaterial: class { },
        PointsMaterial: class { },
        Color: class { constructor() { } setHex() { } lerp() { } getHSL() { return {}; } setHSL() { } copy() { } multiplyScalar() { } },
        DoubleSide: 2,
    };
});

describe('Safe Population Zero', () => {
    let terrain;
    let house;

    beforeEach(() => {
        global.window = { game: { gameTotalTime: 0, units: [] } };
        const scene = { add: () => { }, remove: () => { } };
        terrain = new Terrain(scene, []);

        house = {
            userData: {
                type: 'house',
                population: 10, // Cap reached
                gridX: 10,
                gridZ: 10
            }
        };
        terrain.buildings = [house];
        terrain.grid = Array(200).fill(0).map(() => Array(200).fill({}));
        terrain.updateColors = vi.fn();
    });

    it('should NOT destroy house when spawning unit resets population to 0', () => {
        // Mock Spawn Callback
        const spawnCb = vi.fn().mockReturnValue(true); // Successful spawn

        // Terrain update loop
        // updatePopulation(deltaTime, isNight, activeUnits, spawnCallback)
        // Rate is small, but if at Cap (10), logic triggers.

        // Force population logic to run for this house
        // Note: Terrain.updatePopulation has staggering logic.
        // We need to ensure we hit the modular check.
        // Or we can verify the logic block directly if we could access it, 
        // but integration testing the updatePopulation method is better.

        // Mock frameCount or run enough times?
        // Terrain.updatePopulation has `this.frameCount++` and `index % staggerCount`.
        // house is index 0. modulo 20.
        // We need frameCount % 20 === 0.
        terrain.frameCount = 19; // Will increment to 20 -> 0.

        terrain.updatePopulation(1.0, false, 0, spawnCb);

        // Verify Spawn triggered
        expect(spawnCb).toHaveBeenCalled();

        // Verify Population reset to 0
        expect(house.userData.population).toBe(0);

        // Verify House is still in buildings list (NOT destroyed)
        expect(terrain.buildings).toContain(house);
        expect(terrain.buildings.length).toBe(1);
    });
});
