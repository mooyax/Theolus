import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Game } from '../Game.js';
import { Unit } from '../Unit.js';
import { Minimap } from '../Minimap.js';

vi.mock('../Minimap.js', () => ({
    Minimap: class {
        update() { }
        drawRaidPing() { }
    }
}));

vi.mock('../CloudManager.js', () => ({
    CloudManager: class {
        update() { }
        draw() { }
    }
}));

vi.mock('../BuildingRenderer.js', () => ({
    BuildingRenderer: class {
        constructor() { }
        init() { return Promise.resolve(); }
        update() { }
        draw() { }
        dispose() { }
        updateLighting() { }
    }
}));

vi.mock('../Compass.js', () => ({
    Compass: class {
        update() { }
        draw() { }
    }
}));

vi.mock('../Unit.js', async () => {
    // We import actual to extend it, but we MUST patch the static methods that cause side effects
    // However, if importActual triggers side effects immediately, we are stuck.
    // Fortunately, Unit.js side effects are inside initAssets() which is called by UnitRenderer.
    // So we just need to ensure createFaceTexture returns dummy data.
    const actual = await vi.importActual('../Unit.js');
    actual.Unit.createFaceTexture = () => ({});
    actual.Unit.createWoodTexture = () => ({});
    actual.Unit.createHairTexture = () => ({});
    return actual;
});

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: class {
            constructor() {
                this.domElement = document.createElement('canvas');
                this.domElement.getRootNode = () => document; // Mock getRootNode for OrbitControls
            }
            setSize() { }
            render() { }
            dispose() { }
            setPixelRatio() { }
            shadowMap = { enabled: false, type: 0 };
        },
    };
});

// Mock Game.prototype.animate to prevent infinite loop
vi.spyOn(Game.prototype, 'animate').mockImplementation(() => { });

