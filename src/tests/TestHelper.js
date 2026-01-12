
import { vi } from 'vitest';

export class MockGame {
    constructor() {
        this.units = [];
        this.buildings = [];
        this.requests = [];
        this.squads = new Map();

        // Time simulation
        this.gameTotalTime = 1000;
        this.simTotalTimeSec = 1000;

        // Resources
        this.resources = { fish: 0, meat: 0, grain: 0 };
        this.mana = 100;
        this.isNight = false;

        // Managers (Mocked to prevent "is not a function" errors)
        this.cloudManager = { update: vi.fn(), draw: vi.fn() };
        this.birdManager = { update: vi.fn(), draw: vi.fn() };
        this.sheepManager = { update: vi.fn(), draw: vi.fn() };
        this.goblinManager = { update: vi.fn(), draw: vi.fn(), goblins: [], caves: [] };
        this.particleSystem = { emit: vi.fn(), update: vi.fn() };
        this.inputManager = { updateCursor: vi.fn() };
        this.battleMemory = { reportRaid: vi.fn(), getPriorities: vi.fn().mockReturnValue([]) };

        // Scene
        this.scene = {
            add: vi.fn(),
            remove: vi.fn(),
            getObjectByName: vi.fn((name) => {
                if (name === 'GoblinGroup' || name === 'UnitGroup') return { add: vi.fn(), remove: vi.fn(), children: [] };
                return null;
            }),
            clear: vi.fn(),
            children: []
        };
    }

    findBestRequest(unit) { return null; }
    claimRequest(unit, req) { return true; }

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

    addRequest(type, x, z) {
        const req = { id: `req_${this.requests.length}`, type, x, z, status: 'pending' };
        this.requests.push(req);
        return req;
    }

    findBestRequest(unit) {
        return this.requests.find(r => r.status === 'pending') || null;
    }

    assignRequestSync(req) {
        // Mock
    }

    claimRequest(unit, req) {
        if (req.status === 'pending') {
            req.status = 'assigned';
            req.assignedTo = unit.id;
            return true;
        }
        return false;
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
        req.status = 'completed';
        req.assignedTo = null;
        const idx = this.requests.indexOf(req);
        if (idx !== -1) this.requests.splice(idx, 1);
    }

    canAction() { return true; }
    reportGlobalBattle(x, z) {
        if (this.battleMemory && this.battleMemory.reportRaid) {
            this.battleMemory.reportRaid(x, z, 'global', 10);
        }
    }
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

        // Initialize grid (REALLY 2D this time)
        for (let x = 0; x < width; x++) {
            this.grid[x] = [];
            for (let z = 0; z < depth; z++) {
                this.grid[x][z] = { regionId: 1, height: 10, hasBuilding: false, type: 'grass', moisture: 0.5 };
            }
        }
    }

    getVisualPosition(x, z) { return { x: x * 10, y: 10, z: z * 10 }; }
    gridToWorld(v) { return v * 10; }
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
        if (this.grid[x] && this.grid[x][z]) {
            this.buildings.push(cave);
            return true;
        }
        return false;
    }

    raycast(origin, direction) {
        return { x: 50, z: 50, y: 10 };
    }

    registerEntity(entity) { }
    unregisterEntity(entity) { }

    findBestTarget(type, x, z, range) {
        if (type === 'building') {
            return this.buildings.find(b => {
                const bx = b.userData ? b.userData.gridX : b.gridX;
                const bz = b.userData ? b.userData.gridZ : b.gridZ;
                const dx = bx - x;
                const dz = bz - z;
                return Math.sqrt(dx * dx + dz * dz) <= range;
            }) || null;
        }
        return null;
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

    modifyMoisture(x, z, amount) {
        if (this.grid[x] && this.grid[x][z]) this.grid[x][z].moisture += amount;
    }

    checkFlatArea(x, z, size) {
        return true;
    }

    getRandomPointInRegion(regionId, x, z, range) {
        // Return a valid point nearby
        const tx = Math.min(this.grid.length - 1, Math.max(0, x + 1));
        const tz = Math.min(this.grid[0].length - 1, Math.max(0, z + 1));
        return { x: tx, z: tz };
    }

    checkCollision(x, z) { return false; }

    checkFlatArea(x, z, size) {
        return true;
    }

    getBuildingSize(type) {
        if (type === 'house' || type === 'farm' || type === 'goblin_hut' || type === 'cave') return 2;
        if (type === 'barracks' || type === 'tower' || type === 'town_hall') return 3;
        return 1;
    }
    getRandomPointInRegion(regionId, x, z, radius) {
        return { x: x + 1, z: z + 1 };
    }

    getRegion(x, z) {
        if (this.grid[x] && this.grid[x][z]) return this.grid[x][z].regionId;
        return 1;
    }

    findPath(sx, sz, ex, ez) {
        return [{ x: sx, z: sz }, { x: ex, z: ez }];
    }
}
