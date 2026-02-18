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

export const Levels: LevelConfig[] = [
    {
        levelId: 1,
        title: "The Beginning",
        mapWidth: 120,
        mapDepth: 120,
        initialState: {
            unitCount: 1,
            hasEnemyBase: false, // No organized enemy yet
            hasEnemyGuard: false,
            goblinCaves: 1 // Just one cave to start
        },
        generation: {
            rockHeight: 9, // High threshold -> Almost no rocks
            moistureBase: 0.55, // Dry/Plains
            treeDensity: 0.2,
            landRatio: 0.6 // Mostly land
        }
    },
    {
        levelId: 2,
        title: "Expansion",
        mapWidth: 120,
        mapDepth: 120,
        initialState: {
            unitCount: 5,
            hasEnemyBase: true, // Enemy appears
            hasEnemyGuard: false,
            goblinCaves: 3
        },
        generation: {
            rockHeight: 12, // Normal rocks
            moistureBase: 0.4, // Normal moisture
            treeDensity: 0.8,
            landRatio: 0.6 // Some water/islands
        }
    },
    {
        levelId: 3,
        title: "Warfare",
        mapWidth: 160,
        mapDepth: 160,
        initialState: {
            unitCount: 8,
            hasEnemyBase: true,
            hasEnemyGuard: true, // Guards active
            goblinCaves: 5
        },
        generation: {
            rockHeight: 10, // More rocks
            moistureBase: 0.6, // Wet/Forest
            treeDensity: 1.0,
            landRatio: 0.4 // Islands/Swamps
        }
    }
];

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
            "lifespanBase": 80,
            "lifespanVariance": 20,
            "spawnCost": 100
        }
    },
    "goblins": {
        "initialCaves": 5, // Default fallback
        "normal": {
            "hp": 50,
            "damage": 15,
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
