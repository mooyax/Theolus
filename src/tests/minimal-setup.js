
import { vi } from 'vitest';

// --- Extreme Browser Mocks for Node/Vitest ---
if (typeof document === 'undefined') {
    global.document = {
        createElement: (tag) => ({
            getContext: () => ({
                fillRect: () => { }, fillStyle: '', drawImage: () => { },
                beginPath: () => { }, moveTo: () => { }, lineTo: () => { }, fill: () => { },
                arc: () => { }, stroke: () => { }, closePath: () => { },
                translate: () => { }, rotate: () => { }, scale: () => { },
                save: () => { }, restore: () => { },
                measureText: () => ({ width: 0 })
            }),
            style: {}, classList: { add: () => { }, remove: () => { } },
            appendChild: () => { }, width: 100, height: 100
        }),
        body: { appendChild: () => { } },
        getElementById: () => null,
        addEventListener: () => { },
        removeEventListener: () => { }
    };
}
if (typeof window === 'undefined') {
    global.window = {
        addEventListener: () => { }, removeEventListener: () => { },
        innerWidth: 1024, innerHeight: 768, devicePixelRatio: 1,
        localStorage: { getItem: () => null, setItem: () => { }, removeItem: () => { }, clear: () => { } },
        location: { search: '' },
        performance: { now: () => Date.now() },
        requestAnimationFrame: (cb) => setTimeout(cb, 16),
        cancelAnimationFrame: (id) => clearTimeout(id)
    };
}
if (typeof HTMLCanvasElement === 'undefined') {
    global.HTMLCanvasElement = class { };
}
if (typeof Image === 'undefined') {
    global.Image = class { constructor() { this.onload = null; this.src = ''; } };
}
