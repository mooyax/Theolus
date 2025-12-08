import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Use relative paths for assets so it works on GitHub Pages subdirectories
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
});
