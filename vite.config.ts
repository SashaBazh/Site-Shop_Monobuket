import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Указываем базовый путь
  server: {
    port: 5173,
    allowedHosts: ['www.monobuket-mk.by', 'monobuket-mk.by']
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      '@': '/src' // Удобные алиасы, если нужны  
    }
  }
});
