
import { it, expect, vi } from 'vitest';
import { Unit } from '../Unit.js';
import * as THREE from 'three';
import * as fs from 'fs';

const LOG_FILE = 'c:/Users/mooya/develop/test/diag_trace.log';
function log(msg) {
    fs.appendFileSync(LOG_FILE, msg + '\n');
    console.error(msg);
}

class MockScene { add() { } remove() { } }
class MockTerrain {
    constructor() {
        this.logicalWidth = 100;
        this.logicalDepth = 100;
        this.grid = Array(100).fill(0).map(() => Array(100).fill({ height: 1 }));
    }
    getTileHeight(x, z) { return 1; }
    registerEntity() { }
    findPath(sx, sz, ex, ez) { return [{ x: ex, z: ez }]; }
    async findPathAsync(sx, sz, ex, ez) { return this.findPath(sx, sz, ex, ez); }
    moveEntity() { }
    getVisualOffset() { return { x: 0, y: 0 }; }
}

it('ISOLATED DIAGNOSTIC TEST', () => {
    if (fs.existsSync(LOG_FILE)) fs.unlinkSync(LOG_FILE);
    log("STEP 1: Test Start");
    const scene = new MockScene();
    const terrain = new MockTerrain();
    log("STEP 2: Dependencies Ready");
    const unit = new Unit(scene, terrain, 10, 10, 'worker');
    unit.game = { simTotalTimeSec: 0, gameActive: true };
    log("STEP 3: Unit Created ID: " + unit.id);

    log("STEP 4: checking smartMove type: " + typeof unit.smartMove);

    log("STEP 5: Calling smartMove");
    const result = unit.smartMove(11, 10, 0);
    log("STEP 6: smartMove returned: " + result);
    log("STEP 6.1: isMoving is: " + unit.isMoving);

    expect(result).toBe(true);
    log("STEP 7: Test Complete");
});
