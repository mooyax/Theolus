
/**
 * パフォーマンス測定・監視クラス
 * FPS、メモリ使用量、エンティティ数、処理時間などをリアルタイムで計測
 */
export class PerformanceMonitor {
    constructor() {
        // FPS計測
        this.fps = 0;
        this.frameCount = 0;
        this.lastFpsUpdate = performance.now();
        this.frameTimes = [];
        this.maxFrameTimeSamples = 60;

        // メモリ使用量（Chrome のみ）
        this.memoryUsage = null;

        // ゲーム内部メトリクス
        this.metrics = {
            entities: {
                units: 0,
                goblins: 0,
                buildings: 0,
                total: 0
            },
            updateTime: 0,
            renderTime: 0,
            lastUpdateDuration: 0,
            lastRenderDuration: 0
        };

        // 統計情報
        this.stats = {
            avgFps: 0,
            minFps: Infinity,
            maxFps: 0,
            avgUpdateTime: 0,
            avgRenderTime: 0
        };

        // サンプル履歴（グラフ用）
        this.history = {
            fps: [],
            updateTime: [],
            renderTime: [],
            entityCount: [],
            maxHistoryLength: 300 // 5分間分（60fps）
        };

        // UI要素
        this.overlay = null;
        this.enabled = false;

        // パフォーマンス警告しきい値
        this.thresholds = {
            lowFps: 30,
            highUpdateTime: 16.67, // 60fps の1フレーム
            highRenderTime: 16.67
        };
    }

    /**
     * パフォーマンス測定を有効化・UI作成
     */
    enable() {
        if (this.enabled) return;
        this.enabled = true;
        this.createOverlay();
        console.log('[PerformanceMonitor] Enabled');
    }

    /**
     * パフォーマンス測定を無効化
     */
    disable() {
        if (!this.enabled) return;
        this.enabled = false;
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
        console.log('[PerformanceMonitor] Disabled');
    }

