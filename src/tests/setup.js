
import { vi } from 'vitest';

// Mock Canvas getContext
const mockContext = {
    fillRect: vi.fn(),
    fillStyle: '',
    drawImage: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(64 * 64 * 4) })),
    putImageData: vi.fn(),
    createImageData: vi.fn(() => ({ data: new Uint8ClampedArray(64 * 64 * 4) })),
    translate: vi.fn(),
    rotate: vi.fn(),
    scale: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    setTransform: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
};

HTMLCanvasElement.prototype.getContext = vi.fn(function (type) {
    if (type === '2d') return mockContext;
    return null;
});

// Mock Window Game if needed globally
window.game = undefined;

// Mock Console to reduce noise? (Optional: console.log = vi.fn())
