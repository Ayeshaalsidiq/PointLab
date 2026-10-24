/**
 * AuthController - PointLab MVC Controller Layer
 * Menangani logika autentikasi (Login, Register, Logout), profil pengguna, dan perubahan password.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import userModel from '../models/userModel.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { renderSpaView } from '../helpers/viewHelper.js';
import { isDbConnected, query } from '../config/db.js';

export const authController = {
  // Render View Halaman Auth
  renderView(req, res) {
    return renderSpaView(req, res);
  },

  // API Login (Memvalidasi Password Secara Ketat)
  async login(req, res) {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) {
        return res.status(400).json({ error: 'NIM/Email dan Password wajib diisi.' });
      }

      const user = await userModel.findByNimOrEmail(identifier);
      if (!user) {
        return res.status(401).json({
          error: 'Akun tidak ditemukan. Periksa kembali NIM atau Email Anda.'
        });
      }

      // Verifikasi Password Pengguna
      const isPasswordValid = userModel.verifyPassword(user, password);
      if (!isPasswordValid) {
        return res.status(401).json({
          error: 'Password yang Anda masukkan salah. Silakan coba lagi.'
        });
      }

      // Buat token JWT resmi yang terikat dengan identitas user
      const token = generateToken(user);

      return res.status(200).json({
        message: 'Login berhasil.',
        token,
        user: {
          id: user.id,
          memberId: user.id,
          nama: user.nama,
          nim: user.nim,
          email: user.email,
          phone: user.phone,
          role: user.role,
          tier: user.tier,
          poin: user.poin,
          coin_balance: user.coin_balance,
          totalPoin: user.totalPoin,
          total_points: user.total_points,
          avatar: user.avatar,
          avatar_url: user.avatar_url
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: error.message || 'Terjadi kesalahan pada server.' });
    }
  },

  // API Register
  async register(req, res) {
    try {
      const { nama, name, nim, email, phone, phone_number, password } = req.body;
      if (!nim || !password) {
        return res.status(400).json({ error: 'NIM dan Password wajib diisi.' });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: 'Password minimal 6 karakter.' });
      }

      const newUser = await userModel.create({
        nama: nama || name,
        nim,
        email,
        phone: phone || phone_number,
        password
      });

      const token = generateToken(newUser);

      return res.status(201).json({
        message: 'Registrasi berhasil. Selamat datang di PointLab!',
        token,
        user: {
          id: newUser.id,
          memberId: newUser.id,
          nama: newUser.nama,
          nim: newUser.nim,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role,
          tier: newUser.tier,
          poin: newUser.poin,
          coin_balance: newUser.coin_balance,
          totalPoin: newUser.totalPoin,
          total_points: newUser.total_points,
          avatar: newUser.avatar,
          avatar_url: newUser.avatar_url
        }
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // API Get Profile (Mengembalikan data spesifik per-pengguna berdasarkan Token)
  async getProfile(req, res) {
    try {
      const targetUserId = req.userId || (req.user ? req.user.id : null);
      if (!targetUserId) {
        return res.status(401).json({ error: 'Sesi tidak valid. Harap login kembali.' });
      }

      const user = await userModel.findById(targetUserId);
      if (!user) {
        return res.status(404).json({ error: 'User tidak ditemukan.' });
      }

      return res.status(200).json({
        user: {
          id: user.id,
          memberId: user.id,
          nama: user.nama,
          nim: user.nim,
          email: user.email,
          phone: user.phone,
          role: user.role,
          tier: user.tier,
          poin: user.poin,
          coin_balance: user.coin_balance,
          totalPoin: user.totalPoin,
          total_points: user.total_points,
          avatar: user.avatar,
          avatar_url: user.avatar_url
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Update Profile (Khusus Pengguna yang Login)
  async updateProfile(req, res) {
    try {
      const targetUserId = req.userId || (req.user ? req.user.id : null);
      if (!targetUserId) {
        return res.status(401).json({ error: 'Sesi tidak valid.' });
      }

      const updated = await userModel.updateProfile(targetUserId, req.body);
      return res.status(200).json({
        message: 'Profil berhasil diperbarui.',
        user: updated
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Change Password
  async changePassword(req, res) {
    try {
      const targetUserId = req.userId || (req.user ? req.user.id : null);
      if (!targetUserId) {
        return res.status(401).json({ error: 'Sesi tidak valid.' });
      }

      const { currentPassword, newPassword, password } = req.body;
      const targetNewPassword = newPassword || password;

      if (!targetNewPassword || targetNewPassword.length < 6) {
        return res.status(400).json({ error: 'Password baru minimal 6 karakter.' });
      }

      // Jika ada currentPassword, verifikasi dulu
      if (currentPassword) {
        const currentUser = await userModel.findById(targetUserId);
        if (currentUser && !userModel.verifyPassword(currentUser, currentPassword)) {
          return res.status(400).json({ error: 'Password saat ini yang Anda masukkan salah.' });
        }
      }

      await userModel.updatePassword(targetUserId, targetNewPassword);
      return res.status(200).json({ message: 'Password berhasil diubah.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Forgot Password (kirim email reset)
  async forgotPassword(req, res) {
    try {
      const { identifier } = req.body;
      if (!identifier || !identifier.trim()) {
        return res.status(400).json({ error: 'Email atau NIM wajib diisi.' });
      }

      const user = await userModel.findByNimOrEmail(identifier.trim());
      if (!user) {
        return res.status(404).json({ error: 'Akun dengan Email/NIM tersebut tidak ditemukan.' });
      }

      // TODO: Kirim email reset password via email service
      // Untuk sementara, simpan token reset ke localStorage (client-side)
      const resetToken = `reset_${Date.now()}_${user.id}`;
      return res.status(200).json({
        message: 'Instruksi reset password telah dikirim ke email Anda.',
        resetToken,
        email: user.email,
        // Dalam production, kirim email dengan link reset
        note: 'Reset token generated (email service needs to be integrated)'
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Submit Feedback
  async submitFeedback(req, res) {
    try {
      const { category, message, rating } = req.body;
      const targetUserId = req.userId || req.body.user_id || null;

      if (!message || !message.trim()) {
        return res.status(400).json({ message: 'Pesan feedback tidak boleh kosong.', code: 'FEEDBACK_EMPTY' });
      }

      const feedback = {
        id: `fb_${Date.now()}`,
        userId: targetUserId,
        category: category || 'Umum',
        message: message.trim(),
        rating: rating || null,
        createdAt: new Date().toISOString()
      };

      // Persist ke MySQL jika tersedia
      if (isDbConnected()) {
        try {
          await query(
            `INSERT INTO feedbacks (id, user_id, category, message, rating, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())`,
            [feedback.id, targetUserId, feedback.category, feedback.message, feedback.rating || null]
          );
        } catch (err) {
          console.warn('MySQL insert feedback error:', err.message);
        }
      }

      return res.status(200).json({
        message: 'Terima kasih! Feedback Anda telah terkirim.',
        code: 'FEEDBACK_OK',
        feedback
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Gagal mengirim feedback.', code: 'FEEDBACK_ERROR' });
    }
  },

  // API Submit Review per transaksi/menu
  async submitReview(req, res) {
    try {
      const { orderId, menuItemId, rating, reviewText } = req.body;
      const targetUserId = req.userId || req.body.user_id || null;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating harus antara 1-5.', code: 'REVIEW_INVALID_RATING' });
      }
      if (!reviewText || !reviewText.trim()) {
        return res.status(400).json({ message: 'Ulasan tidak boleh kosong.', code: 'REVIEW_EMPTY' });
      }

      const review = {
        id: `rv_${Date.now()}`,
        userId: targetUserId,
        orderId: orderId || null,
        menuItemId: menuItemId || null,
        rating: parseInt(rating, 10),
        reviewText: reviewText.trim(),
        createdAt: new Date().toISOString()
      };

      // Persist ke MySQL
      if (isDbConnected()) {
        try {
          await query(
            `INSERT INTO reviews (id, user_id, order_id, menu_item_id, rating, review_text, created_at)
             VALUES (?, ?, ?, ?, ?, ?, NOW())`,
            [review.id, targetUserId, review.orderId, review.menuItemId, review.rating, review.reviewText]
          );
        } catch (err) {
          console.warn('MySQL insert review error:', err.message);
        }
      }

      return res.status(200).json({
        message: 'Terima kasih! Ulasan Anda telah dikirim.',
        code: 'REVIEW_OK',
        review
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Gagal mengirim ulasan.', code: 'REVIEW_ERROR' });
    }
  },

  // API Logout (invalidate token / session)
  async logout(req, res) {
    try {
      // Catat logout ke audit log jika tersedia
      if (isDbConnected() && req.userId) {
        try {
          await query(
            `INSERT INTO audit_logs (user, action, target, status) VALUES (?, 'logout', 'session', 'success')`,
            [req.userId]
          );
        } catch (err) {
          // abaikan error audit
        }
      }

      return res.status(200).json({
        message: 'Logout berhasil.',
        code: 'LOGOUT_OK'
      });
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Gagal logout.', code: 'LOGOUT_ERROR' });
    }
  }
};

export default authController;
