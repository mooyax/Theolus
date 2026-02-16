
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Combat } from '../ai/states/UnitStates.js';
import { Combat as GoblinCombat } from '../ai/states/GoblinStates.js';

// --- Mocks borrowed from GoblinEncounter for stability ---
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        TextureLoader: vi.fn(),
        AudioLoader: vi.fn(),
        AudioListener: vi.fn(),
        PositionalAudio: vi.fn(),
    };
});

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

    // Self-contained Mock Terrain to ensure findBestTarget works 100% reliability in test
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
        findPathAsync() { return Promise.resolve([]); }
        findPath() { return []; }
        findBestTarget(type, x, z, range, costFn) {
            let candidates = [];
            if (type === 'goblin') candidates = game.goblinManager.goblins;
            if (type === 'unit') candidates = game.units;
            if (type === 'building') candidates = this.buildings;

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
                        // Some cost functions return Infinity to filter
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
            units: [],
            goblinManager: { goblins: [] },
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
        global.window = { game: game };
        console.log('[TestDebug] beforeEach finished. game.scene exists?', !!game.scene);
    });

    it('Unit should switch target to nearby Goblin while moving to distant Building', () => {
        const unit = new Unit(game.scene, terrain, 10, 10, 'soldier');
        unit.id = 1;
        unit.game = game;
        game.units.push(unit);

        const building = { id: 99, gridX: 50, gridZ: 50, userData: { type: 'goblin_hut', hp: 100 }, takeDamage: () => 0 };
        terrain.buildings.push(building);

        const goblin = new Goblin(game.scene, terrain, 20, 20);
        goblin.id = 2;
        goblin.game = game;
        goblin.gridX = 20; goblin.gridZ = 20;
        game.goblinManager.goblins.push(goblin);

        unit.targetBuilding = building;
        unit.changeState(new Combat(unit));

        // Mock Movement (Slower speed to ensure scan hits)
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
        unit.game.units = [unit]; // Ensure unit is in the list for scans if needed, though they scan goblins
        // Mock game loop updates
        let switched = false;
        for (let i = 0; i < 100; i++) {
            // console.log(`[TestLoop ${i}] UpdateLogic call...`);
            game.frameCount++;
            if (i === 0) console.log(`[TestDebug] Starting Loop. Unit State: ${unit.state ? unit.state.constructor.name : 'None'}`);
            unit.updateLogic(i * 0.1, 0.1, false, [unit], terrain.buildings, [goblin]);
            // Force scan because test might hit throttle / budget
            unit.checkSelfDefense([goblin], true);

            if (unit.targetGoblin && unit.targetGoblin.id === goblin.id) {
                switched = true;
                break;
            }
        }
        if (!switched) {
            console.log(`[TestDebug] Unit State: ${unit.state.constructor.name} TargetG: ${!!unit.targetGoblin} Proximity: ${unit.getDistance(goblin.gridX, goblin.gridZ)}`);
        }
        expect(switched).toBe(true);
    });

    it('Goblin should switch target to nearby Unit while moving to distant Building', () => {
        const goblin = new Goblin(game.scene, terrain, 10, 10);
        goblin.id = 3;
        goblin.game = game;
        goblin.gridX = 10; goblin.gridZ = 10;
        game.goblinManager.goblins.push(goblin);

        const building = { id: 88, gridX: 50, gridZ: 50, userData: { type: 'castle', hp: 100 }, takeDamage: () => 0 };
        terrain.buildings.push(building);

        const unit = new Unit(game.scene, terrain, 20, 20, 'soldier');
        unit.id = 4;
        unit.game = game;
        unit.gridX = 20; unit.gridZ = 20;
        game.units.push(unit);

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

        goblin.executeCombatLogic = vi.fn((time, delta) => {
            const target = goblin.targetBuilding;
            if (target) goblin.smartMove(target.gridX, target.gridZ, time);
        });
        let switched = false;
        for (let i = 0; i < 100; i++) {
            game.frameCount++;
            goblin.state.update(i * 0.1, 0.1, false, [unit], [building]);

            if (goblin.targetUnit && goblin.targetUnit.id === unit.id) {
                switched = true;
                break;
            }
        }
        expect(switched).toBe(true);
    });

    it('should reduce scan range for Workers', () => {
        const worker = new Unit(game.scene, terrain, 10, 10, 'worker');
        worker.game = game;
        worker.role = 'worker';
        worker.id = 1;

        // Force scan
        const spy = vi.spyOn(terrain, 'findBestTarget');

        worker.checkSelfDefense(null, true);

        const goblinCall = spy.mock.calls.find(c => c[0] === 'goblin');
        const buildingCall = spy.mock.calls.find(c => c[0] === 'building');

        expect(goblinCall).toBeDefined();
        if (goblinCall) expect(goblinCall[3]).toBe(20); // Range 20 for non-knights in checkSelfDefense

        expect(buildingCall).toBeDefined();
        if (buildingCall) expect(buildingCall[3]).toBe(10); // Range 10 for workers in checkSelfDefense
    });
});
