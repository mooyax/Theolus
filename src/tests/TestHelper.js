import * as THREE from 'three';

export class MockGame {
    constructor() {
        this.simTotalTimeSec = 100;
        this.units = [];
        this.requestQueue = [];
        this.squads = new Map();
        this.mana = 1000;
        this.resources = { grain: 0, fish: 0, meat: 0 };
        this.frameCount = 0;
        this.terrain = null;
        this.scene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] })
        };
        this.goblinManager = { goblins: [] };
    }

    spawnUnit(x, z, roleOrSpecial) {
        const unit = {
            id: this.units.length,
            gridX: x,
            gridZ: z,
            role: roleOrSpecial || 'worker',
            isDead: false,
            targetRequest: null,
            action: 'Idle',
            ignoredTargets: new Map()
        };
        this.units.push(unit);
        return unit;
    }

    registerSquad(type) {
        const id = Math.floor(Math.random() * 1000000);
        this.squads.set(id, { id, type, target: null, lastUpdate: Date.now() });
        return id;
    }

    getSquad(id) {
        return this.squads.get(id);
    }

    reportSquadTarget(squadId, x, z) {
        const squad = this.squads.get(squadId);
        if (squad) {
            squad.target = { x, z, time: this.simTotalTimeSec };
            squad.lastUpdate = Date.now();
        }
    }

    addRequest(type, x, z, building, assignedTo, id, isManual = false) {
        const req = {
            id: id || `req_${this.requestQueue.length}`,
            type, x, z,
            status: 'pending',
            isManual,
            building,
            assignedTo: assignedTo || null,
            excludedUntil: 0
        };
        this.requestQueue.push(req);
        return req;
    }

    findBestRequest(unit, allowSnatch = false) {
        for (const req of this.requestQueue) {
            if (req.status === 'completed') continue;
            if (req.excludedUntil && req.excludedUntil > this.simTotalTimeSec) continue;

            if (unit.ignoredTargets && unit.ignoredTargets.has(req.id)) {
                if (this.simTotalTimeSec < unit.ignoredTargets.get(req.id)) continue;
            }

            if (req.status === 'pending') return req;
            if (allowSnatch && req.status === 'assigned' && req.assignedTo !== unit.id && !req.isManual) {
                return req;
            }
        }
        return null;
    }

    claimRequest(unit, req) {
        if (req.status === 'pending' || (req.status === 'assigned' && req.assignedTo !== unit.id)) {
            req.status = 'assigned';
            req.assignedTo = unit.id;
            unit.targetRequest = req;
            return true;
        }
        return false;
    }

    deferRequest(req, duration) {
        if (!req) return;
        req.status = 'pending';
        req.assignedTo = null;
        req.excludedUntil = this.simTotalTimeSec + duration;
    }

    releaseRequest(unit, req) {
        if (req && req.assignedTo === unit.id) {
            req.status = 'pending';
            req.assignedTo = null;
            return true;
        }
        return false;
    }

    completeRequest(unit, req) {
        if (!req) return;
        req.status = 'completed';
        req.assignedTo = null;
        const idx = this.requestQueue.indexOf(req);
        if (idx !== -1) this.requestQueue.splice(idx, 1);
    }

    assignRequestSync(req) {
        // Simple mock assign
        const unit = this.units.find(u => u.action === 'Idle' && u.role === 'worker');
        if (unit) this.claimRequest(unit, req);
    }

    canAction() { return true; }
    reportGlobalBattle(x, z) { }
    consumeMana(amount) { this.mana -= amount; }
}

