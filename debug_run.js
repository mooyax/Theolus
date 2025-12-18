
const { Unit } = require('./src/Unit.js');
const { Goblin } = require('./src/Goblin.js');

// MOCKS
global.window = { game: { soundManager: { playSound: () => { } }, inputManager: {}, goblinManager: {} } };
global.game = global.window.game;
global.document = { createElement: () => ({ getContext: () => ({ fillRect: () => { }, translate: () => { }, rotate: () => { }, beginPath: () => { }, moveT: () => { }, lineTo: () => { }, stroke: () => { }, fill: () => { }, arc: () => { }, closePath: () => { }, save: () => { }, restore: () => { }, clearRect: () => { } }) }) };

// Mock THREE
const mockThree = {
    Vector3: class { constructor(x, y, z) { this.x = x; this.y = y; this.z = z; } distanceTo(v) { return Math.sqrt((this.x - v.x) ** 2 + (this.z - v.z) ** 2); } },
    Sphere: class { },
    Quaternion: class { setFromAxisAngle() { } },
    Group: class { add() { } remove() { } constructor() { this.position = { set: () => { }, copy: () => { } }; this.rotation = { set: () => { } }; } },
    BoxGeometry: class { translate() { } },
    ConeGeometry: class { translate() { } },
    CylinderGeometry: class { translate() { } },
    MeshLambertMaterial: class { },
    MeshStandardMaterial: class { },
    Mesh: class { constructor() { this.position = { set: () => { }, copy: () => { } }; this.rotation = { set: () => { } }; } },
    CanvasTexture: class { }
};

// Inject THREE
Unit.prototype.scene = { add: () => { }, remove: () => { } };
Goblin.prototype.scene = { add: () => { }, remove: () => { } };

// Patch Unit to use mock THREE
// Real Unit.js imports THREE at top. We need to mock 'three' module or rely on Unit using global THREE if it were global.
// Unit.js has `import * as THREE from 'three';`
// Using `node` directly with ES modules is hard if we don't mock the import.
// FUCK. Unit.js relies on `import`.
// I'll stick to Vitest but use `runner: plain`? No.
// I'll try `console.error` in the test file. It usually persists.

console.log("LOGGING TEST - STDOUT");
console.error("LOGGING TEST - STDERR");
