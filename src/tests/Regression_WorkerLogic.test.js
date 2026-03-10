
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Job, Wander, Combat } from '../ai/states/UnitStates.js';

// --- MOCK CLASSES ---

class MockTerrain {
    constructor() {
        this.grid = [];
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.buildings = [];
        for (let x = 0; x < 100; x++) {
            this.grid[x] = [];
            for (let z = 0; z < 100; z++) {
                this.grid[x][z] = { height: 1, regionId: 1 };
            }
        }
    }
    getTileHeight(x, z) { return 1; }
    findPathAsync(sx, sz, tx, tz) {
        return Promise.resolve([{ x: sx, z: sz }, { x: tx, z: tz }]);
    }
    findPath(sx, sz, tx, tz) { return [{ x: sx, z: sz }, { x: tx, z: tz }]; }
    unregisterEntity() { }
    findClosestReachablePoint(x, z) { return { x, z }; }
    getRegion(x, z) { return 1; }
    getRandomPointInRegion(region) { return { x: 50, z: 50 }; }

    findBestTarget(type, px, pz, maxRange, scoreFunc, candidates) {
        const list = candidates || this.buildings;
        if (!list) return null;
        let best = null;
        let bestScore = Infinity;
        for (const c of list) {
            const dx = c.gridX - px;
            const dz = c.gridZ - pz;
            const dist = Math.sqrt(dx * dx + dz * dz);

            if (dist > maxRange) continue;
            const score = scoreFunc(c, dist);
            if (score < bestScore) {
                bestScore = score;
                best = c;
            }
        }
        return best;
    }
    checkFlatArea(x, z, size, tolerance) { return false; }
    getBuildingSize(type) { return (type === 'house' || type === 'farm' || type === 'goblin_hut' || type === 'cave') ? 2 : 3; }
}

class MockGame {
    constructor() {
        this.simTotalTimeSec = 100;
        this.frameCount = 0;
        this.unitScanBudget = 1000;
        this.units = [];
        this.requestQueue = [];
        this.goblinManager = { goblins: [] };
    }
    releaseRequest(unit, req) { }
    findBestRequest(unit, snatch) { return null; }
    claimRequest(unit, req) { return true; }
    completeRequest(unit, req) { }
    reportGlobalBattle(x, z) { }
}

describe('Regression: Worker Logic & Stability', () => {
    let unit, terrain, game;

    beforeEach(() => {
        terrain = new MockTerrain();
        game = new MockGame();
        global.THREE = THREE;

        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        unit.game = game;
        unit.id = 1;
        game.units.push(unit);
    });

    it('should NOT abort job during long async pathfinding (prevent oscillation)', async () => {
        const req = { id: 101, type: 'build', x: 50, z: 50, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = req;
        unit.changeState(new Job(unit));

        unit.updateLogic(game.simTotalTimeSec, 0.016);
        expect(unit.isPathfinding).toBe(true);

        for (let i = 0; i < 5; i++) {
            game.simTotalTimeSec += 0.016;
            unit.updateLogic(game.simTotalTimeSec, 0.016);
            expect(unit.state.name).toBe('Job');
        }

        await new Promise(r => setTimeout(r, 150));
        expect(unit.state.name).toBe('Job');
    });

    it('should attack nearby Goblin Hut when idle (Passive Worker Fix)', () => {
        // Setup: Nearby Goblin Hut with faction and type
        const hut = {
            id: 'hut1',
            type: 'goblin_hut',
            faction: 'enemy',
            gridX: 12,
            gridZ: 12,
            isDead: false,
            userData: { hp: 100, type: 'goblin_hut', faction: 'enemy' }
        };
        terrain.buildings.push(hut);

        unit.changeState(new Wander(unit));

        let enteredCombat = false;
        for (let i = 0; i < 40; i++) {
            game.simTotalTimeSec += 0.016;
            game.frameCount = i;
            unit.updateLogic(game.simTotalTimeSec, 0.016, false, [], terrain.buildings, []);

            if (unit.state.name === 'Combat') {
                enteredCombat = true;
                break;
            }
        }

        expect(enteredCombat).toBe(true);
        expect(unit.targetBuilding).toBe(hut);
    });

    it('should attack nearby Goblin even if holding a job (Self Defense)', () => {
        const goblin = {
            id: 'gob1',
            gridX: 11,
            gridZ: 11,
            position: { x: 11, y: 0, z: 11 },
            isDead: false,
            hp: 10,
            type: 'goblin',
            takeDamage: function (amount) {
                this.hp -= amount;
                if (this.hp <= 0) this.isDead = true;
            }
        };
        game.goblinManager.goblins.push(goblin);

        const req = { id: 102, type: 'build', x: 80, z: 80, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = req;
        unit.changeState(new Job(unit));

        let enteredCombat = false;
        unit.attack = () => { };

        for (let i = 0; i < 40; i++) {
            game.simTotalTimeSec += 0.016;
            game.frameCount = i;
            unit.updateLogic(game.simTotalTimeSec, 0.016, false, [], [], game.goblinManager.goblins);

            if (unit.state.name === 'Combat') {
                enteredCombat = true;
                break;
            }
        }

        expect(enteredCombat).toBe(true);
        expect(unit.targetGoblin).toBe(goblin);
    });
});