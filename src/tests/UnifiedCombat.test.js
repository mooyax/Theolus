
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { Building } from '../Building.js';
import { Terrain } from '../Terrain.js';
import * as THREE from 'three';

describe('Unified Combat and Detection logic', () => {
    let terrain, scene, mockGame;

    beforeEach(async () => {
        scene = new THREE.Scene();
        terrain = new Terrain(scene);

        // Mocking necessary terrain methods for spatial search and grid
        terrain.findBestTarget = vi.fn();
        terrain.grid = Array.from({ length: 100 }, () =>
            Array.from({ length: 100 }, () => ({ regionId: 1, height: 10 }))
        );

        mockGame = {
            scene: scene,
            terrain: terrain,
            units: [],
            goblins: [],
            goblinManager: { goblins: [], increasePlunder: vi.fn() }
        };
        window.game = mockGame;

        Unit.assets = { initialized: true };
        Goblin.assets = { initialized: true };
        const { Actor } = await import('../Actor.js');
        Actor.ignoreDetectionProbability = true;
        window.isTest = true;
    });

    describe('Building Damage Overflow (Population Shield Penetration)', () => {
        it('should damage both population and HP when damage exceeds population', () => {
            const building = new Building(scene, terrain, 'house', 10, 10);
            building.population = 5;
            building.hp = 100;

            // User requirement: First reduces population, then remaining to HP.
            // If damage is 10: 
            // Population reduction = min(5, 10) = 5 -> New Pop = 0
            // HP reduction = 10 - 5 = 5 -> New HP = 95
            building.takeDamage(10);

            expect(building.population).toBe(0);
            expect(building.hp).toBe(95);
        });

        it('should only damage population when damage is less than population', () => {
            const building = new Building(scene, terrain, 'house', 10, 10);
            building.population = 10;
            building.hp = 100;

            building.takeDamage(4);

            expect(building.population).toBe(6);
            expect(building.hp).toBe(100);
        });

        it('should calculate retaliation based on population BEFORE damage', () => {
            const building = new Building(scene, terrain, 'house', 10, 10);
            building.population = 10;
            building.userData.defense = 2.0;

            const attacker = { hp: 100, takeDamage: vi.fn() };

            building.takeDamage(5, attacker);

            // Retaliation = 10 * 2.0 = 20
            expect(attacker.takeDamage).toHaveBeenCalledWith(20, building, true);
            expect(building.population).toBe(5);
        });
    });

    describe('Unified Actor Detection', () => {
        it('should detect enemies in Wander state using unified logic', () => {
            const unit = new Unit(scene, terrain, 10, 10, 'knight');
            unit.ignoreDetectionProbability = true;
            const goblin = new Goblin(scene, terrain, 12, 12, 'normal');

            // Mock spatial search returning the goblin
            terrain.findBestTarget.mockReturnValue(goblin);

            // Simulate Wander update
            // We expect the actor to perform detection check regardless of current state
            unit.updateLogic(100, 1, false, [], [], [goblin]);

            expect(unit.targetGoblin).toBe(goblin);
        });

        it('should follow common scan interval and not "pass by"', () => {
            const unit = new Unit(scene, terrain, 10, 10, 'worker');
            const goblin = new Goblin(scene, terrain, 11, 11, 'normal');

            terrain.findBestTarget.mockReturnValue(goblin);

            // Run multiple updates to ensure detection happens within a reasonable frame window
            let detected = false;
            for (let i = 0; i < 20; i++) {
                window.game.frameCount = i;
                unit.updateLogic(100 + i, 1, false, [], [], [goblin]);
                if (unit.targetGoblin === goblin) {
                    detected = true;
                    break;
                }
            }
            expect(detected).toBe(true);
        });
    });
});
