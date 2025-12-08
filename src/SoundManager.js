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
        const duration = 0.6 + Math.random() * 0.4; // 0.6 - 1.0s

        // 1. Source: Sawtooth (Rich harmonics)
        const osc = this.context.createOscillator();
        osc.type = 'sawtooth';

        // Pitch: User requested higher pitch. 
        // 220Hz was too low. Trying 350Hz (closer to original but with new quality).
        const freq = 350 + Math.random() * 40;
        osc.frequency.setValueAtTime(freq, t);
        // Pitch drop at end
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, t + duration);

        // 2. Tremolo (Amplitude Modulation) - The "Bleat"
        // Sheep sound is not just pitch vibrate, it's volume stutter.
        const tremoloOsc = this.context.createOscillator();
        const tremoloGain = this.context.createGain();
        tremoloOsc.frequency.value = 7 + Math.random() * 2; // 7-9Hz
        // Tremolo depth (0.5 to 1.0)
        tremoloGain.gain.setValueAtTime(0.7, t);
        // tremoloOsc drives the gain of the signal
        // Signal Chain so far: osc -> ... -> tremoloGain (controlled by tremoloOsc)

        // Wait, standard Web Audio AM: Carrier -> GainNode -> Dest; Modulator -> GainNode.gain
        // But we want the gain to oscillate around a center volume.
        // Easiest is to put the modulator into a gain node that adds to a constant.

        // Simplified AM: 
        // Main Gain Envelope node
        const envGain = this.context.createGain();

        // Tremolo effect node
        const amGain = this.context.createGain();
        amGain.gain.value = 1.0; // Base value

        // Connect tremolo: osc(sine) -> gain (depth) -> amGain.gain
        const depth = this.context.createGain();
        depth.gain.value = 0.3; // 30% modulation depth
        tremoloOsc.connect(depth);
        depth.connect(amGain.gain);
        tremoloOsc.start(t);
        tremoloOsc.stop(t + duration);

        // 3. Filter (Formant for "Baaaa" / "Maaaa")
        // "aa" vowel has formants around 700-800Hz and 1200Hz.
        const filter = this.context.createBiquadFilter();
        filter.type = 'lowpass'; // Lowpass preserves low harmonics, cuts extreme fizz
        filter.frequency.value = 1200;
        filter.Q.value = 1.0;

        // Chain: Osc -> AM(Tremolo) -> Filter -> Envelope -> Master
        osc.connect(amGain);
        amGain.connect(filter);
        filter.connect(envGain);
        envGain.connect(this.masterGain);

        // Envelope
        envGain.gain.setValueAtTime(0, t);
        envGain.gain.linearRampToValueAtTime(vol * 0.6, t + 0.1); // Attack
        envGain.gain.linearRampToValueAtTime(vol * 0.5, t + duration * 0.6); // Sustain
        envGain.gain.exponentialRampToValueAtTime(0.01, t + duration); // Release

        osc.start(t);
        osc.stop(t + duration);
    }
}
