import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
    server: {
    proxy: {
      "/api": {
        target: "http://localhost:5174", // 👉 your backend, not Vite (5174 is frontend)
        changeOrigin: true,
        secure: false,
      },
      "/kisaniDidi": {
        target: "http://localhost:5174", // 👉 backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
});
