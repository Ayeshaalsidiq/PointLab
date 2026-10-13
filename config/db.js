/**
 * PointLab Database Configuration
 * Mengelola koneksi database MySQL / MariaDB menggunakan mysql2/promise
 * Dilengkapi graceful fallback jika database server belum aktif.
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;
let isConnected = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3310', 10),
    user: process.env.DB_USER || process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || process.env.DB_DATABASE || 'ngola_geasture_adm',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 8000
  });
} catch (err) {
  console.warn('⚠️ Gagal menginisialisasi MySQL pool:', err.message);
}

export const initDb = async () => {
  if (!pool) return false;
  try {
    const conn = await pool.getConnection();
    isConnected = true;
    console.log(`✅ [Database] Berhasil terhubung ke database MySQL '${process.env.DB_NAME || 'gesture_eats'}'`);
    conn.release();
    return true;
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️ [Database] MySQL tidak tersambung (${err.message}). Menggunakan In-Memory Store dengan data penuh gesture_eats.sql`);
    return false;
  }
};

export const query = async (sql, params = []) => {
  if (!isConnected || !pool) {
    throw new Error('Database MySQL tidak terhubung');
  }
  const [results] = await pool.execute(sql, params);
  return results;
};

export const isDbConnected = () => isConnected;

export default {
  pool,
  query,
  initDb,
  isDbConnected
};
