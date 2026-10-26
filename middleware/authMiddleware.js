/**
 * AuthMiddleware - PointLab Authentication & JWT Verification
 * Menangani verifikasi token JWT maupun token HMAC backend_ngolab secara terpadu.
 */

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config();

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.AUTH_TOKEN_SECRET ||
  'ngolab_shared_auth_secret_2026_telkom_fit_secure';

/**
 * Generate token JWT untuk pengguna (kompatibel penuh dengan backend_ngolab)
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      memberId: user.memberId || user.id,
      nim: user.nim || '',
      email: user.email || '',
      nama: user.nama || user.name || '',
      name: user.nama || user.name || '',
      role: user.role || 'Pelanggan'
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Verifikasi token HMAC 2-bagian dari backend_ngolab (payloadB64.signatureB64)
 */
function verifyNgolabHmacToken(token) {
  if (typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadPart, signaturePart] = parts;
  if (!payloadPart || !signaturePart) return null;

  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payloadPart)
    .digest('base64url');

  const sigBuf = Buffer.from(signaturePart);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'));
    const nowSec = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === 'number' && payload.exp <= nowSec) {
      return null;
    }
    const resolvedId = payload.sub || payload.id;
    if (!resolvedId) return null;
    return {
      ...payload,
      id: resolvedId,
      nama: payload.name || payload.nama || ''
    };
  } catch {
    return null;
  }
}

/**
 * Helper decode token (mendukung JWT standar, token HMAC backend_ngolab, dan token legacy PointLab)
 */
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (verified && typeof verified === 'object') {
      return {
        ...verified,
        id: verified.id || verified.sub
      };
    }
  } catch {
    // Lanjut coba verifikasi token HMAC 2-segmen dari backend_ngolab
  }

  const ngolabIdentity = verifyNgolabHmacToken(token);
  if (ngolabIdentity) return ngolabIdentity;

  // Fallback: deteksi legacy token format 'jwt_pointlab_{userId}_{timestamp}'
  if (typeof token === 'string' && token.startsWith('jwt_pointlab_')) {
    const parts = token.split('_');
    if (parts.length >= 3) {
      const legacyId = isNaN(parts[2]) ? parts[2] : parseInt(parts[2], 10);
      return { id: legacyId, legacy: true };
    }
  }
  return null;
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
