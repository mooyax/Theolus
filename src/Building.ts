
import { Entity } from './Entity';
console.log('[DEBUG] Building.ts loaded');
import * as THREE from 'three';
import { GameConfig } from './config/GameConfig';

export class Building extends Entity {
    private _population: number = 0;
    get population(): number { return this._population; }
    set population(val: number) {
        if (isNaN(val)) val = 0; // Guard
        const diff = val - this._population;
        this._population = val;
        this.userData.population = val; // Ensure direct sync
        const game = (window as any).game;

        // ONLY update global human population for human residential buildings (house, mansion, castle)
        // Farms use population for growth, but they are NOT people.
        // Caves/Huts use population for Goblins, which are handled by GoblinManager.
        const isHumanResidential = this.type === 'house' || this.type === 'mansion' || this.type === 'castle' || this.type === 'barracks' || this.type === 'tower';

        if (game && diff !== 0 && isHumanResidential) {
            game.totalPopulation = (game.totalPopulation || 0) + diff;
        }
    }
    private _hp: number = 100;
    get hp(): number { return this._hp; }
    set hp(val: number) {
        if (isNaN(val)) val = 0;
        this._hp = val;
        if (this.userData) this.userData.hp = val;
    }
    // Added for compatibility with Unit combat checks
    get isDead(): boolean {
        // Destroyed if HP <= 0 OR if custom destruction logic (isDestroyed) says so
        if (this.hp <= 0) return true;
        if ((this as any).isDestroyed && typeof (this as any).isDestroyed === 'function') {
            return (this as any).isDestroyed();
        }
        return false;
    }

    private _maxHp: number = 100;
    get maxHp(): number { return this._maxHp; }
    set maxHp(val: number) {
        if (isNaN(val)) val = 100;
        this._maxHp = val;
        if (this.userData) this.userData.maxHp = val;
    }
    public level: number = 1;
    public rotationY: number = 0;
    // userData is inherited from Entity as 'any'

    constructor(scene: THREE.Scene, terrain: any, type: string, x: number, z: number) {
        // Pass 'building' as spatialType to Entity
        super(scene, terrain, x, z, 'building');

        this.type = type;

        // Stats Configuration
        let hp = 100;
        let maxHp = 100;
        let capacity = 0;
        let defense = 0;

        const config = (GameConfig.buildings as any)[type] || { hp: 100, capacity: 0 };

        hp = config.hp;
        maxHp = config.hp;
        capacity = config.capacity || 0;
        defense = (config.defense !== undefined) ? config.defense : 2.0; // Fix falsy zero check
        // growthRate is used in update, not here

        // Backward Compatibility Data Structure
        // Many systems access building.userData directly.
        this.userData = {
            type: type,
            gridX: x,
            gridZ: z,
            population: 0,
            hp: hp,
            maxHp: maxHp,
            capacity: capacity,
            defense: defense,
            id: this.id // Link internal ID
        };

        // Align Internal Loop Properties with userData
        this._population = 0;
        this._hp = hp;
        this._maxHp = maxHp;
    }

    // --- LOGIC ---
    override update(time: number, deltaTime: number) {
        // Centralized growth: If terrain exists, it will call handleGrowth via updatePopulation
        // BUT for standalone Unit Tests (where terrain is mock), we must handle it here to avoid breaking them.
        if (!this.terrain || (this.terrain && !this.terrain.updatePopulation)) {
            this.handleGrowth(deltaTime);
        }

        // NOTE: population, hp, and maxHp setters now handle userData sync automatically.
        // We only keep these checks if some legacy code somehow bypasses the setters.
        if (this.userData) {
            this.userData.population = this.population;
            this.userData.hp = this.hp;
            this.userData.maxHp = this.maxHp;
        }

        // Auto-Repair remains here as it's a building-specific behavior
        // FIX: Farms use population for crop growth, but it shouldn't be used as repairmen.
        const canRepair = this.population > 0 && this.type !== 'farm';
        if (canRepair && this.hp < this.maxHp) {
            // 1 HP per 5 seconds?
            if (Math.random() < deltaTime * 0.2) {
                this.hp = Math.min(this.maxHp, this.hp + 1);
            }
        }
    }

    handleGrowth(deltaTime: number) {
        if (!this.userData) return;
        const config = GameConfig.buildings[this.type];
        if (!config || config.growthRate === undefined) return;

        const rate = config.growthRate;
        const cap = config.capacity || 10;

        if (this.population < cap) {
            this.population = Math.min(cap, this.population + rate * deltaTime);
        }
    }

    takeDamage(amount: number, attacker: any = null, isCounter: boolean = false): number {
        console.log(`[Building ${this.id}] takeDamage ENTER: amount=${amount}, hp=${this.hp}`);
        // 1. Calculate Damage reduction?
        // Armor?

        // 2. Reduce HP
        const prevHp = this.hp;
        this.hp -= amount;
        this.userData.hp = this.hp;

        // 3. Population Loss Logic (Moved from Goblin.js to here)
        // If populated, population takes a hit.
        // Rule: Damage * 0.1 (Capped at 1.0 minimum if damage > 0 and pop > 0)
        let retaliation = 0;

        if (this._population > 0) {
            const popDamage = Math.max(1, Math.floor(amount * 0.1));
            this.population = Math.max(0, this._population - popDamage);

            // 4. Retaliation Calculation
            // Use defense factor from Config (userData). Fallback to 2.0 if missing.
            const factor = (this.userData.defense !== undefined) ? this.userData.defense : 2.0;
            // Retaliation based on CURRENT population (survivors fight back)
            // Fix: Only retaliate if factor > 0
            if (factor > 0) {
                retaliation = Math.floor(this.population * factor);
            }

            // 5. Goblin Defense Logic (User Request)
            if (this.type === 'cave' || this.type === 'goblin_hut') {
                if ((window as any).game && (window as any).game.goblinManager && (window as any).game.goblinManager.notifyClanActivity) {
                    // Notify manager of attack
                    // attacker is passed from Unit.js now
                    if (attacker) {
                        (window as any).game.goblinManager.notifyClanActivity({
                            type: 'UNDER_ATTACK',
                            target: this, // The building being attacked
                            attacker: attacker,
                            x: this.userData.gridX,
                            z: this.userData.gridZ
                        });
                    }
                }
            }
        }

        console.log(`[Building] ${this.type}(${this.id}) took ${amount} dmg. Pop: ${this.population}. Retaliation: ${retaliation}`);

        return retaliation;
    }

    isDestroyed(): boolean {
        // --- IMPROVED DESTRUCTION CHECK ---
        const hpDestroyed = this.hp <= 0;

        // LOGGING for test debugging
        if (hpDestroyed) {
            console.log(`[Building ${this.id}] isDestroyed TRUE (HP: ${this.hp})`);
        }

        return hpDestroyed;
    }

    // --- SERIALIZATION ---
    serialize() {
        return {
            type: this.type,
            gridX: this.gridX,
            gridZ: this.gridZ,
            population: this.population,
            hp: this.hp,
            rotationY: this.rotationY,
            id: this.id
        };
    }

    deserialize(data: any) {
        this.population = data.population || 0;
        this.hp = data.hp || this.userData.maxHp;
        const idVal = data.id || this.id;
        if (idVal) this.id = idVal;
        if (data.rotationY !== undefined) this.rotationY = data.rotationY;

        // Sync userData
        this.userData.population = this.population;
        this.userData.hp = this.hp;
    }
}
