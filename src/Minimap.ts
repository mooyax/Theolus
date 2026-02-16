import { GameConfig } from './config/GameConfig';
import * as THREE from 'three';
import { Game } from './Game';
import { Terrain } from './Terrain';

export class Minimap {
    public game: Game;
    public terrain: Terrain;
    public canvas: HTMLCanvasElement | null;
    public ctx: CanvasRenderingContext2D | null;

    // State
    public isDragging: boolean = false;
    private _binds: any;
    private frameCount: number = 0;
    public forceUpdate: boolean = false;

    // Cache
    private imgData: ImageData | null = null;
    private _tempColor: THREE.Color = new THREE.Color();
    private _logTime: number = 0;
    private _logLoop: number = 0;
    private _loggedDebug: boolean = false;

    constructor(game: Game) {
        this.game = game;
        this.terrain = game.terrain; // Note: referencing the initial terrain. Should check game.terrain dynamically if it changes.
        this.canvas = document.getElementById('minimap') as HTMLCanvasElement;

        if (!this.canvas) {
            console.warn('Minimap: canvas "#minimap" not found. Minimap disabled.');
            this.ctx = null;
            return;
        }

        this.ctx = this.canvas.getContext('2d');

        // Bind events
        this._binds = {
            onMouseDown: this.onMouseDown.bind(this),
            onMouseMove: this.onMouseMove.bind(this),
            onMouseUp: this.onMouseUp.bind(this)
        };

        this.canvas.addEventListener('mousedown', this._binds.onMouseDown);
        window.addEventListener('mousemove', this._binds.onMouseMove);
        window.addEventListener('mouseup', this._binds.onMouseUp);
    }

    dispose() {
        if (this._binds && this.canvas) {
            this.canvas.removeEventListener('mousedown', this._binds.onMouseDown);
            window.removeEventListener('mousemove', this._binds.onMouseMove);
            window.removeEventListener('mouseup', this._binds.onMouseUp);
        }
    }

    private onMouseDown(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (e.target !== this.canvas) return;
        this.isDragging = true;

        if (this.game.controls) this.game.controls.enabled = false;
        this.updateCameraFromMiniMap(e);
    }

    private onMouseMove(e: MouseEvent) {
        if (!this.isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        this.updateCameraFromMiniMap(e);
    }

    private onMouseUp(e: MouseEvent) {
        this.isDragging = false;
        if (this.game.controls) this.game.controls.enabled = true;
    }

    private updateCameraFromMiniMap(e: MouseEvent) {
        if (!this.canvas) return;

        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Dynamic fetch of logic size
        const logicalW = this.game.terrain.logicalWidth;
        const logicalD = this.game.terrain.logicalDepth;

        const rX = mx / this.canvas.width;
        const rY = my / this.canvas.height;

        const lx = rX * logicalW;
        const lz = rY * logicalD;

        // World Coordinates (Center 0,0)
        const wx = lx - (logicalW / 2);
        const wz = lz - (logicalD / 2);

        const camera = this.game.camera;
        const controls = this.game.controls as any; // Type assertion if needed

        if (controls) {
            const targetY = controls.target.y;
            const offsetX = camera.position.x - controls.target.x;
            const offsetZ = camera.position.z - controls.target.z;
            const offsetY = camera.position.y - controls.target.y;

            controls.target.set(wx, targetY, wz);
            camera.position.set(wx + offsetX, controls.target.y + offsetY, wz + offsetZ);
            controls.update();
        }
    }

    public update() {
        // Validation
        if (!this.game || !this.game.terrain || !this.game.terrain.grid) return;
        if (!this.ctx || !this.canvas) return;

        // Throttle (Optional)
        // this.frameCount++;
        // if (!this.forceUpdate && this.frameCount % 5 !== 0) return;
        this.forceUpdate = false;

        try {
            const logicalW = this.game.terrain.logicalWidth || 160;
            const logicalD = this.game.terrain.logicalDepth || 160;


            // Fix Canvas Size if 0
            if (this.canvas.width === 0) this.canvas.width = 160;
            if (this.canvas.height === 0) this.canvas.height = 160;

            const cw = this.canvas.width;
            const ch = this.canvas.height;
            const scaleX = cw / logicalW;
            const scaleY = ch / logicalD;

            // --- 2. ImageData Setup ---
            if (!this.imgData || this.imgData.width !== cw || this.imgData.height !== ch) {
                this.imgData = this.ctx.createImageData(cw, ch);
                console.log(`[Minimap] Init ImageData: ${cw}x${ch}`);
            }
            const data = this.imgData.data;

            // --- 3. Debug Log (Throttled) ---
            const now = performance.now();
            if (now - this._logTime > 2000) {
                this._logTime = now;
                console.log(`[Minimap] Update: Canvas=${cw}x${ch} Logical=${logicalW}x${logicalD}`);
            }

            // --- 4. Render Loop ---
            // Clear
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, cw, ch);

            const grid = this.game.terrain.grid;
            const currentTerrain = this.game.terrain;

            const isNight = currentTerrain._lastIsNight || false;
            const season = currentTerrain.currentSeason || 'Spring';

            for (let y = 0; y < ch; y++) {
                for (let x = 0; x < cw; x++) {
                    const gx = Math.floor(x / scaleX);
                    const gz = Math.floor(y / scaleY);

                    // Clamp strictly to logical bounds to avoid sampling repetitive visual tiles
                    const safeGx = Math.max(0, Math.min(gx, logicalW - 1));
                    const safeGz = Math.max(0, Math.min(gz, logicalD - 1));


                    if (!grid[safeGx]) continue;
                    const cell = grid[safeGx][safeGz];
                    if (!cell) continue;

                    // DEBUG Center Sample
                    // if (x === Math.floor(cw/2) && y === Math.floor(ch/2) && now - this._logLoop > 2000) {
                    //     this._logLoop = now;
                    //     console.log(`[Minimap] Sample Center:`, cell);
                    // }

                    const h = cell.height;
                    const noise = cell.noise;
                    const moisture = cell.moisture || 0.5;

                    // Reuse temp color
                    const color = currentTerrain.getBiomeColor(h, moisture, noise, isNight, season, safeGx, safeGz, true, this._tempColor);

                    const idx = (y * cw + x) * 4;
                    data[idx] = color.r * 255;
                    data[idx + 1] = color.g * 255;
                    data[idx + 2] = color.b * 255;
                    data[idx + 3] = 255;
                }
            }

            this.ctx.putImageData(this.imgData, 0, 0);

            // --- 5. Entities ---
            this.drawEntities(scaleX, scaleY);

            // --- 6. View Frame ---
            this.drawViewFrame(scaleX, scaleY, logicalW, logicalD);

        } catch (e) {
            console.error("[Minimap] Error in update:", e);
        }
    }

