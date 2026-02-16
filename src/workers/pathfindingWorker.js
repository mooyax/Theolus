/* eslint-disable no-restricted-globals */

// Internal State
let width = 0;
let height = 0;
let heightMap = null; // Int16Array
let moistureMap = null; // Float32Array

self.onmessage = function (e) {
    const { type, payload, id } = e.data;

    switch (type) {
        case 'INIT':
            initGrid(payload);
            break;
        case 'UPDATE_CHUNK':
            updateChunk(payload);
            break;
        case 'UPDATE_CELL':
            updateCell(payload);
            break;
        case 'FIND_PATH':
            const startT = performance.now();
            console.log(`[Worker] Unit ${payload.unitId} FIND_PATH ReqID:${id} Start`);
            const path = findPath(payload.sx, payload.sz, payload.ex, payload.ez, payload.maxSteps, payload.unitId);
            const dur = performance.now() - startT;
            console.log(`[Worker] Unit ${payload.unitId} FIND_PATH ReqID:${id} Done in ${dur.toFixed(2)}ms. Found:${!!path}`);
            self.postMessage({ type: 'PATH_RESULT', id, payload: path });
            break;
        case 'DEBUG_GET_HEIGHT':
            const h = getHeight(payload.x, payload.z);
            console.log(`[Worker DEBUG] Height at ${payload.x},${payload.z} is ${h} (Index: ${payload.z * width + payload.x})`);
            break;
        default:
            console.error('Unknown message type:', type);
    }
};

// Expose helper for debug
const getHeight = (x, z) => {
    if (!heightMap) return -999;
    if (x < 0 || x >= width || z < 0 || z >= height) return -999;
    return heightMap[z * width + x];
};

const getMoisture = (x, z) => {
    if (!moistureMap) return 0.5;
    if (x < 0 || x >= width || z < 0 || z >= height) return 0.5;
    return moistureMap[z * width + x];
};

function initGrid({ w, h, data, moistureData }) {
    width = w;
    height = h;
    heightMap = new Int16Array(data);
    if (moistureData) {
        moistureMap = new Float32Array(moistureData);
    } else {
        moistureMap = new Float32Array(w * h).fill(0.5); // Fallback
    }
    console.log(`[Worker] Grid Initialized: ${width}x${height} (with Moisture)`);
}

function updateCell({ x, z, h, m }) {
    if (!heightMap) return;
    const idx = z * width + x;
    if (idx >= 0 && idx < heightMap.length) {
        heightMap[idx] = h;
        if (m !== undefined && moistureMap) {
            moistureMap[idx] = m;
        }
    }
}

function updateChunk({ startX, startZ, w, h, data }) {
    // Bulk update for terrain modification
    // data is flattened array of new heights
}

