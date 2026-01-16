
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState, CombatState } from '../ai/states/UnitStates.js';
import { GlobalGame } from '../Game.js'; // Optional, but we likely use MockGame

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
    // Async Pathfinding Mock (Simulates delay)
    findPathAsync(sx, sz, tx, tz) {
        return new Promise(resolve => {
            setTimeout(() => resolve([{ x: sx, z: sz }, { x: tx, z: tz }]), 100);
        });
    }
    findPath(sx, sz, tx, tz) { return [{ x: sx, z: sz }, { x: tx, z: tz }]; }
    unregisterEntity() { }
    findClosestReachablePoint(x, z) { return { x, z }; }
    getRegion(x, z) { return 1; }
    getRandomPointInRegion(region) { return { x: 50, z: 50 }; }

    // Spatial Search Mock
    findBestTarget(type, px, pz, maxRange, scoreFunc, candidates) {
        if (!candidates) return null;
        let best = null;
        let bestScore = Infinity;
        for (const c of candidates) {
            const dx = c.gridX - px;
            const dz = c.gridZ - pz;
            const dist = Math.sqrt(dx * dx + dz * dz);
            console.log(`[MockTerrain] Candidate ID:${c.id} Dist:${dist}`);

            if (dist > maxRange) continue;
            const score = scoreFunc(c, dist);
            console.log(`[MockTerrain] Score:${score}`);
            if (score < bestScore) {
                bestScore = score;
                best = c;
            }
        }
        console.log(`[MockTerrain] Best:`, best);
        return best;
    }
}

class MockGame {
    constructor() {
        this.simTotalTimeSec = 100;
        this.frameCount = 0;
        this.units = [];
        this.requestQueue = [];
        this.goblinManager = {
            goblins: []
        };
    }
    releaseRequest(unit, req) { }
    findBestRequest(unit, snatch) { return null; }
    claimRequest(unit, req) { return true; }
    completeRequest(unit, req) { }
    reportGlobalBattle(x, z) { }
}

class MockGoblin {
    constructor(id, x, z) {
        this.id = id;
        this.gridX = x;
        this.gridZ = z;
        this.position = { x, y: 0, z };
        this.isDead = false;
        this.hp = 10;
        this.type = 'goblin';

        this.takeDamage = (amount) => {
            this.hp -= amount;
            if (this.hp <= 0) this.isDead = true;
        };
    }
}

// --- TESTS ---

describe('Regression: Worker Logic & Stability', () => {
    let unit, terrain, game;

    beforeEach(() => {
        terrain = new MockTerrain();
        game = new MockGame();
        global.THREE = THREE;
        global.window = { game };

        unit = new Unit(new THREE.Scene(), terrain, 10, 10, 'worker');
        unit.game = game;
        unit.id = 1;
        game.units.push(unit);
    });

    // 1. Worker Oscillation Fix (Async Delay)
    it('should NOT abort job during long async pathfinding (prevent oscillation)', async () => {
        // Setup: Unit has a job
        const req = { id: 101, type: 'build', x: 50, z: 50, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = req;
        unit.changeState(new JobState(unit));

        // Override findPathAsync to differ from synchronous checks if needed, 
        // but here we rely on the MockTerrain delay (100ms).

        // Start Pathfinding
        unit.updateLogic(game.simTotalTimeSec, 0.016);
        expect(unit.isPathfinding).toBe(true);

        // Simulate frames passing while pathfinding is pending
        // The unit.stuckCount should NOT increase.
        for (let i = 0; i < 5; i++) {
            game.simTotalTimeSec += 0.016;
            unit.updateLogic(game.simTotalTimeSec, 0.016);

            // Should stay in JobState
            expect(unit.state.name).toBe('JobState');
        }

        // Wait for promise resolution
        await new Promise(r => setTimeout(r, 150));

        // Final check
        expect(unit.state.name).toBe('JobState');
    });

    // 2. Passive Worker Fix (Aggression)
    it('should attack nearby Goblin Hut when idle (Passive Worker Fix)', () => {
        // Setup: Nearby Goblin Hut
        const hut = { id: 'hut1', type: 'goblin_hut', gridX: 12, gridZ: 12, isDead: false, userData: { hp: 100 } };
        terrain.buildings.push(hut);

        // State: Wander
        unit.changeState(new UnitWanderState(unit));

        // Logic Update
        // Force scan might be needed due to throttling. 
        // We simulate enough frames to trigger scan or verify force scan behavior.
        // checkSelfDefense is throttled.

        let enteredCombat = false;
        for (let i = 0; i < 40; i++) {
            game.simTotalTimeSec += 0.016;
            game.frameCount = i;
            unit.updateLogic(game.simTotalTimeSec, 0.016, false, []);

            if (unit.state.name === 'CombatState') {
                enteredCombat = true;
                break;
            }
        }

        expect(enteredCombat).toBe(true);
        expect(unit.targetBuilding).toBe(hut);
    });

    it('should attack nearby Goblin even if holding a job (Self Defense)', () => {
        // Setup: Nearby Goblin (POJO Mock to avoid Class issues)
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

        // Setup: Job
        const req = { id: 102, type: 'build', x: 80, z: 80, status: 'assigned', assignedTo: unit.id };
        unit.targetRequest = req;
        unit.changeState(new JobState(unit));

        // Logic Update
        let enteredCombat = false;

        // Mock attackGoblin to avoid mock/prototype issues and just verify call
        unit.attackGoblin = () => { };

        for (let i = 0; i < 40; i++) {
            game.simTotalTimeSec += 0.016;
            game.frameCount = i;
            unit.updateLogic(game.simTotalTimeSec, 0.016, false, game.goblinManager.goblins);

            if (unit.targetGoblin) {
                console.log('Target set:', unit.targetGoblin);
                if (typeof unit.targetGoblin.takeDamage !== 'function') {
                    console.error('Target missing takeDamage!', unit.targetGoblin);
                }
            }

            if (unit.state.name === 'CombatState') {
                enteredCombat = true;
                break;
            }
        }

        expect(enteredCombat).toBe(true);
        expect(unit.targetGoblin).toBe(goblin);
    });
});
