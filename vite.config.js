import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Plugin to prevent Vite build failure if Kroombox injects Umami Analytics script
const ignoreUmamiPlugin = () => ({
  name: 'ignore-umami-analytics',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      return html.replace(
        /<script([^>]*src=["']\/umami-analytics\/script\.js["'][^>]*)><\/script>/gi,
        (match, attrs) => {
          if (/type=/i.test(attrs)) return match;
          return `<script type="module"${attrs}></script>`;
        }
      );
    }
  }
});

// Plugin sinkronisasi otomatis ke folder dist/ agar kompatibel 100% baik dengan
// konfigurasi Kroombox Nginx Webroot dist maupun Express public/
const syncDistPlugin = () => ({
  name: 'sync-dist-output',
  closeBundle() {
    try {
      const publicDir = path.resolve(__dirname, 'public');
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(publicDir)) {
        fs.cpSync(publicDir, distDir, { recursive: true });
      }
    } catch (err) {
      // Abaikan jika env tidak mengizinkan write ke dist
    }
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ignoreUmamiPlugin(), syncDistPlugin()],
  publicDir: 'static',
  build: {
    outDir: 'public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/api-rag': {
        target: 'https://rag.aiones.app/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-rag/, '')
      }
    }
  }
})
