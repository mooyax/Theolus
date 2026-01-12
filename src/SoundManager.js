import * as THREE from 'three';

export class SoundManager {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.initialized = false;
        this.camera = null;
        this.frustum = new THREE.Frustum();
        this.projScreenMatrix = new THREE.Matrix4();
    }

    init(camera) {
        this.camera = camera;

        if (!this.context) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                this.context = new AudioContext();
                this.masterGain = this.context.createGain();
                this.masterGain.gain.value = 0.3; // Master volume
                this.masterGain.connect(this.context.destination);
                console.log("AudioContext created");
            } catch (e) {
                console.error("Web Audio API not supported", e);
                return;
            }
        }

        // Always attempt to play silent buffer to unlock iOS audio
        try {
            const buffer = this.context.createBuffer(1, 1, 22050);
            const source = this.context.createBufferSource();
            source.buffer = buffer;
            source.connect(this.context.destination);
            source.start(0);
        } catch (e) {
            console.warn("Silent buffer unlock failed", e);
        }

        // Always try to resume, covering 'suspended' and 'interrupted' states
        if (this.context.state !== 'running') {
            this.context.resume().then(() => {
                console.log("AudioContext resumed, state:", this.context.state);
                this.initialized = true;
            }).catch(e => {
                console.error("AudioContext resume failed", e);
            });
        } else {
            this.initialized = true;
        }
    }

    resumeContext() {
        if (!this.context) return;
        if (this.context.state !== 'running') {
            this.context.resume().then(() => {
                console.log("AudioContext resumed by user gesture.");
                this.initialized = true;
            });
        }
    }

    updateFrustum() {
        if (!this.camera) return;
        this.camera.updateMatrixWorld();
        this.projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
        this.frustum.setFromProjectionMatrix(this.projScreenMatrix);
    }

    isVisible(position) {
        if (!this.camera || !this.initialized) return true; // Default to true if not set up
        // We need to update frustum occasionally, but doing it every sound play is fine
        this.updateFrustum();
        return this.frustum.containsPoint(position);
    }

    getVolume() {
        if (!this.camera) return 0.5;
        // Map zoom (0.8 to 4.0) to volume (0.1 to 1.0)
        const zoom = this.camera.zoom;
        const minZoom = 0.8;
        const maxZoom = 4.0;
        const t = (zoom - minZoom) / (maxZoom - minZoom);
        return 0.1 + t * 0.9;
    }

    playBirdSound(position) {
        if (!this.initialized) return;
        if (position && !this.isVisible(position)) return;

        const vol = this.getVolume();

        // Pattern: "Kii-Kii-Kii" (3 chirps)
        const playChirp = (delay) => {
            setTimeout(() => {
                if (!this.context) return;
                const t = this.context.currentTime;

                const osc = this.context.createOscillator();
                const gain = this.context.createGain();

                osc.type = 'sine';
                // High pitch "Kii"
                const freq = 2500 + Math.random() * 200;
                osc.frequency.setValueAtTime(freq, t);
                osc.frequency.exponentialRampToValueAtTime(freq * 0.8, t + 0.1);

                osc.connect(gain);
                gain.connect(this.masterGain);

                // Sharp envelope
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(vol * 0.4, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

                osc.start(t);
                osc.stop(t + 0.15);
            }, delay);
        };

        playChirp(0);
        playChirp(200);
        playChirp(400);
    }

    playSheepSound(position) {
        if (!this.initialized) return;
        if (position && !this.isVisible(position)) return;

        const vol = this.getVolume();
        const t = this.context.currentTime;
        const duration = 0.5 + Math.random() * 0.4; // 0.5 - 0.9s

        // 1. Source: Sawtooth (Rich harmonics)
        const osc = this.context.createOscillator();
        osc.type = 'sawtooth';

        // Pitch: 220-250Hz (Tenor/Baritone range for sheep)
        const freq = 220 + Math.random() * 30;
        osc.frequency.setValueAtTime(freq, t);
        // Slight pitch drop at end (Vocal fatigue)
        osc.frequency.linearRampToValueAtTime(freq * 0.9, t + duration);

        // 2. Modulator (LFO) for Vibrato (Pitch) AND Tremolo (Volume)
        const lfo = this.context.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 6 + Math.random() * 2; // 6-8Hz (Fast waver)

        // Vibrato (Pitch Modulation)
        const vibratoGain = this.context.createGain();
        vibratoGain.gain.value = 10; // +/- 10Hz depth
        lfo.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);

        // Tremolo (Volume Modulation)
        // Signal Chain: Osc -> VCA (Tremolo) -> Filter -> Envelope -> Master

        // VCA for Tremolo
        const vca = this.context.createGain();
        vca.gain.value = 0.8; // Base gain

        // Tremolo Depth
        const amDepth = this.context.createGain();
        amDepth.gain.value = 0.2; // +/- 0.2 around 0.8 => 0.6 to 1.0 variation
        lfo.connect(amDepth);
        amDepth.connect(vca.gain);

        lfo.start(t);
        lfo.stop(t + duration);

        // 3. Formant Filter (The "aaaa" sound)
        const filter = this.context.createBiquadFilter();
        // filter.type = 'bandpass'; // Too weak/quiet
        filter.type = 'lowpass'; // Switched back to Lowpass for reliability
        filter.frequency.value = 1500; // Open up a bit
        filter.Q.value = 1.0;

        // Chain
        osc.connect(vca);
        vca.connect(filter);

        // Final Envelope
        const env = this.context.createGain();
        env.gain.setValueAtTime(0, t);
        // Lowered volume by 50% (0.6->0.3, 0.5->0.25)
        env.gain.linearRampToValueAtTime(vol * 0.3, t + 0.1);
        env.gain.linearRampToValueAtTime(vol * 0.25, t + duration * 0.6);
        env.gain.exponentialRampToValueAtTime(0.01, t + duration); // Release

        filter.connect(env);
        env.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + duration);
    }
}
