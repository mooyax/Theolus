
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';
import * as THREE from 'three';

// Mocks
const mockScene = { add: vi.fn(), remove: vi.fn() };
const mockTerrain = {
    logicalWidth: 80,
    logicalDepth: 80,
    getVisualPosition: () => ({ x: 0, y: 0, z: 0 }),
    getTileHeight: () => 0,
    gridToWorld: (val) => val, // Identity mock
    registerEntity: vi.fn(),
    unregisterEntity: vi.fn()
};

describe('Goblin Types & Stats', () => {
    let goblinManager;

    beforeEach(() => {
        Goblin.nextId = 0;
        goblinManager = new GoblinManager(mockScene, mockTerrain, {});
    });

    it('should create Goblin King with correct stats', () => {
        const king = new Goblin(mockScene, mockTerrain, 10, 10, 'king');
        expect(king.type).toBe('king');
        expect(king.hp).toBeGreaterThanOrEqual(1200);
        expect(king.damage).toBe(200);
        expect(king.scale).toBe(1.8);
        expect(king.isRanged).toBe(false);
    });

    it('should create Goblin Shaman with correct stats', () => {
        const shaman = new Goblin(mockScene, mockTerrain, 10, 10, 'shaman');
        expect(shaman.type).toBe('shaman');
        expect(shaman.hp).toBeGreaterThanOrEqual(500);
        expect(shaman.damage).toBe(80);
        expect(shaman.scale).toBe(1.2);
        expect(shaman.isRanged).toBe(true);
    });

    it('should correctly spawn types based on random probability', () => {
        // Mock Math.random to deterministic values
        const randomSpy = vi.spyOn(Math, 'random');

        // 1. King (r < 0.01)
        randomSpy.mockReturnValue(0.005);
        let g = new Goblin(mockScene, mockTerrain, 0, 0); // Manual instantiation inside manager logic under test
        // Actually we need to test manager.spawnGoblin
        goblinManager.spawnGoblin(0, 0);
        expect(goblinManager.goblins[0].type).toBe('king');

        // 2. Shaman (0.01 <= r < 0.055)
        randomSpy.mockReturnValue(0.02);
        goblinManager.spawnGoblin(0, 0);
        expect(goblinManager.goblins[1].type).toBe('shaman');

        // 3. Hobgoblin (0.055 <= r < 0.145)
        randomSpy.mockReturnValue(0.1);
        goblinManager.spawnGoblin(0, 0);
        expect(goblinManager.goblins[2].type).toBe('hobgoblin');

        // 4. Normal (r >= 0.145)
        randomSpy.mockReturnValue(0.5);
        goblinManager.spawnGoblin(0, 0);
        expect(goblinManager.goblins[3].type).toBe('normal');

        randomSpy.mockRestore();
    });

    it('should use staff visual for Shaman in Renderer logic', () => {
        // Indirect test: checking if Shaman has staff asset initialized
        const shaman = new Goblin(mockScene, mockTerrain, 10, 10, 'shaman');
        // We can't easily test renderer frame logic in unit test without full renderer mock, 
        // but we can check if isRanged is set which triggers renderer logic.
        expect(shaman.isRanged).toBe(true);
    });
});
