import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as THREE from 'three';
import { Unit } from '../Unit.js';
import { Wander } from '../ai/states/UnitStates.js';
import { MockGame, MockTerrain } from './TestHelper.js';

describe('Jitabata Bug Reproduction (Interrupt Loop)', () => {
    let mockGame;
    let mockTerrain;
    let unit;

    beforeEach(() => {
        mockGame = new MockGame();
        mockTerrain = new MockTerrain(100, 100);
        mockGame.terrain = mockTerrain;
        global.window.game = mockGame;

        Unit.assets.initialized = true;

        // Create Unit at 10,10
        unit = new Unit(mockGame.scene, mockTerrain, 10, 10, 'knight');
        unit.game = mockGame;
        unit.changeState(new Wander(unit));
    });

    it('should NOT trigger Jitabata (Stop-and-Go) when a distant Raid Point appears during Migration', () => {
        const time = 1000;
        const deltaTime = 0.016;

        // 1. Manually set to Migrating (Legacy AI path)
        unit.action = 'Migrating';
        unit.migrationTarget = { x: 50, z: 50 };
        unit.isMoving = false;

        // Mock checkSelfDefense to find NOTHING locally
        vi.spyOn(unit, 'checkSelfDefense').mockImplementation(() => { });

        // Mock findRaidTarget to find a DISTANT point (e.g. 80, 80)
        vi.spyOn(unit, 'findRaidTarget').mockReturnValue(true);
        unit.targetRaidPoint = { x: 80, z: 80 };

        // Ensure we are in Migrating action
        unit.action = 'Migrating';
        unit.isMoving = true; // Pretend we were already moving
        unit.moveStartTime = time;
        unit.moveDuration = 10.0; // Plenty of time
        unit.targetGridX = 11;
        unit.targetGridZ = 10;

        // 2. Run updateLoop (Frame 1: Interruption)
        unit.updateMovement(time);
        unit.updateLogic(time, deltaTime);
        console.log(`[Test] Frame 1 Post-logic isMoving: ${unit.isMoving}, action: ${unit.action}`);

        // Frame 2: Reaction in NEW State
        unit.updateMovement(time + deltaTime);
        unit.updateLogic(time + deltaTime, deltaTime);
        console.log(`[Test] Frame 2 Post-logic isMoving: ${unit.isMoving}, action: ${unit.action}`);

        expect(unit.isMoving).toBe(true);
        expect(unit.action).toBe("Migrating");
    });
});
