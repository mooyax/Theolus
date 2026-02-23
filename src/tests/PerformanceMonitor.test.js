
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.unmock('../PerformanceMonitor.js');
import { PerformanceMonitor } from '../PerformanceMonitor.js';

describe('PerformanceMonitor', () => {
    let monitor;

    beforeEach(() => {
        if (typeof document !== 'undefined') {
            vi.spyOn(document, 'createElement').mockReturnValue({
                id: '',
                style: {},
                remove: vi.fn(),
                innerHTML: ''
            });
            vi.spyOn(document.body, 'appendChild').mockImplementation(() => { });
        }
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
        expect(monitor.fps).toBe(0);
        for (let i = 0; i < 60; i++) {
            monitor.measureFps();
        }
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
        for (let i = 0; i < maxLength + 50; i++) {
            monitor.fps = i;
            monitor.addToHistory();
        }
        expect(monitor.history.fps).toHaveLength(maxLength);
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
            units: [{}, {}, {}],
            goblinManager: { goblins: [{}, {}] },
            terrain: { buildings: [{}] }
        };
        monitor.enable();
        monitor.update(mockGame);
        expect(monitor.metrics.entities.units).toBe(3);
        expect(monitor.metrics.entities.goblins).toBe(2);
        expect(monitor.metrics.entities.buildings).toBe(1);
        expect(monitor.metrics.entities.total).toBe(6);
    });
});