import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HelpShowroom } from '../ui/HelpShowroom.js';
import * as THREE from 'three';

// --- MOCKS ---
global.document = {
    createElement: vi.fn(() => ({
        getContext: () => ({
            createRadialGradient: () => ({ addColorStop: () => { } }),
            fillRect: () => { }
        }),
        width: 0, height: 0, clientWidth: 800, clientHeight: 600
    }))
};
global.ResizeObserver = class { observe() { } };
global.requestAnimationFrame = vi.fn();

// Mock Three.js
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() { this.shadowMap = {}; this.domElement = {}; }
            setSize() { }
            render() { }
        },
        TextureLoader: class { load() { return {}; } },
        CanvasTexture: class { constructor() { } },
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn() }; }
        update() { }
    }
}));

// Mock Renderers
const mockUnitRendererInit = vi.fn().mockResolvedValue();
const mockUnitRendererUpdate = vi.fn();
vi.mock('../UnitRenderer.js', () => ({
    UnitRenderer: class {
        constructor() { this.init = mockUnitRendererInit; this.update = mockUnitRendererUpdate; }
    }
}));

const mockGoblinRendererInit = vi.fn().mockResolvedValue();
const mockGoblinRendererUpdate = vi.fn();
vi.mock('../GoblinRenderer.js', () => ({
    GoblinRenderer: class {
        constructor() { this.init = mockGoblinRendererInit; this.update = mockGoblinRendererUpdate; }
    }
}));

const mockBuildingRendererInit = vi.fn().mockResolvedValue();
const mockBuildingRendererUpdate = vi.fn();
vi.mock('../BuildingRenderer.js', () => ({
    BuildingRenderer: class {
        constructor() { this.init = mockBuildingRendererInit; this.update = mockBuildingRendererUpdate; }
    }
}));

vi.mock('../BirdManager.js', () => ({ BirdManager: { initAssets: vi.fn(), assets: { geometries: {}, materials: {} } } }));
vi.mock('../Sheep.js', () => ({ Sheep: { initAssets: vi.fn(), assets: { geometries: {}, materials: {} } } }));
vi.mock('../Fish.js', () => ({ Fish: { initAssets: vi.fn(), assets: { geometries: {}, materials: {} } } }));


describe('HelpShowroom', () => {
    let showroom;
    let canvas;

    beforeEach(() => {
        vi.clearAllMocks();
        canvas = document.createElement('canvas'); // Mock canvas
        showroom = new HelpShowroom(canvas);
    });

    it('should initialize renderers on instantiation', async () => {
        // Init is async, called in constructor
        await showroom.initPromise;

        expect(mockUnitRendererInit).toHaveBeenCalled();
        expect(mockGoblinRendererInit).toHaveBeenCalled();
        expect(mockBuildingRendererInit).toHaveBeenCalled();
        expect(showroom.initialized).toBe(true);
    });

    it('should update UnitRenderer when showing a worker', async () => {
        await showroom.initPromise;
        showroom.show('worker');

        // Check immediate update (ignoring animation loop for now)
        expect(mockUnitRendererUpdate).toHaveBeenCalled();
        const units = mockUnitRendererUpdate.mock.calls[0][0];
        expect(units.length).toBe(1);
        expect(units[0].role).toBe('worker');

        // Verify others are cleared
        expect(mockGoblinRendererUpdate).toHaveBeenCalledWith([], expect.any(Object));
        expect(mockBuildingRendererUpdate).toHaveBeenCalledWith([], null, expect.any(Object));
    });

    it('should update GoblinRenderer when showing a goblin', async () => {
        await showroom.initPromise;
        showroom.show('goblin');

        expect(mockGoblinRendererUpdate).toHaveBeenCalled();
        const goblins = mockGoblinRendererUpdate.mock.calls[0][0];
        expect(goblins.length).toBe(1);
        expect(goblins[0].type).toBe('normal');

        expect(mockUnitRendererUpdate).toHaveBeenCalledWith([], null, expect.any(Object));
    });

    it('should update BuildingRenderer when showing a house', async () => {
        await showroom.initPromise;
        showroom.show('house');

        expect(mockBuildingRendererUpdate).toHaveBeenCalled();
        const buildings = mockBuildingRendererUpdate.mock.calls[0][0];
        expect(buildings.length).toBe(1);
        expect(buildings[0].type).toBe('house');
    });
});
