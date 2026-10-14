/**
 * PointLab - Server Entry Point
 * Arsitektur: MVC (Model-View-Controller)
 * Mendukung deployment di Render, Railway, Vercel, cPanel, Heroku, & Hostinger.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import webRoutes from './routes/webRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { initDb } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Normalisasi URL jika terdapat duplikasi /api/api dari Frontend / Path Gateway
app.use((req, _res, next) => {
  if (req.url.startsWith('/api/api/')) {
    req.url = req.url.replace('/api/api/', '/api/');
  }
  next();
});

// Sajikan file statis dari public/ dan dist/
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// Inisialisasi koneksi Database MySQL
initDb();

// 1. Lapisan API MVC (Mendukung /api/api/*, /api/*, dan Path Gateway Kroombox)
app.use('/api/api', apiRoutes);
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

// 2. Lapisan Web Routes MVC (/dashboard, /auth, /promo, /membership, /chat, dll.)
app.use('/', webRoutes);

// 3. Health Check (H-1 requirement untuk hosting monitor)
app.get('/api/health', (req, res) => {
  return res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// 4. Fallback Route (menjamin routing SPA klien dan mencegah kebocoran HTML pada /api)
app.use((req, res) => {
  // Jika path diawali dengan /api, pastikan selalu mengembalikan JSON
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      error: 'Not Found',
      message: `Endpoint API ${req.method} ${req.originalUrl} tidak ditemukan.`
    });
  }

  // Untuk semua route lain, sajikan SPA HTML menggunakan fs.readFileSync (anti-500)
  const candidatePaths = [
    path.join(__dirname, 'public', 'index.html'),
    path.join(__dirname, 'dist', 'index.html'),
    path.join(__dirname, 'views', 'index.html')
  ];

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        const html = fs.readFileSync(p, 'utf-8');
        return res.type('html').send(html);
      }
    } catch (readErr) {
      console.warn(`⚠️ [Fallback] Gagal membaca ${p}:`, readErr.message);
    }
  }

  res.type('html').status(200).send('<!doctype html><html><head><meta charset="utf-8"><title>PointLab</title></head><body><div id="root">PointLab</div></body></html>');
});

// 5. Global Error Handler (mencegah crash 500 yang tidak tertangani)
app.use((err, req, res, _next) => {
  console.error('❌ [Global Error Handler]', err.message || err);
  if (req.path.startsWith('/api')) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message || 'Terjadi kesalahan pada server.'
    });
  }
  res.type('html').status(200).send('<!doctype html><html><head><meta charset="utf-8"><title>PointLab</title></head><body><div id="root">PointLab</div></body></html>');
});

// 6. Jalankan Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 PointLab MVC Server berjalan di port ${PORT}`);
  console.log(`🌐 Akses: http://localhost:${PORT}`);
  console.log(`📂 Arsitektur: Model - View - Controller (Server-Side)`);
  console.log(`💾 Database: MySQL driver (mysql2) + Multi-User Model`);
  console.log(`====================================================`);
});

export default app;