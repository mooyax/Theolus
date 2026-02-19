
import { describe, it, expect } from 'vitest';

// We want to test the LOGIC of evaluateWinLoss, avoiding the massive dependency tree of Game.ts
// So we copy the logic or create a "TestableGame" class that mimics the structure.

class TestableGame {
    constructor() {
        this.units = [];
        this.terrain = { buildings: [] };
        this.goblinManager = { goblins: [], caves: [] };
    }

    // Copied from Game.ts (The logic we want to verify)
    evaluateWinLoss() {
        // 1. Check Defeat: Player Wiped Out
        // Player Units (Must be alive)
        const playerUnits = this.units.filter(u => u.faction === 'player' && !u.isDead);
        // Player Buildings (Strictly 'player' faction and NOT destroyed, AND NOT FARM)
        const playerBuildings = this.terrain.buildings.filter(b => {
            const isAlive = (b.hp !== undefined) ? (b.hp > 0) : (b.userData.hp > 0);
            // User Requirement: Lose if only farms remain.
            const isNotFarm = (b.type !== 'farm' && (!b.userData || b.userData.type !== 'farm'));
            return (b.userData && b.userData.faction === 'player') && isAlive && isNotFarm;
        });

        // If no units and no buildings, IT IS OVER.
        if (playerUnits.length === 0 && playerBuildings.length === 0) {
            return 'loss';
        }
        return null; // Logic continues, but for this test we only prioritize Loss condition
    }
}

describe('Defeat Condition Logic (Isolated)', () => {
    let game;

    beforeEach(() => {
        game = new TestableGame();
    });

    it('Should NOT lose if Player Unit exists', () => {
        game.units = [{ faction: 'player', isDead: false, id: 1 }];
        game.terrain.buildings = [];
        expect(game.evaluateWinLoss()).toBeNull();
    });

    it('Should NOT lose if Player House exists (No Units)', () => {
        game.units = [];
        game.terrain.buildings = [{
            type: 'house',
            userData: { faction: 'player', hp: 100, type: 'house' },
            hp: 100
        }];
        expect(game.evaluateWinLoss()).toBeNull();
    });

    it('Should LOSE if No Units and No Buildings', () => {
        game.units = [];
        game.terrain.buildings = [];
        expect(game.evaluateWinLoss()).toBe('loss');
    });

    it('Should LOSE if No Units and Only Enemy Buildings', () => {
        game.units = [];
        game.terrain.buildings = [{
            type: 'house',
            userData: { faction: 'enemy', hp: 100 },
            hp: 100
        }];
        expect(game.evaluateWinLoss()).toBe('loss');
    });

    it('Should LOSE if No Units and Only Farms remain (The User Request)', () => {
        game.units = [];
        // Farm is present, but should be ignored by the loss check
        game.terrain.buildings = [{
            type: 'farm',
            userData: { faction: 'player', hp: 100, type: 'farm' },
            hp: 100
        }];
        expect(game.evaluateWinLoss()).toBe('loss');
    });

    it('Should NOT lose if No Units but Barracks remain', () => {
        game.units = [];
        game.terrain.buildings = [{
            type: 'barracks',
            userData: { faction: 'player', hp: 100, type: 'barracks' },
            hp: 100
        }];
        expect(game.evaluateWinLoss()).toBeNull();
    });
});
