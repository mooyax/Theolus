
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import { Game } from '../Game.js';
import * as THREE from 'three';

// Mock Dependencies
const scene = new THREE.Scene();
const terrain = {
    clippingPlanes: [],
    buildings: [],
    getTileHeight: () => 0,
    getBuildingAt: () => null,
    registerEntity: () => { },
    grid: Array(100).fill(0).map(() => Array(100).fill({})),
    logicalWidth: 100,
    logicalDepth: 100
};

console.log("Starting Persistence Test...");

// 1. Setup Manager
const manager = new GoblinManager(scene, terrain, {});
console.log("Manager initialized.");

// 2. Add a Goblin
const g = new Goblin(scene, terrain, 10, 10, 'king', 'clan_A');
g.hp = 999;
manager.goblins.push(g);
console.log(`Added Goblin: Type=${g.type} HP=${g.hp}`);

// 3. Serialize
const data = manager.serialize();
console.log("Serialized Data:", JSON.stringify(data));

// 4. Reset & Deserialize
manager.reset();
console.log("Manager Reset. Goblins count:", manager.goblins.length);

manager.deserialize(data);
console.log("Manager Deserialized. Goblins count:", manager.goblins.length);

// 5. Verify
const restored = manager.goblins[0];
if (restored && restored.type === 'king' && restored.hp === 999) {
    console.log("SUCCESS: Goblin King restored correctly.");
} else {
    console.error("FAILURE: Restore mismatch.", restored);
}
