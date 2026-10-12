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

  // API Cek Saldo Koin & Tier
  async getBalance(req, res) {
    try {
      const user = userModel.findById(1);
      const currentTier = coinModel.calculateTier(user ? user.totalPoin : 0);
      return res.status(200).json({
        balance: user ? user.poin : 0,
        totalPoints: user ? user.totalPoin : 0,
        tier: currentTier,
        allTiers: coinModel.getTiers()
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Riwayat Transaksi Poin
  async getHistory(req, res) {
    try {
      const history = coinModel.getHistory(1);
      return res.status(200).json({ history });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default dashboardController;
