import * as THREE from 'three';

export class Compass {
    constructor(game) {
        this.game = game;
        this.camera = game.camera;

        this.wrapper = document.createElement('div');
        this.wrapper.id = 'compass-wrapper';
        this.wrapper.style.position = 'absolute';
        this.wrapper.style.top = '60px'; // Adjusted per user feedback (was 150, too low)
        this.wrapper.style.left = '180px'; // Moved further right to avoid stats
        this.wrapper.style.width = '60px'; // Resized from 100
        this.wrapper.style.height = '60px';
        this.wrapper.style.pointerEvents = 'none';
        this.wrapper.style.zIndex = '1000';

        // Canvas for drawing
        this.canvas = document.createElement('canvas');
        this.canvas.width = 60; // Resized from 100
        this.canvas.height = 60;
        this.wrapper.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.wrapper);
    }

    update() {
        if (!this.game.controls) return;

        const azimuth = this.game.controls.getAzimuthalAngle(); // Radians. 0 is -Z (North).
        const angle = -azimuth; // Counter-rotate

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const r = w / 2 - 5;

        ctx.clearRect(0, 0, w, h);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        // Draw Simple Compass (Antique Style)
        ctx.strokeStyle = '#8B4513'; // SaddleBrown
        ctx.lineWidth = 4;

        // Outer Circle
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'rgba(210, 180, 140, 0.3)'; // Tan, semi-transparent background
        ctx.fill();

        // North Arrow
        ctx.fillStyle = '#800000'; // Maroon/Dark Red
        ctx.beginPath();
        ctx.moveTo(0, -r + 5);
        ctx.lineTo(10, 0);
        ctx.lineTo(-10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#3e2723'; // Very dark brown outline
        ctx.lineWidth = 1;
        ctx.stroke();

        // South Tail
        ctx.fillStyle = '#D2691E'; // Chocolate
        ctx.beginPath();
        ctx.moveTo(0, r - 5);
        ctx.lineTo(10, 0);
        ctx.lineTo(-10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore(); // Restore before drawing text? No, we need rotation for text if it stays on arrow.

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        ctx.font = 'bold 16px serif'; // Serif looks more antique
        ctx.fillStyle = '#F5DEB3'; // Wheat text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText('N', 0, -r + 12); // Moved closer to North (was +25)

        ctx.restore();
    }
}