    private drawEntities(scaleX: number, scaleY: number) {
        if (!this.ctx) return;

        // Units
        this.game.units.forEach(u => {
            if (u.isDead) return;
            this.ctx!.fillStyle = (u.faction === 'enemy') ? 'red' : 'blue';
            const x = Math.floor(u.gridX * scaleX);
            const y = Math.floor(u.gridZ * scaleY);
            this.ctx!.fillRect(x, y, 2, 2);
        });

        // Buildings
        this.game.terrain.buildings.forEach(b => {
            if (b.isDead) return;
            const faction = (b.userData && b.userData.faction) ? b.userData.faction : 'player';
            const type = (b.userData && b.userData.type) ? b.userData.type : '';

            if (type === 'cave' || type === 'goblin_hut') {
                this.ctx!.fillStyle = 'green';
            } else {
                this.ctx!.fillStyle = (faction === 'enemy') ? 'red' : 'blue';
            }

            const gx = (b.gridX !== undefined) ? b.gridX : (b.userData ? b.userData.gridX : 0);
            const gz = (b.gridZ !== undefined) ? b.gridZ : (b.userData ? b.userData.gridZ : 0);

            const x = Math.floor(gx * scaleX);
            const y = Math.floor(gz * scaleY);

            this.ctx!.fillRect(x, y, 3, 3);
        });

        // Goblins
        if (this.game.goblinManager) {
            this.ctx.fillStyle = 'green';
            this.game.goblinManager.goblins.forEach(g => {
                if (g.isDead) return;
                const x = Math.floor(g.gridX * scaleX);
                const y = Math.floor(g.gridZ * scaleY);
                this.ctx!.fillRect(x, y, 2, 2);
            });
        }
    }

    private drawViewFrame(scaleX: number, scaleY: number, logicalW: number, logicalD: number) {
        if (!this.ctx) return;

        const cx = this.game.controls ? this.game.controls.target.x : this.game.camera.position.x;
        const cz = this.game.controls ? this.game.controls.target.z : this.game.camera.position.z;

        // World to Grid
        let gx = cx + logicalW / 2;
        let gz = cz + logicalD / 2;

        // Modulo
        gx = ((gx % logicalW) + logicalW) % logicalW;
        gz = ((gz % logicalD) + logicalD) % logicalD;

        const mx = gx * scaleX;
        const my = gz * scaleY;

        // Fixed radius
        const viewRadius = GameConfig.render && GameConfig.render.viewRadius ? GameConfig.render.viewRadius : 60;
        const rX = viewRadius * scaleX;
        const rY = viewRadius * scaleY;

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(mx - rX, my - rY, rX * 2, rY * 2);
    }
}
