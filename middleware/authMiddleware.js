/**
 * AuthMiddleware - PointLab Authentication & JWT Verification
 * Menangani verifikasi token JWT dan proteksi endpoint API per-pengguna.
 */

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'pointlab_jwt_super_secret_telkom_fit_2026';

/**
 * Generate token JWT untuk pengguna
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      memberId: user.id,
      nim: user.nim || '',
      email: user.email || '',
      nama: user.nama || user.name || ''
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Helper decode token (mendukung JWT standar dan token legacy PointLab)
 */
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // Fallback: deteksi legacy token format 'jwt_pointlab_{userId}_{timestamp}'
    if (typeof token === 'string' && token.startsWith('jwt_pointlab_')) {
      const parts = token.split('_');
      if (parts.length >= 3) {
        const legacyId = isNaN(parts[2]) ? parts[2] : parseInt(parts[2], 10);
        return { id: legacyId, legacy: true };
      }
    }
    return null;
  }
};

/**
 * Middleware untuk memvalidasi token wajib (Require Auth)
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.headers['x-access-token']) {
      token = req.headers['x-access-token'];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Akses ditolak. Token otentikasi Bearer wajib disertakan pada header.'
      });
    }

    const decoded = decodeToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Token otentikasi tidak valid atau telah kedaluwarsa.'
      });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Pengguna yang terkait dengan token ini tidak ditemukan.'
      });
    }

    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Gagal memverifikasi token' });
  }
};

/**
 * Middleware opsional (Optional Auth)
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }

    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.id) {
        const user = await userModel.findById(decoded.id);
        if (user) {
          req.user = user;
          req.userId = user.id;
        }
      }
    }
    next();
  } catch (err) {
    next();
  }
};

export default {
  generateToken,
  decodeToken,
  requireAuth,
  optionalAuth
};
