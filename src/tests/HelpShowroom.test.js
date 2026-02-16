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
            setViewport() { }
            setScissor() { }
            setScissorTest() { }
            clear() { }
            setClearColor() { }
        },
    };
});

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn() }; }
        update() { }
    }
}));

describe('HelpShowroom', () => {
    let showroom;
    let canvas;

    beforeEach(() => {
        vi.clearAllMocks();
        canvas = document.createElement('canvas');
        showroom = new HelpShowroom(canvas);
    });

    it('should initialize basic Three.js components', () => {
        expect(showroom.scene).toBeDefined();
        expect(showroom.camera).toBeDefined();
        expect(showroom.renderer).toBeDefined();
        expect(showroom.controls).toBeDefined();
    });

    it('should have standard control methods', () => {
        expect(typeof showroom.setTab).toBe('function');
        expect(typeof showroom.start).toBe('function');
        expect(typeof showroom.stop).toBe('function');
    });
});
