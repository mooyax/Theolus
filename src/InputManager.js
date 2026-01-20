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
        this._binds = {
            onPointerDown: this.onPointerDown.bind(this),
            onPointerUp: this.onPointerUp.bind(this),
            onPointerMove: this.onPointerMove.bind(this)
        };

        window.addEventListener('pointerdown', this._binds.onPointerDown);
        window.addEventListener('pointerup', this._binds.onPointerUp);
        window.addEventListener('mousemove', this._binds.onPointerMove);

        this.dragThreshold = 15; // pixels
        this.downPosition = new THREE.Vector2();
    }

    dispose() {
        if (this._binds) {
            window.removeEventListener('pointerdown', this._binds.onPointerDown);
            window.removeEventListener('pointerup', this._binds.onPointerUp);
            window.removeEventListener('mousemove', this._binds.onPointerMove);
        }
        if (this.cursor) {
            this.scene.remove(this.cursor);
            this.cursor.geometry.dispose();
            this.cursor.material.dispose();
        }
    }

    setupUI() {
        const btnRaise = document.getElementById('btn-raise');
        const btnLower = document.getElementById('btn-lower');
        const btnSpawn = document.getElementById('btn-spawn');
        const btnBarracks = document.getElementById('btn-barracks');
        const btnTower = document.getElementById('btn-tower');
        const btnCancel = document.getElementById('btn-cancel');
        const btnView = document.getElementById('btn-view'); // New

        const updateActive = (mode) => {
            this.mode = mode;
            if (btnRaise) btnRaise.classList.toggle('active', mode === 'raise');
            if (btnLower) btnLower.classList.toggle('active', mode === 'lower');
            if (btnSpawn) btnSpawn.classList.toggle('active', mode === 'spawn');
            if (btnBarracks) btnBarracks.classList.toggle('active', mode === 'barracks');
            if (btnTower) btnTower.classList.toggle('active', mode === 'tower');
            if (btnCancel) btnCancel.classList.toggle('active', mode === 'cancel');
            if (btnView) btnView.classList.toggle('active', mode === 'view'); // New
        };

        // Default to View Mode
        updateActive('view');

        if (btnView) {
            btnView.addEventListener('click', () => updateActive('view'));
        }
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
            target.closest('#help-modal') ||   // Block Help Modal
            target.closest('.ui-container');
    }

    onPointerDown(event) {
        if (this.isUIInteraction(event)) return;
        this.downPosition.set(event.clientX, event.clientY);
    }

    onPointerUp(event) {
        if (this.isUIInteraction(event)) return;

        const upPosition = new THREE.Vector2(event.clientX, event.clientY);
        const dist = this.downPosition.distanceTo(upPosition);
        if (dist > this.dragThreshold) {
            // console.log(`[Input] Click ignored: Drag detected (${dist.toFixed(1)}px > ${this.dragThreshold}px)`);
            return; // It was a drag (camera control), not a click
        }

        this.handleInteraction(event);
    }

    onPointerMove(event) {
        // Block if modal is open
        if (document.getElementById('help-modal').style.display === 'flex') return;
        if (document.getElementById('save-modal') && document.getElementById('save-modal').style.display === 'flex') return;

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
                } else if (type === 'goblin_hut') {
                    const pop = Math.floor(b.userData.population || 0);
                    // Cap 5 (defined in Terrain)
                    text = `Goblin Hut Pop: ${pop}/5\nHP: ${Math.floor(b.userData.hp)}`;
                    found = true;
                } else if (type === 'cave') {
                    const pop = Math.floor(b.userData.population || 0);
                    // Cap 20 (defined in Terrain)
                    text = `Goblin Cave Pop: ${pop}/20\nHP: ${Math.floor(b.userData.hp)}`;
                    found = true;
                } else if (type === 'farm') {
                    text = `Farm HP: ${Math.floor(b.userData.hp)}`;
                    found = true;
                }
            }

            if (!found) {
                // 2. Check Unit / Goblin (Visual + Spatial)
                let candidate = null;

                // Visual Raycast (for exact selection of moving units)
                // Visual Raycast (for exact selection of moving units/goblins)
                let intersectCandidates = [];
                if (this.game) {
                    if (this.game.unitRenderer && this.game.unitRenderer.meshGroup) {
                        intersectCandidates.push(...this.game.unitRenderer.meshGroup.children);
                    }
                    if (this.game.goblinManager && this.game.goblinManager.renderer && this.game.goblinManager.renderer.meshGroup) {
                        intersectCandidates.push(...this.game.goblinManager.renderer.meshGroup.children);
                    }
                }

                if (intersectCandidates.length > 0) {
                    this.raycaster.setFromCamera(this.mouse, this.camera);
                    const intersects = this.raycaster.intersectObjects(intersectCandidates, true);

                    if (intersects.length > 0) {
                        const p = intersects[0].point;

                        const logicalW = this.terrain.logicalWidth || 80;
                        const logicalD = this.terrain.logicalDepth || 80;

                        // Normalize Hit Point to Grid Range for Search
                        const normX = Math.round(((p.x % logicalW) + logicalW) % logicalW);
                        const normZ = Math.round(((p.z % logicalD) + logicalD) % logicalD);

                        // Search near the visualized point (using Normalized coords)
                        // Expanded to include Sheep/Fish as requested
                        candidate = this.terrain.findNearestEntity('unit', normX, normZ, 3.0) ||
                            this.terrain.findNearestEntity('goblin', normX, normZ, 3.0) ||
                            this.terrain.findNearestEntity('sheep', normX, normZ, 3.0) ||
                            this.terrain.findNearestEntity('fish', normX, normZ, 3.0);
                    }
                }

                // Fallback: Grid Search (using Grid Logic we calculated earlier which was already wrapped?)
                /* Use the wrapped gridX/gridZ calculated at top of function */
                if (!candidate) candidate = this.terrain.findNearestEntity('unit', gridX, gridZ, 4.0);
                if (!candidate) candidate = this.terrain.findNearestEntity('goblin', gridX, gridZ, 4.0);
                if (!candidate) candidate = this.terrain.findNearestEntity('sheep', gridX, gridZ, 4.0);
                if (!candidate) candidate = this.terrain.findNearestEntity('fish', gridX, gridZ, 4.0);

                if (candidate) {
                    // Custom Tooltip Logic
                    // Check constructor name to identify class type reliably
                    const ctor = candidate.constructor ? candidate.constructor.name : '';

                    if (ctor === 'Unit' || (candidate.role && !candidate.subType)) {
                        const hp = Math.floor(candidate.hp);
                        const maxHp = candidate.maxHp || 50;
                        text = `[Human] ${candidate.role} (ID:${candidate.id})\nHP: ${hp}/${maxHp}`;
                        if (candidate.action) text += `\nAction: ${candidate.action}`;
                        found = true;
                    } else if (ctor === 'Goblin' || candidate.type === 'normal' || candidate.type === 'hobgoblin' || candidate.type === 'shaman' || candidate.type === 'king') {
                        const hp = Math.floor(candidate.hp);
                        const maxHp = candidate.maxHp || 30; // Estimate
                        text = `[Goblin] ${candidate.type || 'Normal'} (ID:${candidate.id})\nHP: ${hp}/${maxHp}`;
                        if (candidate.state) {
                            // Format State Name: GoblinRaidState -> "Raid", GoblinCombatState -> "Combat"
                            let stateName = candidate.state.constructor.name;
                            stateName = stateName.replace('Goblin', '').replace('State', '');
                            text += `\nAction: ${stateName}`;
                        }
                        found = true;
                    } else if (candidate.getTooltip) {
                        text = candidate.getTooltip();
                        found = true;
                    }
                }
            } // End if (!found)

            if (found) {
                this.tooltip.textContent = text;
                this.tooltip.style.display = 'block';
                this.tooltip.style.left = (clientX + 15) + 'px';
                this.tooltip.style.top = (clientY + 15) + 'px';
            } else {
                this.tooltip.style.display = 'none';
            }
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

            // Simple Mode-based Color
            if (this.mode === 'spawn') {
                this.cursor.material.color.setHex(0x0000ff); // Blue for spawn
            } else if (this.mode === 'view') {
                this.cursor.material.color.setHex(0xffffff); // White for view
            } else {
                this.cursor.material.color.setHex(0xff0000); // Red for terrain
            }
        } else {
            this.cursor.visible = false;
        }
    }

    handleInteraction(event) {
        // Prevent gameplay interaction if game is not active (Preview Mode)
        if (this.game && !this.game.gameActive) return;

        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Optimization: Use terrain.raycast exclusively for consistency with Cursor
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
                const worldX = point.x;
                const worldZ = point.z;

                if (this.mode === 'view') {
                    // View Mode: No Action
                    // Optional: Select unit/building logic could go here later.
                    return;
                } else if (this.mode === 'raise') {
                    if (this.game) {
                        this.game.addRequest('raise', gridX, gridZ, true, worldX, worldZ);
                        this.game.consumeMana(10);
                        console.log(`[Input] Request Queued: Raise at ${gridX},${gridZ}`);
                    }
                } else if (this.mode === 'lower') {
                    if (this.game) {
                        this.game.addRequest('lower', gridX, gridZ, true, worldX, worldZ);
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
                    const cost = 50;
                    if (this.game.mana >= cost) {
                        if (this.spawnCallback) {
                            this.spawnCallback(gridX, gridZ, true);
                            if (this.game) this.game.consumeMana(cost);
                        }
                    }
                } else if (this.mode === 'barracks') {
                    if (this.game) {
                        const count = this.game.terrain ? this.game.terrain.buildings.filter(b => b.userData.type === 'barracks').length : 0;
                        const cost = 1000 * (count + 1);
                        if (this.game.mana >= cost) {
                            this.game.addRequest('build_barracks', gridX, gridZ, true, worldX, worldZ);
                            this.game.consumeMana(cost);
                        }
                    }
                } else if (this.mode === 'tower') {
                    if (this.game) {
                        const count = this.game.terrain ? this.game.terrain.buildings.filter(b => b.userData.type === 'tower').length : 0;
                        const cost = 1000 * (count + 1);
                        if (this.game.mana >= cost) {
                            this.game.addRequest('build_tower', gridX, gridZ, true, worldX, worldZ);
                            this.game.consumeMana(cost);
                        }
                    }
                }
            } else if (event.button === 2) { // Right click (Lower Request)
                if (this.game && !this.game.canAction()) return;

                // Block Right Click Action in View Mode too? 
                // User said "Map Rotation Movement" (often requires mouse buttons).
                // Safest to block modification in View Mode.
                if (this.mode === 'view') return;

                if (this.game) {
                    const worldX = point.x;
                    const worldZ = point.z;
                    this.game.addRequest('lower', gridX, gridZ, true, worldX, worldZ);
                    this.game.consumeMana(10);
                }
            }
        }

        // Update cursor immediately to reflect height change
        this.updateCursor();
    }
}
