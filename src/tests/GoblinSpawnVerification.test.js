
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Game } from '../Game';
import { Terrain } from '../Terrain';
import { GoblinManager } from '../GoblinManager';
import * as THREE from 'three';

describe('Goblin Spawn Verification', () => {
    let game;
    let terrain;
    let goblinManager;

    beforeEach(async () => {
        const scene = new THREE.Scene();
        // Use real Terrain with Land height
        // Initialize Game First
        game = new Game(undefined, undefined, true);
        window.game = game;

        // Use real Terrain with Land height
        terrain = new Terrain(scene, [], 100, 100);
        for (let x = 0; x < 100; x++) {
            for (let z = 0; z < 100; z++) {
                terrain.grid[x][z].height = 5;
            }
        }
        game.terrain = terrain;

        // Initialize GoblinManager
        goblinManager = new GoblinManager(scene, terrain, game, []);
        game.goblinManager = goblinManager;

        // Ensure caves are scanned
        goblinManager.scanForCaves();
    });

    it('should register caves present in terrain', () => {
        // Setup: Add a cave to terrain
        const cave = terrain.addBuilding('cave', 10, 10);
        expect(cave).not.toBeNull();

        // Action: Scan
        goblinManager.scanForCaves();

        // Assert
        expect(goblinManager.caves.length).toBeGreaterThan(0);
        expect(goblinManager.caves.some(c => c.gridX === 10 && c.gridZ === 10)).toBe(true);
    });

    it('should spawn goblin when population reaches threshold', () => {
        // Setup: Add cave
        const caveBuilding = terrain.addBuilding('cave', 20, 20);
        goblinManager.scanForCaves();

        const cave = goblinManager.caves.find(c => c.gridX === 20);
        expect(cave).toBeDefined();

        // Action: Increase population to threshold (10)
        caveBuilding.userData.population = 9.9;

        // One update to grow and hit 10, then checkHutSpawns is called by GoblinManager.update
        // Terrain update is needed to grow population?
        // Let's manually set it to 10.1
        caveBuilding.userData.population = 10.1;

        const initialGoblins = goblinManager.goblins.length;

        // Update GoblinManager
        // deltaTime=1.0. spawnInterval is usually 40.
        // GoblinManager should call checkHutSpawns inside update.
        goblinManager.update(1000, 1.0, true, [], []);

        // Assert
        expect(goblinManager.goblins.length).toBeGreaterThan(initialGoblins);
        // Population should be reset to 0 according to checkHutSpawns
        const updatedCaveBuilding = terrain.buildings.find(b => b.userData.gridX === 20);
        expect(updatedCaveBuilding.userData.population).toBe(0);
    });
});