describe('Job Assignment Idempotency', () => {
    let mockGame;
    let mockUnit;
    let mockJob;

    beforeEach(() => {
        // Mock Scene for Unit
        const mockScene = { add: vi.fn(), getObjectByName: vi.fn().mockReturnValue({ add: vi.fn(), remove: vi.fn(), children: [] }) };
        const mockTerrain = {
            findBestTarget: vi.fn(() => null),
            getTileHeight: vi.fn().mockReturnValue(10),
            logicalWidth: 100,
            logicalDepth: 100,
            grid: Array(100).fill(null).map(() => Array(100).fill(null).map(() => ({ regionId: 1, height: 10, hasBuilding: false }))),
            buildings: [],
            isReachable: vi.fn().mockReturnValue(true),
            findPath: vi.fn().mockImplementation((x1, y1, x2, y2) => [{ x: x2, z: y2 }]),
            pathfindingCalls: 0,
            checkFlatArea: vi.fn().mockReturnValue(true),
            moveEntity: vi.fn(),
            addBuilding: vi.fn().mockImplementation((type, x, z) => {
                const b = { userData: { type, gridX: x, gridZ: z, population: 0 } };
                mockTerrain.buildings.push(b);
                return b;
            }),
            removeBuilding: vi.fn(),
            initTerrain: vi.fn(),
            getRegion: vi.fn().mockReturnValue(1),
            isAdjacentToRegion: vi.fn().mockReturnValue(true),
            getBuildingSize: vi.fn().mockReturnValue(1),
            clippingPlanes: [],
            findPathAsync: vi.fn().mockResolvedValue([{ x: 20, z: 0 }]),
            checkYield: () => Promise.resolve()
        };



        // Mock global document for Compass
        // Bypass happy-dom appendChild check by mocking it on the body
        if (global.document && global.document.body) {
            vi.spyOn(global.document.body, 'appendChild').mockImplementation(() => { });
        }

        if (!global.document.createElement) {
            global.document.createElement = vi.fn();
        }
        const originalCreateElement = global.document.createElement;

        // Restore if needed
        if (global.document.createElement.mockRestore) {
            global.document.createElement.mockRestore();
        }

        vi.spyOn(global.document, 'createElement').mockImplementation((tag) => {
            // Let HappyDOM create the element structure
            // Note: originalCreateElement might be a spy wrapper if not restored correctly, 
            // but we try to use the bound original or just a fresh mock.
            // Using a simple object for canvas is safer if happy-dom is picky.
            // But happy-dom checks 'instanceof Node'.

            // Try to use the REAL createElement if possible?
            // Since we are mocking it, we can't easily call the "real" one if it's already mocked.
            // But checking 'originalCreateElement' above helps.

            // Avoid recursion by NOT calling originalCreateElement
            const el = {
                style: {},
                nodeName: tag.toUpperCase(),
                nodeType: 1,
                ownerDocument: global.document,
                appendChild: vi.fn(), // Helper for HappyDOM
            };

            // Correction: calling output of spy might be recursive.
            // Simplified: Return a dummy object with enough properties to satisfy happy-dom appendChild?
            // Happy-dom checks 'nodeType'.

            if (tag === 'canvas') {
                const canvas = {
                    nodeType: 1, // ELEMENT_NODE
                    nodeName: 'CANVAS',
                    style: {},
                    width: 0,
                    height: 0,
                    ownerDocument: global.document,
                    addEventListener: vi.fn(),
                    removeEventListener: vi.fn(),
                    getContext: () => ({
                        clearRect: vi.fn(),
                        beginPath: vi.fn(),
                        arc: vi.fn(),
                        fill: vi.fn(),
                        stroke: vi.fn(),
                        fillText: vi.fn(),
                        moveTo: vi.fn(),
                        lineTo: vi.fn(),
                        save: vi.fn(),
                        restore: vi.fn(),
                        translate: vi.fn(),
                        rotate: vi.fn(),
                        scale: vi.fn(),
                        measureText: () => ({ width: 0 }),
                        measureText: () => ({ width: 0 }),
                        measureText: () => ({ width: 0 }),
                        fillStyle: '',
                        strokeStyle: '',
                        fill: vi.fn(),
                        fillRect: vi.fn(),
                        strokeRect: vi.fn(),
                        beginPath: vi.fn(),
                        moveTo: vi.fn(),
                        lineTo: vi.fn(),
                        stroke: vi.fn()
                    })
                };
                return canvas;
            }

            return { style: {}, nodeType: 1 };
        });


        mockUnit = new Unit(mockScene, mockTerrain, 0, 0, 'worker');
        mockUnit.id = 1;

        mockJob = { id: 101, x: 20, z: 0, type: 'build', status: 'pending' };

        mockJob = { id: 101, x: 20, z: 0, type: 'build', status: 'pending' };
        mockGame = new Game(mockScene, mockTerrain);
        mockGame.units = [mockUnit];
        mockGame.requestQueue = [mockJob];
        // If Game.js imports them, and we mock nothing else, it should work.
    });

    afterEach(() => {
        window.game = null;
        vi.clearAllMocks();
    });

    it('should NOT reset movement if claiming the same job twice', () => {
        // First Claim
        let success1 = false;
        try {
            success1 = mockGame.claimRequest(mockUnit, mockJob);
        } catch (e) {
            console.error("Claim Failed:", e);
        }

        expect(success1).toBe(true);
        expect(mockUnit.targetRequest).toBe(mockJob);
        expect(mockJob.status).toBe('assigned');
        expect(mockJob.assignedTo).toBe(mockUnit.id);

        // Simulate Unit starting to move
        mockUnit.isMoving = true;
        mockUnit.moveStartTime = 1000;
        mockUnit.action = "Approaching Job";

        // Second Claim (e.g. from heartbeat)
        const success2 = mockGame.claimRequest(mockUnit, mockJob);

        expect(success2).toBe(true);
        // CRITICAL: Should NOT have reset these
        expect(mockUnit.isMoving).toBe(true);
        expect(mockUnit.moveStartTime).toBe(1000);
        expect(mockUnit.action).toBe("Approaching Job");
    });
});
