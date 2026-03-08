import { describe, it, expect, beforeEach } from 'vitest';
import { Terrain } from '../Terrain';
import * as THREE from 'three';

// Mock Scene
const mockScene = {
    add: () => { },
    remove: () => { }
};

describe('Port Placement Logic', () => {
    let terrain;
    const size = 80;

    beforeEach(() => {
        terrain = new Terrain(mockScene, [], size, size);
        terrain.initGrid();
    });

    it('should allow port on a shoreline (center must be water)', () => {
        // Prepare 3x3 area: (11,11) is center.
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const isCenter = (i === 1 && j === 1);
                const isLand = (i === 0); // Left column is land
                terrain.grid[10 + i][10 + j].height = isCenter ? -1.0 : (isLand ? 1.0 : -1.0);
            }
        }

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(true);

        const port = terrain.addBuilding('port', 10, 10);
        expect(port).not.toBeNull();
        expect(port.y).toBe(0.35); // Current implementation height (0.35)
    });

    it('should NOT allow port if center is land', () => {
        // Center (11,11) is land, but others are water
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const isCenter = (i === 1 && j === 1);
                terrain.grid[10 + i][10 + j].height = isCenter ? 1.0 : -1.0;
            }
        }

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(false);
    });

    it('should NOT allow port on pure land', () => {
        // Pure land 3x3
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                terrain.grid[10 + i][10 + j].height = 1.0;
            }
        }

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(false);
    });

    it('should NOT allow port on pure water', () => {
        // Pure water 3x3
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                terrain.grid[10 + i][10 + j].height = -1.0;
            }
        }

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(false);
    });

    it('should NOT allow port near a high cliff (> 2.0)', () => {
        // Shoreline with center water, but one tile being a cliff
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const isCenter = (i === 1 && j === 1);
                const isCliff = (i === 0 && j === 0);
                terrain.grid[10 + i][10 + j].height = isCliff ? 2.5 : (isCenter ? -1.0 : 1.0);
            }
        }

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(false);
    });

    it('should allow building at exactly height 2.0 (boundary check)', () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const isCenter = (i === 1 && j === 1);
                // Mix land/water, land is exactly 2.0, center is water
                terrain.grid[10 + i][10 + j].height = isCenter ? -1.0 : 2.0;
            }
        }

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(true);
    });

    it('should allow port in water if land is nearby (5x5 scan)', () => {
        // 3x3 area is all water
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                terrain.grid[10 + i][10 + j].height = -1.0;
            }
        }
        // But there is land at (9,10) - just outside the 3x3 at the left
        terrain.grid[9][10].height = 1.0;

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(true);
    });

    it('should NOT allow port in pure offshore (no land in 5x5 area)', () => {
        // Clear a larger 7x7 area to pure water
        for (let x = 8; x <= 14; x++) {
            for (let z = 8; z <= 14; z++) {
                terrain.grid[x][z].height = -1.0;
            }
        }

        const canPlace = terrain.canAddBuilding('port', 10, 10);
        expect(canPlace).toBe(false);
    });
});
