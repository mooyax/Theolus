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
        +type: string ("house", "farm", "cave", "goblin_hut" など)
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
        +entityManager: EntityManager
        +playerFaction: FactionManager
        +enemyFaction: FactionManager
        +goblinManager: GoblinManager
        +worldCycle: WorldCycleManager
        +units: Unit[] (via EntityManager)
        +requestQueue: Request[]
        +update()
        +saveGame()
        +loadGame()
    }

    class EntityManager {
        +units: Unit[]
        +goblins: Goblin[]
        +fishes: Fish[]
        +sheeps: Sheep[]
        +unitMap: Map
        +register(entity)
        +remove(entity)
        +getById(id)
        +getInRadius(x, z, radius, filter)
        +clear()
    }

    class WorldCycleManager {
        +gameTime: number
        +isNight: boolean
        +season: string
        +daysPassed: number
        +update(dt)
        +getMovementMultiplier()
        +getHarvestMultiplier()
        +serialize()
        +deserialize(data)
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
        +caves: Object[]
        +spawnGoblin()
        +notifyClanActivity(data)
        +checkHutSpawns(dt)
    }

    class EnemyAI {
        +game: Game
        +update(dt)
        +manageConstruction()
    }

    %% 関係性
    Game *-- Terrain
    Game *-- EntityManager
    Game *-- FactionManager : "player & enemy"
    Game *-- GoblinManager
    Game *-- WorldCycleManager
    Game *-- EnemyAI
    FactionManager o-- Unit
    FactionManager o-- Building : "human buildings"
    EntityManager o-- Unit
    EntityManager o-- Goblin
    GoblinManager o-- Goblin : "reference"
    GoblinManager o-- Building : "manages caves & huts"
    Actor --> Terrain : reference
    Actor --> WorldCycleManager : reference (via Game)
    Building --> WorldCycleManager : reference (via Game)
```

## 設計のポイント

1.  **FactionManager の導入**: リソース（マナ、食料）、人口、建築コストの計算を派閥ごとに独立させました。
2.  **WorldCycleManager の導入**: 時間、昼夜、季節、天候の管理を独立させ、移動速度や収穫効率への環境補正を一元化しました。
3.  **Game クラスの責任分散**: グローバルなリソース管理を `FactionManager` に、環境管理を `WorldCycleManager` に委譲し、`Game` クラスの肥大化を抑制しました。
4.  **ゴブリンの管理**: ゴブリンユニットおよびゴブリンの建築物（洞窟、小屋）は `GoblinManager` によって制御されます。これらは `Building` クラスとして実装されていますが、`FactionManager` ではなく `GoblinManager` がその論理的なライフサイクル（スポーン、波の管理など）を担います。
5.  **EntityManager の導入**: エンティティ（ユニット、ゴブリン、動物）の管理を `EntityManager` に一元化しました。ID による高速検索や空間クエリの基盤を提供し、`Game` クラスや `GoblinManager` からの責務を分離しました。
6.  **後方互換性**: `Game.ts` や `GoblinManager.js` にゲッター/セッターを配置し、既存のコードやテストが `game.units` や `gm.goblins` に直接アクセスしても動作するように維持しています。
7.  **セーブデータ互換性**: エンティティの復元ロジックを `EntityManager` 経由に整理しつつ、以前のセーブデータ形式との互換性を保っています。
