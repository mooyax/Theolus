
import { Entity } from './Entity.js';
import * as THREE from 'three';
import GameConfig from './config/GameConfig.json';

export class Building extends Entity {
    constructor(scene, terrain, type, x, z) {
        // Pass 'building' as spatialType to Entity
        super(scene, terrain, x, z, 'building');

        this.type = type;

        // Stats Configuration
        let hp = 100;
        let maxHp = 100;
        let capacity = 0;
        let defense = 0;

        const config = GameConfig.buildings[type] || { hp: 100, capacity: 0 };

        hp = config.hp;
        maxHp = config.hp;
        capacity = config.capacity || 0;
        defense = config.defense || 0;
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
        this.population = 0;
        this.hp = hp;
        this.maxHp = maxHp;
    }

    // --- LOGIC ---
    update(time, deltaTime) {
        // Human buildings (house, mansion, etc.) are managed by Terrain.js updatePopulation.
        // Goblin buildings (cave, goblin_hut) are autonomous.
        if (this.type === 'cave' || this.type === 'goblin_hut') {
            // 元の設定に戻す（ユーザー要求）
            // Cave: 0.125/s → 40s to reach pop 5.0 (spawns 1 goblin per 40s)
            // Goblin Hut: 0.25/s → 20s to reach pop 5.0 (spawns 1 goblin per 20s)
            // 元の設定: Cave 0.125, Hut 0.25 (Defined in json)
            const config = GameConfig.buildings[this.type];
            const growthRate = (config && config.growthRate) ? config.growthRate : 0.125;
            this.population = Math.min(this.userData.capacity, (this.population || 0) + growthRate * deltaTime);
        }

        // Ensure userData stays in sync for legacy systems
        this.userData.population = this.population;
        this.userData.hp = this.hp;

        // Auto-Repair remains here as it's a building-specific behavior
        if (this.population > 0 && this.hp < this.maxHp) {
            // 1 HP per 5 seconds?
            if (Math.random() < deltaTime * 0.2) {
                this.hp = Math.min(this.maxHp, this.hp + 1);
            }
        }
    }

    takeDamage(amount, attacker = null) {
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

        if (this.population > 0) {
            const popDamage = Math.max(1, Math.floor(amount * 0.1));
            this.population = Math.max(0, this.population - popDamage);
            this.userData.population = this.population;

            // 4. Retaliation Calculation
            // Defense Factor: Tower=10.0, House=4.0 (Buffed), Others=2.0
            let factor = 2.0;
            if (this.type === 'tower') factor = 10.0;
            else if (this.type === 'house') factor = 4.0;

            // Retaliation based on CURRENT population (survivors fight back)
            retaliation = Math.floor(this.population * factor);

            // 5. Goblin Defense Logic (User Request)
            if (this.type === 'cave' || this.type === 'goblin_hut') {
                if (window.game && window.game.goblinManager && window.game.goblinManager.notifyClanActivity) {
                    // Notify manager of attack
                    // attacker is passed from Unit.js now
                    if (attacker) {
                        window.game.goblinManager.notifyClanActivity({
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

    isDestroyed() {
        // Fix: User sees "0 Population" (UI floors it).
        // If population is < 1.0 (e.g. 0.05), it is effectively empty and should be destroyable.
        return this.hp <= 0 && this.population < 1.0;
    }

    // --- SERIALIZATION ---
    serialize() {
        return {
            type: this.type,
            gridX: this.gridX,
            gridZ: this.gridZ,
            population: this.population,
            hp: this.hp,
            id: this.id
        };
    }

    deserialize(data) {
        this.population = data.population || 0;
        this.hp = data.hp || this.userData.maxHp;
        this.id = data.id || this.id;
        // Sync userData
        this.userData.population = this.population;
        this.userData.hp = this.hp;
    }
}
