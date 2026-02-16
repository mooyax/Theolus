import { Unit } from '../Unit';
import { Game } from '../Game';
import * as THREE from 'three';
import { test, expect } from 'vitest';

test('Faction War Logic', () => {
    // Override console.log to ensure visibility
    const originalLog = console.log;
    console.log = (...args) => console.error(...args);

    console.error("=== Testing Faction War Logic ===");

    // Mock Setup
    const scene = new THREE.Scene();
    const terrain = {
        grid: [],
        logicalWidth: 40,
        logicalDepth: 40,
        getTileHeight: () => 1.0,
        findBestTarget: (type, gx, gz, range, costFn, list) => {
            let best = null;
            let minScore = Infinity;
            if (!list) return null;
            for (const entity of list) {
                const dx = entity.gridX - gx;
                const dz = entity.gridZ - gz;
                const dist = Math.sqrt(dx * dx + dz * dz);
                const score = costFn(entity, dist);
                if (score < minScore) {
                    minScore = score;
                    best = entity;
                }
            }
            return best;
        },
        buildings: [],
        findPathAsync: (sx, sz, tx, tz) => Promise.resolve([]) // Mock Path
    };
    for (let x = 0; x < 40; x++) {
        terrain.grid[x] = [];
        for (let z = 0; z < 40; z++) {
            terrain.grid[x][z] = { regionId: 1, height: 1.0 };
        }
    }

    const game = new Game(scene, terrain, true); // Minimal
    window.game = game;

    // 1. Setup Units
    const playerKnight = new Unit(scene, terrain, 10, 10, 'knight', false, null, 'player');
    playerKnight.id = 100;

    const enemyKnight = new Unit(scene, terrain, 10, 15, 'knight', false, null, 'enemy');
    enemyKnight.id = 200;

    game.units = [playerKnight, enemyKnight];

    // 2. Player vs Enemy
    console.error("--- Player Scan ---");
    const resultP = playerKnight.checkSelfDefense(null, true);
    console.error(`Player Result: ${resultP}, Target: ${playerKnight.targetUnit ? playerKnight.targetUnit.id : 'null'}`);

    expect(playerKnight.targetUnit, "Player should target Enemy").toBe(enemyKnight);
    expect(playerKnight.state.constructor.name).toBe('Combat');

    // 3. Enemy vs Player
    console.error("--- Enemy Scan ---");
    const resultE = enemyKnight.checkSelfDefense(null, true);
    console.error(`Enemy Result: ${resultE}, Target: ${enemyKnight.targetUnit ? enemyKnight.targetUnit.id : 'null'}`);

    expect(enemyKnight.targetUnit, "Enemy should target Player").toBe(playerKnight);
    expect(enemyKnight.state.constructor.name).toBe('Combat');

    // 4. Friendly Fire
    console.error("--- Friendly Check ---");
    const allyKnight = new Unit(scene, terrain, 10, 11, 'knight', false, null, 'player');
    game.units.push(allyKnight);

    // Reset Player
    playerKnight.targetUnit = null;
    playerKnight.state = playerKnight.getDefaultState ? playerKnight.getDefaultState() : "Wander";

    playerKnight.checkSelfDefense(null, true);
    expect(playerKnight.targetUnit).toBe(enemyKnight);
    expect(playerKnight.targetUnit).not.toBe(allyKnight);

    console.error("PASSED: Faction War Logic Verified.");

    // 5. Combat Resolution (HP Check)
    console.error("--- Combat Resolution ---");
    // Simulate Combat Update
    enemyKnight.hp = 10;
    playerKnight.damage = 10;
    playerKnight.attackRate = 0.1; // Fast check
    playerKnight.attackCooldown = 0; // Ensure ready

    // Player attacks Enemy
    console.error(`Attacking Enemy with HP ${enemyKnight.hp}. Player Dmg: ${playerKnight.damage}`);
    console.error(`Enemy takeDamage type: ${typeof enemyKnight.takeDamage}`);
    playerKnight.attackUnit(enemyKnight);

    console.error(`Enemy HP after attack: ${enemyKnight.hp}, isDead: ${enemyKnight.isDead}`);

    expect(enemyKnight.hp).toBe(0);
    expect(enemyKnight.isDead).toBe(true);

    console.error("PASSED: Combat Resolution Verified.");

    // Restore
    console.log = originalLog;
});

