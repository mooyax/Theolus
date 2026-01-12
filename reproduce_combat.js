
import { Unit } from './src/Unit.js';
import { Game } from './src/Game.js';
import { Terrain } from './src/Terrain.js';

// Mocks
const window = { game: null };
global.window = window;

// Mock Three.js
const THREE = {
    Vector3: class { constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; } copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; } },
    Object3D: class { constructor() { this.position = { x: 0, y: 0, z: 0 }; this.rotation = { y: 0 }; } },
    Mesh: class { },
    Group: class { add() { } remove() { } }
};
global.THREE = THREE;

// Setup
const game = new Game();
window.game = game;
const terrain = new Terrain();
// Mock Terrain methods used by Unit/Actor
terrain.logicalWidth = 100;
terrain.logicalDepth = 100;
terrain.getTileHeight = () => 10;
terrain.getInterpolatedHeight = () => 10;
terrain.registerEntity = () => { };
terrain.moveEntity = () => { };
terrain.checkCollision = () => false;
terrain.getBuildingSize = () => 2;

game.terrain = terrain;

// Create Unit
const worker = new Unit(null, terrain, 10, 10, 'worker');
worker.id = 1;

// Create Cave
const cave = {
    userData: {
        type: 'cave',
        hp: 200,
        gridX: 12,
        gridZ: 10
    },
    position: { x: 12, y: 10, z: 10 },
    gridX: 12,
    gridZ: 10
};

console.log("Initial Cave HP:", cave.userData.hp);

// Test Logic
worker.targetBuilding = cave;
worker.attackCooldown = 0;

console.log("Calling updateCombatLogic...");
worker.updateCombatLogic(1000, 0.1);

console.log("Post Update Cave HP:", cave.userData.hp);
console.log("Worker Action:", worker.action);
console.log("Worker Grid:", worker.gridX, worker.gridZ);
