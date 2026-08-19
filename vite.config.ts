import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  ssr: {
    noExternal: ["file-saver"],
  },
  build: isSsrBuild
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
