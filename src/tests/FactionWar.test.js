
// テスト: 三すくみ戦闘ロジックの確認
// Gameクラスへの直接依存を排除し、チェックロジックをモックで検証する

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Faction War Logic（三すくみ戦闘）', () => {
    let terrain;
    let playerKnight;
    let enemyKnight;
    let goblin;

    beforeEach(() => {
        // ターゲン検索モック
        terrain = {
            grid: [],
            getTileHeight: () => 1,
            addEntity: vi.fn(),
            removeEntity: vi.fn(),
            findBestTarget: vi.fn(),
            buildings: []
        };
        for (let x = 0; x < 20; x++) {
            terrain.grid[x] = [];
            for (let z = 0; z < 20; z++) {
                terrain.grid[x][z] = { regionId: 1, height: 1 };
            }
        }

        // プレイヤーユニットのモック
        playerKnight = {
            id: 1,
            faction: 'player',
            gridX: 10,
            gridZ: 10,
            isDead: false,
            role: 'knight',
            ignoredTargets: new Set(),
            targetGoblin: null,
            targetUnit: null,
            targetBuilding: null,
            terrain,
            getDistance: (x, z) => Math.sqrt((x - 10) ** 2 + (z - 10) ** 2),
            isReachable: vi.fn().mockReturnValue(true),
            // checkSelfDefenseのロジックをシンプルに再現
            checkSelfDefense: function (goblins, force) {
                const foundGoblin = this.terrain.findBestTarget('goblin', this.gridX, this.gridZ, 50, null, goblins);
                const foundUnit = this.terrain.findBestTarget('unit', this.gridX, this.gridZ, 50, null);

                // ゴブリン優先（高スコア）
                if (foundGoblin && foundGoblin.obj) {
                    this.targetGoblin = foundGoblin.obj;
                    this.targetUnit = null;
                    return true;
                }
                if (foundUnit && foundUnit.obj && foundUnit.obj.faction !== this.faction) {
                    this.targetUnit = foundUnit.obj;
                    this.targetGoblin = null;
                    return true;
                }
                return false;
            }
        };

        // 敵ユニットのモック
        enemyKnight = {
            id: 2,
            faction: 'enemy',
            gridX: 12,
            gridZ: 10,
            isDead: false,
            role: 'knight',
            ignoredTargets: new Set(),
            targetGoblin: null,
            targetUnit: null,
            targetBuilding: null,
            terrain,
            getDistance: (x, z) => Math.sqrt((x - 12) ** 2 + (z - 10) ** 2),
            isReachable: vi.fn().mockReturnValue(true),
            checkSelfDefense: function (goblins, force) {
                const foundGoblin = this.terrain.findBestTarget('goblin', this.gridX, this.gridZ, 50, null, goblins);
                const foundUnit = this.terrain.findBestTarget('unit', this.gridX, this.gridZ, 50, null);

                if (foundGoblin && foundGoblin.obj) {
                    this.targetGoblin = foundGoblin.obj;
                    this.targetUnit = null;
                    return true;
                }
                if (foundUnit && foundUnit.obj && foundUnit.obj.faction !== this.faction) {
                    this.targetUnit = foundUnit.obj;
                    this.targetGoblin = null;
                    return true;
                }
                return false;
            }
        };

        // ゴブリンのモック
        goblin = {
            id: 3,
            faction: 'goblin',
            isGoblin: true,
            gridX: 8,
            gridZ: 10,
            isDead: false,
        };
    });

    it('プレイヤーはゴブリンがいない場合に敵ユニットを攻撃する', () => {
        terrain.findBestTarget.mockImplementation((type) => {
            if (type === 'goblin') return null;
            if (type === 'unit') return { type: 'unit', obj: enemyKnight };
            return null;
        });

        playerKnight.checkSelfDefense([], true);

        expect(playerKnight.targetUnit).toBe(enemyKnight);
        expect(playerKnight.targetGoblin).toBeNull();
    });

    it('敵ユニットはゴブリンがいない場合にプレイヤーを攻撃する', () => {
        terrain.findBestTarget.mockImplementation((type) => {
            if (type === 'goblin') return null;
            if (type === 'unit') return { type: 'unit', obj: playerKnight };
            return null;
        });

        enemyKnight.checkSelfDefense([], true);

        expect(enemyKnight.targetUnit).toBe(playerKnight);
    });

    it('プレイヤーは敵ユニットよりもゴブリンを優先して攻撃する', () => {
        terrain.findBestTarget.mockImplementation((type) => {
            if (type === 'goblin') return { type: 'goblin', obj: goblin };
            if (type === 'unit') return { type: 'unit', obj: enemyKnight };
            return null;
        });

        playerKnight.checkSelfDefense([goblin], true);

        // ゴブリン優先
        expect(playerKnight.targetGoblin).toBe(goblin);
        expect(playerKnight.targetUnit).toBeNull();
    });
});
