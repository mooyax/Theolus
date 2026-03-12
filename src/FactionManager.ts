
export class FactionManager {
    public factionName: string;
    public mana: number = 100;
    public resources: { grain: number, fish: number, meat: number, food: number } = { grain: 0, fish: 0, meat: 0, food: 0 };
    public totalPopulation: number = 0;
    public manualWorkerSpawns: number = 0;
    private game: any;

    constructor(game: any, factionName: string) {
        this.game = game;
        this.factionName = factionName;
    }

    /**
     * 建築コストを算出する（自派閥の建物数に基づく）
     */
    getBuildingCost(type: string): number {
        const terrain = this.game.terrain;
        if (!terrain || !terrain.buildings) return 100;

        const count = terrain.buildings.filter((b: any) => 
            b.userData.faction === this.factionName && b.type === type
        ).length;

        // 既存のコスト計算ロジックをスケール
        let baseCost = 100;
        if (type === 'port') baseCost = 150;
        
        // 建物が増えるごとに20%ずつコスト上昇
        return Math.floor(baseCost * Math.pow(1.2, count));
    }

    consumeMana(amount: number): boolean {
        if (this.mana >= amount) {
            this.mana -= amount;
            return true;
        }
        return false;
    }

    addResources(type: 'grain' | 'fish' | 'meat' | 'food', amount: number) {
        if (this.resources[type] !== undefined) {
            this.resources[type] += amount;
        }
    }

    serialize() {
        return {
            mana: this.mana,
            resources: { ...this.resources },
            totalPopulation: this.totalPopulation,
            manualWorkerSpawns: this.manualWorkerSpawns
        };
    }

    deserialize(data: any) {
        if (!data) return;
        if (data.mana !== undefined) this.mana = data.mana;
        if (data.resources) this.resources = { ...data.resources };
        if (data.totalPopulation !== undefined) this.totalPopulation = data.totalPopulation;
        if (data.manualWorkerSpawns !== undefined) this.manualWorkerSpawns = data.manualWorkerSpawns;
    }

    reset() {
        this.mana = 100;
        this.resources = { grain: 0, fish: 0, meat: 0, food: 0 };
        this.totalPopulation = 0;
        this.manualWorkerSpawns = 0;
    }
}
