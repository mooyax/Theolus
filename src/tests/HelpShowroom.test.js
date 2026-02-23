import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HelpShowroom } from '../ui/HelpShowroom.js';
import * as THREE from 'three';

// --- MOCKS ---

global.ResizeObserver = class { observe() { } unobserve() { } disconnect() { } };
global.requestAnimationFrame = vi.fn();

vi.mock('three/examples/jsm/controls/OrbitControls.js', () => ({
    OrbitControls: class {
        constructor() { this.target = { set: vi.fn() }; }
        update() { }
        dispose() { }
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