function findPath(sx, sz, ex, ez, maxStepsParam = 0, unitId = -1) {
    if (!heightMap) return null;

    // Validate Coords
    const W = width;
    const H = height;

    sx = Math.round(sx); sz = Math.round(sz);
    ex = Math.round(ex); ez = Math.round(ez);

    sx = ((sx % W) + W) % W;
    sz = ((sz % H) + H) % H;
    ex = ((ex % W) + W) % W;
    ez = ((ez % H) + H) % H;

    // Helper to get height
    const getHeight = (x, z) => heightMap[z * W + x];
    const getMoisture = (x, z) => moistureMap ? moistureMap[z * W + x] : 0.5;

    // FIX: Start/End validation (Water Check)
    let startH = getHeight(sx, sz);
    if (startH <= 0) {
        // Search neighbors
        let found = false;
        // Expanded search radius for start node as well
        for (let r = 1; r <= 4; r++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    if (dx === 0 && dz === 0) continue;
                    let nsx = (sx + dx + W) % W;
                    let nsz = (sz + dz + H) % H;
                    if (getHeight(nsx, nsz) > 0) {
                        sx = nsx; sz = nsz; found = true; break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (!found) {
            console.log(`[Worker] Unit ${unitId} No Path: Start ${sx},${sz} is invalid and no valid neighbor found.`);
            return null;
        }
    }

    let endH = getHeight(ex, ez);
    if (endH <= 0) {
        // console.log(`[Worker] Target ${ex},${ez} is water/invalid (H=${endH}). Searching nearby...`);
        let found = false;
        // Expanded search radius from 2 to 4 to find valid land
        for (let r = 1; r <= 4; r++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    if (dx === 0 && dz === 0) continue;
                    let nex = (ex + dx + W) % W;
                    let nez = (ez + dz + H) % H;
                    if (getHeight(nex, nez) > 0) {
                        ex = nex; ez = nez; found = true;
                        // console.log(`[Worker] Found valid neighbor at ${ex},${ez}`);
                        break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (!found) {
            console.log(`[Worker] Unit ${unitId} No Path: Target ${ex},${ez} is invalid and no valid neighbor found.`);
            return null;
        }
    }

    // A* Setup
    // console.log(`[Worker] Unit ${unitId} FIND_PATH Start: ${sx},${sz}(H:${startH}) -> ${ex},${ez}(H:${endH})`);

    const startNode = { x: sx, z: sz, g: 0, h: 0, f: 0, parent: null };
    const openList = [startNode];
    const openMap = new Map();
    openMap.set(`${sx},${sz}`, startNode);
    const closedSet = new Set();

    let steps = 0;
    const maxSteps = maxStepsParam > 0 ? maxStepsParam : 40000;
    let bestNode = startNode;
    let minH = Infinity;

    try {
        while (openList.length > 0) {
            steps++;
            if (steps > maxSteps) {
                // Return partial path to best node
                console.log(`[Worker] Unit ${unitId} MaxSteps Reached (${steps}).`);
                const path = [];
                let curr = bestNode;
                while (curr) {
                    path.push({ x: curr.x, z: curr.z });
                    curr = curr.parent;
                }
                return path.reverse();
            }

            // O(N) min search is faster than O(N log N) sort for pathfinding open lists
            let minF = Infinity;
            let minIdx = -1;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].f < minF) {
                    minF = openList[i].f;
                    minIdx = i;
                }
            }
            const current = openList.splice(minIdx, 1)[0];

            if (current.h < minH) {
                minH = current.h;
                bestNode = current;
            }

            const key = `${current.x},${current.z}`;
            if (closedSet.has(key)) continue;
            closedSet.add(key);
            openMap.delete(key);

            // Found Goal
            if (current.x === ex && current.z === ez) {
                const path = [];
                let curr = current;
                while (curr) {
                    path.push({ x: curr.x, z: curr.z });
                    curr = curr.parent;
                }
                return path.reverse();
            }

            const neighbors = [
                { x: 1, z: 0, cost: 1 }, { x: -1, z: 0, cost: 1 },
                { x: 0, z: 1, cost: 1 }, { x: 0, z: -1, cost: 1 },
                { x: 1, z: 1, cost: 1.414 }, { x: 1, z: -1, cost: 1.414 },
                { x: -1, z: 1, cost: 1.414 }, { x: -1, z: -1, cost: 1.414 }
            ];

            const hStart = getHeight(current.x, current.z);

            for (const n of neighbors) {
                let nx = (current.x + n.x + W) % W;
                let nz = (current.z + n.z + H) % H;

                const nKey = `${nx},${nz}`;
                if (closedSet.has(nKey)) continue;

                const hEnd = getHeight(nx, nz);
                if (hEnd <= 0) continue; // Water

                const slope = Math.abs(hEnd - hStart);
                if (slope > 3.0) continue; // Slope Limit

                // --- COST CALCULATION ---
                // Base Cost
                let moveCost = 0.8 * n.cost; // Base walking cost

                // 1. Rock Penalty (H > 8)
                if (hEnd > 8) {
                    moveCost += 4.0; // Significant penalty (Matches ~6s duration)
                }

                // 2. Slope Penalty
                if (slope > 0.1) {
                    moveCost += 2.0; // Penalty (Matches ~3s duration)
                }

                // 3. Swamp Penalty (Moisture > 0.6)
                // Note: Only if NOT rock (Rock overrides swamp usually)
                if (hEnd <= 8) {
                    const m = getMoisture(nx, nz);
                    if (m > 0.6) {
                        moveCost += 1.2; // Swamp Penalty (Matches ~2s duration)
                    }
                }

                const gScore = current.g + moveCost;
                let existing = openMap.get(nKey);

                if (existing && existing.g <= gScore) continue;

                // Heuristic
                let dx = Math.abs(nx - ex);
                let dz = Math.abs(nz - ez);
                if (dx > W / 2) dx = W - dx;
                if (dz > H / 2) dz = H - dz;
                const hScore = Math.sqrt(dx * dx + dz * dz) * 1.0;

                if (existing) {
                    existing.g = gScore;
                    existing.f = gScore + hScore;
                    existing.parent = current;
                } else {
                    const newNode = {
                        x: nx, z: nz,
                        g: gScore, h: hScore, f: gScore + hScore,
                        parent: current
                    };
                    openList.push(newNode);
                    openMap.set(nKey, newNode);
                }
            }
        }
    } catch (e) {
        console.error(`[Worker] Unit ${unitId} CRITICAL ERROR in Pathfinding:`, e);
        // FIX: Ensure main thread knows about the failure immediately
        self.postMessage({ type: 'PATH_ERROR', id, payload: { error: e.message } });
        return null;
    }

    // console.log(`[Worker] Unit ${unitId} No Path: OpenList exhausted.`);
    return null;
}

// Export for Testing
export { initGrid, updateCell, findPath, getHeight };
