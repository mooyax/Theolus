import * as THREE from 'three';
import { Actor } from './Actor';
import { Wander, Combat } from './ai/states/UnitStates';
import { GameConfig } from './config/GameConfig';
import { IAiActor } from './ai/states/IAiActor';

export class Warship extends Actor implements IAiActor {
    public role: string = 'warship';
    public faction: string;
    public hp: number;
    public maxHp: number;
    public damage: number;
    public attackRange: number;
    public attackRate: number;
    public isRanged: boolean = true;
    public isNaval: boolean = true;
    public isSpecial: boolean = false;
    public isSleeping: boolean = false;
    public squadId: string | number | null = null;
    public homeBase: any = null;
    public invasionTimer: number = 0;
    public game: any = null;
    public patrolTarget: { x: number, z: number } | null = null;
    public patrolTimer: number = 0;
    public lastGatherTime: number = 0;

    constructor(scene: THREE.Scene, terrain: any, x: number, z: number, faction: string = 'player') {
        super(scene, terrain, x, z, 'unit'); // 'unit' type for renderer compatibility
        this.faction = faction;

        const config = GameConfig.units.warship;
        this.hp = config.hp || 500;
        this.maxHp = this.hp;
        this.damage = config.damage || 50;
        this.attackRange = config.attackRange || 10.0;
        this.attackRate = config.attackRate || 1.5;
        this.age = 0; // Initialize age to allow tooltip updates

        // Visuals are handled by UnitRenderer based on isNaval flag
        this.updatePosition();

        // Start in standard Wander state (from UnitStates)
        this.changeState(new Wander(this));
    }

    // --- AI INTERFACE METHODS (IAiActor) ---

    moveRandomly(time: number) {
        this.clearPath();
        if (!this.terrain) return;

        // Find a random water tile in matching region
        let currentRegion = this.terrain.getRegion(this.gridX, this.gridZ);
        const radius = 30; // Ships explore further

        // FALLBACK: If beached (currentRegion > 0) or init state (0), still look for WATER (region <= 0)
        let searchRegion = currentRegion;
        if (currentRegion >= 0) {
            searchRegion = -1; // Default to first water region if beached
        }

        const target = this.terrain.getRandomPointInRegion(searchRegion, this.gridX, this.gridZ, radius);

        if (target) {
            const h = this.terrain.getTileHeight(target.x, target.z);
            if (h <= 0.5) { // Consistent with canMoveTo threshold
                this.smartMove(target.x, target.z, time);
            }
        }
    }

    findRaidTarget(): boolean {
        if (!this.terrain) return false;

        // Scan for enemy buildings or units near coast
        const scanRange = 25.0; // Reduced from 40 for more focused behavior
        const found = this.terrain.findBestTarget('building', this.gridX, this.gridZ, scanRange, (b, dist) => {
            if (!b.userData || b.userData.hp <= 0) return Infinity;
            if (b.userData.faction === this.faction) return Infinity;
            const bId = b.id || (b.userData && b.userData.id);
            if (this.ignoredTargets.has(bId)) return Infinity;
            return dist;
        }, this.terrain.buildings);

        if (found) {
            this.patrolTarget = { x: found.gridX, z: found.gridZ };
            return true;
        }
        return false;
    }

    patrol(time: number): boolean {
        if (this.patrolTarget) {
            const success = this.smartMove(this.patrolTarget.x, this.patrolTarget.z, time);
            this.action = 'Patrolling';
            return success;
        }
        return false;
    }

    reportEnemy(target: any) {
        if (!target) return;
        if (this.game && this.game.reportGlobalBattle) {
            this.game.reportGlobalBattle(target.gridX, target.gridZ);
        }
    }

    // --- RE-IMPLEMENTING NECESSARY ACTOR OVERRIDES ---

    smartMove(tx: number, tz: number, time: number, depth: number = 0): boolean {
        // Coastal approach: if target is land, find nearest water tile
        if (this.terrain) {
            const h = this.terrain.getTileHeight(tx, tz);
            if (h > 0.5) { // Land target (Deep land)
                const radius = 5;
                let bestCoast = { x: tx, z: tz };
                let bestDist = Infinity;
                const logicalW = this.terrain.logicalWidth || 160;
                const logicalD = this.terrain.logicalDepth || 160;

                for (let dx = -radius; dx <= radius; dx++) {
                    for (let dz = -radius; dz <= radius; dz++) {
                        const nx = ((tx + dx % logicalW) + logicalW) % logicalW;
                        const nz = ((tz + dz % logicalD) + logicalD) % logicalD;
                        const th = this.terrain.getTileHeight(nx, nz);

                        if (th <= 0.5) { // Is water/coast
                            const dist = dx * dx + dz * dz;
                            if (dist < bestDist) {
                                bestDist = dist;
                                bestCoast = { x: nx, z: nz };
                            }
                        }
                    }
                }

                if (bestDist < Infinity) {
                    tx = bestCoast.x;
                    tz = bestCoast.z;
                }
            }
        }
        return super.smartMove(tx, tz, time);
    }

