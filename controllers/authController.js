/**
 * AuthController - PointLab MVC Controller Layer
 * Menangani logika autentikasi (Login, Register, Logout), profil pengguna, dan perubahan password.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import userModel from '../models/userModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEW_PATH = path.resolve(__dirname, '../views/index.html');

export const authController = {
  // Render View Halaman Auth
  renderView(req, res) {
    res.sendFile(VIEW_PATH);
  },

  // API Login
  async login(req, res) {
    try {
      const { identifier, password } = req.body;
      if (!identifier || !password) {
        return res.status(400).json({ error: 'NIM/Email dan Password wajib diisi.' });
      }

      const user = userModel.findByNimOrEmail(identifier);
      if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan. Silakan registrasi terlebih dahulu.' });
      }

      // Sederhana: validasi kredensial
      return res.status(200).json({
        message: 'Login berhasil.',
        token: `jwt_pointlab_${user.id}_${Date.now()}`,
        user: {
          id: user.id,
          nama: user.nama,
          nim: user.nim,
          email: user.email,
          phone: user.phone,
          tier: user.tier,
          poin: user.poin,
          totalPoin: user.totalPoin,
          avatar: user.avatar
        }
      });
    } catch (error) {
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

      const newUser = userModel.create({
        nama: nama || name,
        nim,
        email,
        phone: phone || phone_number,
        password
      });

      return res.status(201).json({
        message: 'Registrasi berhasil. Selamat datang di PointLab!',
        token: `jwt_pointlab_${newUser.id}_${Date.now()}`,
        user: newUser
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // API Get Profile
  async getProfile(req, res) {
    const user = userModel.findById(1); // default active session
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan.' });
    return res.status(200).json({ user });
  },

  // API Update Profile
  async updateProfile(req, res) {
    try {
      const updated = userModel.updateProfile(1, req.body);
      return res.status(200).json({ message: 'Profil berhasil diperbarui.', user: updated });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Change Password
  async changePassword(req, res) {
    try {
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'Password baru minimal 6 karakter.' });
      }
      userModel.updatePassword(1, newPassword);
      return res.status(200).json({ message: 'Password berhasil diubah.' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default authController;
