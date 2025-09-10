import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',  
    sourcemap: true,  
    minify: 'esbuild',  
    chunkSizeWarningLimit: 500,  
  },
  server: {
    port: 3483, 
  }
})
