import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Pre-bundle quill so Vite resolves its CJS/ESM properly
    include: ['quill'],
    // Exclude react-quill – it is incompatible with React 19
    exclude: ['react-quill'],
  },
})