    // 3. Self Defense / Auto-aggro (Override for larger naval range)
    checkSelfDefense(passedGoblins: any[] | null = null, forceScan: boolean = false, passedUnits: any[] | null = null, passedBuildings: any[] | null = null): boolean {
        if (!this.terrain) return false;
        if (this.state && this.state.name !== 'Idle' && this.state.name !== 'Wander') return false;

        let target = null;
        let targetType = '';
        const scanRange = 25.0;
        // 1. Scan for Units (Humans/Invaders)
        target = this.terrain.findBestTarget('unit', this.gridX, this.gridZ, scanRange, (u: any, dist: number) => {
            if (u.isInsideBuilding || u.isDead) return Infinity;
            if (u.faction === this.faction) return Infinity; // Same faction
            if (this.ignoredTargets.has(u.id)) return Infinity;
            return dist;
        }, passedUnits || (this.game ? this.game.units : []));
        if (target) targetType = 'unit';

        // 2. Scan for Goblins (if no unit)
        if (!target) {
            target = this.terrain.findBestTarget('goblin', this.gridX, this.gridZ, scanRange, (g: any, dist: number) => {
                if (g.isDead) return Infinity;
                if (g.faction === this.faction) return Infinity; // Same faction
                if (this.ignoredTargets.has(g.id)) return Infinity;
                return dist;
            }, passedGoblins || (this.game && this.game.goblinManager ? this.game.goblinManager.goblins : []));
            if (target) targetType = 'goblin';
        }

        // 3. Scan for Buildings (if neither)
        if (!target) {
            target = this.terrain.findBestTarget('building', this.gridX, this.gridZ, scanRange, (b: any, dist: number) => {
                const bUserData = b.userData || {};
                if (bUserData.hp <= 0) return Infinity;
                const bFaction = b.faction || bUserData.faction;
                if (bFaction === this.faction) return Infinity; // Same faction
                const bId = b.id || bUserData.id;
                if (this.ignoredTargets.has(bId)) return Infinity;
                return dist;
            }, passedBuildings || this.terrain.buildings);
            if (target) targetType = 'building';
        }

        if (target) {
            this.targetGoblin = (targetType === 'goblin') ? target : null;
            this.targetUnit = (targetType === 'unit') ? target : null;
            this.targetBuilding = (targetType === 'building') ? target : null;
            this.changeState(new Combat(this));
            return true;
        }
        return false;
    }

    updateLogic(time: number, deltaTime: number) {
        this.simTime = time;
        if (this.isDead) return;

        this.updateLifecycle(deltaTime); // Enables aging and HP regeneration

        // 1. Survival Check: Warships must stay in water
        const h = this.terrain.getTileHeight(this.gridX, this.gridZ);
        if (h > 0.5) {
            this.takeDamage(10 * deltaTime); // Beached!
        }

        // 2. State Machine Update
        if (this.state) {
            this.state.update(time, deltaTime);
        }

        // 3. Resource Gathering (Naval specific: Fishing)
        this.gatherResources(time);

        // 4. Self Defense / Auto-aggro (Throttled for performance and stability)
        const frame = (this.game && this.game.frameCount) || 0;
        const isCombat = this.state && this.state.name === 'Combat';

        if (!isCombat && frame % 20 === 0) {
            this.checkSelfDefense();
        }

        // 4. Invasion Logic (Strict distance & Combat check)
        const currentTarget = this.targetUnit || this.targetGoblin || this.targetBuilding;
        if (isCombat && currentTarget && !currentTarget.isDead && !currentTarget.isNaval) {
            const dist = this.getDistance(currentTarget.gridX, currentTarget.gridZ);
            if (dist < 20.0) {
                this.updateInvasion(deltaTime, currentTarget);
            } else {
                this.invasionTimer = 0;
            }

            // DROP: Abandon target if too far
            if (dist > 35.0) {
                this.targetUnit = null;
                this.targetGoblin = null;
                this.targetBuilding = null;
                this.changeState(new Wander(this));
            }
        } else {
            this.invasionTimer = 0;
        }
    }

    canMoveTo(x: number, z: number): boolean {
        const h = this.terrain.getTileHeight(x, z);
        return h <= 0.5; // Warships can only move on water
    }

    // Override to stay at water level (like Fish.js)
    getPositionForGrid(x: number, z: number, target: THREE.Vector3 | null = null) {
        const logicalW = this.terrain.logicalWidth || 160;
        const logicalD = this.terrain.logicalDepth || 160;

        const rawX = (x - logicalW / 2) + 0.5;
        const rawZ = (z - logicalD / 2) + 0.5;

        let offsets = { x: 0, y: 0 };
        if (this.terrain && this.terrain.getVisualOffset) {
            offsets = this.terrain.getVisualOffset(rawX, -rawZ);
        }

        const finalX = rawX + offsets.x;
        const finalY = 0.22; // Sea Level (Match Port Height)
        const finalZ = rawZ - offsets.y;

        if (target) {
            target.set(finalX, finalY, finalZ);
            return target;
        }
        return new THREE.Vector3(finalX, finalY, finalZ);
    }

