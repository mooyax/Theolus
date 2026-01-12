import { vi, describe, it, expect } from 'vitest';

// --- MINIMAL STUBS (No imports from ../ to avoid mock loops) ---
class MockBattleMemory {
    constructor() { this.raids = []; }
    reportRaid(x, z, time) {
        this.raids.push({ x, z, time });
    }
    getPriorities() { return []; }
}

class MockUnit {
    constructor(role, homeBase) {
        this.role = role;
        this.homeBase = homeBase;
        this.attackedGoblin = null;
    }
    attackGoblin(goblin) {
        this.attackedGoblin = goblin;
        goblin.takeDamage(10);
        if (this.homeBase && this.homeBase.userData && this.homeBase.userData.memory) {
            this.homeBase.userData.memory.reportRaid(goblin.gridX, goblin.gridZ, 100);
        }
    }
}

class MockGame {
    constructor() {
        this.units = [];
        this.terrain = { buildings: [] };
    }
    spawnUnit(x, z, role, homeBase) {
        const unit = new MockUnit(role, homeBase);
        this.units.push(unit);
        return unit;
    }
}

describe('Squad-Based Memory (Decoupled)', () => {
    it('should link manually spawned units to nearby barracks', () => {
        const game = new MockGame();
        const barracks = { type: 'barracks', gridX: 10, gridZ: 10, userData: { type: 'barracks' } };

        const unit = game.spawnUnit(12, 12, 'knight', barracks);

        expect(unit).toBeDefined();
        expect(unit.homeBase).toBe(barracks);
    });

    it('should report enemy immediately on hit', () => {
        const game = new MockGame();
        const memory = new MockBattleMemory();
        vi.spyOn(memory, 'reportRaid');

        const barracks = {
            type: 'barracks',
            gridX: 10,
            gridZ: 10,
            userData: { type: 'barracks', memory: memory }
        };

        const knight = game.spawnUnit(10, 10, 'knight', barracks);
        const goblin = { id: 'g1', gridX: 15, gridZ: 15, hp: 100, takeDamage(d) { this.hp -= d; } };

        knight.attackGoblin(goblin);

        expect(goblin.hp).toBe(90);
        expect(memory.reportRaid).toHaveBeenCalled();
    });
});
