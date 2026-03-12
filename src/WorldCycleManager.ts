import * as THREE from 'three';

/**
 * ゲーム内の時間、昼夜サイクル、季節、および環境による補正（デバフ/バフ）を管理するクラス。
 * Game.ts から抽出され、環境ロジックを一元管理します。
 */
export class WorldCycleManager {
    private game: any;

    // 時間関連
    public gameTime: number = 8.0; // 0.0 - 24.0
    public dayNightSpeed: number = 0.05;
    public isNight: boolean = false;
    public daysPassed: number = 0;
    public prevTimeOfDay: number = 0;

    // 季節関連
    public season: string = 'Spring';
    public currentSeasonIndex: number = 0;
    public readonly SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
    public readonly SEASON_LENGTH_DAYS = 3;

    constructor(game: any) {
        this.game = game;
        this.prevTimeOfDay = this.gameTime / 24.0;
    }

    /**
     * 環境状態の更新（フレームごと）
     */
    update(deltaTime: number) {
        this.updateEnvironment(deltaTime);
        this.updateSeasons(deltaTime);
    }

    /**
     * 昼夜サイクルとライティングの更新
     */
    public updateEnvironment(deltaTime: number) {
        this.gameTime += deltaTime * (this.dayNightSpeed || 0.05);
        if (this.gameTime >= 24) {
            this.gameTime -= 24;
        }

        // 1. 太陽と月の位置計算
        const dayAngle = ((this.gameTime - 6) / 12) * Math.PI;
        const radius = 80;
        const sunX = Math.cos(dayAngle) * radius;
        const sunY = Math.sin(dayAngle) * radius;
        const sunZ = 30;

        const moonAngle = dayAngle + Math.PI;
        const moonX = Math.cos(moonAngle) * radius;
        const moonY = Math.sin(moonAngle) * radius;
        const moonZ = -30;

        // 2. 昼夜判定
        this.isNight = (this.gameTime < 6 || this.gameTime >= 18);

        // 3. カラー補完 (ビジュアル設定)
        const nightSky = new THREE.Color(0x000015);
        const dawnSky = new THREE.Color(0xFF8C5A);
        const daySky = new THREE.Color(0x87CEEB);

        const sunMorning = new THREE.Color(1.0, 0.82, 0.63);
        const sunNoon = new THREE.Color(1.0, 1.0, 0.94);
        const sunEvening = new THREE.Color(1.0, 0.55, 0.35);
        const moonColor = new THREE.Color(0xCCCCFF);

        let skyColor = daySky.clone();
        let lightColor = sunNoon.clone();
        let lightIntensity = 1.0;
        let ambientIntensity = 0.5;
        let ambientColor = new THREE.Color(0xFFFFFF);
        let targetPos = new THREE.Vector3(sunX, sunY, sunZ);

        // 遷移ロジック
        if (this.gameTime >= 4 && this.gameTime < 8) {
            // 夜明け (4:00 - 8:00)
            const t = (this.gameTime - 4) / 4;
            skyColor.copy(nightSky).lerp(dawnSky, t);
            if (t > 0.6) skyColor.lerp(daySky, (t - 0.6) * 2.5);

            lightColor.copy(moonColor).lerp(sunMorning, t);
            lightIntensity = 0.2 + t * 0.8;
            ambientIntensity = 0.2 + t * 0.4;
            ambientColor.lerp(new THREE.Color(0xFFDAB9), t);
        } else if (this.gameTime >= 8 && this.gameTime < 16) {
            // 昼 (8:00 - 16:00)
            skyColor.copy(daySky);
            if (this.gameTime < 11) {
                const t = (this.gameTime - 8) / 3;
                lightColor.copy(sunMorning).lerp(sunNoon, t);
            } else if (this.gameTime < 13) {
                lightColor.copy(sunNoon);
            } else {
                const t = (this.gameTime - 13) / 3;
                lightColor.copy(sunNoon).lerp(sunEvening, t);
            }
            lightIntensity = 1.1;
            ambientIntensity = 0.6;
        } else if (this.gameTime >= 16 && this.gameTime < 20) {
            // 夕方 (16:00 - 20:00)
            const t = (this.gameTime - 16) / 4;
            skyColor.copy(daySky).lerp(new THREE.Color(0xFF4500), t);
            if (t > 0.5) skyColor.lerp(nightSky, (t - 0.5) * 2);

            lightColor.copy(sunEvening).lerp(moonColor, t);
            lightIntensity = 1.0 - t * 0.8;
            ambientIntensity = 0.6 - t * 0.2;

            const blueShadow = new THREE.Color(0x404080);
            ambientColor.lerp(blueShadow, t);
        } else {
            // 夜 (20:00 - 4:00)
            skyColor.copy(nightSky);
            lightColor.copy(moonColor);

            const absMoonY = Math.abs(moonY);
            lightIntensity = 0.35 - (absMoonY / radius) * 0.05;

            ambientIntensity = 0.4;
            ambientColor.setHex(0x252550);
            targetPos.set(moonX, moonY, moonZ);
        }

        // 地平線下の光の反転処理 (フラット化防止)
        if (targetPos.y < 5) {
            const minY = 5.0;
            if (targetPos.y < 0) targetPos.y = Math.abs(targetPos.y) + minY;
            else targetPos.y = Math.max(minY, targetPos.y);
        }

        // Game インスタンスのコンポーネントに反映
        if (this.game.scene && this.game.scene.background instanceof THREE.Color) {
            this.game.scene.background.copy(skyColor);
        }
        if (this.game.directionalLight) {
            this.game.directionalLight.position.copy(targetPos);
            this.game.directionalLight.color.copy(lightColor);
            this.game.directionalLight.intensity = lightIntensity;
        }
        if (this.game.ambientLight) {
            this.game.ambientLight.intensity = ambientIntensity;
            this.game.ambientLight.color.copy(ambientColor).lerp(skyColor, 0.2);
        }
        if (this.game.weatherManager) {
            this.game.weatherManager.updateSkyColor(skyColor);
        }
    }

