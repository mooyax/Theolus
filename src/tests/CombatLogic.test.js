
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Building } from '../Building.js';
import { MockGame, MockTerrain } from './TestHelper.ts';

import { Entity } from '../Entity.js';

// --- Extreme Browser Mocks for Node/Vitest ---
if (typeof document === 'undefined') {
    global.document = {
        createElement: (tag) => ({
            getContext: () => ({
                fillRect: () => { }, fillStyle: '', drawImage: () => { },
                beginPath: () => { }, moveTo: () => { }, lineTo: () => { }, fill: () => { },
                arc: () => { }, stroke: () => { }, closePath: () => { },
                translate: () => { }, rotate: () => { }, scale: () => { },
                save: () => { }, restore: () => { },
                measureText: () => ({ width: 0 })
            }),
            style: {}, classList: { add: () => { }, remove: () => { } },
            appendChild: () => { }, width: 100, height: 100
        }),
        body: { appendChild: () => { } },
        getElementById: () => null
    };
}
if (typeof window === 'undefined') {
    global.window = {
        addEventListener: () => { }, removeEventListener: () => { },
        innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1
    };
}

describe('Combat Logic Correctness', () => {
    let game;
    let terrain;
    let scene;

    beforeEach(() => {
        Entity.nextId = 0; // Reset ID for predictable turns
        Goblin.assets.initialized = true; // Skip canvas creation in tests
        game = new MockGame();
        game.unitScanBudget = 1000;
        window.game = game;
        terrain = new MockTerrain(100, 100);
        game.terrain = terrain;
        scene = game.scene;
    });

    afterEach(() => {
        window.game = undefined;
        vi.restoreAllMocks();
    });

    it('Should allow Unit to target and damage a Goblin', () => {
        // Initialize crucial grid cells for logic (Self Defense scans rely on this)
        terrain.grid[10][10] = { regionId: 1, height: 1 };
        terrain.grid[12][10] = { regionId: 1, height: 1 };

        // Force IDs and Registration
        Entity.nextId = 0;
        const soldier = new Unit(scene, terrain, 10, 10, 'soldier');
        const goblin = new Goblin(scene, terrain, 12, 10, 'normal');

        game.units = [soldier];
        game.goblinManager.goblins = [goblin];





        // SATISFY TIME SLICING: (frame + id) % 20 === 0
        // Soldier (id 0) has allowedInterval 20. (20+0)%20 == 0.
        game.frameCount = 20;

        // Update logic with correct arguments
        soldier.updateLogic(100, 1.0, false, game.units, terrain.buildings, game.goblinManager.goblins);

        // Check if soldier sensed the goblin
        expect(soldier.targetGoblin).toBe(goblin);




        // Apply damage manually to verify interaction
        const prevHp = goblin.hp;
        soldier.attackGoblin(goblin);
        expect(goblin.hp).toBeLessThan(prevHp);
    });

    it('Should allow Goblin to target and damage a Farm', () => {
        const farm = new Building(scene, terrain, 'farm', 15, 10);
        const goblin = new Goblin(scene, terrain, 17, 10, 'normal');

        terrain.buildings.push(farm);
        game.goblinManager.goblins.push(goblin);

        // SATISFY TIME SLICING: (frame + id + 5) % 20 === 0
        // (frame + 1 + 5) % 20 = 0 -> frame = 14
        game.frameCount = 14;

        // Goblin needs to be in Raid mode or Wander to scan
        goblin.updateLogic(100, 1.0, false, game.units, terrain.buildings);

        // Check if goblin sensed the farm
        console.log(`[Test 2] targetBuilding: ${goblin.targetBuilding ? 'FOUND' : 'NOT FOUND'}`);
        expect(goblin.targetBuilding).toBe(farm);

        // Apply damage
        const prevHp = farm.hp;
        goblin.attackBuilding(farm);
        expect(farm.hp).toBeLessThan(prevHp);
    });

    it('Should allow Goblin to destroy a Farm when HP is 0', () => {
        try {
            const farm = new Building(scene, terrain, 'farm', 20, 10);
            const goblin = new Goblin(scene, terrain, 21, 10, 'normal');

            terrain.buildings.push(farm);
            farm.hp = 5; // Low HP

            // Attack should destroy it
            console.log(`[Test 3] Calling attackBuilding... Goblin Damage: ${goblin.damage}`);
            goblin.attackBuilding(farm);
            console.log(`[Test 3] Post-Attack HP: ${farm.hp}`);

            // Farm has hp <= 0 (isDestroyed check for farm only cares about HP)
            expect(farm.hp).toBeLessThanOrEqual(0);
            expect(terrain.buildings.length).toBe(0);
        } catch (e) {
            console.error("[Test 3] CRASHED:", e);
            throw e;
        }
    });

});
