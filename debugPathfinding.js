
// Mock self BEFORE import
global.self = { postMessage: () => { }, onmessage: null };

console.log("Starting Pathfinding Debug Script...");

async function run() {
    const { findPath, initGrid, getHeight } = await import('./src/workers/pathfindingWorker.js');

    const setupGrid = (w, h, obstacles = []) => {
        const data = new Int16Array(w * h).fill(10); // All flat height 10
        obstacles.forEach(({ x, z }) => {
            if (x >= 0 && x < w && z >= 0 && z < h) {
                data[z * w + x] = -10; // Water
            }
        });

        // Mock moisture
        const moisture = new Float32Array(w * h).fill(0.5);

        initGrid({ w, h, data: data.buffer, moistureData: moisture.buffer });
    };

    // Test Case: Unreachable Path
    console.log("Setting up grid...");
    const obstacles = [];
    for (let z = 0; z < 10; z++) obstacles.push({ x: 5, z });
    setupGrid(10, 10, obstacles);

    console.log("Finding path...");
    const path = findPath(0, 0, 9, 9, 1000, 1);

    if (path !== null) {
        console.error('[FAIL] Unexpected Path Found!');
        console.error('Path Length:', path.length);
        console.error('Path Sample:', path);

        // Check height at wall
        for (let i = 0; i < path.length; i++) {
            const p = path[i];
            const h = getHeight(p.x, p.z);
            console.log(`Node ${i}: ${p.x},${p.z} H=${h}`);
        }
    } else {
        console.log("[PASS] Path is null as expected.");
    }
    console.log("Done.");
}

run().catch(e => console.error(e));
