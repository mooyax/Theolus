# Test Failure Analysis

Total Failed Suites: 38

## 100% Failure Rate (Critical)
- **src/tests/CombatFixes.test.js** (1/1)
  - Error: `AssertionError: expected 'Fighting' to be 'Chasing' // Object.is equality`
- **src/tests/CombatVerification.test.js** (1/1)
  - Error: `AssertionError: expected false to be true // Object.is equality`
- **src/tests/DebugRegression.test.js** (1/1)
  - Error: `AssertionError: expected 'Approaching Job' not to contain 'Job'`
- **src/tests/ForceAssignment.test.js** (2/2)
  - Error: `Error: [vitest] No "Clock" export is defined on the "three" mock. Did you forget to return it from "vi.mock"?`
- **src/tests/GoblinFixes.test.js** (2/2)
  - Error: `AssertionError: expected 0.05 to be close to 0.25, received difference is 0.2, but expected 0.005`
- **src/tests/GoblinHutFix.test.js** (2/2)
  - Error: `TypeError: Cannot read properties of undefined (reading 'uniforms')`
- **src/tests/HumanSpawningSurvival.test.js** (1/1)
  - Error: `TypeError: Cannot read properties of undefined (reading 'uniforms')`
- **src/tests/InterruptResume.test.js** (2/2)
  - Error: `AssertionError: expected undefined to be defined`
- **src/tests/JitterInvestigation.test.js** (2/2)
  - Error: `AssertionError: expected true to be false // Object.is equality`
- **src/tests/JobIdempotency.test.js** (1/1)
  - Error: `RangeError: Maximum call stack size exceeded`
- **src/tests/LoadJitabata.test.js** (1/1)
  - Error: `AssertionError: Unit should NOT wander. History: Job -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander -> Wander: expected true to be false // Object.is equality`
- **src/tests/LoadUpdateLoop.test.js** (1/1)
  - Error: `Error: [vitest] No "Clock" export is defined on the "three" mock. Did you forget to return it from "vi.mock"?`
- **src/tests/PathfindingOscillation.test.js** (1/1)
  - Error: `AssertionError: expected "smartMove" to not be called at all, but actually been called 1 times[90m`
- **src/tests/RealTerrainRestoration.test.js** (1/1)
  - Error: `Error: [vitest] No "Clock" export is defined on the "three" mock. Did you forget to return it from "vi.mock"?`
- **src/tests/RefuseDistraction.test.js** (2/2)
  - Error: `RangeError: Maximum call stack size exceeded`
- **src/tests/SafeSpawn.test.js** (1/1)
  - Error: `AssertionError: expected "vi.fn()" to be called at least once`
- **src/tests/StuckReassignment.test.js** (1/1)
  - Error: `AssertionError: expected 1 to be +0 // Object.is equality`
- **src/tests/UnitSnatch.test.js** (2/2)
  - Error: `AssertionError: Unit should stop moving: expected true to be false // Object.is equality`
- **src/tests/UnitStress.test.js** (2/2)
  - Error: `ReferenceError: JobState is not defined`
- **src/tests/VisualDebug.test.js** (1/1)
  - Error: `TypeError: matrix.fromArray is not a function`

## >50% Failure Rate (Major)
- **src/tests/NightLoadJob.test.js** (2/3 - 66.7%)
  - Error: `AssertionError: expected false to be true // Object.is equality`
- **src/tests/TerrainJobReach.test.js** (2/3 - 66.7%)
  - Error: `AssertionError: expected { id: 'req_1', type: 'raise', …(5) } to be null`
- **src/tests/Hotspot.test.js** (3/6 - 50.0%)
  - Error: `AssertionError: expected "vi.fn()" to be called with arguments: [ 1, 100, 20 ][90m`
- **src/tests/NightManualWork.test.js** (2/4 - 50.0%)
  - Error: `AssertionError: expected Job{ …(6) } to be an instance of Sleep`
- **src/tests/UnitVisibility.test.js** (1/2 - 50.0%)
  - Error: `AssertionError: expected 0 to be greater than 0.1`

## <50% Failure Rate (Minor/Flaky)
- **src/tests/GoblinRaidThreshold.test.js** (2/5 - 40.0%)
- **src/tests/ManualJobRetry.test.js** (2/5 - 40.0%)
- **src/tests/EncounterCombat.test.js** (1/3 - 33.3%)
- **src/tests/GridSearchRegression.test.js** (1/3 - 33.3%)
- **src/tests/ManualPriority.test.js** (1/3 - 33.3%)
- **src/tests/Terrain.test.js** (3/9 - 33.3%)
- **src/tests/UnitPerformance.test.js** (1/3 - 33.3%)
- **src/tests/WorkerRequest.test.js** (1/3 - 33.3%)
- **src/tests/MigrationImprovement.test.js** (1/4 - 25.0%)
- **src/tests/NightMovement.test.js** (1/4 - 25.0%)
- **src/tests/TargetingPriority.test.js** (1/4 - 25.0%)
- **src/tests/ManaSystem.test.js** (1/5 - 20.0%)
- **src/tests/PerformanceMonitor.test.js** (2/12 - 16.7%)
