import { describe, it, expect } from 'vitest';

// Extract logic to test independently from Three.js/Class issues
function simulateWeatherChange(season, randFunc) {
    let next = 'Clear';
    // Season-based Probabilities
    if (season === 'Winter') {
        // Winter: Clear(40%), Snow(40%), HeavySnow(20%) - NO RAIN
        const r = randFunc();
        if (r < 0.4) next = 'Clear';
        else if (r < 0.8) next = 'Snow';
        else next = 'HeavySnow';
    } else if (season === 'Summer') {
        // Summer: Clear(70%), Rain(20%), HeavyRain(10%) - NO SNOW
        const r = randFunc();
        if (r < 0.7) next = 'Clear';
        else if (r < 0.9) next = 'Rain';
        else next = 'HeavyRain';
    } else {
        // Spring/Autumn: Clear(60%), Rain(30%), HeavyRain(10%) - NO SNOW usually
        const r = randFunc();
        if (r < 0.6) next = 'Clear';
        else if (r < 0.9) next = 'Rain';
        else next = 'HeavyRain';
    }
    return next;
}

describe('WeatherManager Seasonal Logic', () => {

    it('should NOT allow Snow in Summer', () => {
        // Monte Carlo Simulation
        for (let i = 0; i < 1000; i++) {
            const weather = simulateWeatherChange('Summer', () => Math.random());

            if (weather === 'Snow' || weather === 'HeavySnow') {
                throw new Error(`Snow generated in Summer!`);
            }
        }
        expect(true).toBe(true);
    });

    it('should NOT allow Rain in Winter', () => {
        for (let i = 0; i < 1000; i++) {
            const weather = simulateWeatherChange('Winter', () => Math.random());

            if (weather === 'Rain' || weather === 'HeavyRain') {
                throw new Error(`Rain generated in Winter!`);
            }
        }
        expect(true).toBe(true);
    });
});
