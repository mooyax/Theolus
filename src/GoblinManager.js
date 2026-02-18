
import * as THREE from 'three';
import { Goblin } from './Goblin.js';
import { GoblinRenderer } from './GoblinRenderer.js';
import { Raid, Combat, Wander } from './ai/states/GoblinStates.js';
console.log(`[Import Debug] Raid: ${typeof Raid}, Combat: ${typeof Combat}, Wander: ${typeof Wander}`);
import { GameConfig } from './config/GameConfig';

export class GoblinManager {
    constructor(scene, terrain, game, clippingPlanes) {
        this.scene = scene;
        this.terrain = terrain;
        this.game = game; // Renamed from particleManager for clarity
        this.goblins = [];
        this.caves = [];
        this.hutSpawnTimers = new Map(); // Map<Building, float>

        const clips = clippingPlanes || terrain.clippingPlanes || [];

        this.spawnTimer = 0;
        this.spawnInterval = 40; // Adjusted to 40s to balance with human house spawn rate
        this.plunderCount = 0; // Track successful raids
        this.MAX_GOBLINS = 20000; // InstancedMesh allows high count!
        this.clanMemory = {}; // { clanId: [ {x,z,weight,timestamp} ] }

        // Initialize Goblin Assets (Renderer handles clipping application now)
        Goblin.initAssets();

        this.caveGroup = new THREE.Group();
        this.scene.add(this.caveGroup);

        // Initialize caves
        this.generateCaves();

        // Debug: Force spawn one goblin immediately
        if (this.caves.length > 0) {
            console.log("GoblinManager: Force spawning Debug Goblin");
            this.spawnGoblinAtCave(this.caves[0]);
        }
    }

    reset() {
        console.log("Resetting GoblinManager...");
        // Clear all goblins
        for (const g of this.goblins) {
            if (g.mesh) this.scene.remove(g.mesh);
            if (g.dispose) g.dispose();
        }
        this.goblins = [];
        this.plunderCount = 0;
        this.frameCount = 0;

        // Caves are managed partly by Terrain restoration.
        // We should clear our reference list. Terrain deserialization will restore 'cave' buildings.
        // But GoblinManager needs to re-link or re-scan?
        // Actually, Terrain treats caves as buildings.
        // GoblinManager creates separate Cave meshes?
        // Line 26: this.caveGroup = new THREE.Group().
        this.caves.forEach(c => {
            if (c.mesh) this.caveGroup.remove(c.mesh);
        });
        this.caves = [];
        // Re-generate caves?
        // If loading a game, caves come from save data (Terrain).
        // GoblinManager normally generates caves in constructor.
        // We need a way to "adopt" restored caves or re-scan.
        // For now, let's just clear. If Terrain restores them, does GoblinManager know?
        // STARTUP ISSUE: Terrain restores buildings. GoblinManager needs to know about them to spawn goblins!
        // We might need a `scanForCaves` method or `registerCave` called by Terrain?
        // Current logic: generateCaves() makes new ones.
        // We need to implement scanning.
    }

    scanForCaves() {
        // Find existing caves in Terrain
        this.terrain.buildings.forEach(b => {
            if (b.userData.type === 'cave') {
                // Create visual/logic wrapper for GoblinManager
                this.registerCave(b);
            }
        });
    }

    registerCave(building) {
        // Avoid duplicates
        if (this.caves.some(c => c.gridX === building.userData.gridX && c.gridZ === building.userData.gridZ)) return;

        const cave = {
            gridX: building.userData.gridX,
            gridZ: building.userData.gridZ,
            mesh: new THREE.Group(), // Placeholder or link to building mesh?
            // Actually, GoblinManager creates its own meshes usually.
            // If Terrain handles visuals for 'cave', we don't need double visuals.
            // But code line 26 implies `caveGroup`.
            spawnCooldown: 0,
            originalHeight: building.y,
            building: building, // Link
            clanId: `clan_${building.userData.gridX}_${building.userData.gridZ} `
        };
        // Visuals? 
        // If Terrain renders cave, we don't need to add another mesh.
        // But let's keep logic compatible.
        this.caves.push(cave);
    }

    generateCaves(count = null) {
        const caveCount = count !== null ? count : ((GameConfig && GameConfig.goblins && GameConfig.goblins.initialCaves) ? GameConfig.goblins.initialCaves : 5);
        console.log(`[GoblinManager] ${caveCount}個の洞窟を生成中...`);
        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        let created = 0;
        let attempts = 0;

        console.log(`[GoblinManager] DETERMINISM: generateCaves start. rngState=${this.terrain.rngState}`);
        while (created < caveCount && attempts < 5000) {
            attempts++;
            const randW = (this.terrain.seededRandom) ? this.terrain.seededRandom() : Math.random();
            const randD = (this.terrain.seededRandom) ? this.terrain.seededRandom() : Math.random();
            const x = Math.floor(randW * logicalW);
            const z = Math.floor(randD * logicalD);
            if (attempts <= 3) console.log(`[GoblinManager] DETERMINISM: Attempt ${attempts}: Rnd(${randW.toFixed(6)}, ${randD.toFixed(6)}) -> Grid(${x}, ${z}) rngState=${this.terrain.rngState}`);

            if (this.isValidCaveSpot(x, z)) {
                if (this.createCave(x, z)) {
                    created++;
                }
            }
        }
        console.log(`[GoblinManager] 洞窟生成完了: ${created}/${caveCount} (試行回数: ${attempts})`);
    }

