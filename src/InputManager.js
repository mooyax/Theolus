import * as THREE from 'three';

export class InputManager {
    constructor(scene, camera, terrain, spawnCallback, units, unitRenderer, game) {
        this.scene = scene;
        this.camera = camera;
        this.terrain = terrain;
        this.spawnCallback = spawnCallback;
        this.units = units || [];
        this.unitRenderer = unitRenderer;
        this.game = game; // Store game reference logic // New dependency
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mode = 'raise'; // 'raise', 'lower', 'spawn'

        // Visual Cursor (User Request: Arrow/Point instead of Box)
        // ConeGeometry(radius, height, radialSegments)
        const cursorGeo = new THREE.ConeGeometry(0.2, 1, 8);
        // Default Cone points UP (Tip at +Y). We want DOWN.
        // We will rotate the Mesh.
        const cursorMat = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
        this.cursor = new THREE.Mesh(cursorGeo, cursorMat);
        this.cursor.rotation.x = Math.PI; // Point down
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
        const btnBarracks = document.getElementById('btn-barracks');
        const btnTower = document.getElementById('btn-tower');
        const btnCancel = document.getElementById('btn-cancel');

        const updateActive = (mode) => {
            this.mode = mode;
            if (btnRaise) btnRaise.classList.toggle('active', mode === 'raise');
            if (btnLower) btnLower.classList.toggle('active', mode === 'lower');
            if (btnSpawn) btnSpawn.classList.toggle('active', mode === 'spawn');
            if (btnBarracks) btnBarracks.classList.toggle('active', mode === 'barracks');
            if (btnTower) btnTower.classList.toggle('active', mode === 'tower');
            if (btnCancel) btnCancel.classList.toggle('active', mode === 'cancel');
        };

        if (btnRaise) {
            btnRaise.addEventListener('click', () => updateActive('raise'));
        }
        if (btnLower) {
            btnLower.addEventListener('click', () => updateActive('lower'));
        }
        if (btnCancel) {
            btnCancel.addEventListener('click', () => updateActive('cancel'));
        }
        if (btnSpawn) {
            btnSpawn.addEventListener('click', () => updateActive('spawn'));
        }
        if (btnBarracks) {
            btnBarracks.addEventListener('click', () => updateActive('barracks'));
        }
        if (btnTower) {
            btnTower.addEventListener('click', () => updateActive('tower'));
        }
    }
    isUIInteraction(event) {
        const target = event.target;
        return target.closest('button') ||
            target.closest('input') ||
            target.closest('select') ||
            target.closest('a') ||
            target.id === 'minimap' ||
            target.closest('#minimap') ||
            target.closest('#start-screen') || // Block Start Screen
            target.closest('#save-modal') ||   // Block Save Modal
            target.closest('.ui-container');
    }

    onPointerDown(event) {
        if (this.isUIInteraction(event)) return;
        this.downPosition.set(event.clientX, event.clientY);
    }

    onPointerUp(event) {
        if (this.isUIInteraction(event)) return;

        const upPosition = new THREE.Vector2(event.clientX, event.clientY);
        if (this.downPosition.distanceTo(upPosition) > this.dragThreshold) {
            return; // It was a drag (camera control), not a click
        }

        this.handleInteraction(event);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.lastClientX = event.clientX;
        this.lastClientY = event.clientY;
        this.updateCursor();
        this.updateTooltip(event.clientX, event.clientY);
    }

