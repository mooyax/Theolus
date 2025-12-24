
import { vi } from 'vitest';

// Mock Canvas getContext
HTMLCanvasElement.prototype.getContext = vi.fn((type) => {
    if (type === '2d') {
        return {
            fillRect: vi.fn(),
            fillStyle: '',
            drawImage: vi.fn(),
            getImageData: vi.fn(() => ({ data: [] })),
            putImageData: vi.fn(),
            createImageData: vi.fn(() => ({ data: [] })),
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
        };
    }
    return null;
});

// Mock Window Game if needed globally
window.game = undefined;

// Mock Console to reduce noise? (Optional: console.log = vi.fn())
