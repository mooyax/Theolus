
import { describe, it, expect, vi } from 'vitest';
import { Goblin } from '../Goblin.js';

describe('Reproduce Goblin Crash', () => {
    it('should create face texture without crashing', () => {
        console.log('Running Reproduction Test');
        // Force mock inspection if possible
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        console.log('Mock Context Keys:', Object.keys(ctx));
        console.log('Is beginPath function?', typeof ctx.beginPath);

        expect(() => {
            Goblin.createFaceTexture();
        }).not.toThrow();
    });
});
