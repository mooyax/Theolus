
// Standalone Test for calculateRegions Algorithm
// Simulates Terrain.js logic to verify correctness

function calculateRegions(grid, W, D) {
    let currentRegion = 0;

    // Reset
    for (let x = 0; x < W; x++) {
        for (let z = 0; z < D; z++) {
            grid[x][z].regionId = 0;
        }
    }

    const queue = [];
    const directions = [
        { x: 1, z: 0 }, { x: -1, z: 0 },
        { x: 0, z: 1 }, { x: 0, z: -1 }
    ];

    for (let x = 0; x < W; x++) {
        for (let z = 0; z < D; z++) {
            const startCell = grid[x][z];

            if (startCell.height > 0 && startCell.regionId === 0) {
                currentRegion++;
                startCell.regionId = currentRegion;
                queue.push({ x, z });

                while (queue.length > 0) {
                    const { x: cx, z: cz } = queue.pop();

                    for (const dir of directions) {
                        let nx = cx + dir.x;
                        let nz = cz + dir.z;

                        // Wrap
                        if (nx < 0) nx = W - 1;
                        if (nx >= W) nx = 0;
                        if (nz < 0) nz = D - 1;
                        if (nz >= D) nz = 0;

                        const neighbor = grid[nx][nz];
                        if (neighbor.height > 0 && neighbor.regionId === 0) {
                            neighbor.regionId = currentRegion;
                            queue.push({ x: nx, z: nz });
                        }
                    }
                }
            }
        }
    }
    return currentRegion;
}

// --- TEST CASE ---
const W = 10;
const D = 10;
const grid = [];
for (let x = 0; x < W; x++) {
    grid[x] = [];
    for (let z = 0; z < D; z++) {
        grid[x][z] = { height: 0, regionId: 0 };
    }
}

// Island 1 at (5,5)
grid[5][5].height = 5;

// Island 2 at (2,2)
grid[2][2].height = 5;

// Run
console.log("Running Algo...");
const count = calculateRegions(grid, W, D);
console.log(`Islands found: ${count}`);

const r1 = grid[5][5].regionId;
const r2 = grid[2][2].regionId;

console.log(`Region (5,5): ${r1}`);
console.log(`Region (2,2): ${r2}`);

if (r1 > 0 && r2 > 0 && r1 !== r2) {
    console.log("SUCCESS: Logic verified.");
} else {
    console.log("FAILURE: Logic Broken.");
}
