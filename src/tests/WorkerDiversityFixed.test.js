import { describe, it, expect } from 'vitest';
import { Game } from '../Game';

describe('Verification Game', () => {
    it('Game should be defined', () => {
        console.log('!!! CHECKING GAME DEFINITION !!!');
        expect(Game).toBeDefined();
        console.log('Game is defined');
    });

    it('Game.spawnUnit should be updated', () => {
        console.log('!!! CHECKING SPAWNUNIT !!!');
        expect(Game.prototype.spawnUnit).toBeDefined();
        console.log("DEBUG: spawnUnit source:");
        console.log(Game.prototype.spawnUnit.toString());
    });
});

