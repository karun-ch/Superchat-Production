// vite.config.js
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      ...visualizer({
        filename: './dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      }),
      apply: 'build',
    },
  ],
  base: '/',
  build: {
    sourcemap: true,  // Enable source map generation
    rollupOptions: {
      output: {
        // Implement content hashing for proper cache invalidation
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        
        // Keep your manual chunks configuration option
        manualChunks: {
          // Configure manual chunk splitting here
          // 'vendor': [...],
        }
      }
    }
  },
  server: {
    headers: {
      // Cache-Control headers for development
      '*.js': {
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      '*.css': {
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      '*.woff2': {
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      '*.webp': {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  }
});