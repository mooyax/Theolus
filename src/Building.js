
import { Entity } from './Entity.js';
import * as THREE from 'three';

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

        if (type === 'house') {
            hp = 100;
            maxHp = 100;
            capacity = 5;
        } else if (type === 'mansion') {
            hp = 300;
            maxHp = 300;
            capacity = 10;
        } else if (type === 'tower') {
            hp = 500;
            maxHp = 500;
            capacity = 5; // Garrison
            defense = 10.0; // High retaliation
        } else if (type === 'barracks') {
            hp = 800;
            maxHp = 800;
            capacity = 10;
        } else if (type === 'castle') {
            hp = 2000;
            maxHp = 2000;
            capacity = 50;
        } else if (type === 'cave') {
            hp = 200;
            maxHp = 200;
            capacity = 20;
        } else if (type === 'goblin_hut') {
            hp = 100;
            maxHp = 100;
            capacity = 5;
        }

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
        // Sync population from userData (in case it was modified externally by spawn/damage)
        this.population = this.userData.population || 0;

        // 1. Population Growth
        if (this.type === 'house' || this.type === 'mansion' || this.type === 'cave' || this.type === 'goblin_hut') {
            const growthRate = (this.type === 'cave') ? 0.3 : 0.1; // Cave grows faster
            this.population = Math.min(this.userData.capacity, this.population + deltaTime * growthRate);
        }

        // Sync userData (legacy support)
        this.userData.population = this.population;
        this.userData.hp = this.hp;

        // Auto-Repair or Regen?
        if (this.population > 0 && this.hp < this.maxHp) {
            // 1 HP per 5 seconds?
            if (Math.random() < deltaTime * 0.2) {
                this.hp = Math.min(this.maxHp, this.hp + 1);
            }
        }
    }

    takeDamage(amount) {
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
        }

        console.log(`[Building] ${this.type}(${this.id}) took ${amount} dmg. Pop: ${this.population}. Retaliation: ${retaliation}`);

        return retaliation;
    }

    isDestroyed() {
        return this.hp <= 0;
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
