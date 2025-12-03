import * as THREE from 'three';

export class InputManager {
    constructor(scene, camera, terrain) {
        this.scene = scene;
        this.camera = camera;
        this.terrain = terrain;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mode = 'raise'; // 'raise', 'lower'

        // Visual Cursor
        const cursorGeo = new THREE.BoxGeometry(1, 1, 1);
        const cursorMat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.cursor = new THREE.Mesh(cursorGeo, cursorMat);
        this.scene.add(this.cursor);

        this.setupUI();

        // Use pointer events to distinguish click from drag
        window.addEventListener('pointerdown', this.onPointerDown.bind(this));
        window.addEventListener('pointerup', this.onPointerUp.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        this.dragThreshold = 5; // pixels
        this.downPosition = new THREE.Vector2();
    }

    setupUI() {
        const btnRaise = document.getElementById('btn-raise');
        const btnLower = document.getElementById('btn-lower');

        if (btnRaise && btnLower) {
            btnRaise.addEventListener('click', () => {
                this.mode = 'raise';
                btnRaise.classList.add('active');
                btnLower.classList.remove('active');
            });

            btnLower.addEventListener('click', () => {
                this.mode = 'lower';
                btnLower.classList.add('active');
                btnRaise.classList.remove('active');
            });
        }
    }

    onPointerDown(event) {
        if (event.target.tagName === 'BUTTON') return;
        this.downPosition.set(event.clientX, event.clientY);
    }

    onPointerUp(event) {
        if (event.target.tagName === 'BUTTON') return;

        const upPosition = new THREE.Vector2(event.clientX, event.clientY);
        if (this.downPosition.distanceTo(upPosition) > this.dragThreshold) {
            return; // It was a drag (camera control), not a click
        }

        this.handleInteraction(event);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.updateCursor();
    }

    updateCursor() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.terrain.meshes);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const point = intersect.point;

            // Snap to nearest integer grid
            const snapX = Math.round(point.x);
            const snapZ = Math.round(point.z);

            // Calculate height at this position
            // We need to map to logical grid coordinates (0..40)
            // World 0,0 corresponds to Logical Center (20,20)
            // So we add half logical width/depth
            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            let gridX = Math.round(snapX + logicalW / 2);
            let gridZ = Math.round(snapZ + logicalD / 2);

            gridX = ((gridX % logicalW) + logicalW) % logicalW;
            gridZ = ((gridZ % logicalD) + logicalD) % logicalD;

            const height = this.terrain.getTileHeight(gridX, gridZ);

            this.cursor.position.set(snapX, height + 0.5, snapZ);
            this.cursor.visible = true;
        } else {
            this.cursor.visible = false;
        }
    }

    handleInteraction(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Intersect with all terrain meshes (now just one super-mesh)
        const intersects = this.raycaster.intersectObjects(this.terrain.meshes);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const point = intersect.point;

            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            let gridX = Math.round(point.x + logicalW / 2);
            let gridZ = Math.round(point.z + logicalD / 2);

            // Wrap to 0..logicalWidth-1
            gridX = ((gridX % logicalW) + logicalW) % logicalW;
            gridZ = ((gridZ % logicalD) + logicalD) % logicalD;

            if (event.button === 0) { // Left click
                if (this.mode === 'raise') {
                    this.terrain.raise(gridX, gridZ);
                } else if (this.mode === 'lower') {
                    this.terrain.lower(gridX, gridZ);
                }
            } else if (event.button === 2) { // Right click
                this.terrain.lower(gridX, gridZ);
            }

            // Update cursor immediately to reflect height change
            this.updateCursor();
        }
    }
}
