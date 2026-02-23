
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Job } from '../ai/states/UnitStates.js';
import { Raid } from '../ai/states/GoblinStates.js';

vi.mock('../SoundManager.js', () => ({ SoundManager: class { play() { } } }));
vi.mock('../InputManager.js', () => ({ InputManager: class { update() { } updateCursor() { } } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { update() { } draw() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { update() { } draw() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { update() { } draw() { } } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { update() { } draw() { } } }));
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } serialize() { return {}; } deserialize() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../WeatherManager.js', () => ({ WeatherManager: class { constructor() { } init() { } update() { } setWeather() { } updateSkyColor() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { async init() { } update() { } dispose() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { async init() { } update() { } updateLighting() { } dispose() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { async init() { } update() { } dispose() { } } }));

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() {
            this.target = { set: vi.fn(), clone: vi.fn().mockReturnValue({ x: 0, y: 0, z: 0 }) };
            this.enabled = true;
        }
        update() { }
        dispose() { }
        addEventListener() { }
    }
}));

describe('Comprehensive Save/Load Integration', () => {
    let game;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.removeItem('god_game_save_1');
        localStorage.removeItem('god_game_save_2');
        localStorage.removeItem('god_game_save_3');
        Unit.nextId = 0;

        game = new Game(null, null, true);
        window.game = game;

        game.terrain.updateColors = vi.fn();
        game.terrain.updateMesh = vi.fn();
        game.terrain.generate = vi.fn();
        game.terrain.getTileHeight = (x, z) => 10;
        game.terrain.getInterpolatedHeight = (x, z) => 10;
        game.terrain.registerEntity = vi.fn();
        game.terrain.unregisterEntity = vi.fn();
        game.terrain.moveEntity = vi.fn();
        game.terrain.findBestTarget = vi.fn(() => null);
        game.terrain.logicalWidth = 100;
        game.terrain.logicalDepth = 100;

        game.terrain.grid = Array(100).fill(null).map(() => Array(100).fill({
            height: 10, type: 'grass', hasBuilding: false, regionId: 1
        }));
        game.terrain.initEntityGrid();
        game.terrain.deserialize = vi.fn().mockResolvedValue(true);
        game.terrain.serialize = vi.fn().mockReturnValue({ h: [], n: [], b: [], logicalWidth: 100, logicalDepth: 100, version: 2 });

        game.goblinManager.notifyClanActivity = vi.fn().mockImplementation((clanId, pos) => {
            if (!game.goblinManager.clans[clanId]) {
                game.goblinManager.clans[clanId] = { id: clanId, active: true, aggression: 0 };
            }
            game.goblinManager.clans[clanId].aggression += 1.0;
        });
        game.goblinManager.clans = {};
        game.goblinManager.goblins = [];

        game.goblinManager.deserialize = vi.fn().mockImplementation((data) => {
            if (data) {
                if (data.clans) game.goblinManager.clans = data.clans;
                if (data.goblins) {
                    game.goblinManager.goblins = data.goblins.map(gd => {
                        const g = new Goblin(game.scene, game.terrain, gd.x || gd.gridX, gd.z || gd.gridZ, gd.type || 'normal', gd.clanId);
                        g.id = gd.id;
                        if (gd.raidGoal) g.raidGoal = gd.raidGoal;
                        if (gd.state && gd.state.includes('Raid')) {
                            g.changeState(new Raid(g));
                        }
                        return g;
                    });
                }
            }
        });
        game.goblinManager.serialize = vi.fn().mockImplementation(() => {
            return {
                clans: game.goblinManager.clans,
                goblins: game.goblinManager.goblins.map(g => ({
                    id: g.id, x: g.gridX, z: g.gridZ, type: g.type, clanId: g.clanId,
                    state: g.state ? g.state.constructor.name : 'Wander',
                    raidGoal: g.raidGoal
                }))
            };
        });
        game.goblinManager.update = vi.fn().mockImplementation((time, dt) => {
            for (const id in game.goblinManager.clans) {
                const clan = game.goblinManager.clans[id];
                clan.aggression -= dt * 0.05;
                if (clan.aggression <= 0) {
                    clan.aggression = 0;
                    clan.active = false;
                }
            }
        });
    });

    afterEach(() => {
        if (game) {
            game.dispose();
        }
        Unit.nextId = 0;
        window.game = null;
        vi.restoreAllMocks();
    });

    it('should maintain game continuity across save/load', async () => {
        game.resources = { grain: 500, fish: 200, meat: 100 };
        game.gameTime = 12.0;

        const worker = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        worker.id = 10;
        game.units.push(worker);

        const knight = new Unit(game.scene, game.terrain, 15, 15, 'knight');
        knight.id = 11;
        game.units.push(knight);

        const specialUnit = new Unit(game.scene, game.terrain, 18, 18, 'worker', true);
        specialUnit.id = 12;
        game.units.push(specialUnit);

        const req = game.addRequest('raise', 20, 20, true);
        req.id = 'req_integrity_1';

        worker.targetRequest = req;
        req.status = 'assigned';
        req.assignedTo = worker.id;
        worker.changeState(new Job(worker));

        worker.gridX = 12;
        worker.gridZ = 12;
        worker.isMoving = true;
        worker.targetGridX = 20;
        worker.targetGridZ = 20;

        const goblin = new Goblin(game.scene, game.terrain, 80, 80, 'warrior', 'clan_A');
        goblin.id = 99;
        goblin.raidGoal = { x: 50, z: 50, timestamp: 100 };
        goblin.changeState(new Raid(goblin));

        game.goblinManager.goblins.push(goblin);
        game.goblinManager.clans = { 'clan_A': { id: 'clan_A', active: true, aggression: 5.0 } };

        const house = {
            userData: { type: 'house', gridX: 5, gridZ: 5, population: 4, level: 2 }
        };
        game.terrain.buildings.push(house);
        game.terrain.grid[5][5].hasBuilding = true;

        const saveResult = game.saveGame(1);
        expect(saveResult).toBe(true);
        const saveString = localStorage.setItem.mock.calls[0][1];

        game.units.length = 0;
        game.goblinManager.goblins.length = 0;
        game.requestQueue.length = 0;
        Unit.nextId = 0;

        localStorage.getItem.mockReturnValue(saveString);
        await game.loadGame(1);

        expect(game.resources.grain).toBeGreaterThan(495);
        expect(game.units.length).toBe(3);

        const restoredWorker = game.units.find(u => u.id === 10);
        expect(restoredWorker.role).toBe('worker');
        expect(restoredWorker.state).toBeInstanceOf(Job);

        const restoredGoblin = game.goblinManager.goblins[0];
        expect(restoredGoblin.id).toBe(99);
        expect(restoredGoblin.state.constructor.name).toBe('Raid');
    });

    it('should ignore unreachable jobs after load', async () => {
        const unit = new Unit(game.scene, game.terrain, 10, 10, 'worker');
        unit.id = 11;
        game.units.push(unit);
        unit.ignoredTargets.set('req_bad_1', 99999);

        game.saveGame(2);
        const setCall = localStorage.setItem.mock.calls.find(call => call[0] === 'god_game_save_2');
        const val = setCall[1];

        game.units = [];
        localStorage.getItem.mockImplementation((key) => key === 'god_game_save_2' ? val : null);
        await game.loadGame(2);

        const restored = game.units[0];
        expect(restored.ignoredTargets.has('req_bad_1')).toBe(true);
    });

    it('should expire goblin raid after load', async () => {
        const clanId = 'clan_raid_test';
        game.goblinManager.notifyClanActivity(clanId, { x: 50, z: 50 });
        const clan = game.goblinManager.clans[clanId];
        clan.aggression = 3.0;

        game.saveGame(3);
        const setCall = localStorage.setItem.mock.calls.find(call => call[0] === 'god_game_save_3');
        const val = setCall[1];

        localStorage.getItem.mockImplementation((key) => key === 'god_game_save_3' ? val : null);
        await game.loadGame(3);

        const restoredClan = game.goblinManager.clans[clanId];
        game.goblinManager.update(70.0, 70.0, false, game.units, 1.0, game.camera);
        expect(restoredClan.active).toBe(false);
    });
});