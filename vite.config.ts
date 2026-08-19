import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],

  // Keep file-saver bundled into the SSR build because its package entry
  // is browser-oriented and should not be left as an external Node import.
  ssr: {
    noExternal: ['file-saver'],
  },

  // Vite 8 uses `isSsrBuild` (not the old `ssrBuild`) in ConfigEnv.
  // The CLI still explicitly selects the SSR entry with:
  // vite build --ssr src/entry-server.tsx
  build: isSsrBuild === true
    ? {
        outDir: 'dist-server',
        emptyOutDir: true,
        rollupOptions: {
          output: {
            entryFileNames: 'entry-server.js',
            chunkFileNames: 'chunks/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash][extname]',
          },
        },
      }
    : undefined,
}))