    updateTooltip(clientX, clientY) {
        if (!this.tooltip) return;

        let text = '';
        let found = false;

        // Use consistent Raycast Logic (Same as Cursor/Interaction)
        // Ensure mouse is updated (it should be from updateCursor, but safety set)
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const hitPoint = this.terrain.raycast(this.raycaster.ray.origin, this.raycaster.ray.direction);

        if (hitPoint) {
            const snapX = Math.round(hitPoint.x);
            const snapZ = Math.round(hitPoint.z);

            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            let gridX = Math.round(snapX + logicalW / 2);
            let gridZ = Math.round(snapZ + logicalD / 2);

            gridX = ((gridX % logicalW) + logicalW) % logicalW;
            gridZ = ((gridZ % logicalD) + logicalD) % logicalD;

            // 1. Check Building (Direct Cell Lookup)
            const cell = this.terrain.grid[gridX][gridZ];
            if (cell && cell.hasBuilding && cell.building) {
                const b = cell.building;
                const type = b.userData.type || b.type;

                if (type === 'house') {
                    const pop = Math.floor(b.userData.population || 0);
                    text = `House Pop: ${pop}/10`;
                    found = true;
                } else if (type === 'castle') {
                    const pop = Math.floor(b.userData.population || 0);
                    text = `Castle Pop: ${pop}/200`;
                    found = true;
                } else if (type === 'barracks') {
                    const pop = Math.floor(b.userData.population || 0);
                    text = `Barracks Pop: ${pop}/200`;
                    found = true;
                } else if (type === 'tower') {
                    const pop = Math.floor(b.userData.population || 0);
                    text = `Tower Pop: ${pop}/300`;
                    found = true;
                }
            }

            // 2. Check Unit (Spatial Search)
            if (!found) {
                const candidate = this.terrain.findNearestEntity('unit', gridX, gridZ, 2.5);
                if (candidate) {
                    text = `Age: ${Math.floor(candidate.age)}`;
                    if (candidate.action) text += `\n${candidate.action}`;
                    found = true;
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

    update() {
        // Continuous update for tooltip even if mouse doesn't move
        if (this.lastClientX !== undefined && this.lastClientY !== undefined) {
            this.updateTooltip(this.lastClientX, this.lastClientY);
        }
    }

    updateCursor() {
        this.raycaster.setFromCamera(this.mouse, this.camera);

        let hitPoint = null;
        // Optimization: Use terrain.raycast (Math-based) instead of Mesh Intersection (O(N) triangles)
        // Mesh intersection against 26k triangles every frame causes stuttering.
        hitPoint = this.terrain.raycast(this.raycaster.ray.origin, this.raycaster.ray.direction);

        const intersects = hitPoint ? [{ point: hitPoint }] : [];

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const point = intersect.point;

            // Snap to nearest integer grid (World Coordinates)
            const snapX = Math.round(point.x);
            const snapZ = Math.round(point.z);

            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            // Calculate Wrapped Grid Coordinates for Visual Lookup
            // We need to know what the 'local' visual offset is for this grid type.
            let gridX = Math.round(snapX + logicalW / 2);
            let gridZ = Math.round(snapZ + logicalD / 2);
            gridX = ((gridX % logicalW) + logicalW) % logicalW;
            gridZ = ((gridZ % logicalD) + logicalD) % logicalD;

            // Get Visual Position for the base/canonical tile
            // isCentered = false (Vertex alignment matching snapX)
            const vPosBase = this.terrain.getVisualPosition(gridX, gridZ, false);

            // Calculate relative distortion offset
            // vPosBase includes: (BaseGridPos + Distortion).
            // We want just Distortion.
            // Reconstruct Undistorted Base Position:
            // From Terrain.js getVisualPosition logic:
            // rawX = (gridX - logicalW/2)
            const rawBaseX = (gridX - logicalW / 2);
            const rawBaseZ = (gridZ - logicalD / 2);

            const distortionX = vPosBase.x - rawBaseX;
            const distortionZ = vPosBase.z - rawBaseZ;

            // Apply distortion to the WORLD Snapped Coordinate
            // This preserves the Infinite Scroll position while matching terrain wobble.
            this.cursor.position.set(snapX + distortionX, vPosBase.y + 0.5, snapZ + distortionZ);
            this.cursor.visible = true;

            // Simple Mode-based Color (Reverted)
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

        // Optimization: Use terrain.raycast exclusively for consistency with Cursor
        // This prevents "Visual vs Logic" misalignment because Cursor uses raycast.
        const hitPoint = this.terrain.raycast(this.raycaster.ray.origin, this.raycaster.ray.direction);

        if (hitPoint) {
            const point = hitPoint;

            // Snap to nearest integer grid (World Coordinates) matching Cursor Logic
            const snapX = Math.round(point.x);
            const snapZ = Math.round(point.z);

            const logicalW = this.terrain.logicalWidth || 80;
            const logicalD = this.terrain.logicalDepth || 80;

            let gridX = Math.round(snapX + logicalW / 2);
            let gridZ = Math.round(snapZ + logicalD / 2);

            // Wrap to 0..logicalWidth-1
            gridX = ((gridX % logicalW) + logicalW) % logicalW;
            gridZ = ((gridZ % logicalD) + logicalD) % logicalD;

            if (event.button === 0) { // Left click
                // GLOBAL MANA PRE-CHECK
                if (this.game && !this.game.canAction()) {
                    console.warn("Action Blocked: Not enough Mana (Negative)");
                    return;
                }

                // Pass World Coords for Visualization
                // FIX: 'intersect' is not defined here. Use 'point' (which is hitPoint vector).
                const worldX = point.x;
                const worldZ = point.z;

                if (this.mode === 'raise') {
                    if (this.game) {
                        this.game.addRequest('raise', gridX, gridZ, null, worldX, worldZ);
                        this.game.consumeMana(10);
                        console.log(`[Input] Request Queued: Raise at ${gridX},${gridZ}`);
                    }
                } else if (this.mode === 'lower') {
                    if (this.game) {
                        this.game.addRequest('lower', gridX, gridZ, null, worldX, worldZ);
                        this.game.consumeMana(10);
                        console.log(`[Input] Request Queued: Lower at ${gridX},${gridZ}`);
                    }
                } else if (this.mode === 'cancel') { // CANCEL INSTRUCTION
                    if (this.game) {
                        if (this.game.tryCancelRequest(gridX, gridZ)) {
                            console.log(`[Input] Request Canceled at ${gridX},${gridZ}`);
                        }
                    }
                } else if (this.mode === 'spawn') {
                    if (this.spawnCallback) {
                        this.spawnCallback(gridX, gridZ, true);
                        if (this.game) this.game.consumeMana(20);
                    }
                } else if (this.mode === 'barracks') {
                    if (this.game) {
                        this.game.addRequest('build_barracks', gridX, gridZ, null, worldX, worldZ);
                        this.game.consumeMana(50);
                    }
                } else if (this.mode === 'tower') {
                    if (this.game) {
                        this.game.addRequest('build_tower', gridX, gridZ, null, worldX, worldZ);
                        this.game.consumeMana(50);
                    }
                }
            } else if (event.button === 2) { // Right click (Lower Request)
                if (this.game && !this.game.canAction()) return;

                if (this.game) {
                    const worldX = point.x;
                    const worldZ = point.z;
                    this.game.addRequest('lower', gridX, gridZ, null, worldX, worldZ);
                    this.game.consumeMana(10);
                }
            }

            // Update cursor immediately to reflect height change
            this.updateCursor();
        }
    }
}
