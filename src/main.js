import './style.css'
import { Game } from './Game.js'

// HMR Cleanup: Dispose previous game instance to remove old event listeners
if (window.game && typeof window.game.dispose === 'function') {
    console.log("[Main] Disposing previous Game instance...");
    window.game.dispose();
}

new Game();
