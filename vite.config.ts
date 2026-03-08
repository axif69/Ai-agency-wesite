import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  // This loads local .env files if you are on your computer
  const env = loadEnv(mode, '.', '');
  
  // THE FIX: Tell Vite to grab the key from Netlify's dashboard FIRST!
  const apiKey = process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
