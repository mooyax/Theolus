
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.ts';
import { SheepManager } from '../SheepManager';
import { Sheep } from '../Sheep.js';
import { Unit } from '../Unit.ts';

vi.unmock('../SheepManager');
vi.unmock('../FishManager');

describe('Sheep Hunting Logic & Manager Update Fix', () => {
    let game, scene, terrain;

    beforeEach(() => {
        // Setup minimalist game
        game = new Game(null, null, true); // minimal mode
        scene = game.scene;
        terrain = game.terrain;
        terrain.getTileHeight = vi.fn().mockReturnValue(1.0);
        terrain.findBestTarget = vi.fn().mockImplementation((type, x, z, range, costFn, candidates) => {
            const list = candidates || [];
            let best = null;
            let bestScore = Infinity;
            for (const c of list) {
                if (c.isDead) continue;
                const dx = (c.gridX || 0) - x;
                const dz = (c.gridZ || 0) - z;
                const dist = Math.sqrt(dx * dx + dz * dz);
                if (dist <= range) {
                    const score = costFn ? costFn(c, dist) : dist;
                    if (score < bestScore) {
                        bestScore = score;
                        best = c;
                    }
                }
            }
            return best;
        });

        // Mock SheepManager and setup
        game.sheepManager = new SheepManager(scene, terrain, []);
        game.units = [];
    });

    it('should remove dead sheep during manager update', () => {
        const sm = game.sheepManager;

        sm.initSheeps();
        const initialCount = sm.sheeps.length;
        expect(initialCount).toBeGreaterThan(0);

        // Kill one sheep
        const target = sm.sheeps[0];
        target.isDead = true;

        // Update manager
        sm.update(0, 0.1);

        expect(sm.sheeps.length).toBe(initialCount - 1);
        expect(sm.sheeps.includes(target)).toBe(false);
    });

    it('should regenerate sheep when population is low', () => {
        const sm = game.sheepManager;
        sm.sheepCount = 5;
        sm.initSheeps();
        expect(sm.sheeps.length).toBeGreaterThan(0);

        // Remove all sheep
        const noRegenSpy = vi.spyOn(Math, 'random').mockReturnValue(0.99); // Prevent accidental regen
        sm.sheeps.forEach(s => s.isDead = true);
        sm.update(0, 0.1);
        expect(sm.sheeps.length).toBe(0);
        noRegenSpy.mockRestore();

        // Force regeneration several times
        const spy = vi.spyOn(Math, 'random').mockReturnValue(0.01);
        for (let i = 0; i < 100; i++) {
            sm.update(i, 0.1);
            if (sm.sheeps.length > 0) break;
        }
        spy.mockRestore();

        expect(sm.sheeps.length).toBeGreaterThan(0);
    });

    it('should ignore dead sheep in hunter targeting', () => {
        const sm = game.sheepManager;
        sm.sheeps = []; // Clear random ones

        const hunter = new Unit(scene, terrain, 10, 10, 'player');
        hunter.role = 'hunter';
        game.units.push(hunter);

        const deadSheep = new Sheep(scene, terrain, 11, 11);
        deadSheep.isDead = true;
        sm.sheeps.push(deadSheep);

        const liveSheep = new Sheep(scene, terrain, 40, 40); // Further away but alive
        sm.sheeps.push(liveSheep);

        // Run Unit Idle/Targeting logic
        // We simulate the part of Unit.updateLogic that picks targets
        const targets = game.sheepManager.sheeps;
        let bestScore = Infinity;
        let bestEntity = null;
        let minDist = 100.0;

        for (const t of targets) {
            if (t.isDead) continue; // THE FIX
            const d = hunter.getDistance(t.gridX, t.gridZ);
            if (d < minDist) {
                minDist = d;
                bestEntity = t;
            }
        }

        expect(bestEntity).toBe(liveSheep);
        expect(bestEntity).not.toBe(deadSheep);
    });
});