    isValidCaveSpot(x, z) {
        const height = this.terrain.getTileHeight(x, z);

        // グリッドが未初期化の場合はスキップ
        if (!this.terrain.grid || !this.terrain.grid[x] || !this.terrain.grid[x][z]) {
            return false;
        }

        const hasBuilding = this.terrain.grid[x][z].hasBuilding;
        if (hasBuilding) return false;

        // 高度制限のチェック (2-10)
        const isValidHeight = height >= 2 && height <= 10;
        return isValidHeight;
    }

    createCaveTexture() {
        if (this.caveTexture) return this.caveTexture;

        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        // Dark hole
        const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
        grad.addColorStop(0, '#000000');
        grad.addColorStop(0.6, '#1a1a1a');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 128, 128);

        // Add some "eyes" inside (optional scary effect)
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(50, 50, 2, 0, Math.PI * 2);
        ctx.arc(78, 50, 2, 0, Math.PI * 2);
        ctx.fill();

        this.caveTexture = new THREE.CanvasTexture(canvas);
        return this.caveTexture;
    }

    createCave(x, z) {
        const height = this.terrain.getTileHeight(x, z);

        // Cave Mesh (Final: Black Sphere)
        // Full sphere logic, Black Lambert
        const caveGeo = new THREE.SphereGeometry(0.4, 16, 16);
        const caveMat = new THREE.MeshLambertMaterial({
            color: 0x000000,
            clippingPlanes: this.terrain.clippingPlanes || []
        });
        const cave = new THREE.Mesh(caveGeo, caveMat);

        const logicalW = this.terrain.logicalWidth || 80;
        const logicalD = this.terrain.logicalDepth || 80;

        cave.position.set(
            x - logicalW / 2 + 0.5,
            height,
            z - logicalD / 2 + 0.5
        );

        cave.scale.set(1, 0.6, 1); // Slight flattening

        // VISUALS now handled by BuildingRenderer.js
        cave.visible = false;

        this.caveGroup.add(cave);

        const valid = this.terrain.addBuilding('cave', x, z, false, false, 'enemy');
        if (valid) {
            console.log(`GoblinManager: Cave registered at ${x},${z} `);
            // Link mesh to building for very strict checks
            valid.userData.linkedMesh = cave;

            const clanId = `clan_cave_${x}_${z}`; // Removed trailing space
            this.caves.push({
                mesh: cave,
                building: valid,
                gridX: x,
                gridZ: z,
                originalHeight: height,
                spawnCooldown: Math.random() * this.spawnInterval,
                clanId: clanId
            });
            // AUTO-ACTIVATE CLAN for Waves
            this.notifyClanActivity(clanId, null);
            return true;
        } else {
            console.warn(`GoblinManager: Failed to register cave at ${x},${z} (Terrain rejected)`);
            // Cleanup mesh if registration failed (though forced generation should prevent this)
            this.caveGroup.remove(cave);
            return false;
        }
    }

    update(time, deltaTime, isNight, units, buildings, timeScale = 1.0, camera) {
        // 0. Periodic Cave Scan (Ported from duplicate method)
        this.spawnTimer = (this.spawnTimer || 0) + deltaTime;
        if (this.spawnTimer > 1.0) {
            this.spawnTimer = 0;
            if (this.caves.length === 0) this.scanForCaves();
            this.scanForCaves();
        }

        // Stress Test Mode: Fast Spawn to 20k
        if (typeof window !== 'undefined' && window.location && window.location.search && window.location.search.includes('stressTest=true')) {
            if (this.goblins.length < this.MAX_GOBLINS) {
                // Spawn 500 per frame
                for (let i = 0; i < 500; i++) {
                    if (this.goblins.length >= this.MAX_GOBLINS) break;
                    if (this.caves.length > 0) {
                        const randomCave = this.caves[Math.floor(Math.random() * this.caves.length)];
                        this.spawnGoblinAtCave(randomCave);
                    }
                }
            }
        }

        // time passed is simTime (ms)

        // Spawn Goblins
        this.caves.forEach((cave, index) => {
            // Debug Log first cave position periodically
            // Debug Log first cave position periodically
            // if (index === 0 && Math.random() < 0.01 && cave.mesh && cave.mesh.position) {
            //    console.log(`[GoblinManager] Cave 0 Pos: ${cave.mesh.position.x.toFixed(2)}, ...`);
            // }

            // Check if cave is still valid
            // Scale check frequency or just run? Spawn logic is simple.
            const currentHeight = this.terrain.getTileHeight(cave.gridX, cave.gridZ);

            if (currentHeight <= 0) {
                // Destroy if submerged
                console.log(`[GoblinManager] Cave destroyed: SUBMERGED(H = ${currentHeight})`);
                this.destroyCave(cave, index);
                return;
            }

            // Sync with Terrain Building (If destroyed by Unit)
            if (cave.building) {
                const buildingExists = this.terrain.buildings.includes(cave.building);
                if (!buildingExists) {
                    console.log(`[GoblinManager] Cave destroyed: BUILDING MISSING from Terrain (Destroyed by Unit/Event).`);
                    this.destroyCave(cave, index);
                    return;
                }
                // VISUAL PERSISTENCE FIX: Sync Mesh Height with Building Height
                // Terrain.js updates building.y when modifying height.
                if (cave.mesh && cave.mesh.position && cave.mesh.position.y !== cave.building.y) {
                    cave.mesh.position.y = cave.building.y;
                }
            } else if (cave.mesh && cave.mesh.position) {
                // Fallback if no building link (legacy?)
                cave.mesh.position.y = currentHeight;
            }

            // Persistence Update: If height changes, move the cave with it
            if (cave.mesh && cave.mesh.position && Math.abs(currentHeight - cave.originalHeight) > 0.1) {
                cave.originalHeight = currentHeight;
                cave.mesh.position.y = currentHeight;
                cave.mesh.updateMatrix();
            }

            // DISABLED: Cave 自動スポーンを無効化（ユーザー要求）
            // populationベースのスポーン（checkHutSpawns経由）のみを使用
            // これにより、Cave/Hutは同じスポーンシステムになる
            /*
            cave.spawnCooldown -= deltaTime;
            if (cave.spawnCooldown <= 0) {
                // Removed hard cap of 50. Use global limit if needed.
                if (this.goblins.length < (this.MAX_GOBLINS || 20000)) {
                    this.spawnGoblinAtCave(cave);
                    cave.spawnCooldown = this.spawnInterval + Math.random() * 5;
                }
            }
            */
        });

        // WAVE SYSTEM UPDATE
        this.updateClanWaves(deltaTime);

        // 1.6 Hut Spawn Logic (checks userData.population)
        this.checkHutSpawns(deltaTime);

        // Update Goblins
        const currentBuildings = buildings || this.terrain.buildings || [];

        // Dynamic Staggering: Maintain ~30Hz-60Hz logic updates regardless of timeScale
        // Base stagger was 2.
        const stagger = Math.max(1, Math.floor(2 / timeScale));

        // CULLING LOGIC REMOVED (User Request: Lifespan handles population control)
        // if (this.goblins.length > (this.MAX_GOBLINS || 1000)) ...

        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;
        const parity = this.frameCount % stagger;

        // --- PERFORMANCE: GLOBAL SCAN BUDGET ---
        // Limit strict pathfinding/scanning ops per frame to prevent freeze at 5000+ entities
        // User Approved: scale to ~10% of population (min 100, max 1000)
        this.scanBudget = Math.min(1000, Math.max(100, Math.floor(this.goblins.length * 0.1)));

        for (let i = this.goblins.length - 1; i >= 0; i--) {
            const goblin = this.goblins[i];

            // --- SMART THROTTLING & LEVEL OF DETAIL (LOD) ---
            let throttleSkip = false;
            let timeBudget = deltaTime; // Default: just this frame's time

            if (camera) {
                const dx = goblin.position.x - camera.position.x;
                const dz = goblin.position.z - camera.position.z;
                const distSq = dx * dx + dz * dz;

                // Priority Check: Combat/Siege units ALWAYS update regularly (Simulation Integrity)
                const isUrgent = goblin.action === 'Fighting' || goblin.action === 'Sieging' || (goblin.state && (goblin.state.constructor.name === 'Combat' || goblin.state.constructor.name === 'Raid'));

                if (!isUrgent) {
                    // FIX: If total goblin count is low (< 50), disable aggressive throttling
                    // so they don't freeze when FPS drops due to high Unit count (e.g. 1500 units).
                    const lowPop = this.goblins.length < 50;

                    let interval = 0;
                    // FIX: Relaxed throttling to match Game.js unit logic (Prevents stutter)
                    // 100m+ (Very Far): throttle to ~20FPS (interval 3)
                    // <100m: Update every frame (Smooth)
                    if (distSq > 10000) interval = lowPop ? 2 : 3;
                    else if (distSq > 3600) interval = lowPop ? 1 : 1;
                    else if (distSq > 900) interval = 1; // Always smooth < 60m

                    if (interval > 0) {
                        // Throttling Active
                        if ((this.frameCount + i) % interval !== 0) {
                            throttleSkip = true;
                            // ACCUMULATE TIME (Prevent Slow Motion)
                            goblin.skippedTime = (goblin.skippedTime || 0) + deltaTime;
                        } else {
                            // Update Frame: Check Budget BEFORE releasing time
                            if (this.scanBudget > 0) {
                                this.scanBudget--;
                                // Budget OK: Release accumulated time
                                timeBudget += (goblin.skippedTime || 0);
                                goblin.skippedTime = 0;
                            } else {
                                // Budget Depleted: Skip logic this frame, accumulate more time
                                throttleSkip = true;
                                goblin.skippedTime = (goblin.skippedTime || 0) + deltaTime;
                            }
                        }
                    } else {
                        // No Interval throttling, but still check Global Budget!
                        if (this.scanBudget > 0) {
                            this.scanBudget--;
                        } else {
                            // Budget Depleted: Force throttling even if close?
                            // No, if close (<30m), we prioritize smoothness/reaction.
                            // BUT if we have 5000 goblins close by, we die.
                            // Compromise: If VERY close (<10m), ignore budget.
                            // Else, respect budget.
                            if (distSq > 100) { // > 10m
                                throttleSkip = true;
                                goblin.skippedTime = (goblin.skippedTime || 0) + deltaTime;
                            }
                        }
                    }
                }
            }

            if (throttleSkip) {
                // Completely skip Logic BUT update Visual Movement for smoothness
                if (goblin.updateMovement && !goblin.isDead) {
                    goblin.updateMovement(time);
                }

                // FIX: Sync Action Label even if logic is skipped
                if (goblin.isMoving) {
                    goblin.action = 'Moving';
                } else if (goblin.action === 'Moving') {
                    // If arrived, fallback to idle or let next logic cycle decide
                    goblin.action = 'Idle';
                }

                continue;
            }

            // --- UPDATES ---

            // 1. Logic Update (Staggered or Throttled-Batch)
            // Note: If we just unthrottled, we run logic NOW regardless of original stagger?
            // Or we respect stagger? 
            // Better to decouple throttling from legacy stagger.
            // If we are here, we are allowed to update. 
            // BUT, original logic ran 1/2 frames via parity.
            // If we throttle to 1/30, we definitely want to run logic on that 30th frame.

            try {
                if (goblin.isDead) {
                    goblin.updateDeathAnimation(timeBudget); // Use accumulated time
                } else {
                    goblin.updateLogic(time, timeBudget, isNight, units, currentBuildings);
                }

                if (goblin.updateVisuals) goblin.updateVisuals();

            } catch (e) {
                if (!this._hasLoggedError) {
                    console.error(`[GoblinManager] Error updating goblin ${i}:`, e.message);
                    this._hasLoggedError = true;
                }
            }

            if (goblin.isFinished) {
                this.goblins.splice(i, 1);
            }
        }
        // this.frameCount++; // REMOVED DOUBLE INCREMENT
    }

    // --- WAVE SYSTEM ---
    // --- WAVE SYSTEM ---
    notifyClanActivity(clanId, targetInput = null) {
        // --- NEW: Handle Attack Event Object ---
        if (clanId && typeof clanId === 'object' && clanId.type === 'UNDER_ATTACK') {
            this.respondToAttack(clanId);
            return;
        }

        if (!clanId) return;
        if (!this.clans) this.clans = {};

        let clan = this.clans[clanId];
        if (!clan) {
            clan = {
                id: clanId,
                active: false,
                waveTimer: 0,
                waveLevel: 0,
                caves: [], // Cache if needed
                raidTarget: null,
                aggression: 0.0 // Track provoke level
            };
            this.clans[clanId] = clan;
        }

        // Update Raid Target logic
        // If targetInput is provided, update clan's target logic
        if (targetInput) {
            // Target can be an object {x, z} or Entity
            let tx, tz;
            if (targetInput.gridX !== undefined) {
                tx = targetInput.gridX;
                tz = targetInput.gridZ;
            } else if (targetInput.x !== undefined) {
                tx = targetInput.x;
                tz = targetInput.z;
            }

            if (tx !== undefined && tz !== undefined) {
                // Set or Update Target
                // Maybe only update if no target, or replace old one?
                // For now: Always update to latest "noise"
                const now = window.game ? window.game.simTotalTimeSec : 0;
                clan.raidTarget = { x: tx, z: tz, timestamp: now };
            }
        }

        // If inactive, check aggression to activate!
        if (!clan.active) {
            // Increment aggression if this notification has a valid target source
            if (targetInput) {
                // User Request: Trigger only after ~3 attacks.
                clan.aggression = (clan.aggression || 0) + 1.0;
                console.log(`[GoblinManager] Clan ${clanId} Aggression: ${clan.aggression.toFixed(1)} / 3.0`);
            }

            if (clan.aggression >= 15.0) { // Increased from 3.0 (User Request)
                clan.active = true;
                clan.waveTimer = 120; // First wave in 120 seconds (Increased from 30s)
                clan.waveLevel = 1;  // Start at Level 1
                console.log(`[GoblinManager] Clan ${clanId} ACTIVATED! Wave 1 in 120s. Target:`, clan.raidTarget);
            }
        }
    }

    respondToAttack(event) {
        // event: { type: 'UNDER_ATTACK', target: Building, attacker: Unit, x, z }
        const { target, attacker, x, z } = event;
        if (!attacker || !target) return;

        // Find relevant Clan ID
        const clanId = target.userData ? target.userData.clanId : null;
        console.log(`[GoblinManager] BASE UNDER ATTACK! At ${x},${z} (Clan: ${clanId || 'Unknown'})`);

        // Notify Clan Aggression (Increase anger)
        if (clanId) {
            this.notifyClanActivity(clanId, { x, z }); // recursive but with string ID -> Increases aggression
        }

        // --- IMMEDIATE RESPONSE: Mobilize nearby defenders ---
        let mobilized = 0;
        const defenseRadius = 30.0; // Check range
        const defenseSq = defenseRadius * defenseRadius;

        for (const goblin of this.goblins) {
            if (goblin.isDead) continue;

            // Check distance to base being attacked
            const dx = goblin.gridX - x;
            const dz = goblin.gridZ - z;
            const distSq = dx * dx + dz * dz;

            if (distSq < defenseSq) {
                // Force Switch to Defend
                goblin.targetUnit = attacker;
                goblin.targetBuilding = null;

                // Visual or Logic Interrupt
                if (goblin.changeState) {
                    goblin.changeState(new Combat(goblin));
                    mobilized++;
                }
            }
        }

        if (mobilized > 0) {
            console.log(`[GoblinManager] Mobilized ${mobilized} goblins to defend base!`);
        }
    }

    // getClanRaidTarget removed (Merged with implementation below)

    updateClanWaves(deltaTime) {
        if (!this.clans) return;

        Object.values(this.clans).forEach(clan => {
            // Decay Aggression (Cooldown peace)
            if (!clan.active && clan.aggression > 0) {
                clan.aggression -= deltaTime * 0.1; // Decay 1.0 every 10 seconds.
                if (clan.aggression < 0) clan.aggression = 0;
            }

            // Fix: Deactivate Clan if aggression decayed to zero (Peace Treaty)
            // But aggression only decays if !active. So once active, we need a way to decay too?
            // User requested: "Raid state never leaves".
            // Logic: If active, we should also decay aggression (or separate "War Exhaustion")?
            // Let's allow decay logic to run even if active, but maybe slower?
            // OR: If active, we check if we should STOP being active.
            if (clan.active) {
                // Decay aggression while at war too (War Exhaustion)
                clan.aggression -= deltaTime * 0.05; // 20s per point.
                if (clan.aggression <= 0) {
                    console.log(`[GoblinManager] Clan ${clan.id} Exhausted/Pacified. Ending Raid State.`);
                    clan.active = false;
                    clan.aggression = 0;
                }
            }

            if (clan.active) {
                clan.waveTimer -= deltaTime;

                if (clan.waveTimer <= 0) {
                    this.triggerWave(clan);
                }
            }
        });
    }

    triggerWave(clan) {
        console.log(`[GoblinManager] TRIGGERING WAVE Level ${clan.waveLevel} for Clan ${clan.id}!`);

        // Find caves for this clan
        // Filter this.caves
        const clanCaves = this.caves.filter(c => c.clanId === clan.id); // Strict string match? Trim?
        // Note: clanId in cave creation includes trailing space? `clan_${x}_${z} `
        // Let's ensure matching logic is robust.

        if (clanCaves.length === 0) {
            // Trim check
            const trimmedId = clan.id.trim();
            const fallbackCaves = this.caves.filter(c => c.clanId.trim() === trimmedId);
            if (fallbackCaves.length === 0) {
                // Natural lifecycle: Cave destroyed, so clan dissolves.
                console.log(`[GoblinManager] Clan ${clan.id} has no caves remaining. Deactivating wave system.`);
                clan.active = false;
                return;
            }
            // Use fallback
            fallbackCaves.forEach(cave => this.spawnWaveAtCave(cave, clan.waveLevel));
        } else {
            clanCaves.forEach(cave => this.spawnWaveAtCave(cave, clan.waveLevel));
        }

        // MOBILIZATION: Force existing idle goblins of this clan to attack!
        this.mobilizeClan(clan);

        // Progression
        clan.waveLevel++;
        // Caps logic: Soft cap at 20? 
        if (clan.waveLevel > 20) clan.waveLevel = 20;

        // Reset Timer (Much slower Waves to give player breathing room)
        clan.waveTimer = 240; // 240s (was 150s)
    }

    spawnWaveAtCave(cave, level) {
        // Spawn 'level' number of goblins instantly (or slightly staggered)
        // Reduce spawn per wave per cave to prevent explosion
        // User requested lower spawn rate to rely on mobilization
        // Reduce spawn per wave per cave: Start at 1, max 1 in early levels, transition to max 2 later.
        // REFACTOR: Stronger Waves (User Request)
        // Level 1: 1
        // Level 5: 2
        // Level 10: 4
        // Logic: 1 + Math.floor(level / 3)
        const count = 1 + Math.floor(level / 3);

        console.log(`[Wave] Spawning ${count} goblins at cave ${cave.gridX},${cave.gridZ} (Lvl ${level})`);

        for (let i = 0; i < count; i++) {
            // Slight stagger to avoid stacking
            setTimeout(() => {
                this.spawnGoblinAtCave(cave, level, true); // ignoreCost = true
            }, i * 200);
        }
    }

    spawnGoblinAtCave(cave, difficultyLevel = 1, ignoreCost = false) {
        if (!cave) return;

        // POPULATION CHECK (New)
        // RAID OVERRIDE: If part of a Wave (difficultyLevel passed?), ignore population check?
        // spawnWaveAtCave passes 'level'. spawnGoblinAtCave uses it as 'difficultyLevel' defaulting to 1.
        // We can distinguish "Normal Spawn" vs "Wave Spawn"?
        // Actually, normal spawn calls this with no args (undefined -> 1).
        // Let's assume if called from spawnWaveAtCave, we want to force it?
        // But normal spawn also calls it.
        // Let's rely on the Population Check logic itself.
        // IF we want "Free Spawns" for Waves, we can skip consumption.

        let forceSpawn = false;
        // Hack: If difficultyLevel is explicitly high (wave logic passes level), we force it?
        // Or better, passed arguments.
        // Since I cannot change signature easily across all calls without verify,
        // let's check if the caller is the Wave loop.
        // Actually, we can just say "Waves don't care". 
        // But how do we know it is a wave?
        // We can check if `cave.spawnCooldown` is active? No.

        // Let's look at `checkHutSpawns` which calls `spawnGoblinAtCave(fakeCave)`.
        // That is the "Normal" spawn.
        // `spawnWaveAtCave` calls `spawnGoblinAtCave(cave, level)`.

        // We can infer: If cave is a "fakeCave" (from checkHutSpawns), it relies on pop.
        // If it is a real cave object from `this.caves`, it might be a wave.
        // However, checkHutSpawns constructs a fake object.

        if (cave.building && cave.building.userData) {
            const pop = cave.building.userData.population || 0;

            if (!ignoreCost) {
                // Normal Spawn: Require Population
                if (pop < 1.0) {
                    if (Math.random() < 0.05) console.log(`[GoblinManager] Cave at ${cave.gridX},${cave.gridZ} has insufficient pop: ${pop.toFixed(2)}`);
                    return;
                }

                console.log(`[GoblinManager] SPAWN START: Cave at ${cave.gridX},${cave.gridZ}, Pop: ${pop.toFixed(2)}`);
                // Consume population
                cave.building.userData.population -= 1.0;
            }
            // Else: Free spawn (ignoreCost = true)
        }

        // Validation: Verify Cave Still Exists
        if (cave.building) {
            // Check Terrain List
            if (!this.terrain.buildings.includes(cave.building)) {
                console.warn("[GoblinManager] Aborting spawn: Cave building missing");
                this.destroyCave(cave, this.caves.indexOf(cave)); // Self-heal
                return;
            }
        }
        // Check Grid Consistency
        const cell = this.terrain.grid[cave.gridX][cave.gridZ];
        if (!cell || !cell.hasBuilding) {
            console.warn("[GoblinManager] Aborting spawn: Grid cell has no building. Self-healing/Destroying Cave.");
            this.destroyCave(cave, this.caves.indexOf(cave));
            return;
        }

        let neighbors = [
            { x: 1, z: 0 }, { x: -1, z: 0 },
            { x: 0, z: 1 }, { x: 0, z: -1 }
        ];

        // Cave Fix: Visual Size is ~1.2 radius, so distance 1 (center-to-center 1.0) is inside the mesh.
        // Use Distance 2 for caves.
        if (cave.building && cave.building.userData.type === 'cave') {
            neighbors = [
                { x: 2, z: 0 }, { x: -2, z: 0 }, { x: 0, z: 2 }, { x: 0, z: -2 },
                { x: 1, z: 1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: -1, z: -1 }, // Diagonals (dist 1.41) - still might be close? Radius 1.2 covers 1.41? 
                // 1.2 is < 1.41. So diagonals are barely safe.
                { x: 2, z: 1 }, { x: 2, z: -1 }, { x: -2, z: 1 }, { x: -2, z: -1 },
                { x: 1, z: 2 }, { x: 1, z: -2 }, { x: -1, z: 2 }, { x: -1, z: -2 }
            ];
        }

        // Shuffle
        neighbors.sort(() => Math.random() - 0.5);

        for (const n of neighbors) {
            const tx = cave.gridX + n.x;
            const tz = cave.gridZ + n.z;
            const h = this.terrain.getTileHeight(tx, tz);
            if (h > 0) {
                // Get Raid Target
                const raidTarget = this.getClanRaidTarget(cave.clanId);
                this.spawnGoblin(tx, tz, cave.clanId, raidTarget, difficultyLevel);
                return;
            }
        }
        // If all blocked, spawn at cave center
        this.spawnGoblin(cave.gridX, cave.gridZ, cave.clanId, null, difficultyLevel);
    }

    spawnGoblin(x, z, clanId = null, raidTarget = null, difficultyLevel = 1) {
        const r = Math.random();
        let type = 'normal';

        // Scale probabilities with Difficulty
        // Level 1: King 1%, Shaman 4.5%, Hob 9%
        // Level 10: King 6%, Shaman 10%, Hob 20%
        const levelFactor = Math.min(difficultyLevel, 20) - 1; // 0..19

        const probKing = 0.01 + (levelFactor * 0.0025); // Max ~0.06
        const probShaman = 0.045 + (levelFactor * 0.005); // Max ~0.14
        const probHob = 0.09 + (levelFactor * 0.01); // Max ~0.3

        if (r < probKing) { // King
            type = 'king';
            console.log("👑 Goblin King Spawned!");
        } else if (r < probKing + probShaman) { // Shaman
            type = 'shaman';
        } else if (r < probKing + probShaman + probHob) { // Hobgoblin
            type = 'hobgoblin';
        }

        // Create
        const goblin = new Goblin(this.scene, this.terrain, x, z, type, clanId, raidTarget);
        this.goblins.push(goblin);

        if (this.terrain.registerEntity) {
            this.terrain.registerEntity(goblin, x, z, 'goblin');
        }

        // console.log(`Goblin spawned at ${x},${z} Type:${type} Clan:${clanId} `);
    }

    increasePlunder() {
        this.plunderCount++;
        console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount} `);
    }


    checkHutSpawns(deltaTime) {
        // PopulationベースのスポーンロジックをCave/Goblin Hut両方に適用
        // Cave自動スポーンを無効化したため、これが唯一のスポーン方法になる

        const buildings = this.terrain.buildings || [];
        buildings.forEach(b => {
            // Cave または Goblin Hut の両方を処理
            if (b.userData.type === 'goblin_hut' || b.userData.type === 'cave') {
                // Spawn Threshold: population >= 10.0 (Raised from 5.0 per User Request to reduce normal density)
                if (b.userData.population >= 10.0) {
                    // Check Global Cap
                    if (this.goblins.length >= (this.MAX_GOBLINS || 20000)) {
                        console.log(`[GoblinManager] MAX_GOBLINS reached: ${this.goblins.length}`);
                        return;
                    }

                    // Spawn
                    const clanId = b.userData.clanId || `clan_${b.userData.type}_${b.userData.gridX}_${b.userData.gridZ}`;
                    const fakeCave = { gridX: b.userData.gridX, gridZ: b.userData.gridZ, clanId: clanId, building: b };

                    // Force spawn ignoreCost=true because we manage the 10.0 deduction here
                    this.spawnGoblinAtCave(fakeCave, 1, true);

                    // Reset population to 0 (Consistent with Human Houses and tests)
                    b.userData.population = 0;
                    if (b.population !== undefined) b.population = 0;

                    console.log(`[DEBUG] Goblin born from ${b.userData.type}! Total: ${this.goblins.length}, Remaining population: ${b.userData.population.toFixed(1)}`);
                }
            }
        });
    }

    recordRaidLocation(clanId, x, z) {
        if (!clanId) return;
        if (!this.clanMemory[clanId]) this.clanMemory[clanId] = [];

        const memories = this.clanMemory[clanId];
        // Check overlap
        const existing = memories.find(m => Math.abs(m.x - x) < 5 && Math.abs(m.z - z) < 5);
        if (existing) {
            existing.weight = Math.min(existing.weight + 1, 10);
            existing.timestamp = window.game ? window.game.simTotalTimeSec : 0;
        } else {
            memories.push({
                x: x,
                z: z,
                weight: 1,
                timestamp: window.game ? window.game.simTotalTimeSec : 0
            });
        }

        // Sort by weight desc
        memories.sort((a, b) => b.weight - a.weight);
        // Limit memory size
        if (memories.length > 5) memories.length = 5;
    }

    getClanRaidTarget(clanId) {
        if (!clanId) return null;

        // 1. Try Memory (Weighted Random)
        if (this.clanMemory[clanId] && this.clanMemory[clanId].length > 0) {
            const memories = this.clanMemory[clanId];
            const totalW = memories.reduce((acc, m) => acc + m.weight, 0);
            let r = Math.random() * totalW;

            for (const m of memories) {
                r -= m.weight;
                if (r <= 0) return m;
            }
            return memories[0];
        }

        // 2. Fallback to Active Alert (Real-time target)
        if (this.clans && this.clans[clanId] && this.clans[clanId].raidTarget) {
            const rt = this.clans[clanId].raidTarget;
            // Check Expiration (60s validity?)
            const now = window.game ? window.game.simTotalTimeSec : 0;
            if (rt.timestamp && (now - rt.timestamp > 60.0)) {
                // Expired
                return null;
            }
            return rt;
        }

        return null; // No target
    }

    mobilizeClan(clan) {
        // Find a target to raid
        const target = this.getClanRaidTarget(clan.id);
        if (!target) return; // No target known

        let count = 0;
        // Iterate all goblins
        this.goblins.forEach(g => {
            const isIdle = (g.state instanceof Wander);

            if (g.clanId === clan.id && !g.isDead && isIdle) {
                // Force Raid
                g.raidGoal = { x: target.x, z: target.z };
                // Randomize slightly
                g.raidGoal.x += (Math.random() - 0.5) * 5;
                g.raidGoal.z += (Math.random() - 0.5) * 5;
                g.changeState(new Raid(g));
                count++;
            }
        });

        if (count > 0) {
            console.log(`[GoblinManager] Mobilized ${count} idle goblins from Clan ${clan.id} to raid target!`);
        }
    }

    destroyCave(cave, index) {
        console.log(`[GoblinManager] Cleaning up cave at ${cave.gridX},${cave.gridZ}`);
        // Trace stack to see who called it
        // console.trace();
        if (cave.mesh) {
            this.scene.remove(cave.mesh);
            this.caveGroup.remove(cave.mesh);
        }
        // Also remove from terrain if it's still there (e.g. submerged case)
        if (cave.building && this.terrain.buildings.includes(cave.building)) {
            this.terrain.removeBuilding(cave.building);
        }
        this.caves.splice(index, 1);
    }

    reportRaidFailure(clanId, x, z) {
        if (!clanId || !this.clanMemory[clanId]) return;

        const memories = this.clanMemory[clanId];
        const index = memories.findIndex(m => Math.abs(m.x - x) < 5 && Math.abs(m.z - z) < 5);

        if (index !== -1) {
            memories[index].weight -= 2; // Decrease weight (Failure penalty)
            console.log(`Clan ${clanId} raid failure at ${x},${z}. Weight: ${memories[index].weight}`);

            if (memories[index].weight <= 0) {
                memories.splice(index, 1);
                console.log(`Clan ${clanId} forgot raid location ${x},${z}`);
            }
        }
    }

    serialize() {
        return {
            plunderCount: this.plunderCount,
            goblins: this.goblins.filter(g => g && !g.isDead).map(g => {
                if (typeof g.serialize === 'function') {
                    const base = g.serialize();
                    // Add extra context if raiding
                    if (g.raidGoal) base.rg = { x: g.raidGoal.x, z: g.raidGoal.z, ts: g.raidGoal.timestamp };
                    if (g.targetUnit) base.tu = g.targetUnit.id;
                    if (g.targetBuilding) base.tb = { x: g.targetBuilding.gridX, z: g.targetBuilding.gridZ };
                    return base;
                } else {
                    console.warn(`Goblin ${g.id} missing serialize method! HMR issue?`);
                    // Fallback manual serialization
                    return {
                        id: g.id,
                        x: g.gridX,
                        z: g.gridZ,
                        ...(g.type !== 'normal' && { t: g.type }),
                        ...(g.hp !== g.maxHp && { h: g.hp }),
                        m: g.maxHp,
                        ...(g.clanId && { c: g.clanId }),
                        ...(g.age > 1 && { a: Math.floor(g.age) }),
                        ...(g.lifespan && { l: Math.floor(g.lifespan) }),
                        s: (g.state && g.state.constructor) ? g.state.constructor.name : 'Wander',
                        ...(g.migrationTarget && { mt: g.migrationTarget }),
                        ...(g.raidGoal && { rg: { x: g.raidGoal.x, z: g.raidGoal.z, ts: g.raidGoal.timestamp } }),
                        ...(g.targetUnit && { tu: g.targetUnit.id }),
                        ...(g.targetBuilding && { tb: { x: g.targetBuilding.gridX, z: g.targetBuilding.gridZ } })
                    };
                }
            }),
            clans: this.clans ? Object.values(this.clans).map(clan => ({
                id: clan.id,
                active: clan.active,
                waveLevel: clan.waveLevel,
                waveTimer: clan.waveTimer,
                raidTarget: clan.raidTarget,
                aggression: clan.aggression
            })) : [],
            caves: this.caves.map(c => ({
                x: c.gridX,
                z: c.gridZ,
                spawnCooldown: c.spawnCooldown,
                clanId: c.clanId
            }))
        };
    }

    deserialize(data) {
        try {
            if (!data) {
                console.warn("GoblinManager: No data to deserialize");
                return;
            }
            console.log("GoblinManager: Deserializing...");

            this.plunderCount = data.plunderCount || 0;

            // Restore Clans
            this.clans = {};
            if (data.clans) {
                data.clans.forEach(cd => {
                    this.clans[cd.id] = {
                        id: cd.id,
                        active: cd.active,
                        waveLevel: cd.waveLevel || 1,
                        waveTimer: cd.waveTimer || 150,
                        raidTarget: cd.raidTarget,
                        aggression: cd.aggression !== undefined ? cd.aggression : (cd.active ? 3.0 : 0)
                    };
                });
            }

            // Restore Caves
            this.caves = [];
            if (data.caves) {
                data.caves.forEach(cd => {
                    const building = this.terrain.getBuildingAt(cd.x, cd.z);
                    if (building && building.userData.type === 'cave') {
                        this.caves.push({
                            gridX: cd.x,
                            gridZ: cd.z,
                            mesh: new THREE.Group(),
                            spawnCooldown: cd.spawnCooldown || 0,
                            originalHeight: building.y,
                            building: building,
                            clanId: cd.clanId
                        });
                    }
                });
            }

            // Restore Goblins
            // CRITICAL FIX: Explicitly remove ALL existing goblins from Terrain (including Orphans/Ghosts)
            if (this.terrain && this.terrain.unregisterAll) {
                this.terrain.unregisterAll('goblin');
            }

            // Also clear manager array (Redundant but safe)
            if (this.goblins) {
                this.goblins.forEach(g => {
                    // Try dispose again just in case (though unregisterAll might have handled it)
                    if (typeof g.dispose === 'function') g.dispose();
                });
            }
            this.goblins = [];

            if (data.goblins && Array.isArray(data.goblins)) {
                data.goblins.forEach(gd => {
                    try {
                        // Restore Stats
                        const x = gd.x !== undefined ? gd.x : gd.gridX;
                        const z = gd.z !== undefined ? gd.z : gd.gridZ;
                        const type = gd.t || gd.type || 'normal';
                        const clanId = gd.c || gd.clanId || `clan_${x}_${z}`; // Infer clanId if missing

                        // Create Goblin
                        const goblin = new Goblin(this.scene, this.terrain, x, z, type, clanId);
                        goblin.gridX = x;
                        goblin.gridZ = z;
                        goblin.updatePosition();

                        // Specific Restore: Raid Goal
                        let raidTarget = null;
                        if (gd.rg) {
                            raidTarget = { x: gd.rg.x, z: gd.rg.z, timestamp: gd.rg.ts };
                            goblin.raidGoal = raidTarget;
                        }

                        if (raidTarget) {
                            goblin.changeState(new Raid(goblin));
                        } else {
                            goblin.changeState(new Wander(goblin));
                        }

                        goblin.id = gd.id;
                        goblin.hp = gd.h || gd.hp || goblin.maxHp; // Use default if stripped
                        goblin.maxHp = gd.m || gd.maxHp || goblin.maxHp;
                        goblin.age = gd.a || gd.age || 0;
                        goblin.lifespan = gd.l || gd.lifespan || 100;
                        // RESTORE STATE from String
                        let sName = (gd.s || gd.state || 'idle').toLowerCase();

                        // Legacy Fix for "unitWander" / "UnitWanderState" bugs
                        if (sName.includes('unitwander') || sName.includes('wander')) {
                            sName = 'idle'; // Map all wander legacy strings to default idle logic below
                        }

                        if (sName.includes('raid')) {
                            goblin.changeState(new Raid(goblin));
                        } else if (sName.includes('combat') || sName.includes('fight')) {
                            goblin.changeState(new Combat(goblin));
                        } else {
                            // Default / Idle / Wander
                            goblin.changeState(new Wander(goblin));
                        }
                        goblin.migrationTarget = gd.mt || gd.migrationTarget;
                        if (gd.scale) goblin.scale = gd.scale;

                        // Specific Restore: Raid Goal (redundant but safe for now)
                        if (gd.rg) {
                            goblin.raidGoal = { x: gd.rg.x, z: gd.rg.z, timestamp: gd.rg.ts };
                        }

                        // Late Resolve for Targets
                        if (gd.tu || gd.tb) {
                            goblin._restoredTargetUnitId = gd.tu;
                            goblin._restoredTargetBuildingPos = gd.tb;
                        }

                        this.goblins.push(goblin);
                        if (this.terrain && this.terrain.registerEntity) {
                            this.terrain.registerEntity(goblin, x, z, 'goblin');
                        }
                    } catch (innerError) {
                        console.error(`GoblinManager: Error restoring Goblin ${gd.id}:`, innerError);
                        throw innerError;
                    }
                });
                console.log(`GoblinManager: Restored ${this.goblins.length} goblins.`);

                // Resolve cross-references after all goblins are created
                this.goblins.forEach(goblin => {
                    if (goblin._restoredTargetUnitId) {
                        // Find unit by id (if possible)
                    }
                    if (goblin._restoredTargetBuildingPos) {
                        const b = this.terrain.getBuildingAt(goblin._restoredTargetBuildingPos.x, goblin._restoredTargetBuildingPos.z);
                        if (b) goblin.targetBuilding = b;
                    }
                });
            } else {
                console.warn("GoblinManager: No goblins list in save data.");
            }
        } catch (e) {
            console.error("GoblinManager Deserialize CRITICAL ERROR:", e);
            alert("Goblin Load Error: " + e.message);
        }
    }


    removeGoblin(g, index) {
        if (g.mesh) this.scene.remove(g.mesh);
        if (g.dispose) g.dispose();
        this.goblins.splice(index, 1);
        if (this.terrain && this.terrain.removeEntity) {
            this.terrain.removeEntity(g);
        }
    }

}
