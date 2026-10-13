/**
 * PromoController - PointLab MVC Controller Layer
 * Menangani katalog promo/reward, penukaran poin (redeem), klaim kode promo, dan voucher per pengguna.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import promoModel from '../models/promoModel.js';
import userModel from '../models/userModel.js';
import coinModel from '../models/coinModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const VIEW_PATH = path.resolve(__dirname, '../views/index.html');

export const promoController = {
  // Render View Halaman Promo, Detail Promo, & Redeem
  renderView(req, res) {
    res.sendFile(VIEW_PATH);
  },

  // API Daftar Promo / Rewards Tersedia
  async getPromos(req, res) {
    try {
      const promos = await promoModel.getAllPromos();
      return res.status(200).json({
        promos,
        rewards: promos // alias untuk endpoint rewards
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Detail Promo / Reward
  async getPromoDetail(req, res) {
    try {
      const promoId = req.params.id || req.params.promoId;
      const promo = await promoModel.getPromoById(promoId);
      if (!promo) {
        return res.status(404).json({ error: 'Promo / reward tidak ditemukan.' });
      }
      return res.status(200).json({
        promo,
        reward: promo
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Tukar Poin dengan Promo / Reward (Redeem)
  async redeem(req, res) {
    try {
      const promoId = req.body.promo_id || req.body.reward_id || req.body.promoId || req.params.id;
      if (!promoId) {
        return res.status(400).json({ error: 'ID promo / reward wajib disertakan.' });
      }

      const targetUserId = req.userId || req.body.user_id || 1;
      const promo = await promoModel.getPromoById(promoId);
      if (!promo) {
        return res.status(404).json({ error: 'Promo / reward tidak valid.' });
      }

      const user = await userModel.findById(targetUserId);
      if (!user) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan.' });
      }

      const cost = promo.pointsRequired || promo.coin_cost || 0;
      if (user.poin < cost) {
        return res.status(400).json({
          error: `Saldo poin Anda (${user.poin}) tidak mencukupi untuk menukar voucher ini (${cost} poin).`
        });
      }

      // Potong poin pengguna
      const updatedUser = await userModel.updatePoints(targetUserId, -cost);

      // Catat riwayat transaksi
      await coinModel.addHistory({
        userId: targetUserId,
        userName: user.nama,
        title: `Tukar: ${promo.title}`,
        category: 'Penukaran Poin',
        type: 'redeem',
        points: -cost
      });

      // Generate voucher per-pengguna
      const voucher = await promoModel.redeemPromo(promoId, targetUserId);

      return res.status(200).json({
        message: 'Penukaran poin berhasil!',
        voucher,
        remainingPoints: updatedUser ? updatedUser.poin : user.poin - cost,
        current_balance: updatedUser ? updatedUser.poin : user.poin - cost
      });
    } catch (error) {
      console.error('Redeem error:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // API Klaim Kode Promo Spesial
  async claimCode(req, res) {
    try {
      const { code } = req.body;
      const targetUserId = req.userId || req.body.user_id || 1;

      const voucher = await promoModel.claimPromoCode(code, targetUserId);
      return res.status(200).json({
        message: 'Kode promo berhasil diklaim!',
        voucher
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // API Voucher Milik Pengguna
  async getMyVouchers(req, res) {
    try {
      const targetUserId = req.userId || req.query.user_id || (req.params && req.params.id) || 1;
      const vouchers = await promoModel.getUserVouchers(targetUserId);
      return res.status(200).json({
        vouchers,
        rewards: vouchers
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default promoController;
