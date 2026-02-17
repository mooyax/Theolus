import * as THREE from 'three';

export type WeatherType = 'Clear' | 'Rain' | 'HeavyRain' | 'Snow' | 'HeavySnow' | 'Fog';

export class WeatherManager {
    private scene: THREE.Scene;
    private rainParticles: THREE.LineSegments | null = null;
    private heavyRainParticles: THREE.LineSegments | null = null;
    private snowParticles: THREE.Points | null = null;
    private heavySnowParticles: THREE.Points | null = null;
    private _currentWeather: WeatherType = 'Clear';
    public get currentWeather(): WeatherType { return this._currentWeather; }
    public set currentWeather(v: WeatherType) { this._currentWeather = v; }
    private clippingPlanes: THREE.Plane[];

    private rainGeometry: THREE.BufferGeometry | null = null;
    private heavyRainGeometry: THREE.BufferGeometry | null = null;
    private snowGeometry: THREE.BufferGeometry | null = null;
    private heavySnowGeometry: THREE.BufferGeometry | null = null;

    private readonly RAIN_PARTICLE_COUNT = 1500; // Even calmer
    private readonly HEAVY_RAIN_PARTICLE_COUNT = 4500; // Old "Normal Rain" level
    private readonly SNOW_PARTICLE_COUNT = 5000;
    private readonly HEAVY_SNOW_PARTICLE_COUNT = 15000;
    private readonly AREA_SIZE = 120; // Expanded from 60 to cover edges
    private readonly HEIGHT_RANGE = 40;

    constructor(scene: THREE.Scene, clippingPlanes: THREE.Plane[] = []) {
        console.log('[WeatherManager] Initializing...');
        this.scene = scene;
        this.clippingPlanes = clippingPlanes;
        this.currentWeather = 'Clear';

        // Initialize Fog (FogExp2 for realistic distance falloff)
        // Default is very light fog for 'Clear'
        this.scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

        this.initRain();
        this.initHeavyRain();
        this.initSnow();
        this.initHeavySnow();
    }

    private initRain() {
        this.rainGeometry = new THREE.BufferGeometry();
        // 2 points per raindrop to create a line segment
        const positions = new Float32Array(this.RAIN_PARTICLE_COUNT * 2 * 3);
        const speeds = new Float32Array(this.RAIN_PARTICLE_COUNT);
        const streakLength = 1.5;

        for (let i = 0; i < this.RAIN_PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * this.AREA_SIZE;
            const y = Math.random() * this.HEIGHT_RANGE;
            const z = (Math.random() - 0.5) * this.AREA_SIZE;

            const idx = i * 6;
            // Point 1 (Top)
            positions[idx] = x;
            positions[idx + 1] = y;
            positions[idx + 2] = z;
            // Point 2 (Bottom) - offset by streakLength
            positions[idx + 3] = x;
            positions[idx + 4] = y - streakLength;
            positions[idx + 5] = z;

            speeds[i] = 50 + Math.random() * 20; // 50-70 range to break periodicity
        }
        this.rainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.rainGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

        const material = new THREE.LineBasicMaterial({
            color: 0x99aabb,
            transparent: true,
            opacity: 0.25, // Calmer opacity
            depthWrite: false,
            clippingPlanes: this.clippingPlanes
        });

        this.rainParticles = new THREE.LineSegments(this.rainGeometry, material);
        this.rainParticles.visible = false;
        this.scene.add(this.rainParticles);
    }

    private initHeavyRain() {
        this.heavyRainGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.HEAVY_RAIN_PARTICLE_COUNT * 2 * 3);
        const speeds = new Float32Array(this.HEAVY_RAIN_PARTICLE_COUNT);
        const streakLength = 2.5; // Longer streaks for heavy rain

        for (let i = 0; i < this.HEAVY_RAIN_PARTICLE_COUNT; i++) {
            const x = (Math.random() - 0.5) * this.AREA_SIZE;
            const y = Math.random() * this.HEIGHT_RANGE;
            const z = (Math.random() - 0.5) * this.AREA_SIZE;

            const idx = i * 6;
            positions[idx] = x;
            positions[idx + 1] = y;
            positions[idx + 2] = z;
            positions[idx + 3] = x;
            positions[idx + 4] = y - streakLength;
            positions[idx + 5] = z;

            speeds[i] = 70 + Math.random() * 30; // Faster and more varied
        }
        this.heavyRainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.heavyRainGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

        const material = new THREE.LineBasicMaterial({
            color: 0xccddee,
            transparent: true,
            opacity: 0.4, // Lowered from 0.6
            depthWrite: false,
            clippingPlanes: this.clippingPlanes
        });

