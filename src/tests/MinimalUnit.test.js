
import { describe, it, expect, vi } from 'vitest';
import { Unit } from '../Unit.js';

vi.mock('three', () => {
    class MockGeometry {
        constructor() { this.translate = vi.fn().mockReturnThis(); this.rotateX = vi.fn().mockReturnThis(); }
    }
    return {
        WebGLRenderer: class { },
        Vector3: class { constructor() { } set() { return this; } copy() { return this; } },
        Sphere: class { },
        Quaternion: class { },
        Group: class { add() { } remove() { } },
        BoxGeometry: class extends MockGeometry { },
        SphereGeometry: class extends MockGeometry { },
        CylinderGeometry: class extends MockGeometry { },
        PlaneGeometry: class extends MockGeometry { },
        ConeGeometry: class extends MockGeometry { },
        CapsuleGeometry: class extends MockGeometry { },
        Mesh: class { constructor() { this.position = { set: () => { } }; this.rotation = { set: () => { } }; this.scale = { set: () => { } }; } },
        MeshStandardMaterial: class { constructor() { this.setValues = vi.fn(); } },
        MeshBasicMaterial: class { },
        MeshLambertMaterial: class { },
        CanvasTexture: class { },
        Color: class { setHex() { } set() { } }
    };
});

vi.mock('../Terrain.js', () => ({ Terrain: class { registerEntity() { } } }));
vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { } }));
vi.mock('../InputManager.js', () => ({ InputManager: class { } }));
vi.mock('../SoundManager.js', () => ({ SoundManager: class { } }));
vi.mock('../Game.js', async () => {
    const actual = await vi.importActual('../Game.js');
    return {
        ...actual,
        BattleMemory: class { }
    };
});

describe('Minimal Unit Sanity', () => {
    it('can instantiate Unit', () => {
        const terrain = {
            registerEntity: vi.fn(),
            getTileHeight: () => 0,
            logicalWidth: 100,
            logicalDepth: 100,
            grid: [],
            isAdjacentToRegion: () => false
        };
        const scene = { add: vi.fn(), remove: vi.fn() };
        const u = new Unit(scene, terrain, 0, 0, 'knight');
        expect(u).toBeDefined();
    });
});