    /**
     * トグル
     */
    toggle() {
        if (this.enabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    /**
     * オーバーレイUI作成
     */
    createOverlay() {
        if (typeof document === 'undefined') return;

        this.overlay = document.createElement('div');
        this.overlay.id = 'performance-monitor';
        this.overlay.style.cssText = `
            position: fixed;
            top: 200px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            min-width: 250px;
            pointer-events: none;
            user-select: none;
        `;

        document.body.appendChild(this.overlay);
    }

    /**
     * フレーム開始時刻を記録（更新処理用）
     */
    startUpdate() {
        this.updateStartTime = performance.now();
    }

    /**
     * フレーム終了時刻を記録（更新処理用）
     */
    endUpdate() {
        if (this.updateStartTime) {
            const duration = performance.now() - this.updateStartTime;
            this.metrics.lastUpdateDuration = duration;
            this.metrics.updateTime = duration;
        }
    }

    /**
     * レンダリング開始時刻を記録
     */
    startRender() {
        this.renderStartTime = performance.now();
    }

    /**
     * レンダリング終了時刻を記録
     */
    endRender() {
        if (this.renderStartTime) {
            const duration = performance.now() - this.renderStartTime;
            this.metrics.lastRenderDuration = duration;
            this.metrics.renderTime = duration;
        }
    }

    /**
     * FPS計測
     */
    measureFps() {
        this.frameCount++;
        const now = performance.now();
        const delta = now - this.lastFpsUpdate;

        if (delta >= 1000) { // 1秒ごとに更新
            this.fps = Math.round((this.frameCount * 1000) / delta);
            this.frameCount = 0;
            this.lastFpsUpdate = now;

            // 統計更新
            this.stats.minFps = Math.min(this.stats.minFps, this.fps);
            this.stats.maxFps = Math.max(this.stats.maxFps, this.fps);
        }
    }

    /**
     * エンティティ数を更新
     */
    updateEntityCount(units, goblins, buildings) {
        this.metrics.entities.units = units || 0;
        this.metrics.entities.goblins = goblins || 0;
        this.metrics.entities.buildings = buildings || 0;
        this.metrics.entities.total = this.metrics.entities.units +
            this.metrics.entities.goblins +
            this.metrics.entities.buildings;
    }

    /**
     * メモリ使用量を取得（Chrome のみ）
     */
    updateMemoryUsage() {
        if (performance.memory) {
            this.memoryUsage = {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576), // MB
                total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
            };
        }
    }

    /**
     * 履歴に追加
     */
    addToHistory() {
        const addSample = (arr, value) => {
            arr.push(value);
            if (arr.length > this.history.maxHistoryLength) {
                arr.shift();
            }
        };

        addSample(this.history.fps, this.fps);
        addSample(this.history.updateTime, this.metrics.updateTime);
        addSample(this.history.renderTime, this.metrics.renderTime);
        addSample(this.history.entityCount, this.metrics.entities.total);
    }

    /**
     * メインの更新処理
     */
    update(game) {
        if (!this.enabled) return;

        this.measureFps();
        this.updateMemoryUsage();

        // ゲームからエンティティ数を取得
        if (game) {
            const unitCount = game.units ? game.units.length : 0;
            const goblinCount = game.goblinManager && game.goblinManager.goblins ?
                game.goblinManager.goblins.length : 0;
            const buildingCount = game.terrain && game.terrain.buildings ?
                game.terrain.buildings.length : 0;

            this.updateEntityCount(unitCount, goblinCount, buildingCount);
        }

        this.addToHistory();
        this.updateOverlay();
    }

    /**
     * オーバーレイUIを更新
     */
    updateOverlay() {
        if (!this.overlay) return;

        const { entities, updateTime, renderTime } = this.metrics;
        const totalFrameTime = updateTime + renderTime;

        // 警告判定
        const fpsWarning = this.fps < this.thresholds.lowFps;
        const updateWarning = updateTime > this.thresholds.highUpdateTime;
        const renderWarning = renderTime > this.thresholds.highRenderTime;

        const fpsColor = fpsWarning ? '#ff4444' : '#00ff00';
        const updateColor = updateWarning ? '#ff4444' : '#00ff00';
        const renderColor = renderWarning ? '#ff4444' : '#00ff00';

        let html = `
            <div style="margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 5px;">
                <strong>⚡ パフォーマンス測定</strong>
            </div>
            <div style="color: ${fpsColor}">FPS: ${this.fps}</div>
            <div style="font-size: 10px; color: #888;">Min: ${this.stats.minFps} | Max: ${this.stats.maxFps}</div>
            <div style="margin-top: 8px;">
                <div style="color: ${updateColor}">更新: ${updateTime.toFixed(2)}ms</div>
                <div style="color: ${renderColor}">描画: ${renderTime.toFixed(2)}ms</div>
                <div>合計: ${totalFrameTime.toFixed(2)}ms</div>
            </div>
            <div style="margin-top: 8px; border-top: 1px solid #333; padding-top: 5px;">
                <div>エンティティ: ${entities.total}</div>
                <div style="font-size: 10px; color: #888; margin-left: 10px;">
                    • ユニット: ${entities.units}<br>
                    • ゴブリン: ${entities.goblins}<br>
                    • 建物: ${entities.buildings}
                </div>
            </div>
        `;

        if (this.memoryUsage) {
            const memPercent = ((this.memoryUsage.used / this.memoryUsage.limit) * 100).toFixed(1);
            const memColor = memPercent > 80 ? '#ff4444' : '#00ff00';
            html += `
                <div style="margin-top: 8px; border-top: 1px solid #333; padding-top: 5px;">
                    <div style="color: ${memColor}">メモリ: ${this.memoryUsage.used}MB / ${this.memoryUsage.limit}MB</div>
                    <div style="font-size: 10px; color: #888;">${memPercent}% 使用中</div>
                </div>
            `;
        }

        this.overlay.innerHTML = html;
    }

    /**
     * 統計情報を取得
     */
    getStats() {
        return {
            fps: {
                current: this.fps,
                min: this.stats.minFps,
                max: this.stats.maxFps,
                avg: this.history.fps.length > 0 ?
                    this.history.fps.reduce((a, b) => a + b, 0) / this.history.fps.length : 0
            },
            timing: {
                update: this.metrics.updateTime,
                render: this.metrics.renderTime,
                total: this.metrics.updateTime + this.metrics.renderTime
            },
            entities: { ...this.metrics.entities },
            memory: this.memoryUsage ? { ...this.memoryUsage } : null,
            history: {
                fps: [...this.history.fps],
                updateTime: [...this.history.updateTime],
                renderTime: [...this.history.renderTime],
                entityCount: [...this.history.entityCount]
            }
        };
    }

    /**
     * 統計をリセット
     */
    reset() {
        this.stats.minFps = Infinity;
        this.stats.maxFps = 0;
        this.history.fps = [];
        this.history.updateTime = [];
        this.history.renderTime = [];
        this.history.entityCount = [];
        console.log('[PerformanceMonitor] Stats reset');
    }

    /**
     * レポートをコンソールに出力
     */
    printReport() {
        const stats = this.getStats();
        console.log('=== パフォーマンスレポート ===');
        console.log(`FPS: 現在=${stats.fps.current} 最小=${stats.fps.min} 最大=${stats.fps.max} 平均=${stats.fps.avg.toFixed(1)}`);
        console.log(`処理時間: 更新=${stats.timing.update.toFixed(2)}ms 描画=${stats.timing.render.toFixed(2)}ms 合計=${stats.timing.total.toFixed(2)}ms`);
        console.log(`エンティティ: 合計=${stats.entities.total} (ユニット=${stats.entities.units}, ゴブリン=${stats.entities.goblins}, 建物=${stats.entities.buildings})`);
        if (stats.memory) {
            console.log(`メモリ: ${stats.memory.used}MB / ${stats.memory.limit}MB (${((stats.memory.used / stats.memory.limit) * 100).toFixed(1)}%)`);
        }
        console.log('===========================');
    }
}