    updateInvasion(deltaTime: number, target: any) {
        if (!this.terrain || !this.terrain.grid) return;

        // Check for adjacent land for invasion
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
        let spawnX = -1;
        let spawnZ = -1;
        const W = this.terrain.logicalWidth;
        const D = this.terrain.logicalDepth;

        for (const [dx, dz] of directions) {
            const nx = (Math.floor(this.gridX) + dx + W) % W;
            const nz = (Math.floor(this.gridZ) + dz + D) % D;
            const cell = this.terrain.grid[nx][nz];
            if (cell.height > 0 && !cell.hasBuilding) {
                spawnX = nx;
                spawnZ = nz;
                break;
            }
        }

        if (spawnX === -1) return;

        this.invasionTimer += deltaTime;
        if (this.invasionTimer >= 8.0) {
            this.invasionTimer = 0;
            if (this.game && typeof this.game.spawnUnit === 'function') {
                const buildings = this.terrain.buildings || [];
                const factionBlds = buildings.filter((b: any) => (b.userData?.faction || b.faction) === this.faction && !b.isDead);

                const hasHouse = factionBlds.some((b: any) => b.type === 'house' || b.userData?.type === 'house');
                const hasBarracks = factionBlds.some((b: any) => b.type === 'barracks' || b.userData?.type === 'barracks');
                const hasTower = factionBlds.some((b: any) => b.type === 'tower' || b.userData?.type === 'tower');

                const availableTypes: string[] = [];
                if (hasHouse) availableTypes.push('worker');
                if (hasBarracks) availableTypes.push('knight');
                if (hasTower) availableTypes.push('wizard');

                if (availableTypes.length > 0) {
                    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
                    console.log(`[Warship ${this.id}] Invasion Spawn: ${type} at ${spawnX},${spawnZ}`);
                    this.game.spawnUnit(spawnX, spawnZ, type, null, null, false, this.faction);
                } else {
                    console.log(`[Warship ${this.id}] Invasion Skipped: No support buildings (house/barracks/tower) for faction ${this.faction}`);
                }
            }
        }
    }

    takeDamage(amount: number) {
        if (this.isDead) return;
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
            this.die();
        }
    }

    die() {
        this.isDead = true;
        // Visual death handling (can be expanded)
        if (this.game) {
            // Remove from game or trigger sinking animation
        }
    }

    dispose() {
        this.terrain.unregisterEntity(this);
    }

    // --- RESOURCE GATHERING (NAVAL FISHING) ---

    gatherResources(time: number) {
        if (!this.game || !this.terrain) return;

        // --- FACTION CHECK ---
        if (this.faction !== 'player') return;

        const cooldown = 5.0; // 5 seconds
        if (time - this.lastGatherTime < cooldown) return;

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        // Naval units only check for water (already implied by isNaval, but for robustness)
        let foundWater = false;
        const scanRadius = 6;
        for (let dx = -scanRadius; dx <= scanRadius; dx++) {
            for (let dz = -scanRadius; dz <= scanRadius; dz++) {
                const nx = ((Math.floor(this.gridX) + dx) % logicalW + logicalW) % logicalW;
                const nz = ((Math.floor(this.gridZ) + dz) % logicalD + logicalD) % logicalD;
                const h = this.terrain.getTileHeight(nx, nz);
                if (h <= 0) {
                    foundWater = true;
                    break;
                }
            }
            if (foundWater) break;
        }

        if (foundWater && this.game.resources) {
            const game = this.game;
            const economy = (GameConfig.economy && GameConfig.economy.food);

            // 1. Interference Check
            let isInterfered = false;
            const scanRange = 20.0;
            if (game.units) {
                for (const u of game.units) {
                    if (u.isDead) continue;
                    if (u.faction !== this.faction && u.role === 'warship') {
                        const dist = this.getDistance(u.gridX, u.gridZ);
                        if (dist < scanRange) {
                            isInterfered = true;
                            break;
                        }
                    }
                }
            }

            if (!isInterfered) {
                // Add fish to player resources
                const amount = (economy && economy.fisherAmount) || 1.0;
                const multiplier = 2.0; // Warships are 2x as efficient as regular fishers

                game.resources.fish = (game.resources.fish || 0) + (amount * multiplier);
                game.resources.food = (game.resources.food || 0) + (amount * multiplier);
                this.lastGatherTime = time;

                // Optional: console.log(`[Warship ${this.id}] Gathered ${amount * multiplier} fish`);
            } else {
                if (this.id === 0 || Math.random() < 0.05) {
                    console.log(`[Warship ${this.id}] Fishing interfered by enemy warship!`);
                }
            }
        }
    }
}
