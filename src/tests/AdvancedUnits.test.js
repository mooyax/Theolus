import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Unit } from '../Unit.js';
import { CombatState } from '../ai/states/UnitStates.js';
import { Game } from '../Game.js';
import * as THREE from 'three';

// Mock Three.js
global.THREE = THREE;
global.document = {
    createElement: () => ({ getContext: () => ({ fillRect: () => { }, fillStyle: '' }) })
};

describe('Advanced Units', () => {
    let mockScene;
    let mockTerrain;
    let mockGame;

    beforeEach(() => {
        mockScene = { add: vi.fn(), remove: vi.fn() };
        mockTerrain = {
            registerEntity: vi.fn(),
            unregisterEntity: vi.fn(),
            moveEntity: vi.fn(),
            getInterpolatedHeight: () => 0,
            logicalWidth: 100, logicalDepth: 100,
            grid: [],
            findPath: vi.fn(),
            pathfindingCalls: 0
        };

        // Mock Game Singleton for BattleMemory
        mockGame = {
            battleMemory: {
                reportRaid: vi.fn(),
                reportVictory: vi.fn(),
                getPriorities: vi.fn(() => [])
            },
            reportGlobalBattle: vi.fn(),
            projectiles: []
        };
        global.window = { game: mockGame };
    });

    it('should initialize Knight with high stats', () => {
        const knight = new Unit(mockScene, mockTerrain, 10, 10, 'knight');

        // Base HP ~30-50. Knight 10x ~300-500.
        expect(knight.hp).toBeGreaterThan(200);
        expect(knight.damage).toBeGreaterThan(50); // Base ~6 -> 60
        expect(knight.role).toBe('knight');
    });

    it('should initialize Wizard with low HP and high stats', () => {
        const wizard = new Unit(mockScene, mockTerrain, 10, 10, 'wizard');

        // Base HP ~30-50. Wizard 3.0x Buff ~90-150.
        expect(wizard.hp).toBeGreaterThan(100);
        expect(wizard.damage).toBeGreaterThan(50); // Same as Knight
        expect(wizard.role).toBe('wizard');
    });

    it('should allow Wizard to attack from range', () => {
        const wizard = new Unit(mockScene, mockTerrain, 10, 10, 'wizard');
        const goblin = {
            id: 'g1',
            gridX: 14, gridZ: 10, // Dist 4 (Range 5)
            isDead: false,
            takeDamage: vi.fn(),
            position: new THREE.Vector3(14, 0, 10)
        };

        wizard.targetGoblin = goblin;
        wizard.getDistance = () => 4.0;
        wizard.changeState(new CombatState(wizard));

        wizard.attackGoblin(goblin);

        expect(wizard.attackCooldown).toBeGreaterThan(0);
        expect(goblin.takeDamage).toHaveBeenCalled();
        expect(wizard.state).toBeInstanceOf(CombatState);
    });
});
