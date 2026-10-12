/**
 * PromoController - PointLab MVC Controller Layer
 * Menangani tampilan katalog promo, penukaran poin (redeem), klaim kode promo, dan voucher pengguna.
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

  // API Daftar Promo Tersedia
  async getPromos(req, res) {
    try {
      const promos = promoModel.getAllPromos();
      return res.status(200).json({ promos });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Detail Promo
  async getPromoDetail(req, res) {
    try {
      const promo = promoModel.getPromoById(req.params.id);
      if (!promo) return res.status(404).json({ error: 'Promo tidak ditemukan.' });
      return res.status(200).json({ promo });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Tukar Poin dengan Promo
  async redeem(req, res) {
    try {
      const { promo_id } = req.body;
      const promo = promoModel.getPromoById(promo_id);
      if (!promo) return res.status(404).json({ error: 'Promo tidak valid.' });

      const user = userModel.findById(1);
      if (user.poin < promo.pointsRequired) {
        return res.status(400).json({ error: 'Saldo poin Anda tidak mencukupi untuk menukar voucher ini.' });
      }

      // Potong poin
      userModel.updatePoints(1, -promo.pointsRequired);

      // Catat riwayat
      coinModel.addHistory({
        title: `Tukar: ${promo.title}`,
        category: 'Penukaran Poin',
        points: -promo.pointsRequired
      });

      // Generate voucher
      const voucher = promoModel.redeemPromo(promo_id, 1);

      return res.status(200).json({
        message: 'Penukaran poin berhasil!',
        voucher,
        remainingPoints: user.poin
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // API Klaim Kode Promo Spesial
  async claimCode(req, res) {
    try {
      const { code } = req.body;
      const voucher = promoModel.claimPromoCode(code);
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
      const vouchers = promoModel.getUserVouchers(1);
      return res.status(200).json({ vouchers });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default promoController;
