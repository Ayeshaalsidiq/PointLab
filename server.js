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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sajikan file statis dari public/ dan dist/
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// 1. Lapisan API MVC (/api/*)
app.use('/api', apiRoutes);

// 2. Lapisan Web Routes MVC (/dashboard, /auth, /promo, /membership, /chat, dll.)
app.use('/', webRoutes);

// 3. Fallback Route (menjamin seluruh routing server-side terjaga tanpa 404)
app.use((req, res) => {
  const viewPath = path.join(__dirname, 'views', 'index.html');
  const distHtmlPath = path.join(__dirname, 'dist', 'index.html');
  
  if (fs.existsSync(distHtmlPath)) {
    return res.sendFile(distHtmlPath);
  } else if (fs.existsSync(viewPath)) {
    return res.sendFile(viewPath);
  }
  
  res.status(404).send('View file tidak ditemukan. Pastikan Anda telah menjalankan `npm run build`.');
});

// Jalankan Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 PointLab MVC Server berjalan di port ${PORT}`);
  console.log(`🌐 Akses: http://localhost:${PORT}`);
  console.log(`📂 Arsitektur: Model - View - Controller (Server-Side)`);
  console.log(`====================================================`);
});

export default app;
