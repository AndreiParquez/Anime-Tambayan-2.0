import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
        '/recommendations': {
            target: 'https://api.jackparquez1.workers.dev',
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/recommendations/, ''),
        },
    },
  },
  plugins: [react()],
})
