import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class HelpShowroom {
    constructor(canvas) {
        console.log("HelpShowroom Minimal initialized");
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x333333);
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.controls = new OrbitControls(this.camera, this.canvas);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        this.camera.position.z = 5;
        this.renderer.render(this.scene, this.camera);
    }

    setTab(type) {
        console.log("setTab called with", type);
    }

    start() {
        console.log("start called");
    }

    stop() {
        console.log("stop called");
    }
}
