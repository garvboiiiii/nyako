import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // file-saver ships as CommonJS; bundling it (instead of leaving it
    // external) lets Node's ESM/CJS interop resolve `saveAs` correctly
    // during the prerender build.
    noExternal: ["file-saver"],
  },
})
