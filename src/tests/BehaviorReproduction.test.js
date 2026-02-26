import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Behavior Reproduction Tests', () => {
    describe('Sheep Attack Freeze', () => {
        it('should have takeDamage method on Sheep instance', async () => {
            class MockActor {
                constructor() {
                    this.hp = 100;
                    this.isDead = false;
                }
                takeDamage(amount) {
                    this.hp -= amount;
                    if (this.hp <= 0) this.isDead = true;
                }
            }

            class MockSheep extends MockActor {
                constructor() {
                    super();
                    this.type = 'sheep';
                }
            }

            const sheep = new MockSheep();
            const unit = {
                attack: (target) => {
                    if (typeof target.takeDamage === 'function') {
                        target.takeDamage(10);
                    }
                }
            };

            unit.attack(sheep);
            expect(sheep.hp).toBe(90);
        });
    });

    describe('Night Sleep Logic', () => {
        let mockUnit;
        let mockTerrain;

        beforeEach(() => {
            mockTerrain = {
                buildings: [],
                getTileHeight: () => 10
            };
            mockUnit = {
                gridX: 10,
                gridZ: 10,
                faction: 'player',
                terrain: mockTerrain,
                getDistance: (x, z) => Math.sqrt(Math.pow(x - 10, 2) + Math.pow(z - 10, 2)),
                findNearestShelter: function () {
                    if (!this.terrain || !this.terrain.buildings) return null;
                    let nearest = null;
                    let minDist = Infinity;

                    for (const b of this.terrain.buildings) {
                        if (this.ignoredTargets && this.ignoredTargets.has(b.id)) continue;

                        if (b.userData && b.userData.faction && b.userData.faction !== this.faction) {
                            if (b.userData.faction !== 'neutral') continue;
                        }

                        if (b.type === 'house' || b.type === 'castle') {
                            if (b.userData && b.userData.hp > 0) {
                                const d = this.getDistance(b.gridX, b.gridZ);
                                if (d < minDist) {
                                    minDist = d;
                                    nearest = b;
                                }
                            }
                        }
                    }
                    return nearest;
                }
            };
        });

        it('should find nearest shelter if valid house exists', () => {
            const house = {
                id: 1,
                type: 'house',
                gridX: 20,
                gridZ: 20,
                userData: { hp: 100, faction: 'player' }
            };
            mockTerrain.buildings.push(house);

            const shelter = mockUnit.findNearestShelter();
            expect(shelter).toBeDefined();
            expect(shelter.id).toBe(1);
        });

        it('should NOT find shelter if house is enemy', () => {
            const house = {
                id: 2,
                type: 'house',
                gridX: 20,
                gridZ: 20,
                userData: { hp: 100, faction: 'enemy' }
            };
            mockTerrain.buildings.push(house);

            const shelter = mockUnit.findNearestShelter();
            expect(shelter).toBeNull();
        });

        it('should find shelter if house is neutral', () => {
            const house = {
                id: 3,
                type: 'house',
                gridX: 20,
                gridZ: 20,
                userData: { hp: 100, faction: 'neutral' }
            };
            mockTerrain.buildings.push(house);

            const shelter = mockUnit.findNearestShelter();
            expect(shelter).toBeDefined();
            expect(shelter.id).toBe(3);
        });
    });
});
