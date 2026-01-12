
import { Unit } from './src/Unit.js';
import { Game } from './src/Game.js';
import { Terrain } from './src/Terrain.js';
import { JobState, UnitWanderState } from './src/ai/states/UnitStates.js';
import { WanderState } from './src/ai/states/State.js';  // WanderState lives in State.js

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
// Mock Terrain methods
terrain.logicalWidth = 100;
terrain.logicalDepth = 100;
terrain.getTileHeight = () => 10;
terrain.getInterpolatedHeight = () => 10;
terrain.registerEntity = () => { };
terrain.moveEntity = () => { };
terrain.checkCollision = () => false;
terrain.getBuildingSize = () => 2;
terrain.findPath = (sx, sz, tx, tz) => [{ x: tx, z: tz }]; // Mock pathfinding

game.terrain = terrain;

// Create Unit
const unit = new Unit(null, terrain, 10, 10, 'worker');
unit.id = 1;
// Ensure unit has states? Unit constructor usually sets WanderState.
console.log("Initial Unit State:", unit.state ? unit.state.constructor.name : 'None');

// 1. Start Manual Move (SmartMove)
console.log("Starting Move to 50,50...");
unit.smartMove(50, 50, 0);
console.log(`Unit Target: ${unit.targetGridX},${unit.targetGridZ} IsMoving: ${unit.isMoving}`);
// Verify target
if (unit.targetGridX !== 50 || unit.targetGridZ !== 50) console.error("TEST SETUP FAILED: Target not set!");

// 2. Interrupt with Job
console.log("Interrupting with Job...");
const jobRequest = { type: 'build', gridX: 20, gridZ: 20, id: 'job_1', x: 20, z: 20 }; // x/z needed for distance calc
unit.targetRequest = jobRequest;

// Manually transition to JobState
const jobState = new JobState(unit);
unit.changeState(jobState);

console.log(`State: ${unit.state.constructor.name}`);
console.log(`Saved Resume Target:`, jobState.savedResumeTarget);

// 3. Update JobState (Simulate Arrival/Work)
// We skip the travel part and pretend we are there or job is forced finish?
// Test logic used "unit.targetRequest = null" to simulate completion.
unit.targetRequest = null;

console.log("Completing Job (Request=null)... calling update()");
jobState.update(100, 1.0);

console.log(`Post-Job State: ${unit.state.constructor.name}`);
console.log(`Unit Target: ${unit.targetGridX},${unit.targetGridZ} IsMoving: ${unit.isMoving}`);

if (unit.targetGridX === 50 && unit.targetGridZ === 50) {
    console.log("SUCCESS: Unit resumed target 50,50");
} else {
    console.error(`FAILURE: Target is ${unit.targetGridX},${unit.targetGridZ}`);
}
