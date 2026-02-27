import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import * as THREE from 'three';

describe('Wizard Fireball Verification', () => {
    let game;

    const logSafe = (msg) => {
        // Convert to ASCII-safe representation (hex for non-ASCII)
        const safe = msg.split('').map(c => {
            const code = c.charCodeAt(0);
            return code < 128 ? c : `\\u${code.toString(16).padStart(4, '0')}`;
        }).join('');
        console.log(safe);
    };

    beforeEach(() => {
        // Minimal game instance
        logSafe('[Test] Creating Game...');
        game = new Game(true);
        logSafe(`[Test] Game Created. minimalFlag: ${game.minimal}`);

        // Mock requestAnimationFrame to prevent hanging
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
    });

    it('should spawn a projectile when a wizard attacks', () => {
        logSafe('[Test] Spawning units...');
        game.gameActive = true; // MUST set this for updateProjectiles to run
        game.spawnUnit(10, 10, 'wizard');
        game.goblinManager.spawnGoblin(12, 12, 'normal');

        // Wait for one logic tick to let them initialize/register
        game.update(0.1);

        const wizard = game.units[0];
        const goblin = game.goblinManager.goblins[0];

        // Ensure wizard doesn't 1-hit kill the goblin before projectile is detected
        wizard.damage = 1;

        logSafe(`[Test] Wizard pos: ${wizard.gridX},${wizard.gridZ}, target: ${wizard.targetGoblin ? 'YES' : 'NO'}`);
        logSafe(`[Test] Goblin pos: ${goblin.gridX},${goblin.gridZ}, isDead: ${goblin.isDead}`);

        if (game.projectiles.length === 0) {
            logSafe('[Test] Forcing attack...');
            wizard.attackCooldown = 0;
            const success = wizard.performAttack(goblin);
            logSafe(`[Test] performAttack success: ${success}`);
        }

        logSafe(`[Test] game.projectiles.length: ${game.projectiles.length}`);
        if (game.projectiles.length === 0) {
            logSafe(`[Test] Wizard state: ${wizard.state ? wizard.state.constructor.name : 'NONE'}`);
            logSafe(`[Test] Wizard target: ${wizard.targetGoblin ? 'GOBLIN' : 'NONE'}`);
            if (wizard.targetGoblin) {
                const dist = wizard.position.distanceTo(wizard.targetGoblin.position);
                logSafe(`[Test] Distance to target: ${dist}`);
            }
        }
        expect(game.projectiles.length).toBeGreaterThan(0);

        const proj = game.projectiles[0];
        expect(proj.mesh).toBeDefined();
        expect(proj.mesh.material).toBeDefined();
        // Check if color is transmitted to uniform
        const meshColor = proj.mesh.material.uniforms.uColor.value;
        const colorHex = (meshColor && typeof meshColor.getHex === 'function') ? meshColor.getHex() : 0;
        logSafe(`[Test] Projectile color hex: 0x${colorHex.toString(16)}`);
        expect(colorHex).toBe(wizard.projectileColor);
    });
});
