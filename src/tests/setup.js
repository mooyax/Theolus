import { vi, beforeEach } from 'vitest';

// 0. WeatherManager Mock (Fix path to match import)
vi.mock('../WeatherManager', () => {
    return {
        WeatherManager: class {
            constructor() { }
            update() { }
            setWeather() { }
            updateSkyColor() { }
        }
    };
});

// --- Global Mocks (to prevent load errors and side effects) ---

// 1. THREE.js Mock
vi.mock('three', async () => {
    const actual = await vi.importActual('three');

    class MockVector3 {
        constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
        set(x, y, z) { this.x = x || 0; this.y = y || 0; this.z = z || 0; return this; }
        copy(v) { if (v) { this.x = v.x || 0; this.y = v.y || 0; this.z = v.z || 0; } return this; }
        add(v) { if (v) { this.x += v.x || 0; this.y += v.y || 0; this.z += v.z || 0; } return this; }
        sub(v) { if (v) { this.x -= v.x || 0; this.y -= v.y || 0; this.z -= v.z || 0; } return this; }
        multiplyScalar(s) { this.x *= s; this.y *= s; this.z *= s; return this; }
        divideScalar(s) { if (s !== 0) { this.x /= s; this.y /= s; this.z /= s; } return this; }
        normalize() { const l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); if (l > 0) this.divideScalar(l); return this; }
        clone() { return new MockVector3(this.x, this.y, this.z); }
        clone() { return new MockVector3(this.x, this.y, this.z); }
        applyQuaternion() { return this; }
        applyAxisAngle() { return this; }
        distanceTo(v) { if (!v) return 0; return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2); }
        length() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
        setFromMatrixScale(m) {
            if (!m || !m.elements) {
                this.x = 1; this.y = 1; this.z = 1; // Default to 1 if no matrix (Unit Tests usually expect visible)
                return this;
            }
            const e = m.elements;
            this.x = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
            this.y = Math.sqrt(e[4] * e[4] + e[5] * e[5] + e[6] * e[6]);
            this.z = Math.sqrt(e[8] * e[8] + e[9] * e[9] + e[10] * e[10]);
            return this;
        }
    }

    class MockColor {
        constructor(r = 1, g = 1, b = 1) {
            if (typeof r === 'number' && g === 1 && b === 1 && r > 1) {
                this.setHex(r);
            } else {
                this.r = r; this.g = g; this.b = b;
            }
        }
        setHex(h) {
            this.r = ((h >> 16) & 255) / 255;
            this.g = ((h >> 8) & 255) / 255;
            this.b = (h & 255) / 255;
            return this;
        }
        copy(c) { if (c) { this.r = c.r; this.g = c.g; this.b = c.b; } return this; }
        lerp(c, t) {
            if (c) {
                this.r += (c.r - this.r) * t;
                this.g += (c.g - this.g) * t;
                this.b += (c.b - this.b) * t;
            }
            return this;
        }
        getHex() {
            return (Math.round(this.r * 255) << 16) | (Math.round(this.g * 255) << 8) | Math.round(this.b * 255);
        }
        toArray(array = [], offset = 0) {
            array[offset] = this.r;
            array[offset + 1] = this.g;
            array[offset + 2] = this.b;
            return array;
        }
        clone() { return new MockColor(this.r, this.g, this.b); }
    }

    class MockObject {
        constructor() {
            this.position = new MockVector3();
            this.rotation = new MockVector3();
            this.scale = new MockVector3(1, 1, 1);
            this.color = new MockColor(); // Added color for Lights
            this.quaternion = { setFromAxisAngle: vi.fn().mockReturnThis() };
            this.matrix = new actual.Matrix4(); // Added for UnitRenderer compatibility
            this.userData = {};
            this.children = [];
            this.add = vi.fn().mockReturnThis();
            this.remove = vi.fn().mockReturnThis();
            this.getObjectByName = vi.fn().mockReturnValue(null);
            this.traverse = vi.fn();
            this.lookAt = vi.fn();
            this.updateProjectionMatrix = vi.fn();
            this.updateMatrix = vi.fn(); // Added for UnitRenderer
            this.copy = vi.fn().mockReturnThis();

            // Transform helpers
            this.rotateX = vi.fn().mockReturnThis();
            this.rotateY = vi.fn().mockReturnThis();
            this.rotateZ = vi.fn().mockReturnThis();
            this.translateX = vi.fn().mockReturnThis();
            this.translateY = vi.fn().mockReturnThis();
            this.translateZ = vi.fn().mockReturnThis();

            // Added for Mesh/Sprite compatibility in dispose()
            this.geometry = { dispose: vi.fn() };
            this.material = { dispose: vi.fn() };
        }
    }

    return {
        ...actual,
        ...actual,
        WebGLRenderer: class {
            constructor() {
                this.domElement = { getContext: () => ({}), style: {} };
                this.shadowMap = {};
                this.capabilities = { getMaxAnisotropy: () => 1 };
            }
            setSize() { } render() { } setPixelRatio() { } setClearColor() { } dispose() { }
        },
        Color: MockColor,
        Vector3: MockVector3,
        Group: MockObject,
        Object3D: MockObject,
        Mesh: MockObject,
        Scene: MockObject,
        PointLight: MockObject,
        AmbientLight: MockObject,
        DirectionalLight: MockObject,
        PerspectiveCamera: MockObject,
        OrthographicCamera: MockObject,
        Clock: class { constructor() { } getDelta() { return 0.016; } getElapsedTime() { return 0; } },
        MOUSE: { LEFT: 0, MIDDLE: 1, RIGHT: 2 },
        Matrix4: class {
            constructor() {
                this.elements = new Float32Array([
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                ]);
            }
            set() { return this; }
            copy(m) {
                if (m && m.elements) this.elements.set(m.elements);
                return this;
            }
            clone() { return new this.constructor().copy(this); }
            identity() {
                this.elements.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
                return this;
            }
            multiply() { return this; }
            multiplyMatrices() { return this; }
            makePerspective() { return this; }
            makeOrthographic() { return this; }
            lookAt() { return this; }
            scale() { return this; }
            setPosition() { return this; }
            extractRotation() { return this; }
            makeRotationFromQuaternion() { return this; }
            setFromMatrixScale() { return this; }
            makeTranslation() { return this; }
            makeScale() { return this; }
            fromArray(array, offset = 0) {
                for (let i = 0; i < 16; i++) {
                    this.elements[i] = array[offset + i];
                }
                return this;
            }
        },
    };
});
vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({ OrbitControls: class { constructor() { } update() { } } }));

