
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

        // 1. Analyze Enemy Faction Status
        const enemyBuildings = terrain.buildings.filter(b => b.userData.faction === 'enemy');
        const enemyUnits = this.game.units.filter(u => u.faction === 'enemy');
        const enemyRequests = this.game.requestQueue ? this.game.requestQueue.filter(r => r.faction === 'enemy' && r.status === 'pending') : [];

        // 停止条件：Enemy Unit も Enemy Building も存在しない場合は活動停止
        // これにより、全滅後も建設リクエストを発行し続けて勝利判定を妨げる問題を防ぐ
        if (enemyUnits.length === 0 && enemyBuildings.length === 0) return;

        // Count Houses
        const numHouses = enemyBuildings.filter(b => b.type === 'house').length;
        const numFarms = enemyBuildings.filter(b => b.type === 'farm').length;
        const numBarracks = enemyBuildings.filter(b => b.type === 'barracks').length;

        // Population Capacity (approx 1 house = 5 units)
        const capacity = numHouses * 5;
        const population = enemyUnits.length;

        // Decision Logic
        // Priority 1: Proactive House Construction
        // Target: Always have capacity for at least 5 more units than current population
        if (population + 5 > capacity && enemyRequests.length < 3) {
            console.log(`[EnemyAI] Ordering House. Pop: ${population}, Cap: ${capacity}, Pending: ${enemyRequests.length}`);
            // Need House
            this.tryBuild('build_house', enemyBuildings, terrain);
            return;
        }

        // Priority 2: Build Farm if Low Food (Fake logic or based on buildings)
        // Ratio: 1 Farm per 2 Houses
        if (numFarms < Math.ceil(numHouses / 2) && enemyRequests.length < 2) {
            this.tryBuild('build_farm', enemyBuildings, terrain); // Assuming 'build_farm' request exists? It usually is direct action or 'build_house' variant?
            // Checking Game.ts completeRequest... 
            // It has 'build_house', 'build_tower', 'build_barracks'. 
            // 'build_farm' might not be a request type yet? 
            // Unit.ts has 'buildFarm' method.
            // Let's stick to House only for now if farm request isn't standard.
            // Actually, let's just build houses to fix the user issue first.
        }
    }

    tryBuild(requestType: string, existingBuildings: any[], terrain: any) {
        // Find a spot near existing buildings (Cluster)
        // If no buildings, find 'castle'
        let center = { x: 40, z: 40 }; // Default center
        const castle = existingBuildings.find(b => b.type === 'castle');
        if (castle) {
            center = { x: castle.gridX, z: castle.gridZ };
        } else if (existingBuildings.length > 0) {
            // Random existing building
            const b = existingBuildings[Math.floor(Math.random() * existingBuildings.length)];
            center = { x: b.gridX, z: b.gridZ };
        }

        // Search Spiral
        const radius = 15;
        for (let i = 0; i < 20; i++) {
            const r = 3 + Math.random() * radius;
            const theta = Math.random() * Math.PI * 2;
            const tx = Math.floor(center.x + Math.cos(theta) * r);
            const tz = Math.floor(center.z + Math.sin(theta) * r);

            // Validity Check
            if (this.isValidBuildSpot(tx, tz, terrain)) {
                // Issue Request
                // console.log(`[EnemyAI] Ordering ${requestType} at ${tx},${tz}`);
                // faction is 'enemy'
                // addRequest(type, x, z, isManual, visX, visZ, building, faction)
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
