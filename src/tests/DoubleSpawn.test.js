import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Game } from '../Game.js';
import { Levels } from '../config/GameConfig.js';

vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        Scene: class { add() { } remove() { } traverse() { } },
        WebGLRenderer: class {
            render() { }
            setSize() { }
            setPixelRatio() { }
            dispose() { }
            domElement = { parentNode: { removeChild: vi.fn() } }
        },
        AmbientLight: class { },
        DirectionalLight: class { position = { set: () => { } } },
        Clock: class { getDelta() { return 0.1; } },
        PerspectiveCamera: class { position = { set: () => { } }; lookAt() { } },
        OrthographicCamera: class { position = { set: () => { } }; lookAt() { } updateMatrixWorld() { } },
        TextureLoader: class { load() { return {}; } },
        Plane: class { },
        Vector3: class { set() { } },
        Matrix4: class { multiplyMatrices() { } },
        Frustum: class { setFromProjectionMatrix() { } },
    };
});

vi.mock('../GoblinManager.js', () => ({
    GoblinManager: class {
        reset() { }
        generateCaves() { }
        update() { }
        serialize() { return {}; }
        goblins = [];
    }
}));
vi.mock('../FishManager.js', () => ({ FishManager: class { init() { } update() { } dispose() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { initSheeps() { } update() { } dispose() { } } }));

describe('Double Spawn Issue (Concurrency)', () => {
    let game;
    beforeEach(() => {
        vi.clearAllMocks();
        Levels[0] = {
            levelId: 1, title: "Test", mapWidth: 20, mapDepth: 20,
            initialState: { unitCount: 1, hasEnemyBase: false, hasEnemyGuard: false, goblinCaves: 0 },
            generation: { rockHeight: 10, moistureBase: 0.5, treeDensity: 0 }
        };
    });

    it('should prevent double spawn on concurrent startNewGame calls', async () => {
        game = new Game(null, null, true);

        // Call startNewGame twice immediately (Simulate Double Click)
        const p1 = game.startNewGame();
        const p2 = game.startNewGame();

        await Promise.all([p1, p2]);

        const workers = game.units.filter(u => u.role === 'worker');
        console.log(`[TEST] Workers: ${workers.length}`);
        expect(workers.length).toBe(1);
    });
});

