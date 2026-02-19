import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { UnitRenderer } from '../UnitRenderer.js';
import { GoblinRenderer } from '../GoblinRenderer.js';
import { BuildingRenderer } from '../BuildingRenderer.js';
import { BirdManager } from '../BirdManager.js';
import { Sheep } from '../Sheep.js';
import { Fish } from '../Fish.js';

export class HelpShowroom {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;

        // --- SCENE SETUP ---
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0); // Light gray for better contrast
        this.scene.fog = new THREE.Fog(0xf0f0f0, 20, 85); // Hide distant ghosts (wrapping artifacts)

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 100);
        this.camera.position.set(2, 2.5, 4);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this.renderer.setSize(this.width, this.height, false); // false to prevent style override
        this.renderer.shadowMap.enabled = true;

        // --- CONTROLS ---
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 2.0;
        this.controls.enableZoom = false; // Keep consistent size
        this.controls.enablePan = false; // Disable panning to keep model centered
        this.controls.target.set(0, 0.7, 0); // Aim at chest/head

        // --- LIGHTS ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;

        this.scene.add(dirLight);

        // Extra Light for Animals
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        this.scene.add(hemiLight);

        // --- MOCK TERRAIN ---
        // Needed by Renderers
        this.terrainMock = {
            logicalWidth: 1000,
            logicalDepth: 1000,
            entityGrid: [],
            getTileHeight: () => 0,
            getVisualPosition: (x, z) => new THREE.Vector3(x, 0, z),
            getInterpolatedHeight: () => 0,
            registerEntity: () => { },
            unregisterEntity: () => { },
            checkYield: async () => { }, // Added for UnitRenderer init
            raycast: () => null // Added for compatibility
        };

        // Mock for Buildings (Large to prevent ghosts)
        this.terrainMockLarge = {
            ...this.terrainMock,
            logicalWidth: 10000,
            logicalDepth: 10000
        };

        // Init Grid for GoblinRenderer
        this.usedCells = [];
        for (let x = 0; x < 100; x++) {
            this.terrainMock.entityGrid[x] = [];
            for (let z = 0; z < 100; z++) this.terrainMock.entityGrid[x][z] = [];
        }

        // --- RENDERERS ---
        this.unitRenderer = new UnitRenderer(this.scene, this.terrainMock, [], 100);
        this.goblinRenderer = new GoblinRenderer(this.scene, this.terrainMock, [], 100);
        this.buildingRenderer = new BuildingRenderer(this.scene, this.terrainMockLarge, [], 100); // Use Large Mock

        // Cave Mesh (Manual - Matching BuildingRenderer: Flat Hole)
        const caveGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.05, 16);

        const canvasK = document.createElement('canvas');
        canvasK.width = 64; canvasK.height = 64;
        const ctxK = canvasK.getContext('2d');
        if (ctxK.createRadialGradient) {
            const grad = ctxK.createRadialGradient(32, 32, 5, 32, 32, 30);
            grad.addColorStop(0, '#000000');
            grad.addColorStop(0.7, '#1a1a1a');
            grad.addColorStop(1, '#404040');
            ctxK.fillStyle = grad;
        } else {
            ctxK.fillStyle = '#101010';
        }
        ctxK.fillRect(0, 0, 64, 64);

        ctxK.fillStyle = '#101010';
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 28 + Math.random() * 4;
            ctxK.fillRect(32 + Math.cos(angle) * dist, 32 + Math.sin(angle) * dist, 2, 2);
        }

        const caveMat = new THREE.MeshLambertMaterial({
            map: new THREE.CanvasTexture(canvasK),
            color: 0x808080
        });
        this.caveMesh = new THREE.Mesh(caveGeo, caveMat);
        this.caveMesh.visible = false;
        this.scene.add(this.caveMesh);

        this.animationId = null;
        this.currentType = null;
        this.isRunning = false;

        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.canvas);

        this.initialized = false;
        this.initPromise = this.initRenderers();
    }

    async initRenderers() {
        console.log('[HelpShowroom] Initializing renderers...');
        // Dummy yield function for immediate execution
        const yieldFn = async () => Promise.resolve();
        const statusFn = (msg) => console.log(`[HelpShowroom] ${msg}`);

        try {
            await this.unitRenderer.init(yieldFn, statusFn);
            await this.goblinRenderer.init();
            await this.buildingRenderer.init();
            this.initialized = true;
            console.log('[HelpShowroom] Renderers initialized.');
            if (this.currentType) this.render(); // Re-render if pending
        } catch (e) {
            console.error('[HelpShowroom] Failed to initialize renderers:', e);
        }
    }

    resize() {
        if (!this.canvas) return;
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        if (width === 0 || height === 0) return; // Hidden

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
    }

    show(type) {
        console.log('[HelpShowroom] show called with type:', type);
        this.currentType = type;
        this.isRunning = true;

        // Auto-Fit Camera Logic (Normalization)
        // Set Camera Position & Target based on Object Size
        let dist = 4;
        let height = 2.5;
        let targetY = 0.7;

        if (type === 'tower') {
            dist = 9; height = 6; targetY = 2.5;
        } else if (type === 'barracks') {
            dist = 7; height = 5; targetY = 1.0;
        } else if (['house', 'farm'].includes(type) || type === 'goblin_hut') {
            dist = 5; height = 3; targetY = 0.5;
        } else if (type === 'cave') {
            dist = 6; height = 4; targetY = 0.5;
        } else if (type === 'bird') {
            dist = 1.2; height = 0.8; targetY = 0.0;
        } else if (type === 'sheep') {
            dist = 2.5; height = 1.5; targetY = 0.3;
        } else if (type === 'fish') {
            dist = 1.5; height = 1.0; targetY = 0.0;
        } else {
            // Units / Goblins (Standard Humanoid)
            dist = 4; height = 2.5; targetY = 0.7;
        }

        // Apply
        this.camera.position.set(dist * 0.5, height, dist);
        this.controls.target.set(0, targetY, 0);
        this.controls.update();

        this.render(); // Force one render immediately
    }

    /** タブ（表示する対象タイプ）を切り替える。show()のエイリアス。 */
    setTab(type) {
        this.show(type);
    }

    /** レンダリングループを開始する */
    start() {
        this.isRunning = true;
        this.render();
    }

    stop() {
        this.isRunning = false;
        // Optionally clear scene logic if needed
    }

    render() {
        if (!this.isRunning) return;

        // Update Controls
        this.controls.update();

        // Clear State Optimized
        if (this.usedCells && this.usedCells.length > 0) {
            this.usedCells.forEach(cell => cell.length = 0);
            this.usedCells.length = 0;
        }

        // Setup Mock Entity
        const units = [];
        const type = this.currentType;

        if (['worker', 'knight', 'wizard', 'hunter', 'fisher'].includes(type)) {
            // Setup Unit
            const u = {
                id: 1, role: type, isDead: false, isSleeping: false,
                position: new THREE.Vector3(0, 0, 0),
                rotationY: 0,
                limbs: {
                    leftArm: { x: 0 }, rightArm: { x: 0 },
                    leftLeg: { x: 0 }, rightLeg: { x: 0 }
                }
            };

            // Pose
            const time = Date.now() * 0.002;
            u.limbs.leftArm.x = Math.sin(time) * 0.1;
            u.limbs.rightArm.x = Math.sin(time + 1) * 0.1;

            if (type === 'wizard') {
                u.limbs.rightArm.x = -Math.PI / 4 + Math.sin(time) * 0.05; // Hold staff
            }
            if (type === 'knight') {
                u.limbs.rightArm.x = -Math.PI / 6 + Math.sin(time) * 0.05; // Hold sword
            }
            units.push(u);

            // Hide others
            this.goblinRenderer.update([], this.camera.position);
            this.buildingRenderer.update([], null, this.camera.position);
            this.caveMesh.visible = false;
            if (this.animalMesh) this.animalMesh.visible = false;

            // Render Unit
            this.unitRenderer.update(units, null, this.camera.position);

        } else if (['goblin', 'hob', 'hobgoblin', 'shaman', 'king'].includes(type) || type === 'normal') {
            // Setup Goblin
            const typeMap = {
                'goblin': 'normal',
                'normal': 'normal',
                'hob': 'hobgoblin',
                'hobgoblin': 'hobgoblin',
                'shaman': 'shaman',
                'king': 'king'
            };
            const realType = typeMap[type] || 'normal';

            let scale = 1.0;
            if (realType === 'king') scale = 2.0;
            else if (realType === 'hobgoblin') scale = 1.4;

            const g = {
                id: 2, type: realType, isDead: false, isFinished: false,
                _spatial: { type: 'goblin' },
                position: new THREE.Vector3(0, 0, 0),
                rotationY: 0,
                scale: scale,
                limbs: {
                    leftArm: { x: 0 }, rightArm: { x: 0 },
                    leftLeg: { x: 0 }, rightLeg: { x: 0 }
                }
            };

            // Pose
            const time = Date.now() * 0.005;
            g.limbs.leftArm.x = Math.sin(time) * 0.2;
            g.limbs.rightArm.x = Math.cos(time) * 0.2;

            if (realType === 'shaman') {
                g.limbs.rightArm.x = -Math.PI / 4 + Math.sin(time) * 0.1;
            }

            // GoblinRenderer relies on grid
            if (this.terrainMock.entityGrid[0] && this.terrainMock.entityGrid[0][0]) {
                const cell = this.terrainMock.entityGrid[0][0];
                cell.push(g);
                this.usedCells.push(cell);
            }

            // Hide others
            this.unitRenderer.update([], null, this.camera.position);
            this.buildingRenderer.update([], null, this.camera.position);
            this.caveMesh.visible = false;
            if (this.animalMesh) this.animalMesh.visible = false;

            // Render Goblin
            this.goblinRenderer.update([g], this.camera.position);

        } else if (['house', 'farm', 'barracks', 'tower', 'goblin_hut', 'cave'].includes(type)) {
            // Setup Building
            const b = {
                id: 3, type: type,
                gridX: 0, gridZ: 0, // Mock Grid
                rotation: 0,
                userData: { type: type }
            };

            if (['house', 'farm', 'goblin_hut'].includes(type)) {
                b.gridX = -0.5;
                b.gridZ = -0.5;
            } else if (['barracks', 'tower'].includes(type)) {
                b.gridX = -1.0;
                b.gridZ = -1.0;
            } else {
                b.gridX = 0;
                b.gridZ = 0;
            }

            // Hide others
            this.unitRenderer.update([], null, this.camera.position);
            this.goblinRenderer.update([], this.camera.position);
            if (this.animalMesh) this.animalMesh.visible = false;

            if (type === 'cave') {
                this.caveMesh.visible = true;
                this.caveMesh.position.set(0, 0, 0);
                this.buildingRenderer.update([], null, this.camera.position);
            } else {
                this.caveMesh.visible = false;
                this.buildingRenderer.forceUpdate = true;
                this.buildingRenderer.update([b], null, this.camera.position);
            }
        } else if (['bird', 'sheep', 'fish'].includes(type)) {
            // Setup Animal
            this.unitRenderer.update([], null, this.camera.position);
            this.goblinRenderer.update([], this.camera.position);
            this.buildingRenderer.update([], null, this.camera.position);
            this.caveMesh.visible = false;

            // Clean up previous animal mesh if type changed or first run
            if (this.currentAnimalType !== type) {
                if (this.animalMesh) {
                    this.scene.remove(this.animalMesh);
                    this.animalMesh = null;
                }

                if (type === 'bird') {
                    BirdManager.initAssets();
                    const group = new THREE.Group();
                    const body = new THREE.Mesh(BirdManager.assets.geometries.body, BirdManager.assets.materials.body);
                    group.add(body);

                    const leftWing = new THREE.Mesh(BirdManager.assets.geometries.wing, BirdManager.assets.materials.wing);
                    group.add(leftWing);
                    const rightWing = new THREE.Mesh(BirdManager.assets.geometries.wing, BirdManager.assets.materials.wing);
                    rightWing.scale.x = -1;
                    group.add(rightWing);

                    group.userData.leftWing = leftWing;
                    group.userData.rightWing = rightWing;
                    this.animalMesh = group;

                    this.camera.position.set(2, 2, 2);
                    this.controls.target.set(0, 0, 0);
                    group.scale.set(3, 3, 3); // Better Visibility

                } else if (type === 'sheep') {
                    Sheep.initAssets();
                    const group = new THREE.Group();
                    const body = new THREE.Mesh(Sheep.assets.geometries.body, Sheep.assets.materials.body);
                    body.position.y = 0.3;
                    group.add(body);
                    const head = new THREE.Mesh(Sheep.assets.geometries.head, Sheep.assets.materials.head);
                    head.position.set(0, 0.5, 0.35);
                    group.add(head);

                    const positions = [{ x: 0.1, z: 0.2 }, { x: -0.1, z: 0.2 }, { x: 0.1, z: -0.2 }, { x: -0.1, z: -0.2 }];
                    const legs = [];
                    positions.forEach(pos => {
                        const leg = new THREE.Mesh(Sheep.assets.geometries.leg, Sheep.assets.materials.leg);
                        leg.position.set(pos.x, 0.15, pos.z);
                        group.add(leg);
                        legs.push(leg);
                    });
                    group.userData.legs = legs;
                    this.animalMesh = group;

                    this.camera.position.set(2, 2, 2);
                    this.controls.target.set(0, 0.3, 0);
                    group.scale.set(1.5, 1.5, 1.5);

                } else if (type === 'fish') {
                    Fish.initAssets();
                    const group = new THREE.Group();
                    const bodyMesh = new THREE.Mesh(Fish.assets.geometries.body, Fish.assets.materials.fish);
                    group.add(bodyMesh);
                    const tailMesh = new THREE.Mesh(Fish.assets.geometries.tail, Fish.assets.materials.fish);
                    tailMesh.position.z = -0.3;
                    group.add(tailMesh);
                    this.animalMesh = group;
                }

                if (this.animalMesh) {
                    this.scene.add(this.animalMesh);
                }
                this.currentAnimalType = type;

                // Change Background & Fog (Force Update)
                const blueColor = new THREE.Color(0x88ccff);
                this.scene.background = blueColor;
                if (this.scene.fog) {
                    this.scene.fog.color = blueColor;
                }
            }

            if (this.animalMesh) this.animalMesh.visible = true;

            // Animation
            const time = Date.now() * 0.002;

            if (type === 'bird' && this.animalMesh) {
                const flap = Math.sin(time * 10) * 0.5;
                if (this.animalMesh.userData.leftWing) this.animalMesh.userData.leftWing.rotation.z = flap;
                if (this.animalMesh.userData.rightWing) this.animalMesh.userData.rightWing.rotation.z = -flap;
                this.animalMesh.position.y = Math.sin(time) * 0.1;
            } else if (type === 'sheep' && this.animalMesh) {
                const head = this.animalMesh.children[1];
                if (head) {
                    head.rotation.y = Math.sin(time * 0.5) * 0.2;
                    head.rotation.x = Math.sin(time * 0.8) * 0.1;
                }
            } else if (type === 'fish' && this.animalMesh) {
                this.animalMesh.rotation.y = Math.sin(time * 2) * 0.2;
                if (this.animalMesh.children[1]) this.animalMesh.children[1].rotation.y = Math.sin(time * 10) * 0.3;
            }

        } else {
            // Null selection or unknown
            if (this.animalMesh) {
                this.animalMesh.visible = false;
            }
            this.caveMesh.visible = false;
        }

        this.renderer.render(this.scene, this.camera);

        if (this.isRunning) {
            requestAnimationFrame(() => this.render());
        }
    }
}
