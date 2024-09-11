import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  //Required for Shadcn UI
  //See https://ui.shadcn.com/docs/installation/vite
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client'),
    },
  },
})
