/**
 * AuthController - PointLab MVC Controller Layer
 * Menangani logika autentikasi (Login, Register, Logout), profil pengguna, dan perubahan password.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import userModel from '../models/userModel.js';
import { generateToken } from '../middleware/authMiddleware.js';
import { renderSpaView } from '../helpers/viewHelper.js';

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
        user: newUser
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
  }
};

export default authController;
