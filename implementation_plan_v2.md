# Test Failure Resolution Plan

## 1. MigrationImprovement.test.js

### Root Cause
The test `should interrupt migration if enemy found` fails because `CombatState.enter` clears `migrationTarget`, but `UnitWanderState.update` (Migration logic) executes *after* the state might have potentially changed or relies on that target. More importantly, `UnitWanderState.update` has a block (lines 176-205) that handles migration movement. If `CombatState` is entered, `actor.action` is set to `Fighting`. If it then returns to `UnitWanderState` (via `getResumeState`), it might not correctly resume migration if the target was cleared.

However, the specific failure:
`AssertionError: expected 'Fighting' to be 'Migrating'`
`AssertionError: expected null not to be null` (for migrationTarget)
Suggests that either:
1. The unit is stuck in `Fighting` and never returns to `Migrating`.
2. The interruption logic in `UnitWanderState` (lines 187-192) clears the target, but the unit doesn't actually enter `CombatState` or doesn't resume correctly.

Actually, `MigrationImprovement.test.js` line 144:
```javascript
unit.updateLogic(15.0, 1.0, false, [goblin]);
expect(unit.action).toBe('Fighting'); // PASSES
expect(unit.migrationTarget).toBeNull(); // PASSES (CombatState.enter clears it)

// 4. Goblin dies
goblin.isDead = true;
unit.updateLogic(16.0, 1.0, false, [goblin]);
// ...
expect(unit.action).toBe('Migrating'); // FAILS: result is 'Fighting' or 'Idle'
expect(unit.migrationTarget).not.toBeNull(); // FAILS: stays null
```

### Proposed Fix
Modify `CombatState.enter` to *not* clear `migrationTarget` if it's already captured in `savedResumeContext`. Or better, ensure `UnitWanderState.enter` correctly restores it from context.
Currently, `UnitWanderState.enter` (lines 35-47) *does* restore it if `resumeContext.action === 'Migrating'`.
But `CombatState.enter` (line 570) explicitly sets `this.actor.migrationTarget = null`.

Wait, if `UnitWanderState.enter` restores it, then it should be fine. Why does it fail?
Maybe `CombatState.update` doesn't exit when the goblin is dead?
`CombatState.update` calls `findNextEnemy`. If no enemy, it should transition back.

## 2. StuckReassignment.test.js

### Root Cause
`should release job if throttled and not moving for 45s` fails because `JobState.update` (line 508) checks `this.stuckTimer > 45.0`.
`stuckTimer` is only incremented if some condition is met.
In `StuckReassignment.test.js`, `isPathfindingThrottled` is set to `true`.
But where is `stuckTimer` incremented?
Looking at `UnitStates.ts` around line 508, I don't see the increment logic in the snippet. I need to find where `stuckTimer` is updated.

## 3. SafeSpawn.test.js

### Root Cause
`should NOT destroy house when spawning unit resets population to 0` fails because `Terrain.updatePopulation` (line 1891) sets `building.userData.population = 0` after spawning.
In `Terrain.update(deltaTime, ...)` (line 2007), it calls `updatePopulation`.
The test expects the house to still exist.
Wait, `BuildingDestruction.test.js` shows that a building is destroyed if `hp <= 0` AND `population <= 0` during an attack.
But `SafeSpawn` is about normal population reset.
Is there logic in `Terrain` that destroys buildings when population is 0?
Lines 1740-1748 calculate `totalHousingPop`.
I don't see any destruction logic in the `updatePopulation` loop itself *unless* `checkBuildingIntegrity` is called.

Actually, let's look at `Terrain.ts` line 1600+.
If `population` becomes 0, maybe some other logic triggers?
Or maybe the test is failing for another reason?
`AssertionError: expected undefined to be truthy` (Checking if building is still in list).

## 4. Movement.test.js

### Root Cause
`should increase Goblin Hut population and spawn goblin` fails because it expects a goblin to be spawned.
This involves `Terrain.updatePopulation` handling `goblin_hut`.
In `Terrain.ts`, `updatePopulation` has explicit handling for `house`, `barracks`, `tower`, `farm`.
I don't see `goblin_hut` in the `if/else if` chain (lines 1838-1974).
Line 2168 shows `restoreGoblinHut` exists, but the update logic might be missing it!
YES: `if (type === 'house' || type === 'barracks')` ... `else if (type === 'tower')` ... `else if (type === 'farm')`.
`goblin_hut` and `cave` are missing from the update logic! They probably relied on some other logic or it was lost.

# Action Items

1. **Fix `UnitStates.ts` (Combat/Wander transition)**: Ensure `migrationTarget` is preserved or correctly restored.
2. **Fix `UnitStates.ts` (JobState stuck logic)**: Ensure `stuckTimer` increments even when throttled.
3. **Fix `Terrain.ts` (Goblin Hut/Cave update)**: Add `goblin_hut` and `cave` to `updatePopulation`.
4. **Fix `SafeSpawn.test.js`**: Verify if house destruction is triggered incorrectly and fix it.
