import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { JobState, UnitWanderState } from '../ai/states/UnitStates.js';

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

describe('Unit Snatching and Race Conditions', () => {
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
            findPath: vi.fn(() => [{ x: 10, z: 10 }, { x: 11, z: 10 }]),
            findPathAsync: vi.fn().mockResolvedValue([{ x: 10, z: 10 }, { x: 11, z: 10 }]),
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

    it('should stop and wander if another unit snatches its job', () => {
        const unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        const job = { id: 'job1', x: 20, z: 10, type: 'build', status: 'assigned', assignedTo: unit.id };

        unit.targetRequest = job;
        unit.changeState(new JobState(unit));
        unit.isMoving = true;
        unit.action = 'Approaching Job';

        // Simulate Snatch
        const anotherUnitId = 999;
        job.assignedTo = anotherUnitId;
        unit.targetRequest = null;

        // Update logic
        unit.updateLogic(100.16, 0.16, false, []);

        expect(unit.isMoving, 'Unit should stop moving').toBe(false);
        expect(unit.state, 'State should be WanderState').toBeInstanceOf(UnitWanderState);
        expect(unit.action, 'Action should be Idle (waiting to wander)').toBe('Idle');
        expect(unit.targetRequest, 'Target request should be null').toBeNull();
    });

    it('should stop if the job is completed by someone else', () => {
        const unit = new Unit(mockScene, mockTerrain, 10, 10, 'worker');
        const job = { id: 'job1', x: 20, z: 10, type: 'build', status: 'assigned', assignedTo: unit.id };

        unit.targetRequest = job;
        unit.changeState(new JobState(unit));
        unit.isMoving = true;

        // Simulate completion by someone else
        job.status = 'completed';

        unit.updateLogic(100.16, 0.16, false, []);

        expect(unit.isMoving, 'Unit should stop moving on completion').toBe(false);
        expect(unit.state, 'State should switch back to WanderState').toBeInstanceOf(UnitWanderState);
        expect(unit.targetRequest, 'Target request should be null after completion').toBe(null);
    });
});
