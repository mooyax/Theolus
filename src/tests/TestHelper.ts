import * as THREE from 'three';
import { vi } from 'vitest';

export class MockGame {
    public simTotalTimeSec: number;
    public units: any[];
    public requestQueue: any[];
    public squads: Map<number, any>;
    public mana: number;
    public resources: { grain: number, fish: number, meat: number };
    public totalPopulation: number;
    public frameCount: number;
    public unitScanBudget: number;
    public terrain: any;
    public scene: any;
    public goblinManager: any;
    public battleHotspots?: any[];
    public unitMap: Map<number, any>;
    public handleBuildingSpawn: any;
    public minimal: boolean;

    constructor() {
        this.minimal = true;
        this.simTotalTimeSec = 100;
        this.units = [];
        this.requestQueue = [];
        this.squads = new Map();
        this.mana = 1000;
        this.resources = { grain: 0, fish: 0, meat: 0 };
        this.totalPopulation = 10; // Default population for tests
        this.frameCount = 0;
        this.unitScanBudget = 1000;
        this.unitMap = new Map();
        this.terrain = null;
        this.scene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] })
        };
        this.goblinManager = {
            goblins: [],
            notifyClanActivity: vi.fn(),
            increasePlunder: vi.fn(),
            reportCasualty: vi.fn()
        };
        this.handleBuildingSpawn = vi.fn().mockImplementation((x, z, type, source) => {
            return this.spawnUnit(x, z, type);
        });
    }

    spawnUnit(x: number, z: number, roleOrSpecial?: string | boolean) {
        const unit = {
            id: this.units.length,
            gridX: x,
            gridZ: z,
            role: roleOrSpecial || 'worker',
            isDead: false,
            targetRequest: null,
            action: 'Idle',
            faction: 'player',
            ignoredTargets: new Map()
        };
        this.units.push(unit);
        this.totalPopulation = this.units.length; // Sync pop for tests
        return unit;
    }

    registerSquad(type: string) {
        const id = Math.floor(Math.random() * 1000000);
        this.squads.set(id, { id, type, target: null, lastUpdate: Date.now() });
        return id;
    }

    getSquad(id: number) {
        return this.squads.get(id);
    }

    reportSquadTarget(squadId: number, x: number, z: number) {
        const squad = this.squads.get(squadId);
        if (squad) {
            squad.target = { x, z, time: this.simTotalTimeSec };
            squad.lastUpdate = Date.now();
        }
    }

    addRequest(type: string, x: number, z: number, building: any, assignedTo: number | null, id?: string, isManual = false) {
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

    findBestRequest(unit: any, allowSnatch = false) {
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

    claimRequest(unit: any, req: any) {
        if (req.status === 'pending' || (req.status === 'assigned' && req.assignedTo !== unit.id)) {
            req.status = 'assigned';
            req.assignedTo = unit.id;
            unit.targetRequest = req;
            return true;
        }
        return false;
    }

    deferRequest(req: any, duration: number) {
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
    public logicalWidth: number;
    public logicalDepth: number;
    public grid: any[][];
    public buildings: any[];
    public clippingPlanes: any[];
    public pathfindingCalls: number;
    public seed: number;
    public entityGrid?: any[][];
    static callCount: number = 0;

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
                this.grid[x][z] = { regionId: 1, height: 1, hasBuilding: false, type: 'grass', moisture: 0.5 };
            }
        }
    }

    getVisualPosition(x: number, z: number, isCentered = true) { return { x: x * 10, y: 10, z: z * 10 }; }
    gridToWorld(v: number) { return v * 10; }
    updateMeshPosition(camera: any) { }
    updateLights(gameTime: number) { }
    getTileHeight(x: number, z: number) {
        const lx = Math.round(x);
        const lz = Math.round(z);
        if (lx < 0 || lx >= this.logicalWidth || lz < 0 || lz >= this.logicalDepth) return 0;
        if (!this.grid[lx] || !this.grid[lx][lz]) return 0;
        return this.grid[lx][lz].height;
    }

    getMoisture(x: number, z: number) {
        const lx = Math.round(x);
        const lz = Math.round(z);
        if (lx < 0 || lx >= this.logicalWidth || lz < 0 || lz >= this.logicalDepth) return 0.5;
        const h = this.getTileHeight(lx, lz);
        if (h === 6) return 0.8; // Forest heuristic for tests
        if (!this.grid[lx] || !this.grid[lx][lz]) return 0.5;
        return this.grid[lx][lz].moisture !== undefined ? this.grid[lx][lz].moisture : 0.5;
    }

    isWalkable(x: number, z: number) {
        const lx = Math.round(x);
        const lz = Math.round(z);
        if (lx < 0 || lx >= this.logicalWidth || lz < 0 || lz >= this.logicalDepth) return false;
        if (!this.grid[lx] || !this.grid[lx][lz]) return false;
        return this.grid[lx][lz].height < 20;
    }

    registerCave(x: number, z: number, cave: any) {
        this.buildings.push(cave);
        return true;
    }

    raycast(origin: any, direction: any) { return { x: 50, z: 50, y: 10 }; }
    registerEntity(entity: any, x: number, z: number, type: string) { }
    unregisterEntity(entity: any) { }

    findBestTarget(type: string, x: number, z: number, range: number, costFn?: (e: any, d: number) => number, candidates?: any[]) {
        let candidatesList: any[] = candidates || [];
        if (!candidates && type === 'building') candidatesList = this.buildings;
        else if (!candidates && type === 'goblin' && (window as any).game) candidatesList = ((window as any).game.goblinManager && (window as any).game.goblinManager.goblins) || [];
        else if (!candidates && type === 'unit' && (window as any).game) {
            candidatesList = [...((window as any).game.units || [])];
            if (((window as any).game as any).sheepManager) candidatesList.push(...((window as any).game as any).sheepManager.sheeps);
        }

        let best = null;
        let bestScore = Infinity;
        for (const c of candidatesList) {
            // Priority: Direct property (Unit/Goblin) then userData (Building/Entity)
            const cx = c.gridX !== undefined ? c.gridX : (c.userData ? c.userData.gridX : undefined);
            const cz = c.gridZ !== undefined ? c.gridZ : (c.userData ? c.userData.gridZ : undefined);

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

    findClosestReachablePoint(x: number, z: number) { return { x, z }; }

    addBuilding(type: string, x: number, z: number, isBuilt = false, isAncient = false, faction = 'player') {
        const b = { userData: { type, gridX: x, gridZ: z, id: `build_${x}_${z}`, faction, capacity: 5 }, y: this.grid[x][z].height };
        this.buildings.push(b);
        if (this.grid[x] && this.grid[x][z]) {
            this.grid[x][z].hasBuilding = true;
            this.grid[x][z].building = b;
        }
        return b;
    }

    async generateRandomTerrain(isPreview = false) { return; }
    setHeight(x: number, z: number, h: number) {
        if (this.grid[x] && this.grid[x][z]) this.grid[x][z].height = h;
    }
    updateColors() { }
    async checkYield() { }

    removeBuilding(b: any) {
        const callId = ++MockTerrain.callCount;
        console.log(`[MockTerrain] removeBuilding start id=${callId}`);
        if (!b) return;
        const targetId = b.id !== undefined ? b.id : (b.userData ? b.userData.id : null);
        const idx = this.buildings.findIndex(item => {
            const itemId = item.id !== undefined ? item.id : (item.userData ? item.userData.id : null);
            const match = item === b || (targetId !== null && itemId === targetId);
            console.log(`[MockTerrain] [C:${callId}] Comparing ${targetId} vs ${itemId} -> Match: ${match}`);
            return match;
        });

        console.log(`[MockTerrain] [C:${callId}] removeBuilding idx: ${idx}, total buildings: ${this.buildings.length}`);
        if (idx !== -1) {
            const removed = this.buildings.splice(idx, 1)[0];
            console.log(`[MockTerrain] [C:${callId}] AFTER splice: ${this.buildings.length}`);
            const x = removed.userData ? removed.userData.gridX : (removed.gridX || 0);
            const z = removed.userData ? removed.userData.gridZ : (removed.gridZ || 0);
            if (this.grid[x] && this.grid[x][z]) {
                this.grid[x][z].hasBuilding = false;
                this.grid[x][z].building = null;
            }
        }
    }

    getRegion(x: number, z: number) { return 1; }
    findPath(sx: number, sz: number, ex: number, ez: number) { return [{ x: ex, z: ez }]; }
    async findPathAsync(sx: number, sz: number, ex: number, ez: number) { return [{ x: ex, z: ez }]; }
    getInterpolatedHeight(x: number, z: number) { return this.getTileHeight(x, z); }
    isValidGrid(x: number, z: number) { return x >= 0 && x < this.logicalWidth && z >= 0 && z < this.logicalDepth; }
    initEntityGrid() { }
    checkFlatArea(x: number, z: number, size: number, tolerance: number = 0.1) {
        // Mock Implementation mirroring logic
        // Assuming logicalWidth/Depth is 100
        if (!this.grid[x] || !this.grid[x][z]) return false;
        const h0 = this.grid[x][z].height;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const nx = x + i; const nz = z + j;
                if (!this.grid[nx] || !this.grid[nx][nz]) return false;
                if (Math.abs(this.grid[nx][nz].height - h0) > tolerance) return false;
                if (this.grid[nx][nz].hasBuilding) return false;
            }
        }
        return true;
    }
    getRandomPointInRegion(regionId: number, cx: number, cz: number, radius: number) { return { x: cx, z: cz }; }
    getRandomPassablePointInRegion(regionId: number, cx: number, cz: number, radius: number) { return { x: cx, z: cz }; }
    modifyMoisture(x: number, z: number, amount: number) { }
    getBuildingSize(type: string) { return 2; }
}
