
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { Game } from '../Game';

// Mock Dependencies
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    class Color {
        constructor() { }
        setHex(h) { return this; }
        set(c) { return this; }
        lerp(c, alpha) { return this; }
        clone() { return new Color(); }
    }
    return {
        ...actual,
        Color,
        WebGLRenderer: class {
            constructor() { this.domElement = {}; }
            setPixelRatio() { }
            setSize() { }
            render() { }
            dispose() { }
        },
        Scene: class {
            constructor() { this.children = []; this.position = { x: 0, y: 0, z: 0, isVector3: true }; }
            add() { }
            remove() { }
            getObjectByName() { return { add: vi.fn(), remove: vi.fn(), children: [] }; }
        },
        Group: class {
            constructor() { this.children = []; }
            add() { }
        },
        Mesh: class {
            constructor() {
                this.material = { clone: () => ({ uniforms: { uColor: { value: new Color() } }, dispose: vi.fn() }), dispose: vi.fn() };
                this.geometry = { dispose: vi.fn() };
                this.position = { set: vi.fn(), copy: vi.fn(), x: 0, y: 0, z: 0 };
            }
        },
        PlaneGeometry: class {
            constructor() { this.attributes = {}; }
            setAttribute() { }
            translate() { }
            rotateX() { }
            dispose() { }
        },
        BufferAttribute: class {
            constructor() { }
        }
    };
});

// Mock OrbitControls
vi.mock('three/examples/jsm/controls/OrbitControls', () => {
    return {
        OrbitControls: class {
            constructor() {
                this.domElement = {};
                this.update = vi.fn();
                this.enableDamping = true;
                this.addEventListener = vi.fn();
            }
        }
    };
});

// Mock Managers
vi.mock('../InputManager.js', () => ({ InputManager: class { constructor() { } } }));
vi.mock('../rendering/UnitRenderer.js', () => ({ UnitRenderer: class { constructor() { this.init = vi.fn(); } } }));
vi.mock('../rendering/BuildingRenderer.js', () => ({ BuildingRenderer: class { constructor() { this.init = vi.fn(); } } }));
vi.mock('../rendering/CloudManager.js', () => ({ CloudManager: class { constructor() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { constructor() { } } }));
vi.mock('../ai/BirdManager.js', () => ({ BirdManager: class { constructor() { } } })); // Check path
vi.mock('../ai/SheepManager.js', () => ({ SheepManager: class { constructor() { } } }));
vi.mock('../ai/GoblinManager.js', () => ({ GoblinManager: class { constructor() { } } }));
vi.mock('../ai/FishManager.js', () => ({ FishManager: class { constructor() { } } }));
vi.mock('../ui/Minimap.js', () => ({ Minimap: class { constructor() { } } }));
vi.mock('../ui/Compass.js', () => ({ Compass: class { constructor() { } } }));
vi.mock('../PerformanceMonitor.js', () => ({ PerformanceMonitor: class { constructor() { } } }));


describe('Game Request Lifecycle', () => {
    let game;

    beforeEach(() => {
        vi.stubGlobal('document', {
            body: { appendChild: vi.fn() },
            getElementById: vi.fn(() => ({
                appendChild: vi.fn(),
                getContext: vi.fn(() => ({
                    fillRect: vi.fn(),
                    drawImage: vi.fn(),
                    clearRect: vi.fn(),
                    measureText: vi.fn(() => ({ width: 0 })),
                    fillText: vi.fn(),
                    beginPath: vi.fn(),
                    moveTo: vi.fn(),
                    lineTo: vi.fn(),
                    stroke: vi.fn(),
                    fill: vi.fn(),
                    arc: vi.fn(),
                    save: vi.fn(),
                    restore: vi.fn(),
                    translate: vi.fn(),
                    rotate: vi.fn(),
                    scale: vi.fn()
                })),
                addEventListener: vi.fn(),
                classList: { toggle: vi.fn(), remove: vi.fn(), add: vi.fn() }
            })),
            createElement: vi.fn(() => ({
                appendChild: vi.fn(),
                getContext: vi.fn(() => ({
                    fillRect: vi.fn(),
                    createImageData: () => ({ data: [] }),
                    putImageData: vi.fn(),
                    drawImage: vi.fn()
                })),
                addEventListener: vi.fn(),
                classList: { toggle: vi.fn(), remove: vi.fn(), add: vi.fn() },
                style: {}
            })),
            createElementNS: vi.fn(() => ({
                width: 0, height: 0,
                getContext: () => ({}),
                addEventListener: vi.fn(),
                style: { display: '' }
            }))
        });
        global.requestAnimationFrame = vi.fn();

        vi.spyOn(Game.prototype, 'setupLights').mockImplementation(() => { });
        vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });

        game = new Game(undefined, undefined, true);
        game.renderer = { domElement: {}, render: vi.fn() };
        game.controls = { update: vi.fn() };
        game.terrain = {
            update: vi.fn(),
            getTileHeight: vi.fn(() => 5),
            logicalWidth: 40,
            logicalDepth: 40,
            grid: Array(40).fill(null).map(() => Array(40).fill({ height: 5 })),
            setSeason: vi.fn(),
        };
        game.initMarkerMaterial = vi.fn();
        game.updateRequestMarkers = vi.fn();
        game.resources = { mana: 100 };
        game.consumeMana = vi.fn((amount) => { game.resources.mana -= amount; });
        game.markerMaterial = { clone: () => ({ uniforms: { uColor: { value: { setHex: vi.fn() } } } }) };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should tag new requests with createdAt timestamp', () => {
        const now = 1000;
        game.simTotalTimeSec = now;
        const req = game.addRequest('raise', 10, 10);
        expect(req.createdAt).toBe(now);
        expect(req.status).toBe('pending');
    });

    it('should cleanup expired pending requests', () => {
        const start = 1000;
        game.simTotalTimeSec = start;
        const reqOld = game.addRequest('raise', 10, 10);
        game.simTotalTimeSec = start + 290;
        const reqNew = game.addRequest('raise', 20, 20);
        expect(game.requestQueue.length).toBe(2);

        const checkTime = start + 310;
        game.simTotalTimeSec = checkTime;
        game.checkExpiredRequests(checkTime);

        expect(game.requestQueue.length).toBe(1);
        expect(game.requestQueue[0]).toBe(reqNew);
    });

    it('should NOT cleanup assigned requests even if old', () => {
        const start = 100000;
        vi.spyOn(Date, 'now').mockReturnValue(start);
        const req = game.addRequest('raise', 10, 10);
        req.status = 'assigned';
        const checkTime = start + 60000;
        game.checkExpiredRequests(checkTime);
        expect(game.requestQueue.length).toBe(1);
    });

    it('should cancel request via Proximity Search', () => {
        game.addRequest('raise', 10, 10);
        game.addRequest('raise', 20, 20);
        expect(game.requestQueue.length).toBe(2);
        const result = game.tryCancelRequest(11, 11);
        expect(result).toBe(true);
        expect(game.requestQueue.length).toBe(1);
        expect(game.requestQueue[0].x).toBe(20);
    });

    it('should prioritize nearest request when cancelling', () => {
        const r1 = game.addRequest('raise', 10, 10);
        const r2 = game.addRequest('raise', 12, 12);
        const res = game.tryCancelRequest(10, 11);
        expect(res).toBe(true);
        expect(game.requestQueue.find(r => r === r1)).toBeUndefined();
        expect(game.requestQueue.find(r => r === r2)).toBeDefined();
    });
});
