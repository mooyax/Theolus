import { describe, it, expect, beforeEach } from 'vitest';
import { PerformanceMonitor } from '../PerformanceMonitor.js';

describe('PerformanceMonitor', () => {
    let monitor;

    beforeEach(() => {
        monitor = new PerformanceMonitor();
    });

    it('should initialize with correct default values', () => {
        expect(monitor.fps).toBe(0);
        expect(monitor.enabled).toBe(false);
        expect(monitor.metrics.entities.total).toBe(0);
    });

    it('should enable and disable correctly', () => {
        expect(monitor.enabled).toBe(false);

        monitor.enable();
        expect(monitor.enabled).toBe(true);

        monitor.disable();
        expect(monitor.enabled).toBe(false);
    });

    it('should toggle state', () => {
        expect(monitor.enabled).toBe(false);

        monitor.toggle();
        expect(monitor.enabled).toBe(true);

        monitor.toggle();
        expect(monitor.enabled).toBe(false);
    });

    it('should measure update time', () => {
        monitor.startUpdate();
        // \u5c0f\u3055\u306a\u9045\u5ef6\u3092\u30b7\u30df\u30e5\u30ec\u30fc\u30c8
        const start = performance.now();
        while (performance.now() - start < 1) { /* busy wait */ }
        monitor.endUpdate();

        expect(monitor.metrics.updateTime).toBeGreaterThan(0);
        expect(monitor.metrics.lastUpdateDuration).toBeGreaterThan(0);
    });

    it('should measure render time', () => {
        monitor.startRender();
        const start = performance.now();
        while (performance.now() - start < 1) { /* busy wait */ }
        monitor.endRender();

        expect(monitor.metrics.renderTime).toBeGreaterThan(0);
        expect(monitor.metrics.lastRenderDuration).toBeGreaterThan(0);
    });

    it('should update entity counts', () => {
        monitor.updateEntityCount(10, 5, 3);

        expect(monitor.metrics.entities.units).toBe(10);
        expect(monitor.metrics.entities.goblins).toBe(5);
        expect(monitor.metrics.entities.buildings).toBe(3);
        expect(monitor.metrics.entities.total).toBe(18);
    });

    it('should measure FPS over time', () => {
        // \u521d\u671fFPS\u306f0
        expect(monitor.fps).toBe(0);

        // \u30d5\u30ec\u30fc\u30e0\u3092\u30b7\u30df\u30e5\u30ec\u30fc\u30c8
        for (let i = 0; i < 60; i++) {
            monitor.measureFps();
        }

        // 60\u30d5\u30ec\u30fc\u30e0\u5206\u6e2c\u5b9a\u3057\u305f\u304c\u30011\u79d2\u7d4c\u3063\u3066\u3044\u306a\u3044\u306e\u3067\u307e\u3060FPS\u306f\u8a08\u7b97\u3055\u308c\u306a\u3044
        // \uff08\u5b9f\u88c5\u306f1\u79d2\u3054\u3068\u306b\u66f4\u65b0\uff09
        expect(monitor.frameCount).toBeGreaterThan(0);
    });

    it('should add data to history', () => {
        monitor.fps = 60;
        monitor.metrics.updateTime = 10;
        monitor.metrics.renderTime = 5;
        monitor.metrics.entities.total = 100;

        monitor.addToHistory();

        expect(monitor.history.fps).toHaveLength(1);
        expect(monitor.history.fps[0]).toBe(60);
        expect(monitor.history.updateTime[0]).toBe(10);
        expect(monitor.history.renderTime[0]).toBe(5);
        expect(monitor.history.entityCount[0]).toBe(100);
    });

    it('should limit history length', () => {
        const maxLength = monitor.history.maxHistoryLength;

        // \u6700\u5927\u9577\u3088\u308a\u591a\u3044\u30c7\u30fc\u30bf\u3092\u8ffd\u52a0
        for (let i = 0; i < maxLength + 50; i++) {
            monitor.fps = i;
            monitor.addToHistory();
        }

        expect(monitor.history.fps).toHaveLength(maxLength);
        // \u53e4\u3044\u30c7\u30fc\u30bf\u304c\u524a\u9664\u3055\u308c\u3001\u65b0\u3057\u3044\u30c7\u30fc\u30bf\u304c\u6b8b\u308b
        expect(monitor.history.fps[monitor.history.fps.length - 1]).toBe(maxLength + 49);
    });

    it('should get stats correctly', () => {
        monitor.fps = 60;
        monitor.stats.minFps = 30;
        monitor.stats.maxFps = 75;
        monitor.metrics.updateTime = 8;
        monitor.metrics.renderTime = 5;
        monitor.metrics.entities = { units: 10, goblins: 5, buildings: 3, total: 18 };

        const stats = monitor.getStats();

        expect(stats.fps.current).toBe(60);
        expect(stats.fps.min).toBe(30);
        expect(stats.fps.max).toBe(75);
        expect(stats.timing.update).toBe(8);
        expect(stats.timing.render).toBe(5);
        expect(stats.timing.total).toBe(13);
        expect(stats.entities.total).toBe(18);
    });

    it('should reset stats', () => {
        // \u521d\u671f\u5024\u3092\u8a2d\u5b9a
        monitor.stats.minFps = 30;
        monitor.stats.maxFps = 75;
        monitor.history.fps = [60, 55, 58];

        monitor.reset();

        expect(monitor.stats.minFps).toBe(Infinity);
        expect(monitor.stats.maxFps).toBe(0);
        expect(monitor.history.fps).toHaveLength(0);
    });

    it('should update with game instance', () => {
        const mockGame = {
            units: [{}, {}, {}], // 3 units
            goblinManager: { goblins: [{}, {}] }, // 2 goblins
            terrain: { buildings: [{}] } // 1 building
        };

        monitor.enable();
        monitor.update(mockGame);

        expect(monitor.metrics.entities.units).toBe(3);
        expect(monitor.metrics.entities.goblins).toBe(2);
        expect(monitor.metrics.entities.buildings).toBe(1);
        expect(monitor.metrics.entities.total).toBe(6);
    });
});