// 2. UI and System Mocks
vi.mock('../Minimap.js', () => ({ Minimap: class { update() { } drawRaidPing() { } serialize() { return {}; } deserialize() { } } }));
vi.mock('../Compass.js', () => ({ Compass: class { update() { } } }));
vi.mock('../UnitRenderer.js', () => ({ UnitRenderer: class { init() { return Promise.resolve(); } initInstancedMeshes() { } update() { } updateLighting() { } updatePosition() { } setSeason() { } setCamera() { } dispose() { } } }));
vi.mock('../BuildingRenderer.js', () => ({ BuildingRenderer: class { init() { return Promise.resolve(); } initInstancedMeshes() { } update() { } updateLighting() { } updatePosition() { } setSeason() { } setCamera() { } dispose() { } } }));
vi.mock('../GoblinRenderer.js', () => ({ GoblinRenderer: class { init() { return Promise.resolve(); } initInstancedMeshes() { } update() { } updateLighting() { } updatePosition() { } setSeason() { } setCamera() { } dispose() { } } }));
vi.mock('../TreeRenderer.js', () => ({ TreeRenderer: class { init() { return Promise.resolve(); } initInstancedMeshes() { } update() { } updateLighting() { } updatePosition() { } setSeason() { } setCamera() { } dispose() { } } }));
vi.mock('../PerformanceMonitor.js', () => ({ PerformanceMonitor: class { enable() { } disable() { } toggle() { } update() { } startUpdate() { } endUpdate() { } startRender() { } endRender() { } updateEntityCount() { } getStats() { return {}; } dispose() { } } }));
vi.mock('../Weather.js', () => ({ Weather: class { update() { } setSeason() { } dispose() { } } }));
vi.mock('../SoundManager.js', () => ({ SoundManager: class { play() { } stop() { } update() { } setSkyColor() { } dispose() { } } }));
vi.mock('../CloudManager.js', () => ({ CloudManager: class { update() { } dispose() { } } }));
vi.mock('../BirdManager.js', () => ({ BirdManager: class { update() { } dispose() { } } }));
vi.mock('../SheepManager.js', () => ({ SheepManager: class { constructor() { this.sheeps = []; } update() { } dispose() { } } }));
vi.mock('../FishManager.js', () => ({ FishManager: class { constructor() { this.fishes = []; } update() { } dispose() { } } }));
vi.mock('../WeatherManager.ts', () => ({ WeatherManager: class { constructor() { } init() { } setWeather() { } update() { } updateSkyColor() { } dispose() { } } }));
vi.mock('../WeatherManager.js', () => ({ WeatherManager: class { constructor() { } init() { } setWeather() { } update() { } updateSkyColor() { } dispose() { } } }));

