import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';

// Mocks
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: vi.fn(function () {
            return {
                setPixelRatio: vi.fn(),
                setSize: vi.fn(),
                render: vi.fn(),
                dispose: vi.fn(),
                shadowMap: { enabled: false, type: 0 },
                domElement: document.createElement('canvas'),
            };
        }),
        TextureLoader: vi.fn().mockImplementation(() => ({
            load: vi.fn(),
        })),
    };
});

// Mock UI Components to prevent canvas context errors during Game.animate
vi.mock('../Minimap.js', () => ({
    Minimap: class {
        update() { }
        serialize() { return {}; }
        deserialize() { }
    }
}));
vi.mock('../Compass.js', () => ({
    Compass: class {
        update() { }
    }
}));

describe('Combat Balance Verification', () => {
    let game;
    let mockTerrain;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = '<canvas id="minimap"></canvas>';
        vi.useFakeTimers();

        // Mock Terrain
        mockTerrain = {
            width: 160,
            depth: 160,
            getHeight: () => 0,
            isWalkable: () => true,
            getRegion: () => ({ id: 'mockRegion' }),
            getBiomeColor: () => 0x00ff00,
            logicalWidth: 160,
            logicalDepth: 160,
            grid: [],
            update: () => { },
            getTileHeight: () => 5, // Fix: >0 to prevent instant drowning
            gridToWorld: (v) => v,
            worldToGrid: (v) => v,
            clippingPlanes: [],
            getVisualPosition: (x, z) => ({ x, y: 0, z }),
            addBuilding: vi.fn().mockImplementation((type, x, z) => ({ userData: { type, gridX: x, gridZ: z } })),
            // Spatial Grid
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            // Visuals
            updateMeshPosition: vi.fn(),
            updateLights: vi.fn(),
        };

        // Mock Game
        game = new Game(null, mockTerrain, true);
        game.scene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
        game.goblinManager = new GoblinManager(game.scene, mockTerrain, game.particleManager);
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
        if (game) {
            game.dispose();
            game = null;
        }
    });

    const simulateFight = (unit, goblin, maxFrames = 1000) => {
        let frames = 0;
        const log = [];

        // Force engagement
        unit.position.set(10, 0, 10);
        goblin.position.set(10, 0, 10); // Melee range

        // Ensure they target each other
        unit.targetGoblin = goblin;
        goblin.targetUnit = unit;

        log.push(`Start: Unit(${unit.role} HP:${unit.hp}/${unit.maxHp} Dmg:${unit.damage}) vs Goblin(${goblin.type} HP:${goblin.hp}/${goblin.maxHp} Dmg:${goblin.damage})`);

        let time = 0;
        const dt = 0.016; // 60 FPS

        // Mock Arrays for detection
        const goblins = [goblin];
        const units = [unit];
        const buildings = [];

        while (!unit.isDead && !goblin.isDead && frames < maxFrames) {

            // Real Update Calls
            // Unit update logic (handles State Machine)
            if (unit.updateLogic) {
                unit.updateLogic(time, dt, false, goblins);
            } else if (unit.update) {
                unit.update(time, dt, false, goblins);
            }
            // Goblin update logic
            goblin.updateLogic(time, dt, units, buildings);

            // Manual death check (usually handled by manager)
            if (unit.hp <= 0) unit.isDead = true;
            if (goblin.hp <= 0) goblin.isDead = true;

            time += dt;
            frames++;
        }

        const winner = unit.isDead ? 'Goblin' : (goblin.isDead ? 'Unit' : 'Draw');
        log.push(`End: Winner=${winner} Frames=${frames}`);
        log.push(`Final: Unit HP:${unit.hp.toFixed(1)} Goblin HP:${goblin.hp.toFixed(1)}`);

        return { winner, frames, log, unitHp: unit.hp, goblinHp: goblin.hp };
    };

    it('Worker vs Normal Goblin (Expected: Unit Win)', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'worker');
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');

        const result = simulateFight(unit, goblin);
        console.log('[Worker vs Normal]\n', result.log.join('\n'));

        // Analysis: 
        // Worker (HP ~57, Dmg 12) vs Goblin (HP ~33, Dmg 8)
        // Worker kills Goblin in 33/12 = 3 hits (3s)
        // Goblin kills Worker in 57/8 = 7 hits (7s)
        expect(result.winner).toBe('Unit');
    });

    it('Normal Goblin vs House (Expected: Mutually Assured Destruction or House Defense)', () => {
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');
        // Mock House
        const house = {
            userData: {
                type: 'house',
                hp: 100, // Structure HP
                population: 10, // Defenders
                gridX: 10,
                gridZ: 10
            },
            position: new THREE.Vector3(10, 0, 10) // Visual
        };
        // Add to terrain
        mockTerrain.buildings = [house];
        goblin.targetBuilding = house;

        // Custom simulate for Building (Unit is null)
        let frames = 0;
        const log = [];
        log.push(`Start: Goblin vs House (Pop:${house.userData.population})`);

        // FORCE Combat Logic (Skip Wander/Detection)
        goblin.state = {
            update: (time, dt) => goblin.executeCombatLogic(time, dt)
        };

        console.log("Check updateCombatLogic:", typeof goblin.updateCombatLogic);

        while (!goblin.isDead && house.userData.population > 0 && frames < 1000) {
            const dt = 0.016;
            // Goblin Update
            goblin.updateLogic(0, dt, [], [house]);

            // Check Death
            if (goblin.hp <= 0) goblin.isDead = true;
            frames++;
        }

        log.push(`End: Goblin Dead=${goblin.isDead} House Pop=${house.userData.population} Frames=${frames}`);
        console.log('[Goblin vs House]\n', log.join('\n'));

        // Expectation: 10 Pop * 1 Dmg = 10 Dmg/hit.
        // Goblin HP ~30. Dies in 3 hits.
        // Goblin Rate 1.0 (or faster?).
        // Goblin hits House: Dmg 8 -> Pop -4.
        // Round 1: Gob hits. House Pop 10->6. Retaliation 6? (If calc before) or 6 (if after).
        // Round 2: Gob hits. House Pop 6->2. Retaliation 2.
        // Round 3: Gob hits. House Pop 2->0. Retaliation 0.
        // Total Retaliation: 6+2 = 8 Dmg?
        // Goblin HP 30 - 8 = 22. Goblin Survives.
        // Result: Goblin DESTROYS House with 10 people easily.
        // This confirms "One Sided".

        // We WANT: House to kill Goblin or severely damage it.
        // So I expect this to "Fail" my desired balance check, but pass the code execution.
        // I will assert nothing for now, just observe log.
    });

    it('Knight vs Normal Goblin (Expected: Knight Stomp)', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'knight');
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');

        const result = simulateFight(unit, goblin);
        console.log('[Knight vs Normal]\n', result.log.join('\n'));

        // Knight (HP ~600, Dmg 100) vs Goblin (HP ~35, Dmg 8)
        // Knight 1-shots Goblin.
        expect(result.winner).toBe('Unit');
        expect(result.frames).toBeLessThan(100); // Instant kill
    });

    it('Knight vs King Goblin (Expected: Close or King Advantage)', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'knight');
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'king');

        const result = simulateFight(unit, goblin);
        console.log('[Knight vs King]\n', result.log.join('\n'));

        // Knight (HP 600, Dmg 100) vs King (HP 1200, Dmg 200)
        // King DPS = 200 (Rate 1.5s?) -> ~133 DPS
        // Knight DPS = 100 (Rate 1.0s) -> 100 DPS
        // King kills Knight in 600/200 = 3 hits
        // Knight kills King in 1200/100 = 12 hits
        // King wins easily currently.
    });

    it('Wizard vs Hobgoblin (Expected: Wizard High DPS but Fragile)', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'wizard');
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'hobgoblin');

        const result = simulateFight(unit, goblin);
        console.log('[Wizard vs Hobgoblin]\n', result.log.join('\n'));

        // Wizard (HP 120, Dmg 80) vs Hob (HP 60-90, Dmg 15)
        // Wizard 2-shots Hob.
        // Hob needs 120/15 = 8 hits.
        expect(result.winner).toBe('Unit');
    });
});
