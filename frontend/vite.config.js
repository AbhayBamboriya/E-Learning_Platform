import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',  // Customize the directory for static assets like images
    sourcemap: true,  // Generate source maps for easier debugging in production
    minify: 'esbuild',  // Specify the minifier, options are 'esbuild' or 'terser'
    chunkSizeWarningLimit: 500,  
  }
})