export class MockTerrain {
    constructor(width = 100, depth = 100) {
        this.logicalWidth = width;
        this.logicalDepth = depth;
        this.grid = [];
        this.buildings = [];
        this.clippingPlanes = [];
        this.pathfindingCalls = 0;
        this.seed = 0;

        for (let x = 0; x < width; x++) {
            this.grid[x] = [];
            for (let z = 0; z < depth; z++) {
                this.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false, type: 'grass', moisture: 0.5 };
            }
        }
    }

    getVisualPosition(x, z, isCentered = true) { return { x: x * 10, y: 10, z: z * 10 }; }
    gridToWorld(v) { return v * 10; }
    updateMeshPosition(camera) { }
    updateLights(gameTime) { }
    getTileHeight(x, z) {
        const lx = Math.round(x);
        const lz = Math.round(z);
        if (lx < 0 || lx >= this.logicalWidth || lz < 0 || lz >= this.logicalDepth) return 0;
        if (!this.grid[lx] || !this.grid[lx][lz]) return 0;
        return this.grid[lx][lz].height;
    }

    isWalkable(x, z) {
        const lx = Math.round(x);
        const lz = Math.round(z);
        if (lx < 0 || lx >= this.logicalWidth || lz < 0 || lz >= this.logicalDepth) return false;
        if (!this.grid[lx] || !this.grid[lx][lz]) return false;
        return this.grid[lx][lz].height < 20;
    }

    registerCave(x, z, cave) {
        this.buildings.push(cave);
        return true;
    }

    raycast(origin, direction) { return { x: 50, z: 50, y: 10 }; }
    registerEntity(entity) { }
    unregisterEntity(entity) { }

    findBestTarget(type, x, z, range, costFn) {
        let candidates = [];
        if (type === 'building') candidates = this.buildings;
        else if (type === 'goblin' && window.game) candidates = window.game.goblinManager.goblins || [];
        else if (type === 'unit' && window.game) candidates = window.game.units || [];

        let best = null;
        let bestScore = Infinity;
        for (const c of candidates) {
            const cx = c.userData ? c.userData.gridX : c.gridX;
            const cz = c.userData ? c.userData.gridZ : c.gridZ;
            if (cx === undefined || cz === undefined) continue;
            const dx = cx - x;
            const dz = cz - z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            if (dist <= range) {
                const score = costFn ? costFn(c, dist) : dist;
                if (score < bestScore) {
                    bestScore = score;
                    best = c;
                }
            }
        }
        return best;
    }

    findClosestReachablePoint(x, z) { return { x, z }; }

    addBuilding(type, x, z) {
        const b = { userData: { type, gridX: x, gridZ: z, id: `build_${x}_${z}` }, y: this.grid[x][z].height };
        this.buildings.push(b);
        if (this.grid[x] && this.grid[x][z]) {
            this.grid[x][z].hasBuilding = true;
            this.grid[x][z].building = b;
        }
        return b;
    }

    removeBuilding(b) {
        const idx = this.buildings.indexOf(b);
        if (idx !== -1) this.buildings.splice(idx, 1);
        const x = b.userData ? b.userData.gridX : b.gridX;
        const z = b.userData ? b.userData.gridZ : b.gridZ;
        if (this.grid[x] && this.grid[x][z]) {
            this.grid[x][z].hasBuilding = false;
            this.grid[x][z].building = null;
        }
    }

    getRegion(x, z) { return 1; }
    findPath(sx, sz, ex, ez) { return [{ x: ex, z: ez }]; }
    async findPathAsync(sx, sz, ex, ez) { return [{ x: ex, z: ez }]; }
    getInterpolatedHeight(x, z) { return this.getTileHeight(x, z); }
    isValidGrid(x, z) { return x >= 0 && x < this.logicalWidth && z >= 0 && z < this.logicalDepth; }
    async checkYield() { return Promise.resolve(); }
    initEntityGrid() { }
    checkFlatArea(x, z, size) { return true; }
    getRandomPointInRegion(regionId, cx, cz, radius) { return { x: cx, z: cz }; }
    getRandomPassablePointInRegion(regionId, cx, cz, radius) { return { x: cx, z: cz }; }
    modifyMoisture(x, z, amount) { }
    getBuildingSize(type) { return 2; }
}
