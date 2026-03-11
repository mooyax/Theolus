
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.ts';
import { Terrain } from '../Terrain.ts';
import { Building } from '../Building.ts';
import * as THREE from 'three';

describe('Goblin Sudden Death Reproduction', () => {
    let terrain, scene, mockGame;

    beforeEach(async () => {
        scene = new THREE.Scene();
        terrain = new Terrain(scene);

        // Grid initialization: All height 1 (Minimal land height)
        terrain.grid = Array.from({ length: 100 }, () =>
            Array.from({ length: 100 }, () => ({ regionId: 1, height: 1.0, hasBuilding: false }))
        );
        terrain.logicalWidth = 100;
        terrain.logicalDepth = 100;

        mockGame = {
            scene: scene,
            terrain: terrain,
            units: [],
            goblins: [],
            goblinManager: { goblins: [], notifyClanActivity: vi.fn() },
            simTotalTimeSec: 0,
            frameCount: 0,
            minimal: false // Important: drowning check is skipped if minimal=true
        };
        window.game = mockGame;
        window.isTest = true;

        Goblin.assets = { initialized: true };
    });

    it('should NOT die when spawned on land with height 1.0 even with fractional coords', () => {
        // x, z are fractional, so interpolation might be used if Actor used it
        const x = 10.5;
        const z = 10.5;

        const goblin = new Goblin(scene, terrain, x, z, 'normal');

        expect(goblin.isDead).toBe(false);
        goblin.updateLogic(1.0, 1.0);
        expect(goblin.isDead).toBe(false);
    });

    it('should stay alive as long as getTileHeight returns 1.0', () => {
        // Deep water nearby, but at 10.9, 10.9, getTileHeight still returns grid[10][10]
        terrain.grid[11][11].height = -5.0;

        const x = 10.9;
        const z = 10.9;

        const goblin = new Goblin(scene, terrain, x, z, 'normal');
        expect(terrain.getTileHeight(x, z)).toBe(1.0);

        goblin.updateLogic(1.0, 1.0);
        expect(goblin.isDead).toBe(false);
    });

    it('should stay alive at high altitude (not drowning)', () => {
        const x = 30;
        const z = 30;
        terrain.grid[x][z].height = 20.0; // High mountain

        const goblin = new Goblin(scene, terrain, x, z, 'normal');
        goblin.updateLogic(1.0, 1.0);
        expect(goblin.isDead).toBe(false);
    });

    it('should die of old age if simulation time exceeds lifespan', () => {
        const goblin = new Goblin(scene, terrain, 10, 10, 'normal');
        goblin.lifespan = 50;
        goblin.age = 49.9;

        // ageRate is 0.2 for normal goblins. age += deltaTime * 0.2
        // So with deltaTime 1.0, age becomes 49.9 + 0.2 = 50.1
        goblin.updateLogic(1.0, 1.0);
        expect(goblin.isDead).toBe(true);
    });

    it('should NOT target another goblin (friendly fire check)', () => {
        const x = 50;
        const z = 50;
        const goblin1 = new Goblin(scene, terrain, x, z, 'normal');
        goblin1.id = 1;

        const goblin2 = new Goblin(scene, terrain, 51, 50, 'normal');
        goblin2.id = 2;

        mockGame.goblins.push(goblin1, goblin2);

        // Scan for targets
        goblin1.scanForTargets([goblin2], []);

        // If it targets goblin2, it's a bug
        expect(goblin1.targetUnit).toBeNull();
    });
});
