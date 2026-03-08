export interface RequestConfig {
    baseInterval: number; // ms
    priorityMultiplier: number;
}

export interface LevelConfig {
    levelId: number;
    title: string;
    mapWidth: number; // logical
    mapDepth: number; // logical
    initialState: {
        unitCount: number; // Initial Workers
        hasEnemyBase: boolean;
        hasEnemyGuard: boolean; // Knight/Wizard at Enemy Base
        goblinCaves: number;
    };
    generation: {
        rockHeight: number; // Height threshold for rocks (higher = less rocks)
        moistureBase: number; // Base moisture (higher = more water/forest, lower = dry)
        treeDensity: number; // 0.0 - 1.0 (Multiplier)
        landRatio: number; // 0.0 - 1.0 (Approx ratio of land vs water)
    };
}

function generateLevelConfig(levelId: number): LevelConfig {
    // Phase 1: Manual Tutorial Levels (1-3)
    if (levelId === 1) {
        return {
            levelId: 1, title: "The Beginning", mapWidth: 120, mapDepth: 120,
            initialState: { unitCount: 1, hasEnemyBase: false, hasEnemyGuard: false, goblinCaves: 1 },
            generation: { rockHeight: 9, moistureBase: 0.55, treeDensity: 0.2, landRatio: 0.6 }
        };
    }
    if (levelId === 2) {
        return {
            levelId: 2, title: "Expansion", mapWidth: 120, mapDepth: 120,
            initialState: { unitCount: 5, hasEnemyBase: true, hasEnemyGuard: false, goblinCaves: 3 },
            generation: { rockHeight: 12, moistureBase: 0.4, treeDensity: 0.8, landRatio: 0.6 }
        };
    }
    if (levelId === 3) {
        return {
            levelId: 3, title: "Warfare", mapWidth: 160, mapDepth: 160,
            initialState: { unitCount: 8, hasEnemyBase: true, hasEnemyGuard: true, goblinCaves: 5 },
            generation: { rockHeight: 10, moistureBase: 0.6, treeDensity: 1.0, landRatio: 0.4 }
        };
    }

    // Phase 2: Procedural Levels (4-100)
    // Map size scales slowly up to 240 (safe) or 280 (limit)
    const mapSize = Math.min(240, 160 + Math.floor((levelId - 3) / 5) * 10);

    // Vary terrain characteristics based on level for visual variety
    const moisture = 0.4 + 0.2 * Math.sin(levelId * 0.3);
    const density = 0.4 + 0.4 * Math.abs(Math.cos(levelId * 0.21));
    const rocks = 10 + Math.sin(levelId * 0.17) * 3;

    return {
        levelId,
        title: `Level ${levelId}`,
        mapWidth: mapSize,
        mapDepth: mapSize,
        initialState: {
            unitCount: Math.min(60, 5 + Math.floor(levelId / 2)),
            hasEnemyBase: true,
            hasEnemyGuard: true,
            goblinCaves: Math.min(30, 3 + Math.floor(levelId / 4))
        },
        generation: {
            rockHeight: rocks,
            moistureBase: moisture,
            treeDensity: density,
            landRatio: 0.5 + 0.15 * Math.sin(levelId * 0.11)
        }
    };
}

export const Levels: LevelConfig[] = Array.from({ length: 100 }, (_, i) => generateLevelConfig(i + 1));

export const GameConfig = {
    "render": {
        "viewRadius": 40
    },

    "units": {
        "worker": {
            "hp": 50,
            "damage": 12,
            "attackRate": 1.0,
            "lifespanBase": 80,
            "lifespanVariance": 20,
            "spawnCost": 20,
            "specialMultiplier": {
                "hp": 1.5,
                "damage": 2.0,
                "lifespan": 4.0
            }
        },
        "knight": {
            "hpMultiplier": 20,
            "damageMultiplier": 25,
            "attackRate": 1.0,
            "lifespanBase": 80,
            "lifespanVariance": 20,
            "spawnCost": 50
        },
        "wizard": {
            "hpMultiplier": 3,
            "damage": 240,
            "attackRate": 1.0,
            "attackRange": 8.0,
            "lifespanBase": 80,
            "lifespanVariance": 20,
            "spawnCost": 100,
            "isRanged": true
        },
        "warship": {
            "hp": 10000,
            "damage": 50,
            "attackRate": 1.5,
            "attackRange": 10.0,
            "lifespanBase": 120,
            "isRanged": true,
            "isNaval": true,
            "spawnCost": 150
        }
    },
    "goblins": {
        "initialCaves": 5, // Default fallback
        "normal": {
            "hp": 50,
            "damage": 10,
            "attackRate": 1.0,
            "lifespan": 100
        },
        "hobgoblin": {
            "hp": 150,
            "damage": 30,
            "attackRate": 1.5,
            "lifespan": 150
        },
        "shaman": {
            "hp": 80,
            "damage": 35,
            "attackRate": 2.0,
            "lifespan": 120,
            "attackRange": 8.0,
            "isRanged": true
        },
        "king": {
            "hp": 1500,
            "damage": 80,
            "attackRate": 1.2,
            "attackRange": 4.0,
            "lifespan": 300
        }
    },
    "buildings": {
        "house": {
            "hp": 100,
            "capacity": 10,
            "defense": 4.0,
            "growthRate": 0.04
        },
        "farm": {
            "hp": 80,
            "capacity": 0,
            "defense": 0,
            "growthRate": 0.5
        },
        "mansion": {
            "hp": 300,
            "capacity": 10,
            "defense": 2.0,
            "growthRate": 0.02
        },
        "tower": {
            "hp": 500,
            "capacity": 300,
            "defense": 10.0,
            "growthRate": 0.1
        },
        "barracks": {
            "hp": 800,
            "capacity": 200,
            "defense": 10.0,
            "growthRate": 0.1
        },
        "castle": {
            "hp": 2000,
            "capacity": 50,
            "defense": 2.0,
            "growthRate": 0.05
        },
        "port": {
            "hp": 1200,
            "capacity": 20,
            "defense": 5.0,
            "growthRate": 0.02,
            "type": "coastal"
        },
        "cave": {
            "hp": 200,
            "capacity": 20,
            "growthRate": 0.08
        },
        "goblin_hut": {
            "hp": 100,
            "capacity": 10,
            "growthRate": 0.08
        }
    },
    "economy": {
        "food": {
            "consumptionRate": 0.005,
            "hunterAmount": 3.0,
            "fisherAmount": 1.0,
            "maxFish": 300,
            "fishSpawnChance": 0.05,
            "farmBaseYield": 4,
            "farmBaseGrowth": 10
        },
        "growth": {
            "baseRate": 0.05,
            "varietyMultipliers": [
                1.0,
                2.5,
                5.0
            ]
        }
    }
} as const; // Read-only config

export type GameConfigType = typeof GameConfig;
