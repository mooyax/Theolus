// Basic Mocking for Node execution
global.window = {};
global.document = {
    getElementById: () => ({ style: {} }),
    createElement: () => ({ getContext: () => ({}) })
};
import { Game } from './src/Game.js';
