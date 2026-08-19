import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ ssrBuild }) => ({
  plugins: [react()],
  ssr: {
    noExternal: ["file-saver"],
  },
  build: ssrBuild
    ? {
        outDir: "dist-server",
        emptyOutDir: true,
        rollupOptions: {
          output: {
            entryFileNames: "entry-server.js",
            chunkFileNames: "chunks/[name]-[hash].js",
            assetFileNames: "assets/[name]-[hash][extname]",
          },
        },
      }
    : undefined,
}))
