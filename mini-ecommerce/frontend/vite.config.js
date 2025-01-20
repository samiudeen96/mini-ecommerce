import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Your backend server
        changeOrigin: true, // Adjusts the `Host` header to match the target
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // Optionally rewrite the path
      },
    },
  },
});