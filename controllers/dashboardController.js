/**
 * DashboardController - PointLab MVC Controller Layer
 * Menangani tampilan dashboard, status tier keanggotaan, saldo poin/koin, dan riwayat mutasi.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import userModel from '../models/userModel.js';
import coinModel from '../models/coinModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEW_PATH = path.resolve(__dirname, '../views/index.html');

export const dashboardController = {
  // Render View Halaman Dashboard & Beranda
  renderView(req, res) {
    res.sendFile(VIEW_PATH);
  },

  // API Cek Saldo Koin & Tier Per-Pengguna
  async getBalance(req, res) {
    try {
      const targetUserId = req.userId || req.query.user_id || 1;
      const user = await userModel.findById(targetUserId);

      const totalPts = user ? (user.totalPoin ?? user.total_points ?? user.poin ?? 0) : 0;
      const currentTier = coinModel.calculateTier(totalPts);

      return res.status(200).json({
        balance: user ? user.poin : 0,
        coin_balance: user ? user.poin : 0,
        totalPoints: totalPts,
        total_points: totalPts,
        tier: currentTier,
        allTiers: coinModel.getTiers()
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Riwayat Transaksi Poin Per-Pengguna
  async getHistory(req, res) {
    try {
      const targetUserId = req.userId || req.query.user_id || 1;
      const history = await coinModel.getHistory(targetUserId);
      return res.status(200).json({ history });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default dashboardController;
