
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Job, Combat } from '../ai/states/UnitStates.js';

// Mock Dependencies
vi.mock('three', () => {
    const Vector3 = class {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
        distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2); }
    };
    return {
        Vector3: Vector3,
        Group: class {
            constructor() { this.children = []; this.position = new Vector3(); }
            add(o) { this.children.push(o); }
            remove(o) { this.children = this.children.filter(c => c !== o); }
        },
        Scene: class {
            constructor() { this.children = []; }
            add(o) { this.children.push(o); }
            remove(o) { this.children = this.children.filter(c => c !== o); }
        },
        Mesh: class { constructor() { this.position = new Vector3(); } },
        BoxGeometry: class { constructor() { this.translate = vi.fn(); } },
        ConeGeometry: class { constructor() { this.translate = vi.fn(); } },
        CylinderGeometry: class { constructor() { this.translate = vi.fn(); } },
        PlaneGeometry: class { constructor() { this.translate = vi.fn(); } },
        MeshLambertMaterial: class { constructor() { } },
        MeshStandardMaterial: class { constructor() { } },
        Texture: class { constructor() { } },
        CanvasTexture: class { constructor() { } }
    };
});

describe('Manual Job Flicker Investigation', () => {
    let game;
    let unit;
    let goblin;
    let terrainMock;

    beforeEach(() => {
        // Mock Window Game
        window.game = {
            isNight: false,
            resources: {},
            releaseRequest: vi.fn(),
            completeRequest: vi.fn(),
            findBestRequest: vi.fn(),
            claimRequest: vi.fn().mockReturnValue(true), // Always claim successfully
            simTotalTimeSec: 0,
            frameCount: 0
        };

        // Mock Terrain
        terrainMock = {
            grid: [],
            getTileHeight: vi.fn().mockReturnValue(1),
            findBestTarget: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            registerEntity: vi.fn(),
            scene: new THREE.Scene(),
            gridToWorld: (g) => g
        };
        for (let x = 0; x < 40; x++) {
            terrainMock.grid[x] = [];
            for (let z = 0; z < 40; z++) {
                terrainMock.grid[x][z] = { regionId: 1, height: 1 };
            }
        }

        unit = new Unit(new THREE.Scene(), terrainMock, 10, 10, 'worker');
        unit.id = 1;
        unit.checkSelfDefense = vi.fn().mockImplementation((goblins) => {
            console.log(`[Test Mock] checkSelfDefense called. Goblins: ${goblins ? goblins.length : 'null'}`);
            // Simulate finding a goblin if close enough
            if (unit.targetGoblin) {
                console.log("[Test Mock] Target already set");
                return true;
            }
            // Simple range check simulation
            if (goblins && goblins.length > 0) {
                const g = goblins[0];
                const dist = Math.sqrt((unit.gridX - g.gridX) ** 2 + (unit.gridZ - g.gridZ) ** 2);
                console.log(`[Test Mock] Dist: ${dist}, Target: ${unit.targetGoblin}`);
                if (dist < 10) {
                    unit.targetGoblin = g;
                    return true;
                }
            }
            return false;
        });

        // Mock method to avoid complexity
        unit.smartMove = vi.fn();

        goblin = new Goblin(new THREE.Scene(), terrainMock, 15, 10); // 5 tiles away
        goblin.id = 100;
        goblin.isDead = false;
    });

    it('should NOT switch to Combat when performing a Manual Job, even if enemy is near', () => {
        // 1. Assign Manual Job
        const manualReq = { id: 'req_manual', type: 'move', x: 30, z: 10, assignedTo: unit.id, isManual: true, status: 'assigned' };
        unit.targetRequest = manualReq;

        // 2. Start Job
        const jobState = new Job(unit);
        unit.changeState(jobState);
        jobState.enter();

        expect(unit.state).toBeInstanceOf(Job);

        // 3. Update Loop - Goblin is nearby (Dist 5)
        // By default logic, checkSelfDefense would return true, switching to Combat.

        // Pass empty arrays for units/buildings to avoid iteration errors in mocked environment if any
        unit.updateLogic(100, 0.1, false, [], [], [goblin]);

        // If fix is applied, state should remain Job (because Manual priority)
        // Ideally, we want it to STAY in Job
        expect(unit.state).toBeInstanceOf(Job);
        expect(unit.targetGoblin).toBeNull(); // Should not target goblin
    });
});