        this.heavyRainParticles = new THREE.LineSegments(this.heavyRainGeometry, material);
        this.heavyRainParticles.visible = false;
        this.scene.add(this.heavyRainParticles);
    }

    private initSnow() {
        this.snowGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.SNOW_PARTICLE_COUNT * 3);
        const velocities = new Float32Array(this.SNOW_PARTICLE_COUNT); // 個別の横揺れ用
        for (let i = 0; i < this.SNOW_PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * this.AREA_SIZE;
            positions[i * 3 + 1] = Math.random() * this.HEIGHT_RANGE;
            positions[i * 3 + 2] = (Math.random() - 0.5) * this.AREA_SIZE;
            velocities[i] = Math.random() * Math.PI * 2;
        }
        this.snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.snowGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.4, // Increased from 0.2 for better fluffiness
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            clippingPlanes: this.clippingPlanes
        });

        this.snowParticles = new THREE.Points(this.snowGeometry, material);
        this.snowParticles.visible = false;
        this.scene.add(this.snowParticles);
    }

    private initHeavySnow() {
        this.heavySnowGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.HEAVY_SNOW_PARTICLE_COUNT * 3);
        const velocities = new Float32Array(this.HEAVY_SNOW_PARTICLE_COUNT);
        for (let i = 0; i < this.HEAVY_SNOW_PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * this.AREA_SIZE;
            positions[i * 3 + 1] = Math.random() * this.HEIGHT_RANGE;
            positions[i * 3 + 2] = (Math.random() - 0.5) * this.AREA_SIZE;
            velocities[i] = Math.random() * Math.PI * 2;
        }
        this.heavySnowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.heavySnowGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.6, // Larger flakes for heavy snow
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            clippingPlanes: this.clippingPlanes
        });

        this.heavySnowParticles = new THREE.Points(this.heavySnowGeometry, material);
        this.heavySnowParticles.visible = false;
        this.scene.add(this.heavySnowParticles);
    }

    public setWeather(type: WeatherType) {
        console.log(`[WeatherManager] setWeather called with: ${type}`);
        this._currentWeather = type;

        if (this.rainParticles) this.rainParticles.visible = (type === 'Rain');
        if (this.heavyRainParticles) this.heavyRainParticles.visible = (type === 'HeavyRain');
        if (this.snowParticles) this.snowParticles.visible = (type === 'Snow');
        if (this.heavySnowParticles) this.heavySnowParticles.visible = (type === 'HeavySnow');

        // Toggle Fog visibility / density logic
        const baseDensities: Record<WeatherType, number> = {
            'Clear': 0.002,
            'Rain': 0.01,
            'HeavyRain': 0.02,
            'Snow': 0.015,
            'HeavySnow': 0.025,
            'Fog': 0.05 // Heavy fog
        };

        const baseColors: Record<WeatherType, number> = {
            'Clear': 0xcccccc,      // Light Grey
            'Rain': 0xaaddff,       // Blueish Grey
            'HeavyRain': 0x667788,  // Dark Blue Grey
            'Snow': 0xeceff1,       // White/Grey
            'HeavySnow': 0xcfd8dc,  // Grey White
            'Fog': 0xb0bec5         // Misty Grey
        };

        const targetDensity = baseDensities[type] || 0.002;
        const targetColor = baseColors[type] || 0xcccccc;

        // Add randomization: +/- 20% variance
        const variance = (Math.random() * 0.4) - 0.2; // -0.2 to +0.2
        const finalDensity = Math.max(0.001, targetDensity * (1 + variance));

        if (this.scene.fog && this.scene.fog instanceof THREE.FogExp2) {
            this.scene.fog.density = finalDensity;
            this.scene.fog.color.setHex(targetColor);
        }

        console.log(`[Weather] Set to ${type}, Density: ${finalDensity.toFixed(4)}`);
    }

    private nextWeatherChangeTime: number = 20; // First change quickly

    private changeWeather(season: string) {
        const rand = Math.random();
        let next: WeatherType = 'Clear';

        // Season-based Probabilities
        if (season === 'Winter') {
            // Winter: Clear(40%), Snow(40%), HeavySnow(20%) - NO RAIN
            if (rand < 0.4) next = 'Clear';
            else if (rand < 0.8) next = 'Snow';
            else next = 'HeavySnow';
        } else if (season === 'Summer') {
            // Summer: Clear(70%), Rain(20%), HeavyRain(10%) - NO SNOW
            if (rand < 0.7) next = 'Clear';
            else if (rand < 0.9) next = 'Rain';
            else next = 'HeavyRain';
        } else {
            // Spring/Autumn: Clear(60%), Rain(30%), HeavyRain(10%) - NO SNOW usually
            if (rand < 0.6) next = 'Clear';
            else if (rand < 0.9) next = 'Rain';
            else next = 'HeavyRain';
        }

        console.log(`[WeatherManager] changeWeather: season=${season}, next=${next}, current=${this.currentWeather}`);

        if (this.currentWeather !== next) {
            this.setWeather(next);
        }
    }

    public update(time: number, deltaTime: number, camera: THREE.Camera, currentSeason: string = 'Spring') {
        // 1. Weather Transition Logic
        if (time > this.nextWeatherChangeTime) {
            this.changeWeather(currentSeason);
            this.nextWeatherChangeTime = time + 30 + Math.random() * 90; // 30s to 2min
        }

        if (this.currentWeather === 'Clear') return;

        let target: THREE.Object3D | null = null;
        let geometry: THREE.BufferGeometry | null = null;

        switch (this.currentWeather) {
            case 'Rain': target = this.rainParticles; geometry = this.rainGeometry; break;
            case 'HeavyRain': target = this.heavyRainParticles; geometry = this.heavyRainGeometry; break;
            case 'Snow': target = this.snowParticles; geometry = this.snowGeometry; break;
            case 'HeavySnow': target = this.heavySnowParticles; geometry = this.heavySnowGeometry; break;
        }

        if (!target || !geometry) return;

        target.position.set(camera.position.x, 0, camera.position.z);

        // 中心点の最適化: カメラ位置ではなく「注視点（地面）」に合わせる
        // 注視点 P = CamPos + t * CamDir (Py = 0 となるときの P)
        const camDir = new THREE.Vector3();
        camera.getWorldDirection(camDir);
        if (camDir.y !== 0) {
            const t = -camera.position.y / camDir.y;
            const groundX = camera.position.x + camDir.x * t;
            const groundZ = camera.position.z + camDir.z * t;
            target.position.set(groundX, 0, groundZ);
        } else {
            target.position.set(camera.position.x, 0, camera.position.z);
        }

        const positions = geometry.attributes.position.array as Float32Array;

        if (this.currentWeather === 'Rain' || this.currentWeather === 'HeavyRain') {
            const streakLength = this.currentWeather === 'Rain' ? 1.5 : 2.5;
            const speeds = geometry.attributes.speed.array as Float32Array;
            const count = this.currentWeather === 'Rain' ? this.RAIN_PARTICLE_COUNT : this.HEAVY_RAIN_PARTICLE_COUNT;

            for (let i = 0; i < count; i++) {
                const idx = i * 6;
                const speed = speeds[i];
                // Update Top Point
                positions[idx + 1] -= deltaTime * speed;
                positions[idx] += deltaTime * (speed * 0.05); // Wind relative to speed

                // Sync Bottom Point
                positions[idx + 3] = positions[idx];
                positions[idx + 4] = positions[idx + 1] - streakLength;
                positions[idx + 5] = positions[idx + 2];

                if (positions[idx + 1] < 0) {
                    positions[idx + 1] = this.HEIGHT_RANGE + Math.random() * 5; // Randomized restart height
                    positions[idx] = (Math.random() - 0.5) * this.AREA_SIZE;
                    positions[idx + 2] = (Math.random() - 0.5) * this.AREA_SIZE;
                    positions[idx + 3] = positions[idx];
                    positions[idx + 4] = positions[idx + 1] - streakLength;
                    positions[idx + 5] = positions[idx + 2];
                }
            }
        } else {
            const velocities = geometry.attributes.velocity.array as Float32Array;
            const count = this.currentWeather === 'Snow' ? this.SNOW_PARTICLE_COUNT : this.HEAVY_SNOW_PARTICLE_COUNT;
            const speedBase = this.currentWeather === 'Snow' ? 2 : 5;

            for (let i = 0; i < count; i++) {
                const idx = i * 3;
                positions[idx + 1] -= deltaTime * speedBase;
                const v = velocities[i];
                positions[idx] += Math.sin(time + v) * deltaTime * (speedBase * 0.5);

                if (positions[idx + 1] < 0) {
                    positions[idx + 1] = this.HEIGHT_RANGE;
                    positions[idx] = (Math.random() - 0.5) * this.AREA_SIZE;
                    positions[idx + 2] = (Math.random() - 0.5) * this.AREA_SIZE;
                }
            }
        }
        geometry.attributes.position.needsUpdate = true;
    }
}
