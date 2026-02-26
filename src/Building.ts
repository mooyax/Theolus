
import { Entity } from './Entity';
import * as THREE from 'three';
import { GameConfig } from './config/GameConfig';

export class Building extends Entity {
    private _population: number = 0;
    get population(): number { return this._population; }
    set population(val: number) {
        if (typeof val !== 'number' || isNaN(val)) val = 0;
        const diff = val - this._population;
        this._population = val;
        if (this.userData) this.userData.population = val;

        const game = (window as any).game;
        const isHumanResidential = this.type === 'house' || this.type === 'mansion' || this.type === 'castle' || this.type === 'barracks' || this.type === 'tower';
        if (game && diff !== 0 && isHumanResidential) {
            game.totalPopulation = (game.totalPopulation || 0) + diff;
        }
    }
    private _hp: number = 100;
    get hp(): number { return this._hp; }
    set hp(val: number) {
        if (typeof val !== 'number' || isNaN(val)) val = 0;
        this._hp = val;
        if (this.userData) this.userData.hp = val;
    }
    get isDead(): boolean {
        if (this.hp <= 0) return true;
        if (this._isDead) return true;
        if (this.userData && this.userData.isDead) return true;
        return false;
    }
    set isDead(val: boolean) {
        this._isDead = val;
        if (this.userData) this.userData.isDead = val;
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

    constructor(scene: THREE.Scene, terrain: any, type: string, x: number, z: number) {
        super(scene, terrain, x, z, 'building');
        this.type = type;
        this.userData.faction = 'player';
        let hp = 100;
        const config = (GameConfig.buildings as any)[type] || { hp: 100, capacity: 0 };
        hp = config.hp;

        // Initialize values
        this._population = 0;
        this._hp = hp;
        this._maxHp = hp;

        // Initialize userData correctly
        this.userData.type = type;
        this.userData.gridX = x;
        this.userData.gridZ = z;
        this.userData.population = 0;
        this.userData.hp = hp;
        this.userData.maxHp = hp;
        this.userData.capacity = config.capacity || 0;
        this.userData.defense = (config.defense !== undefined) ? config.defense : 2.0;
        this.userData.id = this.id;
        this.userData.isBuilding = true; // Clear indicator for State detection
    }

    override update(time: number, deltaTime: number) {
        if (!this.terrain || (this.terrain && !this.terrain.updatePopulation)) {
            this.handleGrowth(deltaTime);
        }
        const canRepair = this.population > 0 && this.type !== 'farm';
        if (canRepair && this.hp < this.maxHp) {
            if (Math.random() < deltaTime * 0.2) {
                this.hp = Math.min(this.maxHp, this.hp + 1);
            }
        }
    }

    handleGrowth(deltaTime: number) {
        const config = GameConfig.buildings[this.type];
        if (!config || config.growthRate === undefined) return;
        const rate = config.growthRate;
        const cap = (config.capacity !== undefined) ? config.capacity : 10;
        if (this.population < cap) {
            this.population = Math.min(cap, this.population + rate * deltaTime);
        }
    }

    takeDamage(amount: number, attacker: any = null, isCounter: boolean = false): number {
        if (this.isDead) return 0; // Already dead


        let retaliation = 0;
        const currentPop = this.population || 0;

        // 1. Calculate retaliation based on current population BEFORE damage
        const factor = (this.userData.defense !== undefined) ? this.userData.defense : 2.0;
        if (factor > 0 && currentPop > 0) {
            retaliation = Math.floor(currentPop * factor);
        }

        // 2. Damage logic: First reduce population (1 damage = 1 pop), remaining to HP
        const popLossLimit = amount; // 1:1 scaling
        const actualPopLoss = Math.min(currentPop, popLossLimit);
        const damageAccountedFor = actualPopLoss; // 1:1
        const remainingDamage = amount - damageAccountedFor;

        if (actualPopLoss > 0) {
            this.population = Math.max(0, currentPop - actualPopLoss);
        }

        if (remainingDamage > 0) {
            this.hp -= remainingDamage;
        }

        if (this.hp <= 0) {
            this.hp = 0;
            if (this.terrain && this.terrain.removeBuilding) {
                this.terrain.removeBuilding(this);
            }
        }

        if (this.type === 'cave' || this.type === 'goblin_hut') {
            if ((window as any).game && (window as any).game.goblinManager && (window as any).game.goblinManager.notifyClanActivity) {
                if (attacker) {
                    (window as any).game.goblinManager.notifyClanActivity({
                        type: 'UNDER_ATTACK',
                        target: this,
                        attacker: attacker,
                        x: this.userData.gridX,
                        z: this.userData.gridZ
                    });
                }
            }
        }

        if (retaliation > 0 && attacker && typeof attacker.takeDamage === 'function') {
            attacker.takeDamage(retaliation, this, true);
        }


        return retaliation;
    }

    isDestroyed(): boolean {
        return this.hp <= 0;
    }

    serialize() {
        return {
            type: this.type,
            gridX: this.gridX,
            gridZ: this.gridZ,
            population: this.population,
            hp: this.hp,
            rotationY: this.rotationY,
            faction: this.userData ? this.userData.faction : 'player',
            id: this.id
        };
    }

    deserialize(data: any) {
        this.population = data.population || 0;
        this.hp = data.hp || this.userData.maxHp;
        const idVal = data.id || this.id;
        if (idVal) this.id = idVal;
        if (data.rotationY !== undefined) this.rotationY = data.rotationY;
        this.userData.population = this.population;
        this.userData.hp = this.hp;
    }
}