// Mock Canvas getContext
const mockContext = {
    fillRect: vi.fn(), fillStyle: '', drawImage: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(64 * 64 * 4) })),
    putImageData: vi.fn(), createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(64 * 64 * 4) })),
    translate: vi.fn(), rotate: vi.fn(), scale: vi.fn(), save: vi.fn(), restore: vi.fn(),
    beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), closePath: vi.fn(),
    fill: vi.fn(), stroke: vi.fn(), arc: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    setTransform: vi.fn(), measureText: vi.fn(() => ({ width: 0 })),
};

HTMLCanvasElement.prototype.getContext = vi.fn(function (type) {
    if (type === '2d') return mockContext;
    return null;
});

// 3. Browser API Mocks (Standardized)
const mockStyle = {};
const mockElement = {
    style: mockStyle,
    classList: {
        add: vi.fn(),
        remove: vi.fn(),
        contains: vi.fn(() => false),
        toggle: vi.fn(),
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    setAttribute: vi.fn(),
    getAttribute: vi.fn(),
    getContext: vi.fn(() => mockContext),
    innerText: '',
    textContent: '',
    innerHTML: '',
    dataset: {},
    width: 1024,
    height: 768,
    toDataURL: vi.fn(() => ''),
};

vi.stubGlobal('window', {
    innerWidth: 1024,
    innerHeight: 768,
    devicePixelRatio: 1,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    requestAnimationFrame: vi.fn((cb) => setTimeout(cb, 16)),
    cancelAnimationFrame: vi.fn((id) => clearTimeout(id)),
    getComputedStyle: vi.fn(() => ({ display: 'none', getPropertyValue: () => '' })),
    location: { search: '' },
    localStorage: (() => {
        let store = {};
        return {
            getItem: vi.fn((key) => store[key] || null),
            setItem: vi.fn((key, value) => { store[key] = String(value); }),
            removeItem: vi.fn((key) => { delete store[key]; }),
            clear: vi.fn(() => { store = {}; }),
            key: vi.fn((index) => Object.keys(store)[index] || null),
            get length() { return Object.keys(store).length; }
        };
    })(),
    alert: vi.fn(),
    performance: { now: vi.fn(() => Date.now()) }
});

vi.stubGlobal('alert', window.alert);

vi.stubGlobal('document', {
    getElementById: vi.fn((id) => ({ ...mockElement, style: {}, id })),
    getElementsByClassName: vi.fn(() => [{ ...mockElement, style: {} }]),
    createElement: vi.fn((tag) => ({ ...mockElement, style: {}, tagName: tag.toUpperCase() })),
    body: { ...mockElement, style: {}, tagName: 'BODY' },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
});

vi.stubGlobal('localStorage', window.localStorage);
vi.stubGlobal('Image', class { constructor() { this.onload = null; this.src = ''; } });

// Helper to reset static counters
function resetStaticCounters() {
    // We search for various classes that might have nextId
    const targets = [
        { path: '../Entity.ts', name: 'Entity' },
        { path: '../Actor.ts', name: 'Actor' },
        { path: '../Unit.ts', name: 'Unit' },
        { path: '../Building.ts', name: 'Building' },
        { path: '../Goblin.ts', name: 'Goblin' },
        { path: '../GoblinManager.js', name: 'GoblinManager' }
    ];

    targets.forEach(t => {
        try {
            // This is tricky with vitest mocks/hoisting but we try to reach the actual or mocked module
            // Actually, since they are mocked in many tests, it's safer to just try to reach them if they are in global scope or similar.
            // For now, let's just use window-based reset if they are there, or just keep it simple.
        } catch (e) { }
    });
}

beforeEach(async () => {
    vi.clearAllMocks();

    // resetStaticCounters();

    if (globalThis.window) {
        window.localStorage?.clear();
        if (window.game) {
            console.log("Disposing detached game instance");
            if (window.game.dispose) window.game.dispose();
            window.game = null;
        }
    }
});
