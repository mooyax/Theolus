/* eslint-disable no-restricted-globals */

// Internal State
let width = 0;
let height = 0;
let heightMap = null; // Int16Array for height (supports negative and >255 slightly, though terrain is usually -5 to 20)

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
            const path = findPath(payload.sx, payload.sz, payload.ex, payload.ez, payload.maxSteps);
            self.postMessage({ type: 'PATH_RESULT', id, payload: path });
            break;
        default:
            console.error('Unknown message type:', type);
    }
};

function initGrid({ w, h, data }) {
    width = w;
    height = h;
    // data is expected to be a flattened array of heights
    // If passed as SharedArrayBuffer or Transferable, use directly if possible
    heightMap = new Int16Array(data);
    console.log(`[Worker] Grid Initialized: ${width}x${height}`);
}

function updateCell({ x, z, h }) {
    if (!heightMap) return;
    const idx = z * width + x;
    if (idx >= 0 && idx < heightMap.length) {
        heightMap[idx] = h;
    }
}

function updateChunk({ startX, startZ, w, h, data }) {
    // Bulk update for terrain modification
    // data is flattened array of new heights
}

function findPath(sx, sz, ex, ez, maxStepsParam = 0) {
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

    // FIX: Start/End validation (Water Check)
    let startH = getHeight(sx, sz);
    if (startH <= 0) {
        // Search neighbors
        let found = false;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dz = -1; dz <= 1; dz++) {
                if (dx === 0 && dz === 0) continue;
                let nsx = (sx + dx + W) % W;
                let nsz = (sz + dz + H) % H;
                if (getHeight(nsx, nsz) > 0) {
                    sx = nsx; sz = nsz; found = true; break;
                }
            }
            if (found) break;
        }
        if (!found) return null;
    }

    let endH = getHeight(ex, ez);
    if (endH <= 0) {
        let found = false;
        for (let r = 1; r <= 2; r++) {
            for (let dx = -r; dx <= r; dx++) {
                for (let dz = -r; dz <= r; dz++) {
                    if (dx === 0 && dz === 0) continue;
                    let nex = (ex + dx + W) % W;
                    let nez = (ez + dz + H) % H;
                    if (getHeight(nex, nez) > 0) {
                        ex = nex; ez = nez; found = true; break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (!found) return null;
    }

    // A* Setup
    // Use Flat Arrays for Open/Closed sets to avoid Object allocation overhead?
    // For now, simpler Object implementation (like original) to ensure correctness first.
    // Optimization Phase 3: TypedArrays for A*.

    const startNode = { x: sx, z: sz, g: 0, h: 0, f: 0, parent: null };

    // MinHeap would be better, but using Array.sort as per original
    const openList = [startNode];
    const openMap = new Map(); // Key: "x,z" -> Node
    openMap.set(`${sx},${sz}`, startNode);

    const closedSet = new Set(); // Key: "x,z"

    let steps = 0;
    const maxSteps = maxStepsParam > 0 ? maxStepsParam : 40000;
    let bestNode = startNode;
    let minH = Infinity;

    while (openList.length > 0) {
        steps++;
        if (steps > maxSteps) {
            // Return partial path
            const path = [];
            let curr = bestNode;
            while (curr) {
                path.push({ x: curr.x, z: curr.z });
                curr = curr.parent;
            }
            return path.reverse();
        }

        // Pop lowest f
        // Sort is O(N log N). Ideally explicit MinStack.
        // Simple optimization: Just scan for min F if list is small? 
        // Or keep sorted insertion.
        // Original used sort.
        openList.sort((a, b) => a.f - b.f);
        const current = openList.shift();

        // Track closest
        if (current.h < minH) {
            minH = current.h;
            bestNode = current;
        }

        const key = `${current.x},${current.z}`;
        openMap.delete(key);
        closedSet.add(key);

        if (current.x === ex && current.z === ez) {
            // Reconstruct
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
            if (slope > 2.0) continue; // Steep

            let moveCost = 0.8 * n.cost;
            if (hEnd > 8) moveCost += 2.0; // Mountain
            moveCost += slope * 1.0;

            const gScore = current.g + moveCost;
            let existing = openMap.get(nKey);

            if (existing && existing.g <= gScore) continue;

            // Heuristic (Euclidean * 0.8 - same as original)
            let dx = Math.abs(nx - ex);
            let dz = Math.abs(nz - ez);
            if (dx > W / 2) dx = W - dx;
            if (dz > H / 2) dz = H - dz;
            const hScore = Math.sqrt(dx * dx + dz * dz) * 0.8;

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

    return null;
}
