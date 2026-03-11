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
            const path = findPath(payload.sx, payload.sz, payload.ex, payload.ez, payload.maxSteps, payload.unitId, payload.isNaval);
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
    heightMap = new Float32Array(data);
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

function findPath(sx, sz, ex, ez, maxStepsParam = 0, unitId = -1, isNaval = false) {
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

    // FIX: Start/End validation
    let startH = getHeight(sx, sz);
    const isStartValid = isNaval ? (startH <= 0.5) : (startH > 0);

    if (!isStartValid) {
        // Search neighbors
        let found = false;
        for (let r = 1; r <= 10; r++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    if (dx === 0 && dz === 0) continue;
                    let nsx = (sx + dx + W) % W;
                    let nsz = (sz + dz + H) % H;
                    let nh = getHeight(nsx, nsz);
                    const isNeighborValid = isNaval ? (nh <= 0.5) : (nh > 0);
                    if (isNeighborValid) {
                        sx = nsx; sz = nsz; found = true; break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (!found) {
            console.log(`[Worker] Unit ${unitId} No Path: Start ${sx},${sz} is invalid (${isNaval ? 'Naval' : 'Land'}) and no valid neighbor found.`);
            return null;
        }
    }

    let endH = getHeight(ex, ez);
    const isEndValid = isNaval ? (endH <= 0.5) : (endH > 0);
    if (!isEndValid) {
        let found = false;
        for (let r = 1; r <= 10; r++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    if (dx === 0 && dz === 0) continue;
                    let nex = (ex + dx + W) % W;
                    let nez = (ez + dz + H) % H;
                    let nh = getHeight(nex, nez);
                    const isNeighborValid = isNaval ? (nh <= 0.5) : (nh > 0);
                    if (isNeighborValid) {
                        ex = nex; ez = nez; found = true;
                        break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (!found) {
            console.log(`[Worker] Unit ${unitId} No Path: Target ${ex},${ez} is invalid (${isNaval ? 'Naval' : 'Land'}) and no valid neighbor found.`);
            return null;
        }
    }

    // A* Setup
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
                const path = [];
                let curr = bestNode;
                while (curr) {
                    path.push({ x: curr.x, z: curr.z });
                    curr = curr.parent;
                }
                return path.reverse();
            }

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

                // --- NAVAL / LAND RESTRICTIONS ---
                if (isNaval) {
                    if (hEnd > 0.5) continue; // Warships cannot go on deep land
                } else {
                    if (hEnd <= 0) continue; // Land units cannot go in water
                }

                const slope = Math.abs(hEnd - hStart);
                if (!isNaval && slope > 3.0) continue; // Slope Limit only for land

                // --- COST CALCULATION ---
                let moveCost = 0.8 * n.cost;

                if (!isNaval) {
                    if (hEnd > 8) moveCost += 4.0;
                    if (slope > 0.1) moveCost += 2.0;
                    if (hEnd <= 8) {
                        const m = getMoisture(nx, nz);
                        if (m > 0.6) moveCost += 1.2;
                    }
                } else {
                    // Naval costs: Keep it simple or add currents later
                    // Maybe slightly slower near shore?
                    const nh = getHeight(nx, nz);
                    if (nh > -2) moveCost += 0.5; // Coastal shallow penalty
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
