
import { describe, it, expect, vi } from 'vitest';
import { Unit } from '../Unit.js';

vi.mock('three', () => ({
    WebGLRenderer: class { },
    Vector3: class { constructor() { } set() { } },
    Sphere: class { },
    Quaternion: class { },
    Group: class { add() { } remove() { } },
}));

vi.mock('../Terrain.js', () => ({ Terrain: class { registerEntity() { } } }));
vi.mock('../GoblinManager.js', () => ({ GoblinManager: class { } }));
vi.mock('../InputManager.js', () => ({ InputManager: class { } }));
vi.mock('../SoundManager.js', () => ({ SoundManager: class { } }));
vi.mock('../BattleMemory.js', () => ({ BattleMemory: class { } }));

describe('Minimal Unit Sanity', () => {
    it('can instantiate Unit', () => {
        const terrain = new (require('../Terrain.js').Terrain)();
        const u = new Unit({}, terrain, 0, 0, 'knight');
        expect(u).toBeDefined();
    });
});
