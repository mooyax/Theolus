
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Entity } from '../Entity.js';
import { Actor } from '../Actor.js';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import { Combat as UnitCombat } from '../ai/states/UnitStates.js';
import { Combat as GoblinCombat } from '../ai/states/GoblinStates.js';

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

        // Reset ID counters
        Entity.nextId = 0;
        Actor.idCounter = 0;
        Unit.nextId = 0;

        mockTerrain = {
            width: 160,
            depth: 160,
            getHeight: () => 0,
            isWalkable: () => true,
            getRegion: () => ({ id: 'mockRegion' }),
            getBiomeColor: () => 0x00ff00,
            logicalWidth: 160,
            logicalDepth: 160,
            grid: Array(160).fill(0).map(() => Array(160).fill({ height: 5 })),
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
            getRandomPointInRegion: vi.fn().mockReturnValue({ x: 10, z: 10 }),
            findBestTarget: (type, tx, tz, range, costFn, candidates) => {
                const list = candidates || [];
                let best = null;
                let bestScore = Infinity;
                for (const c of list) {
                    const cx = c.gridX !== undefined ? c.gridX : (c.userData ? c.userData.gridX : undefined);
                    const cz = c.gridZ !== undefined ? c.gridZ : (c.userData ? c.userData.gridZ : undefined);
                    if (cx === undefined || cz === undefined) continue;
                    const dist = Math.sqrt((cx - tx) ** 2 + (cz - tz) ** 2);
                    if (dist <= range) {
                        const score = costFn ? costFn(c, dist) : dist;
                        if (score < bestScore) {
                            bestScore = score;
                            best = c;
                        }
                    }
                }
                return best;
            }
        };

        game = new Game(null, mockTerrain, true);
        game.scene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
        game.goblinManager = new GoblinManager(game.scene, mockTerrain, game);
        game.goblinManager.notifyClanActivity = vi.fn();
        game.markerMaterial = {
            clone: function () {
                return {
                    uniforms: { uColor: { value: { setHex: vi.fn() } } },
                    position: new THREE.Vector3()
                };
            }
        };
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    const simulateFight = (unit, goblin, maxFrames = 1000) => {
        let frames = 0;
        const dt = 0.016;
        let time = 0;
        const goblins = [goblin];
        const units = [unit];
        const buildings = [];

        unit.changeState(new UnitCombat(unit));
        goblin.changeState(new GoblinCombat(goblin));
        unit.attackCooldown = 0;
        goblin.attackCooldown = 0;

        while (!unit.isDead && !goblin.isDead && frames < maxFrames) {
            unit.isMoving = false;
            goblin.isMoving = false;
            unit.stuckTimer = 0;
            goblin.stuckTimer = 0;

            unit.updateLogic(time, dt, false, units, buildings, goblins);
            goblin.updateLogic(time, dt, false, units, buildings);

            time += dt;
            frames++;
            if (vi.getTimerCount() > 0) vi.runOnlyPendingTimers();
        }

        const winner = unit.isDead ? 'Goblin' : (goblin.isDead ? 'Unit' : 'Draw');
        return { winner, frames, unitHp: unit.hp, goblinHp: goblin.hp };
    };

    it('Worker vs Normal Goblin', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'worker');
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');
        const result = simulateFight(unit, goblin);
        expect(['Goblin', 'Unit']).toContain(result.winner);
    });

    it('Knight vs Normal Goblin', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'knight');
        unit.hp = 300;
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');
        const result = simulateFight(unit, goblin);
        expect(result.winner).toBe('Unit');
    });

    it('Wizard vs Hobgoblin', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'wizard');
        unit.hp = 250;
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'hobgoblin');
        const result = simulateFight(unit, goblin);
        expect(result.winner).toBe('Unit');
    });

    it('Goblin King vs Worker', () => {
        const unit = new Unit(game.scene, mockTerrain, 10, 10, 'worker');
        const king = new Goblin(game.scene, mockTerrain, 10, 10, 'king');
        const result = simulateFight(unit, king);
        expect(result.winner).toBe('Goblin');
    });
});