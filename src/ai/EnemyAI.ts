
export class EnemyAI {
    game: any;
    lastUpdate: number = 0;
    updateInterval: number = 3.0; // Check every 3 seconds

    constructor(game: any) {
        this.game = game;
    }

    update(deltaTime: number) {
        this.lastUpdate += deltaTime;
        if (this.lastUpdate < this.updateInterval) return;
        this.lastUpdate = 0;

        if (!this.game.gameActive) return;

        this.manageConstruction();
    }

    manageConstruction() {
        const terrain = this.game.terrain;
        if (!terrain || !terrain.buildings) return;

        const enemyFaction = this.game.enemyFaction;
        if (!enemyFaction) return;

        // 1. Analyze Enemy Faction Status
        const enemyBuildings = terrain.buildings.filter(b => b.userData.faction === 'enemy');
        const enemyUnits = this.game.units.filter(u => u.faction === 'enemy');
        const enemyRequests = this.game.requestQueue ? this.game.requestQueue.filter(r => r.faction === 'enemy' && r.status === 'pending') : [];

        // 停止条件
        if (enemyUnits.length === 0 && enemyBuildings.length === 0) return;

        // Count Houses
        const numHouses = enemyBuildings.filter(b => b.type === 'house').length;
        const numFarms = enemyBuildings.filter(b => b.type === 'farm').length;

        // Population Capacity
        const capacity = numHouses * 5;
        const population = enemyUnits.length;

        // Decision Logic
        if (population + 5 > capacity && enemyRequests.length < 3) {
            const cost = enemyFaction.getBuildingCost('house');
            if (enemyFaction.mana >= cost) {
                this.tryBuild('build_house', enemyBuildings, terrain);
                enemyFaction.consumeMana(cost);
            }
        }
    }

    tryBuild(requestType: string, existingBuildings: any[], terrain: any) {
        let center = { x: 40, z: 40 };
        const castle = existingBuildings.find(b => b.type === 'castle');
        if (castle) {
            center = { x: castle.gridX, z: castle.gridZ };
        } else if (existingBuildings.length > 0) {
            const b = existingBuildings[Math.floor(Math.random() * existingBuildings.length)];
            center = { x: b.gridX, z: b.gridZ };
        }

        const radius = 15;
        for (let i = 0; i < 20; i++) {
            const r = 3 + Math.random() * radius;
            const theta = Math.random() * Math.PI * 2;
            const tx = Math.floor(center.x + Math.cos(theta) * r);
            const tz = Math.floor(center.z + Math.sin(theta) * r);

            if (this.isValidBuildSpot(tx, tz, terrain)) {
                this.game.addRequest(requestType, tx, tz, true, null, null, null, 'enemy');
                return;
            }
        }
    }

    isValidBuildSpot(x: number, z: number, terrain: any) {
        const W = terrain.logicalWidth || 80;
        const D = terrain.logicalDepth || 80;
        if (x < 0 || x >= W || z < 0 || z >= D) return false;

        // Check Terrain
        const h = terrain.getTileHeight(x, z);
        if (h <= 0) return false; // Water

        // Check Occupancy
        if (terrain.grid && terrain.grid[x] && terrain.grid[x][z]) {
            if (terrain.grid[x][z].hasBuilding) return false;
        }

        // Validate Flatness (Relaxed)
        // Ensure it's not on a crazy spike
        if (terrain.checkFlatArea && !terrain.checkFlatArea(x, z, 2, 4.0)) {
            return false;
        }

        return true;
    }
}
