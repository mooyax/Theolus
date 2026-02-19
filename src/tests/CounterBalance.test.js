
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Goblin } from '../Goblin.js';
import { GoblinManager } from '../GoblinManager.js';

// Mocks
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: vi.fn(function () {
            return {
                setPixelRatio: vi.fn(),
                setSize: vi.fn(),
                render: vi.fn(),
                dispose: vi.fn(),
                shadowMap: { enabled: false, type: 0 },
                domElement: document.createElement('canvas'),
            };
        }),
        TextureLoader: vi.fn().mockImplementation(() => ({
            load: vi.fn(),
        })),
    };
});

// Mock UI Components
vi.mock('../Minimap.js', () => ({
    Minimap: class { update() { } serialize() { return {}; } deserialize() { } }
}));
vi.mock('../Compass.js', () => ({
    Compass: class { update() { } }
}));

describe('Counter Damage Nerf Verification', () => {
    let game;
    let mockTerrain;

    beforeEach(() => {
        document.body.innerHTML = '<canvas id="minimap"></canvas>';
        vi.useFakeTimers();

        mockTerrain = {
            width: 160, depth: 160,
            getHeight: () => 0, isWalkable: () => true, getRegion: () => ({ id: 'mockRegion' }),
            getBiomeColor: () => 0x00ff00, logicalWidth: 160, logicalDepth: 160,
            grid: [], update: () => { }, getTileHeight: () => 5,
            gridToWorld: (v) => v, worldToGrid: (v) => v, clippingPlanes: [],
            getVisualPosition: (x, z) => ({ x, y: 0, z }),
            addBuilding: vi.fn().mockImplementation((type, x, z) => ({ userData: { type, gridX: x, gridZ: z } })),
            registerEntity: vi.fn(), unregisterEntity: vi.fn(),
            updateMeshPosition: vi.fn(), updateLights: vi.fn(),
            removeBuilding: vi.fn(),
        };

        game = new Game(null, mockTerrain, true);
        game.scene = { add: vi.fn(), remove: vi.fn(), getObjectByName: vi.fn() };
        game.goblinManager = new GoblinManager(game.scene, mockTerrain, game.particleManager);
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
        if (game) { game.dispose(); game = null; }
    });

    const simulateKill = (killer, victim) => {
        killer.position.set(10, 0, 10);
        victim.position.set(10, 0, 10);
        const dmg = killer.damage || 10;
        victim.takeDamage(dmg, killer);
        return { killerHp: killer.hp };
    };

    it('Goblin Counter should do 50% damage', () => {
        const knight = new Unit(game.scene, mockTerrain, 10, 10, 'knight');
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'normal');
        knight.hp = 1000; knight.maxHp = 1000;
        goblin.hp = 1;
        simulateKill(knight, goblin);
        const damageTaken = knight.maxHp - knight.hp;
        expect(goblin.isDead).toBe(true);
        expect(damageTaken).toBeCloseTo(5.0, 1); // Goblin normal damage=10, counter=50% = 5.0
    });

    it('Unit Counter should do 50% damage', () => {
        const knight = new Unit(game.scene, mockTerrain, 10, 10, 'knight');
        const goblin = new Goblin(game.scene, mockTerrain, 10, 10, 'king');
        knight.hp = 10;
        goblin.hp = 2000; goblin.maxHp = 2000;
        simulateKill(goblin, knight);
        const damageTaken = goblin.maxHp - goblin.hp;
        const expectedDmg = knight.damage * 0.5;
        expect(knight.isDead).toBe(true);
        expect(damageTaken).toBe(expectedDmg);
    });

    it('Unit hitting Building should take retaliation dmg', () => {
        const knight = new Unit(game.scene, mockTerrain, 10, 10, 'knight');

        const cave = {
            id: 999,
            type: 'cave',
            hp: 200,
            population: 10,
            userData: { type: 'cave', hp: 200, population: 10, gridX: 10, gridZ: 10 },
            takeDamage: vi.fn(),
            isDestroyed: () => false,
        };
        cave.takeDamage.mockImplementation((amt) => {
            return 20;
        });

        // Inject into target
        knight.targetBuilding = cave;
        knight.attackCooldown = 0;

        // Call attackBuilding DIRECTLY to test logic
        knight.attackBuilding(cave);

        expect(cave.takeDamage).toHaveBeenCalled();
        // HP should be max - 20
        expect(knight.hp).toBe(knight.maxHp - 20);
    });
});
