
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game';
import { Terrain } from '../Terrain';

// Mock Dependencies
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    class BufferAttribute {
        constructor(array, itemSize) { this.array = array; this.itemSize = itemSize; this.count = array.length / itemSize; }
        setX(i, x) { if (this.array) this.array[i * this.itemSize] = x; return this; }
        setY(i, y) { if (this.array) this.array[i * this.itemSize + 1] = y; return this; }
        setZ(i, z) { if (this.array) this.array[i * this.itemSize + 2] = z; return this; }
        setXYZ(i, x, y, z) { this.setX(i, x); this.setY(i, y); this.setZ(i, z); return this; }
        getX(i) { return this.array ? this.array[i * this.itemSize] : 0; }
        getY(i) { return this.array ? this.array[i * this.itemSize + 1] : 0; }
        getZ(i) { return this.array ? this.array[i * this.itemSize + 2] : 0; }
    }
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x; this.y = y; this.z = z; return this; }
        copy(v) { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
        clone() { return new Vector3(this.x, this.y, this.z); }
        add(v) { this.x += v.x; this.y += v.y; this.z += v.z; return this; }
        sub(v) { this.x -= v.x; this.y -= v.y; this.z -= v.z; return this; }
        normalize() { return this; }
        multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
    }
    class Color {
        constructor() { }
        setHex(h) { return this; }
        set(c) { return this; }
        lerp(c, alpha) { return this; }
        clone() { return new Color(); }
    }

    class Object3D {
        constructor() {
            this.position = new Vector3();
            this.rotation = { x: 0, y: 0, z: 0, set: vi.fn() };
            this.scale = new Vector3(1, 1, 1);
            this.children = [];
            this.add = vi.fn((obj) => { if (obj) this.children.push(obj); });
            this.remove = vi.fn((obj) => { this.children = this.children.filter(c => c !== obj); });
            this.renderOrder = 0;
            this.userData = {};
        }
    }

    return {
        ...actual,
        Vector3,
        Color,
        Object3D,
        Group: class extends Object3D { },
        Points: class extends Object3D { },
        Mesh: class extends Object3D {
            constructor() {
                super();
                this.material = { clone: () => ({ uniforms: { uColor: { value: new Color() } }, dispose: vi.fn() }), dispose: vi.fn() };
                this.geometry = { dispose: vi.fn() };
            }
        },
        Scene: class extends Object3D {
            constructor() { super(); }
            getObjectByName() { return { add: vi.fn(), remove: vi.fn(), children: [] }; }
        },
        PlaneGeometry: class {
            constructor() {
                this.attributes = {
                    position: new BufferAttribute(new Float32Array(30), 3),
                    color: new BufferAttribute(new Float32Array(30), 3)
                };
                // Manually add spy/mock methods if needed, but BufferAttribute has setX/Y/Z now
                this.attributes.position.needsUpdate = false;
                this.attributes.color.needsUpdate = false;
            }
            setAttribute(name, attr) { this.attributes[name] = attr; }
            getAttribute(name) { return this.attributes[name]; }
            computeVertexNormals() { }
            computeVertexNormals() { }
            translate() { }
            rotateX() { }
            rotateY() { }
            rotateZ() { }
            dispose() { }
        },
        BufferAttribute,
        WebGLRenderer: class {
            constructor() { this.domElement = {}; }
            setPixelRatio() { }
            setSize() { }
            render() { }
            dispose() { }
        }
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
        if (typeof window !== 'undefined') {
            window.game = {
                gameTime: 100,
                requestQueue: [],
                releaseRequest: vi.fn()
            };
        }

        vi.stubGlobal('document', {
            body: { appendChild: vi.fn() },
            getElementById: vi.fn((id) => {
                return {
                    // Element properties
                    style: {},
                    width: 100,
                    height: 100,
                    innerText: '',

                    // Container methods
                    appendChild: vi.fn(),
                    remove: vi.fn(), // Add remove for cleanup

                    // Canvas methods
                    getContext: vi.fn(() => ({
                        fillRect: vi.fn(),
                        drawImage: vi.fn(),
                        clearRect: vi.fn(),
                        fillStyle: '',
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

                    // Events & Listeners
                    addEventListener: vi.fn(),
                    classList: { toggle: vi.fn(), remove: vi.fn(), add: vi.fn() }
                };
            }),
            createElement: vi.fn((tag) => {
                console.log(`[Mock] createElement called with tag: ${tag}`);
                return {
                    id: '',
                    style: {},
                    width: 100,
                    height: 100,
                    appendChild: vi.fn(),
                    getContext: vi.fn(() => ({
                        fillRect: vi.fn(),
                        createImageData: () => ({ data: [] }),
                        putImageData: vi.fn(),
                        drawImage: vi.fn(),
                        clearRect: vi.fn(),
                        fillStyle: '',
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
                };
            }),
            createElementNS: vi.fn((ns, tag) => {
                if (tag === 'canvas' || ns === 'http://www.w3.org/1999/xhtml') {
                    return {
                        width: 0, height: 0,
                        getContext: () => ({
                            fillRect: vi.fn(),
                            createImageData: () => ({ data: [] }),
                            putImageData: vi.fn()
                        }),
                        addEventListener: vi.fn(),
                        style: { display: '' }
                    };
                }
                return {};
            }),
        });
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
        const now = 1000; // seconds
        game.simTotalTimeSec = now;

        const req = game.addRequest('raise', 10, 10);

        expect(req.createdAt).toBe(now);
        expect(req.status).toBe('pending');
    });

    it('should cleanup expired pending requests', () => {
        const start = 1000;
        game.simTotalTimeSec = start;

        // Add Request 1 (Old)
        const reqOld = game.addRequest('raise', 10, 10);

        // Advance 290s (Safe)
        game.simTotalTimeSec = start + 290;
        const reqNew = game.addRequest('raise', 20, 20);

        expect(game.requestQueue.length).toBe(2);

        // Advance past 300s from Start (Start+310 = 1310)
        // Old age: 310s (>300) -> Expire
        // New age: 20s (<300) -> Keep
        const checkTime = start + 310;
        game.simTotalTimeSec = checkTime;

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
