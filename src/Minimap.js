export class Minimap {
    constructor(game) {
        this.game = game;
        this.terrain = game.terrain;
        this.canvas = document.getElementById('minimap');
        if (!this.canvas) {
            console.warn('Minimap: canvas "#minimap" not found. Minimap disabled.');
            return;
        }
        this.ctx = this.canvas.getContext('2d');

        // Map size
        this.logicalW = this.terrain.logicalWidth;
        this.logicalD = this.terrain.logicalDepth;

        // Draw every frame? Or interval? Start with every frame.

        // Interaction
        this.isDragging = false;

        // Bind events
        this._binds = {
            onMouseDown: this.onMouseDown.bind(this),
            onMouseMove: this.onMouseMove.bind(this),
            onMouseUp: this.onMouseUp.bind(this)
        };

        if (this.canvas) {
            this.canvas.addEventListener('mousedown', this._binds.onMouseDown);
        }
        window.addEventListener('mousemove', this._binds.onMouseMove);
        window.addEventListener('mouseup', this._binds.onMouseUp);
    }

    dispose() {
        if (this._binds) {
            this.canvas.removeEventListener('mousedown', this._binds.onMouseDown);
            window.removeEventListener('mousemove', this._binds.onMouseMove);
            window.removeEventListener('mouseup', this._binds.onMouseUp);
        }
    }

    onMouseDown(e) {
        // Prevent browser native drag (which pauses JS execution)
        e.preventDefault();
        e.stopPropagation();

        if (e.target !== this.canvas) return;
        this.isDragging = true;

        // Disable OrbitControls to prevent conflict
        if (this.game.controls) this.game.controls.enabled = false;

        this.updateCameraFromMiniMap(e);
    }

    onMouseMove(e) {
        if (!this.isDragging) return;
        e.preventDefault(); // Prevent selection/drag
        e.stopPropagation();
        this.updateCameraFromMiniMap(e);
    }

    onMouseUp(e) {
        this.isDragging = false;
        // Re-enable OrbitControls
        if (this.game.controls) this.game.controls.enabled = true;
    }

    updateCameraFromMiniMap(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Map pixel to logical grid
        // Canvas is 160x160. Logical is 160x160.
        // If scaled, use ratio.
        const logicalW = this.game.terrain.logicalWidth;
        const logicalD = this.game.terrain.logicalDepth;

        const rX = mx / this.canvas.width;
        const rY = my / this.canvas.height;

        const lx = rX * logicalW;
        const lz = rY * logicalD;

        // Convert to World Coordinates
        // World Center (0,0) = Logical (80,80)
        // World = Logical - HalfSize
        const wx = lx - (logicalW / 2);
        const wz = lz - (logicalD / 2);

        // Move Camera
        // Preserving the relative offset between camera and target (view angle)
        const camera = this.game.camera;
        const controls = this.game.controls;

        if (controls) {
            // Current target Y should probably be ground level? Or preserved.
            // When panning, OrbitControls moves target on XZ plane implicitly.
            const targetY = controls.target.y;

            // Calculate offset currently for camera
            const offsetX = camera.position.x - controls.target.x;
            const offsetZ = camera.position.z - controls.target.z;
            const offsetY = camera.position.y - controls.target.y; // Height

            // Set new target
            controls.target.set(wx, targetY, wz);

            // Set new camera position
            camera.position.set(wx + offsetX, controls.target.y + offsetY, wz + offsetZ);

            controls.update();
        }
    }

    update() {
        if (!this.ctx) return;

        // Clear
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Scale
        // Map is 160x160. Canvas is 160x160. 1:1 pixel mapping.
        // If map size changes, we should scale.
        const scaleX = this.canvas.width / this.logicalW;
        const scaleY = this.canvas.height / this.logicalD;

        // Draw Terrain (Optimization: Could cache this to an image/canvas and only redraw on change)
        // For now, redraw every frame might be expensive iterating 160x160 = 25600 pixels.
        // Let's optimize: Draw to offscreen canvas only when terrain changes?
        // Or just iterate. 25k is small for canvas.

        // Create buffer once if possible, or check if size changed.
        if (!this.imgData || this.imgData.width !== this.canvas.width || this.imgData.height !== this.canvas.height) {
            this.imgData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        }
        const imgData = this.imgData;
        const data = imgData.data;

        const cw = this.canvas.width;
        const ch = this.canvas.height;

        // Loop Canvas Pixels (Fixed Size) and Sample Grid (Variable Size)
        // This ensures the minimap always fits the UI container.
        for (let y = 0; y < ch; y++) {
            for (let x = 0; x < cw; x++) {

                // Map Pixel (x,y) -> Grid (gx, gz)
                // logicalW/D might be 240. cw/ch might be 160.
                const gx = Math.floor(x / scaleX); // x * (logicalW / cw)
                const gz = Math.floor(y / scaleY); // y * (logicalD / ch)

                // Safety Clamp/Wrap
                const safeGx = Math.min(Math.max(gx, 0), this.logicalW - 1);
                const safeGz = Math.min(Math.max(gz, 0), this.logicalD - 1);

                const cell = this.terrain.grid[safeGx][safeGz];
                // Safety check if resizing happens mid-frame
                if (!cell) continue;

                const h = cell.height;
                const noise = cell.noise;
                const moisture = cell.moisture || 0.5;

                // Color Logic
                const isNight = this.game.terrain._lastIsNight || false;
                const season = this.game.terrain.currentSeason || 'Spring';

                const color = this.terrain.getBiomeColor(h, moisture, noise, isNight, season, safeGx, safeGz, true);

                const index = (y * cw + x) * 4;
                data[index] = color.r * 255;
                data[index + 1] = color.g * 255;
                data[index + 2] = color.b * 255;
                data[index + 3] = 255;
            }
        }
        this.ctx.putImageData(imgData, 0, 0);

        // Draw Entities
        // Units
        this.ctx.fillStyle = 'blue';
        this.game.units.forEach(u => {
            if (u.isDead) return;
            const x = Math.floor(u.gridX * scaleX);
            const y = Math.floor(u.gridZ * scaleY);
            this.ctx.fillRect(x, y, 2, 2);
        });

        // Goblins
        this.ctx.fillStyle = 'red';
        this.game.goblinManager.goblins.forEach(g => {
            if (g.isDead) return;
            const x = Math.floor(g.gridX * scaleX);
            const y = Math.floor(g.gridZ * scaleY);
            this.ctx.fillRect(x, y, 2, 2);
        });

        // Camera View (Approx)
        // Camera is looking at origin (20,20,20).
        // Since we clipped view to radius 30.
        // Center is camera.position.x, camera.position.z
        const cx = this.game.camera.position.x;
        const cz = this.game.camera.position.z;

        // Wrap coordinates for camera?
        // Map wrapped coordinates.
        // Let's just draw rectangle.

        // Wrap coordinates for camera
        // Map logical W/D (160x160)
        // Camera world 0,0 is at logical W/2, D/2 (80,80)

        let wx = cx;
        let wz = cz;

        // Logical Grid coord
        let gx = wx + this.logicalW / 2;
        let gz = wz + this.logicalD / 2;

        // Modulo wrapping
        gx = ((gx % this.logicalW) + this.logicalW) % this.logicalW;
        gz = ((gz % this.logicalD) + this.logicalD) % this.logicalD;

        const mx = gx * scaleX;
        const my = gz * scaleY;
        const r = 30 * scaleX; // Radius in pixels

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;

        // Draw Main Rect
        this.ctx.strokeRect(mx - r, my - r, r * 2, r * 2);

        // Draw Ghost Rects (if near edge)
        // Check 3x3 neighbors to handle wrap visual
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                const gmx = mx + dx * this.canvas.width;
                const gmy = my + dy * this.canvas.height;

                this.ctx.strokeRect(gmx - r, gmy - r, r * 2, r * 2);
            }
        }
    }
}
