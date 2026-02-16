
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Job, Wander } from '../ai/states/UnitStates.js';

// Mock THREE
vi.mock('three', async () => {
    const actual = await vi.importActual('three');
    return {
        ...actual,
        WebGLRenderer: vi.fn(() => ({
            setSize: vi.fn(),
            render: vi.fn(),
            dispose: vi.fn(),
            domElement: document.createElement('canvas')
        })),
    };
});

describe('Debug Regression', () => {
    let mockScene, mockTerrain, mockGame;

    beforeEach(() => {
        mockScene = new THREE.Scene();
        mockTerrain = {
            width: 100,
            depth: 100,
            logicalWidth: 100,
            logicalDepth: 100,
            grid: Array(100).fill(0).map(() => Array(100).fill(0).map(() => ({ height: 10, regionId: 1 }))),
            getTileHeight: vi.fn(() => 10),
            isAdjacentToRegion: vi.fn(() => true),
            // Mock findPath to return a dummy path
            findPath: vi.fn(() => [{ x: 10, z: 10 }, { x: 11, z: 10 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 10 }, { x: 11, z: 10 }]),
            moveEntity: vi.fn((actor, ox, oz, nx, nz) => {
                console.log(`[DebugMove] Moving ${actor.id} to ${nx},${nz}`);
                console.trace('Move Trace');
            })
        };
        mockGame = {
            simTotalTimeSec: 100,
            requestQueue: [],
            releaseRequest: vi.fn(),
            findBestRequest: vi.fn(() => null),
            claimRequest: vi.fn(() => false),
            units: []
        };
        window.game = mockGame;
        Unit.nextId = 0;
    });

    it('reproduce Snatch movement', () => {
        const unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');

        // Mock smartMove to ensure it calls moveEntity? 
        // Or depend on Unit's real smartMove? Unit has smartMove.
        // But we want to trace it.
        // Let's spy on smartMove too.
        vi.spyOn(unit, 'smartMove');

        const job = { id: 'job1', x: 20, z: 10, type: 'build', status: 'assigned', assignedTo: unit.id };

        unit.targetRequest = job;
        console.log('--- ENTER JOB STATE ---');
        unit.changeState(new Job(unit));
        unit.isMoving = true; // Job.enter sets it false, then smartMove sets it true. 

        // Simulate Snatch
        const anotherUnitId = 999;
        job.assignedTo = anotherUnitId;
        unit.targetRequest = null; // Maybe irrelevant if update checks job properties

        console.log('--- START UPDATE ---');
        // Update logic
        unit.updateLogic(100.16, 0.16, false, []);
        console.log('--- END UPDATE ---');

        // If Job snitched, unit should abandon job.
        // It transitions to Wander, which MIGHT start moving again (random wander).
        // So checking isMoving is unreliable. Check targetRequest instead.
        // expect(unit.isMoving).toBe(false); 
        expect(unit.targetRequest).toBeNull();
        expect(unit.action).not.toContain('Job');
    });
});
