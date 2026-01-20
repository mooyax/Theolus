
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { CombatState } from '../ai/states/UnitStates.js';
import { GoblinCombatState } from '../ai/states/GoblinStates.js';
import * as THREE from 'three';

// Mock THREE
global.THREE = {
    Vector3: class { constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; } set(x, y, z) { this.x = x; this.y = y; this.z = z; } },
    Group: class { constructor() { this.add = () => { }; this.remove = () => { }; this.children = []; } },
    Mesh: class { constructor(g, m) { this.userData = {}; } },
    BoxGeometry: class { },
    MeshBasicMaterial: class { },
    SphereGeometry: class { },
    Color: class { },
    EdgesGeometry: class { },
    LineSegments: class { },
    LineBasicMaterial: class { }
};

// Mock Vi
global.vi = { fn: (impl) => { const f = impl || (() => { }); f.mockReturnValue = () => f; return f; } };

// Mock Game & Terrain
const game = {
    units: [],
    goblinManager: { goblins: [] },
    scene: new THREE.Group(),
    requestQueue: [],
    findBestRequest: () => null,
    releaseRequest: () => { },
    completeRequest: () => { },
    simTotalTimeSec: 0,
    isNight: false
};
global.window = { game: game };

const terrain = {
    logicalWidth: 100,
    logicalDepth: 100,
    grid: [],
    buildings: [],
    getTileHeight: () => 10,
    getInterpolatedHeight: () => 10,
    isWalkable: () => true,
    registerEntity: () => { },
    unregisterEntity: () => { },
    findPathAsync: async () => [],
    findPath: () => [],
    moveEntity: () => { },
    // CRITICAL: findBestTarget
    findBestTarget: (type, x, z, range, costFn) => {
        let candidates = [];
        if (type === 'building') candidates = terrain.buildings;
        else if (type === 'goblin') candidates = game.goblinManager.goblins;
        else if (type === 'unit') candidates = game.units;

        let best = null;
        let bestScore = Infinity;
        for (const c of candidates) {
            const cx = c.userData ? c.userData.gridX : c.gridX;
            const cz = c.userData ? c.userData.gridZ : c.gridZ;
            if (cx === undefined || cz === undefined) continue;
            const dx = cx - x;
            const dz = cz - z;
            const dist = Math.sqrt(dx * dx + dz * dz);

            // Debug Log inside Search
            // console.log(`Search ${type} at ${x},${z} R:${range}. Cand: ${c.id} Dist:${dist}`);

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

// Init Grid
for (let x = 0; x < 100; x++) {
    terrain.grid[x] = [];
    for (let z = 0; z < 100; z++) {
        terrain.grid[x][z] = { regionId: 1, height: 10 };
    }
}
game.terrain = terrain;

// --- TEST UNIT ---
console.log("--- STARTING UNIT TEST ---");
const unit = new Unit(game.scene, terrain, 10, 10, 'soldier');
unit.id = 1;
unit.game = game;
game.units.push(unit);

const building = { id: 99, gridX: 50, gridZ: 50, userData: { type: 'goblin_hut', hp: 100 } };
terrain.buildings.push(building);

const goblin = new Goblin(game.scene, terrain, 20, 20);
goblin.id = 2;
goblin.game = game;
game.goblinManager.goblins.push(goblin);

unit.targetBuilding = building;
unit.changeState(new CombatState(unit));

// Mock Unit SmartMove
unit.smartMove = (x, z, t) => {
    unit.isMoving = true;
    const dx = x - unit.gridX;
    const dz = z - unit.gridZ;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len > 0) {
        unit.gridX += (dx / len) * 0.5;
        unit.gridZ += (dz / len) * 0.5;
    }
    return true;
};

// Loop
for (let i = 0; i < 50; i++) {
    unit.updateLogic(i * 0.1, 0.1, false, [goblin]);

    const d = Math.sqrt((unit.gridX - goblin.gridX) ** 2 + (unit.gridZ - goblin.gridZ) ** 2);
    if (d < 10 && i % 5 === 0) {
        console.log(`Frame ${i}: Unit(${unit.gridX.toFixed(1)}, ${unit.gridZ.toFixed(1)}) Dist:${d.toFixed(1)} Target:${unit.targetGoblin ? unit.targetGoblin.id : 'Building'}`);
    }

    if (unit.targetGoblin && unit.targetGoblin.id === goblin.id) {
        console.log("SUCCESS: Switched to Goblin!");
        break;
    }
}

// --- TEST GOBLIN ---
console.log("\n--- STARTING GOBLIN TEST ---");
const goblin2 = new Goblin(game.scene, terrain, 10, 10);
goblin2.id = 3;
goblin2.game = game;
game.goblinManager.goblins.push(goblin2);

const unit2 = new Unit(game.scene, terrain, 20, 20, 'soldier');
unit2.id = 4;
unit2.game = game;
game.units.push(unit2);

goblin2.targetBuilding = building;
goblin2.changeState(new GoblinCombatState(goblin2));

// Mock Goblin SmartMove (via executeCombatLogic hack or just manual update because CombatState calls executeCombatLogic)
// GoblinCombatState: if (executeCombatLogic) ...
// We need to define executeCombatLogic to move it?
goblin2.executeCombatLogic = (time, dt) => {
    // Mimic standard combat move
    const tx = goblin2.targetBuilding.gridX;
    const tz = goblin2.targetBuilding.gridZ;
    goblin2.smartMove(tx, tz, time);
};
goblin2.smartMove = (x, z, t) => {
    const dx = x - goblin2.gridX;
    const dz = z - goblin2.gridZ;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len > 0) {
        goblin2.gridX += (dx / len) * 0.5;
        goblin2.gridZ += (dz / len) * 0.5;
    }
    return true;
};

for (let i = 0; i < 50; i++) {
    goblin2.state.update(i * 0.1, 0.1, [unit2], [building]);

    const d = Math.sqrt((goblin2.gridX - unit2.gridX) ** 2 + (goblin2.gridZ - unit2.gridZ) ** 2);
    if (d < 10 && i % 5 === 0) {
        console.log(`Frame ${i}: Goblin(${goblin2.gridX.toFixed(1)}, ${goblin2.gridZ.toFixed(1)}) Dist:${d.toFixed(1)} Target:${goblin2.targetUnit ? goblin2.targetUnit.id : 'Building'}`);
    }

    if (goblin2.targetUnit && goblin2.targetUnit.id === unit2.id) {
        console.log("SUCCESS: Goblin Switched to Unit!");
        break;
    }
}
