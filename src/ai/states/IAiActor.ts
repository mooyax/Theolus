import * as THREE from 'three';

/**
 * Interface for any Actor that uses the UnitStates (Wander, Combat, Job, etc.)
 * This allows both Unit and Warship (and potentially others) to share the same AI logic
 * while having unique movement or interaction rules.
 */
export interface IAiActor {
    // Basic properties (Inherited from Actor/Entity via any)
    id: number | string;
    role: string;
    faction: string;
    simTime: number;
    isDead: boolean;
    isNaval: boolean;
    isMoving: boolean;
    isSleeping: boolean;
    gridX: number;
    gridZ: number;
    targetGridX: number;
    targetGridZ: number;
    stagnationTimer: number;
    stuckTimer: number;
    age: number;
    lifespan: number;
    action: string;

    // Target fields
    targetUnit?: any;
    targetGoblin?: any;
    targetBuilding?: any;
    targetRequest?: any;
    migrationTarget?: any;
    patrolTarget?: any;
    ignoredTargets: Map<string | number, number>;

    // Infrastructure
    game: any;
    terrain: any;
    state: any;

    // Optional Goblin-specific fields
    clanId?: number;
    raidGoal?: { x: number, z: number, timestamp?: number } | null;

    // Required AI Methods
    changeState(nextState: any): void;
    smartMove(tx: number, tz: number, time: number): boolean;
    getDistance(tx: number, tz: number, ox?: number, oz?: number): number;
    clearPath(): void;

    // Role-specific AI methods
    moveRandomly(time: number): void;
    findRaidTarget(): boolean;
    scanForTargets?(units?: any[], buildings?: any[]): void; // Scans for immediate combat targets
    patrol(time: number): void;
    migrate?(time: number): void; // Optional: Only for Workers
    checkSelfDefense(...args: any[]): boolean;
    attack(target: any, time?: number): boolean;
    reportEnemy(target: any): void;

    // Rendering/Visual related
    updatePosition(): void;
}
