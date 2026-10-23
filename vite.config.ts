import { defineConfig } from 'vite';

// GitHub Pages uses a subpath; Cloudflare serves the game at the site root.
export default defineConfig(({ mode }) => ({
  base: mode === 'cloudflare' ? '/' : '/Are-you-a-cat-/',
}));
