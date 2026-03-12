# クラス設計図（FactionManager導入後）

## クラス図 (Mermaid)

```mermaid
classDiagram
    %% インターフェース
    class IAiActor {
        <<interface>>
        +moveRandomly(time)
        +findRaidTarget()
        +patrol(time)
        +reportEnemy(target)
    }

    %% エンティティ階層
    class Entity {
        +id: number
        +position: Vector3
        +gridX: number
        +gridZ: number
        +updatePosition()
        +update()
    }

    class Actor {
        +faction: string
        +hp: number
        +path: any[]
        +state: State
        +takeDamage(amount, attacker)
        +attack(target)
        +smartMove(tx, tz, time)
    }

    class Unit {
        +role: string
        +isNaval: boolean
        +die()
        +gatherResources(time)
    }

    class Goblin {
        +type: string
        +clanId: number
        +scanForTargets()
    }

    class Warship {
        +isNaval: true
        +gatherResources(time)
        +updateInvasion(dt, target)
    }

    class Building {
        +faction: string
        +_population: number
        +hp: number
        +maxHp: number
        +population(val) set/get
        +handleGrowth(dt)
        +takeDamage(amount)
    }

    %% 基底クラスからの継承
    Entity <|-- Actor
    Entity <|-- Building
    Actor <|-- Unit
    Actor <|-- Goblin
    Actor <|-- Warship

    %% インターフェースの実装
    IAiActor <|.. Unit
    IAiActor <|.. Goblin
    IAiActor <|.. Warship

    %% 新規：派閥マネージャー
    class FactionManager {
        +factionName: string
        +mana: number
        +resources: Object
        +totalPopulation: number
        +manualWorkerSpawns: number
        +getBuildingCost(type)
        +addResources(type, amt)
        +consumeMana(amt)
        +serialize()
        +deserialize(data)
    }

    %% メメインコントローラーとマネージャー
    class Game {
        +scene: Scene
        +terrain: Terrain
        +playerFaction: FactionManager
        +enemyFaction: FactionManager
        +goblinManager: GoblinManager
        +units: Unit[]
        +requestQueue: Request[]
        +update()
        +saveGame()
        +loadGame()
    }

    class Terrain {
        +grid: GridCell[][]
        +buildings: Building[]
        +getTileHeight(x, z)
        +findPathAsync(sx, sz, tx, tz)
        +updatePopulation()
    }

    class GoblinManager {
        +goblins: Goblin[]
        +spawnGoblin()
        +notifyClanActivity(data)
    }

    class EnemyAI {
        +game: Game
        +update(dt)
        +manageConstruction()
    }

    %% 関係性
    Game *-- Terrain
    Game *-- FactionManager : "player & enemy"
    Game *-- GoblinManager
    Game *-- EnemyAI
    FactionManager o-- Unit
    FactionManager o-- Building
    GoblinManager o-- Goblin
    Actor --> Terrain : reference
    Actor --> FactionManager : reference (via Game)
```

## 設計のポイント

1.  **FactionManager の導入**: リソース（マナ、食料）、人口、建築コストの計算を派閥ごとに独立させました。
2.  **Game クラスの責任分散**: グローバルなリソース管理を `FactionManager` に委譲し、`Game` クラスの肥大化を抑制しました。
3.  **後方互換性**: `Game.ts` にゲッター/セッターを配置し、既存のコードやテストが `game.mana` などにアクセスしても動作するように維持しています。
4.  **セーブデータ互換性**: 従来のセーブデータ形式を読み込んだ際、自動的に `playerFaction` へデータを移行するロジックを実装しました。
