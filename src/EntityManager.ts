import { Unit } from './Unit';
import { Goblin } from './Goblin';
import { Actor } from './Actor';

/**
 * EntityManager manages all active entities in the game (Units, Goblins, etc.)
 * it provides unified methods for registration, removal, and lookup.
 */
export class EntityManager {
    public units: Unit[] = [];
    public goblins: Goblin[] = [];
    public fishes: any[] = [];
    public sheeps: any[] = [];
    public unitMap: Map<number, Actor> = new Map();

    private game: any;

    constructor(game: any) {
        this.game = game;
    }

    /**
     * Registers an entity to the appropriate management lists and the global ID map.
     */
    register(entity: any) {
        if (!entity || entity.id === undefined) return;

        // Ensure we don't duplicate
        if (this.unitMap.has(entity.id)) {
            // If it's the exact same object, ignore. If it's a new object with same ID, unregister old first.
            const existing = this.unitMap.get(entity.id);
            if (existing === entity) return;
            this.remove(existing);
        }

        this.unitMap.set(entity.id, entity);

        // Type routing
        if (entity instanceof Goblin || entity.type === 'goblin') {
            if (!this.goblins.includes(entity as Goblin)) this.goblins.push(entity as Goblin);
        } else if (entity instanceof Unit || entity.type === 'unit' || entity.role) {
            if (!this.units.includes(entity)) this.units.push(entity);
        } else if (entity.type === 'fish' || entity.constructor.name === 'Fish') {
            if (!this.fishes.includes(entity)) this.fishes.push(entity);
        } else if (entity.type === 'sheep' || entity.constructor.name === 'Sheep') {
            if (!this.sheeps.includes(entity)) this.sheeps.push(entity);
        }
    }

    /**
     * Removes an entity from all management lists and the global ID map.
     */
    remove(entity: any) {
        if (!entity || entity.id === undefined) return;

        // If ID matches but object doesn't, we might be trying to unregister a stale reference
        const registered = this.unitMap.get(entity.id);
        if (registered !== entity && registered !== undefined) {
             // Optional: handle ID collision or stale check
        }

        this.unitMap.delete(entity.id);

        if (entity instanceof Goblin || entity.type === 'goblin') {
            const idx = this.goblins.indexOf(entity as Goblin);
            if (idx > -1) this.goblins.splice(idx, 1);
        } else if (entity instanceof Unit || entity.type === 'unit' || entity.role) {
            const idx = this.units.indexOf(entity);
            if (idx > -1) this.units.splice(idx, 1);
        } else if (entity.type === 'fish' || entity.constructor.name === 'Fish') {
            const idx = this.fishes.indexOf(entity);
            if (idx > -1) this.fishes.splice(idx, 1);
        } else if (entity.type === 'sheep' || entity.constructor.name === 'Sheep') {
            const idx = this.sheeps.indexOf(entity);
            if (idx > -1) this.sheeps.splice(idx, 1);
        }
    }

    /**
     * Fast lookup by entity ID.
     */
    getById(id: number): Actor | undefined {
        return this.unitMap.get(id);
    }

    getAllUnits(): Unit[] {
        return this.units;
    }

    getAllGoblins(): Goblin[] {
        return this.goblins;
    }

    getAllFishes(): any[] {
        return this.fishes;
    }

    getAllSheeps(): any[] {
        return this.sheeps;
    }

    /**
     * Clears all entity lists and the map.
     */
    clear() {
        this.units = [];
        this.goblins = [];
        this.fishes = [];
        this.sheeps = [];
        this.unitMap.clear();
    }

    /**
     * Returns an array of entities within a certain radius that match criteria.
     * Useful for AI scanning and detection.
     */
    getInRadius(x: number, z: number, radius: number, factionFilter?: string, type?: string): Actor[] {
        const results: Actor[] = [];
        const rSq = radius * radius;

        // Determine which list to scan
        let pool: any[] = [];
        if (type === 'unit') pool = this.units;
        else if (type === 'goblin') pool = this.goblins;
        else if (type === 'fish') pool = this.fishes;
        else if (type === 'sheep') pool = this.sheeps;
        else {
            // General pool (could be expensive, maybe we need an 'allActors' list)
            // For now, combine units and goblins
            pool = [...this.units, ...this.goblins];
        }

        for (const e of pool) {
            if (factionFilter && e.faction !== factionFilter) continue;
            
            const dx = e.gridX - x;
            const dz = e.gridZ - z;
            if (dx * dx + dz * dz <= rSq) {
                results.push(e);
            }
        }
        return results;
    }
}
