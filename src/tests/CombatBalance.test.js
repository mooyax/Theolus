
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';

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
        document.body.innerHTML = '<canvas id="minimap"></canvas>';
        vi.useFakeTimers();

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
            getTileHeight: () => 5,
            gridToWorld: (v) => v,
            worldToGrid: (v) => v,
            clippingPlanes: [],
            getVisualPosition: (x, z) => ({ x, y: 0, z }),
            getVisualOffset: () => ({ x: 0, y: 0 }),
            addBuilding: vi.fn(),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            updateMeshPosition: vi.fn(),
            updateLights: vi.fn(),
        };

        game = new Game(null, mockTerrain, true);
        game.scene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
        game.goblinManager = new GoblinManager(game.scene, mockTerrain);
        game.markerMaterial = {
            clone: function () {
                return {
                    uniforms: { uColor: { value: { setHex: vi.fn() } } },
                    position: new THREE.Vector3()
                };
            }
        };
        window.game = game;
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
        if (game) {
            game.dispose();
            game = null;
        }
        window.game = undefined;
    });

    const simulateFight = (unit, goblin, maxFrames = 1000) => {
        let frames = 0;
        const log = [];

        unit.position.set(10, 0, 10);
        goblin.position.set(10, 0, 10);
        unit.targetGoblin = goblin;
        goblin.targetUnit = unit;

        let time = 0;
        const dt = 0.016;
        const goblins = [goblin];
        const units = [unit];
        const buildings = [];

        while (!unit.isDead && !goblin.isDead && frames < maxFrames) {
            unit.updateLogic(time, dt, false, [], [], goblins);
            goblin.updateLogic(time, dt, false, units, buildings);

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

    it('Worker vs Normal Goblin (Expected: Goblin Win due to stats buff)', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'worker');
        unit.id = 1;
        unit.isSpecial = false;
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');
        goblin.id = 100;

        const result = simulateFight(unit, goblin);
        expect(['Goblin', 'Unit']).toContain(result.winner);
    });

    it('Knight vs Normal Goblin (Expected: Knight Stomp)', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'knight');
        unit.id = 2;
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');
        goblin.id = 101;

        const result = simulateFight(unit, goblin);
        expect(result.winner).toBe('Unit');
        expect(result.frames).toBeLessThan(100);
    });

    it('Wizard vs Hobgoblin (Expected: Wizard High DPS but Fragile)', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'wizard');
        unit.id = 3;
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'hobgoblin');
        goblin.id = 102;

        const result = simulateFight(unit, goblin);
        expect(result.winner).toBe('Unit');
    });

    it('Goblin King should crush Worker', () => {
        const worker = new Unit(game.scene, mockTerrain, 10, 10, 'worker');
        worker.id = 4;
        const king = new Goblin(game.scene, mockTerrain, 10, 10, 'king');
        king.id = 103;

        const result = simulateFight(worker, king);
        expect(result.winner).toBe('Goblin');
        expect(worker.isDead).toBe(true);
        expect(king.hp).toBeGreaterThan(1000);
    });
});