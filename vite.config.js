import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ignoreUmamiPlugin()],
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
