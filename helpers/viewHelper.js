/**
 * ViewHelper - PointLab Universal SPA View Renderer
 * Menyajikan file index.html dari public/, dist/, atau views/ dengan aman tanpa error 500.
 * Menggunakan fs.readFileSync + res.send() agar kompatibel dengan semua hosting platform
 * (Kroombox, Render, Railway, Vercel, cPanel, dll).
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache konten HTML agar tidak baca ulang file setiap request
let cachedHtml = null;
let cachedHtmlPath = null;

const FALLBACK_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PointLab</title>
</head>
<body>
  <div id="root">PointLab sedang dimuat...</div>
</body>
</html>`;

export const renderSpaView = (req, res) => {
  try {
    // Gunakan cache jika sudah pernah berhasil membaca file HTML
    if (cachedHtml) {
      return res.type('html').send(cachedHtml);
    }

    const projectRoot = path.resolve(__dirname, '..');
    const candidatePaths = [
      path.join(projectRoot, 'public', 'index.html'),
      path.join(projectRoot, 'dist', 'index.html'),
      path.join(projectRoot, 'views', 'index.html')
    ];

    for (const p of candidatePaths) {
      try {
        if (fs.existsSync(p)) {
          const html = fs.readFileSync(p, 'utf-8');
          // Cache agar request berikutnya lebih cepat
          cachedHtml = html;
          cachedHtmlPath = p;
          console.log(`✅ [ViewHelper] Berhasil memuat SPA dari: ${p}`);
          return res.type('html').send(html);
        }
      } catch (readErr) {
        console.warn(`⚠️ [ViewHelper] Gagal membaca ${p}:`, readErr.message);
      }
    }

    // Jika tidak ada file HTML yang ditemukan, gunakan fallback
    console.warn('⚠️ [ViewHelper] Tidak ditemukan index.html di public/, dist/, atau views/. Menggunakan fallback HTML.');
    return res.type('html').send(FALLBACK_HTML);
  } catch (err) {
    console.error('❌ [ViewHelper] Error fatal pada renderSpaView:', err.message);
    return res.type('html').status(200).send(FALLBACK_HTML);
  }
};

export default renderSpaView;
