import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Garante que o __dirname seja resolvido corretamente no ambiente Vite (ESM)
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { 
    globals: true,
    environment: 'jsdom',
    
    // Caminho absoluto para o setupTests.js (assumindo que está na raiz de 'web/')
    setupFiles: [path.resolve(__dirname, 'setupTests.js')], 
    
    // Ignora a resolução de CSS
    css: false, 
    
    // 💡 IMPORTANTE: Ignora importações problemáticas no ambiente de teste
    // Isso pode ser a chave para o erro do @mui/material
    deps: {
      inline: ['@mui/material', '@mui/icons-material']
    }
  },
});