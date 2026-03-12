import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Combat } from '../ai/states/UnitStates.js';
import { Combat as GoblinCombat } from '../ai/states/GoblinStates.js';

const MockRenderer = class {
    init() { return Promise.resolve(); }
    update() { }
    dispose() { }
    initAssets() { }
    updateLighting() { }
};
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: MockRenderer }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: MockRenderer }));

describe('Encounter Combat Logic', () => {
    let game;
    let terrain;

    class MockTerrain {
        constructor() {
            this.grid = [];
            this.buildings = [];
            for (let x = 0; x < 100; x++) { this.grid[x] = []; for (let z = 0; z < 100; z++) this.grid[x][z] = { regionId: 1, height: 10 }; }
            this.logicalWidth = 100;
            this.logicalDepth = 100;
        }
        getTileHeight() { return 10; }
        getInterpolatedHeight() { return 10; }
        registerEntity() { }
        unregisterEntity() { }
        moveEntity() { }
        gridToWorld(v) { return v - 50 + 0.5; }
        worldToGrid(v) { return v + 50 - 0.5; }
        getRegion(x, z) { return 1; }
        getRandomPointInRegion(regionId, cx, cz, radius) { return { x: cx, z: cz }; }
        getRandomPassablePointInRegion(regionId, cx, cz, radius) { return { x: cx, z: cz }; }
        findClosestReachablePoint(x, z) { return { x, z }; }
        findPathAsync() { return Promise.resolve([]); }
        findPath() { return []; }
        findBestTarget(type, x, z, range, costFn, targetPool = null) {
            let candidates = targetPool || [];
            if (!targetPool) {
                if (type === 'goblin') candidates = game.goblinManager.goblins;
                if (type === 'unit') candidates = game.units;
                if (type === 'building') candidates = this.buildings;
            }

            let best = null;
            let bestScore = Infinity;

            for (const c of candidates) {
                const cx = c.gridX;
                const cz = c.gridZ;
                const dx = cx - x;
                const dz = cz - z;
                const dist = Math.sqrt(dx * dx + dz * dz);

                if (dist <= range) {
                    let score = dist;
                    if (costFn) {
                        const cost = costFn(c, dist);
                        if (cost === Infinity) continue;
                        score = cost;
                    }
                    if (score < bestScore) {
                        bestScore = score;
                        best = c;
                    }
                }
            }
            return best;
        }
    }

    beforeEach(() => {
        terrain = new MockTerrain();
        game = {
            entityManager: {
                units: [],
                goblins: [],
                getAllUnits: function () { return this.units; },
                getAllGoblins: function () { return this.goblins; },
                register: function (u) {
                    if (u.type === 'goblin' || (u.role && u.role === 'goblin')) this.goblins.push(u);
                    else this.units.push(u);
                },
                unregister: function (u) {
                    const list = (u.type === 'goblin' || (u.role && u.role === 'goblin')) ? this.goblins : this.units;
                    const idx = list.indexOf(u);
                    if (idx > -1) list.splice(idx, 1);
                }
            },
            get units() { return this.entityManager.units; },
            get goblinManager() { return { goblins: this.entityManager.goblins }; },
            scene: {
                add: () => { },
                remove: () => { },
                getObjectByName: () => ({ position: { set: () => { } }, rotation: { set: () => { } } })
            },
            terrain: terrain,
            gameTotalTime: 0,
            frameCount: 0,
            unitScanBudget: 1000
        };

    });

    it('Unit should switch target to nearby Goblin while moving to distant Building', () => {
        const unit = new Unit(game.scene, terrain, 10, 10, 'soldier');
        unit.id = 1;
        game.entityManager.register(unit);
        unit.game = game;

        const building = { id: 99, gridX: 50, gridZ: 50, userData: { type: 'goblin_hut', hp: 100 }, takeDamage: () => 0 };
        terrain.buildings.push(building);

        const goblin = new Goblin(game.scene, terrain, 20, 20);
        goblin.id = 2;
        goblin.game = game;
        goblin.gridX = 20; goblin.gridZ = 20;
        game.entityManager.register(goblin);

        unit.targetBuilding = building;
        unit.engageRange = 20;
        unit.changeState(new Combat(unit));

        unit.smartMove = vi.fn((x, z, t) => {
            unit.isMoving = true;
            const dx = x - unit.gridX;
            const dz = z - unit.gridZ;
            const len = Math.sqrt(dx * dx + dz * dz);
            if (len > 0) {
                unit.gridX += (dx / len) * 0.2;
                unit.gridZ += (dz / len) * 0.2;
            }
            return true;
        });

        unit.getVisualX = () => unit.gridX;
        unit.getVisualZ = () => unit.gridZ;

        let switched = false;
        for (let i = 0; i < 100; i++) {
            game.frameCount++;
            unit.updateLogic(i * 0.1, 0.1, false, [unit], terrain.buildings, [goblin]);
            unit.checkSelfDefense([goblin], true);

            if (unit.targetGoblin && unit.targetGoblin.id === goblin.id) {
                switched = true;
                break;
            }
        }
        expect(switched).toBe(true);
    });

    it('Goblin should switch target to nearby Unit while moving to distant Building', () => {
        const goblin = new Goblin(game.scene, terrain, 10, 10);
        goblin.id = 3;
        goblin.game = game;
        goblin.gridX = 10; goblin.gridZ = 10;
        game.entityManager.register(goblin);

        const building = { id: 88, gridX: 50, gridZ: 50, userData: { type: 'castle', hp: 100 }, takeDamage: () => 0 };
        terrain.buildings.push(building);

        const unit = new Unit(game.scene, terrain, 20, 20, 'soldier');
        unit.id = 4;
        unit.game = game;
        unit.gridX = 20; unit.gridZ = 20;
        game.entityManager.register(unit);

        goblin.targetBuilding = building;
        goblin.changeState(new GoblinCombat(goblin));

        goblin.getVisualX = () => goblin.gridX;
        goblin.getVisualZ = () => goblin.gridZ;
        goblin.smartMove = vi.fn((x, z, t) => {
            goblin.isMoving = true;
            const dx = x - goblin.gridX;
            const dz = z - goblin.gridZ;
            const len = Math.sqrt(dx * dx + dz * dz);
            if (len > 0) {
                goblin.gridX += (dx / len) * 0.2;
                goblin.gridZ += (dz / len) * 0.2;
            }
            return true;
        });

        let switched = false;
        for (let i = 0; i < 100; i++) {
            game.frameCount++;
            goblin.updateLogic(i * 0.1, 0.1, false, [unit], [building], []);
            goblin.scanForTargets([unit], [building]);

            if (goblin.targetUnit && goblin.targetUnit.id === unit.id) {
                switched = true;
                break;
            }
        }
        expect(switched).toBe(true);
    });
});