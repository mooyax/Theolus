import * as THREE from 'three';

export class InputManager {
    constructor(scene, camera, terrain, spawnCallback, units) {
        this.scene = scene;
        this.camera = camera;
        this.terrain = terrain;
        this.spawnCallback = spawnCallback;
        this.units = units || [];
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mode = 'raise'; // 'raise', 'lower', 'spawn'

        // Visual Cursor
        const cursorGeo = new THREE.BoxGeometry(1, 1, 1);
        const cursorMat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.cursor = new THREE.Mesh(cursorGeo, cursorMat);
        this.scene.add(this.cursor);

        this.tooltip = document.getElementById('tooltip');

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
        const btnSpawn = document.getElementById('btn-spawn');

        const updateActive = (mode) => {
            this.mode = mode;
            if (btnRaise) btnRaise.classList.toggle('active', mode === 'raise');
            if (btnLower) btnLower.classList.toggle('active', mode === 'lower');
            if (btnSpawn) btnSpawn.classList.toggle('active', mode === 'spawn');
        };

        if (btnRaise) {
            btnRaise.addEventListener('click', () => updateActive('raise'));
        }
        if (btnLower) {
            btnLower.addEventListener('click', () => updateActive('lower'));
        }
        if (btnSpawn) {
            btnSpawn.addEventListener('click', () => updateActive('spawn'));
        }
    }

    onPointerDown(event) {
        if (event.target.tagName === 'BUTTON' || event.target.id === 'minimap') return;
        this.downPosition.set(event.clientX, event.clientY);
    }

    onPointerUp(event) {
        if (event.target.tagName === 'BUTTON' || event.target.id === 'minimap') return;

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
        this.updateTooltip(event.clientX, event.clientY);
    }

    updateTooltip(clientX, clientY) {
        if (!this.tooltip) return;

        let text = '';
        let found = false;

        // 1. Check Units (Raycast)
        // We need to raycast against unit meshes.
        // Units have a `mesh` property which is a Group.
        const unitMeshes = this.units.map(u => u.mesh).filter(m => m);
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const unitIntersects = this.raycaster.intersectObjects(unitMeshes, true); // Recursive for children

        if (unitIntersects.length > 0) {
            // Find which unit belongs to this mesh
            // The intersect object might be a child mesh (arm, leg, etc.)
            // We need to traverse up to find the root group that matches a unit.mesh
            let hitObj = unitIntersects[0].object;
            while (hitObj.parent && !this.units.find(u => u.mesh === hitObj)) {
                hitObj = hitObj.parent;
            }

            const unit = this.units.find(u => u.mesh === hitObj);
            if (unit) {
                text = `Age: ${Math.floor(unit.age)}`;
                found = true;
            }
        }

        // 2. Check Buildings (Grid)
        if (!found) {
            const intersects = this.raycaster.intersectObjects(this.terrain.meshes);
            if (intersects.length > 0) {
                const intersect = intersects[0];
                const point = intersect.point;

                const logicalW = this.terrain.logicalWidth || 80;
                const logicalD = this.terrain.logicalDepth || 80;

                let gridX = Math.round(point.x + logicalW / 2);
                let gridZ = Math.round(point.z + logicalD / 2);

                gridX = ((gridX % logicalW) + logicalW) % logicalW;
                gridZ = ((gridZ % logicalD) + logicalD) % logicalD;

                const cell = this.terrain.grid[gridX][gridZ];
                if (cell && cell.hasBuilding && cell.building) {
                    const type = cell.building.userData.type;
                    if (type === 'house') {
                        const pop = Math.floor(cell.building.userData.population);
                        text = `House Pop: ${pop}/100`;
                        found = true;
                    } else if (type === 'farm') {
                        text = `Farm`;
                        found = true;
                    }
                }
            }
        }

        if (found) {
            this.tooltip.textContent = text;
            this.tooltip.style.display = 'block';
            this.tooltip.style.left = (clientX + 15) + 'px';
            this.tooltip.style.top = (clientY + 15) + 'px';
        } else {
            this.tooltip.style.display = 'none';
        }
    }

    updateCursor() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Optimizing Raycast: Raycast against mathematical plane y=0 instead of high-poly mesh.
        // This is O(1) vs O(N).
        // Raymarch against terrain heightmap
        const hitPoint = this.terrain.raycast(this.raycaster.ray.origin, this.raycaster.ray.direction);
        const intersects = hitPoint ? [{ point: hitPoint }] : [];

        /* Plane Optimization (Replaced due to parallax)
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const target = new THREE.Vector3();
        const hit = this.raycaster.ray.intersectPlane(plane, target);
        const intersects = hit ? [{ point: target }] : [];
        */
        // const intersects = this.raycaster.intersectObjects(this.terrain.meshes);

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

            // Change cursor color based on mode
            if (this.mode === 'spawn') {
                this.cursor.material.color.setHex(0x0000ff); // Blue for spawn
            } else {
                this.cursor.material.color.setHex(0xff0000); // Red for terrain
            }
        } else {
            this.cursor.visible = false;
        }
    }

    handleInteraction(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Optimization: Plane intersection
        // Raymarch against terrain heightmap
        const hitPoint = this.terrain.raycast(this.raycaster.ray.origin, this.raycaster.ray.direction);
        const intersects = hitPoint ? [{ point: hitPoint }] : [];

        /* Plane Optimization (Replaced due to parallax)
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const target = new THREE.Vector3();
        const hit = this.raycaster.ray.intersectPlane(plane, target);
        const intersects = hit ? [{ point: target }] : [];
        */
        // const intersects = this.raycaster.intersectObjects(this.terrain.meshes);

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
                } else if (this.mode === 'spawn') {
                    if (this.spawnCallback) {
                        this.spawnCallback(gridX, gridZ, true); // Manual spawn is Special
                    }
                }
            } else if (event.button === 2) { // Right click
                this.terrain.lower(gridX, gridZ);
            }

            // Update cursor immediately to reflect height change
            this.updateCursor();
        }
    }
    update(deltaTime) {
        // Update cursor every frame to handle camera movement even if mouse is static
        this.updateCursor();
    }
}
