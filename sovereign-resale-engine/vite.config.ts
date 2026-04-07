import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 0, // 0 tells Vite to find any available port
    strictPort: false,
    host: true
  }
});