    /**
     * 季節の更新
     */
    public updateSeasons(deltaTime: number) {
        const currentTimeOfDay = (this.gameTime / 24.0);

        if (currentTimeOfDay < this.prevTimeOfDay) {
            // 日付の繰り越し
            this.daysPassed++;
            console.log(`New Day! Day ${this.daysPassed}. Season: ${this.season}`);

            if (this.daysPassed % this.SEASON_LENGTH_DAYS === 0) {
                this.currentSeasonIndex = (this.currentSeasonIndex + 1) % 4;
                const newSeason = this.SEASONS[this.currentSeasonIndex];
                this.season = newSeason;
                console.log(`Season Changed to: ${newSeason}`);

                if (this.game.terrain) this.game.terrain.setSeason(newSeason);
            }
        }
        this.prevTimeOfDay = currentTimeOfDay;

        // 地形との同期（念のため）
        if (this.game.terrain && this.game.terrain.season !== this.season) {
            this.game.terrain.setSeason(this.season);
        }
    }

    /**
     * 現在の環境による移動速度の倍率を取得
     */
    getMovementMultiplier(): number {
        let multiplier = 1.0;
        
        // 季節による影響
        if (this.season === 'Winter') multiplier *= 0.8;
        
        // 天候による影響
        if (this.game.weatherManager) {
            const weather = this.game.weatherManager.currentWeather;
            if (weather === 'Snow') multiplier *= 0.7;
            else if (weather === 'HeavySnow') multiplier *= 0.5;
            else if (weather === 'HeavyRain') multiplier *= 0.8;
            else if (weather === 'Fog') multiplier *= 0.9;
        }
        
        // 昼夜による影響
        if (this.isNight) multiplier *= 0.9;
        
        return multiplier;
    }

    /**
     * 現在の環境による収穫効率の倍率を取得
     */
    getHarvestMultiplier(): number {
        let multiplier = 1.0;
        
        // 季節による影響
        if (this.season === 'Winter') multiplier *= 0.5;
        else if (this.season === 'Autumn') multiplier *= 1.2;
        
        // 天候による影響 (大雨は作業効率を落とす)
        if (this.game.weatherManager && this.game.weatherManager.currentWeather === 'HeavyRain') {
            multiplier *= 0.8;
        }
        
        return multiplier;
    }

    serialize() {
        return {
            gameTime: this.gameTime,
            currentSeasonIndex: this.currentSeasonIndex,
            daysPassed: this.daysPassed,
            isNight: this.isNight
        };
    }

    deserialize(data: any) {
        if (!data) return;
        if (data.gameTime !== undefined) this.gameTime = data.gameTime;
        if (data.currentSeasonIndex !== undefined) {
            this.currentSeasonIndex = data.currentSeasonIndex;
            this.season = this.SEASONS[this.currentSeasonIndex];
        }
        if (data.daysPassed !== undefined) this.daysPassed = data.daysPassed;
        if (data.isNight !== undefined) this.isNight = data.isNight;
        
        this.prevTimeOfDay = this.gameTime / 24.0;
    }
}
