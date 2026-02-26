import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { Building } from '../Building.js';
import * as THREE from 'three';

describe('Destruction under Growth Simulation', () => {
    let mockScene, mockTerrain;

    beforeEach(() => {
        mockScene = new THREE.Scene();
        mockTerrain = {
            grid: Array(80).fill(0).map(() => Array(80).fill(0).map(() => ({ hasBuilding: false }))),
            getTileHeight: () => 5,
            gridToWorld: (v) => v,
            getVisualPosition: () => ({ x: 0, y: 5, z: 0 }),
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            removeBuilding: vi.fn((b) => { if (b) b.isDead = true; }),
            getBuildingSize: () => 1
        };
        window.game = {
            simTotalTimeSec: 0,
            goblinManager: { notifyClanActivity: vi.fn(), increasePlunder: vi.fn() }
        };
    });

    it('A single Goblin should eventually destroy a House despite growth (assuming it survives retaliation)', () => {
        const house = new Building(mockScene, mockTerrain, 'house', 10, 10);
        house.population = 5;
        house.hp = 100;

        const goblin = new Goblin(mockScene, mockTerrain, 10.5, 10.5, 'normal');
        goblin.damage = 10;
        goblin.hp = 50;

        let time = 0;
        let survived = true;

        for (let i = 0; i < 100; i++) {
            time += 1.0;
            window.game.simTotalTimeSec = time;
            house.update(time, 1.0);

            goblin.attackCooldown = 0;
            goblin.attack(house);

            if (goblin.isDead) break;
            if (house.isDead || house.hp <= 0) {
                survived = false;
                break;
            }
        }
        expect(survived).toBe(false);
        expect(house.isDead).toBe(true);
    });

    it('A single Goblin should DIE when attacking a highly populated Tower', () => {
        const tower = new Building(mockScene, mockTerrain, 'tower', 30, 30);
        tower.population = 20;
        tower.hp = 500;

        const goblin = new Goblin(mockScene, mockTerrain, 30.5, 30.5, 'normal');
        goblin.hp = 50;

        goblin.attack(tower);

        expect(goblin.isDead).toBe(true);
        expect(tower.hp).toBe(500);
    });

    it('Three Goblins should quickly overwhelm a Mansion with growth', () => {
        const mansion = new Building(mockScene, mockTerrain, 'mansion', 20, 20);
        mansion.population = 10;
        mansion.hp = 300;

        const goblins = [
            new Goblin(mockScene, mockTerrain, 20.5, 20.5, 'normal'),
            new Goblin(mockScene, mockTerrain, 20.5, 19.5, 'normal'),
            new Goblin(mockScene, mockTerrain, 19.5, 20.5, 'normal')
        ];

        goblins.forEach(g => {
            g.damage = 10;
            g.hp = 1000;
        });

        let time = 0;
        let destroyedAt = -1;

        for (let i = 0; i < 60; i++) {
            time += 1.0;
            window.game.simTotalTimeSec = time;
            mansion.update(time, 1.0);

            goblins.forEach(g => {
                g.attackCooldown = 0;
                g.attack(mansion);
            });

            if (mansion.isDead || mansion.hp <= 0) {
                destroyedAt = time;
                break;
            }
        }
        expect(destroyedAt).toBeGreaterThan(0);
        expect(destroyedAt).toBeLessThan(40);
    });
});
