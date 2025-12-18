
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game';
import { Terrain } from '../Terrain';

// Mock Dependencies
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        // Mock Mesh to avoid canvas issues
        Mesh: class {
            constructor() {
                this.position = { set: vi.fn(), x: 0, y: 0, z: 0 };
                this.material = { clone: () => ({ uniforms: { uColor: { value: { setHex: vi.fn() } } }, dispose: vi.fn() }), dispose: vi.fn() };
                this.geometry = { dispose: vi.fn() };
                this.renderOrder = 0;
            }
        },
        Scene: class {
            add() { }
            remove() { }
        },
        // Minimal stubs for other used classes
        CylinderGeometry: class { dispose() { } },
        PlaneGeometry: class { attributes = { position: { count: 10, getX: () => 0, getY: () => 0 } } },
        BufferAttribute: class { },
        TextureLoader: class { load() { return {}; } },
        OrthographicCamera: class {
            constructor() { this.position = { set: vi.fn(), x: 0, y: 0, z: 0 }; }
            lookAt() { }
            updateProjectionMatrix() { }
        },
        WebGLRenderer: class {
            setPixelRatio() { }
            setSize() { }
            render() { }
            constructor() { this.domElement = {}; }
        },
        AmbientLight: class { },
        DirectionalLight: class { position = { set: () => { } } },
        Vector3: class { constructor(x, y, z) { this.x = x; this.y = y; this.z = z; } },
        Vector2: class { },
        Plane: class { },
        Color: class { },
    };
});

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls', () => {
    return {
        OrbitControls: class {
            constructor() { }
        }
    };
});

describe('Game Request Lifecycle', () => {
    let game;
    let scene;
    let terrain;

    beforeEach(() => {
        // Mock Browser Globals
        global.window = {
            innerWidth: 1024,
            innerHeight: 768,
            devicePixelRatio: 1,
            addEventListener: vi.fn(),
        };
        global.document = {
            body: { appendChild: vi.fn() },
            getElementById: vi.fn(() => ({ addEventListener: vi.fn(), classList: { toggle: vi.fn(), remove: vi.fn() } })), // Mock UI buttons
        };
        global.requestAnimationFrame = vi.fn();

        // Mock OrbitControls GLOBAL because Game imports it? 
        // No, Game imports it. We need to mock the import if it's external, or mock the global if it relies on THREE.OrbitControls.
        // Assuming OrbitControls is imported. I might need to mock it in `vi.mock`.

        // Spy on Game prototype methods to prevent Constructor side-effects
        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });
        // We can't easily spy on constructor-called internal setup like "this.renderer = ..." unless we mock the class or those classes.
        // We already mocked WebGLRenderer.

        // Create Game instance
        game = new Game();

        // Disable internal systems
        game.renderer = { domElement: {}, render: vi.fn() };
        game.controls = { update: vi.fn() };

        // Overwrite Terrain with Mock
        game.terrain = {
            update: vi.fn(),
            getTileHeight: vi.fn(() => 5),
            logicalWidth: 40,
            logicalDepth: 40,
            grid: Array(40).fill(null).map(() => Array(40).fill({ height: 5 })),
            setSeason: vi.fn(),
        };

        // Overwrite methods that cause side effects or require full engine
        game.initMarkerMaterial = vi.fn();
        game.updateRequestMarkers = vi.fn(); // Visual only

        // Mock Mana
        game.resources = { mana: 100 };
        game.consumeMana = vi.fn((amount) => { game.resources.mana -= amount; });

        // Setup Marker Material Mock (used in addRequest)
        game.markerMaterial = { clone: () => ({ uniforms: { uColor: { value: { setHex: vi.fn() } } } }) };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should tag new requests with createdAt timestamp', () => {
        const now = 100000;
        vi.spyOn(Date, 'now').mockReturnValue(now);

        const req = game.addRequest('raise', 10, 10);

        expect(req.createdAt).toBe(now);
        expect(req.status).toBe('pending');
    });

    it('should cleanup expired pending requests', () => {
        const start = 100000;
        vi.spyOn(Date, 'now').mockReturnValue(start);

        // Add Request 1 (Old)
        const reqOld = game.addRequest('raise', 10, 10);

        // Add Request 2 (New)
        vi.spyOn(Date, 'now').mockReturnValue(start + 20000); // +20s
        const reqNew = game.addRequest('raise', 20, 20);

        expect(game.requestQueue.length).toBe(2);

        // Advance Time past TIMEOUT (45s) relative to start
        // Current Time = start + 50s (Old is age 50s, New is age 30s)
        const checkTime = start + 50000;

        game.checkExpiredRequests(checkTime);

        expect(game.requestQueue.length).toBe(1);
        expect(game.requestQueue[0]).toBe(reqNew); // Old should be gone
    });

    it('should NOT cleanup assigned requests even if old', () => {
        const start = 100000;
        vi.spyOn(Date, 'now').mockReturnValue(start);

        const req = game.addRequest('raise', 10, 10);
        req.status = 'assigned'; // Assign it

        const checkTime = start + 60000; // +60s
        game.checkExpiredRequests(checkTime);

        expect(game.requestQueue.length).toBe(1); // Should persist
    });

    it('should cancel request via Proximity Search', () => {
        // Request at 10, 10
        game.addRequest('raise', 10, 10);

        // Request at 20, 20 (Far away)
        game.addRequest('raise', 20, 20);

        expect(game.requestQueue.length).toBe(2);

        // Cancel at 11, 11 (Distance sqrt(1+1) = 1.41 < 3.0) -> Should hit 10,10
        const result = game.tryCancelRequest(11, 11);

        expect(result).toBe(true);
        expect(game.requestQueue.length).toBe(1);
        expect(game.requestQueue[0].x).toBe(20); // 20,20 remains
    });

    it('should prioritize nearest request when cancelling', () => {
        // Request A at 10, 10
        const r1 = game.addRequest('raise', 10, 10);
        // Request B at 12, 12
        const r2 = game.addRequest('raise', 12, 12);

        // Cancel at 9, 9. 
        // Dist to A (10,10) = sqrt(1+1) = 1.41
        // Dist to B (12,12) = sqrt(3+3) = 4.24 (Outside radius 3.0)

        // Actually, let's test overlapping radius logic if we want strict nearest
        // Cancel at 11, 11
        // Dist to A (10,10) = 1.41
        // Dist to B (12,12) = 1.41
        // Tie? FIFO or undefined. 

        // Let's try 10, 11
        // Dist to A: 1
        // Dist to B: sqrt(2^2 + 1^2) = 2.23
        // Should hit A.

        const res = game.tryCancelRequest(10, 11);
        expect(res).toBe(true);
        expect(game.requestQueue.find(r => r === r1)).toBeUndefined(); // A gone
        expect(game.requestQueue.find(r => r === r2)).toBeDefined();   // B stays
    });
});
