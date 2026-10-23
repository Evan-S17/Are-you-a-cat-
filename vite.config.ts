import { defineConfig } from 'vite';

// The custom domain serves this app from its root, not a repository subpath.
export default defineConfig({ base: '/' });
