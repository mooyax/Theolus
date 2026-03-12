
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Building } from '../Building.js';
import { Unit } from '../Unit.js';
import { MockGame, MockTerrain } from './TestHelper.js';

describe('Building Attack Investigation', () => {
    let mockGame, mockScene, mockTerrain;

    beforeEach(() => {
        mockGame = new MockGame();
        mockScene = mockGame.scene;
        mockTerrain = new MockTerrain(80, 80);
        mockGame.terrain = mockTerrain;
        window.game = mockGame;
        
        // Mock initAssets for both classes
        Goblin.initAssets = vi.fn().mockResolvedValue(undefined);
        Unit.initAssets = vi.fn().mockResolvedValue(undefined);
    });

    it('Goblin should be able to damage a large building from its edge', () => {
        const mansion = new Building(mockScene, mockTerrain, 'mansion', 10, 10);
        mansion.hp = 300;
        mansion.population = 0;

        const goblin = new Goblin(mockScene, mockTerrain, 10.5, 10.5, 'normal');
        goblin.id = 0;
        mockGame.entityManager.register(goblin);

        goblin.attack(mansion);
        expect(mansion.hp).toBeLessThan(300);
    });

    it('Nearby humans should detect goblins attacking buildings', () => {
        const mansion = new Building(mockScene, mockTerrain, 'mansion', 10, 10);
        mansion.position.set(10, 0, 10); // Sync visual position for dist checks
        mansion.population = 1; 
        mansion.userData.defense = 5.0;

        const goblin = new Goblin(mockScene, mockTerrain, 11, 11, 'normal');
        goblin.hp = 100;
        goblin.id = 1;
        mockGame.entityManager.register(goblin);

        const knight = new Unit(mockScene, mockTerrain, 10, 10, 'knight');
        knight.id = 0;
        mockGame.entityManager.register(knight);

        // Simulate attack
        goblin.attack(mansion);
        
        // Retaliation should occur
        expect(goblin.hp).toBeLessThan(100);

        // Knight should detect goblin
        // Knight scans periodically based on ID. 
        for (let i = 0; i < 20; i++) {
            mockGame.frameCount = i;
            knight.updateLogic(i * 100, 0.1, false, mockGame.units, [], mockGame.goblins);
            if (knight.targetGoblin) break;
        }

        expect(knight.targetGoblin).toBe(goblin);
    });
});
